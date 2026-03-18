export type PageSection = 'HERO' | 'ABOUT' | 'CONTACTS' | 'FOOTER'

export interface SitePage {
  id: string
  section: PageSection
  content: Record<string, unknown>
  updated_at: string
}
