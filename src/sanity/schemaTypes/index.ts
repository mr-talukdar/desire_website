import {type SchemaTypeDefinition} from 'sanity'

import {blockContent} from './blockContent'
import {category} from './category'
import {author} from './author'
import {project} from './project'
import {service} from './service'
import {testimonial} from './testimonial'
import {blogPost} from './blogPost'
import {siteConfig} from './siteConfig'
import {page} from './page'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    // Primitives
    blockContent,
    // Documents
    category,
    author,
    project,
    service,
    testimonial,
    blogPost,
    siteConfig,
    page,
  ],
}
