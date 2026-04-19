import {type ComponentPropsWithoutRef} from 'react'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string
}

export function Input({label, className = '', ...props}: InputProps) {
  return (
    <div className="relative w-full">
      {label && (
        <label className="block mb-2 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-surface-container border border-outline-variant/50 rounded-sm text-on-surface placeholder:text-on-surface-variant/50 
          focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/30
          transition-all duration-200 text-sm ${className}`}
        {...props}
      />
    </div>
  )
}
