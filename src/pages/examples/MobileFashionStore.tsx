import { useState, useEffect } from 'react';

type Variant = 'gold' | 'rose' | 'black';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#B8860B': 'gold',
  '#E11D48': 'rose',
  '#1A1A1A': 'black',
};

const CATEGORIES = [
  { id: 'women', name: 'Women', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
  { id: 'men', name: 'Men', icon: 'M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z' },
  { id: 'accessories', name: 'Accessories', icon: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
  { id: 'shoes', name: 'Shoes', icon: 'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z' },
  { id: 'sale', name: 'Sale', icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z' }
];

const TRENDING = [
  { id: '1', brand: 'GUCCI', name: 'Silk Blouse', price: 890, oldPrice: 1200 },
  { id: '2', brand: 'PRADA', name: 'Leather Jacket', price: 1450, oldPrice: 2100 },
  { id: '3', brand: 'DIOR', name: 'Midi Skirt', price: 680, oldPrice: 950 },
  { id: '4', brand: 'CHANEL', name: 'Cashmere Knit', price: 1200, oldPrice: 1800 },
];

const NEW_ARRIVALS = [
  { id: '1', brand: 'FENDI', name: 'Leather Bag', price: 1450 },
  { id: '2', brand: 'VERSACE', name: 'Gold Earrings', price: 320 },
  { id: '3', brand: 'BALENCIAGA', name: 'Track Shoes', price: 895 },
];

const NAV_TABS = [
  { id: 'home', icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' },
  { id: 'categories', icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z' },
  { id: 'wishlist', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
  { id: 'cart', icon: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
  { id: 'profile', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
];

export function MobileFashionStore({ variant = 'gold' }: { variant?: 'gold' | 'rose' | 'black' }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('women');
  const [activeTab, setActiveTab] = useState('home');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('gold'); 
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

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .fashion-wrapper {
          --accent: #B8860B;
          --accent-hover: #996B00;
          --accent-light: rgba(184,134,11,0.08);
          --bg-primary: #FFFCF5;
          --bg-secondary: #FFF5E0;
          --bg-card: #FFFFFF;
          --border: #F0E0C0;
          --text-primary: #1A1408;
          --text-secondary: #8A7A5A;
          font-family: 'Inter', sans-serif;
        }
        .fashion-wrapper[data-theme="rose"] {
          --accent: #E11D48;
          --accent-hover: #BE123C;
          --accent-light: rgba(225,29,72,0.08);
          --bg-primary: #FFFAFC;
          --bg-secondary: #FFE8EE;
          --bg-card: #FFFFFF;
          --border: #FFD0DA;
          --text-primary: #2E0A14;
          --text-secondary: #AA5068;
        }
        .fashion-wrapper[data-theme="black"] {
          --accent: #1A1A1A;
          --accent-hover: #000000;
          --accent-light: rgba(26,26,26,0.06);
          --bg-primary: #FFFFFF;
          --bg-secondary: #F5F5F5;
          --bg-card: #FFFFFF;
          --border: #E0E0E0;
          --text-primary: #1A1A1A;
          --text-secondary: #888888;
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
        className="fashion-wrapper min-h-screen bg-neutral-100 flex justify-center text-[var(--text-primary)]"
        data-theme={activeTheme === 'gold' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col overflow-x-hidden pb-20">
          
          {/* 1. Header */}
          <div className="px-5 pt-4 flex justify-between items-center">
            <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <h1 className="font-serif font-bold text-xl tracking-[0.3em]">LUXE</h1>
            <div className="relative cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">3</span>
            </div>
          </div>

          {/* 2. Hero Banner */}
          <div className="mx-5 mt-3 rounded-2xl overflow-hidden relative h-[180px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-5">
              <h2 className="font-bold text-2xl">Autumn Collection</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Up to 40% Off</p>
              <button className="mt-3 bg-[var(--accent)] text-white px-6 py-2 rounded-full text-sm font-semibold cursor-pointer hover:bg-[var(--accent-hover)] transition-colors">
                Shop Now
              </button>
            </div>
          </div>

          {/* 3. Categories */}
          <div className="px-5 mt-5">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <div 
                  key={cat.id} 
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex flex-col items-center gap-2 min-w-[60px] cursor-pointer"
                >
                  <div className={"w-14 h-14 rounded-full flex items-center justify-center transition-all " + (activeCategory === cat.id ? "bg-[var(--bg-secondary)] border-2 border-[var(--accent)]" : "bg-[var(--bg-secondary)] border border-[var(--border)]")}>
                    <svg className={"w-6 h-6 " + (cat.id === 'sale' ? "text-[var(--accent)]" : "text-[var(--text-primary)]")} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                    </svg>
                  </div>
                  <span className={"text-xs font-medium " + (cat.id === 'sale' ? "text-[var(--accent)]" : "")}>{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Trending Products */}
          <div className="px-5 mt-5">
            <div className="flex justify-between items-end">
              <h3 className="font-bold text-base">Trending Now</h3>
              <span className="text-[var(--accent)] text-xs font-semibold cursor-pointer hover:underline">See All</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {TRENDING.map((product) => (
                <div key={product.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden cursor-pointer shadow-sm group">
                  <div className="h-36 bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5 relative">
                    <button 
                      onClick={(e) => toggleFavorite(product.id, e)}
                      className="absolute top-2 right-2 w-7 h-7 bg-white/80 rounded-full shadow flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <svg className={"w-4 h-4 " + (favorites[product.id] ? "text-red-500 fill-current" : "text-[var(--text-secondary)]")} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-3">
                    <div className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">{product.brand}</div>
                    <div className="font-bold text-sm truncate">{product.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-[var(--accent)]">${product.price}</span>
                      <span className="line-through text-xs text-[var(--text-secondary)]">${product.oldPrice}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. New Arrivals */}
          <div className="px-5 mt-5 pb-8">
            <div className="flex justify-between items-end">
              <h3 className="font-bold text-base">New Arrivals</h3>
              <span className="text-[var(--accent)] text-xs font-semibold cursor-pointer hover:underline">See All</span>
            </div>
            <div className="flex gap-3 mt-3 overflow-x-auto pb-2 scrollbar-hide">
              {NEW_ARRIVALS.map((product) => (
                <div key={'new_'+product.id} className="min-w-[150px] bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden cursor-pointer shadow-sm">
                  <div className="h-32 bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5"></div>
                  <div className="p-3">
                    <div className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">{product.brand}</div>
                    <div className="text-sm font-bold truncate">{product.name}</div>
                    <div className="text-sm font-bold text-[var(--accent)] mt-1">${product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Bottom Nav */}
          <div className="fixed bottom-0 w-full max-w-[390px] bg-[var(--bg-card)]/95 backdrop-blur border-t border-[var(--border)] z-50">
            <div className="flex justify-around items-center h-16">
              {NAV_TABS.map((tab) => (
                <div 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={"relative flex flex-col items-center justify-center w-full h-full cursor-pointer transition-colors " + (activeTab === tab.id ? "text-[var(--accent)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]")}
                >
                  <svg className="w-6 h-6" fill={activeTab === tab.id ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                  </svg>
                  {tab.id === 'wishlist' && (
                    <span className="absolute top-2 right-4 bg-[var(--accent)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-[var(--bg-card)]">8</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
