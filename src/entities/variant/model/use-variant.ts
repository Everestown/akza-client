import { useQuery } from '@tanstack/react-query'
import { variantsApi } from '../api/variants.api'
import { variantKeys } from '@/shared/lib/query-keys'

export function useVariant(slug: string) {
  return useQuery({
    queryKey: variantKeys.bySlug(slug),
    queryFn: () => variantsApi.getBySlug(slug),
    enabled: !!slug,
  })
}
export function useVariantsByProduct(productId: string) {
  return useQuery({
    queryKey: [...variantKeys.all(), 'byProduct', productId],
    queryFn: () => variantsApi.getByProduct(productId),
    enabled: !!productId,
  })
}
