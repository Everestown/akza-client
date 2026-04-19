import type { Variant, CharGroup } from '@/entities/variant/types/variant.types'

export interface Product {
  id: number
  collection_id: number
  slug: string
  title: string
  description: string | null
  characteristics: CharGroup[]
  price: number
  price_hidden: boolean
  cover_url: string | null
  sort_order: number
  is_pinned: boolean
  is_published: boolean
  variants?: Variant[]
  created_at: string
  updated_at: string
}
