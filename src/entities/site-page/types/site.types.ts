export type PageSection = 'HERO' | 'ABOUT' | 'CONTACTS' | 'FOOTER' | 'HEADER' | 'DICTIONARY'

export interface SitePage {
  id: number
  section: PageSection
  content: Record<string, unknown>
  updated_at: string
}
