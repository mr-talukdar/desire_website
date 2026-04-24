import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/client'
import { allBlogPostsQuery } from '@/sanity/lib/queries'
import type { Metadata } from 'next'
import type { IBlogPost } from '@/types'

export const metadata: Metadata = {
  title: 'Insights | Desire Creatives',
  description: 'Deep dives into systems architecture, design theory, and the technical void.',
}

export const revalidate = 60

// Add fallback data just in case Sanity has no blog posts yet
const FALLBACK_POSTS: IBlogPost[] = [
  {
    _id: '1',
    _type: 'blogPost',
    slug: { current: 'architecture-of-infinite-scale' },
    title: 'The Architecture of Infinite Scale',
    excerpt: 'Moving beyond serverless. How we structure micro-frontends to handle unpredictable load spikes without compromising the aesthetic void.',
    publishedAt: '2026-04-10T10:00:00Z',
    readingTime: 8,
    coverImage: { asset: { url: '/images/insight-scale.png' } },
    content: []
  },
  {
    _id: '2',
    _type: 'blogPost',
    slug: { current: 'typography-as-geometry' },
    title: 'Typography as Geometry',
    excerpt: 'Treating letterforms as structural elements rather than mere communication vehicles in modern brutalist interfaces.',
    publishedAt: '2026-03-24T10:00:00Z',
    readingTime: 5,
    coverImage: { asset: { url: '/images/insight-typography.png' } },
    content: []
  },
  {
    _id: '3',
    _type: 'blogPost',
    slug: { current: 'illusion-of-speed' },
    title: 'The Illusion of Speed',
    excerpt: 'Why perceived performance matters more than actual load times, and how to engineer interfaces that feel instantaneous.',
    publishedAt: '2026-02-15T10:00:00Z',
    readingTime: 6,
    coverImage: { asset: { url: '/images/insight-speed.png' } },
    content: []
  },
  {
    _id: '4',
    _type: 'blogPost',
    slug: { current: 'metrics-in-the-void' },
    title: 'Metrics in the Void',
    excerpt: 'Ignoring vanity numbers. A framework for tracking high-intent user interactions in minimal, content-sparse environments.',
    publishedAt: '2026-01-20T10:00:00Z',
    readingTime: 7,
    coverImage: { asset: { url: '/images/insight-metrics.png' } },
    content: []
  },
]

export default async function BlogListingPage() {
  const posts = await sanityFetch<IBlogPost[]>({
    query: allBlogPostsQuery,
    tags: ['blogPost'],
  })

  // Use fallback data if Sanity is empty (to match Stitch design out of the box)
  const displayPosts = (!posts || posts.length === 0) ? FALLBACK_POSTS : posts

  return (
    <div className="min-h-screen bg-surface-container-lowest pt-20 pb-40">
      <div className="max-w-[800px] mx-auto px-6 md:px-10">
        
        {/* Page Header */}
        <div className="mb-24">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.92] text-on-surface mb-6">
            ENGINEERING<br />THE EXCEPTION.
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant max-w-xl leading-relaxed">
            Deep dives into systems architecture, design theory, and the technical void. We document our process of building digital dominance.
          </p>
        </div>

        {/* Posts List */}
        <div className="flex flex-col gap-12">
          {displayPosts.map((post) => (
            <article key={post._id} className="group border-b border-outline-variant/10 pb-12 last:border-0">
              <Link href={`/blog/${post.slug.current}`} className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8 items-start">
                <div>
                  <div className="flex items-center gap-4 text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/50 mb-3">
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                    <span>•</span>
                    <span>{post.readingTime} MIN READ</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-on-surface group-hover:text-primary transition-colors tracking-tight mb-3 flex items-center justify-between">
                    {post.title}
                    <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary">→</span>
                  </h2>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                
                {/* Post Thumbnail */}
                <div className="relative aspect-[16/9] md:aspect-square w-full bg-surface-container rounded-sm overflow-hidden border border-outline-variant/10 md:order-last order-first mb-4 md:mb-0">
                  <Image 
                    src={post.coverImage?.url || post.coverImage?.asset?.url || `/images/insight-${['scale', 'typography', 'speed', 'metrics'][displayPosts.indexOf(post) % 4]}.png`} 
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/60 to-transparent pointer-events-none" />
                </div>
              </Link>
            </article>
          ))}
        </div>

      </div>
    </div>
  )
}
