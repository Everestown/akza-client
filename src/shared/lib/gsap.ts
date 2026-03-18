import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'power3.out' })

export { gsap, ScrollTrigger }

export interface ScrollRevealOptions {
  targets: string | Element | Element[]
  container?: Element | null
  y?: number
  x?: number
  stagger?: number
  duration?: number
  start?: string
  end?: string
}

/**
 * Bidirectional scroll-triggered reveal.
 * Enters viewport → plays forward. Scrolls back → reverses.
 */
export function scrollReveal(opts: ScrollRevealOptions | string, legacyContainer?: Element | null) {
  const o: ScrollRevealOptions = typeof opts === 'string'
    ? { targets: opts, container: legacyContainer }
    : opts

  const trigger = o.container
    ?? (typeof o.targets === 'string' ? (document.querySelector(o.targets) ?? o.targets) : undefined)

  return gsap.fromTo(
    o.targets,
    { opacity: 0, y: o.y ?? 48 },
    {
      opacity: 1,
      y: 0,
      stagger: o.stagger ?? 0.08,
      duration: o.duration ?? 0.9,
      scrollTrigger: {
        trigger: trigger as Element,
        start: o.start ?? 'top 82%',
        end:   o.end   ?? 'top 30%',
        toggleActions: 'play reverse play reverse',
      },
    },
  )
}

/** Bidirectional horizontal stagger */
export function scrollRevealX(opts: ScrollRevealOptions | string, legacyContainer?: Element | null) {
  const o: ScrollRevealOptions = typeof opts === 'string'
    ? { targets: opts, container: legacyContainer }
    : opts

  const trigger = o.container
    ?? (typeof o.targets === 'string' ? (document.querySelector(o.targets) ?? o.targets) : undefined)

  return gsap.fromTo(
    o.targets,
    { opacity: 0, x: o.x ?? -24 },
    {
      opacity: 1,
      x: 0,
      stagger: o.stagger ?? 0.1,
      duration: o.duration ?? 0.7,
      scrollTrigger: {
        trigger: trigger as Element,
        start: o.start ?? 'top 85%',
        end:   o.end   ?? 'top 40%',
        toggleActions: 'play reverse play reverse',
      },
    },
  )
}

/** Bidirectional scale reveal for cards */
export function scrollRevealScale(selector: string, container?: Element | null) {
  return gsap.fromTo(
    selector,
    { opacity: 0, scale: 0.96, y: 24 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      stagger: 0.06,
      duration: 0.75,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container ?? selector,
        start: 'top 85%',
        end:   'top 40%',
        toggleActions: 'play reverse play reverse',
      },
    },
  )
}

/** Simple one-shot fade-in (entrance only — for hero elements) */
export function fadeIn(el: Element | string, delay = 0) {
  return gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay })
}

/** Hero title skewed reveal (entrance only) */
export function heroReveal(selector: string) {
  return gsap.fromTo(
    selector,
    { opacity: 0, y: 80, skewY: 4 },
    { opacity: 1, y: 0, skewY: 0, stagger: 0.18, duration: 1.2, ease: 'expo.out', delay: 0.1 },
  )
}

/** Clip-path curtain reveal for images (entrance only) */
export function curtainReveal(el: Element | string, delay = 0) {
  return gsap.fromTo(
    el,
    { clipPath: 'inset(100% 0 0 0)' },
    { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'expo.inOut', delay },
  )
}

/** Page leave transition */
export function pageOut(el: Element, onComplete: () => void) {
  gsap.to(el, { opacity: 0, y: -12, duration: 0.25, ease: 'power2.in', onComplete })
}

/** Countdown digit bounce */
export function animateDigit(el: Element | null) {
  if (!el) return
  gsap.fromTo(el, { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(1.5)' })
}

/** Refresh all ScrollTriggers after route/layout change */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh()
}
