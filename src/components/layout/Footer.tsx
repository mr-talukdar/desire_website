import Link from 'next/link'

const SOCIAL_LINKS = [
  {label: 'INSTAGRAM', href: '#'},
  {label: 'LINKEDIN', href: '#'},
  {label: 'TWITTER', href: '#'},
]

const FOOTER_LINKS = [
  {label: 'CAREERS', href: '/careers'},
  {label: 'LEGAL', href: '/legal'},
]

export function Footer() {
  return (
    <footer className="border-t border-outline-variant/10 bg-surface-container-lowest">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left — Brand */}
          <div>
            <Link
              href="/"
              className="text-xs font-bold tracking-[0.2em] uppercase text-on-surface"
            >
              DESIRE CREATIVES
            </Link>
            <p className="mt-1 text-[10px] tracking-widest uppercase text-on-surface-variant/50">
              Engineering Digital Dominance
            </p>
          </div>

          {/* Center — Social */}
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-semibold tracking-[0.2em] uppercase text-on-surface-variant/60 hover:text-on-surface transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right — Legal */}
          <div className="flex items-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] font-semibold tracking-[0.2em] uppercase text-on-surface-variant/60 hover:text-on-surface transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-outline-variant/10 text-center">
          <p className="text-[10px] tracking-widest text-on-surface-variant/30">
            © {new Date().getFullYear()} DESIRE CREATIVES. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  )
}
