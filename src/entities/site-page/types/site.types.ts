export type PageSection = 'HERO' | 'ABOUT' | 'CONTACTS' | 'FOOTER' | 'HEADER'

export interface SitePage {
  id: number
  section: PageSection
  content: Record<string, unknown>
  updated_at: string
}
