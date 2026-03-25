import { Link } from 'react-router-dom'
import TransitionLink from '@/shared/ui/transition-link'
import { cn } from '@/shared/lib/cn'
import { SafeImage } from '@/shared/ui/safe-image'
import { formatPrice } from '@/shared/lib/format'
import type { Product } from '../types/product.types'

interface Props { product: Product; collectionSlug: string; className?: string }

export function ProductCard({ product, collectionSlug, className }: Props) {
  return (
    <TransitionLink to={`/collections/${collectionSlug}/${product.slug}`} className={cn('product-card group block', className)}>
      <div className="relative overflow-hidden bg-ash aspect-[3/4]">
        <SafeImage
          src={product.cover_url}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          fallbackClassName="w-full h-full"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
      </div>
      <div className="mt-3">
        <h3 className="font-display text-base font-light text-mist leading-snug group-hover:text-white transition-colors">
          {product.title}
        </h3>
        {!product.price_hidden && (
          <p className="section-tag mt-1">{formatPrice(product.price)}</p>
        )}
      </div>
    </TransitionLink>
  )
}
