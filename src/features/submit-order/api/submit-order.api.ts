import { api } from '@/shared/api/instance'
import type { CreateOrderDTO, OrderResponse } from '../types/order.types'
export const ordersApi = {
  create: (dto: CreateOrderDTO) =>
    api.post<{ data: OrderResponse }>('/orders', dto).then(r => r.data.data),
}
