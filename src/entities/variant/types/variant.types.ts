export type VariantMediaType = 'IMAGE' | 'VIDEO'

export interface VariantImage {
  id: number
  url: string
  s3_key: string
  media_type: VariantMediaType
  sort_order: number
  created_at: string
}

// Sprint 4: characteristics groups
export interface CharItem {
  id: string
  key: string
  value: string
  sort: number
}

export interface CharGroup {
  id: string
  name: string
  sort: number
  items: CharItem[]
}

export interface Variant {
  id: number
  product_id: number
  name: string
  slug: string
  attributes: Record<string, string>
  characteristics: CharGroup[]
  product_characteristics: CharGroup[]  // from API: product's chars (preloaded for public endpoint)
  is_published: boolean
  sort_order: number
  images: VariantImage[]
  // Sprint 3: own price/description (null = inherit from product)
  price: number | null
  price_hidden: boolean | null
  description: string | null
  size_grid_id: number | null
  show_price: boolean
  show_description: boolean
  show_size_grid: boolean
  created_at: string
  updated_at: string
}

export function getVariantCover(variant: Variant): VariantImage | undefined {
  return variant.images.find(img => img.media_type === 'IMAGE')
}

export function getVariantLabel(variant: Variant): string {
  if (variant.name?.trim()) return variant.name.trim()
  const attrs = Object.values(variant.attributes ?? {}).filter(Boolean)
  return attrs.length > 0 ? attrs.join(' · ') : variant.slug
}

/** Effective price — own price or inherited from product */
export function getEffectivePrice(variant: Variant, productPrice: number): number {
  return variant.price ?? productPrice
}

/** Effective price_hidden */
export function getEffectivePriceHidden(variant: Variant, productHidden: boolean): boolean {
  return variant.price_hidden ?? productHidden
}

/** Merge product+variant characteristics: product groups first, then variant groups */
export function getMergedCharacteristics(variant: Variant): CharGroup[] {
  const productChars = variant.product_characteristics ?? []
  const variantChars = variant.characteristics ?? []
  return [...productChars, ...variantChars]
}
