import type { Meta, StoryObj } from '@storybook/react'
import { CollectionCard } from './collection-card'
import type { Collection } from '../types/collection.types'

const base: Collection = {
  id: '1', slug: 'spring-2026', title: 'Весенняя 2026',
  description: 'Лимитированный тираж — только 40 экземпляров',
  cover_url: null, status: 'PUBLISHED', scheduled_at: null, sort_order: 0,
  created_at: '2026-03-01T00:00:00Z', updated_at: '2026-03-01T00:00:00Z',
}

const meta: Meta = {
  title: 'entities/CollectionCard',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

export const Default:      StoryObj = { render: () => <div className="w-64"><CollectionCard collection={base} index={0} /></div> }
export const TallVariant:  StoryObj = { render: () => <div className="w-64"><CollectionCard collection={base} index={0} /></div> }
export const WideVariant:  StoryObj = { render: () => <div className="w-64"><CollectionCard collection={base} index={1} /></div> }
export const NoDescription:StoryObj = { render: () => <div className="w-64"><CollectionCard collection={{ ...base, description: null }} index={0} /></div> }
export const Scheduled:    StoryObj = {
  render: () => (
    <div className="w-64">
      <CollectionCard
        collection={{ ...base, status: 'SCHEDULED', scheduled_at: new Date(Date.now() + 86400000).toISOString() }}
        index={0}
      />
    </div>
  ),
}
export const Grid: StoryObj = {
  render: () => (
    <div className="grid grid-cols-3 gap-6" style={{ width: 720 }}>
      {Array.from({ length: 6 }, (_, i) => (
        <CollectionCard key={i} collection={{ ...base, id: String(i), title: `Коллекция ${i+1}` }} index={i} />
      ))}
    </div>
  ),
}
