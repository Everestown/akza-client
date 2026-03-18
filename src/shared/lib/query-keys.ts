export const collectionKeys = {
  all:    ()             => ['collections'] as const,
  lists:  ()             => [...collectionKeys.all(), 'list'] as const,
  list:   (p: object)    => [...collectionKeys.lists(), p] as const,
  detail: (slug: string) => [...collectionKeys.all(), 'detail', slug] as const,
}
export const productKeys = {
  all:          ()             => ['products'] as const,
  byCollection: (s: string)    => [...productKeys.all(), 'byCollection', s] as const,
  detail:       (slug: string) => [...productKeys.all(), 'detail', slug] as const,
  bySlug:       (slug: string) => [...productKeys.all(), 'detail', slug] as const,
}
export const variantKeys = {
  all:    ()             => ['variants'] as const,
  detail: (slug: string) => [...variantKeys.all(), 'detail', slug] as const,
  bySlug: (slug: string) => [...variantKeys.all(), 'detail', slug] as const,
}
export const orderKeys = {
  all: () => ['orders'] as const,
}
