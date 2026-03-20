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
}

/**
 * Bidirectional scroll reveal.
 * Enters viewport → plays (element appears).
 * Scrolls back up past trigger start → reverses (element hides).
 * 
 * toggleActions: 'play none none reverse'
 * - onEnter:     play   → show
 * - onLeave:     none   → stay visible (scrolled down past)
 * - onEnterBack: none   → stay visible (scrolled back into from top)
 * - onLeaveBack: reverse → hide (scrolled back up, element left view)
 */
export function scrollReveal(
  opts: ScrollRevealOptions | string,
  legacyContainer?: Element | null,
) {
  const o: ScrollRevealOptions =
    typeof opts === 'string' ? { targets: opts, container: legacyContainer } : opts

  const trigger =
    o.container ??
    (typeof o.targets === 'string'
      ? (document.querySelector(o.targets) ?? undefined)
      : undefined)

  return gsap.fromTo(
    o.targets,
    { opacity: 0, y: o.y ?? 40 },
    {
      opacity: 1,
      y: 0,
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

/** Bidirectional horizontal stagger reveal */
export function scrollRevealX(
  opts: ScrollRevealOptions | string,
  legacyContainer?: Element | null,
) {
  const o: ScrollRevealOptions =
    typeof opts === 'string' ? { targets: opts, container: legacyContainer } : opts

  const trigger =
    o.container ??
    (typeof o.targets === 'string'
      ? (document.querySelector(o.targets) ?? undefined)
      : undefined)

  return gsap.fromTo(
    o.targets,
    { opacity: 0, x: o.x ?? -28 },
    {
      opacity: 1,
      x: 0,
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

/** Bidirectional scale + fade reveal (for cards/images) */
export function scrollRevealScale(selector: string, container?: Element | null) {
  return gsap.fromTo(
    selector,
    { opacity: 0, scale: 0.97, y: 20 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      stagger: 0.07,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container ?? selector,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    },
  )
}

/** One-shot fade-in (no reverse — for hero/above-fold elements) */
export function fadeIn(el: Element | string, delay = 0) {
  return gsap.fromTo(
    el,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay },
  )
}

/** Hero title entrance (one-shot, no reverse) */
export function heroReveal(selector: string) {
  return gsap.fromTo(
    selector,
    { opacity: 0, y: 70, skewY: 3 },
    {
      opacity: 1,
      y: 0,
      skewY: 0,
      stagger: 0.15,
      duration: 1.1,
      ease: 'expo.out',
      delay: 0.15,
    },
  )
}

/** Clip-path curtain reveal for images (one-shot) */
export function curtainReveal(el: Element | string, delay = 0) {
  return gsap.fromTo(
    el,
    { clipPath: 'inset(100% 0 0 0)' },
    { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'expo.inOut', delay },
  )
}

/** Page leave transition */
export function pageOut(el: Element, onComplete: () => void) {
  gsap.to(el, { opacity: 0, y: -10, duration: 0.2, ease: 'power2.in', onComplete })
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
