'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Copy, Check, FileText, Download, ExternalLink, X, File, Award } from 'lucide-react'
import { useState, useEffect } from 'react'

const aboutData = [
  {
    title: 'Habilidades',
    info: [
      { title: 'Automatización & IA', stage: 'n8n, ChatGPT, Gemini, Workflows, AI' },
      { title: 'Desarrollo Full Stack', stage: 'React, Next.js, TypeScript, Python' },
      { title: 'Cloud & DevOps', stage: 'Vercel, CI/CD, Git' },
      { title: 'Bases de Datos', stage: 'PostgreSQL, REST APIs' },
    ],
  },
  {
    title: 'Experiencia',
    info: [
      { title: 'Dipus Digital Solutions', stage: '6 meses | +30 Workflows' },
    ],
  },
  {
    title: 'Tecnologías',
    info: [
      { title: 'Frontend', stage: 'React, Next.js, HTML5, CSS3, JavaScript' },
      { title: 'Backend', stage: 'Python, C++, Node.js, APIs REST' },
      { title: 'Bases de Datos', stage: 'PostgreSQL' },
      { title: 'Automatización', stage: 'n8n, Webhooks, HTTP Requests, IA, ML, LLMs, Prompt Engineering' },
      { title: 'Herramientas', stage: 'Git, Vercel' },
    ],
  },
  {
    title: 'Educación',
    info: [
      { title: 'Ing. en Ciberseguridad', stage: 'Universidad UCI | 2022 - Presente' },
    ],
  },
]

const certificados = [
  { name: 'IBM - Chatbot Development', file: '/certificados/Certificado IBM CB0101EN _ Cognitive Class_Chatbot.pdf' },
  { name: 'Python for Data Science', file: '/certificados/Certificado IBM PY0101EN _ Cognitive Class_Python_Data_Science.pdf' },
  { name: 'Machine Learning Intro', file: '/certificados/Certificado IBMSkillsNetwork ML0104EN _ Introduction_Machne_Learning.pdf' },
  { name: 'n8n Automation Expert', file: '/certificados/Certificado-Jesus-Arritola-s4ml4yys.pdf' },
  { name: 'Iniciación al Desarrollo de IA', file: '/certificados/Certificado-Jesus-Iniciacion_Desarrollo_IA.pdf' },
  { name: 'Inglés B1', file: '/certificados/Diploma_Curso_de_Inglés_B1_Jesús Arritola.pdf' },
  { name: 'Domina VEO3', file: '/certificados/Diploma_Domina_VEO3__Guía_Rápida_para_Principiantes_Jesús Arritola.pdf' },
  { name: 'ChatGPT Mastery', file: '/certificados/Domina_ChatGPT.pdf' },
  { name: 'AI Fundamentals', file: '/certificados/IBMSkillsNetwork AI0117EN Certificate _ Cognitive Class.pdf' },
  { name: 'IA para Workflows', file: '/certificados/Jesús _Certificado_Curso_Iniciacion_IA_WF.pdf' },
  { name: 'Introduction to AI', file: '/certificados/Jesús_Arritola_Certificado_iniciacion_IA.pdf' },
]

const softSkills = [
  'Trabajo en equipo',
  'Resolución de problemas',
  'Aprendizaje continuo',
  'Orientación a resultados'
]

