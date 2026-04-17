'use client'

import { Award, Shield, Zap, CheckCircle2 } from "lucide-react"

const reasons = [
  {
    icon: Award,
    title: "Expertos en n8n",
    description: "Más de 500 horas de experiencia en automatización con n8n. Sabemos cómo hacer que tus procesos fluyan sin fricción.",
  },
  {
    icon: Shield,
    title: "Garantía de Funcionamiento",
    description: "Si tu automatización no funciona como promise, te devolvemos el 100% en 7 días. Sin preguntas.",
  },
  {
    icon: Zap,
    title: "Soporte Incluido",
    description: "30 días de soporte gratuito post-entrega. Estamos aquí para resolver cualquier duda.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#0c1324]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#00FFC2] sm:text-sm">
            ¿Por qué LeadAIMind?
          </p>
          <h2 className="font-display text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            La automatización que funciona
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[#dce1fb]/70 sm:mt-6 sm:text-lg">
            Trabajamos con dedicación para entender tu negocio y resolver tus problemas reales.
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group relative overflow-hidden rounded-xl border border-[#3a4a43]/20 bg-[#151b2d] p-6 sm:p-8 transition-all duration-300 hover:border-[#00FFC2]/30 hover:bg-[#151b2d]/80"
            >
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#00FFC2]/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#00FFC2]/10 transition-colors group-hover:bg-[#00FFC2]/20 sm:mb-6">
                  <reason.icon className="h-6 w-6 text-[#00FFC2]" />
                </div>

                <h3 className="font-display mb-3 text-lg font-bold text-white sm:mb-4 sm:text-xl">
                  {reason.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#dce1fb]/70 sm:text-base">
                  {reason.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#00FFC2] to-[#00e1ab] transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          <div className="flex items-center gap-2 text-sm text-[#dce1fb]/60">
            <CheckCircle2 className="h-4 w-4 text-[#00FFC2]" />
            <span>100% satisfacción garantizada</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#dce1fb]/60">
            <CheckCircle2 className="h-4 w-4 text-[#00FFC2]" />
            <span>Especialista dedicado en n8n</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#dce1fb]/60">
            <CheckCircle2 className="h-4 w-4 text-[#00FFC2]" />
            <span>Soporte post-entrega</span>
          </div>
        </div>
      </div>
    </section>
  )
}