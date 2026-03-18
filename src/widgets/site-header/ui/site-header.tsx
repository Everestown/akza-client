import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useHeader } from '../model/use-header'
import { cn } from '@/shared/lib/cn'
import { ROUTES } from '@/shared/config/routes'

const NAV_LINKS = [
  { label: 'Коллекции', href: ROUTES.HOME,         external: false, anchor: false },
  { label: 'О бренде',  href: '/#about',             external: false, anchor: true  },
  { label: 'Telegram',  href: 'https://t.me/theakza', external: true,  anchor: false },
]

export const SiteHeader = observer(function SiteHeader() {
  const { isNavOpen, toggleNav, handleNavClick } = useHeader()

  function renderLink(l: typeof NAV_LINKS[number], mobile = false) {
    const cls = mobile
      ? 'nav-link font-display text-4xl font-light text-mist hover:text-fog transition-colors'
      : 'section-tag hover:text-mist transition-colors duration-200'

    if (l.external) {
      return (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>
          {l.label}
        </a>
      )
    }
    if (l.anchor) {
      return (
        <button
          key={l.href}
          onClick={() => handleNavClick(l.href)}
          className={cn(cls, 'cursor-crosshair')}
        >
          {l.label}
        </button>
      )
    }
    return (
      <Link key={l.href} to={l.href} className={cls}>
        {l.label}
      </Link>
    )
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 h-14">
        <div className="absolute inset-0 bg-ink/80 backdrop-blur-md" />

        <Link to={ROUTES.HOME} className="relative z-10 flex items-center gap-2.5 group">
          <span className="font-display text-lg font-light text-mist tracking-widest group-hover:text-white transition-colors">AKZA</span>
          <span className="jp text-[11px] text-fog/60 group-hover:text-fog transition-colors">アクザ</span>
        </Link>

        <nav className="relative z-10 hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => renderLink(l))}
        </nav>

        <button
          onClick={toggleNav}
          className="relative z-10 md:hidden w-8 h-8 flex flex-col justify-center gap-[5px]"
          aria-label="Меню"
        >
          <span className={cn('block h-px bg-mist transition-all duration-300 origin-center', isNavOpen ? 'rotate-45 translate-y-[7px]' : '')} />
          <span className={cn('block h-px bg-mist transition-all duration-300', isNavOpen ? 'opacity-0' : '')} />
          <span className={cn('block h-px bg-mist transition-all duration-300 origin-center', isNavOpen ? '-rotate-45 -translate-y-[7px]' : '')} />
        </button>
      </header>

      {isNavOpen && (
        <div className="nav-overlay fixed inset-0 z-30 bg-ink/98 flex flex-col justify-center px-10 md:hidden">
          <nav className="flex flex-col gap-8">
            {NAV_LINKS.map((l) => renderLink(l, true))}
          </nav>
          <div className="mt-16">
            <p className="section-tag">@the.akza · Махачкала</p>
          </div>
        </div>
      )}
    </>
  )
})
