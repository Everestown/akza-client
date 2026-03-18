import { api } from '@/shared/api/instance'
import type { Product } from '../types/product.types'
import type { Variant } from '@/entities/variant/types/variant.types'

export const productsApi = {
  getBySlug: (slug: string) =>
    api.get<{ data: Product & { variants?: Variant[] } }>(`/products/${slug}`).then(r => r.data.data),
}
