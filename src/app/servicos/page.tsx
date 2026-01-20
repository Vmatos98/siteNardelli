'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Servicos() {
  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image 
              src="/logo.png" 
              alt="Nardelli Usinagem" 
              width={56}
              height={56}
              className="h-12 md:h-14 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-none">NARDELLI</h1>
              <span className="text-xs text-orange-600 font-semibold tracking-widest uppercase">Usinagem</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <Link href="/empresa" className="hover:text-orange-600 transition-colors">Empresa</Link>
            <span className="text-orange-600 font-bold">Serviços</span>
            <Link href="/#contato" className="hover:text-orange-600 transition-colors">Contato</Link>
            <Link href="/orcamento" className="px-5 py-2.5 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
              Orçamento
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-800" 
            onClick={() => {
              const menu = document.getElementById('mobile-menu')
              if (menu) menu.classList.toggle('hidden')
            }}
          >
            <span className="text-2xl">☰</span>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div id="mobile-menu" className="hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm md:hidden flex-col shadow-xl rounded-b-lg mx-2 mt-2 overflow-hidden">
          <div className="py-2">
            <Link href="/" className="block px-6 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Home</Link>
            <Link href="/empresa" className="block px-6 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Empresa</Link>
            <span className="block px-6 py-3 text-orange-600 font-semibold bg-orange-50">Serviços</span>
            <Link href="/#contato" className="block px-6 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Contato</Link>
            <div className="mx-4 my-2 h-px bg-slate-200"></div>
            <Link href="/orcamento" className="block mx-4 my-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg text-center hover:from-orange-600 hover:to-orange-700 transition-all shadow-md">
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="services-hero pt-40 pb-24 text-white relative">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-orange-400 font-bold tracking-widest uppercase text-sm mb-4 block">Parque Fabril Completo</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Nossos Serviços e Equipamentos</h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Da usinagem convencional à tecnologia CNC de ponta. Conheça nossa infraestrutura preparada para atender projetos de alta complexidade e manutenção industrial.
          </p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-6 py-16 space-y-32">

        {/* 1. USINAGEM CNC & ELETROEROSÃO */}
        <section id="cnc" className="scroll-mt-32 category-group">
          <div className="flex flex-col lg:flex-row items-stretch gap-12">
            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <div className="section-marker"></div>
                <h2 className="text-3xl font-bold text-slate-900">Usinagem CNC & Precisão</h2>
              </div>
              <p className="text-slate-600 text-lg mb-8">
                Tecnologia avançada para peças complexas que exigem repetibilidade e tolerâncias rigorosas.
              </p>
              
              <div className="space-y-4">
                {/* Cincinnati */}
                <div className="bg-white border-l-4 border-orange-600 p-5 shadow-sm rounded-r-lg">
                  <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                    <span className="text-orange-600">⚙️</span> Centro de Usinagem CNC Cincinnati Milacron
                  </h3>
                  <p className="text-sm text-slate-600 mt-2">
                    Equipamento americano de alta robustez e precisão. Ideal para fresamento complexo, furação coordenada e usinagem de moldes/matrizes.
                  </p>
                </div>

                {/* Torno CNC */}
                <div className="bg-white border-l-4 border-slate-300 p-5 shadow-sm rounded-r-lg">
                  <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                    <span className="text-slate-600">🔄</span> Torno CNC
                  </h3>
                  <p className="text-sm text-slate-600 mt-2">
                    Produção seriada e peças com perfis curvos ou roscas especiais com acabamento superior.
                  </p>
                </div>

                {/* Eletroerosão */}
                <div className="bg-white border-l-4 border-blue-500 p-5 shadow-sm rounded-r-lg">
                  <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                    <span className="text-blue-500">⚡</span> Eletroerosão a Fio
                  </h3>
                  <p className="text-sm text-slate-600 mt-2">
                    Corte de alta precisão em materiais endurecidos (temperados) e metal duro. Essencial para chavetas internas, estriados e matrizes de corte.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="category-img">
                <Image 
                  src="https://images.unsplash.com/photo-1565439398533-3158dc060c4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Centro de Usinagem CNC"
                  width={1000}
                  height={600}
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-6 w-full rounded-b-xl">
                  <p className="text-white font-bold">Tecnologia Cincinnati Milacron</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. TORNEARIA CONVENCIONAL */}
        <section id="tornearia" className="scroll-mt-32 category-group">
          <div className="flex flex-col lg:flex-row-reverse items-stretch gap-12">
            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <div className="section-marker"></div>
                <h2 className="text-3xl font-bold text-slate-900">Tornearia Convencional</h2>
              </div>
              <p className="text-slate-600 text-lg mb-8">
                Versatilidade para manutenção e peças de grande porte. Nossa linha de tornos mecânicos cobre diversas capacidades.
              </p>
              
              <ul className="grid grid-cols-1 gap-4">
                <li className="bg-slate-50 p-4 rounded-lg flex items-start gap-4 hover:bg-orange-50 transition-colors">
                  <div className="bg-white p-2 rounded shadow-sm text-orange-600 font-bold text-xl w-12 h-12 flex items-center justify-center">G</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Torno 1000 x 4000mm</h4>
                    <p className="text-sm text-slate-600">Para eixos longos, cilindros navais e peças pesadas.</p>
                  </div>
                </li>
                <li className="bg-slate-50 p-4 rounded-lg flex items-start gap-4 hover:bg-orange-50 transition-colors">
                  <div className="bg-white p-2 rounded shadow-sm text-orange-600 font-bold text-xl w-12 h-12 flex items-center justify-center">M</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Torno 500 x 1500mm</h4>
                    <p className="text-sm text-slate-600">O padrão da indústria para manutenção geral e peças médias.</p>
                  </div>
                </li>
                <li className="bg-slate-50 p-4 rounded-lg flex items-start gap-4 hover:bg-orange-50 transition-colors">
                  <div className="bg-white p-2 rounded shadow-sm text-orange-600 font-bold text-xl w-12 h-12 flex items-center justify-center">P</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Torno 440 x 1000mm</h4>
                    <p className="text-sm text-slate-600">Agilidade e precisão para componentes menores e pinos.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="category-img">
                <Image 
                  src="https://images.unsplash.com/photo-1531206105777-66993a20729c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Torno Mecânico"
                  width={1000}
                  height={600}
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. FRESAGEM, FURAÇÃO E PLAINA */}
        <section id="fresagem" className="scroll-mt-32 category-group">
          <div className="flex flex-col lg:flex-row items-stretch gap-12">
            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <div className="section-marker"></div>
                <h2 className="text-3xl font-bold text-slate-900">Fresagem, Furação & Plaina</h2>
              </div>
              <p className="text-slate-600 text-lg mb-6">
                Setor dedicado a usinagem de formas prismáticas, rasgos de chaveta e furações pesadas.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Fresadoras */}
                <div>
                  <h3 className="font-bold text-orange-600 mb-3 uppercase text-sm border-b pb-1">Fresadoras</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <strong>Universal Nº 5:</strong> Grande porte e desbaste pesado.</li>
                    <li>• <strong>Universal Nº 1:</strong> Serviços gerais.</li>
                    <li>• <strong>Ferramenteira:</strong> Precisão e acabamento.</li>
                  </ul>
                </div>
                
                {/* Outros */}
                <div>
                  <h3 className="font-bold text-orange-600 mb-3 uppercase text-sm border-b pb-1">Furação & Plaina</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <strong>Furadeira Radial ISO 60:</strong> Furação profunda em peças maciças.</li>
                    <li>• <strong>Furadeira de Coluna</strong> e de Bancada.</li>
                    <li>• <strong>Plaina Limadora:</strong> Rasgos de chaveta internos (estriados).</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="category-img">
                <Image 
                  src="https://images.unsplash.com/photo-1596637504381-8b3834ae928a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Fresadora"
                  width={1000}
                  height={600}
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. CORTE, SOLDA & DIVERSOS */}
        <section id="corte-solda" className="scroll-mt-32 category-group">
          <div className="flex flex-col lg:flex-row-reverse items-stretch gap-12">
            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <div className="section-marker"></div>
                <h2 className="text-3xl font-bold text-slate-900">Corte, Solda & Diversos</h2>
              </div>
              <p className="text-slate-600 text-lg mb-8">
                Estrutura de apoio completa para caldeiraria, recuperação de peças e acabamento final.
              </p>
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="divide-y divide-slate-100">
                  <div className="p-4 hover:bg-slate-50">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <span className="text-orange-500">✂️</span> Corte
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Serra Fita (Vertical/Horizontal), Policorte, Corte Plasma e Maçarico Oxicorte.
                    </p>
                  </div>
                  <div className="p-4 hover:bg-slate-50">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <span className="text-orange-500">🔥</span> Solda & Tratamento
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      MIG/MAG 440A, TIG Portátil 150A, Eletrodo 450A. Forno a gás para tratamento térmico e fundição leve.
                    </p>
                  </div>
                  <div className="p-4 hover:bg-slate-50">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <span className="text-orange-500">🔧</span> Acabamento
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Retífica Cilíndrica (acoplada), Prensa Hidráulica e Compressor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="category-img">
                <Image 
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Solda e Corte"
                  width={1000}
                  height={600}
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* CTA Final */}
      <section className="bg-slate-900 py-16 border-t border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Pronto para tirar seu projeto do papel?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Nossa equipe técnica analisa a melhor máquina e processo para fabricar sua peça com economia e qualidade.
          </p>
          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <Link href="/orcamento" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-orange-900/40 transition-all transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
              📋 Solicitar Orçamento Online
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
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
          <div className="mt-12 pt-8 border-t border-slate-900 text-sm text-center">
            <p>&copy; 2024 Nardelli Usinagem. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .services-hero {
          background-image: linear-gradient(rgba(15, 23, 42, 0.9), rgba(234, 88, 12, 0.2)), url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        .category-img {
          border-radius: 0.75rem;
          overflow: hidden;
          height: 100%;
          min-height: 350px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .section-marker {
          width: 4px;
          height: 32px;
          background-color: #EA580C;
          margin-right: 1rem;
        }

        .category-group:hover .category-img img {
          transform: scale(1.05);
          transition: transform 0.7s ease-in-out;
        }
      `}</style>
    </div>
  )
}
