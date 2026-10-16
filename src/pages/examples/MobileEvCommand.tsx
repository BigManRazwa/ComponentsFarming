import { useState, useEffect } from 'react'

type Variant = 'cyan' | 'red' | 'amber'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#06B6D4': 'cyan',
  '#EF4444': 'red',
  '#F59E0B': 'amber',
}

const THEMES: Record<Variant, Record<string, string>> = {
  cyan: {
    '--accent': '#06B6D4',
    '--accent-hover': '#0891B2',
    '--accent-light': 'rgba(6, 182, 212, 0.16)',
    '--bg-primary': '#04090E',
    '--bg-secondary': '#08131C',
    '--bg-card': '#0E1F2E',
    '--border': '#16334D',
    '--text-primary': '#F0FDFA',
    '--text-secondary': '#6E9BBF',
  },
  red: {
    '--accent': '#EF4444',
    '--accent-hover': '#DC2626',
    '--accent-light': 'rgba(239, 68, 68, 0.16)',
    '--bg-primary': '#0A0506',
    '--bg-secondary': '#14090C',
    '--bg-card': '#200E13',
    '--border': '#361720',
    '--text-primary': '#FFF1F2',
    '--text-secondary': '#B87D8D',
  },
  amber: {
    '--accent': '#F59E0B',
    '--accent-hover': '#D97706',
    '--accent-light': 'rgba(245, 158, 11, 0.16)',
    '--bg-primary': '#0A0804',
    '--bg-secondary': '#141009',
    '--bg-card': '#201A0E',
    '--border': '#362B18',
    '--text-primary': '#FFFBEB',
    '--text-secondary': '#9B855D',
  },
}

