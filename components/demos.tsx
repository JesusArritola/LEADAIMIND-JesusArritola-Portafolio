import { MessageSquare, BarChart3, FileText } from "lucide-react"
import { WorkflowDiagram } from "@/components/workflow-diagram"

const demos = [
  {
    icon: MessageSquare,
    title: "Bot para Restaurante",
    description:
      "Toma pedidos automáticamente, confirma disponibilidad y envía el total al dueño. Reduce 80% del tiempo de atención.",
    chat: [
      { role: "client" as const, text: "Quiero una pizza grande" },
      { role: "bot" as const, text: "Perfecto, pizza grande. ¿De qué ingredientes?" },
      { role: "client" as const, text: "Pepperoni" },
      { role: "bot" as const, text: "Pizza grande de pepperoni. ¿Para recoger o delivery?" },
      { role: "client" as const, text: "Delivery" },
      { role: "bot" as const, text: "Pedido confirmado #1234. Total: $15. Tiempo estimado: 30 min." },
    ],
    workflow: "bot" as const,
  },
  {
    icon: BarChart3,
    title: "Reportes de Ventas Automáticos",
    description:
      "Cada lunes 8 AM, el gerente recibe automáticamente un resumen de la semana con gráficos y alertas de stock.",
    chat: [
      { role: "bot" as const, text: "Reporte semanal - Restaurante El Buen Sabor" },
      { role: "bot" as const, text: "Ventas totales: $12,450 (+15% vs semana anterior)" },
      { role: "bot" as const, text: "Top 3: Pizza Pepperoni, Hamburguesa Clásica, Ensalada Caesar" },
      { role: "bot" as const, text: "ALERTA: Stock bajo en queso mozzarella (2 días)" },
      { role: "bot" as const, text: "Próximo reporte: Lunes 8:00 AM" },
    ],
    workflow: "report" as const,
  },
  {
    icon: FileText,
    title: "Formulario Inteligente",
    description:
      "Formulario de contacto que guarda en base de datos, notifica al dueño al instante y responde al cliente confirmando recepción.",
    chat: [
      { role: "client" as const, text: "Formulario enviado: Juan Garcia - Restaurante" },
      { role: "bot" as const, text: "Datos guardados en base de datos" },
      { role: "bot" as const, text: "Notificación enviada al equipo de ventas" },
      { role: "bot" as const, text: "Email de confirmación enviado a Juan Garcia" },
      { role: "bot" as const, text: "Lead asignado a Carlos (vendedor disponible)" },
    ],
    workflow: "form" as const,
  },
]

export function Demos() {
  return (
    <section id="demos" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#00FFC2] sm:text-sm">
            Demos
          </p>
          <h2 className="font-display text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Mira cómo funciona en la práctica
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[#dce1fb]/70 sm:mt-6 sm:text-lg">
            Estos son ejemplos de flujos automatizados de procesos reales.
          </p>
        </div>

        {/* Demos */}
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
          {demos.map((demo, index) => (
            <div
              key={demo.title}
              className={`flex flex-col gap-8 lg:flex-row lg:items-start ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Chat simulation */}
              <div className="w-full lg:w-1/2">
                <div className="overflow-hidden rounded-xl border border-[#3a4a43]/20 bg-[#151b2d]">
                  {/* Chat header */}
                  <div className="flex items-center gap-3 border-b border-[#3a4a43]/20 bg-[#2e3447]/40 px-4 py-3 sm:px-6 sm:py-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00FFC2]/10 sm:h-10 sm:w-10">
                      <demo.icon className="h-4 w-4 text-[#00FFC2] sm:h-5 sm:w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{demo.title}</p>
                      <p className="text-xs text-[#dce1fb]/60">Flujo automatizado</p>
                    </div>
                    <span className="ml-auto flex shrink-0 items-center gap-1.5 text-xs text-[#00FFC2]">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#00FFC2]" />
                      Activo
                    </span>
                  </div>
                  {/* Messages */}
                  <div className="flex flex-col gap-2.5 p-4 sm:gap-3 sm:p-6">
                    {demo.chat.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.role === "client" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed sm:px-4 sm:py-2.5 ${
                            msg.role === "client"
                              ? "bg-[#00FFC2] text-[#003828]"
                              : "bg-[#2e3447] text-[#dce1fb]/90"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description + Workflow */}
              <div className="flex w-full flex-col lg:w-1/2">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#00FFC2]/10">
                  <demo.icon className="h-6 w-6 text-[#00FFC2]" />
                </div>
                <h3 className="font-display mt-5 text-xl font-bold text-white sm:text-2xl">
                  {demo.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#dce1fb]/70 sm:text-lg">
                  {demo.description}
                </p>
                <div className="mt-6 w-full">
                  <WorkflowDiagram variant={demo.workflow} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}