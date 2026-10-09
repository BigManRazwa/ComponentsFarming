import { useState, useEffect } from 'react'

type Variant = 'red' | 'blue' | 'emerald'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#EF4444': 'red',
  '#3B82F6': 'blue',
  '#10B981': 'emerald',
}

const THEMES: Record<Variant, Record<string, string>> = {
  red: {
    '--accent': '#EF4444', '--accent-hover': '#DC2626', '--accent-light': 'rgba(239,68,68,0.08)',
    '--bg-primary': '#FFFFFF', '--bg-secondary': '#FFF5F5', '--bg-card': '#FFFFFF',
    '--border': '#FEE2E2', '--text-primary': '#1A1A1A', '--text-secondary': '#6B7280',
  },
  blue: {
    '--accent': '#3B82F6', '--accent-hover': '#2563EB', '--accent-light': 'rgba(59,130,246,0.08)',
    '--bg-primary': '#FFFFFF', '--bg-secondary': '#F0F5FF', '--bg-card': '#FFFFFF',
    '--border': '#DBEAFE', '--text-primary': '#1A1A2E', '--text-secondary': '#6B8CAE',
  },
  emerald: {
    '--accent': '#10B981', '--accent-hover': '#059669', '--accent-light': 'rgba(16,185,129,0.08)',
    '--bg-primary': '#FFFFFF', '--bg-secondary': '#F0FFF8', '--bg-card': '#FFFFFF',
    '--border': '#D1FAE5', '--text-primary': '#1A2E1A', '--text-secondary': '#5A8A6A',
  },
}

const categories = ['For You', 'Technology', 'Business', 'Sports', 'Health', 'Science', 'Entertainment']

const trendingArticles = [
  { category: 'Tech', title: 'OpenAI Releases GPT-5 With Advanced Reasoning', time: '1h ago' },
  { category: 'Business', title: 'Stock Markets Hit Record High Globally', time: '3h ago' },
  { category: 'Science', title: 'NASA Discovers New Earth-Like Planet', time: '5h ago' },
]

const latestArticles = [
  { source: 'SportsCentral', time: '4h', title: 'Champions League Quarter-Finals Preview', views: '8.2K' },
  { source: 'HealthLine', time: '6h', title: 'New Study Reveals Benefits of Intermittent Fasting', views: '5.1K' },
  { source: 'GreenTech', time: '8h', title: 'Electric Vehicles Outsell Gas Cars For First Time', views: '11.3K' },
]

