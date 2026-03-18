import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from './dialog'
import { Button } from './button'
import { Input } from './input'

const meta: Meta = { title: 'shared/Dialog', tags: ['autodocs'] }
export default meta

function DialogDemo({ title = 'Диалог' }: { title?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Открыть диалог</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>{title}</DialogTitle>
          <div className="flex flex-col gap-4">
            <Input label="Имя" placeholder="Айша" />
            <Input label="Telegram" placeholder="@username" />
            <div className="flex gap-3 pt-2">
              <Button className="flex-1">Отправить</Button>
              <Button variant="ghost" onClick={() => setOpen(false)}>Отмена</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export const Default:    StoryObj = { render: () => <DialogDemo /> }
export const OrderForm:  StoryObj = { render: () => <DialogDemo title="Оформить заявку" /> }
