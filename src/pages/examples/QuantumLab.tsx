import { useState, useEffect } from 'react'

type Variant = 'indigo' | 'cyan' | 'emerald'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#6366F1': 'indigo',
  '#06B6D4': 'cyan',
  '#10B981': 'emerald',
}

const THEMES: Record<Variant, Record<string, string>> = {
  indigo: {
    '--accent': '#6366F1',
    '--accent-hover': '#4F46E5',
    '--accent-light': 'rgba(99, 102, 241, 0.16)',
    '--bg-primary': '#080612',
    '--bg-secondary': '#100D22',
    '--bg-card': '#191433',
    '--border': '#2B2354',
    '--text-primary': '#F8FAFC',
    '--text-secondary': '#968DB8',
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

export function QuantumLab({ variant = 'indigo' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [activeAlgorithm, setActiveAlgorithm] = useState<'Bell' | 'Grover' | 'Teleport'>('Bell')
  const [shotsCount, setShotsCount] = useState(10000)
  const [isSimulating, setIsSimulating] = useState(false)

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

  const runSimulation = () => {
    setIsSimulating(true)
    setTimeout(() => setIsSimulating(false), 600)
  }

  return (
    <>
      <style>{`
        .quantum-wrapper { font-family: ${customFont || "'JetBrains Mono', 'Fira Code', monospace"}; }
        .quantum-wrapper * { box-sizing: border-box; }
        .quantum-wrapper ::-webkit-scrollbar { width: 4px; height: 4px; }
        .quantum-wrapper ::-webkit-scrollbar-track { background: var(--bg-primary); }
        .quantum-wrapper ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
      `}</style>
      <div
        className="quantum-wrapper min-h-screen flex flex-col select-none"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Quantum Architecture Bar */}
        <header className="border-b px-6 py-2.5 flex items-center justify-between text-xs font-mono" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}></span>
              <span className="font-black text-sm tracking-wider uppercase">Q-SYS 128 // TRANSMON QPU</span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
              <span>DILUTION TEMP: <strong className="text-cyan-400">14.2 mK</strong></span>
              <span>2-QUBIT FIDELITY: <strong className="text-emerald-400">99.85%</strong></span>
              <span>COHERENCE T1: <strong className="text-white">142.8 µs</strong></span>
              <span>VOLUME: <strong style={{ color: 'var(--accent)' }}>QV 2^18</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded border text-[11px] font-bold" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>SHOTS:</span>
              <span className="text-white font-mono">{shotsCount.toLocaleString()}</span>
            </div>

            <button
              onClick={runSimulation}
              className="px-3.5 py-1 rounded font-bold text-xs cursor-pointer tracking-wider uppercase transition-all shadow"
              style={{
                background: 'var(--accent)',
                color: '#FFF',
                boxShadow: '0 0 12px var(--accent-light)',
              }}
            >
              {isSimulating ? '⚡ COLLAPSING WAVE...' : '▶ RUN CIRCUIT'}
            </button>
          </div>
        </header>

        {/* 3-Column Quantum Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Quantum Gates Toolbox & Presets (Cols 3) */}
          <aside className="lg:col-span-3 border-r p-4 flex flex-col justify-between space-y-4 overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold tracking-widest uppercase text-[11px]" style={{ color: 'var(--accent)' }}>
                  [GATES TOOLBOX]
                </span>
                <span className="text-[10px] text-zinc-400">UNITARY MATRICES</span>
              </div>

              {/* Quantum Gates Grid */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono font-bold">
                {[
                  { name: 'H', desc: 'Hadamard', color: '#6366F1' },
                  { name: 'X', desc: 'Pauli-X', color: '#06B6D4' },
                  { name: 'Z', desc: 'Pauli-Z', color: '#06B6D4' },
                  { name: 'Y', desc: 'Pauli-Y', color: '#06B6D4' },
                  { name: 'S', desc: 'Phase π/2', color: '#10B981' },
                  { name: 'T', desc: 'Phase π/4', color: '#10B981' },
                  { name: 'CX', desc: 'CNOT', color: '#F59E0B' },
                  { name: 'M', desc: 'Measure', color: '#EF4444' },
                ].map((gate) => (
                  <div
                    key={gate.name}
                    className="p-2 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
                  >
                    <span className="text-base font-black" style={{ color: gate.color }}>{gate.name}</span>
                    <span className="text-[8px] opacity-70 mt-0.5" style={{ color: 'var(--text-secondary)' }}>{gate.desc}</span>
                  </div>
                ))}
              </div>

              {/* Algorithm Presets */}
              <div className="p-3.5 rounded-xl border space-y-2 mt-4" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                  CIRCUIT PRESETS
                </span>

                <div className="space-y-1.5 text-xs font-mono">
                  {[
                    { id: 'Bell', title: 'Bell State |Φ+⟩ (Entangled Pair)', qubits: '2 Qubits' },
                    { id: 'Grover', title: "Grover's Quantum Search", qubits: '3 Qubits' },
                    { id: 'Teleport', title: 'Quantum State Teleportation', qubits: '3 Qubits' },
                  ].map((algo) => (
                    <button
                      key={algo.id}
                      onClick={() => setActiveAlgorithm(algo.id as any)}
                      className="w-full p-2 rounded-lg border text-left transition-all cursor-pointer flex justify-between items-center"
                      style={{
                        borderColor: activeAlgorithm === algo.id ? 'var(--accent)' : 'transparent',
                        background: activeAlgorithm === algo.id ? 'var(--accent-light)' : 'rgba(0,0,0,0.2)',
                        color: activeAlgorithm === algo.id ? '#FFF' : 'var(--text-secondary)',
                      }}
                    >
                      <div className="truncate max-w-[170px]">
                        <span className="block font-bold text-white text-[11px] truncate">{algo.title}</span>
                        <span className="text-[9px] text-zinc-400">{algo.qubits}</span>
                      </div>
                      <span className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>SELECT</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Shots Sample Settings */}
            <div className="pt-2 border-t text-[11px] font-mono flex justify-between items-center" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              <span>SHOT SAMPLES:</span>
              <div className="flex gap-1">
                {[1000, 5000, 10000].map((s) => (
                  <button
                    key={s}
                    onClick={() => setShotsCount(s)}
                    className="px-1.5 py-0.5 rounded border text-[9px] cursor-pointer"
                    style={{
                      background: shotsCount === s ? 'var(--accent)' : 'transparent',
                      borderColor: shotsCount === s ? 'transparent' : 'var(--border)',
                      color: shotsCount === s ? '#FFF' : 'var(--text-secondary)',
                    }}
                  >
                    {s / 1000}k
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Center Column: Quantum Circuit Wire Grid & Bloch Sphere Simulation (Cols 6) */}
          <main className="lg:col-span-6 flex flex-col p-4 space-y-3 overflow-hidden">
            {/* Interactive Quantum Wire Circuit Grid */}
            <div className="p-4 rounded-2xl border space-y-3 shadow-xl" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-white uppercase text-[11px]">
                  CIRCUIT CANVAS // {activeAlgorithm.toUpperCase()} PROTOCOL
                </span>
                <span className="text-[10px]" style={{ color: 'var(--accent)' }}>DEPTH: 6 CYCLES</span>
              </div>

              {/* Circuit Wires */}
              <div className="space-y-4 py-2 font-mono">
                {/* Qubit 0 */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-cyan-400 w-8">|q0⟩</span>
                  <div className="flex-1 h-[2px] bg-white/20 relative flex items-center justify-around">
                    <span className="px-2 py-1 rounded bg-indigo-600 font-black text-xs text-white shadow">H</span>
                    <span className="w-3 h-3 rounded-full bg-amber-400 z-10 shadow"></span>
                    <span className="px-2 py-1 rounded bg-red-600 font-black text-xs text-white shadow">M</span>
                  </div>
                </div>

                {/* Qubit 1 */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-cyan-400 w-8">|q1⟩</span>
                  <div className="flex-1 h-[2px] bg-white/20 relative flex items-center justify-around">
                    <span className="text-[10px] text-zinc-500">—</span>
                    <span className="w-5 h-5 rounded-full border-2 border-amber-400 bg-amber-500/20 flex items-center justify-center text-amber-300 font-black text-xs shadow">⊕</span>
                    <span className="px-2 py-1 rounded bg-red-600 font-black text-xs text-white shadow">M</span>
                  </div>
                </div>

                {/* Qubit 2 */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-cyan-400 w-8">|q2⟩</span>
                  <div className="flex-1 h-[2px] bg-white/20 relative flex items-center justify-around">
                    <span className="px-2 py-1 rounded bg-cyan-600 font-black text-xs text-white shadow">X</span>
                    <span className="px-2 py-1 rounded bg-emerald-600 font-black text-xs text-white shadow">T</span>
                    <span className="px-2 py-1 rounded bg-red-600 font-black text-xs text-white shadow">M</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t flex justify-between text-[10px] font-mono text-zinc-400" style={{ borderColor: 'var(--border)' }}>
                <span>INITIAL: |000⟩</span>
                <span className="text-emerald-400">OUTPUT: (|00⟩ + |11⟩) / √2</span>
              </div>
            </div>

            {/* 3D Bloch Sphere & Collapse Histogram Dual Readout */}
            <div className="grid grid-cols-2 gap-3 flex-1 overflow-hidden">
              {/* Bloch Sphere State Vector */}
              <div className="p-3.5 rounded-2xl border flex flex-col justify-between items-center text-center relative overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  BLOCH SPHERE PROJECTION
                </span>

                {/* Vector Sphere Graphic */}
                <div className="w-32 h-32 rounded-full border border-dashed relative flex items-center justify-center my-2" style={{ borderColor: 'var(--accent)' }}>
                  {/* Axis lines */}
                  <div className="w-full h-[1px] absolute bg-white/20"></div>
                  <div className="h-full w-[1px] absolute bg-white/20"></div>
                  {/* State Ray Vector */}
                  <div
                    className="w-16 h-[2px] absolute origin-left top-1/2 left-1/2"
                    style={{
                      transform: 'rotate(-45deg)',
                      background: 'var(--accent)',
                      boxShadow: '0 0 8px var(--accent)',
                    }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full absolute -right-1 -top-1" style={{ background: 'var(--accent)' }}></div>
                  </div>
                  <span className="text-[9px] font-bold text-white z-10 bg-black/60 px-1 rounded">|ψ⟩ STATE</span>
                </div>

                <div className="font-mono text-[10px]" style={{ color: 'var(--accent)' }}>
                  θ = 0.50π · φ = 0.00π
                </div>
              </div>

              {/* State Collapse Histogram */}
              <div className="p-3.5 rounded-2xl border flex flex-col justify-between" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="font-bold text-white">MEASUREMENT BASIS</span>
                  <span className="text-emerald-400">10k SHOTS</span>
                </div>

                {/* Histogram Bars */}
                <div className="space-y-2 font-mono text-xs my-auto">
                  <div>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="text-white font-bold">|00⟩</span>
                      <span className="text-cyan-400 font-bold">49.8% (4,982)</span>
                    </div>
                    <div className="w-full h-2 rounded bg-black/50 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                      <div className="h-full rounded bg-cyan-400 transition-all duration-300" style={{ width: '49.8%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="text-white font-bold">|11⟩</span>
                      <span className="text-indigo-400 font-bold">50.1% (5,014)</span>
                    </div>
                    <div className="w-full h-2 rounded bg-black/50 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                      <div className="h-full rounded transition-all duration-300" style={{ width: '50.1%', background: 'var(--accent)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="text-zinc-500 font-bold">|01⟩ / |10⟩ (NOISE)</span>
                      <span className="text-zinc-500">0.1% (4)</span>
                    </div>
                    <div className="w-full h-1.5 rounded bg-black/50 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                      <div className="h-full rounded bg-red-500/40" style={{ width: '1%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="text-[9px] font-mono text-zinc-400 text-center">
                  ENTANGLEMENT VERIFIED [BELL INEQUALITY S = 2.82]
                </div>
              </div>
            </div>
          </main>

          {/* Right Column: Cryo Dilution Telemetry & Microwave Calibration (Cols 3) */}
          <aside className="lg:col-span-3 border-l p-4 flex flex-col justify-between space-y-4 overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold tracking-widest uppercase text-[11px]" style={{ color: 'var(--accent)' }}>
                  [CRYO DILUTION STAGES]
                </span>
                <span className="text-[10px] text-cyan-400 font-bold">STABLE</span>
              </div>

              {/* Thermal Stages Breakdown */}
              <div className="space-y-2 text-xs font-mono">
                {[
                  { stage: 'Vacuum Flange', temp: '300.0 K (Room)', status: 'NOMINAL' },
                  { stage: '50K Thermal Shield', temp: '48.2 K', status: 'NOMINAL' },
                  { stage: '4K Pulse Tube Still', temp: '3.82 K', status: 'NOMINAL' },
                  { stage: '100mK Cold Plate', temp: '94.0 mK', status: 'NOMINAL' },
                  { stage: 'Mixing Chamber (QPU)', temp: '14.2 mK', status: 'CRYO LOCKED' },
                ].map((s) => (
                  <div key={s.stage} className="p-2 rounded-lg border flex justify-between items-center text-[10px]" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                    <div>
                      <span className="font-bold text-white block">{s.stage}</span>
                      <span className="text-cyan-300">{s.temp}</span>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-400">{s.status}</span>
                  </div>
                ))}
              </div>

              {/* Microwave Pulse Frequency */}
              <div className="p-3 rounded-xl border space-y-1.5 font-mono text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                  MICROWAVE DRIVER FREQUENCY
                </span>
                <div className="flex justify-between text-[11px]">
                  <span>DRIVE FREQ:</span>
                  <span className="font-bold text-white">5.248 GHz</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>READOUT RESONATOR:</span>
                  <span className="font-bold text-white">7.180 GHz</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>PULSE DURATION:</span>
                  <span className="font-bold text-white">20.0 ns (Gaussian)</span>
                </div>
              </div>
            </div>

            {/* QPU Health Monitor */}
            <div className="p-3 rounded-xl border font-mono text-[9px] space-y-1 bg-black/60" style={{ borderColor: 'var(--border)' }}>
              <div className="font-bold text-zinc-400 pb-1 border-b border-white/10">[QPU LOG STREAM]</div>
              <div className="text-emerald-400">15:02:12 Phase drift autocalibrated</div>
              <div className="text-zinc-400">15:02:18 Cryo pump cycle 14.2mK steady</div>
              <div className="text-cyan-400">15:02:29 Shot batch #1042 queued</div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
