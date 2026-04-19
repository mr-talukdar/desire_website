'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const PHASES = [
  {
    number: '01',
    title: 'Discovery & System Analysis',
    desc: 'Before a single line of code is written, we deconstruct your objectives. We perform high-level system analysis to identify terminal bottlenecks and architectural requirements.',
    bullets: ['Market Logic Analysis', 'Technical Debt Assessment', 'Objective Mapping', 'Infrastructure Strategy']
  },
  {
    number: '02',
    title: 'Precision Prototyping',
    desc: 'We map user flows with surgical precision, creating high-fidelity prototypes that define the visual absolute of the project. This is where design meets technical feasibility.',
    bullets: ['UX Interaction Mapping', 'Geometric UI Frameworks', 'Design System Architecture', 'Rapid Feedback Loops']
  },
  {
    number: '03',
    title: 'Operational Engineering',
    desc: 'Our deployment team builds the digital machine. Using a strictly component-based architecture, we ensure every element is optimized for speed and resilience.',
    bullets: ['Next.js Frameworking', 'Logic Integration', 'Security Hardening', 'Performance Auditing']
  },
  {
    number: '04',
    title: 'Scale & Optimization',
    desc: 'The machine is deployed. We integrate real-time analytics and performance monitoring to ensure the system scales infinitely without structural collapse.',
    bullets: ['Vercel Deployment', 'Load Balancing', 'SEO Dominance Tuning', 'Iterative Evolution']
  }
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest pt-20 pb-40">
      
      {/* Header */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-6">OUR METHODOLOGY</p>
            <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black uppercase tracking-tighter leading-[0.9] text-on-surface mb-12">
              THE OPERATIONAL<br />FRAMEWORK.
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl">
              A strict, data-driven approach to digital excellence. We don't guess; we engineer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Line / Timeline Section */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="relative border-l border-outline-variant/20 ml-4 md:ml-10 pl-10 md:pl-20 space-y-32">
            {PHASES.map((phase, i) => (
              <motion.div 
                key={phase.number}
                {...fadeUp}
                className="relative"
              >
                {/* Dot / Number indicator */}
                <div className="absolute -left-[54px] md:-left-[94px] top-0 w-8 h-8 bg-surface-container-lowest border-2 border-primary rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-black text-on-surface">{phase.number}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-on-surface mb-6">
                      {phase.title}
                    </h2>
                    <p className="text-base text-on-surface-variant leading-relaxed mb-8">
                      {phase.desc}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {phase.bullets.map(bullet => (
                        <div key={bullet} className="flex items-center gap-3 text-xs font-bold tracking-widest text-on-surface-variant/60 uppercase">
                          <span className="text-primary">+</span>
                          {bullet}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Decorative context box */}
                  <div className="hidden lg:block bg-surface-container border border-outline-variant/10 p-10 rounded-sm">
                    <div className="h-full border border-dashed border-outline-variant/30 flex items-center justify-center p-10">
                      <span className="text-[60px] font-black text-on-surface-variant/5">VOID_PHASE_{phase.number}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Bottom CTAs */}
      <section className="mt-40 text-center">
        <motion.div {...fadeUp} className="max-w-xl mx-auto px-6">
          <h3 className="text-2xl font-bold uppercase tracking-tight text-on-surface mb-10">TRANSFORM YOUR INFRASTRUCTURE.</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 text-[11px] font-bold tracking-[0.2em] uppercase bg-primary-container text-white rounded-sm hover:-translate-y-1 transition-all"
            >
              INITIATE CONTACT
            </Link>
            <Link 
              href="/projects"
              className="w-full sm:w-auto px-10 py-5 text-[11px] font-bold tracking-[0.2em] uppercase border border-outline-variant/30 text-on-surface-variant hover:text-on-surface transition-all"
            >
              VIEW CASE STUDIES
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
