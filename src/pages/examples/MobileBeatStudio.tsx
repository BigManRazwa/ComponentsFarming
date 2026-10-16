import { useState, useEffect } from 'react'

type Variant = 'fuchsia' | 'cyan' | 'lime'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#D946EF': 'fuchsia',
  '#06B6D4': 'cyan',
  '#84CC16': 'lime',
}

const THEMES: Record<Variant, Record<string, string>> = {
  fuchsia: {
    '--accent': '#D946EF',
    '--accent-hover': '#C026D3',
    '--accent-light': 'rgba(217, 70, 239, 0.18)',
    '--bg-primary': '#0D0612',
    '--bg-secondary': '#170B20',
    '--bg-card': '#231230',
    '--border': '#361B4A',
    '--text-primary': '#FDF4FF',
    '--text-secondary': '#B88EC7',
  },
  cyan: {
    '--accent': '#06B6D4',
    '--accent-hover': '#0891B2',
    '--accent-light': 'rgba(6, 182, 212, 0.18)',
    '--bg-primary': '#040D14',
    '--bg-secondary': '#081622',
    '--bg-card': '#0E2336',
    '--border': '#163754',
    '--text-primary': '#F0FDF4',
    '--text-secondary': '#72A4C8',
  },
  lime: {
    '--accent': '#84CC16',
    '--accent-hover': '#65A30D',
    '--accent-light': 'rgba(132, 204, 22, 0.18)',
    '--bg-primary': '#080D03',
    '--bg-secondary': '#111A07',
    '--bg-card': '#1B290B',
    '--border': '#2B4012',
    '--text-primary': '#F7FEE7',
    '--text-secondary': '#88B052',
  },
}

interface Pad {
  id: number
  name: string
  sub: string
  category: 'drums' | 'bass' | 'synth' | 'fx'
  color: string
}

const DRUM_PADS: Pad[] = [
  { id: 1, name: 'KICK 808', sub: 'Deep Sub', category: 'drums', color: '#EC4899' },
  { id: 2, name: 'SNARE TR', sub: 'Layered', category: 'drums', color: '#EC4899' },
  { id: 3, name: 'CLAP DRILL', sub: 'Tight', category: 'drums', color: '#EC4899' },
  { id: 4, name: 'HIHAT CL', sub: 'Closed', category: 'drums', color: '#F59E0B' },

  { id: 5, name: '808 GLIDE', sub: 'Note F#', category: 'bass', color: '#8B5CF6' },
  { id: 6, name: 'REESE BASS', sub: 'Sub Low', category: 'bass', color: '#8B5CF6' },
  { id: 7, name: 'PLUCK LEAD', sub: 'Cyber 2', category: 'synth', color: '#06B6D4' },
  { id: 8, name: 'HIHAT OP', sub: 'Open Cym', category: 'drums', color: '#F59E0B' },

  { id: 9, name: 'VOX CHOP 1', sub: 'Yeah!', category: 'fx', color: '#10B981' },
  { id: 10, name: 'VOX CHOP 2', sub: 'Run it', category: 'fx', color: '#10B981' },
  { id: 11, name: 'NEON CHORD', sub: 'Min 9th', category: 'synth', color: '#06B6D4' },
  { id: 12, name: 'CRASH DUST', sub: 'Reverse', category: 'drums', color: '#F59E0B' },

  { id: 13, name: 'LASER DROP', sub: 'Sweep Down', category: 'fx', color: '#10B981' },
  { id: 14, name: 'PERC WOOD', sub: 'Clicky', category: 'drums', color: '#EC4899' },
  { id: 15, name: 'ACID ARP', sub: '303 Saw', category: 'synth', color: '#06B6D4' },
  { id: 16, name: 'WHITE NOISE', sub: 'Riser 4b', category: 'fx', color: '#10B981' },
]

