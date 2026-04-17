'use client'

export interface Workflow {
  id: string
  name: string
  description: string
  importance: 'critical' | 'high' | 'medium' | 'low'
  nodeTypes: Array<{
    name: string
    icon: string
    color: string
  }>
  documentation: string
  howItWorks: string
  features: string[]
  useCases: string[]
  tools: string[]
  image?: string
}

export const workflows: Workflow[] = [
  {
    id: 'newsletter-tech-agent-v2',
    name: 'Newsletter Tech Agent',
    description: 'Agente automatizado para gestionar y distribuir newsletters tecnológicas con IA avanzada',
    importance: 'high',
    nodeTypes: [
      { name: 'Webhook', icon: '🔗', color: '#FF6B35' },
      { name: 'OpenAI', icon: '🤖', color: '#10A37F' },
      { name: 'Gmail', icon: '✉️', color: '#EA4335' },
      { name: 'Database', icon: '🗄️', color: '#4285F4' },
    ],
    documentation: `Este flujo automatiza la creación y distribución de newsletters tecnológicas. 
    El sistema recibe solicitudes mediante webhook, utiliza IA para generar contenido personalizado, 
    organiza la información y la distribuye automáticamente por correo electrónico.`,
    howItWorks: `1. Webhook recibe solicitud de newsletter
2. IA procesa y genera contenido
3. Se validan datos en la base de datos
4. Se formatea el email
5. Se envía mediante Gmail`,
    features: [
      'Generación automática de contenido con IA',
      'Distribución masiva de emails',
      'Seguimiento de entregas',
      'Personalización por usuario',
      'Integración con bases de datos'
    ],
    useCases: [
      'Distribución de noticias tecnológicas',
      'Comunicación con suscriptores',
      'Marketing automatizado',
      'Actualizaciones de blog'
    ],
    tools: ['Webhook', 'OpenAI GPT-4', 'Gmail', 'PostgreSQL', 'JSON'],
    image: '/images/Fotos_Jsons/Newsletter_Tech_Agent.png'
  },
  {
    id: 'telegram-bot',
    name: 'Chat Bot Telegram',
    description: 'Bot inteligente para Telegram con respuestas automáticas y procesamiento de comandos',
    importance: 'high',
    nodeTypes: [
      { name: 'Telegram', icon: '💬', color: '#0088cc' },
      { name: 'AI', icon: '🧠', color: '#10A37F' },
      { name: 'Database', icon: '🗄️', color: '#4285F4' },
      { name: 'HTTP', icon: '🌐', color: '#FF6B35' },
    ],
    documentation: `Bot conversacional para Telegram que responde a mensajes de usuarios utilizando IA,
    procesa comandos especiales y mantiene un historial de conversaciones en la base de datos.`,
    howItWorks: `1. Usuario envía mensaje en Telegram
2. Webhook captura el mensaje
3. IA procesa y genera respuesta
4. Se guarda en base de datos
5. Se envía respuesta al usuario`,
    features: [
      'Conversaciones en tiempo real',
      'Procesamiento de comandos',
      'Historial de chat',
      'Respuestas personalizadas',
      'Manejo de múltiples usuarios'
    ],
    useCases: [
      'Atención al cliente',
      'Soporte técnico',
      'Chatbot de marketing',
      'Asistente personal'
    ],
    tools: ['Telegram', 'OpenAI', 'PostgreSQL', 'Webhook', 'Set Variable'],
    image: '/images/Fotos_Jsons/Chat_Bot_Telegram.png'
  },
  {
    id: 'telegram-sales-agent',
    name: 'Telegram Sales Agent',
    description: 'Agente de ventas automatizado para Telegram que convierte leads en clientes',
    importance: 'critical',
    nodeTypes: [
      { name: 'Telegram', icon: '💬', color: '#0088cc' },
      { name: 'AI Sales', icon: '💼', color: '#10A37F' },
      { name: 'CRM', icon: '📊', color: '#FF6B35' },
      { name: 'Payment', icon: '💳', color: '#4285F4' },
    ],
    documentation: `Agente inteligente que gestiona el ciclo completo de ventas en Telegram:
    calificación de leads, presentación de productos, manejo de objeciones y cierre de ventas.`,
    howItWorks: `1. Lead inicia conversación
2. Agente califica interés
3. Presenta soluciones personalizadas
4. Maneja objeciones
5. Facilita pago y cierre`,
    features: [
      'Calificación automática de leads',
      'Presentación de productos',
      'Manejo de objeciones',
      'Integración con CRM',
      'Procesamiento de pagos'
    ],
    useCases: [
      'Ventas directas en Telegram',
      'Lead generation',
      'Conversión de clientes',
      'Seguimiento de oportunidades'
    ],
    tools: ['Telegram API', 'OpenAI', 'Stripe', 'Salesforce'],
    image: '/images/Fotos_Jsons/Telegram_Sales_Agent_For_Business.png'
  },
  {
    id: 'gmail-respuesta-automatica',
    name: 'Respuesta Automática Gmail',
    description: 'Sistema de respuestas automáticas inteligentes para emails en Gmail con IA',
    importance: 'medium',
    nodeTypes: [
      { name: 'Gmail', icon: '✉️', color: '#EA4335' },
      { name: 'AI', icon: '🤖', color: '#10A37F' },
      { name: 'Filter', icon: '🔍', color: '#FF6B35' },
      { name: 'Logger', icon: '📝', color: '#4285F4' },
    ],
    documentation: `Automatiza respuestas de email basadas en contenido inteligente.
    Analiza los emails entrantes y genera respuestas personalizadas automáticamente.`,
    howItWorks: `1. Email llega a bandeja de entrada
2. Sistema analiza contenido
3. IA genera respuesta personalizada
4. Se envía respuesta automáticamente
5. Se registra en log`,
    features: [
      'Análisis inteligente de emails',
      'Generación de respuestas IA',
      'Filtrado automático',
      'Respuestas personalizadas',
      'Registro de actividad'
    ],
    useCases: [
      'Soporte automático',
      'Respuestas a consultas frecuentes',
      'Confirmación de recepción',
      'Triage de emails'
    ],
    tools: ['Gmail API', 'OpenAI', 'Google Apps Script'],
    image: '/images/Fotos_Jsons/Respuesta_Automatica_Gmails.png'
  },
  {
    id: 'gmail-clasificador',
    name: 'Clasificador Gmail Agente',
    description: 'Agente inteligente que clasifica y organiza automáticamente emails',
    importance: 'high',
    nodeTypes: [
      { name: 'Gmail', icon: '✉️', color: '#EA4335' },
      { name: 'AI Classifier', icon: '🧠', color: '#10A37F' },
      { name: 'Labels', icon: '🏷️', color: '#FF6B35' },
      { name: 'Storage', icon: '📦', color: '#4285F4' },
    ],
    documentation: `Agente que automáticamente clasifica, etiqueta y organiza emails.
    Utiliza IA para categorizar por tipo, prioridad y tema.`,
    howItWorks: `1. Email entra al sistema
2. Agente analiza contenido
3. Determina categoría
4. Aplica etiqueta automática
5. Mueve a carpeta correspondiente`,
    features: [
      'Clasificación automática',
      'Etiquetado inteligente',
      'Priorización',
      'Organización por carpetas',
      'Aprendizaje automático'
    ],
    useCases: [
      'Organización de bandeja de entrada',
      'Separación por prioridades',
      'Gestión de múltiples proyectos',
      'Mejora de productividad'
    ],
    tools: ['Gmail API', 'OpenAI', 'Google Cloud Storage'],
    image: '/images/Fotos_Jsons/Clasificador_Gmail_Agente.png'
  },
  {
    id: 'scrape-leads-v2',
    name: 'Scrape Leads',
    description: 'Sistema automático de extracción de leads desde múltiples fuentes web',
    importance: 'critical',
    nodeTypes: [
      { name: 'Web Scraper', icon: '🕷️', color: '#FF6B35' },
      { name: 'Parser', icon: '📄', color: '#4285F4' },
      { name: 'CRM', icon: '👥', color: '#10A37F' },
      { name: 'Webhook', icon: '🔗', color: '#EA4335' },
    ],
    documentation: `Extrae información de leads desde múltiples fuentes web,
    procesa los datos y los almacena en la base de datos del CRM.`,
    howItWorks: `1. Identifica fuentes web objetivo
2. Extrae datos de contacto
3. Procesa y valida información
4. Elimina duplicados
5. Importa a CRM`,
    features: [
      'Extracción multi-fuente',
      'Validación de datos',
      'Eliminación de duplicados',
      'Enriquecimiento de datos',
      'Exportación a CRM'
    ],
    useCases: [
      'Generación de leads',
      'Investigación de mercado',
      'Monitoreo de competencia',
      'Enriquecimiento de datos'
    ],
    tools: ['Web Scraper', 'Node.js', 'Puppeteer', 'Salesforce'],
    image: '/images/Fotos_Jsons/Scrape_Leads.png'
  },
  {
    id: 'script-generator-v2',
    name: 'Script Generator',
    description: 'Generador automático de scripts de código mediante IA avanzada',
    importance: 'medium',
    nodeTypes: [
      { name: 'Prompt', icon: '📝', color: '#FF6B35' },
      { name: 'OpenAI', icon: '🤖', color: '#10A37F' },
      { name: 'Code Parser', icon: '💻', color: '#4285F4' },
      { name: 'Output', icon: '📤', color: '#EA4335' },
    ],
    documentation: `Utiliza IA para generar scripts y código automáticamente.
    Recibe descripciones en lenguaje natural y genera código listo para usar.`,
    howItWorks: `1. Usuario describe función deseada
2. Sistema crea prompt optimizado
3. IA genera código
4. Se valida sintaxis
5. Se entrega código funcional`,
    features: [
      'Generación de código con IA',
      'Múltiples lenguajes soportados',
      'Validación de sintaxis',
      'Explicación de código',
      'Optimización automática'
    ],
    useCases: [
      'Desarrollo rápido',
      'Generación de boilerplate',
      'Solución de problemas',
      'Prototipado rápido'
    ],
    tools: ['OpenAI', 'Babel', 'Node.js', 'Git']
  },
  {
    id: 'lead-gen-system-v2',
    name: 'Lead Gen System',
    description: 'Sistema integral de generación y gestión de leads automatizado',
    importance: 'critical',
    nodeTypes: [
      { name: 'Landing', icon: '🌐', color: '#FF6B35' },
      { name: 'Form', icon: '📋', color: '#4285F4' },
      { name: 'CRM', icon: '📊', color: '#10A37F' },
      { name: 'Email', icon: '✉️', color: '#EA4335' },
    ],
    documentation: `Sistema completo para capturar, procesar y nutrir leads.
    Integra landing pages, formularios, CRM y secuencias de email automáticas.`,
    howItWorks: `1. Lead completa formulario en landing
2. Se validan datos
3. Se guarda en CRM
4. Se inicia secuencia de email
5. Se da seguimiento automático`,
    features: [
      'Landing pages convertidoras',
      'Formularios dinámicos',
      'Integración CRM',
      'Email marketing automatizado',
      'Análisis de conversión'
    ],
    useCases: [
      'Generación de leads B2B',
      'Webinars y eventos',
      'Cursos online',
      'Campañas de marketing'
    ],
    tools: ['Leadpages', 'Salesforce', 'Mailchimp', 'Zapier'],
    image: '/images/Fotos_Jsons/Lead_Gen_System.png'
  },
  {
    id: 'agente-correos-frios',
    name: 'Agente Correos Fríos',
    description: 'Agente especializado en outreach de email frío con seguimiento automático',
    importance: 'high',
    nodeTypes: [
      { name: 'Email List', icon: '📧', color: '#EA4335' },
      { name: 'Personalization', icon: '✍️', color: '#10A37F' },
      { name: 'SMTP', icon: '📤', color: '#FF6B35' },
      { name: 'Tracking', icon: '📍', color: '#4285F4' },
    ],
    documentation: `Agente que gestiona campañas de email frío personalizado.
    Personaliza cada email, gestiona entregas y da seguimiento automático.`,
    howItWorks: `1. Carga lista de contactos
2. Personaliza cada email
3. Envía según cronograma
4. Rastrea aperturas y clics
5. Inicia seguimiento automático`,
    features: [
      'Personalización dinámica',
      'Envío cronometrado',
      'Seguimiento de métricas',
      'Secuencias de follow-up',
      'Rotación de mensajes'
    ],
    useCases: [
      'Prospección B2B',
      'Outreach de ventas',
      'Búsqueda de empleo',
      'Asociaciones comerciales'
    ],
    tools: ['Mailgun', 'Apollo', 'HubSpot', 'Lemlist'],
    image: '/images/Fotos_Jsons/Agente_Correos_Frios.png'
  },
  {
    id: 'campanas-emails',
    name: 'Campañas Emails',
    description: 'Plataforma de gestión de campañas de email marketing automatizadas',
    importance: 'high',
    nodeTypes: [
      { name: 'Email List', icon: '👥', color: '#FF6B35' },
      { name: 'Template', icon: '🎨', color: '#4285F4' },
      { name: 'Send', icon: '📤', color: '#EA4335' },
      { name: 'Analytics', icon: '📊', color: '#10A37F' },
    ],
    documentation: `Plataforma completa para crear, enviar y analizar campañas de email.
    Soporta templates personalizados, segmentación y análisis detallado.`,
    howItWorks: `1. Crea template de email
2. Selecciona audiencia
3. Configura envío
4. Monitorea métricas
5. Analiza resultados`,
    features: [
      'Templates HTML/CSS',
      'Segmentación de audiencia',
      'Envío automático',
      'Analytics detallado',
      'A/B testing',
      'Automatización workflows'
    ],
    useCases: [
      'Email marketing',
      'Newsletter',
      'Promociones',
      'Onboarding de clientes'
    ],
    tools: ['Mailchimp', 'SendGrid', 'Klaviyo', 'ActiveCampaign'],
    image: '/images/Fotos_Jsons/Campañas_Emails.png'
  },
  {
    id: 'agente-thumbnail',
    name: 'Agente Thumbnail PDF',
    description: 'Agente inteligente que genera thumbnails profesionales para videos y PDFs',
    importance: 'medium',
    nodeTypes: [
      { name: 'Form', icon: '📋', color: '#4285F4' },
      { name: 'AI Image', icon: '🎨', color: '#10A37F' },
      { name: 'PDF Convert', icon: '📄', color: '#FF6B35' },
      { name: 'Storage', icon: '☁️', color: '#EA4335' },
    ],
    documentation: `Genera thumbnails visualmente atractivos automáticamente.
    Acepta descripciones de videos y genera imágenes con IA.`,
    howItWorks: `1. Usuario completa formulario
2. IA crea prompt personalizado
3. Genera imagen con DALL-E
4. Convierte a PDF
5. Guarda en almacenamiento`,
    features: [
      'Generación de código con IA',
      'Múltiples lenguajes soportados',
      'Validación de sintaxis',
      'Explicación de código',
      'Optimización automática'
    ],
    useCases: [
      'Creación de thumbnails YouTube',
      'Diseño gráfico',
      'Portadas de documentos',
      'Social media content'
    ],
    tools: ['DALL-E 3', 'OpenAI', 'PDF.co', 'Google Drive'],
    image: '/images/Fotos_Jsons/Agente_Thumbail.png'
  },
  {
    id: 'nano-banana-gemini-v2',
    name: 'Nano Banana/Gemini - Generador de Videos IA',
    description: 'Sistema de generación de videos AI con Nano Banana y Google Gemini',
    importance: 'high',
    nodeTypes: [
      { name: 'Form Trigger', icon: '📋', color: '#FF6B35' },
      { name: 'Gemini', icon: '🤖', color: '#10A37F' },
      { name: 'Nano Banana', icon: '🎬', color: '#4285F4' },
      { name: 'Storage', icon: '☁️', color: '#EA4335' },
    ],
    documentation: `Generador automático de videos usando IA. Los usuarios envían imágenes y descripciones,
    el sistema las procesa con Gemini y genera videos profesionales con Nano Banana.`,
    howItWorks: `1. Usuario completa formulario con imagen y descripción
2. Sistema valida archivos
3. Gemini procesa la descripción
4. Nano Banana genera el video
5. Se almacena y entrega al usuario`,
    features: [
      'Generación de videos con IA',
      'Múltiples estilos disponibles',
      'Procesamiento de imágenes',
      'Almacenamiento automático',
      'Descarga directa'
    ],
    useCases: [
      'Generación de contenido video',
      'Marketing visual',
      'Social media content',
      'Publicidad automatizada'
    ],
    tools: ['Nano Banana API', 'Google Gemini', 'Node.js', 'Google Drive']
  },
  {
    id: 'agente-onboarding-cliente-v2',
    name: 'Agente OnBoarding - Nuevo Cliente',
    description: 'Automatiza el proceso completo de bienvenida de nuevos clientes',
    importance: 'high',
    nodeTypes: [
      { name: 'Form', icon: '📋', color: '#4285F4' },
      { name: 'AI Agent', icon: '🤖', color: '#10A37F' },
      { name: 'Google Drive', icon: '🗂️', color: '#FF6B35' },
      { name: 'Gmail', icon: '✉️', color: '#EA4335' },
    ],
    documentation: `Agente que automatiza el onboarding de clientes. Crea carpetas personalizadas,
    genera emails de bienvenida personalizados y configura automáticamente acceso a recursos.`,
    howItWorks: `1. Cliente completa formulario de registro
2. Sistema crea carpeta personalizada
3. IA genera email de bienvenida
4. Se configura acceso a documentos
5. Se envía email con instrucciones`,
    features: [
      'Creación automática de carpetas',
      'Email de bienvenida personalizado',
      'Asignación de permisos',
      'Documentación automática',
      'Seguimiento de cliente'
    ],
    useCases: [
      'Onboarding de clientes B2B',
      'Configuración de proyectos',
      'Integración de nuevos equipos',
      'Preparación de colaboraciones'
    ],
    tools: ['Google Drive API', 'Gmail API', 'Gemini', 'Node.js'],
    image: '/images/Fotos_Jsons/Agente_On_boarding_New_client.png'
  },
  {
    id: 'agente-campanas-ads-basic',
    name: 'Agente Creador de Campañas de Ads',
    description: 'Crea campañas publicitarias automáticamente usando IA',
    importance: 'high',
    nodeTypes: [
      { name: 'Input Form', icon: '📋', color: '#4285F4' },
      { name: 'AI Agent', icon: '🤖', color: '#10A37F' },
      { name: 'Ad Platform', icon: '📢', color: '#FF6B35' },
      { name: 'Analytics', icon: '📊', color: '#EA4335' },
    ],
    documentation: `Agente que crea y optimiza campañas publicitarias automáticamente.
    Genera copy, selecciona audiencias y monitorea rendimiento en tiempo real.`,
    howItWorks: `1. Define objetivos de campaña
2. IA genera múltiples variantes de copy
3. Selecciona audiencias
4. Publica anuncios
5. Monitorea y optimiza`,
    features: [
      'Generación de copy con IA',
      'Segmentación automática',
      'Pruebas A/B',
      'Optimización de presupuesto',
      'Reportes automáticos'
    ],
    useCases: [
      'Campañas de publicidad social',
      'Google Ads automatizado',
      'Retargeting inteligente',
      'Lead generation acelerado'
    ],
    tools: ['OpenAI', 'Facebook Ads API', 'Google Ads API'],
    image: '/images/Fotos_Jsons/Agente_Creador_de_Campañas_de_Ads.png'
  },
  {
    id: 'agente-creador-freebies',
    name: 'Agente Creador de Freebies',
    description: 'Generador automático de materiales y contenido gratuito para marketing',
    importance: 'medium',
    nodeTypes: [
      { name: 'Request', icon: '📝', color: '#4285F4' },
      { name: 'AI Generator', icon: '🎨', color: '#10A37F' },
      { name: 'PDF Creator', icon: '📄', color: '#FF6B35' },
      { name: 'Distribution', icon: '📤', color: '#EA4335' },
    ],
    documentation: `Crea automáticamente freebies profesionales (templates, guías, PDFs).
    Perfectos para lead generation y atracción de audiencia.`,
    howItWorks: `1. Define tipo de freebie
2. IA genera contenido
3. Diseña formato visual
4. Crea PDF profesional
5. Configura distribución`,
    features: [
      'Generación de contenido único',
      'Diseño automático',
      'Conversión a PDF',
      'Entrega por email',
      'Seguimiento de descargas'
    ],
    useCases: [
      'Lead magnets',
      'Materiales de marketing',
      'Guías y templates',
      'Checklist descargables'
    ],
    tools: ['Canva API', 'PDF.co', 'OpenAI', 'Mailchimp'],
    image: '/images/Fotos_Jsons/Agente_Creador_de_Freebies.png'
  },
  {
    id: 'agente-automatizacion-facturas',
    name: 'Agente Automatización Facturas',
    description: 'Automatiza el proceso completo de generación y gestión de facturas',
    importance: 'critical',
    nodeTypes: [
      { name: 'ERP/Database', icon: '🗄️', color: '#4285F4' },
      { name: 'Invoice Gen', icon: '📄', color: '#10A37F' },
      { name: 'Email', icon: '✉️', color: '#FF6B35' },
      { name: 'Accounting', icon: '💼', color: '#EA4335' },
    ],
    documentation: `Sistema completo de automatización de facturas. Desde generación hasta envío y registro contable.`,
    howItWorks: `1. Datos ingresados al sistema
2. Se validan información
3. Se genera factura PDF
4. Se envía al cliente
5. Se registra en contabilidad`,
    features: [
      'Generación automática de facturas',
      'Validación de datos',
      'Envío por email',
      'Registro contable',
      'Reportes financieros'
    ],
    useCases: [
      'Facturación automática',
      'Gestión contable',
      'Cobros automáticos',
      'Auditoría financiera'
    ],
tools: ['SAP', 'OpenAI', 'Contable', 'Stripe'],
    image: '/images/Fotos_Jsons/Agente_Automaticación_facturas.png'
  },
  {
    id: 'agente-reciclador-contenido',
    name: 'Agente Reciclador de Contenido',
    description: 'Convierte contenido largo en múltiples piezas para redes sociales',
    importance: 'medium',
    nodeTypes: [
      { name: 'Input Blog', icon: '📝', color: '#4285F4' },
      { name: 'AI Splitter', icon: '✂️', color: '#10A37F' },
      { name: 'Social Format', icon: '📱', color: '#FF6B35' },
      { name: 'Publishing', icon: '📤', color: '#EA4335' },
    ],
    documentation: `Convierte artículos largo en contenido optimizado para redes sociales.
    Genera posts, carruseles, videos cortos y más automáticamente.`,
    howItWorks: `1. Ingresa artículo o contenido largo
2. IA extrae puntos clave
3. Crea contenido por plataforma
4. Optimiza para cada red
5. Programa publicación`,
    features: [
      'Desagregación inteligente de contenido',
      'Optimización por plataforma',
      'Generación de hashtags',
      'Programación automática',
      'Multi-idioma'
    ],
    useCases: [
      'Amplificación de blog posts',
      'Content marketing',
      'Social media strategy',
      'Aumento de reach'
    ],
    tools: ['OpenAI', 'Buffer', 'Later', 'Canva'],
    image: '/images/Fotos_Jsons/Agente_Reciclador_de_Contenido_Largo_a_Piezas_Cortas.png'
  },
  {
    id: 'scrape-leads-avanzado',
    name: 'Scrape Leads - Sistema Avanzado',
    description: 'Extracción inteligente de leads desde múltiples fuentes con enriquecimiento',
    importance: 'critical',
    nodeTypes: [
      { name: 'Web Crawler', icon: '🕷️', color: '#4285F4' },
      { name: 'Data Parser', icon: '🔍', color: '#10A37F' },
      { name: 'Enrichment', icon: '⚡', color: '#FF6B35' },
      { name: 'CRM Sync', icon: '🔄', color: '#EA4335' },
    ],
    documentation: `Sistema avanzado de scraping con enriquecimiento de datos.
    Extrae contactos, valida información y enriquece con datos adicionales.`,
    howItWorks: `1. Define fuentes target
2. Extrae datos de contacto
3. Valida información
4. Enriquece con firmografía
5. Sincroniza con CRM`,
    features: [
      'Scraping multi-fuente',
      'Validación avanzada',
      'Enriquecimiento de datos',
      'Detección de duplicados',
      'Sincronización CRM',
      'Escalabilidad'
    ],
    useCases: [
      'B2B lead generation',
      'Prospecting automático',
      'Investigación de mercado',
      'Inteligencia comercial'
    ],
    tools: ['Puppeteer', 'Clearbit', 'Salesforce', 'Node.js']
  },
  {
    id: 'agente-sops',
    name: 'Agente Creador de SOPs Profesionales',
    description: 'Genera procesos operativos estandarizados automáticamente con IA',
    importance: 'high',
    nodeTypes: [
      { name: 'Form Trigger', icon: '📋', color: '#4285F4' },
      { name: 'AI Agent', icon: '🤖', color: '#10A37F' },
      { name: 'Google Sheets', icon: '📊', color: '#FF6B35' },
      { name: 'Google Drive', icon: '☁️', color: '#EA4335' },
    ],
    documentation: 'Crea documentos de procesos estandarizados profesionales usando IA, almacenándolos automáticamente en Google Drive.',
    howItWorks: '1. Usuario completa formulario 2. IA genera SOP estructurado 3. Se guarda en Google Sheets 4. Se exporta a PDF 5. Se almacena en Drive',
    features: ['Generación de SOP con IA', 'Almacenamiento automático', 'Estructura profesional', 'Validación de datos'],
    useCases: ['Documentación de procesos', 'Estandarización empresarial', 'Onboarding de equipos'],
    tools: ['n8n', 'OpenAI GPT-4', 'Google Sheets', 'Google Drive', 'CloudConvert'],
    image: '/images/Fotos_Jsons/Agente_Creador_de_SOPs(Procesos_Estandarizados)_MIO.png'
  },
  {
    id: 'agente-contratos-abogado',
    name: 'Agente IA Contratos Jurídico',
    description: 'Genera y valida contratos legales con IA especializada en derecho',
    importance: 'critical',
    nodeTypes: [
      { name: 'Form', icon: '📋', color: '#4285F4' },
      { name: 'AI Legal', icon: '⚖️', color: '#10A37F' },
      { name: 'Validation', icon: '✓', color: '#FF6B35' },
      { name: 'PDF', icon: '📄', color: '#EA4335' },
    ],
    documentation: 'Sistema inteligente que crea contratos legales con validación automática de normativas y cláusulas profesionales.',
    howItWorks: '1. Ingresa datos del contrato 2. IA valida información 3. Genera contrato profesional 4. Aplica normativas 5. Exporta PDF firmable',
    features: ['Validación legal', 'Normativas automáticas', 'Cláusulas inteligentes', 'Firma electrónica'],
    useCases: ['Generación de contratos', 'Validación legal', 'Automatización jurídica'],
    tools: ['n8n', 'OpenAI', 'PDF.co', 'Telegram', 'Google Drive'],
    image: '/images/Fotos_Jsons/Agente IA Contratos (Abogado).png'
  },
  {
    id: 'agente-kpis',
    name: 'Agente Generador de KPIs Inteligente',
    description: 'Genera métricas y KPIs automáticamente basado en datos empresariales',
    importance: 'high',
    nodeTypes: [
      { name: 'Data Source', icon: '📊', color: '#4285F4' },
      { name: 'AI Analyzer', icon: '🤖', color: '#10A37F' },
      { name: 'Dashboard', icon: '📈', color: '#FF6B35' },
      { name: 'Report', icon: '📄', color: '#EA4335' },
    ],
    documentation: 'Analiza datos y genera KPIs relevantes automáticamente con IA, creando reportes profesionales y dashboards visuales.',
    howItWorks: '1. Conecta fuente de datos 2. IA analiza métricas 3. Propone KPIs relevantes 4. Genera dashboard 5. Crea reportes PDF',
    features: ['Análisis automático', 'KPIs inteligentes', 'Dashboards visuales', 'Reportes ejecutivos'],
    useCases: ['Análisis de negocio', 'Reporting ejecutivo', 'Optimización de procesos'],
    tools: ['n8n', 'Google Sheets', 'Looker', 'OpenAI', 'PDF.co'],
    image: '/images/Fotos_Jsons/Agente_generador_de_KPI\'s_MIO.png'
  },
  {
    id: 'agente-asistente-ceo',
    name: 'Agente IA Asistente Personal CEO',
    description: 'Asistente de IA personalizado para ejecutivos y CEOs con automatización total',
    importance: 'high',
    nodeTypes: [
      { name: 'Chat', icon: '💬', color: '#4285F4' },
      { name: 'AI', icon: '🤖', color: '#10A37F' },
      { name: 'Calendar', icon: '📅', color: '#FF6B35' },
      { name: 'Email', icon: '✉️', color: '#EA4335' },
    ],
    documentation: 'Asistente IA que automatiza tareas ejecutivas, gestiona calendarios, procesa emails y crea resúmenes inteligentes 24/7.',
    howItWorks: '1. CEO interactúa con IA 2. Procesa solicitudes naturales 3. Gestiona calendar automáticamente 4. Envía emails 5. Crea reportes',
    features: ['Asistencia 24/7', 'Gestión de calendario inteligente', 'Resúmenes de email', 'Automatización de tareas'],
    useCases: ['Asistencia ejecutiva', 'Productividad del CEO', 'Gestión de tiempo'],
    tools: ['n8n', 'OpenAI GPT-4', 'Google Calendar', 'Gmail', 'Slack'],
    image: '/images/Fotos_Jsons/Agente_IA_Asistente_Personal_CEO.png'
  },
  {
    id: 'agente-whiteboard-videos',
    name: 'Agente Creador de Videos Whiteboard',
    description: 'Genera videos educativos tipo whiteboard automáticamente con IA',
    importance: 'medium',
    nodeTypes: [
      { name: 'Script', icon: '📝', color: '#4285F4' },
      { name: 'AI Voice', icon: '🎙️', color: '#10A37F' },
      { name: 'Animation', icon: '🎬', color: '#FF6B35' },
      { name: 'Output', icon: '📤', color: '#EA4335' },
    ],
    documentation: 'Crea videos educativos tipo whiteboard a partir de scripts usando IA para voiceover y animaciones profesionales.',
    howItWorks: '1. Proporciona script 2. IA genera voiceover natural 3. Crea animaciones 4. Sincroniza audio-video 5. Entrega MP4 optimizado',
    features: ['Generación de voiceover IA', 'Animaciones automáticas', 'Sincronización audio perfecta', 'Exportación MP4'],
    useCases: ['Videos educativos', 'Explicadores de producto', 'Marketing de contenido visual'],
    tools: ['n8n', 'ElevenLabs', 'Nano Banana', 'FFmpeg', 'Google Drive'],
    image: '/images/Fotos_Jsons/Agente_Creador_de_Videos_"Whiteboard"_Mio.png'
  },
  {
    id: 'agente-avatar-generator',
    name: 'Agente Avatar Generator - Personajes IA',
    description: 'Genera avatares y personajes virtuales con IA avanzada',
    importance: 'medium',
    nodeTypes: [
      { name: 'Description', icon: '📝', color: '#4285F4' },
      { name: 'AI Image', icon: '🎨', color: '#10A37F' },
      { name: 'Processing', icon: '⚙️', color: '#FF6B35' },
      { name: 'Storage', icon: '☁️', color: '#EA4335' },
    ],
    documentation: 'Genera avatares únicos y personalizados basados en descripciones textuales usando IA visión avanzada.',
    howItWorks: '1. Describe características del avatar 2. IA genera múltiples opciones 3. Procesa y optimiza imágenes 4. Guarda en cloud 5. Entrega lista',
    features: ['Generación de avatares IA', 'Customización infinita', 'Múltiples estilos', 'Almacenamiento cloud'],
    useCases: ['Creación de personajes 3D', 'Branding visual', 'Social media avatars'],
    tools: ['n8n', 'DALL-E 3', 'Google Drive', 'Sharp', 'Python'],
    image: '/images/Fotos_Jsons/Agente_Avatar_generator.png'
  },
  {
    id: 'agente-telegram-personal',
    name: 'Agente IA Personal Telegram - Chatbot',
    description: 'Bot personal en Telegram con IA conversacional avanzada y memoria',
    importance: 'medium',
    nodeTypes: [
      { name: 'Telegram', icon: '💬', color: '#4285F4' },
      { name: 'AI Chat', icon: '🤖', color: '#10A37F' },
      { name: 'Memory', icon: '🧠', color: '#FF6B35' },
      { name: 'Database', icon: '🗄️', color: '#EA4335' },
    ],
    documentation: 'Bot personal en Telegram que aprende de conversaciones y se adapta automáticamente a preferencias del usuario.',
    howItWorks: '1. Usuario chatea en Telegram 2. AI procesa mensaje con contexto 3. Usa memoria de conversación 4. Genera respuesta 5. Aprende patrones',
    features: ['Conversación natural', 'Memoria de contexto', 'Aprendizaje adaptativo', 'Múltiples comandos'],
    useCases: ['Asistencia personal', 'Bot de productividad', 'Soporte automático 24/7'],
    tools: ['n8n', 'Telegram API', 'OpenAI', 'Redis', 'PostgreSQL'],
    image: '/images/Fotos_Jsons/Agente IA Personal Telegram.png'
  },
  {
    id: 'agente-hr-department',
    name: 'Agente HR Department Completo',
    description: 'Sistema completo de RH automatizado con IA (Onboarding, Reclutamiento, Evaluaciones)',
    importance: 'critical',
    nodeTypes: [
      { name: 'Application', icon: '📋', color: '#4285F4' },
      { name: 'Screening', icon: '🤖', color: '#10A37F' },
      { name: 'Evaluation', icon: '⭐', color: '#FF6B35' },
      { name: 'Dashboard', icon: '📊', color: '#EA4335' },
    ],
    documentation: 'Plataforma integral que automatiza procesos de RH: reclutamiento inteligente, onboarding automático y evaluaciones de desempeño.',
    howItWorks: '1. Publica vacante 2. Recibe candidaturas 3. IA filtra y evalúa candidatos 4. Onboarding automático 5. Seguimiento continuo',
    features: ['Selección automática de candidatos', 'Onboarding acelerado', 'Evaluaciones IA', 'Reportes de talento'],
    useCases: ['Reclutamiento eficiente', 'Onboarding de empleados', 'Gestión de desempeño'],
    tools: ['n8n', 'OpenAI GPT-4', 'Google Drive', 'Gmail', 'Slack', 'Google Forms'],
    image: '/images/Fotos_Jsons/Agente HR Department (Onboarding, Reclutamiento, Evaluaciones).png'
  },
  {
    id: 'agente-campanas-ads-avanzado',
    name: 'Agente Campañas Ads Avanzado (Meta & Google)',
    description: 'Gestión avanzada de campañas multi-plataforma con optimización automática por IA',
    importance: 'critical',
    nodeTypes: [
      { name: 'Strategy', icon: '🎯', color: '#4285F4' },
      { name: 'Meta', icon: '📱', color: '#10A37F' },
      { name: 'Google', icon: '🔍', color: '#FF6B35' },
      { name: 'Optimize', icon: '⚡', color: '#EA4335' },
    ],
    documentation: 'Crea, gestiona y optimiza campañas simultáneamente en Meta e Google con IA avanzada para máxima ROI.',
    howItWorks: '1. Define objetivo y presupuesto 2. IA genera múltiples copies 3. Configura audiencias automáticas 4. Lanza en ambas plataformas 5. Optimiza en tiempo real',
    features: ['Multi-plataforma simultáneo', 'Copy generado por IA', 'Optimización automática ROAS', 'Reportes en tiempo real'],
    useCases: ['Campañas integradas', 'Lead generation', 'E-commerce scaling', 'Brand awareness'],
    tools: ['n8n', 'OpenAI', 'Meta Ads API', 'Google Ads API', 'Google Sheets', 'Looker']
  },
  {
    id: 'agente-creador-freebies-mio',
    name: 'Agente Creador de Freebies Avanzado',
    description: 'Generador avanzado de materiales gratuitos personalizados para lead generation',
    importance: 'high',
    nodeTypes: [
      { name: 'Brief', icon: '📝', color: '#4285F4' },
      { name: 'Generator', icon: '🎨', color: '#10A37F' },
      { name: 'Design', icon: '🖌️', color: '#FF6B35' },
      { name: 'Delivery', icon: '📤', color: '#EA4335' },
    ],
    documentation: 'Crea freebies profesionales y personalizados: guías, plantillas, checklists optimizados para máxima conversión.',
    howItWorks: '1. Define tipo de freebie 2. IA crea contenido único y valioso 3. Diseña visualmente profesional 4. Convierte a PDF 5. Configura entrega automática',
    features: ['Contenido único por IA', 'Diseño profesional', 'Optimizado para conversión', 'Seguimiento de descargas'],
    useCases: ['Lead magnets de alta conversión', 'Materiales de marketing', 'Recursos educativos'],
    tools: ['n8n', 'OpenAI', 'Canva API', 'PDF.co', 'Mailchimp', 'Google Drive']
  },
  {
    id: 'agente-marca-personal',
    name: 'Agente Marca Personal',
    description: 'Genera contenido personalizado para construir marca personal y empresarial',
    importance: 'high',
    nodeTypes: [
      { name: 'Form', icon: '📋', color: '#4285F4' },
      { name: 'AI Creator', icon: '🎨', color: '#10A37F' },
      { name: 'Content', icon: '📝', color: '#FF6B35' },
      { name: 'Multi-Platform', icon: '🔗', color: '#EA4335' },
    ],
    documentation: 'Crea contenido estratégico para marca personal optimizado para cualquier plataforma social y tipo de audiencia.',
    howItWorks: '1. Define identidad (personal o empresa) 2. Ingresa tu idea central 3. Elige plataforma (Instagram, TikTok, etc) 4. Selecciona tipo de contenido 5. IA genera contenido optimizado',
    features: ['Multi-plataforma', 'Generación de contenido IA', 'Tono personalizable', 'Optimización por plataforma'],
    useCases: ['Construcción de marca personal', 'Marketing de contenido', 'Crecimiento en redes sociales'],
    tools: ['n8n', 'OpenAI GPT-4', 'Google Drive', 'Buffer', 'Later'],
    image: '/images/Fotos_Jsons/Agente_Marca_Personal.png'
  },
  {
    id: 'agente-prompts-profesionales',
    name: 'Agente Ingeniería de Prompts Profesionales',
    description: 'Convierte prompts vagos en instrucciones precisas y efectivas para IA',
    importance: 'medium',
    nodeTypes: [
      { name: 'Chat', icon: '💬', color: '#4285F4' },
      { name: 'RISEN Framework', icon: '🎯', color: '#10A37F' },
      { name: 'AI Optimizer', icon: '⚙️', color: '#FF6B35' },
      { name: 'Output', icon: '📤', color: '#EA4335' },
    ],
    documentation: 'Analiza y mejora prompts usando el framework RISEN para máxima efectividad en generación con IA.',
    howItWorks: '1. Ingresa tu prompt inicial 2. IA lo analiza con framework RISEN 3. Genera 4 versiones optimizadas 4. Define Rol, Instrucciones, Pasos, Objetivo, Alcance 5. Obtiene prompts profesionales',
    features: ['Framework RISEN', 'Múltiples variantes', 'Optimización automática', 'Estructura profesional'],
    useCases: ['Ingeniería de prompts', 'Mejora de resultados IA', 'Documentación de instrucciones'],
    tools: ['n8n', 'OpenAI GPT-4', 'Claude API', 'Google Gemini'],
    image: '/images/Fotos_Jsons/Agente_Prompt_Profesionales.png'
  },
  {
    id: 'clasificador-gmail-agente',
    name: 'Clasificador Gmail - Agente Inteligente',
    description: 'Clasifica automáticamente emails en carpetas con IA',
    importance: 'high',
    nodeTypes: [
      { name: 'Gmail', icon: '📧', color: '#4285F4' },
      { name: 'AI Classifier', icon: '🤖', color: '#10A37F' },
      { name: 'Filter', icon: '🔍', color: '#FF6B35' },
      { name: 'Label', icon: '🏷️', color: '#EA4335' },
    ],
    documentation: 'Clasifica automáticamente emails según contenido usando IA, organizando inbox profesionalmente.',
    howItWorks: '1. Lee emails nuevos 2. IA analiza contenido y contexto 3. Determina categoría automáticamente 4. Crea etiqueta 5. Mueve a carpeta correspondiente',
    features: ['Clasificación automática', 'Creación de etiquetas', 'Organización inteligente', 'Reducción de spam'],
    useCases: ['Organización de inbox', 'Gestión de emails', 'Filtrado automático'],
    tools: ['n8n', 'Gmail API', 'OpenAI', 'Google Sheets'],
    image: '/images/Fotos_Jsons/Clasificador_Gmail_Agente.png'
  },
  {
    id: 'respuesta-automatica-gmails',
    name: 'Respuesta Automática Gmails',
    description: 'Genera respuestas automáticas personalizadas a emails',
    importance: 'medium',
    nodeTypes: [
      { name: 'Gmail Monitor', icon: '📧', color: '#4285F4' },
      { name: 'AI Responder', icon: '💬', color: '#10A37F' },
      { name: 'Send Email', icon: '✉️', color: '#FF6B35' },
      { name: 'Log', icon: '📝', color: '#EA4335' },
    ],
    documentation: 'Genera respuestas automáticas personalizadas a emails entrantes manteniendo coherencia profesional.',
    howItWorks: '1. Monitorea emails nuevos 2. Extrae contexto del mensaje 3. IA genera respuesta personalizada 4. Revisa y envía 5. Registra en historial',
    features: ['Respuestas personalizadas', 'Contexto inteligente', 'Tono profesional', 'Control de envío'],
    useCases: ['Atención al cliente', 'Respuestas automáticas', 'Gestión de inbox'],
    tools: ['n8n', 'Gmail API', 'OpenAI GPT-4'],
    image: '/images/Fotos_Jsons/Respuesta_Automatica_Gmails.png'
  },
  {
    id: 'restaurant-table-booking',
    name: 'Restaurant Table Booking System',
    description: 'Sistema automatizado de reserva de mesas para restaurantes',
    importance: 'medium',
    nodeTypes: [
      { name: 'Form', icon: '📋', color: '#4285F4' },
      { name: 'Availability', icon: '📅', color: '#10A37F' },
      { name: 'Confirm', icon: '✓', color: '#FF6B35' },
      { name: 'Email', icon: '📧', color: '#EA4335' },
    ],
    documentation: 'Gestiona reservas de mesas automáticamente con disponibilidad real y confirmaciones por email.',
    howItWorks: '1. Cliente completa formulario 2. Verifica disponibilidad 3. Confirma reserva 4. Guarda en BD 5. Envía confirmación por email',
    features: ['Gestión de disponibilidad', 'Confirmación automática', 'Email de confirmación', 'Recordatorios'],
    useCases: ['Restaurantes', 'Bares', 'Cafeterías'],
    tools: ['n8n', 'Airtable', 'Gmail', 'Google Calendar'],
    image: '/images/Fotos_Jsons/Restaurant_Table_Booking.png'
  },
  {
    id: 'chat-bot-telegram',
    name: 'Chat Bot Telegram - Bot Conversacional',
    description: 'Bot inteligente para Telegram con conversaciones naturales',
    importance: 'medium',
    nodeTypes: [
      { name: 'Telegram', icon: '💬', color: '#4285F4' },
      { name: 'AI Chat', icon: '🤖', color: '#10A37F' },
      { name: 'Commands', icon: '⌨️', color: '#FF6B35' },
      { name: 'Database', icon: '🗄️', color: '#EA4335' },
    ],
    documentation: 'Bot para Telegram que responde mensajes de forma inteligente y gestiona comandos automáticamente.',
    howItWorks: '1. Usuario envía mensaje 2. Bot procesa solicitud 3. IA genera respuesta 4. Ejecuta comando si existe 5. Responde al usuario',
    features: ['Conversación natural', 'Comandos personalizados', 'Historial de chat', 'Gestión de usuarios'],
    useCases: ['Atención al cliente', 'Bot de información', 'Asistente personal'],
    tools: ['n8n', 'Telegram API', 'OpenAI', 'PostgreSQL']
  },
  {
    id: 'linkedin-scrape',
    name: 'LinkedIn Scrape - Extractor de Datos LinkedIn',
    description: 'Extrae datos de perfiles y empresas desde LinkedIn',
    importance: 'high',
    nodeTypes: [
      { name: 'LinkedIn Connector', icon: '💼', color: '#4285F4' },
      { name: 'Profile Scraper', icon: '👤', color: '#10A37F' },
      { name: 'Data Parser', icon: '📊', color: '#FF6B35' },
      { name: 'CRM Sync', icon: '🔄', color: '#EA4335' },
    ],
    documentation: 'Extrae datos profesionales de LinkedIn para prospección y análisis de mercado.',
    howItWorks: '1. Busca perfiles en LinkedIn 2. Extrae información pública 3. Parsea datos profesionales 4. Sincroniza con CRM 5. Crea lista de prospects',
    features: ['Extracción de perfiles', 'Análisis empresarial', 'Integración CRM', 'Automatización de prospección'],
    useCases: ['Prospección B2B', 'Reclutamiento', 'Investigación de mercado'],
    tools: ['n8n', 'LinkedIn API', 'Clearbit', 'HubSpot', 'Google Sheets'],
    image: '/images/Fotos_Jsons/Linkedin_Scrape.png'
  },
  {
    id: 'loom-outreach-agent',
    name: 'Loom Outreach Agent - Outreach con Videos Loom',
    description: 'Envía campañas de outreach personalizadas con videos Loom',
    importance: 'medium',
    nodeTypes: [
      { name: 'Leads', icon: '👥', color: '#4285F4' },
      { name: 'Loom API', icon: '🎥', color: '#10A37F' },
      { name: 'Email', icon: '✉️', color: '#FF6B35' },
      { name: 'Track', icon: '📊', color: '#EA4335' },
    ],
    documentation: 'Personaliza campaigns de outreach con videos Loom automáticos para mayor engagement.',
    howItWorks: '1. Carga lista de leads 2. Genera video Loom personalizado 3. Inserta en email 4. Envía automático 5. Rastrea visualizaciones',
    features: ['Videos personalizados', 'Personalización de email', 'Seguimiento de engagement', 'Análisis de conversión'],
    useCases: ['Sales outreach', 'Cold email campaigns', 'B2B prospección'],
    tools: ['n8n', 'Loom API', 'Gmail', 'Google Sheets', 'Lemlist'],
    image: '/images/Fotos_Jsons/Loom_Outreach_Agent.png'
  },
  {
    id: 'restaurant-order-chatbot',
    name: 'Restaurant Order Chatbot - Bot de Pedidos POS',
    description: 'Chatbot para tomar pedidos de restaurante e integración POS',
    importance: 'medium',
    nodeTypes: [
      { name: 'Chat Interface', icon: '💬', color: '#4285F4' },
      { name: 'Menu Database', icon: '🍕', color: '#10A37F' },
      { name: 'Order Processing', icon: '✓', color: '#FF6B35' },
      { name: 'POS', icon: '🏪', color: '#EA4335' },
    ],
    documentation: 'Bot conversacional que toma pedidos y los integra directamente con sistema POS del restaurante.',
    howItWorks: '1. Cliente chatea con bot 2. Selecciona items del menú 3. Confirma pedido 4. Sistema genera orden en POS 5. Se prepara pedido',
    features: ['Catálogo dinámico', 'Toma de pedidos', 'Integración POS', 'Confirmación automática'],
    useCases: ['Restaurantes', 'Delivery', 'Food courts'],
    tools: ['n8n', 'Telegram/WhatsApp', 'Square POS', 'Google Sheets'],
    image: '/images/Fotos_Jsons/Restaurant Order Chatbot  for POS Integration.png'
  },
  {
    id: 'automatizacion-leads-simple',
    name: '#1 Automatización Leads',
    description: 'Sistema automatizado de gestión de leads con formulario y respuesta personalizada por IA',
    importance: 'high',
    nodeTypes: [
      { name: 'Form', icon: '📋', color: '#4285F4' },
      { name: 'AI Agent', icon: '🤖', color: '#10A37F' },
      { name: 'Google Gemini', icon: '💎', color: '#FF6B35' },
      { name: 'Gmail', icon: '✉️', color: '#EA4335' },
    ],
    documentation: 'Automatización que permite enviar correos personalizados a usuarios que completan el formulario exponiendo sus problemas. La IA analiza y propone soluciones.',
    howItWorks: '1. Usuario completa formulario con problema 2. IA procesa y genera solución personalizada 3. Envía correo con propuesta al usuario',
    features: ['Formulario interactivo', 'Generación de soluciones con IA', 'Correos personalizados', 'Envío automático por Gmail'],
    useCases: ['Captación de leads', 'Atención al cliente', 'Propuestas comerciales'],
    tools: ['n8n', 'Google Gemini', 'Gmail', 'Form Trigger'],
    image: '/images/Fotos_Jsons/#1_Automatizacion_Leads_Simple.png'
  },
  {
    id: 'basic-telegram-chat',
    name: 'Basic Telegram Chat - Chatbot Básico',
    description: 'Bot conversacional básico para Telegram con IA y memoria',
    importance: 'high',
    nodeTypes: [
      { name: 'Telegram', icon: '💬', color: '#0088cc' },
      { name: 'AI Agent', icon: '🤖', color: '#10A37F' },
      { name: 'Google Gemini', icon: '💎', color: '#FF6B35' },
      { name: 'Memory', icon: '🧠', color: '#4285F4' },
    ],
    documentation: 'Bot de Telegram básico con IA conversacional que responde a mensajes y mantiene memoria de conversaciones.',
    howItWorks: '1. Usuario envía mensaje 2. Bot procesa con IA 3. Genera respuesta personalizada 4. Guarda en historial',
    features: ['Conversación natural', 'Memoria de contexto', 'Integración Google Sheets', 'Guardado de leads'],
    useCases: ['Atención al cliente', 'Captación de prospectos', 'Soporte automático'],
    tools: ['n8n', 'Telegram API', 'Google Gemini', 'Google Sheets', 'Memory Buffer'],
    image: '/images/Fotos_Jsons/Basic_Telegram_Chat.png'
  },
  {
    id: 'agente-hr-department-mio',
    name: 'Agente HR Department MIO - Equipo RRHH con IA',
    description: 'Sistema multi-agente que simula un departamento completo de recursos humanos',
    importance: 'critical',
    nodeTypes: [
      { name: 'Chat Input', icon: '💬', color: '#4285F4' },
      { name: 'CHRO Agent', icon: '🧠', color: '#10A37F' },
      { name: 'Agente Reclutador', icon: '🎯', color: '#FF6B35' },
      { name: 'Especialista RRHH', icon: '👥', color: '#EA4335' },
    ],
    documentation: 'Automatización multi-agente que simula un departamento completo de RRHH. Un agente estratégico CHRO analiza necesidades y delega en especialistas de reclutamiento, políticas, capacitación, desempeño, cultura y compensación.',
    howItWorks: '1. Usuario envía solicitud de RRHH 2. Agente CHRO analiza y delega 3. Agentes especializados generan contenido 4. Se compilan resultados',
    features: ['Equipo multi-agente', 'Especialistas por área', 'Respuestas integrales', 'Múltiples funciones de RRHH'],
    useCases: ['Reclutamiento', 'Políticas de empresa', 'Capacitación', 'Evaluación de desempeño'],
    tools: ['n8n', 'OpenAI O3', 'GPT-4.1-mini', 'Telegram'],
    image: '/images/Fotos_Jsons/Agente_HR_Department_MIO.png'
  },
  {
    id: 'agente-creador-campanas-ads-form',
    name: 'Agente Creador de Campañas de Ads - Formulario',
    description: 'Crea campañas publicitarias personalizadas a partir de imágenes y descripciones',
    importance: 'high',
    nodeTypes: [
      { name: 'Form', icon: '📋', color: '#4285F4' },
      { name: 'AI Agent', icon: '🤖', color: '#10A37F' },
      { name: 'Image Gen', icon: '🎨', color: '#FF6B35' },
      { name: 'Output', icon: '📤', color: '#EA4335' },
    ],
    documentation: 'Agente que crea campañas de publicidad automáticas. El usuario sube una imagen del producto, define tagline y estilo, y el sistema genera los ads.',
    howItWorks: '1. Usuario completa formulario con imagen y descripción 2. IA genera copy y variaciones 3. Crea creatives publicitarios 4. Prepara para publicación',
    features: ['Generación de creatives', 'Múltiples estilos', 'Copy automático', 'Preparación de campañas'],
    useCases: ['Campañas publicitarias', 'Marketing digital', 'Creativos para ads'],
    tools: ['n8n', 'OpenAI', 'DALL-E', 'Form Trigger'],
    image: '/images/Fotos_Jsons/Agente_Creador_Campañas_Ads_Meta-Google.png'
  },
  {
    id: 'twitter-filtro',
    name: 'Twitter Filtro - Filtrado de Tweets',
    description: 'Sistema de filtrado y procesamiento de tweets con IA',
    importance: 'medium',
    nodeTypes: [
      { name: 'Twitter', icon: '🐦', color: '#1DA1F2' },
      { name: 'AI Filter', icon: '🔍', color: '#10A37F' },
      { name: 'Parser', icon: '📄', color: '#FF6B35' },
      { name: 'Output', icon: '📤', color: '#4285F4' },
    ],
    documentation: 'Automatización que filtra y procesa tweets según criterios específicos usando IA para análisis de contenido.',
    howItWorks: '1. Recibe tweets 2. IA analiza contenido 3. Aplica filtros 4. Clasifica y organiza',
    features: ['Filtrado inteligente', 'Análisis de contenido', 'Clasificación automática', 'Organización por categorías'],
    useCases: ['Monitoreo de marca', 'Análisis de tendencias', 'Filtrado de spam'],
    tools: ['n8n', 'Twitter API', 'OpenAI', 'Webhook'],
    image: '/images/Fotos_Jsons/TWITTER_FILTRO.png'
  },
  {
    id: 'script-generator-v3',
    name: 'Script Generator - Generador de Guiones',
    description: 'Generador automático de scripts y guiones mediante IA',
    importance: 'medium',
    nodeTypes: [
      { name: 'Input', icon: '📝', color: '#4285F4' },
      { name: 'AI Generator', icon: '🤖', color: '#10A37F' },
      { name: 'Code Parser', icon: '💻', color: '#FF6B35' },
      { name: 'Output', icon: '📤', color: '#EA4335' },
    ],
    documentation: 'Generador de scripts automático que utiliza IA para crear guiones personalizados según descripción del usuario.',
    howItWorks: '1. Usuario describe tipo de script 2. IA genera contenido 3. Se formatea y valida 4. Entrega script listo',
    features: ['Generación automática', 'Múltiples tipos de scripts', 'Validación de contenido', 'Personalización por tema'],
    useCases: ['Guiones para videos', 'Scripts para podcasts', 'Presentaciones'],
    tools: ['n8n', 'OpenAI', 'Webhook', 'Set Node'],
    image: '/images/Fotos_Jsons/Script_Generator.png'
  },
  {
    id: 'analizador-web',
    name: 'Analizador Web - Evaluación de Sitios',
    description: 'Sistema que analiza y evalúa sitios web automáticamente',
    importance: 'medium',
    nodeTypes: [
      { name: 'Form', icon: '📋', color: '#4285F4' },
      { name: 'HTTP Request', icon: '🌐', color: '#FF6B35' },
      { name: 'AI Analyzer', icon: '🤖', color: '#10A37F' },
      { name: 'Email', icon: '✉️', color: '#EA4335' },
    ],
    documentation: 'Automatización que analiza sitios web introducidos por el usuario y genera un reporte con métricas y recomendaciones.',
    howItWorks: '1. Usuario ingresa URL 2. Sistema analiza sitio 3. IA genera evaluación 4. Envía reporte por email',
    features: ['Análisis de sitios', 'Métricas automáticas', 'Recomendaciones IA', 'Reporte por email'],
    useCases: ['Auditoría web', 'Análisis de competencia', 'Mejora de sitios'],
    tools: ['n8n', 'HTTP Request', 'OpenAI', 'Gmail'],
    image: '/images/Fotos_Jsons/Analizador_WEB.png'
  },
  {
    id: 'agente-voz-recepcionista',
    name: 'Agente Voz Recepcionista - Barbería',
    description: 'Agente de voz para gestión de citas de barbería con verificación de disponibilidad',
    importance: 'high',
    nodeTypes: [
      { name: 'Webhook', icon: '🔗', color: '#FF6B35' },
      { name: 'AI Agent', icon: '🤖', color: '#10A37F' },
      { name: 'Google Calendar', icon: '📅', color: '#4285F4' },
      { name: 'Google Sheets', icon: '📊', color: '#34A853' },
    ],
    documentation: 'Agente de voz para Barbería King que gestiona citas telefónicas. Procesa datos de cliente, verifica disponibilidad en calendario y agenda o rechaza según ocupación.',
    howItWorks: '1. Webhook recibe datos de cita 2. IA verifica disponibilidad en calendario 3. Si está libre, agenda y guarda en Sheets 4. Responde con confirmación o rechazo',
    features: ['Verificación de disponibilidad', 'Gestión de citas', 'Guardado en base de datos', 'Confirmación automática'],
    useCases: ['Gestión de citas', 'Reservas automaticas', 'Atención 24/7'],
    tools: ['n8n', 'Google Calendar', 'Google Sheets', 'OpenAI', 'Webhook'],
    image: '/images/Fotos_Jsons/agente_voz_recepcionista.png'
  },
  {
    id: 'voice-agent-agendas',
    name: 'Voice Agent - Agente de Citas',
    description: 'Agente de voz para agendar reuniones y gestionar horarios',
    importance: 'high',
    nodeTypes: [
      { name: 'Webhook', icon: '🔗', color: '#FF6B35' },
      { name: 'Google Sheets', icon: '📊', color: '#34A853' },
      { name: 'AI Agent', icon: '🤖', color: '#10A37F' },
      { name: 'Google Calendar', icon: '📅', color: '#4285F4' },
    ],
    documentation: 'Sistema de voz para agendar reuniones. Recibe datos por webhook, guarda en Sheets, verifica disponibilidad y crea evento en calendario.',
    howItWorks: '1. Webhook recibe datos de reunión 2. Guarda en Google Sheets 3. IA verifica disponibilidad 4. Crea evento en calendario 5. Confirma al usuario',
    features: ['Gestión de reuniones', 'Verificación de calendario', 'Guardado automático', 'Confirmación por email'],
    useCases: ['Agendamiento de reuniones', 'Gestión de eventos', 'Coordinación de horarios'],
    tools: ['n8n', 'Webhook', 'Google Sheets', 'Google Calendar', 'Google Gemini'],
    image: '/images/Fotos_Jsons/Voice_Agent.png'
  },
  {
    id: 'leads-google-maps',
    name: 'Consigue Leads Ilimitados Google Maps',
    description: 'Sistema de extracción de leads desde Google Maps',
    importance: 'critical',
    nodeTypes: [
      { name: 'Form', icon: '📋', color: '#4285F4' },
      { name: 'HTTP Request', icon: '🌐', color: '#FF6B35' },
      { name: 'Scraper', icon: '🕷️', color: '#10A37F' },
      { name: 'Output', icon: '📤', color: '#EA4335' },
    ],
    documentation: 'Automatización que extrae leads ilimitados de Google Maps según tipo de negocio y ubicación especificados por el usuario.',
    howItWorks: '1. Usuario especifica tipo de negocio y ubicación 2. Sistema scrapea Google Maps 3. Extrae datos de contacto 4. Entrega lista de leads',
    features: ['Extracción masiva', 'Datos de contacto', 'Filtrado por ubicación', 'Exportación de datos'],
    useCases: ['Generación de leads', 'Prospección B2B', 'Investigación de mercado'],
    tools: ['n8n', 'HTTP Request', 'Web Scraper', 'Form Trigger'],
    image: '/images/Fotos_Jsons/Consigue_Leads_Ilimitados_GoogleMaps.png'
  },
  {
    id: 'captador-leads-apify',
    name: 'Nuevo Captador Leads Apify',
    description: 'Sistema de captura de leads usando Apify para scraping avanzado',
    importance: 'critical',
    nodeTypes: [
      { name: 'Form', icon: '📋', color: '#4285F4' },
      { name: 'Apify', icon: '🚀', color: '#FF6B35' },
      { name: 'Parser', icon: '📄', color: '#10A37F' },
      { name: 'Output', icon: '📤', color: '#EA4335' },
    ],
    documentation: 'Captador de leads usando Apify para obtener información detallada de negocios según ubicación y categoría.',
    howItWorks: '1. Usuario indica ubicación y tipo de negocio 2. Apify scrapea directorios 3. Extrae datos detallada 4. Entrega información de leads',
    features: ['Scraping avanzado', 'Datos enriquecidos', 'Múltiples fuentes', 'Información de contacto'],
    useCases: ['Lead generation', 'Prospección comercial', 'Data enrichment'],
    tools: ['n8n', 'Apify', 'Form Trigger', 'Parser'],
    image: '/images/Fotos_Jsons/Nuevo_Captador_Leads_Apify.png'
  },
  {
    id: 'nano-banana-gemini-v3',
    name: 'Nano Banana/Gemini - Generador de Videos IA',
    description: 'Sistema de generación de videos con IA usando Nano Banana y Google Gemini',
    importance: 'high',
    nodeTypes: [
      { name: 'Form', icon: '📋', color: '#4285F4' },
      { name: 'Google Gemini', icon: '💎', color: '#FF6B35' },
      { name: 'Nano Banana', icon: '🎬', color: '#10A37F' },
      { name: 'Storage', icon: '☁️', color: '#EA4335' },
    ],
    documentation: 'Generador automático de videos usando IA. Los usuarios envían imágenes y descripciones, el sistema las procesa con Gemini y genera videos profesionales con Nano Banana.',
    howItWorks: '1. Usuario completa formulario con imagen y descripción 2. Gemini procesa la descripción 3. Nano Banana genera el video 4. Se almacena y entrega',
    features: ['Generación de videos con IA', 'Múltiples estilos', 'Procesamiento de imágenes', 'Almacenamiento automático'],
    useCases: ['Generación de contenido video', 'Marketing visual', 'Social media content', 'Publicidad automatizada'],
    tools: ['Nano Banana API', 'Google Gemini', 'Node.js', 'Google Drive'],
    image: '/images/Fotos_Jsons/Veo_3_+_Nano_Banana.png'
  }
]

export const getWorkflowById = (id: string) => workflows.find(w => w.id === id)
