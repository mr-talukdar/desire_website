import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/client'
import { projectBySlugQuery, projectSlugsQuery } from '@/sanity/lib/queries'
import type { IProject } from '@/types'
import { PortableTextRenderer } from '@/components/ui/PortableTextRenderer'

export const revalidate = 60

// ── Fallback project data ───────────────────────────────────────
// These are demo/boilerplate entries used when Sanity has no data yet.
// Once projects are added in Sanity, these won't be used.
// Each entry follows the IProject shape so the same component renders both.

const FALLBACK_PROJECTS: Record<string, IProject> = {
  'nexus-protocol': {
    _id: 'nexus-fallback',
    _type: 'project',
    title: 'Nexus Protocol',
    slug: { current: 'nexus-protocol' },
    tagline: 'A comprehensive brand identity project focused on creating a cohesive visual language for a growing tech infrastructure company.',
    thumbnail: { asset: { url: '/images/project-infrastructure.png' } },
    heroImage: { url: '/images/project-infrastructure.png' },
    categories: [{ _id: 'cat-1', _type: 'category', name: 'Branding', slug: { current: 'branding' } }],
    publishedAt: '2026-04-10T10:00:00Z',
    clientName: 'Nexus Protocol',
    role: 'Brand Identity & Visual Direction',
    year: '2026',
    tools: ['Figma', 'Illustrator', 'After Effects'],
    overview: [],
    challenge: [],
    solution: [],
    metrics: [
      { _key: '1', value: '3x', label: 'Brand Recognition', description: 'Improved brand recall across all digital touchpoints through a cohesive visual system.' },
      { _key: '2', value: '100%', label: 'Consistent Identity', description: 'Unified brand language applied across web, social, and print - instantly recognizable.' },
      { _key: '3', value: '40%', label: 'Engagement Growth', description: 'Increased audience engagement driven by stronger visual storytelling and clearer messaging.' }
    ]
  },
  'astro-sounds': {
    _id: 'astro-fallback',
    _type: 'project',
    title: 'Astro Sounds',
    slug: { current: 'astro-sounds' },
    tagline: 'Visual identity and content direction for a music production studio looking to stand out in a crowded creative space.',
    thumbnail: { asset: { url: '/images/project-radio.png' } },
    heroImage: { url: '/images/project-radio.png' },
    categories: [{ _id: 'cat-2', _type: 'category', name: 'Branding', slug: { current: 'branding' } }, { _id: 'cat-5', _type: 'category', name: 'UI/UX', slug: { current: 'ui-ux' } }],
    publishedAt: '2026-03-20T10:00:00Z',
    clientName: 'Astro Sounds',
    role: 'Brand Identity & Digital Presence',
    year: '2026',
    tools: ['Figma', 'Photoshop', 'Premiere Pro'],
    overview: [],
    challenge: [],
    solution: [],
    metrics: [
      { _key: '1', value: '2.5x', label: 'Social Engagement', description: 'Social media engagement increased through scroll-stopping visuals and consistent brand presence.' },
      { _key: '2', value: '60%', label: 'Audience Growth', description: 'Grew the brand\'s online following through strategic content and visual storytelling.' },
    ]
  },
  'darkline-suite': {
    _id: 'darkline-fallback',
    _type: 'project',
    title: 'Darkline Suite',
    slug: { current: 'darkline-suite' },
    tagline: 'A full digital presence overhaul for a SaaS platform - from brand refresh to conversion-focused web design.',
    thumbnail: { asset: { url: '/images/project-dashboard.png' } },
    heroImage: { url: '/images/project-dashboard.png' },
    categories: [{ _id: 'cat-3', _type: 'category', name: 'Web/App Development', slug: { current: 'web-app-development' } }],
    publishedAt: '2026-02-15T10:00:00Z',
    clientName: 'Darkline Suite',
    role: 'Web Design & Development',
    year: '2026',
    tools: ['Next.js', 'Figma', 'Vercel'],
    overview: [],
    challenge: [],
    solution: [],
    metrics: [
      { _key: '1', value: '45%', label: 'Conversion Increase', description: 'Improved signup rates through intuitive user journeys and clear calls to action.' },
      { _key: '2', value: '2s', label: 'Load Time', description: 'Optimized performance for fast, frictionless user experiences.' },
    ]
  },
  'echo-studio': {
    _id: 'echo-fallback',
    _type: 'project',
    title: 'Echo Studio',
    slug: { current: 'echo-studio' },
    tagline: 'UI/UX design for a creative studio platform - focused on making complex workflows feel simple and intuitive.',
    thumbnail: { asset: { url: '/images/project-radio.png' } },
    heroImage: { url: '/images/project-radio.png' },
    categories: [{ _id: 'cat-4', _type: 'category', name: 'UI/UX', slug: { current: 'ui-ux' } }],
    publishedAt: '2026-01-10T10:00:00Z',
    clientName: 'Echo Studio',
    role: 'UI/UX Design',
    year: '2026',
    tools: ['Figma', 'Protopie'],
    overview: [],
    challenge: [],
    solution: [],
    metrics: [
      { _key: '1', value: '70%', label: 'Task Completion', description: 'Streamlined user flows led to higher task completion rates across the platform.' },
    ]
  },
  'zenith-industries': {
    _id: 'zenith-fallback',
    _type: 'project',
    title: 'Zenith Industries',
    slug: { current: 'zenith-industries' },
    tagline: 'Brand strategy and digital growth for an industrial services company looking to modernize their market positioning.',
    thumbnail: { asset: { url: '/images/project-infrastructure.png' } },
    heroImage: { url: '/images/project-infrastructure.png' },
    categories: [{ _id: 'cat-6', _type: 'category', name: 'Branding', slug: { current: 'branding' } }],
    publishedAt: '2025-12-05T10:00:00Z',
    clientName: 'Zenith Industries',
    role: 'Brand Strategy & Digital Presence',
    year: '2025',
    tools: ['Figma', 'Illustrator', 'Google Analytics'],
    overview: [],
    challenge: [],
    solution: [],
    metrics: [
      { _key: '1', value: '3x', label: 'Lead Generation', description: 'Tripled inbound leads through clearer positioning and an improved digital presence.' },
      { _key: '2', value: '90%', label: 'Brand Consistency', description: 'Unified messaging across all touchpoints for a professional, cohesive brand experience.' },
    ]
  },
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const project = await sanityFetch<IProject | null>({
    query: projectBySlugQuery,
    params: { slug: params.slug },
    tags: ['project', `project:${params.slug}`],
  })

  // Use fallback if Sanity doesn't have this project
  const fallback = FALLBACK_PROJECTS[params.slug]
  if (!project && fallback) {
    return {
      title: `${fallback.title} | Desire Creatives`,
      description: fallback.tagline,
    }
  }

  const ogImage = project?.seo?.ogImage;
  
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

export default async function ProjectDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  let project = await sanityFetch<IProject | null>({
    query: projectBySlugQuery,
    params: { slug: params.slug },
    tags: ['project', `project:${params.slug}`],
  })

  // Fall back to demo data if Sanity doesn't have this project
  if (!project) {
    const fallback = FALLBACK_PROJECTS[params.slug]
    if (fallback) {
      project = fallback
    } else {
      notFound()
    }
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest pt-20 pb-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">

        {/* Breadcrumb / Top Info */}
        <div className="mb-8 flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/50">
          <Link href="/projects" className="hover:text-on-surface transition-colors">WORK</Link>
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

        {/* Project Meta - Client, Role, Year, Tools */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 py-8 border-y border-outline-variant/10">
          {project.clientName && (
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/50 mb-1">CLIENT</p>
              <p className="text-sm font-semibold text-on-surface">{project.clientName}</p>
            </div>
          )}
          {project.role && (
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/50 mb-1">ROLE</p>
              <p className="text-sm font-semibold text-on-surface">{project.role}</p>
            </div>
          )}
          {project.year && (
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/50 mb-1">YEAR</p>
              <p className="text-sm font-semibold text-on-surface">{project.year}</p>
            </div>
          )}
          {project.categories && project.categories.length > 0 && (
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/50 mb-1">CATEGORY</p>
              <p className="text-sm font-semibold text-on-surface">{project.categories.map(c => c.name).join(', ')}</p>
            </div>
          )}
        </div>

        {/* Hero Image */}
        {project.heroImage?.url && (
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] mb-32 rounded-sm overflow-hidden bg-surface-container border border-outline-variant/20">
            <Image
              src={project.heroImage.url}
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
              {project.overview && project.overview.length > 0 ? (
                 <PortableTextRenderer value={project.overview} />
              ) : (
                <p>
                  This project involved a comprehensive approach to building a brand that stands out, stays consistent, and connects with people. We worked closely with the client to understand their goals and translate them into a creative direction that feels authentic and purposeful.
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
                  {project.challenge && project.challenge.length > 0 ? (
                     <PortableTextRenderer value={project.challenge} />
                  ) : (
                    <p>The existing brand lacked clarity and consistency, making it difficult to stand out in a competitive market. Messaging was scattered, visuals felt disconnected, and the overall brand experience didn&apos;t reflect the quality of the work being done.</p>
                  )}
                </div>
              </div>

              <div className="bg-surface-container-high/50 p-8 rounded-sm border border-outline-variant/5">
                <h3 className="flex items-center gap-2 text-xs font-bold tracking-[0.1em] uppercase text-primary mb-4">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(0,112,243,0.8)]"></span>
                  THE SOLUTION
                </h3>
                <div className="text-sm text-on-surface-variant leading-relaxed">
                  {project.solution && project.solution.length > 0 ? (
                     <PortableTextRenderer value={project.solution} />
                  ) : (
                    <p>We developed a cohesive brand identity system - from visual language to tone of voice - ensuring every touchpoint felt intentional. The result is a brand that communicates clearly, looks premium, and connects authentically with its audience.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools & Technologies */}
        {project.tools && project.tools.length > 0 && (
          <div className="mb-32">
            <h2 className="text-center text-sm font-bold tracking-[0.15em] uppercase text-on-surface mb-12">TOOLS & TECHNOLOGIES</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {project.tools.map((tool) => (
                <span key={tool} className="px-4 py-2 text-[10px] font-bold tracking-widest uppercase border border-outline-variant/20 text-on-surface-variant/60 rounded-full">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Outcomes (Metrics) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-32">
            <h2 className="text-center text-sm font-bold tracking-[0.15em] uppercase text-on-surface mb-2">RESULTS</h2>
            <p className="text-center text-[10px] tracking-[0.1em] uppercase text-on-surface-variant/50 mb-16">Measurable impact from our creative work.</p>
            
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

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-32">
            <h2 className="text-center text-sm font-bold tracking-[0.15em] uppercase text-on-surface mb-12">GALLERY</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery.map((img, i) => (
                <div key={i} className="relative aspect-[4/3] bg-surface-container rounded-sm overflow-hidden border border-outline-variant/10">
                  {img.asset?.url && (
                    <Image
                      src={img.asset.url}
                      alt={img.alt || `${project.title} gallery image ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Project */}
        {project.nextProject && (
          <div className="border-t border-outline-variant/20 pt-20 text-center">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-on-surface-variant/50 mb-4">NEXT PROJECT</p>
            <Link href={`/projects/${project.nextProject.slug.current}`} className="group">
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-on-surface group-hover:text-primary transition-colors">
                {project.nextProject.title}
              </h3>
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}
