import { useState, useEffect } from 'react'

type Variant = 'cyan' | 'purple' | 'amber'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#06B6D4': 'cyan',
  '#A855F7': 'purple',
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
  purple: {
    '--accent': '#A855F7',
    '--accent-hover': '#9333EA',
    '--accent-light': 'rgba(168, 85, 247, 0.16)',
    '--bg-primary': '#0A0612',
    '--bg-secondary': '#130C22',
    '--bg-card': '#1F1436',
    '--border': '#36235C',
    '--text-primary': '#FAF5FF',
    '--text-secondary': '#AA98CB',
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

interface GripMode {
  id: string
  name: string
  desc: string
  force: string
  icon: string
}

const GRIP_MODES: GripMode[] = [
  { id: 'pinch', name: 'Precision Pinch', desc: 'Delicate handling for keys, cards & pens', force: '22 N', icon: '🤏' },
  { id: 'fist', name: 'Power Fist', desc: 'Heavy load grip with full finger closure', force: '120 N', icon: '✊' },
  { id: 'tripod', name: 'Tripod Grip', desc: 'Three-point contact for fine writing utensils', force: '35 N', icon: '✍️' },
  { id: 'point', name: 'Index Point', desc: 'Extended index for screens and keyboards', force: '15 N', icon: '👉' },
]

export function MobileBionicArm({ variant = 'cyan' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [activeGrip, setActiveGrip] = useState<string>('pinch')
  const [isLocked, setIsLocked] = useState(false)
  const [hapticIntensity, setHapticIntensity] = useState<'Low' | 'Medium' | 'High'>('Medium')
  const [activeTab, setActiveTab] = useState<'grips' | 'emg' | 'haptics'>('grips')

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

  const selectedGrip = GRIP_MODES.find((g) => g.id === activeGrip) || GRIP_MODES[0]

  const theme = THEMES[currentTheme]
  const cssVars = Object.entries(theme).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Record<string, string>)

  return (
    <>
      <style>{`
        .bionic-wrapper { font-family: ${customFont || "'JetBrains Mono', 'Fira Code', monospace"}; }
        .bionic-wrapper * { box-sizing: border-box; }
        .bionic-wrapper ::-webkit-scrollbar { display: none; }
        .bionic-grid {
          background-image: linear-gradient(to right, rgba(6, 182, 212, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(6, 182, 212, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
      <div
        className="bionic-wrapper max-w-[390px] mx-auto min-h-screen relative flex flex-col pb-24 select-none"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Neural Prosthesis Header */}
        <header className="px-5 pt-6 pb-3 border-b flex items-center justify-between sticky top-0 z-30 backdrop-blur-md" style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-white" style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}>
              🦾
            </div>
            <div>
              <span className="font-black text-xs tracking-wider block uppercase">NEXUS-V BIONICS</span>
              <span className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>
                TITANIUM CYBER-ARM MK-V
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold" style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)', color: 'var(--accent)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>94% · 18h BATTERY</span>
          </div>
        </header>

        {/* Hero Active Grip Status Card */}
        <div className="p-4">
          <div className="p-4 rounded-3xl border relative overflow-hidden shadow-xl bionic-grid" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl opacity-15 pointer-events-none" style={{ background: 'var(--accent)' }}></div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                CURRENT ACTIVE GRIP
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">{isLocked ? '🔒 LOCKED' : '⚡ RESPONSIVE'}</span>
            </div>

            <div className="flex items-center gap-3 my-2">
              <span className="text-3xl">{selectedGrip.icon}</span>
              <div>
                <h2 className="text-lg font-black text-white leading-tight">
                  {selectedGrip.name}
                </h2>
                <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                  {selectedGrip.desc}
                </p>
              </div>
            </div>

            {/* Micro-Motor & Pressure Readout */}
            <div className="mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-xs font-mono" style={{ borderColor: 'var(--border)' }}>
              <div className="p-2.5 rounded-xl bg-black/50 border" style={{ borderColor: 'var(--border)' }}>
                <span className="text-[9px] block text-zinc-400">GRIP FORCE</span>
                <span className="text-base font-black text-cyan-400">{selectedGrip.force}</span>
                <span className="text-[8px] block text-zinc-500">MAX: 120 N</span>
              </div>

              <div className="p-2.5 rounded-xl bg-black/50 border" style={{ borderColor: 'var(--border)' }}>
                <span className="text-[9px] block text-zinc-400">CORE MOTOR TEMP</span>
                <span className="text-base font-black text-white">36.4°C</span>
                <span className="text-[8px] block text-zinc-500">BODY EQUIV</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] mt-3 pt-2 border-t font-mono" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              <span>16-CHANNEL EMG: SYNCHRONIZED</span>
              <span>LATENCY: 4.2ms</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-4 pb-2 flex gap-1.5 text-xs font-bold font-mono">
          {[
            { id: 'grips', label: 'Grip Presets' },
            { id: 'emg', label: 'EMG Sensors' },
            { id: 'haptics', label: 'Haptic Feedback' },
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

        {/* Tab 1: Grip Presets */}
        {activeTab === 'grips' && (
          <div className="px-4 space-y-2.5 font-mono text-xs">
            {GRIP_MODES.map((g) => (
              <div
                key={g.id}
                onClick={() => setActiveGrip(g.id)}
                className="p-3 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all"
                style={{
                  borderColor: activeGrip === g.id ? 'var(--accent)' : 'var(--border)',
                  background: activeGrip === g.id ? 'var(--accent-light)' : 'var(--bg-card)',
                  boxShadow: activeGrip === g.id ? '0 0 10px var(--accent-light)' : 'none',
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{g.icon}</span>
                  <div>
                    <span className="font-bold text-white block text-[11px]">{g.name}</span>
                    <span className="text-[9px] block text-zinc-400">{g.desc}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-cyan-400 block">{g.force}</span>
                  <span className="text-[8px] font-black" style={{ color: activeGrip === g.id ? 'var(--accent)' : 'var(--text-secondary)' }}>
                    {activeGrip === g.id ? 'ACTIVE' : 'SELECT'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: EMG Myoelectric Sensor Monitor */}
        {activeTab === 'emg' && (
          <div className="px-4 space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-2xl border space-y-2.5" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold uppercase" style={{ color: 'var(--accent)' }}>
                  RESIDUAL LIMB EMG POTENTIAL
                </span>
                <span className="text-emerald-400 font-bold">SNR: 38 dB</span>
              </div>

              {/* Muscle Sensors */}
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span>Forearm Flexor Muscle Group</span>
                    <span className="font-bold text-cyan-400">78% Actuation</span>
                  </div>
                  <div className="w-full h-1.5 rounded bg-black/60 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                    <div className="h-full rounded bg-cyan-400" style={{ width: '78%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span>Forearm Extensor Muscle Group</span>
                    <span className="font-bold text-amber-400">42% Actuation</span>
                  </div>
                  <div className="w-full h-1.5 rounded bg-black/60 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                    <div className="h-full rounded bg-amber-400" style={{ width: '42%' }}></div>
                  </div>
                </div>
              </div>

              <div className="text-[9px] text-zinc-400 pt-1 border-t" style={{ borderColor: 'var(--border)' }}>
                CALIBRATION STATUS: NEURAL AUTO-TUNE ACTIVE
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Haptics Feedback */}
        {activeTab === 'haptics' && (
          <div className="px-4 space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-2xl border space-y-2.5" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                VIBROTACTILE SENSORY INTENSITY
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
                {(['Low', 'Medium', 'High'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setHapticIntensity(level)}
                    className="py-1.5 rounded-xl border text-center transition-all cursor-pointer"
                    style={{
                      background: hapticIntensity === level ? 'var(--accent)' : 'transparent',
                      borderColor: hapticIntensity === level ? 'transparent' : 'var(--border)',
                      color: hapticIntensity === level ? '#FFF' : 'var(--text-secondary)',
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Fixed Bottom Action Bar */}
        <div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] border-t px-5 py-3 z-40 backdrop-blur-md flex items-center justify-between"
          style={{ borderColor: 'var(--border)', background: 'rgba(4, 9, 14, 0.95)' }}
        >
          <button
            onClick={() => setIsLocked(!isLocked)}
            className="px-4 py-2.5 rounded-xl border text-xs font-mono font-bold cursor-pointer transition-colors"
            style={{
              borderColor: isLocked ? 'var(--accent)' : 'var(--border)',
              color: isLocked ? 'var(--accent)' : 'var(--text-secondary)',
            }}
          >
            {isLocked ? '🔒 UNLOCK' : '🔓 LOCK GRIP'}
          </button>

          <button
            onClick={() => alert('Recalibrating 16-channel myoelectric neural sensors... Hold arm still for 3 seconds.')}
            className="flex-1 ml-3 py-2.5 rounded-xl font-mono font-bold text-xs text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-transform active:scale-95"
            style={{ background: 'var(--accent)' }}
          >
            <span>⚡ RECALIBRATE EMG</span>
          </button>
        </div>
      </div>
    </>
  )
}
