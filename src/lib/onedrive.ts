export type GalleryItem = {
    id: string;
    url: string;
    width: number;
    height: number;
    description: string;
    name: string;
    isVideo: boolean;
};

export type Album = {
    id: string;
    title: string;
    coverPhotoBaseUrl: string;
    itemsCount: number;
};

// 🔐 Token Manager
async function getAccessToken() {
    const { MS_CLIENT_ID, MS_CLIENT_SECRET, MS_REFRESH_TOKEN } = process.env;

    if (!MS_CLIENT_ID || !MS_CLIENT_SECRET || !MS_REFRESH_TOKEN) {
        throw new Error("❌ Variáveis de ambiente indefinidas.");
    }

    const params = new URLSearchParams({
        client_id: MS_CLIENT_ID,
        client_secret: MS_CLIENT_SECRET,
        refresh_token: MS_REFRESH_TOKEN,
        grant_type: 'refresh_token',
    });

    try {
        const response = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
            method: 'POST',
            body: params,
            cache: 'no-store'
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error_description || "Falha auth");
        return data.access_token;
    } catch (error) {
        console.error("❌ Erro auth:", error);
        return null;
    }
}

// 📂 Listar Álbuns (Pastas na Raiz)
export async function getAlbums(): Promise<Album[]> {
    const galleryId = process.env.MS_GALLERY_FOLDER_ID;
    if (!galleryId) return [];

    const accessToken = await getAccessToken();
    if (!accessToken) return [];

    // Busca apenas PASTAS
    const url = `https://graph.microsoft.com/v1.0/me/drive/items/${galleryId}/children?filter=folder ne null&expand=thumbnails&top=100`;

    try {
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
            next: { revalidate: 60 } // Cache curto (1 min) para criar pastas rápido
        });

        const data = await response.json();
        if (!data.value) return [];

        return data.value.map((folder: any) => {
            const cover = folder.thumbnails?.[0]?.large?.url || folder.thumbnails?.[0]?.medium?.url;
            return {
                id: folder.id,
                title: folder.name,
                coverPhotoBaseUrl: cover || '',
                itemsCount: folder.folder?.childCount || 0
            };
        });
    } catch (error) {
        console.error("❌ Erro álbuns:", error);
        return [];
    }
}

// 🖼️ Listar Itens (Fotos e Vídeos)
export async function getAlbumItems(albumId: string, skip = 0, top = 100): Promise<GalleryItem[]> {
    const accessToken = await getAccessToken();
    if (!accessToken) return [];

    // Seleciona campos específicos para ser mais leve
    const url = `https://graph.microsoft.com/v1.0/me/drive/items/${albumId}/children?select=id,name,description,image,video,file,thumbnails,@microsoft.graph.downloadUrl&expand=thumbnails&top=${top}`;

    try {
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
            next: { revalidate: 3600 }
        });

        const data = await response.json();
        if (!data.value) return [];

        // Filtragem Segura no Código
        const mediaFiles = data.value.filter((file: any) => {
            const isImage = file.image || file.file?.mimeType?.startsWith('image/');
            const isVideo = file.video || file.file?.mimeType?.startsWith('video/');
            return isImage || isVideo;
        });

        return mediaFiles.map((file: any) => {
            const thumb = file.thumbnails?.[0]?.large?.url ||
                file.thumbnails?.[0]?.medium?.url ||
                file.thumbnails?.[0]?.small?.url;

            const finalUrl = thumb || file['@microsoft.graph.downloadUrl'];

            // Detecção robusta
            const isVideo = !!file.video || (file.file?.mimeType?.startsWith('video/'));

            return {
                id: file.id,
                url: finalUrl,
                name: file.name,
                description: file.description || '',
                width: file.image?.width || 1920,
                height: file.image?.height || 1080,
                isVideo: isVideo
            };
        });

    } catch (error) {
        console.error(`❌ Erro itens álbum ${albumId}:`, error);
        return [];
    }
}