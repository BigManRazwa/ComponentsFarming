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

interface Sector {
  id: string
  name: string
  type: string
  pop: string
  power: string
  transit: string
}

const SECTORS: Sector[] = [
  { id: 'sec-1', name: 'Chiyoda Quantum Core', type: 'Financial & AI Grid', pop: '4.8M', power: '4.2 GW', transit: '99.9%' },
  { id: 'sec-2', name: 'Shinjuku Sky-Spire', type: 'Vertical Arcology (1.2 km)', pop: '9.2M', power: '6.1 GW', transit: '99.7%' },
  { id: 'sec-3', name: 'Shibuya Neon Arcade', type: 'Entertainment & Commerce', pop: '6.4M', power: '3.8 GW', transit: '99.8%' },
  { id: 'sec-4', name: 'Odaiba Quantum Port', type: 'Autonomous Logistics', pop: '3.1M', power: '2.4 GW', transit: '100%' },
]

export function SmartCityCommand({ variant = 'cyan' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [selectedSector, setSelectedSector] = useState<Sector>(SECTORS[1])
  const [activeLayer, setActiveLayer] = useState<'skyline' | 'transit' | 'power'>('skyline')
  const [isLockdown, setIsLockdown] = useState(false)

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
        .city-wrapper { font-family: ${customFont || "'JetBrains Mono', 'Fira Code', monospace"}; }
        .city-wrapper * { box-sizing: border-box; }
        .city-wrapper ::-webkit-scrollbar { width: 4px; height: 4px; }
        .city-wrapper ::-webkit-scrollbar-track { background: var(--bg-primary); }
        .city-wrapper ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
        .grid-matrix {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>
      <div
        className="city-wrapper min-h-screen flex flex-col select-none"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Mega-City Grid Header */}
        <header className="border-b px-6 py-2.5 flex items-center justify-between text-xs font-mono" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: isLockdown ? '#EF4444' : 'var(--accent)', boxShadow: `0 0 10px ${isLockdown ? '#EF4444' : 'var(--accent)'}` }}></span>
              <span className="font-black text-sm tracking-wider uppercase">NEO-TOKYO 2099 // MUNICIPAL GRID</span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
              <span>CITIZENS: <strong className="text-white text-xs">38.4M</strong></span>
              <span>FUSION GRID: <strong className="text-cyan-400">18.4 GW (84%)</strong></span>
              <span>AIRSPACE UAVs: <strong className="text-emerald-400">14,820 FLIGHTS</strong></span>
              <span>AIR QUALITY: <strong style={{ color: 'var(--accent)' }}>AQI 24 PRISTINE</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded border text-[11px] font-bold" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>DEFENSE SHIELD:</span>
              <span className="text-emerald-400 font-mono">100% ARMORED</span>
            </div>

            <button
              onClick={() => setIsLockdown(!isLockdown)}
              className="px-3.5 py-1 rounded font-bold text-xs cursor-pointer tracking-wider uppercase transition-all shadow"
              style={{
                background: isLockdown ? '#10B981' : '#EF4444',
                color: '#FFF',
                boxShadow: isLockdown ? '0 0 12px rgba(16,185,129,0.4)' : '0 0 12px rgba(239,68,68,0.4)',
              }}
            >
              {isLockdown ? 'LIFT LOCKDOWN' : 'SECTOR LOCKDOWN'}
            </button>
          </div>
        </header>

        {/* 3-Column Metropolis Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Mega-Sectors & Infrastructure (Cols 3) */}
          <aside className="lg:col-span-3 border-r p-4 flex flex-col justify-between space-y-4 overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold tracking-widest uppercase text-[11px]" style={{ color: 'var(--accent)' }}>
                  [MEGA-CITY SECTORS]
                </span>
                <span className="text-[10px] text-zinc-400">ALL 4 ONLINE</span>
              </div>

              {/* Sectors List */}
              <div className="space-y-2.5">
                {SECTORS.map((sec) => {
                  const isSelected = selectedSector.id === sec.id
                  return (
                    <div
                      key={sec.id}
                      onClick={() => setSelectedSector(sec)}
                      className="p-3 rounded-xl border transition-all cursor-pointer space-y-1.5"
                      style={{
                        borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                        background: isSelected ? 'var(--bg-card)' : 'transparent',
                        boxShadow: isSelected ? '0 0 10px var(--accent-light)' : 'none',
                      }}
                    >
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-white text-[11px]">{sec.name}</span>
                        <span className="text-cyan-400 font-mono font-bold">{sec.pop} RES</span>
                      </div>
                      <p className="text-[9px]" style={{ color: 'var(--text-secondary)' }}>{sec.type}</p>
                      <div className="flex justify-between text-[10px] pt-1 border-t border-white/5 font-mono" style={{ color: 'var(--text-secondary)' }}>
                        <span>GRID: {sec.power}</span>
                        <span className="text-emerald-400">MAGLEV: {sec.transit}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Maglev & Air Scrubbers */}
              <div className="p-3 rounded-xl border space-y-2 mt-4 font-mono text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                  AUTOMATED TRANSIT ARTERY
                </span>
                <div className="flex justify-between text-[11px]">
                  <span>HYPER-MAGLEV LINES:</span>
                  <span className="font-bold text-white">48 LINES (450 km/h)</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>DAILY COMMUTERS:</span>
                  <span className="font-bold text-cyan-400">4.24M RIDERS</span>
                </div>
                <div className="flex justify-between text-[11px] pt-1 border-t" style={{ borderColor: 'var(--border)' }}>
                  <span>ATMOSPHERIC SCRUB:</span>
                  <span className="font-bold text-emerald-400">99.9% HEPA DOME</span>
                </div>
              </div>
            </div>

            {/* Municipal Cycle Time */}
            <div className="pt-2 border-t text-[11px] font-mono flex justify-between items-center" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              <span>SOLAR CYCLE: <strong className="text-white">NIGHT [NEON FLUX]</strong></span>
              <span className="text-cyan-400 font-bold">GRID STABLE</span>
            </div>
          </aside>

          {/* Center Column: 3D Holographic Skyline & Flight Corridors (Cols 6) */}
          <main className="lg:col-span-6 flex flex-col p-4 space-y-3 overflow-hidden">
            {/* Layer Filter Toggles */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex gap-1.5">
                {[
                  { id: 'skyline', label: 'Holographic 3D Skyline' },
                  { id: 'transit', label: 'Maglev Artery Flow' },
                  { id: 'power', label: 'Fusion Power Mesh' },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setActiveLayer(l.id as any)}
                    className="px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer"
                    style={{
                      background: activeLayer === l.id ? 'var(--accent)' : 'transparent',
                      borderColor: activeLayer === l.id ? 'transparent' : 'var(--border)',
                      color: activeLayer === l.id ? '#FFF' : 'var(--text-secondary)',
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              <span className="text-[11px] font-bold" style={{ color: 'var(--accent)' }}>
                {selectedSector.name.toUpperCase()}
              </span>
            </div>

            {/* Holographic Skyline Visualizer Canvas */}
            <div className="aspect-[16/9] w-full rounded-2xl border p-4 relative overflow-hidden flex flex-col justify-between shadow-2xl grid-matrix" style={{ borderColor: 'var(--border)', background: '#02050E' }}>
              <div className="flex justify-between items-center text-xs font-mono z-10">
                <span className="font-bold text-white uppercase text-[11px]">
                  SECTOR TOPOGRAPHY // {selectedSector.name}
                </span>
                <span className="text-emerald-400 font-bold">14,820 UAVs IN AIR</span>
              </div>

              {/* 3D Wireframe Spires & Flight Trajectories */}
              <div className="h-44 w-full relative my-auto flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 500 160" fill="none">
                  {/* Grid Ground Plane */}
                  <line x1="20" y1="130" x2="480" y2="130" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

                  {/* Mega-Spires Wireframe Silhouettes */}
                  {/* Spire 1 */}
                  <polygon points="80,130 95,45 110,45 125,130" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" fill="rgba(6,182,212,0.06)" />
                  <line x1="95" y1="45" x2="110" y2="45" stroke="#FFF" strokeWidth="2" />
                  <circle cx="102" cy="45" r="2" fill="#EF4444" className="animate-ping" />

                  {/* Central Sky-Spire Arcology (1.2 km) */}
                  <polygon points="210,130 235,15 265,15 290,130" stroke="var(--accent)" strokeWidth="2" fill="rgba(217,70,239,0.1)" />
                  <line x1="235" y1="15" x2="265" y2="15" stroke="#FFF" strokeWidth="3" />
                  <circle cx="250" cy="15" r="3" fill="#FFF" />

                  {/* Spire 3 */}
                  <polygon points="360,130 380,60 400,60 420,130" stroke="rgba(16,185,129,0.6)" strokeWidth="1.5" fill="rgba(16,185,129,0.06)" />
                  <circle cx="390" cy="60" r="2" fill="#F59E0B" />

                  {/* Maglev Artery Line */}
                  <path d="M 30 115 Q 250 85 470 115" stroke="rgba(6,182,212,0.8)" strokeWidth="2.5" strokeDasharray="8 4" />

                  {/* UAV Flight Corridors */}
                  <path d="M 60 70 Q 200 40 340 50 T 460 30" stroke="rgba(217,70,239,0.7)" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono z-10" style={{ color: 'var(--text-secondary)' }}>
                <span>CENTRAL ARCOLOGY: 1,200m SKY-SPIRE</span>
                <span className="font-bold text-white">MAGLEV CRUISE: 450 km/h</span>
                <span>AIR CORRIDOR: 400m → 800m</span>
              </div>
            </div>

            {/* Real-Time Municipal Key Performance Indicators */}
            <div className="grid grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl border space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                  CARBON FOOTPRINT
                </span>
                <div className="text-lg font-black text-emerald-400">0.00 NET</div>
                <span className="text-[9px] text-zinc-400">100% FUSION & SOLAR</span>
              </div>

              <div className="p-3 rounded-xl border space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                  DESALINATION WATER
                </span>
                <div className="text-lg font-black text-cyan-400">98.4% BUFFER</div>
                <span className="text-[9px] text-zinc-400">TOKYO BAY INGESTION</span>
              </div>

              <div className="p-3 rounded-xl border space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                  AUTONOMOUS SAFETY
                </span>
                <div className="text-lg font-black text-white">94.8% INDEX</div>
                <span className="text-[9px] text-zinc-400">CRIME INCIDENTS ▼ 18%</span>
              </div>
            </div>
          </main>

          {/* Right Column: Autonomous Fleet & Municipal Dispatch (Cols 3) */}
          <aside className="lg:col-span-3 border-l p-4 flex flex-col justify-between space-y-4 overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold tracking-widest uppercase text-[11px]" style={{ color: 'var(--accent)' }}>
                  [AUTONOMOUS DRONE FLEET]
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">142 UNITS</span>
              </div>

              {/* Fleet Breakdown */}
              <div className="space-y-2 text-xs font-mono">
                {[
                  { name: 'Patrol Enforcer Drones', count: '64 Units', status: 'ACTIVE AIR', color: '#06B6D4' },
                  { name: 'Med-Evac Trauma VTOL', count: '38 Units', status: 'ON STANDBY', color: '#10B981' },
                  { name: 'Fire Suppression Aero-Pods', count: '40 Units', status: 'READY', color: '#F59E0B' },
                ].map((item) => (
                  <div key={item.name} className="p-2.5 rounded-xl border space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-white truncate max-w-[170px]">{item.name}</span>
                      <span className="font-bold" style={{ color: item.color }}>{item.count}</span>
                    </div>
                    <p className="text-[9px] text-zinc-400">{item.status}</p>
                  </div>
                ))}
              </div>

              {/* Grid Weather Deflector */}
              <div className="p-3 rounded-xl border font-mono text-xs space-y-1.5" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                  ATMOSPHERIC DEFLECTOR
                </span>
                <div className="flex justify-between text-[11px]">
                  <span>WEATHER SHIELD:</span>
                  <span className="font-bold text-white">ONLINE [IONIZED DOME]</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>ACID RAIN PROTECTION:</span>
                  <span className="text-emerald-400 font-bold">100% DEFLECTED</span>
                </div>
              </div>
            </div>

            {/* City Event Stream */}
            <div className="p-3 rounded-xl border font-mono text-[9px] space-y-1 bg-black/60" style={{ borderColor: 'var(--border)' }}>
              <div className="font-bold text-zinc-400 pb-1 border-b border-white/10">[MUNICIPAL EVENT STREAM]</div>
              <div className="text-emerald-400">16:48:02 Maglev Line #14 arrived at Sky-Spire</div>
              <div className="text-zinc-400">16:48:15 Fusion Core 4 automated load rebalance</div>
              <div className="text-cyan-400">16:48:29 Atmospheric purity check: AQI 24 verified</div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
