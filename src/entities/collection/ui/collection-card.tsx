import { Link } from 'react-router-dom'
import TransitionLink from '@/shared/ui/transition-link'
import { cn } from '@/shared/lib/cn'
import { Countdown } from '@/features/countdown-timer/ui/countdown'
import { SafeImage } from '@/shared/ui/safe-media'
import { useDictionaryValue } from '@/entities/site-page/model/use-site'
import type { Collection } from '../types/collection.types'

interface Props { collection: Collection; index: number }

export function CollectionCard({ collection, index }: Props) {
  const dropSoon  = useDictionaryValue('drop_soon',  'Скоро')
  const dropNew   = useDictionaryValue('drop_new',   'Новая коллекция')

  const isPending = collection.is_pending || (
    collection.status === 'SCHEDULED' &&
    collection.scheduled_at != null &&
    new Date(collection.scheduled_at) > new Date()
  )

  const inner = (
    <div className="collection-card group block cursor-pointer">
      <div className={cn(
        'relative overflow-hidden bg-ash',
        index % 3 === 0 ? 'aspect-[2/3]' : 'aspect-[3/4]',
      )}>
        <SafeImage
          src={collection.cover_url}
          alt={isPending ? dropNew : collection.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          fallbackClassName="w-full h-full"
          loading="lazy"
        />

        {isPending && (
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4 p-4">
            <span className="section-tag text-fog">{dropSoon}</span>
            {collection.scheduled_at && <Countdown targetIso={collection.scheduled_at} compact />}
            <span className="font-display text-base font-light text-mist text-center">{dropNew}</span>
          </div>
        )}
        {!isPending && (
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
        )}
      </div>

      <div className="mt-3 px-0.5">
        <h3 className="font-display text-base font-light text-mist leading-snug group-hover:text-white transition-colors">
          {isPending ? dropNew : collection.title}
        </h3>
        {collection.description && !isPending && (
          <p className="section-tag mt-1 line-clamp-1">{collection.description}</p>
        )}
      </div>
    </div>
  )

  if (isPending) return <div className="cursor-default">{inner}</div>
  return <TransitionLink to={`/collections/${collection.slug}`} className="block">{inner}</TransitionLink>
}