export function MobileBeatStudio({ variant = 'fuchsia' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [isPlaying, setIsPlaying] = useState(true)
  const [bpm, setBpm] = useState(128)
  const [currentStep, setCurrentStep] = useState(0)
  const [activePad, setActivePad] = useState<number | null>(null)
  const [filterCutoff, setFilterCutoff] = useState(72)
  const [activePack] = useState('CYBER DRIFT 2077')

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

  // 8-step Sequencer playhead animation
  useEffect(() => {
    if (!isPlaying) return
    const stepDuration = (60 / bpm / 2) * 1000 // 16th note timing
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 8)
    }, stepDuration)
    return () => clearInterval(interval)
  }, [isPlaying, bpm])

  const theme = THEMES[currentTheme]
  const cssVars = Object.entries(theme).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Record<string, string>)

  const triggerPad = (id: number) => {
    setActivePad(id)
    setTimeout(() => setActivePad(null), 180)
  }

  return (
    <>
      <style>{`
        .beat-wrapper { font-family: ${customFont || "'JetBrains Mono', 'Fira Code', monospace"}; }
        .beat-wrapper * { box-sizing: border-box; }
        .beat-wrapper ::-webkit-scrollbar { display: none; }
        .pad-active {
          transform: scale(0.95);
          box-shadow: 0 0 20px var(--accent) !important;
          border-color: #FFF !important;
        }
      `}</style>
      <div
        className="beat-wrapper max-w-[390px] mx-auto min-h-screen relative flex flex-col pb-24 select-none"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Control Deck */}
        <header className="px-5 pt-6 pb-3 border-b flex items-center justify-between sticky top-0 z-30 backdrop-blur-md" style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-white" style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}>
              16
            </div>
            <div>
              <span className="font-black text-xs tracking-wider block">GROOVEBOX X-16</span>
              <span className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>
                {activePack}
              </span>
            </div>
          </div>

          {/* BPM & Timing Control */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
            <button
              onClick={() => setBpm((b) => Math.max(60, b - 2))}
              className="w-6 h-6 rounded border flex items-center justify-center text-xs font-bold hover:bg-white/10 cursor-pointer"
              style={{ borderColor: 'var(--border)' }}
            >
              -
            </button>
            <div className="px-1 text-center font-mono">
              <span className="text-xs font-black text-white">{bpm}</span>
              <span className="text-[8px] block -mt-1" style={{ color: 'var(--text-secondary)' }}>BPM</span>
            </div>
            <button
              onClick={() => setBpm((b) => Math.min(220, b + 2))}
              className="w-6 h-6 rounded border flex items-center justify-center text-xs font-bold hover:bg-white/10 cursor-pointer"
              style={{ borderColor: 'var(--border)' }}
            >
              +
            </button>
          </div>
        </header>

        {/* Real-Time Waveform & Step Sequencer Display */}
        <div className="p-4 space-y-3">
          {/* Audio Visualizer Screen */}
          <div className="p-3 rounded-2xl border relative overflow-hidden flex flex-col justify-between h-28" style={{ borderColor: 'var(--border)', background: '#07030A' }}>
            <div className="flex justify-between items-center text-[10px] z-10 font-mono">
              <span className="text-emerald-400 font-bold">● DSP ENGINE ACTIVE</span>
              <span style={{ color: 'var(--text-secondary)' }}>44.1kHz / 24-BIT</span>
            </div>

            {/* Jumping Spectrum Bars */}
            <div className="flex items-end justify-between gap-1 h-12 z-10 px-1">
              {[40, 75, 90, 60, 30, 85, 100, 65, 45, 95, 80, 50, 70, 90, 40, 60, 85, 30].map((val, i) => {
                const height = isPlaying ? Math.min(100, Math.max(15, (val * ((currentStep % 4) + 1)) / 3)) : 10
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-t transition-all duration-75"
                    style={{
                      height: `${height}%`,
                      background: i % 2 === 0 ? 'var(--accent)' : '#06B6D4',
                      boxShadow: height > 60 ? '0 0 6px var(--accent)' : 'none',
                    }}
                  ></div>
                )
              })}
            </div>

            {/* Glowing Scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-500/5 to-transparent pointer-events-none"></div>

            <div className="flex justify-between items-center text-[9px] z-10 font-mono" style={{ color: 'var(--text-secondary)' }}>
              <span>MASTER: -1.2 dB</span>
              <span>PAT: A [16 BARS]</span>
            </div>
          </div>

          {/* Running LED Step Sequencer Ribbon */}
          <div className="p-2.5 rounded-2xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="flex justify-between items-center text-[9px] uppercase font-bold mb-1.5 px-1" style={{ color: 'var(--text-secondary)' }}>
              <span>8-Step Beat Tracker</span>
              <span style={{ color: 'var(--accent)' }}>STEP: {currentStep + 1}/8</span>
            </div>
            <div className="grid grid-cols-8 gap-1.5">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((step) => {
                const isCurrent = currentStep === step && isPlaying
                const isKickBeat = step === 0 || step === 4
                return (
                  <div
                    key={step}
                    className="h-3 rounded-md transition-all duration-75"
                    style={{
                      background: isCurrent ? '#FFF' : isKickBeat ? 'var(--accent)' : 'var(--bg-card)',
                      boxShadow: isCurrent ? '0 0 10px #FFF' : 'none',
                    }}
                  ></div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 16-Pad Drum Grid (4x4) */}
        <div className="px-4 flex-1">
          <div className="grid grid-cols-4 gap-2.5">
            {DRUM_PADS.map((pad) => {
              const isActive = activePad === pad.id
              return (
                <button
                  key={pad.id}
                  onClick={() => triggerPad(pad.id)}
                  className={`aspect-square rounded-2xl border p-2 flex flex-col justify-between text-left transition-all cursor-pointer relative overflow-hidden active:scale-95 ${isActive ? 'pad-active' : ''}`}
                  style={{
                    borderColor: isActive ? '#FFF' : 'var(--border)',
                    background: isActive ? pad.color : 'var(--bg-card)',
                    boxShadow: isActive ? `0 0 16px ${pad.color}` : 'none',
                  }}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[9px] font-bold opacity-60">#{pad.id}</span>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: pad.color }}></span>
                  </div>

                  <div>
                    <span className="font-black text-[10px] leading-tight block truncate text-white">{pad.name}</span>
                    <span className="text-[8px] font-medium block truncate opacity-70" style={{ color: 'var(--text-secondary)' }}>
                      {pad.sub}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Filter Cutoff & FX Knobs Bar */}
        <div className="px-4 mt-4">
          <div className="p-3 rounded-2xl border space-y-2" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="font-bold" style={{ color: 'var(--text-secondary)' }}>
                LPF CUTOFF: {filterCutoff * 30}Hz
              </span>
              <span style={{ color: 'var(--accent)' }}>RES: 34% · DRIVE: +4dB</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={filterCutoff}
              onChange={(e) => setFilterCutoff(Number(e.target.value))}
              className="w-full accent-fuchsia-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Fixed Transport Bar */}
        <div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] border-t px-6 py-3.5 z-40 backdrop-blur-md flex items-center justify-between"
          style={{ borderColor: 'var(--border)', background: 'rgba(13, 6, 18, 0.95)' }}
        >
          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white flex items-center gap-2 cursor-pointer shadow-lg transition-transform active:scale-95"
            style={{
              background: isPlaying ? '#EF4444' : 'var(--accent)',
              boxShadow: isPlaying ? '0 0 12px rgba(239,68,68,0.4)' : '0 0 12px var(--accent)',
            }}
          >
            <span>{isPlaying ? '⏸ PAUSE' : '▶ PLAY'}</span>
          </button>

          {/* Record Button */}
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold cursor-pointer hover:bg-white/5 active:scale-95" style={{ borderColor: 'var(--border)' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span>REC</span>
          </button>

          {/* Pattern Switch */}
          <div className="flex rounded-lg border text-xs font-bold overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <button className="px-2.5 py-1.5 bg-white/10 text-white cursor-pointer">PTN A</button>
            <button className="px-2.5 py-1.5 hover:bg-white/5 text-zinc-400 cursor-pointer">PTN B</button>
          </div>
        </div>
      </div>
    </>
  )
}
