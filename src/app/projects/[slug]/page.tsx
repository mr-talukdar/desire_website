import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/client'
import { projectBySlugQuery, projectSlugsQuery } from '@/sanity/lib/queries'
import type { IProject } from '@/types'
import { PortableTextRenderer } from '@/components/ui/PortableTextRenderer'

export const revalidate = 60

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const project = await sanityFetch<IProject | null>({
    query: projectBySlugQuery,
    params: { slug: params.slug },
    tags: ['project', `project:${params.slug}`],
  })

  // Target fallbacks for specific projects if Sanity data is missing
  if (!project && params.slug === 'nexus-protocol') {
    return {
      title: 'Nexus Protocol | Desire Creatives',
      description: 'A foundational infrastructure visual identity redefining how scalable data systems are perceived.',
    }
  }

  const ogImage = project?.seo?.ogImage as any;
  
  return {
    title: project?.seo?.metaTitle || `${project?.title || 'Project'} | Desire Creatives`,
    description: project?.seo?.metaDescription || project?.tagline,
    ...(ogImage?.url ? {
      openGraph: {
        images: [{ url: ogImage.url }],
      }
    } : {}),
  }
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: projectSlugsQuery,
    tags: ['project'],
  })
  
  return slugs.map((s) => ({ slug: s.slug })) || []
}

// Fallback data if Sanity is empty, specifically tailored to match the Stitch design "Nexus Protocol"
const FALLBACK_PROJECT = {
  _id: 'nexus-fallback',
  title: 'Nexus Protocol',
  slug: 'nexus-protocol',
  tagline: 'A foundational infrastructure visual identity redefining how scalable data systems are perceived in the decentralized era.',
  heroImage: { url: '/images/project-infrastructure.png' },
  overview: null,
  challenge: null,
  solution: null,
  metrics: [
    { _key: '1', value: '40%', label: 'Decreased Load Time', description: 'Optimized asset delivery and streamlined DOM structure resulting in faster render times.' },
    { _key: '2', value: '100%', label: 'WCAG 2.1 AA Compliant', description: 'Accessible high-contrast dark mode ensures readability in critical monitoring environments.' },
    { _key: '3', value: '2.4x', label: 'Faster Incident Resolution', description: 'Clearer typographic hierarchy and color-coded alerts reduced average incident response.' }
  ]
} as unknown as IProject

export default async function ProjectDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  let project = await sanityFetch<IProject | null>({
    query: projectBySlugQuery,
    params: { slug: params.slug },
    tags: ['project', `project:${params.slug}`],
  })

  if (!project) {
    if (params.slug === 'nexus-protocol') {
      project = FALLBACK_PROJECT
    } else {
      notFound()
    }
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest pt-20 pb-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">

        {/* Breadcrumb / Top Info */}
        <div className="mb-8 flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/50">
          <Link href="/projects" className="hover:text-on-surface transition-colors">PROJECTS</Link>
          <span>/</span>
          <span className="text-on-surface">{project.title}</span>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tight leading-[0.92] text-on-surface mb-6">
            {project.title}
          </h1>
          <p className="text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Hero Image */}
        {(project.heroImage as any)?.url && (
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] mb-32 rounded-sm overflow-hidden bg-surface-container border border-outline-variant/20">
            <Image
              src={(project.heroImage as any).url}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}

        {/* Content Section: Overview, Challenge, Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32 border-b border-outline-variant/20 pb-32">
          <div className="lg:col-span-3">
             <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-on-surface relative inline-block">
                OVERVIEW
                <span className="absolute -bottom-3 left-0 w-8 h-px bg-primary"></span>
             </h2>
          </div>
          
          <div className="lg:col-span-9 flex flex-col gap-16">
            <div className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-3xl">
              {project.overview ? (
                 <PortableTextRenderer value={project.overview as any} />
              ) : (
                <p>
                  Nexus Protocol required a visual language that matched its technical prowess. The existing brand failed to communicate the speed, reliability, and sheer scale of their devops solutions. We engineered a comprehensive visual system rooted in pure black surfaces and high-frequency electric accents, mirroring the feeling of an optimized, high-performance server environment.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
              <div className="bg-surface-container/50 p-8 rounded-sm border border-outline-variant/10">
                <h3 className="flex items-center gap-2 text-xs font-bold tracking-[0.1em] uppercase text-error mb-4">
                  <span className="w-1.5 h-1.5 bg-error rounded-full"></span>
                  THE CHALLENGE
                </h3>
                <div className="text-sm text-on-surface-variant leading-relaxed">
                  {project.challenge ? (
                     <PortableTextRenderer value={project.challenge as any} />
                  ) : (
                    <p>The legacy interface was cluttered, utilizing outdated 1px border grids and a muddy grey palette that reduced legibility for sysadmins monitoring complex data streams. Crucial alert hierarchies were lost in the visual noise, leading to slower incident response times.</p>
                  )}
                </div>
              </div>

              <div className="bg-surface-container-high/50 p-8 rounded-sm border border-outline-variant/5">
                <h3 className="flex items-center gap-2 text-xs font-bold tracking-[0.1em] uppercase text-primary mb-4">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(0,112,243,0.8)]"></span>
                  THE SOLUTION
                </h3>
                <div className="text-sm text-on-surface-variant leading-relaxed">
                  {project.solution ? (
                     <PortableTextRenderer value={project.solution as any} />
                  ) : (
                    <p>We implemented &apos;The Technical Void&apos; methodology. By moving to a pure black background and utilizing tonal shifts for sectioning, we eliminated structural noise. Data visualization now relies on vibrant, high-contrast colors against absolute black, ensuring instant recognition of system states.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Engineering Outcomes (Metrics) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-32">
            <h2 className="text-center text-sm font-bold tracking-[0.15em] uppercase text-on-surface mb-2">ENGINEERING OUTCOMES</h2>
            <p className="text-center text-[10px] tracking-[0.1em] uppercase text-on-surface-variant/50 mb-16">Quantifiable impact of the new visual architecture.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              {project.metrics.map((metric, i) => (
                <div key={metric._key || i} className="bg-surface-container p-10 border border-outline-variant/10">
                  <div className="text-5xl font-black tracking-tight text-primary mb-4">{metric.value}</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-on-surface mb-3">{metric.label}</div>
                  <div className="text-xs text-on-surface-variant leading-relaxed">{metric.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
