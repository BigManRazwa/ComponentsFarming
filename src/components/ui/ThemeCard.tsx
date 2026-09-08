import type { HTMLAttributes } from 'react'

export interface StyleVariation {
  name: string
  fontFamily: string
  bgColor: string
  textColor: string
  accentColor: string
}

export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

export interface ThemeData {
  id: string
  name: string
  slug: string
  description: string
  thumbnail: string
  rating?: number
  reviewCount?: number
  tags?: string[]
  features?: string[]
  styleVariations?: StyleVariation[]
  demoUrl?: string
  reviews?: Review[]
}

interface ThemeCardProps extends HTMLAttributes<HTMLDivElement> {
  theme: ThemeData
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void
  onView?: (slug: string) => void
}

export function ThemeCard({ theme, onDelete, onEdit, onView, className = '', ...props }: ThemeCardProps) {
  return (
    <div
      className={`
        group rounded-xl border border-zinc-800/60 bg-zinc-900/30
        hover:border-zinc-700 hover:bg-zinc-900/60 transition-all
        overflow-hidden relative cursor-pointer ${className}
      `}
      onClick={() => onView?.(theme.slug)}
      {...props}
    >
      {/* Action buttons */}
      <div className="absolute top-2.5 left-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
        {onEdit && (
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(theme.id) }}
            className="p-1.5 rounded-lg bg-blue-500/80 backdrop-blur-sm text-white hover:bg-blue-500"
            title="Edit theme"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(theme.id) }}
            className="p-1.5 rounded-lg bg-red-500/80 backdrop-blur-sm text-white hover:bg-red-500"
            title="Delete theme"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
        <img
          src={theme.thumbnail}
          alt={theme.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
          {theme.name}
        </h3>
        <p className="text-xs text-zinc-500 mt-1.5 line-clamp-2 leading-relaxed">
          {theme.description}
        </p>

        {/* Community Rating */}
        {theme.reviews && theme.reviews.length > 0 && (() => {
          const avg = theme.reviews!.reduce((s, r) => s + r.rating, 0) / theme.reviews!.length
          return (
            <div className="flex items-center gap-1 mt-3 pt-3 border-t border-zinc-800/50">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-3 h-3 ${star <= Math.round(avg) ? 'text-amber-400' : 'text-zinc-700'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[10px] text-zinc-600 ml-0.5">
                ({theme.reviews!.length})
              </span>
            </div>
          )
        })()}

        {/* Features preview */}
        {theme.features && theme.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {theme.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400/80 border border-blue-500/20"
              >
                {feature}
              </span>
            ))}
            {theme.features.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800/60 text-zinc-500">
                +{theme.features.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Tags */}
        {theme.tags && theme.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {theme.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800/60 text-zinc-500 border border-zinc-800/40"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
