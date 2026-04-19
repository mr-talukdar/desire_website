'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const SERVICES = [
  {
    id: 'development',
    icon: '</>',
    title: 'Full-Stack Development',
    kicker: 'SCALABLE ARCHITECTURE',
    desc: 'We engineer robust digital machines using React, Node.js, and modern distributed systems. Our codebases are designed for the infinite void, ensuring your application handles massive growth without structural failure.',
    tags: ['React/Next.js', 'PostgreSQL', 'WebGL', 'AWS/GCP']
  },
  {
    id: 'design',
    icon: 'K',
    title: 'UI/UX Design',
    kicker: 'SURGICAL PRECISION',
    desc: 'High-fidelity interfaces mapped with geometric letterforms and obsidian surfaces. We prioritize hierarchy and speed, creating user experiences that feel instantaneous and premium.',
    tags: ['Figma Engineering', 'Motion Prototyping', 'Design Systems', 'Visual Logic']
  },
  {
    id: 'branding',
    icon: 'Λ',
    title: 'Identity Systems',
    kicker: 'TOTAL BRANDING',
    desc: 'Brand identities engineered for consistency and impact. We build the visual logic that defines your markets, from typography to complex motion languages.',
    tags: ['Typography', 'Logistics', 'Guidelines', 'Asset Creation']
  },
  {
    id: 'growth',
    icon: '⊕',
    title: 'Growth & SEO',
    kicker: 'DATA DOMINANCE',
    desc: 'Performance optimization as a first-class citizen. We engineer your presence to dominate search rankings and maximize technical conversion across all segments.',
    tags: ['Technical SEO', 'Analytics', 'Conversion Tuning', 'Meta-Eng']
  }
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest pt-20">
      {/* Header */}
      <section className="py-20 md:py-32 bg-surface-container border-b border-outline-variant/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-on-surface mb-8">
              OPERATIONAL<br />CAPABILITIES.
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-on-surface-variant">
              Precision tools engineered for absolute market advantage. We provide the technical backbone for innovative teams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detailed Grid */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="flex flex-col gap-32">
            {SERVICES.map((service, i) => (
              <motion.div 
                key={service.id}
                {...fadeUp}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-4 block">0{i + 1} / {service.kicker}</span>
                  <div className="flex items-center gap-6 mb-8">
                    <span className="text-4xl font-mono text-on-surface-variant/40">{service.icon}</span>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-on-surface">{service.title}</h2>
                  </div>
                  <p className="text-base text-on-surface-variant leading-relaxed mb-8 max-w-xl">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase border border-outline-variant/20 text-on-surface-variant/60 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Visual Placeholder for Services */}
                <div className={`aspect-square bg-surface-container border border-outline-variant/10 rounded-sm overflow-hidden flex items-center justify-center p-20 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="text-[10vw] font-black text-on-surface-variant/5 select-none font-mono">
                    {service.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-40 bg-surface-container text-center">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-on-surface mb-10">READY TO DEPLOY?</h2>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 text-[11px] font-bold tracking-[0.2em] uppercase bg-primary-container text-white rounded-sm hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(0,112,243,0.3)]"
          >
            START PROJECT ENGINE →
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
