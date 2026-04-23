import type { Variant, CharGroup, SizeGridData } from '@/entities/variant/types/variant.types'

export type SizeGridMode = 'NONE' | 'TEMPLATE' | 'CUSTOM'

export interface Product {
  id: number
  collection_id: number
  category_id: number
  slug: string
  title: string
  description: string | null
  description_hidden: boolean
  characteristics: CharGroup[]
  price: number
  price_hidden: boolean
  cover_url: string | null
  sort_order: number
  is_pinned: boolean
  is_published: boolean
  size_grid_mode: SizeGridMode
  size_grid_id: number | null
  custom_size_grid: SizeGridData | null
  show_size_grid: boolean
  size_grid_propagate: boolean
  variants?: Variant[]
  created_at: string
  updated_at: string
}
