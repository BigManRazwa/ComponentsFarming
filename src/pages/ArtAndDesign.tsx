import { useState, useEffect, useRef } from 'react'
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

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
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

  // Count themes per category
  const catCounts: Record<string, number> = { 'All': themes.length }
  for (const cat of categories) {
    catCounts[cat] = themes.filter((t) => t.tags?.includes(cat)).length
  }

  const colClass =
    columns === 2 ? 'grid-cols-1 sm:grid-cols-2' :
    columns === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :
    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className="max-w-7xl mx-auto">

      {/* ═══════ HERO HEADER ═══════ */}
      <section
        className="text-center pt-4 pb-10"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.6s ease-out',
        }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-3">
          Theme Gallery
        </h1>
        <p className="text-zinc-500 text-sm sm:text-base mb-8">
          {themes.length} premium templates
        </p>

        {/* ─── Search bar ─── */}
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className={`relative flex-1 rounded-xl border transition-all duration-300 ${
            searchFocused
              ? 'border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.12)]'
              : 'border-zinc-800/60 hover:border-zinc-700/60'
          }`}>
            <svg
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-colors duration-200 ${
                searchFocused ? 'text-blue-400' : 'text-zinc-600'
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
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-zinc-900/40 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800/60 transition-colors cursor-pointer"
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
            className="shrink-0 flex items-center gap-2 px-5 py-3.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 active:scale-[0.97] transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Unggah</span>
          </button>
        </div>
      </section>

      {/* ═══════ CATEGORY FILTER ═══════ */}
      {categories.length > 0 && (
        <div
          className="mb-6"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s ease-out 0.1s',
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
          transition: 'all 0.6s ease-out 0.15s',
        }}
      >
        {/* Results count */}
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
              <div className="absolute top-full right-0 mt-1.5 w-full min-w-[140px] rounded-xl bg-zinc-900 border border-zinc-800/60 shadow-2xl shadow-black/50 py-1 z-50 overflow-hidden">
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

      {/* ═══════ DIVIDER ═══════ */}
      <div className="h-px bg-zinc-800/40 mb-8" />

      {/* ═══════ THEME GRID ═══════ */}
      {filtered.length > 0 ? (
        <div className={`grid ${colClass} gap-5`}>
          {filtered.map((theme, i) => {
            const avgRating = theme.reviews?.length
              ? theme.reviews.reduce((s, r) => s + r.rating, 0) / theme.reviews.length
              : 0

            return (
              <div
                key={theme.id}
                className="group relative rounded-2xl border border-zinc-800/40 bg-zinc-900/20 hover:border-blue-500/25 hover:bg-zinc-900/40 transition-all duration-400 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-blue-500/[0.04] hover:-translate-y-0.5"
                onClick={() => onViewTheme(theme.slug)}
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(16px)',
                  transition: `all 0.5s ease-out ${Math.min(0.04 * i, 0.4)}s`,
                }}
              >
                {/* Action buttons */}
                <div className="absolute top-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-1.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); onEdit(theme.id) }}
                    className="p-1.5 rounded-lg bg-blue-500/90 backdrop-blur-md text-white hover:bg-blue-500 cursor-pointer shadow-lg shadow-blue-500/20 transition-all hover:scale-110"
                    title="Edit tema"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(theme.id) }}
                    className="p-1.5 rounded-lg bg-red-500/90 backdrop-blur-md text-white hover:bg-red-500 cursor-pointer shadow-lg shadow-red-500/20 transition-all hover:scale-110"
                    title="Hapus tema"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Preview badge */}
                <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-medium flex items-center gap-1.5 shadow-lg">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Pratinjau
                  </span>
                </div>

                {/* ─── Browser mockup frame ─── */}
                <div className="m-3 mb-0 rounded-xl overflow-hidden border border-zinc-800/30 bg-zinc-950">
                  {/* Window chrome bar */}
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900/80 border-b border-zinc-800/30">
                    <div className="w-2 h-2 rounded-full bg-zinc-700/60" />
                    <div className="w-2 h-2 rounded-full bg-zinc-700/60" />
                    <div className="w-2 h-2 rounded-full bg-zinc-700/60" />
                    <div className="flex-1 mx-3 h-4 rounded-md bg-zinc-800/50" />
                  </div>

                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={theme.thumbnail}
                      alt={theme.name}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* ─── Card info ─── */}
                <div className="p-4 pt-3.5">
                  {/* Title + Rating */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-[13px] font-semibold text-white group-hover:text-blue-400 transition-colors duration-200 truncate">
                      {theme.name}
                    </h3>
                    {avgRating > 0 && (
                      <div className="flex items-center gap-1 shrink-0">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-2.5 h-2.5 ${star <= Math.round(avgRating) ? 'text-amber-400' : 'text-zinc-700'}`}
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
                  <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-2 mb-3">
                    {theme.description}
                  </p>

                  {/* Feature tags */}
                  {theme.features && theme.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {theme.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="text-[9px] px-2 py-0.5 rounded-md bg-blue-500/8 text-blue-400/70 border border-blue-500/10 font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                      {theme.features.length > 3 && (
                        <span className="text-[9px] px-2 py-0.5 rounded-md bg-zinc-800/40 text-zinc-600 font-medium">
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
                          className="text-[9px] px-2 py-0.5 rounded-md bg-zinc-800/50 text-zinc-500 border border-zinc-800/30 font-medium"
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
              <div className="w-20 h-20 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-zinc-400 text-sm font-medium mb-1.5">Belum ada desain</p>
              <p className="text-zinc-600 text-xs mb-6">Unggah tema pertama Anda untuk memulai.</p>
              <button
                onClick={onGoUpload}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-all cursor-pointer"
              >
                + Unggah Desain
              </button>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-zinc-400 text-sm font-medium mb-1.5">Tema tidak ditemukan</p>
              <p className="text-zinc-600 text-xs mb-5">Coba sesuaikan pencarian atau kriteria filter Anda.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveFilter('All') }}
                className="px-5 py-2 rounded-lg text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all cursor-pointer"
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
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
              <span className="text-[10px] text-zinc-700 tracking-wider uppercase font-medium">Komponen oleh Desain</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
