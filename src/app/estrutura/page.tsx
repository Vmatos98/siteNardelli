'use client'

import Image from 'next/image'
import Link from 'next/link'
import { StructureSection } from '@/components/StructureSection'
import { PhysicalStructureSection } from '@/components/PhysicalStructureSection'

// DADOS DA ESTRUTURA FÍSICA
const estruturaFisicaData = {
  title: "Nossa Estrutura Física",
  subtitle: "Contamos com 2.300m² muito bem divididos e setorizados, sendo 1.200m² de área construída e mais 1.100m² de área aberta com amplo estacionamento, proporcionando excelente organização, conforto e segurança na movimentação de cargas."
}

// DADOS DAS MÁQUINAS E SERVIÇOS
const sections = [
  {
    id: "precisao",
    title: "Usinagem de Precisão",
    subtitle: "Um diferencial que proporciona acabamentos finos e tolerâncias centesimais para componentes críticos com elevada dureza.",
    items: [
      {
        title: "Eletroerosão por Penetração",
        description: "Usinagem de cavidades complexas e materiais endurecidos com alta fidelidade.",
        image: "/assets/e011.jpg", // ou .png
        capacidade: "Cursos de Eixos (X, Y, Z): 300x200x200mm",
        fabricante: "INFRESA ONA (GORKA 200)",
        observacoes: "Peso sobre a mesa 300kg"
      },
      {
        title: "Retífica Cilíndrica",
        description: "Acabamento superficial superior e ajuste dimensional preciso para eixos e peças cilíndricas em materiais endurecidos.",
        image: "/assets/e012.jpg",
        capacidade: "Diâmetro Máximo Retificável: 360x750mm",
        fabricante: "SULMECÂNICA (UNIVERSAL RUAP 750)",
        observacoes: "Peso placa e ponto 80kg"
      },
      {
        title: "Retífica Plana",
        description: "Retificação de faces com garantia de planicidade e rugosidade controlada em materiais endurecidos com alta fidelidade.",
        image: "/assets/e013.jpg",
        capacidade: "Cursos de Eixos (X, Y, Z): 640x360x300mm",
        fabricante: "FERDMAT (UNIVERSAL T60)",
        observacoes: "Peso sobre a mesa 330kg"
      }
    ]
  },
  {
    id: "cnc",
    title: "Usinagem CNC",
    subtitle: "Mais um diferencial em Sergipe que proporciona atividades de forma automatizada com repetibilidade para produção seriada em peças complexas.",
    items: [
      {
        title: "Torno CNC Logic 195III",
        description: "Produção seriada, alta produtividade com perfis complexos ou roscas especiais.",
        image: "/assets/e014.jpg",
        capacidade: "Dimensões de usinagem (X,Y) Ø400x970mm",
        fabricante: "Nardini (Logic 195III)",
        observacoes: "Peso admissível de usinagem 400kg"
      },
      {
        title: "Centro de Usinagem Cincinnati",
        description: "Equipamento robusto para fresamento complexo e furação coordenada.",
        image: "/assets/e015.jpg",
        capacidade: "Dimensões de usinagem (X,Y,z) Ø508x508x508mm com 4° eixo",
        fabricante: "Cincinnati (Milacron Arrow 500)",
        observacoes: "Peso admissível de usinagem 800kg"
      },
      {
        title: "Centro de Usinagem ROMI",
        description: "Equipamento robusto para fresamento complexo e furação coordenada.",
        image: "/assets/e016.jpg",
        capacidade: "Dimensões de usinagem (X,Y,z) Ø762x406x508mm",
        fabricante: "Romi (Discovery 760)",
        observacoes: "Peso admissível de usinagem 800kg"
      }
    ]
  },
  {
    id: "torneamento",
    title: "Torneamento Convencional",
    subtitle: "Versatilidade para produção e manutenção de peças de baixa tiragem e diversos tamanhos.",
    items: [
      {
        title: "Torno Ø800 x 4000mm",
        description: "Equipamento de grande porte para peças longas e pesadas.",
        image: "/assets/e017.jpg",
        fabricante: "TIMEMASTER (CW800)",
        observacoes: "Usinagem de flanges até Ø1000mm, Peso admissível 3000kg"
      },
      {
        title: "Torno Ø660 x 2200mm",
        description: "O padrão da indústria para manutenção geral e peças de médio porte.",
        image: "/assets/e018.jpg",
        fabricante: "TIMEMASTER (CDS 660)",
        observacoes: "Usinagem de flanges até Ø850mm, Peso admissível 2000kg"
      },
      {
        title: "Torno Ø650 x 2200mm",
        description: "Máquina robusta projetada para ferramentaria, manutenção médio porte e produção.",
        image: "/assets/e020.jpg",
        fabricante: "ROMI (I40-A)",
        observacoes: "Peso admissível 1500kg"
      }
    ]
  },
  {
    id: "fresagem",
    title: "Fresagem e Plainamento",
    subtitle: "Usinagem de engrenagens de vários modelos, formas prismáticas, furos, canais e alojamentos precisos.",
    items: [
      {
        title: "Fresadora Universal Nº 2 700 x 230mm",
        description: "Adequada para peças de médio porte que exigem alto rigor dimensional em oficinas de moldes e matrizes.",
        image: "/assets/e023.jpg",
        fabricante: "NATAL (FU2-40)",
        observacoes: "Giro da mesa 45°"
      },
      {
        title: "Fresadora Ferramenteira 700 x 260mm",
        description: "Alta precisão para acabamentos e detalhes técnicos.",
        image: "/assets/e024.jpg",
        fabricante: "VIRTUAL (ZX6332B)",
        observacoes: "Rotação máxima 5000rpm"
      },
      {
        title: "Plaina Limadora 650mm",
        description: "Grande robustez em operações como rasgos de chaveta, estrias, chanfros e acabamento de superfícies planas em peças de médio porte.",
        image: "/assets/e025.jpg",
        fabricante: "ZOCCA (650)"
      }
    ]
  },
  {
    id: "mandrilhamento",
    title: "Mandrilhamento e Furação",
    subtitle: "Processo de usinagem de alta precisão que permite obter superfícies internas cilíndricas, cônicas, esféricas ou radiais, planas e perpendiculares ao eixo.",
    items: [
      {
        title: "Mandrilhadora convencional",
        description: "Máquina-ferramenta robusta de fabricação polonesa, ideal para usinagem de precisão em peças de médio a grande porte oferece alta rigidez para operações de mandrilamento, fresamento e furação.",
        image: "/assets/e026.jpg",
        capacidade: "X1050 x Y1000 x Z1400 mm",
        fabricante: "WARSZAWA (FUSO Ø80)",
        observacoes: "Capacidade de carga sobre a mesa 4t"
      },
      {
        title: "Furadeira Radial 60 X 2000 X 2500mm",
        description: "Máquina robusta, projetada para furação profunda, alargamento e rosqueamento em peças de grande porte.",
        image: "/assets/e027.jpg",
        fabricante: "NARDINI (FNR 80)",
        observacoes: "Capacidade de furação Ø60mm"
      }
    ]
  },
  {
    id: "tratamento",
    title: "Tratamento Térmico",
    subtitle: "Estrutura completa com fornos de câmara para tratamento térmico de têmpera, cementação sólida, revenimento e normalização em aços carbono, ligas e aços ferramentas.",
    items: [
      {
        title: "Forno elétrico horizontal mufla 700 x 700 x 900mm",
        description: "Projetada tratar termicamente peças industriais aumentando a vida útil contra desgaste ou fraturas.",
        image: "/assets/e028.jpg",
        capacidade: "1050ºC 600 x 600 x 900mm",
        fabricante: "SANCHIS (ETT)",
        observacoes: "Máxima 1050°C 150kg"
      },
      {
        title: "Forno elétrico vertical mufla 700 x 700 x 900mm",
        description: "Projetada tratar termicamente peças industriais e fundição de peças em alumínio.",
        image: "https://images.unsplash.com/photo-1503693240228-a400c804f86d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", // Coloque o nome do arquivo quando tiver
        capacidade: "1200ºC Ø400 x 500mm",
        fabricante: "JB",
        observacoes: "Máxima 1200°C 100kg"
      },
      {
        title: "Tanque de resfriamento com agitação",
        description: "Para resfriamento de peças através de Óleo ou salmoura com agitação.",
        image: "https://images.unsplash.com/photo-1565439398533-3158dc060c4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        capacidade: "Ø500 x 900mm",
        fabricante: "Nardelli",
        observacoes: "Máxima 100kg"
      }
    ]
  },
  {
    id: "manutencao",
    title: "Manutenção de Subconjuntos e Caldeiraria",
    subtitle: "Contamos com mecânicos qualificados para desmontar em campo e após a recuperação e reforma completa, também realizamos a instalação, proporcionando confiabilidade além de serviços de caldeiraria como soldagem, corte, dobra e conformação.",
    items: [
      {
        title: "Manutenção de redutores de velocidade, bombas centrífugas e válvulas",
        description: "Realizamos a peritagem e substituição de toda a estrutura e componentes como engrenagens, mancais, rolamentos e vedações dando vida nova ao equipamento.",
        image: "https://images.unsplash.com/photo-1588619461332-45f8dd955e4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        observacoes: "Até 3000kg"
      },
      {
        title: "Corte a Frio com Guilhotina",
        description: "Equipamento industrial robusto amplamente utilizado para corte de chapas metálicas com precisão sem perda de material durante o corte.",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        capacidade: "2000 x 8,0mm",
        fabricante: "NEWTON (TM10)"
      },
      {
        title: "Corte a Frio com serra fita horizontal e vertical",
        description: "Projetada para cortes precisos de metais em escala industrial reduzindo tempo e mantendo dimensões exatas.",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        capacidade: "Diâmetro máximo a 90° Ø330mm",
        fabricante: "RONEMAK (M-330L)"
      }
    ]
  }
]

