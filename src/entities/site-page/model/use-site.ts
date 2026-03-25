import { useQuery } from '@tanstack/react-query'
import { siteApi } from '../api/site.api'
import type { SocialLink } from '@/shared/types/social'

const siteKeys = {
  section: (s: string) => ['site', s] as const,
}

export function useSiteSection(section: string) {
  return useQuery({
    queryKey: siteKeys.section(section),
    queryFn: () => siteApi.getSection(section),
    staleTime: 1000 * 60, // 1 minute
  })
}

/** Returns the social_links array from CONTACTS section */
export function useSocialLinks(): SocialLink[] {
  const { data } = useSiteSection('CONTACTS')
  const raw = data?.content?.social_links
  if (!Array.isArray(raw)) return []
  return raw as SocialLink[]
}

/** Returns a single dictionary value by key */
export function useDictionaryValue(key: string, fallback = ''): string {
  const { data } = useSiteSection('DICTIONARY')
  if (!data?.content) return fallback
  return (data.content[key] as string | undefined) ?? fallback
}

/** Returns the full dictionary as a Record */
export function useDictionary(): Record<string, string> {
  const { data } = useSiteSection('DICTIONARY')
  if (!data?.content) return {}
  return data.content as Record<string, string>
}
