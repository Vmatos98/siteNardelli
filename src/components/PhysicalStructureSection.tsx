'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { getEstruturaPhotos } from '@/app/estrutura/actions'

interface PhysicalStructureProps {
    title: string
    subtitle: string
}

export type StructuralGalleryItem = {
    id: string
    src: string
    alt: string
    width: number
    height: number
}

export function PhysicalStructureSection({ title, subtitle }: PhysicalStructureProps) {
    const [photos, setPhotos] = useState<StructuralGalleryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

    const [activeSlideIndex, setActiveSlideIndex] = useState(0)

    useEffect(() => {
        async function fetchPhotos() {
            setLoading(true)
            try {
                const fetchedPhotos = await getEstruturaPhotos()
                setPhotos(fetchedPhotos)
            } catch (error) {
                console.error("Erro ao carregar fotos da estrutura:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchPhotos()
    }, [])

    const handleNextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation()
        setSelectedImageIndex(prev => (prev === null || photos.length === 0) ? null : (prev === photos.length - 1 ? 0 : prev + 1))
    }, [photos.length])

    const handlePrevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation()
        setSelectedImageIndex(prev => (prev === null || photos.length === 0) ? null : (prev === 0 ? photos.length - 1 : prev - 1))
    }, [photos.length])

    useEffect(() => {
        if (selectedImageIndex === null) return
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') setSelectedImageIndex(null)
            if (event.key === 'ArrowRight') handleNextImage()
            if (event.key === 'ArrowLeft') handlePrevImage()
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [selectedImageIndex, handleNextImage, handlePrevImage])

    return (
        <section className="w-full bg-slate-900 py-20 text-white mt-12 rounded-3xl overflow-hidden shadow-2xl relative">
            {/* Background Decorativo */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>

            {/* 📷 MODAL DE IMAGEM (LIGHTBOX) */}
            {selectedImageIndex !== null && photos[selectedImageIndex] && (
                <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm select-none" onClick={() => setSelectedImageIndex(null)}>
                    <button onClick={() => setSelectedImageIndex(null)} className="absolute top-4 right-4 z-50 text-white/70 hover:text-white p-3 bg-black/20 hover:bg-black/40 rounded-full transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    {photos.length > 1 && (
                        <button onClick={handlePrevImage} className="absolute left-4 z-50 p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all hidden md:block">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                    )}
                    <div className="relative w-full h-full max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={photos[selectedImageIndex].src}
                            alt={photos[selectedImageIndex].alt}
                            fill
                            className="object-contain animate-fade-in-fast"
                            priority
                            sizes="(max-width: 1280px) 100vw, 1280px"
                            unoptimized={photos[selectedImageIndex].src.startsWith('http')}
                        />
                        {photos[selectedImageIndex].alt && (
                            <p className="absolute bottom-0 left-0 right-0 text-center text-white/90 p-4 bg-gradient-to-t from-black/80 to-transparent">{photos[selectedImageIndex].alt}</p>
                        )}
                    </div>
                    {photos.length > 1 && (
                        <button onClick={handleNextImage} className="absolute right-4 z-50 p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all hidden md:block">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    )}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm md:hidden font-medium bg-black/30 px-3 py-1 rounded-full">
                        {selectedImageIndex + 1} / {photos.length}
                    </div>
                </div>
            )}

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4 block">
                        Infraestrutura
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
                    <p className="text-lg text-slate-300 leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                {/* Galeria em formato Slideshow */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-500 font-medium">Carregando galeria da estrutura...</p>
                    </div>
                ) : photos.length > 0 ? (
                    <div className="animate-fade-in max-w-5xl mx-auto">
                        {/* Imagem Principal */}
                        <div
                            className="relative w-full aspect-video md:aspect-[21/9] bg-slate-800 rounded-2xl overflow-hidden shadow-2xl mb-6 cursor-pointer group"
                            onClick={() => setSelectedImageIndex(activeSlideIndex)}
                        >
                            <Image
                                src={photos[activeSlideIndex].src}
                                alt={photos[activeSlideIndex].alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                unoptimized={photos[activeSlideIndex].src.startsWith('http')}
                                priority
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            {/* Ícone de ampliar */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-black/60 p-4 rounded-full text-white backdrop-blur-md transform scale-90 group-hover:scale-100 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                                </div>
                            </div>

                            {/* Setas overlay na imagem principal */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setActiveSlideIndex(prev => prev === 0 ? photos.length - 1 : prev - 1); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-orange-600 text-white rounded-full backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); setActiveSlideIndex(prev => prev === photos.length - 1 ? 0 : prev + 1); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-orange-600 text-white rounded-full backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                        </div>

                        {/* Miniaturas */}
                        <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
                            {photos.map((photo, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveSlideIndex(index)}
                                    className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden snap-center transition-all duration-300 ${activeSlideIndex === index ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-slate-900 scale-100 opacity-100' : 'opacity-50 hover:opacity-100 scale-95'}`}
                                >
                                    <Image
                                        src={photo.src}
                                        alt={photo.alt}
                                        fill
                                        className="object-cover"
                                        unoptimized={photo.src.startsWith('http')}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </section>
    )
}