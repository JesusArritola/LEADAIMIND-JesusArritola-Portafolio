// Validación de tamaño y estructura de payloads

const MAX_PAYLOAD_SIZE = 10 * 1024 // 10KB

export function validatePayloadSize(body: unknown): boolean {
  try {
    const size = JSON.stringify(body).length
    return size <= MAX_PAYLOAD_SIZE
  } catch {
    return false
  }
}

export function isValidNumber(value: unknown, min: number, max: number): boolean {
  if (typeof value !== 'string' && typeof value !== 'number') return false
  const num = Number(value)
  return !isNaN(num) && num >= min && num <= max
}

export function isValidString(value: unknown, minLen: number, maxLen: number): boolean {
  return typeof value === 'string' && value.length >= minLen && value.length <= maxLen
}