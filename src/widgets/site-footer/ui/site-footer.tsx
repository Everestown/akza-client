import { useRef, useEffect } from 'react'
import { useSiteSection, useSocialLinks, useDictionaryValue } from '@/entities/site-page/model/use-site'
import { SocialLinks } from '@/shared/ui/social-links'
import { gsap, ScrollTrigger } from '@/shared/lib/gsap'

export function SiteFooter() {
  const { data: contacts } = useSiteSection('CONTACTS')
  const { data: footer }   = useSiteSection('FOOTER')
  const socialLinks = useSocialLinks()
  const footerRef   = useRef<HTMLElement>(null)

  const address   = contacts?.content?.address  as string | undefined ?? 'Махачкала, ул. Толстого 5/1'
  const copyright = footer?.content?.copyright  as string | undefined ?? `© AKZA ${new Date().getFullYear()}`
  const brandName = useDictionaryValue('brand_name', 'AKZA')
  const brandJp   = useDictionaryValue('brand_jp', 'アクザ')

  // ── Footer entrance animation ────────────────────────────────────────────
  useEffect(() => {
    const el = footerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Horizontal rule line animates width: 0 → 100% on enter
      gsap.fromTo('.footer-divider',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, duration: 1.0, ease: 'expo.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      // Content blocks stagger up
      gsap.fromTo('.footer-block',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          stagger: 0.1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="mt-24 px-6 md:px-10 pb-10">
      {/* Animated divider line */}
      <div className="footer-divider h-px bg-smoke mb-10 origin-left" />

      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Brand block */}
        <div className="footer-block" style={{ opacity: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-display text-lg font-light text-mist">{brandName}</span>
            <span className="jp text-[11px] text-fog/50">{brandJp}</span>
          </div>
          <p className="section-tag">{address}</p>
        </div>

        {/* Social links */}
        <div className="footer-block" style={{ opacity: 0 }}>
          <SocialLinks links={socialLinks} />
        </div>

        {/* Copyright */}
        <p className="footer-block section-tag" style={{ opacity: 0 }}>{copyright}</p>
      </div>
    </footer>
  )
}
