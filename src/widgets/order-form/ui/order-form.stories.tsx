import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import React, { useEffect } from 'react'
import { OrderForm } from './order-form'
import { rootStore } from '@/app/stores/root.store'
import { StoreContext } from '@/app/stores/store.context'

const WithStore = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <StoreContext.Provider value={rootStore}>
      {children}
    </StoreContext.Provider>
  </MemoryRouter>
)

const meta: Meta = {
  title: 'widgets/OrderForm',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

export const Closed: StoryObj = {
  render: () => {
    rootStore.orderForm.close()
    return (
      <WithStore>
        <div className="p-8">
          <p className="text-fog text-sm">Форма закрыта. Нажмите «Открыть» чтобы увидеть диалог.</p>
          <button
            className="mt-4 px-6 py-2 text-[11px] tracking-widest uppercase text-mist border border-smoke hover:border-fog transition-colors"
            onClick={() => rootStore.orderForm.openFor('v1', 'black-oversize-l')}
          >
            Открыть форму
          </button>
          <OrderForm />
        </div>
      </WithStore>
    )
  },
}

export const Open: StoryObj = {
  render: () => {
    function OpenForm() {
      useEffect(() => {
        rootStore.orderForm.openFor('variant-id-1', 'black-oversize-001')
      }, [])
      return <OrderForm />
    }
    return <WithStore><div className="min-h-screen"><OpenForm /></div></WithStore>
  },
}
