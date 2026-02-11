'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link } from 'lucide-react'

// Tab Data Configuration
const services = {
    fresamento: {
        title: 'Fresamento CNC',
        heading: 'Fresamento CNC de Alta Performance',
        description: `Nossa divisão de fresamento conta com centros de usinagem de última geração, capazes de executar peças com geometrias complexas e tolerâncias rigorosas. Atendemos desde protótipos até grandes lotes de produção, garantindo precisão milesimal em cada detalhe.`,
        capabilities: [
            'Usinagem 3D de superfícies complexas',
            'Eixo 4 para peças rotativas',
            'Materiais: Aço, Alumínio, Inox e Latão',
            'Precisão de até 0.01mm'
        ],
        videos: [
            {
                title: 'Processo de Fresamento 5 Eixos',
                description: 'Demonstração de usinagem complexa em alumínio aeronáutico.',
                image: '/assets/video-placeholder.jpg', // Placeholder - user needs to provide actual assets
                fallbackImage: 'https://images.unsplash.com/photo-1531297461136-82lw8e2d48?auto=format&fit=crop&w=800&q=80'
            },
            {
                title: 'Usinagem de Moldes',
                description: 'Acabamento superficial de alta precisão.',
                image: '/assets/video-placeholder-2.jpg', // Placeholder
                fallbackImage: 'https://images.unsplash.com/photo-1612648704259-2b62241e0640?auto=format&fit=crop&w=800&q=80'
            }
        ],
        gallery: [
            // Using generic industrial images from Unsplash for placeholders
            { src: 'https://images.unsplash.com/photo-1622671302829-0835f87b8d8e?q=80&w=1000&auto=format&fit=crop', alt: 'Peça Fresada', featured: true },
            { src: 'https://images.unsplash.com/photo-1565039322405-b01625902102?auto=format&fit=crop&w=600&q=80', alt: 'Operador' },
            { src: 'https://images.unsplash.com/photo-1589792923962-537704632910?auto=format&fit=crop&w=600&q=80', alt: 'Detalhe Técnico' },
            { src: 'https://images.unsplash.com/photo-1612648704259-2b62241e0640?auto=format&fit=crop&w=600&q=80', alt: 'Ferramenta' },
            { src: 'https://images.unsplash.com/photo-1531297461136-82lw8e2d48?auto=format&fit=crop&w=600&q=80', alt: 'Acabamento' }
        ]
    },
    torneamento: {
        title: 'Torneamento CNC',
        heading: 'Torneamento de Precisão',
        description: 'Especialistas na confecção de eixos, buchas, flanges e pinos com alta precisão dimensional e geométrica.',
        capabilities: [
            'Torneamento de peças longas',
            'Roscas especiais',
            'Acabamento espelhado',
            'Lotes seriados e peças únicas'
        ],
        videos: [],
        gallery: []
    },
    mandrilhamento: {
        title: 'Mandrilhamento',
        heading: 'Mandrilhamento Universal',
        description: 'Serviços de mandrilhamento para peças de médio e grande porte, garantindo alinhamento e precisão de furos e faces.',
        capabilities: [],
        videos: [],
        gallery: []
    },
    eletroerosao: {
        title: 'Eletroerosão',
        heading: 'Eletroerosão por Penetração',
        description: 'Usinagem de formas complexas e cavidades profundas em materiais endurecidos com alta precisão.',
        capabilities: [],
        videos: [],
        gallery: []
    }
}

type TabKey = keyof typeof services

export default function ServicosPage() {
    const [activeTab, setActiveTab] = useState<TabKey>('fresamento')

    const currentService = services[activeTab]

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
                        {(Object.keys(services) as TabKey[]).map((key) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`transition-all whitespace-nowrap pb-2 ${activeTab === key
                                        ? 'text-orange-600 font-bold border-b-2 border-orange-600'
                                        : 'text-slate-500 hover:text-slate-800'
                                    }`}
                            >
                                {services[key].title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <main className="flex-grow py-12 container mx-auto px-6">
                <div className="animate-fade-in">
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

                    {/* VIDEOS (Only if available) */}
                    {currentService.videos && currentService.videos.length > 0 && (
                        <div className="border-t border-slate-200 pt-10 mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                    <span>►</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">Vídeos em Ação</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {currentService.videos.map((video, index) => (
                                    <div key={index} className="group relative h-[300px] rounded-xl overflow-hidden cursor-pointer bg-slate-900 shadow-xl border border-slate-200">
                                        <Image
                                            src={video.fallbackImage}
                                            alt={video.title}
                                            fill
                                            className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center z-10">
                                            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white/20 backdrop-blur-sm transform transition-transform group-hover:scale-110">
                                                <span className="text-xl ml-1">▶</span>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                                            <h4 className="text-white font-bold text-lg mb-1">{video.title}</h4>
                                            <p className="text-slate-300 text-sm">{video.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* GALLERY (Only if available) */}
                    {currentService.gallery && currentService.gallery.length > 0 && (
                        <div className="border-t border-slate-200 pt-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-700">
                                    <span>📷</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">Galeria de Fotos</h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {currentService.gallery.map((photo, index) => (
                                    <div key={index} className={`group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-md ${photo.featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
                                        <Image
                                            src={photo.src}
                                            alt={photo.alt}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {photo.featured && (
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="bg-white/90 text-slate-900 px-4 py-2 rounded-full font-bold text-sm backdrop-blur-sm">
                                                    Ampliar Imagem
                                                </span>
                                            </div>
                                        )}

                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Placeholder for other services if empty */}
                    {(!currentService.videos || currentService.videos.length === 0) && (!currentService.gallery || currentService.gallery.length === 0) && (
                        <div className="text-center p-12 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300">
                            <p className="text-slate-500">Conteúdo visual (Fotos e Vídeos) será adicionado em breve.</p>
                        </div>
                    )}

                </div>
            </main>
        </div>
    )
}
