import { useState, useEffect } from 'react'

type Variant = 'violet' | 'cyan' | 'rose'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#8B5CF6': 'violet',
  '#06B6D4': 'cyan',
  '#F43F5E': 'rose',
}

const THEMES: Record<Variant, Record<string, string>> = {
  violet: {
    '--accent': '#8B5CF6', '--accent-hover': '#7C3AED', '--accent-light': 'rgba(139,92,246,0.1)',
    '--bg-primary': '#0C0A14', '--bg-secondary': '#14101E', '--bg-card': '#1A1428',
    '--border': '#241E3A', '--text-primary': '#F1F0FF', '--text-secondary': '#7C72A8',
  },
  cyan: {
    '--accent': '#06B6D4', '--accent-hover': '#0891B2', '--accent-light': 'rgba(6,182,212,0.1)',
    '--bg-primary': '#0A0E14', '--bg-secondary': '#111820', '--bg-card': '#1A2230',
    '--border': '#1E2E40', '--text-primary': '#F1F5F9', '--text-secondary': '#64748B',
  },
  rose: {
    '--accent': '#F43F5E', '--accent-hover': '#E11D48', '--accent-light': 'rgba(244,63,94,0.1)',
    '--bg-primary': '#140A0C', '--bg-secondary': '#1E1014', '--bg-card': '#281420',
    '--border': '#3A1E28', '--text-primary': '#FFF0F2', '--text-secondary': '#A87288',
  },
}

