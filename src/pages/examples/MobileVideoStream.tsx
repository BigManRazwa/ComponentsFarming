import { useState, useEffect } from 'react';

type Variant = 'red' | 'violet' | 'cyan';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#EF4444': 'red',
  '#8B5CF6': 'violet',
  '#06B6D4': 'cyan',
};

export function MobileVideoStream({ variant = 'red' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  const [activeGenre, setActiveGenre] = useState<string>('Action');
  const [activeTab, setActiveTab] = useState<string>('Home');

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('red'); 
        setCustomFont(null); 
        return; 
      }
      if (variation.font) setCustomFont(variation.font);
      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) { 
        setActiveTheme(themeName); 
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const continueWatching = [
    { id: 1, title: 'Rebel Moon', progress: 60, timeLeft: '1h 22m left' },
    { id: 2, title: 'The Witcher S3', progress: 35, timeLeft: '45m left' },
    { id: 3, title: 'Bridgerton', progress: 80, timeLeft: '20m left' },
  ];

  const trendingNow = [
    { id: 1, title: 'The Crown', rating: '8.7' },
    { id: 2, title: 'Extraction 2', rating: '7.4' },
    { id: 3, title: 'Squid Game', rating: '9.1' },
    { id: 4, title: 'Outer Banks', rating: '8.0' },
  ];

  const top10 = [
    { id: 1, title: 'The Night Agent', genre: 'Thriller, Action' },
    { id: 2, title: 'Bridgerton', genre: 'Drama, Romance' },
    { id: 3, title: 'Cobra Kai', genre: 'Action, Comedy' },
  ];

  const categories = ['Action', 'Comedy', 'Drama', 'Sci-Fi'];

  const bottomNav = [
    { id: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'Search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { id: 'Downloads', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' },
    { id: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .stream-wrapper {
          --accent: #EF4444;
          --accent-hover: #DC2626;
          --accent-light: rgba(239,68,68,0.12);
          --bg-primary: #0A0A0A;
          --bg-secondary: #141414;
          --bg-card: #1E1E1E;
          --border: #2A2A2A;
          --text-primary: #F5F5F5;
          --text-secondary: #888888;
          font-family: 'Inter', sans-serif;
        }
        .stream-wrapper[data-theme="violet"] {
          --accent: #8B5CF6;
          --accent-hover: #7C3AED;
          --accent-light: rgba(139,92,246,0.12);
          --bg-primary: #0C0A14;
          --bg-secondary: #14101E;
          --bg-card: #1A1428;
          --border: #241E3A;
          --text-primary: #F1F0FF;
          --text-secondary: #7C72A8;
        }
        .stream-wrapper[data-theme="cyan"] {
          --accent: #06B6D4;
          --accent-hover: #0891B2;
          --accent-light: rgba(6,182,212,0.12);
          --bg-primary: #0A0E14;
          --bg-secondary: #111820;
          --bg-card: #1A2230;
          --border: #1E2E40;
          --text-primary: #F1F5F9;
          --text-secondary: #64748B;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div 
        className="stream-wrapper min-h-screen bg-black flex justify-center text-[var(--text-primary)]"
        data-theme={activeTheme === 'red' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col overflow-x-hidden">
          
          {/* 1. Header */}
          <div className="px-5 pt-4 flex justify-between items-center z-10">
            <div className="font-bold text-xl text-[var(--accent)] italic">StreamX</div>
            <div className="flex items-center gap-4">
              <svg className="w-6 h-6 text-[var(--text-primary)] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <div className="w-8 h-8 bg-[var(--bg-card)] border border-[var(--border)] rounded-full overflow-hidden cursor-pointer">
                <div className="w-full h-full bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-card)]" />
              </div>
            </div>
          </div>

          {/* 2. Featured Hero */}
          <div className="mx-5 mt-3 h-[200px] bg-[var(--bg-card)] rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 via-[var(--accent)]/5 to-transparent" />
            <div className="absolute top-3 right-3 bg-[var(--accent)] text-white text-xs px-2 py-1 rounded-full z-10 font-medium">
              New Episode
            </div>
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--bg-primary)]/90 to-transparent z-10" />
            
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div className="font-bold text-xl">Stranger Things</div>
              <div className="text-sm text-[var(--text-secondary)] mt-0.5">Season 5</div>
              <div className="mt-2 flex gap-2">
                <button className="w-9 h-9 bg-[var(--accent)] rounded-full flex items-center justify-center cursor-pointer shadow-lg">
                  <svg className="w-4 h-4 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <button className="bg-[var(--accent)] text-white text-xs px-4 py-2 rounded-full font-bold cursor-pointer shadow-lg hover:bg-[var(--accent-hover)] transition-colors">
                  Watch Now
                </button>
              </div>
            </div>
          </div>

          {/* 3. Continue Watching */}
          <div className="px-5 mt-5">
            <div className="font-bold text-base">Continue Watching</div>
            <div className="flex gap-3 mt-3 overflow-x-auto pb-1 scrollbar-hide">
              {continueWatching.map((item) => (
                <div key={item.id} className="min-w-[140px] bg-[var(--bg-card)] rounded-xl overflow-hidden cursor-pointer border border-[var(--border)]">
                  <div className="h-20 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-card)] relative group">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                       <svg className="w-8 h-8 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M8 5v14l11-7z" />
                       </svg>
                    </div>
                  </div>
                  <div className="h-1 bg-[var(--bg-secondary)] w-full">
                    <div className="h-1 bg-[var(--accent)]" style={{ width: item.progress + '%' }}></div>
                  </div>
                  <div className="p-2">
                    <div className="text-xs font-bold truncate">{item.title}</div>
                    <div className="text-xs text-[var(--text-secondary)] mt-0.5">{item.timeLeft}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Trending Now */}
          <div className="px-5 mt-5">
            <div className="flex justify-between items-end">
              <div className="font-bold text-base">Trending Now</div>
              <div className="text-[var(--accent)] text-xs font-medium cursor-pointer">See All</div>
            </div>
            <div className="flex gap-3 mt-3 overflow-x-auto pb-1 scrollbar-hide">
              {trendingNow.map((item) => (
                <div key={item.id} className="min-w-[110px] h-[160px] bg-[var(--bg-card)] rounded-xl overflow-hidden relative cursor-pointer border border-[var(--border)] group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-card)]" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-2 right-2 bg-[var(--bg-primary)]/70 text-[var(--text-primary)] text-xs px-1.5 py-0.5 rounded backdrop-blur-sm border border-[var(--border)] font-medium">
                    {item.rating}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 text-xs font-bold leading-tight group-hover:text-[var(--accent)] transition-colors">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Top 10 Today */}
          <div className="px-5 mt-5">
            <div className="font-bold text-base">Top 10 Today</div>
            <div className="mt-3 space-y-3">
              {top10.map((item) => (
                <div key={item.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className="text-3xl font-bold italic w-10 text-transparent text-center" style={{ WebkitTextStroke: '1px var(--accent)', opacity: 0.5 }}>
                    {item.id}
                  </div>
                  <div className="w-16 h-12 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-card)] rounded-lg border border-[var(--border)] overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm group-hover:text-[var(--accent)] transition-colors">{item.title}</div>
                    <div className="text-xs text-[var(--text-secondary)] mt-0.5">{item.genre}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Categories */}
          <div className="px-5 mt-5 pb-24">
            <div className="font-bold text-sm">Categories</div>
            <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-hide pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveGenre(cat)}
                  className={`px-4 py-2 border rounded-full text-xs font-medium cursor-pointer whitespace-nowrap transition-colors ${activeGenre === cat ? 'bg-[var(--accent)] border-[var(--accent)] text-white' : 'bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--text-secondary)]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 7. Bottom Nav */}
          <div className="fixed bottom-0 w-full max-w-[390px] bg-[var(--bg-primary)]/95 backdrop-blur border-t border-[var(--border)] z-50">
            <div className="flex justify-around items-center h-16 pb-2">
              {bottomNav.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1 w-16 h-full cursor-pointer transition-colors ${activeTab === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  <div className={`transition-transform duration-200 ${activeTab === tab.id ? 'scale-110' : ''}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                    </svg>
                  </div>
                  <span className="text-[10px] font-medium">{tab.id}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
