import { useState, useEffect } from 'react';

type Variant = 'pulse' | 'ocean' | 'emerald';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#EE4D2D': 'pulse',
  '#ee4d2d': 'pulse',
  '#0D6EFD': 'ocean',
  '#0d6efd': 'ocean',
  '#059669': 'emerald',
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

const fsData = [
  { price: 12.90, orig: 34.00, sold: 82, badge: '-65%' },
  { price: 29.90, orig: 49.90, sold: 63, badge: '-40%' },
  { price: 14.50, orig: 32.00, sold: 93, badge: '-54%' },
];

const discoverData = [
  { 
    t: "Anker Studio Over-Ear Active Noise Cancelling Headphone...", 
    badges: ['Mall', 'Free Shipping'], 
    discount: null, 
    promo: "$3 OFF", 
    p: 18.50, 
    o: 46.00, 
    rating: "4.9 (1.2k)", 
    sold: "1.8k sold" 
  },
  { 
    t: "Glow Radiance Vitamin C10% Brightening Serum Hydrating...", 
    badges: ['Preferred'], 
    discount: "-35%", 
    promo: "10% Coins Cashback", 
    p: 14.20, 
    o: 22.00, 
    rating: "4.8 (3.4k)", 
    sold: "5.1k sold" 
  },
  { 
    t: "Heavyweight 280GSM Cotton Graphic Tee Relaxed Fit Unise...", 
    badges: ['Mall'], 
    discount: null, 
    promo: "Buy 2 Get 5%", 
    p: 11.80, 
    o: 26.00, 
    rating: "4.9 (891)", 
    sold: "2.3k sold" 
  },
  { 
    t: "Precision Gooseneck 1.0L Kettle Temperature Control f...", 
    badges: ['Preferred', 'Free Shipping'], 
    discount: null, 
    promo: "$5 OFF voucher", 
    p: 34.90, 
    o: 68.00, 
    rating: "5.0 (412)", 
    sold: "940 sold" 
  }
];

