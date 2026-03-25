import { useEffect, useRef } from 'react'
import { gsap, heroReveal, curtainReveal } from '@/shared/lib/gsap'
import { SafeImage, SafeMedia } from '@/shared/ui/safe-media'
import type { Collection } from '@/entities/collection/types/collection.types'

interface Props { collection: Collection }

export function CollectionHero({ collection }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image curtain reveal
      curtainReveal('.hero-image-wrap', 0.1)

      // Title reveal
      heroReveal('.hero-line')

      // Meta fade
      gsap.fromTo('.hero-meta',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, delay: 0.8 },
      )

      // Subtle parallax on scroll
      gsap.to('.hero-image', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative h-[92vh] flex items-end overflow-hidden">
      {/* Background image/video with parallax */}
      <div ref={imageRef} className="hero-image-wrap absolute inset-0">
        <SafeMedia
          src={collection.cover_url}
          type="auto"
          alt={collection.title}
          className="hero-image w-full h-full object-cover"
          fallbackClassName="w-full h-full bg-ash flex items-center justify-center"
        />
        {/* Dark gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-10 pb-14">
        <div className="max-w-5xl">
          {/* Season label */}
          <div className="hero-meta overflow-hidden mb-4">
            <p className="section-tag">
              {collection.scheduled_at
                ? new Date(collection.scheduled_at).getFullYear()
                : new Date(collection.created_at).getFullYear()
              } · Коллекция
            </p>
          </div>

          {/* Title */}
          <div className="overflow-hidden">
            <h1 className="hero-line headline text-5xl md:text-7xl lg:text-8xl">
              {collection.title}
            </h1>
          </div>

          {/* Japanese subtitle */}
          <div className="overflow-hidden mt-2">
            <p className="hero-line jp text-fog/60 text-xl md:text-2xl">アクザ</p>
          </div>

          {/* Description */}
          {collection.description && (
            <p className="hero-meta mt-4 max-w-md text-sm text-fog/80 font-body font-light leading-relaxed">
              {collection.description}
            </p>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-8 flex flex-col items-center gap-2">
        <div className="hero-meta h-10 w-px bg-gradient-to-b from-transparent to-smoke" />
        <span className="hero-meta section-tag" style={{ writingMode: 'vertical-rl' }}>scroll</span>
      </div>
    </div>
  )
}
