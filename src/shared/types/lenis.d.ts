// Type augmentation for lenis (in case types aren't bundled)
declare module 'lenis' {
  interface LenisOptions {
    duration?: number
    easing?: (t: number) => number
    orientation?: 'vertical' | 'horizontal'
    smoothWheel?: boolean
    wheelMultiplier?: number
    touchMultiplier?: number
    wrapper?: HTMLElement | Window
    content?: HTMLElement
  }

  class Lenis {
    constructor(options?: LenisOptions)
    on(event: string, callback: (e: ScrollEvent) => void): void
    off(event: string, callback: (e: ScrollEvent) => void): void
    raf(time: number): void
    scrollTo(target: string | number | HTMLElement, options?: {
      offset?: number
      duration?: number
      easing?: (t: number) => number
      immediate?: boolean
    }): void
    destroy(): void
    readonly scroll: number
    readonly limit: number
    readonly velocity: number
    readonly direction: number
    readonly progress: number
    readonly isScrolling: boolean
    readonly isStopped: boolean
  }

  interface ScrollEvent {
    scroll: number
    limit: number
    velocity: number
    direction: number
    progress: number
  }

  export default Lenis
}
