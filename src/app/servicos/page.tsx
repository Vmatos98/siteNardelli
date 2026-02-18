import { getAlbums, getAlbumItems } from '@/lib/onedrive' // Verifique o nome do arquivo se é onedrive ou onedrivePublic
import ServicesClient, { ServiceData } from './ServicesClient'

// Configuração estática APENAS para textos e descrições.
// Não define mais quais abas aparecem. Quem define isso é o OneDrive.
const baseServicesMetadata: Record<string, Partial<ServiceData>> = {
    'torneamento convencional': {
        heading: 'Torneamento Convencional',
        description: 'Serviços de torneamento convencional para peças unitárias e de pequeno lote.',
        capabilities: []
    },
    'fresamento': {
        heading: 'Fresamento',
        description: 'Fresamento de peças com precisão e qualidade.',
    },
    'fresamento cnc': {
        heading: 'Fresamento CNC de Alta Performance',
        description: 'Centros de usinagem de última geração.',
        capabilities: ['Usinagem 3D', 'Eixo 4', 'Precisão milesimal']
    },
    // Adicione os outros aqui... se uma pasta nova aparecer no OneDrive e não estiver aqui,
    // o site vai usar o nome da pasta como título e descrição genérica.
}

// Normaliza strings para comparar "Torneamento CNC" com "torneamento cnc"
const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export const dynamic = 'force-dynamic'

export default async function Page() {
    // 1. A Fonte da Verdade são as pastas do OneDrive
    const albums = await getAlbums()
    const servicesData: Record<string, ServiceData> = {}

    console.log(`[OneDrive] Pastas encontradas: ${albums.length}`)

    // 2. Para cada pasta encontrada, criamos os dados do serviço
    for (const album of albums) {
        const normalizedTitle = normalize(album.title);

        // Tenta achar textos bonitos no nosso dicionário estático
        // Procura pela chave ou pelo título
        const matchedKey = Object.keys(baseServicesMetadata).find(key => normalize(key) === normalizedTitle);
        const metadata = matchedKey ? baseServicesMetadata[matchedKey] : null;

        // A chave do serviço será o nome da pasta normalizado (sem espaços)
        const serviceKey = album.title;

        // 3. Busca TUDO da pasta de uma vez (Eficiência)
        const allItems = await getAlbumItems(album.id, 0, 100);

        // 4. Separa na memória (Sem fazer 2 requisições)
        const videos = allItems.filter(item => item.isVideo);
        const photos = allItems.filter(item => !item.isVideo);

        servicesData[serviceKey] = {
            key: serviceKey,
            title: album.title, // Nome da pasta
            heading: metadata?.heading || album.title,
            description: metadata?.description || 'Confira nossa galeria de projetos recentes.',
            capabilities: metadata?.capabilities || [],
            albumId: album.id,
            videos: [], // Legado, deixamos vazio
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
    }

    // Se não tiver nada no OneDrive (Erro ou vazio), mostra mensagem ou fallback
    if (Object.keys(servicesData).length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-800">Galeria Sincronizando...</h1>
                    <p className="text-slate-600">Nenhuma pasta encontrada no OneDrive ainda.</p>
                </div>
            </div>
        )
    }

    return <ServicesClient servicesData={servicesData} />
}