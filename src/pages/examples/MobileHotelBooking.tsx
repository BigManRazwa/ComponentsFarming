import { useState, useEffect } from 'react';

type Variant = 'blue' | 'emerald' | 'amber';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#3B82F6': 'blue',
  '#10B981': 'emerald',
  '#F59E0B': 'amber',
};

export function MobileHotelBooking({ variant = 'blue' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('Home');
  const [isFeaturedSaved, setIsFeaturedSaved] = useState(false);

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

  const toggleFeaturedSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFeaturedSaved(!isFeaturedSaved);
  };

  const filters = ["All", "5-Star", "Pool", "Beachfront", "Spa"];
  
  const bottomNavTabs = [
    { id: 'Home', icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' },
    { id: 'Search', icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' },
    { id: 'Bookings', icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5' },
    { id: 'Favorites', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z', badge: '2' },
    { id: 'Profile', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
  ];

  const popularHotels = [
    { id: 1, name: 'Four Seasons Resort', rating: '4.8', loc: 'Jimbaran Bay', price: '$420' },
    { id: 2, name: 'W Bali Seminyak', rating: '4.7', loc: 'Seminyak', price: '$280' },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .hotel-wrapper {
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
        .hotel-wrapper[data-theme="emerald"] {
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
        .hotel-wrapper[data-theme="amber"] {
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
        className="hotel-wrapper min-h-screen bg-neutral-100 flex justify-center text-[var(--text-primary)]"
        data-theme={activeTheme === 'blue' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col overflow-x-hidden">
          
          {/* 1. Header */}
          <div className="px-5 pt-4 flex justify-between items-center bg-[var(--bg-primary)]">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="font-bold text-base">Bali, Indonesia</span>
            </div>
            <div className="text-[var(--text-secondary)] cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </div>
          </div>

          {/* 2. Search Card */}
          <div className="mx-5 mt-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 py-2.5 border-b border-[var(--border)]/50">
              <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <div className="flex flex-col">
                <span className="text-xs text-[var(--text-secondary)]">Check-in</span>
                <span className="text-sm font-bold">Oct 15, 2024</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 py-2.5 border-b border-[var(--border)]/50">
              <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <div className="flex flex-col">
                <span className="text-xs text-[var(--text-secondary)]">Check-out</span>
                <span className="text-sm font-bold">Oct 20, 2024</span>
              </div>
            </div>

            <div className="flex items-center gap-3 py-2.5">
              <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-xs text-[var(--text-secondary)]">Guests</span>
                <span className="text-sm font-bold">2 Adults, 1 Child</span>
              </div>
            </div>
            
            <button className="mt-3 w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors text-white rounded-xl py-3 font-bold text-sm cursor-pointer">
              Search Hotels
            </button>
          </div>

          {/* 3. Featured Hotel */}
          <div className="px-5 mt-5">
            <h2 className="font-bold text-base">Featured</h2>
            <div className="mt-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm cursor-pointer group">
              <div className="h-48 bg-[var(--bg-secondary)] relative flex">
                <div className="w-full h-full bg-gradient-to-tr from-[var(--accent)]/15 to-[var(--accent)]/5"></div>
                <button 
                  onClick={toggleFeaturedSave}
                  className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                >
                  <svg className={`w-5 h-5 ${isFeaturedSaved ? 'text-rose-500 fill-rose-500' : 'text-[var(--text-secondary)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
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
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-base">The Ritz-Carlton</h3>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.148.621-.531 1.115-1.076.793l-4.757-2.81a.563.563 0 00-.586 0l-4.757 2.81c-.545.322-1.224-.172-1.076-.793l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <span className="font-bold text-sm">4.9</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs text-[var(--text-secondary)]">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  Nusa Dua, Bali
                </div>
                <div className="mt-2 flex justify-between items-end">
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-xl text-[var(--accent)]">$350</span>
                    <span className="text-xs text-[var(--text-secondary)]">/night</span>
                  </div>
                  <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors text-white text-xs px-4 py-2 rounded-full font-bold cursor-pointer">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Filter Pills */}
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

          {/* 5. Popular Hotels */}
          <div className="px-5 mt-4 space-y-3">
            <h2 className="font-bold text-base">Popular Hotels</h2>
            {popularHotels.map((hotel) => (
              <div key={hotel.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden flex shadow-sm cursor-pointer hover:shadow-md transition-shadow h-[100px]">
                <div className="w-28 bg-[var(--bg-secondary)] flex-shrink-0 bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/30"></div>
                <div className="p-3 flex-1 flex flex-col justify-center min-w-0">
                  <h3 className="font-bold text-sm truncate">{hotel.name}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.148.621-.531 1.115-1.076.793l-4.757-2.81a.563.563 0 00-.586 0l-4.757 2.81c-.545.322-1.224-.172-1.076-.793l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <span className="text-xs font-semibold">{hotel.rating}</span>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">{hotel.loc}</div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-bold text-sm text-[var(--accent)]">{hotel.price}</span>
                    <span className="text-xs text-[var(--text-secondary)]">/night</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 6. Special Offer */}
          <div className="mx-5 mt-4 mb-8 bg-[var(--accent-light)] border border-[var(--accent)]/20 rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              <span className="font-bold text-sm text-[var(--accent)]">Special Offer</span>
            </div>
            <div className="text-sm font-medium mt-1">Get 20% off your first booking!</div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-[var(--text-secondary)]">Use code: FIRST20</span>
              <button className="text-[var(--accent)] text-xs font-bold cursor-pointer hover:underline">Apply</button>
            </div>
          </div>

          <div className="pb-24"></div>

          {/* 7. Bottom Nav */}
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
