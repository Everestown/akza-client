import type { Meta, StoryObj } from '@storybook/react'
import { ShareButton } from './share-button'

const meta: Meta<typeof ShareButton> = {
  title: 'features/ShareButton',
  component: ShareButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

export const Default: StoryObj = { args: { title: 'black-oversize-m' } }
