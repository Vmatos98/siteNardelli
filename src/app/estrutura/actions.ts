'use server'

import { getAlbums, getAlbumItems } from '@/lib/onedrive'

// Nova função que busca TODAS as fotos e retorna um array prático
export async function getAllOneDrivePhotos() {
    const albums = await getAlbums()
    const estruturaAlbum = albums.find(a => a.title.toLowerCase() === 'estrutura')

    if (!estruturaAlbum) return []

    // Busca um limite maior para garantir que pega todas as máquinas (ex: 200)
    const items = await getAlbumItems(estruturaAlbum.id, 0, 200)

    return items
        .filter(item => !item.isVideo)
        .map(p => ({
            id: p.id,
            nameWithoutExt: p.name.toLowerCase().split('.')[0], // Pega apenas "e011", "e012", etc.
            src: p.url,
            alt: p.description || p.name,
            width: p.width,
            height: p.height
        }))
}

// Atualizamos a função antiga para continuar funcionando perfeitamente na galeria física
export async function getEstruturaPhotos() {
    const allPhotos = await getAllOneDrivePhotos()

    // Alvos originais: e001 a e010
    const targetNames = Array.from({ length: 10 }, (_, i) => `e${String(i + 1).padStart(3, '0')}`)

    return allPhotos
        .filter(p => targetNames.includes(p.nameWithoutExt))
        .sort((a, b) => a.nameWithoutExt.localeCompare(b.nameWithoutExt))
}