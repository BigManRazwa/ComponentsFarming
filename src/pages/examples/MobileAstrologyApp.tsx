import { useState, useEffect } from 'react'

type Variant = 'indigo' | 'fuchsia' | 'sky'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#6366F1': 'indigo',
  '#D946EF': 'fuchsia',
  '#0EA5E9': 'sky',
}

const THEMES: Record<Variant, Record<string, string>> = {
  indigo: {
    '--accent': '#6366F1', '--accent-hover': '#4F46E5', '--accent-light': 'rgba(99, 102, 241, 0.15)',
    '--bg-primary': '#09090B', '--bg-secondary': '#18181B', '--bg-card': '#27272A',
    '--border': '#3F3F46', '--text-primary': '#FAFAFA', '--text-secondary': '#A1A1AA',
  },
  fuchsia: {
    '--accent': '#D946EF', '--accent-hover': '#C026D3', '--accent-light': 'rgba(217, 70, 239, 0.15)',
    '--bg-primary': '#0A0014', '--bg-secondary': '#16002A', '--bg-card': '#230040',
    '--border': '#3A0066', '--text-primary': '#FAFAFA', '--text-secondary': '#D8B4FE',
  },
  sky: {
    '--accent': '#0EA5E9', '--accent-hover': '#0284C7', '--accent-light': 'rgba(14, 165, 233, 0.15)',
    '--bg-primary': '#081426', '--bg-secondary': '#0F294D', '--bg-card': '#163E73',
    '--border': '#205B99', '--text-primary': '#F0F9FF', '--text-secondary': '#BAE6FD',
  },
}

export function MobileAstrologyApp({ variant = 'indigo' }: { variant?: Variant }) {
  const [activeTab, setActiveTab] = useState('Daily')
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
        .astro-wrapper { font-family: ${customFont || "'Inter', sans-serif"}; }
        .astro-wrapper * { box-sizing: border-box; }
        .astro-wrapper ::-webkit-scrollbar { display: none; }
        .stars-bg {
          background-image: 
            radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 50px 160px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 90px 40px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 130px 80px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 160px 120px, #ffffff, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.3;
        }
      `}</style>
      <div className="astro-wrapper max-w-[390px] mx-auto min-h-screen relative overflow-hidden flex flex-col" 
           style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }} 
           data-theme={currentTheme}>
        
        {/* Animated Stars Background */}
        <div className="absolute inset-0 stars-bg pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-96 opacity-40 pointer-events-none"
             style={{ background: 'radial-gradient(circle at 50% -20%, var(--accent) 0%, transparent 70%)' }}></div>

        {/* Header */}
        <div className="px-5 pt-8 pb-4 flex justify-between items-center relative z-10">
          <div>
            <div className="text-sm font-medium tracking-widest uppercase opacity-70">Scorpio</div>
            <div className="text-2xl font-black mt-1">Oct 24 - Nov 21</div>
          </div>
          <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center backdrop-blur-md"
               style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)' }}>
            <svg className="w-6 h-6" fill="none" stroke="var(--accent)" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.485-7.071l-1.414 1.414M6.343 17.657l-1.414 1.414m12.728 0l-1.414-1.414M6.343 6.343l-1.414-1.414"/></svg>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="px-5 mb-6 relative z-10">
          <div className="flex p-1 rounded-2xl backdrop-blur-md border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
            {['Yesterday', 'Today', 'Tomorrow'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                      className="flex-1 py-2 text-sm font-semibold rounded-xl transition-all"
                      style={{ 
                        background: activeTab === tab ? 'var(--accent)' : 'transparent',
                        color: activeTab === tab ? '#FFF' : 'var(--text-secondary)'
                      }}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Scroll */}
        <div className="flex-1 overflow-y-auto px-5 pb-24 relative z-10">
          {/* Main Horoscope Card */}
          <div className="rounded-3xl p-6 border relative overflow-hidden backdrop-blur-sm" 
               style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'var(--border)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)' }}>
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20" style={{ background: 'var(--accent)' }}></div>
            
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
              Daily Insight
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              The moon aligns with your ruling planet Pluto today, bringing hidden truths to the surface. Trust your intuition when dealing with colleagues. A sudden shift in perspective will help you solve a problem that's been bothering you all week.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="rounded-3xl p-5 border flex flex-col items-center justify-center text-center" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--accent)' }}>85%</div>
              <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--text-secondary)' }}>Love</div>
            </div>
            <div className="rounded-3xl p-5 border flex flex-col items-center justify-center text-center" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--accent)' }}>92%</div>
              <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--text-secondary)' }}>Career</div>
            </div>
          </div>

          {/* Matches & Colors */}
          <div className="mt-4 rounded-3xl p-6 border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Cosmic Alignments</h3>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Compatible with</span>
              <span className="font-semibold flex items-center gap-2">
                Pisces
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Lucky Color</span>
              <span className="font-semibold flex items-center gap-2">
                Crimson
                <span className="w-4 h-4 rounded-full" style={{ background: '#DC143C' }}></span>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Lucky Number</span>
              <span className="font-bold text-lg" style={{ color: 'var(--accent)' }}>7</span>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 w-full h-20 flex justify-around items-center px-6 border-t backdrop-blur-xl z-20" 
             style={{ background: 'rgba(9,9,11,0.8)', borderColor: 'var(--border)' }}>
          {[
            { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', active: true },
            { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', active: false },
            { icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', active: false }
          ].map((item, i) => (
            <button key={i} className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                    style={{ 
                      color: item.active ? 'var(--accent)' : 'var(--text-secondary)',
                      background: item.active ? 'var(--accent-light)' : 'transparent'
                    }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon}/></svg>
            </button>
          ))}
        </div>

      </div>
    </>
  )
}
