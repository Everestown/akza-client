// Compatibility shim — re-exports from safe-image
export { SafeImage } from './safe-image'
export { SafeMedia } from './safe-media'

// MediaFallback used in variant-gallery
import { cn } from '@/shared/lib/cn'
interface MediaFallbackProps { type?: 'image' | 'video' | 'unknown'; className?: string }
export function MediaFallback({ type = 'image', className }: MediaFallbackProps) {
  const isVideo = type === 'video'
  return (
    <div className={cn('flex items-center justify-center bg-coal text-smoke', className)}>
      {isVideo ? (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <rect x="6" y="10" width="28" height="28" rx="3" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
          <path d="M34 19l8-5v20l-8-5V19z" fill="currentColor" fillOpacity="0.2" />
          <path d="M18 20l8 4-8 4V20z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      ) : (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <path d="M8 36l10-12 8 10 6-7 8 9H8z" fill="currentColor" fillOpacity="0.15" />
          <circle cx="32" cy="18" r="4" fill="currentColor" fillOpacity="0.25" />
          <rect x="6" y="6" width="36" height="36" rx="3" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      )}
    </div>
  )
}
