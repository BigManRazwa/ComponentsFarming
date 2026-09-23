import { useState, useEffect } from 'react';

type Variant = 'blue' | 'emerald' | 'violet';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#3B82F6': 'blue',
  '#10B981': 'emerald',
  '#8B5CF6': 'violet',
};

export function MobileParkingFinder({ variant = 'blue' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<string>('Map');

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('blue'); 
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

  const filters = ['All', 'Garage', 'Street', 'Lot'];

  const bottomNav = [
    { id: 'Map', icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
    { id: 'Search', icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
    { id: 'Favorites', icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
    { id: 'History', icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id: 'Profile', icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }
  ];

  const recentSearches = [
    "SFO Airport Parking",
    "Fisherman's Wharf",
    "Golden Gate Park"
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .parking-wrapper {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-light: rgba(59,130,246,0.12);
          --bg-primary: #0A1020;
          --bg-secondary: #111828;
          --bg-card: #1A2236;
          --border: #1E2E42;
          --text-primary: #F1F5F9;
          --text-secondary: #64748B;
          font-family: 'Inter', sans-serif;
        }
        .parking-wrapper[data-theme="blue"] {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-light: rgba(59,130,246,0.12);
          --bg-primary: #0A1020;
          --bg-secondary: #111828;
          --bg-card: #1A2236;
          --border: #1E2E42;
          --text-primary: #F1F5F9;
          --text-secondary: #64748B;
        }
        .parking-wrapper[data-theme="emerald"] {
          --accent: #10B981;
          --accent-hover: #059669;
          --accent-light: rgba(16,185,129,0.12);
          --bg-primary: #080E0C;
          --bg-secondary: #0E1A14;
          --bg-card: #142220;
          --border: #1E3A30;
          --text-primary: #F0FFF8;
          --text-secondary: #5A8A70;
        }
        .parking-wrapper[data-theme="violet"] {
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div 
        className="parking-wrapper min-h-screen bg-neutral-900 flex justify-center text-[var(--text-primary)]"
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col overflow-x-hidden">
          
          {/* 1. Header */}
          <div className="px-5 pt-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)] text-white font-bold flex items-center justify-center">
                P
              </div>
              <div className="font-bold text-lg text-[var(--text-primary)]">ParkEasy</div>
            </div>
            <button className="cursor-pointer relative">
              <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[var(--bg-primary)]"></div>
            </button>
          </div>

          {/* 2. Location Bar */}
          <div className="px-5 mt-2">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-2.5 flex items-center gap-2 cursor-pointer shadow-sm">
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-semibold flex-1 text-[var(--text-primary)]">Downtown SF</span>
              <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* 3. Map Area */}
          <div className="mx-5 mt-3 h-[200px] bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden relative">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            ></div>
            
            {/* Green markers */}
            <div className="absolute top-[30px] left-[40px] w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            <div className="absolute top-[80px] right-[50px] w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            <div className="absolute bottom-[40px] left-[60px] w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            
            {/* Amber marker */}
            <div className="absolute top-[60px] left-[120px] w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
            
            {/* Red marker */}
            <div className="absolute bottom-[70px] right-[70px] w-3 h-3 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>

            {/* Selected marker (Central Garage) */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="absolute w-10 h-10 rounded-full border-2 border-[var(--accent)] opacity-50 animate-ping"></div>
              <div className="w-4 h-4 bg-[var(--accent)] rounded-full border-2 border-white relative z-10 shadow-lg shadow-[var(--accent)]"></div>
            </div>

            {/* Controls */}
            <button className="absolute top-3 right-3 bg-[var(--bg-card)]/80 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--text-primary)] cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
            <button className="absolute bottom-3 right-3 bg-[var(--bg-card)]/80 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5 border border-[var(--border)] text-[var(--text-primary)] cursor-pointer">
              <svg className="w-3.5 h-3.5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <span className="text-xs font-medium">Current Location</span>
            </button>
          </div>

          {/* 4. Filter Pills */}
          <div className="px-5 mt-3 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium border cursor-pointer transition-colors ${
                  activeFilter === filter 
                    ? 'bg-[var(--accent)] border-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20' 
                    : 'bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* 5. Nearby Parking */}
          <div className="px-5 mt-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-base text-[var(--text-primary)]">Nearby Parking</h2>
              <span className="text-[var(--accent)] font-semibold text-xs">12 spots</span>
            </div>
            
            {/* Card 1 */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 mb-3 cursor-pointer hover:border-[var(--accent)]/40 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">Central Garage</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">123 Main St</p>
                </div>
                <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer shadow-sm">
                  Reserve
                </button>
              </div>
              <div className="mt-3 flex items-center gap-3 text-xs font-medium">
                <div className="flex items-center gap-1.5 text-[var(--text-primary)]">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]"></div>
                  45 spots available
                </div>
                <span className="text-[var(--text-secondary)]">•</span>
                <span className="text-[var(--text-secondary)]">0.3 mi</span>
                <span className="text-[var(--text-secondary)]">•</span>
                <span className="font-bold text-[var(--accent)]">$4/hr</span>
                <span className="text-[var(--text-secondary)]">•</span>
                <span className="flex items-center gap-0.5 text-[var(--text-secondary)]">
                  <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  4.5
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 mb-3 cursor-pointer hover:border-[var(--accent)]/40 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">Market Street Lot</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">456 Market St</p>
                </div>
                <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer shadow-sm">
                  Reserve
                </button>
              </div>
              <div className="mt-3 flex items-center gap-3 text-xs font-medium">
                <div className="flex items-center gap-1.5 text-[var(--text-primary)]">
                  <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]"></div>
                  8 spots available
                </div>
                <span className="text-[var(--text-secondary)]">•</span>
                <span className="text-[var(--text-secondary)]">0.3 mi</span>
                <span className="text-[var(--text-secondary)]">•</span>
                <span className="font-bold text-[var(--accent)]">$6/hr</span>
                <span className="text-[var(--text-secondary)]">•</span>
                <span className="flex items-center gap-0.5 text-[var(--text-secondary)]">
                  <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  4.3
                </span>
              </div>
            </div>

            {/* Card 3 (Full) */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 mb-3 opacity-60">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">Union Square Deck</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">789 Union Sq</p>
                </div>
                <button disabled className="bg-neutral-600 text-neutral-300 text-xs font-semibold px-3 py-1.5 rounded-full cursor-not-allowed">
                  Reserve
                </button>
              </div>
              <div className="mt-3 flex items-center gap-3 text-xs font-medium">
                <div className="flex items-center gap-1.5 text-[var(--text-primary)]">
                  <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]"></div>
                  Full
                </div>
                <span className="text-[var(--text-secondary)]">•</span>
                <span className="text-[var(--text-secondary)]">0.5 mi</span>
                <span className="text-[var(--text-secondary)]">•</span>
                <span className="font-bold text-[var(--accent)]">$8/hr</span>
                <span className="text-[var(--text-secondary)]">•</span>
                <span className="flex items-center gap-0.5 text-[var(--text-secondary)]">
                  <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  4.7
                </span>
              </div>
            </div>
          </div>

          {/* 6. Recent Searches */}
          <div className="px-5 mt-4 pb-24">
            <h2 className="font-bold text-sm text-[var(--text-primary)] mb-2">Recent</h2>
            {recentSearches.map((search, index) => (
              <div key={index} className="py-3 flex items-center gap-3 border-b border-[var(--border)]/30 cursor-pointer group">
                <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="flex-1 text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{search}</span>
                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>

          {/* 7. Bottom Nav */}
          <div className="fixed bottom-0 w-full max-w-[390px] bg-[var(--bg-primary)]/95 backdrop-blur-md border-t border-[var(--border)] z-50">
            <div className="flex justify-around items-center h-16 pb-2">
              {bottomNav.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1 w-16 h-full cursor-pointer transition-colors ${
                    activeTab === tab.id 
                      ? 'text-[var(--accent)]' 
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <div className={`transition-transform duration-200 ${activeTab === tab.id ? 'scale-110' : ''}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      {tab.icon.split(' M').map((path, i) => (
                        <path key={i} strokeLinecap="round" strokeLinejoin="round" d={i > 0 ? 'M' + path : path} />
                      ))}
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
