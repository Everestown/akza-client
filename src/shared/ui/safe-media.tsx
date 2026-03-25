// Re-exports from safe-image for backward compat
export { SafeImage } from './safe-image'

import { useState } from 'react'
import { cn } from '@/shared/lib/cn'

interface SafeMediaProps {
  src: string | null | undefined
  type?: 'image' | 'video'
  alt?: string
  className?: string
  videoClassName?: string
}

export function SafeMedia({ src, type = 'image', alt = '', className, videoClassName }: SafeMediaProps) {
  const [errored, setErrored] = useState(false)

  if (!src || errored) {
    const isVideo = type === 'video'
    return (
      <div className={cn('flex items-center justify-center bg-coal text-smoke', className)}>
        {isVideo ? (
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
            <rect x="6" y="10" width="28" height="28" rx="3" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
            <path d="M34 19l8-5v20l-8-5V19z" fill="currentColor" fillOpacity="0.2" />
            <path d="M18 20l8 4-8 4V20z" fill="currentColor" fillOpacity="0.4" />
          </svg>
        ) : (
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
            <path d="M8 36l10-12 8 10 6-7 8 9H8z" fill="currentColor" fillOpacity="0.15" />
            <circle cx="32" cy="18" r="4" fill="currentColor" fillOpacity="0.25" />
            <rect x="6" y="6" width="36" height="36" rx="3" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
          </svg>
        )}
      </div>
    )
  }

  if (type === 'video') {
    return (
      <video
        src={src}
        className={cn(className, videoClassName)}
        autoPlay
        muted
        loop
        playsInline
        onError={() => setErrored(true)}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
      loading="lazy"
    />
  )
}
