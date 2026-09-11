import { useState, useRef, useEffect } from 'react'
import type { ThemeData, Review, StyleVariation } from '../components/ui/ThemeCard'

interface ThemeDetailProps {
  theme: ThemeData
  onBack: () => void
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  onUpdate: (updated: ThemeData) => void
}

function StarRating({ rating, size = 'sm', interactive = false, onChange }: {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onChange?: (r: number) => void
}) {
  const sizeClass = size === 'lg' ? 'w-6 h-6' : size === 'md' ? 'w-5 h-5' : 'w-3.5 h-3.5'
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClass} ${star <= Math.round(rating) ? 'text-amber-400' : 'text-zinc-700'} ${interactive ? 'cursor-pointer hover:text-amber-300' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          onClick={() => interactive && onChange?.(star)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function computeAvgRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
}

function VariationCard({ variation, isActive, onClick }: {
  variation: StyleVariation | null
  isActive: boolean
  onClick: () => void
}) {
  const bg = variation?.bgColor || '#ffffff'
  const text = variation?.textColor || '#000000'
  const accent = variation?.accentColor || '#333333'
  const font = variation?.fontFamily || 'serif'

  return (
    <button
      onClick={onClick}
      className={`
        w-20 h-20 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 shrink-0
        ${isActive
          ? 'border-blue-500 ring-2 ring-blue-500/20'
          : 'border-zinc-700 hover:border-zinc-600'
        }
      `}
      style={{ backgroundColor: bg }}
    >
      <span
        className="text-xl font-semibold leading-none"
        style={{ color: text, fontFamily: font }}
      >
        Aa
      </span>
      <div className="flex gap-1">
        <div className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: text }} />
        <div className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: accent }} />
      </div>
    </button>
  )
}

