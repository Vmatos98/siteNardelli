import { getAlbums, getFolderMetadata } from '@/lib/onedrive'
import ServicesClient, { ServiceData } from './ServicesClient'

// Configuração estática de Fallback
// Usada apenas se o OneDrive não tiver o arquivo !info.txt e precisarmos de um texto padrão.
const baseServicesMetadata: Record<string, Partial<ServiceData>> = {
    'torneamento convencional': {
        heading: 'Torneamento Convencional',
        description: 'Serviços de torneamento convencional para peças unitárias e de pequeno lote.',
    },
    'fresamento cnc': {
        heading: 'Fresamento CNC de Alta Performance',
        description: 'Usinagem de alta precisão com centros de usinagem modernos.',
    }
}

// Normaliza strings para comparar chaves (ex: "Fresamento CNC" vira "fresamento cnc")
const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export const dynamic = 'force-dynamic'

export default async function Page() {
    // 1. Busca apenas a lista de pastas (Muito Rápido)
    const albums = await getAlbums()
    // Filtro para não exibir a pasta Estrutura na tela de Serviços
    const filteredAlbums = albums.filter(album => album.title.toLowerCase() !== 'estrutura')
    const servicesData: Record<string, ServiceData> = {}

    console.log(`[OneDrive] Listando ${filteredAlbums.length} pastas (Modo Zero-Blocking)...`)

    // 2. Busca apenas os textos (!info.txt) em paralelo
    // Não buscamos fotos aqui para a página abrir instantaneamente.
    const albumsWithMeta = await Promise.all(filteredAlbums.map(async (album) => {
        const txtMetadata = await getFolderMetadata(album.id);
        return { album, txtMetadata };
    }));

    // 3. Monta o objeto leve (Tudo loaded: false)
    albumsWithMeta.forEach(({ album, txtMetadata }) => {
        const serviceKey = album.title;

        // --- LÓGICA DE TEXTOS ---
        const normalizedTitle = normalize(album.title);
        const staticMetaKey = Object.keys(baseServicesMetadata).find(k => normalize(k) === normalizedTitle);
        const staticMeta = staticMetaKey ? baseServicesMetadata[staticMetaKey] : null;

        // Prioridade: info.txt > staticMeta > Nome da Pasta
        const heading = txtMetadata?.heading || staticMeta?.heading || album.title;
        const description = txtMetadata?.description || staticMeta?.description || 'Galeria de projetos e serviços da Nardelli.';

        // Capabilities (Lista com ✅)
        const capabilities = (txtMetadata?.capabilities && txtMetadata.capabilities.length > 0)
            ? txtMetadata.capabilities
            : (staticMeta?.capabilities || []);

        // --- LÓGICA DE DESTAQUE ---
        let isFeatured = false;
        if (txtMetadata?.featured !== undefined) {
            isFeatured = txtMetadata.featured;
        } else {
            // Regra automática se não tiver info.txt
            const nameLower = album.title.toLowerCase();
            if (nameLower.includes('cnc') || nameLower.includes('estrutura') || nameLower.includes('usinagem')) {
                isFeatured = true;
            }
        }

        servicesData[serviceKey] = {
            key: serviceKey,
            title: album.title,
            heading: heading,
            description: description,
            capabilities: capabilities,
            albumId: album.id,
            isFeaturedTab: isFeatured,

            // O SEGREDO DO ZERO-BLOCKING:
            // Mandamos tudo vazio e "não carregado".
            // O cliente vai ver isso e chamar a 'action' fetchServiceMedia imediatamente.
            loaded: false,
            videos: [],
            galleryVideos: [],
            galleryPhotos: []
        };
    });

    // Ordenação Alfabética das Chaves
    const orderedServicesData: Record<string, ServiceData> = {};
    Object.keys(servicesData).sort().forEach(key => {
        orderedServicesData[key] = servicesData[key];
    });

    // Tratamento de Galeria Vazia
    if (Object.keys(orderedServicesData).length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
                <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-slate-200">
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Sincronizando Galeria...</h1>
                    <p className="text-slate-600">Nenhuma pasta encontrada no OneDrive ainda.</p>
                </div>
            </div>
        )
    }

    return <ServicesClient servicesData={orderedServicesData} />
}