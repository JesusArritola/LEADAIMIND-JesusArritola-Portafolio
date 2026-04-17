'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

interface CVViewerProps {
  onClose: () => void
}

export function CVViewer({ onClose }: CVViewerProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  useEffect(() => {
    // Handle ESC key to close modal
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-[#151b2d] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#3a4a43]/20 bg-[#151b2d]/50 px-4 py-4 sm:px-6 sm:py-5">
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
            Currículum Vitae Profesional
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#3a4a43]/20 text-[#dce1fb]/70 transition-colors hover:bg-[#2e3447] hover:text-white"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content with right side scroll */}
        <div className="overflow-y-auto max-h-[calc(90vh-70px)] pr-2 custom-scrollbar-diagram">
          <div className="space-y-8 p-4 sm:p-6 lg:p-8">
            {/* Hero Section with Profile Photo */}
            <div className="border-b border-[#3a4a43]/20 pb-8">
              <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                {/* Profile Photo */}
                <div className="flex justify-center sm:justify-start">
                  <img
                    src="/images/profile-photo.jpg"
                    alt="Jesús Miguel Arritola Alonso"
                    className="h-32 w-32 rounded-full border-4 border-[#00FFC2]/30 object-cover shadow-lg"
                  />
                </div>
                
                <div className="flex-1">
                  <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
                    Jesús Miguel Arritola Alonso
                  </h1>
                  <p className="mt-2 text-lg text-[#00FFC2]">
                    Especialista en Automatización & Desarrollo Web
                  </p>
                  
                  <div className="mt-4 flex flex-col gap-1 text-sm text-[#dce1fb]/70">
                    <p>📧 jesusarritola@gmail.com</p>
                    <p>📱 +53 5668-6432</p>
                    <p>🌐 Cuba</p>
                  </div>
                </div>
              </div>

              <p className="text-base leading-relaxed text-white/80">
                Profesional especializado en automatización de procesos empresariales, desarrollo web moderno y soluciones de inteligencia artificial. 
                Actualmente en 4to año de Ingeniería en Ciberseguridad en la Universidad de las Ciencias Informáticas (UCI) de Cuba. 
                Con más de 6 meses de experiencia desarrollando y gestionando 30+ flujos de automatización complejos usando n8n, 
                integración de APIs avanzadas y soluciones de business automation que generan impacto mensurable.
              </p>
            </div>

            {/* Experiencia */}
            <div className="space-y-4 border-b border-[#3a4a43]/20 pb-8">
              <h2 className="font-display text-2xl font-bold text-white">
                Experiencia Profesional
              </h2>
              <div className="space-y-4">
                <div className="rounded-lg border border-[#3a4a43]/20 bg-[#2e3447]/30 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-white">
                        Especialista en Automatización & Automatización Web
                      </h3>
                      <p className="text-sm text-[#dce1fb]/70">Freelance | 2024 - Presente</p>
                    </div>
                    <span className="whitespace-nowrap rounded-full bg-[#00FFC2]/10 px-3 py-1 text-xs font-semibold text-[#00FFC2]">
                      6+ meses
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm text-white/80">
                    <li>• Ha desarrollado más de 30 flujos de automatización complejos con n8n</li>
                    <li>• Integración avanzada de APIs y servicios empresariales</li>
                    <li>• Automatización completa de procesos de negocio críticos</li>
                    <li>• Soporte técnico y mantenimiento proactivo de workflows en producción</li>
                    <li>• Generación de ROI mensurable a través de automatización inteligente</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Educación */}
            <div className="space-y-4 border-b border-[#3a4a43]/20 pb-8">
              <h2 className="font-display text-2xl font-bold text-white">
                Formación Académica
              </h2>
              <div className="space-y-4">
                <div className="rounded-lg border border-[#3a4a43]/20 bg-[#2e3447]/30 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-white">
                        Ingeniería en Ciberseguridad
                      </h3>
                      <p className="text-sm text-[#dce1fb]/70">
                        Universidad de las Ciencias Informáticas (UCI), Cuba
                      </p>
                    </div>
                    <span className="whitespace-nowrap rounded-full bg-[#00FFC2]/10 px-3 py-1 text-xs font-semibold text-[#00FFC2]">
                      4to año (En curso)
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm text-white/80">
                    <li>• Especialización en seguridad informática y automatización de procesos</li>
                    <li>• Programación avanzada en múltiples lenguajes y frameworks</li>
                    <li>• Gestión integral de infraestructura TI y redes</li>
                    <li>• Desarrollo de soluciones empresariales escalables</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Certificaciones */}
            <div className="space-y-4 border-b border-[#3a4a43]/20 pb-8">
              <h2 className="font-display text-2xl font-bold text-white">
                Certificaciones
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  'IBM CB0101EN - Cognitive Class Chatbot Fundamentals',
                  'IBM PY0101EN - Cognitive Class Python for Data Science',
                  'IBMSkillsNetwork AI0117EN - Prompt Engineering for Everyone',
                  'IBM ML0104EN - Introduction to Machine Learning',
                  'Certificado Iniciación en IA - Workflow con n8n',
                  'Jesús Arritola Certificado Iniciación IA - Workflow',
                  'Domina ChatGPT - Masterclass',
                  'OnBoarding New Client - Certificación Profesional',
                ].map((cert) => (
                  <div
                    key={cert}
                    className="flex items-start gap-2 rounded-lg border border-[#3a4a43]/20 bg-[#2e3447]/30 p-3"
                  >
                    <span className="mt-0.5 text-[#00FFC2]">✓</span>
                    <span className="text-sm font-medium text-white/80">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Habilidades */}
            <div className="space-y-4 border-b border-[#3a4a43]/20 pb-8">
              <h2 className="font-display text-2xl font-bold text-white">
                Competencias Técnicas
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-white">Plataformas de Automatización</h4>
                  <div className="flex flex-wrap gap-2">
                    {['n8n (Experto)'].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-[#00FFC2]/10 px-3 py-1 text-xs font-semibold text-[#00FFC2]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-white">IA & Modelos LLM</h4>
                  <div className="flex flex-wrap gap-2">
                    {['OpenAI GPT', 'Anthropic Claude', 'Google Gemini', 'ChatGPT'].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-[#00FFC2]/10 px-3 py-1 text-xs font-semibold text-[#00FFC2]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-white">Desarrollo Web</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-[#00FFC2]/10 px-3 py-1 text-xs font-semibold text-[#00FFC2]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-white">Bases de Datos & Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    {['PostgreSQL', 'Supabase', 'REST APIs'].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-[#00FFC2]/10 px-3 py-1 text-xs font-semibold text-[#00FFC2]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Proyectos Destacados */}
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">
                Proyectos Destacados
              </h2>
              <div className="space-y-3">
                {[
                  'Sistema integral de generación y gestión automatizada de leads con análisis predictivo',
                  'Agente conversacional de ventas IA para Telegram con tasas de conversión mejoradas',
                  'Plataforma de email marketing automatizado con análisis avanzado y segmentación',
                  'Bot conversacional inteligente para atención al cliente 24/7 con resolución automática',
                  'Sistema de web scraping inteligente para extracción y enriquecimiento de leads B2B',
                  'Automatización de facturación y contabilidad con integración ERP',
                ].map((project) => (
                  <div
                    key={project}
                    className="flex items-start gap-3 rounded-lg border border-[#3a4a43]/20 bg-[#2e3447]/30 p-3"
                  >
                    <span className="mt-0.5 text-[#00FFC2] font-bold">→</span>
                    <span className="text-sm text-white/80">{project}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