export function ThemeDetail({ theme, onBack, onDelete, onEdit, onUpdate }: ThemeDetailProps) {
  const [activeVariation, setActiveVariation] = useState<number | null>(null)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewAuthor, setReviewAuthor] = useState('')
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewComment, setReviewComment] = useState('')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const reviews = theme.reviews || []
  const avgRating = computeAvgRating(reviews)
  const hasVariations = theme.styleVariations && theme.styleVariations.length > 0

  // Send style-variation change to the iframe via postMessage
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    function sendVariation() {
      const v = activeVariation !== null ? theme.styleVariations?.[activeVariation] : null
      iframe!.contentWindow?.postMessage(
        {
          type: 'SET_THEME_VARIATION',
          variation: v ? { accent: v.accentColor, bg: v.bgColor, text: v.textColor, font: v.fontFamily } : null,
        },
        '*'
      )
    }

    if (iframe.contentDocument?.readyState === 'complete') {
      sendVariation()
    }
    iframe.addEventListener('load', sendVariation)
    return () => iframe.removeEventListener('load', sendVariation)
  }, [activeVariation, theme.styleVariations])

  const demoUrl = theme.demoUrl
    ? theme.demoUrl.startsWith('http') || theme.demoUrl.startsWith('/')
      ? theme.demoUrl
      : undefined
    : undefined

  function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault()
    if (!reviewAuthor.trim() || reviewRating === 0) return

    const newReview: Review = {
      id: crypto.randomUUID(),
      author: reviewAuthor.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: new Date().toISOString().split('T')[0],
    }

    onUpdate({ ...theme, reviews: [newReview, ...reviews] })
    setReviewAuthor('')
    setReviewRating(0)
    setReviewComment('')
    setShowReviewForm(false)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-zinc-600 mb-8">
        <button onClick={onBack} className="hover:text-zinc-400 transition-colors cursor-pointer">Themes</button>
        <span>›</span>
        <button onClick={onBack} className="hover:text-zinc-400 transition-colors cursor-pointer">Art & Design</button>
        <span>›</span>
        <span className="text-zinc-400">{theme.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* ───── LEFT COLUMN ───── */}
        <div className="lg:col-span-2 space-y-8">

          {/* Title & Actions */}
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold text-white tracking-tight">{theme.name}</h1>
            <div className="flex gap-2 shrink-0 mt-1">
              <button
                onClick={() => onEdit(theme.id)}
                className="p-2 rounded-xl border border-zinc-800/60 text-zinc-600 hover:text-blue-400 hover:border-blue-500/30 transition-all cursor-pointer"
                title="Edit theme"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(theme.id)}
                className="p-2 rounded-xl border border-zinc-800/60 text-zinc-600 hover:text-red-400 hover:border-red-500/30 transition-all cursor-pointer"
                title="Delete theme"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Community Rating */}
          <div>
            <h2 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">Community Rating</h2>
            {reviews.length > 0 ? (
              <div className="flex items-center gap-3">
                <StarRating rating={avgRating} size="md" />
                <span className="text-sm text-zinc-400">{avgRating.toFixed(1)}/5</span>
                <span className="text-xs text-zinc-500">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
              </div>
            ) : (
              <p className="text-xs text-zinc-500">No reviews yet. Be the first to rate this theme.</p>
            )}
          </div>

          {/* ── Style Customization (only if variations exist) ── */}
          {hasVariations && (
            <>
              {/* Default Style */}
              <div>
                <h2 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">Default Style</h2>
                <VariationCard
                  variation={null}
                  isActive={activeVariation === null}
                  onClick={() => setActiveVariation(null)}
                />
              </div>

              {/* Style Variations */}
              <div>
                <h2 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Style Variations
                </h2>
                <p className="text-xs text-zinc-500 mb-4">
                  Preview style variations — pick your own fonts and colors.
                </p>
                <div className="flex flex-wrap gap-3">
                  {theme.styleVariations!.map((v, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5">
                      <VariationCard
                        variation={v}
                        isActive={activeVariation === i}
                        onClick={() => setActiveVariation(i)}
                      />
                      <span className="text-xs text-zinc-500 max-w-[80px] truncate">{v.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Description */}
          {theme.description && (
            <div>
              <h2 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">Description</h2>
              <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">{theme.description}</p>
            </div>
          )}

          {/* Features */}
          {theme.features && theme.features.length > 0 && (
            <div>
              <h2 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">Features</h2>
              <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/20 divide-y divide-zinc-800/40">
                {theme.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 px-4 py-3">
                    <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {theme.tags && theme.tags.length > 0 && (
            <div>
              <h2 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {theme.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800/60 text-zinc-400 border border-zinc-700/40">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ───── REVIEWS SECTION ───── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Reviews ({reviews.length})
              </h2>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium cursor-pointer"
              >
                {showReviewForm ? 'Cancel' : '+ Add Review'}
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-4 mb-5 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    placeholder="Anonymous"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-800/60 bg-zinc-900/50 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-blue-500/40 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Rating *</label>
                  <div className="flex items-center gap-2">
                    <StarRating rating={reviewRating} size="lg" interactive onChange={setReviewRating} />
                    {reviewRating > 0 && <span className="text-xs text-zinc-500">{reviewRating}/5</span>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Comment</label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share your experience with this theme..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-800/60 bg-zinc-900/50 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-blue-500/40 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!reviewAuthor.trim() || reviewRating === 0}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${reviewAuthor.trim() && reviewRating > 0
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400 cursor-pointer'
                      : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                    }
                  `}
                >
                  Submit Review
                </button>
              </form>
            )}

            {/* Review List */}
            {reviews.length > 0 ? (
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div key={review.id} className="rounded-xl border border-zinc-800/60 bg-zinc-900/20 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-500/15 text-blue-400 text-xs font-semibold flex items-center justify-center">
                          {review.author.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-zinc-300 font-medium">{review.author}</span>
                      </div>
                      <span className="text-xs text-zinc-500">{review.date}</span>
                    </div>
                    <StarRating rating={review.rating} size="sm" />
                    {review.comment && (
                      <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              !showReviewForm && (
                <div className="rounded-xl border border-dashed border-zinc-800/60 py-8 text-center">
                  <p className="text-xs text-zinc-500 mb-2">No reviews yet</p>
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium cursor-pointer"
                  >
                    Be the first to review
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* ───── RIGHT COLUMN — DEMO PREVIEW ───── */}
        <div className="lg:col-span-3">
          <div className="sticky top-8 space-y-4">
            {/* Demo iframe or screenshot */}
            <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-800/60 flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                <span className="text-[11px] text-zinc-500 ml-2 uppercase tracking-wider">
                  {demoUrl ? 'Live Demo' : 'Preview'}
                </span>
                {demoUrl && (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-[10px] text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Open in new tab ↗
                  </a>
                )}
              </div>

              {demoUrl ? (() => {
                const isMobile = theme.tags?.includes('Mobile')
                return isMobile ? (
                  <div className="relative w-full overflow-hidden flex justify-center bg-zinc-950" style={{ height: '600px' }}>
                    <iframe
                      ref={iframeRef}
                      src={demoUrl}
                      title={`${theme.name} demo`}
                      className="border-0"
                      style={{
                        width: 'min(390px, 100%)',
                        height: '600px',
                      }}
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                  </div>
                ) : (
                  <div className="relative w-full overflow-hidden" style={{ height: '600px' }}>
                    <iframe
                      ref={iframeRef}
                      src={demoUrl}
                      title={`${theme.name} demo`}
                      className="border-0 origin-top-left"
                      style={{
                        width: '1440px',
                        height: '1333px',
                        transform: 'scale(0.45)',
                        transformOrigin: 'top left',
                      }}
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                  </div>
                )
              })() : (
                <img
                  src={theme.thumbnail}
                  alt={theme.name}
                  className="w-full object-cover object-top"
                />
              )}
            </div>

            {/* Demo link card */}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-zinc-800/60 bg-zinc-900/30 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <div>
                    <p className="text-sm text-zinc-300 group-hover:text-blue-400 transition-colors font-medium">Preview Demo Site</p>
                    <p className="text-xs text-zinc-500 truncate max-w-xs">{theme.demoUrl}</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-zinc-700 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}

            {/* Download this theme */}
            {demoUrl && (
              <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 px-5 py-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200 mb-1">Download this theme</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    This theme is available for download to be used on your own project.
                  </p>
                </div>
                <button
                  onClick={() => {
                    try {
                      const iframe = iframeRef.current
                      if (iframe?.contentDocument) {
                        const html = iframe.contentDocument.documentElement.outerHTML
                        const blob = new Blob([`<!DOCTYPE html>\n${html}`], { type: 'text/html' })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = `${theme.slug}.html`
                        a.click()
                        URL.revokeObjectURL(url)
                      } else {
                        // Fallback: open in new tab
                        window.open(demoUrl, '_blank')
                      }
                    } catch {
                      window.open(demoUrl, '_blank')
                    }
                  }}
                  className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700/60 bg-zinc-800/40 text-sm text-zinc-300 font-medium hover:border-blue-500/40 hover:text-blue-400 hover:bg-blue-500/5 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
