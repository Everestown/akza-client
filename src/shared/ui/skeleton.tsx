import { cn } from '@/shared/lib/cn'
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded bg-coal', className)} aria-hidden />
}
