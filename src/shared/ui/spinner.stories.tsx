import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Spinner } from './spinner'

const meta: Meta<typeof Spinner> = {
  title: 'shared/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

export const Small:  StoryObj = { args: { size: 'sm' } }
export const Medium: StoryObj = { args: { size: 'md' } }
export const Large:  StoryObj = { args: { size: 'lg' } }
export const AllSizes: StoryObj = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
}
