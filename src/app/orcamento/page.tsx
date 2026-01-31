'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface FormData {
  nome: string
  empresa: string
  email: string
  telefone: string
  itemType: string
  observacoes: string
  origem: string
  [key: string]: string
}

interface FieldConfig {
  key: string
  label: string
  type: string
  options?: string[]
  placeholder?: string
  required?: boolean
  unit?: string
  source?: string
}

interface CategoryConfig {
  id: string
  label: string
  campos: FieldConfig[]
}

const formConfig = {
  listasGlobais: {
    materiais: [
      "Aço Carbono (1020/1045)",
      "Aço Liga (4140/4340)",
      "Aço Inox",
      "Ferro Fundido",
      "Bronze",
      "Alumínio",
      "Nylon / Plásticos",
      "Celeron",
      "Latão",
      "Não sei / A definir"
    ],
    servicos: [
      "Fabricação de Peça Nova",
      "Recuperação por Solda",
      "Recuperação por Embuchamento",
      "Retífica",
      "Usinagem (Furo/Rasgo/Chaveta)",
      "Apenas Cotação"
    ],
    tratamentos: [
      "Nenhum",
      "Têmpera",
      "Cementação",
      "Nitretação",
      "Têmpera por Indução"
    ]
  },
  categorias: [
    {
      id: "manutencao",
      label: "Manutenção",
      campos: [
        { key: "objeto_manutencao", label: "Objeto", type: "select", options: ["Redutor", "Bomba", "Válvula", "Outros"], required: true },
        { key: "modelo", label: "Modelo", type: "text", placeholder: "Ex: SEW R57, KSB Cent, etc", required: false },
        { key: "fabricante", label: "Fabricante", type: "text", placeholder: "Ex: SEW, KSB, etc", required: false },
        { key: "servico", label: "Serviço", type: "select", source: "servicos", required: true }
      ]
    },
    {
      id: "engrenagem",
      label: "Engrenagem",
      campos: [
        { key: "tipo", label: "Tipo de Engrenagem", type: "select", options: ["Dentes Retos", "Helicoidal", "Cônica", "Coroa/Sem-fim", "Para Corrente (Asa/DIN)", "Dupla/Bielic"], required: true },
        { key: "z", label: "Nº de Dentes (Z)", type: "number", placeholder: "Ex: 24", required: false },
        { key: "passo", label: "Passo ou Módulo", type: "text", placeholder: "Ex: Módulo 2 ou Asa 40", required: false },
        { key: "dimensao", label: "Diâmetro Externo", type: "text", unit: "mm", required: true },
        { key: "material", label: "Material", type: "select", source: "materiais", required: true },
        { key: "servico", label: "Serviço", type: "select", source: "servicos", required: true }
      ]
    },
    {
      id: "eixo",
      label: "Eixo",
      campos: [
        { key: "tipo", label: "Tipo de Eixo", type: "select", options: ["Liso / Comum", "Escalonado", "Com Rosca / Sem-fim", "Estriado", "Excêntrico"], required: true },
        { key: "dimensao_diametro", label: "Diâmetro Maior", type: "text", unit: "mm", required: true },
        { key: "dimensao_comprimento", label: "Comprimento Total", type: "text", unit: "mm", required: true },
        { key: "detalhes", label: "Detalhes (Rasgo, Rosca)", type: "text", placeholder: "Ex: Rosca M12 na ponta", required: false },
        { key: "material", label: "Material", type: "select", source: "materiais", required: true },
        { key: "tratamento", label: "Tratamento Térmico", type: "select", source: "tratamentos", required: false }
      ]
    },
    {
      id: "polia",
      label: "Polia",
      campos: [
        { key: "tipo", label: "Perfil da Polia", type: "select", options: ["Canal V (A, B, C...)", "Sincronizada (Dentada)", "Lisa/Plana", "Cabo de Aço"], required: true },
        { key: "gornes", label: "Qtd. Canais (Gornes)", type: "number", placeholder: "Ex: 2 canais", required: false },
        { key: "cubo", label: "Tipo de Cubo", type: "select", options: ["Cubo Sólido/Cheio", "Cubo Raiado", "Cônico"], required: false },
        { key: "dimensao", label: "Diâmetro Externo", type: "text", unit: "mm", required: true },
        { key: "material", label: "Material", type: "select", source: "materiais", required: true }
      ]
    },
    {
      id: "acoplamento",
      label: "Acoplamento",
      campos: [
        { key: "tipo", label: "Modelo", type: "select", options: ["Elástico (Pneus/Garras)", "Grade Elástica", "Engrenagens", "Lâminas", "Fole"], required: true },
        { key: "referencia", label: "Referência/Tamanho", type: "text", placeholder: "Ex: Falk 1090, Rotex 48", required: false },
        { key: "dimensao", label: "Diâmetro Externo", type: "text", unit: "mm", required: false },
        { key: "servico", label: "Serviço", type: "select", source: "servicos", required: true }
      ]
    },
    {
      id: "redutor",
      label: "Redutor",
      campos: [
        { key: "tipo", label: "Configuração", type: "select", options: ["Planetário", "Coaxial", "Eixos Paralelos", "Ortogonal (Cônico)", "Sem-Fim"], required: true },
        { key: "estagios", label: "Nº de Estágios", type: "select", options: ["1 Estágio", "2 Estágios", "3 Estágios", "Não sei"], required: false },
        { key: "marca", label: "Fabricante / Marca", type: "text", placeholder: "Ex: SEW, Bonfiglioli, Nord", required: false },
        { key: "servico", label: "Serviço", type: "select", source: "servicos", required: true }
      ]
    },
    {
      id: "cilindro",
      label: "Cilindro / Rolo",
      campos: [
        { key: "tipo", label: "Aplicação", type: "select", options: ["Cilindro Hidráulico/Pneumático", "Rolo de Transporte", "Rolo de Impressão", "Cilindro Laminador"], required: true },
        { key: "dimensoes", label: "Dimensões (Ø x Comp.)", type: "text", unit: "mm", required: true },
        { key: "revestimento", label: "Possui Revestimento?", type: "select", options: ["Não (Aço puro)", "Borracha", "Cromo Duro", "Cerâmica"], required: false },
        { key: "servico", label: "Serviço", type: "select", source: "servicos", required: true }
      ]
    },
    {
      id: "outros",
      label: "Outros Itens",
      campos: [
        { key: "descricao", label: "Descrição do Item", type: "text", required: true },
        { key: "material", label: "Material", type: "select", source: "materiais", required: false },
        { key: "servico", label: "Serviço", type: "select", source: "servicos", required: true }
      ]
    }
  ]
}

