import { useState, useEffect } from 'react'

type Variant = 'blue' | 'violet' | 'emerald'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#3B82F6': 'blue',
  '#8B5CF6': 'violet',
  '#10B981': 'emerald',
}

const THEMES: Record<Variant, Record<string, string>> = {
  blue: {
    '--accent': '#3B82F6', '--accent-hover': '#2563EB', '--accent-light': 'rgba(59,130,246,0.1)',
    '--bg-primary': '#0C1220', '--bg-secondary': '#111828', '--bg-card': '#1A2236',
    '--border': '#1E2E42', '--text-primary': '#F1F5F9', '--text-secondary': '#64748B',
  },
  violet: {
    '--accent': '#8B5CF6', '--accent-hover': '#7C3AED', '--accent-light': 'rgba(139,92,246,0.1)',
    '--bg-primary': '#0C0A14', '--bg-secondary': '#14101E', '--bg-card': '#1A1428',
    '--border': '#241E3A', '--text-primary': '#F1F0FF', '--text-secondary': '#7C72A8',
  },
  emerald: {
    '--accent': '#10B981', '--accent-hover': '#059669', '--accent-light': 'rgba(16,185,129,0.1)',
    '--bg-primary': '#0A0F0C', '--bg-secondary': '#101A14', '--bg-card': '#162220',
    '--border': '#1E3A30', '--text-primary': '#F0FFF8', '--text-secondary': '#6BAA88',
  },
}

