'use client'

import {motion} from 'framer-motion'
import {Button} from '@/components/ui/Button'
import type {IHeroSection} from '@/types'

interface HeroSectionProps {
  data: IHeroSection
}

export function HeroSection({data}: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Ghost Word */}
      {data.ghostWord && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="text-[12vw] font-black uppercase text-surface-container-high/40 line-through decoration-outline-variant/20">
            {data.ghostWord}
          </span>
        </div>
      )}

      <div className="relative z-10 max-w-5xl px-6 mx-auto text-center">
        {/* Kicker */}
        {data.kicker && (
          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.1}}
            className="mb-6 text-xs font-semibold tracking-[0.3em] uppercase text-on-surface-variant"
          >
            {data.kicker}
          </motion.p>
        )}

        {/* Headline */}
        <motion.h1
          initial={{opacity: 0, y: 30}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.2}}
          className="mb-6 text-4xl font-black uppercase leading-[0.95] tracking-tight text-on-surface md:text-6xl lg:text-7xl xl:text-8xl"
        >
          {data.headline}
        </motion.h1>

        {/* Description */}
        {data.description && (
          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.4}}
            className="max-w-2xl mx-auto mb-10 text-base leading-relaxed text-on-surface-variant md:text-lg"
          >
            {data.description}
          </motion.p>
        )}

        {/* CTAs */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.6}}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          {data.primaryCtaText && data.primaryCtaUrl && (
            <Button href={data.primaryCtaUrl} variant="primary" size="lg">
              {data.primaryCtaText}
            </Button>
          )}
          {data.secondaryCtaText && data.secondaryCtaUrl && (
            <Button href={data.secondaryCtaUrl} variant="secondary" size="lg">
              {data.secondaryCtaText}
            </Button>
          )}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-container-lowest to-transparent" />
    </section>
  )
}
