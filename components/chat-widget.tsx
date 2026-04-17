"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { MessageCircle, Send, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessage: Message[] = [
  {
    id: "initial",
    text: "Estrategia con Inteligencia\nResultados con Precisión.\n\nMindSupport a tu servicio. ¿En qué podemos ayudarte?",
    sender: "bot",
    timestamp: new Date(),
  },
]

export function ChatWidget() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageBufferRef = useRef<string[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
      setMessages(initialMessage)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const chatContainer = document.getElementById("chat-widget-container")
      const chatButton = document.getElementById("chat-widget-button")
      if (
        chatContainer && 
        !chatContainer.contains(e.target as Node) &&
        (!chatButton || !chatButton.contains(e.target as Node))
      ) {
        setIsOpen(false)
      }
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }

    document.addEventListener("keydown", handleEsc)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const sendBufferedMessages = async () => {
    if (messageBufferRef.current.length === 0) return

    const concatenatedMessage = messageBufferRef.current.join("\n")
    messageBufferRef.current = []

    const userMessage: Message = {
      id: Date.now().toString(),
      text: concatenatedMessage,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const res = await fetch(
        "https://dipus.app.n8n.cloud/webhook/ec4e2a8e-d90d-4aa2-9bb3-bda78a3549f9",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json, text/plain, */*"
          },
          body: JSON.stringify({
            message: concatenatedMessage,
            timestamp: new Date().toISOString(),
          }),
        }
      )

      let botText = "Gracias por tu mensaje. Te responderemos pronto."

      const contentType = res.headers.get("content-type") || ""

      if (contentType.includes("application/json")) {
        try {
          const data = await res.json()
          const payload = Array.isArray(data) ? data[0] : data

          if (typeof payload === "string") {
            botText = payload
          } else if (payload && typeof payload === "object") {
            const possibleFields = [
              "output", "response", "message", "text", "reply",
              "answer", "content", "data", "result", "body", "msg", "respuesta", "mensaje",
            ]

            for (const field of possibleFields) {
              if (payload[field] && typeof payload[field] === "string") {
                botText = payload[field]
                break
              }
            }

            if (botText === "Gracias por tu mensaje. Te responderemos pronto.") {
              const firstString = Object.values(payload).find(
                (v): v is string => typeof v === "string" && v.length > 0
              )
              if (firstString) {
                botText = firstString
              } else {
                botText = JSON.stringify(payload, null, 2)
              }
            }
          }
        } catch {
          const text = await res.text()
          if (text.trim()) botText = text.trim()
        }
      } else {
        const text = await res.text()
        if (text.trim()) botText = text.trim()
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botText,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])

      if (!isOpen) setHasUnread(true)
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "Disculpa, hubo un error de conexión.\n\nPor favor intenta más tarde o contáctanos por WhatsApp.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    messageBufferRef.current.push(input.trim())
    setInput("")

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      sendBufferedMessages()
    }, 8000)
  }

  if (!isLoaded) {
    return (
      <button
        id="chat-widget-button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#3a4a43]/20 bg-[#00FFC2] shadow-lg transition-all hover:bg-[#00FFC2]/90 hover:shadow-xl active:scale-95 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
        aria-label="Abrir chat"
      >
        <MessageCircle className="h-5 w-5 text-[#003828] sm:h-6 sm:w-6" />
      </button>
    )
  }

  return (
    <>
      <button
        id="chat-widget-button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#3a4a43]/20 bg-[#00FFC2] shadow-lg transition-all hover:bg-[#00FFC2]/90 hover:shadow-xl active:scale-95 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? (
          <X className="h-5 w-5 text-[#003828] sm:h-6 sm:w-6" />
        ) : (
          <>
            <MessageCircle className="h-5 w-5 text-[#003828] sm:h-6 sm:w-6" />
            {(hasUnread || messages.length > 1) && !isOpen && (
              <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 rounded-full bg-red-500 ring-2 ring-[#0c1324] sm:h-3.5 sm:w-3.5" />
            )}
          </>
        )}
      </button>

      {isOpen && (
        <div id="chat-widget-container" className="fixed bottom-20 right-2 z-50 flex max-h-[80vh] w-[calc(100vw-1rem)] flex-col rounded-2xl border border-[#3a4a43]/20 bg-[#151b2d]/95 shadow-2xl backdrop-blur-sm sm:bottom-24 sm:right-6 sm:w-[380px] sm:max-h-[600px]">
          <div className="flex items-center gap-3 border-b border-[#3a4a43]/15 bg-gradient-to-r from-[#151b2d] to-[#151b2d]/80 p-3 sm:p-4 rounded-t-2xl">
            <Image
              src="/images/logo-leadaimind.png"
              alt="MindSupport"
              width={40}
              height={40}
              className="h-8 w-auto rounded-lg sm:h-10"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white sm:text-base">MindSupport</p>
              <p className="text-xs text-[#dce1fb]/70">Usualmente responde en minutos</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#dce1fb]/70 transition-colors hover:bg-[#2e3447] hover:text-white"
              aria-label="Cerrar chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto overscroll-contain p-3 sm:p-4 custom-scrollbar-chat" style={{ minHeight: "250px", maxHeight: "400px" }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm sm:px-4 sm:py-2.5 ${msg.sender === "user" ? "bg-[#00FFC2] text-[#003828]" : "border border-[#3a4a43]/20 bg-[#0c1324]/50 text-white"}`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  <p className={`mt-1 text-[10px] sm:text-xs ${msg.sender === "user" ? "text-[#003828]/70" : "text-[#dce1fb]/70"}`}>
                    {msg.timestamp.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-xl border border-[#3a4a43]/20 bg-[#0c1324]/50 px-3 py-2 sm:px-4">
                  <Loader2 className="h-4 w-4 animate-spin text-[#00FFC2]" />
                  <p className="text-xs text-[#dce1fb]/70 sm:text-sm">MindSupport está escribiendo...</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messageBufferRef.current.length > 0 && !isLoading && (
            <div className="border-t border-[#3a4a43]/15 px-3 py-2 text-center text-xs text-[#dce1fb]/70 sm:px-4">
              Mensaje en cola... enviando en breve
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-[#3a4a43]/15 bg-[#0c1324]/50 p-3 sm:p-4 rounded-b-2xl">
            <Input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-[#0c1324]/50 border-[#3a4a43]/20 text-sm text-white placeholder:text-[#dce1fb]/70"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="h-10 w-10 shrink-0 bg-[#00FFC2] text-[#003828] hover:bg-[#00FFC2]/90">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  )
}