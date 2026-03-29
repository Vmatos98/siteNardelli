'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'

// Componente de Card de Serviço
interface ServiceCardProps {
  title: string
  description: string
  image: string
  badge: {
    text: string
    color: string
  }
  tags: string[]
  delay?: number
}

function ServiceCard({ title, description, image, badge, tags, delay = 0 }: ServiceCardProps) {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-slate-100 flex flex-col h-full"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Imagem com Badge */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div
          className="absolute bottom-4 left-4 text-xs font-bold px-3 py-1 rounded-full text-white uppercase tracking-wider shadow-sm"
          style={{ backgroundColor: badge.color }}
        >
          {badge.text}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-8 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full border border-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Componente de Clientes com Slides por Categoria
function ClientesSection() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('petroleo_gas')

  // 1. DADOS ATUALIZADOS: Agora cada cliente é um objeto com nome e logo
  const clientesPorSetor = {
    petroleo_gas: {
      nome: 'Petróleo, Gás & Energia',
      clientes: [
        { nome: 'Petrobras', logo: '/assets/clientes/petrobras.svg' },
        { nome: 'Carmo Energy', logo: '/assets/clientes/carmo-energy.png' },
        { nome: 'Energen Energias Renovaveis S/a', logo: '/assets/clientes/energen.png' }
      ]
    },
    textil: {
      nome: 'Indústria Têxtil',
      clientes: [
        { nome: 'Sergitex Indústria Têxtil', logo: '/assets/clientes/sergitex.png' },
        { nome: 'Peixoto Gonçalves', logo: '/assets/clientes/peixoto.png' },
        { nome: 'Grupo Constâncio Vieira', logo: '/assets/clientes/constancio.png' },
        { nome: 'Esencial Indústria Têxtil', logo: '/assets/clientes/esencial.png' },
        { nome: 'Altenburg', logo: '/assets/clientes/altenburg.svg' }
      ]
    },
    alimenticia: {
      nome: 'Alimentícia',
      clientes: [
        { nome: 'Grupo Maratá', logo: '/assets/clientes/marata.png' },
        { nome: 'Natulact', logo: '/assets/clientes/natulact.png' },
        { nome: 'Duas Rodas', logo: '/assets/clientes/duas-rodas.png' },
        { nome: 'Ambev', logo: '/assets/clientes/ambev.png' }
      ]
    },
    mineracao: {
      nome: 'Mineração',
      clientes: [
        { nome: 'Mosaic Fertilizantes', logo: '/assets/clientes/mosaic.png' },
        { nome: 'Votorantim Cimentos', logo: '/assets/clientes/votorantim.png' }
      ]
    },
    construcao: {
      nome: 'Outros Setores',
      clientes: [
        { nome: 'VLI TMIB', logo: '/assets/clientes/vli.png' },
        { nome: 'Indústria Vidreira Do Nordeste LTDA', logo: '/assets/clientes/ivn.png' },
        { nome: 'Crown Holdings Inc.', logo: '/assets/clientes/crown.png' }
      ]
    }
  }

  const categorias = Object.keys(clientesPorSetor)
  const categoriaData = clientesPorSetor[categoriaAtiva as keyof typeof clientesPorSetor]

  React.useEffect(() => {
    const timer = setInterval(() => {
      const currentIndex = categorias.indexOf(categoriaAtiva)
      const nextIndex = (currentIndex + 1) % categorias.length
      setCategoriaAtiva(categorias[nextIndex])
    }, 45000)

    return () => clearInterval(timer)
  }, [categoriaAtiva, categorias])

  const mudarCategoria = (categoria: string) => {
    setCategoriaAtiva(categoria)
  }

  const clientesVisiveis = categoriaData.clientes.slice(0, 6)

  return (
    <section id="clientes" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white -skew-x-12 opacity-50 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 section-title inline-block">Nossos Clientes</h2>
          <p className="text-slate-600 text-lg">
            A confiança de grandes marcas se conquista com precisão, prazo e responsabilidade. Atendemos diversos setores da indústria.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.entries(clientesPorSetor).map(([key, setor]) => (
            <button
              key={key}
              onClick={() => mudarCategoria(key)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${categoriaAtiva === key
                ? 'text-white shadow-lg scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              style={categoriaAtiva === key ? { background: '#1D293D' } : {}}
            >
              {setor.nome}
            </button>
          ))}
        </div>

        {/* 2. RENDERIZAÇÃO ATUALIZADA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clientesVisiveis.map((cliente, index) => (
            <div
              key={`${categoriaAtiva}-${index}`}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center border-2 border-transparent hover:border-[#1D293D] animate-fade-in min-h-[220px]"
            >
              {/* Contêiner da Logo com tamanho fixo */}
              <div className="h-16 w-full relative flex items-center justify-center mb-6 mt-2">
                {cliente.logo && (
                  <img
                    src={cliente.logo}
                    alt={`Logo ${cliente.nome}`}
                    className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                )}
              </div>

              {/* Informações de Texto Abaixo da Logo */}
              <div className="text-center mt-auto w-full">
                <div className="text-xl font-bold mb-2 text-[#1D293D]">
                  {cliente.nome}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                  {categoriaData.nome}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/orcamento" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg">
            Seja nosso cliente
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

// Componente do Slider de Diferenciais Redesenhado
function DiferenciaisSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const diferenciais = [
    {
      title: 'Fresamento CNC',
      description: 'Serviços de fresamento com máquinas CNC para alta precisão e eficiência.',
      image: '/assets/fresaCNC1.jpg' // Usando apenas a primeira imagem como principal
    },
    {
      title: 'Torneamento CNC',
      description: 'Produção seriada de peças com repetibilidade e acabamento superficial superior.',
      image: '/assets/torno-cnc.jpg'
    },
    {
      title: 'Mandrilhamento Universal',
      description: 'Usinagem interna de furos com diâmetros precisos em peças de grande porte.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1950&q=80'
    },
    {
      title: 'Retifica Cilíndrica',
      description: 'Acabamento de alta precisão em superfícies cilíndricas, externas e internas.',
      image: '/assets/retifica-cilindrica.jpg'
    },
    {
      title: 'Retifica Plana',
      description: 'Usinagem de superfícies planas com acabamento espelhado e planicidade garantida.',
      image: '/assets/retifica-plana.jpg'
    },
    {
      title: 'Eletroerosão a Penetração',
      description: 'Criação de matrizes, moldes e peças com geometrias intrincadas em metais duros.',
      image: '/assets/eletroerosao-a-penetracao-1.jpg'
    },
    {
      title: 'Tratamento Térmico',
      description: 'Processos para alterar as propriedades físicas e mecânicas dos materiais.',
      image: '/assets/tratamento-termico.webp'
    },
    {
      title: 'Manutenção de Conjuntos Mecânicos',
      description: 'Manutenção preventiva e corretiva de conjuntos e subconjuntos mecânicos.',
      image: '/assets/manutencao.jpg'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % diferenciais.length);
    }, 6000); // 6 segundos por slide

    return () => clearInterval(timer);
  }, [diferenciais.length]);

  const activeDiferencial = diferenciais[activeIndex];

  return (
    <div className="relative mx-4 md:mx-12 mb-12 -mt-10 z-20">
      <div className="container mx-auto">
        {/* Card Principal Imersivo */}
        <div className="relative w-full h-[30vh] min-h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-slate-900">

          {/* Imagem de Fundo com Transição */}
          <div className="absolute inset-0 w-full h-full">
            {diferenciais.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0'
                  }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index === 0}
                  className="object-cover transform transition-transform duration-[8000ms] group-hover:scale-110"
                />
                {/* Overlay Gradiente: Escuro na esquerda, transparente na direita */}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent opacity-90"></div>
              </div>
            ))}
          </div>

          {/* Conteúdo Sobreposto */}
          <div className="absolute inset-0 flex flex-col justify-end md:justify-center px-8 pt-8 pb-24 md:p-16 z-10">
            <div className="max-w-2xl animate-fade-in-up">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-orange-400 uppercase bg-black/40 backdrop-blur-sm rounded-full border border-orange-500/30">
                Nossos Diferenciais
              </div>

              <h3 className="font-bold text-3xl md:text-5xl mb-6 text-white leading-tight">
                {activeDiferencial.title}
              </h3>

              <p className="text-slate-200 text-lg md:text-xl leading-relaxed mb-8 max-w-lg drop-shadow-md">
                {activeDiferencial.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/estrutura" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded font-semibold transition-all backdrop-blur-sm">
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </div>

          {/* Navegação por Pontos */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:bottom-8 md:right-16 flex gap-3 z-20">
            {diferenciais.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full h-3 border border-white/20 shadow-sm ${index === activeIndex
                  ? 'bg-orange-500 w-10'
                  : 'bg-white/40 w-3 hover:bg-white/70'
                  }`}
                aria-label={`Ir para o slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de Faixa Social
function SocialBanner() {
  return (
    <div className="relative z-30 -mt-8 mb-12">
      <div className="container mx-auto px-6">
        <div className="bg-[#1D293D] rounded-xl shadow-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300 border border-slate-700/50">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Acompanhe nosso trabalho</h3>
            <p className="text-slate-300 font-medium">Fique por dentro das novidades e processos de produção</p>
          </div>

          <div className="flex gap-4 relative z-10">
            <a
              href="https://wa.me/557932052272"
              className="w-12 h-12 flex items-center justify-center bg-white text-[#1D293D] rounded-full hover:bg-slate-100 transition-all shadow-md group"
              title="WhatsApp"
            >
              <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
            </a>

            <a
              href="#"
              className="w-12 h-12 flex items-center justify-center bg-white text-[#1D293D] rounded-full hover:bg-slate-100 transition-all shadow-md group"
              title="Instagram"
            >
              <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a
              href="#"
              className="w-12 h-12 flex items-center justify-center bg-white text-[#1D293D] rounded-full hover:bg-slate-100 transition-all shadow-md group"
              title="YouTube"
            >
              <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmpresaSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const imagens = [
    "/assets/empresa/1991.png",
    "/assets/empresa/2008.png",
    "/assets/empresa/2010-1.png",
    "/assets/empresa/2013.png",
    "/assets/empresa/2017.png",
    "/assets/empresa/2024.png",
    "/assets/empresa/hoje.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % imagens.length);
    }, 4000); // 4 segundos por imagem

    return () => clearInterval(timer);
  }, [imagens.length]);

  return (
    <div className="relative w-full h-[400px] rounded-lg shadow-2xl overflow-hidden group z-10">
      {imagens.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt={`Estrutura Nardelli ${index + 1}`}
          fill
          className={`object-cover transition-opacity duration-1000 ${index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
        />
      ))}
      {/* Navegação por Pontos */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {imagens.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`transition-all duration-300 rounded-full h-2 shadow-sm ${index === activeIndex ? "bg-orange-600 w-8" : "bg-white/80 w-2 hover:bg-white"
              }`}
            aria-label={`Ir para a imagem ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Header removido pois já existe no layout global */}

      {/* Hero Section */}
      <section id="home" className="hero-bg min-h-screen flex flex-col relative pb-32">
        <div className="container mx-auto px-6 text-center text-white z-10 flex-grow flex flex-col justify-center pt-24">
          <span className="inline-block self-center px-4 py-2 mt-20 mb-6 text-base font-semibold tracking-wider text-orange-300 uppercase bg-slate-800/80 rounded-full border-[1px] border-orange-500/50 backdrop-blur-sm">
            Desde 1991
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Produzindo com <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">Qualidade, Precisão e Confiabilidade</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Soluções completas em usinagem de precisão, torno CNC e manutenção industrial para grandes empresas.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-32">
            <Link href="/orcamento" className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded font-semibold transition-all shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2">
              Solicitar Cotação
            </Link>
            <a href="#servicos" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded font-semibold transition-all backdrop-blur-sm">
              Nossos Serviços
            </a>
          </div>
        </div>
        <DiferenciaisSlider />
      </section>

      {/* Slider agora posicionado entre a Hero e a seção Empresa, sobrepondo ligeiramente */}


      {/* Sobre a Empresa */}      <section id="empresa" className="py-24 bg-white pt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-tl-3xl -z-10"></div>
              <EmpresaSlider />
              <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-6 rounded-lg shadow-lg hidden md:block z-30">
                <p className="text-3xl font-bold">30+</p>
                <p className="text-sm uppercase tracking-wide">Anos de Experiência</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 section-title">Sobre a Nardelli</h2>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                A Nardelli Usinagem conta com uma vasta gama de serviços oferecidos graças ao constante investimento em equipamentos de alta tecnologia. Nosso objetivo é proporcionar sempre um produto de alta qualidade e confiabilidade.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Não é à toa que grandes empresas firmaram parceria sólida conosco. Unimos tradição, processos de produção seguros e preços competitivos para atender as demandas mais exigentes do mercado sergipano e nacional.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  ✅ Preços Competitivos
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  ✅ Qualidade Garantida
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  ✅ Atendimento Personalizado
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  ✅ Equipe Especializada
                </li>
              </ul>
              <Link href="/empresa" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md">
                Conheça Mais
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Serviços */}
      {/* Serviços */}
      <section id="servicos" className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6">

          {/* Cabeçalho da Seção */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-2 block">
              Expertise Industrial
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 section-title inline-block">
              Soluções em Usinagem
            </h2>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
              Do protótipo à produção em escala, oferecemos precisão milesimal e acabamento técnico superior.
            </p>
          </div>

          {/* Grid de Serviços */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <ServiceCard
              title="Fabricação Sob Demanda"
              description="Desenvolvimento e fabricação de peças únicas ou dispositivos complexos conforme desenho técnico ou amostra."
              image="/assets/demanda_home1.png"
              badge={{ text: "Personalizado", color: "#f97316" }} // Orange-500
              tags={["Engenharia Reversa", "Projetos 3D", "Usinagem 5 Eixos"]}
              delay={0}
            />
            <ServiceCard
              title="Manutenção Industrial"
              description="Recuperação de eixos, buchas e componentes mecânicos críticos para evitar paragens na sua linha de produção."
              image="/assets/manutencao_home.jpg"
              badge={{ text: "Urgência", color: "#3b82f6" }} // Blue-500
              tags={["Recuperação de Peças", "Solda Especial", "Ajuste Técnico"]}
              delay={100}
            />
            <ServiceCard
              title="Peças Seriadas"
              description="Produção de lotes de peças com repetibilidade garantida e controlo de qualidade rigoroso para montadoras."
              image="/assets/seriado_home.jpg"
              badge={{ text: "Escala", color: "#22c55e" }} // Green-500
              tags={["Tornos CNC", "Controlo Dimensional", "Entrega Programada"]}
              delay={200}
            />
          </div>

          {/* Seção Inferior: Materiais e Setores */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 divider-x-0 md:divide-x divide-slate-100">

              {/* Materiais Trabalhados */}
              <div className="md:pr-12">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">
                  Materiais Trabalhados
                </h4>
                <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                  {[
                    "Aço Inox (304, 316)", "Aço Carbono",
                    "Alumínio Aeronáutico", "Latão e Bronze",
                    "Polímeros (Nylon, UHMW)", "Ligas Especiais"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Principais Setores */}
              <div className="md:pl-12">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">
                  Principais Setores
                </h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: "🚜", label: "Agrícola" },
                    { icon: "🏭", label: "Mineração" },
                    { icon: "⚡", label: "Energia" },
                    { icon: "🧴", label: "Embalagens" },
                    { icon: "🚗", label: "Automotivo" },
                  ].map((setor, i) => (
                    <span key={i} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 rounded-lg border border-slate-200 font-medium hover:bg-slate-100 transition-colors text-sm">
                      <span>{setor.icon}</span>
                      {setor.label}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            <div className="text-center mt-12 pt-8 border-t border-slate-100">
              <Link href="/estrutura" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-0.5">
                Conheça Nossa Estrutura em Detalhes
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Clientes */}
      <ClientesSection />

      {/* Contato e Localização */}
      <section id="contato" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 inline-block section-title">Entre em Contato</h2>
            <p className="text-slate-600 mt-4">Estamos prontos para atender sua demanda com agilidade e qualidade.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informações de Contato */}
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-orange-600 flex-shrink-0 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Telefone</h3>
                    <a href="tel:+557932052272" className="text-slate-600 hover:text-orange-600 transition-colors">
                      +55 (79) 3213-0726
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-orange-600 flex-shrink-0 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                    <a href="mailto:comercial@nardelliusinagem.com" className="text-slate-600 hover:text-orange-600 transition-colors">
                      comercial@nardelliusinagem.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-orange-600 flex-shrink-0 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Endereço</h3>
                    <p className="text-slate-600">
                      Rua 21 de abril, 230<br />
                      Dezoito do Forte<br />
                      Aracaju - Sergipe, 49072-760
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-orange-600 flex-shrink-0 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Horário de Funcionamento</h3>
                    <p className="text-slate-600">
                      Segunda a Quinta: 07:30 às 12:00 - 13:00 às 17:30<br />
                      Sexta: 08:00 às 12:00 - 13:00 às 17:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="relative">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rua+21+de+abril+230+Dezoito+do+Forte+Aracaju+Sergipe"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl z-10 flex items-center justify-center">
                  <div className="bg-white text-slate-900 px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Abrir no Google Maps
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-white h-full min-h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.7891234567!2d-37.0789!3d-10.9234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDU1JzI0LjIiUyAzN8KwMDQnNDQuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '400px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="pointer-events-none group-hover:pointer-events-auto"
                  ></iframe>
                </div>
              </a>
              <p className="text-center text-sm text-slate-500 mt-4">
                Clique no mapa para abrir no Google Maps
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
