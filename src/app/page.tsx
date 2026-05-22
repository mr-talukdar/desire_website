import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/animations/Reveal'
import { sanityFetch } from '@/sanity/lib/client'
import { featuredProjectsQuery, allProjectsQuery } from '@/sanity/lib/queries'
import type { IProject } from '@/types'

//  Data 
const SERVICES = [
  {
    number: '01',
    icon: '◆',
    title: 'Brand Identity',
    description: 'We define how your brand looks, feels, and communicates - so it\'s clear, consistent, and instantly recognizable.',
  },
  {
    number: '02',
    icon: '▶',
    title: 'Content Production',
    description: 'High-quality visuals, creatives, and social content designed to capture attention and hold it.',
  },
  {
    number: '03',
    icon: '◎',
    title: 'Creative Direction',
    description: 'We shape ideas into cohesive narratives that align with your brand and stand out in a crowded space.',
  },
  {
    number: '04',
    icon: '⊕',
    title: 'Digital Growth',
    description: 'Once the creative works, we help amplify it through structured campaigns and smart distribution.',
  },
]

const FALLBACK_FEATURED_PROJECTS: IProject[] = [
  {
    _id: 'featured-1',
    _type: 'project',
    slug: { current: 'astro-sounds' },
    title: 'Astro Sounds',
    categories: [{ _id: 'cat1', _type: 'category', name: 'VISUAL', slug: { current: 'visual' } }, { _id: 'cat2', _type: 'category', name: 'PRODUCT', slug: { current: 'product' } }],
    thumbnail: { asset: { url: '/images/project-radio.png' } },
    tagline: '',
    publishedAt: '2026-04-10T10:00:00Z',
    overview: []
  },
  {
    _id: 'featured-2',
    _type: 'project',
    slug: { current: 'nexus-protocol' },
    title: 'Nexus Protocol',
    categories: [{ _id: 'cat3', _type: 'category', name: 'DEV', slug: { current: 'dev' } }, { _id: 'cat4', _type: 'category', name: 'SYSTEMS', slug: { current: 'systems' } }],
    thumbnail: { asset: { url: '/images/project-infrastructure.png' } },
    tagline: '',
    publishedAt: '2026-04-10T10:00:00Z',
    overview: []
  },
]

const FALLBACK_RECENT_PROJECTS: IProject[] = [
  {
    _id: 'recent-1',
    _type: 'project',
    slug: { current: 'darkline-suite' },
    title: 'Darkline Suite',
    categories: [{ _id: 'cat5', _type: 'category', name: 'SAAS', slug: { current: 'saas' } }, { _id: 'cat6', _type: 'category', name: 'WEB', slug: { current: 'web' } }],
    thumbnail: { asset: { url: '/images/project-dashboard.png' } },
    tagline: '',
    publishedAt: '2026-04-10T10:00:00Z',
    overview: []
  },
  {
    _id: 'recent-2',
    _type: 'project',
    slug: { current: 'echo-studio' },
    title: 'Echo Studio',
    categories: [{ _id: 'cat7', _type: 'category', name: 'UI', slug: { current: 'ui' } }, { _id: 'cat8', _type: 'category', name: 'UX', slug: { current: 'ux' } }],
    thumbnail: { asset: { url: '/images/project-radio.png' } },
    tagline: '',
    publishedAt: '2026-04-10T10:00:00Z',
    overview: []
  },
  {
    _id: 'recent-3',
    _type: 'project',
    slug: { current: 'zenith-industries' },
    title: 'Zenith Industries',
    categories: [{ _id: 'cat9', _type: 'category', name: 'DEV', slug: { current: 'dev' } }, { _id: 'cat10', _type: 'category', name: 'INFRA', slug: { current: 'infra' } }],
    thumbnail: { asset: { url: '/images/project-infrastructure.png' } },
    tagline: '',
    publishedAt: '2026-04-10T10:00:00Z',
    overview: []
  },
]

