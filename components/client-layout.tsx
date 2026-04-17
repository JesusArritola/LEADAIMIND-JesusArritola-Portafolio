'use client'

import { ReactNode, lazy, Suspense } from 'react'
import { usePathname } from 'next/navigation'
import { WhatsAppButton } from './whatsapp-button'
import { ChatWidget } from './chat-widget'
import { GlobalKeyboardNavigator } from './global-keyboard-navigator'

// Carga lazy del fondo neural para no bloquear el render inicial
const NeuralBackground = lazy(() => 
  import('./neural-background').then(mod => ({ default: mod.NeuralBackground }))
)

interface ClientLayoutProps {
  children: ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname()
  const isAboutPage = pathname === '/acerca-de-mi'
  
  return (
    <>
      <GlobalKeyboardNavigator />
      {!isAboutPage && (
        <Suspense fallback={<div className="fixed inset-0 -z-10 bg-[#0c1324]" />}>
          <NeuralBackground />
        </Suspense>
      )}
      {children}
      <WhatsAppButton />
      <ChatWidget />
    </>
  )
}