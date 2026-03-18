import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../api/products.api'
import { productKeys } from '@/shared/lib/query-keys'

export function useProduct(slug: string) {
  return useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: () => productsApi.getBySlug(slug),
    enabled: !!slug,
  })
}
