/**
 * PageTransition
 *
 * Wraps every page's root element. On mount plays a smooth enter
 * animation (opacity + slight Y translate). No black screen between
 * page navigations — the new page just eases in.
 *
 * data-page-wrapper attribute is used by useNavigateWithTransition
 * to find the element for the leave animation.
 */
import { useRef, useLayoutEffect } from 'react'
import { pageEnter } from '@/shared/lib/gsap'

interface Props {
  children: React.ReactNode
  className?: string
  // Any extra HTML div props
  [key: string]: unknown
}

export function PageTransition({ children, className, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    // Set initial state before paint to prevent flash
    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    // Tiny delay lets Lenis initialise on first mount
    const t = setTimeout(() => { if (el) pageEnter(el) }, 30)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      data-page-wrapper
      style={{ willChange: 'opacity, transform' }}
      {...rest}
    >
      {children}
    </div>
  )
}
