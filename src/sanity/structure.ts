import type {StructureResolver} from 'sanity/structure'

/**
 * Custom Studio structure.
 * - SiteConfig is promoted to the top as a singleton.
 * - Pages are listed next for the page builder workflow.
 * - Content types are grouped logically.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Desire Creatives')
    .items([
      // Singleton: Site Config
      S.listItem()
        .title('Site Configuration')
        .id('siteConfig')
        .child(
          S.document()
            .schemaType('siteConfig')
            .documentId('siteConfig'),
        ),

      S.divider(),

      // Pages (Page Builder)
      S.documentTypeListItem('page').title('Pages'),

      S.divider(),

      // Portfolio
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('service').title('Services'),

      S.divider(),

      // Blog
      S.documentTypeListItem('blogPost').title('Blog Posts'),
      S.documentTypeListItem('author').title('Authors'),

      S.divider(),

      // Shared
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('category').title('Categories'),
    ])
