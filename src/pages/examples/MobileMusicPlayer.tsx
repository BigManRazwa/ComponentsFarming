import { useState, useEffect } from 'react';

type Variant = 'purple' | 'crimson' | 'emerald';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#A855F7': 'purple',
  '#DC2626': 'crimson',
  '#059669': 'emerald',
};

export function MobileMusicPlayer({ variant = 'purple' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [currentSong] = useState({ title: 'Blinding Lights', artist: 'The Weeknd' });
  const [customAccent, setCustomAccent] = useState<{ accent: string; hover: string; gradient: string } | null>(null);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;

      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('purple');
        setCustomAccent(null);
        return;
      }

      const themeName = ACCENT_TO_THEME[variation.accent.toUpperCase()];
      if (themeName) {
        setActiveTheme(themeName);
        setCustomAccent(null);
      } else {
        setActiveTheme('purple');
        setCustomAccent({
          accent: variation.accent,
          hover: variation.accent,
          gradient: `linear-gradient(135deg, ${variation.accent}cc, ${variation.accent})`
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .music-wrapper {
          --accent: #A855F7;
          --accent-hover: #9333EA;
          --bg-primary: #0A0A0F;
          --bg-secondary: #141420;
          --bg-card: #1A1A2E;
          --border: #2A2A40;
          --text-primary: #F5F5F5;
          --text-secondary: #888888;
          --bg-gradient: linear-gradient(135deg, #c084fc, #9333ea);
          font-family: 'Inter', sans-serif;
        }
        .music-wrapper[data-theme="crimson"] {
          --accent: #DC2626;
          --accent-hover: #B91C1C;
          --bg-primary: #0F0A0A;
          --bg-secondary: #1A1212;
          --bg-card: #241818;
          --border: #3A2222;
          --text-primary: #F5F5F5;
          --text-secondary: #AA8888;
          --bg-gradient: linear-gradient(135deg, #f87171, #dc2626);
        }
        .music-wrapper[data-theme="emerald"] {
          --accent: #059669;
          --accent-hover: #047857;
          --bg-primary: #0A0F0C;
          --bg-secondary: #121A16;
          --bg-card: #182420;
          --border: #223A30;
          --text-primary: #F5F5F5;
          --text-secondary: #88AA98;
          --bg-gradient: linear-gradient(135deg, #34d399, #059669);
        }
        ${customAccent ? `
        .music-wrapper {
          --accent: ${customAccent.accent} !important;
          --accent-hover: ${customAccent.hover} !important;
          --bg-gradient: ${customAccent.gradient} !important;
        }
        ` : ''}
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="music-wrapper min-h-screen bg-[var(--bg-primary)] flex justify-center text-[var(--text-primary)]" data-theme={activeTheme === 'purple' ? undefined : activeTheme}>
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative shadow-2xl flex flex-col pb-36">
          
          {/* 1. Header */}
          <div className="px-5 pt-4 pb-2 flex items-center justify-between z-10 sticky top-0 bg-[var(--bg-primary)]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[image:var(--bg-gradient)]" />
              <span className="text-[var(--text-secondary)] text-sm font-medium">Good Evening</span>
            </div>
            <div className="flex items-center gap-4 text-[var(--text-primary)]">
              <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 scrollbar-hide">
            {/* 2. Featured Playlist Hero */}
            <div className="mx-5 mt-2 rounded-2xl aspect-[16/9] overflow-hidden bg-[image:var(--bg-gradient)] relative flex flex-col items-center justify-center cursor-pointer group">
              <div className="absolute inset-0 bg-black/20" />
              <div className="z-10 text-center flex flex-col items-center">
                <h2 className="text-white text-2xl font-bold mb-1">Chill Vibes</h2>
                <p className="text-white/80 text-sm mb-4">Relax and unwind with smooth tracks</p>
                <button className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg className="w-8 h-8 text-[var(--accent)] ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </button>
              </div>
            </div>

            {/* 3. Recently Played */}
            <div className="mt-6 px-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Recently Played</h3>
                <span className="text-[var(--accent)] text-sm font-medium cursor-pointer">See All</span>
              </div>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {[
                  { t: 'Blinding Lights', a: 'The Weeknd', c: 'linear-gradient(135deg, #ef4444, #b91c1c)' },
                  { t: 'Chill Vibes', a: 'Playlist', c: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' },
                  { t: 'Everywhere', a: 'Damy Jiose', c: 'linear-gradient(135deg, #10b981, #047857)' },
                  { t: 'Midnight City', a: 'M83', c: 'linear-gradient(135deg, #f59e0b, #b45309)' },
                  { t: 'Starboy', a: 'The Weeknd', c: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' },
                  { t: 'Levitating', a: 'Dua Lipa', c: 'linear-gradient(135deg, #ec4899, #be185d)' }
                ].map((item, i) => (
                  <div key={i} className="min-w-[112px] flex flex-col cursor-pointer group">
                    <div className="w-28 h-28 rounded-lg mb-2" style={{ background: item.c }} />
                    <div className="text-xs font-bold truncate group-hover:text-[var(--accent)] transition-colors">{item.t}</div>
                    <div className="text-xs text-[var(--text-secondary)] truncate">{item.a}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Made For You */}
            <div className="mt-6 px-5">
              <h3 className="font-bold text-lg mb-4">Made For You</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { t: 'Discover Weekly', s: 'Fresh picks for you', c: 'linear-gradient(135deg, #6366f1, #4338ca)' },
                  { t: 'Release Radar', s: 'New from artists you follow', c: 'linear-gradient(135deg, #14b8a6, #0f766e)' },
                  { t: 'Daily Mix 1', s: 'Your favorites mixed', c: 'linear-gradient(135deg, #f43f5e, #be123c)' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col cursor-pointer group">
                    <div className="aspect-square rounded-xl mb-2" style={{ background: item.c }} />
                    <div className="text-xs font-bold truncate group-hover:text-[var(--accent)] transition-colors">{item.t}</div>
                    <div className="text-xs text-[var(--text-secondary)] line-clamp-2 mt-0.5">{item.s}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Top Charts */}
            <div className="mt-6 px-5 pb-36">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Top Charts</h3>
                <span className="text-[var(--accent)] text-sm font-medium cursor-pointer">View All</span>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { t: 'Anti-Hero', a: 'Taylor Swift', d: '3:21' },
                  { t: 'Flowers', a: 'Miley Cyrus', d: '3:20' },
                  { t: 'As It Was', a: 'Harry Styles', d: '2:47' },
                  { t: 'Unholy', a: 'Sam Smith', d: '2:36' },
                  { t: 'Bad Habit', a: 'Steve Lacy', d: '3:52' }
                ].map((item, i) => (
                  <div key={i} className="bg-[var(--bg-card)] rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-[var(--border)] transition-colors">
                    <span className="text-[var(--accent)] font-bold w-4 text-center">{i + 1}</span>
                    <div className="w-10 h-10 rounded-lg shrink-0 bg-[image:var(--bg-gradient)]" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate">{item.t}</div>
                      <div className="text-xs text-[var(--text-secondary)] truncate">{item.a}</div>
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">{item.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. Mini Player Bar */}
          <div className="fixed bottom-16 left-0 right-0 z-40 flex justify-center pointer-events-none">
            <div className="w-full max-w-[390px] px-5 pointer-events-auto">
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3 flex flex-col shadow-lg cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg shrink-0" style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }} />
                    <div>
                      <div className="font-bold text-sm">{currentSong.title}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{currentSong.artist}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--text-primary)]">
                    <button onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }} className="hover:text-[var(--accent)] transition-colors">
                      {isPlaying ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      )}
                    </button>
                    <button onClick={(e) => e.stopPropagation()} className="hover:text-[var(--accent)] transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
                <div className="w-full h-1 bg-[var(--bg-primary)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent)] w-[35%] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* 7. Bottom Navigation */}
          <div className="bg-[var(--bg-secondary)] absolute bottom-0 w-full max-w-[390px] h-16 border-t border-[var(--border)] flex z-50">
            {[
              { id: 'home', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
              { id: 'search', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> },
              { id: 'library', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
              { id: 'premium', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg> }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center cursor-pointer transition-colors ${activeTab === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                {tab.icon}
              </button>
            ))}
          </div>

        </div>
        
        {/* Floating Theme Switcher */}
        <div className="fixed bottom-5 right-5 bg-[var(--bg-card)] p-2.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.5)] flex gap-2.5 z-[1000] border border-[var(--border)]">
          {[
            { id: 'purple', bg: '#A855F7', label: 'Purple' },
            { id: 'crimson', bg: '#DC2626', label: 'Crimson' },
            { id: 'emerald', bg: '#059669', label: 'Emerald' }
          ].map(theme => (
            <button 
              key={theme.id}
              onClick={() => {
                setActiveTheme(theme.id as Variant);
                setCustomAccent(null);
              }}
              className={`w-[30px] h-[30px] rounded-full border-2 cursor-pointer transition-transform relative group hover:scale-110 ${activeTheme === theme.id && !customAccent ? 'border-white scale-110' : 'border-transparent'}`}
              style={{ background: theme.bg }}
            >
              <span className="absolute -top-[35px] left-1/2 -translate-x-1/2 bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border)] text-[12px] px-2 py-1 rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity group-hover:opacity-100">
                {theme.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
