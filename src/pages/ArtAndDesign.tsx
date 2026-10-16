import { useState, useEffect, useRef, useCallback } from 'react'
import type { ThemeData } from '../components/ui/ThemeCard'

const sortOptions = ['Populer', 'Terbaru', 'Rating Tertinggi']

/* ─── Category SVG icon paths ─── */
const CATEGORY_ICONS: Record<string, string> = {
  'All':                   'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  'E-Commerce':            'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z',
  'Desktop':               'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  'Mobile':                'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
  'Portfolio':             'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
  'Fashion & Beauty':      'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  'Dashboard':             'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  'Food & Restaurant':     'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'Health & Fitness':      'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  'Travel & Booking':      'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'Social Media':          'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
  'Music & Entertainment': 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
  'Education':             'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  'Real Estate':           'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4',
}

const getCategoryIcon = (cat: string) =>
  CATEGORY_ICONS[cat] || 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'

/* ─── Keyframe CSS injected once ─── */
const GALLERY_STYLES = `
@keyframes glow-drift {
  0%, 100% { transform: translate(0%, 0%) scale(1); opacity: 0.4; }
  25% { transform: translate(30%, -20%) scale(1.2); opacity: 0.6; }
  50% { transform: translate(-10%, 30%) scale(0.9); opacity: 0.35; }
  75% { transform: translate(-30%, -10%) scale(1.1); opacity: 0.5; }
}
@keyframes glow-drift-2 {
  0%, 100% { transform: translate(0%, 0%) scale(1); opacity: 0.3; }
  33% { transform: translate(-25%, 25%) scale(1.15); opacity: 0.5; }
  66% { transform: translate(20%, -15%) scale(0.85); opacity: 0.25; }
}
@keyframes float-orb {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 0.6; }
  50% { transform: scale(1.05); opacity: 0.2; }
  100% { transform: scale(0.8); opacity: 0.6; }
}
@keyframes text-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes border-rotate {
  0% { --angle: 0deg; }
  100% { --angle: 360deg; }
}
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
.card-spotlight {
  --x: 50%;
  --y: 50%;
}
.card-spotlight::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    600px circle at var(--x) var(--y),
    rgba(59, 130, 246, 0.08),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 1;
  border-radius: inherit;
}
.card-spotlight:hover::before {
  opacity: 1;
}
`

interface ArtAndDesignProps {
  themes: ThemeData[]
  categories: string[]
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  onGoUpload: () => void
  onViewTheme: (slug: string) => void
}

