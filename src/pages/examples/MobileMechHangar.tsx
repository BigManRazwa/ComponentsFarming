import { useState, useEffect } from 'react'

type Variant = 'amber' | 'crimson' | 'emerald'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#F59E0B': 'amber',
  '#F43F5E': 'crimson',
  '#10B981': 'emerald',
}

const THEMES: Record<Variant, Record<string, string>> = {
  amber: {
    '--accent': '#F59E0B',
    '--accent-hover': '#D97706',
    '--accent-light': 'rgba(245, 158, 11, 0.16)',
    '--bg-primary': '#0D0904',
    '--bg-secondary': '#171008',
    '--bg-card': '#241A0E',
    '--border': '#3D2B18',
    '--text-primary': '#FFFBEB',
    '--text-secondary': '#C4AD85',
  },
  crimson: {
    '--accent': '#F43F5E',
    '--accent-hover': '#E11D48',
    '--accent-light': 'rgba(244, 63, 94, 0.16)',
    '--bg-primary': '#0A0507',
    '--bg-secondary': '#14090E',
    '--bg-card': '#200E16',
    '--border': '#381726',
    '--text-primary': '#FFF1F2',
    '--text-secondary': '#B87A93',
  },
  emerald: {
    '--accent': '#10B981',
    '--accent-hover': '#059669',
    '--accent-light': 'rgba(16, 185, 129, 0.16)',
    '--bg-primary': '#040B07',
    '--bg-secondary': '#09160F',
    '--bg-card': '#102418',
    '--border': '#193D28',
    '--text-primary': '#F0FDF4',
    '--text-secondary': '#68A684',
  },
}

