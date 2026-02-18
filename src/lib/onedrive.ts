export type GalleryItem = {
    id: string;
    url: string;        // URL da Thumbnail (Capa)
    videoUrl?: string;  // URL do Arquivo de Vídeo (Novo)
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

export type FolderMetadata = {
    heading?: string;
    description?: string;
    capabilities?: string[];
    featured?: boolean; // <--- Novo campo
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

    const url = `https://graph.microsoft.com/v1.0/me/drive/items/${albumId}/children?select=id,name,description,image,video,file,thumbnails,@microsoft.graph.downloadUrl&expand=thumbnails&top=${top}`;

    try {
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
            next: { revalidate: 3600 }
        });

        const data = await response.json();
        if (!data.value) return [];

        const mediaFiles = data.value.filter((file: any) => {
            const isImage = file.image || file.file?.mimeType?.startsWith('image/');
            const isVideo = file.video || file.file?.mimeType?.startsWith('video/');
            return isImage || isVideo;
        });

        return mediaFiles.map((file: any) => {
            const thumb = file.thumbnails?.[0]?.large?.url ||
                file.thumbnails?.[0]?.medium?.url ||
                file.thumbnails?.[0]?.small?.url;

            // Link direto para baixar/tocar o arquivo
            const downloadUrl = file['@microsoft.graph.downloadUrl'];

            // Detecção de vídeo
            const isVideo = !!file.video || (file.file?.mimeType?.startsWith('video/'));

            return {
                id: file.id,
                url: thumb || downloadUrl, // Se for vídeo, usa a capa. Se não tiver capa, usa o arquivo.
                videoUrl: downloadUrl,     // <--- NOVO: Guarda o link do vídeo separadamente
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

// 📝 NOVO: Função que lê o arquivo info.txt dentro da pasta
export async function getFolderMetadata(folderId: string): Promise<FolderMetadata | null> {
    const accessToken = await getAccessToken();
    if (!accessToken) return null;

    // A mágica acontece aqui: ":/info.txt:/content" pega o texto direto
    const url = `https://graph.microsoft.com/v1.0/me/drive/items/${folderId}:/!info.txt:/content`;

    try {
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
            next: { revalidate: 60 } // Cache curto para atualizar textos rápido
        });

        if (response.status === 404) return null; // Se não tiver arquivo, retorna null (sem erro)
        if (!response.ok) return null;

        const text = await response.text();
        return parseMetadataText(text);
    } catch (error) {
        console.error(`Erro ao ler info.txt da pasta ${folderId}`, error);
        return null;
    }
}

// 🧠 NOVO: Helper Inteligente para ler o TXT e transformar em Objeto
function parseMetadataText(text: string): FolderMetadata {
    const lines = text.split('\n');
    const metadata: any = {
        heading: '',
        description: '',
        capabilities: [],
        featured: false // Padrão
    };

    let currentSection = '';

    lines.forEach(line => {
        const cleanLine = line.trim();
        if (!cleanLine) return;

        const lowerLine = cleanLine.toLowerCase();

        if (lowerLine.startsWith('heading:') || lowerLine.startsWith('titulo:')) {
            metadata.heading = cleanLine.substring(cleanLine.indexOf(':') + 1).trim();
            currentSection = 'heading';
        }
        else if (lowerLine.startsWith('description:') || lowerLine.startsWith('descricao:')) {
            metadata.description = cleanLine.substring(cleanLine.indexOf(':') + 1).trim();
            currentSection = 'description';
        }
        else if (lowerLine.startsWith('capabilities:') || lowerLine.startsWith('capacidades:')) {
            currentSection = 'capabilities';
        }
        // NOVO: Detecta destaque
        else if (lowerLine.startsWith('destaque:') || lowerLine.startsWith('featured:')) {
            const value = cleanLine.substring(cleanLine.indexOf(':') + 1).trim().toLowerCase();
            metadata.featured = value === 'sim' || value === 'yes' || value === 'true';
        }
        else if (currentSection === 'capabilities' && (cleanLine.startsWith('-') || cleanLine.startsWith('*'))) {
            const item = cleanLine.substring(1).trim();
            if (item) metadata.capabilities.push(item);
        }
        else if (currentSection === 'description' && !cleanLine.includes(':')) {
            metadata.description += ' ' + cleanLine;
        }
    });

    return metadata;
}