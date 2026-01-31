'use client'

import Image from 'next/image'
import Link from 'next/link'
import { StructureSection } from '@/components/StructureSection'

const sections = [
  {
    id: "precisao",
    title: "Precisão",
    subtitle: "Acabamentos finos e tolerâncias centesimais para componentes críticos.",
    items: [
      {
        title: "Eletroerosão por Penetração",
        description: "Usinagem de cavidades complexas e materiais endurecidos com alta fidelidade.",
        image: "/assets/eletroerosaopenetracao.png"
      },
      {
        title: "Retífica Cilíndrica",
        description: "Acabamento superficial superior e ajuste dimensional preciso para eixos e peças cilíndricas.",
        image: "/assets/retificacilindrica.png"
      },
      {
        title: "Retífica Plana",
        description: "Retificação de faces com garantia de planicidade e rugosidade controlada.",
        image: "/assets/retificaplana.png"
      }
    ]
  },
  {
    id: "cnc",
    title: "CNC",
    subtitle: "Automação e repetibilidade para produção seriada e peças complexas.",
    items: [
      {
        title: "Torno CNC",
        description: "Produção seriada e peças com perfis curvos ou roscas especiais.",
        image: "/assets/tornocnc.png"
      },
      {
        title: "Centro de Usinagem Cincinnati Milacron",
        description: "Equipamento robusto para fresamento complexo e furação coordenada.",
        image: "/assets/cnc.png"
      }
    ]
  },
  {
    id: "tornearia",
    title: "Tornearia Convencional",
    subtitle: "Versatilidade para manutenção e peças de grande porte.",
    items: [
      {
        title: "Torno Ø1000 x 4000mm",
        description: "Para eixos longos, cilindros navais e peças pesadas.",
        image: "https://images.unsplash.com/photo-1531206105777-66993a20729c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Torno Ø500 x 1500mm",
        description: "O padrão da indústria para manutenção geral e peças médias.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Torno Ø440 x 1000mm",
        description: "Agilidade e precisão para componentes menores e pinos.",
        image: "https://images.unsplash.com/photo-1617575521317-d2974f3b9345?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "fresagem",
    title: "Fresagem e Mandrilhamento",
    subtitle: "Usinagem de formas prismáticas e alojamentos precisos.",
    items: [
      {
        title: "Fresadora Universal Nº 5",
        description: "Grande porte e desbaste pesado para peças brutas.",
        image: "https://images.unsplash.com/photo-1596637504381-8b3834ae928a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Fresadora Universal Nº 1",
        description: "Versatilidade para serviços gerais e manutenção ágil.",
        image: "https://images.unsplash.com/photo-1563820244-984422e86976?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Fresadora Ferramenteira",
        description: "Alta precisão para acabamentos e detalhes técnicos.",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "furacao",
    title: "Furação e Plaina",
    subtitle: "Operações complementares essenciais para estriados e furos profundos.",
    items: [
      {
        title: "Furadeira Radial ISO 60",
        description: "Furação profunda em peças maciças e grandes blocos.",
        image: "https://images.unsplash.com/photo-1612457813083-0504d6032230?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Furadeira de Coluna e Bancada",
        description: "Agilidade em furações menores e seriadas.",
        image: "https://images.unsplash.com/photo-1572911904589-94300e84b2c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Plaina Limadora",
        description: "Especializada em rasgos de chaveta internos e estriados.",
        image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "corte-caldeiraria",
    title: "Corte e Caldeiraria",
    subtitle: "Estrutura completa com solda especializada e tratamento térmico.",
    items: [
      {
        title: "Corte Industrial",
        description: "Serra Fita (Vertical/Horizontal), Policorte, Corte Plasma e Maçarico Oxicorte.",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Solda & Tratamento Térmico",
        description: "MIG/MAG 440A, TIG Portátil 150A, Eletrodo e Forno a Gás.",
        image: "https://images.unsplash.com/photo-1503693240228-a400c804f86d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Prensa e Diversos",
        description: "Prensa Hidráulica para montagens e Compressor Industrial.",
        image: "https://images.unsplash.com/photo-1565439398533-3158dc060c4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "manutencao",
    title: "Manutenção de Subconjuntos",
    subtitle: "Recuperação e reforma completa de equipamentos industriais críticos.",
    items: [
      {
        title: "Redutores de Velocidade",
        description: "Desmontagem, avaliação de engrenagens/rolamentos e recuperação de carcaças.",
        image: "https://images.unsplash.com/photo-1588619461332-45f8dd955e4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Bombas Industriais",
        description: "Manutenção em bombas centrífugas, de engrenagem e hidráulicas.",
        image: "https://images.unsplash.com/photo-1542013936693-884638332954?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Válvulas de Controle",
        description: "Revisão e teste de válvulas industriais de diversos tipos e bitolas.",
        image: "https://images.unsplash.com/photo-1581093588401-fbb0777894a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
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
            <span className="text-orange-600 font-bold">Estrutura</span>
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
        {sections.map((section, index) => (
          <StructureSection
            key={section.id}
            {...section}
            reversed={index % 2 !== 0}
          />
        ))}
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
