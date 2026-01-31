'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface Item {
    title: string
    description: string
    image: string
}

interface StructureSectionProps {
    id: string
    title: string
    subtitle: string
    items: Item[]
    reversed?: boolean
}

export function StructureSection({ id, title, subtitle, items, reversed = false }: StructureSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <section id={id} className="scroll-mt-32 category-group py-12 border-b border-slate-100 last:border-0">
            <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
                {/* Content Side */}
                <div className="lg:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center mb-6">
                        <div className="w-1 h-8 bg-orange-600 mr-4"></div>
                        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
                    </div>
                    <p className="text-slate-600 text-lg mb-8">
                        {subtitle}
                    </p>

                    <div className="space-y-3">
                        {items.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-full text-left p-5 rounded-lg transition-all duration-300 border border-transparent group ${activeIndex === index
                                        ? 'bg-orange-50 border-orange-200 shadow-sm ring-1 ring-orange-200'
                                        : 'bg-white hover:bg-slate-50 border-slate-100 shadow-sm'
                                    }`}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className={`font-bold text-lg ${activeIndex === index ? 'text-orange-700' : 'text-slate-800'}`}>
                                        {item.title}
                                    </h4>
                                    {activeIndex === index && (
                                        <span className="text-orange-600 text-sm font-medium animate-pulse">Visualizando</span>
                                    )}
                                </div>
                                <p className={`text-sm ${activeIndex === index ? 'text-slate-700' : 'text-slate-600'}`}>
                                    {item.description}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Image Side */}
                <div className="lg:w-1/2 w-full">
                    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl bg-slate-100">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={items[activeIndex].image}
                                    alt={items[activeIndex].title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
                                    <p className="text-white font-medium text-lg border-l-4 border-orange-500 pl-3">
                                        {items[activeIndex].title}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Indicators */}
                        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                            {items.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-orange-500' : 'w-2 bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
