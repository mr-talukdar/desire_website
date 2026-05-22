'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const PHASES = [
  {
    number: '01',
    title: 'Understand',
    desc: 'Before anything is created, we take the time to understand your brand, your audience, and what you\'re actually trying to achieve. Because without clarity, even good ideas fall flat.',
  },
  {
    number: '02',
    title: 'Shape the Idea',
    desc: 'Once the direction is clear, we develop concepts that align with your brand and stand out in the real world. Not just what looks good - what makes sense.',
  },
  {
    number: '03',
    title: 'Create & Execute',
    desc: 'This is where ideas come to life. From content to campaigns, everything is built with attention to detail, consistency, and intent.',
  },
  {
    number: '04',
    title: 'Refine & Improve',
    desc: 'We don\'t stop at "done." We review, adjust, and improve - making sure the work performs better over time and stays relevant.',
  }
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest pb-40">
      
      {/* Header */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-6">OUR PROCESS</p>
            <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black uppercase tracking-tighter leading-[0.9] text-on-surface mb-12">
              THE CREATIVE<br />FRAMEWORK.
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl">
              Good work doesn&apos;t happen randomly - it&apos;s built step by step. We keep things simple, focused, and intentional from start to finish.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Line / Timeline Section */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="relative border-l border-outline-variant/20 ml-4 md:ml-10 pl-10 md:pl-20 space-y-32">
            {PHASES.map((phase) => (
              <motion.div 
                key={phase.number}
                {...fadeUp}
                className="relative"
              >
                {/* Dot / Number indicator */}
                <div className="absolute -left-[54px] md:-left-[94px] top-0 w-8 h-8 bg-surface-container-lowest border-2 border-primary rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-black text-on-surface">{phase.number}</span>
                </div>

                <div className="max-w-2xl">
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-on-surface mb-6">
                    {phase.number} - {phase.title}
                  </h2>
                  <p className="text-base text-on-surface-variant leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Bottom CTAs */}
      <section className="mt-40 text-center">
        <motion.div {...fadeUp} className="max-w-xl mx-auto px-6">
          <h3 className="text-2xl font-bold uppercase tracking-tight text-on-surface mb-4">LET&apos;S BUILD SOMETHING THAT PEOPLE REMEMBER.</h3>
          <p className="text-sm text-on-surface-variant mb-10">Tell us what you&apos;re working on - we&apos;ll help you shape it into something that actually stands out.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 text-[11px] font-bold tracking-[0.2em] uppercase bg-primary-container text-white rounded-sm hover:-translate-y-1 transition-all"
            >
              START A PROJECT
            </Link>
            <Link 
              href="/projects"
              className="w-full sm:w-auto px-10 py-5 text-[11px] font-bold tracking-[0.2em] uppercase border border-outline-variant/30 text-on-surface-variant hover:text-on-surface transition-all"
            >
              VIEW OUR WORK
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
