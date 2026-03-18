import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import { SiteHeader } from './site-header'

const meta: Meta = {
  title: 'widgets/SiteHeader',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <MemoryRouter><div className="bg-ink min-h-[200px]"><S /></div></MemoryRouter>],
}
export default meta

export const Default: StoryObj = { render: () => <SiteHeader /> }