const categoryIconsSvg = [
  { name: 'Free Shipping $0', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.9 17.9 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>' },
  { name: 'Flash Deals', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>' },
  { name: 'Supermarket', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>' },
  { name: 'Coins & Rewards', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/></svg>' },
  { name: 'Electronics Mall', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/></svg>' },
  { name: 'Fashion 50% Off', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z"/></svg>' },
  { name: 'Beauty Care', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/></svg>' },
  { name: 'Global Picks', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.466.733-3.559"/></svg>' },
];

const pColors = ['#fecaca', '#bfdbfe', '#bbf7d0', '#fef08a'];
const fsColors = ['#fed7aa', '#e9d5ff', '#bae6fd'];

export function MobileMarketplace({ variant = 'pulse' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [activeTab, setActiveTab] = useState('all');
  const [activeNav, setActiveNav] = useState('home');
  const [bannerSeconds, setBannerSeconds] = useState(9 * 3600 + 24 * 60 + 41);
  const [fsSeconds, setFsSeconds] = useState(9 * 3600 + 42 * 60 + 18);
  const [customAccent, setCustomAccent] = useState<{ accent: string; light: string; gradient: string } | null>(null);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;

      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('pulse');
        setCustomAccent(null);
        return;
      }

      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) {
        setActiveTheme(themeName);
        setCustomAccent(null);
      } else {
        setActiveTheme('pulse');
        setCustomAccent({
          accent: variation.accent,
          light: variation.accent + '22',
          gradient: `linear-gradient(135deg, ${variation.accent}cc, ${variation.accent})`
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    const timer1 = setInterval(() => setBannerSeconds(prev => (prev <= 0 ? 9 * 3600 + 24 * 60 + 41 : prev - 1)), 1000);
    const timer2 = setInterval(() => setFsSeconds(prev => (prev <= 0 ? 9 * 3600 + 42 * 60 + 18 : prev - 1)), 1000);
    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
    };
  }, []);

  const bannerTime = formatTime(bannerSeconds);
  const flashTime = formatTime(fsSeconds);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      <style>{`
        .marketplace-wrapper {
          --accent: #EE4D2D;
          --accent-hover: #D73211;
          --accent-light: #FFEEE8;
          --bg-primary: #FFFFFF;
          --bg-secondary: #F5F5F5;
          --bg-dark: #1A1A2E;
          --text-primary: #333333;
          --text-secondary: #757575;
          --text-price: #EE4D2D;
          --border-color: #E8E8E8;
          --star-color: #FFC107;
          --bg-gradient: linear-gradient(135deg, #FF6B6B, #EE4D2D);
          font-family: 'Roboto', sans-serif;
        }
        .marketplace-wrapper[data-theme="ocean"] {
          --accent: #0D6EFD;
          --accent-hover: #0b5ed7;
          --accent-light: #E7F1FF;
          --bg-secondary: #F8FAFC;
          --bg-dark: #1E293B;
          --text-price: #0D6EFD;
          --border-color: #E2E8F0;
          --bg-gradient: linear-gradient(135deg, #3B82F6, #0EA5E9);
        }
        .marketplace-wrapper[data-theme="emerald"] {
          --accent: #059669;
          --accent-hover: #047857;
          --accent-light: #D1FAE5;
          --bg-secondary: #F0FDF4;
          --bg-dark: #1A2E23;
          --text-price: #059669;
          --border-color: #D1D5DB;
          --bg-gradient: linear-gradient(135deg, #34D399, #059669);
        }
        ${customAccent ? `
        .marketplace-wrapper {
          --accent: ${customAccent.accent} !important;
          --accent-hover: ${customAccent.accent} !important;
          --accent-light: ${customAccent.light} !important;
          --text-price: ${customAccent.accent} !important;
          --bg-gradient: ${customAccent.gradient} !important;
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

      <div className="marketplace-wrapper min-h-screen bg-[var(--bg-secondary)] flex justify-center text-[var(--text-primary)]" data-theme={activeTheme === 'pulse' ? undefined : activeTheme}>
        
        {/* Mobile Phone Container */}
        <div className="w-full max-w-[390px] min-h-screen bg-[#F5F5F5] relative shadow-2xl flex flex-col pb-20">
          
          {/* 1. Mobile Header Bar */}
          <div className="bg-[var(--bg-primary)] px-3 py-3 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[var(--accent)] text-white flex items-center justify-center font-bold text-sm rounded-sm">P</div>
              <span className="text-[var(--accent)] font-bold text-sm tracking-widest">MARKETPLACE</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-[var(--text-primary)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </button>
              <button className="text-[var(--text-primary)] relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" /></svg>
                <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center leading-none">2</span>
              </button>
            </div>
          </div>

          {/* 2. Search Bar */}
          <div className="bg-[var(--bg-primary)] px-3 pb-3">
            <div className="bg-[#F5F5F5] rounded-full flex items-center px-3 py-2 gap-2">
              <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder="Search deals, brands and products" className="bg-transparent border-none outline-none text-sm w-full text-[var(--text-primary)] placeholder-[var(--text-secondary)]" />
            </div>
          </div>

          <div className="overflow-y-auto flex-1 scrollbar-hide">
            {/* 3. Payday Sale Banner */}
            <div className="bg-[image:var(--bg-gradient)] p-4 text-white relative">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-black/20 text-[10px] font-bold px-2 py-1 rounded">PAYDAY EXCLUSIVE</div>
                <div className="flex flex-col items-end">
                  <div className="text-[10px] mb-1">ENDS IN</div>
                  <div className="flex gap-1">
                    <span className="bg-black/40 text-white text-[12px] font-mono font-bold px-1.5 py-0.5 rounded">{bannerTime.h}</span>
                    <span className="bg-black/40 text-white text-[12px] font-mono font-bold px-1.5 py-0.5 rounded">{bannerTime.m}</span>
                    <span className="bg-black/40 text-white text-[12px] font-mono font-bold px-1.5 py-0.5 rounded">{bannerTime.s}</span>
                  </div>
                </div>
              </div>
              <h1 className="text-2xl font-bold italic mb-1">SUPER PAYDAY SALE</h1>
              <p className="text-sm font-medium mb-3">Up to 80% OFF + Free Shipping No Min. Spend</p>
              <div className="flex justify-between items-center bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <span className="text-xs font-semibold">✈ Automatic $0 Shipping at Cart</span>
                <button className="bg-white text-[var(--accent)] text-[10px] font-bold px-3 py-1.5 rounded-full">Claim Voucher &gt;</button>
              </div>
            </div>

            {/* 4. Daily Check-in Card */}
            <div className="px-3 -mt-3 relative z-10">
              <div className="bg-[var(--bg-primary)] rounded-lg shadow-sm p-3 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">Daily Check-in</span>
                    <span className="bg-[var(--accent)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">+50 Coins</span>
                  </div>
                  <div className="text-[11px] text-[var(--text-secondary)]">Tap to streak & save $0.50</div>
                </div>
                <button className="bg-[var(--accent)] text-white text-xs font-bold px-4 py-2 rounded-full">Check In</button>
              </div>
            </div>

            {/* 5. Category Icons Grid */}
            <div className="bg-[var(--bg-primary)] mt-3 py-4 px-3 grid grid-cols-4 gap-y-4 gap-x-2">
              {categoryIconsSvg.map((cat, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer">
                  <div className="w-10 h-10 bg-[#F5F5F5] rounded-full flex items-center justify-center p-2 text-[var(--text-secondary)]" dangerouslySetInnerHTML={{ __html: cat.svg }} />
                  <span className="text-[10px] text-center leading-tight w-full max-w-[64px]">{cat.name}</span>
                </div>
              ))}
            </div>

            {/* 6. Flash Sale Section */}
            <div className="bg-[var(--bg-primary)] mt-3 p-3">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--accent)] font-bold text-base flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" /></svg>
                    FLASH SALE
                  </span>
                  <div className="flex gap-1">
                    <span className="bg-black text-white text-[10px] font-mono font-bold px-1 py-0.5 rounded">{flashTime.h}</span>
                    <span className="bg-black text-white text-[10px] font-mono font-bold px-1 py-0.5 rounded">{flashTime.m}</span>
                    <span className="bg-black text-white text-[10px] font-mono font-bold px-1 py-0.5 rounded">{flashTime.s}</span>
                  </div>
                </div>
                <button className="text-[var(--text-secondary)] text-[11px] font-medium">See All &gt;</button>
              </div>

              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                {fsData.map((item, i) => (
                  <div key={i} className="min-w-[120px] max-w-[120px] flex flex-col">
                    <div className="w-[120px] h-[120px] relative rounded-lg" style={{ background: fsColors[i % fsColors.length] }}>
                      <div className="absolute top-0 right-0 bg-[#FACA51] text-[var(--accent)] text-[10px] font-bold px-1.5 py-0.5 rounded-bl-lg rounded-tr-lg">
                        {item.badge}
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-[var(--accent)] font-bold text-sm">${item.price.toFixed(2)}</div>
                      <div className="text-[var(--text-secondary)] text-[10px] line-through">${item.orig.toFixed(2)}</div>
                      <div className="mt-1 bg-[var(--accent-light)] h-3 rounded-full relative overflow-hidden w-full">
                        <div className="absolute top-0 left-0 h-full bg-[var(--accent)] rounded-full" style={{ width: `${item.sold}%` }}></div>
                        <div className="absolute w-full text-center text-[8px] text-white leading-3 font-bold z-10">{item.sold}% Sold</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Daily Discover Section */}
            <div className="mt-3">
              <div className="bg-[var(--bg-primary)] px-3 pt-3 sticky top-[108px] z-40 border-b border-[var(--border-color)]">
                <div className="font-bold text-base mb-2">DAILY DISCOVER</div>
                <div className="flex gap-4">
                  {['All', 'Beauty', 'Gadgets'].map((tab) => (
                    <button 
                      key={tab} 
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'text-[var(--accent)] border-[var(--accent)]' : 'text-[var(--text-secondary)] border-transparent'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-2 grid grid-cols-2 gap-2">
                {discoverData.map((item, i) => (
                  <div key={i} className="bg-[var(--bg-primary)] rounded flex flex-col overflow-hidden">
                    <div className="w-full aspect-square relative" style={{ background: pColors[i % pColors.length] }}>
                      {item.discount && (
                        <div className="absolute top-0 right-0 bg-[#FACA51] text-[var(--accent)] text-[10px] font-bold px-1.5 py-0.5 rounded-bl rounded-tr">
                          {item.discount}
                        </div>
                      )}
                      <div className="absolute bottom-1 left-1 flex flex-wrap gap-1 w-full pr-2">
                        {item.badges.includes('Mall') && <span className="bg-[#D0011B] text-white text-[8px] font-bold px-1 py-0.5 rounded-sm">Mall</span>}
                        {item.badges.includes('Preferred') && <span className="bg-[#EE4D2D] text-white text-[8px] font-bold px-1 py-0.5 rounded-sm">Preferred</span>}
                        {item.badges.includes('Free Shipping') && <span className="bg-[#00BFA5] text-white text-[8px] font-bold px-1 py-0.5 rounded-sm">Free Shipping</span>}
                      </div>
                    </div>
                    <div className="p-2 flex flex-col flex-1">
                      <div className="text-xs leading-tight line-clamp-2 mb-1 min-h-[30px]">{item.t}</div>
                      <div className="text-[var(--accent)] border border-[var(--accent)] text-[8px] px-1 py-0.5 w-max rounded-sm mb-1">{item.promo}</div>
                      <div className="flex items-baseline gap-1 mt-auto">
                        <span className="text-[var(--accent)] font-bold text-sm">${item.p.toFixed(2)}</span>
                        <span className="text-[var(--text-secondary)] text-[10px] line-through">${item.o.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1 text-[9px] text-[var(--text-secondary)]">
                        <span className="text-[var(--star-color)]">★ {item.rating}</span>
                        <span>{item.sold}</span>
                      </div>
                      <div className="mt-2 text-center text-[10px] text-[var(--text-secondary)] border-t border-[var(--border-color)] pt-1 w-full">
                        🔍 Find Similar
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. Loading More indicator */}
            <div className="py-6 flex flex-col items-center justify-center">
              <div className="text-sm font-medium text-[var(--text-secondary)] mb-1 flex items-center gap-1">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Loading more personalized deals...
              </div>
              <div className="text-xs text-[var(--text-secondary)] opacity-70">Prices updated 2 mins ago</div>
            </div>
          </div>

          {/* 9. Bottom Navigation Bar */}
          <div className="bg-[var(--bg-primary)] absolute bottom-0 w-full max-w-[390px] h-16 border-t border-[var(--border-color)] flex shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
            {[
              { 
                id: 'home', 
                label: 'Home', 
                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3l9 8h-3v8h-4v-6H10v6H6v-8H3l9-8z" /></svg>,
                outline: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              },
              { 
                id: 'mall', 
                label: 'Mall', 
                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" /></svg>,
                outline: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              },
              { 
                id: 'live', 
                label: 'Live', 
                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" /></svg>,
                outline: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              },
              { 
                id: 'notifications', 
                label: 'Notifications', 
                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" /></svg>,
                outline: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              },
              { 
                id: 'me', 
                label: 'Me', 
                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>,
                outline: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              }
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveNav(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${activeNav === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
              >
                {activeNav === tab.id ? tab.icon : tab.outline}
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Variant Switcher (Fixed to Window) */}
        <div className="fixed bottom-5 right-5 bg-white p-2.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.15)] flex gap-2.5 z-[1000] border border-[var(--border-color)]">
          {[
            { id: 'pulse', bg: '#EE4D2D', label: 'Pulse Red' },
            { id: 'ocean', bg: '#0D6EFD', label: 'Ocean Commerce' },
            { id: 'emerald', bg: '#059669', label: 'Emerald Market' }
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
