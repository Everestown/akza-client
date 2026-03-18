import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { gsap } from '@/shared/lib/gsap'
import { galleryStore } from '../model/use-gallery'
import type { VariantImage } from '@/entities/variant/types/variant.types'

interface Props { images: VariantImage[] }

export const VariantGallery = observer(function VariantGallery({ images }: Props) {
  const imgRef = useRef<HTMLImageElement>(null)
  const { activeIndex } = galleryStore

  // GSAP crossfade on image change
  useEffect(() => {
    if (!imgRef.current) return
    gsap.fromTo(imgRef.current,
      { opacity: 0, scale: 1.02 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
    )
  }, [activeIndex])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') galleryStore.next(images.length)
      if (e.key === 'ArrowLeft')  galleryStore.prev(images.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [images.length])

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-ash flex items-center justify-center">
        <span className="jp text-smoke text-4xl">アクザ</span>
      </div>
    )
  }

  const active = images[activeIndex] ?? images[0]

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-ash group">
        <img
          ref={imgRef}
          src={active.url}
          alt=""
          className="w-full h-full object-cover"
        />

        {/* Navigation areas */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => galleryStore.prev(images.length)}
              className="absolute left-0 top-0 bottom-0 w-1/3 opacity-0"
              aria-label="Предыдущее фото"
            />
            <button
              onClick={() => galleryStore.next(images.length)}
              className="absolute right-0 top-0 bottom-0 w-2/3 opacity-0"
              aria-label="Следующее фото"
            />
          </>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex items-center gap-1">
            <span className="font-mono text-[10px] text-mist/60">
              {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => galleryStore.setActive(i)}
              className={`shrink-0 w-14 h-14 overflow-hidden border transition-all duration-200 ${
                i === activeIndex ? 'border-mist/50' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
              aria-label={`Фото ${i + 1}`}
            >
              <img src={img.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
})
