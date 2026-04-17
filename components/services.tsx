import { Bot, BarChart3, Link2, Bell } from "lucide-react"

const services = [
  {
    icon: Bot,
    title: "Bot de Atención al Cliente",
    description:
      "Responde automáticamente preguntas frecuentes, toma pedidos y escala a humanos solo cuando es necesario. Disponible 24/7 en Telegram o tu web.",
    features: ["Respuestas inteligentes", "Toma de pedidos", "Escalado a humano"],
  },
  {
    icon: BarChart3,
    title: "Reportes Automáticos",
    description:
      "Envía reportes de ventas, inventario o métricas clave por email o Telegram en horarios programados. Sin tocar un botón.",
    features: ["Ventas diarias", "Stock bajo", "Métricas clave"],
  },
  {
    icon: Link2,
    title: "Integración de Sistemas",
    description:
      "Conecta Excel, Google Forms, Telegram y otras herramientas para que trabajen en conjunto automáticamente sin intervención manual.",
    features: ["Excel + Telegram", "Forms + BD", "APIs externas"],
  },
  {
    icon: Bell,
    title: "Flujos de Notificación",
    description:
      "Alertas automáticas cuando ocurren eventos importantes: stock bajo, pago recibido, nueva solicitud, pedido completado y más.",
    features: ["Stock bajo", "Pagos recibidos", "Nuevas solicitudes"],
  },
]

export function Services() {
  return (
    <section id="servicios" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#00FFC2] sm:text-sm">
            Servicios
          </p>
          <h2 className="font-display text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            {"¿Qué podemos automatizar para ti?"}
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[#dce1fb]/70 sm:mt-6 sm:text-lg">
            Cada solución se adapta a tu negocio. Sin plantillas genéricas.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-lg elevation-low p-6 sm:p-8 transition-all duration-300 hover:border-[#00FFC2]/20 hover:bg-[#151b2d]/80"
            >
              {/* Glow on hover */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#00FFC2]/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#2e3447] transition-colors group-hover:bg-[#00FFC2]/10 sm:mb-6 sm:h-14 sm:w-14">
                  <service.icon className="h-5 w-5 text-[#00FFC2] sm:h-6 sm:w-6" />
                </div>

                <h3 className="font-display mb-3 text-lg font-bold text-white sm:mb-4 sm:text-xl">
                  {service.title}
                </h3>

                <p className="mb-5 text-sm leading-relaxed text-[#dce1fb]/70 sm:mb-6 sm:text-base">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded text-xs font-medium text-[#dce1fb]/70 bg-[#2e3447] px-3 py-1"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}