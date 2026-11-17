'use client'

import { useEffect } from 'react'
import { preloadEstruturaPhotos } from '@/lib/estruturaCache'

/**
 * Componente silencioso que dispara o pré-carregamento em segundo plano
 * das fotos da estrutura assim que o usuário acessa qualquer página do site.
 */
export function EstruturaPreloader() {
  useEffect(() => {
    // Aguarda a renderização inicial da página atual antes de iniciar a busca
    if (typeof window !== 'undefined') {
      const schedulePreload = () => {
        if ('requestIdleCallback' in window) {
          (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
            .requestIdleCallback(() => preloadEstruturaPhotos(), { timeout: 3000 })
        } else {
          setTimeout(() => {
            preloadEstruturaPhotos()
          }, 1000)
        }
      }

      // Se a página já terminou de carregar, agenda o preload. Caso contrário, aguarda o evento 'load'.
      if (document.readyState === 'complete') {
        schedulePreload()
      } else {
        window.addEventListener('load', schedulePreload, { once: true })
      }
    }
  }, [])

  return null
}
