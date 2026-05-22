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
    <div className="min-h-screen bg-surface-container-lowest">
      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b border-outline-variant/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-6">ABOUT US</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-on-surface mb-8">
              BUILT FOR BRANDS<br />THAT REFUSE<br />TO BLEND IN.
            </h1>
            <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
              We started with a simple observation - most brands don&apos;t lack effort, they lack clarity. In a world full of noise, being average is easy. Being remembered takes intent. That&apos;s where we come in.
            </p>
            <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl mt-4">
              We&apos;re a creative agency focused on building brands that stand out, stay consistent, and actually connect with people. Not just through design or content, but through clear thinking and purposeful execution.
            </p>
            <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl mt-4">
              As a growing team, we bring fresh perspective, close collaboration, and a genuine investment in the work we do. No inflated promises, no unnecessary complexity - just thoughtful ideas, well executed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How We Think Section */}
      <section className="py-20 md:py-32 bg-surface-container">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl font-black uppercase tracking-tight text-on-surface mb-6">HOW WE THINK</h2>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed mb-6">
                We believe good work comes from understanding first, not rushing to execute. Every brand is different, so every approach should be too.
              </p>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                We focus on clarity over clutter, consistency over chaos, and ideas that actually make sense for your business. Because in the end, it&apos;s not about doing more - it&apos;s about doing what works.
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="bg-surface-container-high p-10 md:p-14 border border-outline-variant/10 rounded-sm">
              <h3 className="text-xl font-bold uppercase tracking-tight text-on-surface mb-6 italic">&quot;A brand is no longer what we tell the consumer it is - it is what consumers tell each other it is.&quot;</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                - Scott Cook
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* USP / Values Grid */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/10">
            {[
              { 
                title: 'STRATEGY FIRST', 
                desc: 'Good design isn\'t decoration - it\'s direction. Every idea, visual, and campaign starts with a clear understanding of the brand, the audience, and the objective it needs to serve.' 
              },
              { 
                title: 'CONSISTENCY BUILDS', 
                desc: 'Recognition doesn\'t happen by chance - it\'s built over time. We maintain clarity in visuals, tone, and messaging so your brand feels familiar, trustworthy, and easy to remember.' 
              },
              { 
                title: 'CREATIVITY WITH PURPOSE', 
                desc: 'Being different is easy. Being effective is harder. We focus on ideas that not only stand out, but also make sense - aligned with your goals and built to deliver real impact.' 
              }
            ].map((value) => (
              <motion.div 
                key={value.title}
                {...fadeUp}
                transition={{ delay: 0.1 }}
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
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-on-surface mb-6">LET&apos;S BUILD SOMETHING<br />THAT PEOPLE REMEMBER.</h2>
          <p className="text-base text-on-surface-variant mb-10 max-w-lg mx-auto">Tell us what you&apos;re working on - we&apos;ll help you shape it into something that actually stands out.</p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 text-[11px] font-bold tracking-[0.2em] uppercase bg-primary-container text-white rounded-sm hover:-translate-y-1 transition-all duration-300 shadow-[0_0_30px_rgba(0,112,243,0.3)]"
          >
            START A PROJECT →
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
