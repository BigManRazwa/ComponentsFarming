import { useState, useEffect } from 'react'

type Variant = 'purple' | 'cyan' | 'amber'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#A855F7': 'purple',
  '#06B6D4': 'cyan',
  '#F59E0B': 'amber',
}

const THEMES: Record<Variant, Record<string, string>> = {
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
    '--border': '#3D2C18',
    '--text-primary': '#FFFBEB',
    '--text-secondary': '#C4AD85',
  },
}

interface Exoplanet {
  id: string
  name: string
  type: string
  dist: string
  esi: string
  temp: string
  status: string
  h2o: number
  co2: number
  ch4: number
}

const EXOPLANETS: Exoplanet[] = [
  {
    id: 'trappist-1e',
    name: 'TRAPPIST-1e',
    type: 'Super-Earth (Terrestrial)',
    dist: '39.46 ly',
    esi: '0.95',
    temp: '-15°C to 20°C',
    status: 'GOLDILOCKS HABITABLE',
    h2o: 48,
    co2: 32,
    ch4: 14,
  },
  {
    id: 'proxima-b',
    name: 'Proxima Centauri b',
    type: 'Rocky Earth-Mass',
    dist: '4.24 ly',
    esi: '0.87',
    temp: '-39°C',
    status: 'TIDALLY LOCKED',
    h2o: 26,
    co2: 44,
    ch4: 8,
  },
  {
    id: 'kepler-452b',
    name: 'Kepler-452b',
    type: 'Super-Earth (G2V Star)',
    dist: '1,402 ly',
    esi: '0.83',
    temp: '-8°C',
    status: 'POTENTIAL WATER WORLD',
    h2o: 62,
    co2: 18,
    ch4: 19,
  },
]

