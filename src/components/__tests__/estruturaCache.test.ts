import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getEstruturaCache,
  subscribeEstruturaCache,
  preloadEstruturaPhotos,
  _resetEstruturaCacheForTesting,
} from '@/lib/estruturaCache'

describe('estruturaCache — Gerenciamento e Preload de Fotos', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    _resetEstruturaCacheForTesting()
  })

  it('retorna snapshot com isLoading inicial coerente', () => {
    const snapshot = getEstruturaCache()
    expect(typeof snapshot.isLoading).toBe('boolean')
    if (snapshot.isLoading) {
      expect(snapshot.photos).toBeNull()
    } else {
      expect(Array.isArray(snapshot.photos)).toBe(true)
    }
  })

  it('permite registrar e desinscrever listeners via subscribeEstruturaCache', () => {
    const listener = vi.fn()
    const unsubscribe = subscribeEstruturaCache(listener)
    expect(typeof unsubscribe).toBe('function')
    unsubscribe()
  })

  it('preloadEstruturaPhotos processa a resposta da API e atualiza o cache', async () => {
    const mockPhotos = [
      { id: '1', nameWithoutExt: 'e002', src: 'https://cdn.example.com/e002.jpg', alt: 'Estrutura 2', width: 800, height: 600 },
      { id: '2', nameWithoutExt: 'e001', src: 'https://cdn.example.com/e001.jpg', alt: 'Estrutura 1', width: 800, height: 600 },
      { id: '3', nameWithoutExt: 'e011', src: 'https://cdn.example.com/e011.jpg', alt: 'Máquina 11', width: 800, height: 600 },
    ]

    // Mock do fetch global
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPhotos,
    }) as unknown as typeof fetch

    const photos = await preloadEstruturaPhotos()
    expect(photos.length).toBeGreaterThanOrEqual(3)

    const cache = getEstruturaCache()
    expect(cache.isLoading).toBe(false)
    expect(cache.photoMap).toBeDefined()
    expect(cache.photoMap?.['e011']).toBe('https://cdn.example.com/e011.jpg')

    // Verifica que estruturaPhotos (e001, e002) está ordenado
    expect(cache.estruturaPhotos).toBeDefined()
    if (cache.estruturaPhotos && cache.estruturaPhotos.length >= 2) {
      expect(cache.estruturaPhotos[0].nameWithoutExt).toBe('e001')
      expect(cache.estruturaPhotos[1].nameWithoutExt).toBe('e002')
    }
  })
})
