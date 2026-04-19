import type {PageSection} from '@/types'
import {HeroSection} from './HeroSection'
import {LogoCloud} from './LogoCloud'
import {ContentSection} from './ContentSection'
import {TestimonialCarousel} from './TestimonialCarousel'
import {ProjectsShowcase} from './ProjectsShowcase'
import {ProcessTimeline} from './ProcessTimeline'

/**
 * Registry-based dynamic section renderer.
 * Maps CMS section `_type` to React components.
 * Adding a new section = 1 entry here + 1 component file.
 */
const SECTION_REGISTRY: Record<string, React.ComponentType<{ data: never }>> = {
  heroSection: HeroSection as React.ComponentType<{ data: never }>,
  logoCloudSection: LogoCloud as React.ComponentType<{ data: never }>,
  contentSection: ContentSection as React.ComponentType<{ data: never }>,
  testimonialsSection: TestimonialCarousel as React.ComponentType<{ data: never }>,
  projectsShowcaseSection: ProjectsShowcase as React.ComponentType<{ data: never }>,
  processSection: ProcessTimeline as React.ComponentType<{ data: never }>,
}

interface SectionRendererProps {
  sections: PageSection[]
}

export function SectionRenderer({sections}: SectionRendererProps) {
  if (!sections?.length) return null

  return (
    <>
      {sections.map((section) => {
        const Component = SECTION_REGISTRY[section._type]
        if (!Component) {
          console.warn(`[SectionRenderer] Unknown section type: ${section._type}`)
          return null
        }
        return <Component key={section._key} data={section as never} />
      })}
    </>
  )
}
