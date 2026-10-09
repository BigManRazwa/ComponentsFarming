import { useState, useEffect } from 'react'

type Variant = 'orange' | 'cyan' | 'violet'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#F97316': 'orange',
  '#06B6D4': 'cyan',
  '#8B5CF6': 'violet',
}

const THEMES: Record<Variant, Record<string, string>> = {
  orange: {
    '--accent': '#F97316', '--accent-hover': '#EA580C', '--accent-light': 'rgba(249,115,22,0.08)',
    '--bg-primary': '#FFFFFF', '--bg-secondary': '#FFF8F3', '--bg-card': '#FFFFFF',
    '--border': '#FED7AA', '--text-primary': '#1A1A1A', '--text-secondary': '#78716C',
  },
  cyan: {
    '--accent': '#06B6D4', '--accent-hover': '#0891B2', '--accent-light': 'rgba(6,182,212,0.08)',
    '--bg-primary': '#FFFFFF', '--bg-secondary': '#F0FEFF', '--bg-card': '#FFFFFF',
    '--border': '#CFFAFE', '--text-primary': '#1A1A2E', '--text-secondary': '#64748B',
  },
  violet: {
    '--accent': '#8B5CF6', '--accent-hover': '#7C3AED', '--accent-light': 'rgba(139,92,246,0.08)',
    '--bg-primary': '#FFFFFF', '--bg-secondary': '#FAF8FF', '--bg-card': '#FFFFFF',
    '--border': '#E8E0F0', '--text-primary': '#1A1A2E', '--text-secondary': '#7A6AAA',
  },
}

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const activityData = [65, 80, 45, 90, 72, 55, 85]

const workouts = [
  { name: 'Morning Run', type: 'Cardio', duration: '32 min', calories: '320 kcal', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { name: 'Strength Training', type: 'Weights', duration: '45 min', calories: '280 kcal', icon: 'M4 6h16M4 12h16m-7 6h7' },
  { name: 'Evening Yoga', type: 'Flexibility', duration: '25 min', calories: '120 kcal', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
]

const stats = [
  { label: 'Steps', value: '8,432', target: '10,000', pct: 84, icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { label: 'Calories', value: '1,840', target: '2,200', pct: 84, icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z' },
  { label: 'Water', value: '6', target: '8 cups', pct: 75, icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { label: 'Sleep', value: '7.5h', target: '8h', pct: 94, icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' },
]

const bottomTabs = [
  { name: 'Home', path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Workouts', path: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { name: 'Stats', path: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { name: 'Profile', path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
]

export function MobileFitnessDash({ variant = 'orange' }: { variant?: Variant }) {
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
        .fitness-wrapper { font-family: ${customFont || "'Inter', sans-serif"}; }
        .fitness-wrapper * { box-sizing: border-box; }
        .fitness-wrapper ::-webkit-scrollbar { display: none; }
      `}</style>
      <div className="fitness-wrapper max-w-[390px] mx-auto min-h-screen relative" style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }} data-theme={currentTheme}>
        {/* Header */}
        <div className="px-5 pt-5 flex justify-between items-center">
          <div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Good Morning 👋</div>
            <div className="font-bold text-lg mt-0.5">Alex Johnson</div>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white cursor-pointer" style={{ background: 'var(--accent)' }}>AJ</div>
        </div>

        {/* Daily Goal Ring */}
        <div className="mx-5 mt-5 rounded-2xl p-5 relative overflow-hidden" style={{ background: `linear-gradient(135deg, var(--accent), ${theme['--accent-hover']})` }}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', transform: 'translate(30%, -30%)' }} />
          <div className="flex items-center gap-5">
            {/* Ring */}
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
                <circle cx="40" cy="40" r="34" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34 * 0.72} ${2 * Math.PI * 34}`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">72%</div>
            </div>
            <div className="text-white">
              <div className="font-bold text-base">Daily Goal</div>
              <div className="text-sm opacity-80 mt-0.5">720 / 1,000 cal burned</div>
              <div className="text-xs opacity-60 mt-1">Keep it up! 280 cal to go</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-5 mt-5 grid grid-cols-2 gap-3">
          {stats.map(s => (
            <div key={s.label} className="rounded-xl p-3 border cursor-pointer" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-light)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="var(--accent)" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={s.icon}/></svg>
                </div>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
              </div>
              <div className="font-bold text-lg">{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>of {s.target}</div>
              <div className="mt-2 h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
                <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: 'var(--accent)' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Activity Chart */}
        <div className="mx-5 mt-5 rounded-xl p-4 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-sm">Weekly Activity</span>
            <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>This Week</span>
          </div>
          <div className="flex items-end gap-2 h-28">
            {weekDays.map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md" style={{
                  height: `${activityData[i]}%`,
                  background: i === 3 ? 'var(--accent)' : 'var(--accent-light)',
                  borderRadius: '4px 4px 0 0',
                }} />
                <span className="text-xs" style={{ color: i === 3 ? 'var(--accent)' : 'var(--text-secondary)', fontWeight: i === 3 ? 700 : 400 }}>{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Workouts */}
        <div className="px-5 mt-5 pb-24">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-base">Today's Workouts</span>
            <span className="text-xs cursor-pointer" style={{ color: 'var(--accent)' }}>See All</span>
          </div>
          <div className="space-y-3">
            {workouts.map(w => (
              <div key={w.name} className="rounded-xl p-3.5 border flex items-center gap-3 cursor-pointer" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-light)' }}>
                  <svg className="w-5 h-5" fill="none" stroke="var(--accent)" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={w.icon}/></svg>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm">{w.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{w.type}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{w.duration}</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{w.calories}</div>
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
