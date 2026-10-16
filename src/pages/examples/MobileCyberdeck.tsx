import { useState, useEffect } from 'react'

type Variant = 'neon' | 'cyan' | 'amber'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#EC4899': 'neon',
  '#06B6D4': 'cyan',
  '#F59E0B': 'amber',
}

const THEMES: Record<Variant, Record<string, string>> = {
  neon: {
    '--accent': '#EC4899',
    '--accent-hover': '#DB2777',
    '--accent-light': 'rgba(236, 72, 153, 0.16)',
    '--bg-primary': '#0A040B',
    '--bg-secondary': '#150817',
    '--bg-card': '#200E23',
    '--border': '#3B1A40',
    '--text-primary': '#FDF2F8',
    '--text-secondary': '#B87B9C',
  },
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
}

interface Daemon {
  id: string
  name: string
  cost: number
  desc: string
  damage: string
  status: 'READY' | 'COOLDOWN'
}

const DAEMONS: Daemon[] = [
  { id: 'short', name: 'Short Circuit', cost: 6, desc: 'EMP discharge overload to target cyberware', damage: '840 EMP DMG', status: 'READY' },
  { id: 'optics', name: 'Reboot Optics', cost: 4, desc: 'Blind turret and ocular cyber-implants', damage: '12s Blind', status: 'READY' },
  { id: 'wipe', name: 'Memory Wipe', cost: 8, desc: 'Force enemy network to dump alert queue', damage: 'Erase Trace', status: 'READY' },
  { id: 'burn', name: 'Synapse Burn', cost: 12, desc: 'Lethal neural feedback surge into subnet', damage: '1,450 Neuro DMG', status: 'READY' },
]

