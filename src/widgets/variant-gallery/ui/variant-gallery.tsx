import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { gsap } from '@/shared/lib/gsap'
import { SafeImage, MediaFallback } from '@/shared/ui/media-fallback'
import { detectMediaType } from '@/shared/lib/media-validation'
import { galleryStore } from '../model/use-gallery'
import type { VariantImage } from '@/entities/variant/types/variant.types'

interface Props { images: VariantImage[] }

export const VariantGallery = observer(function VariantGallery({ images }: Props) {
  const mediaRef = useRef<HTMLDivElement>(null)
  const { activeIndex } = galleryStore

  useEffect(() => {
    if (!mediaRef.current) return
    gsap.fromTo(mediaRef.current,
      { opacity: 0, scale: 1.02 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
    )
  }, [activeIndex])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') galleryStore.next(images.length)
      if (e.key === 'ArrowLeft')  galleryStore.prev(images.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [images.length])

  if (!images.length) {
    return (
      <div className="aspect-[3/4] bg-ash rounded-lg overflow-hidden">
        <MediaFallback kind="image" />
      </div>
    )
  }

  const active = images[Math.min(activeIndex, images.length - 1)]!
  const mediaType = detectMediaType(null, active.url)

  return (
    <div className="flex flex-col gap-3">
      {/* Main media */}
      <div ref={mediaRef} className="aspect-[3/4] bg-ash rounded-lg overflow-hidden">
        {mediaType === 'video' ? (
          <video
            src={active.url}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none'
              const parent = (e.target as HTMLElement).parentElement
              if (parent) {
                const fb = document.createElement('div')
                fb.className = 'w-full h-full'
                fb.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-coal text-smoke">Видео недоступно</div>'
                parent.appendChild(fb)
              }
            }}
          />
        ) : (
          <SafeImage
            src={active.url}
            alt={`Фото ${activeIndex + 1}`}
            className="w-full h-full object-cover"
            fallbackKind="image"
          />
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {images.map((img, i) => {
            const type = detectMediaType(null, img.url)
            return (
              <button
                key={img.id}
                onClick={() => galleryStore.setActive(i)}
                className={`shrink-0 w-14 h-14 rounded overflow-hidden border-2 transition-colors ${
                  i === activeIndex ? 'border-mist' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                {type === 'video' ? (
                  <div className="w-full h-full bg-coal flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 2l10 5-10 5V2z" fill="currentColor" className="text-smoke"/>
                    </svg>
                  </div>
                ) : (
                  <SafeImage src={img.url} alt="" className="w-full h-full object-cover" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
})
