'use client'

import { useState, useEffect, useCallback } from 'react'
import { getWorkflowById, workflows } from '@/lib/workflows-data'
import { N8nDiagram } from './n8n-diagram'
import Image from 'next/image'
import { X, ArrowLeft, MessageCircle, CheckCircle, ChevronLeft, ChevronRight, Download } from 'lucide-react'

const workflowFileMap: Record<string, string> = {
  'newsletter-tech-agent-v2': 'Newsletter_Tech_Agent.json',
  'telegram-bot': 'Chat_Bot_Telegram.json',
  'telegram-sales-agent': 'Telegram_Sales_Agent_For_Business.json',
  'gmail-respuesta-automatica': 'Respuesta_Automatica_Gmails.json',
  'gmail-clasificador': 'Clasificador_Gmail_Agente.json',
  'scrape-leads-v2': 'Scrape_Leads.json',
  'script-generator-v2': 'Script Generator.json',
  'lead-gen-system-v2': 'Lead_Gen_System.json',
  'agente-correos-frios': 'Agente_Correos_Frios.json',
}

function getWorkflowFileName(workflowName: string, workflowId: string): string {
  if (workflowFileMap[workflowId]) {
    return workflowFileMap[workflowId]
  }
  return `${workflowName.replace(/[^a-zA-Z0-9]/g, '_')}.json`
}

interface WorkflowModalProps {
  workflowId: string
  onClose: () => void
  onNavigate?: (workflowId: string) => void
}

