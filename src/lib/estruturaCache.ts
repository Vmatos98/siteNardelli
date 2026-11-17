'use client'

import { useSyncExternalStore, useEffect } from 'react'

export interface OneDrivePhoto {
  id: string
  nameWithoutExt: string
  src: string
  alt: string
  width: number
  height: number
}

export interface EstruturaCacheState {
  photos: OneDrivePhoto[] | null
  photoMap: Record<string, string> | null
  estruturaPhotos: OneDrivePhoto[] | null
  isLoading: boolean
}

let cachedPhotos: OneDrivePhoto[] | null = null
let cachedPhotoMap: Record<string, string> | null = null
let cachedEstruturaPhotos: OneDrivePhoto[] | null = null
let preloadPromise: Promise<OneDrivePhoto[]> | null = null
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach(listener => {
    try {
      listener()
    } catch (e) {
      console.error('Erro ao notificar listener do cache de estrutura:', e)
    }
  })
}

/** Preaquece as imagens na memória de cache do navegador */
function preheatImages(photos: OneDrivePhoto[]) {
  if (typeof window === 'undefined') return
  photos.forEach(photo => {
    if (photo.src && photo.src.startsWith('http')) {
      const img = new window.Image()
      img.src = photo.src
    }
  })
}

/** Retorna o snapshot atual do cache */
export function getEstruturaCache(): EstruturaCacheState {
  return {
    photos: cachedPhotos,
    photoMap: cachedPhotoMap,
    estruturaPhotos: cachedEstruturaPhotos,
    isLoading: cachedPhotos === null,
  }
}

const SERVER_SNAPSHOT: EstruturaCacheState = {
  photos: null,
  photoMap: null,
  estruturaPhotos: null,
  isLoading: true,
}

export function subscribeEstruturaCache(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/**
 * Inicia a busca das fotos da estrutura em segundo plano
 * Utiliza /api/estrutura-photos com fallback para a Server Action
 */
export async function preloadEstruturaPhotos(): Promise<OneDrivePhoto[]> {
  if (cachedPhotos !== null) {
    return cachedPhotos
  }

  if (preloadPromise) {
    return preloadPromise
  }

  preloadPromise = (async () => {
    try {
      let photos: OneDrivePhoto[] = []

      // 1. Tenta carregar pela rota de API HTTP com cache
      if (typeof fetch !== 'undefined') {
        try {
          const fetchOptions: RequestInit = {}
          if (typeof window !== 'undefined') {
            (fetchOptions as RequestInit & { priority?: string }).priority = 'low'
          }
          const res = await fetch('/api/estrutura-photos', fetchOptions)
          if (res.ok) {
            const data = await res.json()
            if (Array.isArray(data) && data.length > 0) {
              photos = data
            }
          }
        } catch {
          // Falha na API tratada no fallback
        }
      }

      // 2. Se a rota de API não retornou dados, faz fallback via Server Action
      if (photos.length === 0) {
        try {
          const { getAllOneDrivePhotos } = await import('@/app/estrutura/actions')
          photos = await getAllOneDrivePhotos()
        } catch {
          // fallback silencioso
        }
      }

      // 3. Monta o mapa indexado para máquinas (e011, e012, etc.)
      const photoMap = photos.reduce<Record<string, string>>(
        (acc, p) => ({ ...acc, [p.nameWithoutExt]: p.src }),
        {}
      )

      // 4. Separa e ordena as fotos da estrutura física (e001 a e010)
      const targetNames = Array.from({ length: 10 }, (_, i) => `e${String(i + 1).padStart(3, '0')}`)
      const estruturaPhotos = photos
        .filter(p => targetNames.includes(p.nameWithoutExt))
        .sort((a, b) => a.nameWithoutExt.localeCompare(b.nameWithoutExt))

      // 5. Atualiza o cache global
      cachedPhotos = photos
      cachedPhotoMap = photoMap
      cachedEstruturaPhotos = estruturaPhotos

      // 6. Preaquece imagens em segundo plano no browser
      preheatImages(photos)

      notify()
      return photos
    } catch (err) {
      console.error('Erro ao pré-carregar fotos da estrutura:', err)
      cachedPhotos = []
      cachedPhotoMap = {}
      cachedEstruturaPhotos = []
      notify()
      return []
    } finally {
      preloadPromise = null
    }
  })()

  return preloadPromise
}

/** Função utilitária para testes limparem o cache entre cenários */
export function _resetEstruturaCacheForTesting() {
  cachedPhotos = null
  cachedPhotoMap = null
  cachedEstruturaPhotos = null
  preloadPromise = null
  listeners.clear()
}

/**
 * Hook React para consumir o cache de fotos da estrutura de forma reativa e instantânea
 */
export function useEstruturaCache() {
  const cache = useSyncExternalStore(
    subscribeEstruturaCache,
    getEstruturaCache,
    () => SERVER_SNAPSHOT
  )

  useEffect(() => {
    if (cache.isLoading) {
      preloadEstruturaPhotos()
    }
  }, [cache.isLoading])

  return cache
}
