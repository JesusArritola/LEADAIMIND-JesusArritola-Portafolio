import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { TrabajosActuales } from '@/components/trabajos-actuales'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Proyectos & Automatizaciones | Jesús Miguel Arritola',
  description: 'Explora más de 50 flujos de automatización profesionales desarrollados con n8n, APIs avanzadas e inteligencia artificial. Transformación digital para tu negocio.',
  keywords: ['automatizaciones', 'n8n', 'workflows', 'IA', 'inteligencia artificial', 'proyectos', 'automatización de procesos', 'APIs'],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Proyectos & Automatizaciones | Jesús Miguel Arritola',
    description: 'Más de 50 flujos de automatización profesionales con n8n, APIs e IA',
    type: 'website',
    locale: 'es_ES',
    siteName: 'Jesús Miguel Arritola - Automatizaciones & IA',
  },
}

export default function ProyectosPage() {
  return (
    <main className="pt-16">
      <Navbar />
      
      {/* Hero section for proyectos */}
      <section className="relative flex flex-col py-20 sm:pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00FFC2]/5 blur-[100px] sm:h-[600px] sm:w-[600px] sm:blur-[120px]" />
        </div>

        <div className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6">

          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="font-display text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Proyectos & Automatizaciones
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#dce1fb]/70 sm:text-lg">
              Flujos de automatización profesionales y soluciones inteligentes desarrolladas con n8n, APIs avanzadas e inteligencia artificial.
            </p>
          </div>

          {/* Proyectos component */}
          <TrabajosActuales />
        </div>
      </section>

      <Footer />
    </main>
  )
}