export default function Estrutura() {
  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
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

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <Link href="/empresa" className="hover:text-orange-600 transition-colors">Empresa</Link>
            <span className="text-orange-600 font-bold">Estrutura</span>
            <Link href="/#contato" className="hover:text-orange-600 transition-colors">Contato</Link>
            <Link href="/orcamento" className="px-5 py-2.5 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
              Orçamento
            </Link>
          </nav>

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

        <div id="mobile-menu" className="hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm md:hidden flex-col shadow-xl rounded-b-lg mx-2 mt-2 overflow-hidden">
          <div className="py-2">
            <Link href="/" className="block px-6 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Home</Link>
            <Link href="/empresa" className="block px-6 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Empresa</Link>
            <span className="block px-6 py-3 text-orange-600 font-semibold bg-orange-50">Estrutura</span>
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Nossa Estrutura e Equipamentos</h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Da usinagem convencional à tecnologia CNC de ponta. Conheça nossa infraestrutura preparada para atender projetos de alta complexidade e manutenção industrial.
          </p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-6 py-16 space-y-16">

        {/* Renderiza a nova Estrutura Física como DESTAQUE */}
        <PhysicalStructureSection {...estruturaFisicaData} />

        {/* Divisor Visual */}
        <div className="pt-12 pb-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Parque de Máquinas</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Conheça os equipamentos que compõem nosso setor produtivo, divididos por categoria de operação.</p>
        </div>

        {/* Renderiza as Máquinas e Categorias */}
        <div className="space-y-24">
          {sections.map((section, index) => (
            <StructureSection
              key={section.id}
              {...section}
              reversed={index % 2 !== 0}
            />
          ))}
        </div>

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

      <style jsx>{`
        .services-hero {
          background-image: linear-gradient(rgba(15, 23, 42, 0.9), rgba(234, 88, 12, 0.2)), url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
      `}</style>
    </div>
  )
}