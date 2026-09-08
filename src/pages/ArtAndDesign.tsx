import { useState } from 'react'
import { ThemeCard, type ThemeData } from '../components/ui/ThemeCard'

const sortOptions = ['Popular', 'Newest', 'Top Rated']

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
  const [sortBy, setSortBy] = useState('Popular')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = themes.filter((theme) => {
    const matchesSearch =
      searchQuery === '' ||
      theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      activeFilter === 'All' ||
      theme.tags?.some((t) => t === activeFilter)

    return matchesSearch && matchesFilter
  })

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-zinc-600 mb-6">
        <span className="hover:text-zinc-400 cursor-pointer transition-colors">Themes</span>
        <span>›</span>
        <span className="text-zinc-400">Art & Design</span>
      </div>

      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
          Find the perfect theme for your{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">art and design</span> website.
        </h1>
        <p className="text-zinc-500 text-[15px] leading-relaxed max-w-2xl">
          Start your art and design website with the perfect theme. Browse high-quality,
          professionally designed options that embody the creative spirit you're looking for.
        </p>
      </div>

      {/* Search & Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search art & design themes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800/60 bg-zinc-900/30 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-zinc-800/60 bg-zinc-900/30 text-sm text-zinc-400 focus:outline-none focus:border-blue-500/40 cursor-pointer appearance-none min-w-[140px]"
        >
          {sortOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Category Filter Pills — dynamic from user-created categories */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveFilter('All')}
            className={`
              px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all
              ${activeFilter === 'All'
                ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                : 'bg-zinc-900/30 text-zinc-500 border border-zinc-800/40 hover:border-zinc-700 hover:text-zinc-300'
              }
            `}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`
                px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all
                ${activeFilter === cat
                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                  : 'bg-zinc-900/30 text-zinc-500 border border-zinc-800/40 hover:border-zinc-700 hover:text-zinc-300'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Section Title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Art & Design Themes</h2>
          <p className="text-xs text-zinc-600 mt-0.5">
            {filtered.length} theme{filtered.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <button
          onClick={onGoUpload}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium hover:from-blue-400 hover:to-cyan-400 active:scale-[0.97] transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Upload Design
        </button>
      </div>

      {/* Theme Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} onDelete={onDelete} onEdit={onEdit} onView={onViewTheme} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          {themes.length === 0 ? (
            <>
              <svg className="w-12 h-12 text-zinc-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-zinc-500 text-sm mb-1">No designs yet</p>
              <p className="text-zinc-600 text-xs mb-4">Upload your first theme to get started.</p>
              <button onClick={onGoUpload} className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium">
                + Upload Design
              </button>
            </>
          ) : (
            <>
              <svg className="w-12 h-12 text-zinc-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-zinc-500 text-sm">No themes found matching your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveFilter('All') }}
                className="mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear filters
              </button>
            </>
          )}
        </div>
      )}

      {themes.length > 0 && (
        <div className="mt-10 pt-6 border-t border-zinc-800/40 text-center">
          <p className="text-xs text-zinc-700">
            Showing {filtered.length} of {themes.length} art & design themes
          </p>
        </div>
      )}
    </div>
  )
}
