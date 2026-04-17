import { NextResponse } from "next/server"
import { validatePayloadSize } from "@/lib/validate-payload"
import { sanitizeEmail, sanitizePhone, sanitizeName, sanitizeBusiness, sanitizeInput } from "@/lib/sanitize"
import { logSecurityEvent } from "@/lib/security-logger"

interface RequestRecord {
  count: number
  lastRequest: number
}

const requestStore = new Map<string, RequestRecord>()

const MAX_REQUESTS_PER_IP = 3
const MAX_REQUESTS_PER_EMAIL = 3
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

function isRateLimited(ip: string, email: string): { limited: boolean; message: string } {
  const now = Date.now()

  const ipRecord = requestStore.get(ip)
  if (ipRecord) {
    const timeSinceLastRequest = now - ipRecord.lastRequest
    
    if (timeSinceLastRequest < RATE_LIMIT_WINDOW_MS && ipRecord.count >= MAX_REQUESTS_PER_IP) {
      return { 
        limited: true, 
        message: `Demasiadas solicitudes. Por favor espera ${Math.ceil((RATE_LIMIT_WINDOW_MS - timeSinceLastRequest) / 1000)} segundos antes de enviar otro formulario.` 
      }
    }
  }

  const emailKey = `email:${sanitizeEmail(email)}`
  const emailRecord = requestStore.get(emailKey)
  if (emailRecord) {
    const timeSinceLastRequest = now - emailRecord.lastRequest
    
    if (timeSinceLastRequest < RATE_LIMIT_WINDOW_MS && emailRecord.count >= MAX_REQUESTS_PER_EMAIL) {
      return { 
        limited: true, 
        message: `Este correo ya ha alcanzado el límite de ${MAX_REQUESTS_PER_EMAIL} solicitudes. Por favor intenta más tarde.` 
      }
    }
  }

  return { limited: false, message: "" }
}

function updateRequestCount(ip: string, email: string): void {
  const now = Date.now()
  const emailKey = `email:${sanitizeEmail(email)}`

  const ipRecord = requestStore.get(ip) || { count: 0, lastRequest: 0 }
  const timeSinceLastRequest = now - ipRecord.lastRequest

  if (timeSinceLastRequest >= RATE_LIMIT_WINDOW_MS) {
    ipRecord.count = 1
  } else {
    ipRecord.count = Math.min(ipRecord.count + 1, MAX_REQUESTS_PER_IP)
  }
  ipRecord.lastRequest = now
  requestStore.set(ip, ipRecord)

  const emailRecord = requestStore.get(emailKey) || { count: 0, lastRequest: 0 }
  const emailTimeSinceLastRequest = now - emailRecord.lastRequest

  if (emailTimeSinceLastRequest >= RATE_LIMIT_WINDOW_MS) {
    emailRecord.count = 1
  } else {
    emailRecord.count = Math.min(emailRecord.count + 1, MAX_REQUESTS_PER_EMAIL)
  }
  emailRecord.lastRequest = now
  requestStore.set(emailKey, emailRecord)
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-()]{6,20}$/
  return phoneRegex.test(phone)
}

function validateName(name: string): boolean {
  const cleanName = name.trim()
  return cleanName.length >= 2 && cleanName.length <= 100
}

function validateBusiness(business: string): boolean {
  const cleanBusiness = business.trim()
  return cleanBusiness.length >= 2 && cleanBusiness.length <= 100
}

function validateTimeConsumers(timeConsumers: string): boolean {
  return timeConsumers.trim().length > 0
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, business, timeConsumers } = body

    const clientIp = getClientIp(request)

    // Validate payload size
    if (!validatePayloadSize(body)) {
      logSecurityEvent('PAYLOAD_TOO_LARGE', '/api/contact', clientIp)
      return NextResponse.json(
        { error: 'Solicitud demasiado grande' },
        { status: 400 }
      )
    }

    const rateLimitCheck = isRateLimited(clientIp, email)
    if (rateLimitCheck.limited) {
      logSecurityEvent('RATE_LIMIT_EXCEEDED', '/api/contact', clientIp)
      return NextResponse.json(
        { error: rateLimitCheck.message },
        { status: 429 }
      )
    }

    if (!name || !email || !phone || !business || !timeConsumers) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedName = sanitizeName(name)
    const sanitizedEmail = sanitizeEmail(email)
    const sanitizedPhone = sanitizePhone(phone)
    const sanitizedBusiness = sanitizeBusiness(business)
    const sanitizedTimeConsumers = sanitizeInput(timeConsumers)

    // Validate sanitized inputs
    if (!sanitizedName || !sanitizedEmail || !sanitizedPhone || !sanitizedBusiness || !sanitizedTimeConsumers) {
      logSecurityEvent('INVALID_INPUT', '/api/contact', clientIp)
      return NextResponse.json(
        { error: "Datos inválidos después de la validación" },
        { status: 400 }
      )
    }

    if (!validateName(sanitizedName)) {
      return NextResponse.json(
        { error: "El nombre debe tener entre 2 y 100 caracteres" },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Por favor ingresa un correo electrónico válido" },
        { status: 400 }
      )
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { error: "Por favor ingresa un número de teléfono válido" },
        { status: 400 }
      )
    }

    if (!validateBusiness(business)) {
      return NextResponse.json(
        { error: "El tipo de negocio debe tener entre 2 y 100 caracteres" },
        { status: 400 }
      )
    }

    if (!validateTimeConsumers(timeConsumers)) {
      return NextResponse.json(
        { error: "Selecciona al menos una opción" },
        { status: 400 }
      )
    }

    updateRequestCount(clientIp, email)

    const webhookUrl = process.env.N8N_WEBHOOK_URL

    if (!webhookUrl) {
      console.error("[v0] N8N_WEBHOOK_URL no está configurada")
      return NextResponse.json(
        { error: "Servicio no disponible" },
        { status: 503 }
      )
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        business: sanitizedBusiness,
        timeConsumers: sanitizedTimeConsumers,
        source: "LeadAIMind Portfolio",
        timestamp: new Date().toISOString(),
        clientIp: clientIp,
      }),
    })

    if (!response.ok) {
      console.error("[v0] n8n webhook error:", response.status)
      return NextResponse.json(
        { error: "Error al enviar el mensaje" },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Contact API error:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
