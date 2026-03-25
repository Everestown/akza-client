export type CollectionStatus = 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED'

export interface Collection {
  id: number
  slug: string
  title: string
  description: string | null
  cover_url: string | null
  status: CollectionStatus
  scheduled_at: string | null
  is_pending: boolean
  sort_order: number
  created_at: string
  updated_at: string
}
