import { useState, useEffect } from 'react';

type Variant = 'hype' | 'retro' | 'stealth';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#EF4444': 'hype',
  '#ef4444': 'hype',
  '#8B5CF6': 'retro',
  '#8b5cf6': 'retro',
  '#06B6D4': 'stealth',
  '#06b6d4': 'stealth',
};

export function MobileSneakerStore({ variant = 'hype' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [bagCount, setBagCount] = useState(2);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [activeNav, setActiveNav] = useState('home');
  const [customAccent, setCustomAccent] = useState<{ accent: string; hover: string } | null>(null);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;

      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('hype');
        setCustomAccent(null);
        return;
      }

      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) {
        setActiveTheme(themeName);
        setCustomAccent(null);
      } else {
        setActiveTheme('hype');
        setCustomAccent({
          accent: variation.accent,
          hover: variation.accent + 'dd',
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const trendingItems = [
    { id: 't1', name: 'Nike Dunk Low "Panda"', colorway: 'Black/White', price: 110 },
    { id: 't2', name: 'Adidas Samba OG', colorway: 'White/Black', price: 100 },
    { id: 't3', name: 'New Balance 550', colorway: 'White/Green', price: 120 },
    { id: 't4', name: 'Nike Air Max 90', colorway: 'Triple White', price: 130 },
  ];

  const justDroppedItems = [
    { id: 'j1', name: 'Jordan 4 Retro "Bred"', brand: 'Jordan', price: 210 },
    { id: 'j2', name: 'Yeezy Slide "Onyx"', brand: 'Adidas', price: 70 },
    { id: 'j3', name: 'Air Force 1 Low', brand: 'Nike', price: 110 },
    { id: 'j4', name: 'Ultra Boost 23', brand: 'Adidas', price: 190 },
  ];

  const recentlyViewed = [
    { name: 'Air Jordan 1 Chicago', price: 250 },
    { name: 'Nike SB Dunk Low', price: 130 },
    { name: 'Yeezy Boost 350 V2', price: 230 },
  ];

  const brands = [
    { initial: 'N', name: 'Nike' },
    { initial: 'A', name: 'Adidas' },
    { initial: 'J', name: 'Jordan' },
    { initial: 'NB', name: 'New Balance' },
    { initial: 'Y', name: 'Yeezy' },
    { initial: 'P', name: 'Puma' },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        .sneaker-wrapper {
          --accent: #EF4444;
          --accent-hover: #DC2626;
          --bg-primary: #0A0A0A;
          --bg-secondary: #141414;
          --bg-card: #1A1A1A;
          --border: #2A2A2A;
          --text-primary: #FFFFFF;
          --text-secondary: #888888;
          font-family: 'Inter', sans-serif;
        }
        .sneaker-wrapper[data-theme="retro"] {
          --accent: #8B5CF6;
          --accent-hover: #7C3AED;
          --bg-primary: #0A080F;
          --bg-secondary: #14101A;
          --bg-card: #1A1620;
          --border: #2A2440;
          --text-primary: #F5F0FF;
          --text-secondary: #9988BB;
        }
        .sneaker-wrapper[data-theme="stealth"] {
          --accent: #06B6D4;
          --accent-hover: #0891B2;
          --bg-primary: #080C0E;
          --bg-secondary: #0E1418;
          --bg-card: #141C22;
          --border: #1E2A34;
          --text-primary: #F0FAFF;
          --text-secondary: #6899AA;
        }
        ${customAccent ? `
        .sneaker-wrapper {
          --accent: ${customAccent.accent} !important;
          --accent-hover: ${customAccent.hover} !important;
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

      <div className="sneaker-wrapper min-h-screen bg-[var(--bg-secondary)] flex justify-center text-[var(--text-primary)]" data-theme={activeTheme === 'hype' ? undefined : activeTheme}>
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative shadow-2xl flex flex-col">
          
          {/* 1. Header */}
          <div className="px-5 pt-4 pb-2 flex items-center justify-between sticky top-0 z-50 bg-[var(--bg-primary)]">
            <div className="uppercase tracking-wider font-bold text-xl">KICKSLAB</div>
            <div className="flex items-center gap-4">
              <button className="text-[var(--text-primary)] cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
              <button className="text-[var(--text-primary)] relative cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                {bagCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center leading-none">
                    {bagCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 scrollbar-hide">
            
            {/* 2. Featured Drop Banner */}
            <div className="mx-5 mt-3 rounded-2xl overflow-hidden relative aspect-[16/9] bg-gradient-to-tr from-[#333] to-[#111]">
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="bg-[var(--accent)] text-white text-[10px] font-bold px-2 py-1 rounded w-max mb-2">NEW DROP</div>
                <div className="text-xl font-bold text-white mb-1 shadow-sm">Air Jordan 1 Retro High OG</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold text-white shadow-sm">$180</div>
                  <button className="bg-[var(--accent)] text-white text-sm font-bold px-4 py-2 rounded-full cursor-pointer hover:bg-[var(--accent-hover)] transition-colors">Shop Now</button>
                </div>
              </div>
            </div>

            {/* 3. Brand Logos */}
            <div className="px-5 mt-5">
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {brands.map((brand, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 cursor-pointer">
                    <div className="w-14 h-14 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center font-bold text-lg hover:border-[var(--accent)] transition-colors">
                      {brand.initial}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Trending Now */}
            <div className="px-5 mt-5">
              <div className="flex justify-between items-center mb-3">
                <div className="font-bold text-lg flex items-center gap-2">
                  Trending Now
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32-2.59 2.08-3.61 5.75-2.39 8.9.04.1.08.2.08.33 0 .22-.15.42-.35.5-.23.1-.47.04-.66-.12a7.35 7.35 0 01-1.46-1.97c-.7-1.32-.97-2.8-.75-4.22-.96 1.05-1.61 2.37-1.8 3.8-.23 1.76.2 3.52 1.15 4.99 1.12 1.73 2.95 2.8 5.01 3.14 2.01.34 4.09-.13 5.7-1.46 1.54-1.28 2.45-3.14 2.53-5.18.01-1.07-.3-2.15-.86-3.03z"/></svg>
                </div>
                <button className="text-[var(--accent)] text-sm font-medium cursor-pointer">See All</button>
              </div>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {trendingItems.map(item => (
                  <div key={item.id} className="w-40 flex-shrink-0 bg-[var(--bg-card)] rounded-xl border border-[var(--border)] overflow-hidden cursor-pointer group">
                    <div className="aspect-square bg-gradient-to-br from-[#333] to-[#222] relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(item.id); }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-[var(--bg-primary)]/50 backdrop-blur-sm cursor-pointer"
                      >
                        <svg className={`w-4 h-4 ${wishlist[item.id] ? 'fill-[var(--accent)] text-[var(--accent)]' : 'fill-none text-white'}`} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </button>
                    </div>
                    <div className="p-3">
                      <div className="font-bold text-sm truncate">{item.name}</div>
                      <div className="text-[var(--text-secondary)] text-xs truncate mt-0.5">{item.colorway}</div>
                      <div className="text-[var(--accent)] font-bold mt-2">${item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Just Dropped */}
            <div className="px-5 mt-6">
              <div className="flex justify-between items-center mb-3">
                <div className="font-bold text-lg">Just Dropped</div>
                <button className="text-[var(--text-secondary)] text-sm font-medium cursor-pointer hover:text-[var(--accent)]">View All</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {justDroppedItems.map(item => (
                  <div key={item.id} className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] overflow-hidden cursor-pointer flex flex-col">
                    <div className="aspect-square bg-gradient-to-br from-[#222] to-[#111] relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(item.id); }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-[var(--bg-primary)]/50 backdrop-blur-sm cursor-pointer"
                      >
                        <svg className={`w-4 h-4 ${wishlist[item.id] ? 'fill-[var(--accent)] text-[var(--accent)]' : 'fill-none text-white'}`} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </button>
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <div className="font-bold text-sm leading-tight mb-1">{item.name}</div>
                      <div className="text-[var(--text-secondary)] text-xs mb-2">{item.brand}</div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="font-bold">${item.price}</div>
                        <button className="bg-[var(--accent)] text-white text-[10px] font-bold px-2 py-1.5 rounded cursor-pointer hover:bg-[var(--accent-hover)]" onClick={(e) => {
                          e.stopPropagation();
                          setBagCount(prev => prev + 1);
                        }}>
                          Add to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Size Guide Quick Access */}
            <div className="mx-5 mt-5 bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--bg-primary)] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
                </div>
                <div className="font-bold text-sm">Find Your Perfect Size</div>
              </div>
              <button className="bg-[var(--bg-secondary)] border border-[var(--accent)] text-[var(--accent)] text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer hover:bg-[var(--accent)] hover:text-white transition-colors">
                Size Guide
              </button>
            </div>

            {/* 7. Recently Viewed */}
            <div className="px-5 mt-5 pb-32">
              <div className="font-bold text-lg mb-3">Recently Viewed</div>
              <div className="flex flex-col gap-2">
                {recentlyViewed.map((item, i) => (
                  <div key={i} className="bg-[var(--bg-card)] rounded-lg flex items-center p-2 cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
                    <div className="w-[60px] h-[60px] bg-gradient-to-br from-[#222] to-[#111] rounded-md flex-shrink-0"></div>
                    <div className="ml-3 flex-1 font-bold text-sm">{item.name}</div>
                    <div className="font-bold text-sm mr-2">${item.price}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 8. Bottom Nav */}
          <div className="fixed bottom-0 w-full max-w-[390px] h-16 bg-[var(--bg-primary)] border-t border-[var(--border)] flex z-50">
            {[
              { id: 'home', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
              { id: 'explore', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> },
              { id: 'drops', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
              { id: 'wishlist', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> },
              { id: 'profile', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveNav(tab.id)}
                className={`flex-1 flex items-center justify-center cursor-pointer transition-colors ${activeNav === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-white'}`}
              >
                {tab.icon}
              </button>
            ))}
          </div>

        </div>

        {/* Floating Switcher */}
        <div className="fixed bottom-5 right-5 bg-white p-2.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.15)] flex gap-2.5 z-[1000] border border-[#E8E8E8]">
          {[
            { id: 'hype', bg: '#EF4444', label: 'Hype Red' },
            { id: 'retro', bg: '#8B5CF6', label: 'Retro Purple' },
            { id: 'stealth', bg: '#06B6D4', label: 'Stealth Cyan' }
          ].map(theme => (
            <button 
              key={theme.id}
              onClick={() => {
                setActiveTheme(theme.id as Variant);
                setCustomAccent(null);
              }}
              className={`w-[30px] h-[30px] rounded-full border-2 cursor-pointer transition-transform relative group hover:scale-110 ${activeTheme === theme.id && !customAccent ? 'border-[#333] scale-110' : 'border-transparent'}`}
              style={{ background: theme.bg }}
            >
              <span className="absolute -top-[35px] left-1/2 -translate-x-1/2 bg-[#333] text-white text-[12px] px-2 py-1 rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 font-sans">
                {theme.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
