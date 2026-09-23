import { useState, useEffect } from 'react';

type Variant = 'blue' | 'emerald' | 'amber';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#3B82F6': 'blue',
  '#10B981': 'emerald',
  '#F59E0B': 'amber',
};

export function MobilePropertyFinder({ variant = 'blue' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('Buy');
  const [activeTab, setActiveTab] = useState('Search');
  const [savedProperties, setSavedProperties] = useState<Record<string, boolean>>({});
  const [isMapActive, setIsMapActive] = useState(false);

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

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedProperties(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filters = ["Buy", "Rent", "All", "House", "Apartment", "Condo"];
  
  const bottomNavTabs = [
    { id: 'Search', icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' },
    { id: 'Saved', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z', badge: '4' },
    { id: 'Messages', icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75' },
    { id: 'Tours', icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5' },
    { id: 'Profile', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .property-wrapper {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-light: rgba(59,130,246,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #F0F5FF;
          --bg-card: #FFFFFF;
          --border: #DBEAFE;
          --text-primary: #1A1A2E;
          --text-secondary: #6B8CAE;
          font-family: 'Inter', sans-serif;
        }
        .property-wrapper[data-theme="emerald"] {
          --accent: #10B981;
          --accent-hover: #059669;
          --accent-light: rgba(16,185,129,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #F0FFF8;
          --bg-card: #FFFFFF;
          --border: #D1FAE5;
          --text-primary: #1A2E1A;
          --text-secondary: #5A8A6A;
        }
        .property-wrapper[data-theme="amber"] {
          --accent: #F59E0B;
          --accent-hover: #D97706;
          --accent-light: rgba(245,158,11,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #FFFBF0;
          --bg-card: #FFFFFF;
          --border: #FEF3C7;
          --text-primary: #2E2A1A;
          --text-secondary: #AA9460;
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
        className="property-wrapper min-h-screen bg-neutral-100 flex justify-center text-[var(--text-primary)]"
        data-theme={activeTheme === 'blue' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col overflow-x-hidden">
          
          {/* 1. Header */}
          <div className="bg-[var(--accent)] px-5 pt-4 pb-10 text-white relative">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.99 9a.75.75 0 11-1.06 1.06l-4.636-4.636M12 3.422l-8.99 9a.75.75 0 11-1.06-1.06l8.99-9A1.5 1.5 0 0112 3.422z" />
                  <path d="M5.25 10.5v9A1.5 1.5 0 006.75 21h10.5a1.5 1.5 0 001.5-1.5v-9H5.25z" />
                </svg>
                <span className="font-bold text-lg">HomeFind</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  San Francisco, CA
                </div>
                <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
              </div>
            </div>
          </div>

          {/* 2. Search */}
          <div className="px-5 -mt-6 relative z-10">
            <div className="bg-[var(--bg-card)] shadow-lg shadow-[var(--accent-light)] rounded-xl px-4 py-3 border border-[var(--border)] flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search neighborhoods..." 
                className="w-full text-sm outline-none bg-transparent placeholder-[var(--text-secondary)] text-[var(--text-primary)]"
              />
            </div>
          </div>

          {/* 3. Filter Pills */}
          <div className="px-5 mt-4">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                      : 'bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Featured Listing */}
          <div className="px-5 mt-4">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm shadow-[var(--accent-light)] relative cursor-pointer group">
              <div className="h-48 bg-[var(--bg-secondary)] relative flex">
                <div className="w-full h-full bg-gradient-to-tr from-[var(--accent)]/20 to-[var(--accent)]/5"></div>
                <button 
                  onClick={(e) => toggleSave('featured1', e)}
                  className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                >
                  <svg className={`w-5 h-5 ${savedProperties['featured1'] ? 'text-rose-500 fill-rose-500' : 'text-[var(--text-secondary)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
                <div className="absolute top-3 left-3 bg-[var(--accent)] text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm">
                  Featured
                </div>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white shadow-sm"></div>
                  <div className="w-2 h-2 rounded-full bg-white/50 shadow-sm"></div>
                  <div className="w-2 h-2 rounded-full bg-white/50 shadow-sm"></div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-base text-[var(--text-primary)]">Modern Downtown Loft</h3>
                <div className="font-bold text-xl text-[var(--accent)] mt-1">$850,000</div>
                
                <div className="flex gap-3 mt-2 text-xs text-[var(--text-secondary)]">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.118l-6.5.5a2.25 2.25 0 01-1.756-.5l-6.5-.5A2.25 2.25 0 011.5 18.4V14.15M8.25 10.5l3.75-3 3.75 3m-7.5 3h7.5" /></svg>
                    3 bed
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.14.653.385.864l1.082.93c.245.211.385.53.385.864v.568c0 .334.14.653.385.864l1.082.93c.245.211.385.53.385.864v.568c0 .334.14.653.385.864l1.082.93c.245.211.385.53.385.864v.568m-6-8.25v.568c0 .334-.14.653-.385.864L7.542 5.39c-.245.211-.385.53-.385.864v.568c0 .334-.14.653-.385.864l-1.082.93c-.245.211-.385.53-.385.864v.568c0 .334-.14.653-.385.864L4.16 11.27c-.245.211-.385.53-.385.864v.568" /></svg>
                    2 bath
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>
                    1,450 sqft
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mt-2 text-xs text-[var(--text-secondary)]">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  SoMa District, San Francisco
                </div>
              </div>
            </div>
          </div>

          {/* 5. Price Range */}
          <div className="px-5 mt-5 flex justify-between items-center">
            <span className="text-sm font-medium text-[var(--text-secondary)]">$500K - $1.2M</span>
            <button 
              onClick={() => setIsMapActive(!isMapActive)}
              className="flex items-center gap-1.5 text-[var(--accent)] text-sm font-semibold cursor-pointer bg-[var(--accent-light)] px-3 py-1.5 rounded-lg transition-colors hover:bg-[var(--accent)]/10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
              Map
              <div className={`w-7 h-4 rounded-full ml-1 relative transition-colors ${isMapActive ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}>
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isMapActive ? 'left-3.5' : 'left-0.5'}`}></div>
              </div>
            </button>
          </div>

          {/* 6. Listings */}
          <div className="px-5 mt-3 space-y-3">
            {[
              { id: 'l1', price: '$925,000', name: 'Noe Valley Charm', specs: '3 bed · 3 bath · 1,800 sqft', loc: 'Noe Valley' },
              { id: 'l2', price: '$780,000', name: 'Mission Bay Apartment', specs: '2 bed · 2 bath · 1,150 sqft', loc: 'Mission Bay' }
            ].map((listing) => (
              <div key={listing.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden flex shadow-sm hover:shadow-md transition-shadow cursor-pointer relative group h-[110px]">
                <div className="w-28 h-full bg-[var(--bg-secondary)] flex-shrink-0 bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/30"></div>
                <div className="p-3 flex-1 flex flex-col justify-center min-w-0">
                  <div className="font-bold text-base text-[var(--accent)]">{listing.price}</div>
                  <div className="font-bold text-sm text-[var(--text-primary)] mt-0.5 truncate">{listing.name}</div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1 truncate">{listing.specs}</div>
                  <div className="flex items-center gap-1 mt-1.5 text-xs text-[var(--text-secondary)] truncate">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span className="truncate">{listing.loc}</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => toggleSave(listing.id, e)}
                  className="absolute top-2.5 right-2.5 cursor-pointer p-1 rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <svg className={`w-5 h-5 ${savedProperties[listing.id] ? 'text-rose-500 fill-rose-500' : 'text-[var(--text-secondary)] hover:text-rose-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* 7. Results Count */}
          <div className="px-5 mt-4 text-xs text-[var(--text-secondary)] text-center font-medium">
            256 homes found in San Francisco
          </div>

          {/* 8. Recently Viewed */}
          <div className="px-5 mt-5 pb-24">
            <h3 className="font-bold text-sm text-[var(--text-primary)]">Recently Viewed</h3>
            <div className="flex gap-3 mt-3 overflow-x-auto pb-2 scrollbar-hide">
              {[
                { id: 'r1', price: '$1.1M', name: 'Marina Condo', specs: '2 bed · 2 bath' },
                { id: 'r2', price: '$850K', name: 'Dogpatch Loft', specs: '1 bed · 1.5 bath' },
                { id: 'r3', price: '$2.3M', name: 'Pac Heights', specs: '4 bed · 3 bath' }
              ].map((item) => (
                <div key={item.id} className="min-w-[130px] bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm cursor-pointer hover:border-[var(--accent)] transition-colors">
                  <div className="h-16 bg-gradient-to-b from-[var(--accent)]/20 to-[var(--accent)]/5"></div>
                  <div className="p-2.5">
                    <div className="text-xs font-bold text-[var(--accent)]">{item.price}</div>
                    <div className="text-xs font-semibold text-[var(--text-primary)] mt-0.5 truncate">{item.name}</div>
                    <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">{item.specs}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 9. Bottom Nav */}
          <div className="fixed bottom-0 w-full max-w-[390px] bg-[var(--bg-card)]/95 backdrop-blur-md border-t border-[var(--border)] z-50 px-2 pb-safe pt-2">
            <div className="flex justify-between items-center px-4 py-2">
              {bottomNavTabs.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 cursor-pointer transition-colors relative ${
                    activeTab === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <div className="relative">
                    <svg className="w-6 h-6" fill={activeTab === tab.id ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={activeTab === tab.id ? '1.5' : '2'}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                    </svg>
                    {tab.badge && (
                      <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center shadow-sm">
                        {tab.badge}
                      </span>
                    )}
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
