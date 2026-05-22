'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { IProject } from '@/types'

interface ProjectsGalleryProps {
  initialProjects: IProject[]
}

const CATEGORIES = ['ALL', 'BRANDING', 'UI/UX', 'WEB/APP DEVELOPMENT', '3D ADVERTISING', 'SOCIAL MEDIA ASSET MANAGEMENT']

export function ProjectsGallery({ initialProjects }: ProjectsGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('ALL')

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = 
        activeCategory === 'ALL' || 
        project.categories?.some(cat => cat.name.toUpperCase() === activeCategory)
      
      return matchesSearch && matchesCategory
    })
  }, [initialProjects, searchQuery, activeCategory])

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-outline-variant/20 pb-8">
        <div className="relative max-w-xs w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-xs">🔍</span>
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container border border-outline-variant/30 rounded-sm py-3 pl-9 pr-4 text-xs tracking-wider text-on-surface focus:outline-none focus:border-primary-container"
          />
        </div>
        <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[10px] font-bold tracking-[0.15em] uppercase rounded-sm transition-all duration-300 flex-shrink-0 ${
                activeCategory === cat 
                  ? 'bg-on-surface text-surface-container-lowest' 
                  : 'border border-outline-variant/30 text-on-surface-variant hover:border-on-surface hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 mb-32 min-h-[400px]">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Link 
              key={project._id} 
              href={`/projects/${typeof project.slug === 'string' ? project.slug : project.slug.current}`}
              className="group block"
            >
              <div className="flex flex-col gap-4">
                <div>
                  {/* Domain Tags */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.categories?.map((cat) => (
                      <span 
                        key={cat._id}
                        className="text-[9px] font-bold tracking-[0.2em] uppercase text-primary border border-primary/20 px-2 py-0.5 rounded-full"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-on-surface group-hover:text-primary transition-colors flex items-center justify-between">
                    {project.title}
                    <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary">→</span>
                  </h2>
                  <p className="text-xs text-on-surface-variant mt-1 tracking-wide">{project.tagline}</p>
                </div>
                
                <div className="relative aspect-[16/9] md:aspect-[4/3] w-full overflow-hidden rounded-sm bg-surface-container">
                  {project.thumbnail?.url && (
                    <Image
                      src={project.thumbnail.url}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  {/* Subtle inner shadow for depth */}
                  <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] rounded-sm z-10 pointer-events-none" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-32 text-center">
            <p className="text-on-surface-variant/40 uppercase tracking-[0.2em] text-xs">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
