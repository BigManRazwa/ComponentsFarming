import { useState, useEffect } from 'react'

type Variant = 'cyan' | 'amber' | 'emerald'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#06B6D4': 'cyan',
  '#F59E0B': 'amber',
  '#10B981': 'emerald',
}

const THEMES: Record<Variant, Record<string, string>> = {
  cyan: {
    '--accent': '#06B6D4',
    '--accent-hover': '#0891B2',
    '--accent-light': 'rgba(6, 182, 212, 0.16)',
    '--bg-primary': '#04080D',
    '--bg-secondary': '#0A121A',
    '--bg-card': '#101D2B',
    '--border': '#1A3044',
    '--text-primary': '#F0FDFA',
    '--text-secondary': '#6488A4',
  },
  amber: {
    '--accent': '#F59E0B',
    '--accent-hover': '#D97706',
    '--accent-light': 'rgba(245, 158, 11, 0.16)',
    '--bg-primary': '#0A0804',
    '--bg-secondary': '#141009',
    '--bg-card': '#201A0E',
    '--border': '#362B18',
    '--text-primary': '#FFFBEB',
    '--text-secondary': '#9B855D',
  },
  emerald: {
    '--accent': '#10B981',
    '--accent-hover': '#059669',
    '--accent-light': 'rgba(16, 185, 129, 0.16)',
    '--bg-primary': '#040B07',
    '--bg-secondary': '#0A160F',
    '--bg-card': '#102218',
    '--border': '#1A3B2A',
    '--text-primary': '#F0FDF4',
    '--text-secondary': '#5A9474',
  },
}

