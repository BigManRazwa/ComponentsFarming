import { useState, useEffect } from 'react'

type Variant = 'orange' | 'cyan' | 'violet'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#F97316': 'orange',
  '#06B6D4': 'cyan',
  '#8B5CF6': 'violet',
}

const THEMES: Record<Variant, Record<string, string>> = {
  orange: {
    '--accent': '#F97316',
    '--accent-hover': '#EA580C',
    '--accent-light': 'rgba(249, 115, 22, 0.16)',
    '--bg-primary': '#0D0805',
    '--bg-secondary': '#170F0A',
    '--bg-card': '#241710',
    '--border': '#3B261A',
    '--text-primary': '#FFF7ED',
    '--text-secondary': '#C79F86',
  },
  cyan: {
    '--accent': '#06B6D4',
    '--accent-hover': '#0891B2',
    '--accent-light': 'rgba(6, 182, 212, 0.16)',
    '--bg-primary': '#04090D',
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
    '--bg-primary': '#0A0612',
    '--bg-secondary': '#130D20',
    '--bg-card': '#1E1433',
    '--border': '#332254',
    '--text-primary': '#F5F3FF',
    '--text-secondary': '#A890D3',
  },
}

export function MobileRocketLaunch({ variant = 'orange' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(15158) // ~4h 12m 38s
  const [isNotified, setIsNotified] = useState(false)
  const [activeTab, setActiveTab] = useState<'timeline' | 'weather' | 'telemetry'>('timeline')

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

  // Live countdown timer ticking
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatCountdown = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600)
    const m = Math.floor((totalSec % 3600) / 60)
    const s = totalSec % 60
    return {
      h: String(h).padStart(2, '0'),
      m: String(m).padStart(2, '0'),
      s: String(s).padStart(2, '0'),
    }
  }

  const { h, m, s } = formatCountdown(secondsLeft)

  const theme = THEMES[currentTheme]
  const cssVars = Object.entries(theme).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Record<string, string>)

  return (
    <>
      <style>{`
        .rocket-wrapper { font-family: ${customFont || "'JetBrains Mono', 'Fira Code', monospace"}; }
        .rocket-wrapper * { box-sizing: border-box; }
        .rocket-wrapper ::-webkit-scrollbar { display: none; }
        .stars-bg {
          background-image: radial-gradient(white 1px, transparent 0);
          background-size: 32px 32px;
        }
      `}</style>
      <div
        className="rocket-wrapper max-w-[390px] mx-auto min-h-screen relative flex flex-col pb-24 select-none"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Header */}
        <header className="px-5 pt-6 pb-3 border-b flex items-center justify-between sticky top-0 z-30 backdrop-blur-md" style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-base shadow-sm" style={{ background: 'var(--accent)' }}>
              🚀
            </div>
            <div>
              <span className="font-black text-xs tracking-wider uppercase block">AERO-SPACE X</span>
              <span className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>
                PAD LC-39A · KENNEDY
              </span>
            </div>
          </div>

          {/* Launch Status Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold" style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)', color: 'var(--accent)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>GO FOR LAUNCH</span>
          </div>
        </header>

        {/* Hero Mission Countdown Banner */}
        <div className="p-4">
          <div className="p-4 rounded-3xl border relative overflow-hidden shadow-xl stars-bg" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl opacity-20 pointer-events-none" style={{ background: 'var(--accent)' }}></div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                MISSION NOVA-IX // LUNAR
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">100% GO CONFIRMED</span>
            </div>

            <h2 className="text-base font-black leading-snug">
              Artemis Gateway Habitation Module (TLI Insertion)
            </h2>

            {/* Big T-Minus Digital Clock */}
            <div className="mt-4 pt-3 border-t flex items-center justify-center gap-2 font-mono" style={{ borderColor: 'var(--border)' }}>
              <span className="text-xl font-bold text-red-500">T-</span>
              <div className="flex items-center gap-1">
                <div className="p-2 rounded-xl bg-black/60 border text-center min-w-[52px]" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-2xl font-black text-white block">{h}</span>
                  <span className="text-[8px] uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>HOURS</span>
                </div>
                <span className="text-lg font-bold text-zinc-500">:</span>
                <div className="p-2 rounded-xl bg-black/60 border text-center min-w-[52px]" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-2xl font-black text-white block">{m}</span>
                  <span className="text-[8px] uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>MINS</span>
                </div>
                <span className="text-lg font-bold text-zinc-500">:</span>
                <div className="p-2 rounded-xl bg-black/60 border text-center min-w-[52px]" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-2xl font-black text-white block font-mono" style={{ color: 'var(--accent)' }}>{s}</span>
                  <span className="text-[8px] uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>SECS</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] mt-3 pt-2 border-t" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              <span>VEHICLE: Nova Heavy (Block 5)</span>
              <span>BOOSTER: B1067.14</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-4 pb-2 flex gap-1.5 text-xs font-bold font-mono">
          {[
            { id: 'timeline', label: 'Timeline' },
            { id: 'weather', label: 'Weather GO' },
            { id: 'telemetry', label: 'Trajectory' },
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

        {/* Tab 1: Timeline */}
        {activeTab === 'timeline' && (
          <div className="px-4 space-y-2.5">
            {[
              { time: 'T-00:45:00', event: 'RP-1 & Cryo LOX Fueling', status: 'COMPLETED', ok: true },
              { time: 'T-00:07:00', event: 'Merlin Engines Chilldown & TVC Alignment', status: 'IN PROGRESS', ok: true, active: true },
              { time: 'T-00:00:45', event: 'Launch Director Final GO / NO-GO Poll', status: 'UPCOMING', ok: false },
              { time: 'T-00:00:03', event: '27 Main Engine Ignition Sequence', status: 'UPCOMING', ok: false },
              { time: 'T+00:02:45', event: 'Stage 1 MECO & Boostback Burn', status: 'UPCOMING', ok: false },
              { time: 'T+00:08:40', event: 'Orbital Insertion 27,800 km/h', status: 'UPCOMING', ok: false },
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl border flex items-center justify-between gap-3 text-xs font-mono"
                style={{
                  borderColor: step.active ? 'var(--accent)' : 'var(--border)',
                  background: step.active ? 'var(--bg-card)' : 'transparent',
                }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: step.ok && !step.active ? '#10B981' : step.active ? 'var(--accent)' : '#6B7280',
                      boxShadow: step.active ? '0 0 8px var(--accent)' : 'none',
                    }}
                  ></span>
                  <div>
                    <span className="font-bold block text-white leading-tight">{step.event}</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                      {step.time}
                    </span>
                  </div>
                </div>

                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded border"
                  style={{
                    borderColor: 'var(--border)',
                    background: step.ok ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)',
                    color: step.ok ? '#10B981' : 'var(--text-secondary)',
                  }}
                >
                  {step.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Weather GO Checklist */}
        {activeTab === 'weather' && (
          <div className="px-4 space-y-2.5">
            {[
              { item: 'Surface Wind Speed', val: '8.4 kt (Limit 30 kt)', status: 'GO' },
              { item: 'Cumulus Cloud Rule', val: '0% Cloud Cover', status: 'GO' },
              { item: 'Flight Path Lightning Rule', val: 'Clear & Ground Discharged', status: 'GO' },
              { item: 'Booster Recovery Drone Ship', val: 'Sea State 2 (Calm Swells)', status: 'GO' },
              { item: 'Solar Geomagnetic Storms', val: 'Kp-Index: 1 (Quiet Sun)', status: 'GO' },
            ].map((w, idx) => (
              <div key={idx} className="p-3 rounded-2xl border flex items-center justify-between text-xs font-mono" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <div>
                  <div className="font-bold text-white">{w.item}</div>
                  <div className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{w.val}</div>
                </div>
                <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-black text-xs">
                  {w.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Trajectory & Orbit Details */}
        {activeTab === 'telemetry' && (
          <div className="px-4 space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-2xl border space-y-2" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                ORBITAL PARAMETERS
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>APOGEE: <strong className="text-white">384,400 km</strong></div>
                <div>PERIGEE: <strong className="text-white">420 km</strong></div>
                <div>INCLINATION: <strong className="text-white">28.5°</strong></div>
                <div>ESCAPE VELOCITY: <strong className="text-white">11.18 km/s</strong></div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border space-y-2" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                PROPELLANT MASS LOADED
              </span>
              <div className="space-y-1.5">
                <div>
                  <div className="flex justify-between text-[10px]">
                    <span>Liquid Oxygen (LOX)</span>
                    <span>94% (380,000 kg)</span>
                  </div>
                  <div className="w-full h-1.5 rounded bg-black/50 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                    <div className="h-full rounded" style={{ width: '94%', background: 'var(--accent)' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px]">
                    <span>Rocket Propellant 1 (RP-1)</span>
                    <span>91% (160,000 kg)</span>
                  </div>
                  <div className="w-full h-1.5 rounded bg-black/50 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                    <div className="h-full rounded bg-amber-400" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fixed Bottom Action Bar */}
        <div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] border-t px-5 py-3 z-40 backdrop-blur-md flex items-center justify-between"
          style={{ borderColor: 'var(--border)', background: 'rgba(13, 8, 5, 0.95)' }}
        >
          <button
            onClick={() => setIsNotified(!isNotified)}
            className="px-3.5 py-2.5 rounded-xl border text-xs font-mono font-bold cursor-pointer transition-colors"
            style={{
              borderColor: isNotified ? 'var(--accent)' : 'var(--border)',
              color: isNotified ? 'var(--accent)' : 'var(--text-secondary)',
            }}
          >
            {isNotified ? '🔔 NOTIFIED' : '🔔 REMIND ME'}
          </button>

          <button
            onClick={() => alert('Opening HD 4K Launch Livestream...')}
            className="flex-1 ml-3 py-2.5 rounded-xl font-mono font-bold text-xs text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-transform active:scale-95"
            style={{ background: 'var(--accent)' }}
          >
            <span>▶ WATCH LIVE STREAM</span>
          </button>
        </div>
      </div>
    </>
  )
}
