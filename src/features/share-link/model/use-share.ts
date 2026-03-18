import { useCallback } from 'react'
import { toast } from 'sonner'

export function useShare() {
  return useCallback(async (title: string, url?: string) => {
    const shareUrl = url ?? window.location.href
    if (navigator.share) {
      try { await navigator.share({ title, url: shareUrl }) } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(shareUrl)
      toast.info('Ссылка скопирована')
    }
  }, [])
}