export function MobileMechHangar({ variant = 'amber' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [primaryWeapon, setPrimaryWeapon] = useState<'railgun' | 'plasma'>('railgun')
  const [shoulderWeapon, setShoulderWeapon] = useState<'missiles' | 'emp'>('missiles')
  const [isShieldOvercharged, setIsShieldOvercharged] = useState(false)
  const [activeTab, setActiveTab] = useState<'weapons' | 'avionics' | 'armor'>('weapons')

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
        .mech-wrapper { font-family: ${customFont || "'JetBrains Mono', 'Fira Code', monospace"}; }
        .mech-wrapper * { box-sizing: border-box; }
        .mech-wrapper ::-webkit-scrollbar { display: none; }
        .hazard-stripes {
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0.4) 10px,
            rgba(245, 158, 11, 0.08) 10px,
            rgba(245, 158, 11, 0.08) 20px
          );
        }
      `}</style>
      <div
        className="mech-wrapper max-w-[390px] mx-auto min-h-screen relative flex flex-col pb-24 select-none"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Hangar Bay Header */}
        <header className="px-5 pt-6 pb-3 border-b flex items-center justify-between sticky top-0 z-30 backdrop-blur-md" style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-white" style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}>
              🤖
            </div>
            <div>
              <span className="font-black text-xs tracking-wider block uppercase">TITAN HANGAR // BAY-07</span>
              <span className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>
                VANGUARD CLASS 75-TON
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold" style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)', color: 'var(--accent)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>ARMED & READY</span>
          </div>
        </header>

        {/* Hero Mech Status Card */}
        <div className="p-4">
          <div className="p-4 rounded-3xl border relative overflow-hidden shadow-xl hazard-stripes" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl opacity-15 pointer-events-none" style={{ background: 'var(--accent)' }}></div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                FRAME: TITAN STRIKER MK-VII
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">100% ONLINE</span>
            </div>

            <h2 className="text-xl font-black leading-tight text-white mt-1">
              Heavy Bipedal Assault Frame
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              Dual Fusion Micro-Core · Neural Synapse Sync
            </p>

            {/* Hull & Shield Bar Gauges */}
            <div className="mt-4 pt-3 border-t space-y-2 font-mono text-xs" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-zinc-300">Composite Chobham Armor</span>
                  <span className="font-bold text-emerald-400">98% (4,800 HP)</span>
                </div>
                <div className="w-full h-2 rounded bg-black/60 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                  <div className="h-full rounded bg-emerald-400" style={{ width: '98%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-zinc-300">Kinetic Shield Deflector</span>
                  <span className="font-bold text-cyan-400">{isShieldOvercharged ? '125% OVERCHARGE' : '100% (2,400 MJ)'}</span>
                </div>
                <div className="w-full h-2 rounded bg-black/60 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                  <div className="h-full rounded bg-cyan-400 transition-all duration-300" style={{ width: isShieldOvercharged ? '100%' : '80%' }}></div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] mt-3 pt-2 border-t font-mono" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              <span>TONNAGE: 72.4 / 75.0 T</span>
              <span>CORE HEAT: 42°C (STABLE)</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-4 pb-2 flex gap-1.5 text-xs font-bold font-mono">
          {[
            { id: 'weapons', label: 'Weapons Armory' },
            { id: 'avionics', label: 'Avionics AI' },
            { id: 'armor', label: 'Chassis Tuning' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex-1 py-1.5 rounded-xl border transition-all cursor-pointer text-center"
              style={{
                background: activeTab === tab.id ? 'var(--accent)' : 'var(--bg-card)',
                borderColor: activeTab === tab.id ? 'transparent' : 'var(--border)',
                color: activeTab === tab.id ? '#FFF' : 'var(--text-secondary)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Weapons Armory */}
        {activeTab === 'weapons' && (
          <div className="px-4 space-y-3 font-mono text-xs">
            {/* Primary Arm Mount */}
            <div className="p-3.5 rounded-2xl border space-y-2.5" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--accent)' }}>
                  PRIMARY ARM MOUNT (SLOT 1)
                </span>
                <span className="text-[10px] text-zinc-400 font-bold">18.5 TONS</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPrimaryWeapon('railgun')}
                  className="p-2.5 rounded-xl border text-left transition-all cursor-pointer"
                  style={{
                    borderColor: primaryWeapon === 'railgun' ? 'var(--accent)' : 'var(--border)',
                    background: primaryWeapon === 'railgun' ? 'var(--accent-light)' : 'var(--bg-card)',
                  }}
                >
                  <span className="font-bold text-white text-[11px] block">HV Railgun</span>
                  <span className="text-[9px] text-zinc-400 block mt-0.5">4,200 m/s APFSDS</span>
                  <span className="text-[9px] font-bold text-amber-400 mt-1 block">850 DMG · 3.2s CD</span>
                </button>

                <button
                  onClick={() => setPrimaryWeapon('plasma')}
                  className="p-2.5 rounded-xl border text-left transition-all cursor-pointer"
                  style={{
                    borderColor: primaryWeapon === 'plasma' ? 'var(--accent)' : 'var(--border)',
                    background: primaryWeapon === 'plasma' ? 'var(--accent-light)' : 'var(--bg-card)',
                  }}
                >
                  <span className="font-bold text-white text-[11px] block">Plasma Cannon</span>
                  <span className="text-[9px] text-zinc-400 block mt-0.5">Twin Superheated</span>
                  <span className="text-[9px] font-bold text-cyan-400 mt-1 block">1,200 DPS · Splash</span>
                </button>
              </div>
            </div>

            {/* Shoulder Pod Mount */}
            <div className="p-3.5 rounded-2xl border space-y-2.5" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--accent)' }}>
                  SHOULDER HARDPOINT (SLOT 2)
                </span>
                <span className="text-[10px] text-zinc-400 font-bold">12.0 TONS</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setShoulderWeapon('missiles')}
                  className="p-2.5 rounded-xl border text-left transition-all cursor-pointer"
                  style={{
                    borderColor: shoulderWeapon === 'missiles' ? 'var(--accent)' : 'var(--border)',
                    background: shoulderWeapon === 'missiles' ? 'var(--accent-light)' : 'var(--bg-card)',
                  }}
                >
                  <span className="font-bold text-white text-[11px] block">Swarm Pod x32</span>
                  <span className="text-[9px] text-zinc-400 block mt-0.5">Micro-Missile Lock</span>
                  <span className="text-[9px] font-bold text-emerald-400 mt-1 block">32 Warheads</span>
                </button>

                <button
                  onClick={() => setShoulderWeapon('emp')}
                  className="p-2.5 rounded-xl border text-left transition-all cursor-pointer"
                  style={{
                    borderColor: shoulderWeapon === 'emp' ? 'var(--accent)' : 'var(--border)',
                    background: shoulderWeapon === 'emp' ? 'var(--accent-light)' : 'var(--bg-card)',
                  }}
                >
                  <span className="font-bold text-white text-[11px] block">EMP Javelin</span>
                  <span className="text-[9px] text-zinc-400 block mt-0.5">Anti-Armor EMP</span>
                  <span className="text-[9px] font-bold text-indigo-400 mt-1 block">Shield Breaker</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Avionics AI */}
        {activeTab === 'avionics' && (
          <div className="px-4 space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-2xl border space-y-2" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                NEURAL SYNAPSE CO-PILOT
              </span>
              <div className="flex justify-between items-center text-[11px]">
                <span>TACTICAL AI:</span>
                <span className="font-bold text-white">AURA-7 MIL-SPEC</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span>NEURAL SYNC LATENCY:</span>
                <span className="font-bold text-emerald-400">0.82 ms (DIRECT BRAIN)</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span>BALLISTIC PREDICTION:</span>
                <span className="font-bold text-cyan-400">99.8% HIT PROBABILITY</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border flex items-center justify-between" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
              <div>
                <span className="font-bold text-white text-[11px] block">Shield Overcharge Relay</span>
                <span className="text-[9px]" style={{ color: 'var(--text-secondary)' }}>Boost deflector buffer to 125%</span>
              </div>
              <button
                onClick={() => setIsShieldOvercharged(!isShieldOvercharged)}
                className="px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors"
                style={{
                  background: isShieldOvercharged ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                  color: isShieldOvercharged ? '#FFF' : 'var(--text-secondary)',
                }}
              >
                {isShieldOvercharged ? 'ENGAGED' : 'OFF'}
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Chassis Tuning */}
        {activeTab === 'armor' && (
          <div className="px-4 space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-2xl border space-y-2" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                HYDRAULIC THRUSTERS
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>MAX SPRINT: <strong className="text-white">88 km/h</strong></div>
                <div>JUMP BURN: <strong className="text-white">4.2 Seconds</strong></div>
                <div>DODGE THRUST: <strong className="text-white">14.0 G Vector</strong></div>
                <div>DROP POD COMPAT: <strong className="text-emerald-400">YES</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* Fixed Bottom Action Bar */}
        <div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] border-t px-5 py-3 z-40 backdrop-blur-md flex items-center justify-between"
          style={{ borderColor: 'var(--border)', background: 'rgba(13, 9, 4, 0.95)' }}
        >
          <div className="font-mono text-xs">
            <span className="text-[9px] block uppercase" style={{ color: 'var(--text-secondary)' }}>DEPLOY WEIGHT</span>
            <span className="font-bold text-white">72.4 / 75.0 T</span>
          </div>

          <button
            onClick={() => alert('Titan Mech locked in orbital drop pod. Atmospheric re-entry in 10 seconds!')}
            className="ml-3 px-5 py-2.5 rounded-xl font-mono font-bold text-xs text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-transform active:scale-95"
            style={{ background: 'var(--accent)' }}
          >
            <span>🚀 DEPLOY TO DROP POD</span>
          </button>
        </div>
      </div>
    </>
  )
}
