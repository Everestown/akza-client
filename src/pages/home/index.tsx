import { useEffect, useRef } from 'react'
import { gsap, scrollReveal, scrollRevealX, heroReveal } from '@/shared/lib/gsap'
import { useCollections } from '@/entities/collection/model/use-collections'
import { useSiteSection } from '@/entities/site-page/model/use-site'
import { CollectionGrid } from '@/widgets/collection-grid/ui/collection-grid'
import { SiteHeader } from '@/widgets/site-header/ui/site-header'
import { SiteFooter } from '@/widgets/site-footer/ui/site-footer'
import { OrderForm } from '@/widgets/order-form/ui/order-form'

export default function HomePage() {
  const { data, isLoading } = useCollections()
  const { data: aboutData    } = useSiteSection('ABOUT')
  const { data: contactsData } = useSiteSection('CONTACTS')
  const heroRef   = useRef<HTMLDivElement>(null)
  const aboutRef  = useRef<HTMLDivElement>(null)
  const collections = data?.data ?? []

  const aboutText = aboutData?.content?.text   as string | undefined
    ?? 'AKZA — независимый fashion-бренд, основанный в Махачкале. Каждая вещь создаётся в лимитированном тираже с вниманием к деталям, вдохновлённым японской минималистичной эстетикой.'
  const instagram = contactsData?.content?.instagram as string | undefined ?? '@the.akza'
  const telegram  = contactsData?.content?.telegram  as string | undefined ?? 't.me/theakza'
  const address   = contactsData?.content?.address   as string | undefined ?? 'Махачкала, ул. Толстого 5/1'

  // Hero entrance (one-shot)
  useEffect(() => {
    const ctx = gsap.context(() => {
      heroReveal('.home-hero-title')
      gsap.fromTo('.home-hero-sub',  { opacity: 0 }, { opacity: 1, duration: 1.2, delay: 0.6 })
      gsap.fromTo('.home-hero-line', { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 1.4, ease: 'expo.inOut', delay: 0.4 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  // About section — bidirectional scroll reveal
  useEffect(() => {
    if (!aboutRef.current) return
    const ctx = gsap.context(() => {
      scrollReveal({ targets: '.about-heading', container: aboutRef.current! })
      scrollReveal({ targets: '.about-text', container: aboutRef.current!, y: 24, stagger: 0 })
      scrollRevealX({ targets: '.about-link', container: aboutRef.current!, stagger: 0.12 })
    }, aboutRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="page-wrap bg-ink">
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

      {/* ── Collections divider ── */}
      <div className="px-6 md:px-10 max-w-6xl mx-auto">
        <div className="ruled mb-10 flex items-center justify-between">
          <span className="section-tag py-4">Коллекции</span>
          <span className="font-mono text-[10px] text-smoke">{String(collections.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* ── Collection grid ── */}
      <main className="px-6 md:px-10 pb-24 max-w-6xl mx-auto">
        <CollectionGrid collections={collections} isLoading={isLoading} />
      </main>

      {/* ── About ── */}
      <section id="about" ref={aboutRef} className="border-t border-coal py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="about-heading section-tag mb-4 block" style={{ opacity: 0 }}>О бренде</span>
            <h2 className="about-heading font-display text-3xl md:text-4xl font-light text-mist leading-tight mb-6" style={{ opacity: 0 }}>
              Видеть искусство<br />в каждом стежке
            </h2>
            <p className="about-text text-fog text-sm font-light leading-relaxed max-w-sm" style={{ opacity: 0 }}>
              {aboutText}
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {[
              { label: 'Instagram', value: instagram, href: `https://instagram.com/${instagram.replace('@','')}` },
              { label: 'Telegram',  value: telegram,  href: telegram.startsWith('http') ? telegram : `https://${telegram}` },
              { label: 'Адрес шоурума', value: address, href: null },
            ].map(({ label, value, href }) => (
              <div key={label} className="about-link ruled pt-5" style={{ opacity: 0 }}>
                <p className="section-tag mb-1">{label}</p>
                {href
                  ? <a href={href} target="_blank" rel="noopener noreferrer" className="text-fog hover:text-mist transition-colors text-sm">{value}</a>
                  : <p className="text-fog text-sm">{value}</p>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <OrderForm />
    </div>
  )
}
