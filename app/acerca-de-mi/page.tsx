import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Portafolio3D } from '@/components/portafolio-3d'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Sobre Mí | Jesús Miguel Arritola - Automatización & IA',
  description: 'Certificaciones internacionales, experiencia profesional y proyectos destacados en automatización empresarial e inteligencia artificial.',
  keywords: ['Jesús Miguel Arritola', 'automatización', 'IA', 'n8n', 'desarrollador', 'CV', 'curriculum'],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Sobre Mí | Jesús Miguel Arritola',
    description: 'Certificaciones y experiencia en automatización e IA',
    type: 'website',
    locale: 'es_ES',
  },
}

export default function AcercaDeMiPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Portafolio3D />
      <Footer />
    </main>
  )
}