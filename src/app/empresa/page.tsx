'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Empresa() {

  // DADOS DA LINHA DO TEMPO
  const timeline = [
    {
      year: "1991",
      title: "Fundação",
      desc: "Início das atividades em Aracaju-SE, com foco em manutenção preventiva e corretiva para a indústria têxtil, pelas mãos de Uberto e Isabel Nardelli."
    },
    {
      year: "2004",
      title: "Expansão Tecnológica",
      desc: "Investimento massivo em novas tecnologias e capacitação técnica. Ampliação da estrutura física para atender a demanda crescente."
    },
    {
      year: "2010",
      title: "Resiliência e Sucessão",
      desc: "Com o falecimento da guerreira e fundadora Isabel Nardelli, a nova geração assume a liderança, mantendo vivo o legado e os valores da família."
    },
    {
      year: "2013",
      title: "Salto Tecnológico e Precisão",
      desc: "Aquisição do primeiro equipamento CNC, marcando a transição definitiva para a usinagem de alta precisão e produção seriada."
    },
    {
      year: "2017",
      title: "Cultura de Excelência (5S)",
      desc: "Implementação rigorosa do programa 5S. Uma verdadeira revolução na organização, limpeza e padronização da nossa indústria."
    },
    {
      year: "2024",
      title: "Nova Sede e Novos Caminhos",
      desc: "Terceira grande mudança para um parque fabril ainda maior e moderno. Neste mesmo ano, o sócio Júlio se despede amigavelmente para abraçar uma oportunidade irrecusável em outro estado, mantendo intactos o respeito e a parceria."
    },
    {
      year: "Hoje",
      title: "Nova Era e Consolidação",
      desc: "Sob a gestão de Fabiano Nardelli e Bruna Mayara, a empresa segue em constante evolução, atuando com excelência nos setores Petroquímico, Mineração, Plástico e muitos outros."
    }
  ];

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
            <Link href="/estrutura" className="hover:text-orange-600 transition-colors">Estrutura</Link>
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
            <Link href="/estrutura" className="block px-6 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Estrutura</Link>
            <Link href="/#contato" className="block px-6 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Contato</Link>
            <div className="mx-4 my-2 h-px bg-slate-200"></div>
            <Link href="/orcamento" className="block mx-4 my-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg text-center hover:from-orange-600 hover:to-orange-700 transition-all shadow-md">Solicitar Orçamento</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-900 pt-40 pb-24 text-white relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4 block">Tradição desde 1991</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Nossa História e Valores</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Mais de 30 anos transformando suor em peças de precisão. Uma jornada de família construída com transparência, honestidade e fé.
          </p>
        </div>
      </section>

      {/* Nossa História - Linha do Tempo (Fundo Branco) */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">Trajetória de Sucesso</h2>

          <div className="max-w-5xl mx-auto relative">
            {/* Linha Central */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 md:-translate-x-1/2"></div>

            <div className="space-y-16 relative z-10">
              {[
                {
                  year: "1991",
                  title: "Fundação",
                  desc: "Início das atividades em Aracaju-SE, com foco em manutenção preventiva e corretiva para a indústria têxtil, pelas mãos de Uberto e Isabel Nardelli.",
                  image: "/assets/empresa/1991.png" // Troque pela foto antiga do Seu Uberto
                },
                {
                  year: "2004",
                  title: "Expansão Tecnológica",
                  desc: "Investimento massivo em novas tecnologias e capacitação técnica. Ampliação da estrutura física para atender a demanda crescente.",
                  image: "/assets/empresa/2004.png" // Troque pela foto da primeira mudança
                },
                {
                  year: "2008",
                  title: "Segunda Mudança",
                  desc: "Novo salto de crescimento! A empresa realiza a Mudança 02 para uma estrutura ainda mais preparada para serviços de usinagem com tecnologia e versatilidade.",
                  image: "/assets/empresa/2008.png"
                },
                {
                  year: "2010",
                  title: "Resiliência e Sucessão",
                  desc: "Com o falecimento da guerreira e fundadora Isabel Nardelli, a nova geração assume a liderança, mantendo vivo o legado e os valores inegociáveis da família.",
                  // Utilizamos um array 'images' para colocar as duas fotos lado a lado
                  images: [
                    "/assets/empresa/2010-1.png", // Substitua pela foto da Dona Isabel
                    "/assets/empresa/2010-2.png"  // Substitua pela foto dos sucessores
                  ]
                },
                {
                  year: "2013",
                  title: "Salto Tecnológico e Precisão",
                  desc: "Aquisição do primeiro equipamento CNC, marcando a transição definitiva da usinagem convencional para a alta precisão e produção seriada.",
                  image: "/assets/empresa/2013.png"
                },
                {
                  year: "2017",
                  title: "Cultura de Excelência (5S)",
                  desc: "Adoção da metodologia japonesa 5S, transformando nosso ambiente de trabalho. Essa revolução na organização, limpeza e padronização reduziu os tempos de setup, aumentou a segurança da equipe e elevou a precisão e eficiência das nossas entregas.",
                  image: "/assets/empresa/2017.png"
                },
                {
                  year: "2024",
                  title: "Terceira Mudança e Novos Caminhos",
                  desc: "Pela terceira vez, a empresa expande seu espaço físico, deixando o local anterior para se instalar em um parque fabril novo e ainda maior. No mesmo ano, o sócio Júlio se despede amigavelmente para abraçar uma oportunidade em outro estado, com respeito e gratidão mútuos.",
                  image: "/assets/empresa/2024.png"
                },
                {
                  year: "Hoje",
                  title: "Nova Era e Consolidação",
                  desc: "Sob a gestão de Fabiano Nardelli e Bruna Mayara, a empresa segue em evolução contínua, atendendo os setores Petroquímico, Mineração, Plástico e muito mais.",
                  image: "/assets/empresa/hoje.png"
                }
              ].map((item, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-start md:items-center gap-0 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>

                  {/* Bloco de Conteúdo (Texto) */}
                  <div className={`md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    <h3 className="text-2xl font-bold text-orange-600">{item.year}</h3>
                    <h4 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>

                    {/* Imagens Mobile */}
                    <div className="md:hidden mt-4 flex gap-2 w-full aspect-video">
                      {item.images ? (
                        item.images.map((img, i) => (
                          <div key={i} className="relative w-1/2 h-full rounded-xl overflow-hidden shadow-md">
                            <Image
                              src={img}
                              alt={`${item.title} ${i + 1}`}
                              fill
                              className="object-cover"
                              unoptimized={img.startsWith('http')}
                            />
                          </div>
                        ))
                      ) : (
                        item.image && (
                          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-md">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                              unoptimized={item.image.startsWith('http')}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Ponto na Linha */}
                  <div className="absolute left-[14px] md:relative md:left-auto md:mx-auto w-3.5 h-3.5 bg-orange-600 rounded-full ring-4 ring-white shadow-sm z-10 mt-1 md:mt-0 flex-shrink-0"></div>

                  {/* Bloco de Imagem Desktop */}
                  <div className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="flex gap-4 w-full aspect-video">
                      {item.images ? (
                        item.images.map((img, i) => (
                          <div key={i} className="relative w-1/2 h-full rounded-2xl overflow-hidden shadow-lg group">
                            <Image
                              src={img}
                              alt={`${item.title} ${i + 1}`}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              unoptimized={img.startsWith('http')}
                            />
                          </div>
                        ))
                      ) : (
                        item.image && (
                          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg group">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              unoptimized={item.image.startsWith('http')}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filosofia Corporativa - Missão e Diferenciais */}
      <section className="py-20 bg-slate-50">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Filosofia Corporativa</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Trabalhamos para ser líderes no segmento de usinagem, atendendo ativamente 80% das principais indústrias em Sergipe até 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Missão */}
            <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-orange-600"></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Missão</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Ajudar as corporações a materializar seus projetos mecânicos de forma ágil e confiável, através de soluções personalizadas em usinagem e metalurgia, gerando valor e realização aos clientes, investidores e sociedade.
              </p>
            </div>

            {/* Cultura e Diferenciais */}
            <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Nossos Diferenciais</h3>
              <ul className="text-slate-600 space-y-3 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold mt-1">✓</span>
                  Atendimento criterioso, ético e personalizado.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold mt-1">✓</span>
                  Flexibilidade e menor prazo de entrega para reduzir paradas de máquina.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold mt-1">✓</span>
                  Processos de qualidade gerando confiabilidade para o PCM.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold mt-1">✓</span>
                  Somos solucionadores: reduzimos custos e aumentamos a produtividade.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Familiares e Humanos */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Valores que nos Guiam</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Nossa base é sólida porque acreditamos no valor do trabalho, na honestidade, na fé e, acima de tudo, na nossa equipe de colaboradores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div>
              <h4 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">Agir com Segurança e Atenção</h4>
              <p className="text-slate-600">A segurança é praticada até quando ninguém está olhando. Cuidar de nossos colegas é melhorar a qualidade de vida de todos.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">Decisões com Foco no Cliente</h4>
              <p className="text-slate-600">Entender cada necessidade para tomar decisões éticas e transparentes, garantindo a melhor performance e a satisfação real.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">Fazer a Diferença</h4>
              <p className="text-slate-600">Buscamos ser os melhores, nos desafiando e inovando continuamente para superar qualquer dificuldade técnica.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">Senso de Dono e Empatia</h4>
              <p className="text-slate-600">Vestimos a camisa e nos colocamos no lugar do outro. Trabalhamos em equipe com respeito, honestidade e lealdade à instituição.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}