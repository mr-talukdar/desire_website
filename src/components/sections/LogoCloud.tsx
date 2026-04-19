import {urlFor} from '@/sanity/lib/image'
import Image from 'next/image'
import type {ILogoCloudSection} from '@/types'

interface LogoCloudProps {
  data: ILogoCloudSection
}

export function LogoCloud({data}: LogoCloudProps) {
  const logos = data.logos || []
  if (logos.length === 0) return null

  // Duplicate logos for seamless infinite scroll
  const duplicated = [...logos, ...logos]

  return (
    <section className="py-16 border-y border-outline-variant/20 overflow-hidden">
      {data.label && (
        <p className="mb-10 text-center text-[10px] font-semibold tracking-[0.3em] uppercase text-on-surface-variant/60">
          {data.label}
        </p>
      )}

      <div className="relative">
        {/* Left/Right fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-container-lowest to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-container-lowest to-transparent z-10" />

        <div className="flex animate-marquee">
          {duplicated.map((logo, i) => {
            if (!logo?.asset) return null
            const url =
              'url' in logo.asset
                ? (logo.asset as { url: string }).url
                : urlFor(logo).width(160).url()
            return (
              <div
                key={`${(logo as any)._key || i}-${i}`}
                className="flex-shrink-0 flex items-center justify-center px-8 md:px-12"
              >
                <Image
                  src={url}
                  alt={logo.alt || 'Client logo'}
                  width={120}
                  height={40}
                  className="h-6 w-auto opacity-40 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-300 md:h-8"
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
