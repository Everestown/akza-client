import { useQuery } from '@tanstack/react-query'
import { collectionsApi } from '../api/collections.api'
import { collectionKeys } from '@/shared/lib/query-keys'

export function useCollections() {
  return useQuery({ queryKey: collectionKeys.lists(), queryFn: () => collectionsApi.list() })
}
export function useCollection(slug: string) {
  return useQuery({
    queryKey: collectionKeys.detail(slug),
    queryFn: () => collectionsApi.getBySlug(slug),
    enabled: !!slug,
  })
}
export function useCollectionProducts(slug: string) {
  return useQuery({
    queryKey: [...collectionKeys.detail(slug), 'products'],
    queryFn: () => collectionsApi.getProducts(slug),
    enabled: !!slug,
  })
}
