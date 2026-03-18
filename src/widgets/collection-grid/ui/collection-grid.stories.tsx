import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import { CollectionGrid } from './collection-grid'
import type { Collection } from '@/entities/collection/types/collection.types'

const cols: Collection[] = Array.from({ length: 6 }, (_, i) => ({
  id: String(i), slug: `collection-${i}`, title: `Коллекция ${i + 1}`,
  description: 'Лимитированный тираж', cover_url: null,
  status: i === 2 ? 'SCHEDULED' : 'PUBLISHED' as const,
  scheduled_at: null, sort_order: i,
  created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z',
}))

const meta: Meta = {
  title: 'widgets/CollectionGrid',
  tags: ['autodocs'],
  decorators: [(S) => <MemoryRouter><S /></MemoryRouter>],
}
export default meta

export const Loaded:  StoryObj = { render: () => <CollectionGrid collections={cols} /> }
export const Loading: StoryObj = { render: () => <CollectionGrid collections={[]} isLoading /> }
export const Empty:   StoryObj = { render: () => <CollectionGrid collections={[]} /> }
export const Single:  StoryObj = { render: () => <CollectionGrid collections={[cols[0]!]} /> }
