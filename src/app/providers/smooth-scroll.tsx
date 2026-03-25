/**
 * SmoothScrollProvider
 *
 * Initialises Lenis on mount, tears it down on unmount.
 * Must be placed inside React Router so useLocation works,
 * but outside individual pages so it persists across route changes.
 *
 * On every route change we kill all ScrollTriggers from the
 * previous page and let each new page register its own.
 */
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { initSmoothScroll, ScrollTrigger } from '@/shared/lib/gsap'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const cleanupRef = useRef<(() => void) | null>(null)

  // Init Lenis once
  useEffect(() => {
    cleanupRef.current = initSmoothScroll()
    return () => { cleanupRef.current?.() }
  }, [])

  // On route change: kill old ScrollTriggers, scroll to top
  useEffect(() => {
    // Kill triggers from previous page so they don't fire on new page
    ScrollTrigger.getAll().forEach(t => t.kill())
    // Scroll to top (smooth)
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return <>{children}</>
}
