import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import { ProductCard } from './product-card'
import type { Product } from '../types/product.types'

const base: Product = {
  id: 'p1', collection_id: 'c1', slug: 'oversize-shirt',
  title: 'Оверсайз рубашка', description: 'Японский хлопок',
  characteristics: { Материал: 'Хлопок 100%', Крой: 'Оверсайз' },
  price: 8900, price_hidden: false, cover_url: null,
  sort_order: 0, is_published: true,
  created_at: '2026-03-01T00:00:00Z', updated_at: '2026-03-01T00:00:00Z',
}

const meta: Meta = {
  title: 'entities/ProductCard',
  tags: ['autodocs'],
  decorators: [(S) => <MemoryRouter><S /></MemoryRouter>],
}
export default meta

export const Default: StoryObj = {
  render: () => <div className="w-56"><ProductCard product={base} collectionSlug="spring-2026" /></div>,
}
export const NoCover: StoryObj = {
  render: () => <div className="w-56"><ProductCard product={{ ...base, cover_url: null }} collectionSlug="spring-2026" /></div>,
}
export const Grid: StoryObj = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 w-[720px]">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCard key={i} product={{ ...base, id: String(i), title: `Изделие ${i + 1}` }} collectionSlug="spring-2026" />
      ))}
    </div>
  ),
}
