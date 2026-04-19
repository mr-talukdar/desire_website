import { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/client'
import { projectSlugsQuery, blogPostSlugsQuery } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://desirecreatives.com'

  // Fetch all slugs
  const [projectSlugs, blogSlugs] = await Promise.all([
    sanityFetch<{ slug: string }[]>({ query: projectSlugsQuery, tags: ['project'] }),
    sanityFetch<{ slug: string }[]>({ query: blogPostSlugsQuery, tags: ['blogPost'] }),
  ])

  const staticPages = [
    '',
    '/agency',
    '/services',
    '/process',
    '/projects',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const projectPages = projectSlugs.map((s) => ({
    url: `${baseUrl}/projects/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const blogPages = blogSlugs.map((s) => ({
    url: `${baseUrl}/blog/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...projectPages, ...blogPages]
}
