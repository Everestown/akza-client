import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: { variant: { control: 'select', options: ['primary','ghost','outline','icon'] } },
}
export default meta
type S = StoryObj<typeof Button>

export const Primary:   S = { args: { children: 'Оставить заявку',   variant: 'primary'  } }
export const Ghost:     S = { args: { children: 'Подробнее →',        variant: 'ghost'   } }
export const Outline:   S = { args: { children: 'Поделиться',         variant: 'outline' } }
export const Loading:   S = { args: { children: 'Отправка...',        loading: true      } }
export const Disabled:  S = { args: { children: 'Недоступно',         disabled: true     } }
export const All: StoryObj = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary">Заявка</Button>
      <Button variant="ghost">Подробнее</Button>
      <Button variant="outline">Поделиться</Button>
      <Button loading>Загрузка</Button>
      <Button disabled>Закрыто</Button>
    </div>
  ),
}
