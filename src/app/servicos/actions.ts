'use server'

import { getAlbumItems } from '@/lib/onedrive'

export async function getMorePhotos(albumId: string, skip: number) {
    if (!albumId) return []
    const items = await getAlbumItems(albumId, skip, 100)
    return items.filter(item => !item.isVideo)
}

export async function fetchServiceMedia(albumId: string) {
    if (!albumId) return { videos: [], photos: [] }

    const allItems = await getAlbumItems(albumId, 0, 100)

    const videos = allItems.filter(item => item.isVideo).map(v => ({
        id: v.id,
        src: v.url,          // Capa (Imagem)
        videoSrc: v.videoUrl,// Link do Vídeo Real (Novo)
        alt: v.description || v.name,
        width: v.width,
        height: v.height,
        isVideo: true
    }))

    const photos = allItems.filter(item => !item.isVideo).map(p => ({
        id: p.id,
        src: p.url,
        alt: p.description || p.name,
        width: p.width,
        height: p.height,
        isVideo: false,
        featured: p.description?.toLowerCase().includes('#destaque')
    }))

    return { videos, photos }
}