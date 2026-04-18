'use client'

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Sparkles, ArrowLeft } from "lucide-react"
import { useNavbar } from "./navbar-context"

const navLinks = [
  { label: "Servicios", href: "/#servicios", key: "1" },
  { label: "Casos", href: "/#demos", key: "2" },
  { label: "Proceso", href: "/#proceso", key: "3" },
  { label: "Proyectos", href: "/proyectos", key: "4" },
  { label: "Sobre Mí", href: "/acerca-de-mi", key: "5" },
  { label: "Contacto", href: "/#contacto", key: "c" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { isHidden } = useNavbar()
  
  const isSubPage = pathname === '/proyectos' || pathname === '/acerca-de-mi'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (isHidden) {
    return null
  }

  const handleKeyDown = (e: React.KeyboardEvent, href: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (href.startsWith('/')) {
        window.location.href = href
      } else {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
      setIsOpen(false)
    }
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0c1324]/95 backdrop-blur-lg border-b border-[#00FFC2]/10 py-3' 
          : 'bg-[#0c1324]/80 py-4'
      }`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 md:px-6">
        {/* Left: Logo + (optional) Back button on subpages */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="LeadAIMind - Ir al inicio"
            className="flex items-center transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[#00FFC2] focus-visible:outline-offset-4 rounded-md"
          >
            <Image
              src="/images/logo-leadaimind.png"
              alt="LeadAIMind"
              width={180}
              height={48}
              priority
              className="h-8 w-auto sm:h-9 md:h-10 drop-shadow-[0_0_12px_rgba(0,255,194,0.15)]"
            />
          </Link>
          {isSubPage && (
            <Link
              href="/"
              className="group hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151b2d]/60 border border-[#3a4a43]/30 text-xs text-[#dce1fb]/70 hover:text-[#00FFC2] hover:border-[#00FFC2]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,194,0.15)] focus-visible:outline-2 focus-visible:outline-[#00FFC2] focus-visible:outline-offset-2"
            >
              <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-[#00FFC2]/10 group-hover:bg-[#00FFC2]/20 transition-colors">
                <ArrowLeft className="w-3 h-3 text-[#00FFC2] group-hover:-translate-x-0.5 transition-transform duration-300" />
              </span>
              <span className="font-medium">Volver</span>
            </Link>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex" role="menubar">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              role="menuitem"
              className={`group relative px-4 py-2 text-sm font-medium transition-all hover:text-white focus-visible:outline-2 focus-visible:outline-[#00FFC2] focus-visible:outline-offset-2 rounded ${
                link.label === 'Sobre Mí' 
                  ? 'text-[#00FFC2]' 
                  : 'text-[#dce1fb]/80'
              }`}
              aria-label={`${link.label} (Ctrl+${link.key})`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-4 right-4 h-0.5 scale-x-0 bg-[#00FFC2] transition-transform duration-300 group-hover:scale-x-100" />
              {link.label === 'Sobre Mí' && (
                <span className="absolute inset-0 rounded-full">
                  <span className="absolute inset-[-2px] rounded-full animate-glow-border" />
                </span>
              )}
            </a>
          ))}
          
          <a
            href="/#contacto"
            role="menuitem"
            className="ml-4 flex items-center gap-2 rounded-full bg-[#00FFC2] px-5 py-2.5 text-sm font-bold text-[#003828] transition-all duration-300 hover:bg-[#00e1ab] hover:shadow-[0_0_25px_rgba(0,255,194,0.5)] animate-button-pulse focus-visible:outline-2 focus-visible:outline-[#fff] focus-visible:outline-offset-2"
            aria-label="Consulta Gratis (Ctrl+C)"
          >
            <Sparkles className="h-4 w-4" />
            Consulta Gratis
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[#3a4a43]/30 bg-[#151b2d]/50 text-[#dce1fb] transition-all hover:border-[#00FFC2]/50 focus-visible:outline-2 focus-visible:outline-[#00FFC2] md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <div className="relative h-5 w-5">
            <span className={`absolute left-0 h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? 'top-2 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? 'bottom-2 -rotate-45' : 'bottom-0'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 md:hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        role="menu"
        aria-label="Menú de navegación móvil"
        aria-hidden={!isOpen}
      >
        <div className="mx-auto max-w-7xl px-6 pt-4">
          <div className="flex flex-col gap-2 rounded-2xl border border-[#3a4a43]/20 bg-[#0c1324]/95 backdrop-blur-lg p-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                role="menuitem"
                onClick={() => setIsOpen(false)}
                onKeyDown={(e) => handleKeyDown(e, link.href)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all hover:bg-[#00FFC2]/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#00FFC2] focus-visible:outline-offset-2 ${
                  link.label === 'Sobre Mí' ? 'text-[#00FFC2]' : 'text-[#dce1fb]/70'
                }`}
              >
                {link.label}
                <ChevronDown className="h-4 w-4 rotate-[-90deg] opacity-50" />
              </a>
            ))}
            <div className="my-2 border-t border-[#3a4a43]/20" />
            <a
              href="/#contacto"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-[#00FFC2] px-6 py-3 text-center text-sm font-bold text-[#003828] transition-all duration-300 hover:bg-[#00e1ab] hover:shadow-[0_0_25px_rgba(0,255,194,0.5)] animate-button-pulse focus-visible:outline-2 focus-visible:outline-[#fff] focus-visible:outline-offset-2"
            >
              <Sparkles className="h-4 w-4" />
              Consulta Gratis
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
