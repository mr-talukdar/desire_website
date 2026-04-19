import {groq} from 'next-sanity'

// ── Fragments ───────────────────────────────────────────────────
// Reusable GROQ projections to keep queries DRY.

const categoryFields = `
  _id,
  name,
  "slug": slug.current,
  color
`

const authorCardFields = `
  name,
  "avatar": avatar.asset->{url}
`

const seoFields = `
  seo {
    metaTitle,
    metaDescription,
    "ogImage": ogImage.asset->{url, metadata}
  }
`

const projectCardFields = `
  _id,
  title,
  "slug": slug.current,
  tagline,
  "thumbnail": thumbnail.asset->{url, metadata},
  "categories": categories[]->{${categoryFields}},
  isFeatured,
  publishedAt
`

// ── Site Config ─────────────────────────────────────────────────

export const siteConfigQuery = groq`
  *[_type == "siteConfig"][0]{
    _id,
    siteName,
    siteTagline,
    "logo": logo.asset->{url},
    navigationItems[]{
      _key,
      label,
      href,
      isExternal
    },
    ctaButtonText,
    ctaButtonUrl,
    socialLinks[]{
      _key,
      platform,
      url
    },
    footerLinks[]{
      _key,
      label,
      href
    },
    contactEmail,
    "defaultOgImage": defaultOgImage.asset->{url}
  }
`

// ── Page (Modular) ──────────────────────────────────────────────

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    sections[]{
      _type,
      _key,
      
      // Hero
      _type == "heroSection" => {
        kicker,
        headline,
        ghostWord,
        description,
        primaryCtaText,
        primaryCtaUrl,
        secondaryCtaText,
        secondaryCtaUrl,
        "backgroundImage": backgroundImage.asset->{url, metadata}
      },
      
      // Logo Cloud
      _type == "logoCloudSection" => {
        label,
        "logos": logos[]{
          _key,
          alt,
          "asset": asset->{url}
        }
      },
      
      // Content Section
      _type == "contentSection" => {
        variant,
        kicker,
        headline,
        body,
        ctaText,
        ctaUrl,
        inputPlaceholder,
        backgroundStyle
      },
      
      // Testimonials
      _type == "testimonialsSection" => {
        headline,
        "testimonials": testimonials[]->{
          _id,
          quote,
          authorName,
          authorTitle,
          authorCompany,
          "authorAvatar": authorAvatar.asset->{url}
        }
      },
      
      // Projects Showcase
      _type == "projectsShowcaseSection" => {
        kicker,
        headline,
        maxItems,
        showFilters,
        layout,
        "featuredProject": featuredProject->{${projectCardFields}},
        "projects": projects[]->{${projectCardFields}}
      },
      
      // Process
      _type == "processSection" => {
        kicker,
        headline,
        steps[]{
          _key,
          stepNumber,
          title,
          description
        }
      }
    },
    ${seoFields}
  }
`

// ── Projects ────────────────────────────────────────────────────

export const allProjectsQuery = groq`
  *[_type == "project"] | order(publishedAt desc) {
    ${projectCardFields}
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && isFeatured == true] | order(publishedAt desc) [0...$limit] {
    ${projectCardFields}
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    tagline,
    "categories": categories[]->{${categoryFields}},
    "thumbnail": thumbnail.asset->{url, metadata},
    "heroImage": heroImage.asset->{url, metadata},
    overview,
    challenge,
    solution,
    clientName,
    role,
    year,
    tools,
    metrics[]{
      _key,
      value,
      label,
      description
    },
    "gallery": gallery[]{
      _key,
      alt,
      caption,
      "asset": asset->{url, metadata}
    },
    "nextProject": nextProject->{${projectCardFields}},
    isFeatured,
    publishedAt,
    ${seoFields}
  }
`

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)]{
    "slug": slug.current
  }
`

// ── Blog ────────────────────────────────────────────────────────

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImage": coverImage.asset->{url, metadata},
    "categories": categories[]->{${categoryFields}},
    "author": author->{${authorCardFields}},
    publishedAt,
    readingTime,
    isFeatured
  }
`

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    "coverImage": coverImage.asset->{url, metadata},
    "categories": categories[]->{${categoryFields}},
    "author": author->{
      name,
      role,
      bio,
      "avatar": avatar.asset->{url}
    },
    publishedAt,
    readingTime,
    "relatedPosts": relatedPosts[]->{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "coverImage": coverImage.asset->{url, metadata},
      "categories": categories[]->{${categoryFields}},
      "author": author->{${authorCardFields}},
      publishedAt,
      readingTime
    },
    ${seoFields}
  }
`

export const blogPostSlugsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)]{
    "slug": slug.current
  }
`

// ── Services ────────────────────────────────────────────────────

export const allServicesQuery = groq`
  *[_type == "service"] | order(orderNumber asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    orderNumber,
    subServices,
    "category": category->{${categoryFields}},
    detailContent
  }
`

// ── Testimonials ────────────────────────────────────────────────

export const allTestimonialsQuery = groq`
  *[_type == "testimonial"] {
    _id,
    quote,
    authorName,
    authorTitle,
    authorCompany,
    "authorAvatar": authorAvatar.asset->{url},
    "project": project->{
      _id,
      title,
      "slug": slug.current
    }
  }
`

// ── Categories ──────────────────────────────────────────────────

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(name asc) {
    ${categoryFields}
  }
`
