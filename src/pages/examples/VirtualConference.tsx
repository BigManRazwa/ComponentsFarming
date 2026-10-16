import { useState, useEffect } from 'react'

type Variant = 'violet' | 'cyan' | 'rose'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#8B5CF6': 'violet',
  '#06B6D4': 'cyan',
  '#F43F5E': 'rose',
}

const THEMES: Record<Variant, Record<string, string>> = {
  violet: {
    '--accent': '#8B5CF6',
    '--accent-hover': '#7C3AED',
    '--accent-light': 'rgba(139, 92, 246, 0.14)',
    '--bg-primary': '#0D0C14',
    '--bg-secondary': '#151322',
    '--bg-card': '#1E1A32',
    '--border': '#2D274A',
    '--text-primary': '#F8FAFC',
    '--text-secondary': '#9D97B8',
  },
  cyan: {
    '--accent': '#06B6D4',
    '--accent-hover': '#0891B2',
    '--accent-light': 'rgba(6, 182, 212, 0.14)',
    '--bg-primary': '#0A1118',
    '--bg-secondary': '#101C27',
    '--bg-card': '#162737',
    '--border': '#20384E',
    '--text-primary': '#F8FAFC',
    '--text-secondary': '#8AA4BC',
  },
  rose: {
    '--accent': '#F43F5E',
    '--accent-hover': '#E11D48',
    '--accent-light': 'rgba(244, 63, 94, 0.14)',
    '--bg-primary': '#140A0F',
    '--bg-secondary': '#211019',
    '--bg-card': '#301724',
    '--border': '#472236',
    '--text-primary': '#FFF1F2',
    '--text-secondary': '#BA879E',
  },
}

interface AgendaItem {
  id: string
  time: string
  title: string
  speaker: string
  role: string
  stage: string
  isLive?: boolean
  attendees: number
}

const SESSIONS: AgendaItem[] = [
  {
    id: 's-1',
    time: '10:00 AM - 11:15 AM',
    title: 'Keynote: Scalable Autonomous Systems & Ambient AI',
    speaker: 'Dr. Elena Rostova',
    role: 'Head of Research, SynthWorks',
    stage: 'Main Stage',
    isLive: true,
    attendees: 2420,
  },
  {
    id: 's-2',
    time: '11:30 AM - 12:15 PM',
    title: 'Architecting High-Throughput Micro-Frontends with React 19',
    speaker: 'Marcus Vance',
    role: 'Principal Engineer, Veloce',
    stage: 'Dev Track',
    attendees: 1140,
  },
  {
    id: 's-3',
    time: '01:00 PM - 02:00 PM',
    title: 'Design Systems at Planetary Scale: Tokens & Fluid Grids',
    speaker: 'Aria Takahashi',
    role: 'VP Design, Kinetix',
    stage: 'Design Track',
    attendees: 890,
  },
  {
    id: 's-4',
    time: '02:30 PM - 03:15 PM',
    title: 'Zero-Latency Edge Data Warehouses: Myth or Reality?',
    speaker: 'Devon Reed',
    role: 'CTO, DataStream',
    stage: 'Data Track',
    attendees: 960,
  },
]

