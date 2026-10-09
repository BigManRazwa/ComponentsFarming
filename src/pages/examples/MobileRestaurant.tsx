import { useState, useEffect } from 'react'

type Variant = 'emerald' | 'orange' | 'violet'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#10B981': 'emerald',
  '#F97316': 'orange',
  '#8B5CF6': 'violet',
}

const THEMES: Record<Variant, Record<string, string>> = {
  emerald: {
    '--accent': '#10B981', '--accent-hover': '#059669', '--accent-light': 'rgba(16,185,129,0.08)',
    '--bg-primary': '#FFFFFF', '--bg-secondary': '#F0FFF8', '--bg-card': '#FFFFFF',
    '--border': '#D1FAE5', '--text-primary': '#1A1A1A', '--text-secondary': '#6B7280',
  },
  orange: {
    '--accent': '#F97316', '--accent-hover': '#EA580C', '--accent-light': 'rgba(249,115,22,0.08)',
    '--bg-primary': '#FFFFFF', '--bg-secondary': '#FFF8F3', '--bg-card': '#FFFFFF',
    '--border': '#FED7AA', '--text-primary': '#1A1A1A', '--text-secondary': '#78716C',
  },
  violet: {
    '--accent': '#8B5CF6', '--accent-hover': '#7C3AED', '--accent-light': 'rgba(139,92,246,0.08)',
    '--bg-primary': '#FFFFFF', '--bg-secondary': '#FAF8FF', '--bg-card': '#FFFFFF',
    '--border': '#E8E0F0', '--text-primary': '#1A1A2E', '--text-secondary': '#7A6AAA',
  },
}

const restaurants = [
  { name: 'The Green Kitchen', cuisine: 'Healthy', rating: '4.8', time: '20-30', delivery: 'Free', featured: true },
  { name: 'Burger Republic', cuisine: 'American', rating: '4.6', time: '15-25', delivery: '$2.99', featured: true },
]

const popularItems = [
  { name: 'Grilled Salmon Bowl', restaurant: 'The Green Kitchen', price: '$14.99', rating: '4.9', calories: '520 cal' },
  { name: 'Classic Smash Burger', restaurant: 'Burger Republic', price: '$11.99', rating: '4.7', calories: '680 cal' },
  { name: 'Margherita Pizza', restaurant: 'Pizza Artisan', price: '$12.99', rating: '4.8', calories: '450 cal' },
]

const categories = ['All', 'Pizza', 'Burgers', 'Sushi', 'Salads', 'Desserts', 'Drinks']

const bottomTabs = [
  { name: 'Home', path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Search', path: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { name: 'Orders', path: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { name: 'Profile', path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
]

export function MobileRestaurant({ variant = 'emerald' }: { variant?: Variant }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeTab, setActiveTab] = useState('Home')
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
        .restaurant-wrapper { font-family: ${customFont || "'Inter', sans-serif"}; }
        .restaurant-wrapper * { box-sizing: border-box; }
        .restaurant-wrapper ::-webkit-scrollbar { display: none; }
      `}</style>
      <div className="restaurant-wrapper max-w-[390px] mx-auto min-h-screen relative" style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }} data-theme={currentTheme}>
        {/* Header */}
        <div className="px-5 pt-5">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span className="font-semibold">Deliver to</span>
              </div>
              <div className="font-bold text-base mt-0.5">123 Main Street</div>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center border cursor-pointer relative" style={{ borderColor: 'var(--border)' }}>
              <svg className="w-5 h-5" fill="none" stroke="var(--text-secondary)" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs font-bold flex items-center justify-center" style={{ background: 'var(--accent)', fontSize: 9 }}>3</div>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4 flex items-center gap-2 px-3 py-2.5 rounded-xl border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
            <svg className="w-4 h-4" fill="none" stroke="var(--text-secondary)" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Search restaurants or dishes...</span>
          </div>
        </div>

        {/* Promo Banner */}
        <div className="mx-5 mt-4 rounded-2xl p-4 relative overflow-hidden" style={{ background: `linear-gradient(135deg, var(--accent), ${theme['--accent-hover']})` }}>
          <div className="absolute top-0 right-0 w-28 h-28 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', transform: 'translate(30%, -30%)' }} />
          <div className="text-white">
            <div className="text-xs font-semibold opacity-80">Limited Time</div>
            <div className="font-bold text-lg mt-0.5">Free Delivery!</div>
            <div className="text-sm opacity-80 mt-0.5">On your first 3 orders</div>
            <button className="mt-2 px-4 py-1.5 bg-white rounded-full text-xs font-bold cursor-pointer" style={{ color: 'var(--accent)' }}>Order Now</button>
          </div>
        </div>

        {/* Categories */}
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

        {/* Featured Restaurants */}
        <div className="px-5 mt-5">
          <div className="flex justify-between items-center">
            <span className="font-bold text-base">Featured Restaurants</span>
            <span className="text-xs cursor-pointer" style={{ color: 'var(--accent)' }}>See All</span>
          </div>
          <div className="mt-3 space-y-3">
            {restaurants.map(r => (
              <div key={r.name} className="rounded-2xl overflow-hidden border shadow-sm cursor-pointer" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="h-32 relative" style={{ background: `linear-gradient(135deg, ${theme['--accent']}10, var(--bg-secondary))` }}>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: 'var(--accent)' }}>{r.delivery === 'Free' ? 'Free Delivery' : r.delivery}</div>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-sm">{r.name}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{r.cuisine}</div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                      <svg className="w-3 h-3" fill="var(--accent)" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                      {r.rating}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      {r.time} min
                    </span>
                    <span>·</span>
                    <span>{r.delivery}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Items */}
        <div className="px-5 mt-5 pb-24">
          <div className="font-bold text-base mb-3">Popular Near You</div>
          <div className="space-y-2.5">
            {popularItems.map(item => (
              <div key={item.name} className="flex gap-3 rounded-xl border p-3 cursor-pointer" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${theme['--accent']}15, var(--bg-secondary))` }}>
                  <svg className="w-8 h-8 opacity-30" fill="var(--accent)" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm">{item.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{item.restaurant}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="font-bold text-sm" style={{ color: 'var(--accent)' }}>{item.price}</span>
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>· {item.calories}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <svg className="w-3 h-3" fill="#F59E0B" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                    {item.rating}
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
                className="flex flex-col items-center gap-0.5 cursor-pointer"
                style={{ color: activeTab === tab.name ? 'var(--accent)' : 'var(--text-secondary)' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={tab.path}/></svg>
                <span className="text-xs">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
