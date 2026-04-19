import Link from 'next/link'
import {type ComponentPropsWithoutRef} from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  isExternal?: boolean
  children: React.ReactNode
  className?: string
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonBaseProps>

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof ButtonBaseProps>

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-container text-white hover:bg-primary-container/90 shadow-[0_0_20px_rgba(0,112,243,0.3)] hover:shadow-[0_0_30px_rgba(0,112,243,0.5)]',
  secondary:
    'border border-outline-variant text-on-surface hover:bg-surface-container-high hover:border-on-surface-variant',
  ghost:
    'text-on-surface-variant hover:text-on-surface hover:bg-surface-container',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs tracking-widest',
  md: 'px-6 py-3 text-sm tracking-widest',
  lg: 'px-8 py-4 text-sm tracking-widest',
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  isExternal,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold uppercase transition-all duration-300 ease-out rounded-sm cursor-pointer select-none'

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...(props as ComponentPropsWithoutRef<'a'>)}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...(props as ComponentPropsWithoutRef<'a'>)}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(props as ComponentPropsWithoutRef<'button'>)}>
      {children}
    </button>
  )
}
