import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useVariant } from '@/entities/variant/model/use-variant'
import { useStore } from '@/app/stores/store.context'
import { SiteHeader } from '@/widgets/site-header/ui/site-header'
import { SiteFooter } from '@/widgets/site-footer/ui/site-footer'
import { VariantGallery } from '@/widgets/variant-gallery/ui/variant-gallery'
import { OrderForm } from '@/widgets/order-form/ui/order-form'
import { PageTransition } from '@/shared/ui/page-transition'
import { ShareButton } from '@/features/share-link/ui/share-button'
import { Button } from '@/shared/ui/button'
import { Skeleton } from '@/shared/ui/skeleton'
import { gsap, fadeIn, scrollReveal, scrollRevealX } from '@/shared/lib/gsap'
import { galleryStore } from '@/widgets/variant-gallery/model/use-gallery'
import { ROUTES } from '@/shared/config/routes'

export default observer(function VariantPage() {
  const { slug: collectionSlug, productSlug, variantSlug } = useParams<{
    slug: string; productSlug: string; variantSlug: string
  }>()
  const { data: variant, isLoading } = useVariant(variantSlug!)
  const { orderForm } = useStore()
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => { galleryStore.setActive(0) }, [variantSlug])

  useEffect(() => {
    if (isLoading || !variant) return
    const ctx = gsap.context(() => {
      // Info panel slides in from right (desktop)
      gsap.fromTo('.variant-info',
        { opacity: 0, x: 24 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.3 }
      )
      // Attributes — bidirectional
      scrollReveal({ targets: '.attr-row', container: infoRef.current!, y: 12, stagger: 0.05 })
      // CTA button
      fadeIn('.variant-cta', 0.6)
    }, infoRef)
    return () => ctx.revert()
  }, [isLoading, variant])

  if (isLoading) return (
    <div className="page-wrap">
      <SiteHeader />
      <div className="pt-24 px-6 md:px-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="space-y-2">
          <Skeleton className="aspect-[3/4]" />
          <div className="flex gap-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="w-14 h-14" />)}</div>
        </div>
        <div className="flex flex-col gap-4 pt-4">
          <Skeleton className="h-6 w-32" /><Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-24" /><Skeleton className="h-12 w-full mt-6" />
        </div>
      </div>
    </div>
  )

  if (!variant) return (
    <div className="page-wrap flex items-center justify-center min-h-screen">
      <SiteHeader />
      <div className="text-center">
        <p className="jp text-smoke text-4xl mb-4">アクザ</p>
        <p className="section-tag">Вариант не найден</p>
        <Link to={ROUTES.HOME} className="section-tag hover:text-mist mt-6 inline-block transition-colors">← Назад</Link>
      </div>
    </div>
  )

  return (
    <PageTransition data-page-wrapper>
    <div className="page-wrap bg-ink">
      <div className="grain-overlay" aria-hidden />
      <SiteHeader />

      <main className="pt-20 pb-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-[10px] tracking-widest uppercase text-smoke flex-wrap">
            <Link to={ROUTES.HOME} className="hover:text-fog transition-colors">AKZA</Link>
            <span>/</span>
            {collectionSlug && (
              <><Link to={ROUTES.COLLECTION(collectionSlug)} className="hover:text-fog transition-colors">Коллекция</Link><span>/</span></>
            )}
            {collectionSlug && productSlug && (
              <><Link to={ROUTES.PRODUCT(collectionSlug, productSlug)} className="hover:text-fog transition-colors">Изделие</Link><span>/</span></>
            )}
            <span className="text-fog font-mono">{variant.slug}</span>
          </nav>

          <div className="grid md:grid-cols-[1fr_380px] gap-10 md:gap-14 items-start">
            {/* Gallery */}
            <VariantGallery images={variant.images} />

            {/* Info panel */}
            <div ref={infoRef} className="variant-info flex flex-col gap-6 md:sticky md:top-24" style={{ opacity: 0 }}>
              <div>
                <p className="section-tag mb-1">Артикул</p>
                <p className="font-mono text-sm text-fog">{variant.slug}</p>
              </div>

              {/* Attributes — bidirectional */}
              {Object.keys(variant.attributes ?? {}).length > 0 && (
                <div className="border-t border-coal pt-5">
                  <p className="section-tag mb-3">Атрибуты</p>
                  <div className="flex flex-col gap-2.5">
                    {Object.entries(variant.attributes).map(([k, v]) => (
                      <div key={k} className="attr-row flex justify-between" style={{ opacity: 0 }}>
                        <span className="section-tag">{k}</span>
                        <span className="text-sm text-fog">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {variant.images.length > 0 && (
                <div className="border-t border-coal pt-5">
                  <p className="section-tag">{variant.images.length} фотографий</p>
                </div>
              )}

              {/* CTA */}
              <div className="variant-cta border-t border-coal pt-6 flex flex-col gap-3" style={{ opacity: 0 }}>
                <Button
                  variant="primary"
                  className="w-full hover:bg-red active:bg-red"
                  onClick={() => orderForm.openFor(variant.id, variant.slug)}
                >
                  Оставить заявку
                </Button>
                <p className="section-tag text-center text-fog/50">
                  В скором времени ответим в Telegram
                </p>
              </div>

              <div className="border-t border-coal pt-4">
                <ShareButton title={variant.slug} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <OrderForm />
    </div></PageTransition>
  )
})