export function ArtAndDesign({ themes, categories, onDelete, onEdit, onGoUpload, onViewTheme }: ArtAndDesignProps) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Populer')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [columns, setColumns] = useState(3)
  const [filtersExpanded, setFiltersExpanded] = useState(true)
  const [mounted, setMounted] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  /* ── Spotlight effect: track mouse across entire grid ── */
  const handleGridMouseMove = useCallback((e: React.MouseEvent) => {
    const cards = gridRef.current?.querySelectorAll('.card-spotlight')
    cards?.forEach((card) => {
      const rect = (card as HTMLElement).getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      ;(card as HTMLElement).style.setProperty('--x', `${x}px`)
      ;(card as HTMLElement).style.setProperty('--y', `${y}px`)
    })
  }, [])

  const filtered = themes.filter((theme) => {
    const matchesSearch =
      searchQuery === '' ||
      theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      activeFilter === 'All' ||
      theme.tags?.some((t) => t === activeFilter)
    return matchesSearch && matchesFilter
  }).sort((a, b) => {
    if (sortBy === 'Populer') return (b.reviews?.length || 0) - (a.reviews?.length || 0)
    if (sortBy === 'Rating Tertinggi') {
      const aR = a.reviews?.length ? a.reviews.reduce((s: number, r: any) => s + r.rating, 0) / a.reviews.length : 0
      const bR = b.reviews?.length ? b.reviews.reduce((s: number, r: any) => s + r.rating, 0) / b.reviews.length : 0
      return bR - aR
    }
    return 0
  })

  const allCats = ['All', ...categories]

  const catCounts: Record<string, number> = { 'All': themes.length }
  for (const cat of categories) {
    catCounts[cat] = themes.filter((t) => t.tags?.includes(cat)).length
  }

  const colClass =
    columns === 2 ? 'grid-cols-1 sm:grid-cols-2' :
    columns === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :
    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  const totalRatings = themes.reduce((sum, t) => sum + (t.reviews?.length || 0), 0)

  return (
    <div className="max-w-7xl mx-auto relative">
      <style>{GALLERY_STYLES}</style>

      {/* ═══════ HERO HEADER ═══════ */}
      <section className="relative text-center pt-6 pb-14 overflow-hidden">

        {/* Ambient glow orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {/* Primary blue orb */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
              top: '-15%', left: '10%',
              animation: 'glow-drift 12s ease-in-out infinite',
            }}
          />
          {/* Secondary cyan orb */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
              top: '5%', right: '5%',
              animation: 'glow-drift-2 15s ease-in-out infinite',
            }}
          />
          {/* Faint grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Floating indicator orbs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute w-2 h-2 rounded-full bg-blue-500/40 top-[18%] left-[22%]" style={{ animation: 'float-orb 4s ease-in-out infinite' }} />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/30 top-[35%] right-[18%]" style={{ animation: 'float-orb 5s ease-in-out 1s infinite' }} />
          <div className="absolute w-1 h-1 rounded-full bg-blue-400/50 top-[25%] left-[65%]" style={{ animation: 'float-orb 3.5s ease-in-out 0.5s infinite' }} />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400/25 top-[12%] right-[35%]" style={{ animation: 'float-orb 6s ease-in-out 2s infinite' }} />
        </div>

        {/* Content */}
        <div className="relative z-10" style={{ animation: mounted ? 'fade-in-up 0.8s ease-out' : 'none' }}>

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 mb-6"
          >
            <div className="relative">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'pulse-ring 2s ease-in-out infinite' }} />
            </div>
            <span className="text-[11px] font-medium text-blue-400/90 tracking-wide">
              {themes.length} templates &middot; {categories.length} categories &middot; {totalRatings} ratings
            </span>
          </div>

          {/* Title with shimmer */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4">
            <span className="text-white">Theme </span>
            <span
              className="inline-block"
              style={{
                background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 25%, #8b5cf6 50%, #3b82f6 75%, #06b6d4 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'text-shimmer 4s linear infinite',
              }}
            >
              Gallery
            </span>
          </h1>

          <p className="text-zinc-500 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
            Discover hand-crafted UI themes built for modern apps.
            <br className="hidden sm:block" />
            <span className="text-zinc-600"> Explore, preview, and ship faster.</span>
          </p>

          {/* ─── Search bar ─── */}
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <div className={`relative flex-1 rounded-2xl border transition-all duration-500 backdrop-blur-sm ${
              searchFocused
                ? 'border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1),0_0_60px_rgba(59,130,246,0.05)] bg-zinc-900/60'
                : 'border-zinc-800/50 hover:border-zinc-700/50 bg-zinc-900/30'
            }`}>
              <svg
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-all duration-300 ${
                  searchFocused ? 'text-blue-400 scale-110' : 'text-zinc-600'
                }`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cari tema, komponen, gaya..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-transparent text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800/60 transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Upload button */}
            <button
              onClick={onGoUpload}
              className="group shrink-0 flex items-center gap-2 px-5 py-4 rounded-2xl bg-blue-600 text-white text-sm font-semibold
                hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20
                active:scale-[0.96] transition-all duration-300 cursor-pointer"
            >
              <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Unggah</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════ CATEGORY FILTER ═══════ */}
      {categories.length > 0 && (
        <div
          className="mb-6"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s ease-out 0.15s',
          }}
        >
          {/* Filter header bar */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFiltersExpanded(!filtersExpanded)}
                className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Kategori
                <svg className={`w-3 h-3 text-zinc-600 transition-transform duration-200 ${filtersExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Active filter chip */}
              {activeFilter !== 'All' && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <span className="text-[11px] text-blue-400 font-medium">{activeFilter}</span>
                  <button
                    onClick={() => setActiveFilter('All')}
                    className="p-0.5 rounded hover:bg-blue-500/20 text-blue-400/60 hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {activeFilter !== 'All' && (
              <button
                onClick={() => setActiveFilter('All')}
                className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
              >
                Hapus filter
              </button>
            )}
          </div>

          {/* Filter grid — collapsible */}
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: filtersExpanded ? '500px' : '0px',
              opacity: filtersExpanded ? 1 : 0,
            }}
          >
            <div className="flex flex-wrap gap-2 pb-2">
              {allCats.map((cat) => {
                const isActive = activeFilter === cat
                const iconPath = getCategoryIcon(cat)
                const count = catCounts[cat] || 0
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`
                      group flex items-center gap-2 pl-3 pr-2.5 py-2 rounded-xl text-xs font-medium
                      transition-all duration-200 cursor-pointer border
                      ${isActive
                        ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/15'
                        : count === 0
                          ? 'bg-zinc-900/20 text-zinc-600 border-zinc-800/30 hover:bg-zinc-800/40 hover:text-zinc-500 hover:border-zinc-700/40'
                          : 'bg-zinc-900/40 text-zinc-400 border-zinc-800/50 hover:bg-zinc-800/60 hover:text-zinc-200 hover:border-zinc-700/60'
                      }
                    `}
                  >
                    <svg
                      className={`w-3.5 h-3.5 ${
                        isActive ? 'text-white/80' : count === 0 ? 'text-zinc-700' : 'text-zinc-600 group-hover:text-zinc-400'
                      }`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={iconPath} />
                    </svg>
                    <span className="whitespace-nowrap">{cat}</span>
                    <span className={`
                      text-[10px] min-w-[18px] text-center px-1 py-0.5 rounded-md font-semibold
                      ${isActive
                        ? 'bg-white/20 text-white'
                        : count === 0
                          ? 'bg-zinc-800/30 text-zinc-700'
                          : 'bg-zinc-800/60 text-zinc-500 group-hover:bg-zinc-700/60 group-hover:text-zinc-400'
                      }
                    `}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══════ INFO BAR ═══════ */}
      <div
        className="flex items-center justify-between mb-6 px-1"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.6s ease-out 0.2s',
        }}
      >
        <p className="text-xs text-zinc-500">
          Menampilkan <span className="text-zinc-300 font-medium">{filtered.length}</span> dari{' '}
          <span className="text-zinc-300 font-medium">{themes.length}</span>
        </p>

        <div className="flex items-center gap-3">
          {/* Column density toggle */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-zinc-900/40 border border-zinc-800/40">
            {[2, 3, 4].map((col) => (
              <button
                key={col}
                onClick={() => setColumns(col)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                  columns === col
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
                    : 'text-zinc-600 hover:text-zinc-400 border border-transparent'
                }`}
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                  {col === 2 && (
                    <>
                      <rect x="1" y="1" width="6" height="6" rx="1" />
                      <rect x="9" y="1" width="6" height="6" rx="1" />
                      <rect x="1" y="9" width="6" height="6" rx="1" />
                      <rect x="9" y="9" width="6" height="6" rx="1" />
                    </>
                  )}
                  {col === 3 && (
                    <>
                      <rect x="1" y="1" width="3.5" height="6" rx="0.8" />
                      <rect x="6.25" y="1" width="3.5" height="6" rx="0.8" />
                      <rect x="11.5" y="1" width="3.5" height="6" rx="0.8" />
                      <rect x="1" y="9" width="3.5" height="6" rx="0.8" />
                      <rect x="6.25" y="9" width="3.5" height="6" rx="0.8" />
                      <rect x="11.5" y="9" width="3.5" height="6" rx="0.8" />
                    </>
                  )}
                  {col === 4 && (
                    <>
                      <rect x="0.5" y="1" width="3" height="6" rx="0.7" />
                      <rect x="4.5" y="1" width="3" height="6" rx="0.7" />
                      <rect x="8.5" y="1" width="3" height="6" rx="0.7" />
                      <rect x="12.5" y="1" width="3" height="6" rx="0.7" />
                      <rect x="0.5" y="9" width="3" height="6" rx="0.7" />
                      <rect x="4.5" y="9" width="3" height="6" rx="0.7" />
                      <rect x="8.5" y="9" width="3" height="6" rx="0.7" />
                      <rect x="12.5" y="9" width="3" height="6" rx="0.7" />
                    </>
                  )}
                </svg>
                {col}-col
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900/40 border border-zinc-800/40 text-xs text-zinc-400 hover:text-zinc-300 hover:border-zinc-700/60 transition-all cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              {sortBy}
              <svg className={`w-3 h-3 text-zinc-600 transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {sortOpen && (
              <div className="absolute top-full right-0 mt-1.5 w-full min-w-[140px] rounded-xl bg-zinc-900 border border-zinc-800/60 shadow-2xl shadow-black/50 py-1 z-50 overflow-hidden backdrop-blur-xl">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSortBy(opt); setSortOpen(false) }}
                    className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer ${
                      sortBy === opt
                        ? 'text-blue-400 bg-blue-500/10'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══════ DIVIDER — gradient fade ═══════ */}
      <div className="h-px mb-8 bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent" />

      {/* ═══════ THEME GRID ═══════ */}
      {filtered.length > 0 ? (
        <div
          ref={gridRef}
          className={`grid ${colClass} gap-5`}
          onMouseMove={handleGridMouseMove}
        >
          {filtered.map((theme, i) => {
            const avgRating = theme.reviews?.length
              ? theme.reviews.reduce((s, r) => s + r.rating, 0) / theme.reviews.length
              : 0

            return (
              <div
                key={theme.id}
                className="card-spotlight group relative rounded-2xl border border-zinc-800/50 bg-zinc-900/30
                  hover:border-zinc-700/80 hover:bg-zinc-900/60
                  transition-all duration-300 overflow-hidden cursor-pointer
                  hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1"
                onClick={() => onViewTheme(theme.slug)}
                style={{
                  animation: mounted ? `fade-in-up 0.5s ease-out ${Math.min(0.05 * i, 0.5)}s both` : 'none',
                }}
              >
                {/* Action buttons */}
                <div className="absolute top-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-1.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); onEdit(theme.id) }}
                    className="p-1.5 rounded-lg bg-zinc-900/80 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-blue-600 border border-zinc-700/50 cursor-pointer shadow-lg transition-all hover:scale-105"
                    title="Edit tema"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(theme.id) }}
                    className="p-1.5 rounded-lg bg-zinc-900/80 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-red-600 border border-zinc-700/50 cursor-pointer shadow-lg transition-all hover:scale-105"
                    title="Hapus tema"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Preview badge */}
                <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900/80 backdrop-blur-md text-zinc-200 border border-zinc-700/50 text-[10px] font-medium flex items-center gap-1.5 shadow-lg">
                    <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Pratinjau
                  </span>
                </div>

                {/* ─── Clean Thumbnail Showcase ─── */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950 border-b border-zinc-800/40">
                  <img
                    src={theme.thumbnail}
                    alt={theme.name}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.05] transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
                </div>

                {/* ─── Card info ─── */}
                <div className="relative z-10 p-4">
                  {/* Title + Rating */}
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h3 className="text-[13px] font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors duration-200 truncate">
                      {theme.name}
                    </h3>
                    {avgRating > 0 && (
                      <div className="flex items-center gap-1 shrink-0 pt-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-2.5 h-2.5 transition-colors duration-200 ${star <= Math.round(avgRating) ? 'text-amber-400' : 'text-zinc-700'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2 mb-3">
                    {theme.description}
                  </p>

                  {/* Feature tags */}
                  {theme.features && theme.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {theme.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="text-[9px] px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400/90 border border-blue-500/20 font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                      {theme.features.length > 3 && (
                        <span className="text-[9px] px-2 py-0.5 rounded-md bg-zinc-800/60 text-zinc-500 font-medium border border-zinc-800/40">
                          +{theme.features.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Category tags */}
                  {theme.tags && theme.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {theme.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] px-2 py-0.5 rounded-md bg-zinc-800/40 text-zinc-400 border border-zinc-800/60 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* ─── Empty state ─── */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          {themes.length === 0 ? (
            <>
              <div className="relative w-24 h-24 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
              <p className="text-zinc-300 text-base font-semibold mb-1.5">Belum ada desain</p>
              <p className="text-zinc-600 text-sm mb-6">Unggah tema pertama Anda untuk memulai.</p>
              <button
                onClick={onGoUpload}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all cursor-pointer"
              >
                + Unggah Desain
              </button>
            </>
          ) : (
            <>
              <div className="w-24 h-24 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-zinc-300 text-base font-semibold mb-1.5">Tema tidak ditemukan</p>
              <p className="text-zinc-600 text-sm mb-5">Coba sesuaikan pencarian atau kriteria filter Anda.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveFilter('All') }}
                className="px-5 py-2.5 rounded-lg text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all cursor-pointer"
              >
                Hapus semua filter
              </button>
            </>
          )}
        </div>
      )}

      {/* ═══════ FOOTER ═══════ */}
      {themes.length > 0 && (
        <div className="mt-14 pt-6 border-t border-zinc-800/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-zinc-600">
              Menampilkan {filtered.length} dari {themes.length} template
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" style={{ animation: 'pulse-ring 3s ease-in-out infinite' }} />
              <span className="text-[10px] text-zinc-700 tracking-wider uppercase font-medium">Komponen oleh Desain</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
