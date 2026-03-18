import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Skeleton } from './skeleton'

const meta: Meta = { title: 'shared/Skeleton', tags: ['autodocs'] }
export default meta

export const Text: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
}
export const Card: StoryObj = {
  render: () => (
    <div className="w-56 space-y-3">
      <Skeleton className="aspect-[3/4]" />
      <Skeleton className="h-4 w-36" />
      <Skeleton className="h-3 w-20" />
    </div>
  ),
}
export const Gallery: StoryObj = {
  render: () => (
    <div className="grid grid-cols-3 gap-3 w-80">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square" />
      ))}
    </div>
  ),
}
