import { Link } from 'react-router-dom'
import { cn } from '@/shared/lib/cn'
import type { Variant } from '../types/variant.types'

interface Props { variant: Variant; collectionSlug: string; productSlug: string; isActive?: boolean }

export function VariantThumb({ variant, collectionSlug, productSlug, isActive }: Props) {
  const cover = variant.images[0]?.url
  return (
    <Link
      to={`/collections/${collectionSlug}/${productSlug}/${variant.slug}`}
      className={cn(
        'variant-thumb block w-14 h-14 overflow-hidden bg-coal border transition-colors duration-200',
        isActive ? 'border-mist/60' : 'border-transparent hover:border-smoke',
      )}
      aria-current={isActive}
    >
      {cover ? <img src={cover} alt={variant.slug} className="w-full h-full object-cover" /> : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-smoke text-[8px] font-mono">—</span>
        </div>
      )}
    </Link>
  )
}
