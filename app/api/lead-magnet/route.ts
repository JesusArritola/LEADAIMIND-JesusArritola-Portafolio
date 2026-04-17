import { NextResponse } from "next/server"
import { validatePayloadSize } from "@/lib/validate-payload"
import { sanitizeEmail } from "@/lib/sanitize"
import { logSecurityEvent } from "@/lib/security-logger"

interface RequestRecord {
  count: number
  lastRequest: number
}

const calculationStore = new Map<string, RequestRecord>()
const reportStore = new Map<string, RequestRecord>()

const MAX_CALCULATIONS = 50
const MAX_REPORTS = 50
const RATE_LIMIT_WINDOW_MS = 20 * 1000

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  return request.headers.get("x-real-ip") || "unknown"
}

function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

function isCalculationLimited(ip: string): { limited: boolean; message: string } {
  const now = Date.now()
  const record = calculationStore.get(ip)

  if (record) {
    const timeSinceLastRequest = now - record.lastRequest
    
    if (timeSinceLastRequest < RATE_LIMIT_WINDOW_MS && record.count >= MAX_CALCULATIONS) {
      return { 
        limited: true, 
        message: `Has alcanzado el límite de ${MAX_CALCULATIONS} cálculos. Por favor espera ${Math.ceil((RATE_LIMIT_WINDOW_MS - timeSinceLastRequest) / 1000)} segundos.` 
      }
    }
  }

  return { limited: false, message: "" }
}

function isReportLimited(ip: string, email: string): { limited: boolean; message: string } {
  const now = Date.now()
  const ipKey = `ip:${ip}`
  const emailKey = `email:${sanitizeEmail(email)}`

  const ipRecord = reportStore.get(ipKey)
  if (ipRecord) {
    const timeSinceLastRequest = now - ipRecord.lastRequest
    
    if (timeSinceLastRequest < RATE_LIMIT_WINDOW_MS && ipRecord.count >= MAX_REPORTS) {
      return { 
        limited: true, 
        message: `Has alcanzado el límite de ${MAX_REPORTS} informes.` 
      }
    }
  }

  const emailRecord = reportStore.get(emailKey)
  if (emailRecord) {
    const timeSinceLastRequest = now - emailRecord.lastRequest
    
    if (timeSinceLastRequest < RATE_LIMIT_WINDOW_MS && emailRecord.count >= MAX_REPORTS) {
      return { 
        limited: true, 
        message: `Este correo ya ha alcanzado el límite de ${MAX_REPORTS} solicitudes.` 
      }
    }
  }

  return { limited: false, message: "" }
}

function updateCalculationCount(ip: string): void {
  const now = Date.now()
  const record = calculationStore.get(ip) || { count: 0, lastRequest: 0 }
  
  const timeSinceLastRequest = now - record.lastRequest
  if (timeSinceLastRequest >= RATE_LIMIT_WINDOW_MS) {
    record.count = 1
  } else {
    record.count = Math.min(record.count + 1, MAX_CALCULATIONS)
  }
  record.lastRequest = now
  calculationStore.set(ip, record)
}

function updateReportCount(ip: string, email: string): void {
  const now = Date.now()
  const ipKey = `ip:${ip}`
  const emailKey = `email:${sanitizeEmail(email)}`

  const ipRecord = reportStore.get(ipKey) || { count: 0, lastRequest: 0 }
  const ipTimeSinceLastRequest = now - ipRecord.lastRequest
  if (ipTimeSinceLastRequest >= RATE_LIMIT_WINDOW_MS) {
    ipRecord.count = 1
  } else {
    ipRecord.count = Math.min(ipRecord.count + 1, MAX_REPORTS)
  }
  ipRecord.lastRequest = now
  reportStore.set(ipKey, ipRecord)

  const emailRecord = reportStore.get(emailKey) || { count: 0, lastRequest: 0 }
  const emailTimeSinceLastRequest = now - emailRecord.lastRequest
  if (emailTimeSinceLastRequest >= RATE_LIMIT_WINDOW_MS) {
    emailRecord.count = 1
  } else {
    emailRecord.count = Math.min(emailRecord.count + 1, MAX_REPORTS)
  }
  emailRecord.lastRequest = now
  reportStore.set(emailKey, emailRecord)
}

function validateNumber(value: string, min: number, max: number): boolean {
  const num = Number(value)
  return !isNaN(num) && num >= min && num <= max
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, email, clientId, inputData, results } = body

    const clientIp = getClientIp(request)

    // Validate payload size
    if (!validatePayloadSize(body)) {
      logSecurityEvent('PAYLOAD_TOO_LARGE', '/api/lead-magnet', clientIp)
      return NextResponse.json(
        { error: 'Solicitud demasiado grande' },
        { status: 400 }
      )
    }

    if (type === 'calculation') {
      const rateLimitCheck = isCalculationLimited(clientIp)
      if (rateLimitCheck.limited) {
        logSecurityEvent('RATE_LIMIT_EXCEEDED', '/api/lead-magnet', clientIp)
        return NextResponse.json(
          { error: rateLimitCheck.message },
          { status: 429 }
        )
      }

      if (!inputData) {
        return NextResponse.json(
          { error: "Faltan datos de entrada" },
          { status: 400 }
        )
      }

      if (!validateNumber(inputData.employees, 1, 1000) ||
          !validateNumber(inputData.hourlyWage, 1, 1000) ||
          !validateNumber(inputData.weeklyHours, 1, 168) ||
          !validateNumber(inputData.automationCost, 1, 100000)) {
        logSecurityEvent('INVALID_INPUT', '/api/lead-magnet', clientIp)
        return NextResponse.json(
          { error: "Datos inválidos" },
          { status: 400 }
        )
      }

      updateCalculationCount(clientIp)

      return NextResponse.json({ 
        success: true, 
        message: "Cálculo registrado" 
      })
    }

    if (type === 'roi-report-request') {
      const rateLimitCheck = isReportLimited(clientIp, email)
      if (rateLimitCheck.limited) {
        logSecurityEvent('RATE_LIMIT_EXCEEDED', '/api/lead-magnet', clientIp)
        return NextResponse.json(
          { error: rateLimitCheck.message },
          { status: 429 }
        )
      }

      if (!email || !validateEmail(email)) {
        logSecurityEvent('INVALID_EMAIL', '/api/lead-magnet', clientIp)
        return NextResponse.json(
          { error: "Correo electrónico inválido" },
          { status: 400 }
        )
      }

      // Sanitize email
      const sanitizedEmail = sanitizeEmail(email)

      if (!inputData || !results) {
        return NextResponse.json(
          { error: "Faltan datos para generar el informe" },
          { status: 400 }
        )
      }

      const webhookUrl = process.env.N8N_WEBHOOK_URL

      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "roi-report",
            email: sanitizedEmail,
            clientId,
            inputData,
            results,
            timestamp: new Date().toISOString(),
            source: "LeadAIMind ROI Calculator"
          }),
        }).catch(err => {
          console.error("Webhook error:", err)
          logSecurityEvent('SUSPICIOUS_REQUEST', '/api/lead-magnet', clientIp)
        })
      }

      updateReportCount(clientIp, email)

      return NextResponse.json({ 
        success: true, 
        message: "Informe solicitado" 
      })
    }

    return NextResponse.json(
      { error: "Tipo de solicitud inválido" },
      { status: 400 }
    )
  } catch (error) {
    console.error("[v0] Lead Magnet API error:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: "OK",
    limits: {
      calculations: MAX_CALCULATIONS,
      reports: MAX_REPORTS
    }
  })
}