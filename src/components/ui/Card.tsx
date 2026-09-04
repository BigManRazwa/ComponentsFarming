import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({
  children,
  padding = 'md',
  hoverable = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-xl border border-zinc-800 bg-zinc-900/50
        ${hoverable ? 'hover:border-zinc-700 hover:bg-zinc-900 transition-all cursor-pointer' : ''}
        ${paddingStyles[padding]} ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
