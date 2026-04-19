'use client'

import {useState} from 'react'
import Link from 'next/link'
import {motion, AnimatePresence} from 'framer-motion'

const NAV_ITEMS = [
  { label: 'WORK', href: '/projects' },
  { label: 'SERVICES', href: '/services' },
  { label: 'AGENCY', href: '/agency' },
  { label: 'PROCESS', href: '/process' },
  { label: 'INSIGHTS', href: '/blog' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="relative flex items-center justify-between max-w-[1440px] mx-auto px-6 py-5 md:px-10">
        {/* Glassmorphism backdrop */}
        <div className="absolute inset-0 bg-surface-container-lowest/70 backdrop-blur-xl" />

        {/* Logo */}
        <Link
          href="/"
          className="relative z-10 text-xs font-bold tracking-[0.2em] uppercase text-on-surface"
        >
          DESIRE CREATIVES
        </Link>

        {/* Desktop Nav */}
        <div className="relative z-10 items-center hidden gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] font-medium tracking-[0.15em] uppercase text-on-surface-variant hover:text-on-surface transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA + Mobile toggle */}
        <div className="relative z-10 flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center px-5 py-2.5 text-[11px] font-semibold tracking-[0.15em] uppercase bg-primary-container text-white rounded-sm hover:bg-primary-container/90 transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.25)]"
          >
            START A PROJECT
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col items-center justify-center w-8 h-8 gap-1.5 lg:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? {rotate: 45, y: 5} : {rotate: 0, y: 0}}
              className="w-5 h-px bg-on-surface"
            />
            <motion.span
              animate={mobileOpen ? {opacity: 0} : {opacity: 1}}
              className="w-5 h-px bg-on-surface"
            />
            <motion.span
              animate={mobileOpen ? {rotate: -45, y: -5} : {rotate: 0, y: 0}}
              className="w-5 h-px bg-on-surface"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            transition={{duration: 0.3, ease: 'easeInOut'}}
            className="overflow-hidden bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/10 lg:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{opacity: 0, x: -20}}
                  animate={{opacity: 1, x: 0}}
                  transition={{delay: i * 0.05}}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-medium tracking-[0.15em] uppercase text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center mt-2 px-5 py-3 text-xs font-semibold tracking-[0.15em] uppercase bg-primary-container text-white rounded-sm sm:hidden"
              >
                START A PROJECT
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
