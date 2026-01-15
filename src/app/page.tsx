'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Header / Navbar */}
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
            <a href="#home" className="hover:text-orange-600 transition-colors">Home</a>
            <a href="#empresa" className="hover:text-orange-600 transition-colors">Empresa</a>
            <a href="#clientes" className="hover:text-orange-600 transition-colors">Clientes</a>
            <Link href="/servicos" className="hover:text-orange-600 transition-colors">Serviços</Link>
            <a href="#contato" className="hover:text-orange-600 transition-colors">Contato</a>
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
        <div id="mobile-menu" className="hidden absolute top-full left-0 w-full bg-white border-t md:hidden flex-col shadow-lg">
          <a href="#home" className="block px-6 py-4 border-b hover:bg-slate-50">Home</a>
          <a href="#empresa" className="block px-6 py-4 border-b hover:bg-slate-50">Empresa</a>
          <a href="#clientes" className="block px-6 py-4 border-b hover:bg-slate-50">Clientes</a>
          <Link href="/servicos" className="block px-6 py-4 border-b hover:bg-slate-50">Serviços</Link>
          <a href="#contato" className="block px-6 py-4 border-b hover:bg-slate-50">Contato</a>
          <Link href="/orcamento" className="block px-6 py-4 bg-orange-50 text-orange-600 font-bold">Orçamento</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-bg min-h-screen flex items-center justify-center pt-16 relative">
        <div className="container mx-auto px-6 text-center text-white z-10">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-orange-300 uppercase bg-slate-800/80 rounded-full border border-orange-500/50 backdrop-blur-sm">
            Desde 1991
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Produzindo com <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">Qualidade e Precisão</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Soluções completas em usinagem de precisão, torno CNC e manutenção industrial para grandes empresas.
          </p>
          
          {/* Botões de Ação */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <Link href="/orcamento" className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded font-semibold transition-all shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2">
              Solicitar Cotação
            </Link>
            <a href="#servicos" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded font-semibold transition-all backdrop-blur-sm">
              Nossos Serviços
            </a>
          </div>

          {/* Redes Sociais em Destaque */}
          <div className="flex flex-col items-center animate-fade-in-up">
            <p className="text-sm text-slate-400 mb-4 uppercase tracking-widest font-semibold">Acompanhe nosso trabalho</p>
            <div className="flex gap-6 items-center bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
              <a href="https://wa.me/557932052272" className="text-white hover:text-green-400 transition-colors" title="WhatsApp">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
              <div className="w-px h-4 bg-white/20"></div>
              <a href="#" className="text-white hover:text-pink-500 transition-colors" title="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.315 0-.595-.122-.807-.315-.21-.21-.315-.49-.315-.807s.105-.595.315-.807c.21-.21.49-.315.807-.315s.595.105.807.315c.21.21.315.49.315.807s-.105.595-.315.807c-.21.193-.49.315-.807.315zm-3.832 9.781c-1.297 0-2.448-.49-3.323-1.297-.928-.875-1.418-2.026-1.418-3.244s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297z"/>
                  <circle cx="12.447" cy="12.447" r="3.708"/>
                </svg>
              </a>
              <div className="w-px h-4 bg-white/20"></div>
              <a href="#" className="text-white hover:text-red-500 transition-colors" title="YouTube">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <div className="bg-slate-800 text-white py-12 relative z-10 -mt-8 mx-4 md:mx-12 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-700 border-t-4 border-orange-600">
        <div className="p-4">
          <div className="w-8 h-8 mx-auto mb-3 text-orange-500">📍</div>
          <h3 className="font-bold text-lg">Localização Estratégica</h3>
          <p className="text-sm text-slate-300 mt-1">Fácil acesso e logística facilitada no Dezoito do Forte.</p>
        </div>
        <div className="p-4">
          <div className="w-8 h-8 mx-auto mb-3 text-orange-500">⚙️</div>
          <h3 className="font-bold text-lg">Tecnologia CNC</h3>
          <p className="text-sm text-slate-300 mt-1">Equipamentos modernos para máxima precisão.</p>
        </div>
        <div className="p-4">
          <div className="w-8 h-8 mx-auto mb-3 text-orange-500">🛡️</div>
          <h3 className="font-bold text-lg">Confiabilidade</h3>
          <p className="text-sm text-slate-300 mt-1">Parceira de grandes empresas como Petrobrás.</p>
        </div>
      </div>

      {/* Sobre a Empresa */}
      <section id="empresa" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-tl-3xl -z-10"></div>
              <Image 
                src="https://nardelliusinagem.com/web/wp-content/uploads/2015/02/elem02-02.png" 
                alt="Oficina de Usinagem" 
                width={600}
                height={400}
                className="rounded-lg shadow-2xl w-full object-cover h-[400px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-6 rounded-lg shadow-lg hidden md:block">
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
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  ✅ Preços Competitivos
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  ✅ Qualidade Garantida
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  ✅ Entrega Pontual
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  ✅ Equipe Especializada
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Clientes */}
      <section id="clientes" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white -skew-x-12 opacity-50 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 inline-block section-title">Nossos Clientes</h2>
              <p className="text-slate-600 mt-4 text-lg">
                A confiança de grandes marcas se conquista com precisão, prazo e responsabilidade. Orgulhosamente atendemos alguns dos maiores nomes da indústria nacional.
              </p>
            </div>
            <Link href="/orcamento" className="hidden md:inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-800 transition-colors">
              Seja nosso cliente →
            </Link>
          </div>
          
          {/* Grid de Clientes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white hover:bg-slate-50 border border-slate-200 hover:border-orange-300 p-10 rounded-xl flex items-center justify-center shadow-sm hover:shadow-xl transition-all duration-300 h-48">
              <div className="flex flex-col items-center gap-3">
                <div className="text-3xl font-extrabold text-slate-400 group-hover:text-[#008542] transition-colors flex items-center gap-2 tracking-tighter">
                  <span className="text-4xl">BR</span> PETROBRAS
                </div>
                <div className="h-1 w-12 bg-slate-200 group-hover:bg-[#008542] transition-all rounded-full"></div>
              </div>
            </div>

            <div className="group bg-white hover:bg-slate-50 border border-slate-200 hover:border-orange-300 p-10 rounded-xl flex items-center justify-center shadow-sm hover:shadow-xl transition-all duration-300 h-48">
              <div className="flex flex-col items-center gap-3">
                <div className="text-3xl font-extrabold text-slate-400 group-hover:text-blue-800 transition-colors uppercase tracking-wide text-center leading-none">
                  Varco<br /><span className="text-xl">National</span>
                </div>
                <div className="h-1 w-12 bg-slate-200 group-hover:bg-blue-800 transition-all rounded-full"></div>
              </div>
            </div>

            <div className="group bg-white hover:bg-slate-50 border border-slate-200 hover:border-orange-300 p-10 rounded-xl flex items-center justify-center shadow-sm hover:shadow-xl transition-all duration-300 h-48">
              <div className="flex flex-col items-center gap-3">
                <div className="text-2xl font-extrabold text-slate-400 group-hover:text-red-700 transition-colors uppercase tracking-widest text-center">
                  Constâncio<br />Vieira
                </div>
                <div className="h-1 w-12 bg-slate-200 group-hover:bg-red-700 transition-all rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 inline-block section-title">Nossos Serviços</h2>
            <p className="text-slate-600 mt-4">Utilizamos equipamentos modernos para garantir a máxima precisão em cada peça produzida.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100 group">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors shadow-sm">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Torno CNC</h3>
              <p className="text-slate-600">Usinagem de peças complexas com alta precisão e repetibilidade garantida por controle numérico computadorizado.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100 group">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors shadow-sm">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Manutenção Industrial</h3>
              <p className="text-slate-600">Recuperação de peças e componentes mecânicos para manter sua linha de produção sempre ativa.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100 group">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors shadow-sm">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Peças Seriadas</h3>
              <p className="text-slate-600">Produção de lotes de peças conforme desenho ou amostra, atendendo rigorosos padrões de qualidade.</p>
            </div>
          </div>
        </div>
      </section>

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
                      +55 (79) 3205-2272
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
                      Segunda a Sexta: 8h às 18h<br />
                      Sábado: 8h às 12h
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

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/557932052272" className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50">
        📱
      </a>
    </div>
  )
}