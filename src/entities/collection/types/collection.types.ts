export type CollectionStatus = 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED'

export interface Collection {
  id: string
  slug: string
  title: string
  description: string | null
  cover_url: string | null
  status: CollectionStatus
  scheduled_at: string | null
  is_pending: boolean  // true = SCHEDULED and time not yet reached
  sort_order: number
  created_at: string
  updated_at: string
}
