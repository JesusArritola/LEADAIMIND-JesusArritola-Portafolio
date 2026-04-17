// Logging de eventos de seguridad (sin datos sensibles)

type SecurityEventType = 
  | 'RATE_LIMIT_EXCEEDED' 
  | 'INVALID_EMAIL' 
  | 'INVALID_PHONE' 
  | 'INVALID_INPUT'
  | 'PAYLOAD_TOO_LARGE'
  | 'SUSPICIOUS_REQUEST'

interface SecurityLog {
  event: SecurityEventType
  timestamp: string
  ip: string
  path: string
  userAgent?: string
}

export function logSecurityEvent(
  event: SecurityEventType,
  path: string,
  ip: string,
  userAgent?: string
): void {
  const log: SecurityLog = {
    event,
    timestamp: new Date().toISOString(),
    ip: ip.length > 15 ? ip.substring(0, 15) : ip,
    path,
    userAgent
  }
  
  console.warn('[SECURITY]', JSON.stringify(log))
}