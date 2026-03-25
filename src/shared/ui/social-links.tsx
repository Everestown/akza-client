import { cn } from '@/shared/lib/cn'
import type { SocialLink, SocialDisplayMode } from '@/shared/types/social'

interface SocialLinkItemProps {
  link: SocialLink
  forceMode?: SocialDisplayMode
  className?: string
}

function SocialLinkItem({ link, forceMode, className }: SocialLinkItemProps) {
  const mode = forceMode ?? link.display_mode
  const showIcon = (mode === 'icon' || mode === 'icon_text') && !!link.svg
  const showText = mode === 'text' || mode === 'icon_text' || !link.svg

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('flex items-center gap-1.5 section-tag hover:text-mist transition-colors duration-200', className)}
      aria-label={link.label}
    >
      {showIcon && (
        <span
          className="shrink-0 w-[18px] h-[18px] flex items-center justify-center [&_svg]:w-full [&_svg]:h-full"
          dangerouslySetInnerHTML={{ __html: link.svg! }}
        />
      )}
      {showText && <span>{link.label}</span>}
    </a>
  )
}

interface SocialLinksProps {
  links: SocialLink[]
  forceMode?: SocialDisplayMode
  className?: string
  itemClassName?: string
}

export function SocialLinks({ links, forceMode, className, itemClassName }: SocialLinksProps) {
  if (!links?.length) return null
  return (
    <div className={cn('flex items-center gap-4 flex-wrap', className)}>
      {links.map((link) => (
        <SocialLinkItem key={link.id} link={link} forceMode={forceMode} className={itemClassName} />
      ))}
    </div>
  )
}
