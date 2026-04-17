'use client'

import { workflows } from '@/lib/workflows-data'
import { TrendingUp, Zap, GitBranch, Award } from 'lucide-react'

export function StatisticsSection() {
  const totalWorkflows = workflows.length
  const uniqueNodeNames = new Set(workflows.flatMap(w => w.nodeTypes.map(n => n.name)))
  const totalNodes = uniqueNodeNames.size
  const totalTools = [...new Set(workflows.flatMap(w => w.tools))].length

  const stats = [
    {
      icon: GitBranch,
      label: 'Workflows Totales',
      value: `${totalWorkflows}+`,
      subtext: 'Soluciones de automatización',
      color: 'text-[#00FFC2]',
      bgColor: 'bg-[#00FFC2]/10',
      borderColor: 'border-[#00FFC2]/20'
    },
    {
      icon: Zap,
      label: 'Nodos Utilizados',
      value: `${totalNodes}`,
      subtext: 'Componentes únicos en total',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    },
    {
      icon: TrendingUp,
      label: 'Integraciones',
      value: `${totalTools}+`,
      subtext: 'Herramientas conectadas',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      icon: Award,
      label: 'Casos de Éxito',
      value: '100%',
      subtext: 'Satisfacción en proyectos',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    }
  ]

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#00FFC2] sm:text-sm">
            Impacto Comprobado
          </p>
          <h2 className="font-display text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Números que Hablan
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[#dce1fb]/70 sm:mt-6 sm:text-lg">
            Resultados reales de automatización y optimización de procesos empresariales.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const IconComponent = stat.icon
            return (
              <div
                key={stat.label}
                className={`group relative overflow-hidden rounded-lg elevation-low p-6 sm:p-8 transition-all duration-300 hover:border-[#00FFC2]/20`}
              >
                {/* Background glow */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#00FFC2]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`mb-5 inline-flex rounded-lg ${stat.bgColor} p-3`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>

                  {/* Main metric */}
                  <div className="mb-3">
                    <p className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</p>
                  </div>

                  {/* Label */}
                  <p className="mb-2 text-sm font-semibold text-white">{stat.label}</p>

                  {/* Subtext */}
                  <p className="text-xs text-[#dce1fb]/60">{stat.subtext}</p>

                  {/* Accent line */}
                  <div className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-[#00FFC2] to-[#00FFC2]/30 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Insights */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-[#151b2d] border border-[#3a4a43]/10 p-6">
            <h3 className="font-semibold text-white mb-2">Industrias Servidas</h3>
            <p className="text-sm text-[#dce1fb]/60">
              SaaS, E-commerce, Servicios, Marketing, RH y más
            </p>
          </div>
          <div className="rounded-lg bg-[#151b2d] border border-[#3a4a43]/10 p-6">
            <h3 className="font-semibold text-white mb-2">Mejora en Eficiencia</h3>
            <p className="text-sm text-[#dce1fb]/60">
              Reducción promedio del 80% en tareas manuales
            </p>
          </div>
          <div className="rounded-lg bg-[#151b2d] border border-[#3a4a43]/10 p-6">
            <h3 className="font-semibold text-white mb-2">Tiempo de Respuesta</h3>
            <p className="text-sm text-[#dce1fb]/60">
              Automatización instantánea de procesos críticos
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}