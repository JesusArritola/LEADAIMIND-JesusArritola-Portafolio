import { Search, Workflow, Rocket, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Diagnóstico",
    description:
      "Analizamos tus procesos actuales e identificamos las tareas repetitivas que consumen más tiempo y recursos de tu equipo.",
  },
  {
    icon: Workflow,
    number: "02",
    title: "Diseño y Desarrollo",
    description:
      "Creamos flujos automatizados con n8n personalizados para tu negocio. Cada solución se adapta a tus herramientas existentes.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Implementación y Soporte",
    description:
      "Desplegamos la automatización, te capacitamos y te brindamos soporte continuo para asegurar que todo funcione perfecto.",
  },
]

export function Process() {
  return (
    <section id="proceso" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#00FFC2] sm:text-sm">
            Proceso
          </p>
          <h2 className="font-display text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            3 pasos hacia la automatización
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[#dce1fb]/70 sm:mt-6 sm:text-lg">
            Un proceso simple y transparente para transformar tu negocio.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Connector line (desktop) */}
          <div className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-[#3a4a43]/20 md:block" />

          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Step number + icon */}
              <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-[#151b2d] border border-[#3a4a43]/20 sm:mb-6 sm:h-16 sm:w-16">
                <step.icon className="h-6 w-6 text-[#00FFC2] sm:h-7 sm:w-7" />
              </div>

              {/* Arrow between steps (desktop) */}
              {index < steps.length - 1 && (
                <div className="absolute right-[-20%] top-8 z-20 hidden -translate-y-1/2 md:block">
                  <ArrowRight className="h-5 w-5 text-[#00FFC2]/40" />
                </div>
              )}

              <span className="mb-2 text-xs font-bold uppercase tracking-widest text-[#00FFC2]">
                Paso {step.number}
              </span>
              <h3 className="font-display mb-3 text-lg font-bold text-white sm:mb-4 sm:text-xl">
                {step.title}
              </h3>
              <p className="max-w-xs text-sm leading-relaxed text-[#dce1fb]/70 sm:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}