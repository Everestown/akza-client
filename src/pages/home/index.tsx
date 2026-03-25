import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, scrollReveal, scrollRevealX, heroReveal } from '@/shared/lib/gsap'
import { useCollections } from '@/entities/collection/model/use-collections'
import { useSiteSection, useSocialLinks, useDictionaryValue } from '@/entities/site-page/model/use-site'
import { CollectionGrid } from '@/widgets/collection-grid/ui/collection-grid'
import { SiteHeader } from '@/widgets/site-header/ui/site-header'
import { SiteFooter } from '@/widgets/site-footer/ui/site-footer'
import { OrderForm } from '@/widgets/order-form/ui/order-form'
import { PageTransition } from '@/shared/ui/page-transition'
import { SocialLinks } from '@/shared/ui/social-links'

export default function HomePage() {
  const { data, isLoading } = useCollections()
  const { data: aboutData    } = useSiteSection('ABOUT')
  const { data: contactsData } = useSiteSection('CONTACTS')
  const socialLinks = useSocialLinks()
  const heroRef  = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const collections = data?.data ?? []

  // Dictionary-driven text (changes in one place → updates everywhere)
  const brandTagline = useDictionaryValue('brand_tagline', 'Видеть искусство в каждом стежке')

  const aboutText = (aboutData?.content?.text as string | undefined)
    ?? 'AKZA — независимый fashion-бренд, основанный в Махачкале. Каждая вещь создаётся в лимитированном тираже.'
  const address = (contactsData?.content?.address as string | undefined) ?? 'Махачкала, ул. Толстого 5/1'

  useEffect(() => {
    const ctx = gsap.context(() => {
      heroReveal('.home-hero-title')
      gsap.fromTo('.home-hero-sub',  { opacity: 0 }, { opacity: 1, duration: 1.2, delay: 0.6 })
      gsap.fromTo('.home-hero-line', { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 1.4, ease: 'expo.inOut', delay: 0.4 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (isLoading) return
    if (!aboutRef.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.about-heading').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        })
      })
      gsap.utils.toArray<Element>('.about-text').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        })
      })
      gsap.utils.toArray<Element>('.about-link').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, x: -28 }, {
          opacity: 1, x: 0, duration: 0.65, delay: i * 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        })
      })
    }, aboutRef)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [isLoading])

  return (
    <PageTransition data-page-wrapper><div className="page-wrap bg-ink">
      <div className="grain-overlay" aria-hidden />
      <SiteHeader />

      {/* ── Hero ── */}
      <section ref={heroRef} className="pt-28 pb-20 px-6 md:px-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="mb-2 flex items-center gap-4">
            <div className="home-hero-line h-px bg-smoke flex-1 max-w-[80px]" />
            <span className="home-hero-sub section-tag">Makhachkala · Дагестан</span>
          </div>
          <h1 className="overflow-hidden mb-1">
            <span className="home-hero-title block font-display text-[clamp(56px,10vw,120px)] font-light text-mist leading-none tracking-tight">
              AKZA
            </span>
          </h1>
          <div className="overflow-hidden">
            <p className="home-hero-title font-display text-[clamp(20px,4vw,44px)] font-light text-fog italic leading-none tracking-wide jp">
              アクザ
            </p>
          </div>
          <p className="home-hero-sub mt-8 max-w-sm text-sm text-fog font-light leading-relaxed">
            Японская философия ваби-саби в мусульманской скромной моде, рождённая в Дагестане.
            Лимитированные тиражи.
          </p>
        </div>
      </section>

      {/* ── Collections ── */}
      <div className="px-6 md:px-10 max-w-6xl mx-auto">
        <div className="ruled mb-10 flex items-center justify-between">
          <span className="section-tag py-4">Коллекции</span>
          <span className="font-mono text-[10px] text-smoke">{String(collections.length).padStart(2, '0')}</span>
        </div>
      </div>
      <main className="px-6 md:px-10 pb-24 max-w-6xl mx-auto">
        <CollectionGrid collections={collections} isLoading={isLoading} />
      </main>

      {/* ── About ── */}
      <section id="about" ref={aboutRef} className="border-t border-coal py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="about-heading section-tag mb-4 block" style={{ opacity: 0 }}>О бренде</span>
            <h2 className="about-heading font-display text-3xl md:text-4xl font-light text-mist leading-tight mb-6" style={{ opacity: 0 }}>
              {/* From dictionary — changes in admin → updates here */}
              {brandTagline}
            </h2>
            <p className="about-text text-fog text-sm font-light leading-relaxed max-w-sm" style={{ opacity: 0 }}>
              {aboutText}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Social links from CMS — supports SVG + display modes */}
            {socialLinks.map((link, i) => (
              <div key={link.id} className="about-link ruled pt-5" style={{ opacity: 0 }}>
                <p className="section-tag mb-1">{link.label}</p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-fog hover:text-mist transition-colors text-sm"
                >
                  {link.svg && (link.display_mode === 'icon' || link.display_mode === 'icon_text') && (
                    <span
                      className="w-[16px] h-[16px] shrink-0 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full"
                      dangerouslySetInnerHTML={{ __html: link.svg }}
                    />
                  )}
                  <span>{link.url}</span>
                </a>
              </div>
            ))}

            {/* Address — always shown separately */}
            {address && (
              <div className="about-link ruled pt-5" style={{ opacity: 0 }}>
                <p className="section-tag mb-1">Адрес шоурума</p>
                <p className="text-fog text-sm">{address}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
      <OrderForm />
    </div></PageTransition>
  )
}
