'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Empresa() {
  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/logo.png" alt="Nardelli Usinagem" width={56} height={56} className="h-12 md:h-14 w-auto object-contain" />
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-none">NARDELLI</h1>
              <span className="text-xs text-orange-600 font-semibold tracking-widest uppercase">Usinagem</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span className="text-orange-600 font-bold">Empresa</span>
            <Link href="/servicos" className="hover:text-orange-600 transition-colors">Serviços</Link>
            <Link href="/#contato" className="hover:text-orange-600 transition-colors">Contato</Link>
            <Link href="/orcamento" className="px-5 py-2.5 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">Orçamento</Link>
          </nav>
          <button className="md:hidden text-slate-800" onClick={() => {
            const menu = document.getElementById('mobile-menu')
            if (menu) menu.classList.toggle('hidden')
          }}>
            <span className="text-2xl">☰</span>
          </button>
        </div>
        <div id="mobile-menu" className="hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm md:hidden flex-col shadow-xl rounded-b-lg mx-2 mt-2 overflow-hidden">
          <div className="py-2">
            <Link href="/" className="block px-6 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Home</Link>
            <span className="block px-6 py-3 text-orange-600 font-semibold bg-orange-50">Empresa</span>
            <Link href="/servicos" className="block px-6 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Serviços</Link>
            <Link href="/#contato" className="block px-6 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Contato</Link>
            <div className="mx-4 my-2 h-px bg-slate-200"></div>
            <Link href="/orcamento" className="block mx-4 my-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg text-center hover:from-orange-600 hover:to-orange-700 transition-all shadow-md">Solicitar Orçamento</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-bg pt-40 pb-24 text-white relative min-h-[60vh] flex items-center">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-orange-400 font-bold tracking-widest uppercase text-sm mb-4 block">Desde 1991</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Nossa História e Valores</h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Transformando empresas em parceiras através de soluções inovadoras e sustentáveis na indústria metalúrgica.
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">Trajetória de Sucesso</h2>
          <div className="max-w-4xl mx-auto relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 transform -translate-x-1/2"></div>
            <div className="space-y-12 relative z-10">
              {/* 1991 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:text-right">
                  <h3 className="text-2xl font-bold text-orange-600">1991</h3>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Fundação</h4>
                  <p className="text-slate-600">Início das atividades em Aracaju-SE, com foco em manutenção preventiva e corretiva para a <strong>indústria têxtil</strong>.</p>
                </div>
                <div className="w-4 h-4 bg-orange-600 rounded-full border-4 border-white shadow-sm hidden md:block"></div>
                <div className="md:w-1/2"></div>
              </div>
              {/* 2004 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 hidden md:block"></div>
                <div className="w-4 h-4 bg-orange-600 rounded-full border-4 border-white shadow-sm hidden md:block"></div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-orange-600">2004</h3>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Expansão Tecnológica</h4>
                  <p className="text-slate-600">Investimento massivo em novas tecnologias e capacitação técnica. Ampliação da estrutura física para atender a demanda crescente.</p>
                </div>
              </div>
              {/* Hoje */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:text-right">
                  <h3 className="text-2xl font-bold text-orange-600">Hoje</h3>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Diversificação</h4>
                  <p className="text-slate-600">Atuação consolidada nos setores Petroquímico, Mineração, Plástico, Construção Civil, Hídrico e Alimentício, atendendo grandes players nacionais.</p>
                </div>
                <div className="w-4 h-4 bg-orange-600 rounded-full border-4 border-white shadow-sm hidden md:block"></div>
                <div className="md:w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Filosofia Corporativa</h2>
            <p className="text-slate-600">Nossa política é levar serviços a empresas transformando-as em parceiras, com o objetivo de diminuir custos e aumentar produtividade.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Missão */}
            <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Missão</h3>
              <p className="text-slate-600 leading-relaxed">Fornecer soluções em usinagem e metalurgia de forma sustentável, gerando valor real para os clientes e a sociedade.</p>
            </div>
            {/* Visão */}
            <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Visão</h3>
              <p className="text-slate-600 leading-relaxed">Ser líder no segmento de usinagem e metalurgia no Estado de Sergipe, expandindo continuamente nossa capacidade de atendimento.</p>
            </div>
            {/* Valores */}
            <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-600"></div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Valores</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li className="flex items-center gap-2">✓ Confiabilidade e Transparência</li>
                <li className="flex items-center gap-2">✓ Valorização Humana</li>
                <li className="flex items-center gap-2">✓ Qualidade com Excelência</li>
                <li className="flex items-center gap-2">✓ Sustentabilidade e Segurança</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Setores de Atuação */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-12">Setores de Atuação</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <span className="px-6 py-3 border border-slate-700 rounded-full hover:bg-orange-600 hover:border-orange-600 transition-all cursor-default">Indústria Têxtil</span>
            <span className="px-6 py-3 border border-slate-700 rounded-full hover:bg-orange-600 hover:border-orange-600 transition-all cursor-default">Petroquímica</span>
            <span className="px-6 py-3 border border-slate-700 rounded-full hover:bg-orange-600 hover:border-orange-600 transition-all cursor-default">Mineração</span>
            <span className="px-6 py-3 border border-slate-700 rounded-full hover:bg-orange-600 hover:border-orange-600 transition-all cursor-default">Construção Civil</span>
            <span className="px-6 py-3 border border-slate-700 rounded-full hover:bg-orange-600 hover:border-orange-600 transition-all cursor-default">Alimentício</span>
            <span className="px-6 py-3 border border-slate-700 rounded-full hover:bg-orange-600 hover:border-orange-600 transition-all cursor-default">Máquinas Pesadas</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white mb-2">NARDELLI USINAGEM</h2>
              <p className="text-sm">Produzindo com qualidade e precisão desde 1991.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">📷</a>
              <a href="#" className="hover:text-white transition-colors">📘</a>
              <a href="#" className="hover:text-white transition-colors">📺</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-sm text-center">
            <p>&copy; 2024 Nardelli Usinagem. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}