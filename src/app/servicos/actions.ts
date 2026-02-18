'use server'

import { getAlbumItems } from '@/lib/onedrive'

export async function getMorePhotos(albumId: string, skip: number) {
    if (!albumId) return []

    // Busca o próximo lote (traz tudo)
    // Nota: Como estamos filtrando no JS, o 'skip' pode ficar impreciso se tiver muito vídeo misturado.
    // O ideal seria usar paginação por cursor (nextLink), mas para manter simples:
    // Pedimos 100 itens pulando os 'skip' primeiros.
    const items = await getAlbumItems(albumId, skip, 100)

    // Retorna só as fotos para o botão "Carregar Mais Fotos"
    return items.filter(item => !item.isVideo)
}