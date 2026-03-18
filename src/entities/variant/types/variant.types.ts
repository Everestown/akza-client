export interface VariantImage {
  id: string; url: string; s3_key: string; sort_order: number; created_at: string
}
export interface Variant {
  id: string; product_id: string; slug: string
  attributes: Record<string, string>; is_published: boolean
  sort_order: number; images: VariantImage[]
  created_at: string; updated_at: string
}
