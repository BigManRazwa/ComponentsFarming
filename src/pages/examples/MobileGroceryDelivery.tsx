import { useState, useEffect } from 'react';

type Variant = 'fresh' | 'organic' | 'berry';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#22C55E': 'fresh',
  '#22c55e': 'fresh',
  '#EA580C': 'organic',
  '#ea580c': 'organic',
  '#7C3AED': 'berry',
  '#7c3aed': 'berry',
};

const formatTime = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return {
    h: h < 10 ? `0${h}` : `${h}`,
    m: m < 10 ? `0${m}` : `${m}`,
    s: s < 10 ? `0${s}` : `${s}`,
  };
};

export function MobileGroceryDelivery({ variant = 'fresh' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [activeNav, setActiveNav] = useState('home');
  const [customAccent, setCustomAccent] = useState<{ accent: string; hover: string } | null>(null);
  const [cartCount, setCartCount] = useState(3);
  const [fsSeconds, setFsSeconds] = useState(2 * 3600 + 15 * 60 + 30);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;

      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('fresh');
        setCustomAccent(null);
        return;
      }

      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) {
        setActiveTheme(themeName);
        setCustomAccent(null);
      } else {
        setActiveTheme('fresh');
        setCustomAccent({
          accent: variation.accent,
          hover: variation.accent,
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setFsSeconds(prev => (prev <= 0 ? 2 * 3600 + 15 * 60 + 30 : prev - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const addToCart = () => setCartCount(c => c + 1);

  const flashTime = formatTime(fsSeconds);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .grocery-wrapper {
          --accent: #22C55E;
          --accent-hover: #16A34A;
          --bg-primary: #FFFFFF;
          --bg-secondary: #F7FEF2;
          --bg-card: #FFFFFF;
          --border: #E2E8F0;
          --text-primary: #1A1A1A;
          --text-secondary: #64748B;
          font-family: 'Inter', sans-serif;
        }
        .grocery-wrapper[data-theme="organic"] {
          --accent: #EA580C;
          --accent-hover: #C2410C;
          --bg-primary: #FFFAF5;
          --bg-secondary: #FFF7ED;
          --bg-card: #FFFFFF;
          --border: #FED7AA;
          --text-primary: #1A1A1A;
          --text-secondary: #78716C;
        }
        .grocery-wrapper[data-theme="berry"] {
          --accent: #7C3AED;
          --accent-hover: #6D28D9;
          --bg-primary: #FAF5FF;
          --bg-secondary: #F3E8FF;
          --bg-card: #FFFFFF;
          --border: #DDD6FE;
          --text-primary: #1A1A1A;
          --text-secondary: #6B7280;
        }
        ${customAccent ? `
        .grocery-wrapper {
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

      <div className="grocery-wrapper min-h-screen bg-[var(--bg-secondary)] flex justify-center text-[var(--text-primary)]" data-theme={activeTheme === 'fresh' && !customAccent ? undefined : activeTheme}>
        
        {/* Mobile Phone Container */}
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-secondary)] relative shadow-2xl flex flex-col">
          
          {/* 1. Header */}
          <div className="px-4 pt-3 bg-[var(--bg-primary)] sticky top-0 z-50 rounded-b-2xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 cursor-pointer">
                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="font-semibold text-sm">123 Main St</span>
                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
              <button className="cursor-pointer text-[var(--text-primary)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </button>
            </div>
            
            {/* Search bar */}
            <div className="bg-[var(--bg-secondary)] rounded-xl flex items-center px-3 py-2 mb-3">
              <svg className="w-5 h-5 text-[var(--text-secondary)] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder="Search for groceries..." className="bg-transparent border-none outline-none text-sm w-full text-[var(--text-primary)] placeholder-[var(--text-secondary)]" />
            </div>
          </div>

          <div className="overflow-y-auto flex-1 scrollbar-hide pb-32">
            {/* 2. Promo Banner */}
            <div className="mx-4 mt-3 rounded-xl bg-[var(--accent)] p-4 flex items-center justify-between text-white shadow-md">
              <div className="font-bold pr-2 leading-tight">Free Delivery on orders over $30</div>
              <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.9 17.9 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
            </div>

            {/* 3. Categories */}
            <div className="px-4 mt-4">
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {[
                  { name: 'Fruits', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /> },
                  { name: 'Vegetables', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /> },
                  { name: 'Dairy', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /> },
                  { name: 'Meat', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /> },
                  { name: 'Bakery', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /> },
                  { name: 'Beverages', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /> },
                ].map((cat, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center p-2.5 text-[var(--accent)] bg-[var(--accent)] bg-opacity-10">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">{cat.icon}</svg>
                    </div>
                    <span className="text-xs font-medium text-center">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Flash Deals */}
            <div className="px-4 mt-5">
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold text-lg flex items-center gap-2">
                  Flash Deals
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="flex gap-1 text-[var(--accent)] font-semibold text-sm">
                  <span className="bg-[var(--accent)] bg-opacity-10 px-1.5 py-0.5 rounded">{flashTime.h}</span>:
                  <span className="bg-[var(--accent)] bg-opacity-10 px-1.5 py-0.5 rounded">{flashTime.m}</span>:
                  <span className="bg-[var(--accent)] bg-opacity-10 px-1.5 py-0.5 rounded">{flashTime.s}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Organic Avocados (6pk)', price: 4.99, orig: 7.99, gradient: 'linear-gradient(135deg, #a8e063, #56ab2f)' },
                  { name: 'Greek Yogurt Bundle', price: 6.49, orig: 9.99, gradient: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)' }
                ].map((deal, i) => (
                  <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3 flex flex-col shadow-sm cursor-pointer">
                    <div className="aspect-square rounded-lg w-full mb-2" style={{ background: deal.gradient }}></div>
                    <div className="font-bold text-sm leading-tight mb-1 flex-1">{deal.name}</div>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-[var(--accent)] font-bold">${deal.price}</span>
                      <span className="text-[var(--text-secondary)] text-xs line-through">${deal.orig}</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); addToCart(); }} className="bg-[var(--accent)] text-white text-xs font-semibold py-1.5 rounded-lg w-full hover:bg-[var(--accent-hover)] transition-colors cursor-pointer">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Popular Items */}
            <div className="px-4 mt-5">
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold text-lg">Popular Items</div>
                <div className="text-[var(--accent)] text-sm font-semibold cursor-pointer">See All</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Fresh Avocados', weight: '500g', price: 2.99, gradient: 'linear-gradient(135deg, #11998e, #38ef7d)' },
                  { name: 'Organic Whole Milk', weight: '1L', price: 4.50, gradient: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)' },
                  { name: 'Sourdough Bread', weight: '400g', price: 3.99, gradient: 'linear-gradient(135deg, #f6d365, #fda085)' },
                  { name: 'Chicken Breast', weight: '500g', price: 8.99, gradient: 'linear-gradient(135deg, #ff9a9e, #fecfef)' },
                  { name: 'Strawberries', weight: '250g', price: 5.99, gradient: 'linear-gradient(135deg, #ff0844, #ffb199)' },
                  { name: 'Fresh Orange Juice', weight: '1L', price: 3.49, gradient: 'linear-gradient(135deg, #fceabb, #f8b500)' },
                ].map((item, i) => (
                  <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col overflow-hidden shadow-sm cursor-pointer">
                    <div className="aspect-[4/3] w-full" style={{ background: item.gradient }}></div>
                    <div className="p-3 flex flex-col flex-1">
                      <div className="text-sm font-semibold leading-tight mb-1">{item.name}</div>
                      <div className="text-xs text-[var(--text-secondary)] mb-2">{item.weight}</div>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-bold">${item.price.toFixed(2)}</span>
                        <button onClick={(e) => { e.stopPropagation(); addToCart(); }} className="w-7 h-7 rounded-full bg-[var(--accent)] text-white flex items-center justify-center cursor-pointer hover:bg-[var(--accent-hover)] transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. Cart Bar */}
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-4 z-40">
            <div className="bg-[var(--accent)] rounded-xl p-3 flex items-center justify-between text-white shadow-lg cursor-pointer">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <span className="font-medium text-sm">{cartCount} items</span>
              </div>
              <div className="font-bold">$15.48</div>
              <div className="flex items-center gap-1 font-semibold text-sm">
                View Cart
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </div>

          {/* 7. Bottom Nav */}
          <div className="absolute bottom-0 w-full bg-[var(--bg-primary)] border-t border-[var(--border)] h-16 flex z-50">
            {[
              { id: 'home', label: 'Home', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
              { id: 'categories', label: 'Categories', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> },
              { id: 'deals', label: 'Deals', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
              { id: 'orders', label: 'Orders', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /> },
              { id: 'profile', label: 'Profile', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveNav(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${activeNav === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{tab.icon}</svg>
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Variant Switcher (Fixed to Window) */}
        <div className="fixed bottom-5 right-5 bg-white p-2.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.15)] flex gap-2.5 z-[1000] border border-[var(--border)]">
          {[
            { id: 'fresh', bg: '#22C55E', label: 'Fresh' },
            { id: 'organic', bg: '#EA580C', label: 'Organic' },
            { id: 'berry', bg: '#7C3AED', label: 'Berry' }
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
              <span className="absolute -top-[35px] left-1/2 -translate-x-1/2 bg-[#333] text-white text-[12px] px-2 py-1 rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity group-hover:opacity-100">
                {theme.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
