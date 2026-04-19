'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/animations/Reveal'

//  Data 
const SERVICES = [
  {
    number: '01',
    icon: '</>',
    title: 'Development',
    description: 'Robust, scalable architecture. React, Node, WebGL, and complex system integrations.',
  },
  {
    number: '02',
    icon: 'K',
    title: 'Design',
    description: 'High-fidelity interfaces. User-centric flows mapped with surgical precision.',
  },
  {
    number: '03',
    icon: '',
    title: 'Branding',
    description: 'Identity systems engineered for the void. Typography, motion, and visual logic.',
  },
  {
    number: '04',
    icon: '',
    title: 'Growth',
    description: 'Data-driven scaling. Technical SEO, performance optimization, and conversion engineering.',
  },
]

const FEATURED_PROJECTS = [
  {
    slug: 'astro-sounds',
    title: 'Astro Sounds',
    categories: ['VISUAL', 'PRODUCT'],
    image: '/images/project-radio.png',
  },
  {
    slug: 'nexus-protocol',
    title: 'Nexus Protocol',
    categories: ['DEV', 'SYSTEMS'],
    image: '/images/project-infrastructure.png',
  },
]

const RECENT_PROJECTS = [
  {
    slug: 'darkline-suite',
    title: 'Darkline Suite',
    categories: ['SAAS', 'WEB'],
    image: '/images/project-dashboard.png',
  },
  {
    slug: 'echo-studio',
    title: 'Echo Studio',
    categories: ['UI', 'UX'],
    image: '/images/project-radio.png',
  },
  {
    slug: 'zenith-industries',
    title: 'Zenith Industries',
    categories: ['DEV', 'INFRA'],
    image: '/images/project-infrastructure.png',
  },
]

const METHODOLOGY = [
  {
    number: '01',
    phase: 'PHASE',
    title: 'Discover',
    description: 'System analysis, objective setting, and architecture planning.',
  },
  {
    number: '02',
    phase: 'PHASE',
    title: 'Design',
    description: 'Prototyping, visual language definition, and interaction mapping.',
  },
  {
    number: '03',
    phase: 'PHASE',
    title: 'Build',
    description: 'Engineering, integration, and rigorous quality assurance.',
  },
  {
    number: '04',
    phase: 'PHASE',
    title: 'Scale',
    description: 'Deployment, performance monitoring, and iterative optimization.',
  },
]

const LOGO_NAMES = ['Accenture', 'Capstone', 'Landing Grid', 'Provident Fusion', 'Mondo']

