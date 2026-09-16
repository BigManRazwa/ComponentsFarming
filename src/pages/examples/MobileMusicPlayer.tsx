import { useState, useEffect } from 'react';

export function MobileMusicPlayer({ variant = 'green' }: { variant?: 'green' | 'purple' | 'rose' }) {
  const [activeTab, setActiveTab] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  useEffect(() => {
    window.postMessage({ type: 'customFont', font: 'Inter' }, '*');
  }, []);

  const themes = {
    green: {
      '--accent': '#22C55E',
      '--accent-hover': '#16A34A',
      '--accent-light': 'rgba(34,197,94,0.12)',
      '--bg-primary': '#0A0A0A',
      '--bg-secondary': '#141414',
      '--bg-card': '#1A1A1A',
      '--border': '#262626',
      '--text-primary': '#FAFAFA',
      '--text-secondary': '#737373',
    },
    purple: {
      '--accent': '#A855F7',
      '--accent-hover': '#9333EA',
      '--accent-light': 'rgba(168,85,247,0.12)',
      '--bg-primary': '#0C0812',
      '--bg-secondary': '#14101E',
      '--bg-card': '#1A1428',
      '--border': '#241E3A',
      '--text-primary': '#F5F0FF',
      '--text-secondary': '#8878A8',
    },
    rose: {
      '--accent': '#F43F5E',
      '--accent-hover': '#E11D48',
      '--accent-light': 'rgba(244,63,94,0.12)',
      '--bg-primary': '#120A0C',
      '--bg-secondary': '#1C1014',
      '--bg-card': '#24161C',
      '--border': '#3A1E28',
      '--text-primary': '#FFF0F2',
      '--text-secondary': '#C08090',
    }
  };

  const themeStyle = themes[variant] as React.CSSProperties;

  return (
    <div className="music-wrapper w-full min-h-screen bg-[#050505] flex items-center justify-center p-4 sm:p-8 font-sans" data-theme={variant}>
      <div 
        style={themeStyle}
        className="w-full max-w-[390px] h-[844px] bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden flex flex-col shadow-2xl rounded-[40px] border-[8px] border-black ring-1 ring-white/10"
      >
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4">
            <svg className="cursor-pointer text-[var(--text-primary)]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
            <span className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Now Playing</span>
            <svg className="cursor-pointer text-[var(--text-primary)]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="19" cy="12" r="1"/>
              <circle cx="5" cy="12" r="1"/>
            </svg>
          </div>

          {/* Album Art */}
          <div className="px-8 mt-4">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative" style={{ boxShadow: '0 25px 50px -12px var(--accent-light)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 animate-pulse" style={{ animationDuration: '8s' }}></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-30"></div>
              {/* Optional overlay gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>

          {/* Song Info */}
          <div className="px-5 mt-6 flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">Midnight Dreams</h1>
              <span className="text-sm text-[var(--text-secondary)] mt-1 font-medium">Luna Eclipse</span>
            </div>
            <div className="flex items-center gap-4">
              <svg 
                onClick={() => setIsLiked(!isLiked)} 
                className={`cursor-pointer transition-colors ${isLiked ? 'text-[var(--accent)] fill-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`} 
                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
              <svg className="cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/>
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
              </svg>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-5 mt-5">
            <div className="h-1 bg-[var(--border)] rounded-full relative cursor-pointer group">
              <div className="h-1 bg-[var(--accent)] rounded-full absolute left-0 top-0" style={{ width: '58%' }}></div>
              <div className="w-3 h-3 bg-[var(--accent)] rounded-full absolute top-1/2 -translate-y-1/2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" style={{ left: '58%', transform: 'translate(-50%, -50%)' }}></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-[var(--text-secondary)] font-medium">
              <span>2:34</span>
              <span>4:12</span>
            </div>
          </div>

          {/* Controls */}
          <div className="px-5 mt-4 flex items-center justify-between">
            <svg 
              onClick={() => setIsShuffle(!isShuffle)}
              className={`cursor-pointer transition-colors ${isShuffle ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`} 
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/>
              <path d="m18 2 4 4-4 4"/>
              <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/>
              <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/>
              <path d="m18 14 4 4-4 4"/>
            </svg>
            
            <svg className="cursor-pointer text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="19 20 9 12 19 4 19 20"/>
              <line x1="5" x2="5" y1="19" y2="5" strokeWidth="2"/>
            </svg>
            
            <div 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg"
              style={{ boxShadow: '0 10px 25px -5px var(--accent-light)' }}
            >
              {isPlaying ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"/>
                  <rect x="14" y="4" width="4" height="16"/>
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              )}
            </div>
            
            <svg className="cursor-pointer text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 4 15 12 5 20 5 4"/>
              <line x1="19" x2="19" y1="5" y2="19" strokeWidth="2"/>
            </svg>
            
            <svg 
              onClick={() => setIsRepeat(!isRepeat)}
              className={`cursor-pointer transition-colors ${isRepeat ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`} 
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="m17 2 4 4-4 4"/>
              <path d="M3 11v-1a4 4 0 0 1 4-4h14"/>
              <path d="m7 22-4-4 4-4"/>
              <path d="M21 13v1a4 4 0 0 1-4 4H3"/>
            </svg>
          </div>

          {/* Volume */}
          <div className="px-8 mt-4 flex items-center justify-between">
            <svg className="text-[var(--text-secondary)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            </svg>
            <div className="flex-1 h-1 bg-[var(--border)] rounded-full mx-3 relative cursor-pointer group">
              <div className="h-1 bg-[var(--accent)] rounded-full absolute left-0 top-0" style={{ width: '60%' }}></div>
              <div className="w-3 h-3 bg-[var(--accent)] rounded-full absolute top-1/2 -translate-y-1/2 shadow opacity-0 group-hover:opacity-100 transition-opacity" style={{ left: '60%', transform: 'translate(-50%, -50%)' }}></div>
            </div>
            <svg className="text-[var(--text-secondary)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          </div>

          {/* Up Next */}
          <div className="px-5 mt-6">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">Up Next</h3>
              <span className="text-xs text-[var(--accent)] cursor-pointer hover:underline">View Queue</span>
            </div>
            
            <div className="space-y-1">
              {[
                { id: 1, title: 'Nebula', artist: 'Starlight Echo', duration: '3:45', gradient: 'from-purple-500 to-blue-500' },
                { id: 2, title: 'Chasing Echoes', artist: 'Orion', duration: '4:02', gradient: 'from-pink-500 to-red-500' },
                { id: 3, title: 'Orbit', artist: 'Astral Waves', duration: '3:28', gradient: 'from-blue-400 to-teal-500' }
              ].map((song) => (
                <div key={song.id} className="py-3 px-2 flex items-center gap-3 border-b border-[var(--border)] border-opacity-30 cursor-pointer hover:bg-[var(--bg-card)] rounded-lg transition-colors group">
                  <span className="text-sm font-medium text-[var(--text-secondary)] w-4">{song.id}</span>
                  <div className={`w-[40px] h-[40px] rounded-lg bg-gradient-to-br ${song.gradient} shadow-inner`}></div>
                  <div className="flex-1 overflow-hidden">
                    <div className="font-bold text-sm text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">{song.title}</div>
                    <div className="text-xs text-[var(--text-secondary)] truncate">{song.artist}</div>
                  </div>
                  <div className="text-xs font-medium text-[var(--text-secondary)] right">{song.duration}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Played */}
          <div className="px-5 mt-5 pb-24">
            <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1">Recently Played</h3>
            <div className="flex gap-3 mt-3 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden">
              {[
                { title: 'Orion', gradient: 'from-purple-600 to-blue-600' },
                { title: 'Starlight', gradient: 'from-pink-500 to-orange-400' },
                { title: 'Luna', gradient: 'from-blue-500 to-teal-400' },
                { title: 'Sol', gradient: 'from-amber-500 to-red-500' }
              ].map((album, i) => (
                <div key={i} className="flex flex-col gap-1 min-w-[100px] cursor-pointer group">
                  <div className={`w-[100px] h-[100px] rounded-xl bg-gradient-to-br ${album.gradient} shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300`}></div>
                  <span className="text-xs text-[var(--text-secondary)] mt-1 text-center font-medium group-hover:text-[var(--text-primary)] transition-colors">{album.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[var(--bg-primary)]/95 backdrop-blur border-t border-[var(--border)] flex items-center justify-around px-2 z-50">
          {[
            { id: 'home', paths: ['m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'], label: 'Home' },
            { id: 'search', paths: ['circle cx="11" cy="11" r="8"','m21 21-4.3-4.3'], label: 'Search' },
            { id: 'library', paths: ['path d="M9 18V5l12-2v13"','circle cx="6" cy="18" r="3"','circle cx="18" cy="16" r="3"'], label: 'Library' },
            { id: 'premium', paths: ['polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"'], label: 'Premium' },
          ].map((tab) => (
            <div 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 cursor-pointer transition-colors w-16 ${activeTab === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={activeTab === tab.id ? 'scale-110 transition-transform' : ''}>
                {tab.paths.map((p, j) => {
                  if (p.startsWith('circle')) {
                    const match = p.match(/cx="([^"]+)" cy="([^"]+)" r="([^"]+)"/);
                    return match ? <circle key={j} cx={match[1]} cy={match[2]} r={match[3]} /> : null;
                  }
                  if (p.startsWith('path d=')) {
                    const match = p.match(/d="([^"]+)"/);
                    return match ? <path key={j} d={match[1]} /> : null;
                  }
                  if (p.startsWith('polygon points=')) {
                    const match = p.match(/points="([^"]+)"/);
                    return match ? <polygon key={j} points={match[1]} /> : null;
                  }
                  return <path key={j} d={p} />;
                })}
              </svg>
              <span className="text-[10px] font-medium hidden">{tab.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
