'use client'

import { useActionState } from 'react'
import { motion } from 'framer-motion'
import { submitContactForm } from '@/actions/contact'

type ContactFormState = {
  success?: boolean;
  error?: string | null;
}

const initialState: ContactFormState = {
  success: false,
  error: null,
}

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  return (
    <div className="min-h-screen bg-surface-container-lowest pt-20 pb-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start max-w-6xl mx-auto">
          {/* Left Column: Copy */}
          <div className="lg:sticky lg:top-32">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.92] text-on-surface mb-8"
            >
              INITIATE<br />CONTACT.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm md:text-base text-on-surface-variant leading-relaxed max-w-md mb-12"
            >
              Ready to engineer a digital machine that dominates its market? Provide your project parameters below and our deployment team will respond within 24 hours.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/50 mb-2">OPERATIONAL HEADQUARTERS</h3>
                <p className="text-sm text-on-surface">12B Technical Void<br />Neo-London, Sector 4<br />UK</p>
              </div>
              <div>
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/50 mb-2">DIRECT COMMUNICATION</h3>
                <a href="mailto:hello@desirecreatives.com" className="text-sm text-on-surface hover:text-primary transition-colors">hello@desirecreatives.com</a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-surface-container p-8 md:p-12 border border-outline-variant/10 rounded-sm"
          >
            {state?.success ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center mb-6">
                  <span className="text-primary text-2xl">✓</span>
                </div>
                <h2 className="text-2xl font-bold uppercase tracking-tight text-on-surface mb-4">Transmission Received</h2>
                <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
                  Your inquiry has been integrated into our system. An engineer will follow up shortly.
                </p>
              </div>
            ) : (
              <form action={formAction} className="flex flex-col gap-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="name" className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/70">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/20"
                      placeholder="Jane Doe"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="email" className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/70">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/20"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 relative">
                  <label htmlFor="company" className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/70">Company / Organization</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/20"
                    placeholder="Acme Corp"
                  />
                </div>

                <div className="flex flex-col gap-2 relative">
                  <label htmlFor="message" className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/70">Project Parameters *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    rows={5}
                    className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/20 resize-none"
                    placeholder="Describe your objectives, timeline, and technical requirements..."
                  />
                </div>

                {state?.error && (
                  <div className="text-error text-xs font-medium bg-error/10 p-3 rounded-sm border border-error/20">
                    {state.error}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isPending}
                  className="mt-4 px-8 py-4 text-[11px] font-bold tracking-[0.15em] uppercase bg-primary-container text-white rounded-sm hover:bg-primary-container/90 transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.3)] hover:shadow-[0_0_30px_rgba(0,112,243,0.5)] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isPending ? 'TRANSMITTING...' : 'INITIALIZE SEQUENCE'}
                    {!isPending && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                  </span>
                </button>
                
              </form>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  )
}
