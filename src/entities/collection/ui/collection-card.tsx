import { Link } from 'react-router-dom'
import { cn } from '@/shared/lib/cn'
import { ROUTES } from '@/shared/config/routes'
import type { Collection } from '../types/collection.types'

interface Props { collection: Collection; index?: number; className?: string }

export function CollectionCard({ collection, index = 0, className }: Props) {
  const tall = index % 3 === 0

  return (
    <Link to={ROUTES.COLLECTION(collection.slug)} className={cn('collection-card group block', className)}>
      {/* Image */}
      <div className={cn('relative overflow-hidden bg-ash', tall ? 'aspect-[2/3]' : 'aspect-[3/4]')}>
        {collection.cover_url ? (
          <img
            src={collection.cover_url}
            alt={collection.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-coal">
            <span className="jp text-smoke text-5xl tracking-wider">アクザ</span>
          </div>
        )}
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Index number */}
        <span className="absolute top-4 left-4 font-mono text-[10px] text-fog/60 tracking-widest">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Caption */}
      <div className="mt-3 flex items-end justify-between gap-3">
        <h3 className="font-display text-lg font-light text-mist leading-tight group-hover:text-white transition-colors duration-300">
          {collection.title}
        </h3>
        <svg className="shrink-0 mb-0.5 text-smoke group-hover:text-fog transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  )
}
