import { useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '@/app/stores/store.context'
import { scrollTo } from '@/shared/lib/gsap'

export function useHeader() {
  const { ui } = useStore()
  const location = useLocation()
  const navigate = useNavigate()

  // Close mobile nav on route change
  useEffect(() => {
    ui.closeNav()
  }, [location.pathname])

  // Anchor scroll: handles /#about links
  const handleNavClick = useCallback((href: string) => {
    ui.closeNav()
    if (href.startsWith('/#')) {
      const anchor = href.slice(1) // → #about
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => scrollTo(anchor, -80), 450)
      } else {
        scrollTo(anchor, -80)
      }
    } else {
      navigate(href)
    }
  }, [location.pathname, navigate, ui])

  return {
    isNavOpen:  ui.isNavOpen,
    toggleNav:  ui.toggleNav.bind(ui),
    handleNavClick,
  }
}
