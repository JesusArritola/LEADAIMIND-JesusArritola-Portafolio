# Security Policy - LeadAIMind Portfolio

## Overview

This document outlines the security measures implemented in the LeadAIMind portfolio website to ensure the protection of user data and prevent common vulnerabilities.

---

## Security Measures Implemented

### 1. HTTP Security Headers

The following headers are configured in `next.config.mjs`:

| Header | Value | Purpose |
|--------|-------|---------|
| X-Frame-Options | DENY | Prevents clickjacking attacks |
| X-Content-Type-Options | nosniff | Prevents MIME type sniffing |
| X-XSS-Protection | 1; mode=block | Legacy XSS protection |
| Referrer-Policy | strict-origin-when-cross-origin | Controls referrer information |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | Disables unused browser features |
| Content-Security-Policy | Custom policy | Restricts resource loading |

### 2. Input Sanitization

All user inputs are sanitized using functions in `lib/sanitize.ts`:

- **Email**: Lowercase, remove invalid characters, limit length (254 chars)
- **Phone**: Remove non-phone characters, limit length (20 chars)
- **Name**: Allow only letters, spaces, hyphens, accents
- **Business**: Remove dangerous characters (< >), limit length (100 chars)
- **General Input**: Trim whitespace, remove < >, limit length (5000 chars)

### 3. Payload Validation

Size limits are enforced on all API requests (`lib/validate-payload.ts`):

- Maximum payload size: 10KB
- Number ranges validated (min/max)
- String length validation

### 4. Rate Limiting

Protection against abuse is implemented in both API routes:

- **Contact API**: 3 requests per IP, 3 requests per email in 20 seconds
- **Lead Magnet API**: 50 calculations, 50 reports per IP in 20 seconds
- **In-memory storage** (note: resets on server restart)

### 5. Security Logging

Events are logged for monitoring (`lib/security-logger.ts`):

- Rate limit exceeded attempts
- Invalid input detections
- Payload size violations
- Suspicious requests

Logs include:
- Timestamp
- IP address (truncated for privacy)
- Path
- Event type
- User agent (optional)

---

## Technology Stack Security

- **Next.js 15**: Server-side rendering, automatic security headers
- **TypeScript**: Type safety reduces runtime errors
- **React 19**: Built-in XSS protections
- **Vercel**: DDoS protection, WAF, automatic SSL

---

## Best Practices Followed

1. **No sensitive data exposure** - Error messages are generic
2. **Input validation** - Both client and server-side
3. **Output encoding** - All user data is sanitized before use
4. **HTTPS only** - Enforced via HSTS in production
5. **Minimal permissions** - CSP restricts script sources

---

## Reporting Security Issues

If you discover a security vulnerability, please report it responsibly.

**Contact**: jesusmiguela546@gmail.com

---

## Last Updated

April 2026

---

## Disclaimer

This portfolio is currently used for presentation purposes. For production deployment, additional measures such as:

- Redis-based rate limiting for serverless environments
- CAPTCHA integration for forms
- Database encryption
- Enhanced logging infrastructure

Should be considered.