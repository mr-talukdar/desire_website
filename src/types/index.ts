// ── Sanity Image Reference ──────────────────────────────────────
export interface SanityImageRef {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  alt?: string
  caption?: string
}

// ── Portable Text ───────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PortableTextBlock = any

// ── Category ────────────────────────────────────────────────────
export interface ICategory {
  _id: string
  _type: 'category'
  name: string
  slug: { current: string }
  color?: string
}

// ── Author ──────────────────────────────────────────────────────
export interface IAuthor {
  _id: string
  _type: 'author'
  name: string
  slug: { current: string }
  role?: string
  bio?: string
  avatar?: SanityImageRef
}

// ── Project Metric ──────────────────────────────────────────────
export interface IProjectMetric {
  _key: string
  value: string
  label: string
  description?: string
}

// ── Project ─────────────────────────────────────────────────────
export interface IProject {
  _id: string
  _type: 'project'
  title: string
  slug: { current: string }
  tagline: string
  categories: ICategory[]
  thumbnail: SanityImageRef
  heroImage?: SanityImageRef
  overview: PortableTextBlock[]
  challenge?: PortableTextBlock[]
  solution?: PortableTextBlock[]
  clientName?: string
  role?: string
  year?: string
  tools?: string[]
  metrics?: IProjectMetric[]
  gallery?: (SanityImageRef & { alt?: string; caption?: string })[]
  nextProject?: {
    _id: string
    title: string
    slug: { current: string }
    thumbnail: SanityImageRef
    categories: ICategory[]
  }
  isFeatured?: boolean
  publishedAt: string
  seo?: ISeo
}

// ── Service ─────────────────────────────────────────────────────
export interface IService {
  _id: string
  _type: 'service'
  title: string
  slug?: { current: string }
  description: string
  icon?: string
  orderNumber?: number
  subServices?: string[]
  category?: ICategory
  detailContent?: PortableTextBlock[]
}

// ── Testimonial ─────────────────────────────────────────────────
export interface ITestimonial {
  _id: string
  _type: 'testimonial'
  quote: string
  authorName: string
  authorTitle: string
  authorCompany: string
  authorAvatar?: SanityImageRef
  project?: { _id: string; title: string; slug: { current: string } }
}

// ── Blog Post ───────────────────────────────────────────────────
export interface IBlogPost {
  _id: string
  _type: 'blogPost'
  title: string
  slug: { current: string }
  excerpt: string
  content: PortableTextBlock[]
  coverImage: SanityImageRef
  categories?: ICategory[]
  author?: IAuthor
  readingTime?: number
  relatedPosts?: IBlogPostCard[]
  isFeatured?: boolean
  publishedAt: string
  seo?: ISeo
}

export interface IBlogPostCard {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  coverImage: SanityImageRef
  categories?: ICategory[]
  author?: { name: string; avatar?: SanityImageRef }
  publishedAt: string
  readingTime?: number
}

// ── SEO ─────────────────────────────────────────────────────────
export interface ISeo {
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImageRef
}

// ── Site Config ─────────────────────────────────────────────────
export interface INavItem {
  _key: string
  label: string
  href: string
  isExternal?: boolean
}

export interface ISocialLink {
  _key: string
  platform: 'instagram' | 'linkedin' | 'twitter' | 'github' | 'dribbble'
  url: string
}

export interface ISiteConfig {
  _id: string
  siteName: string
  siteTagline?: string
  logo?: SanityImageRef
  navigationItems?: INavItem[]
  ctaButtonText?: string
  ctaButtonUrl?: string
  socialLinks?: ISocialLink[]
  footerLinks?: INavItem[]
  contactEmail?: string
  defaultOgImage?: SanityImageRef
}

// ── Page Sections ───────────────────────────────────────────────
export interface IHeroSection {
  _type: 'heroSection'
  _key: string
  kicker?: string
  headline: string
  ghostWord?: string
  description?: string
  primaryCtaText?: string
  primaryCtaUrl?: string
  secondaryCtaText?: string
  secondaryCtaUrl?: string
  backgroundImage?: SanityImageRef
}

export interface ILogoCloudSection {
  _type: 'logoCloudSection'
  _key: string
  label?: string
  logos?: (SanityImageRef & { alt?: string })[]
}

export type ContentVariant = 'cta' | 'freeform' | 'servicesOverview' | 'about' | 'newsletter'
export type BackgroundStyle = 'default' | 'elevated' | 'void'

export interface IContentSection {
  _type: 'contentSection'
  _key: string
  variant: ContentVariant
  kicker?: string
  headline?: string
  body?: PortableTextBlock[]
  ctaText?: string
  ctaUrl?: string
  inputPlaceholder?: string
  backgroundStyle?: BackgroundStyle
}

export interface ITestimonialsSection {
  _type: 'testimonialsSection'
  _key: string
  headline?: string
  testimonials?: ITestimonial[]
}

export interface IProjectsShowcaseSection {
  _type: 'projectsShowcaseSection'
  _key: string
  kicker?: string
  headline?: string
  featuredProject?: IProject
  projects?: IProject[]
  maxItems?: number
  showFilters?: boolean
  layout?: 'grid2' | 'grid3'
}

export interface IProcessStep {
  _key: string
  stepNumber: number
  title: string
  description?: string
}

export interface IProcessSection {
  _type: 'processSection'
  _key: string
  kicker?: string
  headline?: string
  steps?: IProcessStep[]
}

export type PageSection =
  | IHeroSection
  | ILogoCloudSection
  | IContentSection
  | ITestimonialsSection
  | IProjectsShowcaseSection
  | IProcessSection

// ── Page ────────────────────────────────────────────────────────
export interface IPage {
  _id: string
  _type: 'page'
  title: string
  slug: { current: string }
  description?: string
  sections?: PageSection[]
  seo?: ISeo
  isPublished?: boolean
}
