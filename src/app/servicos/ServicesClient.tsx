'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { getMorePhotos } from './actions'

// Tipos
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
    isFeaturedTab?: boolean // Novo campo
    videos: any[]
    galleryVideos: GalleryItem[]
    galleryPhotos: GalleryItem[]
}

type ServicesClientProps = {
    servicesData: Record<string, ServiceData>
}

const VIDEOS_INITIAL_LIMIT = 4

export default function ServicesClient({ servicesData }: ServicesClientProps) {
    const allKeys = Object.keys(servicesData)

    // Separa quem é Principal e quem é "Ver Mais"
    // Ordena alfabeticamente para ficar bonitinho
    const mainKeys = allKeys.filter(k => servicesData[k].isFeaturedTab).sort()
    const moreKeys = allKeys.filter(k => !servicesData[k].isFeaturedTab).sort()

    // Se não tiver nenhum destaque definido (caso raro), pega os 4 primeiros
    const finalMainKeys = mainKeys.length > 0 ? mainKeys : allKeys.slice(0, 4)
    const finalMoreKeys = mainKeys.length > 0 ? moreKeys : allKeys.slice(4)

    // Estado inicial: Primeiro destaque ou primeiro da lista geral
    const [activeTab, setActiveTab] = useState<string>(finalMainKeys[0] || allKeys[0] || '')

    // Estado do Dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const [photos, setPhotos] = useState<GalleryItem[]>([])
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasMorePhotos, setHasMorePhotos] = useState(true)
    const [showAllVideos, setShowAllVideos] = useState(false)

    const currentService = servicesData[activeTab]

    // Fecha dropdown se clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    useEffect(() => {
        if (currentService) {
            setPhotos(currentService.galleryPhotos || [])
            setHasMorePhotos(true)
            setShowAllVideos(false)
        }
    }, [activeTab, currentService])

    const handleLoadMorePhotos = async () => {
        if (!currentService?.albumId) return
        setLoadingMore(true)
        try {
            const newPhotos = await getMorePhotos(currentService.albumId, photos.length)
            if (newPhotos.length === 0) {
                setHasMorePhotos(false)
            } else {
                const mappedPhotos = newPhotos.map(item => ({
                    id: item.id,
                    src: item.url,
                    alt: item.description || currentService.title,
                    width: item.width,
                    height: item.height,
                    isVideo: false
                }))
                setPhotos(prev => [...prev, ...mappedPhotos])
                if (newPhotos.length < 50) setHasMorePhotos(false)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingMore(false)
        }
    }

    if (!currentService) return null

    const videosDisplay = showAllVideos
        ? currentService.galleryVideos
        : currentService.galleryVideos.slice(0, VIDEOS_INITIAL_LIMIT)

    // Verifica se a aba ativa está dentro do menu "Ver Mais" (para pintar o botão de laranja)
    const isMoreActive = finalMoreKeys.includes(activeTab)

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* HERO */}
            <section className="bg-slate-900 pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-800 opacity-50"></div>
                <div className="container mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nossos Serviços</h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        Tecnologia de ponta e expertise técnica.
                    </p>
                </div>
            </section>

            {/* ABAS LIMPAS + MENU DROPDOWN */}
            <div className="sticky top-[72px] z-40 bg-white border-b border-slate-200 shadow-sm">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-center gap-6 py-4 flex-wrap">

                        {/* 1. Abas Principais (Destaque) */}
                        {finalMainKeys.map((key) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`transition-all whitespace-nowrap pb-1 text-sm md:text-base font-medium ${activeTab === key
                                    ? 'text-orange-600 border-b-2 border-orange-600'
                                    : 'text-slate-500 hover:text-slate-800'
                                    }`}
                            >
                                {servicesData[key].title}
                            </button>
                        ))}

                        {/* 2. Botão "Ver Mais" (Se houver itens extras) */}
                        {finalMoreKeys.length > 0 && (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className={`flex items-center gap-1 transition-all whitespace-nowrap pb-1 text-sm md:text-base font-medium ${isDropdownOpen || isMoreActive
                                        ? 'text-orange-600'
                                        : 'text-slate-500 hover:text-slate-800'
                                        }`}
                                >
                                    Ver Mais
                                    <span className="text-xs">▼</span>
                                </button>

                                {/* O Menu Suspenso */}
                                {isDropdownOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden animate-fade-in z-50">
                                        <div className="py-1">
                                            {finalMoreKeys.map((key) => (
                                                <button
                                                    key={key}
                                                    onClick={() => {
                                                        setActiveTab(key)
                                                        setIsDropdownOpen(false)
                                                    }}
                                                    className={`block w-full text-left px-4 py-3 text-sm transition-colors ${activeTab === key
                                                        ? 'bg-orange-50 text-orange-700 font-semibold'
                                                        : 'text-slate-600 hover:bg-slate-50'
                                                        }`}
                                                >
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

            {/* CONTEÚDO (MANTIDO IGUAL) */}
            <main className="flex-grow py-12 container mx-auto px-6">
                <div className="animate-fade-in" key={activeTab}>

                    {/* Header do Serviço */}
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

                    {/* Capabilities */}
                    {currentService.capabilities && currentService.capabilities.length > 0 && (
                        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-5xl mx-auto mb-16">
                            <h3 className="font-bold text-slate-900 mb-6 text-center text-xl">
                                Capacidades Técnicas
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {currentService.capabilities.map((cap, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                                        <span className="text-green-500 font-bold">✓</span>
                                        <span className="text-slate-700 text-sm font-medium">{cap}</span>
                                    </div>
                                ))}
                            </div>
                            {/* <div className="mt-8 text-center">
                                <a href="/orcamento" className="inline-block px-8 py-3 bg-slate-900 text-white font-semibold rounded hover:bg-slate-800 transition-all">
                                    Solicitar Orçamento →
                                </a>
                            </div> */}
                        </div>
                    )}

                    {/* Vídeos */}
                    {(currentService.galleryVideos && currentService.galleryVideos.length > 0) && (
                        <div className="border-t border-slate-200 pt-10 mb-12">
                            <div className="flex items-center justify-between gap-3 mb-6">
                                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    <span className="text-orange-600">►</span> Vídeos
                                </h3>
                                {currentService.galleryVideos.length > VIDEOS_INITIAL_LIMIT && (
                                    <button onClick={() => setShowAllVideos(!showAllVideos)} className="text-orange-600 font-semibold hover:underline">
                                        {showAllVideos ? 'Ver Menos' : 'Ver Todos'}
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {videosDisplay.map((video, index) => (
                                    <div key={index} className="group relative h-[250px] rounded-xl overflow-hidden bg-black shadow-md">
                                        <Image src={video.src} alt={video.alt} fill className="object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                                ▶
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Fotos */}
                    {photos && photos.length > 0 && (
                        <div className="border-t border-slate-200 pt-10">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="text-slate-500">📷</span> Galeria
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                                {photos.map((photo, index) => (
                                    <div key={index} className="relative h-64 rounded-xl overflow-hidden bg-slate-200 shadow-md group">
                                        <Image src={photo.src} alt={photo.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                    </div>
                                ))}
                            </div>
                            {currentService.albumId && hasMorePhotos && (
                                <div className="text-center mt-8">
                                    <button onClick={handleLoadMorePhotos} disabled={loadingMore} className="px-6 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 disabled:opacity-50">
                                        {loadingMore ? 'Carregando...' : 'Carregar Mais Fotos ↓'}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}