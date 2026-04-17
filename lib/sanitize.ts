// Funciones de sanitización para inputs de usuario

const MAX_INPUT_LENGTH = 5000
const MAX_EMAIL_LENGTH = 254
const MAX_NAME_LENGTH = 100
const MAX_PHONE_LENGTH = 20

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, MAX_INPUT_LENGTH)
}

export function sanitizeEmail(email: string): string {
  return email
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9@._-]/g, '')
    .slice(0, MAX_EMAIL_LENGTH)
}

export function sanitizePhone(phone: string): string {
  return phone
    .replace(/[^+0-9\s\-()]/g, '')
    .trim()
    .slice(0, MAX_PHONE_LENGTH)
}

export function sanitizeName(name: string): string {
  return name
    .trim()
    .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]/g, '')
    .slice(0, MAX_NAME_LENGTH)
}

export function sanitizeBusiness(business: string): string {
  return business
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, MAX_NAME_LENGTH)
}