export function VirtualConference({ variant = 'violet' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [activeTab, setActiveTab] = useState<'chat' | 'qa' | 'polls'>('qa')
  const [selectedTrack, setSelectedTrack] = useState('All Tracks')
  const [reactions, setReactions] = useState<{ [key: string]: number }>({
    '🔥': 142,
    '👏': 98,
    '🚀': 87,
    '💡': 63,
  })
  const [qaList, setQaList] = useState([
    { id: 1, user: 'Sarah K.', question: 'How do you handle memory latency across edge cluster nodes?', votes: 42, answered: false },
    { id: 2, user: 'Liam P.', question: 'Will the slides and open-source benchmarks be released post-keynote?', votes: 29, answered: true },
    { id: 3, user: 'Chen W.', question: 'Can these agentic frameworks integrate directly with existing Redis pipelines?', votes: 18, answered: false },
  ])
  const [newQuestion, setNewQuestion] = useState('')

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

  const handleVote = (id: number) => {
    setQaList((prev) => prev.map((q) => (q.id === id ? { ...q, votes: q.votes + 1 } : q)))
  }

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newQuestion.trim()) return
    setQaList([
      { id: Date.now(), user: 'You', question: newQuestion, votes: 1, answered: false },
      ...qaList,
    ])
    setNewQuestion('')
  }

  const handleReaction = (emoji: string) => {
    setReactions((prev) => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }))
  }

  return (
    <>
      <style>{`
        .conf-wrapper { font-family: ${customFont || "'Plus Jakarta Sans', system-ui, sans-serif"}; }
        .conf-wrapper * { box-sizing: border-box; }
        .conf-wrapper ::-webkit-scrollbar { width: 6px; height: 6px; }
        .conf-wrapper ::-webkit-scrollbar-track { background: var(--bg-primary); }
        .conf-wrapper ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
      `}</style>
      <div
        className="conf-wrapper min-h-screen flex flex-col"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Navigation */}
        <header className="border-b px-6 py-3.5 flex items-center justify-between" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-md" style={{ background: 'var(--accent)' }}>
                NX
              </div>
              <div>
                <span className="font-bold text-base tracking-tight block leading-tight">Nexus Summit '26</span>
                <span className="text-[10px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Virtual Global Experience
                </span>
              </div>
            </div>

            {/* Live Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-white font-bold">MAIN STAGE LIVE</span>
              <span style={{ color: 'var(--text-secondary)' }}>· 2,420 Viewers</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Zone:</span>
              <span className="text-white">UTC-4 (EDT)</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)', color: 'var(--accent)' }}>
              <span>★ VIP All-Access</span>
            </div>

            <div className="w-8 h-8 rounded-full border flex items-center justify-center text-white cursor-pointer font-bold" style={{ borderColor: 'var(--border)', background: 'var(--accent)' }}>
              JD
            </div>
          </div>
        </header>

        {/* Main 3-Column Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Agenda & Tracks (Col span 3) */}
          <aside className="lg:col-span-3 border-r flex flex-col overflow-y-auto p-5 space-y-5" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm tracking-wide">Schedule & Tracks</h3>
                <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent)' }}>
                  Day 1 of 3
                </span>
              </div>

              {/* Track Switcher */}
              <div className="flex gap-1.5 p-1 rounded-xl border text-xs font-semibold mb-4" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                {['All Tracks', 'Main', 'Dev', 'Design'].map((track) => (
                  <button
                    key={track}
                    onClick={() => setSelectedTrack(track)}
                    className="flex-1 py-1.5 rounded-lg transition-colors cursor-pointer text-center truncate"
                    style={{
                      background: selectedTrack === track ? 'var(--accent)' : 'transparent',
                      color: selectedTrack === track ? '#FFF' : 'var(--text-secondary)',
                    }}
                  >
                    {track}
                  </button>
                ))}
              </div>
            </div>

            {/* Sessions Timeline */}
            <div className="space-y-3">
              {SESSIONS.map((session) => (
                <div
                  key={session.id}
                  className="p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden"
                  style={{
                    borderColor: session.isLive ? 'var(--accent)' : 'var(--border)',
                    background: session.isLive ? 'var(--bg-card)' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  {session.isLive && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-red-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      <span>NOW</span>
                    </div>
                  )}

                  <div className="text-[11px] font-mono font-semibold mb-1" style={{ color: session.isLive ? 'var(--accent)' : 'var(--text-secondary)' }}>
                    {session.time}
                  </div>

                  <h4 className="font-bold text-xs leading-snug line-clamp-2 text-white mb-2">
                    {session.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                    <div>
                      <div className="font-semibold text-white">{session.speaker}</div>
                      <div className="text-[10px] truncate max-w-[140px]">{session.role}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded border" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                      {session.stage}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Virtual Expo / Lounge Banner */}
            <div className="p-4 rounded-2xl border mt-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <div className="text-xs font-bold text-white mb-1">🤝 Networking Lounge</div>
              <p className="text-[11px] leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                Connect 1-on-1 with speakers and fellow attendees in 5-minute speed rooms.
              </p>
              <button className="w-full py-2 rounded-xl text-xs font-bold text-white cursor-pointer shadow-sm transition-transform active:scale-95" style={{ background: 'var(--accent)' }}>
                Enter Lounge (48 Online)
              </button>
            </div>
          </aside>

          {/* Center Column: Live Stage Player (Col span 6) */}
          <main className="lg:col-span-6 flex flex-col p-6 space-y-4 overflow-y-auto">
            {/* Video Player Box */}
            <div className="aspect-video w-full rounded-3xl border relative overflow-hidden flex flex-col justify-between shadow-2xl" style={{ borderColor: 'var(--border)', background: '#050508' }}>
              {/* Top Stream Overlay */}
              <div className="p-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black text-white bg-red-600 flex items-center gap-1.5 shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    LIVE STREAM
                  </span>
                  <span className="text-xs font-bold text-white bg-black/60 backdrop-blur px-2.5 py-1 rounded-md border border-white/10">
                    1080p 60fps · HD
                  </span>
                </div>

                <div className="flex items-center gap-2 text-white">
                  <button className="p-1.5 rounded-lg bg-black/50 backdrop-blur hover:bg-black/80 cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                  </button>
                  <button className="p-1.5 rounded-lg bg-black/50 backdrop-blur hover:bg-black/80 cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                  </button>
                </div>
              </div>

              {/* Speaker Presentation Backdrop Mock */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center space-y-3 z-10 max-w-lg">
                  <div className="w-16 h-16 rounded-3xl mx-auto border-2 flex items-center justify-center text-xl font-black text-white shadow-xl" style={{ borderColor: 'var(--accent)', background: 'var(--accent)' }}>
                    ER
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white drop-shadow">Dr. Elena Rostova</h2>
                    <p className="text-xs text-sky-200 font-medium">Head of Research @ SynthWorks</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/70 backdrop-blur border border-white/10 text-xs text-zinc-300 font-mono">
                    "When multi-agent nodes reach sub-10ms coordination, ambient interfaces become indistinguishable from local execution."
                  </div>
                </div>

                {/* Subtle Stage Lights Gradient */}
                <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: 'var(--accent)' }}></div>
              </div>

              {/* Bottom Stream Controls Bar */}
              <div className="p-4 z-10 flex items-center justify-between bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex items-center gap-3 text-white text-xs">
                  <button className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center cursor-pointer">
                    ▶
                  </button>
                  <span className="font-mono text-[11px]">00:44:18 / 01:15:00</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
                  <span className="text-[11px] text-zinc-400">CC English (Auto-Generated)</span>
                </div>

                {/* Quick Emoji Reactions */}
                <div className="flex items-center gap-1.5">
                  {Object.entries(reactions).map(([emoji, count]) => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(emoji)}
                      className="px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur bg-black/40 hover:scale-110 active:scale-95 transition-transform flex items-center gap-1 cursor-pointer"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <span>{emoji}</span>
                      <span className="text-[10px] font-mono text-zinc-300">{count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Session Details Header */}
            <div className="p-5 rounded-2xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                    Main Stage Keynote
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Track: AI & Systems
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer hover:bg-white/5 transition-colors flex items-center gap-1.5" style={{ borderColor: 'var(--border)' }}>
                    <span>📥 Download Deck</span>
                  </button>
                  <button className="px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer hover:bg-white/5 transition-colors flex items-center gap-1.5" style={{ borderColor: 'var(--border)' }}>
                    <span>⭐ Bookmark</span>
                  </button>
                </div>
              </div>

              <h1 className="text-xl font-black leading-snug">
                Scalable Autonomous Systems & Ambient AI in Production Environments
              </h1>

              <p className="text-xs leading-relaxed mt-2" style={{ color: 'var(--text-secondary)' }}>
                Exploring the architectural paradigm shift from single-prompt LLM wrappers to resilient, state-synchronized multi-agent swarms operating under enterprise concurrency.
              </p>

              <div className="flex items-center gap-4 mt-4 pt-4 border-t text-xs" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] text-white" style={{ background: 'var(--accent)' }}>
                    ER
                  </div>
                  <span className="font-bold text-white">Dr. Elena Rostova</span>
                </div>
                <span style={{ color: 'var(--text-secondary)' }}>•</span>
                <span style={{ color: 'var(--text-secondary)' }}>Moderated by David Sterling (Venture Lead)</span>
              </div>
            </div>
          </main>

          {/* Right Column: Q&A, Polls, Chat (Col span 3) */}
          <aside className="lg:col-span-3 border-l flex flex-col overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            {/* Tabs Header */}
            <div className="p-3 border-b flex gap-1" style={{ borderColor: 'var(--border)' }}>
              {[
                { id: 'qa', label: 'Q&A (3)', icon: '❓' },
                { id: 'polls', label: 'Live Poll', icon: '📊' },
                { id: 'chat', label: 'Chat', icon: '💬' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                  style={{
                    background: activeTab === tab.id ? 'var(--accent)' : 'transparent',
                    color: activeTab === tab.id ? '#FFF' : 'var(--text-secondary)',
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Q&A Tab Content */}
            {activeTab === 'qa' && (
              <div className="flex-1 flex flex-col overflow-hidden p-4">
                <div className="text-[11px] mb-3 flex items-center justify-between" style={{ color: 'var(--text-secondary)' }}>
                  <span>Upvote questions for the speaker</span>
                  <span className="font-bold text-white">Sorted by Top</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {qaList.map((q) => (
                    <div key={q.id} className="p-3.5 rounded-2xl border flex items-start gap-3" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                      <button
                        onClick={() => handleVote(q.id)}
                        className="flex flex-col items-center justify-center p-2 rounded-xl border transition-transform active:scale-90 cursor-pointer"
                        style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
                      >
                        <span className="text-[10px]">▲</span>
                        <span className="font-mono font-bold text-xs">{q.votes}</span>
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-[10px] mb-1">
                          <span className="font-bold text-white">{q.user}</span>
                          {q.answered && (
                            <span className="px-1.5 py-0.5 rounded font-bold text-[9px] bg-emerald-500/20 text-emerald-400">
                              Answered
                            </span>
                          )}
                        </div>
                        <p className="text-xs leading-snug">{q.question}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit Question Input */}
                <form onSubmit={handleAddQuestion} className="mt-3 pt-3 border-t flex gap-2" style={{ borderColor: 'var(--border)' }}>
                  <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Ask Dr. Elena Rostova..."
                    className="flex-1 px-3 py-2 rounded-xl border text-xs outline-none bg-black/20"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  />
                  <button type="submit" className="px-3.5 py-2 rounded-xl text-xs font-bold text-white cursor-pointer shadow-sm" style={{ background: 'var(--accent)' }}>
                    Ask
                  </button>
                </form>
              </div>
            )}

            {/* Live Polls Tab */}
            {activeTab === 'polls' && (
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                <div className="p-4 rounded-2xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--accent)' }}>
                    Active Poll · 840 Votes
                  </div>
                  <h4 className="font-bold text-xs leading-snug mb-3">
                    Are you currently running multi-agent workflows in production?
                  </h4>

                  <div className="space-y-2 text-xs">
                    {[
                      { option: 'Yes, fully deployed', pct: 28 },
                      { option: 'In proof-of-concept testing', pct: 54 },
                      { option: 'Researching for next quarter', pct: 18 },
                    ].map((poll, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-medium">
                          <span>{poll.option}</span>
                          <span className="font-mono font-bold">{poll.pct}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${poll.pct}%`, background: 'var(--accent)' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Chat Tab */}
            {activeTab === 'chat' && (
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div className="space-y-3 text-xs overflow-y-auto flex-1 pr-1">
                  {[
                    { user: 'Maya_UX', time: '10:41', text: 'Incredible breakdown on latency mitigation!' },
                    { user: 'TheoDev', time: '10:42', text: 'Agree, the state synchronization slide was mindblowing.' },
                    { user: 'Chris_K', time: '10:43', text: 'Hello everyone from Berlin! 🇩🇪' },
                    { user: 'Dr_Rostova_Bot', time: '10:43', text: 'Reference papers are linked in the top deck download.' },
                  ].map((msg, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="font-bold text-white">{msg.user}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{msg.time}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t flex gap-2" style={{ borderColor: 'var(--border)' }}>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 rounded-xl border text-xs outline-none bg-black/20"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  />
                  <button className="px-3.5 py-2 rounded-xl text-xs font-bold text-white cursor-pointer" style={{ background: 'var(--accent)' }}>
                    Send
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  )
}
