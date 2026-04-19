'use client'

import {motion} from 'framer-motion'
import Link from 'next/link'
import {Badge} from '@/components/ui/Badge'
import {ImageAsset} from '@/components/ui/ImageAsset'
import type {IProjectsShowcaseSection, IProject} from '@/types'

interface ProjectsShowcaseProps {
  data: IProjectsShowcaseSection
}

function ProjectCard({project}: {project: IProject}) {
  return (
    <Link href={`/projects/${project.slug?.current || (project.slug as unknown as string)}`}>
      <motion.article
        initial={{opacity: 0, y: 30}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: '-60px'}}
        transition={{duration: 0.5}}
        className="group relative overflow-hidden rounded-sm bg-surface-container border border-outline-variant/20 hover:border-outline-variant/50 transition-all duration-300"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {project.thumbnail && (
            <ImageAsset
              image={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Categories */}
          {project.categories && project.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {project.categories.map((cat) => (
                <Badge key={cat._id} color={cat.color}>
                  {cat.name}
                </Badge>
              ))}
            </div>
          )}

          <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>
          {project.tagline && (
            <p className="mt-1 text-sm text-on-surface-variant line-clamp-2">
              {project.tagline}
            </p>
          )}
        </div>
      </motion.article>
    </Link>
  )
}

export function ProjectsShowcase({data}: ProjectsShowcaseProps) {
  const projects = data.projects || []
  const layout = data.layout || 'grid2'

  const gridCols = layout === 'grid3' ? 'md:grid-cols-3' : 'md:grid-cols-2'

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl px-6 mx-auto">
        {/* Header */}
        {(data.kicker || data.headline) && (
          <div className="mb-12">
            {data.kicker && (
              <p className="mb-3 text-xs font-semibold tracking-[0.3em] uppercase text-on-surface-variant">
                {data.kicker}
              </p>
            )}
            {data.headline && (
              <h2 className="text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
                {data.headline}
              </h2>
            )}
          </div>
        )}

        {/* Featured Project */}
        {data.featuredProject && (
          <div className="mb-8">
            <Link href={`/projects/${data.featuredProject.slug?.current || (data.featuredProject.slug as unknown as string)}`}>
              <motion.div
                initial={{opacity: 0, scale: 0.98}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true, margin: '-100px'}}
                transition={{duration: 0.6}}
                className="group relative aspect-[21/9] overflow-hidden rounded-sm bg-surface-container border border-outline-variant/20"
              >
                {data.featuredProject.thumbnail && (
                  <ImageAsset
                    image={data.featuredProject.thumbnail}
                    alt={data.featuredProject.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  {data.featuredProject.categories && (
                    <div className="flex gap-2 mb-3">
                      {data.featuredProject.categories.map((cat) => (
                        <Badge key={cat._id} color={cat.color}>
                          {cat.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-on-surface md:text-3xl">
                    {data.featuredProject.title}
                  </h3>
                  {data.featuredProject.tagline && (
                    <p className="mt-2 text-sm text-on-surface-variant">
                      {data.featuredProject.tagline}
                    </p>
                  )}
                </div>
              </motion.div>
            </Link>
          </div>
        )}

        {/* Project Grid */}
        {projects.length > 0 && (
          <div className={`grid gap-6 ${gridCols}`}>
            {projects.slice(0, data.maxItems || 4).map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