export function WorkflowModal({ workflowId, onClose, onNavigate }: WorkflowModalProps) {
  const workflow = getWorkflowById(workflowId)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const workflowIds = workflows.map(w => w.id)
  const currentIndex = workflowIds.indexOf(workflowId)
  
  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      const prevId = workflowIds[currentIndex - 1]
      if (onNavigate) {
        onNavigate(prevId)
      }
    }
  }, [currentIndex, workflowIds, onNavigate])
  
  const goToNext = useCallback(() => {
    if (currentIndex < workflowIds.length - 1) {
      const nextId = workflowIds[currentIndex + 1]
      if (onNavigate) {
        onNavigate(nextId)
      }
    }
  }, [currentIndex, workflowIds, onNavigate])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }
    
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = 'auto'
      document.removeEventListener('keydown', handleEsc)
    }
  }, [onClose, goToPrevious, goToNext])

  useEffect(() => {
    setImageLoaded(false)
  }, [workflowId])

  if (!workflow) return null

  const getImportanceLabel = (importance: string) => {
    switch (importance) {
      case 'critical': return 'Crítico'
      case 'high': return 'Alto'
      case 'medium': return 'Medio'
      default: return 'Bajo'
    }
  }

  const getImportanceStyles = (importance: string) => {
    switch (importance) {
      case 'critical': 
        return 'bg-red-500/15 text-red-400 border-red-500/30'
      case 'high': 
        return 'bg-orange-500/15 text-orange-400 border-orange-500/30'
      case 'medium': 
        return 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30'
      default: 
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30'
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-4 pt-8 overflow-y-auto custom-scrollbar"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="workflow-modal-title"
    >
      <div className="relative w-full max-w-5xl bg-[#0c1324] rounded-lg shadow-2xl border border-[#3a4a43]/15 overflow-hidden mb-8" ref={(el) => el?.focus()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-[#151b2d]/80 text-[#dce1fb]/70 transition-all hover:bg-[#2e3447] hover:text-white focus-visible:outline-2 focus-visible:outline-[#00FFC2] focus-visible:outline-offset-2"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#151b2d] to-[#0c1324] p-8 pb-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FFC2]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
          
          {/* Back button */}
          <button
            onClick={onClose}
            className="group inline-flex items-center gap-2 rounded-lg border border-[#3a4a43]/20 bg-[#151b2d]/60 px-4 py-2.5 text-sm font-medium text-[#dce1fb]/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#00FFC2]/50 hover:bg-[#151b2d] hover:text-[#00FFC2] mb-6 focus-visible:outline-2 focus-visible:outline-[#00FFC2] focus-visible:outline-offset-2"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Volver a Proyectos</span>
          </button>

          {/* Title */}
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white leading-tight max-w-2xl mb-4">
            {workflow.name}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {/* Creator */}
            <div className="flex items-center gap-2 text-[#dce1fb]/70">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00FFC2] to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                J
              </div>
              <span>Hecho por Jesús Miguel Arritola</span>
            </div>

            {/* Importance */}
            <span className={`px-3 py-1 rounded text-xs font-bold border ${getImportanceStyles(workflow.importance)}`}>
              {getImportanceLabel(workflow.importance)}
            </span>
          </div>
        </div>

        {/* Diagram/Image Section */}
        <div className="p-6 border-t border-[#3a4a43]/10 relative">
          {workflow.image ? (
            <div className="relative w-full h-auto rounded-lg overflow-hidden bg-[#151b2d]/50">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#151b2d] min-h-[300px]">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-2 border-[#00FFC2] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-[#dce1fb]/50 text-sm">Cargando imagen...</span>
                  </div>
                </div>
              )}
              <Image 
                src={workflow.image} 
                alt={workflow.name}
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                quality={85}
                priority={currentIndex < 2}
                className={`w-full h-auto transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          ) : (
            <N8nDiagram nodes={workflow.nodeTypes} title={workflow.name} />
          )}
          
          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-[#151b2d]/80 border border-[#3a4a43]/20 text-white transition-all hover:bg-[#2e3447] hover:border-[#00FFC2]/50 z-10"
              aria-label="Proyecto anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          {currentIndex < workflowIds.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-[#151b2d]/80 border border-[#3a4a43]/20 text-white transition-all hover:bg-[#2e3447] hover:border-[#00FFC2]/50 z-10"
              aria-label="Proyecto siguiente"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
          
          {/* Page Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="text-sm text-[#dce1fb]/50 bg-[#151b2d]/80 px-3 py-1 rounded-full">
              {currentIndex + 1} / {workflowIds.length}
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 border-t border-[#3a4a43]/10">
          {/* Left - How it works */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Cómo funciona</h2>
              <p className="text-[#dce1fb]/70 leading-relaxed">
                {workflow.documentation}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Características</h3>
              <ul className="space-y-2">
                {workflow.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#dce1fb]/70">
                    <CheckCircle className="h-5 w-5 text-[#00FFC2] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use Cases */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Casos de Uso</h3>
              <ul className="space-y-2">
                {workflow.useCases.map((useCase, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#dce1fb]/70">
                    <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Pasos de Implementación</h3>
              <div className="space-y-3">
                {workflow.howItWorks.split('\n').map((step, i) => {
                  let cleanStep = step.replace(/^\d+[\.\)]\s*/, '').trim()
                  if (!cleanStep) return null
                  
                  let title = cleanStep
                  let description = ''
                  
                  if (cleanStep.includes(' - ')) {
                    const parts = cleanStep.split(' - ')
                    title = parts[0]?.trim() || ''
                    description = parts.slice(1).join(' - ').trim()
                  } else if (cleanStep.includes(': ')) {
                    const parts = cleanStep.split(': ')
                    title = parts[0]?.trim() || ''
                    description = parts.slice(1).join(': ').trim()
                  }
                  
                  return (
                    <div key={i} className="flex gap-4 p-4 rounded-lg bg-[#151b2d] border border-[#3a4a43]/10">
                      <span className="flex items-center justify-center w-8 h-8 rounded bg-[#00FFC2]/15 text-[#00FFC2] font-bold text-sm flex-shrink-0">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <span className="text-white font-semibold block">{title}</span>
                        {description && (
                          <p className="text-[#dce1fb]/50 text-sm mt-1">{description}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right - Sidebar */}
          <div className="space-y-6">
            {/* Tools */}
            <div className="p-5 rounded-lg bg-[#151b2d] border border-[#3a4a43]/10">
              <h3 className="text-xs font-semibold text-[#dce1fb]/50 uppercase tracking-wider mb-4">
                Herramientas Integradas
              </h3>
              <div className="flex flex-wrap gap-2">
                {workflow.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded text-xs text-[#dce1fb]/80 bg-[#2e3447]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Node Types */}
            <div className="p-5 rounded-lg bg-[#151b2d] border border-[#3a4a43]/10">
              <h3 className="text-xs font-semibold text-[#dce1fb]/50 uppercase tracking-wider mb-4">
                Nodos del Flujo
              </h3>
              <div className="space-y-2">
                {workflow.nodeTypes.map((node, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded bg-[#2e3447]">
                    <span className="text-lg">{node.icon}</span>
                    <span className="text-[#dce1fb]/80 text-sm">{node.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-5 rounded-lg bg-gradient-to-br from-[#00FFC2]/10 to-purple-500/10 border border-[#00FFC2]/20">
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Necesitas este flujo?
              </h3>
              <p className="text-[#dce1fb]/60 text-sm mb-4">
                Contáctame y lo implemento en tu negocio.
              </p>
              <a
                href="https://wa.me/5356686432"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:bg-[#1fba59]"
              >
                <MessageCircle className="h-5 w-5" />
                Chatear en WhatsApp
              </a>
              
              {/* Download Button */}
              {workflow && (
                <div className="mt-4 pt-4 border-t border-[#3a4a43]/20">
                  <p className="text-[#dce1fb]/60 text-xs mb-3 text-center">
                    Obtenla e Implementala
                  </p>
                  <a
                    href={`/Jsons/${getWorkflowFileName(workflow.name, workflow.id)}`}
                    download
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#151b2d] border border-[#3a4a43]/30 px-4 py-3 font-semibold text-[#00FFC2] transition-all hover:scale-[1.02] hover:border-[#00FFC2]/50 focus-visible:outline-2 focus-visible:outline-[#00FFC2] focus-visible:outline-offset-2"
                    aria-label={`Descargar plantilla de ${workflow.name}`}
                  >
                    <Download className="h-5 w-5" />
                    Descargar Plantilla Gratuita
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
