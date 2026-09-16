import { useState, useEffect, useRef } from 'react'
import { ThemeCard, type ThemeData } from '../components/ui/ThemeCard'

const sortOptions = ['Popular', 'Newest', 'Top Rated']

/* ─── Category SVG icons & colors ─── */
const CATEGORY_META: Record<string, { icon: string; gradient: string }> = {
  'All':                  { icon: 'M12 4v16m8-8H4',  gradient: 'from-blue-500 to-cyan-500' },
  'E-Commerce':           { icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z', gradient: 'from-orange-500 to-amber-500' },
  'Desktop':              { icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', gradient: 'from-slate-500 to-zinc-500' },
  'Mobile':               { icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', gradient: 'from-violet-500 to-purple-500' },
  'Portfolio':            { icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01', gradient: 'from-pink-500 to-rose-500' },
  'Fashion & Beauty':     { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', gradient: 'from-rose-400 to-pink-500' },
  'Dashboard':            { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', gradient: 'from-blue-500 to-indigo-500' },
  'Food & Restaurant':    { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', gradient: 'from-amber-500 to-orange-500' },
  'Health & Fitness':     { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', gradient: 'from-green-500 to-emerald-500' },
  'Travel & Booking':     { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', gradient: 'from-sky-500 to-blue-500' },
  'Social Media':         { icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z', gradient: 'from-fuchsia-500 to-pink-500' },
  'Music & Entertainment':{ icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3', gradient: 'from-purple-500 to-violet-500' },
  'Education':            { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', gradient: 'from-teal-500 to-cyan-500' },
  'Real Estate':          { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4', gradient: 'from-emerald-500 to-green-500' },
}

const getCategoryMeta = (cat: string) => CATEGORY_META[cat] || { icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', gradient: 'from-zinc-500 to-zinc-600' }

function CategoryIcon({ path, className = '' }: { path: string; className?: string }) {
  return (
    <svg className={`w-3.5 h-3.5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={path} />
    </svg>
  )
}

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
  const [searchFocused, setSearchFocused] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)
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
    if (sortBy === 'Popular') return (b.reviews?.length || 0) - (a.reviews?.length || 0)
    if (sortBy === 'Top Rated') {
      const aR = a.reviews?.length ? a.reviews.reduce((s: number, r: any) => s + r.rating, 0) / a.reviews.length : 0
      const bR = b.reviews?.length ? b.reviews.reduce((s: number, r: any) => s + r.rating, 0) / b.reviews.length : 0
      return bR - aR
    }
    return 0
  })

  const allCats = ['All', ...categories]
  const activeMeta = getCategoryMeta(activeFilter)

  /* ─── Paint splatter colors ─── */
  const C = { pink: '#ec4899', blue: '#3b82f6', green: '#22c55e', orange: '#f97316', purple: '#a855f7' }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Graffiti hero keyframes */}
      <style>{`
        @keyframes gDrip { 0% { height:0; opacity:0; } 30% { opacity:1; } 100% { height: var(--h); opacity:.7; } }
        @keyframes gPulse { 0%,100% { transform:scale(1); opacity:.15; } 50% { transform:scale(1.05); opacity:.25; } }
        @keyframes gSpray { 0% { opacity:0; transform:scale(.8); } 50% { opacity:.12; transform:scale(1); } 100% { opacity:0; transform:scale(1.1); } }
        @keyframes gGlow { 0%,100% { opacity:.6; filter:blur(20px); } 50% { opacity:1; filter:blur(30px); } }
        @keyframes gFloat { 0%,100% { transform:translateY(0) rotate(0deg); } 50% { transform:translateY(-6px) rotate(2deg); } }
        @keyframes gSlide { 0% { transform:translateX(-100%); } 100% { transform:translateX(200%); } }
        @keyframes gShake { 0%,100% { transform:translate(0) rotate(0); } 25% { transform:translate(1px,-1px) rotate(.3deg); } 75% { transform:translate(-1px,1px) rotate(-.3deg); } }
      `}</style>

      {/* ═══════ HERO — GRAFFITI ═══════ */}
      <div
        className="relative rounded-2xl overflow-hidden mb-8"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.7s ease-out',
        }}
      >
        {/* Dark concrete wall base */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0a0e 0%, #111118 30%, #0d0d16 60%, #0a0a10 100%)' }} />

        {/* Noise/grain texture */}
        <div className="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }} />

        {/* Paint splatters & decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Big pink splash — top right */}
          <svg className="absolute -top-8 -right-12 w-[350px] h-[300px]" viewBox="0 0 350 300" style={{ animation: 'gPulse 6s ease-in-out infinite', opacity: 0.15 }}>
            <ellipse cx="200" cy="130" rx="140" ry="100" fill={C.pink} transform="rotate(-15 200 130)" />
            <ellipse cx="250" cy="180" rx="60" ry="40" fill={C.pink} transform="rotate(20 250 180)" />
            <circle cx="140" cy="80" r="30" fill={C.pink} />
            <circle cx="300" cy="200" r="15" fill={C.pink} />
          </svg>

          {/* Blue splash — bottom left */}
          <svg className="absolute -bottom-10 -left-16 w-[320px] h-[280px]" viewBox="0 0 320 280" style={{ animation: 'gPulse 8s ease-in-out 2s infinite', opacity: 0.12 }}>
            <ellipse cx="150" cy="150" rx="130" ry="90" fill={C.blue} transform="rotate(25 150 150)" />
            <ellipse cx="80" cy="80" rx="50" ry="35" fill={C.blue} transform="rotate(-10 80 80)" />
            <circle cx="250" cy="200" r="25" fill={C.blue} />
          </svg>

          {/* Green spray — center right */}
          <div className="absolute top-[20%] right-[15%] w-[200px] h-[200px] rounded-full" style={{ background: `radial-gradient(circle, ${C.green}1f 0%, transparent 70%)`, animation: 'gSpray 5s ease-in-out infinite' }} />

          {/* Orange spray — bottom right */}
          <div className="absolute bottom-[10%] right-[30%] w-[150px] h-[150px] rounded-full" style={{ background: `radial-gradient(circle, ${C.orange}1a 0%, transparent 70%)`, animation: 'gSpray 7s ease-in-out 1s infinite' }} />

          {/* Purple mist */}
          <div className="absolute top-[40%] left-[30%] w-[250px] h-[180px]" style={{ background: `radial-gradient(ellipse, ${C.purple}14 0%, transparent 70%)`, animation: 'gGlow 10s ease-in-out infinite' }} />

          {/* Paint drips from top */}
          {[
            { left: '12%', color: C.pink, h: '45px', delay: '0s' },
            { left: '28%', color: C.blue, h: '60px', delay: '1s' },
            { left: '55%', color: C.green, h: '30px', delay: '3s' },
            { left: '65%', color: C.orange, h: '50px', delay: '0.5s' },
            { left: '78%', color: C.purple, h: '40px', delay: '1.5s' },
            { left: '92%', color: C.pink, h: '35px', delay: '2.5s' },
          ].map((d, i) => (
            <div key={i} className="absolute top-0 w-[3px] rounded-b-full" style={{
              left: d.left, backgroundColor: d.color, opacity: 0.35,
              '--h': d.h, animation: `gDrip 4s ease-in ${d.delay} infinite`,
            } as React.CSSProperties} />
          ))}

          {/* Caution stripe — bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{
            background: 'repeating-linear-gradient(90deg, #f59e0b 0px, #f59e0b 8px, transparent 8px, transparent 16px)',
            opacity: 0.25,
          }} />

          {/* Spray sweep */}
          <div className="absolute top-0 bottom-0 w-[120px]" style={{
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.06), transparent)',
            animation: 'gSlide 8s linear infinite',
          }} />

          {/* Scattered paint dots */}
          {[
            { x: '15%', y: '25%', s: 4, c: C.pink }, { x: '82%', y: '35%', s: 3, c: C.green },
            { x: '45%', y: '15%', s: 5, c: C.blue }, { x: '70%', y: '70%', s: 3, c: C.orange },
            { x: '25%', y: '65%', s: 4, c: C.purple }, { x: '55%', y: '80%', s: 3, c: C.pink },
            { x: '90%', y: '20%', s: 6, c: C.blue }, { x: '8%', y: '50%', s: 3, c: C.green },
            { x: '38%', y: '42%', s: 2, c: C.orange }, { x: '62%', y: '55%', s: 4, c: C.purple },
          ].map((dot, i) => (
            <div key={i} className="absolute rounded-full" style={{
              left: dot.x, top: dot.y, width: dot.s, height: dot.s,
              backgroundColor: dot.c, opacity: 0.25 + (i % 3) * 0.1,
              animation: `gFloat ${3 + i * 0.7}s ease-in-out ${i * 0.4}s infinite`,
            }} />
          ))}

          {/* Graffiti "tags" — decorative text-like shapes */}
          <svg className="absolute top-4 right-8 opacity-[0.04] w-[180px]" viewBox="0 0 180 40"><text x="0" y="32" fill="white" fontSize="36" fontWeight="900" fontFamily="Impact, sans-serif" letterSpacing="3">DESIGN</text></svg>
          <svg className="absolute bottom-6 left-6 opacity-[0.03] w-[120px]" viewBox="0 0 120 30"><text x="0" y="24" fill="white" fontSize="28" fontWeight="900" fontFamily="Impact, sans-serif" letterSpacing="2">ART</text></svg>
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Themes</span>
            <svg className="w-3 h-3 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            <span className="text-zinc-400">Art & Design</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              {/* Neon dots + label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.pink, boxShadow: `0 0 8px ${C.pink}` }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.blue, boxShadow: `0 0 8px ${C.blue}` }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.green, boxShadow: `0 0 8px ${C.green}` }} />
                </div>
                <span className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase font-bold" style={{ fontFamily: 'monospace' }}>Component Library</span>
              </div>

              {/* Title with graffiti gradient */}
              <h1 className="text-3xl md:text-4xl lg:text-[44px] font-black text-white tracking-tight mb-4 leading-[1.1]" style={{ animation: mounted ? 'gShake 0.15s ease-in-out 3' : 'none' }}>
                Find the perfect theme for your{' '}
                <span className="relative inline-block">
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${C.pink}, ${C.blue}, ${C.green})` }}>
                    art and design
                  </span>
                  {/* Neon underline */}
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full" style={{
                    background: `linear-gradient(90deg, ${C.pink}, ${C.blue}, ${C.green})`,
                    boxShadow: `0 0 10px ${C.blue}80, 0 0 20px ${C.blue}33`,
                  }} />
                </span>
                {' '}website.
              </h1>

              <p className="text-zinc-500 text-[15px] leading-relaxed max-w-xl">
                Browse high-quality, professionally designed components and templates. Each one crafted with care.
              </p>
            </div>

            {/* Stats — graffiti tag style */}
            <div className="flex gap-3 shrink-0">
              {[
                { val: themes.length.toString(), label: 'Templates', color: C.pink },
                { val: categories.length.toString(), label: 'Categories', color: C.blue },
              ].map((s, i) => (
                <div key={i} className="px-5 py-3 rounded-xl border backdrop-blur-sm relative overflow-hidden" style={{
                  borderColor: s.color + '25', background: s.color + '08',
                }}>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full" style={{ backgroundColor: s.color, opacity: 0.08 }} />
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color, boxShadow: `0 0 6px ${s.color}` }} />
                    <span className="text-xl font-black text-white">{s.val}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ SEARCH BAR ═══════ */}
      <div
        className="relative mb-6 z-20"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(15px)',
          transition: 'all 0.6s ease-out 0.1s',
        }}
      >
        <div className={`flex flex-col sm:flex-row gap-3 p-1.5 rounded-2xl border transition-all duration-300 ${
          searchFocused
            ? 'bg-zinc-900/60 border-blue-500/30 shadow-lg shadow-blue-500/5'
            : 'bg-zinc-900/30 border-zinc-800/50'
        }`}>
          <div className="relative flex-1">
            <svg className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${searchFocused ? 'text-blue-400' : 'text-zinc-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search templates, components, styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-transparent text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 pl-4 pr-3 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/40 text-sm text-zinc-400 hover:border-zinc-600 hover:text-zinc-300 transition-all cursor-pointer min-w-[130px]"
              >
                <span className="flex-1 text-left">{sortBy}</span>
                <svg className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {sortOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-full min-w-[140px] rounded-xl bg-zinc-900 border border-zinc-700/60 shadow-2xl shadow-black/40 py-1 z-50 overflow-hidden">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setSortOpen(false) }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
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
            <button
              onClick={onGoUpload}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold hover:from-blue-400 hover:to-cyan-400 active:scale-[0.97] transition-all cursor-pointer shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Upload Design</span>
            </button>
          </div>
        </div>
      </div>

      {/* ═══════ CATEGORY FILTER ═══════ */}
      {categories.length > 0 && (
        <div
          className="mb-8 relative group/filter"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(15px)',
            transition: 'all 0.6s ease-out 0.2s',
          }}
        >
          <button
            onClick={() => { if (filterRef.current) filterRef.current.scrollBy({ left: -200, behavior: 'smooth' }) }}
            className="absolute left-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-transparent opacity-0 group-hover/filter:opacity-100 transition-opacity cursor-pointer"
          >
            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>

          <div
            ref={filterRef}
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
          >
            <style>{`div[class*="overflow-x-auto"]::-webkit-scrollbar { display: none; }`}</style>
            {allCats.map((cat, i) => {
              const meta = getCategoryMeta(cat)
              const isActive = activeFilter === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="group relative shrink-0 cursor-pointer transition-all duration-300"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(10px)',
                    transition: `all 0.4s ease-out ${0.03 * i}s`,
                  }}
                >
                  <div className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300
                    ${isActive
                      ? 'bg-gradient-to-r border-transparent text-white shadow-lg ' + meta.gradient
                      : 'bg-zinc-900/40 border-zinc-800/50 text-zinc-500 hover:bg-zinc-800/60 hover:border-zinc-700/60 hover:text-zinc-300'
                    }
                  `}
                    style={isActive ? { boxShadow: '0 4px 20px rgba(0,0,0,0.3)' } : undefined}
                  >
                    <CategoryIcon path={meta.icon} className={isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'} />
                    <span className="text-xs font-medium whitespace-nowrap">{cat}</span>
                    {isActive && (
                      <span className="text-[10px] bg-white/20 rounded-full px-1.5 py-0.5 font-semibold ml-0.5">
                        {cat === 'All' ? themes.length : themes.filter(t => t.tags?.includes(cat)).length}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          <button
            onClick={() => { if (filterRef.current) filterRef.current.scrollBy({ left: 200, behavior: 'smooth' }) }}
            className="absolute right-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-gradient-to-l from-[#09090b] via-[#09090b]/80 to-transparent opacity-0 group-hover/filter:opacity-100 transition-opacity cursor-pointer"
          >
            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      )}

      {/* ═══════ SECTION HEADER ═══════ */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${activeMeta.gradient} flex items-center justify-center shadow-lg`}
            style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
          >
            <CategoryIcon path={activeMeta.icon} className="text-white w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">
              {activeFilter === 'All' ? 'All Themes' : activeFilter}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {filtered.length} theme{filtered.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900/30 border border-zinc-800/40">
            <div className="grid grid-cols-3 gap-0.5">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-sm bg-blue-400/70" />
              ))}
            </div>
            <span className="text-[10px] text-zinc-500 ml-1.5">Grid</span>
          </div>
        </div>
      </div>

      {/* ═══════ THEME GRID ═══════ */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((theme, i) => (
            <div
              key={theme.id}
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease-out ${Math.min(0.05 * i, 0.5)}s`,
              }}
            >
              <ThemeCard theme={theme} onDelete={onDelete} onEdit={onEdit} onView={onViewTheme} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          {themes.length === 0 ? (
            <>
              <div className="w-20 h-20 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-zinc-400 text-sm font-medium mb-1">No designs yet</p>
              <p className="text-zinc-600 text-xs mb-5">Upload your first theme to get started.</p>
              <button onClick={onGoUpload} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium hover:from-blue-400 hover:to-cyan-400 transition-all cursor-pointer">
                + Upload Design
              </button>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-zinc-400 text-sm font-medium mb-1">No themes found</p>
              <p className="text-zinc-600 text-xs mb-4">Try adjusting your search or filter criteria.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveFilter('All') }}
                className="px-4 py-2 rounded-lg text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all cursor-pointer"
              >
                Clear all filters
              </button>
            </>
          )}
        </div>
      )}

      {/* ═══════ FOOTER ═══════ */}
      {themes.length > 0 && (
        <div className="mt-12 pt-6 border-t border-zinc-800/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-zinc-600">
              Showing {filtered.length} of {themes.length} templates
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                {['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-amber-500 to-orange-500'].map((g, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${g}`} style={{ opacity: 0.6 - i * 0.15 }} />
                ))}
              </div>
              <span className="text-[10px] text-zinc-700 tracking-wider uppercase">Components by Design</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
