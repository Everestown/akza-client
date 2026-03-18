import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '@/shared/lib/gsap'
import { ROUTES } from '@/shared/config/routes'
import { SiteHeader } from '@/widgets/site-header/ui/site-header'

export default function NotFoundPage() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.nf-char',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.8, ease: 'expo.out' },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-ink flex flex-col">
      <div className="grain-overlay" aria-hidden />
      <SiteHeader />

      <div ref={ref} className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="overflow-hidden mb-2">
          {'404'.split('').map((c, i) => (
            <span key={i} className="nf-char inline-block font-display text-[clamp(80px,20vw,200px)] font-light text-coal leading-none">
              {c}
            </span>
          ))}
        </div>
        <p className="nf-char section-tag mb-8">Страница не найдена</p>
        <Link
          to={ROUTES.HOME}
          className="nf-char section-tag text-fog hover:text-mist transition-colors border-b border-smoke hover:border-fog pb-0.5"
        >
          Вернуться в галерею →
        </Link>
        <p className="nf-char jp text-smoke text-4xl mt-12">アクザ</p>
      </div>
    </div>
  )
}
