interface BadgeProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export function Badge({children, color, className = ''}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] rounded-sm border transition-colors duration-200 ${className}`}
      style={{
        borderColor: color || 'var(--outline-variant)',
        color: color || 'var(--on-surface-variant)',
      }}
    >
      {children}
    </span>
  )
}
