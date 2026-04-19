import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/client'
import { blogPostBySlugQuery, blogPostSlugsQuery } from '@/sanity/lib/queries'
import { PortableTextRenderer } from '@/components/ui/PortableTextRenderer'
import type { IBlogPost } from '@/types'

export const revalidate = 60

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const post = await sanityFetch<IBlogPost | null>({
    query: blogPostBySlugQuery,
    params: { slug: params.slug },
    tags: ['blogPost', `blogPost:${params.slug}`],
  })

  if (!post && params.slug === 'architecture-of-infinite-scale') {
    return {
      title: 'The Architecture of Infinite Scale | Desire Creatives',
      description: 'Deconstructing the methodologies required to build systems that scale infinitely.',
    }
  }

  const ogImage = post?.seo?.ogImage as any;
  
  return {
    title: post?.seo?.metaTitle || `${post?.title || 'Insight'} | Desire Creatives`,
    description: post?.seo?.metaDescription || post?.excerpt,
    ...(ogImage?.url ? {
      openGraph: {
        images: [{ url: ogImage.url }],
      }
    } : {}),
  }
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: blogPostSlugsQuery,
    tags: ['blogPost'],
  })
  
  return slugs.map((s) => ({ slug: s.slug })) || []
}

// Fallback data if Sanity is empty, specifically matching the Stitch design
const FALLBACK_POST = {
  _id: 'fallback-post',
  title: 'The Architecture of Infinite Scale',
  slug: 'architecture-of-infinite-scale',
  publishedAt: '2026-04-10T10:00:00Z',
  readingTime: 8,
  content: null, // We'll hardcode the design content in the component for the fallback
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  let post = await sanityFetch<any | null>({
    query: blogPostBySlugQuery,
    params: { slug: params.slug },
    tags: ['blogPost', `blogPost:${params.slug}`],
  })

  if (!post) {
    if (params.slug === 'architecture-of-infinite-scale') {
      post = FALLBACK_POST
    } else {
      notFound()
    }
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest pt-20 pb-40">
      <div className="max-w-[720px] mx-auto px-6 md:px-10">

        {/* Breadcrumb / Top Info */}
        <div className="mb-12 flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/50">
          <Link href="/blog" className="hover:text-on-surface transition-colors">INSIGHTS</Link>
          <span>/</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </time>
        </div>

        {/* Post Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.92] text-on-surface mb-12">
          {post.title}
        </h1>

        {/* Post Content */}
        <article className="prose prose-invert prose-p:text-on-surface-variant prose-p:leading-relaxed prose-headings:text-on-surface prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight hover:prose-a:text-primary prose-a:text-on-surface prose-a:transition-colors max-w-none mb-32">
          {post.content ? (
            <PortableTextRenderer value={post.content} />
          ) : (
            <>
              <p className="text-lg md:text-xl text-on-surface leading-relaxed mb-12 font-medium">
                In the modern web, building for the present is a guarantee of obsolescence. True engineering focuses on the void—the empty space where future demand will inevitably arrive. Here we deconstruct the methodologies required to build systems that scale infinitely without structural collapse.
              </p>

              <h2>1. Deconstructing the Monolith</h2>
              <p>
                The monolithic architecture served its purpose during the nascent stages of digital product development. However, as user bases expand logarithmically, the friction introduced by tightly coupled components becomes a terminal bottleneck.
              </p>
              <p>
                Transitioning to a microservices architecture is not merely a technical shift; it is an organizational paradigm change. We isolate domains, treat databases as localized entities, and rely on asynchronous event-driven communication to maintain eventual consistency.
              </p>

              <pre className="!bg-surface-container !border !border-outline-variant/20 !rounded-sm">
                <code>{`services:
  gateway:
    image: desire-creatives/api-gateway:latest
    ports:
      - "8080:80"
    environment:
      - RATE_LIMIT_THRESHOLD=10000
      - CIRCUIT_BREAKER_TIMEOUT=50ms
    depends_on:
      - auth_service
      - data_mesh`}</code>
              </pre>

              <h2>2. Data Meshes and Eventual Consistency</h2>
              <p>
                When dealing with millions of concurrent read/write operations, ACID transactions across distributed nodes are a luxury you cannot afford. We embrace eventual consistency.
              </p>
              <p>
                Implementing a Data Mesh allows domains to own their data products independently. Centralized data lakes become an anti-pattern. Instead, data is served via well-defined APIs, treating data itself as a first-class product within the internal ecosystem.
              </p>
            </>
          )}
        </article>

        {/* Related Insights */}
        <div className="border-t border-outline-variant/20 pt-16 mb-20">
          <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-on-surface-variant mb-8">Related Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/blog/typography-as-geometry" className="group block p-6 bg-surface-container border border-outline-variant/10 rounded-sm hover:-translate-y-1 transition-transform duration-300">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary mb-3 block">Design Systems</span>
              <h4 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">The Typography of Trust</h4>
            </Link>
            <Link href="/blog/zero-latency-state-management" className="group block p-6 bg-surface-container border border-outline-variant/10 rounded-sm hover:-translate-y-1 transition-transform duration-300">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary mb-3 block">Engineering</span>
              <h4 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">Zero-Latency State Management</h4>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
