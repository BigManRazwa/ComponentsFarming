import { useState, useEffect } from 'react'

type Variant = 'cyan' | 'fuchsia' | 'emerald'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#06B6D4': 'cyan',
  '#D946EF': 'fuchsia',
  '#10B981': 'emerald',
}

const THEMES: Record<Variant, Record<string, string>> = {
  cyan: {
    '--accent': '#06B6D4',
    '--accent-hover': '#0891B2',
    '--accent-light': 'rgba(6, 182, 212, 0.16)',
    '--bg-primary': '#030712',
    '--bg-secondary': '#081026',
    '--bg-card': '#0E1B3D',
    '--border': '#162E66',
    '--text-primary': '#F0FDFA',
    '--text-secondary': '#6889BA',
  },
  fuchsia: {
    '--accent': '#D946EF',
    '--accent-hover': '#C026D3',
    '--accent-light': 'rgba(217, 70, 239, 0.16)',
    '--bg-primary': '#0A030D',
    '--bg-secondary': '#15071C',
    '--bg-card': '#220D2E',
    '--border': '#3D1652',
    '--text-primary': '#FDF4FF',
    '--text-secondary': '#B87DBF',
  },
  emerald: {
    '--accent': '#10B981',
    '--accent-hover': '#059669',
    '--accent-light': 'rgba(16, 185, 129, 0.16)',
    '--bg-primary': '#020B07',
    '--bg-secondary': '#06170F',
    '--bg-card': '#0B2418',
    '--border': '#133D28',
    '--text-primary': '#F0FDF4',
    '--text-secondary': '#619678',
  },
}

interface PetMode {
  id: string
  name: string
  desc: string
  icon: string
}

const MODES: PetMode[] = [
  { id: 'companion', name: 'Companion Mode', desc: 'Follows owner, tail-wag servo active', icon: '🐕' },
  { id: 'sentry', name: 'Sentry Guard', desc: '360° LIDAR perimeter tripwire patrol', icon: '🛡️' },
  { id: 'recon', name: 'Search & Recon', desc: 'Thermal scent tracking and bio-sonar', icon: '🔍' },
  { id: 'fetch', name: 'Play Fetch AI', desc: 'Calculates ball trajectory ballistics', icon: '🎾' },
]

