'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { N8nDiagram } from './n8n-diagram'

interface DiagramLightboxProps {
  title: string
  nodes: Array<{
    name: string
    icon: string
    color: string
  }>
  onClose: () => void
}

export function DiagramLightbox({ title, nodes, onClose }: DiagramLightboxProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    
    // Handle ESC key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = 'auto'
      document.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-5xl rounded-2xl bg-[#151b2d] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#3a4a43]/20 bg-[#151b2d]/50 px-6 py-5">
          <h3 className="font-display text-2xl font-bold text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#3a4a43]/20 text-[#dce1fb]/70 transition-colors hover:bg-[#2e3447] hover:text-white"
            aria-label="Cerrar diagrama"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Diagram Content */}
        <div className="p-6">
          <div className="max-h-[70vh] overflow-y-auto">
            <N8nDiagram nodes={nodes} title={title} />
          </div>
        </div>

        {/* Footer with hints */}
        <div className="border-t border-[#3a4a43]/20 bg-[#151b2d]/30 px-6 py-3 text-center text-sm text-[#dce1fb]/70">
          Presiona <kbd className="rounded bg-[#2e3447] px-2 py-1 text-xs font-semibold text-white">ESC</kbd> para cerrar o haz clic fuera del diagrama
        </div>
      </div>
    </div>
  )
}
