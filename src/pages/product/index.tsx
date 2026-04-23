import { useEffect, useRef, useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/shared/api/instance'
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useProduct } from '@/entities/product/model/use-product'
import { useVariantsByProductSlug } from '@/entities/variant/model/use-variant'
import { useStore } from '@/app/stores/store.context'
import { useDictionaryValue } from '@/entities/site-page/model/use-site'
import { SiteHeader } from '@/widgets/site-header/ui/site-header'
import { SiteFooter } from '@/widgets/site-footer/ui/site-footer'
import { OrderForm } from '@/widgets/order-form/ui/order-form'
import { PageTransition } from '@/shared/ui/page-transition'
import { ShareButton } from '@/features/share-link/ui/share-button'
import { Skeleton } from '@/shared/ui/skeleton'
import { Button } from '@/shared/ui/button'
import { formatPrice } from '@/shared/lib/format'
import { gsap, fadeIn, scrollReveal } from '@/shared/lib/gsap'
import { ROUTES } from '@/shared/config/routes'
import { cn } from '@/shared/lib/cn'
import type { Variant } from '@/entities/variant/types/variant.types'
import { getVariantCover, getVariantLabel, getMergedCharacteristics } from '@/entities/variant/types/variant.types'
import type { SizeGridData } from '@/entities/variant/types/variant.types'

// Full-screen lightbox
function Lightbox({ images, index, onClose }: {
  images: Array<{ url: string; media_type?: string }>; index: number; onClose: () => void
}) {
  const [current, setCurrent] = useState(index)
  const imageOnly = images.filter(i => i.media_type !== 'VIDEO')
  const currentItem = imageOnly[current] ?? images[index]
  const prev = () => setCurrent(c => (c - 1 + imageOnly.length) % imageOnly.length)
  const next = () => setCurrent(c => (c + 1) % imageOnly.length)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [])
  return (
    <div className="fixed inset-0 z-[100] bg-ink/97 flex items-center justify-center" onClick={onClose}>
      <button className="absolute top-4 right-4 text-fog hover:text-mist p-2 z-10" onClick={onClose}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </button>
      {imageOnly.length > 1 && (
        <>
          <button onClick={e => { e.stopPropagation(); prev() }} className="absolute left-4 top-1/2 -translate-y-1/2 text-fog hover:text-mist p-3 z-10">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={e => { e.stopPropagation(); next() }} className="absolute right-4 top-1/2 -translate-y-1/2 text-fog hover:text-mist p-3 z-10">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </>
      )}
      <img src={currentItem?.url} alt="" className="max-h-screen max-w-[90vw] object-contain select-none" onClick={e => e.stopPropagation()} />
      {imageOnly.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {imageOnly.map((_, i) => <div key={i} className={cn('w-1.5 h-1.5 rounded-full transition-colors', i === current ? 'bg-mist' : 'bg-smoke')} />)}
        </div>
      )}
    </div>
  )
}


