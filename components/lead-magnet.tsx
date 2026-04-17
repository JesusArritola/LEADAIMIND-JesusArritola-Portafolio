'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { analytics } from '@/lib/analytics'
import { useNavbar } from './navbar-context'
import { X, Calculator, TrendingUp, Clock, DollarSign, CheckCircle2, Mail, Zap, FileText, AlertCircle, ArrowLeft, Activity, BarChart3 } from 'lucide-react'

interface LeadMagnetProps {
  onClose: () => void
}

interface ROICalculation {
  annualHoursWasted: number
  annualCostWasted: number
  automationCost: number
  annualSavings: number
  roi: number
  paybackMonths: number
  monthlySavings: number
  fiveYearSavings: number
}

const calculationStore = new Map<string, { count: number; lastRequest: number }>()
const reportStore = new Map<string, { count: number; lastRequest: number }>()

const MAX_CALCULATIONS = 50
const MAX_REPORTS = 50

function isCalculationLimitExceeded(identifier: string): boolean {
  const record = calculationStore.get(identifier)
  if (record && record.count >= MAX_CALCULATIONS) {
    return true
  }
  return false
}

function isReportLimitExceeded(identifier: string): boolean {
  const record = reportStore.get(identifier)
  if (record && record.count >= MAX_REPORTS) {
    return true
  }
  return false
}

function updateCalculationCount(identifier: string) {
  const now = Date.now()
  const record = calculationStore.get(identifier) || { count: 0, lastRequest: 0 }
  
  const timeSinceLastRequest = now - record.lastRequest
  if (timeSinceLastRequest >= 24 * 60 * 60 * 1000) {
    record.count = 1
  } else {
    record.count = Math.min(record.count + 1, MAX_CALCULATIONS)
  }
  record.lastRequest = now
  calculationStore.set(identifier, record)
}

function updateReportCount(identifier: string) {
  const now = Date.now()
  const record = reportStore.get(identifier) || { count: 0, lastRequest: 0 }
  
  const timeSinceLastRequest = now - record.lastRequest
  if (timeSinceLastRequest >= 24 * 60 * 60 * 1000) {
    record.count = 1
  } else {
    record.count = Math.min(record.count + 1, MAX_REPORTS)
  }
  record.lastRequest = now
  reportStore.set(identifier, record)
}

