"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Send, Mail, CheckCircle, Loader2, AlertCircle, Phone, ChevronDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const timeConsumers = [
  "Atención al cliente",
  "Inventario/stock",
  "Facturación/cobros",
  "Marketing manual",
  "Reportes/análisis",
  "Coordinación de equipo",
]

const countryCodes = [
  { code: "+1", country: "US/CA", flag: "🇺🇸" },
  { code: "+52", country: "MX", flag: "🇲🇽" },
  { code: "+53", country: "CU", flag: "🇨🇺" },
  { code: "+54", country: "AR", flag: "🇦🇷" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+56", country: "CL", flag: "🇨🇱" },
  { code: "+57", country: "CO", flag: "🇨🇴" },
  { code: "+58", country: "VE", flag: "🇻🇪" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+351", country: "PT", flag: "🇵🇹" },
  { code: "+591", country: "BO", flag: "🇧🇴" },
  { code: "+593", country: "EC", flag: "🇪🇨" },
  { code: "+595", country: "PY", flag: "🇵🇾" },
  { code: "+598", country: "UY", flag: "🇺🇾" },
  { code: "+506", country: "CR", flag: "🇨🇷" },
  { code: "+507", country: "PA", flag: "🇵🇦" },
  { code: "+502", country: "GT", flag: "🇬🇹" },
  { code: "+503", country: "SV", flag: "🇸🇻" },
  { code: "+504", country: "HN", flag: "🇭🇳" },
  { code: "+505", country: "NI", flag: "🇳🇮" },
  { code: "+51", country: "PE", flag: "🇵🇪" },
  { code: "+1809", country: "DO", flag: "🇩🇴" },
  { code: "+1787", country: "PR", flag: "🇵🇷" },
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedProblems, setSelectedProblems] = useState<string[]>([])
  const [showOtherField, setShowOtherField] = useState(false)
  const [otherProblem, setOtherProblem] = useState("")
  const [countryCode, setCountryCode] = useState("+53")
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)

  useEffect(() => {
    if (!showCountryDropdown) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.country-dropdown-container')) {
        setShowCountryDropdown(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showCountryDropdown])

  function toggleProblem(problem: string) {
    setSelectedProblems((prev) =>
      prev.includes(problem)
        ? prev.filter((p) => p !== problem)
        : [...prev, problem]
    )
  }

  function toggleOther() {
    setShowOtherField((prev) => !prev)
    if (showOtherField) setOtherProblem("")
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const phone = formData.get("phone") as string

    // Validate phone (only digits after country code)
    const phoneDigits = phone.replace(/\D/g, "")
    if (phoneDigits.length < 6 || phoneDigits.length > 15) {
      setError("Introduce un número de teléfono válido.")
      setLoading(false)
      return
    }

    const allProblems = [...selectedProblems]
    if (showOtherField && otherProblem.trim()) {
      allProblems.push(`Otro: ${otherProblem.trim()}`)
    }

    if (allProblems.length === 0) {
      setError("Selecciona al menos una opción en la pregunta de tiempo.")
      setLoading(false)
      return
    }

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: `${countryCode} ${phone}`,
      business: formData.get("business") as string,
      timeConsumers: allProblems.join(", "),
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const result = await res.json()
        throw new Error(result.error || "Error al enviar")
      }

      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo enviar. Intenta por Telegram."
      )
    } finally {
      setLoading(false)
    }
  }

  const selectedCountry = countryCodes.find((c) => c.code === countryCode)

  return (
    <section id="contacto" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="overflow-hidden rounded-2xl border border-[#3a4a43]/20 bg-[#151b2d]/80 backdrop-blur-sm sm:rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left - Info */}
            <div className="flex flex-col justify-center bg-[#2e3447]/30 p-6 sm:p-8 lg:p-12">
              <div className="mb-6 sm:mb-8">
                <Image
                  src="/images/logo-leadaimind.png"
                  alt="LeadAIMind"
                  width={200}
                  height={50}
                  className="h-10 w-auto rounded-xl sm:h-12"
                />
              </div>
              <p className="mb-2 text-sm font-semibold text-[#00FFC2] sm:mb-4 sm:text-base">
                Estrategia con Inteligencia
              </p>
              <p className="mb-6 text-sm font-semibold text-[#00FFC2] sm:mb-8 sm:text-base">
                Resultados con Precisión
              </p>
              <p className="text-pretty text-base leading-relaxed text-[#dce1fb]/70 sm:text-lg">
                Cuéntanos qué proceso quieres automatizar y te enviamos una
                propuesta personalizada sin compromiso.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:gap-4">
                <a
                  href="https://wa.me/5356686432"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-[#3a4a43]/20 bg-[#151b2d]/50 p-3 transition-colors hover:border-[#00FFC2]/30"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#00FFC2]/10 sm:h-10 sm:w-10">
                    <Phone className="h-4 w-4 text-[#00FFC2] sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">WhatsApp</p>
                    <p className="truncate text-xs text-[#dce1fb]/60">+53 56686432</p>
                  </div>
                </a>

                <a
                  href="https://t.me/Jesusarritola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-[#3a4a43]/20 bg-[#151b2d]/50 p-3 transition-colors hover:border-[#00FFC2]/30"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#00FFC2]/10 sm:h-10 sm:w-10">
                    <Send className="h-4 w-4 text-[#00FFC2] sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">Telegram</p>
                    <p className="truncate text-xs text-[#dce1fb]/60">@Jesusarritola</p>
                  </div>
                </a>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=jesusmiguela546@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-[#3a4a43]/20 bg-[#151b2d]/50 p-3 transition-colors hover:border-[#00FFC2]/30"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#00FFC2]/10 sm:h-10 sm:w-10">
                    <Mail className="h-4 w-4 text-[#00FFC2] sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">Email</p>
                    <p className="truncate text-xs text-[#dce1fb]/60">jesusmiguela546@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right - Form */}
            <div className="p-6 sm:p-8 lg:p-12">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00FFC2]/10 sm:h-16 sm:w-16">
                    <CheckCircle className="h-7 w-7 text-[#00FFC2] sm:h-8 sm:w-8" />
                  </div>
                  <h3 className="font-display mt-5 text-xl font-bold text-white sm:mt-6 sm:text-2xl">
                    Mensaje enviado
                  </h3>
                  <p className="mt-2 text-sm text-[#dce1fb]/70 sm:mt-3 sm:text-base">
                    Te responderemos en menos de 24 horas con una propuesta
                    personalizada.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-5 border-[#3a4a43]/20 text-white sm:mt-6"
                    onClick={() => setSubmitted(false)}
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                      Consulta gratuita
                    </h3>
                    <p className="mt-1 text-xs text-[#dce1fb]/70 sm:text-sm">
                      Todos los campos son obligatorios.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name" className="text-sm text-white">
                        Nombre <span className="text-[#00FFC2]">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        required
                        placeholder="Tu nombre"
                        className="border-[#3a4a43]/20 bg-[#151b2d]/50 text-white placeholder:text-[#dce1fb]/70"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="business" className="text-sm text-white">
                        Tipo de negocio <span className="text-[#00FFC2]">*</span>
                      </Label>
                      <Input
                        id="business"
                        name="business"
                        autoComplete="organization"
                        required
                        placeholder="Restaurante, tienda..."
                        className="border-[#3a4a43]/20 bg-[#151b2d]/50 text-white placeholder:text-[#dce1fb]/70"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email" className="text-sm text-white">
                        Email <span className="text-[#00FFC2]">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="correo@ejemplo.com"
                        className="border-[#3a4a43]/20 bg-[#151b2d]/50 text-white placeholder:text-[#dce1fb]/70"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="phone" className="text-sm text-white">
                        Teléfono <span className="text-[#00FFC2]">*</span>
                      </Label>
                      <div className="flex gap-2">
                        {/* Country Code Dropdown */}
                        <div className="relative country-dropdown-container">
                          <button
                            type="button"
                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                            className="flex h-10 items-center gap-1 rounded-md border border-[#3a4a43]/20 bg-[#151b2d]/50 px-2 text-sm text-white transition-colors hover:bg-[#151b2d] sm:px-3"
                          >
                            <span className="text-base">{selectedCountry?.flag}</span>
                            <span className="hidden sm:inline">{countryCode}</span>
                            <ChevronDown className="h-3 w-3 text-[#dce1fb]/70" />
                          </button>
                          
                          {showCountryDropdown && (
                            <div className="absolute left-0 top-full z-50 mt-1 max-h-48 w-32 overflow-y-auto rounded-md border border-[#3a4a43]/20 bg-[#151b2d] shadow-lg sm:w-40 custom-scrollbar">
                              {countryCodes.map((c) => (
                                <button
                                  key={c.code}
                                  type="button"
                                  onClick={() => {
                                    setCountryCode(c.code)
                                    setShowCountryDropdown(false)
                                  }}
                                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-[#151b2d] ${
                                    countryCode === c.code ? "bg-primary/10 text-[#00FFC2]" : "text-white"
                                  }`}
                                >
                                  <span>{c.flag}</span>
                                  <span>{c.code}</span>
                                  <span className="text-xs text-[#dce1fb]/70">{c.country}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          required
                          placeholder="56686432"
                          pattern="[0-9]{6,15}"
                          title="Introduce entre 6 y 15 dígitos"
                          className="flex-1 border-[#3a4a43]/20 bg-[#151b2d]/50 text-white placeholder:text-[#dce1fb]/70"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Multi-select checkbox question */}
                  <div className="flex flex-col gap-3">
                    <Label className="text-sm text-white">
                      {"¿Qué te consume más tiempo semanalmente?"} <span className="text-[#00FFC2]">*</span>
                    </Label>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {timeConsumers.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleProblem(item)}
                          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-all sm:py-2.5 ${
                            selectedProblems.includes(item)
                              ? "border-[#00FFC2] bg-[#00FFC2]/10 text-white"
                              : "border-[#3a4a43]/20 bg-[#151b2d]/50 text-[#dce1fb]/70 hover:border-[#00FFC2]/30"
                          }`}
                        >
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                              selectedProblems.includes(item)
                                ? "border-[#00FFC2] bg-[#00FFC2] text-[#003828]"
                                : "border-[#dce1fb]/40"
                            }`}
                          >
                            {selectedProblems.includes(item) && (
                              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          <span className="leading-tight">{item}</span>
                        </button>
                      ))}

                      {/* Otro option */}
                      <button
                        type="button"
                        onClick={toggleOther}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-all sm:col-span-2 sm:py-2.5 ${
                          showOtherField
                            ? "border-[#00FFC2] bg-[#00FFC2]/10 text-white"
                            : "border-[#3a4a43]/20 bg-[#151b2d]/50 text-[#dce1fb]/70 hover:border-[#00FFC2]/30"
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                            showOtherField
                              ? "border-[#00FFC2] bg-[#00FFC2] text-[#003828]"
                              : "border-[#dce1fb]/40"
                          }`}
                        >
                          {showOtherField && (
                            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        <span>Otro</span>
                      </button>
                    </div>

                    {showOtherField && (
                      <textarea
                        value={otherProblem}
                        onChange={(e) => setOtherProblem(e.target.value)}
                        rows={2}
                        placeholder="Describe qué otro proceso te consume tiempo..."
                        className="flex w-full rounded-md border border-[#3a4a43]/20 bg-[#151b2d]/50 px-3 py-2 text-sm text-white shadow-sm placeholder:text-[#dce1fb]/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                    )}
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  {/* CTA text */}
                  <p className="text-center text-base font-medium leading-relaxed text-white sm:text-lg">
                    Envíe la consulta y reciba su{" "}
                    <span className="font-bold text-[#00FFC2]">Diagnóstico</span>{" "}
                    <span className="font-bold text-[#00FFC2]">Gratuito</span>{" "}
                    en su correo.
                  </p>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#00FFC2] w-full py-3 text-sm font-bold text-[#003828] transition-all duration-300 hover:bg-[#00e1ab] hover:shadow-[0_0_25px_rgba(0,255,194,0.5)] animate-button-pulse sm:py-4 sm:text-base"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        ENVIAR CONSULTA
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
