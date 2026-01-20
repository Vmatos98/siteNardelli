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

      {/* Mobile Social Buttons - Only visible on mobile and when chat is closed */}
      {!isOpen && (
        <div className="fixed bottom-28 right-8 z-40 flex flex-col gap-4 md:hidden animate-fade-in-up">
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white p-3 rounded-full shadow-lg text-red-600 hover:scale-110 transition-transform border border-slate-100" 
            title="YouTube"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white p-3 rounded-full shadow-lg text-pink-600 hover:scale-110 transition-transform border border-slate-100" 
            title="Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
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