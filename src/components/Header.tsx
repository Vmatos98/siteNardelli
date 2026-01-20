'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Empresa', path: '/empresa' },
  { name: 'Serviços', path: '/servicos' },
  { name: 'Galeria', path: '/galeria' },
  { name: 'Contato', path: '/#contato' },
]

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname?.startsWith(path)) return true
    return false
  }

  return (
    <header className="fixed w-full z-[100] bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-6 py-3 lg:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Image 
            src="/logo.png" 
            alt="Nardelli Usinagem" 
            width={56}
            height={56}
            className="h-10 md:h-12 lg:h-14 w-auto object-contain"
          />
          <div className="hidden lg:block">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-none">NARDELLI</h1>
            <span className="text-xs text-orange-600 font-semibold tracking-widest uppercase">Usinagem</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-4 font-medium text-xs lg:text-sm text-slate-600">
          <div className="flex items-center gap-3 lg:gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.path} 
                className={`transition-colors relative group py-1 whitespace-nowrap ${
                  isActive(link.path) && link.path !== '/#contato' 
                    ? 'text-orange-600 font-bold' 
                    : 'hover:text-orange-600'
                }`}
              >
                {link.name}
                {isActive(link.path) && link.path !== '/#contato' && (
                   <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-2 lg:gap-3 ml-2 shrink-0">
            <Link 
              href="/trabalhe-conosco" 
              className={`px-3 lg:px-4 py-1.5 lg:py-2 border border-orange-600 text-orange-600 rounded hover:bg-orange-50 transition-colors whitespace-nowrap font-semibold ${
                isActive('/trabalhe-conosco') ? 'bg-orange-50 ring-2 ring-orange-200' : ''
              }`}
            >
              Trabalhe Conosco
            </Link>
            <Link href="/orcamento" className="px-3 lg:px-5 py-2 lg:py-2.5 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors shadow-sm whitespace-nowrap font-semibold">
              Orçamento
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:gap-3 border-l pl-3 lg:pl-4 border-slate-200 h-8 shrink-0">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition-colors transform hover:scale-110" title="Instagram">
              <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 transition-colors transform hover:scale-110" title="YouTube">
              <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-slate-800 focus:outline-none" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm flex-col shadow-xl rounded-b-lg mx-2 mt-2 overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'flex' : 'hidden'}`}>
        <div className="py-2">
          {navLinks.map((link) => (
             <Link 
              key={link.name}
              href={link.path} 
              className={`block px-6 py-3 hover:bg-orange-50 hover:text-orange-600 transition-colors ${
                isActive(link.path) && link.path !== '/#contato' ? 'text-orange-600 font-bold bg-orange-50' : 'text-slate-700'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="mx-4 my-2 h-px bg-slate-200"></div>
          <Link 
            href="/trabalhe-conosco" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className={`block mx-4 my-2 px-4 py-3 border border-orange-600 text-orange-600 font-semibold rounded-lg text-center hover:bg-orange-50 transition-all ${
              isActive('/trabalhe-conosco') ? 'bg-orange-50 ring-2 ring-orange-200' : ''
            }`}
          >
            Trabalhe Conosco
          </Link>
          <Link href="/orcamento" onClick={() => setIsMobileMenuOpen(false)} className="block mx-4 my-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg text-center hover:from-orange-600 hover:to-orange-700 transition-all shadow-md">
            Solicitar Orçamento
          </Link>
        </div>
      </div>
    </header>
  )
}
