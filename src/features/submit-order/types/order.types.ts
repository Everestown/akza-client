export interface CreateOrderDTO {
  variant_id: string
  customer_name: string
  telegram_username: string
  phone?: string
  comment?: string
}
export interface OrderResponse {
  id: string; variant_id: string; customer_name: string
  telegram_username: string; status: string; created_at: string
}
