import React from 'react';
import { FormularioVagas } from '@/components/FormularioVagas';
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
    Laptop,
    GraduationCap,
    Briefcase
} from 'lucide-react';

export const metadata = {
    title: 'Trabalhe Conosco | Nardelli Usinagem',
    description: 'Faça parte do time da Nardelli Usinagem. Cadastre seu currículo e concorra às vagas na área industrial e administrativa.'
};

export default function TrabalheConosco() {
    return (
        <div className="bg-slate-50 text-slate-800">

            {/* Hero Section */}
            <section className="career-hero pt-40 pb-24 text-white relative bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-slate-900/80 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <span className="text-orange-400 font-bold tracking-widest uppercase text-sm mb-4 block">Carreira na Indústria</span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Faça Parte do Time Nardelli</h1>
                    <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
                        Buscamos profissionais apaixonados por precisão e inovação. Venha construir sua história em uma empresa com mais de 30 anos de tradição.
                    </p>
                    <div className="mt-8">
                        <a 
                            href="#formulario-inscricao" 
                            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg shadow-orange-900/40"
                        >
                            Quero me Candidatar ↓
                        </a>
                    </div>
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

            {/* Perfis Profissionais */}
            <section className="py-16 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Oportunidades e Áreas de Atuação</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Nosso banco de talentos está em constante expansão. Confira algumas das principais áreas:
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
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center hover:border-orange-400 transition-colors group">
                            <div className="flex justify-center mb-2 text-orange-600 group-hover:scale-110 transition-transform">
                                <GraduationCap className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-slate-800">Estagiário</h3>
                            <p className="text-xs text-slate-500">Técnico e Superior</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center hover:border-orange-400 transition-colors group">
                            <div className="flex justify-center mb-2 text-orange-600 group-hover:scale-110 transition-transform">
                                <Briefcase className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-slate-800">Outros</h3>
                            <p className="text-xs text-slate-500">Banco de Talentos</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Formulário Nativo de Inscrição */}
            <section className="py-20 bg-slate-100 border-t border-slate-200">
                <div className="container mx-auto px-6">
                    <FormularioVagas />
                </div>
            </section>
        </div>
    )
}
