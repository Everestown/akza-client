import { useQuery } from '@tanstack/react-query'
import { variantsApi } from '../api/variants.api'

export function useVariant(slug: string) {
  return useQuery({
    queryKey: ['variant', slug],
    queryFn:  () => variantsApi.getBySlug(slug),
    enabled:  !!slug,
  })
}

export function useVariantsByProductSlug(productSlug: string) {
  return useQuery({
    queryKey: ['variants', 'byProduct', productSlug],
    queryFn:  () => variantsApi.getByProductSlug(productSlug),
    enabled:  !!productSlug,
  })
}
