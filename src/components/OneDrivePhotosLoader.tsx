'use client'

import { useEstruturaCache } from '@/lib/estruturaCache'
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
  const { photoMap, isLoading } = useEstruturaCache()

  const safePhotoMap = photoMap ?? {}
  const photosLoading = isLoading

  return (
    <>
      {sections.map((section, index) => (
        <StructureSection
          key={section.id}
          {...section}
          reversed={index % 2 !== 0}
          photoMap={safePhotoMap}
          photosLoading={photosLoading}
        />
      ))}
    </>
  )
}

