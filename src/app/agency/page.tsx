'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

export default function AgencyPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b border-outline-variant/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-6">EST. 2024 / THE ARCHITECTS</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-on-surface mb-8">
              PRECISION<br />OVER PATTERNS.
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl">
              We are a high-performance digital agency engineered to build the next generation of infrastructure, decentralized systems, and technical interfaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Manifesto / Philosophy Section */}
      <section className="py-20 md:py-32 bg-surface-container">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl font-black uppercase tracking-tight text-on-surface mb-6">THE TECHNICAL VOID</h2>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed mb-6">
                Most agencies build for the surface. We build for the infrastructure. In an era of infinite noise, we embrace "The Technical Void"—a methodology focused on stripping away structural noise to reveal high-frequency utility.
              </p>
              <div className="flex flex-col gap-4 text-sm font-mono text-on-surface-variant/70">
                <div className="flex items-center gap-4">
                  <span className="text-primary">01</span>
                  <span>ZERO-LATENCY INTERACTION</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary">02</span>
                  <span>GEOMETRIC TYPOGRAPHY</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary">03</span>
                  <span>SYSTEMIC SCALABILITY</span>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="bg-surface-container-high p-10 md:p-14 border border-outline-variant/10 rounded-sm">
              <h3 className="text-xl font-bold uppercase tracking-tight text-on-surface mb-6 italic">"A machine is not finished when there is nothing left to add, but when there is nothing left to take away."</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                This is the core of Desire Creatives. We don't just "design websites"—we engineer digital machines that dominate their markets through technical superiority and visual absolute.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/10">
            {[
              { title: 'AUTONOMY', desc: 'Every engineer at Desire is a domain expert, operating with absolute autonomy to solve complex architecture challenges.' },
              { title: 'RIGOR', desc: 'We maintain a strict operational framework. Code is audited, pixels are measured, and performance is non-negotiable.' },
              { title: 'LEGACY', desc: 'We build systems that endure. Our work is designed to scale across generations of technologies.' }
            ].map((value, i) => (
              <motion.div 
                key={value.title}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-surface-container-lowest"
              >
                <h3 className="text-xs font-black tracking-[0.2em] text-primary mb-4">{value.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-40 bg-surface-container text-center">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-on-surface mb-10">ALIGNED WITH YOUR VISION?</h2>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 text-[11px] font-bold tracking-[0.2em] uppercase bg-primary-container text-white rounded-sm hover:-translate-y-1 transition-all duration-300 shadow-[0_0_30px_rgba(0,112,243,0.3)]"
          >
            INITIATE SEQUENCE →
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
