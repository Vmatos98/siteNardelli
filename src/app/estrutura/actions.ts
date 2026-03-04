'use server'

import { getAlbums, getAlbumItems } from '@/lib/onedrive'

export async function getEstruturaPhotos() {
    // 1. Encontrar o álbum "estrutura"
    const albums = await getAlbums()
    const estruturaAlbum = albums.find(a => a.title.toLowerCase() === 'estrutura')

    if (!estruturaAlbum) {
        return []
    }

    // 2. Buscar todas as fotos da pasta
    const items = await getAlbumItems(estruturaAlbum.id, 0, 100)

    // 3. Filtrar as fotos de e001 a e010
    const targetNames = Array.from({ length: 10 }, (_, i) => `e${String(i + 1).padStart(3, '0')}`)

    const photos = items
        .filter(item => !item.isVideo) // apenas fotos
        .filter(item => {
            // Verificar se o nome original do arquivo ou algum metadado contem o identificador alvo
            // Geralmente item.name contem a extensao. Vamos checar apenas o prefixo.
            const nameWithoutExt = item.name.toLowerCase().split('.')[0]
            return targetNames.includes(nameWithoutExt)
        })
        // Ordenar pela nomenclatura (e001, e002...)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(p => ({
            id: p.id,
            src: p.url,
            alt: p.description || p.name,
            width: p.width,
            height: p.height
        }))

    return photos
}
