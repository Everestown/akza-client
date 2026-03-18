import type { Meta, StoryObj } from '@storybook/react'
import { Countdown } from './countdown'

const future  = new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString()
const nearFut = new Date(Date.now() +     2 * 3600 * 1000).toISOString()
const soon    = new Date(Date.now() +          300 * 1000).toISOString()

const meta: Meta<typeof Countdown> = {
  title: 'features/Countdown',
  component: Countdown,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

export const TwoDays:  StoryObj = { args: { targetIso: future  }, name: '2 days ahead' }
export const TwoHours: StoryObj = { args: { targetIso: nearFut }, name: '2 hours ahead' }
export const FiveMins: StoryObj = { args: { targetIso: soon    }, name: '5 minutes ahead' }