const METHODOLOGY = [
  {
    number: '01',
    title: 'Understand',
    description: 'We start by understanding your brand, audience, and what you actually need to achieve.',
  },
  {
    number: '02',
    title: 'Shape',
    description: 'We develop ideas and creative direction that align with your goals and stand out.',
  },
  {
    number: '03',
    title: 'Create',
    description: 'From content to campaigns, we bring ideas to life with clarity and consistency.',
  },
  {
    number: '04',
    title: 'Refine',
    description: 'We review, improve, and evolve - making sure the work stays relevant and effective.',
  },
]

//  Page Component
export default async function Home() {
  const sanityFeaturedProjects = await sanityFetch<IProject[]>({
    query: featuredProjectsQuery,
    params: { limit: 2 },
    tags: ['project'],
  })

  const sanityRecentProjects = await sanityFetch<IProject[]>({
    query: allProjectsQuery,
    tags: ['project'],
  })

  const displayFeaturedProjects = sanityFeaturedProjects?.length > 0 ? sanityFeaturedProjects : FALLBACK_FEATURED_PROJECTS
  const displayRecentProjects = sanityRecentProjects?.length > 0 ? sanityRecentProjects.slice(0, 3) : FALLBACK_RECENT_PROJECTS

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
               <h1 className="text-[2.25rem] sm:text-2xl md:text-4xl lg:text-[4.5rem] font-black uppercase tracking-tight leading-[1] md:leading-[0.92] text-on-surface mb-8">
                 YOUR BRAND <br className="sm:hidden" />
                 HAS{' '}
                 <span className="text-primary relative inline-block mt-2 sm:mt-0">
                    POTENTIAL.
                    <div className="absolute -bottom-1 left-0 w-1/3 h-1 bg-primary/40 rounded-full" />
                 </span>
                 <br />
                 <span className="text-on-surface-variant/70 block mt-3 sm:mt-0 text-[1.75rem] sm:text-xl md:text-3xl lg:text-[4rem] leading-[1.1]">WE MAKE IT OBVIOUS.</span>
               </h1>
               
               <p className="text-base md:text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-12">
                 We&apos;re a creative agency that helps businesses stand out, stay relevant, and turn attention into real opportunities.
               </p>

               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                 <Link href="/contact" className="px-8 py-4 text-[11px] font-bold tracking-[0.15em] uppercase bg-primary-container text-white rounded-sm hover:bg-primary-container/90 transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.3)] hover:shadow-[0_0_30px_rgba(0,112,243,0.5)] group relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      START A PROJECT
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                 </Link>
                 <Link href="/services" className="text-[11px] font-bold tracking-[0.15em] uppercase text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2">
                    OUR SERVICES
                 </Link>
               </div>
              </div>
            </Reveal>
          </div>
        </section>

      {/* SECTION 2: LOGO CLOUD / TRUSTED BY - Commented out, will add later */}
      {/*
      <Reveal direction="none" delay={0.2} duration={1.2}>
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
      */}

        {/* SECTION 3: CORE COMPONENTS (Services) */}
        <section id="services" className="py-20 md:py-28 bg-surface-container">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <Reveal direction="up" distance={30} stagger={0.1}>
              {/* Header */}
              <div className="flex items-end justify-between mb-12">
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-on-surface md:text-4xl">
                  CORE COMPONENTS
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
                We combine creative thinking with structured execution to build brands that actually work.
              </p>
            </Reveal>

            {/* Service Cards  2x2 Grid */}
            <Reveal direction="up" distance={40} stagger={0.1}>
              <div className="grid gap-px bg-outline-variant/10 md:grid-cols-2">
              {SERVICES.map((service) => (
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

      {/* SECTION 4: SELECTED WORK & EXPLORATIONS */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal direction="up" distance={20} stagger={0.1}>
            <h2 className="mb-4 text-2xl sm:text-3xl font-black uppercase tracking-tight text-on-surface md:text-4xl">
              SELECTED WORK &amp; EXPLORATIONS
            </h2>
            <p className="mb-14 text-sm text-on-surface-variant max-w-lg">
              A glimpse into how we think, create, and approach brand-building.
            </p>
          </Reveal>

          <Reveal direction="up" distance={40} stagger={0.15}>
            <div className="space-y-10">
              {displayFeaturedProjects.map((project) => {
                const slugStr = typeof project.slug === 'string' ? project.slug : project.slug.current;
                return (
                  <div key={project._id}>
                    <Link href={`/projects/${slugStr}`} className="group block">
                      {/* Image */}
                      <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-surface-container">
                        {project.thumbnail?.url && (
                          <Image
                            src={project.thumbnail.url}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1440px) 100vw, 1440px"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/70 via-transparent to-transparent" />
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-4 mt-4">
                        {project.categories?.map((cat) => (
                          <span
                            key={cat._id}
                            className="text-[10px] font-bold tracking-[0.15em] uppercase text-on-surface-variant/50"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                      <h3 className="mt-1 text-xl font-bold text-on-surface group-hover:text-primary transition-colors duration-200">
                        {project.title}
                      </h3>
                    </Link>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 5: RECENT WORK (3-col grid) */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal direction="up" distance={20} stagger={0.1}>
            <h2 className="mb-4 text-2xl sm:text-3xl font-black uppercase tracking-tight text-on-surface md:text-4xl">
              RECENT WORK
            </h2>
            <p className="mb-14 text-sm text-on-surface-variant max-w-lg">
              A mix of concepts, experiments, and ongoing work - built to explore ideas and push creative boundaries.
            </p>
          </Reveal>

          <Reveal direction="up" distance={30} stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {displayRecentProjects.map((project) => {
                const slugStr = typeof project.slug === 'string' ? project.slug : project.slug.current;
                return (
                  <div key={project._id}>
                    <Link href={`/projects/${slugStr}`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface-container">
                        {project.thumbnail?.url && (
                          <Image
                            src={project.thumbnail.url}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        {project.categories?.map((cat) => (
                          <span
                            key={cat._id}
                            className="text-[10px] font-bold tracking-[0.15em] uppercase text-on-surface-variant/50"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                      <h3 className="mt-1 text-base font-bold text-on-surface group-hover:text-primary transition-colors duration-200">
                        {project.title}
                      </h3>
                    </Link>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 6: THE CREATIVE FRAMEWORK */}
      <section id="process" className="py-20 md:py-28 bg-surface-container">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal direction="up" distance={30} stagger={0.1}>
            <h2 className="mb-4 text-2xl sm:text-3xl font-black uppercase tracking-tight text-on-surface md:text-4xl">
              THE CREATIVE FRAMEWORK
            </h2>
            <p className="mb-16 text-sm text-on-surface-variant max-w-md">
              Good work doesn&apos;t happen randomly - it&apos;s built with intent.
            </p>
          </Reveal>

          <Reveal direction="up" distance={40} stagger={0.1}>
            <div className="grid gap-8 md:grid-cols-4">
              {METHODOLOGY.map((step) => (
                <div key={step.title} className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/40">
                      {step.number}
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

      {/* SECTION 7: FINAL CTA */}
      <section className="py-28 md:py-40">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal direction="up" distance={40} stagger={0.15}>
            <h2 className="mb-6 text-3xl sm:text-4xl font-black uppercase leading-[1.1] md:leading-[0.92] tracking-tight text-on-surface md:text-6xl lg:text-7xl">
              LET&apos;S BUILD SOMETHING<br />
              THAT PEOPLE REMEMBER.
            </h2>

            <p className="mb-10 text-base text-on-surface-variant max-w-xl mx-auto">
              Tell us what you&apos;re working on - we&apos;ll help you shape it into something that actually stands out.
            </p>

            <form
              className="flex flex-col items-center gap-3 sm:flex-row sm:max-w-lg sm:mx-auto"
              action="/contact"
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
