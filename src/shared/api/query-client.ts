import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // CMS content refreshes every 60 seconds per requirements
      staleTime: 1000 * 60,
      refetchInterval: 1000 * 60,
      retry: (n, err) => {
        const s = (err as { response?: { status?: number } }).response?.status
        if (s && s >= 400 && s < 500) return false
        return n < 2
      },
      refetchOnWindowFocus: true,
    },
  },
})
