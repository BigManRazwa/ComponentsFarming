import { useState, useEffect } from 'react';

type Variant = 'red' | 'blue' | 'purple';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#E50914': 'red',
  '#0EA5E9': 'blue',
  '#A855F7': 'purple',
};

export function VideoStreaming({ variant = 'red' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);

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
    { title: "Cosmic Odyssey", ep: "S2 E4", progress: 65, type: "show" },
    { title: "The Silent Echo", ep: "S1 E7", progress: 40, type: "show" },
    { title: "Project Nova", ep: "S3 E2", progress: 80, type: "show" },
    { title: "Mars Colony", ep: "Movie", progress: 25, type: "movie" },
    { title: "Galaxy Hunters", ep: "S1 E12", progress: 55, type: "show" },
  ];

  const trendingNow = [
    { title: "Starfall", rating: "4.7", genre: "Drama" },
    { title: "Rogue Squadron", rating: "4.8", genre: "Action" },
    { title: "The Martian", rating: "4.9", genre: "Sci-Fi" },
    { title: "Interstellar", rating: "4.9", genre: "Sci-Fi" },
    { title: "Ad Astra", rating: "4.5", genre: "Drama" },
    { title: "Apollo 11", rating: "4.6", genre: "Documentary" },
  ];

  const top10 = [
    "The Matrix Resurrections",
    "Dune",
    "Blade Runner 2049",
    "Arrival",
    "Ex Machina"
  ];

  const newReleases = [
    { title: "Cyberpunk 2077", year: "2024", rating: "4.9" },
    { title: "Neon Genesis", year: "2024", rating: "4.8" },
    { title: "Dark Matter", year: "2024", rating: "4.7" },
    { title: "Solaris", year: "2024", rating: "4.6" },
    { title: "Foundation", year: "2024", rating: "4.9" },
    { title: "Altered Carbon", year: "2024", rating: "4.8" },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .stream-wrapper {
          --accent: #E50914;
          --accent-hover: #B81D24;
          --bg-primary: #0A0A0A;
          --bg-secondary: #141414;
          --bg-card: #1A1A1A;
          --border: #2A2A2A;
          --text-primary: #FFFFFF;
          --text-secondary: #808080;
          font-family: 'Inter', sans-serif;
        }
        .stream-wrapper[data-theme="blue"] {
          --accent: #0EA5E9;
          --accent-hover: #0284C7;
          --bg-primary: #080C14;
          --bg-secondary: #0E1420;
          --bg-card: #141E2A;
          --border: #1E2A3A;
          --text-primary: #F1F5F9;
          --text-secondary: #64748B;
        }
        .stream-wrapper[data-theme="purple"] {
          --accent: #A855F7;
          --accent-hover: #9333EA;
          --bg-primary: #0C0812;
          --bg-secondary: #14101E;
          --bg-card: #1A1428;
          --border: #241E3A;
          --text-primary: #F5F0FF;
          --text-secondary: #8878A8;
        }
      `}</style>

      <div 
        className="stream-wrapper min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden selection:bg-[var(--accent)] selection:text-white pb-12" 
        data-theme={activeTheme === 'red' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* 1. Nav */}
        <nav className="fixed top-0 left-0 right-0 bg-[var(--bg-primary)]/90 backdrop-blur-sm z-50 px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 cursor-pointer group">
              <svg className="w-8 h-8 text-[var(--accent)] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="font-bold text-2xl tracking-tight text-[var(--accent)]">
                StreamVault
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <span className="text-[var(--text-primary)] cursor-pointer font-semibold">Home</span>
              <span className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">Movies</span>
              <span className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">TV Shows</span>
              <span className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">My List</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <svg className="w-5 h-5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="relative cursor-pointer group">
              <svg className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--accent)] rounded-full"></span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--accent)] to-[var(--bg-secondary)] cursor-pointer border border-[var(--border)] overflow-hidden">
            </div>
          </div>
        </nav>

        {/* 2. Hero */}
        <section className="relative h-[70vh] w-full overflow-hidden flex items-end">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent z-10" />
          
          <div 
            className="absolute inset-0 bg-[var(--bg-secondary)]"
            style={{ 
              backgroundImage: 'radial-gradient(circle at 70% 30%, var(--bg-card) 0%, var(--bg-primary) 100%)' 
            }}
          />

          <div className="relative z-20 w-full px-8 pb-16 max-w-xl">
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 rounded-full border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider bg-[var(--bg-primary)]/50 backdrop-blur-md">Sci-Fi</span>
              <span className="px-3 py-1 rounded-full border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider bg-[var(--bg-primary)]/50 backdrop-blur-md">Action</span>
            </div>
            
            <h1 className="text-5xl font-black tracking-wide mb-4 text-[var(--text-primary)]">
              THE LAST FRONTIER
            </h1>
            
            <div className="flex items-center gap-3 text-sm mb-4">
              <div className="flex items-center text-[var(--accent)]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-bold">4.8</span>
              <span className="text-[var(--text-secondary)]">•</span>
              <span className="text-[var(--text-secondary)] font-medium">2024</span>
              <span className="text-[var(--text-secondary)]">•</span>
              <span className="text-[var(--text-secondary)] font-medium">2h 18m</span>
            </div>
            
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 line-clamp-2">
              In the year 2145, a daring crew embarks on humanity's most dangerous mission to the edge of the known universe, uncovering secrets that could save or destroy civilization.
            </p>
            
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play Now
              </button>
              <button className="flex items-center gap-2 bg-[var(--bg-primary)]/50 backdrop-blur border border-[var(--border)] hover:border-[var(--text-primary)] text-[var(--text-primary)] font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add to List
              </button>
            </div>
          </div>
        </section>

        {/* 3. Continue Watching */}
        <section className="px-8 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Continue Watching</h2>
            <div className="flex gap-2">
              <button className="p-1 rounded-full bg-[var(--bg-card)] hover:bg-[var(--border)] transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-1 rounded-full bg-[var(--bg-card)] hover:bg-[var(--border)] transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {continueWatching.map((item, i) => (
              <div key={i} className="flex-none w-56 group cursor-pointer">
                <div className="relative h-32 rounded-lg overflow-hidden mb-2 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] border border-[var(--border)] group-hover:border-[var(--text-secondary)] transition-colors">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-12 h-12 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--bg-primary)]">
                    <div className="h-full bg-[var(--accent)]" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
                <h3 className="text-sm font-bold truncate group-hover:text-[var(--accent)] transition-colors">{item.title}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{item.ep}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Trending Now */}
        <section className="px-8 mt-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            Trending Now <span>🔥</span>
          </h2>
          
          <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
            {trendingNow.map((item, i) => (
              <div key={i} className="flex-none w-40 group cursor-pointer">
                <div className="relative h-56 rounded-lg overflow-hidden bg-gradient-to-t from-[var(--bg-card)] to-[var(--bg-secondary)] border border-[var(--border)] group-hover:border-[var(--accent)] transition-all transform group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-[var(--accent)]/20">
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                    <h3 className="text-sm font-bold text-white mb-1 leading-tight">{item.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[var(--accent)] flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        {item.rating}
                      </span>
                      <span className="text-xs text-[var(--text-secondary)]">{item.genre}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Top 10 Today */}
        <section className="px-8 mt-8">
          <h2 className="text-xl font-bold mb-4">Top 10 Today</h2>
          
          <div className="flex gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
            {top10.map((_title, i) => (
              <div key={i} className="flex-none flex items-center gap-2 cursor-pointer group hover:-translate-y-1 transition-transform">
                <span 
                  className="text-7xl font-black text-transparent"
                  style={{ WebkitTextStroke: '2px var(--text-secondary)' }}
                >
                  {i + 1}
                </span>
                <div className="w-28 h-40 rounded-lg bg-gradient-to-tr from-[var(--bg-card)] to-[var(--bg-secondary)] border border-[var(--border)] group-hover:border-[var(--text-primary)] transition-colors relative overflow-hidden">
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. New Releases */}
        <section className="px-8 mt-8 pb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              New Releases ✨
            </h2>
            <a href="#" className="text-[var(--accent)] hover:text-[var(--accent-hover)] text-sm font-semibold transition-colors">
              View All
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {newReleases.map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-card)] border border-[var(--border)] mb-2 group-hover:border-[var(--accent)] transition-all">
                  <div className="absolute top-2 left-2 bg-[var(--accent)] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    New
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-sm font-bold truncate group-hover:text-[var(--accent)] transition-colors">{item.title}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[var(--text-secondary)] font-medium">{item.year}</span>
                  <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1">
                    <svg className="w-3 h-3 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    {item.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