export function MobileEvCommand({ variant = 'cyan' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [isLocked, setIsLocked] = useState(true)
  const [frunkOpen, setFrunkOpen] = useState(false)
  const [trunkOpen, setTrunkOpen] = useState(false)
  const [cabinTemp, setCabinTemp] = useState(68)
  const [driveMode, setDriveMode] = useState<'Sport' | 'Plaid' | 'Track'>('Plaid')
  const [rideHeight, setRideHeight] = useState<'Low' | 'Standard' | 'High'>('Low')
  const [sentryActive, setSentryActive] = useState(true)
  const [activeTab, setActiveTab] = useState<'car' | 'climate' | 'charge' | 'security'>('car')

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'SET_THEME_VARIATION') {
        const accent = e.data.variation?.accent
        if (accent) {
          const v = ACCENT_TO_THEME[accent.toUpperCase()] || ACCENT_TO_THEME[accent]
          if (v) setCurrentTheme(v)
        }
        if (e.data.variation?.font) setCustomFont(e.data.variation.font)
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
        .ev-wrapper { font-family: ${customFont || "'JetBrains Mono', 'Fira Code', monospace"}; }
        .ev-wrapper * { box-sizing: border-box; }
        .ev-wrapper ::-webkit-scrollbar { display: none; }
      `}</style>
      <div
        className="ev-wrapper max-w-[390px] mx-auto min-h-screen relative flex flex-col pb-24 select-none"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Vehicle Status Header */}
        <header className="px-5 pt-6 pb-3 border-b flex items-center justify-between sticky top-0 z-30 backdrop-blur-md" style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-white" style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}>
              ⚡
            </div>
            <div>
              <span className="font-black text-xs tracking-wider block">APEX GT-R PLAID</span>
              <span className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>
                TRI-MOTOR AWD · 1,020 HP
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-white text-[11px]">PARKED</span>
          </div>
        </header>

        {/* Hero Battery Charge & Range Card */}
        <div className="p-4">
          <div className="p-4 rounded-3xl border relative overflow-hidden shadow-xl" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl opacity-15 pointer-events-none" style={{ background: 'var(--accent)' }}></div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                100 kWh STRUCTURAL PACK
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">SUPERCHARGING</span>
            </div>

            <div className="flex items-end justify-between my-2">
              <div>
                <div className="text-4xl font-black font-mono tracking-tight text-white">418 <span className="text-sm font-normal text-zinc-400">mi</span></div>
                <div className="text-[11px] font-bold" style={{ color: 'var(--text-secondary)' }}>
                  ESTIMATED RANGE AT 91%
                </div>
              </div>

              <div className="text-right font-mono text-xs">
                <span className="text-xl font-black" style={{ color: 'var(--accent)' }}>91%</span>
                <span className="text-[10px] block text-zinc-400">+240 mi/hr</span>
              </div>
            </div>

            {/* Battery Level Progress Bar */}
            <div className="w-full bg-black/60 h-2.5 rounded-full overflow-hidden p-0.5 border mt-2" style={{ borderColor: 'var(--border)' }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: '91%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}></div>
            </div>

            <div className="flex justify-between items-center text-[10px] mt-3 pt-2 border-t" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              <span>250 kW V4 DC FAST CHARGER</span>
              <span>12 MINS TO 100%</span>
            </div>
          </div>
        </div>

        {/* Quick Remote Vehicle Actions Grid */}
        <div className="px-4 grid grid-cols-4 gap-2 mb-4">
          {[
            { id: 'lock', label: isLocked ? 'Locked' : 'Unlocked', icon: isLocked ? '🔒' : '🔓', active: isLocked, action: () => setIsLocked(!isLocked) },
            { id: 'frunk', label: frunkOpen ? 'Frunk Open' : 'Frunk', icon: '🚙', active: frunkOpen, action: () => setFrunkOpen(!frunkOpen) },
            { id: 'trunk', label: trunkOpen ? 'Trunk Open' : 'Trunk', icon: '📦', active: trunkOpen, action: () => setTrunkOpen(!trunkOpen) },
            { id: 'flash', label: 'Flash Light', icon: '💡', active: false, action: () => alert('Headlights Flashed!') },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={btn.action}
              className="p-2.5 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer active:scale-95"
              style={{
                borderColor: btn.active ? 'var(--accent)' : 'var(--border)',
                background: btn.active ? 'var(--accent-light)' : 'var(--bg-card)',
              }}
            >
              <span className="text-lg">{btn.icon}</span>
              <span className="text-[9px] font-bold truncate max-w-full" style={{ color: btn.active ? 'var(--accent)' : 'var(--text-secondary)' }}>
                {btn.label}
              </span>
            </button>
          ))}
        </div>

        {/* Vehicle Performance Dynamics & Height */}
        <div className="px-4 space-y-3 mb-4">
          <div className="p-3.5 rounded-2xl border space-y-2.5" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[10px] uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                POWERTRAIN DYNAMICS
              </span>
              <span className="text-[10px] font-mono text-zinc-400">LAUNCH CONTROL ARMED</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-xs font-mono font-bold">
              {(['Sport', 'Plaid', 'Track'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setDriveMode(mode)}
                  className="py-1.5 rounded-xl border text-center transition-all cursor-pointer"
                  style={{
                    background: driveMode === mode ? 'var(--accent)' : 'transparent',
                    borderColor: driveMode === mode ? 'transparent' : 'var(--border)',
                    color: driveMode === mode ? '#FFF' : 'var(--text-secondary)',
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2 border-t text-[11px] font-mono" style={{ borderColor: 'var(--border)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>AIR SUSPENSION HEIGHT:</span>
              <div className="flex gap-1.5">
                {(['Low', 'Standard', 'High'] as const).map((h) => (
                  <button
                    key={h}
                    onClick={() => setRideHeight(h)}
                    className="px-2 py-0.5 rounded text-[10px] font-bold border cursor-pointer"
                    style={{
                      background: rideHeight === h ? 'var(--accent-light)' : 'transparent',
                      borderColor: rideHeight === h ? 'var(--accent)' : 'var(--border)',
                      color: rideHeight === h ? 'var(--accent)' : 'var(--text-secondary)',
                    }}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cabin Climate & Preconditioning */}
        <div className="px-4 space-y-3 mb-4">
          <div className="p-3.5 rounded-2xl border flex items-center justify-between" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Cabin Climate</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-emerald-500/20 text-emerald-400">
                  ON
                </span>
              </div>
              <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                HEPA Bioweapon Defense Active
              </p>
            </div>

            {/* Temp Dial */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCabinTemp((t) => Math.max(60, t - 1))}
                className="w-7 h-7 rounded-lg border font-bold text-xs hover:bg-white/10 cursor-pointer"
                style={{ borderColor: 'var(--border)' }}
              >
                -
              </button>
              <span className="text-base font-black font-mono text-white min-w-[36px] text-center">
                {cabinTemp}°
              </span>
              <button
                onClick={() => setCabinTemp((t) => Math.min(84, t + 1))}
                className="w-7 h-7 rounded-lg border font-bold text-xs hover:bg-white/10 cursor-pointer"
                style={{ borderColor: 'var(--border)' }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Security / Sentry Mode Widget */}
        <div className="px-4">
          <div className="p-3.5 rounded-2xl border flex items-center justify-between" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl border flex items-center justify-center text-sm" style={{ borderColor: 'var(--border)' }}>
                👁️
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Sentry Security AI</span>
                <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                  360° Cam Monitoring · 0 Events
                </span>
              </div>
            </div>

            <button
              onClick={() => setSentryActive(!sentryActive)}
              className="px-3 py-1 rounded-full text-xs font-mono font-bold cursor-pointer transition-colors"
              style={{
                background: sentryActive ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)',
                color: sentryActive ? '#EF4444' : 'var(--text-secondary)',
                border: `1px solid ${sentryActive ? '#EF4444' : 'var(--border)'}`,
              }}
            >
              {sentryActive ? 'ARMED' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Fixed Bottom Navigation */}
        <nav
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] border-t px-6 py-3 z-40 backdrop-blur-md flex items-center justify-between"
          style={{ borderColor: 'var(--border)', background: 'rgba(4, 9, 14, 0.95)' }}
        >
          {[
            { id: 'car', label: 'Vehicle', icon: '⚡' },
            { id: 'climate', label: 'Climate', icon: '❄️' },
            { id: 'charge', label: 'Charging', icon: '🔋' },
            { id: 'security', label: 'Sentry', icon: '🛡️' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className="flex flex-col items-center gap-1 cursor-pointer transition-colors"
              style={{ color: activeTab === item.id ? 'var(--accent)' : 'var(--text-secondary)' }}
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}
