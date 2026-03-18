import { type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { queryClient } from '@/shared/api/query-client'
import { StoreContext } from '@/app/stores/store.context'
import { rootStore } from '@/app/stores/root.store'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StoreContext.Provider value={rootStore}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="bottom-center"
          theme="dark"
          richColors
          toastOptions={{
            style: {
              background: '#141414',
              border: '1px solid #1C1C1C',
              color: '#FAFAFA',
              fontFamily: '"Jost", system-ui, sans-serif',
              fontWeight: '300',
              fontSize: '13px',
              letterSpacing: '0.02em',
            },
          }}
        />
      </QueryClientProvider>
    </StoreContext.Provider>
  )
}
