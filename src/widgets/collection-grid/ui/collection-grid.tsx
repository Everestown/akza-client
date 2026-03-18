import { useEffect, useRef } from 'react'
import { scrollRevealScale } from '@/shared/lib/gsap'
import { CollectionCard } from '@/entities/collection/ui/collection-card'
import { Skeleton } from '@/shared/ui/skeleton'
import type { Collection } from '@/entities/collection/types/collection.types'

interface Props { collections: Collection[]; isLoading?: boolean }

export function CollectionGrid({ collections, isLoading }: Props) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isLoading || !collections.length) return
    scrollRevealScale('.collection-card', gridRef.current)
  }, [isLoading, collections.length])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <Skeleton className={i % 3 === 0 ? 'aspect-[2/3]' : 'aspect-[3/4]'} />
            <Skeleton className="h-4 w-32 mt-3" />
          </div>
        ))}
      </div>
    )
  }

  if (!collections.length) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <span className="jp text-smoke text-4xl">アクザ</span>
        <p className="section-tag">Коллекции скоро появятся</p>
      </div>
    )
  }

  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
      {collections.map((c, i) => (
        <CollectionCard key={c.id} collection={c} index={i} />
      ))}
    </div>
  )
}
