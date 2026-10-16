import { useState, useEffect } from 'react'

type Variant = 'violet' | 'cyan' | 'emerald'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#8B5CF6': 'violet',
  '#06B6D4': 'cyan',
  '#10B981': 'emerald',
}

const THEMES: Record<Variant, Record<string, string>> = {
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

interface LayerNode {
  id: string
  name: string
  type: string
  params: string
  status: 'ACTIVE' | 'FROZEN' | 'PRUNED'
  activation: string
}

const LAYERS: LayerNode[] = [
  { id: 'L-01', name: 'Token Embedding', type: 'Embed Layer', params: '131M', status: 'ACTIVE', activation: 'Linear' },
  { id: 'L-02', name: 'RoPE Rotary Position', type: 'Positional', params: '0', status: 'ACTIVE', activation: 'Sin/Cos' },
  { id: 'L-03', name: 'FlashAttention-3', type: '32 Heads / MoA', params: '840M', status: 'ACTIVE', activation: 'Softmax' },
  { id: 'L-04', name: 'SwiGLU FeedForward', type: 'Gated FFN', params: '1.42B', status: 'ACTIVE', activation: 'SiLU' },
  { id: 'L-05', name: 'MoE Router (8 Experts)', type: 'Top-2 Sparse', params: '620M', status: 'ACTIVE', activation: 'Gating' },
  { id: 'L-06', name: 'RMSNorm & Vocab Head', type: 'Linear Projection', params: '260M', status: 'ACTIVE', activation: 'Softmax' },
]

export function NeuralStudio({ variant = 'violet' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [isTraining, setIsTraining] = useState(true)
  const [selectedLayer, setSelectedLayer] = useState('L-03')
  const [learningRate, setLearningRate] = useState('1.4e-4')
  const [batchSize, setBatchSize] = useState('512')
  const [precision, setPrecision] = useState<'BF16' | 'FP8'>('BF16')
  const [testPrompt, setTestPrompt] = useState('Autonomous multi-agent routing...')
  const [generatedOutput, setGeneratedOutput] = useState('...converged with 99.4% intent fidelity across tensor channels.')

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

  const runProbe = () => {
    setGeneratedOutput(`...probe analyzed: ${testPrompt.slice(0, 20)} [Perplexity: 1.38, Latency: 2.4ms]`)
  }

  return (
    <>
      <style>{`
        .neural-wrapper { font-family: ${customFont || "'JetBrains Mono', 'Fira Code', monospace"}; }
        .neural-wrapper * { box-sizing: border-box; }
        .neural-wrapper ::-webkit-scrollbar { width: 4px; height: 4px; }
        .neural-wrapper ::-webkit-scrollbar-track { background: var(--bg-primary); }
        .neural-wrapper ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
      `}</style>
      <div
        className="neural-wrapper min-h-screen flex flex-col select-none"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Neural Cluster Header */}
        <header className="border-b px-6 py-2.5 flex items-center justify-between text-xs font-mono" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}></span>
              <span className="font-black text-sm tracking-wider uppercase">SYNAPSE-X // NEURAL LAB</span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
              <span>MODEL: <strong className="text-white">TRANSFORMER-MoE-4B</strong></span>
              <span>CLUSTER: <strong className="text-white">8x H100 SXM5</strong></span>
              <span>EPOCH: <strong style={{ color: 'var(--accent)' }}>184 / 300</strong></span>
              <span>THROUGHPUT: <strong className="text-emerald-400">184,200 tok/s</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded border text-[11px] font-bold" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>LOSS:</span>
              <span className="text-emerald-400 font-mono">0.0482 (▼ 94.2%)</span>
            </div>

            <button
              onClick={() => setIsTraining(!isTraining)}
              className="px-3.5 py-1 rounded font-bold text-xs cursor-pointer tracking-wider uppercase transition-all shadow"
              style={{
                background: isTraining ? '#10B981' : 'var(--accent)',
                color: '#FFF',
                boxShadow: '0 0 12px var(--accent-light)',
              }}
            >
              {isTraining ? '● TRAINING ACTIVE' : '❚❚ PAUSED'}
            </button>
          </div>
        </header>

        {/* 3-Column Studio Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Model Layer Pipeline & Hyperparameters (Cols 3) */}
          <aside className="lg:col-span-3 border-r p-4 flex flex-col justify-between space-y-4 overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold tracking-widest uppercase text-[11px]" style={{ color: 'var(--accent)' }}>
                  [TENSOR LAYERS]
                </span>
                <span className="text-[10px] text-zinc-400">TOTAL: 3.28B PARAMS</span>
              </div>

              {/* Layer Nodes Stack */}
              <div className="space-y-2">
                {LAYERS.map((layer) => {
                  const isSelected = selectedLayer === layer.id
                  return (
                    <div
                      key={layer.id}
                      onClick={() => setSelectedLayer(layer.id)}
                      className="p-2.5 rounded-xl border transition-all cursor-pointer space-y-1"
                      style={{
                        borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                        background: isSelected ? 'var(--bg-card)' : 'transparent',
                        boxShadow: isSelected ? '0 0 10px var(--accent-light)' : 'none',
                      }}
                    >
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold" style={{ color: isSelected ? 'var(--accent)' : 'white' }}>
                          {layer.id} · {layer.name}
                        </span>
                        <span className="text-zinc-500">{layer.params}</span>
                      </div>
                      <div className="flex justify-between text-[9px]" style={{ color: 'var(--text-secondary)' }}>
                        <span>{layer.type}</span>
                        <span className="font-mono text-zinc-400">ACT: {layer.activation}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Hyperparameter Controls */}
              <div className="p-3 rounded-xl border space-y-2.5 mt-4" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                  HYPERPARAMETERS TUNING
                </span>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>LEARNING RATE</span>
                    <input
                      type="text"
                      value={learningRate}
                      onChange={(e) => setLearningRate(e.target.value)}
                      className="w-20 px-2 py-0.5 rounded border text-right bg-black/40 text-[11px]"
                      style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>GLOBAL BATCH</span>
                    <input
                      type="text"
                      value={batchSize}
                      onChange={(e) => setBatchSize(e.target.value)}
                      className="w-20 px-2 py-0.5 rounded border text-right bg-black/40 text-[11px]"
                      style={{ borderColor: 'var(--border)' }}
                    />
                  </div>

                  <div className="flex justify-between items-center pt-1 border-t" style={{ borderColor: 'var(--border)' }}>
                    <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>FLOAT FORMAT</span>
                    <div className="flex gap-1 text-[10px]">
                      {(['BF16', 'FP8'] as const).map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setPrecision(fmt)}
                          className="px-2 py-0.5 rounded border font-bold cursor-pointer"
                          style={{
                            background: precision === fmt ? 'var(--accent)' : 'transparent',
                            borderColor: precision === fmt ? 'transparent' : 'var(--border)',
                            color: precision === fmt ? '#FFF' : 'var(--text-secondary)',
                          }}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkpoint Status */}
            <div className="pt-2 border-t text-[11px] flex justify-between items-center" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              <span>CHECKPOINT: <strong>chkpt-step-184000.bin</strong></span>
              <span className="text-emerald-400 font-bold">SAVED</span>
            </div>
          </aside>

          {/* Center Column: Loss Graph & Attention Activation Heatmap (Cols 6) */}
          <main className="lg:col-span-6 flex flex-col p-4 space-y-3 overflow-hidden">
            {/* Real-Time Loss Curve Monitor */}
            <div className="aspect-[16/9] w-full rounded-2xl border p-4 relative overflow-hidden flex flex-col justify-between shadow-2xl" style={{ borderColor: 'var(--border)', background: '#05030A' }}>
              <div className="flex justify-between items-center text-xs font-mono z-10">
                <div>
                  <span className="font-bold text-white uppercase text-[11px] block">TRAINING & VALIDATION DIVERGENCE</span>
                  <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>CROSS-ENTROPY LOSS VS STEP</span>
                </div>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }}></span> Train Loss</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Val Acc (98.4%)</span>
                </div>
              </div>

              {/* Simulated Loss Curve Graphic */}
              <div className="h-44 w-full relative my-auto">
                <svg className="w-full h-full" viewBox="0 0 500 150" fill="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                  {/* Gradient Area under Loss */}
                  <defs>
                    <linearGradient id="lossGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0 130 Q 80 110 160 70 T 320 35 T 500 20 L 500 150 L 0 150 Z" fill="url(#lossGrad)" />

                  {/* Loss Line */}
                  <path d="M 0 130 Q 80 110 160 70 T 320 35 T 500 20" stroke="var(--accent)" strokeWidth="3" />

                  {/* Validation Accuracy Line (inverse) */}
                  <path d="M 0 140 Q 90 90 200 65 T 380 40 T 500 25" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" />

                  {/* Pulsing checkpoint point */}
                  <circle cx="500" cy="20" r="4" fill="#FFF" />
                </svg>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono z-10" style={{ color: 'var(--text-secondary)' }}>
                <span>STEP 0 (INIT: 2.84)</span>
                <span>STEP 90,000 (0.42)</span>
                <span className="font-bold text-white">STEP 184,000 (CUR: 0.0482)</span>
              </div>
            </div>

            {/* Attention Layer Activation Heatmap (8 Heads Matrix) */}
            <div className="p-3.5 rounded-xl border space-y-2" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-[10px] uppercase" style={{ color: 'var(--accent)' }}>
                  HEAD ATTENTION WEIGHTS TENSOR (HEADS H0-H7)
                </span>
                <span className="text-[10px] text-zinc-400">LAYER {selectedLayer} ACTIVATION</span>
              </div>

              <div className="grid grid-cols-8 gap-1.5 h-10">
                {[0.92, 0.44, 0.81, 0.28, 0.74, 0.95, 0.52, 0.88].map((score, i) => (
                  <div
                    key={i}
                    className="rounded-lg flex flex-col justify-between p-1 text-[8px] font-mono font-bold transition-all hover:scale-105"
                    style={{
                      background: `rgba(139, 92, 246, ${Math.max(0.15, score)})`,
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: score > 0.6 ? '#FFF' : 'var(--text-secondary)',
                    }}
                  >
                    <span>H{i}</span>
                    <span>{(score * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-Time Live Inference Probe */}
            <div className="p-3.5 rounded-xl border space-y-2" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-[10px] uppercase text-white">LIVE ZERO-SHOT INFERENCE PROBE</span>
                <span className="text-[10px] text-emerald-400 font-bold">GREEDY DECODE</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={testPrompt}
                  onChange={(e) => setTestPrompt(e.target.value)}
                  placeholder="Enter embedding prompt..."
                  className="flex-1 px-3 py-1.5 rounded-lg border text-xs font-mono bg-black/40 text-white outline-none"
                  style={{ borderColor: 'var(--border)' }}
                />
                <button
                  onClick={runProbe}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white cursor-pointer shadow-sm transition-transform active:scale-95"
                  style={{ background: 'var(--accent)' }}
                >
                  Generate
                </button>
              </div>

              <div className="p-2 rounded-lg bg-black/50 border font-mono text-[10px] text-zinc-300" style={{ borderColor: 'var(--border)' }}>
                {generatedOutput}
              </div>
            </div>
          </main>

          {/* Right Column: GPU Hardware Cluster & Telemetry (Cols 3) */}
          <aside className="lg:col-span-3 border-l p-4 flex flex-col justify-between space-y-4 overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold tracking-widest uppercase text-[11px]" style={{ color: 'var(--accent)' }}>
                  [COMPUTE HARDWARE]
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">ALL 8 NODES ONLINE</span>
              </div>

              {/* VRAM Telemetry */}
              <div className="p-3 rounded-xl border space-y-2 text-xs font-mono" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <div className="flex justify-between items-center text-[10px]">
                  <span>HBM3 VRAM ALLOCATION</span>
                  <span className="font-bold" style={{ color: 'var(--accent)' }}>68.4 / 80.0 GB (85%)</span>
                </div>
                <div className="w-full h-2 rounded bg-black/50 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                  <div className="h-full rounded" style={{ width: '85%', background: 'var(--accent)' }}></div>
                </div>
                <div className="flex justify-between text-[9px]" style={{ color: 'var(--text-secondary)' }}>
                  <span>BANDWIDTH: 3.35 TB/s</span>
                  <span>ECC: 0 ERRORS</span>
                </div>
              </div>

              {/* GPU Load Gauges */}
              <div className="space-y-2 text-xs font-mono">
                {[
                  { name: 'GPU Tensor Cores', pct: 94 },
                  { name: 'NVLink Interconnect (400G)', pct: 88 },
                  { name: 'Host PCIe Gen5 Bus', pct: 42 },
                ].map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
                      <span className="font-bold text-white">{item.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded bg-black/40 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                      <div className="h-full rounded bg-emerald-400" style={{ width: `${item.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Export / Quantization Suite */}
              <div className="p-3 rounded-xl border space-y-2 mt-4" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                  EXPORT WEIGHTS
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                  <button className="py-1.5 px-2 rounded border text-center hover:bg-white/5 cursor-pointer text-[10px]" style={{ borderColor: 'var(--border)' }}>
                    Export ONNX
                  </button>
                  <button className="py-1.5 px-2 rounded border text-center hover:bg-white/5 cursor-pointer text-[10px]" style={{ borderColor: 'var(--border)' }}>
                    GGUF Q4_K_M
                  </button>
                </div>
              </div>
            </div>

            {/* Cluster Health Log */}
            <div className="p-3 rounded-xl border font-mono text-[9px] space-y-1 bg-black/60" style={{ borderColor: 'var(--border)' }}>
              <div className="font-bold text-zinc-400 pb-1 border-b border-white/10">[CLUSTER DAEMON]</div>
              <div className="text-emerald-400">14:12:02 All 8 SXM5 ranks synchronized</div>
              <div className="text-zinc-400">14:12:15 Gradient accumulation step #512</div>
              <div className="text-cyan-400">14:12:30 Autograd cache flush complete</div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
