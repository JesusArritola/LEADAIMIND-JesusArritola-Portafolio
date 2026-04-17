'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FileText, Download, ExternalLink, X } from 'lucide-react'

const certificados = [
  { 
    name: 'IBM - Chatbot Development', 
    file: '/certificados/Certificado IBM CB0101EN _ Cognitive Class_Chatbot.pdf',
    issuer: 'IBM Cognitive Class'
  },
  { 
    name: 'Python for Data Science', 
    file: '/certificados/Certificado IBM PY0101EN _ Cognitive Class_Python_Data_Science.pdf',
    issuer: 'IBM Cognitive Class'
  },
  { 
    name: 'Introduction to Machine Learning', 
    file: '/certificados/Certificado IBMSkillsNetwork ML0104EN _ Introduction_Machne_Learning.pdf',
    issuer: 'IBM Skills Network'
  },
  { 
    name: 'n8n Automation Expert', 
    file: '/certificados/Certificado-Jesus-Arritola-s4ml4yys.pdf',
    issuer: 'n8n'
  },
  { 
    name: 'Iniciación al Desarrollo de IA', 
    file: '/certificados/Certificado-Jesus-Iniciacion_Desarrollo_IA.pdf',
    issuer: 'Plataforma Educativa'
  },
  { 
    name: 'Curso de Inglés B1', 
    file: '/certificados/Diploma_Curso_de_Inglés_B1_Jesús Arritola.pdf',
    issuer: 'Instituto de Idiomas'
  },
  { 
    name: 'Domina VEO3 - Guía Rápida', 
    file: '/certificados/Diploma_Domina_VEO3__Guía_Rápida_para_Principiantes_Jesús Arritola.pdf',
    issuer: 'Plataforma AI'
  },
  { 
    name: 'ChatGPT Mastery', 
    file: '/certificados/Domina_ChatGPT.pdf',
    issuer: 'OpenAI Education'
  },
  { 
    name: 'AI Fundamentals', 
    file: '/certificados/IBMSkillsNetwork AI0117EN Certificate _ Cognitive Class.pdf',
    issuer: 'IBM Cognitive Class'
  },
  { 
    name: 'Iniciación a IA para Workflows', 
    file: '/certificados/Jesús _Certificado_Curso_Iniciacion_IA_WF.pdf',
    issuer: 'Automation Academy'
  },
  { 
    name: 'Introduction to AI', 
    file: '/certificados/Jesús_Arritola_Certificado_iniciacion_IA.pdf',
    issuer: 'AI Foundation'
  },
]

export function CertificatesPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedCert, setSelectedCert] = useState<typeof certificados[0] | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#0c1324] py-24 md:py-32 px-4 md:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#00FFC2]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Mis <span className="text-[#00FFC2]">Certificados</span>
          </h1>
          <p className="text-[#dce1fb]/70 max-w-2xl mx-auto">
            Certificaciones y cursos que respaldan mis conocimientos en automatización, 
            inteligencia artificial, ciberseguridad y desarrollo.
          </p>
        </motion.div>

        {/* CV Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold text-[#00FFC2] uppercase tracking-wider">Destacado</span>
          </div>
          <a
            href="/CV_Jesus_Miguel_Arritola.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-[#00FFC2]/20 to-transparent border border-[#00FFC2]/30 hover:border-[#00FFC2]/60 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#00FFC2]/20 flex items-center justify-center">
                <FileText className="w-7 h-7 text-[#00FFC2]" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold text-white group-hover:text-[#00FFC2] transition-colors">
                  CV Profesional
                </div>
                <div className="text-sm text-[#dce1fb]/60">
                  Descargar CV completo en PDF
                </div>
              </div>
            </div>
            <Download className="w-6 h-6 text-[#00FFC2] group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-sm font-semibold text-[#dce1fb]/60 uppercase tracking-wider">Certificaciones</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificados.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="group"
              >
                <div className="p-5 rounded-xl bg-[#151b2d]/50 border border-[#3a4a43]/20 hover:border-[#00FFC2]/40 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00FFC2]/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#00FFC2]" />
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={cert.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#0c1324]/50 text-[#dce1fb]/60 hover:text-[#00FFC2] hover:bg-[#00FFC2]/10 transition-all"
                        title="Ver certificado"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href={cert.file}
                        download
                        className="p-2 rounded-lg bg-[#0c1324]/50 text-[#dce1fb]/60 hover:text-[#00FFC2] hover:bg-[#00FFC2]/10 transition-all"
                        title="Descargar"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-white font-medium mb-1 group-hover:text-[#00FFC2] transition-colors line-clamp-2">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-[#dce1fb]/50">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* PDF Viewer Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl h-[90vh] bg-[#151b2d] rounded-2xl overflow-hidden border border-[#3a4a43]/30">
            <div className="flex items-center justify-between p-4 border-b border-[#3a4a43]/20">
              <h3 className="text-white font-semibold">{selectedCert.name}</h3>
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
            <div className="h-[calc(100%-72px)] w-full">
              <object
                data={selectedCert.file}
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full bg-[#0c1324] p-8 text-center">
                  <FileText className="w-16 h-16 text-[#00FFC2]/30 mb-4" />
                  <p className="text-white mb-4">No se pudo cargar el certificado</p>
                  <div className="flex gap-4">
                    <a
                      href={selectedCert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00FFC2] text-[#003828] font-bold"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Abrir en nueva pestaña
                    </a>
                    <a
                      href={selectedCert.file}
                      download
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00FFC2] text-[#003828] font-bold"
                    >
                      <Download className="w-4 h-4" />
                      Descargar
                    </a>
                  </div>
                </div>
              </object>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}