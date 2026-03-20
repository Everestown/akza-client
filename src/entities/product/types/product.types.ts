import type { Variant } from '@/entities/variant/types/variant.types'

export interface Product {
  id: string
  collection_id: string
  slug: string
  title: string
  description: string | null
  characteristics: Record<string, string>
  price: number
  price_hidden: boolean
  cover_url: string | null
  sort_order: number
  is_published: boolean
  variants?: Variant[]
  created_at: string
  updated_at: string
}
