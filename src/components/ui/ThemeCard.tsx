import type { HTMLAttributes } from 'react'

export interface StyleVariation {
  name: string
  fontFamily: string
  bgColor: string
  textColor: string
  accentColor: string
}

export interface FontVariation {
  name: string
  fontFamily: string
  preview: string
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
  fontVariations?: FontVariation[]
  demoUrl?: string
  reviews?: Review[]
}

/* ─── Tag color map for visual variety ─── */
const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'E-Commerce':           { bg: 'rgba(249,115,22,0.08)', text: '#f97316', border: 'rgba(249,115,22,0.2)' },
  'Desktop':              { bg: 'rgba(148,163,184,0.08)', text: '#94a3b8', border: 'rgba(148,163,184,0.2)' },
  'Mobile':               { bg: 'rgba(139,92,246,0.08)',  text: '#a78bfa', border: 'rgba(139,92,246,0.2)' },
  'Portfolio':            { bg: 'rgba(236,72,153,0.08)',  text: '#ec4899', border: 'rgba(236,72,153,0.2)' },
  'Fashion & Beauty':     { bg: 'rgba(244,114,182,0.08)', text: '#f472b6', border: 'rgba(244,114,182,0.2)' },
  'Dashboard':            { bg: 'rgba(59,130,246,0.08)',  text: '#60a5fa', border: 'rgba(59,130,246,0.2)' },
  'Food & Restaurant':    { bg: 'rgba(245,158,11,0.08)',  text: '#fbbf24', border: 'rgba(245,158,11,0.2)' },
  'Health & Fitness':     { bg: 'rgba(34,197,94,0.08)',   text: '#4ade80', border: 'rgba(34,197,94,0.2)' },
  'Travel & Booking':     { bg: 'rgba(14,165,233,0.08)',  text: '#38bdf8', border: 'rgba(14,165,233,0.2)' },
  'Social Media':         { bg: 'rgba(217,70,239,0.08)',  text: '#e879f9', border: 'rgba(217,70,239,0.2)' },
  'Music & Entertainment':{ bg: 'rgba(167,139,250,0.08)', text: '#a78bfa', border: 'rgba(167,139,250,0.2)' },
  'Education':            { bg: 'rgba(20,184,166,0.08)',  text: '#2dd4bf', border: 'rgba(20,184,166,0.2)' },
  'Real Estate':          { bg: 'rgba(16,185,129,0.08)',  text: '#34d399', border: 'rgba(16,185,129,0.2)' },
}

const getTagColors = (tag: string) => TAG_COLORS[tag] || { bg: 'rgba(113,113,122,0.08)', text: '#71717a', border: 'rgba(113,113,122,0.2)' }

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
        group rounded-2xl border border-zinc-800/50 bg-zinc-900/20
        hover:border-zinc-700/80 hover:bg-zinc-900/50 transition-all duration-300
        overflow-hidden relative cursor-pointer
        hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1
        ${className}
      `}
      onClick={() => onView?.(theme.slug)}
      {...props}
    >
      {/* Action buttons */}
      <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-1.5">
        {onEdit && (
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(theme.id) }}
            className="p-1.5 rounded-lg bg-blue-500/90 backdrop-blur-md text-white hover:bg-blue-500 cursor-pointer shadow-lg shadow-blue-500/20 transition-all hover:scale-110"
            title="Edit theme"
            aria-label="Edit theme"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(theme.id) }}
            className="p-1.5 rounded-lg bg-red-500/90 backdrop-blur-md text-white hover:bg-red-500 cursor-pointer shadow-lg shadow-red-500/20 transition-all hover:scale-110"
            title="Delete theme"
            aria-label="Delete theme"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Preview badge */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-medium flex items-center gap-1.5 shadow-lg">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Preview
        </span>
      </div>

      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
        <img
          src={theme.thumbnail}
          alt={theme.name}
          className="w-full h-full object-cover object-top group-hover:scale-[1.06] transition-transform duration-500"
          loading="lazy"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-[13px] font-semibold text-white group-hover:text-blue-400 transition-colors duration-200 truncate">
          {theme.name}
        </h3>
        <p className="text-[11px] text-zinc-500 mt-1.5 line-clamp-2 leading-relaxed">
          {theme.description}
        </p>

        {/* Community Rating */}
        {theme.reviews && theme.reviews.length > 0 && (() => {
          const avg = theme.reviews!.reduce((s, r) => s + r.rating, 0) / theme.reviews!.length
          return (
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-zinc-800/40">
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
              <span className="text-[10px] text-zinc-500">
                ({theme.reviews!.length})
              </span>
            </div>
          )
        })()}

        {/* Features preview */}
        {theme.features && theme.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {theme.features.slice(0, 2).map((feature) => (
              <span
                key={feature}
                className="text-[10px] px-2 py-0.5 rounded-md bg-blue-500/8 text-blue-400/80 border border-blue-500/15"
              >
                {feature}
              </span>
            ))}
            {theme.features.length > 2 && (
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-800/50 text-zinc-500">
                +{theme.features.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Tags */}
        {theme.tags && theme.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {theme.tags.map((tag) => {
              const colors = getTagColors(tag)
              return (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-md border font-medium"
                  style={{
                    backgroundColor: colors.bg,
                    color: colors.text,
                    borderColor: colors.border,
                  }}
                >
                  {tag}
                </span>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
