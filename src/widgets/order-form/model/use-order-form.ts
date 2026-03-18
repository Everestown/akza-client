import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  customer_name: z.string().min(2, 'Минимум 2 символа').max(50),
  telegram_username: z
    .string()
    .min(1, 'Укажите Telegram')
    .transform((s) => s.replace(/^@/, ''))
    .pipe(z.string().regex(/^[a-zA-Z0-9_]{5,32}$/, 'Неверный формат username')),
  phone: z.string().optional(),
  comment: z.string().max(150, 'Максимум 150 символов').optional(),
})

export type OrderFormValues = z.infer<typeof schema>

export function useOrderForm() {
  return useForm<OrderFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { customer_name: '', telegram_username: '', phone: '', comment: '' },
  })
}