// Size grid view modal
function SizeGridModal({ sizeGridId, customGrid, show }: {
  sizeGridId: number | null
  customGrid: SizeGridData | null
  show: boolean
}) {
  const [open, setOpen] = useState(false)
  const { data: grid } = useQuery({
    queryKey: ['size-grid', sizeGridId],
    queryFn: () => api.get<{ data: SizeGridData }>(`/size-grids/${sizeGridId}`).then(r => r.data.data),
    enabled: open && !!sizeGridId,
  })
  if (!show) return null
  const displayGrid = customGrid ?? grid
  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-smoke hover:text-fog transition-colors">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <rect x="1" y="1" width="12" height="12" rx="1"/>
          <line x1="1" y1="5" x2="13" y2="5"/>
          <line x1="1" y1="9" x2="13" y2="9"/>
          <line x1="5" y1="1" x2="5" y2="13"/>
        </svg>
        Размерная сетка
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-ink/90 flex items-center justify-center p-6" onClick={() => setOpen(false)}>
          <div className="bg-coal border border-smoke/20 rounded p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <p className="section-tag">Размерная сетка</p>
              <button onClick={() => setOpen(false)} className="text-smoke hover:text-fog">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              </button>
            </div>
            {displayGrid ? (
              <table className="text-xs w-full border-collapse">
                <thead>
                  <tr>{displayGrid.columns.map(col => <th key={col} className="px-3 py-2 text-left text-smoke border border-smoke/20">{col}</th>)}</tr>
                </thead>
                <tbody>
                  {displayGrid.rows.map((row, i) => (
                    <tr key={i}>{displayGrid!.columns.map(col => <td key={col} className="px-3 py-1.5 border border-smoke/20 text-fog">{String(row[col] ?? '')}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            ) : <p className="text-smoke text-sm">Загрузка...</p>}
          </div>
        </div>
      )}
    </>
  )
}

export default observer(function ProductPage() {
  const { slug: collectionSlug, productSlug } = useParams<{ slug: string; productSlug: string }>()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: product, isLoading } = useProduct(productSlug!)
  const { data: variants = [], isLoading: vLoading } = useVariantsByProductSlug(productSlug!)
  const { orderForm } = useStore()
  const orderCta   = useDictionaryValue('order_cta',   'Оставить заявку')
  const orderReply = useDictionaryValue('order_reply',  'Ответим в Telegram в течение нескольких часов')

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)
  const [activeImg, setActiveImg] = useState(0)
  const [lightboxImg, setLightboxImg] = useState<number | null>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const variantRowRef = useRef<HTMLDivElement>(null)

  // 1.3: Reflect selected variant in ?v= search param (stays on product page)
  useEffect(() => {
    if (variants.length > 0 && !selectedVariant) {
      const vSlug = searchParams.get('v')
      const initial = vSlug ? (variants.find(v => v.slug === vSlug) ?? variants[0]) : variants[0]
      setSelectedVariant(initial)
      setSearchParams(initial.slug !== vSlug ? { v: initial.slug } : {}, { replace: true })
    }
  }, [variants]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectVariant = useCallback((v: Variant) => {
    setSelectedVariant(v)
    setSearchParams({ v: v.slug }, { replace: true })
  }, [setSearchParams])

  useEffect(() => { setActiveImg(0) }, [selectedVariant])

  // 1.22: Run GSAP only after data is fully loaded to avoid hydration/partial render bug
  useEffect(() => {
    if (isLoading || vLoading || !product || !infoRef.current) return
    const ctx = gsap.context(() => {
      fadeIn('.product-title', 0.15)
      fadeIn('.product-price', 0.28)
      fadeIn('.product-desc',  0.38)
      scrollReveal({ targets: '.char-row', container: infoRef.current!, y: 10, stagger: 0.05 })
      scrollReveal({ targets: '.variant-btn', container: infoRef.current!, y: 8, stagger: 0.04 })
    }, infoRef)
    return () => ctx.revert()
  }, [isLoading, vLoading, product])

  // 1.21: Fade edges on horizontal variant scroll
  const [variantFade, setVariantFade] = useState({ left: false, right: false })
  useEffect(() => {
    const el = variantRowRef.current
    if (!el) return
    const check = () => {
      setVariantFade({
        left:  el.scrollLeft > 8,
        right: el.scrollWidth - el.scrollLeft - el.clientWidth > 8,
      })
    }
    check()
    el.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => { el.removeEventListener('scroll', check); window.removeEventListener('resize', check) }
  }, [variants])

  const galleryMedia = selectedVariant?.images ?? []
  const galleryImages = galleryMedia.length > 0
    ? galleryMedia
    : product?.cover_url ? [{ url: product.cover_url, media_type: 'IMAGE' as const, id: 0, s3_key: '', sort_order: 0, created_at: '' }]
    : []

  // 1.2: merged characteristics for selected variant
  const mergedChars = selectedVariant ? getMergedCharacteristics(selectedVariant) : []

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
    <PageTransition data-page-wrapper>
    <div className="min-h-screen bg-ink">
      <div className="grain-overlay" aria-hidden />
      <SiteHeader />

      <div className="pt-14 flex flex-col md:flex-row min-h-screen">
        {/* ── LEFT: Gallery ─────────────────────────────────────── */}
        <div className="md:flex-[3] relative">
          {galleryImages.length > 0 ? (
            <div
              className="md:sticky md:top-14 h-[60vw] md:h-[calc(100vh-56px)] overflow-hidden cursor-zoom-in bg-ash"
              onClick={() => galleryImages[activeImg]?.media_type !== 'VIDEO' && setLightboxImg(activeImg)}
            >
              {galleryImages[activeImg]?.media_type === 'VIDEO' ? (
                <video src={galleryImages[activeImg].url} className="w-full h-full object-cover" autoPlay loop muted playsInline />
              ) : (
                <img src={galleryImages[activeImg]?.url} alt={product.title} className="w-full h-full object-cover" />
              )}
              {galleryImages.length > 1 && (
                <div className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 flex-col gap-2">
                  {galleryImages.map((item, i) => (
                    <button key={i} onClick={e => { e.stopPropagation(); setActiveImg(i) }}
                      className={cn('w-12 h-16 overflow-hidden border-2 transition-colors relative',
                        i === activeImg ? 'border-mist' : 'border-transparent opacity-60 hover:opacity-100')}>
                      <img src={item.url} alt="" className="w-full h-full object-cover" />
                      {item.media_type === 'VIDEO' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-ink/40">
                          <svg className="w-4 h-4 text-mist" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="md:sticky md:top-14 h-[60vw] md:h-[calc(100vh-56px)] bg-coal flex items-center justify-center">
              <span className="jp text-smoke text-6xl">アクザ</span>
            </div>
          )}
          {galleryImages.length > 1 && (
            <div className="flex gap-2 p-4 md:hidden overflow-x-auto scrollbar-none">
              {galleryImages.map((item, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={cn('w-14 shrink-0 overflow-hidden border-2 transition-colors relative',
                    i === activeImg ? 'border-mist' : 'border-transparent opacity-60')}
                  style={{ aspectRatio: '3/4' }}>
                  <img src={item.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Info — 1.4: overflow-y-auto to enable scroll ─ */}
        <div
          ref={infoRef}
          className="md:flex-[2] flex flex-col px-6 md:px-10 py-8 md:py-12 overflow-y-auto md:h-[calc(100vh-56px)] md:sticky md:top-14"
        >
          {/* Breadcrumb — 1.3: show selected variant name */}
          <nav className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-smoke mb-6 flex-wrap">
            <Link to={ROUTES.HOME} className="hover:text-fog transition-colors">AKZA</Link>
            <span className="text-smoke/40">/</span>
            {collectionSlug && (
              <><Link to={ROUTES.COLLECTION(collectionSlug)} className="hover:text-fog transition-colors">Коллекция</Link>
              <span className="text-smoke/40">/</span></>
            )}
            {collectionSlug && productSlug && (
              <><Link to={ROUTES.PRODUCT(collectionSlug, productSlug)} className="hover:text-fog transition-colors truncate max-w-[80px]">{product.title}</Link>
              <span className="text-smoke/40">/</span></>
            )}
            {selectedVariant && (
              <span className="text-fog truncate max-w-[100px]">{getVariantLabel(selectedVariant)}</span>
            )}
          </nav>

          {/* Title */}
          <h1 className="product-title font-display text-3xl md:text-4xl font-light text-mist leading-tight mb-2" style={{ opacity: 0 }}>
            {product.title}
          </h1>

          {/* Price — product.price_hidden overrides all; then variant.show_price decides */}
          {!product.price_hidden && (selectedVariant == null || selectedVariant.show_price) && (
            <p className="product-price font-mono text-sm text-fog mb-5" style={{ opacity: 0 }}>
              {selectedVariant?.price != null ? formatPrice(selectedVariant.price) : formatPrice(product.price)}
            </p>
          )}

          {/* Description — product.description_hidden overrides; variant.show_description decides */}
          {product.description && !product.description_hidden && (selectedVariant == null || selectedVariant.show_description) && (
            <p className="product-desc text-sm text-fog/80 font-light leading-relaxed mb-6 max-w-xs" style={{ opacity: 0 }}>
              {selectedVariant?.description ?? product.description}
            </p>
          )}

          {/* Variants — 1.21: horizontal scroll row with fade edges */}
          {variants.length > 0 && (
            <div className="mb-6">
              <p className="section-tag mb-3">
                {selectedVariant ? `Вариант: ${getVariantLabel(selectedVariant)}` : 'Выберите вариант'}
              </p>
              {/* Wrapper with fade edges */}
              <div className="relative">
                {variantFade.left && (
                  <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-ink to-transparent" />
                )}
                {variantFade.right && (
                  <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-l from-ink to-transparent" />
                )}
                {/* 1.21: flex-row, nowrap, hidden scrollbar */}
                <div ref={variantRowRef} className="flex flex-row flex-nowrap gap-2 overflow-x-auto scrollbar-none pb-1">
                  {variants.map(v => {
                    const cover = getVariantCover(v)
                    const label = getVariantLabel(v)
                    const isSelected = selectedVariant?.id === v.id
                    return (
                      <button
                        key={v.id}
                        onClick={() => handleSelectVariant(v)}
                        className={cn(
                          'variant-btn flex-shrink-0 flex items-center gap-2 h-12 pl-1 pr-4 border transition-all duration-200',
                          isSelected ? 'bg-mist/10 border-mist' : 'bg-transparent border-coal hover:border-smoke',
                        )}
                        style={{ opacity: 0 }}
                        title={label}
                      >
                        <div className="w-10 h-10 overflow-hidden shrink-0 bg-ash">
                          {cover
                            ? <img src={cover.url} alt="" className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-smoke" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                                  <rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                                </svg>
                              </div>
                          }
                        </div>
                        <span className={cn('text-xs tracking-wide max-w-[120px] truncate', isSelected ? 'text-mist' : 'text-fog')}>
                          {label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="pt-4 border-t border-coal flex flex-col gap-3">
            <Button
              variant="primary"
              className="w-full"
              disabled={variants.length > 0 && !selectedVariant}
              onClick={() => {
                if (selectedVariant) orderForm.openFor(String(selectedVariant.id), selectedVariant.slug)
                else if (variants.length === 0) orderForm.openFor(String(product.id), product.slug)
              }}
            >
              {variants.length > 0 && !selectedVariant ? 'Выберите вариант' : orderCta}
            </Button>
            <p className="text-[11px] text-center text-fog/50 tracking-wide">{orderReply}</p>
          </div>

          {/* 1.2: Merged characteristics (product + selected variant) */}
          {(isLoading || vLoading) && (
            <div className="mt-6 border-t border-coal pt-5 flex flex-col gap-2">
              <div className="h-3 w-24 bg-ash/60 rounded animate-pulse" />
              <div className="h-3 w-full bg-ash/40 rounded animate-pulse" />
              <div className="h-3 w-3/4 bg-ash/40 rounded animate-pulse" />
            </div>
          )}
          {!isLoading && !vLoading && mergedChars.length > 0 && (
            <div className="mt-6 border-t border-coal pt-5 flex flex-col gap-4">
              {mergedChars.map(group => {
                const validItems = (group.items ?? []).filter(i => i.key?.trim() && i.value?.trim())
                if (!validItems.length) return null
                return (
                  <div key={group.id}>
                    {group.name && group.name !== 'Характеристики' && (
                      <p className="section-tag mb-2 text-fog/60">{group.name}</p>
                    )}
                    <div className="flex flex-col gap-1.5">
                      {validItems.map(item => (
                        <div key={item.id} className="char-row flex justify-between py-1 border-b border-coal/50 last:border-0">
                          <span className="section-tag">{item.key}</span>
                          <span className="text-sm text-fog">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Size grid button — shows for selected variant or product */}
          {selectedVariant && selectedVariant.size_grid_mode !== 'NONE' && product.show_size_grid && selectedVariant.show_size_grid && (
            <div className="mt-4 border-t border-coal pt-4">
              <SizeGridModal
                sizeGridId={selectedVariant.size_grid_id}
                customGrid={selectedVariant.custom_size_grid}
                show={true}
              />
            </div>
          )}

          {/* Share */}
          <div className="mt-6 pt-4 border-t border-coal">
            <ShareButton title={product.title} />
          </div>
        </div>
      </div>

      {lightboxImg !== null && (
        <Lightbox images={galleryImages} index={lightboxImg} onClose={() => setLightboxImg(null)} />
      )}

      <SiteFooter />
      <OrderForm />
    </div>
    </PageTransition>
  )
})
