import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import { VariantThumb } from './variant-thumb'
import type { Variant } from '../types/variant.types'

const base: Variant = {
  id: 'v1', product_id: 'p1', slug: 'black-m',
  attributes: { Цвет: 'Чёрный', Размер: 'M' },
  is_published: true, sort_order: 0, images: [],
  created_at: '2026-03-01T00:00:00Z', updated_at: '2026-03-01T00:00:00Z',
}

const meta: Meta = {
  title: 'entities/VariantThumb',
  tags: ['autodocs'],
  decorators: [(S) => <MemoryRouter><S /></MemoryRouter>],
  parameters: { layout: 'centered' },
}
export default meta

export const Default: StoryObj = {
  render: () => <VariantThumb variant={base} collectionSlug="spring-2026" productSlug="oversize-shirt" />,
}
export const Active: StoryObj = {
  render: () => <VariantThumb variant={base} collectionSlug="spring-2026" productSlug="oversize-shirt" isActive />,
}
export const Group: StoryObj = {
  render: () => (
    <div className="flex gap-2">
      {['black-m','black-l','white-m','white-l'].map((slug, i) => (
        <VariantThumb
          key={slug}
          variant={{ ...base, id: slug, slug }}
          collectionSlug="spring-2026"
          productSlug="oversize-shirt"
          isActive={i === 0}
        />
      ))}
    </div>
  ),
}
