import { api } from '@/shared/api/instance'
import type { Variant } from '../types/variant.types'

export const variantsApi = {
  getBySlug: (slug: string) =>
    api.get<{ data: Variant }>(`/variants/${slug}`).then(r => r.data.data),

  getByProductSlug: (productSlug: string) =>
    api.get<{ data: Variant[] }>(`/products/${productSlug}/variants`).then(r => r.data.data ?? []),
}
