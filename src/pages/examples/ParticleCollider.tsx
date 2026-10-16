import { useState, useEffect } from 'react'

type Variant = 'indigo' | 'cyan' | 'amber'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#6366F1': 'indigo',
  '#06B6D4': 'cyan',
  '#F59E0B': 'amber',
}

const THEMES: Record<Variant, Record<string, string>> = {
  indigo: {
    '--accent': '#6366F1',
    '--accent-hover': '#4F46E5',
    '--accent-light': 'rgba(99, 102, 241, 0.16)',
    '--bg-primary': '#070612',
    '--bg-secondary': '#0F0C22',
    '--bg-card': '#171333',
    '--border': '#292154',
    '--text-primary': '#F8FAFC',
    '--text-secondary': '#9288B8',
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
    '--bg-primary': '#0A0703',
    '--bg-secondary': '#150F07',
    '--bg-card': '#20180D',
    '--border': '#362816',
    '--text-primary': '#FFFBEB',
    '--text-secondary': '#A88E65',
  },
}

export function ParticleCollider({ variant = 'indigo' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [activeFilter, setActiveFilter] = useState<'higgs' | 'muon' | 'jets'>('higgs')
  const [isBeamDumped, setIsBeamDumped] = useState(false)

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
        .collider-wrapper { font-family: ${customFont || "'JetBrains Mono', 'Fira Code', monospace"}; }
        .collider-wrapper * { box-sizing: border-box; }
        .collider-wrapper ::-webkit-scrollbar { width: 4px; height: 4px; }
        .collider-wrapper ::-webkit-scrollbar-track { background: var(--bg-primary); }
        .collider-wrapper ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
      `}</style>
      <div
        className="collider-wrapper min-h-screen flex flex-col select-none"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Particle Accelerator Telemetry Bar */}
        <header className="border-b px-6 py-2.5 flex items-center justify-between text-xs font-mono" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: isBeamDumped ? '#EF4444' : 'var(--accent)', boxShadow: `0 0 10px ${isBeamDumped ? '#EF4444' : 'var(--accent)'}` }}></span>
              <span className="font-black text-sm tracking-wider uppercase">CERN-LHC // ATLAS COLLIDER LAB</span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
              <span>BEAM ENERGY: <strong className="text-white text-xs">13.6 TeV</strong></span>
              <span>LUMINOSITY: <strong className="text-cyan-400">2.14 × 10³⁴ cm⁻²s⁻¹</strong></span>
              <span>CRYO TEMP: <strong className="text-cyan-300">1.9 K (He-II)</strong></span>
              <span>CROSSING: <strong style={{ color: 'var(--accent)' }}>40 MHz (25 ns)</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded border text-[11px] font-bold" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>BEAM STATE:</span>
              <span className="text-emerald-400 font-mono">{isBeamDumped ? 'BEAM DUMPED' : 'STABLE BEAMS'}</span>
            </div>

            <button
              onClick={() => setIsBeamDumped(!isBeamDumped)}
              className="px-3.5 py-1 rounded font-bold text-xs cursor-pointer tracking-wider uppercase transition-all shadow"
              style={{
                background: isBeamDumped ? '#10B981' : '#EF4444',
                color: '#FFF',
                boxShadow: isBeamDumped ? '0 0 12px rgba(16,185,129,0.4)' : '0 0 12px rgba(239,68,68,0.4)',
              }}
            >
              {isBeamDumped ? 'RE-INJECT PROTONS' : 'DUMP COLLIMATOR BEAM'}
            </button>
          </div>
        </header>

        {/* 3-Column Particle Physics Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Dual Proton Beams & Superconducting Dipoles (Cols 3) */}
          <aside className="lg:col-span-3 border-r p-4 flex flex-col justify-between space-y-4 overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold tracking-widest uppercase text-[11px]" style={{ color: 'var(--accent)' }}>
                  [PROTON BEAM STATUS]
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">CIRCULATING</span>
              </div>

              {/* Beam Metrics */}
              <div className="space-y-2.5 text-xs font-mono">
                {[
                  { name: 'Beam 1 Intensity (CW)', val: '1.15 × 10¹¹ p/bunch', pct: 92, color: '#6366F1' },
                  { name: 'Beam 2 Intensity (CCW)', val: '1.14 × 10¹¹ p/bunch', pct: 91, color: '#06B6D4' },
                  { name: '1,232 Dipole Magnets', val: '8.33 Tesla (11,850 A)', pct: 98, color: '#10B981' },
                  { name: 'Superfluid Helium II', val: '1.9 K (Nominal)', pct: 100, color: '#06B6D4' },
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

              {/* Collimator Alignment */}
              <div className="p-3.5 rounded-xl border space-y-2 mt-4 font-mono text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                  COLLIMATOR JAW HALO GAP
                </span>
                <div className="flex justify-between text-[11px]">
                  <span>PRIMARY COLLIMATOR:</span>
                  <span className="font-bold text-white">± 5.7 σ (1.2 mm)</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>BEAM LOSS RATE:</span>
                  <span className="font-bold text-emerald-400">0.02 Gy/s (SAFE)</span>
                </div>
                <div className="flex justify-between text-[11px] pt-1 border-t" style={{ borderColor: 'var(--border)' }}>
                  <span>RF CAVITY ACCEL:</span>
                  <span className="font-bold text-cyan-400">400.8 MHz (16 MV)</span>
                </div>
              </div>
            </div>

            {/* Run Duration */}
            <div className="pt-2 border-t text-[11px] font-mono flex justify-between items-center" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              <span>LHC FILL: <strong className="text-white">#8942 · RUN 3</strong></span>
              <span className="text-cyan-400 font-bold">14h 12m LIVE</span>
            </div>
          </aside>

          {/* Center Column: Particle Collision Event Display & Invariant Mass (Cols 6) */}
          <main className="lg:col-span-6 flex flex-col p-4 space-y-3 overflow-hidden">
            {/* Filter Toggle Buttons */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex gap-1.5">
                {[
                  { id: 'higgs', label: 'Higgs Diphoton (H → γγ)' },
                  { id: 'muon', label: 'Dimuon Z → μ⁺μ⁻' },
                  { id: 'jets', label: 'Top Quark Multijet' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id as any)}
                    className="px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer"
                    style={{
                      background: activeFilter === f.id ? 'var(--accent)' : 'transparent',
                      borderColor: activeFilter === f.id ? 'transparent' : 'var(--border)',
                      color: activeFilter === f.id ? '#FFF' : 'var(--text-secondary)',
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <span className="text-[11px]" style={{ color: 'var(--accent)' }}>
                EVENT #3829104
              </span>
            </div>

            {/* Event Display Canvas */}
            <div className="aspect-[16/9] w-full rounded-2xl border p-4 relative overflow-hidden flex flex-col justify-between shadow-2xl" style={{ borderColor: 'var(--border)', background: '#040209' }}>
              <div className="flex justify-between items-center text-xs font-mono z-10">
                <span className="font-bold text-white uppercase text-[11px]">
                  ATLAS TRANSVERSE DETECTOR CROSS-SECTION
                </span>
                <span className="text-emerald-400 font-bold">INVARIANT MASS: 125.09 GeV</span>
              </div>

              {/* Cylindrical Subatomic Track Graphic */}
              <div className="h-44 w-full relative my-auto flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 500 160" fill="none">
                  {/* Concentric Detector Cylinders */}
                  <circle cx="250" cy="80" r="75" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="250" cy="80" r="50" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                  <circle cx="250" cy="80" r="25" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

                  {/* Collision Vertex Central Flash */}
                  <circle cx="250" cy="80" r="4" fill="#FFF" className="animate-ping" />
                  <circle cx="250" cy="80" r="3" fill="var(--accent)" />

                  {/* Particle Decay Tracks */}
                  {/* Track 1: Photon energy cluster */}
                  <path d="M 250 80 Q 280 40 330 25" stroke="var(--accent)" strokeWidth="2.5" />
                  <rect x="330" y="18" width="16" height="12" fill="var(--accent)" rx="2" />

                  {/* Track 2: Opposite Photon energy cluster */}
                  <path d="M 250 80 Q 220 120 170 135" stroke="var(--accent)" strokeWidth="2.5" />
                  <rect x="156" y="130" width="16" height="12" fill="var(--accent)" rx="2" />

                  {/* Helical pion tracks (curled by 2T solenoid magnetic field) */}
                  <path d="M 250 80 Q 265 95 260 115 T 240 130" stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 250 80 Q 235 65 240 45 T 260 30" stroke="rgba(245,158,11,0.7)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 250 80 Q 290 85 330 80" stroke="rgba(239,68,68,0.8)" strokeWidth="2" strokeDasharray="6 3" />
                </svg>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono z-10" style={{ color: 'var(--text-secondary)' }}>
                <span>SOLENOID FIELD: 2.0 TESLA</span>
                <span className="font-bold text-white">RECONSTRUCTION: H → γγ (5.8σ SIGNIFICANCE)</span>
                <span>CALORIMETER: LAr + TileCal</span>
              </div>
            </div>

            {/* Invariant Mass Resonance Histogram */}
            <div className="p-3.5 rounded-2xl border space-y-2 font-mono text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold uppercase text-white">
                  DIPHOTON INVARIANT MASS RESONANCE [100 → 150 GeV]
                </span>
                <span className="text-emerald-400 font-bold">HIGGS PEAK AT 125.09 GeV</span>
              </div>

              {/* Histogram Distribution Graph */}
              <div className="h-14 w-full flex items-end gap-1">
                {[12, 14, 16, 18, 22, 25, 29, 36, 48, 88, 52, 38, 30, 24, 20, 17, 15, 13].map((val, idx) => {
                  const isPeak = idx === 9
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-0.5">
                      <div
                        className="w-full rounded-t transition-all"
                        style={{
                          height: `${(val / 88) * 100}%`,
                          background: isPeak ? 'var(--accent)' : 'rgba(255,255,255,0.15)',
                          boxShadow: isPeak ? '0 0 10px var(--accent)' : 'none',
                        }}
                      ></div>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-between text-[9px] text-zinc-500 pt-1 border-t" style={{ borderColor: 'var(--border)' }}>
                <span>100 GeV</span>
                <span>110 GeV</span>
                <span className="font-bold text-white">125 GeV (PEAK)</span>
                <span>140 GeV</span>
                <span>150 GeV</span>
              </div>
            </div>
          </main>

          {/* Right Column: Trigger System & Computing Grid (Cols 3) */}
          <aside className="lg:col-span-3 border-l p-4 flex flex-col justify-between space-y-4 overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold tracking-widest uppercase text-[11px]" style={{ color: 'var(--accent)' }}>
                  [TRIGGER & DATA PIPELINE]
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">1 kHz WRITE</span>
              </div>

              {/* Data Ingestion Pipeline */}
              <div className="space-y-2 text-xs font-mono">
                {[
                  { name: 'Collision Rate (Input)', val: '40,000,000 Hz', desc: 'Raw Bunch Collisions' },
                  { name: 'Level-1 Hardware Trigger', val: '100,000 Hz', desc: 'FPGA Custom ASICs' },
                  { name: 'High-Level Software Filter', val: '1,200 Hz', desc: 'CPU Farm Multi-Thread' },
                  { name: 'WLCG Grid Tape Storage', val: '2.4 GB/s', desc: 'Tier-0 Geneva Datacenter' },
                ].map((p) => (
                  <div key={p.name} className="p-2.5 rounded-xl border space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-white truncate max-w-[170px]">{p.name}</span>
                      <span className="font-bold" style={{ color: 'var(--accent)' }}>{p.val}</span>
                    </div>
                    <p className="text-[9px] text-zinc-400">{p.desc}</p>
                  </div>
                ))}
              </div>

              {/* Magnetic Solenoid Calibration */}
              <div className="p-3 rounded-xl border font-mono text-xs space-y-1.5" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                  DETECTOR STATUS
                </span>
                <div className="flex justify-between text-[11px]">
                  <span>TOROID MAGNET:</span>
                  <span className="font-bold text-white">4.0 T (Air-Core)</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>PIXEL CHANNELS:</span>
                  <span className="text-emerald-400 font-bold">92M PIXELS (99.7% ON)</span>
                </div>
              </div>
            </div>

            {/* Run Events Stream */}
            <div className="p-3 rounded-xl border font-mono text-[9px] space-y-1 bg-black/60" style={{ borderColor: 'var(--border)' }}>
              <div className="font-bold text-zinc-400 pb-1 border-b border-white/10">[COLLISION STREAM]</div>
              <div className="text-emerald-400">15:42:02 Candidate H → γγ saved to Tier-0</div>
              <div className="text-zinc-400">15:42:15 Luminosity level 2.14e34 steady</div>
              <div className="text-cyan-400">15:42:28 Beam orbit feedback nominal</div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
