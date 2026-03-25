/**
 * GSAP + Lenis smooth scroll integration.
 *
 * Import everything from this module — not directly from gsap/lenis.
 * This ensures ScrollTrigger always uses the Lenis scroll position.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'power3.out' })

// ── Lenis singleton ───────────────────────────────────────────────────────────
let lenis: Lenis | null = null

export function initSmoothScroll(): () => void {
  if (typeof window === 'undefined') return () => {}

  // Destroy any existing instance (hot-reload safety)
  if (lenis) { lenis.destroy(); lenis = null }

  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.6,
  })

  // Bridge Lenis → GSAP ScrollTrigger so all scroll animations use Lenis position
  lenis.on('scroll', ScrollTrigger.update)

  // Drive Lenis with GSAP ticker for perfect frame sync
  const tickerFn = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tickerFn)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tickerFn)
    lenis?.destroy()
    lenis = null
  }
}

/** Scroll to a target element or position */
export function scrollTo(target: string | number | HTMLElement, offset = 0) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.1 })
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (el instanceof Element) el.scrollIntoView({ behavior: 'smooth' })
  }
}

export { gsap, ScrollTrigger }

// ── Types ─────────────────────────────────────────────────────────────────────
export interface ScrollRevealOptions {
  targets: string | Element | Element[]
  container?: Element | null
  y?: number
  x?: number
  stagger?: number
  duration?: number
  start?: string
}

// ── Scroll reveal helpers ─────────────────────────────────────────────────────

/**
 * Bidirectional scroll reveal: appears on enter, hides on scroll back up.
 * toggleActions: 'play none none reverse'
 */
export function scrollReveal(opts: ScrollRevealOptions | string, legacyContainer?: Element | null) {
  const o: ScrollRevealOptions =
    typeof opts === 'string' ? { targets: opts, container: legacyContainer } : opts

  const trigger = o.container ?? (
    typeof o.targets === 'string' ? (document.querySelector(o.targets) ?? undefined) : undefined
  )

  return gsap.fromTo(
    o.targets,
    { opacity: 0, y: o.y ?? 40 },
    {
      opacity: 1, y: 0,
      stagger: o.stagger ?? 0.08,
      duration: o.duration ?? 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: trigger as Element,
        start: o.start ?? 'top 88%',
        toggleActions: 'play none none reverse',
      },
    },
  )
}

export function scrollRevealX(opts: ScrollRevealOptions | string, legacyContainer?: Element | null) {
  const o: ScrollRevealOptions =
    typeof opts === 'string' ? { targets: opts, container: legacyContainer } : opts

  const trigger = o.container ?? (
    typeof o.targets === 'string' ? (document.querySelector(o.targets) ?? undefined) : undefined
  )

  return gsap.fromTo(
    o.targets,
    { opacity: 0, x: o.x ?? -28 },
    {
      opacity: 1, x: 0,
      stagger: o.stagger ?? 0.1,
      duration: o.duration ?? 0.65,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: trigger as Element,
        start: o.start ?? 'top 88%',
        toggleActions: 'play none none reverse',
      },
    },
  )
}

export function scrollRevealScale(selector: string, container?: Element | null) {
  return gsap.fromTo(
    selector,
    { opacity: 0, scale: 0.97, y: 20 },
    {
      opacity: 1, scale: 1, y: 0,
      stagger: 0.07, duration: 0.7, ease: 'power2.out',
      scrollTrigger: {
        trigger: container ?? selector,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    },
  )
}

/** One-shot fade-in (hero elements, above fold) */
export function fadeIn(el: Element | string, delay = 0) {
  return gsap.fromTo(
    el,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay },
  )
}

/** Hero entrance (skewed, dramatic) */
export function heroReveal(selector: string) {
  return gsap.fromTo(
    selector,
    { opacity: 0, y: 70, skewY: 3 },
    { opacity: 1, y: 0, skewY: 0, stagger: 0.15, duration: 1.1, ease: 'expo.out', delay: 0.15 },
  )
}

/** Clip-path curtain reveal (images) */
export function curtainReveal(el: Element | string, delay = 0) {
  return gsap.fromTo(
    el,
    { clipPath: 'inset(100% 0 0 0)' },
    { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'expo.inOut', delay },
  )
}

/** Countdown digit bounce */
export function animateDigit(el: Element | null) {
  if (!el) return
  gsap.fromTo(el, { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'back.out(2)' })
}

/** Refresh all ScrollTriggers after layout change */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh()
}

/** Page enter animation — used by PageTransition component */
export function pageEnter(el: Element, onComplete?: () => void) {
  return gsap.fromTo(
    el,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', clearProps: 'all', onComplete },
  )
}

/** Page leave animation — brief fade out before navigation */
export function pageLeave(el: Element, onComplete: () => void) {
  return gsap.to(el, {
    opacity: 0, y: -16,
    duration: 0.22, ease: 'power2.in',
    onComplete,
  })
}
