'use client'

import React, { useState } from 'react'

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState('department') // 'department' | 'message'
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')

  const departments = {
    comercial: {
      name: 'Comercial',
      phone: process.env.NEXT_PUBLIC_WHATSAPP_COMERCIAL || '557932052272',
      description: 'Orçamentos e vendas'
    },
    financeiro: {
      name: 'Financeiro', 
      phone: process.env.NEXT_PUBLIC_WHATSAPP_FINANCEIRO || '557932052272',
      description: 'Pagamentos e cobrança'
    }
  }

  const handleDepartmentSelect = (dept: string) => {
    setSelectedDepartment(dept)
    setStep('message')
  }

  const handleSendMessage = () => {
    const dept = departments[selectedDepartment as keyof typeof departments]
    
    let infoParts = []
    if (name) infoParts.push(`Olá sou ${name}`)
    if (email) infoParts.push(`meu email é: ${email}`)
    if (company) infoParts.push(`represento a empresa: ${company}`)
    
    let intro = infoParts.join(', ')
    if (infoParts.length > 1) {
        const last = infoParts.pop()
        intro = infoParts.join(', ') + ' e ' + last
    }
    
    if (intro) intro += '. '

    const fullMessage = `${intro}${message || 'Olá! Gostaria de mais informações.'}`
    const encodedMessage = encodeURIComponent(fullMessage)
    const whatsappUrl = `https://wa.me/${dept.phone}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
    
    // Reset and close
    setIsOpen(false)
    setStep('department')
    setSelectedDepartment('')
    setMessage('')
    setName('')
    setCompany('')
    setEmail('')
  }

  const handleBack = () => {
    setStep('department')
    setSelectedDepartment('')
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 w-80 bg-white rounded-lg shadow-2xl border border-slate-200 z-50 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <p className="text-xs opacity-90">Nardelli Usinagem</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-green-600 rounded p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {step === 'department' && (
              <div>
                <p className="text-slate-600 mb-4 text-sm">
                  Olá! Com qual departamento você gostaria de falar?
                </p>
                <div className="space-y-2">
                  {Object.entries(departments).map(([key, dept]) => (
                    <button
                      key={key}
                      onClick={() => handleDepartmentSelect(key)}
                      className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-green-500 hover:bg-green-50 transition-colors"
                    >
                      <div className="font-medium text-slate-900">{dept.name}</div>
                      <div className="text-xs text-slate-500">{dept.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'message' && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <button 
                    onClick={handleBack}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div>
                    <p className="font-medium text-slate-900">
                      {departments[selectedDepartment as keyof typeof departments]?.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {departments[selectedDepartment as keyof typeof departments]?.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Seu Nome (Opcional)</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                            placeholder="Seu nome"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Empresa (Opcional)</label>
                        <input 
                            type="text" 
                            value={company} 
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                            placeholder="Nome da empresa"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Email (Opcional)</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                            placeholder="seu@email.com"
                        />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Digite sua mensagem:
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Olá! Gostaria de mais informações..."
                      className="w-full p-3 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      rows={3}
                    />
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                    Enviar Mensagem
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 hover:scale-110"
        title="Fale conosco no WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </button>
    </>
  )
}