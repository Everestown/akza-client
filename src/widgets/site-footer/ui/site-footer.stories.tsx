import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import { SiteFooter } from './site-footer'

const meta: Meta = {
  title: 'widgets/SiteFooter',
  tags: ['autodocs'],
  decorators: [(S) => <MemoryRouter><div className="bg-ink min-h-screen"><S /></div></MemoryRouter>],
}
export default meta

export const Default: StoryObj = { render: () => <SiteFooter /> }