const navItems = [
  { name: 'Projects', path: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
  { name: 'Mixer', path: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
  { name: 'Instruments', path: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3' },
  { name: 'Samples', path: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
  { name: 'Effects', path: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  { name: 'Settings', path: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
]

const recentProjects = [
  { name: 'Summer Vibes', duration: '3:42' },
  { name: 'Midnight Beat', duration: '4:15' },
  { name: 'Electric Dreams', duration: '2:58' },
]

const tracks = [
  { name: 'Lead Synth', color: '#8B5CF6', left: 10, width: 50 },
  { name: 'Bass', color: '#06B6D4', left: 5, width: 40 },
  { name: 'Drums', color: '#F59E0B', left: 0, width: 80 },
  { name: 'Hi-Hats', color: '#10B981', left: 15, width: 60 },
  { name: 'Vocals', color: '#F43F5E', left: 25, width: 40 },
  { name: 'Pad', color: '#3B82F6', left: 0, width: 90 },
  { name: 'FX', color: '#F97316', left: 40, width: 30 },
  { name: 'Strings', color: '#EC4899', left: 20, width: 35 },
]

const mixerChannels = [
  { name: 'Lead', color: '#8B5CF6', level: 75, volume: '-3.2' },
  { name: 'Bass', color: '#06B6D4', level: 82, volume: '-1.8' },
  { name: 'Drums', color: '#F59E0B', level: 90, volume: '-0.5' },
  { name: 'Vocals', color: '#F43F5E', level: 68, volume: '-4.6' },
]

export function MusicStudio({ variant = 'violet' }: { variant?: Variant }) {
  const [activeNav, setActiveNav] = useState('Mixer')
  const [isPlaying, setIsPlaying] = useState(false)
  const [mutedTracks, setMutedTracks] = useState<Set<string>>(new Set())
  const [soloTrack, setSoloTrack] = useState<string | null>(null)
  const [customFont, setCustomFont] = useState('')
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'SET_THEME_VARIATION') {
        const accent = e.data.variation?.accent;
        if (accent) {
          const v = ACCENT_TO_THEME[accent.toUpperCase()] || ACCENT_TO_THEME[accent];
          if (v) setCurrentTheme(v);
        }
        if (e.data.variation?.font) setCustomFont(e.data.variation.font);
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  const theme = THEMES[currentTheme]
  const cssVars = Object.entries(theme).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Record<string, string>)

  const toggleMute = (name: string) => {
    setMutedTracks(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name); else next.add(name)
      return next
    })
  }

  const toggleSolo = (name: string) => {
    setSoloTrack(prev => prev === name ? null : name)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
        .studio-wrapper { font-family: ${customFont || "'Inter', sans-serif"}; }
        .studio-wrapper * { box-sizing: border-box; }
        .studio-wrapper ::-webkit-scrollbar { width: 6px; height: 6px; }
        .studio-wrapper ::-webkit-scrollbar-track { background: transparent; }
        .studio-wrapper ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
      `}</style>
      <div className="studio-wrapper h-screen grid grid-rows-[1fr_180px] overflow-hidden" style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }} data-theme={currentTheme}>
        {/* Top section */}
        <div className="grid grid-cols-[200px_1fr_260px] overflow-hidden">
          {/* Sidebar */}
          <div className="flex flex-col py-4 border-r" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
            <div className="px-4 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="var(--accent)" viewBox="0 0 24 24"><path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/></svg>
              <span className="font-bold text-base" style={{ color: 'var(--accent)' }}>BeatForge</span>
            </div>
            <nav className="px-2 space-y-0.5">
              {navItems.map(item => (
                <button key={item.name} onClick={() => setActiveNav(item.name)}
                  className="w-full px-3 py-2 rounded-lg text-sm flex items-center gap-3 cursor-pointer transition-colors"
                  style={{ background: activeNav === item.name ? 'var(--accent-light)' : 'transparent', color: activeNav === item.name ? 'var(--accent)' : 'var(--text-secondary)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.path}/></svg>
                  {item.name}
                </button>
              ))}
            </nav>
            <div className="mt-4 px-3">
              <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Recent Projects</div>
              <div className="mt-2 space-y-1">
                {recentProjects.map(p => (
                  <div key={p.name} className="px-2 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer text-xs hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13"/></svg>
                    <span className="truncate flex-1">{p.name}</span>
                    <span className="text-xs opacity-60">{p.duration}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-auto px-4">
              <span className="font-bold text-2xl" style={{ color: 'var(--accent)' }}>128</span>
              <span className="text-xs ml-1" style={{ color: 'var(--text-secondary)' }}>BPM</span>
            </div>
          </div>

          {/* Track Area */}
          <div className="flex flex-col overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
            {/* Toolbar */}
            <div className="px-4 py-2 border-b flex items-center gap-3" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-1">
                {/* Rewind */}
                <button className="w-7 h-7 flex items-center justify-center rounded cursor-pointer hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/></svg>
                </button>
                {/* Play/Pause */}
                <button onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                  style={{ background: 'var(--accent)' }}>
                  {isPlaying ? (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                  ) : (
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>
                {/* Forward */}
                <button className="w-7 h-7 flex items-center justify-center rounded cursor-pointer hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>
                </button>
                {/* Stop */}
                <button className="w-7 h-7 flex items-center justify-center rounded cursor-pointer hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="1"/></svg>
                </button>
                {/* Record */}
                <button className="w-7 h-7 flex items-center justify-center rounded cursor-pointer hover:opacity-80">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                </button>
              </div>
              <div className="px-3 py-1 rounded-lg border text-sm font-mono font-bold" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', fontFamily: "'JetBrains Mono', monospace" }}>
                02:34.12
              </div>
              <div className="flex-1" />
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <button className="px-2 py-1 rounded border cursor-pointer" style={{ borderColor: 'var(--border)' }}>Loop</button>
                <button className="px-2 py-1 rounded border cursor-pointer" style={{ borderColor: 'var(--border)' }}>Metro</button>
              </div>
            </div>

            {/* Track Lanes */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
              {tracks.map(track => {
                const isMuted = mutedTracks.has(track.name)
                const isSolo = soloTrack === track.name
                const isAudible = soloTrack ? isSolo : !isMuted
                return (
                  <div key={track.name} className="flex items-center h-12 border-b" style={{ borderColor: `${theme['--border']}33`, opacity: isAudible ? 1 : 0.35 }}>
                    <div className="w-36 flex items-center gap-2 px-2 flex-shrink-0">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: track.color }} />
                      <span className="text-xs truncate flex-1">{track.name}</span>
                      <button onClick={() => toggleMute(track.name)}
                        className="w-5 h-5 rounded text-xs flex items-center justify-center cursor-pointer border"
                        style={{ borderColor: isMuted ? '#EF4444' : 'var(--border)', color: isMuted ? '#EF4444' : 'var(--text-secondary)', background: isMuted ? 'rgba(239,68,68,0.1)' : 'transparent' }}>
                        M
                      </button>
                      <button onClick={() => toggleSolo(track.name)}
                        className="w-5 h-5 rounded text-xs flex items-center justify-center cursor-pointer border"
                        style={{ borderColor: isSolo ? '#F59E0B' : 'var(--border)', color: isSolo ? '#F59E0B' : 'var(--text-secondary)', background: isSolo ? 'rgba(245,158,11,0.1)' : 'transparent' }}>
                        S
                      </button>
                    </div>
                    <div className="flex-1 h-full relative">
                      <div className="absolute top-2 bottom-2 rounded"
                        style={{ left: `${track.left}%`, width: `${track.width}%`, background: `${track.color}30`, borderLeft: `2px solid ${track.color}` }}>
                        {/* Waveform bars */}
                        <div className="h-full flex items-center gap-px px-1 overflow-hidden">
                          {Array.from({ length: 40 }, (_, i) => (
                            <div key={i} className="flex-1 rounded-sm" style={{ height: `${20 + Math.sin(i * 0.8 + tracks.indexOf(track)) * 30 + Math.random() * 20}%`, background: `${track.color}60`, minWidth: 1 }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Panel - Mixer */}
          <div className="border-l overflow-y-auto p-4" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
            <div className="font-bold text-sm mb-3">Mixer</div>
            <div className="space-y-3">
              {mixerChannels.map(ch => (
                <div key={ch.name} className="rounded-xl p-3 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: ch.color }} />
                    <span className="text-xs">{ch.name}</span>
                  </div>
                  <div className="flex items-end justify-center gap-3">
                    {/* Fader */}
                    <div className="w-2 h-24 rounded-full relative" style={{ background: 'var(--border)' }}>
                      <div className="absolute bottom-0 w-full rounded-full" style={{ height: `${ch.level}%`, background: `linear-gradient(to top, ${ch.color}, ${ch.color}80)` }} />
                      <div className="absolute w-4 h-4 rounded-full -left-1 shadow" style={{ bottom: `calc(${ch.level}% - 8px)`, background: 'var(--accent)' }} />
                    </div>
                    {/* Level meter */}
                    <div className="flex gap-0.5">
                      <div className="w-1.5 h-24 rounded-full relative overflow-hidden" style={{ background: 'var(--border)' }}>
                        <div className="absolute bottom-0 w-full rounded-full" style={{ height: `${ch.level - 2}%`, background: 'linear-gradient(to top, #10B981, #F59E0B, #EF4444)' }} />
                      </div>
                      <div className="w-1.5 h-24 rounded-full relative overflow-hidden" style={{ background: 'var(--border)' }}>
                        <div className="absolute bottom-0 w-full rounded-full" style={{ height: `${ch.level - 8}%`, background: 'linear-gradient(to top, #10B981, #F59E0B, #EF4444)' }} />
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-center mt-2" style={{ color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace" }}>{ch.volume} dB</div>
                  <div className="w-8 h-8 rounded-full border mx-auto mt-1 relative" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}>
                    <div className="absolute w-0.5 h-3 rounded-full top-1 left-1/2 -translate-x-1/2 origin-bottom" style={{ background: 'var(--accent)', transform: 'translateX(-50%) rotate(15deg)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Master */}
        <div className="border-t px-6 py-3 flex items-center gap-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          {/* Waveform overview */}
          <div className="flex-1 h-16 rounded-xl relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
            <div className="h-full flex items-center gap-px px-2">
              {Array.from({ length: 60 }, (_, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${15 + Math.sin(i * 0.3) * 30 + Math.cos(i * 0.7) * 20}%`, background: `var(--accent)`, opacity: 0.4, minWidth: 1 }} />
              ))}
            </div>
            <div className="absolute top-0 bottom-0 w-0.5" style={{ left: '35%', background: 'var(--accent)' }} />
          </div>
          {/* Master Level */}
          <div className="w-28">
            <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Master</div>
            <div className="flex items-end gap-1.5 justify-center">
              <div className="flex gap-1">
                <div className="w-3 h-12 rounded relative overflow-hidden" style={{ background: 'var(--border)' }}>
                  <div className="absolute bottom-0 w-full rounded" style={{ height: '75%', background: 'linear-gradient(to top, #10B981, #F59E0B, #EF4444)' }} />
                </div>
                <div className="w-3 h-12 rounded relative overflow-hidden" style={{ background: 'var(--border)' }}>
                  <div className="absolute bottom-0 w-full rounded" style={{ height: '68%', background: 'linear-gradient(to top, #10B981, #F59E0B, #EF4444)' }} />
                </div>
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace" }}>L R</div>
            </div>
            <div className="text-xs text-center mt-1" style={{ color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace" }}>-2.4 dB</div>
          </div>
          {/* Output */}
          <div className="w-24">
            <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Output</div>
            <select className="w-full rounded text-xs px-2 py-1.5 border cursor-pointer" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option>Speakers</option>
              <option>Headphones</option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}
