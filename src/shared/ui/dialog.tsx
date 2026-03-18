import * as React from 'react'
import { cn } from '@/shared/lib/cn'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

function DialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('relative z-10 w-full sm:max-w-md bg-ash border-t border-coal mx-auto p-8', className)}>
      {children}
    </div>
  )
}

function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl font-light text-mist mb-6">{children}</h2>
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
  React.useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onOpenChange(false) }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-ink/90 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      {children}
    </div>
  )
}

export { Dialog, DialogContent, DialogTitle }
