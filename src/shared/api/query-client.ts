import { QueryClient } from '@tanstack/react-query'
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: (n, err) => {
        const s = (err as { response?: { status?: number } }).response?.status
        if (s && s >= 400 && s < 500) return false
        return n < 2
      },
      refetchOnWindowFocus: false,
    },
  },
})
