import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/client'
import { allProjectsQuery } from '@/sanity/lib/queries'
import type { IProject } from '@/types'
import { Badge } from '@/components/ui/Badge'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Desire Creatives',
  description: 'Engineered results for the technical void. We build high-fidelity digital machines that dominate their markets.',
}

export const revalidate = 60

const FALLBACK_PROJECTS = [
  {
    _id: '1',
    slug: 'aether-financial',
    title: 'Aether Financial',
    tagline: 'Algorithmic Trading Platform Interface',
    thumbnail: { url: '/images/project-dashboard.png' },
    categories: [{ _id: 'c1', name: 'UI/UX', slug: 'ui-ux' }],
  },
  {
    _id: '2',
    slug: 'nexus-protocol',
    title: 'Nexus Protocol',
    tagline: 'Infrastructure Visual Identity',
    thumbnail: { url: '/images/project-infrastructure.png' },
    categories: [{ _id: 'c2', name: 'BRANDING', slug: 'branding' }],
  },
  {
    _id: '3',
    slug: 'sentinel-zero',
    title: 'Sentinel Zero',
    tagline: 'Threat Detection Dashboard',
    thumbnail: { url: '/images/project-dashboard.png' },
    categories: [{ _id: 'c3', name: 'SYSTEMS', slug: 'systems' }],
  },
  {
    _id: '4',
    slug: 'quantum-metrics',
    title: 'Quantum Metrics',
    tagline: 'Enterprise Analytics Suite',
    thumbnail: { url: '/images/project-dashboard.png' },
    categories: [{ _id: 'c4', name: 'DATA', slug: 'data' }],
  },
]

export default async function ProjectsPage() {
  let projects = await sanityFetch<IProject[]>({
    query: allProjectsQuery,
    tags: ['project'],
  })

  // Use fallback data if Sanity is empty (to match Stitch design out of the box)
  if (!projects || projects.length === 0) {
    projects = FALLBACK_PROJECTS as unknown as IProject[]
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest pt-20 pb-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* Page Header */}
        <div className="mb-20 max-w-3xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-on-surface mb-6">
            PROJECTS
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant max-w-xl leading-relaxed">
            Engineered results for the technical void. We build high-fidelity digital machines that dominate their markets.
          </p>
        </div>

        {/* Filters (Static for now to match design) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-outline-variant/20 pb-8">
          <div className="relative max-w-xs w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-xs">🔍</span>
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full bg-surface-container border border-outline-variant/30 rounded-sm py-3 pl-9 pr-4 text-xs tracking-wider text-on-surface focus:outline-none focus:border-primary-container"
            />
          </div>
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button className="px-4 py-2 bg-on-surface text-surface-container-lowest text-[10px] font-bold tracking-[0.15em] uppercase rounded-sm flex-shrink-0">ALL</button>
            <button className="px-4 py-2 border border-outline-variant/30 text-on-surface-variant text-[10px] font-bold tracking-[0.15em] uppercase rounded-sm hover:border-on-surface hover:text-on-surface transition-colors flex-shrink-0">DEVELOPMENT</button>
            <button className="px-4 py-2 border border-outline-variant/30 text-on-surface-variant text-[10px] font-bold tracking-[0.15em] uppercase rounded-sm hover:border-on-surface hover:text-on-surface transition-colors flex-shrink-0">DESIGN</button>
            <button className="px-4 py-2 border border-outline-variant/30 text-on-surface-variant text-[10px] font-bold tracking-[0.15em] uppercase rounded-sm hover:border-on-surface hover:text-on-surface transition-colors flex-shrink-0">BRANDING</button>
            <button className="px-4 py-2 border border-outline-variant/30 text-on-surface-variant text-[10px] font-bold tracking-[0.15em] uppercase rounded-sm hover:border-on-surface hover:text-on-surface transition-colors flex-shrink-0">GROWTH</button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 mb-32">
          {projects.map((project) => (
            <Link 
              key={project._id} 
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <div className="flex flex-col gap-4">
                <div>
                  {/* Domain Tags */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.categories?.map((cat) => (
                      <span 
                        key={cat._id}
                        className="text-[9px] font-bold tracking-[0.2em] uppercase text-primary border border-primary/20 px-2 py-0.5 rounded-full"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-on-surface group-hover:text-primary transition-colors flex items-center justify-between">
                    {project.title}
                    <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary">→</span>
                  </h2>
                  <p className="text-xs text-on-surface-variant mt-1 tracking-wide">{project.tagline}</p>
                </div>
                
                <div className="relative aspect-[16/9] md:aspect-[4/3] w-full overflow-hidden rounded-sm bg-surface-container">
                  {(project.thumbnail as any)?.url && (
                    <Image
                      src={(project.thumbnail as any).url}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  {/* Subtle inner shadow for depth */}
                  <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] rounded-sm z-10 pointer-events-none" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Project Demo Section */}
        <div className="border-t border-outline-variant/20 pt-20 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-on-surface mb-4 tracking-tight">PROJECT DEMO</h2>
          <p className="text-sm text-on-surface-variant mb-12">Experience the precision of our engineered interfaces firsthand.</p>
          
          <div className="relative aspect-video w-full bg-surface-container border border-outline-variant/20 rounded-sm flex items-center justify-center group overflow-hidden cursor-pointer">
             {/* Fake code background or similar from design */}
             <div className="absolute inset-0 opacity-20 font-mono text-[8px] text-left p-6 text-on-surface-variant overflow-hidden truncate">
               {`const initProject = async (id: string) => { \n  const data = await fetchSystem(id);\n  renderDOM(data);\n  return { status: "ACTIVE" }; \n}\n\n// INITIALIZING SEQUENCE\ninitProject('nexus-protocol').then(sys => {\n  console.log('SYSTEM ONLINE');\n});`}
             </div>
             
             {/* Play button */}
             <div className="relative z-10 w-16 h-12 bg-primary-container rounded flex items-center justify-center shadow-[0_0_30px_rgba(0,112,243,0.4)] group-hover:scale-110 transition-transform duration-300">
               <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
             </div>
          </div>
        </div>

      </div>
    </div>
  )
}
