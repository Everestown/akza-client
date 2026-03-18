import { api } from '@/shared/api/instance'
import type { SitePage } from '../types/site.types'

export const siteApi = {
  getSection: (section: string) =>
    api.get<{ data: SitePage }>(`/site/content/${section}`).then(r => r.data.data),
}