export function DroneMissionControl({ variant = 'cyan' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [isArmed, setIsArmed] = useState(true)
  const [visionMode, setVisionMode] = useState<'4K' | 'FLIR' | 'NVG'>('4K')
  const [selectedWP, setSelectedWP] = useState('WP-03')
  const [radarDegree, setRadarDegree] = useState(0)

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

  // Rotate radar beam for visual coolness
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarDegree((prev) => (prev + 4) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const theme = THEMES[currentTheme]
  const cssVars = Object.entries(theme).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Record<string, string>)

  return (
    <>
      <style>{`
        .drone-wrapper { font-family: ${customFont || "'JetBrains Mono', 'Fira Code', monospace"}; }
        .drone-wrapper * { box-sizing: border-box; }
        .drone-wrapper ::-webkit-scrollbar { width: 4px; height: 4px; }
        .drone-wrapper ::-webkit-scrollbar-track { background: var(--bg-primary); }
        .drone-wrapper ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.3; }
        }
        .hud-scanline {
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
          background-size: 100% 3px, 4px 100%;
        }
      `}</style>
      <div
        className="drone-wrapper min-h-screen flex flex-col select-none"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Telemetry Status Header */}
        <header className="border-b px-6 py-2.5 flex items-center justify-between text-xs font-mono" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}></span>
              <span className="font-black text-sm tracking-widest uppercase">APEX-07 // RECON UAV</span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
              <span>LAT: <strong className="text-white">37°46'29.8"N</strong></span>
              <span>LON: <strong className="text-white">122°25'09.8"W</strong></span>
              <span>SAT: <strong className="text-white">18 GNSS</strong></span>
              <span>FREQ: <strong className="text-white">5.825 GHz</strong></span>
              <span>LATENCY: <strong className="text-white">3.8 ms</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded border text-[11px] font-bold" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>SIGNAL:</span>
              <span style={{ color: 'var(--accent)' }}>-42 dBm [99.8%]</span>
            </div>

            <button
              onClick={() => setIsArmed(!isArmed)}
              className="px-3.5 py-1 rounded font-bold text-xs cursor-pointer tracking-wider uppercase transition-all shadow"
              style={{
                background: isArmed ? '#EF4444' : 'var(--accent)',
                color: '#FFF',
                boxShadow: isArmed ? '0 0 12px rgba(239,68,68,0.4)' : 'none',
              }}
            >
              {isArmed ? 'ARMED [LIVE]' : 'DISARMED'}
            </button>
          </div>
        </header>

        {/* Main 3-Column Tactical Display */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Flight Avionics & Telemetry (Cols 3) */}
          <aside className="lg:col-span-3 border-r p-4 flex flex-col justify-between space-y-4 overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            {/* Primary Telemetry Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold tracking-widest uppercase text-[11px]" style={{ color: 'var(--accent)' }}>
                  [FLIGHT TELEMETRY]
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">STABLE</span>
              </div>

              {/* Artificial Horizon Mockup */}
              <div className="p-3 rounded-xl border relative overflow-hidden flex flex-col items-center justify-center h-40" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <div className="absolute top-2 left-2 text-[10px] text-zinc-400">PITCH: +4.2°</div>
                <div className="absolute top-2 right-2 text-[10px] text-zinc-400">ROLL: -1.8°</div>

                {/* Horizon Circle */}
                <div className="w-28 h-28 rounded-full border border-dashed relative flex items-center justify-center" style={{ borderColor: 'var(--border)' }}>
                  <div className="w-full h-[1px] absolute" style={{ background: 'var(--accent)' }}></div>
                  <div className="w-12 h-[2px] absolute bg-amber-400"></div>
                  <div className="h-6 w-[1px] absolute" style={{ background: 'var(--accent)' }}></div>
                  <span className="text-[9px] font-bold text-white z-10 bg-black/60 px-1 rounded">HORIZON</span>
                </div>
              </div>

              {/* Altitude & Speed Dual Readout */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl border space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                  <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                    ALTITUDE AGL
                  </span>
                  <div className="text-2xl font-black font-mono">1,240 <span className="text-xs font-normal" style={{ color: 'var(--text-secondary)' }}>m</span></div>
                  <div className="text-[10px] text-emerald-400">▲ +3.4 m/s climb</div>
                </div>

                <div className="p-3 rounded-xl border space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                  <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                    GROUND SPEED
                  </span>
                  <div className="text-2xl font-black font-mono">84.2 <span className="text-xs font-normal" style={{ color: 'var(--text-secondary)' }}>km/h</span></div>
                  <div className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>HEADWIND: 12 kt</div>
                </div>
              </div>

              {/* Power / LiPo Gauge */}
              <div className="p-3.5 rounded-xl border space-y-2 text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold">6S LiPo SMART PACK</span>
                  <span className="font-mono font-bold" style={{ color: 'var(--accent)' }}>88% · 24.6V</span>
                </div>
                <div className="w-full h-2 rounded bg-black/50 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                  <div className="h-full rounded transition-all" style={{ width: '88%', background: 'var(--accent)' }}></div>
                </div>
                <div className="flex justify-between text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                  <span>DRAW: 24.8A</span>
                  <span>TIME REMAINING: 18m 42s</span>
                </div>
              </div>

              {/* 4 Motors RPM Telemetry */}
              <div className="p-3.5 rounded-xl border space-y-2 text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="font-bold text-[10px] tracking-wider uppercase block" style={{ color: 'var(--text-secondary)' }}>
                  BRUSHLESS PROP MOTORS
                </span>
                <div className="grid grid-cols-4 gap-1 text-center font-mono">
                  {['M1', 'M2', 'M3', 'M4'].map((m) => (
                    <div key={m} className="p-1 rounded bg-black/40 border" style={{ borderColor: 'var(--border)' }}>
                      <div className="text-[9px]" style={{ color: 'var(--text-secondary)' }}>{m}</div>
                      <div className="text-[11px] font-bold text-white">8.2k</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Tactical Controls */}
            <div className="pt-2 border-t space-y-2" style={{ borderColor: 'var(--border)' }}>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button className="py-2.5 rounded-lg border text-center cursor-pointer hover:bg-white/5 active:scale-95 transition-all" style={{ borderColor: 'var(--border)' }}>
                  HOLD POSITION
                </button>
                <button className="py-2.5 rounded-lg border text-center cursor-pointer text-amber-400 hover:bg-amber-400/10 active:scale-95 transition-all" style={{ borderColor: '#F59E0B' }}>
                  AUTO RTH
                </button>
              </div>
            </div>
          </aside>

          {/* Center Column: Live Tactical HUD & Video Feed (Cols 6) */}
          <main className="lg:col-span-6 flex flex-col p-4 space-y-3 overflow-hidden">
            {/* Primary Optical / Thermal Stream Canvas */}
            <div className="aspect-[16/10] w-full rounded-2xl border relative overflow-hidden flex flex-col justify-between shadow-2xl hud-scanline" style={{ borderColor: 'var(--accent)', background: '#020508' }}>
              {/* Compass Ribbon Tape on Top */}
              <div className="p-3 flex flex-col items-center z-20 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-6 font-mono text-xs font-bold text-white tracking-widest">
                  <span style={{ color: 'var(--text-secondary)' }}>240</span>
                  <span style={{ color: 'var(--text-secondary)' }}>255</span>
                  <span className="px-2 py-0.5 rounded border" style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--accent-light)' }}>
                    270° [W]
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>285</span>
                  <span style={{ color: 'var(--text-secondary)' }}>300</span>
                </div>
                <div className="w-1 h-2 bg-red-500 mt-0.5"></div>
              </div>

              {/* Simulated Camera Center Reticle / AI Tracking Boxes */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Crosshairs */}
                <div className="relative w-48 h-48 border border-white/20 rounded-full flex items-center justify-center">
                  <div className="w-full h-[1px] bg-white/20"></div>
                  <div className="h-full w-[1px] bg-white/20 absolute"></div>
                  <div className="w-16 h-16 border-2 rounded-lg flex items-center justify-center" style={{ borderColor: 'var(--accent)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }}></div>
                  </div>
                </div>

                {/* AI Detection Bounding Box 1 */}
                <div className="absolute top-16 left-24 p-2 border-2 border-emerald-400 bg-emerald-500/10 rounded font-mono text-[9px] text-emerald-300">
                  <div className="font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    VEHICLE_CONVOY [98.4%]
                  </div>
                  <div>RANGE: 820m · SPEED: 45 km/h</div>
                </div>

                {/* AI Detection Bounding Box 2 */}
                <div className="absolute bottom-20 right-28 p-2 border-2 border-amber-400 bg-amber-500/10 rounded font-mono text-[9px] text-amber-300">
                  <div className="font-bold">STRUCTURE_ALPHA [94.1%]</div>
                  <div>HEAT SIGNATURE: ELEVATED</div>
                </div>

                {/* Grid Overlay Coordinates */}
                <div className="absolute bottom-4 left-4 font-mono text-[10px] text-zinc-400">
                  FOV: 84° · GIMBAL PITCH: -24.5° · YAW: +12.0°
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] text-zinc-400">
                  REC ● [01:24:19] · ISO 400 · 1/120s
                </div>
              </div>

              {/* Bottom Stream Vision Modes Bar */}
              <div className="p-3 z-20 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex gap-1.5">
                  {(['4K', 'FLIR', 'NVG'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setVisionMode(mode)}
                      className="px-3 py-1 rounded text-xs font-mono font-bold cursor-pointer transition-all border"
                      style={{
                        background: visionMode === mode ? 'var(--accent)' : 'rgba(0,0,0,0.6)',
                        borderColor: visionMode === mode ? 'transparent' : 'var(--border)',
                        color: visionMode === mode ? '#FFF' : 'var(--text-secondary)',
                      }}
                    >
                      {mode} {mode === '4K' ? 'OPTICAL' : mode === 'FLIR' ? 'THERMAL' : 'NIGHT VISION'}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-2.5 py-1 rounded border text-xs font-mono font-bold bg-black/60 hover:bg-white/10 cursor-pointer" style={{ borderColor: 'var(--border)' }}>
                    📸 SNAPSHOT
                  </button>
                  <button className="px-2.5 py-1 rounded border text-xs font-mono font-bold bg-black/60 hover:bg-white/10 cursor-pointer text-red-400" style={{ borderColor: 'var(--border)' }}>
                    🔴 RECORD
                  </button>
                </div>
              </div>
            </div>

            {/* Sub-Panel: Payload & System Health */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl border font-mono space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                  GEOFENCE STATUS
                </span>
                <div className="font-bold text-emerald-400">ACTIVE [3.5km CYLINDER]</div>
              </div>

              <div className="p-3 rounded-xl border font-mono space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                  OBSTACLE RADAR LIDAR
                </span>
                <div className="font-bold text-white">360° CLEAR [&gt;50m]</div>
              </div>

              <div className="p-3 rounded-xl border font-mono space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                  PAYLOAD BAY
                </span>
                <div className="font-bold text-cyan-400">LOCKED [LIDAR POD]</div>
              </div>
            </div>
          </main>

          {/* Right Column: Tactical Radar & Mission Log (Cols 3) */}
          <aside className="lg:col-span-3 border-l p-4 flex flex-col justify-between space-y-4 overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div>
              <div className="flex items-center justify-between text-xs border-b pb-2 mb-3" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold tracking-widest uppercase text-[11px]" style={{ color: 'var(--accent)' }}>
                  [TACTICAL RADAR 5NM]
                </span>
                <span className="text-[10px] font-mono text-zinc-400">SWEEP: 4 RPM</span>
              </div>

              {/* Animated Radar Sweep Display */}
              <div className="aspect-square w-full rounded-2xl border relative overflow-hidden flex items-center justify-center p-2 mb-4" style={{ borderColor: 'var(--border)', background: '#030806' }}>
                {/* Concentric rings */}
                <div className="w-full h-full rounded-full border border-emerald-900/40 relative flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full border border-emerald-900/30 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 rounded-full border border-emerald-900/20"></div>
                  </div>
                  {/* Cross lines */}
                  <div className="absolute w-full h-[1px] bg-emerald-900/30"></div>
                  <div className="absolute h-full w-[1px] bg-emerald-900/30"></div>

                  {/* Rotating sweep line */}
                  <div
                    className="absolute w-1/2 h-1/2 top-0 left-1/2 origin-bottom-left pointer-events-none"
                    style={{
                      transform: `rotate(${radarDegree}deg)`,
                      background: 'linear-gradient(45deg, rgba(16,185,129,0.3) 0%, transparent 60%)',
                    }}
                  ></div>

                  {/* Drone icon in center */}
                  <div className="w-3 h-3 rounded-full z-10" style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }}></div>

                  {/* Target Blips */}
                  <div className="absolute top-8 right-12 w-2 h-2 rounded-full bg-red-400 animate-ping"></div>
                  <div className="absolute bottom-10 left-10 w-2 h-2 rounded-full bg-amber-400"></div>
                </div>
              </div>

              {/* Mission Waypoints List */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--text-secondary)' }}>
                  MISSION WAYPOINTS
                </span>
                {[
                  { id: 'WP-01', dist: '0.0 km', status: 'COMPLETED', time: '13:10:04' },
                  { id: 'WP-02', dist: '1.4 km', status: 'COMPLETED', time: '13:22:15' },
                  { id: 'WP-03', dist: '3.2 km', status: 'IN TRANSIT', time: 'ETA 2m' },
                  { id: 'WP-04', dist: '5.8 km', status: 'STANDBY', time: 'ETA 6m' },
                ].map((wp) => (
                  <div
                    key={wp.id}
                    onClick={() => setSelectedWP(wp.id)}
                    className="p-2 rounded-lg border flex items-center justify-between text-xs font-mono cursor-pointer transition-colors"
                    style={{
                      borderColor: selectedWP === wp.id ? 'var(--accent)' : 'var(--border)',
                      background: selectedWP === wp.id ? 'var(--bg-card)' : 'transparent',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: wp.status === 'IN TRANSIT' ? 'var(--accent)' : wp.status === 'COMPLETED' ? '#10B981' : '#6B7280' }}></span>
                      <span className="font-bold">{wp.id}</span>
                      <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>({wp.dist})</span>
                    </div>
                    <span className="text-[10px] font-bold" style={{ color: wp.status === 'IN TRANSIT' ? 'var(--accent)' : 'var(--text-secondary)' }}>
                      {wp.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tactical Live Feed Terminal */}
            <div className="p-3 rounded-xl border font-mono text-[10px] space-y-1 bg-black/50" style={{ borderColor: 'var(--border)' }}>
              <div className="font-bold text-zinc-400 pb-1 border-b border-white/10">[EVENT STREAM]</div>
              <div className="text-emerald-400">13:34:02 GNSS POSITION VERIFIED</div>
              <div className="text-zinc-400">13:34:10 GIMBAL AUTO-TRACK ENGAGED</div>
              <div className="text-amber-400">13:34:22 TARGET 01 ENTERED FOV</div>
              <div className="text-cyan-400">13:34:30 AUTOPILOT STEERING 270°</div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
