import { Metadata } from 'next'
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Demos } from "@/components/demos"
import { Process } from "@/components/process"
import { StatisticsSection } from "@/components/statistics-section"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

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
  openGraph: {
    title: 'LeadAIMind | Automatización Empresarial Profesional',
    description: 'Soluciones inteligentes de automatización que optimizan procesos empresariales y liberan tiempo de tu equipo.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://leadaimind.com',
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

export default function Page() {
  return (
    <main id="main-content">
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <Demos />
      <Process />
      <StatisticsSection />
      <Contact />
      <Footer />
    </main>
  )
}