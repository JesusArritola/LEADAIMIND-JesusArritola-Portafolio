'use client'

import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

interface KeyboardAction {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  description: string
  action: () => void
}

export function GlobalKeyboardNavigator() {
  const router = useRouter()
  const [shortcutsEnabled, setShortcutsEnabled] = useState(false)

const actions: KeyboardAction[] = [
    {
      key: '1',
      ctrl: true,
      description: 'Ir a Servicios',
      action: () => router.push('/#servicios')
    },
    {
      key: '2',
      ctrl: true,
      description: 'Ir a Demos',
      action: () => router.push('/#demos')
    },
    {
      key: '3',
      ctrl: true,
      description: 'Ir a Proceso',
      action: () => router.push('/#proceso')
    },
    {
      key: '4',
      ctrl: true,
      description: 'Ir a Proyectos',
      action: () => router.push('/proyectos')
    },
    {
      key: '5',
      ctrl: true,
      description: 'Ir a Sobre Mí',
      action: () => router.push('/acerca-de-mi')
    },
    {
      key: 'c',
      ctrl: true,
      description: 'Consulta Gratis (Contacto)',
      action: () => router.push('/#contacto')
    },
    {
      key: '2',
      ctrl: true,
      description: 'Ir a Demos',
      action: () => {
        const el = document.getElementById('demos')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      key: '3',
      ctrl: true,
      description: 'Ir a Proceso',
      action: () => {
        const el = document.getElementById('proceso')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      key: '4',
      ctrl: true,
      description: 'Ir a Proyectos',
      action: () => router.push('/proyectos')
    },
    {
      key: '5',
      ctrl: true,
      description: 'Ir a Sobre Mí',
      action: () => router.push('/acerca-de-mi')
    },
    {
      key: 'c',
      ctrl: true,
      description: 'Consulta Gratis (Contacto)',
      action: () => {
        router.push('/#contacto')
      }
    },
    {
      key: 'Escape',
      description: 'Cerrar modal/Quitar foco',
      action: () => {
        document.activeElement instanceof HTMLElement && document.activeElement.blur()
      }
    },
    {
      key: '?',
      shift: true,
      description: 'Mostrar atajos de teclado',
      action: () => setShortcutsEnabled(prev => !prev)
    },
  ]

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    for (const action of actions) {
      const ctrlMatch = action.ctrl ? (event.ctrlKey || event.metaKey) : !event.ctrlKey && !event.metaKey
      const shiftMatch = action.shift ? event.shiftKey : !event.shiftKey
      const altMatch = action.alt ? event.altKey : !event.altKey
      const keyMatch = event.key.toLowerCase() === action.key.toLowerCase()

      if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
        event.preventDefault()
        action.action()
        break
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return null
}