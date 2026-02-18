import { getAlbums, getAlbumItems, getFolderMetadata } from '@/lib/onedrive'
import ServicesClient, { ServiceData } from './ServicesClient'

// Configuração estática de Fallback
// Usada apenas se NÃO existir o arquivo info.txt na pasta do OneDrive.
const baseServicesMetadata: Record<string, Partial<ServiceData>> = {
    'torneamento convencional': {
        heading: 'Torneamento Convencional',
        description: 'Serviços de torneamento convencional para peças unitárias e de pequeno lote.',
    },
    'fresamento cnc': {
        heading: 'Fresamento CNC de Alta Performance',
        description: 'Usinagem de alta precisão.',
    }
}

// Normaliza strings para comparar chaves (ex: "Fresamento CNC" vira "fresamento cnc")
const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export const dynamic = 'force-dynamic'

export default async function Page() {
    // 1. Busca todas as pastas na raiz da Galeria
    const albums = await getAlbums()
    const servicesData: Record<string, ServiceData> = {}

    console.log(`[OneDrive] Processando ${albums.length} pastas...`)

    // 2. Processa cada pasta em paralelo
    await Promise.all(albums.map(async (album) => {
        const serviceKey = album.title;

        // 🚀 Executa 3 buscas simultâneas para máxima velocidade:
        // 1. Itens (Fotos/Vídeos) limitados a 100
        // 2. Metadados do arquivo info.txt
        const [allItems, txtMetadata] = await Promise.all([
            getAlbumItems(album.id, 0, 100),
            getFolderMetadata(album.id)
        ]);

        // Separa vídeos e fotos na memória
        const videos = allItems.filter(item => item.isVideo);
        const photos = allItems.filter(item => !item.isVideo);

        // Tenta achar fallback estático (caso não tenha info.txt)
        const normalizedTitle = normalize(album.title);
        const staticMetaKey = Object.keys(baseServicesMetadata).find(k => normalize(k) === normalizedTitle);
        const staticMeta = staticMetaKey ? baseServicesMetadata[staticMetaKey] : null;

        // --- LÓGICA DE TEXTOS ---
        const title = album.title; // Título da aba = Nome da Pasta

        const heading = txtMetadata?.heading ||
            staticMeta?.heading ||
            album.title;

        const description = txtMetadata?.description ||
            staticMeta?.description ||
            'Galeria de projetos e serviços especializados da Nardelli.';

        // Capabilities (Lista com ✅)
        const capabilities = (txtMetadata?.capabilities && txtMetadata.capabilities.length > 0)
            ? txtMetadata.capabilities
            : (staticMeta?.capabilities || []);


        // --- LÓGICA DE DESTAQUE (Abas vs Ver Mais) ---
        let isFeatured = false;

        if (txtMetadata?.featured !== undefined) {
            // 1. Prioridade Máxima: O que está no info.txt (destaque: sim/nao)
            isFeatured = txtMetadata.featured;
        } else {
            // 2. Automático: Palavras-chave importantes ganham destaque sozinhas
            const nameLower = album.title.toLowerCase();
            if (nameLower.includes('cnc') ||
                nameLower.includes('estrutura') ||
                nameLower.includes('usinagem') ||
                nameLower.includes('caldeiraria')) {
                isFeatured = true;
            }
        }

        // Monta o objeto final do serviço
        servicesData[serviceKey] = {
            key: serviceKey,
            title: title,
            heading: heading,
            description: description,
            capabilities: capabilities,
            albumId: album.id,
            isFeaturedTab: isFeatured, // <--- Passa a decisão para o Front
            videos: [],
            galleryVideos: videos.map(v => ({
                id: v.id,
                src: v.url,
                alt: v.description || v.name,
                width: v.width,
                height: v.height,
                isVideo: true
            })),
            galleryPhotos: photos.map(p => ({
                id: p.id,
                src: p.url,
                alt: p.description || p.name,
                width: p.width,
                height: p.height,
                isVideo: false,
                featured: p.description?.toLowerCase().includes('#destaque')
            }))
        };
    }));

    // Ordenação Alfabética das Chaves (para consistência visual)
    const orderedServicesData: Record<string, ServiceData> = {};
    Object.keys(servicesData).sort().forEach(key => {
        orderedServicesData[key] = servicesData[key];
    });

    // Tratamento de Galeria Vazia
    if (Object.keys(orderedServicesData).length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
                <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-slate-200">
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Galeria Vazia</h1>
                    <p className="text-slate-600">Nenhuma pasta encontrada no OneDrive.</p>
                    <p className="text-xs text-slate-400 mt-4">Verifique se o ID da pasta no .env está correto.</p>
                </div>
            </div>
        )
    }

    return <ServicesClient servicesData={orderedServicesData} />
}