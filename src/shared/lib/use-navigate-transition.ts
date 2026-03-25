/**
 * useNavigateWithTransition
 *
 * Drop-in replacement for React Router's useNavigate.
 * Before navigating, plays a brief page-leave animation on the
 * current page wrapper, then navigates. This avoids the black-screen
 * flash while still feeling snappy (the leave animation is only ~220ms).
 *
 * Usage:
 *   const navigate = useNavigateWithTransition()
 *   navigate('/collections/summer')
 */
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { gsap } from './gsap'

export function useNavigateWithTransition() {
  const navigate = useNavigate()

  return useCallback((to: string) => {
    // Find the page wrapper (set by PageTransition)
    const wrapper = document.querySelector('[data-page-wrapper]') as HTMLElement | null

    if (!wrapper) {
      navigate(to)
      return
    }

    gsap.to(wrapper, {
      opacity: 0,
      y: -12,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => navigate(to),
    })
  }, [navigate])
}
