import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'shared/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type S = StoryObj<typeof Input>

export const Default:   S = { args: { placeholder: 'Ваше имя...' } }
export const WithLabel: S = { args: { label: 'Имя', placeholder: 'Айша' } }
export const WithError: S = { args: { label: 'Telegram', value: 'bad user!', error: 'Неверный формат username' } }
export const Disabled:  S = { args: { label: 'Артикул', value: 'black-m', disabled: true } }
