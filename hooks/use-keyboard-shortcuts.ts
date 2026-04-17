'use client'

import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type KeyboardShortcut = {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  handler: () => void
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    for (const shortcut of shortcuts) {
      const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey
      const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey
      const altMatch = shortcut.alt ? event.altKey : !event.altKey
      const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase()

      if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
        event.preventDefault()
        shortcut.handler()
        break
      }
    }
  }, [shortcuts])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

interface NavigationShortcut {
  section: string
  href: string
}

const navShortcuts: NavigationShortcut[] = [
  { section: 'servicios', href: '#servicios' },
  { section: 'demos', href: '#demos' },
  { section: 'proceso', href: '#proceso' },
  { section: 'proyectos', href: '/proyectos' },
  { section: 'sobre mí', href: '/acerca-de-mi' },
  { section: 'contacto', href: '#contacto' },
]

export function useNavigationShortcuts() {
  const router = useRouter()

  const shortcuts: KeyboardShortcut[] = navShortcuts.map((nav) => ({
    key: nav.section,
    ctrl: true,
    handler: () => {
      if (nav.href.startsWith('/')) {
        router.push(nav.href)
      } else {
        const element = document.querySelector(nav.href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        } else {
          router.push('/' + nav.href)
        }
      }
    },
  }))

  shortcuts.push({
    key: 'c',
    ctrl: true,
    handler: () => {
      const element = document.querySelector('#contacto')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    },
  })

  shortcuts.push({
    key: 'Escape',
    handler: () => {
      const activeElement = document.activeElement as HTMLElement
      if (activeElement) {
        activeElement.blur()
      }
    },
  })

  useKeyboardShortcuts(shortcuts)
}