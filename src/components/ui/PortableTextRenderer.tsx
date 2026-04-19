import {PortableText, type PortableTextComponents} from '@portabletext/react'
import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'
import type {PortableTextBlock} from '@/types'

const components: PortableTextComponents = {
  block: {
    h2: ({children}) => (
      <h2 className="mt-12 mb-4 text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({children}) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight text-on-surface md:text-2xl">
        {children}
      </h3>
    ),
    h4: ({children}) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold text-on-surface">
        {children}
      </h4>
    ),
    normal: ({children}) => (
      <p className="mb-4 text-base leading-relaxed text-on-surface-variant">
        {children}
      </p>
    ),
    blockquote: ({children}) => (
      <blockquote className="pl-4 my-6 border-l-2 border-primary-container italic text-on-surface-variant/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="mb-4 ml-6 space-y-1 list-disc text-on-surface-variant">
        {children}
      </ul>
    ),
    number: ({children}) => (
      <ol className="mb-4 ml-6 space-y-1 list-decimal text-on-surface-variant">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({children}) => <li className="leading-relaxed">{children}</li>,
    number: ({children}) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({children}) => (
      <strong className="font-semibold text-on-surface">{children}</strong>
    ),
    em: ({children}) => <em>{children}</em>,
    code: ({children}) => (
      <code className="px-1.5 py-0.5 text-sm font-mono bg-surface-container-high text-primary rounded">
        {children}
      </code>
    ),
    link: ({value, children}) => {
      const target = value?.blank ? '_blank' : undefined
      const rel = value?.blank ? 'noopener noreferrer' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary transition-colors"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({value}) => {
      if (!value?.asset) return null
      const url = urlFor(value).width(1200).quality(80).auto('format').url()
      return (
        <figure className="my-8">
          <div className="relative overflow-hidden rounded-sm bg-surface-container">
            <Image
              src={url}
              alt={value.alt || ''}
              width={1200}
              height={675}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-xs text-center text-on-surface-variant/60">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    codeBlock: ({value}) => (
      <div className="my-6 overflow-hidden rounded-sm border border-outline-variant/30">
        {value.filename && (
          <div className="px-4 py-2 text-xs font-mono bg-surface-container-high text-on-surface-variant border-b border-outline-variant/30">
            {value.filename}
          </div>
        )}
        <pre className="p-4 overflow-x-auto bg-surface-container text-sm">
          <code className="font-mono text-on-surface-variant leading-relaxed">
            {value.code}
          </code>
        </pre>
      </div>
    ),
  },
}

interface PortableTextRendererProps {
  value: PortableTextBlock[]
  className?: string
}

export function PortableTextRenderer({value, className = ''}: PortableTextRendererProps) {
  if (!value) return null
  return (
    <div className={`portable-text ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  )
}
