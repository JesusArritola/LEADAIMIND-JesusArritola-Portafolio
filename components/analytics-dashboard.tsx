'use client'

import { useEffect, useState } from 'react'
import { analytics } from '@/lib/analytics'
import { BarChart3, Users, TrendingUp, Activity } from 'lucide-react'

interface AnalyticsData {
  totalEvents: number
  pageViews: number
  workflowViews: number
  leadMagnetOpens: number
  leadMagnetSubmits: number
  comparisons: number
  searches: number
  eventsByType: Record<string, number>
}

export function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)

  useEffect(() => {
    // Load analytics from localStorage
    try {
      const storedEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]')
      
      const data: AnalyticsData = {
        totalEvents: storedEvents.length,
        pageViews: storedEvents.filter((e: any) => e.type === 'page_view').length,
        workflowViews: storedEvents.filter((e: any) => e.type === 'workflow_viewed').length,
        leadMagnetOpens: storedEvents.filter((e: any) => e.type === 'lead_magnet_opened').length,
        leadMagnetSubmits: storedEvents.filter((e: any) => e.type === 'lead_magnet_submitted').length,
        comparisons: storedEvents.filter((e: any) => e.type === 'workflow_compared').length,
        searches: storedEvents.filter((e: any) => e.type === 'search_performed').length,
        eventsByType: {}
      }

      // Count events by type
      storedEvents.forEach((event: any) => {
        data.eventsByType[event.type] = (data.eventsByType[event.type] || 0) + 1
      })

      setAnalyticsData(data)
    } catch (error) {
      console.error('Failed to load analytics:', error)
    }
  }, [])

  if (!analyticsData) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Cargando datos de analytics...
      </div>
    )
  }

  const metrics = [
    {
      icon: Activity,
      label: 'Eventos Totales',
      value: analyticsData.totalEvents,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Users,
      label: 'Vistas de Página',
      value: analyticsData.pageViews,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: TrendingUp,
      label: 'Workflows Vistos',
      value: analyticsData.workflowViews,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: BarChart3,
      label: 'Lead Magnet',
      value: analyticsData.leadMagnetSubmits,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-foreground">Analytics en Tiempo Real</h3>
        <p className="text-sm text-muted-foreground">Seguimiento de interacciones de usuarios</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div
              key={metric.label}
              className={`rounded-lg border border-border/50 ${metric.bgColor} p-4`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{metric.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${metric.color}`}>
                    {metric.value}
                  </p>
                </div>
                <Icon className={`h-8 w-8 ${metric.color} opacity-50`} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Event Details */}
      <div className="rounded-lg border border-border/50 bg-secondary/20 p-4">
        <h4 className="text-sm font-semibold text-foreground mb-4">Desglose por Tipo de Evento</h4>
        <div className="space-y-2">
          {Object.entries(analyticsData.eventsByType).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{type}</span>
              <span className="font-semibold text-foreground">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Conversion Metrics */}
      <div className="rounded-lg border border-border/50 bg-secondary/20 p-4">
        <h4 className="text-sm font-semibold text-foreground mb-4">Métricas de Conversión</h4>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">Lead Magnet: Tasa de Conversión</span>
              <span className="text-sm font-semibold text-foreground">
                {analyticsData.leadMagnetOpens > 0
                  ? Math.round((analyticsData.leadMagnetSubmits / analyticsData.leadMagnetOpens) * 100)
                  : 0}%
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full transition-all"
                style={{
                  width: `${analyticsData.leadMagnetOpens > 0 ? (analyticsData.leadMagnetSubmits / analyticsData.leadMagnetOpens) * 100 : 0}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
