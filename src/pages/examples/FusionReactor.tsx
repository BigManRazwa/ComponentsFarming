import { useState, useEffect } from 'react'

type Variant = 'amber' | 'cyan' | 'violet'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#F59E0B': 'amber',
  '#06B6D4': 'cyan',
  '#8B5CF6': 'violet',
}

const THEMES: Record<Variant, Record<string, string>> = {
  amber: {
    '--accent': '#F59E0B',
    '--accent-hover': '#D97706',
    '--accent-light': 'rgba(245, 158, 11, 0.16)',
    '--bg-primary': '#0D0904',
    '--bg-secondary': '#171008',
    '--bg-card': '#24190E',
    '--border': '#3D2B18',
    '--text-primary': '#FFFBEB',
    '--text-secondary': '#C4AD85',
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
  violet: {
    '--accent': '#8B5CF6',
    '--accent-hover': '#7C3AED',
    '--accent-light': 'rgba(139, 92, 246, 0.16)',
    '--bg-primary': '#0A0713',
    '--bg-secondary': '#120D22',
    '--bg-card': '#1A1331',
    '--border': '#2E2254',
    '--text-primary': '#F8FAFC',
    '--text-secondary': '#9E8EB8',
  },
}

export function FusionReactor({ variant = 'amber' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [confinementMode, setConfinementMode] = useState<'L-Mode' | 'H-Mode' | 'Super-H'>('H-Mode')
  const [isQuenched, setIsQuenched] = useState(false)
  const [qFactor, setQFactor] = useState('10.42')

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

  const toggleEmergencyScram = () => {
    setIsQuenched(!isQuenched)
    setQFactor(isQuenched ? '10.42' : '0.00')
  }

  return (
    <>
      <style>{`
        .fusion-wrapper { font-family: ${customFont || "'JetBrains Mono', 'Fira Code', monospace"}; }
        .fusion-wrapper * { box-sizing: border-box; }
        .fusion-wrapper ::-webkit-scrollbar { width: 4px; height: 4px; }
        .fusion-wrapper ::-webkit-scrollbar-track { background: var(--bg-primary); }
        .fusion-wrapper ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
      `}</style>
      <div
        className="fusion-wrapper min-h-screen flex flex-col select-none"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Reactor Core Telemetry Header */}
        <header className="border-b px-6 py-2.5 flex items-center justify-between text-xs font-mono" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: isQuenched ? '#EF4444' : 'var(--accent)', boxShadow: `0 0 10px ${isQuenched ? '#EF4444' : 'var(--accent)'}` }}></span>
              <span className="font-black text-sm tracking-wider uppercase">HELIOS TOKAMAK MK-IV // FUSION CORE</span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
              <span>CORE TEMP: <strong className="text-amber-400">154.2M K</strong></span>
              <span>TOROIDAL FIELD: <strong className="text-cyan-400">11.85 T</strong></span>
              <span>GAIN: <strong className="text-emerald-400">Q = {qFactor}</strong></span>
              <span>REGIME: <strong style={{ color: 'var(--accent)' }}>{confinementMode}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded border text-[11px] font-bold" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>THERMAL OUTPUT:</span>
              <span className="text-white font-mono">{isQuenched ? '0 MWth' : '520 MWth'}</span>
            </div>

            <button
              onClick={toggleEmergencyScram}
              className="px-3.5 py-1 rounded font-bold text-xs cursor-pointer tracking-wider uppercase transition-all shadow"
              style={{
                background: isQuenched ? '#10B981' : '#EF4444',
                color: '#FFF',
                boxShadow: isQuenched ? '0 0 12px rgba(16,185,129,0.4)' : '0 0 12px rgba(239,68,68,0.4)',
              }}
            >
              {isQuenched ? 'RESET QUENCH COILS' : 'TRIP FAST QUENCH'}
            </button>
          </div>
        </header>

        {/* 3-Column Fusion Facility Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Auxiliary Heating & D-T Fuel Injection (Cols 3) */}
          <aside className="lg:col-span-3 border-r p-4 flex flex-col justify-between space-y-4 overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold tracking-widest uppercase text-[11px]" style={{ color: 'var(--accent)' }}>
                  [PLASMA HEATING]
                </span>
                <span className="text-[10px] text-zinc-400">TOTAL: 71.5 MW</span>
              </div>

              {/* Heating Systems */}
              <div className="space-y-2 text-xs font-mono">
                {[
                  { name: 'Neutral Beam (NBI-1 & 2)', power: '33.0 MW', status: 'ACTIVE', pct: 92 },
                  { name: 'Electron Cyclotron (ECRH)', power: '20.0 MW', status: 'TUNED', pct: 85 },
                  { name: 'Ion Cyclotron (ICRF)', power: '18.5 MW', status: 'ACTIVE', pct: 78 },
                ].map((item) => (
                  <div key={item.name} className="p-2.5 rounded-xl border space-y-1.5" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-white">{item.name}</span>
                      <span className="text-emerald-400 font-bold">{item.status}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span style={{ color: 'var(--text-secondary)' }}>POWER INJECT:</span>
                      <span className="font-bold text-white">{item.power}</span>
                    </div>
                    <div className="w-full h-1.5 rounded bg-black/50 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                      <div className="h-full rounded" style={{ width: `${item.pct}%`, background: 'var(--accent)' }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* D-T Fuel Injection */}
              <div className="p-3.5 rounded-xl border space-y-2 mt-4 font-mono text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                  CRYO FUEL PELLET INJECTION
                </span>
                <div className="flex justify-between text-[11px]">
                  <span>DEUTERIUM (²H):</span>
                  <span className="font-bold text-cyan-400">50.0% (42 pellets/s)</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>TRITIUM (³H):</span>
                  <span className="font-bold text-amber-400">50.0% (42 pellets/s)</span>
                </div>
                <div className="flex justify-between text-[11px] pt-1 border-t" style={{ borderColor: 'var(--border)' }}>
                  <span>FIRST-WALL HEAT FLUX:</span>
                  <span className="font-bold text-emerald-400">8.4 MW/m²</span>
                </div>
              </div>
            </div>

            {/* Confinement Regime Switcher */}
            <div className="pt-2 border-t text-[11px] font-mono flex justify-between items-center" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              <span>CONFINEMENT:</span>
              <div className="flex gap-1">
                {(['L-Mode', 'H-Mode', 'Super-H'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setConfinementMode(mode)}
                    className="px-2 py-0.5 rounded border text-[9px] font-bold cursor-pointer transition-colors"
                    style={{
                      background: confinementMode === mode ? 'var(--accent)' : 'transparent',
                      borderColor: confinementMode === mode ? 'transparent' : 'var(--border)',
                      color: confinementMode === mode ? '#FFF' : 'var(--text-secondary)',
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Center Column: Toroidal Plasma Donut & Magnetic Flux Surfaces (Cols 6) */}
          <main className="lg:col-span-6 flex flex-col p-4 space-y-3 overflow-hidden">
            {/* Plasma Torus Visualizer */}
            <div className="aspect-[16/9] w-full rounded-2xl border p-4 relative overflow-hidden flex flex-col justify-between shadow-2xl" style={{ borderColor: 'var(--border)', background: '#070402' }}>
              <div className="flex justify-between items-center text-xs font-mono z-10">
                <div>
                  <span className="font-bold text-white uppercase text-[11px] block">
                    TOROIDAL CROSS-SECTION // MAGNETIC CONFINEMENT FLUX
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                    SAFETY FACTOR q95 = 3.24 · TROYON BETA βN = 2.84
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-500/20 text-emerald-400">
                  BURNING PLASMA
                </span>
              </div>

              {/* Simulated Plasma Donut Torus Graphic */}
              <div className="h-44 w-full relative my-auto flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 500 160" fill="none">
                  {/* Outer vacuum vessel */}
                  <ellipse cx="250" cy="80" rx="220" ry="70" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="6 4" />
                  <ellipse cx="250" cy="80" rx="170" ry="52" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

                  {/* Magnetic Flux Nested Surfaces */}
                  <ellipse cx="250" cy="80" rx="120" ry="36" stroke="var(--accent)" strokeWidth="2" opacity="0.6" />
                  <ellipse cx="250" cy="80" rx="75" ry="22" stroke="var(--accent)" strokeWidth="2.5" opacity="0.8" />

                  {/* Super-hot core glow */}
                  <defs>
                    <radialGradient id="plasmaGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
                      <stop offset="60%" stopColor="#EF4444" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="250" cy="80" rx="55" ry="16" fill="url(#plasmaGlow)" />
                  <ellipse cx="250" cy="80" rx="30" ry="9" fill="#FFF" opacity="0.9" />

                  {/* Helical magnetic field lines representation */}
                  <path d="M 60 80 Q 150 20 250 80 T 440 80" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M 60 80 Q 150 140 250 80 T 440 80" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono z-10" style={{ color: 'var(--text-secondary)' }}>
                <span>MAJOR RADIUS R₀ = 6.2 m</span>
                <span className="font-bold text-white">ELECTRON DENSITY nₑ = 1.05 × 10²⁰ m⁻³</span>
                <span>MINOR RADIUS a = 2.0 m</span>
              </div>
            </div>

            {/* Fusion Power Balance & Grid Export */}
            <div className="grid grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl border space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                  THERMAL POWER
                </span>
                <div className="text-lg font-black text-white">{isQuenched ? '0' : '520'} MWth</div>
                <span className="text-[9px] text-zinc-400">ALPHA HEATING: 104 MW</span>
              </div>

              <div className="p-3 rounded-xl border space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                  NET ELECTRIC TO GRID
                </span>
                <div className="text-lg font-black text-emerald-400">{isQuenched ? '0' : '210'} MWe</div>
                <span className="text-[9px] text-zinc-400">STEAM TURBINE 40.4% EFF</span>
              </div>

              <div className="p-3 rounded-xl border space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                  TRITIUM BREEDING
                </span>
                <div className="text-lg font-black text-cyan-400">TBR 1.14</div>
                <span className="text-[9px] text-zinc-400">LITHIUM BLANKET SUSTAINED</span>
              </div>
            </div>
          </main>

          {/* Right Column: Superconducting Magnets & Vacuum Cryostat (Cols 3) */}
          <aside className="lg:col-span-3 border-l p-4 flex flex-col justify-between space-y-4 overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold tracking-widest uppercase text-[11px]" style={{ color: 'var(--accent)' }}>
                  [CRYO MAGNET ARRAY]
                </span>
                <span className="text-[10px] text-cyan-400 font-bold">4.2 K LiHe</span>
              </div>

              {/* Magnet Telemetry */}
              <div className="space-y-2 text-xs font-mono">
                {[
                  { name: '18 Toroidal D-Coils (TF)', current: '68.0 kA', field: '11.85 T' },
                  { name: 'Central Solenoid (CS)', current: '45.2 kA', field: '13.0 T' },
                  { name: '6 Poloidal Field Coils (PF)', current: '32.1 kA', field: '6.5 T' },
                ].map((m) => (
                  <div key={m.name} className="p-2.5 rounded-xl border space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                    <span className="font-bold text-white text-[10px] block">{m.name}</span>
                    <div className="flex justify-between text-[11px]">
                      <span style={{ color: 'var(--text-secondary)' }}>CURRENT:</span>
                      <span className="text-white font-bold">{m.current}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span style={{ color: 'var(--text-secondary)' }}>PEAK FIELD:</span>
                      <span className="text-cyan-400 font-bold">{m.field}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Vacuum Pressure */}
              <div className="p-3 rounded-xl border font-mono text-xs space-y-1.5" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                  TORUS ULTRA-HIGH VACUUM
                </span>
                <div className="flex justify-between text-[11px]">
                  <span>BASE PRESSURE:</span>
                  <span className="font-bold text-white">1.2 × 10⁻⁸ Pa</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>CRYOPUMP ARRAY:</span>
                  <span className="text-emerald-400 font-bold">8/8 PUMPS ONLINE</span>
                </div>
              </div>
            </div>

            {/* Diagnostic Logs */}
            <div className="p-3 rounded-xl border font-mono text-[9px] space-y-1 bg-black/60" style={{ borderColor: 'var(--border)' }}>
              <div className="font-bold text-zinc-400 pb-1 border-b border-white/10">[DIAGNOSTIC TELEMETRY]</div>
              <div className="text-emerald-400">15:18:02 Thomson scattering: Te = 18 keV</div>
              <div className="text-zinc-400">15:18:12 Mirnov coil magnetic fluctuations nominal</div>
              <div className="text-amber-400">15:18:24 Neutron flux rate: 1.8 × 10²⁰ n/s</div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
