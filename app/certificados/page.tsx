import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { CertificatesPage } from '@/components/certificates-page'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Certificados | Jesús Miguel Arritola',
  description: 'Certificaciones y cursos completados en automatización, IA, ciberseguridad y desarrollo.',
  robots: { index: true, follow: true },
}

export default function CertificadosPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <CertificatesPage />
      <Footer />
    </main>
  )
}