const navItems = [
  { name: 'Media', path: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { name: 'Audio', path: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z' },
  { name: 'Text', path: 'M4 6h16M4 12h8m-8 6h16' },
  { name: 'Effects', path: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  { name: 'Transitions', path: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
  { name: 'Export', path: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
]

const timelineClips = [
  { track: 0, name: 'Intro.mp4', color: '#3B82F6', left: 0, width: 20 },
  { track: 0, name: 'Interview.mp4', color: '#3B82F6', left: 22, width: 35 },
  { track: 0, name: 'B-Roll.mp4', color: '#06B6D4', left: 59, width: 25 },
  { track: 0, name: 'Outro.mp4', color: '#8B5CF6', left: 86, width: 14 },
  { track: 1, name: 'Title Card', color: '#F59E0B', left: 0, width: 8 },
  { track: 1, name: 'Lower Third', color: '#F59E0B', left: 25, width: 12 },
  { track: 1, name: 'End Card', color: '#F59E0B', left: 86, width: 14 },
  { track: 2, name: 'BGM.mp3', color: '#10B981', left: 0, width: 100 },
  { track: 3, name: 'VO.wav', color: '#F43F5E', left: 5, width: 50 },
  { track: 3, name: 'SFX', color: '#F97316', left: 60, width: 8 },
]

const trackLabels = ['Video 1', 'Graphics', 'Audio 1', 'Audio 2']

export function VideoEditor({ variant = 'blue' }: { variant?: Variant }) {
  const [activeNav, setActiveNav] = useState('Media')
  const [isPlaying, setIsPlaying] = useState(false)
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

  return (
    <>
      <style>{`
        .editor-wrapper { font-family: ${customFont || "'Inter', sans-serif"}; }
        .editor-wrapper * { box-sizing: border-box; }
        .editor-wrapper ::-webkit-scrollbar { width: 6px; height: 6px; }
        .editor-wrapper ::-webkit-scrollbar-track { background: transparent; }
        .editor-wrapper ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
      `}</style>
      <div className="editor-wrapper h-screen grid grid-rows-[1fr_220px] overflow-hidden" style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }} data-theme={currentTheme}>
        {/* Top */}
        <div className="grid grid-cols-[180px_1fr_300px] overflow-hidden">
          {/* Sidebar */}
          <div className="flex flex-col py-3 border-r" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
            <div className="px-4 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="var(--accent)" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              <span className="font-bold text-sm" style={{ color: 'var(--accent)' }}>ClipCraft</span>
            </div>
            <nav className="px-2 space-y-0.5">
              {navItems.map(item => (
                <button key={item.name} onClick={() => setActiveNav(item.name)}
                  className="w-full px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 cursor-pointer transition-colors"
                  style={{ background: activeNav === item.name ? 'var(--accent-light)' : 'transparent', color: activeNav === item.name ? 'var(--accent)' : 'var(--text-secondary)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.path}/></svg>
                  {item.name}
                </button>
              ))}
            </nav>
            <div className="mt-auto px-3">
              <div className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>Project Files</div>
              <div className="space-y-1">
                {['Interview_Final.mp4', 'B-Roll_City.mp4', 'BGM_Chill.mp3', 'Voiceover.wav'].map(f => (
                  <div key={f} className="px-2 py-1.5 rounded text-xs truncate cursor-pointer hover:opacity-80" style={{ color: 'var(--text-secondary)', background: 'var(--bg-card)' }}>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Monitor */}
          <div className="flex flex-col overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="w-full max-w-lg aspect-video rounded-xl relative overflow-hidden" style={{ background: '#000' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <svg className="w-8 h-8 text-white/60 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <div className="text-white/40 text-xs">Preview Monitor</div>
                  </div>
                </div>
                {/* Timecode overlay */}
                <div className="absolute bottom-3 left-3 px-2 py-1 rounded text-xs font-mono" style={{ background: 'rgba(0,0,0,0.7)', color: 'white', fontFamily: "'JetBrains Mono', monospace" }}>
                  00:02:34:12
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded text-xs" style={{ background: 'rgba(0,0,0,0.7)', color: 'white' }}>
                  1920×1080 · 30fps
                </div>
              </div>
            </div>
            {/* Transport */}
            <div className="px-4 py-2 border-t flex items-center justify-center gap-4" style={{ borderColor: 'var(--border)' }}>
              <button className="cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/></svg>
              </button>
              <button onClick={() => setIsPlaying(!isPlaying)} className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer" style={{ background: 'var(--accent)' }}>
                {isPlaying ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                ) : (
                  <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>
              <button className="cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>
              </button>
              <div className="text-sm font-mono ml-4" style={{ color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace" }}>02:34 / 05:12</div>
            </div>
          </div>

          {/* Properties Panel */}
          <div className="border-l overflow-y-auto p-4" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
            <div className="font-bold text-sm mb-3">Properties</div>
            <div className="rounded-xl p-3 border mb-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="text-xs font-bold">Interview.mp4</div>
              <div className="mt-2 space-y-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                {[['Duration', '02:34'], ['Resolution', '1920×1080'], ['FPS', '30'], ['Codec', 'H.264'], ['Size', '245 MB']].map(([k, v]) => (
                  <div key={k} className="flex justify-between"><span>{k}</span><span style={{ color: 'var(--text-primary)' }}>{v}</span></div>
                ))}
              </div>
            </div>
            <div className="font-bold text-xs mb-2">Transform</div>
            <div className="space-y-2 mb-4">
              {[['Position X', '0'], ['Position Y', '0'], ['Scale', '100%'], ['Rotation', '0°'], ['Opacity', '100%']].map(([label, val]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-xs w-16 flex-shrink-0" style={{ color: 'var(--text-secondary)' }}>{label}</span>
                  <div className="flex-1 px-2 py-1 rounded border text-xs" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}>{val}</div>
                </div>
              ))}
            </div>
            <div className="font-bold text-xs mb-2">Color Correction</div>
            <div className="space-y-2">
              {[['Brightness', 50], ['Contrast', 55], ['Saturation', 60], ['Temperature', 48]].map(([label, val]) => (
                <div key={label as string}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                    <span>{val as number}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
                    <div className="h-full rounded-full" style={{ width: `${val as number}%`, background: 'var(--accent)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="border-t flex flex-col" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          {/* Timeline header */}
          <div className="px-4 py-1.5 border-b flex items-center gap-4 text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Timeline</span>
            <div className="flex-1" />
            <span>Snap</span>
            <span>Razor</span>
            <span>Zoom: 100%</span>
          </div>
          {/* Timecode ruler */}
          <div className="flex border-b" style={{ borderColor: `${theme['--border']}60` }}>
            <div className="w-24 flex-shrink-0" />
            <div className="flex-1 flex items-center h-5 relative">
              {['0:00', '0:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00'].map((t, i) => (
                <div key={t} className="absolute text-xs" style={{ left: `${i * 10}%`, color: 'var(--text-secondary)', fontSize: 9 }}>{t}</div>
              ))}
              {/* Playhead */}
              <div className="absolute top-0 bottom-0 w-0.5 z-10" style={{ left: '35%', background: 'var(--accent)' }}>
                <div className="w-2.5 h-2.5 -ml-1 -mt-0.5 rotate-45" style={{ background: 'var(--accent)' }} />
              </div>
            </div>
          </div>
          {/* Tracks */}
          <div className="flex-1 overflow-y-auto">
            {trackLabels.map((label, trackIdx) => (
              <div key={label} className="flex items-center h-12 border-b" style={{ borderColor: `${theme['--border']}30` }}>
                <div className="w-24 flex-shrink-0 px-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: trackIdx < 2 ? '#3B82F6' : '#10B981' }} />
                  <span className="text-xs truncate">{label}</span>
                </div>
                <div className="flex-1 h-full relative">
                  {timelineClips.filter(c => c.track === trackIdx).map(clip => (
                    <div key={clip.name} className="absolute top-1.5 bottom-1.5 rounded cursor-pointer flex items-center px-2 overflow-hidden hover:brightness-110"
                      style={{ left: `${clip.left}%`, width: `${clip.width}%`, background: `${clip.color}30`, borderLeft: `2px solid ${clip.color}` }}>
                      <span className="text-xs truncate" style={{ color: clip.color, fontSize: 10 }}>{clip.name}</span>
                    </div>
                  ))}
                  {/* Playhead line */}
                  <div className="absolute top-0 bottom-0 w-0.5 z-10" style={{ left: '35%', background: 'var(--accent)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
