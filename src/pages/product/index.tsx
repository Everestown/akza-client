import { useEffect, useRef, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useProduct } from '@/entities/product/model/use-product'
import { useVariantsByProductSlug } from '@/entities/variant/model/use-variant'
import { useStore } from '@/app/stores/store.context'
import { SiteHeader } from '@/widgets/site-header/ui/site-header'
import { SiteFooter } from '@/widgets/site-footer/ui/site-footer'
import { OrderForm } from '@/widgets/order-form/ui/order-form'
import { ShareButton } from '@/features/share-link/ui/share-button'
import { Skeleton } from '@/shared/ui/skeleton'
import { Button } from '@/shared/ui/button'
import { formatPrice } from '@/shared/lib/format'
import { gsap, fadeIn, scrollReveal } from '@/shared/lib/gsap'
import { ROUTES } from '@/shared/config/routes'
import { cn } from '@/shared/lib/cn'
import type { Variant } from '@/entities/variant/types/variant.types'

// Full-screen lightbox for images
function Lightbox({ images, index, onClose }: {
  images: string[]; index: number; onClose: () => void
}) {
  const [current, setCurrent] = useState(index)
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)
  const next = () => setCurrent((c) => (c + 1) % images.length)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[100] bg-ink/97 flex items-center justify-center" onClick={onClose}>
      <button className="absolute top-4 right-4 text-fog hover:text-mist p-2 z-10" onClick={onClose} aria-label="Закрыть">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-fog hover:text-mist p-3 z-10">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-fog hover:text-mist p-3 z-10">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}
      <img
        src={images[current]}
        alt=""
        className="max-h-screen max-w-[90vw] object-contain select-none"
        onClick={(e) => e.stopPropagation()}
      />
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <div key={i} className={cn('w-1.5 h-1.5 rounded-full transition-colors', i === current ? 'bg-mist' : 'bg-smoke')} />
          ))}
        </div>
      )}
    </div>
  )
}

