'use client'

import React, { useState, useRef } from 'react'
import { CheckCircle2, AlertCircle, Upload, Loader2, Briefcase, User, GraduationCap, FileText, Send, X } from 'lucide-react'

export const VAGAS_OPCOES = [
  "Desenhista mecânico",
  "Líder de produção",
  "Orçamentista mecânico",
  "Técnico em PCP",
  "Auxiliar de Produção",
  "Auxiliar administrativo",
  "Auxiliar de Torneiro Mecânico",
  "Torneiro Mecânico",
  "Mecânico de manutenção industrial",
  "Operador de máquina CNC",
  "Gerente Comercial",
  "Fresador máquinas convencionais",
  "Serviços Gerais",
  "Estagiário",
  "Outros"
];

export function FormularioVagas() {
  const formRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    aceitoTermos: false,
    vaga: '',
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    cidadeEstado: '',
    dataNascimento: '',
    sexo: 'Não informado',
    habilitacao: 'Não possui',
    escolaridade: 'Ensino Médio',
    formacaoSuperior: '',
    formacaoTecnica: '',
    resumoCursos: '',
    experienciaNaVaga: 'Sem experiência',
    resumoExperiencia: '',
    pretensaoSalarial: ''
  })

  const [arquivo, setArquivo] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [mensagemStatus, setMensagemStatus] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null)
  const [modalSucesso, setModalSucesso] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')

    if (value.length > 11) {
      value = value.slice(0, 11)
    }

    if (value.length >= 11) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    } else if (value.length >= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    } else if (value.length >= 6) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    } else if (value.length >= 2) {
      value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2')
    }

    setFormData(prev => ({
      ...prev,
      telefone: value
    }))
  }

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')

    if (!value) {
      setFormData(prev => ({ ...prev, pretensaoSalarial: '' }))
      return
    }

    const numberValue = (parseFloat(value) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    setFormData(prev => ({
      ...prev,
      pretensaoSalarial: numberValue
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.size > 10 * 1024 * 1024) {
        setMensagemStatus({ tipo: 'erro', texto: 'O arquivo de currículo deve ter no máximo 10MB.' })
        return
      }
      setArquivo(selectedFile)
      setMensagemStatus(null)
    }
  }

  const scrollToAlert = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.aceitoTermos) {
      setMensagemStatus({ tipo: 'erro', texto: 'Você precisa aceitar os termos de consentimento para enviar sua inscrição.' })
      scrollToAlert()
      return
    }

    if (!formData.vaga) {
      setMensagemStatus({ tipo: 'erro', texto: 'Por favor, selecione a vaga pretendida.' })
      scrollToAlert()
      return
    }

    if (!formData.nome || !formData.email || !formData.telefone || !formData.cidadeEstado) {
      setMensagemStatus({ tipo: 'erro', texto: 'Preencha todos os campos obrigatórios marcados com (*).' })
      scrollToAlert()
      return
    }

    setLoading(true)
    setMensagemStatus(null)

    try {
      const dataToSend = new FormData()
      dataToSend.append('aceitoTermos', formData.aceitoTermos ? 'Sim' : 'Não')
      dataToSend.append('vaga', formData.vaga)
      dataToSend.append('nome', formData.nome)
      dataToSend.append('email', formData.email)
      dataToSend.append('telefone', formData.telefone)
      dataToSend.append('endereco', formData.endereco)
      dataToSend.append('cidadeEstado', formData.cidadeEstado)
      dataToSend.append('dataNascimento', formData.dataNascimento)
      dataToSend.append('sexo', formData.sexo)
      dataToSend.append('habilitacao', formData.habilitacao)
      dataToSend.append('escolaridade', formData.escolaridade)
      dataToSend.append('formacaoSuperior', formData.formacaoSuperior)
      dataToSend.append('formacaoTecnica', formData.formacaoTecnica)
      dataToSend.append('resumoCursos', formData.resumoCursos)
      dataToSend.append('experienciaNaVaga', formData.experienciaNaVaga)
      dataToSend.append('resumoExperiencia', formData.resumoExperiencia)
      dataToSend.append('pretensaoSalarial', formData.pretensaoSalarial)

      if (arquivo) {
        dataToSend.append('arquivo', arquivo)
      }

      const response = await fetch('/api/vagas', {
        method: 'POST',
        body: dataToSend
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setMensagemStatus({
          tipo: 'sucesso',
          texto: 'Sua inscrição foi enviada com sucesso! Os seus dados e currículo foram salvos com segurança em nosso sistema.'
        })
        setModalSucesso(true)

        // Reset form
        setFormData({
          aceitoTermos: false,
          vaga: '',
          nome: '',
          email: '',
          telefone: '',
          endereco: '',
          cidadeEstado: '',
          dataNascimento: '',
          sexo: 'Não informado',
          habilitacao: 'Não possui',
          escolaridade: 'Ensino Médio',
          formacaoSuperior: '',
          formacaoTecnica: '',
          resumoCursos: '',
          experienciaNaVaga: 'Sem experiência',
          resumoExperiencia: '',
          pretensaoSalarial: ''
        })
        setArquivo(null)
      } else {
        throw new Error(result.error || 'Erro ao enviar formulário de inscrição.')
      }
    } catch (err: any) {
      console.error('Erro no envio do formulário:', err)
      setMensagemStatus({
        tipo: 'erro',
        texto: err.message || 'Ocorreu um erro ao enviar sua inscrição. Tente novamente mais tarde.'
      })
      scrollToAlert()
    } finally {
      setLoading(false)
    }
  }

  // Lógica para exibição condicional dos campos de formação com base na Escolaridade
  const exibeFormacaoTecnica = formData.escolaridade.includes('Técnico')
  const exibeFormacaoSuperior = formData.escolaridade.includes('Superior') || formData.escolaridade.includes('Pós-Graduação')

  return (
    <div ref={formRef} id="formulario-inscricao" className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-10 text-slate-800 max-w-4xl mx-auto relative">
      <div className="border-b border-slate-200 pb-6 mb-8 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center md:justify-start gap-3">
          <Briefcase className="w-8 h-8 text-orange-600" />
          Formulário de Inscrição para Vagas
        </h2>
        <p className="text-slate-600 mt-2">
          Preencha seus dados pessoais e profissionais abaixo para candidatar-se às oportunidades da Nardelli Usinagem.
        </p>
      </div>

      {/* BANNER DE STATUS / MENSAGEM */}
      {mensagemStatus && (
        <div className={`mb-8 p-5 rounded-xl flex items-start gap-3 border shadow-sm transition-all ${
          mensagemStatus.tipo === 'sucesso' 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
            : 'bg-rose-50 border-rose-300 text-rose-900'
        }`}>
          {mensagemStatus.tipo === 'sucesso' ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <h4 className="font-bold text-base">
              {mensagemStatus.tipo === 'sucesso' ? 'Inscrição Enviada com Sucesso!' : 'Atenção ao preencher o formulário'}
            </h4>
            <p className="text-sm mt-1 leading-relaxed">{mensagemStatus.texto}</p>
          </div>
          <button 
            type="button" 
            onClick={() => setMensagemStatus(null)}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* MODAL DE SUCESSO DE INSCRIÇÃO */}
      {modalSucesso && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full text-center shadow-2xl border border-slate-100 transform transition-all">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Inscrição Confirmada!</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Recebemos seu formulário e seu currículo com sucesso. Seus dados já estão salvos em nosso banco de talentos para análise da nossa equipe de RH.
            </p>
            <button
              onClick={() => setModalSucesso(false)}
              className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              Concluir
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* TERMO DE CONSENTIMENTO (LGPD) */}
        <div className="bg-orange-50/70 border border-orange-200 rounded-xl p-4 md:p-5 flex items-start gap-3">
          <input
            type="checkbox"
            id="aceitoTermos"
            name="aceitoTermos"
            checked={formData.aceitoTermos}
            onChange={handleCheckboxChange}
            required
            className="mt-1 h-5 w-5 text-orange-600 focus:ring-orange-500 border-slate-300 rounded cursor-pointer"
          />
          <label htmlFor="aceitoTermos" className="text-sm font-medium text-slate-800 cursor-pointer">
            <span className="font-bold text-orange-900 block mb-0.5">Termo de Consentimento para Cadastro</span>
            Aceito informar meus dados pessoais e profissionais para cadastro no banco de talentos da Nardelli Usinagem. * (marcar "sim")
          </label>
        </div>

        {/* 1. SELEÇÃO DA VAGA */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4 text-orange-600 border-b border-slate-100 pb-2">
            <Briefcase className="w-5 h-5" />
            1. Vaga Pretendida
          </h3>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Selecione a Vaga Desejada *
            </label>
            <select
              name="vaga"
              value={formData.vaga}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white text-slate-900"
            >
              <option value="">-- Selecione uma opção --</option>
              {VAGAS_OPCOES.map((opcao, idx) => (
                <option key={idx} value={opcao}>
                  {opcao}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2. DADOS PESSOAIS */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4 text-orange-600 border-b border-slate-100 pb-2">
            <User className="w-5 h-5" />
            2. Dados Pessoais e de Contato
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nome Completo *</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                required
                placeholder="Seu nome completo"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">E-mail *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="seuemail@exemplo.com"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Telefone / WhatsApp *</label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handlePhoneChange}
                required
                placeholder="(79) 99999-9999"
                maxLength={15}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Endereço Residencial *</label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleInputChange}
                required
                placeholder="Rua, Número, Bairro"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Cidade / Estado *</label>
              <input
                type="text"
                name="cidadeEstado"
                value={formData.cidadeEstado}
                onChange={handleInputChange}
                required
                placeholder="Ex: Aracaju / SE"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Data de Nascimento *</label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Sexo</label>
              <select
                name="sexo"
                value={formData.sexo}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
              >
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
                <option value="Preferir não informar">Preferir não informar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Possui Habilitação (CNH)?</label>
              <select
                name="habilitacao"
                value={formData.habilitacao}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
              >
                <option value="Categoria A">Categoria A</option>
                <option value="Categoria B">Categoria B</option>
                <option value="Categoria A e B">Categoria A e B (AB)</option>
                <option value="Categoria C/D/E">Categoria C / D / E</option>
                <option value="Não possui">Não possui</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. ESCOLARIDADE E FORMAÇÃO (EXIBIÇÃO CONDICIONAL) */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4 text-orange-600 border-b border-slate-100 pb-2">
            <GraduationCap className="w-5 h-5" />
            3. Escolaridade e Cursos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Escolaridade *</label>
              <select
                name="escolaridade"
                value={formData.escolaridade}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
              >
                <option value="Ensino Fundamental incompleto/completo">Ensino Fundamental</option>
                <option value="Ensino Médio incompleto/completo">Ensino Médio</option>
                <option value="Nível Técnico">Nível Técnico</option>
                <option value="Ensino Superior incompleto/completo">Ensino Superior</option>
                <option value="Pós-Graduação / Especialização">Pós-Graduação / Especialização</option>
              </select>
            </div>

            {/* Campo condicional para Nível Técnico */}
            {exibeFormacaoTecnica && (
              <div className="md:col-span-2 animate-fade-in">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Descreva a sua Formação Técnica *
                </label>
                <input
                  type="text"
                  name="formacaoTecnica"
                  value={formData.formacaoTecnica}
                  onChange={handleInputChange}
                  required={exibeFormacaoTecnica}
                  placeholder="Ex: Técnico em Mecânica Industrial, Eletrotécnica, Usinagem, etc."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-orange-50/20"
                />
              </div>
            )}

            {/* Campo condicional para Ensino Superior / Pós */}
            {exibeFormacaoSuperior && (
              <div className="md:col-span-2 animate-fade-in">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Descreva a sua Formação no Ensino Superior / Pós-Graduação *
                </label>
                <input
                  type="text"
                  name="formacaoSuperior"
                  value={formData.formacaoSuperior}
                  onChange={handleInputChange}
                  required={exibeFormacaoSuperior}
                  placeholder="Ex: Engenharia Mecânica, Administração de Empresas, etc."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-orange-50/20"
                />
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Resumo de Cursos Extracurriculares e Qualificações (Opcional)
              </label>
              <textarea
                name="resumoCursos"
                value={formData.resumoCursos}
                onChange={handleInputChange}
                rows={3}
                placeholder="Ex: Curso de Torneiro Mecânico (SENAI), Metrologia, Leitura e Interpretação de Desenho Técnico, Pacote Office..."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-y"
              />
            </div>
          </div>
        </div>

        {/* 4. EXPERIÊNCIA E PRETENSÃO */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4 text-orange-600 border-b border-slate-100 pb-2">
            <FileText className="w-5 h-5" />
            4. Experiência Profissional e Pretensão
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Experiência profissional na vaga pretendida *
              </label>
              <select
                name="experienciaNaVaga"
                value={formData.experienciaNaVaga}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
              >
                <option value="Sem experiência">Sem experiência prévia</option>
                <option value="Menos de 1 ano">Menos de 1 ano</option>
                <option value="De 1 a 3 anos">De 1 a 3 anos</option>
                <option value="De 3 a 5 anos">De 3 a 5 anos</option>
                <option value="Mais de 5 anos">Mais de 5 anos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Pretensão Salarial</label>
              <input
                type="text"
                name="pretensaoSalarial"
                value={formData.pretensaoSalarial}
                onChange={handleSalaryChange}
                placeholder="R$ 0,00"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all font-medium text-slate-900"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Descreva um breve resumo das suas experiências profissionais
              </label>
              <textarea
                name="resumoExperiencia"
                value={formData.resumoExperiencia}
                onChange={handleInputChange}
                rows={4}
                placeholder="Detalhe os últimos cargos ocupados, empresas onde trabalhou e principais atividades desempenhadas..."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-y"
              />
            </div>
          </div>
        </div>

        {/* 5. ANEXO DE CURRÍCULO */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4 text-orange-600 border-b border-slate-100 pb-2">
            <Upload className="w-5 h-5" />
            5. Anexo do Currículo
          </h3>

          <div className="border-2 border-dashed border-slate-300 hover:border-orange-500 rounded-xl p-6 text-center transition-colors bg-slate-50">
            <input
              type="file"
              id="arquivo-curriculo"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="arquivo-curriculo" className="cursor-pointer flex flex-col items-center justify-center">
              <Upload className="w-10 h-10 text-orange-600 mb-2" />
              <span className="font-semibold text-slate-800">
                {arquivo ? arquivo.name : 'Clique para selecionar seu Currículo (PDF ou DOCX)'}
              </span>
              <span className="text-xs text-slate-500 mt-1">Tamanho máximo: 10MB</span>
            </label>
            {arquivo && (
              <button
                type="button"
                onClick={() => setArquivo(null)}
                className="mt-3 text-xs text-rose-600 font-semibold hover:underline"
              >
                Remover arquivo
              </button>
            )}
          </div>
        </div>

        {/* BOTÃO DE SUBMIT */}
        <div className="pt-4 border-t border-slate-200">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-900/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Enviando inscrição...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Enviar Inscrição para a Vaga
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  )
}