export default function Orcamento() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    empresa: '',
    email: '',
    telefone: '',
    itemType: '',
    observacoes: '',
    origem: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<CategoryConfig | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '') // Remove tudo que não é dígito

    // Limita a 11 dígitos (celular) ou 10 dígitos (fixo)
    if (value.length > 11) {
      value = value.slice(0, 11)
    }

    // Aplica a máscara
    if (value.length >= 11) {
      // Celular: (11) 99999-9999
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    } else if (value.length >= 10) {
      // Fixo: (11) 9999-9999
      value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    } else if (value.length >= 6) {
      // Parcial: (11) 9999-
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    } else if (value.length >= 2) {
      // Parcial: (11) 
      value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2')
    }

    setFormData(prev => ({
      ...prev,
      telefone: value
    }))
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value
    setFormData(prev => ({
      ...prev,
      itemType: categoryId
    }))

    const category = formConfig.categorias.find(c => c.id === categoryId)
    setSelectedCategory(category || null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar telefone
    const phoneDigits = formData.telefone.replace(/\D/g, '')
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      alert('Por favor, digite um telefone válido com DDD (10 ou 11 dígitos)')
      return
    }

    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()

      // Adicionar dados do formulário
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })

      // Adicionar arquivo se existir
      if (selectedFile) {
        formDataToSend.append('arquivo', selectedFile)
      }

      const response = await fetch('/api/orcamento', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        alert('Orçamento enviado com sucesso! Nossa equipe entrará em contato.')
        setFormData({
          nome: '',
          empresa: '',
          email: '',
          telefone: '',
          itemType: '',
          observacoes: '',
          origem: ''
        })
        setSelectedCategory(null)
        setSelectedFile(null)
      } else {
        throw new Error('Erro ao enviar orçamento')
      }
    } catch (error) {
      alert('Erro ao enviar orçamento. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderDynamicFields = () => {
    if (!selectedCategory) return null

    return selectedCategory.campos.map((campo) => {
      let labelText = campo.label
      if (campo.unit) labelText += ` (${campo.unit})`
      if (campo.required) labelText += ' *'

      if (campo.type === 'select') {
        let options: string[] = []

        if (campo.source && formConfig.listasGlobais[campo.source as keyof typeof formConfig.listasGlobais]) {
          options = formConfig.listasGlobais[campo.source as keyof typeof formConfig.listasGlobais]
        } else if (campo.options) {
          options = campo.options
        }

        return (
          <div key={campo.key}>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {labelText}
            </label>
            <select
              name={campo.key}
              required={campo.required}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
            >
              <option value="">Selecione...</option>
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )
      } else {
        return (
          <div key={campo.key}>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {labelText}
            </label>
            <input
              type={campo.type}
              name={campo.key}
              required={campo.required}
              placeholder={campo.placeholder}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
            />
          </div>
        )
      }
    })
  }

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
            <Link href="/servicos" className="hover:text-orange-600 transition-colors">Serviços</Link>
            <span className="px-5 py-2.5 bg-orange-600 text-white rounded">Orçamento</span>
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
            <Link href="/servicos" className="block px-6 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Serviços</Link>
            <Link href="/#contato" className="block px-6 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Contato</Link>
            <div className="mx-4 my-2 h-px bg-slate-200"></div>
            <span className="block mx-4 my-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg text-center shadow-md">
              Orçamento Online
            </span>
          </div>
        </div>
      </header>

      {/* Mini Hero */}
      <section className="hero-mini-bg pt-32 pb-20">
        <div className="container mx-auto px-6 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Solicite seu Orçamento</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Preencha o formulário abaixo com as especificações da sua peça. Nossa equipe técnica analisará e retornará com uma proposta personalizada.
          </p>
        </div>
      </section>

      {/* Formulário Principal */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-4xl mx-auto overflow-hidden">

            {/* Barra de Progresso Visual */}
            <div className="bg-slate-100 p-1 flex w-full">
              <div className="w-1/2 h-1 bg-orange-500 rounded-full"></div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 md:p-12">

              {/* Passo 1: Contato */}
              <div className="mb-12">
                <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                  <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Seus Dados
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nome Completo *</label>
                    <input
                      type="text"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Empresa</label>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Corporativo *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Telefone / WhatsApp *</label>
                    <input
                      type="tel"
                      name="telefone"
                      required
                      value={formData.telefone}
                      onChange={handlePhoneChange}
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Formato: (11) 99999-9999 ou (11) 9999-9999
                    </p>
                  </div>
                </div>
              </div>

              {/* Passo 2: Seleção do Item */}
              <div className="mb-12">
                <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                  <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Especificações da Peça
                </h3>

                <div className="mb-8">
                  <label className="block text-sm font-bold text-slate-800 mb-3">O que você precisa usinar?</label>
                  <select
                    value={formData.itemType}
                    onChange={handleCategoryChange}
                    className="w-full px-4 py-4 text-lg rounded-lg border-2 border-slate-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all bg-white cursor-pointer"
                  >
                    <option value="" disabled>Selecione o tipo de peça...</option>
                    {formConfig.categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Área Dinâmica dos Campos Específicos */}
                {selectedCategory && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
                    {renderDynamicFields()}
                  </div>
                )}
              </div>

              {/* Passo 3: Observações */}
              <div className="mb-8">
                <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                  <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Informações Adicionais
                </h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Desenho Técnico ou Foto (Opcional)</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*,.pdf,.dwg,.dxf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="w-8 h-8 mx-auto text-slate-400 group-hover:text-orange-500 mb-2 transition-colors">
                        📁
                      </div>
                      <span className="text-sm text-slate-500 group-hover:text-slate-700">
                        {selectedFile ? selectedFile.name : 'Clique para fazer upload ou arraste o arquivo'}
                      </span>
                      <p className="text-xs text-slate-400 mt-1">
                        Formatos aceitos: JPG, PNG, PDF, DWG, DXF (máx. 10MB)
                      </p>
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Por onde nos conheceu?</label>
                  <select
                    name="origem"
                    value={formData.origem}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
                  >
                    <option value="">Selecione...</option>
                    <option value="Recomendação">Recomendação</option>
                    <option value="Instagram">Instagram</option>
                    <option value="YouTube">YouTube</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Google">Google</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Observações Gerais</label>
                  <textarea
                    rows={4}
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="Quantidade, prazos ou detalhes específicos..."
                  />
                </div>
              </div>

              {/* Botão de Envio */}
              <div className="pt-6 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto md:px-12 py-4 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-bold rounded-lg shadow-lg shadow-orange-900/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitação de Orçamento'}
                  {!isSubmitting && <span>📤</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Nardelli Usinagem. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">Dúvidas? Ligue para +55 (79) 3205-2272</p>
        </div>
      </footer>
    </div>
  )
}
