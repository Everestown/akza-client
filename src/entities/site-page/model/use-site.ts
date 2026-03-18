import { useQuery } from '@tanstack/react-query'
import { siteApi } from '../api/site.api'

const siteKeys = {
  section: (s: string) => ['site', s] as const,
}

export function useSiteSection(section: string) {
  return useQuery({
    queryKey: siteKeys.section(section),
    queryFn: () => siteApi.getSection(section),
    staleTime: 1000 * 60, // 1 minute — fast refresh for CMS content
  })
}
