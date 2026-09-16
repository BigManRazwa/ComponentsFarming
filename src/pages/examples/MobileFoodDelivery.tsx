import { useState, useEffect } from 'react';

type Variant = 'red' | 'orange' | 'green';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#EF4444': 'red',
  '#F97316': 'orange',
  '#22C55E': 'green',
};

export function MobileFoodDelivery({ variant = 'red' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  
  const [activeCategory, setActiveCategory] = useState('Pizza');
  const [activeTab, setActiveTab] = useState('Home');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

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

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    { id: 'Pizza', label: 'Pizza', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
    { id: 'Burgers', label: 'Burgers', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M4 14h16m-9-9v3m-3-3v3m6-3v3" /></svg> },
    { id: 'Sushi', label: 'Sushi', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 22a10 10 0 100-20 10 10 0 000 20z" /></svg> },
    { id: 'Chinese', label: 'Chinese', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" /></svg> },
    { id: 'Mexican', label: 'Mexican', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2L2 22h20L12 2z" /></svg> },
    { id: 'Desserts', label: 'Desserts', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m18-5l-4-4-4 4-4-4-4 4-2-2 10-10 10 10-2 2z" /></svg> },
  ];

  const nearYou = [
    { id: 'mamma-mia', name: 'Mamma Mia Pizza', cuisine: 'Italian', rating: 4.8, count: 210, time: '25-35 min', fee: '$2.99', bg: 'from-red-400 to-orange-400' },
    { id: 'burger-joint', name: 'Burger Joint', cuisine: 'American', rating: 4.6, count: 185, time: '30-40 min', fee: 'Free', bg: 'from-amber-400 to-yellow-500' },
    { id: 'sushi-palace', name: 'Sushi Palace', cuisine: 'Japanese', rating: 4.9, count: 240, time: '20-30 min', fee: '$3.49', bg: 'from-rose-400 to-pink-500' }
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .food-wrapper {
          --accent: #EF4444;
          --accent-hover: #DC2626;
          --accent-light: rgba(239,68,68,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #F8F8F8;
          --bg-card: #FFFFFF;
          --border: #F0F0F0;
          --text-primary: #1A1A1A;
          --text-secondary: #888888;
          font-family: 'Inter', sans-serif;
        }
        .food-wrapper[data-theme="orange"] {
          --accent: #F97316;
          --accent-hover: #EA580C;
          --accent-light: rgba(249,115,22,0.08);
          --bg-primary: #FFFAF5;
          --bg-secondary: #FFF5EE;
          --bg-card: #FFFFFF;
          --border: #FFE8D6;
          --text-primary: #1A1A1A;
          --text-secondary: #997755;
        }
        .food-wrapper[data-theme="green"] {
          --accent: #22C55E;
          --accent-hover: #16A34A;
          --accent-light: rgba(34,197,94,0.08);
          --bg-primary: #F5FFF8;
          --bg-secondary: #EEFFEE;
          --bg-card: #FFFFFF;
          --border: #D6FFE0;
          --text-primary: #1A1A1A;
          --text-secondary: #558855;
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
        className="food-wrapper min-h-screen bg-neutral-100 flex justify-center text-[var(--text-primary)]"
        data-theme={activeTheme === 'red' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col pb-24 overflow-x-hidden">
          
          {/* 1. Header */}
          <div className="px-5 pt-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-1.5 cursor-pointer group">
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="font-bold text-sm">123 Main St</span>
              <svg className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
            <div className="relative cursor-pointer">
              <div className="bg-[var(--bg-secondary)] p-2 rounded-full hover:bg-[var(--accent-light)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-[var(--bg-primary)]">
                3
              </span>
            </div>
          </div>

          {/* 2. Search */}
          <div className="px-5 mt-3">
            <div className="bg-[var(--bg-secondary)] rounded-xl px-4 py-3 flex items-center gap-2 border border-[var(--border)] focus-within:border-[var(--accent)] transition-colors cursor-text">
              <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search restaurants, cuisines..." 
                className="bg-transparent border-none outline-none flex-1 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
              />
            </div>
          </div>

          {/* 3. Promo Banner */}
          <div className="mx-5 mt-4">
            <div className="bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] rounded-2xl p-5 relative overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 right-10 w-24 h-24 bg-white/10 rounded-full translate-y-1/3"></div>
              
              <div className="relative z-10">
                <div className="text-3xl font-black text-white drop-shadow-sm leading-tight">50% OFF</div>
                <div className="text-white/90 font-medium mt-0.5">Your First Order</div>
                <div className="text-white/70 text-xs mt-1 mb-3">Use code: WELCOME50</div>
                <button className="bg-white text-[var(--accent)] rounded-full px-5 py-2 text-sm font-bold shadow-sm hover:scale-105 transition-transform">
                  Order Now
                </button>
              </div>
            </div>
          </div>

          {/* 4. Categories */}
          <div className="px-5 mt-6">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {categories.map((cat) => (
                <button 
                  key={cat.id} 
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex flex-col items-center gap-1.5 min-w-[60px] cursor-pointer group"
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors border shadow-sm ${activeCategory === cat.id ? 'bg-[var(--accent-light)] border-[var(--accent)] text-[var(--accent)]' : 'bg-[var(--bg-secondary)] border-[var(--border)] text-[var(--text-primary)] group-hover:border-[var(--accent)]'}`}>
                    {cat.icon}
                  </div>
                  <span className={`text-xs font-medium transition-colors ${activeCategory === cat.id ? 'text-[var(--accent)] font-semibold' : 'text-[var(--text-primary)]'}`}>
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Near You Restaurants */}
          <div className="px-5 mt-6">
            <div className="flex justify-between items-end mb-3">
              <h2 className="font-bold text-lg">Near You</h2>
              <span className="text-sm text-[var(--accent)] font-medium cursor-pointer hover:underline">See All</span>
            </div>
            
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5">
              {nearYou.map((rest) => (
                <div key={rest.id} className="min-w-[240px] bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className={`h-32 bg-gradient-to-br ${rest.bg} relative`}>
                    <button 
                      onClick={(e) => toggleFavorite(rest.id, e)}
                      className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm text-[var(--text-secondary)] hover:text-red-500 transition-colors"
                    >
                      <svg className={`w-4 h-4 ${favorites[rest.id] ? 'text-red-500' : ''}`} fill={favorites[rest.id] ? "currentColor" : "none"} stroke={favorites[rest.id] ? "none" : "currentColor"} viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>
                    {/* Placeholder image overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm truncate">{rest.name}</h3>
                    <p className="text-xs text-[var(--text-secondary)] mb-2">{rest.cuisine}</p>
                    <div className="flex items-center text-xs font-medium text-[var(--text-primary)]">
                      <svg className="w-3.5 h-3.5 text-amber-500 mr-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{rest.rating} <span className="text-[var(--text-secondary)] font-normal">({rest.count})</span></span>
                      <span className="mx-1.5 text-[var(--border)]">•</span>
                      <span>{rest.time}</span>
                      <span className="mx-1.5 text-[var(--border)]">•</span>
                      <span className="text-[var(--text-secondary)]">{rest.fee}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Popular Right Now */}
          <div className="px-5 mt-6">
            <div className="flex items-center gap-1.5 mb-3">
              <h2 className="font-bold text-lg">Popular Right Now</h2>
              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13.07 4.8 14.56 2.96C14.7 2.78 14.58 2.5 14.34 2.5C11.96 2.5 9.77 4.09 8.65 6.22C7.75 7.9 7.7 9.87 8.35 11.66C8.42 11.87 8.24 12.06 8.04 11.97C7.4 11.69 6.81 11.27 6.32 10.74C6.18 10.59 5.95 10.61 5.86 10.8C5.07 12.39 5.09 14.3 5.92 15.86C6.54 17.03 7.55 17.9 8.76 18.39C9.22 18.57 9.53 19 9.56 19.49C9.61 20.3 8.94 21 8.1 21H15.9C16.74 21 17.41 20.3 17.46 19.49C17.49 19 17.8 18.57 18.26 18.39C19.47 17.9 20.48 17.03 21.1 15.86C21.93 14.3 21.95 12.39 21.16 10.8C21.07 10.61 20.84 10.59 20.7 10.74C20.21 11.27 19.62 11.69 18.98 11.97C18.78 12.06 18.6 11.87 18.67 11.66C18.92 10.8 18.96 9.88 18.78 9.03C18.71 8.73 18.31 8.67 18.15 8.94C17.63 9.85 16.92 10.61 16.08 11.19C15.9 11.31 15.65 11.24 15.54 11.05C15.44 10.86 15.51 10.61 15.7 10.49C16.34 10.05 17.05 9.75 17.8 9.57C17.8 9.57 17.7 9.58 17.66 11.2Z" /></svg>
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'Crispy Chicken Burger', rest: 'Burger Joint', rating: 4.7, time: '20 min', price: '$12.99', bg: 'from-yellow-200 to-amber-300' },
                { name: 'California Roll Set', rest: 'Sushi Palace', rating: 4.9, time: '15 min', price: '$18.50', bg: 'from-pink-200 to-rose-300' },
                { name: 'Pepperoni Pizza', rest: 'Mamma Mia Pizza', rating: 4.8, time: '25 min', price: '$14.99', bg: 'from-red-200 to-orange-300' }
              ].map((dish, i) => (
                <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3 flex gap-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                  <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${dish.bg} shrink-0 relative overflow-hidden flex items-center justify-center`}>
                    <svg className="w-8 h-8 text-black/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                    <div>
                      <h3 className="font-bold text-sm truncate">{dish.name}</h3>
                      <p className="text-xs text-[var(--text-secondary)] truncate">{dish.rest}</p>
                    </div>
                    <div className="flex justify-between items-end mt-1">
                      <div className="flex items-center text-xs text-[var(--text-primary)] font-medium">
                        <svg className="w-3.5 h-3.5 text-amber-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{dish.rating}</span>
                        <span className="mx-1.5 text-[var(--border)]">•</span>
                        <span className="text-[var(--text-secondary)]">{dish.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[var(--accent)] text-sm">{dish.price}</span>
                        <button className="bg-[var(--accent)] text-white rounded-full px-3 py-1 text-xs font-bold shadow-sm hover:bg-[var(--accent-hover)] transition-colors">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Special Offers */}
          <div className="px-5 mt-6">
            <div className="flex items-center gap-1.5 mb-3">
              <h2 className="font-bold text-lg">Special Offers</h2>
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Limited</span>
            </div>

            <div className="space-y-3">
              {[
                { pct: '30%', title: 'Free Delivery Weekend', desc: 'Free delivery on all orders this weekend', valid: 'Valid until Nov 30' },
                { pct: '20%', title: 'Combo Meal Deal', desc: 'Buy any combo and save 20% instantly', valid: 'Valid until Dec 15' }
              ].map((offer, i) => (
                <div key={i} className="bg-[var(--accent-light)] border border-[var(--accent)]/20 rounded-xl p-4 flex gap-4 items-center cursor-pointer hover:bg-[var(--accent)]/10 transition-colors">
                  <div className="w-12 h-12 bg-[var(--accent)] text-white rounded-full flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                    {offer.pct}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-[var(--text-primary)]">{offer.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-tight">{offer.desc}</p>
                    <p className="text-[10px] font-semibold text-[var(--accent)] mt-1.5">{offer.valid}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8. Order Tracking */}
          <div className="mx-5 mt-6 mb-4">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent)]/5 rounded-bl-[100px]"></div>
              
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">Your order is being prepared</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">Mamma Mia Pizza</p>
                </div>
                <div className="bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold px-2 py-1 rounded">
                  25 min
                </div>
              </div>

              <div className="relative mt-5 mb-2">
                {/* Connecting lines */}
                <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 h-[2px] bg-[var(--bg-secondary)] -z-10"></div>
                <div className="absolute top-1/2 -translate-y-1/2 left-2 w-1/3 h-[2px] bg-[var(--accent)] -z-10"></div>
                
                {/* Dots */}
                <div className="flex justify-between items-center">
                  <div className="w-4 h-4 rounded-full bg-[var(--accent)] flex items-center justify-center ring-4 ring-[var(--bg-card)]">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-[var(--accent)] ring-4 ring-[var(--bg-card)] animate-pulse shadow-[0_0_8px_var(--accent)]"></div>
                  <div className="w-4 h-4 rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--border)] ring-4 ring-[var(--bg-card)]"></div>
                  <div className="w-4 h-4 rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--border)] ring-4 ring-[var(--bg-card)]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* 9. Bottom Nav */}
          <div className="fixed bottom-0 w-full max-w-[390px] bg-[var(--bg-card)]/95 backdrop-blur-md border-t border-[var(--border)] z-50 px-2 pt-2 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex justify-around items-center h-12">
              {[
                { id: 'Home', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
                { id: 'Search', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg> },
                { id: 'Orders', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
                { id: 'Favorites', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> },
                { id: 'Account', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1 w-14 cursor-pointer transition-colors ${activeTab === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  <div className={`transition-transform duration-200 ${activeTab === tab.id ? 'scale-110' : ''}`}>
                    {tab.icon}
                  </div>
                  <span className="text-[10px] font-medium tracking-wide">{tab.id}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
