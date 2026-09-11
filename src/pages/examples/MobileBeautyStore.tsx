import { useState, useEffect } from 'react';

type Variant = 'rose' | 'lavender' | 'peach';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#E11D48': 'rose',
  '#e11d48': 'rose',
  '#7C3AED': 'lavender',
  '#7c3aed': 'lavender',
  '#EA580C': 'peach',
  '#ea580c': 'peach',
};

export function MobileBeautyStore({ variant = 'rose' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [activeNav, setActiveNav] = useState('home');
  const [customAccent, setCustomAccent] = useState<{ accent: string; hover: string; light: string } | null>(null);
  const [bagCount, setBagCount] = useState(0);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('rose');
        setCustomAccent(null);
        return;
      }
      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) {
        setActiveTheme(themeName);
        setCustomAccent(null);
      } else {
        setActiveTheme('rose');
        setCustomAccent({
          accent: variation.accent,
          hover: variation.accent,
          light: variation.accent + '1A',
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addToBag = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBagCount(c => c + 1);
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .beauty-wrapper {
          --accent: #E11D48;
          --accent-hover: #BE123C;
          --accent-light: #FFF1F2;
          --bg-primary: #FFFBFB;
          --bg-secondary: #FFF5F5;
          --bg-card: #FFFFFF;
          --border: #FEE2E2;
          --text-primary: #1A1A1A;
          --text-secondary: #9CA3AF;
          font-family: 'Inter', sans-serif;
        }
        .beauty-wrapper[data-theme="lavender"] {
          --accent: #7C3AED;
          --accent-hover: #6D28D9;
          --accent-light: #F5F3FF;
          --bg-primary: #FEFBFF;
          --bg-secondary: #F9F5FF;
          --bg-card: #FFFFFF;
          --border: #E9D5FF;
          --text-primary: #1A1A1A;
          --text-secondary: #9CA3AF;
        }
        .beauty-wrapper[data-theme="peach"] {
          --accent: #EA580C;
          --accent-hover: #C2410C;
          --accent-light: #FFF7ED;
          --bg-primary: #FFFCFA;
          --bg-secondary: #FFF7ED;
          --bg-card: #FFFFFF;
          --border: #FED7AA;
          --text-primary: #1A1A1A;
          --text-secondary: #9CA3AF;
        }
        ${customAccent ? `
        .beauty-wrapper {
          --accent: ${customAccent.accent} !important;
          --accent-hover: ${customAccent.hover} !important;
          --accent-light: ${customAccent.light} !important;
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

      <div className="beauty-wrapper min-h-screen bg-[var(--bg-secondary)] flex justify-center text-[var(--text-primary)]" data-theme={activeTheme === 'rose' && !customAccent ? undefined : activeTheme}>
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative shadow-2xl flex flex-col">
          
          {/* 1. Header */}
          <div className="px-5 pt-4 flex justify-between items-center bg-[var(--bg-primary)] sticky top-0 z-50 pb-2">
            <div className="text-[var(--accent)] font-bold tracking-widest uppercase text-xl">GLOW</div>
            <div className="flex items-center gap-4">
              <svg className="w-6 h-6 cursor-pointer text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <svg className="w-6 h-6 cursor-pointer text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              <div className="relative cursor-pointer">
                <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                {bagCount > 0 && (
                  <div className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-[var(--accent)] text-white text-[10px] flex items-center justify-center font-bold">
                    {bagCount}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 scrollbar-hide pb-24">
            
            {/* 2. Hero Banner */}
            <div className="mx-5 mt-3 rounded-2xl overflow-hidden relative aspect-[16/9] flex items-center p-6 cursor-pointer" style={{ background: 'linear-gradient(135deg, var(--accent-light) 0%, var(--accent) 100%)' }}>
              <div className="relative z-10 text-white">
                <div className="font-bold text-xl mb-1">Summer Glow Sale</div>
                <div className="text-white/90 text-sm mb-3">Up to 40% off</div>
                <button className="bg-white text-[var(--accent)] px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer hover:bg-opacity-90 transition-opacity">
                  Shop Now
                </button>
              </div>
            </div>

            {/* 3. Categories */}
            <div className="px-5 mt-5">
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {[
                  { name: 'Skincare', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /> },
                  { name: 'Makeup', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /> },
                  { name: 'Fragrance', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /> },
                  { name: 'Haircare', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a1.5 1.5 0 01-1.5 1.5H9.375a3 3 0 00-3 3v3a3 3 0 003 3h5.25a3 3 0 003-3v-3a3 3 0 00-3-3h-.375a1.5 1.5 0 01-1.5-1.5v0z" /> },
                  { name: 'Tools', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M15.75 12l-2.882 2.882M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /> },
                  { name: 'Sets', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /> },
                ].map((cat, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="w-[52px] h-[52px] rounded-full bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{cat.icon}</svg>
                    </div>
                    <span className="text-xs font-medium text-[var(--text-primary)]">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Best Sellers */}
            <div className="px-5 mt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="font-bold text-lg flex items-center gap-1.5">
                  Best Sellers
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.5 7.5c-1.5-2.5-4-4.5-5.5-6.5-1.5 2-4 4-5.5 6.5C5 10 4 12.5 5 15.5c1 3.5 3.5 6.5 7 6.5s6-3 7-6.5c1-3 0-5.5-1.5-8z" /></svg>
                </div>
                <div className="text-[var(--accent)] text-sm font-semibold cursor-pointer">See All</div>
              </div>

              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {[
                  { id: 'bs1', brand: 'GLOW', name: 'Vitamin C Serum', rating: '4.8', price: 42.00, grad: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' },
                  { id: 'bs2', brand: 'GLOW', name: 'Hydra Moisturizer', rating: '4.9', price: 38.00, grad: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' },
                  { id: 'bs3', brand: 'GLOW', name: 'Lip Velvet Duo', rating: '4.7', price: 28.00, grad: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
                  { id: 'bs4', brand: 'GLOW', name: 'Eye Cream Pro', rating: '4.8', price: 55.00, grad: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' },
                ].map((item) => (
                  <div key={item.id} className="w-36 flex-shrink-0 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden cursor-pointer">
                    <div className="aspect-square relative" style={{ background: item.grad }}>
                      <div className="absolute top-2 left-2 bg-[var(--accent)] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">BEST SELLER</div>
                    </div>
                    <div className="p-3">
                      <div className="text-[10px] text-[var(--text-secondary)] font-medium mb-0.5">{item.brand}</div>
                      <div className="text-sm font-bold leading-tight mb-1 truncate">{item.name}</div>
                      <div className="flex items-center gap-1 mb-2">
                        <svg className="w-3 h-3 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <span className="text-xs text-[var(--text-secondary)]">{item.rating}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">${item.price.toFixed(2)}</span>
                        <button onClick={(e) => addToBag(e)} className="w-6 h-6 rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center cursor-pointer hover:bg-[var(--accent)] hover:text-white transition-colors">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Special Offers */}
            <div className="mx-5 mt-6 bg-[var(--accent-light)] rounded-xl p-4 flex flex-col cursor-pointer border border-[var(--border)]">
              <div className="font-bold text-lg mb-1 text-[var(--accent)]">Buy 2 Get 1 Free</div>
              <div className="text-sm text-[var(--text-secondary)] mb-3">On all skincare essentials</div>
              <button className="bg-[var(--accent)] text-white w-max px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-[var(--accent-hover)] transition-colors">
                Shop
              </button>
            </div>

            {/* 6. New Arrivals */}
            <div className="px-5 mt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="font-bold text-lg flex items-center gap-1.5">
                  New Arrivals
                  <svg className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.6H22l-6.4 4.8 2.4 7.6-6.4-4.8-6.4 4.8 2.4-7.6-6.4-4.8h7.6L12 2z"/></svg>
                </div>
                <div className="text-[var(--accent)] text-sm font-semibold cursor-pointer">View All</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'na1', brand: 'GLOW', name: 'Rose Face Mist', price: 24.00, grad: 'linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)' },
                  { id: 'na2', brand: 'GLOW', name: 'Matte Lip Kit', price: 32.00, grad: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)' },
                  { id: 'na3', brand: 'GLOW', name: 'Glow Primer', price: 29.00, grad: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)' },
                  { id: 'na4', brand: 'GLOW', name: 'Lash Mascara', price: 22.00, grad: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)' },
                ].map((item) => (
                  <div key={item.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden cursor-pointer group">
                    <div className="aspect-[3/4] relative" style={{ background: item.grad }}>
                      <div className="absolute top-2 left-2 bg-white text-[var(--text-primary)] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">NEW</div>
                      <button 
                        onClick={(e) => toggleWishlist(item.id, e)} 
                        className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer"
                      >
                        <svg className={`w-4 h-4 transition-colors ${wishlist[item.id] ? 'text-[var(--accent)] fill-current' : 'text-[var(--text-secondary)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-3">
                      <div className="text-[10px] text-[var(--text-secondary)] font-medium mb-0.5">{item.brand}</div>
                      <div className="text-sm font-bold leading-tight mb-2 truncate">{item.name}</div>
                      <div className="font-bold text-sm mb-2">${item.price.toFixed(2)}</div>
                      <button onClick={(e) => addToBag(e)} className="w-full py-1.5 border border-[var(--accent)] text-[var(--accent)] rounded-lg text-xs font-semibold cursor-pointer hover:bg-[var(--accent-light)] transition-colors">
                        Add to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Reviews Highlight */}
            <div className="mx-5 mt-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 cursor-pointer">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <div className="font-bold text-sm">4.9 Average Rating</div>
              <div className="text-xs text-[var(--text-secondary)] mb-3">from 12,000+ reviews</div>
              <div className="flex items-start gap-3 bg-[var(--bg-secondary)] p-3 rounded-lg border border-[var(--border)]">
                <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' }}></div>
                <div>
                  <div className="font-semibold text-sm mb-0.5">Sarah M.</div>
                  <div className="text-xs text-[var(--text-secondary)] italic">"The vitamin C serum transformed my skin!"</div>
                </div>
              </div>
            </div>

            {/* 8. Recently Viewed */}
            <div className="px-5 mt-5">
              <div className="font-bold text-sm mb-3 text-[var(--text-secondary)]">Recently Viewed</div>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {[
                  { grad: 'linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)' },
                  { grad: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' },
                  { grad: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
                ].map((item, i) => (
                  <div key={i} className="w-16 h-16 rounded-lg flex-shrink-0 cursor-pointer border border-[var(--border)]" style={{ background: item.grad }}></div>
                ))}
              </div>
            </div>

          </div>

          {/* 9. Bottom Nav */}
          <div className="absolute bottom-0 w-full bg-[var(--bg-primary)] border-t border-[var(--border)] h-[68px] flex z-50 px-2 pb-2">
            {[
              { id: 'home', label: 'Home', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
              { id: 'categories', label: 'Categories', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /> },
              { id: 'offers', label: 'Offers', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /> },
              { id: 'wishlist', label: 'Wishlist', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /> },
              { id: 'profile', label: 'Profile', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /> }
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

        {/* Floating Theme Switcher */}
        <div className="fixed bottom-5 right-5 bg-white p-2.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.15)] flex gap-2.5 z-[1000] border border-[var(--border)]">
          {[
            { id: 'rose', bg: '#E11D48', label: 'Rose' },
            { id: 'lavender', bg: '#7C3AED', label: 'Lavender' },
            { id: 'peach', bg: '#EA580C', label: 'Peach' }
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
