import { api } from '@/shared/api/instance'
import type { Collection } from '../types/collection.types'
import type { Product } from '@/entities/product/types/product.types'

export const collectionsApi = {
  list: (params?: { cursor?: string; limit?: number }) =>
    api.get<{ data: Collection[]; meta: { cursor: string; has_more: boolean } }>('/collections', { params }).then(r => r.data),

  getBySlug: (slug: string) =>
    api.get<{ data: Collection }>(`/collections/${slug}`).then(r => r.data.data),

  getProducts: (slug: string) =>
    api.get<{ data: Product[] }>(`/collections/${slug}/products`).then(r => r.data.data ?? []),
}
