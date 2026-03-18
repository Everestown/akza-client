import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ordersApi } from '../api/submit-order.api'
import { useStore } from '@/app/stores/store.context'
import type { CreateOrderDTO } from '../types/order.types'

export function useSubmitOrder() {
  const { orderForm } = useStore()
  return useMutation({
    mutationFn: (dto: CreateOrderDTO) => ordersApi.create(dto),
    onMutate: () => orderForm.setSubmitting(true),
    onSuccess: () => {
      orderForm.close()
      toast.success('Заявка отправлена', { description: 'Мы напишем вам в Telegram в ближайшее время' })
    },
    onError: () => {
      toast.error('Не удалось отправить заявку', { description: 'Попробуйте ещё раз или напишите нам напрямую' })
    },
    onSettled: () => orderForm.setSubmitting(false),
  })
}
