'use client'

import {motion} from 'framer-motion'
import {Button} from '@/components/ui/Button'
import {Input} from '@/components/ui/Input'
import {PortableTextRenderer} from '@/components/ui/PortableTextRenderer'
import type {IContentSection, BackgroundStyle} from '@/types'

interface ContentSectionProps {
  data: IContentSection
}

const bgStyles: Record<BackgroundStyle, string> = {
  default: 'bg-surface-container-lowest',
  elevated: 'bg-surface-container',
  void: 'bg-black',
}

export function ContentSection({data}: ContentSectionProps) {
  const bg = bgStyles[data.backgroundStyle || 'default']

  return (
    <section className={`py-20 md:py-28 ${bg}`}>
      <div className="max-w-4xl px-6 mx-auto">
        {/* Kicker */}
        {data.kicker && (
          <motion.p
            initial={{opacity: 0, y: 12}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-100px'}}
            transition={{duration: 0.5}}
            className="mb-4 text-xs font-semibold tracking-[0.3em] uppercase text-on-surface-variant"
          >
            {data.kicker}
          </motion.p>
        )}

        {/* Headline */}
        {data.headline && (
          <motion.h2
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-100px'}}
            transition={{duration: 0.6, delay: 0.1}}
            className="mb-6 text-3xl font-bold tracking-tight text-on-surface md:text-4xl lg:text-5xl"
          >
            {data.headline}
          </motion.h2>
        )}

        {/* Body */}
        {data.body && (
          <motion.div
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-80px'}}
            transition={{duration: 0.5, delay: 0.2}}
          >
            <PortableTextRenderer value={data.body} />
          </motion.div>
        )}

        {/* CTA or Newsletter form */}
        {(data.variant === 'cta' || data.variant === 'newsletter') && (
          <motion.div
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-60px'}}
            transition={{duration: 0.5, delay: 0.3}}
            className="mt-8"
          >
            {data.variant === 'newsletter' ? (
              <form
                className="flex flex-col gap-3 sm:flex-row sm:max-w-md"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  placeholder={data.inputPlaceholder || 'Enter your email'}
                  required
                />
                <Button type="submit" variant="primary" className="flex-shrink-0">
                  {data.ctaText || 'Subscribe'}
                </Button>
              </form>
            ) : (
              data.ctaText &&
              data.ctaUrl && (
                <Button href={data.ctaUrl} variant="primary" size="lg">
                  {data.ctaText}
                </Button>
              )
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
