import { useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '@/app/stores/store.context'
import { gsap } from '@/shared/lib/gsap'

export function useHeader() {
  const { ui } = useStore()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => { ui.closeNav() }, [location.pathname, ui])

  useEffect(() => {
    document.body.style.overflow = ui.isNavOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [ui.isNavOpen])

  const scrollToAnchor = useCallback((anchor: string) => {
    const el = document.querySelector(anchor)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  const handleNavClick = useCallback((href: string) => {
    if (href.startsWith('/#')) {
      const anchor = href.slice(1)
      if (location.pathname === '/') {
        scrollToAnchor(anchor)
      } else {
        navigate('/')
        // Wait for page render then scroll
        setTimeout(() => scrollToAnchor(anchor), 400)
      }
      ui.closeNav()
      return true
    }
    return false
  }, [location.pathname, navigate, scrollToAnchor, ui])

  const toggleNav = () => {
    if (ui.isNavOpen) {
      gsap.to('.nav-overlay', { opacity: 0, duration: 0.25, onComplete: () => ui.closeNav() })
      gsap.to('.nav-link', { y: 20, opacity: 0, stagger: 0.04, duration: 0.2 })
    } else {
      ui.openNav()
      gsap.fromTo('.nav-overlay', { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo('.nav-link', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.5, delay: 0.1, ease: 'expo.out' })
    }
  }

  return { isNavOpen: ui.isNavOpen, toggleNav, handleNavClick }
}
