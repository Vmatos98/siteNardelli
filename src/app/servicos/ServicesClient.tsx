'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { getMorePhotos, fetchServiceMedia } from './actions'

// === TIPOS ===
export type GalleryItem = {
    id: string
    src: string
    videoSrc?: string // URL do arquivo de vídeo
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
    isFeaturedTab?: boolean
    loaded?: boolean
    videos: any[]
    galleryVideos: GalleryItem[]
    galleryPhotos: GalleryItem[]
}

type ServicesClientProps = {
    servicesData: Record<string, ServiceData>
}

const VIDEOS_INITIAL_LIMIT = 4

export default function ServicesClient({ servicesData: initialData }: ServicesClientProps) {
    // --- ESTADOS DE DADOS ---
    const [servicesData, setServicesData] = useState(initialData)
    const allKeys = Object.keys(servicesData)
    const mainKeys = allKeys.filter(k => servicesData[k].isFeaturedTab).sort()
    const moreKeys = allKeys.filter(k => !servicesData[k].isFeaturedTab).sort()
    const finalMainKeys = mainKeys.length > 0 ? mainKeys : allKeys.slice(0, 4)
    const finalMoreKeys = mainKeys.length > 0 ? moreKeys : allKeys.slice(4)
    const initialActiveTab = allKeys.find(k => servicesData[k].loaded) || finalMainKeys[0] || allKeys[0] || ''
    const [activeTab, setActiveTab] = useState<string>(initialActiveTab)

    // --- ESTADOS DE UI ---
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const currentService = servicesData[activeTab]
    const [loadingTab, setLoadingTab] = useState(!currentService?.loaded)
    const [photos, setPhotos] = useState<GalleryItem[]>(currentService?.galleryPhotos || [])
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasMorePhotos, setHasMorePhotos] = useState(true)
    const [showAllVideos, setShowAllVideos] = useState(false)

    // 🎥 Estado do Player de Vídeo
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

    // 📷 NOVO: Estado do Lightbox de Imagem (guarda o índice da foto atual)
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

    // --- FUNÇÕES DE NAVEGAÇÃO DO LIGHTBOX ---

    // Funções memoizadas com useCallback para usar no useEffect do teclado
    const handleNextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation() // Evita fechar o modal ao clicar na seta
        setSelectedImageIndex(prev => {
            if (prev === null || photos.length === 0) return null
            // Se for a última, volta para a primeira (loop)
            return prev === photos.length - 1 ? 0 : prev + 1
        })
    }, [photos.length])

    const handlePrevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation()
        setSelectedImageIndex(prev => {
            if (prev === null || photos.length === 0) return null
            // Se for a primeira, vai para a última (loop)
            return prev === 0 ? photos.length - 1 : prev - 1
        })
    }, [photos.length])


    // --- EFEITOS ---

    // Fecha dropdown click fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsDropdownOpen(false)
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // ⌨️ NOVO: Navegação por Teclado no Lightbox
    useEffect(() => {
        if (selectedImageIndex === null) return

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') setSelectedImageIndex(null)
            if (event.key === 'ArrowRight') handleNextImage()
            if (event.key === 'ArrowLeft') handlePrevImage()
        }

        document.addEventListener('keydown', handleKeyDown)
        // Remove o listener quando o modal fecha ou o índice muda
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [selectedImageIndex, handleNextImage, handlePrevImage])


    // Prefetch (Busca em segundo plano)
    useEffect(() => {
        const prefetchFeaturedTabs = async () => {
            const tabsToFetch = finalMainKeys.filter(key => key !== activeTab && !servicesData[key].loaded)
            if (tabsToFetch.length === 0) return
            for (const key of tabsToFetch) {
                const service = servicesData[key]
                if (!service.albumId) continue
                try {
                    const { videos, photos } = await fetchServiceMedia(service.albumId)
                    setServicesData(prev => ({ ...prev, [key]: { ...prev[key], loaded: true, galleryVideos: videos, galleryPhotos: photos } }))
                } catch (err) { console.warn(err) }
            }
        }
        const timer = setTimeout(() => { prefetchFeaturedTabs() }, 2000)
        return () => clearTimeout(timer)
    }, [])

    // Carrega aba atual (Zero-Blocking)
    useEffect(() => {
        if (!currentService) return
        const loadTabMedia = async () => {
            if (currentService.loaded) {
                setPhotos(currentService.galleryPhotos || [])
                setHasMorePhotos(true)
                setShowAllVideos(false)
                setLoadingTab(false)
                return
            }
            setLoadingTab(true)
            try {
                const { videos, photos } = await fetchServiceMedia(currentService.albumId || '')
                setServicesData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], loaded: true, galleryVideos: videos, galleryPhotos: photos } }))
                setPhotos(photos)
                setHasMorePhotos(true)
                setShowAllVideos(false)
            } catch (error) { console.error("Erro ao carregar aba:", error) } finally { setLoadingTab(false) }
        }
        loadTabMedia()
    }, [activeTab])

    const handleLoadMorePhotos = async () => {
        if (!currentService?.albumId) return
        setLoadingMore(true)
        try {
            const newPhotos = await getMorePhotos(currentService.albumId, photos.length)
            if (newPhotos.length === 0) setHasMorePhotos(false)
            else {
                const mapped = newPhotos.map(item => ({ id: item.id, src: item.url, alt: item.description || currentService.title, width: item.width, height: item.height, isVideo: false }))
                setPhotos(prev => [...prev, ...mapped])
                if (newPhotos.length < 50) setHasMorePhotos(false)
            }
        } finally { setLoadingMore(false) }
    }

    if (!currentService) return null
    const isMoreActive = finalMoreKeys.includes(activeTab)

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">

            {/* 🎥 MODAL DE VÍDEO */}
            {selectedVideo && (
                <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm" onClick={() => setSelectedVideo(null)}>
                    <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 text-white/70 hover:text-white z-50 p-2 bg-black/20 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <div className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <video src={selectedVideo} controls autoPlay className="w-full h-full object-contain" />
                    </div>
                </div>
            )}

            {/* 📷 NOVO: MODAL DE IMAGEM (LIGHTBOX) */}
            {selectedImageIndex !== null && photos[selectedImageIndex] && (
                <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm select-none" onClick={() => setSelectedImageIndex(null)}>

                    {/* Botão Fechar */}
                    <button onClick={() => setSelectedImageIndex(null)} className="absolute top-4 right-4 z-50 text-white/70 hover:text-white p-3 bg-black/20 hover:bg-black/40 rounded-full transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>

                    {/* Seta Anterior (só mostra se tiver mais de 1 foto) */}
                    {photos.length > 1 && (
                        <button onClick={handlePrevImage} className="absolute left-4 z-50 p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all hidden md:block">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                    )}

                    {/* Container da Imagem Principal */}
                    <div className="relative w-full h-full max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={photos[selectedImageIndex].src}
                            alt={photos[selectedImageIndex].alt}
                            fill
                            className="object-contain animate-fade-in-fast"
                            priority // Prioridade alta para carregar rápido no modal
                            sizes="(max-width: 1280px) 100vw, 1280px"
                        />
                        {/* Legenda Opcional */}
                        {photos[selectedImageIndex].alt && (
                            <p className="absolute bottom-0 left-0 right-0 text-center text-white/90 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                {photos[selectedImageIndex].alt}
                            </p>
                        )}
                    </div>

                    {/* Seta Próxima */}
                    {photos.length > 1 && (
                        <button onClick={handleNextImage} className="absolute right-4 z-50 p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all hidden md:block">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    )}
                    {/* Contador mobile */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm md:hidden font-medium bg-black/30 px-3 py-1 rounded-full">
                        {selectedImageIndex + 1} / {photos.length}
                    </div>
                </div>
            )}


            {/* HERO */}
            <section className="bg-slate-900 pt-32 pb-16 px-6 relative overflow-hidden transition-all duration-500">
                <div className="absolute inset-0 bg-slate-800 opacity-50"></div>
                <div className="container mx-auto relative z-10 text-center animate-fade-in" key={currentService.key}>
                    <span className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-3 block">
                        {currentService.isFeaturedTab ? 'Destaque' : 'Serviço'}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        {currentService.heading}
                    </h1>
                    <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
                        {currentService.description}
                    </p>
                </div>
            </section>

            {/* ABAS (Mantido igual) */}
            <div className="sticky top-[72px] z-40 bg-white border-b border-slate-200 shadow-sm">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-center gap-6 py-4 flex-wrap">
                        {finalMainKeys.map((key) => (
                            <button key={key} onClick={() => setActiveTab(key)} className={`transition-all whitespace-nowrap pb-1 text-sm md:text-base font-medium ${activeTab === key ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-500 hover:text-slate-800'}`}>
                                {servicesData[key].title}
                            </button>
                        ))}
                        {finalMoreKeys.length > 0 && (
                            <div className="relative" ref={dropdownRef}>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`flex items-center gap-1 transition-all whitespace-nowrap pb-1 text-sm md:text-base font-medium ${isDropdownOpen || isMoreActive ? 'text-orange-600' : 'text-slate-500 hover:text-slate-800'}`}>
                                    Ver Mais <span className="text-xs">▼</span>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden animate-fade-in z-50">
                                        <div className="py-1">
                                            {finalMoreKeys.map((key) => (
                                                <button key={key} onClick={() => { setActiveTab(key); setIsDropdownOpen(false) }} className={`block w-full text-left px-4 py-3 text-sm transition-colors ${activeTab === key ? 'bg-orange-50 text-orange-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}>
                                                    {servicesData[key].title}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CONTEÚDO PRINCIPAL */}
            <main className="flex-grow py-12 container mx-auto px-6">

                {loadingTab ? (
                    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-500 font-medium">Carregando galeria...</p>
                    </div>
                ) : (
                    <div className="animate-fade-in" key={activeTab}>

                        {/* Capabilities */}
                        {currentService.capabilities && currentService.capabilities.length > 0 && (
                            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-5xl mx-auto mb-16">
                                <h3 className="font-bold text-slate-900 mb-6 text-center text-xl">Capacidades Técnicas</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {currentService.capabilities.map((cap, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                                            <span className="text-green-500 font-bold">✓</span>
                                            <span className="text-slate-700 text-sm font-medium">{cap}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 text-center">
                                    <a href="/orcamento" className="inline-block px-8 py-3 bg-slate-900 text-white font-semibold rounded hover:bg-slate-800 transition-all">Solicitar Orçamento →</a>
                                </div>
                            </div>
                        )}

                        {/* Videos */}
                        {(currentService.galleryVideos && currentService.galleryVideos.length > 0) && (
                            <div className="border-t border-slate-200 pt-10 mb-12">
                                <div className="flex items-center justify-between gap-3 mb-6">
                                    <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><span className="text-orange-600">►</span> Vídeos</h3>
                                    {currentService.galleryVideos.length > VIDEOS_INITIAL_LIMIT && (
                                        <button onClick={() => setShowAllVideos(!showAllVideos)} className="text-orange-600 font-semibold hover:underline">{showAllVideos ? 'Ver Menos' : 'Ver Todos'}</button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {(showAllVideos ? currentService.galleryVideos : currentService.galleryVideos.slice(0, VIDEOS_INITIAL_LIMIT)).map((video, index) => (
                                        <div key={index} onClick={() => setSelectedVideo(video.videoSrc || video.src)} className="group relative h-[250px] rounded-xl overflow-hidden bg-black shadow-md cursor-pointer hover:shadow-xl transition-all">
                                            <Image src={video.src} alt={video.alt} fill className="object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform"><span className="ml-1">▶</span></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 📷 FOTOS (Com clique para abrir o Lightbox) */}
                        {photos && photos.length > 0 && (
                            <div className="border-t border-slate-200 pt-10">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2"><span className="text-slate-500">📷</span> Galeria</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                                    {photos.map((photo, index) => (
                                        <div
                                            key={index}
                                            // MUDANÇA AQUI: Ao clicar, define o índice da imagem
                                            onClick={() => setSelectedImageIndex(index)}
                                            className="relative h-64 rounded-xl overflow-hidden bg-slate-200 shadow-md group cursor-pointer hover:shadow-xl transition-all"
                                        >
                                            <Image src={photo.src} alt={photo.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                            {/* Ícone de ampliar */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="bg-black/50 p-3 rounded-full text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {currentService.albumId && hasMorePhotos && (
                                    <div className="text-center mt-8">
                                        <button onClick={handleLoadMorePhotos} disabled={loadingMore} className="px-6 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 disabled:opacity-50">{loadingMore ? 'Carregando...' : 'Carregar Mais Fotos ↓'}</button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Fallback Vazio */}
                        {(!currentService.galleryVideos?.length && !photos?.length) && (
                            <div className="text-center p-12 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 mt-8">
                                <p className="text-slate-500">Conteúdo visual será adicionado em breve.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}