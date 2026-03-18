import { cn } from '@/shared/lib/cn'
interface Props { size?: 'sm'|'md'|'lg'; className?: string }
const sizes = { sm:'h-4 w-4', md:'h-6 w-6', lg:'h-10 w-10' }
export function Spinner({ size='md', className }: Props) {
  return (
    <svg className={cn('animate-spin text-fog', sizes[size], className)} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"/>
    </svg>
  )
}
