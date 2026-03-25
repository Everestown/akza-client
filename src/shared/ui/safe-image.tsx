import { useState } from 'react'
import { cn } from '@/shared/lib/cn'

interface Props {
  src: string | null | undefined
  alt: string
  className?: string
  fallbackClassName?: string
  type?: 'image' | 'video' | 'generic'
}

function ImageFallbackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="4" fill="currentColor" fillOpacity="0.06" />
      <path d="M8 36l10-12 8 10 6-7 8 9H8z" fill="currentColor" fillOpacity="0.12" />
      <circle cx="32" cy="18" r="4" fill="currentColor" fillOpacity="0.2" />
      <rect x="6" y="6" width="36" height="36" rx="3" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
    </svg>
  )
}

function VideoFallbackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="4" fill="currentColor" fillOpacity="0.06" />
      <rect x="6" y="10" width="28" height="28" rx="3" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
      <path d="M34 19l8-5v20l-8-5V19z" fill="currentColor" fillOpacity="0.15" />
      <path d="M18 20l8 4-8 4V20z" fill="currentColor" fillOpacity="0.3" />
    </svg>
  )
}

function GenericFallbackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="4" fill="currentColor" fillOpacity="0.06" />
      <rect x="12" y="8" width="24" height="32" rx="2" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
      <path d="M18 18h12M18 24h12M18 30h8" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function SafeImage({ src, alt, className, fallbackClassName, type = 'image' }: Props) {
  const [errored, setErrored] = useState(false)

  if (!src || errored) {
    const FallbackIcon = type === 'video' ? VideoFallbackIcon
      : type === 'generic' ? GenericFallbackIcon
      : ImageFallbackIcon
    return (
      <div className={cn('flex items-center justify-center bg-coal text-smoke', fallbackClassName ?? className)}>
        <FallbackIcon className="w-10 h-10" />
      </div>
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
