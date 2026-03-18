import { useShare } from '../model/use-share'
import { cn } from '@/shared/lib/cn'

interface Props {
  title: string
  className?: string
}

export function ShareButton({ title, className }: Props) {
  const share = useShare()

  return (
    <button
      onClick={() => share(title)}
      className={cn(
        'flex items-center gap-2 section-tag hover:text-mist transition-colors duration-300',
        className,
      )}
      aria-label="Поделиться"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="11" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="11" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4.4 6.2L9.6 3.3M4.4 7.8L9.6 10.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      Поделиться
    </button>
  )
}
