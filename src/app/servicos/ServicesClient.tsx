'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getMorePhotos } from './actions'

// Type definition for the data passed from server
export type GalleryItem = {
    id: string
    src: string
    alt: string
    width: number
    height: number
    featured?: boolean
    isVideo?: boolean
}

export type ServiceData = {
    key: string
    title: string
    heading: string
    description: string
    capabilities: string[]
    albumId?: string
    // Videos from static config (legacy) or OneDrive
    videos: {
        title: string
        description: string
        image: string // generic placeholder
        fallbackImage: string
    }[]
    galleryVideos: GalleryItem[]
    galleryPhotos: GalleryItem[]
}

type ServicesClientProps = {
    servicesData: Record<string, ServiceData>
}

const VIDEOS_INITIAL_LIMIT = 4

export default function ServicesClient({ servicesData }: ServicesClientProps) {
    const serviceKeys = Object.keys(servicesData)
    const [activeTab, setActiveTab] = useState<string>(serviceKeys[0] || '')

    // State for Photos Pagination
    const [photos, setPhotos] = useState<GalleryItem[]>([])
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasMorePhotos, setHasMorePhotos] = useState(true)

    // State for Videos Expansion
    const [showAllVideos, setShowAllVideos] = useState(false)

    const currentService = servicesData[activeTab] || servicesData[serviceKeys[0]]

    // Guard against empty data
    if (!currentService) {
        return (
            <div className="flex flex-col min-h-screen bg-slate-50 pt-32 text-center">
                <h1 className="text-2xl font-bold text-slate-800">Nenhum serviço encontrado.</h1>
                <p className="text-slate-600">Verifique a conexão com a galeria.</p>
            </div>
        )
    }

    // Reset state when tab changes
    useEffect(() => {
        setPhotos(currentService.galleryPhotos || [])
        setHasMorePhotos(true) // Reset assumption, ideally we'd know from server but generic is fine for now
        setShowAllVideos(false)
    }, [activeTab, currentService])

    const handleLoadMorePhotos = async () => {
        if (!currentService.albumId) return

        setLoadingMore(true)
        try {
            const newPhotos = await getMorePhotos(currentService.albumId, photos.length)

            if (newPhotos.length === 0) {
                setHasMorePhotos(false)
            } else {
                const mappedPhotos: GalleryItem[] = newPhotos.map(item => ({
                    id: item.id,
                    src: item.url,
                    alt: item.description || currentService.title,
                    width: item.width,
                    height: item.height,
                    featured: false, // Pagination items rarely featured
                    isVideo: false
                }))
                setPhotos(prev => [...prev, ...mappedPhotos])
                if (newPhotos.length < 50) setHasMorePhotos(false) // If less than page size, we reached end
            }
        } catch (error) {
            console.error("Failed to load more photos", error)
        } finally {
            setLoadingMore(false)
        }
    }

    const videosDisplay = showAllVideos
        ? currentService.galleryVideos
        : currentService.galleryVideos.slice(0, VIDEOS_INITIAL_LIMIT)

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">

            {/* HERO SECTION */}
            <section className="bg-slate-900 pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-800 opacity-50"></div>
                <div className="container mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nossos Serviços</h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        Tecnologia de ponta e expertise técnica para entregar soluções em usinagem de alta complexidade.
                    </p>
                </div>
            </section>

            {/* TABS NAVIGATION */}
            <div className="sticky top-[72px] z-40 bg-white border-b border-slate-200 shadow-sm">
                <div className="container mx-auto px-6">
                    <div className="flex gap-8 overflow-x-auto md:justify-center py-4 no-scrollbar">
                        {Object.keys(servicesData).map((key) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`transition-all whitespace-nowrap pb-2 ${activeTab === key
                                    ? 'text-orange-600 font-bold border-b-2 border-orange-600'
                                    : 'text-slate-500 hover:text-slate-800'
                                    }`}
                            >
                                {servicesData[key].title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <main className="flex-grow py-12 container mx-auto px-6">
                <div className="animate-fade-in key={activeTab}">
                    {/* HEADER: Description */}
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <span className="text-orange-600 font-bold uppercase tracking-wider text-sm mb-2 block">
                            {currentService.title}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            {currentService.heading}
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed mb-8">
                            {currentService.description}
                        </p>
                    </div>

                    {/* CAPABILITIES (Only if available) */}
                    {currentService.capabilities && currentService.capabilities.length > 0 && (
                        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-5xl mx-auto mb-16">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center justify-center gap-2 text-xl">
                                Capacidades Técnicas
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                                {currentService.capabilities.map((cap, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span className="text-slate-700 text-sm font-medium">{cap}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 text-center">
                                <a href="/orcamento"
                                    className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white font-semibold rounded hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-400/50">
                                    Solicitar Orçamento
                                    <span>→</span>
                                </a>
                            </div>
                        </div>
                    )}

                    {/* === VIDEOS SECTION === */}
                    {/* First check static videos (legacy - remove if not needed, but keeping for safety) */}
                    {/* Then check dynamic galleryVideos */}
                    {(currentService.galleryVideos && currentService.galleryVideos.length > 0) && (
                        <div className="border-t border-slate-200 pt-10 mb-12">
                            <div className="flex items-center justify-between gap-3 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                        <span>►</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">Vídeos</h3>
                                </div>
                                {currentService.galleryVideos.length > VIDEOS_INITIAL_LIMIT && (
                                    <button
                                        onClick={() => setShowAllVideos(!showAllVideos)}
                                        className="text-orange-600 font-semibold hover:text-orange-800 transition-colors"
                                    >
                                        {showAllVideos ? 'Ver Menos' : 'Ver Todos'}
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {videosDisplay.map((video, index) => (
                                    <div key={index} className="group relative h-[250px] rounded-xl overflow-hidden cursor-pointer bg-slate-900 shadow-md border border-slate-200">
                                        <Image
                                            src={video.src}
                                            alt={video.alt}
                                            fill
                                            className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center z-10">
                                            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white/20 backdrop-blur-sm transform transition-transform group-hover:scale-110">
                                                <span className="text-lg ml-1">▶</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* === PHOTOS SECTION === */}
                    {photos && photos.length > 0 && (
                        <div className="border-t border-slate-200 pt-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-700">
                                    <span>📷</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">Galeria de Fotos</h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                                {photos.map((photo, index) => (
                                    <div key={index} className={`group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-md bg-slate-100`}>
                                        <Image
                                            src={photo.src}
                                            alt={photo.alt}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white font-medium text-sm backdrop-blur-sm px-3 py-1 rounded-full bg-white/20 border border-white/30">
                                                Ampliar
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* LOAD MORE BUTTON */}
                            {currentService.albumId && hasMorePhotos && (
                                <div className="text-center mt-8">
                                    <button
                                        onClick={handleLoadMorePhotos}
                                        disabled={loadingMore}
                                        className="inline-flex items-center gap-2 px-6 py-2 bg-slate-100 text-slate-700 font-semibold rounded-full hover:bg-slate-200 transition-colors disabled:opacity-50"
                                    >
                                        {loadingMore ? 'Carregando...' : 'Carregar Mais Fotos'}
                                        {!loadingMore && <span>↓</span>}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Placeholder for other services if empty */}
                    {(!currentService.galleryVideos || currentService.galleryVideos.length === 0) && (!photos || photos.length === 0) && (
                        <div className="text-center p-12 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300">
                            <p className="text-slate-500">Conteúdo visual (Fotos e Vídeos) será adicionado em breve.</p>
                        </div>
                    )}

                </div>
            </main>
        </div>
    )
}

