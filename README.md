# LeadAIMind - Portfolio Profesional

> Especialista en Automatización Empresarial | Soluciones n8n & IA

Portfolio profesional de Jesús Miguel Arritola, especialista en automatización de procesos empresariales utilizando n8n, inteligencia artificial y tecnologías modernas.

---

## 🌐 Sitio en Vivo

**URL:** https://leadaimind.com

---

## 🚀 Despliegue

### Vercel (Recomendado)

```bash
# Opción 1: CLI de Vercel
npm i -g vercel
vercel

# Opción 2: GitHub + Vercel
# 1. Subir código a GitHub
# 2. Ir a https://vercel.com
# 3. Importar repositorio
# 4. Deploy automático
```

### GitHub Pages (Alternativo)

```bash
# 1. Crear archivo .github/workflows/deploy.yml
# 2. Configurar GitHub Actions
# 3. Push triggers deployment
```

### Variables de Entorno

Para producción, configurar en Vercel:

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `N8N_WEBHOOK_URL` | URL del webhook de n8n | Opcional |

---

## 🛡️ Seguridad

El portfolio incluye:
- Headers de seguridad HTTP (CSP, X-Frame-Options, etc.)
- Rate limiting en APIs
- Sanitización de inputs
- Validación de payloads
- Logging de eventos de seguridad

Ver [SECURITY.md](./SECURITY.md) para detalles completos.

---

## 📱 Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl+1` | Ir a Servicios |
| `Ctrl+2` | Ir a Demos |
| `Ctrl+3` | Ir a Proceso |
| `Ctrl+4` | Ir a Proyectos |
| `Ctrl+5` | Ir a Sobre Mí |
| `Ctrl+C` | Ir a Consulta Gratis |
| `Escape` | Cerrar modal |

---

## 📁 Estructura

```
Profesional-Portafolio/
├── app/                    # Next.js App Router
│   ├── api/               # Rutas API
│   ├── proyectos/         # Página de proyectos
│   └── acerca-de-mi/      # Página Sobre Mí
├── components/            # Componentes React
├── lib/                   # Utilidades y datos
├── hooks/                 # Custom hooks
├── public/               # Archivos estáticos
│   ├── Jsons/            # Plantillas de workflows
│   ├── certificados/     # Certificados PDF
│   └── images/           # Imágenes
└── SECURITY.md           # Política de seguridad
```

### Producción
```bash
# Build
pnpm build

# Iniciar servidor de producción
pnpm start
```

---

## 📁 Estructura del Proyecto

```
Profesional-Portafolio/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Página principal (Home)
│   ├── layout.tsx                # Layout global con metadata SEO
│   ├── globals.css               # Estilos globales y animaciones
│   ├── proyectos/                # Página de proyectos
│   └── acerca-de-mi/             # Página Sobre Mí
├── components/                   # Componentes React
│   ├── navbar.tsx                # Navegación principal
│   ├── hero.tsx                  # Sección Hero
│   ├── services.tsx              # Servicios ofrecidos
│   ├── why-choose-us.tsx         # Por qué elegirnos
│   ├── demos.tsx                 # Casos de demostración
│   ├── process.tsx               # Proceso de trabajo
│   ├── statistics-section.tsx    # Estadísticas
│   ├── contact.tsx               # Formulario de contacto
│   ├── footer.tsx                # Pie de página
│   ├── lead-magnet.tsx           # Calculadora ROI
│   ├── workflow-modal.tsx        # Modal de proyectos
│   ├── portafolio-3d.tsx         # Página Sobre Mí
│   ├── global-keyboard-navigator.tsx # Atajos de teclado
│   └── ui/                       # Componentes Shadcn/UI
├── lib/
│   ├── workflows-data.ts         # Datos de workflows (49 proyectos)
│   └── analytics.ts              # Tracking de eventos
├── public/
│   ├── images/                   # Imágenes del portfolio
│   ├── Jsons/                    # Plantillas de workflows (60+ JSON)
│   ├── certificados/             # Certificados PDF
│   └── CV_Jesus_Miguel_Arritola.pdf
└── hooks/                        # Custom hooks
```

---

## ⌨️ Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl+1` | Ir a Servicios |
| `Ctrl+2` | Ir a Demos |
| `Ctrl+3` | Ir a Proceso |
| `Ctrl+4` | Ir a Proyectos |
| `Ctrl+5` | Ir a Sobre Mí |
| `Ctrl+C` | Ir a Consulta Gratis (Contacto) |
| `Escape` | Cerrar modal / Quitar foco |

---

## 📱 Navegación

- **Botón "Consulta Gratis"**: Funciona desde cualquier página, redirige a `#contacto`
- **Navbar**: Links con hover de línea verde
- **Versión móvil**: Menú hamburguesa accesible

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes:** Shadcn/UI
- **Animaciones:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel (optimizado)

---

## 📊 Características

### SEO Optimizado
- Metadata completa (title, description, keywords)
- Open Graph para redes sociales
- Canonical URL configurado
- Robots.txt configurado

### Accesibilidad (WCAG AA)
- Navegación por teclado completa
- Focus visible en todos los elementos
- Roles ARIA apropiados
- Contraste de colores adecuado

### Responsive Design
- Mobile: 375px+
- Tablet: 768px+
- Desktop: 1200px+
- Ultrawide: 1920px+

### Performance
- Imágenes optimizadas con Next.js Image
- Lazy loading de componentes
- Code splitting automático
- LCP optimizado

---

## 📄 Archivos Públicos

### Imágenes
- `public/images/logo-leadaimind.png` - Logo
- `public/images/Foto3DPortafolio.png` - Foto de perfil
- `public/images/Fotos_Jsons/` - Diagramas de workflows

### Documentos
- `public/CV_Jesus_Miguel_Arritola.pdf` - Curriculum
- `public/certificados/` - Certificados profesionales

### Plantillas
- `public/Jsons/` - 60+ archivos JSON de workflows descargables

---

## ✅ Estado del Proyecto

| Métrica | Estado |
|---------|--------|
| Lighthouse Best Practices | 95+ |
| Accessibility | WCAG AA |
| Responsive | Completo |
| SEO | Optimizado |
| Build | Sin errores |

---

## 📞 Contacto

- **WhatsApp:** +53 56686432
- **Telegram:** @Jesusarritola
- **Email:** jesusmiguela546@gmail.com

---

**Desarrollado por:** Jesús Miguel Arritola  
**Última actualización:** Abril 2026