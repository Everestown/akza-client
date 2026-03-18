import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { CollectionHero } from './collection-hero'
import type { Collection } from '@/entities/collection/types/collection.types'

const collection: Collection = {
  id: '1', slug: 'spring-2026', title: 'Весенняя коллекция 2026',
  description: 'Японская философия ваби-саби в современной моде. Лимитированный тираж.',
  cover_url: null, status: 'PUBLISHED', scheduled_at: null, sort_order: 0,
  created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z',
}

const meta: Meta = {
  title: 'widgets/CollectionHero',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

export const Default:      StoryObj = { render: () => <CollectionHero collection={collection} /> }
export const LongTitle:    StoryObj = { render: () => <CollectionHero collection={{ ...collection, title: 'Осень-Зима 2026 — Ваби-Саби' }} /> }
export const Scheduled:    StoryObj = {
  render: () => (
    <CollectionHero
      collection={{ ...collection, status: 'SCHEDULED', scheduled_at: new Date(Date.now() + 2 * 86400000).toISOString() }}
    />
  ),
}
