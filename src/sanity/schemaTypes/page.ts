import {defineField, defineType, defineArrayMember} from 'sanity'

/**
 * Page — Modular page builder.
 * The `sections` field is a polymorphic array that maps directly to the
 * SectionRenderer component on the frontend.
 */
export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: () => '📄',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
      description: 'URL path. Use "home" for the homepage.',
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3,
    }),
    // ── MODULAR SECTIONS ──────────────────────────────────────────
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        // Hero Section
        defineArrayMember({
          type: 'object',
          name: 'heroSection',
          title: 'Hero Section',
          icon: () => '🎯',
          fields: [
            defineField({name: 'kicker', title: 'Kicker', type: 'string', description: 'e.g. "01. / AGENCY"'}),
            defineField({name: 'headline', title: 'Headline', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'ghostWord', title: 'Ghost Word', type: 'string', description: 'Struck-through word behind headline'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
            defineField({name: 'primaryCtaText', title: 'Primary CTA Text', type: 'string'}),
            defineField({name: 'primaryCtaUrl', title: 'Primary CTA URL', type: 'string'}),
            defineField({name: 'secondaryCtaText', title: 'Secondary CTA Text', type: 'string'}),
            defineField({name: 'secondaryCtaUrl', title: 'Secondary CTA URL', type: 'string'}),
            defineField({name: 'backgroundImage', title: 'Background Image', type: 'image', options: {hotspot: true}}),
          ],
          preview: {
            select: {title: 'headline'},
            prepare({title}) {
              return {title: title || 'Hero Section', subtitle: '🎯 Hero'}
            },
          },
        }),

        // Logo Cloud Section
        defineArrayMember({
          type: 'object',
          name: 'logoCloudSection',
          title: 'Logo Cloud',
          icon: () => '🏢',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', description: 'e.g. "TRUSTED BY INDUSTRY LEADERS"'}),
            defineField({
              name: 'logos',
              title: 'Logos',
              type: 'array',
              of: [
                {
                  type: 'image',
                  fields: [{name: 'alt', type: 'string', title: 'Company Name'}],
                },
              ],
            }),
          ],
          preview: {
            select: {title: 'label'},
            prepare({title}) {
              return {title: title || 'Logo Cloud', subtitle: '🏢 Logos'}
            },
          },
        }),

        // Content Section (Swiss-army knife)
        defineArrayMember({
          type: 'object',
          name: 'contentSection',
          title: 'Content Section',
          icon: () => '📝',
          fields: [
            defineField({
              name: 'variant',
              title: 'Variant',
              type: 'string',
              options: {
                list: [
                  {title: 'Call to Action', value: 'cta'},
                  {title: 'Freeform Body', value: 'freeform'},
                  {title: 'Services Overview', value: 'servicesOverview'},
                  {title: 'About', value: 'about'},
                  {title: 'Newsletter', value: 'newsletter'},
                ],
              },
              validation: (r) => r.required(),
            }),
            defineField({name: 'kicker', title: 'Kicker', type: 'string'}),
            defineField({name: 'headline', title: 'Headline', type: 'string'}),
            defineField({name: 'body', title: 'Body', type: 'blockContent'}),
            defineField({name: 'ctaText', title: 'CTA Text', type: 'string'}),
            defineField({name: 'ctaUrl', title: 'CTA URL', type: 'string'}),
            defineField({name: 'inputPlaceholder', title: 'Input Placeholder', type: 'string', description: 'For newsletter/CTA variants'}),
            defineField({
              name: 'backgroundStyle',
              title: 'Background Style',
              type: 'string',
              options: {
                list: [
                  {title: 'Default', value: 'default'},
                  {title: 'Elevated (Gray)', value: 'elevated'},
                  {title: 'Void (Black)', value: 'void'},
                ],
              },
              initialValue: 'default',
            }),
          ],
          preview: {
            select: {title: 'headline', subtitle: 'variant'},
            prepare({title, subtitle}) {
              return {
                title: title || 'Content Section',
                subtitle: `📝 ${subtitle || 'Content'}`,
              }
            },
          },
        }),

        // Testimonials Section
        defineArrayMember({
          type: 'object',
          name: 'testimonialsSection',
          title: 'Testimonials Section',
          icon: () => '💬',
          fields: [
            defineField({name: 'headline', title: 'Headline', type: 'string'}),
            defineField({
              name: 'testimonials',
              title: 'Testimonials',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'testimonial'}]}],
            }),
          ],
          preview: {
            select: {title: 'headline'},
            prepare({title}) {
              return {title: title || 'Testimonials', subtitle: '💬 Testimonials'}
            },
          },
        }),

        // Projects Showcase Section
        defineArrayMember({
          type: 'object',
          name: 'projectsShowcaseSection',
          title: 'Projects Showcase',
          icon: () => '🚀',
          fields: [
            defineField({name: 'kicker', title: 'Kicker', type: 'string'}),
            defineField({name: 'headline', title: 'Headline', type: 'string'}),
            defineField({
              name: 'featuredProject',
              title: 'Featured Project',
              type: 'reference',
              to: [{type: 'project'}],
            }),
            defineField({
              name: 'projects',
              title: 'Projects',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'project'}]}],
            }),
            defineField({name: 'maxItems', title: 'Max Items', type: 'number', initialValue: 4}),
            defineField({
              name: 'showFilters',
              title: 'Show Category Filters',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'layout',
              title: 'Grid Layout',
              type: 'string',
              options: {
                list: [
                  {title: '2 Columns', value: 'grid2'},
                  {title: '3 Columns', value: 'grid3'},
                ],
              },
              initialValue: 'grid2',
            }),
          ],
          preview: {
            select: {title: 'headline'},
            prepare({title}) {
              return {title: title || 'Projects Showcase', subtitle: '🚀 Projects'}
            },
          },
        }),

        // Process / Methodology Section
        defineArrayMember({
          type: 'object',
          name: 'processSection',
          title: 'Process / Methodology',
          icon: () => '🔄',
          fields: [
            defineField({name: 'kicker', title: 'Kicker', type: 'string'}),
            defineField({name: 'headline', title: 'Headline', type: 'string'}),
            defineField({
              name: 'steps',
              title: 'Steps',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'processStep',
                  title: 'Step',
                  fields: [
                    defineField({name: 'stepNumber', title: 'Step Number', type: 'number', validation: (r) => r.required()}),
                    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
                    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
                  ],
                  preview: {
                    select: {title: 'title', subtitle: 'stepNumber'},
                    prepare({title, subtitle}) {
                      return {title, subtitle: `Step ${subtitle}`}
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {title: 'headline'},
            prepare({title}) {
              return {title: title || 'Process Section', subtitle: '🔄 Process'}
            },
          },
        }),
      ],
    }),
    // ── SEO ────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({name: 'metaTitle', title: 'Meta Title', type: 'string', validation: (r) => r.max(60)}),
        defineField({name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, validation: (r) => r.max(160)}),
        defineField({name: 'ogImage', title: 'OG Image', type: 'image'}),
      ],
      options: {collapsible: true, collapsed: true},
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current'},
    prepare({title, subtitle}) {
      return {title, subtitle: `/${subtitle || ''}`}
    },
  },
})
