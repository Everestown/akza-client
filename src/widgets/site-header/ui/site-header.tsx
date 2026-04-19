import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useHeader } from '../model/use-header'
import { cn } from '@/shared/lib/cn'
import { ROUTES } from '@/shared/config/routes'
import { useSiteSection, useSocialLinks } from '@/entities/site-page/model/use-site'
import { SocialLinks } from '@/shared/ui/social-links'
import { SafeImage } from '@/shared/ui/safe-media'
import { gsap } from '@/shared/lib/gsap'

const DEFAULT_NAV = [
  { label: 'Коллекции', href: '/',         external: false },
  { label: 'О бренде',  href: '/#about',   external: false },
  { label: 'Telegram',  href: 'https://t.me/theakza', external: true },
]


// ── Animated mobile nav overlay ──────────────────────────────────────────────
interface MobileNavProps {
  isOpen: boolean
  navLinks: Array<{ label: string; href: string; external?: boolean }>
  socialLinks: ReturnType<typeof useSocialLinks>
  renderLink: (l: { label: string; href: string; external?: boolean }, mobile?: boolean) => React.ReactNode
}

function MobileNav({ isOpen, navLinks, socialLinks, renderLink }: MobileNavProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = overlayRef.current
    if (!el || !isOpen) return

    // Backdrop fade
    gsap.fromTo(el,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: 'power2.out' },
    )
    // Nav links stagger in from left
    gsap.fromTo('.mobile-nav-item',
      { opacity: 0, x: -32 },
      { opacity: 1, x: 0, stagger: 0.06, duration: 0.45, ease: 'power2.out', delay: 0.1 },
    )
    // Social links fade up
    gsap.fromTo('.mobile-nav-social',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.3 },
    )
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-30 bg-ink/98 flex flex-col justify-center px-10 md:hidden"
      style={{ opacity: 0 }}
    >
      <nav className="flex flex-col gap-8 mb-16">
        {navLinks.map((l) => (
          <span key={l.href} className="mobile-nav-item" style={{ opacity: 0 }}>
            {renderLink(l, true)}
          </span>
        ))}
      </nav>
      <div className="mobile-nav-social" style={{ opacity: 0 }}>
        <SocialLinks links={socialLinks} forceMode="icon_text" className="gap-6" />
      </div>
    </div>
  )
}

export const SiteHeader = observer(function SiteHeader() {
  const { isNavOpen, toggleNav, handleNavClick } = useHeader()
  const { data: headerData } = useSiteSection('HEADER')
  const socialLinks = useSocialLinks()
  const headerRef   = useRef<HTMLElement>(null)
  const logoRef     = useRef<HTMLAnchorElement>(null)
  const navRef      = useRef<HTMLElement>(null)

  const logoText = (headerData?.content?.logo_text as string | undefined) ?? 'AKZA'
  const logoJp   = (headerData?.content?.logo_jp   as string | undefined) ?? 'アクザ'
  const logoUrl  = (headerData?.content?.logo_url  as string | undefined) ?? null

  const rawLinks = headerData?.content?.nav_links as Array<{
    label: string; href: string; external?: boolean
  }> | undefined
  const navLinks = rawLinks ?? DEFAULT_NAV

  // ── Header entrance + scroll-hide behaviour ──────────────────────────────
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    // Entrance: logo slides down, nav items fade in sequentially
    const ctx = gsap.context(() => {
      gsap.fromTo(logoRef.current,
        { opacity: 0, y: -14 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.1 },
      )
      gsap.fromTo('.header-nav-item',
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power2.out', delay: 0.25 },
      )
    }, header)

    // Scroll: hide header going down, show on going up
    let lastY = 0
    let scrollDir = 0 // -1 = up, 1 = down
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const currentY = window.scrollY
        const delta    = currentY - lastY
        const newDir   = delta > 0 ? 1 : -1

        // Only animate when direction changes or first move past threshold
        if (currentY > 80 && newDir !== scrollDir) {
          scrollDir = newDir
          if (newDir === 1) {
            // Scrolling DOWN → hide header
            gsap.to(header, {
              y: '-110%', duration: 0.35, ease: 'power2.in', overwrite: true,
            })
          } else {
            // Scrolling UP → reveal header
            gsap.to(header, {
              y: '0%', duration: 0.4, ease: 'power2.out', overwrite: true,
            })
          }
        } else if (currentY <= 80) {
          // Near top → always show
          gsap.to(header, { y: '0%', duration: 0.3, ease: 'power2.out', overwrite: true })
          scrollDir = 0
        }

        lastY = currentY
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      ctx.revert()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function renderLink(l: { label: string; href: string; external?: boolean }, mobile = false) {
    const cls = mobile
      ? 'nav-link font-display text-4xl font-light text-mist hover:text-fog transition-colors'
      : 'header-nav-item section-tag hover:text-mist transition-colors duration-200'

    if (l.external) return (
      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>{l.label}</a>
    )
    if (l.href.startsWith('/#')) return (
      <button key={l.href} onClick={() => handleNavClick(l.href)} className={cn(cls, 'cursor-crosshair')}>
        {l.label}
      </button>
    )
    return <Link key={l.href} to={l.href} className={cls}>{l.label}</Link>
  }

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 h-14"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute inset-0 bg-ink/80 backdrop-blur-md" />

        {/* Logo */}
        <Link ref={logoRef} to={ROUTES.HOME} className="relative z-10 flex items-center gap-2.5 group" style={{ opacity: 0 }}>
          {logoUrl ? (
            <SafeImage
              src={logoUrl}
              alt={logoText}
              className="h-8 w-auto object-contain group-hover:opacity-80 transition-opacity"
            />
          ) : (
            <>
              <span className="font-display text-lg font-light text-mist tracking-widest group-hover:text-white transition-colors">
                {logoText}
              </span>
              {logoJp && (
                <span className="jp text-[11px] text-fog/60 group-hover:text-fog transition-colors">
                  {logoJp}
                </span>
              )}
            </>
          )}
        </Link>

        {/* Desktop nav */}
        <nav ref={navRef} className="relative z-10 hidden md:flex items-center gap-8">
          {navLinks.map((l) => renderLink(l))}
        </nav>

        {/* Hamburger */}
        <button
          onClick={toggleNav}
          className="relative z-10 md:hidden w-8 h-8 flex flex-col justify-center gap-[5px] header-nav-item"
          aria-label="Меню"
          style={{ opacity: 0 }}
        >
          <span className={cn('block h-px bg-mist transition-all duration-300 origin-center',
            isNavOpen ? 'rotate-45 translate-y-[7px]' : '')} />
          <span className={cn('block h-px bg-mist transition-all duration-300',
            isNavOpen ? 'opacity-0' : '')} />
          <span className={cn('block h-px bg-mist transition-all duration-300 origin-center',
            isNavOpen ? '-rotate-45 -translate-y-[7px]' : '')} />
        </button>
      </header>

      {/* Mobile nav overlay */}
      <MobileNav
        isOpen={isNavOpen}
        navLinks={navLinks}
        socialLinks={socialLinks}
        renderLink={renderLink}
      />
    </>
  )
})
