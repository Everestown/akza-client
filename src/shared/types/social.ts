export type SocialDisplayMode = 'text' | 'icon' | 'icon_text'

export interface SocialLink {
  id: string
  label: string
  url: string
  svg?: string
  display_mode: SocialDisplayMode
}