export function MobileCyberdeck({ variant = 'neon' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [usedRam, setUsedRam] = useState(24) // out of 64
  const [traceProgress, setTraceProgress] = useState(74)
  const [bufferSequence, setBufferSequence] = useState<string[]>(['1C', '55'])
  const [activeTab, setActiveTab] = useState<'daemons' | 'matrix' | 'trace'>('daemons')

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

  const addHexToBuffer = (hex: string) => {
    if (bufferSequence.length < 4) {
      setBufferSequence([...bufferSequence, hex])
    }
  }

  const executeDaemon = (cost: number) => {
    if (usedRam + cost <= 64) {
      setUsedRam((r) => r + cost)
      setTraceProgress((t) => Math.min(100, t + 4))
    }
  }

  const theme = THEMES[currentTheme]
  const cssVars = Object.entries(theme).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Record<string, string>)

  return (
    <>
      <style>{`
        .deck-wrapper { font-family: ${customFont || "'JetBrains Mono', 'Fira Code', monospace"}; }
        .deck-wrapper * { box-sizing: border-box; }
        .deck-wrapper ::-webkit-scrollbar { display: none; }
        .cyber-grid {
          background-image: linear-gradient(to right, rgba(236, 72, 153, 0.08) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(236, 72, 153, 0.08) 1px, transparent 1px);
          background-size: 16px 16px;
        }
      `}</style>
      <div
        className="deck-wrapper max-w-[390px] mx-auto min-h-screen relative flex flex-col pb-24 select-none"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Netrunner Cyberdeck Header */}
        <header className="px-5 pt-6 pb-3 border-b flex items-center justify-between sticky top-0 z-30 backdrop-blur-md" style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-white" style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}>
              ⚡
            </div>
            <div>
              <span className="font-black text-xs tracking-wider block uppercase">ONYX DECK // V4.2</span>
              <span className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>
                SUBNET: ARASAKA-ORBITAL-09
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold" style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)', color: 'var(--accent)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></span>
            <span>BLACK ICE ACTIVE</span>
          </div>
        </header>

        {/* Hero Infiltration Target & RAM Card */}
        <div className="p-4">
          <div className="p-4 rounded-3xl border relative overflow-hidden shadow-xl cyber-grid" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl opacity-15 pointer-events-none" style={{ background: 'var(--accent)' }}></div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                BREACH LEVEL: SUB-VAULT 4
              </span>
              <span className="text-[10px] font-mono text-red-400 font-bold">TRACE {traceProgress}%</span>
            </div>

            <h2 className="text-xl font-black leading-tight text-white mt-1">
              Core Net Infiltration Hub
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              Intrusion Countermeasure Electronics: 38% Decrypted
            </p>

            {/* RAM Allocation & Trace Progress Bars */}
            <div className="mt-4 pt-3 border-t space-y-2 font-mono text-xs" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-zinc-300">Cyberdeck Buffer RAM</span>
                  <span className="font-bold text-cyan-400">{64 - usedRam} / 64 RAM UNITS</span>
                </div>
                <div className="w-full h-2 rounded bg-black/60 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                  <div className="h-full rounded bg-cyan-400 transition-all duration-300" style={{ width: `${((64 - usedRam) / 64) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-zinc-300">Netrunner Signal Trace</span>
                  <span className="font-bold text-red-400">{traceProgress}% (38s REMAINING)</span>
                </div>
                <div className="w-full h-2 rounded bg-black/60 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                  <div className="h-full rounded bg-red-500 transition-all duration-300" style={{ width: `${traceProgress}%` }}></div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] mt-3 pt-2 border-t font-mono" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              <span>NEURAL SYNC: 99.8%</span>
              <span>FIREWALL: BLOWFISH-1024</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-4 pb-2 flex gap-1.5 text-xs font-bold font-mono">
          {[
            { id: 'daemons', label: 'Quick Daemons' },
            { id: 'matrix', label: 'Breach Matrix' },
            { id: 'trace', label: 'ICE Defense' },
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

        {/* Tab 1: Quick Daemons List */}
        {activeTab === 'daemons' && (
          <div className="px-4 space-y-2.5 font-mono text-xs">
            {DAEMONS.map((d) => (
              <div
                key={d.id}
                onClick={() => executeDaemon(d.cost)}
                className="p-3 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl border flex flex-col items-center justify-center font-black" style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)', color: 'var(--accent)' }}>
                    <span className="text-xs">{d.cost}</span>
                    <span className="text-[7px]">RAM</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block text-[11px]">{d.name}</span>
                    <span className="text-[9px] block text-zinc-400">{d.desc}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-400 block">{d.damage}</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded font-black border" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                    UPLOAD
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Breach Protocol Code Matrix */}
        {activeTab === 'matrix' && (
          <div className="px-4 space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-2xl border space-y-2.5" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold uppercase" style={{ color: 'var(--accent)' }}>
                  BUFFER SEQUENCE TARGET
                </span>
                <span className="text-emerald-400 font-bold">MATCH: 1C 55 BD E9</span>
              </div>

              {/* Buffer Slots */}
              <div className="flex gap-2">
                {['1C', '55', 'BD', 'E9'].map((hex, idx) => (
                  <div
                    key={idx}
                    className="flex-1 py-1.5 rounded-lg border text-center font-black text-xs"
                    style={{
                      borderColor: bufferSequence[idx] === hex ? 'var(--accent)' : 'var(--border)',
                      background: bufferSequence[idx] === hex ? 'var(--accent-light)' : 'rgba(0,0,0,0.4)',
                      color: bufferSequence[idx] === hex ? 'var(--accent)' : 'var(--text-secondary)',
                    }}
                  >
                    {bufferSequence[idx] || '—'}
                  </div>
                ))}
              </div>

              {/* 4x4 Code Matrix Grid */}
              <div className="grid grid-cols-4 gap-1.5 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                {['1C', '55', 'BD', 'E9', '7A', 'FF', '1C', 'BD', '55', 'E9', '1C', '7A', 'BD', 'FF', '55', 'E9'].map((h, i) => (
                  <button
                    key={i}
                    onClick={() => addHexToBuffer(h)}
                    className="py-2 rounded-lg border font-black text-xs hover:bg-white/10 cursor-pointer text-center transition-transform active:scale-90"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: ICE Defense Status */}
        {activeTab === 'trace' && (
          <div className="px-4 space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-2xl border space-y-2" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span className="text-[10px] uppercase font-bold tracking-wider block text-red-400">
                HOSTILE BLACK ICE ENTITIES
              </span>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span>Cerberus Watchdog Daemon:</span>
                  <span className="text-red-400 font-bold">ATTACKING</span>
                </div>
                <div className="flex justify-between">
                  <span>Neural Burn Countermeasure:</span>
                  <span className="text-amber-400 font-bold">CHARGING 84%</span>
                </div>
                <div className="flex justify-between">
                  <span>Arasaka Orbital Subnet Ping:</span>
                  <span className="text-cyan-400 font-bold">12ms RTT</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fixed Bottom Action Bar */}
        <div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] border-t px-5 py-3 z-40 backdrop-blur-md flex items-center justify-between"
          style={{ borderColor: 'var(--border)', background: 'rgba(10, 4, 11, 0.95)' }}
        >
          <div className="font-mono text-xs">
            <span className="text-[9px] block uppercase" style={{ color: 'var(--text-secondary)' }}>BUFFER RAM</span>
            <span className="font-bold text-white">{64 - usedRam} / 64 UNITS</span>
          </div>

          <button
            onClick={() => {
              setTraceProgress(0)
              setUsedRam(0)
              setBufferSequence([])
              alert('Jack-Out successful! Neural connection severed safely.')
            }}
            className="ml-3 px-5 py-2.5 rounded-xl font-mono font-bold text-xs text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-transform active:scale-95 bg-red-600 hover:bg-red-700"
          >
            <span>🔌 JACK OUT & SEVER LINK</span>
          </button>
        </div>
      </div>
    </>
  )
}
