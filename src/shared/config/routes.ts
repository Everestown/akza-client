export const ROUTES = {
  HOME: '/',
  COLLECTION: (slug: string) => `/collections/${slug}`,
  PRODUCT:    (colSlug: string, prodSlug: string) => `/collections/${colSlug}/${prodSlug}`,
  VARIANT:    (colSlug: string, prodSlug: string, varSlug: string) => `/collections/${colSlug}/${prodSlug}/${varSlug}`,
} as const
