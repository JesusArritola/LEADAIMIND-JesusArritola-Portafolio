'use client'

import { useState } from "react"
import { ArrowRight, Bot, BarChart3, Link2, Sparkles } from "lucide-react"
import { LeadMagnet } from "./lead-magnet"

export function Hero() {
  const [showLeadMagnet, setShowLeadMagnet] = useState(false)

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 sm:pt-24">
      {/* Grid Texture Background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-texture" />
      
      {/* Ambient Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-[#00FFC2]/5 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 text-center sm:px-8 sm:py-24">
        {/* Badge */}
        <div className="animate-fade-in-up mx-auto mb-10 inline-flex items-center gap-2 rounded-full border border-[#3a4a43]/20 bg-[#151b2d]/60 px-5 py-2.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#00FFC2]" />
          <span className="text-xs font-medium uppercase tracking-wider text-[#00FFC2]">
            Automatización inteligente
          </span>
        </div>

        {/* Headline - Space Grotesk */}
        <h1 className="animate-fade-in-up animation-delay-200 font-display text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Automatización Empresarial con{" "}
          <span className="text-[#00FFC2] animate-neon-pulse">LeadAIMind</span>
        </h1>

        {/* Subheadline - Inter */}
        <p className="animate-fade-in-up animation-delay-400 mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#dce1fb]/70 sm:mt-8 sm:text-lg md:text-xl">
          Reduce hasta 80% tus tareas manuales. Diseñamos flujos automatizados personalizados para tu negocio — desde bots de atención hasta reportes inteligentes.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up animation-delay-600 mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/#contacto"
            className="flex items-center gap-2 rounded-full bg-[#00FFC2] px-6 py-3 text-sm font-bold text-[#003828] transition-all duration-300 hover:bg-[#00e1ab] hover:shadow-[0_0_25px_rgba(0,255,194,0.5)] animate-button-pulse sm:px-8 sm:py-4 sm:text-base"
          >
            <Sparkles className="h-4 w-4" />
            Consulta Gratis
            <ArrowRight className="h-5 w-5" />
          </a>
          <button 
            onClick={() => setShowLeadMagnet(true)}
            className="flex items-center gap-2 rounded-full bg-[#22D3EE] px-6 py-3 text-sm font-bold text-[#083344] transition-all duration-300 hover:bg-[#06B6D4] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] sm:px-8 sm:py-4 sm:text-base"
          >
            Calcular Mi ROI
          </button>
        </div>

        {/* Stats - Kinetic Cards */}
        <div className="animate-fade-in-up animation-delay-800 mt-16 grid grid-cols-1 gap-4 sm:mt-24 sm:grid-cols-3 sm:gap-6">
          <div className="elevation-low rounded-lg p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#2e3447] mb-4">
              <Bot className="h-6 w-6 text-[#00FFC2]" />
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white sm:text-4xl">24/7</p>
              <p className="mt-2 text-sm text-[#dce1fb]/60">Bots activos siempre</p>
            </div>
          </div>
          <div className="elevation-low rounded-lg p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#2e3447] mb-4">
              <BarChart3 className="h-6 w-6 text-[#00FFC2]" />
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white sm:text-4xl">80%</p>
              <p className="mt-2 text-sm text-[#dce1fb]/60">Menos tareas manuales</p>
            </div>
          </div>
          <div className="elevation-low rounded-lg p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#2e3447] mb-4">
              <Link2 className="h-6 w-6 text-[#00FFC2]" />
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white sm:text-4xl">+50</p>
              <p className="mt-2 text-sm text-[#dce1fb]/60">Apps conectadas</p>
            </div>
          </div>
        </div>

        {/* Lead Magnet Modal */}
        {showLeadMagnet && <LeadMagnet onClose={() => setShowLeadMagnet(false)} />}
      </div>
    </section>
  )
}
