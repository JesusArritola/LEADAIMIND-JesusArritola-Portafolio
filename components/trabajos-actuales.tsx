'use client'

import { useState, useMemo, memo } from 'react'
import { workflows } from '@/lib/workflows-data'
import { WorkflowModal } from './workflow-modal'
import { CheckCircle2, Search, X, ChevronLeft, ChevronRight } from 'lucide-react'

const ITEMS_PER_PAGE = 12

const WorkflowCardSkeleton = memo(function WorkflowCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-lg border-2 bg-[#151b2d]/40 p-5 backdrop-blur-sm sm:p-6 animate-pulse">
      <div className="mb-4 flex items-start justify-between">
        <div className="h-6 w-3/4 rounded bg-[#2e3447]"></div>
        <div className="h-6 w-6 rounded-full bg-[#2e3447]"></div>
      </div>
      <div className="mb-4 h-4 w-full rounded bg-[#2e3447]"></div>
      <div className="mb-4 h-6 w-20 rounded bg-[#2e3447]"></div>
      <div className="flex gap-2">
        <div className="h-8 w-8 rounded bg-[#2e3447]"></div>
        <div className="h-8 w-8 rounded bg-[#2e3447]"></div>
        <div className="h-8 w-8 rounded bg-[#2e3447]"></div>
      </div>
    </div>
  )
})

