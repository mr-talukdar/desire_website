import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/client'
import { allBlogPostsQuery } from '@/sanity/lib/queries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights | Desire Creatives',
  description: 'Deep dives into systems architecture, design theory, and the technical void.',
}

export const revalidate = 60

// Add fallback data just in case Sanity has no blog posts yet
const FALLBACK_POSTS = [
  {
    _id: '1',
    slug: 'architecture-of-infinite-scale',
    title: 'The Architecture of Infinite Scale',
    excerpt: 'Moving beyond serverless. How we structure micro-frontends to handle unpredictable load spikes without compromising the aesthetic void.',
    publishedAt: '2026-04-10T10:00:00Z',
    readingTime: 8,
  },
  {
    _id: '2',
    slug: 'typography-as-geometry',
    title: 'Typography as Geometry',
    excerpt: 'Treating letterforms as structural elements rather than mere communication vehicles in modern brutalist interfaces.',
    publishedAt: '2026-03-24T10:00:00Z',
    readingTime: 5,
  },
  {
    _id: '3',
    slug: 'illusion-of-speed',
    title: 'The Illusion of Speed',
    excerpt: 'Why perceived performance matters more than actual load times, and how to engineer interfaces that feel instantaneous.',
    publishedAt: '2026-02-15T10:00:00Z',
    readingTime: 6,
  },
  {
    _id: '4',
    slug: 'metrics-in-the-void',
    title: 'Metrics in the Void',
    excerpt: 'Ignoring vanity numbers. A framework for tracking high-intent user interactions in minimal, content-sparse environments.',
    publishedAt: '2026-01-20T10:00:00Z',
    readingTime: 7,
  },
]

export default async function BlogListingPage() {
  let posts = await sanityFetch<any[]>({
    query: allBlogPostsQuery,
    tags: ['blogPost'],
  })

  // Use fallback data if Sanity is empty (to match Stitch design out of the box)
  if (!posts || posts.length === 0) {
    posts = FALLBACK_POSTS
  }

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
          {posts.map((post) => (
            <article key={post._id} className="group border-b border-outline-variant/10 pb-12 last:border-0">
              <Link href={`/blog/${post.slug}`} className="block">
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
              </Link>
            </article>
          ))}
        </div>

      </div>
    </div>
  )
}
