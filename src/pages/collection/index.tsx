import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCollection, useCollectionProducts } from '@/entities/collection/model/use-collections'
import { SiteHeader } from '@/widgets/site-header/ui/site-header'
import { SiteFooter } from '@/widgets/site-footer/ui/site-footer'
import { CollectionHero } from '@/widgets/collection-hero/ui/collection-hero'
import { OrderForm } from '@/widgets/order-form/ui/order-form'
import { Countdown } from '@/features/countdown-timer/ui/countdown'
import { ProductCard } from '@/entities/product/ui/product-card'
import { Skeleton } from '@/shared/ui/skeleton'
import { scrollReveal, scrollRevealScale } from '@/shared/lib/gsap'
import { ROUTES } from '@/shared/config/routes'

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: collection, isLoading: colLoading } = useCollection(slug!)
  const { data: products,   isLoading: productsLoading } = useCollectionProducts(slug!)
  const gridRef     = useRef<HTMLDivElement>(null)
  const countdownRef = useRef<HTMLDivElement>(null)

  // Product cards — bidirectional stagger
  useEffect(() => {
    if (productsLoading || !products?.length) return
    scrollRevealScale('.product-card', gridRef.current)
  }, [productsLoading, products])

  // Countdown section — bidirectional
  useEffect(() => {
    if (!countdownRef.current) return
    scrollReveal({ targets: '.countdown-inner', container: countdownRef.current, y: 32 })
  }, [collection])

  if (colLoading) return (
    <div className="page-wrap"><SiteHeader /><Skeleton className="h-[92vh] w-full" /></div>
  )

  if (!collection) return (
    <div className="page-wrap flex items-center justify-center min-h-screen">
      <SiteHeader />
      <div className="text-center">
        <p className="jp text-smoke text-4xl mb-4">アクザ</p>
        <p className="section-tag">Коллекция не найдена</p>
        <Link to={ROUTES.HOME} className="section-tag hover:text-mist mt-6 inline-block transition-colors">← Назад</Link>
      </div>
    </div>
  )

  const isScheduled = collection.status === 'SCHEDULED'

  return (
    <div className="page-wrap bg-ink">
      <div className="grain-overlay" aria-hidden />
      <SiteHeader />

      <CollectionHero collection={collection} />

      {/* Drop countdown */}
      {isScheduled && collection.scheduled_at && (
        <section ref={countdownRef} className="py-16 px-6 md:px-10 border-b border-coal">
          <div className="countdown-inner max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8" style={{ opacity: 0 }}>
            <div>
              <span className="section-tag block mb-2">Дроп открывается через</span>
              <p className="font-display text-sm font-light text-fog">Только лимитированный тираж</p>
            </div>
            <Countdown targetIso={collection.scheduled_at} />
          </div>
        </section>
      )}

      {/* Products */}
      <section className="px-6 md:px-10 py-16 max-w-6xl mx-auto">
        <div className="ruled mb-10 flex items-center justify-between">
          <span className="section-tag py-4">Изделия коллекции</span>
          {!productsLoading && (
            <span className="font-mono text-[10px] text-smoke">{String((products ?? []).length).padStart(2, '0')}</span>
          )}
        </div>

        {productsLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}><Skeleton className="aspect-[3/4]" /><Skeleton className="h-4 w-28 mt-3" /><Skeleton className="h-3 w-16 mt-1" /></div>
            ))}
          </div>
        ) : !products?.length ? (
          <div className="flex flex-col items-center py-24 gap-3">
            <span className="jp text-smoke text-3xl">アクザ</span>
            <p className="section-tag">Изделия появятся скоро</p>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} collectionSlug={slug!} />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
      <OrderForm />
    </div>
  )
}
