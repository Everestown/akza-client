import * as React from 'react'
import { cn } from '@/shared/lib/cn'
type Variant = 'primary'|'ghost'|'outline'
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant; loading?: boolean
}
const V: Record<Variant,string> = {
  primary: 'bg-mist text-ink hover:bg-white active:scale-[0.98] font-body font-normal tracking-widest text-[11px]',
  ghost:   'text-fog hover:text-mist border-b border-transparent hover:border-fog font-body font-light text-xs tracking-widest',
  outline: 'border border-smoke text-fog hover:border-fog hover:text-mist font-body font-light text-xs tracking-widest',
}
export const Button = React.forwardRef<HTMLButtonElement,Props>(
  ({ className, variant='primary', loading, disabled, children, ...p }, ref) => (
    <button ref={ref} disabled={disabled||loading}
      className={cn('inline-flex items-center justify-center gap-2 uppercase transition-all duration-300',
        'px-6 py-3 disabled:opacity-40 disabled:cursor-not-allowed', V[variant], className)} {...p}>
      {loading
        ? <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"/></svg>
        : children}
    </button>
  )
)
Button.displayName = 'Button'
