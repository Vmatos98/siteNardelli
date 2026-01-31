
import React from 'react';
import Head from 'next/head';
import { Footer } from '@/components/Footer';
import {
    TrendingUp,
    ShieldCheck,
    Users,
    Settings,
    Fan,
    Cpu,
    Flame,
    Hammer,
    Wrench,
    Ruler,
    HardHat,
    DraftingCompass,
    Laptop
} from 'lucide-react';

export default function TrabalheConosco() {
    return (
        <>
            <div className="bg-slate-50 text-slate-800">
                {/* Head metadata can be handled via layout or metadata export, but this is a page usage */}

                {/* Hero Section */}
                <section className="career-hero pt-40 pb-24 text-white relative">
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <span className="text-orange-400 font-bold tracking-widest uppercase text-sm mb-4 block">Carreira na Indústria</span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Faça Parte do Time Nardelli</h1>
                        <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
                            Buscamos profissionais apaixonados por precisão e inovação. Venha construir sua história em uma empresa com mais de 30 anos de tradição.
                        </p>
                    </div>
                </section>

                {/* Por que trabalhar aqui? */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-6">Cultura de Crescimento e Valorização</h2>
                                <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                                    Na Nardelli Usinagem, acreditamos que máquinas de ponta precisam de mentes brilhantes.
                                    Investimos não apenas em tornos e centros de usinagem, mas principalmente nas pessoas que os operam.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-orange-100 p-2 rounded text-orange-600">
                                            <TrendingUp className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Desenvolvimento Contínuo</h4>
                                            <p className="text-sm text-slate-600">Incentivo a cursos e especializações técnicas.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-orange-100 p-2 rounded text-orange-600">
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Segurança em Primeiro Lugar</h4>
                                            <p className="text-sm text-slate-600">Ambiente rigorosamente controlado e EPIs de qualidade.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-orange-100 p-2 rounded text-orange-600">
                                            <Users className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Ambiente Colaborativo</h4>
                                            <p className="text-sm text-slate-600">Trabalho em equipe e respeito mútuo.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-100 rounded-br-3xl -z-10"></div>
                                <img
                                    src="/assets/img_trabalhe_conosco.png"
                                    alt="Equipe na fábrica"
                                    className="rounded-xl shadow-xl w-full"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Perfis Profissionais (Novo) */}
                <section className="py-16 bg-slate-50 border-t border-slate-200">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Procuramos por:</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                Nosso banco de talentos está sempre aberto para profissionais qualificados e dedicados. Confira as
                                áreas que frequentemente contratamos:
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center hover:border-orange-400 transition-colors group">
                                <div className="flex justify-center mb-2 text-orange-600 group-hover:scale-110 transition-transform">
                                    <Settings className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-slate-800">Torneiro Mecânico</h3>
                                <p className="text-xs text-slate-500">Convencional e CNC</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center hover:border-orange-400 transition-colors group">
                                <div className="flex justify-center mb-2 text-orange-600 group-hover:scale-110 transition-transform">
                                    <Fan className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-slate-800">Fresador</h3>
                                <p className="text-xs text-slate-500">Universal e Ferramenteira</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center hover:border-orange-400 transition-colors group">
                                <div className="flex justify-center mb-2 text-orange-600 group-hover:scale-110 transition-transform">
                                    <Cpu className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-slate-800">Operador CNC</h3>
                                <p className="text-xs text-slate-500">Centro de Usinagem</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center hover:border-orange-400 transition-colors group">
                                <div className="flex justify-center mb-2 text-orange-600 group-hover:scale-110 transition-transform">
                                    <Flame className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-slate-800">Soldador</h3>
                                <p className="text-xs text-slate-500">TIG, MIG/MAG e Elétrica</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center hover:border-orange-400 transition-colors group">
                                <div className="flex justify-center mb-2 text-orange-600 group-hover:scale-110 transition-transform">
                                    <Hammer className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-slate-800">Caldeireiro</h3>
                                <p className="text-xs text-slate-500">Traçagem e Montagem</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center hover:border-orange-400 transition-colors group">
                                <div className="flex justify-center mb-2 text-orange-600 group-hover:scale-110 transition-transform">
                                    <Wrench className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-slate-800">Ajustador Mecânico</h3>
                                <p className="text-xs text-slate-500">Bancada e Montagem</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center hover:border-orange-400 transition-colors group">
                                <div className="flex justify-center mb-2 text-orange-600 group-hover:scale-110 transition-transform">
                                    <Ruler className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-slate-800">Inspetor de Qualidade</h3>
                                <p className="text-xs text-slate-500">Metrologia e Controle</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center hover:border-orange-400 transition-colors group">
                                <div className="flex justify-center mb-2 text-orange-600 group-hover:scale-110 transition-transform">
                                    <HardHat className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-slate-800">Auxiliar de Produção</h3>
                                <p className="text-xs text-slate-500">Apoio Geral</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center hover:border-orange-400 transition-colors group">
                                <div className="flex justify-center mb-2 text-orange-600 group-hover:scale-110 transition-transform">
                                    <DraftingCompass className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-slate-800">Engenheiro Mecânico</h3>
                                <p className="text-xs text-slate-500">Projetos e Processos</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center hover:border-orange-400 transition-colors group">
                                <div className="flex justify-center mb-2 text-orange-600 group-hover:scale-110 transition-transform">
                                    <Laptop className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-slate-800">Administrativo</h3>
                                <p className="text-xs text-slate-500">Gestão e Financeiro</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Área de Vagas / Integração com Google Forms */}
                <section className="py-20 bg-white border-t border-slate-200">
                    <div className="container mx-auto px-6 max-w-4xl text-center">

                        {/* CTA Principal do Banco de Talentos */}
                        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                            {/* Decorative Circle */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full blur-[100px] opacity-20 -mr-16 -mt-16"></div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-4">Envie seu Currículo</h3>
                                <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                                    Utilizamos o Google Forms para gerenciar nosso banco de talentos de forma segura e organizada.
                                    Clique no botão abaixo para preencher seus dados e anexar seu currículo (PDF).
                                </p>

                                {/* Botão para o Google Form */}
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSd7BPnMe4XlVhCEKsOjQOmdgdXTL-5A52e1pEYoDYId4P2nnA/viewform?usp=header" target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-orange-900/50">
                                    {/* <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-10-3.535 10 10 0 01-3.535-10 10 10 0 01-3.535-10 10 10 0 01-10-3.535 10 10 0 01-10 3.535 10 10 0 01-3.535 10 10 10 0 013.535 10 10 10 0 0110 3.535 10 10 0 0110-3.535 10 10 0 013.535-10 10 10 0 013.535 10zM12.001 2a8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8zm0 14a6 6 0 006-6 6 6 0 00-6-6 6 6 0 00-6 6 6 6 0 006 6z" />
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                                        <path d="M7.71 3.5L1.15 15l3.43 6h6.86l6.57-11.5M12 2.5L18.43 14H11.57L5.14 2.5m10 2.5l3.43 6H11.72l-3.43-6h6.85z" /> 
                                    </svg> */}
                                    Preencher Formulário de Vagas
                                </a>

                                <p className="text-xs text-slate-500 mt-6">
                                    * É necessário ter uma conta Google para fazer o upload de arquivos.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}
