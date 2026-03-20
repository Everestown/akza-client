import { Link } from 'react-router-dom'
import { cn } from '@/shared/lib/cn'
import { Countdown } from '@/features/countdown-timer/ui/countdown'
import type { Collection } from '../types/collection.types'

interface Props { collection: Collection; index: number }

export function CollectionCard({ collection, index }: Props) {
  // Drop-teaser: scheduled but not yet published
  const isPending = collection.is_pending || (
    collection.status === 'SCHEDULED' &&
    collection.scheduled_at != null &&
    new Date(collection.scheduled_at) > new Date()
  )

  const inner = (
    <div className="collection-card group block cursor-pointer">
      {/* Cover */}
      <div className={cn(
        'relative overflow-hidden bg-ash',
        index % 3 === 0 ? 'aspect-[2/3]' : 'aspect-[3/4]',
      )}>
        {collection.cover_url ? (
          <img
            src={collection.cover_url}
            alt={isPending ? 'Новая коллекция' : collection.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-coal">
            <span className="jp text-smoke text-3xl">アクザ</span>
          </div>
        )}

        {/* Pending overlay — covers the collection, shows teaser */}
        {isPending && (
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4 p-4">
            <span className="section-tag text-fog">Скоро</span>
            {collection.scheduled_at && (
              <Countdown targetIso={collection.scheduled_at} compact />
            )}
            <span className="font-display text-base font-light text-mist text-center">
              Новая коллекция
            </span>
          </div>
        )}

        {/* Hover overlay (published only) */}
        {!isPending && (
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
        )}
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5">
        <h3 className="font-display text-base font-light text-mist leading-snug group-hover:text-white transition-colors">
          {isPending ? 'Новая коллекция' : collection.title}
        </h3>
        {collection.description && !isPending && (
          <p className="section-tag mt-1 line-clamp-1">{collection.description}</p>
        )}
      </div>
    </div>
  )

  // Pending collections are not clickable (no navigation)
  if (isPending) return <div className="cursor-default">{inner}</div>

  return (
    <Link to={`/collections/${collection.slug}`} className="block">
      {inner}
    </Link>
  )
}
