'use client'

import { ReactNode, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface RevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  distance?: number
  stagger?: number
}

export function Reveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.8, 
  distance = 30,
  stagger = 0 
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const x = direction === 'left' ? -distance : direction === 'right' ? distance : 0
    const y = direction === 'up' ? distance : direction === 'down' ? -distance : 0

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element.children,
        { 
          opacity: 0, 
          x, 
          y 
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, elementRef)

    return () => ctx.revert()
  }, [direction, delay, duration, distance, stagger])

  return <div ref={elementRef}>{children}</div>
}
