'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface NavbarContextType {
  isHidden: boolean
  hideNavbar: () => void
  showNavbar: () => void
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [isHidden, setIsHidden] = useState(false)

  const hideNavbar = useCallback(() => setIsHidden(true), [])
  const showNavbar = useCallback(() => setIsHidden(false), [])

  return (
    <NavbarContext.Provider value={{ isHidden, hideNavbar, showNavbar }}>
      {children}
    </NavbarContext.Provider>
  )
}

export function useNavbar() {
  const context = useContext(NavbarContext)
  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider')
  }
  return context
}