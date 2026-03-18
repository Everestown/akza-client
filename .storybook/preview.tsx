import type { Preview, Decorator } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import '../src/app/styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, staleTime: Infinity }, mutations: { retry: false } },
})

const GlobalDecorator: Decorator = (Story) => (
  <MemoryRouter>
    <QueryClientProvider client={queryClient}>
      <div className="bg-ink min-h-screen p-6">
        <Story />
      </div>
    </QueryClientProvider>
  </MemoryRouter>
)

const preview: Preview = {
  decorators: [GlobalDecorator],
  parameters: {
    backgrounds: {
      default: 'ink',
      values: [
        { name: 'ink',  value: '#0A0A0A' },
        { name: 'ash',  value: '#141414' },
        { name: 'mist', value: '#FAFAFA' },
      ],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { matchers: { color: /(background|color)$/i } },
    layout: 'padded',
  },
}

export default preview
