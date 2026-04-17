import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { NavbarProvider } from '@/components/navbar-context'
import { ClientLayout } from '@/components/client-layout'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'LeadAIMind | Automatización Inteligente para Empresas',
  description: 'Soluciones profesionales de automatización empresarial. Reducción del 80% en tareas manuales, bots inteligentes, reportes automáticos e integración de sistemas con n8n e IA.',
  keywords: [
    'automatización empresarial',
    'n8n',
    'automatización de procesos',
    'bots inteligentes',
    'integración de APIs',
    'reportes automáticos',
    'soluciones n8n',
    'IA para negocios',
    'automatización con IA'
  ],
  metadataBase: new URL('https://leadaimind.com'),
  alternates: {
    canonical: 'https://leadaimind.com',
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'LeadAIMind | Automatización Empresarial Profesional',
    description: 'Soluciones inteligentes de automatización que optimizan procesos empresariales y liberan tiempo de tu equipo.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://leadaimind.com',
    siteName: 'LeadAIMind',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeadAIMind | Automatización Inteligente',
    description: 'Automatización profesional de procesos empresariales con n8n e IA',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0c1324',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-[#0c1324] text-[#dce1fb]">
        <NavbarProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </NavbarProvider>
      </body>
    </html>
  )
}