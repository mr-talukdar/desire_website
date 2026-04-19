'use client'

import {motion} from 'framer-motion'
import type {IProcessSection} from '@/types'

interface ProcessTimelineProps {
  data: IProcessSection
}

export function ProcessTimeline({data}: ProcessTimelineProps) {
  const steps = data.steps || []
  if (steps.length === 0) return null

  return (
    <section className="py-20 md:py-28 bg-surface-container">
      <div className="max-w-6xl px-6 mx-auto">
        {/* Header */}
        {(data.kicker || data.headline) && (
          <div className="mb-16 text-center">
            {data.kicker && (
              <p className="mb-3 text-xs font-semibold tracking-[0.3em] uppercase text-on-surface-variant">
                {data.kicker}
              </p>
            )}
            {data.headline && (
              <h2 className="text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
                {data.headline}
              </h2>
            )}
          </div>
        )}

        {/* Timeline */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step._key || i}
              initial={{opacity: 0, y: 30}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-60px'}}
              transition={{duration: 0.5, delay: i * 0.1}}
              className="relative"
            >
              {/* Step number */}
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-10 h-10 text-sm font-bold border border-primary-container/40 text-primary rounded-sm bg-primary-container/10">
                  {String(step.stepNumber).padStart(2, '0')}
                </span>
                {/* Connecting line (except last) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block flex-1 h-px bg-outline-variant/30" />
                )}
              </div>

              {/* Content */}
              <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-on-surface">
                {step.title}
              </h3>
              {step.description && (
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  {step.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