export default observer(function ProductPage() {
  const { slug: collectionSlug, productSlug } = useParams<{ slug: string; productSlug: string }>()
  const { data: product, isLoading }            = useProduct(productSlug!)
  const { data: variants = [], isLoading: vLoading } = useVariantsByProductSlug(productSlug!)
  const { orderForm } = useStore()

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)
  const [activeImg, setActiveImg] = useState(0)
  const [lightboxImg, setLightboxImg] = useState<number | null>(null)
  const infoRef  = useRef<HTMLDivElement>(null)

  // Gallery images: selected variant images, fallback to product cover
  const galleryImages = selectedVariant?.images.map((i) => i.url)
    ?? (product?.cover_url ? [product.cover_url] : [])

  useEffect(() => { setActiveImg(0) }, [selectedVariant])

  useEffect(() => {
    if (isLoading || !product) return
    const ctx = gsap.context(() => {
      fadeIn('.product-title', 0.15)
      fadeIn('.product-price', 0.28)
      fadeIn('.product-desc',  0.38)
      scrollReveal({ targets: '.char-row',    container: infoRef.current!, y: 10, stagger: 0.05 })
      scrollReveal({ targets: '.variant-btn', container: infoRef.current!, y: 8,  stagger: 0.04 })
    }, infoRef)
    return () => ctx.revert()
  }, [isLoading, product])

  if (isLoading || vLoading) return (
    <div className="min-h-screen bg-ink">
      <SiteHeader />
      <div className="pt-14 flex h-screen">
        <div className="flex-[3] bg-ash animate-pulse" />
        <div className="flex-[2] p-10 flex flex-col gap-4">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-8 w-64 mt-2" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-20 w-full mt-4" />
        </div>
      </div>
    </div>
  )

  if (!product) return (
    <div className="min-h-screen bg-ink flex items-center justify-center">
      <SiteHeader />
      <div className="text-center">
        <p className="jp text-smoke text-4xl mb-4">アクザ</p>
        <p className="section-tag">Изделие не найдено</p>
        <Link to={collectionSlug ? ROUTES.COLLECTION(collectionSlug) : ROUTES.HOME}
          className="section-tag hover:text-mist mt-6 inline-block transition-colors">← Назад</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-ink">
      <div className="grain-overlay" aria-hidden />
      <SiteHeader />

      {/* Lichi-style: full viewport, 60/40 split */}
      <div className="pt-14 flex flex-col md:flex-row min-h-screen">

        {/* ── LEFT: Vertical gallery (60%) ─────────────────────────────── */}
        <div className="md:flex-[3] relative">
          {/* Main image */}
          {galleryImages.length > 0 ? (
            <div
              className="md:sticky md:top-14 h-[60vw] md:h-[calc(100vh-56px)] overflow-hidden cursor-zoom-in bg-ash"
              onClick={() => setLightboxImg(activeImg)}
            >
              <img
                src={galleryImages[activeImg]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {/* Thumb strip overlay on desktop */}
              {galleryImages.length > 1 && (
                <div className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 flex-col gap-2">
                  {galleryImages.map((url, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setActiveImg(i) }}
                      className={cn(
                        'w-12 h-16 overflow-hidden border-2 transition-colors',
                        i === activeImg ? 'border-mist' : 'border-transparent opacity-60 hover:opacity-100'
                      )}
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              {/* Zoom hint */}
              <div className="absolute bottom-3 right-3 hidden md:flex items-center gap-1.5 text-[10px] text-fog/60 tracking-widest uppercase">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M8 2h2v2M10 2L7 5M4 10H2V8M2 10l3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                увеличить
              </div>
            </div>
          ) : (
            <div className="md:sticky md:top-14 h-[60vw] md:h-[calc(100vh-56px)] bg-coal flex items-center justify-center">
              <span className="jp text-smoke text-6xl">アクザ</span>
            </div>
          )}

          {/* Mobile thumbnails below main image */}
          {galleryImages.length > 1 && (
            <div className="flex gap-2 p-4 md:hidden overflow-x-auto scrollbar-none">
              {galleryImages.map((url, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn('w-14 h-18 shrink-0 overflow-hidden border-2 transition-colors',
                    i === activeImg ? 'border-mist' : 'border-transparent opacity-60'
                  )}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Product info (40%) ─────────────────────────────────── */}
        <div ref={infoRef} className="md:flex-[2] flex flex-col px-6 md:px-10 py-8 md:py-12 md:overflow-y-auto md:max-h-[calc(100vh-56px)] md:sticky md:top-14">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-smoke mb-6 flex-wrap">
            <Link to={ROUTES.HOME} className="hover:text-fog transition-colors">AKZA</Link>
            <span>/</span>
            {collectionSlug && (
              <><Link to={ROUTES.COLLECTION(collectionSlug)} className="hover:text-fog transition-colors">Коллекция</Link><span>/</span></>
            )}
            <span className="text-fog truncate max-w-[120px]">{product.title}</span>
          </nav>

          {/* Title */}
          <h1 className="product-title font-display text-3xl md:text-4xl font-light text-mist leading-tight mb-2" style={{ opacity: 0 }}>
            {product.title}
          </h1>

          {/* Price */}
          {!product.price_hidden && (
            <p className="product-price font-mono text-sm text-fog mb-5" style={{ opacity: 0 }}>
              {formatPrice(product.price)}
            </p>
          )}

          {/* Description */}
          {product.description && (
            <p className="product-desc text-sm text-fog/80 font-light leading-relaxed mb-6 max-w-xs" style={{ opacity: 0 }}>
              {product.description}
            </p>
          )}

          {/* Variants */}
          {variants.length > 0 && (
            <div className="mb-6">
              <p className="section-tag mb-3">
                {selectedVariant ? `Вариант: ${selectedVariant.slug}` : 'Выберите вариант'}
              </p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={cn(
                      'variant-btn h-10 px-4 text-xs tracking-widest uppercase border transition-all duration-200',
                      selectedVariant?.id === v.id
                        ? 'bg-mist text-ink border-mist'
                        : 'bg-transparent text-fog border-coal hover:border-smoke hover:text-mist'
                    )}
                    style={{ opacity: 0 }}
                  >
                    {Object.values(v.attributes).join(' · ') || v.slug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-auto pt-6 border-t border-coal flex flex-col gap-3">
            <Button
              variant="primary"
              className="w-full"
              disabled={variants.length > 0 && !selectedVariant}
              onClick={() => {
                const v = selectedVariant ?? (variants.length === 0 ? null : null)
                if (v) orderForm.openFor(v.id, v.slug)
                else if (variants.length === 0) orderForm.openFor(product.id, product.slug)
              }}
            >
              {variants.length > 0 && !selectedVariant ? 'Выберите вариант' : 'Оставить заявку'}
            </Button>
            <p className="text-[11px] text-center text-fog/50 tracking-wide">
              Ответим в Telegram в течение нескольких часов
            </p>
          </div>

          {/* Characteristics */}
          {Object.keys(product.characteristics ?? {}).length > 0 && (
            <div className="mt-6 border-t border-coal pt-5">
              <p className="section-tag mb-3">Характеристики</p>
              <div className="flex flex-col gap-2.5">
                {Object.entries(product.characteristics).map(([k, v]) => (
                  <div key={k} className="char-row flex justify-between py-1 border-b border-coal/50 last:border-0" style={{ opacity: 0 }}>
                    <span className="section-tag">{k}</span>
                    <span className="text-sm text-fog">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mt-6 pt-4 border-t border-coal">
            <ShareButton title={product.title} />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg !== null && (
        <Lightbox
          images={galleryImages}
          index={lightboxImg}
          onClose={() => setLightboxImg(null)}
        />
      )}

      <SiteFooter />
      <OrderForm />
    </div>
  )
})
