'use client'

import {useState, useEffect, useCallback} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import type {ITestimonialsSection} from '@/types'
import {ImageAsset} from '@/components/ui/ImageAsset'

interface TestimonialCarouselProps {
  data: ITestimonialsSection
}

export function TestimonialCarousel({data}: TestimonialCarouselProps) {
  const testimonials = data.testimonials || []
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return
    const interval = setInterval(next, 6000)
    return () => clearInterval(interval)
  }, [next, testimonials.length])

  if (testimonials.length === 0) return null
  const item = testimonials[current]

  return (
    <section className="py-20 md:py-28 bg-surface-container">
      <div className="max-w-4xl px-6 mx-auto">
        {data.headline && (
          <h2 className="mb-12 text-xs font-semibold tracking-[0.3em] uppercase text-center text-on-surface-variant">
            {data.headline}
          </h2>
        )}

        <div className="relative min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={item._id}
              initial={{opacity: 0, x: 40}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: -40}}
              transition={{duration: 0.4, ease: 'easeInOut'}}
              className="text-center"
            >
              {/* Quote */}
              <blockquote className="mb-8 text-xl leading-relaxed text-on-surface md:text-2xl lg:text-3xl font-light">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                {item.authorAvatar && (
                  <div className="relative w-12 h-12 overflow-hidden rounded-full bg-surface-container-high">
                    <ImageAsset
                      image={item.authorAvatar}
                      alt={item.authorName}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="text-left">
                  <p className="text-sm font-semibold text-on-surface">
                    {item.authorName}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {item.authorTitle}, {item.authorCompany}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="text-on-surface-variant hover:text-on-surface transition-colors text-sm"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'bg-primary-container w-6'
                      : 'bg-outline-variant/40 hover:bg-outline-variant'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="text-on-surface-variant hover:text-on-surface transition-colors text-sm"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