export function Portafolio3D() {
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [index, setIndex] = useState(0)
  const [showCertModal, setShowCertModal] = useState(false)
  const [showCVModal, setShowCVModal] = useState(false)
  const [selectedCert, setSelectedCert] = useState<typeof certificados[0] | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll while any modal is open
  useEffect(() => {
    const anyOpen = showCertModal || showCVModal || selectedCert !== null
    if (anyOpen) {
      const previous = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = previous
      }
    }
  }, [showCertModal, showCVModal, selectedCert])

  // ESC closes the top-most modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (selectedCert) {
        setSelectedCert(null)
      } else if (showCVModal) {
        setShowCVModal(false)
      } else if (showCertModal) {
        setShowCertModal(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [showCertModal, showCVModal, selectedCert])

  const handleCopy = async () => {
    await navigator.clipboard.writeText('jesusarritola@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen relative bg-[#0c1324] overflow-hidden">
      {/* Background Image - Only on right side (hidden on mobile for clean content) */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden md:block md:w-[55%] lg:w-[50%]"
        aria-hidden="true"
      >
        <Image
          src="/images/Foto3DPortafolio.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-[0.62] md:opacity-[0.7] saturate-[0.95]"
        />
        {/* Left-to-right fade: seamless blend into the dark background */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0c1324]/55 to-[#0c1324]" />
        {/* Top/bottom vignette to frame the subject */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1324]/45 via-transparent to-[#0c1324]/75" />
        {/* Subtle accent glow to tie into the brand color */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_68%_42%,rgba(0,255,194,0.08),transparent_72%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center py-16 md:py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-xl lg:max-w-2xl">
          
          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
          >
            Ingeniería + Automatización: <span className="text-[#00FFC2]">Construyendo soluciones que ahorran tiempo</span>
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-[#dce1fb]/70 mb-6 md:mb-8 leading-relaxed"
          >
            Soy <span className="text-white font-medium">Jesús Miguel Arritola</span>, estudiante de 4to año de 
            Ingeniería en Ciberseguridad en la Universidad de las Ciencias Informáticas (UCI). Más allá del aula, 
            llevo más de 8 meses transformando procesos manuales en flujos inteligentes: he desarrollado +30 
            automatizaciones con n8n que integran APIs, gestionan datos y conectan servicios para hacer el 
            trabajo pesado de forma automática.
          </motion.p>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-6 md:gap-10 mb-6 md:mb-8"
          >
            {[
              { number: '8+', label: 'Meses de experiencia' },
              { number: '30+', label: 'Automatizaciones' },
              { number: '100%', label: 'Satisfacción' }
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00FFC2]">{stat.number}</div>
                <div className="text-xs md:text-sm text-[#dce1fb]/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Soft Skills with Title */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.35 }}
            className="mb-6 md:mb-8"
          >
            <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Soft Skills</h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {softSkills.map((skill) => (
                <span 
                  key={skill}
                  className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#00FFC2]/10 border border-[#00FFC2]/20 text-xs md:text-sm text-[#dce1fb]/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.4 }}
            className="mb-6 md:mb-8"
          >
            <div className="flex gap-3 md:gap-4 mb-4 md:mb-6 overflow-x-auto pb-2 items-center">
              {aboutData.map((item, i) => (
                <button
                  key={item.title}
                  onClick={() => setIndex(i)}
                  className={`whitespace-nowrap capitalize text-xs md:text-sm transition-colors relative ${
                    index === i ? 'text-[#00FFC2]' : 'text-[#dce1fb]/60 hover:text-white'
                  }`}
                >
                  {item.title}
                  {index === i && (
                    <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#00FFC2]" />
                  )}
                </button>
              ))}

              {/* Separator between tabs and action buttons */}
              <div className="w-px h-6 bg-[#3a4a43]/40 ml-2 mr-1" aria-hidden="true" />

              {/* Highlighted action buttons - spaced so glow halos never overlap */}
              <div className="flex items-center gap-4 md:gap-5 pl-1 pr-2">
                <button
                  onClick={() => setShowCertModal(true)}
                  aria-label="Abrir mis certificados"
                  className="relative whitespace-nowrap capitalize flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00FFC2]/10 border-2 border-[#00FFC2]/40 text-[#00FFC2] text-xs md:text-sm font-semibold hover:bg-[#00FFC2]/20 hover:border-[#00FFC2]/60 transition-all animate-glow-button"
                >
                  <Award className="w-3.5 h-3.5" />
                  Certificados
                </button>
                <button
                  onClick={() => setShowCVModal(true)}
                  aria-label="Abrir mi CV"
                  className="relative whitespace-nowrap capitalize flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00FFC2]/10 border-2 border-[#00FFC2]/40 text-[#00FFC2] text-xs md:text-sm font-semibold hover:bg-[#00FFC2]/20 hover:border-[#00FFC2]/60 transition-all animate-glow-button"
                >
                  <File className="w-3.5 h-3.5" />
                  CV
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {aboutData[index].info.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-white text-sm md:text-base font-medium">{item.title}</span>
                  <span className="hidden sm:inline text-[#00FFC2]">-</span>
                  <span className="text-[#dce1fb]/70 text-xs md:text-sm">{item.stage}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jesusarritola@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-[#00FFC2]/10 border border-[#00FFC2]/30 px-4 md:px-5 py-2.5 text-sm md:text-base font-medium text-[#00FFC2] hover:bg-[#00FFC2]/20 transition-all"
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5" />
              <span>jesusarritola@gmail.com</span>
            </a>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-lg bg-[#151b2d] border border-[#3a4a43]/30 text-[#dce1fb]/70 hover:text-[#00FFC2] hover:border-[#00FFC2]/50 transition-all"
              aria-label="Copiar correo"
            >
              {copied ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : <Copy className="w-4 h-4 md:w-5 md:h-5" />}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Certificados Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCertModal(false)} />
          <div className="relative bg-[#151b2d] rounded-2xl border border-[#3a4a43]/30 max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <button 
              onClick={() => setShowCertModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-[#dce1fb]/60 hover:text-white hover:bg-[#0c1324]/50 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#00FFC2]" />
              Mis Certificados
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              {certificados.map((cert, i) => (
                <div
                  key={i}
                  className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-[#0c1324]/50 border border-[#3a4a43]/20 hover:border-[#00FFC2]/40 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCert(cert)
                      setShowCertModal(false)
                    }}
                    className="flex flex-1 items-center gap-4 min-w-0 text-left focus-visible:outline-2 focus-visible:outline-[#00FFC2] focus-visible:outline-offset-2 rounded-lg"
                    aria-label={`Ver certificado: ${cert.name}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#00FFC2]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00FFC2]/20 transition-colors">
                      <FileText className="w-5 h-5 text-[#00FFC2]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-sm text-white font-medium block truncate">{cert.name}</span>
                      <span className="text-xs text-[#dce1fb]/50">Click para previsualizar</span>
                    </div>
                  </button>

                  {/* Secondary actions: open in new tab / download */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <a
                      href={cert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg text-[#dce1fb]/60 hover:text-[#00FFC2] hover:bg-[#00FFC2]/10 transition-all"
                      title="Abrir en nueva pestaña"
                      aria-label={`Abrir ${cert.name} en nueva pestaña`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href={cert.file}
                      download
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg text-[#dce1fb]/60 hover:text-[#00FFC2] hover:bg-[#00FFC2]/10 transition-all"
                      title="Descargar"
                      aria-label={`Descargar ${cert.name}`}
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CV Modal */}
      {showCVModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCVModal(false)} />
          <div className="relative bg-[#151b2d] rounded-2xl border border-[#3a4a43]/30 w-full max-w-4xl h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#3a4a43]/20">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <File className="w-5 h-5 text-[#00FFC2]" />
                Curriculum Vitae
              </h3>
              <div className="flex gap-2">
                <a
                  href="/CV_Jesus_Miguel_Arritola.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00FFC2]/20 text-[#00FFC2] hover:bg-[#00FFC2]/30 transition-all text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Nueva Pestaña
                </a>
                <a
                  href="/CV_Jesus_Miguel_Arritola.pdf"
                  download
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00FFC2]/20 text-[#00FFC2] hover:bg-[#00FFC2]/30 transition-all text-sm"
                >
                  <Download className="w-4 h-4" />
                  Descargar
                </a>
                <button
                  onClick={() => setShowCVModal(false)}
                  className="p-2 rounded-lg text-[#dce1fb]/60 hover:text-white hover:bg-[#0c1324]/50 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="h-[calc(100%-72px)] w-full bg-[#0c1324]">
              <iframe
                src="/CV_Jesus_Miguel_Arritola.pdf#view=FitH&toolbar=1&navpanes=0"
                title="Curriculum Vitae - Jesús Miguel Arritola"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}

      {/* Certificate Viewer Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedCert(null)} />
          <div className="relative bg-[#151b2d] rounded-2xl border border-[#3a4a43]/30 w-full max-w-4xl h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#3a4a43]/20">
              <h3 className="text-white font-semibold truncate">{selectedCert.name}</h3>
              <div className="flex gap-2">
                <a
                  href={selectedCert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00FFC2]/20 text-[#00FFC2] hover:bg-[#00FFC2]/30 transition-all text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Nueva Pestaña
                </a>
                <a
                  href={selectedCert.file}
                  download
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00FFC2]/20 text-[#00FFC2] hover:bg-[#00FFC2]/30 transition-all text-sm"
                >
                  <Download className="w-4 h-4" />
                  Descargar
                </a>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-lg text-[#dce1fb]/60 hover:text-white hover:bg-[#0c1324]/50 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="h-[calc(100%-72px)] w-full bg-[#0c1324]">
              <iframe
                src={`${selectedCert.file}#view=FitH&toolbar=1&navpanes=0`}
                title={selectedCert.name}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
