import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'
import type {SanityImageRef} from '@/types'

interface ImageAssetProps {
  image: SanityImageRef | { url: string; metadata?: { lqip?: string } }
  alt?: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
  className?: string
  quality?: number
}

export function ImageAsset({
  image,
  alt = '',
  width,
  height,
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  className = '',
  quality = 80,
}: ImageAssetProps) {
  // Handle already-resolved URLs (from GROQ projections with asset->)
  if ('url' in image && image.url) {
    const resolvedImage = image as { url: string; metadata?: { lqip?: string } }
    return (
      <Image
        src={resolvedImage.url}
        alt={alt}
        width={fill ? undefined : (width ?? 800)}
        height={fill ? undefined : (height ?? 600)}
        fill={fill}
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={className}
        placeholder={resolvedImage.metadata?.lqip ? 'blur' : 'empty'}
        blurDataURL={resolvedImage.metadata?.lqip}
      />
    )
  }

  // Handle raw Sanity image references (needs urlFor builder)
  const sanityImage = image as SanityImageRef
  const url = urlFor(sanityImage)
    .width(width ?? 800)
    .quality(quality)
    .auto('format')
    .url()

  return (
    <Image
      src={url}
      alt={alt}
      width={fill ? undefined : (width ?? 800)}
      height={fill ? undefined : (height ?? 600)}
      fill={fill}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
    />
  )
}
