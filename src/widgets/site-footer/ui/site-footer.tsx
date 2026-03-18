import { useSiteSection } from '@/entities/site-page/model/use-site'

export function SiteFooter() {
  const { data: contacts } = useSiteSection('CONTACTS')
  const { data: footer }   = useSiteSection('FOOTER')

  const instagram = contacts?.content?.instagram as string | undefined ?? '@the.akza'
  const telegram  = contacts?.content?.telegram  as string | undefined ?? 't.me/theakza'
  const address   = contacts?.content?.address   as string | undefined ?? 'Махачкала, ул. Толстого 5/1'
  const copyright = footer?.content?.copyright   as string | undefined ?? `© AKZA ${new Date().getFullYear()}`

  return (
    <footer className="border-t border-smoke mt-24 px-6 md:px-10 py-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-display text-lg font-light text-mist">AKZA</span>
            <span className="jp text-[11px] text-fog/50">アクザ</span>
          </div>
          <p className="section-tag">{address}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <a href={`https://instagram.com/${instagram.replace('@', '')}`}
            target="_blank" rel="noopener noreferrer"
            className="section-tag hover:text-mist transition-colors">
            Instagram
          </a>
          <a href={telegram.startsWith('http') ? telegram : `https://${telegram}`}
            target="_blank" rel="noopener noreferrer"
            className="section-tag hover:text-mist transition-colors">
            Telegram
          </a>
        </div>

        <p className="section-tag">{copyright}</p>
      </div>
    </footer>
  )
}
