import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProduct } from '@/entities/product/model/use-product'
import { SiteHeader } from '@/widgets/site-header/ui/site-header'
import { SiteFooter } from '@/widgets/site-footer/ui/site-footer'
import { OrderForm } from '@/widgets/order-form/ui/order-form'
import { VariantThumb } from '@/entities/variant/ui/variant-thumb'
import { Skeleton } from '@/shared/ui/skeleton'
import { formatPrice } from '@/shared/lib/format'
import { gsap, fadeIn, scrollReveal, scrollRevealX, curtainReveal } from '@/shared/lib/gsap'
import { ROUTES } from '@/shared/config/routes'

export default function ProductPage() {
  const { slug: collectionSlug, productSlug } = useParams<{ slug: string; productSlug: string }>()
  const { data: product, isLoading } = useProduct(productSlug!)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isLoading || !product) return
    const ctx = gsap.context(() => {
      // Image: curtain reveal (entrance only — dramatic)
      curtainReveal('.product-image-wrap', 0.1)
      // Title, price — fade-in with slight delay
      fadeIn('.product-title', 0.4)
      fadeIn('.product-price', 0.55)
      fadeIn('.product-desc',  0.65)
      // Variant thumbs — horizontal stagger from left, bidirectional
      scrollRevealX({ targets: '.variant-thumb', container: contentRef.current!, stagger: 0.07 })
      // Characteristics — bidirectional stagger
      scrollReveal({ targets: '.product-char', container: contentRef.current!, y: 16, stagger: 0.06 })
    }, contentRef)
    return () => ctx.revert()
  }, [isLoading, product])

  if (isLoading) return (
    <div className="page-wrap">
      <SiteHeader />
      <div className="pt-24 px-6 md:px-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        <Skeleton className="aspect-[3/4]" />
        <div className="flex flex-col gap-4 pt-4">
          <Skeleton className="h-8 w-64" /><Skeleton className="h-4 w-24" /><Skeleton className="h-20 w-full mt-4" />
        </div>
      </div>
    </div>
  )

  if (!product) return (
    <div className="page-wrap flex items-center justify-center min-h-screen">
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
            <span className="text-fog">{product.title}</span>
          </nav>

          <div ref={contentRef} className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Image */}
            <div ref={imageRef} className="product-image-wrap relative overflow-hidden bg-ash aspect-[3/4]" style={{ clipPath: 'inset(100% 0 0 0)' }}>
              {product.cover_url
                ? <img src={product.cover_url} alt={product.title} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center"><span className="jp text-smoke text-5xl">アクザ</span></div>
              }
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between py-2">
              <div>
                <p className="section-tag mb-2">Арт. {product.slug}</p>
                <h1 className="product-title font-display text-3xl md:text-4xl font-light text-mist leading-tight mb-3" style={{ opacity: 0 }}>
                  {product.title}
                </h1>
                {!product.price_hidden && (
                  <p className="product-price font-mono text-sm text-fog mb-6" style={{ opacity: 0 }}>
                    {formatPrice(product.price)}
                  </p>
                )}
                {product.description && (
                  <p className="product-desc text-sm text-fog/80 font-light leading-relaxed mb-8 max-w-sm" style={{ opacity: 0 }}>
                    {product.description}
                  </p>
                )}

                {/* Variants */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mb-8">
                    <p className="section-tag mb-3">Выберите вариант</p>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v) => (
                        <VariantThumb
                          key={v.id}
                          variant={v}
                          collectionSlug={collectionSlug ?? ''}
                          productSlug={productSlug ?? ''}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Characteristics — bidirectional */}
                {Object.keys(product.characteristics ?? {}).length > 0 && (
                  <div className="border-t border-coal pt-6">
                    <p className="section-tag mb-4">Характеристики</p>
                    <div className="flex flex-col gap-2.5">
                      {Object.entries(product.characteristics).map(([k, v]) => (
                        <div key={k} className="product-char flex justify-between" style={{ opacity: 0 }}>
                          <span className="section-tag">{k}</span>
                          <span className="text-sm text-fog">{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <p className="section-tag text-fog/50">Выберите вариант для оформления заявки →</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <OrderForm />
    </div>
  )
}
