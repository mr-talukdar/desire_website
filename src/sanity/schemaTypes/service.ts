import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: () => '⚙️',
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
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Identifier',
      type: 'string',
      description: 'Icon name/key for the frontend component (e.g. "code", "palette", "globe")',
    }),
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'number',
      description: 'Display order (01, 02, etc.)',
    }),
    defineField({
      name: 'subServices',
      title: 'Sub Services',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'e.g. "UI/UX", "Custom Software", "Branding"',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'detailContent',
      title: 'Detail Content',
      type: 'blockContent',
      description: 'Expanded content for the services detail section',
    }),
  ],
  orderings: [
    {
      title: 'Order Number',
      name: 'orderNumberAsc',
      by: [{field: 'orderNumber', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
  },
})
