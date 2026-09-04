import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-purple-600 hover:bg-purple-700 text-white',
  secondary: 'bg-zinc-700 hover:bg-zinc-600 text-white',
  outline: 'border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white',
  ghost: 'text-zinc-400 hover:text-white hover:bg-zinc-800',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-lg font-medium
        transition-colors focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-purple-500 disabled:opacity-50 disabled:pointer-events-none
        ${variantStyles[variant]} ${sizeStyles[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