//  Page Component
export default function Home() {
  return (
    <>
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
          {/* Background Gradient / Void effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-surface-container-lowest to-surface-container-lowest pointer-events-none" />
          
          {/* Decorative Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

          <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 w-full z-10 pt-20">
            <Reveal direction="up" delay={0.1} duration={0.8} distance={20}>
              <div className="max-w-4xl">
               <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black uppercase tracking-tight leading-[0.92] text-on-surface mb-8">
                 ENGINEERING<br />
                 <span className="text-primary relative inline-block">
                    DIGITAL DOMINANCE
                    <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary/40 rounded-full" />
                 </span>
               </h1>
               
               <p className="text-base md:text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-12">
                 Desire Creatives is a high-end digital agency. We build sophisticated machines, not templates. Precision methodology for brands that demand absolute market leverage.
               </p>

               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                 <Link href="/contact" className="px-8 py-4 text-[11px] font-bold tracking-[0.15em] uppercase bg-primary-container text-white rounded-sm hover:bg-primary-container/90 transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.3)] hover:shadow-[0_0_30px_rgba(0,112,243,0.5)] group relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      INITIATE PROTOCOL
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                 </Link>
                 <Link href="/agency" className="text-[11px] font-bold tracking-[0.15em] uppercase text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2">
                    OUR METHODOLOGY
                 </Link>
               </div>
              </div>
            </Reveal>
          </div>
        </section>

      <Reveal direction="none" delay={0.2} duration={1.2}>
        {/* SECTION 2: LOGO CLOUD / TRUSTED BY */}
        <section className="py-14 border-y border-outline-variant/10 overflow-hidden">
          <p className="mb-8 text-center text-[10px] font-semibold tracking-[0.3em] uppercase text-on-surface-variant/40">
            Trusted by industry leaders
          </p>
          <div className="flex items-center justify-center gap-12 md:gap-20 flex-wrap px-6">
            {LOGO_NAMES.map((name) => (
              <span
                key={name}
                className="text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant/25 hover:text-on-surface-variant/50 transition-colors duration-300"
              >
                {name}
              </span>
            ))}
          </div>
        </section>
      </Reveal>

        {/* SECTION 3: CORE COMPETENCIES (Services) */}
        <section id="services" className="py-20 md:py-28 bg-surface-container">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <Reveal direction="up" distance={30} stagger={0.1}>
              {/* Header */}
              <div className="flex items-end justify-between mb-12">
                <h2 className="text-3xl font-black uppercase tracking-tight text-on-surface md:text-4xl">
                  CORE COMPETENCIES
                </h2>
                <div>
                  <Link
                    href="/services"
                    className="hidden md:inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-on-surface-variant hover:text-primary transition-colors"
                  >
                    ALL SERVICES <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Tagline */}
              <p className="mb-10 text-sm text-on-surface-variant max-w-md">
                Precision tools engineered for absolute market advantage.
              </p>
            </Reveal>

            {/* Service Cards  2x2 Grid */}
            <Reveal direction="up" distance={40} stagger={0.1}>
              <div className="grid gap-px bg-outline-variant/10 md:grid-cols-2">
              {SERVICES.map((service, i) => (
                <div
                  key={service.title}
                  className="group p-8 md:p-10 bg-surface-container hover:bg-surface-container-high transition-colors duration-300"
                >
                  {/* Top row  icon + number */}
                  <div className="flex items-start justify-between mb-10">
                    <span className="text-2xl text-on-surface-variant/60 font-mono">
                      {service.icon}
                    </span>
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-on-surface-variant/30">
                      {service.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-on-surface group-hover:text-primary transition-colors duration-200">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
            </Reveal>
          </div>
        </section>
      {/* SECTION 4: SELECTED OUTPUT (Featured Projects) */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal direction="up" distance={20} stagger={0.1}>
            <h2 className="mb-14 text-3xl font-black uppercase tracking-tight text-on-surface md:text-4xl">
              SELECTED OUTPUT
            </h2>
          </Reveal>

          <Reveal direction="up" distance={40} stagger={0.15}>
            <div className="space-y-10">
              {FEATURED_PROJECTS.map((project, i) => (
                <div key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className="group block">
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-surface-container">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1440px) 100vw, 1440px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/70 via-transparent to-transparent" />
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 mt-4">
                      {project.categories.map((cat) => (
                        <span
                          key={cat}
                          className="text-[10px] font-bold tracking-[0.15em] uppercase text-on-surface-variant/50"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-1 text-xl font-bold text-on-surface group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 5: RECENT PROJECTS (3-col grid) */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal direction="up" distance={20} stagger={0.1}>
            <h2 className="mb-14 text-3xl font-black uppercase tracking-tight text-on-surface md:text-4xl">
              RECENT PROJECTS
            </h2>
          </Reveal>

          <Reveal direction="up" distance={30} stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {RECENT_PROJECTS.map((project, i) => (
                <div key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface-container">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      {project.categories.map((cat) => (
                        <span
                          key={cat}
                          className="text-[10px] font-bold tracking-[0.15em] uppercase text-on-surface-variant/50"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-1 text-base font-bold text-on-surface group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 6: METHODOLOGY */}
      <section id="process" className="py-20 md:py-28 bg-surface-container">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal direction="up" distance={30} stagger={0.1}>
            <h2 className="mb-4 text-3xl font-black uppercase tracking-tight text-on-surface md:text-4xl">
              METHODOLOGY
            </h2>
            <p className="mb-16 text-sm text-on-surface-variant max-w-md">
              A strict operational framework for digital excellence.
            </p>
          </Reveal>

          <Reveal direction="up" distance={40} stagger={0.1}>
            <div className="grid gap-8 md:grid-cols-4">
              {METHODOLOGY.map((step, i) => (
                <div key={step.title} className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/40">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/40">
                      / {step.phase}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-bold uppercase tracking-wide text-on-surface">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 7: CTA LET'S BUILD SOMETHING GREAT */}
      <section className="py-28 md:py-40">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal direction="up" distance={40} stagger={0.15}>
            <h2 className="mb-10 text-4xl font-black uppercase leading-[0.92] tracking-tight text-on-surface md:text-6xl lg:text-7xl">
              LET&apos;S BUILD<br />
              SOMETHING GREAT.
            </h2>

            <form
              className="flex flex-col items-center gap-3 sm:flex-row sm:max-w-lg sm:mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-5 py-3.5 bg-surface-container border border-outline-variant/30 rounded-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 transition-all duration-200 text-sm"
              />
              <button
                type="submit"
                className="flex-shrink-0 px-7 py-3.5 text-[11px] font-semibold tracking-[0.15em] uppercase bg-primary-container text-white rounded-sm hover:bg-primary-container/90 transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.25)]"
              >
                LET&apos;S TALK
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
