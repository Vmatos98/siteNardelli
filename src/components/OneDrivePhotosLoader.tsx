'use client'

import { useState, useEffect } from 'react'
import { getAllOneDrivePhotos } from '@/app/estrutura/actions'
import { StructureSection } from '@/components/StructureSection'

interface Item {
  title: string
  description: string
  image: string
  capacidade?: string
  fabricante?: string
  observacoes?: string
}

interface SectionData {
  id: string
  title: string
  subtitle: string
  items: Item[]
}

interface OneDrivePhotosLoaderProps {
  sections: SectionData[]
}

export function OneDrivePhotosLoader({ sections }: OneDrivePhotosLoaderProps) {
  const [photoMap, setPhotoMap] = useState<Record<string, string>>({})
  const [photosLoading, setPhotosLoading] = useState(true)

  useEffect(() => {
    getAllOneDrivePhotos()
      .then(photos => {
        const map = photos.reduce<Record<string, string>>(
          (acc, p) => ({ ...acc, [p.nameWithoutExt]: p.src }),
          {}
        )
        setPhotoMap(map)
      })
      .catch(() => { /* silencioso — mantém fallback */ })
      .finally(() => setPhotosLoading(false))
  }, [])

  return (
    <>
      {sections.map((section, index) => (
        <StructureSection
          key={section.id}
          {...section}
          reversed={index % 2 !== 0}
          photoMap={photoMap}
          photosLoading={photosLoading}
        />
      ))}
    </>
  )
}