export function MobileCyberPet({ variant = 'cyan' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [activeMode, setActiveMode] = useState('companion')
  const [battery, setBattery] = useState(88)
  const [affinity, setAffinity] = useState(96)
  const [moodText, setMoodText] = useState('Happy & Vigilant ⚡')
  const [activeTab, setActiveTab] = useState<'modes' | 'cyberware' | 'vitals'>('modes')

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

  const petCompanion = () => {
    setAffinity((a) => Math.min(100, a + 1))
    setMoodText('Purring Haptically! Tail Wag +100 RPM')
    setTimeout(() => setMoodText('Happy & Vigilant ⚡'), 2000)
  }

  const feedPellet = () => {
    setBattery((b) => Math.min(100, b + 5))
  }

  const theme = THEMES[currentTheme]
  const cssVars = Object.entries(theme).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Record<string, string>)

  return (
    <>
      <style>{`
        .pet-wrapper { font-family: ${customFont || "'JetBrains Mono', 'Fira Code', monospace"}; }
        .pet-wrapper * { box-sizing: border-box; }
        .pet-wrapper ::-webkit-scrollbar { display: none; }
        .neon-scan {
          background-image: linear-gradient(to right, rgba(6, 182, 212, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(6, 182, 212, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
      <div
        className="pet-wrapper max-w-[390px] mx-auto min-h-screen relative flex flex-col pb-24 select-none"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Header */}
        <header className="px-5 pt-6 pb-3 border-b flex items-center justify-between sticky top-0 z-30 backdrop-blur-md" style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-white" style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}>
              🤖
            </div>
            <div>
              <span className="font-black text-xs tracking-wider block uppercase">A.E.G.I.S. COMPANION</span>
              <span className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>
                BOLT // CYBER-HOUND A-7
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold" style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)', color: 'var(--accent)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>BOND {affinity}%</span>
          </div>
        </header>

        {/* Hero Cyber-Pet Status Card */}
        <div className="p-4">
          <div className="p-4 rounded-3xl border relative overflow-hidden shadow-xl neon-scan" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl opacity-15 pointer-events-none" style={{ background: 'var(--accent)' }}></div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                NEURAL MOOD
              </span>
              <span className="text-[10px] font-mono text-cyan-400 font-bold">{battery}% POWER</span>
            </div>

            <div className="flex items-center gap-3 my-2">
              <div className="w-14 h-14 rounded-2xl border flex items-center justify-center text-3xl shadow-lg" style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)' }}>
                🐕‍🦺
              </div>
              <div>
                <h2 className="text-lg font-black text-white leading-tight">
                  {moodText}
                </h2>
                <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                  Synthetic Bio-Canine · Nanotech Plating
                </p>
              </div>
            </div>

            {/* Battery & Health Bars */}
            <div className="mt-4 pt-3 border-t space-y-2 font-mono text-xs" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-zinc-300">Solid-State Battery</span>
                  <span className="font-bold text-cyan-400">{battery}% (14h Patrol)</span>
                </div>
                <div className="w-full h-1.5 rounded bg-black/60 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                  <div className="h-full rounded bg-cyan-400 transition-all duration-300" style={{ width: `${battery}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-zinc-300">Synapse Neural Affinity</span>
                  <span className="font-bold text-fuchsia-400">{affinity}% (Level 8 Bond)</span>
                </div>
                <div className="w-full h-1.5 rounded bg-black/60 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                  <div className="h-full rounded bg-fuchsia-400 transition-all duration-300" style={{ width: `${affinity}%` }}></div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] mt-3 pt-2 border-t font-mono" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              <span>CORE TEMP: 34.2°C</span>
              <span>LIDAR: 360° SWEEP ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Quick Interaction Buttons */}
        <div className="px-4 grid grid-cols-2 gap-2 mb-2">
          <button
            onClick={petCompanion}
            className="p-2.5 rounded-2xl border flex items-center justify-center gap-2 font-mono text-xs font-bold cursor-pointer transition-transform active:scale-95"
            style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)', color: 'var(--accent)' }}
          >
            <span>🖐️</span>
            <span>PET & SCRATCH</span>
          </button>

          <button
            onClick={feedPellet}
            className="p-2.5 rounded-2xl border flex items-center justify-center gap-2 font-mono text-xs font-bold cursor-pointer transition-transform active:scale-95"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-card)', color: '#FFF' }}
          >
            <span>⚡</span>
            <span>FEED ENERGY (+5%)</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-4 pb-2 pt-2 flex gap-1.5 text-xs font-bold font-mono">
          {[
            { id: 'modes', label: 'Behaviors' },
            { id: 'cyberware', label: 'Cyberware' },
            { id: 'vitals', label: 'Bio-Vitals' },
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

        {/* Tab 1: Behavior Modes */}
        {activeTab === 'modes' && (
          <div className="px-4 space-y-2.5 font-mono text-xs">
            {MODES.map((m) => {
              const isSelected = activeMode === m.id
              return (
                <div
                  key={m.id}
                  onClick={() => setActiveMode(m.id)}
                  className="p-3 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all"
                  style={{
                    borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                    background: isSelected ? 'var(--accent-light)' : 'var(--bg-card)',
                    boxShadow: isSelected ? '0 0 10px var(--accent-light)' : 'none',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{m.icon}</span>
                    <div>
                      <span className="font-bold text-white block text-[11px]">{m.name}</span>
                      <span className="text-[9px] block text-zinc-400">{m.desc}</span>
                    </div>
                  </div>

                  <span className="text-[8px] font-black" style={{ color: isSelected ? 'var(--accent)' : 'var(--text-secondary)' }}>
                    {isSelected ? 'ENGAGED' : 'SET'}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {/* Tab 2: Cyberware Hardware Modules */}
        {activeTab === 'cyberware' && (
          <div className="px-4 space-y-2.5 font-mono text-xs">
            {[
              { name: 'Infrared Thermal Vision', level: 'Level 3 NIR', desc: '60 FPS nocturnal body heat detection', installed: true },
              { name: 'Acoustic Ultrasonic Bark', level: '18 kHz Driver', desc: 'Disorienting sub-sonic canine pulse', installed: true },
              { name: 'Pneumatic Jump Thrusters', level: '2.4m Leap', desc: 'High-vault urban obstacle clearance', installed: true },
            ].map((c) => (
              <div key={c.name} className="p-3 rounded-2xl border space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-white text-[11px]">{c.name}</span>
                  <span className="text-emerald-400 font-bold">{c.level}</span>
                </div>
                <p className="text-[9px] text-zinc-400">{c.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Bio-Vitals */}
        {activeTab === 'vitals' && (
          <div className="px-4 space-y-2.5 font-mono text-xs">
            <div className="p-3.5 rounded-2xl border space-y-2" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                CHASSIS INTEGRITY
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>ALLOY ARMOR: <strong className="text-emerald-400">100%</strong></div>
                <div>PAW TRACTION: <strong className="text-white">99% GRIP</strong></div>
                <div>SERVO HEALTH: <strong className="text-white">NOMINAL</strong></div>
                <div>AI LATENCY: <strong className="text-cyan-400">1.2ms</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* Fixed Bottom Action Bar */}
        <div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] border-t px-5 py-3 z-40 backdrop-blur-md flex items-center justify-between"
          style={{ borderColor: 'var(--border)', background: 'rgba(3, 7, 18, 0.95)' }}
        >
          <button
            onClick={() => alert('Sentry Alert Siren Broadcasted! Cyber-Hound in defensive attack posture.')}
            className="px-4 py-2.5 rounded-xl border text-xs font-mono font-bold cursor-pointer transition-colors text-red-400 border-red-500/30 hover:bg-red-500/10"
          >
            🚨 SENTRY ALARM
          </button>

          <button
            onClick={() => alert('Whistle signal transmitted. Bolt is running back to your GPS coordinates!')}
            className="flex-1 ml-3 py-2.5 rounded-xl font-mono font-bold text-xs text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-transform active:scale-95"
            style={{ background: 'var(--accent)' }}
          >
            <span>🔊 CALL COMPANION</span>
          </button>
        </div>
      </div>
    </>
  )
}
