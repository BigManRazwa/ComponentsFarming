import { useState, useEffect } from 'react';

type Variant = 'twilight' | 'ocean' | 'forest';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#8B5CF6': 'twilight',
  '#06B6D4': 'ocean',
  '#22C55E': 'forest',
};

export function MobileMeditationApp({ variant = 'twilight' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [activeTab, setActiveTab] = useState<'Home' | 'Explore' | 'Timer' | 'Journal' | 'Profile'>('Home');
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('twilight');
        return;
      }
      const themeName = ACCENT_TO_THEME[variation.accent] || 'twilight';
      setActiveTheme(themeName);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const moods = [
    { id: 0, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }, // Sad
    { id: 1, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 15h8M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }, // Meh
    { id: 2, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15c-1.5 0-3-.5-4-1M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }, // Okay
    { id: 3, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }, // Good
    { id: 4, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }, // Great (can use same as Good or tweak)
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .meditation-wrapper {
          --accent: #8B5CF6;
          --accent-light: #C4B5FD;
          --bg-gradient-start: #1A0A3E;
          --bg-gradient-end: #0F0520;
          --bg-card: rgba(139,92,246,0.1);
          --border: rgba(139,92,246,0.2);
          --text-primary: #F5F0FF;
          --text-secondary: rgba(245,240,255,0.6);
          font-family: 'Inter', sans-serif;
        }
        .meditation-wrapper[data-theme="ocean"] {
          --accent: #06B6D4;
          --accent-light: #67E8F9;
          --bg-gradient-start: #0A2030;
          --bg-gradient-end: #051018;
          --bg-card: rgba(6,182,212,0.1);
          --border: rgba(6,182,212,0.2);
          --text-primary: #F0FAFF;
          --text-secondary: rgba(240,250,255,0.6);
        }
        .meditation-wrapper[data-theme="forest"] {
          --accent: #22C55E;
          --accent-light: #86EFAC;
          --bg-gradient-start: #0A2010;
          --bg-gradient-end: #051008;
          --bg-card: rgba(34,197,94,0.1);
          --border: rgba(34,197,94,0.2);
          --text-primary: #F0FFF5;
          --text-secondary: rgba(240,255,245,0.6);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="meditation-wrapper min-h-screen bg-black flex justify-center text-[var(--text-primary)]" data-theme={activeTheme === 'twilight' ? undefined : activeTheme}>
        <div 
          className="w-full max-w-[390px] min-h-screen relative flex flex-col pb-20 overflow-x-hidden"
          style={{ background: 'linear-gradient(180deg, var(--bg-gradient-start), var(--bg-gradient-end))' }}
        >
          
          <div className="overflow-y-auto flex-1 scrollbar-hide">
            {/* 1. Header */}
            <div className="px-5 pt-5 flex justify-between items-center">
              <div>
                <div className="text-[var(--text-secondary)] text-sm">Hello,</div>
                <div className="text-xl font-bold">Alex</div>
              </div>
              <div className="bg-[var(--accent)]/20 border border-[var(--accent)]/30 rounded-full px-3 py-1 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C12 2 8 6.5 8 11.5C8 14.5 10 16.5 10 16.5C10 16.5 9 14.5 9 13C9 13 4 14.5 4 18.5C4 20.5 5.5 22 7.5 22C11.5 22 13 18 13 18C13 18 16 20.5 18 20.5C20.5 20.5 22 18.5 22 15.5C22 10.5 12 2 12 2Z" /></svg>
                <span className="text-sm font-medium">7 day streak</span>
              </div>
            </div>

            {/* 2. Featured Session */}
            <div className="mx-5 mt-4">
              <div className="bg-[var(--bg-card)] backdrop-blur rounded-2xl border border-[var(--border)] p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="text-[var(--accent)]">
                    <svg className="w-[48px] h-[48px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-black/20 text-xs font-medium px-2 py-1 rounded-full">15 min</span>
                    <span className="bg-black/20 text-xs font-medium px-2 py-1 rounded-full">Guided</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-1">Evening Calm</h2>
                <p className="text-[var(--text-secondary)] text-sm mb-3">Wind down and prepare for a restful night's sleep</p>
                <button className="w-full bg-[var(--accent)] text-black font-bold rounded-xl py-3 cursor-pointer mt-3 transition-transform active:scale-95 hover:opacity-90">
                  Begin Session
                </button>
              </div>
            </div>

            {/* 3. Daily Progress */}
            <div className="mx-5 mt-5">
              <h2 className="font-bold text-lg mb-3">Daily Progress</h2>
              <div className="bg-[var(--bg-card)] backdrop-blur rounded-2xl border border-[var(--border)] p-5 flex items-center">
                <div className="relative w-[100px] h-[100px] flex-shrink-0">
                  <svg className="w-[100px] h-[100px] transform -rotate-90">
                    <circle cx="50" cy="50" r="40" stroke="var(--border)" strokeWidth="8" fill="transparent" />
                    <circle cx="50" cy="50" r="40" stroke="var(--accent)" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.66)} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-bold text-lg">2/3</span>
                    <span className="text-[9px] text-[var(--text-secondary)]">sessions</span>
                  </div>
                </div>
                <div className="ml-5 flex flex-col gap-3 flex-1">
                  <div>
                    <div className="font-bold">42 min</div>
                    <div className="text-xs text-[var(--text-secondary)]">total today</div>
                  </div>
                  <div>
                    <div className="font-bold">Focus</div>
                    <div className="text-xs text-[var(--text-secondary)]">top category</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Categories */}
            <div className="px-5 mt-5">
              <h2 className="font-bold text-lg mb-3">Explore</h2>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Sleep', icon: <svg className="w-[28px] h-[28px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg> },
                  { label: 'Focus', icon: <svg className="w-[28px] h-[28px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
                  { label: 'Anxiety', icon: <svg className="w-[28px] h-[28px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> },
                  { label: 'Breathe', icon: <svg className="w-[28px] h-[28px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg> }
                ].map((cat, i) => (
                  <div key={i} className="bg-[var(--bg-card)] backdrop-blur rounded-xl border border-[var(--border)] p-4 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-black/10 transition-colors">
                    <div className="text-[var(--accent)] mb-2">
                      {cat.icon}
                    </div>
                    <span className="text-xs font-medium">{cat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Recommended */}
            <div className="px-5 mt-5">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-lg">Recommended</h2>
                <button className="text-[var(--accent)] text-sm font-medium cursor-pointer">See All</button>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { title: 'Mindful Breathing', instructor: 'Sarah J.', duration: '10 min', rating: '4.9', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" /></svg> },
                  { title: 'Deep Relaxation', instructor: 'David L.', duration: '20 min', rating: '4.8', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
                  { title: 'Morning Energy', instructor: 'Emily W.', duration: '15 min', rating: '4.7', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> }
                ].map((item, i) => (
                  <div key={i} className="bg-[var(--bg-card)] backdrop-blur rounded-xl border border-[var(--border)] p-4 flex items-center justify-between cursor-pointer hover:bg-black/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-[44px] h-[44px] rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{item.title}</div>
                        <div className="text-[var(--text-secondary)] text-xs mb-1">{item.instructor}</div>
                        <div className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)]">
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {item.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                            {item.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="w-[36px] h-[36px] rounded-full bg-[var(--accent)] flex items-center justify-center text-black flex-shrink-0 cursor-pointer transition-transform hover:scale-105 active:scale-95">
                      <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Mood Tracker */}
            <div className="mx-5 mt-5">
              <h2 className="font-bold text-lg mb-3">How are you feeling?</h2>
              <div className="bg-[var(--bg-card)] backdrop-blur rounded-xl border border-[var(--border)] p-4">
                <div className="flex justify-between">
                  {moods.map((mood) => (
                    <button 
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${selectedMood === mood.id ? 'bg-[var(--accent)]/20 text-[var(--accent)] ring-2 ring-[var(--accent)]' : 'bg-black/20 text-[var(--text-secondary)] hover:bg-black/40'}`}
                    >
                      {mood.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 7. Stats */}
            <div className="mx-5 mt-5 pb-28">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[var(--bg-card)] backdrop-blur rounded-xl border border-[var(--border)] p-4 flex flex-col justify-center">
                  <div className="text-[var(--accent)] mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div className="font-bold text-xl mb-1">42 min</div>
                  <div className="text-xs text-[var(--text-secondary)]">today</div>
                </div>
                <div className="bg-[var(--bg-card)] backdrop-blur rounded-xl border border-[var(--border)] p-4 flex flex-col justify-center">
                  <div className="text-[var(--accent)] mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="font-bold text-xl mb-1">12</div>
                  <div className="text-xs text-[var(--text-secondary)]">sessions this week</div>
                </div>
              </div>
            </div>
          </div>

          {/* 8. Bottom Nav */}
          <div className="fixed bottom-0 w-full max-w-[390px] h-20 bg-[var(--bg-gradient-end)]/90 backdrop-blur border-t border-[var(--border)] flex z-50">
            {[
              { id: 'Home', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
              { id: 'Explore', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg> },
              { id: 'Timer', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
              { id: 'Journal', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
              { id: 'Profile', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors ${activeTab === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
              >
                {tab.icon}
                <span className="text-[10px] font-medium">{tab.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Floating Variant Switcher */}
        <div className="fixed bottom-5 right-5 bg-[#222] p-2.5 rounded-full shadow-lg flex gap-2.5 z-[1000] border border-[#333]">
          {[
            { id: 'twilight', bg: '#8B5CF6' },
            { id: 'ocean', bg: '#06B6D4' },
            { id: 'forest', bg: '#22C55E' }
          ].map(theme => (
            <button 
              key={theme.id}
              onClick={() => setActiveTheme(theme.id as Variant)}
              className={`w-[30px] h-[30px] rounded-full border-2 cursor-pointer transition-transform hover:scale-110 ${activeTheme === theme.id ? 'border-white scale-110' : 'border-transparent'}`}
              style={{ background: theme.bg }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