const WorkflowCard = memo(function WorkflowCard({ 
  workflow, 
  onClick 
}: { 
  workflow: typeof workflows[0]
  onClick: () => void
}) {
  const importanceColors: Record<string, string> = {
    critical: 'border-red-500/30 bg-red-500/5',
    high: 'border-orange-500/30 bg-orange-500/5',
    medium: 'border-yellow-500/30 bg-yellow-500/5',
    low: 'border-blue-500/30 bg-blue-500/5',
  }

  const importanceLabelColors: Record<string, string> = {
    critical: 'bg-red-500/15 text-red-400 border-red-500/30',
    high: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    medium: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    low: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  }

  const importanceLabels: Record<string, string> = {
    critical: 'Crítico',
    high: 'Alto',
    medium: 'Medio',
    low: 'Bajo',
  }

  return (
    <button
      onClick={onClick}
      aria-label={`Ver detalles de ${workflow.name}`}
      className={`group relative overflow-hidden rounded-lg border-2 bg-[#151b2d]/40 p-5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-[#151b2d]/80 sm:p-6 ${importanceColors[workflow.importance]}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <h3 className="font-display text-lg font-bold text-white sm:text-xl text-left">
          {workflow.name}
        </h3>
        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#00FFC2] sm:h-6 sm:w-6" aria-hidden="true" />
      </div>

      <p className="mb-4 text-sm leading-relaxed text-[#dce1fb]/70 text-left">
        {workflow.description}
      </p>

      <div className={`mb-4 inline-block rounded px-3 py-1 text-xs font-semibold border ${importanceLabelColors[workflow.importance]}`}>
        {importanceLabels[workflow.importance]}
      </div>

      <div className="flex flex-wrap gap-2" role="list" aria-label="Tecnologías del proyecto">
        {workflow.nodeTypes.map((node) => (
          <div
            key={node.name}
            role="listitem"
            className="flex h-8 w-8 items-center justify-center rounded bg-[#2e3447] text-sm font-semibold transition-transform group-hover:scale-110 sm:h-9 sm:w-9"
            title={node.name}
            aria-label={node.name}
          >
            {node.icon}
          </div>
        ))}
        {workflow.nodeTypes.length < 5 && (
          <div className="flex items-center rounded bg-[#2e3447]/50 px-2 text-xs font-semibold text-[#dce1fb]/50">
            +{Math.max(0, workflow.nodeTypes.length)}
          </div>
        )}
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-black/0 backdrop-blur-0 transition-all duration-300 group-hover:bg-black/40 group-hover:backdrop-blur-sm">
        <div className="flex flex-col items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <p className="text-sm font-semibold text-white">Ver Flujo</p>
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </button>
  )
})

WorkflowCard.displayName = 'WorkflowCard'
WorkflowCardSkeleton.displayName = 'WorkflowCardSkeleton'

export function TrabajosActuales() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedImportance, setSelectedImportance] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const filteredWorkflows = useMemo(() => {
    const results = workflows.filter((workflow) => {
      const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesImportance = !selectedImportance || workflow.importance === selectedImportance
      return matchesSearch && matchesImportance
    })
    return results
  }, [searchQuery, selectedImportance])

  const totalPages = Math.ceil(filteredWorkflows.length / ITEMS_PER_PAGE)
  const paginatedWorkflows = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredWorkflows.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredWorkflows, currentPage])

  const handleSearch = (query: string) => {
    setIsLoading(true)
    setSearchQuery(query)
    setCurrentPage(1)
    setTimeout(() => setIsLoading(false), 500)
  }

  const handleImportanceFilter = (importance: string | null) => {
    setIsLoading(true)
    setSelectedImportance(importance)
    setCurrentPage(1)
    setTimeout(() => setIsLoading(false), 500)
  }

  return (
    <>
      <div className="transition-all duration-200">
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-[#dce1fb]/50" aria-hidden="true" />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              aria-label="Buscar proyectos por nombre"
              className="w-full rounded-lg border border-[#3a4a43]/15 bg-[#151b2d]/60 py-3 pl-10 pr-4 text-[#dce1fb] placeholder-[#dce1fb]/40 focus:border-[#00FFC2] focus:outline-none focus:ring-2 focus:ring-[#00FFC2]/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-3 text-[#dce1fb]/50 hover:text-[#dce1fb] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <div 
            className="flex flex-wrap gap-2" 
            role="group" 
            aria-label="Filtrar proyectos por importancia"
          >
            <button
              onClick={() => handleImportanceFilter(null)}
              aria-pressed={selectedImportance === null}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                selectedImportance === null
                  ? 'bg-[#00FFC2] text-[#003828]'
                  : 'bg-[#151b2d] text-[#dce1fb]/70 hover:bg-[#2e3447] border border-[#3a4a43]/15'
              }`}
            >
              Todos ({workflows.length})
            </button>
            <button
              onClick={() => handleImportanceFilter('critical')}
              aria-pressed={selectedImportance === 'critical'}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                selectedImportance === 'critical'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : 'bg-[#151b2d] text-[#dce1fb]/70 hover:bg-[#2e3447] border border-[#3a4a43]/15'
              }`}
            >
              Críticos ({workflows.filter(w => w.importance === 'critical').length})
            </button>
            <button
              onClick={() => handleImportanceFilter('high')}
              aria-pressed={selectedImportance === 'high'}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                selectedImportance === 'high'
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                  : 'bg-[#151b2d] text-[#dce1fb]/70 hover:bg-[#2e3447] border border-[#3a4a43]/15'
              }`}
            >
              Altos ({workflows.filter(w => w.importance === 'high').length})
            </button>
            <button
              onClick={() => handleImportanceFilter('medium')}
              aria-pressed={selectedImportance === 'medium'}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                selectedImportance === 'medium'
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                  : 'bg-[#151b2d] text-[#dce1fb]/70 hover:bg-[#2e3447] border border-[#3a4a43]/15'
              }`}
            >
              Medios ({workflows.filter(w => w.importance === 'medium').length})
            </button>
          </div>

          <p 
            className="text-sm text-[#dce1fb]/60" 
            aria-live="polite" 
            aria-atomic="true"
          >
            Mostrando {filteredWorkflows.length} de {workflows.length} proyectos
          </p>
        </div>

        <div 
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          role="region"
          aria-label="Lista de proyectos"
          aria-live="polite"
        >
          {isLoading ? (
            <>
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                <WorkflowCardSkeleton key={i} />
              ))}
            </>
          ) : filteredWorkflows.length > 0 ? (
            <>
              {paginatedWorkflows.map((workflow) => (
                <WorkflowCard
                  key={workflow.id}
                  workflow={workflow}
                  onClick={() => setSelectedWorkflow(workflow.id)}
                />
              ))}
            </>
          ) : (
            <div 
              className="col-span-full flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#3a4a43]/30 py-12"
              role="status"
            >
              <Search className="h-12 w-12 text-[#dce1fb]/30 mb-3" aria-hidden="true" />
              <p className="text-lg font-semibold text-white">No se encontraron proyectos</p>
              <p className="text-sm text-[#dce1fb]/50">Intenta con otros términos de búsqueda o filtros</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <nav 
            className="mt-8 flex items-center justify-center gap-2" 
            aria-label="Paginación de proyectos"
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Página anterior"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#3a4a43]/30 bg-[#151b2d]/50 text-white transition-all hover:bg-[#151b2d]/80 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                aria-label={`Ir a página ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold transition-all ${
                  currentPage === page
                    ? 'border-[#00FFC2] bg-[#00FFC2]/10 text-[#00FFC2]'
                    : 'border-[#3a4a43]/30 bg-[#151b2d]/50 text-white hover:bg-[#151b2d]/80'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Página siguiente"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#3a4a43]/30 bg-[#151b2d]/50 text-white transition-all hover:bg-[#151b2d]/80 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        )}

        {totalPages > 0 && (
          <div className="mt-4 text-center text-sm text-[#dce1fb]/50" aria-live="polite">
            Mostrando {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredWorkflows.length)} de {filteredWorkflows.length} proyectos
          </div>
        )}
      </div>

      {selectedWorkflow && (
        <WorkflowModal
          workflowId={selectedWorkflow}
          onClose={() => setSelectedWorkflow(null)}
          onNavigate={(workflowId) => setSelectedWorkflow(workflowId)}
        />
      )}
    </>
  )
}