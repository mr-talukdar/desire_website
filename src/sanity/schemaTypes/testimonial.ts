import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorTitle',
      title: 'Author Title',
      type: 'string',
      description: 'e.g. "CTO"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorCompany',
      title: 'Author Company',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorAvatar',
      title: 'Author Avatar',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'project',
      title: 'Associated Project',
      type: 'reference',
      to: [{type: 'project'}],
    }),
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'authorCompany',
      media: 'authorAvatar',
    },
  },
})
