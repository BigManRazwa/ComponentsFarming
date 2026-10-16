import { useState, useEffect } from 'react'

type Variant = 'cyan' | 'emerald' | 'amber'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#06B6D4': 'cyan',
  '#10B981': 'emerald',
  '#F59E0B': 'amber',
}

const THEMES: Record<Variant, Record<string, string>> = {
  cyan: {
    '--accent': '#06B6D4',
    '--accent-hover': '#0891B2',
    '--accent-light': 'rgba(6, 182, 212, 0.16)',
    '--bg-primary': '#020810',
    '--bg-secondary': '#05111F',
    '--bg-card': '#091B30',
    '--border': '#112E52',
    '--text-primary': '#F0FDFA',
    '--text-secondary': '#5E8DAE',
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
  amber: {
    '--accent': '#F59E0B',
    '--accent-hover': '#D97706',
    '--accent-light': 'rgba(245, 158, 11, 0.16)',
    '--bg-primary': '#0A0703',
    '--bg-secondary': '#150F07',
    '--bg-card': '#20180D',
    '--border': '#362816',
    '--text-primary': '#FFFBEB',
    '--text-secondary': '#A88E65',
  },
}

export function SubmersibleCommand({ variant = 'cyan' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [floodlightsOn, setFloodlightsOn] = useState(true)
  const [activeTab, setActiveTab] = useState<'sonar' | 'camera' | 'arm'>('sonar')
  const [isBallastDropped, setIsBallastDropped] = useState(false)

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
        .sub-wrapper { font-family: ${customFont || "'JetBrains Mono', 'Fira Code', monospace"}; }
        .sub-wrapper * { box-sizing: border-box; }
        .sub-wrapper ::-webkit-scrollbar { width: 4px; height: 4px; }
        .sub-wrapper ::-webkit-scrollbar-track { background: var(--bg-primary); }
        .sub-wrapper ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
        .depth-grid {
          background-image: linear-gradient(to right, rgba(6, 182, 212, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(6, 182, 212, 0.05) 1px, transparent 1px);
          background-size: 28px 28px;
        }
      `}</style>
      <div
        className="sub-wrapper min-h-screen flex flex-col select-none"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Bathymetry Submersible Status Bar */}
        <header className="border-b px-6 py-2.5 flex items-center justify-between text-xs font-mono" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}></span>
              <span className="font-black text-sm tracking-wider uppercase">NAUTILUS-IX // HADAL DIVE CONSOLE</span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
              <span>DEPTH: <strong className="text-white text-xs">10,928 METERS</strong></span>
              <span>PRESSURE: <strong className="text-cyan-400">1,086 BAR</strong></span>
              <span>WATER TEMP: <strong className="text-cyan-300">1.2°C</strong></span>
              <span>LOCATION: <strong style={{ color: 'var(--accent)' }}>CHALLENGER DEEP</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded border text-[11px] font-bold" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>HULL STRAIN:</span>
              <span className="text-emerald-400 font-mono">312 µε (SAFE)</span>
            </div>

            <button
              onClick={() => setIsBallastDropped(!isBallastDropped)}
              className="px-3.5 py-1 rounded font-bold text-xs cursor-pointer tracking-wider uppercase transition-all shadow"
              style={{
                background: isBallastDropped ? '#10B981' : '#EF4444',
                color: '#FFF',
                boxShadow: isBallastDropped ? '0 0 12px rgba(16,185,129,0.4)' : '0 0 12px rgba(239,68,68,0.4)',
              }}
            >
              {isBallastDropped ? 'ASCENT COMMENCED' : 'DROP WEIGHT EMERGENCY'}
            </button>
          </div>
        </header>

        {/* 3-Column Oceanic Abyss Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Submersible Life Support & Hull Integrity (Cols 3) */}
          <aside className="lg:col-span-3 border-r p-4 flex flex-col justify-between space-y-4 overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold tracking-widest uppercase text-[11px]" style={{ color: 'var(--accent)' }}>
                  [LIFE SUPPORT SYSTEMS]
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">ALL NOMINAL</span>
              </div>

              {/* Life Support Meters */}
              <div className="space-y-2.5 text-xs font-mono">
                {[
                  { name: 'Oxygen Partial Pressure (O2)', val: '20.9% (72h Reserve)', pct: 94, color: '#06B6D4' },
                  { name: 'Lithium Hydroxide CO2 Scrubber', val: '96.2% Absorption', pct: 96, color: '#10B981' },
                  { name: 'Titan-Sphere Hull Strain Gauge', val: '312 / 850 µε', pct: 36, color: '#F59E0B' },
                  { name: 'Dual Li-Titanate Deep Batteries', val: '84% (42.0 kWh)', pct: 84, color: '#06B6D4' },
                ].map((item) => (
                  <div key={item.name} className="p-2.5 rounded-xl border space-y-1.5" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-white truncate max-w-[170px]">{item.name}</span>
                      <span className="font-bold text-zinc-300">{item.val}</span>
                    </div>
                    <div className="w-full h-1.5 rounded bg-black/60 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                      <div className="h-full rounded" style={{ width: `${item.pct}%`, background: item.color }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ballast & Thruster Array */}
              <div className="p-3.5 rounded-xl border space-y-2 mt-4 font-mono text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                  BUOYANCY & VECTOR THRUSTERS
                </span>
                <div className="flex justify-between text-[11px]">
                  <span>VARIABLE BUOYANCY:</span>
                  <span className="font-bold text-cyan-400">NEUTRAL TRIM</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>MAGNETIC COUPLING THRUSTERS:</span>
                  <span className="font-bold text-white">4× 12 kW BRUSHLESS</span>
                </div>
                <div className="flex justify-between text-[11px] pt-1 border-t" style={{ borderColor: 'var(--border)' }}>
                  <span>SURFACE ASCENT RATE:</span>
                  <span className="font-bold text-emerald-400">{isBallastDropped ? '+3.8 m/s' : '0.0 m/s (HOVER)'}</span>
                </div>
              </div>
            </div>

            {/* Dive Duration Timer */}
            <div className="pt-2 border-t text-[11px] font-mono flex justify-between items-center" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              <span>BOTTOM TIME: <strong className="text-white">04h 28m 14s</strong></span>
              <span className="text-cyan-400 font-bold">MAX DEPTH REACHED</span>
            </div>
          </aside>

          {/* Center Column: Multibeam Sonar & 4K Deep Abyss Camera (Cols 6) */}
          <main className="lg:col-span-6 flex flex-col p-4 space-y-3 overflow-hidden">
            {/* View Tab Controls */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex gap-1.5">
                {(['sonar', 'camera', 'arm'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-3 py-1.5 rounded-xl border uppercase font-bold transition-all cursor-pointer"
                    style={{
                      background: activeTab === tab ? 'var(--accent)' : 'transparent',
                      borderColor: activeTab === tab ? 'transparent' : 'var(--border)',
                      color: activeTab === tab ? '#FFF' : 'var(--text-secondary)',
                    }}
                  >
                    {tab === 'sonar' ? 'Multibeam Sonar Radar' : tab === 'camera' ? '4K Trench Low-Light Optics' : 'Robotic Sampling Arm'}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setFloodlightsOn(!floodlightsOn)}
                className="px-2.5 py-1 rounded-lg border text-[11px] font-bold cursor-pointer"
                style={{
                  background: floodlightsOn ? 'var(--accent-light)' : 'transparent',
                  borderColor: floodlightsOn ? 'var(--accent)' : 'var(--border)',
                  color: floodlightsOn ? 'var(--accent)' : 'var(--text-secondary)',
                }}
              >
                💡 FLOODLIGHTS: {floodlightsOn ? 'ON (120k lm)' : 'OFF'}
              </button>
            </div>

            {/* Sonar Radar Canvas / Abyss View */}
            {activeTab === 'sonar' && (
              <div className="aspect-[16/9] w-full rounded-2xl border p-4 relative overflow-hidden flex flex-col justify-between shadow-2xl depth-grid" style={{ borderColor: 'var(--accent)', background: '#01050A' }}>
                <div className="flex justify-between items-center text-xs font-mono z-10">
                  <span className="font-bold text-white uppercase text-[11px]">
                    360° ACOUSTIC BATHYMETRY SWEEP // 120 kHz FREQUENCY
                  </span>
                  <span className="text-cyan-400 font-bold">PING INTERV: 1.2s</span>
                </div>

                {/* Concentric Sonar Rings & Radar Sweep */}
                <div className="h-44 w-full relative my-auto flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full border border-dashed border-cyan-500/40 relative flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border border-cyan-500/60 relative flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border border-cyan-400/80 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
                        <div className="w-2 h-2 rounded-full bg-cyan-300 absolute"></div>
                      </div>
                    </div>

                    {/* Seabed Bathymetry Obstacles */}
                    <div className="absolute top-4 right-10 flex flex-col items-center">
                      <span className="w-3 h-3 rounded-full bg-amber-400 shadow"></span>
                      <span className="text-[8px] font-mono text-amber-300 bg-black/80 px-1 rounded mt-1">VENT #04</span>
                    </div>

                    <div className="absolute bottom-6 left-8 flex flex-col items-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="text-[8px] font-mono text-emerald-300 bg-black/80 px-1 rounded mt-1">SEABED FLOOR</span>
                    </div>

                    {/* Rotating Radar Sweep Line */}
                    <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent to-cyan-400 absolute origin-left left-1/2 top-1/2 -rotate-45"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono z-10" style={{ color: 'var(--text-secondary)' }}>
                  <span>ECHO DIST: 34.2m TO SEAFLOOR</span>
                  <span className="font-bold text-white">SUBMERSIBLE ORIENTATION: HDG 184° / PITCH +2.4°</span>
                  <span>RANGE SCALE: 100m</span>
                </div>
              </div>
            )}

            {/* 4K Camera View */}
            {activeTab !== 'sonar' && (
              <div className="aspect-[16/9] w-full rounded-2xl border p-4 font-mono text-xs flex flex-col justify-between bg-black relative overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                <div className="flex justify-between text-zinc-400 z-10 text-[11px]">
                  <span>4K UHD LOW-LIGHT OPTICS // CAM-01 NOCTURNAL</span>
                  <span className="text-emerald-400">FPS: 60.0 (HDR)</span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2 z-10">
                  <div className="w-16 h-16 rounded-full border border-cyan-400/40 flex items-center justify-center text-2xl">
                    🐟
                  </div>
                  <div className="font-bold text-white text-xs">
                    HADAL SNAILFISH (*Pseudoliparis swirei*) OBSERVED
                  </div>
                  <p className="text-[10px] max-w-sm" style={{ color: 'var(--text-secondary)' }}>
                    Active biological specimen detected at 10,920m. Translucent epidermis with extreme hydrostatic piezo-adaptation.
                  </p>
                </div>

                <div className="flex justify-between text-[10px] text-zinc-500 z-10 border-t border-white/10 pt-1">
                  <span>SAMPLE BASKET: 3 SLOTS EMPTY</span>
                  <span>LASER SCALER: 10.0 cm SPAN</span>
                </div>
              </div>
            )}

            {/* Seafloor Environmental Metrics */}
            <div className="grid grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl border space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                  HYDROSTATIC PRESSURE
                </span>
                <div className="text-lg font-black text-white">1,086.4 BAR</div>
                <span className="text-[9px] text-zinc-400">15,756.8 PSI EQUIV</span>
              </div>

              <div className="p-3 rounded-xl border space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                  SALINITY & CONDUCTIVITY
                </span>
                <div className="text-lg font-black text-cyan-400">34.72 PSU</div>
                <span className="text-[9px] text-zinc-400">SOUND SPEED: 1,582 m/s</span>
              </div>

              <div className="p-3 rounded-xl border space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                  HYDROTHERMAL METHANE
                </span>
                <div className="text-lg font-black text-emerald-400">420 nmol/L</div>
                <span className="text-[9px] text-zinc-400">VENT SMOKER NEARBY</span>
              </div>
            </div>
          </main>

          {/* Right Column: Acoustic Surface Uplink & Chemical Sensors (Cols 3) */}
          <aside className="lg:col-span-3 border-l p-4 flex flex-col justify-between space-y-4 overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold tracking-widest uppercase text-[11px]" style={{ color: 'var(--accent)' }}>
                  [SURFACE ACOUSTIC LINK]
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">8.4 kHz MODEM</span>
              </div>

              {/* Surface Mother Ship Comms */}
              <div className="p-3 rounded-xl border space-y-2 font-mono text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <div className="flex justify-between text-[11px]">
                  <span style={{ color: 'var(--text-secondary)' }}>SURFACE VESSEL:</span>
                  <span className="font-bold text-white">R/V OCEANUS</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span style={{ color: 'var(--text-secondary)' }}>ACOUSTIC LATENCY:</span>
                  <span className="font-bold text-cyan-400">7.28 SECONDS</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span style={{ color: 'var(--text-secondary)' }}>PACKET THROUGHPUT:</span>
                  <span className="font-bold text-white">480 bps FSK</span>
                </div>
                <div className="w-full h-1.5 rounded bg-black/60 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                  <div className="h-full rounded bg-emerald-400" style={{ width: '92%' }}></div>
                </div>
              </div>

              {/* Hydrothermal Gas Sensors */}
              <div className="space-y-2 text-xs font-mono">
                <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                  CTD SENSOR SUITE
                </span>
                {[
                  { name: 'Dissolved Oxygen', val: '4.82 mL/L', status: 'HYPOXIC' },
                  { name: 'Hydrogen Sulfide (H2S)', val: '12.4 µmol/L', status: 'DETECTED' },
                  { name: 'Turbidity (NTU)', val: '0.42 NTU', status: 'CLEAR WATER' },
                ].map((s) => (
                  <div key={s.name} className="p-2 rounded-lg border flex justify-between items-center text-[10px]" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                    <div>
                      <span className="font-bold text-white block">{s.name}</span>
                      <span className="text-zinc-400">{s.val}</span>
                    </div>
                    <span className="text-[9px] font-bold text-cyan-400">{s.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Acoustic Log Feed */}
            <div className="p-3 rounded-xl border font-mono text-[9px] space-y-1 bg-black/60" style={{ borderColor: 'var(--border)' }}>
              <div className="font-bold text-zinc-400 pb-1 border-b border-white/10">[ACOUSTIC LOG STREAM]</div>
              <div className="text-emerald-400">15:26:02 R/V Oceanus: "Nautilus, telemetry confirmed"</div>
              <div className="text-zinc-400">15:26:18 Sonar echo depth lock: 10,928m</div>
              <div className="text-cyan-400">15:26:30 Biota sample cataloged in Bay #1</div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