export function MobileExoplanetTracker({ variant = 'purple' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [selectedPlanet, setSelectedPlanet] = useState<Exoplanet>(EXOPLANETS[0])
  const [activeTab, setActiveTab] = useState<'spectro' | 'orbit' | 'radar'>('spectro')
  const [isSaved, setIsSaved] = useState(false)

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
        .exo-wrapper { font-family: ${customFont || "'JetBrains Mono', 'Fira Code', monospace"}; }
        .exo-wrapper * { box-sizing: border-box; }
        .exo-wrapper ::-webkit-scrollbar { display: none; }
        .star-matrix {
          background-image: radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
      <div
        className="exo-wrapper max-w-[390px] mx-auto min-h-screen relative flex flex-col pb-24 select-none"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Observatory Header */}
        <header className="px-5 pt-6 pb-3 border-b flex items-center justify-between sticky top-0 z-30 backdrop-blur-md" style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-white" style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}>
              🪐
            </div>
            <div>
              <span className="font-black text-xs tracking-wider block">COSMO-LENS AI</span>
              <span className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>
                JWST NIRCAM // CYCLE 3
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold" style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)', color: 'var(--accent)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>99% SKY CLARITY</span>
          </div>
        </header>

        {/* Hero Exoplanet Radar Scanner Card */}
        <div className="p-4">
          <div className="p-4 rounded-3xl border relative overflow-hidden shadow-xl star-matrix" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: 'var(--accent)' }}></div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                {selectedPlanet.status}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">DIST: {selectedPlanet.dist}</span>
            </div>

            <h2 className="text-xl font-black leading-tight text-white mt-1">
              {selectedPlanet.name}
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              {selectedPlanet.type}
            </p>

            {/* Earth Similarity & Equilibrium Temp Readout */}
            <div className="mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-xs font-mono" style={{ borderColor: 'var(--border)' }}>
              <div className="p-2.5 rounded-xl bg-black/50 border" style={{ borderColor: 'var(--border)' }}>
                <span className="text-[9px] block text-zinc-400">EARTH SIMILARITY</span>
                <span className="text-lg font-black text-emerald-400">ESI {selectedPlanet.esi}</span>
                <span className="text-[8px] block text-zinc-500">INDEX (0.00 → 1.00)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-black/50 border" style={{ borderColor: 'var(--border)' }}>
                <span className="text-[9px] block text-zinc-400">EQUILIBRIUM TEMP</span>
                <span className="text-lg font-black text-white">{selectedPlanet.temp}</span>
                <span className="text-[8px] block text-zinc-500">SURFACE ESTIMATE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Target Planet Selector Chips */}
        <div className="px-4 flex gap-1.5 overflow-x-auto pb-2">
          {EXOPLANETS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlanet(p)}
              className="px-3 py-1.5 rounded-xl border text-xs font-mono font-bold whitespace-nowrap cursor-pointer transition-all"
              style={{
                background: selectedPlanet.id === p.id ? 'var(--accent)' : 'var(--bg-card)',
                borderColor: selectedPlanet.id === p.id ? 'transparent' : 'var(--border)',
                color: selectedPlanet.id === p.id ? '#FFF' : 'var(--text-secondary)',
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Tab Switcher */}
        <div className="px-4 pt-2 pb-2 flex gap-1.5 text-xs font-bold font-mono">
          {[
            { id: 'spectro', label: 'Atmosphere Spectrograph' },
            { id: 'orbit', label: 'Orbital Resonance' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex-1 py-1.5 rounded-xl border transition-all cursor-pointer text-center"
              style={{
                background: activeTab === tab.id ? 'var(--accent-light)' : 'transparent',
                borderColor: activeTab === tab.id ? 'var(--accent)' : 'var(--border)',
                color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-secondary)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Chemical Spectrograph Analysis */}
        {activeTab === 'spectro' && (
          <div className="px-4 space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-2xl border space-y-2.5" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
              <div className="flex justify-between items-center">
                <span className="font-bold text-[10px] uppercase text-white">
                  TRANSMISSION SPECTROSCOPY BANDS
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">BIOSIGNATURES</span>
              </div>

              {/* Gas Abundances */}
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span>Water Vapor (H2O 1.4 µm)</span>
                    <span className="font-bold text-cyan-400">{selectedPlanet.h2o}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded bg-black/60 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                    <div className="h-full rounded bg-cyan-400" style={{ width: `${selectedPlanet.h2o}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span>Carbon Dioxide (CO2 4.3 µm)</span>
                    <span className="font-bold text-amber-400">{selectedPlanet.co2}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded bg-black/60 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                    <div className="h-full rounded bg-amber-400" style={{ width: `${selectedPlanet.co2}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span>Methane (CH4 Organic 3.3 µm)</span>
                    <span className="font-bold text-emerald-400">{selectedPlanet.ch4}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded bg-black/60 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                    <div className="h-full rounded bg-emerald-400" style={{ width: `${selectedPlanet.ch4}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="text-[9px] text-zinc-400 pt-1 border-t" style={{ borderColor: 'var(--border)' }}>
                CONFIDENCE: 4.8-SIGMA DETECTION BY NIRSPEC PRISM
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orbital Resonance */}
        {activeTab === 'orbit' && (
          <div className="px-4 space-y-2.5 font-mono text-xs">
            <div className="p-3.5 rounded-2xl border space-y-2" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span className="text-[10px] font-bold uppercase block" style={{ color: 'var(--accent)' }}>
                STELLAR PARAMETERS
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>ORBITAL PERIOD: <strong className="text-white">6.10 Days</strong></div>
                <div>SEMI-MAJOR AXIS: <strong className="text-white">0.029 AU</strong></div>
                <div>MASS: <strong className="text-white">0.692 M⊕</strong></div>
                <div>RADIUS: <strong className="text-white">0.918 R⊕</strong></div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border text-[11px] space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
              <div className="font-bold text-white">Parent Star: TRAPPIST-1 (M8V Ultra-Cool Red Dwarf)</div>
              <div className="text-zinc-400">Luminosity: 0.05% of Sun · Stellar Flares: Moderate</div>
            </div>
          </div>
        )}

        {/* Fixed Bottom Action Bar */}
        <div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] border-t px-5 py-3 z-40 backdrop-blur-md flex items-center justify-between"
          style={{ borderColor: 'var(--border)', background: 'rgba(10, 6, 18, 0.95)' }}
        >
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="px-3.5 py-2.5 rounded-xl border text-xs font-mono font-bold cursor-pointer transition-colors"
            style={{
              borderColor: isSaved ? 'var(--accent)' : 'var(--border)',
              color: isSaved ? 'var(--accent)' : 'var(--text-secondary)',
            }}
          >
            {isSaved ? '★ TRACKED' : '☆ TRACK TARGET'}
          </button>

          <button
            onClick={() => alert(`Synchronizing AR Night Sky Compass for ${selectedPlanet.name}...`)}
            className="flex-1 ml-3 py-2.5 rounded-xl font-mono font-bold text-xs text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-transform active:scale-95"
            style={{ background: 'var(--accent)' }}
          >
            <span>🔭 POINT AR TELESCOPE</span>
          </button>
        </div>
      </div>
    </>
  )
}
