"use client"

import { useEffect, useRef, useState, lazy, Suspense } from "react"

// Componente principal con carga diferida
export function NeuralBackground() {
  return (
    <Suspense fallback={null}>
      <NeuralBackgroundInner />
    </Suspense>
  )
}

function NeuralBackgroundInner() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    // Delay más largo para asegurar que el contenido principal cargue primero
    const timer = setTimeout(() => {
      setShouldAnimate(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!shouldAnimate || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    let mouseX = 0
    let mouseY = 0
    let isRunning = true

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Particle {
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
      brightness: number

      constructor() {
        this.x = (Math.random() - 0.5) * canvas!.width * 1.8
        this.y = (Math.random() - 0.5) * canvas!.height * 1.8
        this.z = Math.random() * 250
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.vz = (Math.random() - 0.5) * 0.3
        this.size = Math.random() * 2.5 + 1
        this.brightness = Math.random() * 0.5 + 0.5
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.z += this.vz

        const dx = mouseX - canvas!.width / 2
        const dy = mouseY - canvas!.height / 2
        this.x += dx * 0.00008
        this.y += dy * 0.00008

        const boundX = canvas!.width * 0.9
        const boundY = canvas!.height * 0.9
        if (this.x < -boundX || this.x > boundX) this.vx *= -1
        if (this.y < -boundY || this.y > boundY) this.vy *= -1
        if (this.z < 0 || this.z > 250) this.vz *= -1
      }

      getScreenPos() {
        const scale = 250 / (250 + this.z)
        return {
          x: canvas!.width / 2 + this.x * scale,
          y: canvas!.height / 2 + this.y * scale,
          scale,
        }
      }
    }

    const init = () => {
      resize()
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000))
      particles = Array.from({ length: particleCount }, () => new Particle())
    }

    const drawParticle = (p: Particle) => {
      const pos = p.getScreenPos()
      const alpha = Math.max(0.4, pos.scale) * p.brightness
      
      ctx!.beginPath()
      ctx!.arc(pos.x, pos.y, p.size * pos.scale, 0, Math.PI * 2)
      
      const gradient = ctx!.createRadialGradient(
        pos.x, pos.y, 0,
        pos.x, pos.y, p.size * pos.scale * 2
      )
      gradient.addColorStop(0, `rgba(0, 255, 194, ${alpha})`)
      gradient.addColorStop(0.5, `rgba(0, 255, 194, ${alpha * 0.5})`)
      gradient.addColorStop(1, 'rgba(0, 255, 194, 0)')
      
      ctx!.fillStyle = gradient
      ctx!.fill()
    }

    const drawConnections = () => {
      const maxDist = 150
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < Math.min(i + 20, particles.length); j++) {
          const p1 = particles[i].getScreenPos()
          const p2 = particles[j].getScreenPos()
          
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.2 * Math.min(p1.scale, p2.scale)
            ctx!.beginPath()
            ctx!.moveTo(p1.x, p1.y)
            ctx!.lineTo(p2.x, p2.y)
            ctx!.strokeStyle = `rgba(0, 255, 194, ${alpha})`
            ctx!.lineWidth = 0.8
            ctx!.stroke()
          }
        }
      }
    }

    const drawMouseConnections = () => {
      const mouseRadius = 200
      const mousePos = { x: mouseX, y: mouseY }
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i].getScreenPos()
        const dx = p.x - mousePos.x
        const dy = p.y - mousePos.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < mouseRadius) {
          const alpha = (1 - dist / mouseRadius) * 0.3 * p.scale
          ctx!.beginPath()
          ctx!.moveTo(p.x, p.y)
          ctx!.lineTo(mousePos.x, mousePos.y)
          ctx!.strokeStyle = `rgba(0, 255, 194, ${alpha})`
          ctx!.lineWidth = 1
          ctx!.stroke()
        }
      }
    }

    const animate = () => {
      if (!isRunning) return
      
      ctx!.fillStyle = "rgba(2, 6, 23, 0.12)"
      ctx!.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.update()
        drawParticle(p)
      })

      drawConnections()
      drawMouseConnections()

      animationId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleResize = () => {
      resize()
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    init()
    ctx.fillStyle = "#020617"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [shouldAnimate])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full"
      style={{ background: "#020617" }}
      aria-hidden="true"
    />
  )
}