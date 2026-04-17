'use client'

import { useState } from 'react'
import { FileText, Download } from 'lucide-react'
import { CVViewer } from './cv-viewer'

export function PortafolioProfesional() {
  const [isOpeningCV, setIsOpeningCV] = useState(false)

  const certifications = [
    {
      title: 'Certificado IBM CB0101EN',
      subtitle: 'Chatbot Fundamentals',
      issuer: 'IBM Skills Network',
      date: '2024',
      icon: '🤖',
    },
    {
      title: 'Certificado IBM PY0101EN',
      subtitle: 'Python for Data Science',
      issuer: 'IBM Skills Network',
      date: '2024',
      icon: '🐍',
    },
    {
      title: 'IBMSkillsNetwork AI0117EN',
      subtitle: 'Introduction to Artificial Intelligence',
      issuer: 'IBM Cognitive Class',
      date: '2024',
      icon: '🧠',
    },
    {
      title: 'Certificado IBMSkillsNetwork ML0104EN',
      subtitle: 'Introduction to Machine Learning',
      issuer: 'IBM Skills Network',
      date: '2024',
      icon: '🤖',
    },
    {
      title: 'Certificado Iniciación en IA',
      subtitle: 'Automatización de Workflows con n8n',
      issuer: 'Educación Profesional',
      date: '2024',
      icon: '⚙️',
    },
    {
      title: 'Domina ChatGPT',
      subtitle: 'Masterclass de ChatGPT',
      issuer: 'Estudio Digital',
      date: '2024',
      icon: '💬',
    },
    {
      title: 'Jesús Arritola Certificado Iniciación IA',
      subtitle: 'Automatización de Workflows',
      issuer: 'Profesional',
      date: '2024',
      icon: '✨',
    },
    {
      title: 'OnBoarding New Client',
      subtitle: 'Certificación Profesional',
      issuer: 'Especialización',
      date: '2024',
      icon: '🎯',
    },
  ]

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* CV Card - Left Column */}
          <div className="lg:col-span-1">
            <button
              onClick={() => setIsOpeningCV(true)}
              className="group relative h-full overflow-hidden rounded-2xl border border-[#3a4a43]/20 bg-[#151b2d]/60 p-6 transition-all duration-300 hover:border-[#00FFC2]/30 sm:p-8"
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-6 inline-flex items-center justify-center rounded-full bg-[#00FFC2]/10 p-6 transition-transform group-hover:scale-110">
                  <FileText className="h-8 w-8 text-[#00FFC2] sm:h-10 sm:w-10" />
                </div>

                <h3 className="mb-2 font-display text-xl font-bold text-white sm:text-2xl">
                  CV Profesional
                </h3>

                <p className="mb-6 text-sm text-[#dce1fb]/70">
                  Experiencia completa, certificaciones y proyectos destacados en automatización
                </p>

                <div className="flex items-center gap-2 text-sm font-semibold text-[#00FFC2]">
                  <span>Ver CV Completo</span>
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                <div className="mt-auto pt-6 text-xs text-muted-foreground">
                  Jesús Miguel Arritola Alonso
                </div>
              </div>
            </button>
          </div>

          {/* Certifications Grid - Right 2 Columns */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="group overflow-hidden rounded-xl border border-[#3a4a43]/20 bg-[#151b2d]/40 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#00FFC2]/30 hover:bg-[#151b2d]/80 sm:p-5"
                >
                  {/* Icon */}
                  <div className="mb-3 text-3xl sm:text-4xl">{cert.icon}</div>

                  {/* Content */}
                  <h4 className="mb-1 font-semibold text-white line-clamp-2 group-hover:text-[#00FFC2] transition-colors">
                    {cert.title}
                  </h4>
                  <p className="mb-2 text-xs text-[#dce1fb]/70 line-clamp-1">
                    {cert.subtitle}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-[#3a4a43]/20 pt-3 mt-3">
                    <div className="text-xs text-[#dce1fb]/70">
                      <p className="font-medium text-white/70">{cert.issuer}</p>
                      <p className="text-[10px]">{cert.date}</p>
                    </div>
                    <div className="h-1.5 w-1.5 rounded-full bg-[#00FFC2]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 lg:mt-16 lg:gap-8">
          <div className="rounded-xl border border-[#3a4a43]/20 bg-[#151b2d]/40 p-4 text-center backdrop-blur-sm sm:p-6">
            <div className="text-3xl font-bold text-[#00FFC2] sm:text-4xl">6+</div>
            <div className="mt-2 text-sm text-[#dce1fb]/70">
              Meses de Experiencia
            </div>
          </div>

          <div className="rounded-xl border border-[#3a4a43]/20 bg-[#151b2d]/40 p-4 text-center backdrop-blur-sm sm:p-6">
            <div className="text-3xl font-bold text-[#00FFC2] sm:text-4xl">30+</div>
            <div className="mt-2 text-sm text-[#dce1fb]/70">
              Flujos n8n Desarrollados
            </div>
          </div>

          <div className="rounded-xl border border-[#3a4a43]/20 bg-[#151b2d]/40 p-4 text-center backdrop-blur-sm sm:p-6">
            <div className="text-3xl font-bold text-[#00FFC2] sm:text-4xl">8</div>
            <div className="mt-2 text-sm text-[#dce1fb]/70">
              Certificaciones Completadas
            </div>
          </div>
        </div>
      </div>

      {/* CV Viewer Modal */}
      {isOpeningCV && <CVViewer onClose={() => setIsOpeningCV(false)} />}
    </>
  )
}
