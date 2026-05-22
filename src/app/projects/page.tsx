import { sanityFetch } from '@/sanity/lib/client'
import { allProjectsQuery } from '@/sanity/lib/queries'
import type { IProject } from '@/types'
import { ProjectsGallery } from '@/components/sections/ProjectsGallery'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Creative Explorations | Desire Creatives',
  description: 'A look at how we think, create, and approach brand-building - through concepts, experiments, and real executions.',
}

export const revalidate = 60

const FALLBACK_PROJECTS: IProject[] = [
  {
    _id: '1',
    _type: 'project',
    slug: { current: 'astro-sounds' },
    title: 'Astro Sounds',
    tagline: 'Visual identity and content direction for a music production studio',
    thumbnail: { asset: { url: '/images/project-radio.png' } },
    categories: [{ _id: 'c1', _type: 'category', name: 'Branding', slug: { current: 'branding' } }],
    publishedAt: '2026-04-10T10:00:00Z',
    overview: []
  },
  {
    _id: '2',
    _type: 'project',
    slug: { current: 'nexus-protocol' },
    title: 'Nexus Protocol',
    tagline: 'Brand identity for a growing tech infrastructure company',
    thumbnail: { asset: { url: '/images/project-infrastructure.png' } },
    categories: [{ _id: 'c2', _type: 'category', name: 'Branding', slug: { current: 'branding' } }],
    publishedAt: '2026-04-10T10:00:00Z',
    overview: []
  },
  {
    _id: '3',
    _type: 'project',
    slug: { current: 'darkline-suite' },
    title: 'Darkline Suite',
    tagline: 'Digital presence overhaul for a SaaS platform',
    thumbnail: { asset: { url: '/images/project-dashboard.png' } },
    categories: [{ _id: 'c3', _type: 'category', name: 'Web/App Development', slug: { current: 'web-app-development' } }],
    publishedAt: '2026-03-15T10:00:00Z',
    overview: []
  },
  {
    _id: '4',
    _type: 'project',
    slug: { current: 'echo-studio' },
    title: 'Echo Studio',
    tagline: 'UI/UX design for a creative studio platform',
    thumbnail: { asset: { url: '/images/project-radio.png' } },
    categories: [{ _id: 'c4', _type: 'category', name: 'UI/UX', slug: { current: 'ui-ux' } }],
    publishedAt: '2026-02-10T10:00:00Z',
    overview: []
  },
  {
    _id: '5',
    _type: 'project',
    slug: { current: 'zenith-industries' },
    title: 'Zenith Industries',
    tagline: 'Brand strategy and digital growth for an industrial services company',
    thumbnail: { asset: { url: '/images/project-infrastructure.png' } },
    categories: [{ _id: 'c5', _type: 'category', name: 'Branding', slug: { current: 'branding' } }],
    publishedAt: '2026-01-05T10:00:00Z',
    overview: []
  },
]

export default async function ProjectsPage() {
  const projects = await sanityFetch<IProject[]>({
    query: allProjectsQuery,
    tags: ['project'],
  })

  // Use fallback data if Sanity is empty (to match Stitch design out of the box)
  const displayProjects = (!projects || projects.length === 0) ? FALLBACK_PROJECTS : projects

  return (
    <div className="min-h-screen bg-surface-container-lowest pt-20 pb-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* Page Header */}
        <div className="mb-20 max-w-3xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-on-surface mb-6">
            CREATIVE EXPLORATIONS
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant max-w-xl leading-relaxed">
            A look at how we think, create, and approach brand-building - through concepts, experiments, and real executions.
          </p>
        </div>

        {/* Interactive Gallery (Client Component) */}
        <ProjectsGallery initialProjects={displayProjects} />

        {/* Project Demo Section */}
        <div className="border-t border-outline-variant/20 pt-20 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-on-surface mb-4 tracking-tight">PROJECT DEMO</h2>
          <p className="text-sm text-on-surface-variant mb-12">See how we bring ideas to life - from concept to execution.</p>
          
          <div className="relative aspect-video w-full bg-surface-container border border-outline-variant/20 rounded-sm overflow-hidden shadow-lg">
            <iframe
              className="absolute inset-0 w-full h-full border-0"
              src="https://www.youtube.com/embed/jUR2TMoIK0I"
              title="Project Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

      </div>
    </div>
  )
}
