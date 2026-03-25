export type VariantMediaType = 'IMAGE' | 'VIDEO'

export interface VariantImage {
  id: number
  url: string
  s3_key: string
  media_type: VariantMediaType
  sort_order: number
  created_at: string
}

export interface Variant {
  id: number
  product_id: number
  name: string           // display name shown on client (e.g. "Чёрный · M")
  slug: string
  attributes: Record<string, string>
  is_published: boolean
  sort_order: number
  images: VariantImage[]
  created_at: string
  updated_at: string
}

/** Returns the first IMAGE from variant gallery — used as mini-cover */
export function getVariantCover(variant: Variant): VariantImage | undefined {
  return variant.images.find(img => img.media_type === 'IMAGE')
}

/** Display label: name if set, otherwise join attribute values */
export function getVariantLabel(variant: Variant): string {
  if (variant.name?.trim()) return variant.name.trim()
  const attrs = Object.values(variant.attributes ?? {}).filter(Boolean)
  return attrs.length > 0 ? attrs.join(' · ') : variant.slug
}