export function LeadMagnet({ onClose }: LeadMagnetProps) {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [clientId, setClientId] = useState('')
  const [limitError, setLimitError] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)
  const { hideNavbar, showNavbar } = useNavbar()
  
  const [employees, setEmployees] = useState('')
  const [hourlyWage, setHourlyWage] = useState('')
  const [weeklyHours, setWeeklyHours] = useState('')
  const [automationCost, setAutomationCost] = useState('')

  const [results, setResults] = useState<ROICalculation | null>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    hideNavbar()
    
    analytics.trackLeadMagnetOpen()
    
    const storedId = localStorage.getItem('roi_client_id')
    if (!storedId) {
      const newId = crypto.randomUUID()
      localStorage.setItem('roi_client_id', newId)
      setClientId(newId)
    } else {
      setClientId(storedId)
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleEsc)
    
    return () => {
      document.body.style.overflow = 'auto'
      showNavbar()
      document.removeEventListener('keydown', handleEsc)
    }
  }, [onClose, hideNavbar, showNavbar])

  const handleClose = () => {
    showNavbar()
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose()
    }
  }

  const calculateROI = async () => {
    const empNum = Number(employees)
    const wageNum = Number(hourlyWage)
    const hoursNum = Number(weeklyHours)
    const costNum = Number(automationCost)

    if (!employees || !hourlyWage || !weeklyHours || !automationCost) {
      return
    }

    if (isCalculationLimitExceeded(clientId)) {
      setLimitError('Has alcanzado el límite de 50 cálculos por sesión. Por favor, intenta más tarde.')
      return
    }

    setLimitError('')
    setIsCalculating(true)

    const randomDelay = Math.floor(Math.random() * 2000) + 1000

    await new Promise(resolve => setTimeout(resolve, randomDelay))

    const annualHoursWasted = empNum * hoursNum * 52
    const annualCostWasted = annualHoursWasted * wageNum
    const annualSavings = annualCostWasted * 0.7
    const roi = ((annualSavings - costNum) / costNum) * 100
    const paybackMonths = (costNum / (annualSavings / 12))
    const monthlySavings = annualSavings / 12
    const fiveYearSavings = annualSavings * 5 - (costNum * 3)

    setResults({
      annualHoursWasted,
      annualCostWasted,
      automationCost: costNum,
      annualSavings,
      roi: Math.max(0, roi),
      paybackMonths: Math.max(0, Math.min(paybackMonths, 60)),
      monthlySavings,
      fiveYearSavings: Math.max(0, fiveYearSavings)
    })
    
    updateCalculationCount(clientId)
    setShowResults(true)
    setIsCalculating(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !results) return

    if (isReportLimitExceeded(clientId)) {
      setLimitError('Has alcanzado el límite de 50 informes. Por favor, intenta más tarde.')
      return
    }

    setLimitError('')
    setIsSending(true)

    const randomDelay = Math.floor(Math.random() * 2000) + 1000

    await new Promise(resolve => setTimeout(resolve, randomDelay))

    try {
      const response = await fetch('https://dipus.app.n8n.cloud/webhook/754e1957-7bd2-4596-8166-c0fdbcd23590', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'roi-report-request',
          email,
          timestamp: new Date().toISOString(),
          clientId,
          survey: {
            "Numero de empleados": employees,
            "Costo por hora (USD)": hourlyWage,
            "Horas semanales en tareas manuales": weeklyHours,
            "Presupuesto para automatizacion (USD)": automationCost
          },
          results: results ? {
            annualHoursWasted: results.annualHoursWasted,
            annualCostWasted: results.annualCostWasted,
            annualSavings: results.annualSavings,
            monthlySavings: results.monthlySavings,
            roi: results.roi.toFixed(0),
            paybackMonths: results.paybackMonths.toFixed(1),
            fiveYearSavings: results.fiveYearSavings.toFixed(0)
          } : null
        })
      })

      if (response.ok) {
        analytics.trackLeadMagnetSubmit(email)
        updateReportCount(clientId)
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSending(false)
    }

    setTimeout(() => {
      handleClose()
    }, 3000)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('es-ES').format(value)
  }

  const isFormValid = employees && hourlyWage && weeklyHours && automationCost

  const maxCostWasted = results ? Math.max(results.annualCostWasted, results.annualSavings * 1.5) : 1000

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl rounded-2xl border border-[#3a4a43]/20 bg-[#151b2d] shadow-2xl max-h-[95vh] overflow-y-auto custom-scrollbar"
      >
        <button
          onClick={handleClose}
          className="absolute left-4 top-4 z-10 flex items-center gap-2 text-sm text-[#dce1fb]/70 transition-all hover:text-[#00FFC2] hover:neon-glow-text"
          aria-label="Volver"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver</span>
        </button>
        
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-lg border border-[#3a4a43]/20 bg-[#2e3447]/50 p-2 hover:bg-[#2e3447] transition-colors z-10"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="p-6 sm:p-8 lg:p-10 pt-16 sm:pt-10">

          {!isSubmitted ? (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00FFC2]/10">
                    <Calculator className="h-6 w-6 text-[#00FFC2]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Calculadora de ROI <span className="text-[#00FFC2]">(Return on Investment)</span>
                    </h2>
                    <p className="text-sm text-[#dce1fb]/70">Descubre cuánto dinero pierdes en tareas manuales</p>
                  </div>
                </div>
                <p className="text-base text-[#dce1fb]/70">
                  Ingresa los datos abajo para calcular cuánto dinero y tiempo puedes ahorrar con automatización. 
                  Nuestra algoritmo está basada en datos reales de empresas similares a la tuya.
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-white mb-2">
                    ¿Cuántas personas trabajan en tu empresa?
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Ej: 5"
                    value={employees}
                    onChange={(e) => setEmployees(e.target.value)}
                    className="w-full rounded-lg border border-[#3a4a43]/20 bg-[#151b2d]/50 px-4 py-3 text-white placeholder-[#dce1fb]/40 focus:border-[#00FFC2] focus:outline-none focus:ring-2 focus:ring-[#00FFC2]/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <p className="text-xs text-[#dce1fb]/50 mt-2">Cantidad total de empleados en tu organización</p>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-white mb-2">
                    ¿Cuál es el costo promedio por hora de cada empleado?
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Ej: 15"
                    value={hourlyWage}
                    onChange={(e) => setHourlyWage(e.target.value)}
                    className="w-full rounded-lg border border-[#3a4a43]/20 bg-[#151b2d]/50 px-4 py-3 text-white placeholder-[#dce1fb]/40 focus:border-[#00FFC2] focus:outline-none focus:ring-2 focus:ring-[#00FFC2]/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <p className="text-xs text-[#dce1fb]/50 mt-2">Incluye salario base + cargas sociales + beneficios</p>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-white mb-2">
                    ¿Cuántas horas semanales dedican a tareas manuales repetitivas?
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Ej: 10"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(e.target.value)}
                    className="w-full rounded-lg border border-[#3a4a43]/20 bg-[#151b2d]/50 px-4 py-3 text-white placeholder-[#dce1fb]/40 focus:border-[#00FFC2] focus:outline-none focus:ring-2 focus:ring-[#00FFC2]/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <p className="text-xs text-[#dce1fb]/50 mt-2">Horas por empleado en tareas como entrada de datos, responder emails, generar reportes</p>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-white mb-2">
                    ¿Cuál es tu presupuesto para implementar automatización?
                  </label>
                  <input
                    type="number"
                    min="50"
                    placeholder="Ej: 500"
                    value={automationCost}
                    onChange={(e) => setAutomationCost(e.target.value)}
                    className="w-full rounded-lg border border-[#3a4a43]/20 bg-[#151b2d]/50 px-4 py-3 text-white placeholder-[#dce1fb]/40 focus:border-[#00FFC2] focus:outline-none focus:ring-2 focus:ring-[#00FFC2]/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <p className="text-xs text-[#dce1fb]/50 mt-2">Inversión en herramientas (n8n) + configuración + mantenimiento</p>
                </div>
              </div>

              {limitError && (
                <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {limitError}
                </div>
              )}

              <Button
                type="button"
                onClick={calculateROI}
                disabled={!isFormValid || isCalculating}
                className="w-full bg-[#00FFC2] hover:bg-[#00e1ab] hover:shadow-[0_0_20px_rgba(0,255,194,0.4)] py-4 text-[#003828] font-bold text-lg mb-6 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCalculating ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#003828] border-t-transparent mr-2" />
                    Calculando...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-5 w-5" />
                    Calcular Mi ROI
                  </>
                )}
              </Button>

              {showResults && results && (
                <div className="mb-8 rounded-2xl border border-[#00FFC2]/30 bg-[#00FFC2]/5 p-4 sm:p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[#00FFC2]" />
                    Tus Resultados de Automatización
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="text-center p-3 rounded-xl bg-[#151b2d]/50">
                      <p className="text-lg sm:text-xl font-bold text-[#00FFC2]">{formatNumber(results.annualHoursWasted)}</p>
                      <p className="text-xs text-[#dce1fb]/70 mt-1">Horas/año desperdiciadas</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-[#151b2d]/50">
                      <p className="text-lg sm:text-xl font-bold text-red-400">{formatCurrency(results.annualCostWasted)}</p>
                      <p className="text-xs text-[#dce1fb]/70 mt-1">Pérdida anual</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-[#151b2d]/50">
                      <p className="text-lg sm:text-xl font-bold text-green-400">{formatCurrency(results.annualSavings)}</p>
                      <p className="text-xs text-[#dce1fb]/70 mt-1">Ahorro anual</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-[#151b2d]/50">
                      <p className="text-lg sm:text-xl font-bold text-white">{results.roi.toFixed(0)}%</p>
                      <p className="text-xs text-[#dce1fb]/70 mt-1">ROI esperado</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center p-3 rounded-xl bg-[#151b2d]/50 border border-[#00FFC2]/20">
                      <p className="text-xl sm:text-2xl font-bold text-[#00FFC2]">{results.paybackMonths.toFixed(1)}</p>
                      <p className="text-xs text-[#dce1fb]/70 mt-1">Meses recupero</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-[#151b2d]/50 border border-[#00FFC2]/20">
                      <p className="text-xl sm:text-2xl font-bold text-white">{formatCurrency(results.monthlySavings)}</p>
                      <p className="text-xs text-[#dce1fb]/70 mt-1">Ahorro mensual</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-[#151b2d]/50 border border-[#00FFC2]/20">
                      <p className="text-xl sm:text-2xl font-bold text-[#00FFC2]">{formatCurrency(results.fiveYearSavings)}</p>
                      <p className="text-xs text-[#dce1fb]/70 mt-1">Ahorro 5 años</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#0c1324] p-4 mb-6">
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-[#00FFC2]" />
                      ¿Qué significa esto para tu negocio?
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#00FFC2] mt-0.5 shrink-0" />
                        <span className="text-sm text-[#dce1fb]/70">Libera {Math.round(results.annualHoursWasted / 52)} horas semanales para tareas de mayor valor</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#00FFC2] mt-0.5 shrink-0" />
                        <span className="text-sm text-[#dce1fb]/70">Elimina errores humanos y aumenta la consistencia</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#00FFC2] mt-0.5 shrink-0" />
                        <span className="text-sm text-[#dce1fb]/70">Empleados enfocados en tareas estratégicas</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#00FFC2] mt-0.5 shrink-0" />
                        <span className="text-sm text-[#dce1fb]/70">Escalabilidad: duplicar operaciones sin duplicar costos</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#00FFC2] mt-0.5 shrink-0" />
                        <span className="text-sm text-[#dce1fb]/70">Respuesta inmediata 24/7 a clientes y leads</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#00FFC2] mt-0.5 shrink-0" />
                        <span className="text-sm text-[#dce1fb]/70">Datos organizados y reportes automáticos</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="rounded-xl bg-[#0c1324] p-4 border border-red-500/30">
                      <h4 className="text-sm font-bold text-red-400 mb-4 flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Sin Automatización (Actual)
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#dce1fb]/70">Pérdida anual</span>
                          <span className="text-sm font-bold text-red-400">{formatCurrency(results.annualCostWasted)}</span>
                        </div>
                        <div className="h-3 bg-[#2e3447] rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: '100%' }} />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#dce1fb]/70">Horas perdidas</span>
                          <span className="text-sm font-bold text-white">{formatNumber(results.annualHoursWasted)} hrs</span>
                        </div>
                        <div className="h-3 bg-[#2e3447] rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: '100%' }} />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-[#0c1324] p-4 border border-[#00FFC2]/30">
                      <h4 className="text-sm font-bold text-[#00FFC2] mb-4 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Con Automatización (Proyectado)
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#dce1fb]/70">Ahorro anual</span>
                          <span className="text-sm font-bold text-green-400">{formatCurrency(results.annualSavings)}</span>
                        </div>
                        <div className="h-3 bg-[#2e3447] rounded-full overflow-hidden">
                          <div className="h-full bg-[#00FFC2] rounded-full" style={{ width: `${Math.min((results.annualSavings / maxCostWasted) * 100, 100)}%` }} />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#dce1fb]/70">Horas recuperadas</span>
                          <span className="text-sm font-bold text-[#00FFC2]">{formatNumber(results.annualHoursWasted)} hrs</span>
                        </div>
                        <div className="h-3 bg-[#2e3447] rounded-full overflow-hidden">
                          <div className="h-full bg-[#00FFC2] rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-center text-sm font-medium text-white mb-3">Ahorro mensual proyectado</p>
                    <div className="h-24 flex items-end justify-center gap-2 sm:gap-4">
                      {[50, 100, 200, 400, 600, 800].map((value, idx) => {
                        const height = results.monthlySavings > 0 
                          ? Math.min((value / 800) * 100, 100) 
                          : 0
                        const isHighlighted = value <= results.monthlySavings
                        return (
                          <div key={idx} className="flex flex-col items-center gap-1">
                            <div 
                              className={`w-6 sm:w-10 rounded-t-lg transition-all ${isHighlighted ? 'bg-[#00FFC2]' : 'bg-[#2e3447]'}`}
                              style={{ height: `${Math.max(height, 8)}%` }}
                            />
                            <span className="text-[10px] sm:text-xs text-[#dce1fb]/50">${value}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <p className="text-xs text-[#dce1fb]/50 text-center mt-4 italic">
                    *Estos datos son estimaciones basadas en promedios de mercado. Los resultados reales pueden variar según tu industria y procesos específicos.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
                    Tu correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-[#dce1fb]/70" />
                    <input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required={showResults}
                      disabled={!showResults}
                      className="w-full rounded-lg border border-[#3a4a43]/20 bg-[#151b2d]/50 py-3 pl-10 pr-4 text-white placeholder-[#dce1fb]/40 focus:border-[#00FFC2] focus:outline-none focus:ring-2 focus:ring-[#00FFC2]/20 disabled:opacity-50"
                    />
                  </div>
                  <p className="mt-2 text-xs text-[#dce1fb]/50">
                    Te enviaremos el informe completo en PDF con recomendaciones personalizadas
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSending || !showResults || !email}
                  className="w-full gap-2 bg-[#00FFC2]/20 hover:bg-[#00FFC2]/30 border border-[#00FFC2]/30 py-3 text-[#00FFC2] disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#00FFC2] border-t-transparent" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      Obtener Informe Completo
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-[#dce1fb]/50">
                  Al hacer clic, aceptas nuestros términos y políticas de privacidad
                </p>
              </form>

              <div className="mt-8 flex items-center justify-center gap-4 sm:gap-6 border-t border-[#3a4a43]/20 pt-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#00FFC2]" />
                  <span className="text-xs text-[#dce1fb]/70">Análisis personalizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#00FFC2]" />
                  <span className="text-xs text-[#dce1fb]/70">PDF profesional</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#00FFC2]" />
                  <span className="text-xs text-[#dce1fb]/70">Sin compromiso</span>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-[#00FFC2]/20 p-4">
                  <CheckCircle2 className="h-8 w-8 text-[#00FFC2]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">¡Informe enviado!</h3>
              <p className="text-[#dce1fb]/70 mb-4">
                Revisa tu correo con el análisis completo de ROI y las recomendaciones personalizadas.
              </p>
              <p className="text-sm text-[#dce1fb]/70">
                Te redirigiremos en unos segundos...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}