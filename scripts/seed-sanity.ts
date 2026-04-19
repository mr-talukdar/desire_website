import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { join } from 'path'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing required environment variables in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2026-04-19',
})

async function uploadImage(imagePath: string) {
  try {
    const filePath = join(process.cwd(), 'public', imagePath)
    const buffer = readFileSync(filePath)
    const asset = await client.assets.upload('image', buffer, {
      filename: imagePath.split('/').pop(),
    })
    return asset
  } catch (error) {
    console.error(`Failed to upload image ${imagePath}:`, error)
    return null
  }
}

async function seed() {
  console.log('🚀 Starting Sanity Seed...')

  // 1. Upload Assets
  console.log('🖼️ Uploading assets...')
  const imgRadio = await uploadImage('images/project-radio.png')
  const imgInfrastructure = await uploadImage('images/project-infrastructure.png')
  const imgDashboard = await uploadImage('images/project-dashboard.png')

  // 2. Categories
  console.log('📂 Creating categories...')
  const categoriesData = [
    { name: 'UI/UX', slug: 'ui-ux' },
    { name: 'Branding', slug: 'branding' },
    { name: 'Development', slug: 'development' },
    { name: 'Systems', slug: 'systems' },
    { name: 'Data', slug: 'data' },
    { name: 'SaaS', slug: 'saas' },
    { name: 'Growth', slug: 'growth' },
    { name: 'Web', slug: 'web' },
    { name: 'Infra', slug: 'infra' },
    { name: 'Visual', slug: 'visual' },
    { name: 'Product', slug: 'product' },
  ]

  const categoryRefs: Record<string, string> = {}
  for (const cat of categoriesData) {
    const doc = await client.createOrReplace({
      _id: `category-${cat.slug}`,
      _type: 'category',
      name: cat.name,
      slug: { _type: 'slug', current: cat.slug },
    })
    categoryRefs[cat.slug] = doc._id
  }

  // 3. Author
  console.log('✍️ Creating author...')
  const authorDoc = await client.createOrReplace({
    _id: 'author-desire-team',
    _type: 'author',
    name: 'Desire Team',
    slug: { _type: 'slug', current: 'desire-team' },
    role: 'Core Engineering',
    bio: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The backbone of Desire Creatives methodology.' }],
      },
    ],
  })

  // 4. Services
  console.log('🛠️ Creating services...')
  const servicesData = [
    { title: 'Development', slug: 'development', icon: '</>', order: 1, desc: 'Robust, scalable architecture. React, Node, WebGL, and complex system integrations.' },
    { title: 'Design', slug: 'design', icon: 'K', order: 2, desc: 'High-fidelity interfaces. User-centric flows mapped with surgical precision.' },
    { title: 'Branding', slug: 'branding', icon: 'Λ', order: 3, desc: 'Identity systems engineered for the void. Typography, motion, and visual logic.' },
    { title: 'Growth', slug: 'growth', icon: '⊕', order: 4, desc: 'Data-driven scaling. Technical SEO, performance optimization, and conversion engineering.' },
  ]

  for (const service of servicesData) {
    await client.createOrReplace({
      _id: `service-${service.slug}`,
      _type: 'service',
      title: service.title,
      slug: { _type: 'slug', current: service.slug },
      icon: service.icon,
      orderNumber: service.order,
      description: service.desc,
    })
  }

  // 5. Projects
  console.log('🚀 Creating projects...')
  const projectsData = [
    {
      _id: 'project-nexus-protocol',
      title: 'Nexus Protocol',
      slug: 'nexus-protocol',
      tagline: 'Infrastructure Visual Identity',
      thumbnail: imgInfrastructure,
      heroImage: imgInfrastructure,
      categories: ['branding', 'infra', 'systems'],
      isFeatured: true,
      metrics: [
        { value: '40%', label: 'Decreased Load Time', description: 'Optimized asset delivery.' },
        { value: '100%', label: 'WCAG 2.1 AA Compliant', description: 'Accessible dark mode.' },
        { value: '2.4x', label: 'Faster Incident Resolution', description: 'Clearer typographic hierarchy.' },
      ],
      overview: [
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Nexus Protocol required a visual language that matched its technical prowess.' }],
        },
      ],
    },
    {
      _id: 'project-aether-financial',
      title: 'Aether Financial',
      slug: 'aether-financial',
      tagline: 'Algorithmic Trading Platform Interface',
      thumbnail: imgDashboard,
      heroImage: imgDashboard,
      categories: ['ui-ux', 'data', 'systems'],
      isFeatured: true,
      metrics: [
        { value: '12ms', label: 'LCP Performance', description: 'Near-zero latency rendering.' },
        { value: '0.01%', label: 'Errant Action Rate', description: 'Surgical UI precision.' },
      ],
      overview: [
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'A data-dense trading environment built for split-second decisions.' }],
        },
      ],
    },
    {
      _id: 'project-astro-sounds',
      title: 'Astro Sounds',
      slug: 'astro-sounds',
      tagline: 'Sonic Visualization Product',
      thumbnail: imgRadio,
      categories: ['visual', 'product'],
      isFeatured: true,
    },
  ]

  for (const project of projectsData) {
    await client.createOrReplace({
      _id: project._id,
      _type: 'project',
      title: project.title,
      slug: { _type: 'slug', current: project.slug },
      tagline: project.tagline,
      thumbnail: project.thumbnail ? { _type: 'image', asset: { _type: 'reference', _ref: project.thumbnail._id } } : undefined,
      heroImage: project.heroImage ? { _type: 'image', asset: { _type: 'reference', _ref: project.heroImage._id } } : undefined,
      categories: project.categories.map(cat => ({ _type: 'reference', _ref: categoryRefs[cat], _key: cat })),
      isFeatured: project.isFeatured,
      metrics: project.metrics?.map(m => ({ ...m, _key: m.label })),
      overview: project.overview,
      publishedAt: new Date().toISOString(),
    })
  }

  // 6. Blog Posts
  console.log('📝 Creating blog posts...')
  const blogsData = [
    {
      _id: 'post-infinite-scale',
      title: 'The Architecture of Infinite Scale',
      slug: 'architecture-of-infinite-scale',
      excerpt: 'Moving beyond serverless. How we structure micro-frontends to handle unpredictable load spikes.',
      content: [
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'In the modern web, building for the present is a guarantee of obsolescence.' }],
        },
      ],
      categories: ['development', 'infra'],
    },
  ]

  for (const blog of blogsData) {
    await client.createOrReplace({
      _id: blog._id,
      _type: 'blogPost',
      title: blog.title,
      slug: { _type: 'slug', current: blog.slug },
      excerpt: blog.excerpt,
      content: blog.content,
      categories: blog.categories.map(cat => ({ _type: 'reference', _ref: categoryRefs[cat], _key: cat })),
      author: { _type: 'reference', _ref: authorDoc._id },
      publishedAt: new Date().toISOString(),
      readingTime: 8,
    })
  }

  // 7. Site Config
  console.log('⚙️ Initializing site configuration...')
  await client.createOrReplace({
    _id: 'siteConfig',
    _type: 'siteConfig',
    siteName: 'Desire Creatives',
    siteTagline: 'Engineering Digital Dominance',
    navigationItems: [
      { _key: '1', label: 'Work', href: '/projects' },
      { _key: '2', label: 'Services', href: '/services' },
      { _key: '3', label: 'Insights', href: '/blog' },
      { _key: '4', label: 'Initiate', href: '/contact' },
    ],
    socialLinks: [
      { _key: 'ig', platform: 'Instagram', url: 'https://instagram.com/desire' },
      { _key: 'li', platform: 'LinkedIn', url: 'https://linkedin.com/company/desire' },
      { _key: 'tw', platform: 'Twitter', url: 'https://twitter.com/desire' },
    ],
    contactEmail: 'hello@desirecreatives.com',
  })

  console.log('✅ Seeding complete!')
}

seed().catch(err => {
  console.error('❌ Error seeding:', err)
  process.exit(1)
})