const bottomTabs = [
  { name: 'Home', path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Discover', path: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 10a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z' },
  { name: 'Saved', path: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' },
  { name: 'Alerts', path: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
  { name: 'Profile', path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
]

export function MobileNewsFeed({ variant = 'red' }: { variant?: Variant }) {
  const [activeCategory, setActiveCategory] = useState('For You')
  const [activeTab, setActiveTab] = useState('Home')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [customFont, setCustomFont] = useState('')
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'SET_THEME_VARIATION') {
        const accent = e.data.variation?.accent;
        if (accent) {
          const v = ACCENT_TO_THEME[accent.toUpperCase()] || ACCENT_TO_THEME[accent];
          if (v) setCurrentTheme(v);
        }
        if (e.data.variation?.font) setCustomFont(e.data.variation.font);
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  const theme = THEMES[currentTheme]
  const cssVars = Object.entries(theme).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Record<string, string>)

  return (
    <>
      <style>{`
        .news-wrapper { font-family: ${customFont || "'Inter', sans-serif"}; }
        .news-wrapper * { box-sizing: border-box; }
        .news-wrapper ::-webkit-scrollbar { display: none; }
      `}</style>
      <div className="news-wrapper max-w-[390px] mx-auto min-h-screen relative" style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }} data-theme={currentTheme}>
        {/* Header */}
        <div className="px-5 pt-4 flex justify-between items-center">
          <span className="font-bold text-xl" style={{ color: 'var(--accent)' }}>NewsWire</span>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 cursor-pointer" fill="none" stroke="var(--text-secondary)" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <div className="relative cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="var(--text-secondary)" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'var(--accent)', fontSize: 9 }}>5</div>
            </div>
          </div>
        </div>

        {/* Breaking News */}
        <div className="mx-5 mt-3 rounded-xl p-3 flex items-center gap-2" style={{ background: 'var(--accent)' }}>
          <span className="text-xs font-black px-2 py-0.5 rounded flex-shrink-0" style={{ background: 'white', color: 'var(--accent)' }}>BREAKING</span>
          <span className="text-white text-sm font-semibold truncate">Major tech companies announce AI collaboration</span>
        </div>

        {/* Category Tabs */}
        <div className="px-5 mt-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer border transition-colors"
                style={{
                  background: activeCategory === cat ? 'var(--accent)' : 'var(--bg-secondary)',
                  color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                  borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border)',
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        <div className="px-5 mt-4">
          <div className="rounded-2xl overflow-hidden border shadow-sm cursor-pointer" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <div className="h-44 relative" style={{ background: `linear-gradient(135deg, ${theme['--accent']}15, var(--bg-secondary))` }}>
              <span className="absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: 'var(--accent)' }}>Technology</span>
              <button onClick={() => setIsBookmarked(!isBookmarked)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full shadow flex items-center justify-center cursor-pointer" style={{ background: 'rgba(255,255,255,0.9)' }}>
                <svg className="w-4 h-4" fill={isBookmarked ? 'var(--accent)' : 'none'} stroke={isBookmarked ? 'var(--accent)' : 'var(--text-secondary)'} strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-bold" style={{ color: 'var(--accent)' }}>TechDaily</span>
                <span style={{ color: 'var(--text-secondary)' }}>·</span>
                <span style={{ color: 'var(--text-secondary)' }}>2 hours ago</span>
              </div>
              <div className="font-bold text-base mt-1 leading-tight">AI Revolution: How Machine Learning Is Transforming Healthcare in 2024</div>
              <div className="text-sm mt-1 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>New breakthroughs in medical AI are enabling earlier disease detection and personalized treatment plans...</div>
              <div className="mt-3 flex items-center gap-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  12.5K
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                  342
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                  89
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trending */}
        <div className="px-5 mt-5">
          <div className="flex justify-between items-center">
            <div className="font-bold text-base">Trending Now 🔥</div>
            <span className="text-xs cursor-pointer" style={{ color: 'var(--accent)' }}>See All</span>
          </div>
          <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
            {trendingArticles.map(article => (
              <div key={article.title} className="min-w-[200px] rounded-xl overflow-hidden border shadow-sm cursor-pointer flex-shrink-0" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="h-24" style={{ background: `linear-gradient(135deg, ${theme['--accent']}10, var(--bg-secondary))` }} />
                <div className="p-3">
                  <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>{article.category}</span>
                  <div className="font-bold text-sm mt-0.5 line-clamp-2 leading-tight">{article.title}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{article.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest */}
        <div className="px-5 mt-5 pb-24">
          <div className="font-bold text-base">Latest</div>
          <div className="mt-3 space-y-3">
            {latestArticles.map(article => (
              <div key={article.title} className="flex gap-3 cursor-pointer">
                <div className="w-24 h-20 rounded-xl flex-shrink-0" style={{ background: `linear-gradient(135deg, ${theme['--accent']}10, var(--bg-secondary))` }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="font-bold" style={{ color: 'var(--accent)' }}>{article.source}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>·</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{article.time}</span>
                  </div>
                  <div className="font-bold text-sm mt-0.5 line-clamp-2 leading-tight">{article.title}</div>
                  <div className="flex items-center gap-1 mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    {article.views}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] border-t z-50 backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.95)', borderColor: 'var(--border)' }}>
          <div className="flex justify-around py-2">
            {bottomTabs.map(tab => (
              <button key={tab.name} onClick={() => setActiveTab(tab.name)}
                className="flex flex-col items-center gap-0.5 cursor-pointer relative"
                style={{ color: activeTab === tab.name ? 'var(--accent)' : 'var(--text-secondary)' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={tab.path}/></svg>
                <span className="text-xs">{tab.name}</span>
                {tab.name === 'Alerts' && (
                  <div className="absolute -top-0.5 right-0 w-3.5 h-3.5 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'var(--accent)', fontSize: 8 }}>3</div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
