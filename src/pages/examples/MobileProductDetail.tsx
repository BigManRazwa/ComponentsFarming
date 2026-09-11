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

export function MobileProductDetail({ variant = 'pulse' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customAccent, setCustomAccent] = useState<{ accent: string; light: string; gradient: string } | null>(null);

  // INTERACTIVE FEATURES
  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState<'Standard White' | 'Cooling Blue' | 'Charcoal Grey'>('Cooling Blue');
  const [activeSize, setActiveSize] = useState<'Standard' | 'Queen' | 'King'>('Standard');
  const [qty, setQty] = useState(1);
  const [fsSeconds, setFsSeconds] = useState(4 * 3600 + 12 * 60 + 16);
  const [isWishlisted, setIsWishlisted] = useState(false);

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
    const timer = setInterval(() => setFsSeconds(prev => (prev <= 0 ? 4 * 3600 + 12 * 60 + 16 : prev - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const flashTime = formatTime(fsSeconds);
  
  const handleQtyChange = (delta: number) => {
    setQty(prev => {
      const newQty = prev + delta;
      if (newQty < 1) return 1;
      if (newQty > 14) return 14;
      return newQty;
    });
  };

  const images = [
    'linear-gradient(135deg, #bfdbfe, #3b82f6)',
    'linear-gradient(135deg, #93c5fd, #2563eb)',
    'linear-gradient(135deg, #d1d5db, #6b7280)',
    'linear-gradient(135deg, #e5e7eb, #9ca3af)',
    'linear-gradient(135deg, #f3f4f6, #d1d5db)'
  ];

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
          
          {/* 1. Top Header Bar */}
          <div className="bg-[var(--bg-primary)] px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
            <div className="flex items-center gap-3">
              <button className="text-[var(--text-primary)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              </button>
              <div className="flex items-center gap-2 border-r border-[var(--border-color)] pr-3">
                <div className="w-6 h-6 bg-[var(--accent)] text-white flex items-center justify-center font-bold text-sm rounded-sm">P</div>
                <span className="text-[var(--accent)] font-bold text-xs tracking-widest leading-none">MARKET<br/>PLACE</span>
              </div>
              <span className="font-bold text-base whitespace-nowrap">Product Detail</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-[var(--text-primary)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </button>
              <button className="text-[var(--text-primary)] relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" /></svg>
                <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center leading-none">2</span>
              </button>
              <div className="w-7 h-7 rounded-full bg-gray-200 border border-[var(--border-color)] flex items-center justify-center overflow-hidden">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 scrollbar-hide bg-[var(--bg-secondary)]">
            
            {/* 2. Product Image Gallery */}
            <div className="bg-[var(--bg-primary)]">
              <div className="w-full aspect-[4/3] relative">
                <div className="w-full h-full" style={{ background: images[activeImage] }}></div>
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  {activeImage + 1}/{images.length}
                </div>
              </div>
              <div className="p-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-14 h-14 rounded flex-shrink-0 border-2 transition-colors ${activeImage === idx ? 'border-[var(--accent)]' : 'border-transparent'}`}
                    style={{ background: img }}
                  />
                ))}
              </div>
              <div className="px-4 pb-3 flex gap-2">
                <span className="bg-[var(--accent)] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">MALL</span>
                <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">#1 Bestseller in Bedding</span>
              </div>
            </div>

            {/* 3. Price & Flash Sale Section */}
            <div className="bg-[var(--bg-primary)] mt-2">
              <div className="bg-[var(--accent-light)] px-4 py-2 flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-[var(--accent)]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <span className="font-bold text-sm italic tracking-wide">FLASH SALE</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-medium text-gray-600">ENDS IN</span>
                  <div className="flex gap-1">
                    <span className="bg-gray-800 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">{flashTime.h}</span>
                    <span className="text-gray-800 text-[10px] font-bold">:</span>
                    <span className="bg-gray-800 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">{flashTime.m}</span>
                    <span className="text-gray-800 text-[10px] font-bold">:</span>
                    <span className="bg-gray-800 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">{flashTime.s}</span>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 flex items-baseline gap-2">
                <span className="text-[var(--text-price)] font-bold text-3xl">SGD $34.90</span>
                <span className="text-[var(--text-secondary)] text-sm line-through decoration-gray-400">$49.90</span>
              </div>
            </div>

            {/* 4. Product Title & Info */}
            <div className="bg-[var(--bg-primary)] px-4 pb-3">
              <h1 className="text-sm font-medium leading-snug line-clamp-3 text-gray-800">
                Premium Ergonomic Memory Foam Pillow – Orthopedic Neck Support with Cooling Gel Layer
              </h1>
              <div className="mt-2 flex items-center gap-1.5 bg-[#FFF9E6] px-2 py-1 rounded w-max">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-amber-600 text-[11px] font-medium">Earn 35 Marketplace Coins</span>
                <span className="text-[10px] text-gray-500">on this purchase</span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs divide-x divide-gray-300">
                <div className="flex items-center gap-1">
                  <div className="flex text-[var(--star-color)] text-sm">
                    <span>★</span><span>★</span><span>★</span><span>★</span>
                    <span className="relative overflow-hidden w-2">★</span>
                  </div>
                  <span className="font-medium text-gray-800">4.9</span>
                  <span className="text-gray-500">(2,418)</span>
                </div>
                <div className="pl-2 text-gray-500">8.4k Sold</div>
                <div className="pl-2 text-[var(--accent)] font-medium">38 Q&As</div>
              </div>
              <div className="mt-4 flex gap-4 text-[10px] font-medium text-gray-600 bg-gray-50 px-2 py-2 rounded-md">
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  100% Authentic
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                  1 Day Free Returns
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                  Free Delivery
                </div>
              </div>
            </div>

            {/* 5. Platform & Shop Vouchers */}
            <div className="bg-[var(--bg-primary)] mt-2 border-t border-[var(--border-color)] px-4 py-3">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-sm text-gray-800">Platform & Shop Vouchers</h2>
                <button className="text-[var(--accent)] text-xs font-medium">Redeem More &gt;</button>
              </div>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                <div className="min-w-[160px] bg-red-50 border border-red-100 rounded-md p-2 flex relative">
                  <div className="w-1.5 h-full bg-[var(--accent)] absolute left-0 top-0 rounded-l-md"></div>
                  <div className="pl-3 w-full">
                    <div className="text-[var(--accent)] font-bold text-lg leading-none mb-1">$5</div>
                    <div className="text-xs text-gray-700">Min. spend $30</div>
                    <div className="text-[9px] text-gray-400 mt-1">valid until Oct 31</div>
                  </div>
                </div>
                <div className="min-w-[160px] bg-green-50 border border-green-100 rounded-md p-2 flex relative">
                  <div className="w-1.5 h-full bg-green-500 absolute left-0 top-0 rounded-l-md"></div>
                  <div className="pl-3 w-full">
                    <div className="flex items-center gap-1 text-green-600 font-bold text-sm mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                      Free Shipping
                    </div>
                    <div className="text-xs text-gray-700">above $15</div>
                    <div className="text-[9px] text-green-600 font-medium mt-1">Active Voucher</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Select Variations Section */}
            <div className="bg-[var(--bg-primary)] mt-2 border-t border-[var(--border-color)] px-4 py-3">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-sm text-gray-800">Select Variations</h2>
                <div className="text-[var(--accent)] text-xs font-medium bg-[var(--accent-light)] px-2 py-1 rounded">
                  {activeColor} · {activeSize}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">Color / Tone</span>
                  <span className="text-xs text-[var(--accent)]">{activeColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Standard White', 'Cooling Blue', 'Charcoal Grey'].map(c => (
                    <button 
                      key={c}
                      onClick={() => setActiveColor(c as any)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${activeColor === c ? 'border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)] font-medium' : 'border-gray-300 text-gray-700 bg-white'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">Standard & Height</span>
                  <span className="text-xs text-gray-800">{activeSize === 'Standard' ? 'Standard 50x30cm' : activeSize === 'Queen' ? 'Queen 60x40cm' : 'King 70x45cm'}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Standard', 'Queen $40.90', 'King $52.90'].map((s) => {
                    const sizeKey = s.split(' ')[0] as any;
                    return (
                      <button 
                        key={s}
                        onClick={() => setActiveSize(sizeKey)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${activeSize === sizeKey ? 'border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)] font-medium' : 'border-gray-300 text-gray-700 bg-white'}`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Quantity</span>
                  <span className="text-[10px] text-[var(--accent)] bg-[var(--accent-light)] px-1.5 py-0.5 rounded">Only 14 pieces left!</span>
                </div>
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                  <button onClick={() => handleQtyChange(-1)} className="w-8 h-7 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50" disabled={qty <= 1}>-</button>
                  <div className="w-10 h-7 flex items-center justify-center text-sm font-medium border-x border-gray-300">{qty}</div>
                  <button onClick={() => handleQtyChange(1)} className="w-8 h-7 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50" disabled={qty >= 14}>+</button>
                </div>
              </div>
            </div>

            {/* 7. Delivery Options Section */}
            <div className="bg-[var(--bg-primary)] mt-2 border-t border-[var(--border-color)] px-4 py-3">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                  <h2 className="font-bold text-sm text-gray-800">Delivery Options</h2>
                </div>
                <span className="text-[var(--accent)] text-xs font-medium">Free Shipping</span>
              </div>
              <div className="pl-7">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-800 font-medium">Standard Enterprise Delivery</span>
                  <div className="flex items-center gap-1.5 text-sm">
                    <span className="text-gray-400 line-through">SGD $4.50</span>
                    <span className="text-[var(--accent)] font-medium">SGD $0.00</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2">Guaranteed arrival by Tomorrow, 14:00–18:00</p>
                <div className="flex items-center gap-1.5 bg-gray-50 p-2 rounded text-[10px] text-gray-500">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Dispatches within 48hrs from Singapore Sorting Fulfillment Centre
                </div>
              </div>
            </div>

            {/* 8. Seller Store Card */}
            <div className="bg-[var(--bg-primary)] mt-2 border-t border-[var(--border-color)] px-4 py-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-blue-300 border border-blue-200"></div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-800">SleepWell Official Store</h3>
                    <p className="text-[10px] text-gray-500 mt-0.5">Active 6 mins ago · Singapore</p>
                  </div>
                </div>
                <button className="text-[var(--accent)] border border-[var(--accent)] px-3 py-1.5 rounded-full text-xs font-medium hover:bg-[var(--accent-light)] transition-colors">
                  Visit Shop
                </button>
              </div>
              <div className="flex divide-x divide-gray-200 text-center">
                <div className="flex-1">
                  <div className="text-[var(--accent)] font-bold text-sm">4.9 / 5.0</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Star Rating</div>
                </div>
                <div className="flex-1">
                  <div className="text-[var(--accent)] font-bold text-sm">98%</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Chat Response</div>
                </div>
                <div className="flex-1">
                  <div className="text-[var(--accent)] font-bold text-sm">150.4k</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Followers</div>
                </div>
              </div>
            </div>

            {/* 9. Product Specifications Section */}
            <div className="bg-[var(--bg-primary)] mt-2 border-t border-[var(--border-color)] px-4 py-3">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                <h2 className="font-bold text-sm text-gray-800">Product Specifications</h2>
              </div>
              <div className="text-xs flex flex-col gap-2">
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="w-1/3 text-gray-500">Core Material</span>
                  <span className="w-2/3 text-gray-800">100% High-Density Slow-Rebound Memory Foam</span>
                </div>
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="w-1/3 text-gray-500">Cooling Tech</span>
                  <span className="w-2/3 text-gray-800">Honeycomb Hydrogel Heat Dissipation Layer</span>
                </div>
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="w-1/3 text-gray-500">Outer Cover</span>
                  <span className="w-2/3 text-gray-800">Silky Ice Bamboo Pillar (Removable & Washable)</span>
                </div>
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="w-1/3 text-gray-500">Sleep Positions</span>
                  <span className="w-2/3 text-gray-800">Back Sleepers, Side Sleepers, Stomach Sleepers</span>
                </div>
                <div className="flex">
                  <span className="w-1/3 text-gray-500">Warranty</span>
                  <span className="w-2/3 text-gray-800">1-Year Mfr. Bag & Guarantee</span>
                </div>
              </div>
            </div>

            {/* 10. Designed for Deeper Rest Section */}
            <div className="bg-[var(--bg-primary)] mt-2 border-t border-[var(--border-color)] px-4 py-3">
              <h2 className="font-bold text-sm text-gray-800 mb-3">Designed for Deeper Rest</h2>
              <div className="flex flex-col gap-3">
                <div className="bg-gray-50 rounded-lg p-3 flex gap-3 items-start border border-gray-100">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-800 mb-1">Cervical Spine Traction</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">Ergonomic contour design naturally aligns your spine, relieving neck tension and upper back stiffness during sleep.</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex gap-3 items-start border border-gray-100">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v18m-9-9h18m-14.121-6.364l10.242 10.242M6.364 18.364l10.242-10.242" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-800 mb-1">Instant -3°C Cool Touch</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">Proprietary hydrogel layer disperses body heat instantly, keeping your face and neck cool throughout the night.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 11. Reviews Section */}
            <div className="bg-[var(--bg-primary)] mt-2 border-t border-[var(--border-color)] px-4 py-3 mb-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--star-color)]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <h2 className="font-bold text-sm text-gray-800">Reviews (2,418)</h2>
                </div>
                <button className="text-[var(--accent)] text-xs font-medium">View All &gt;</button>
              </div>
              
              <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4">
                <button className="text-xs px-3 py-1.5 rounded-full border border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)] font-medium whitespace-nowrap">All (2,418)</button>
                <button className="text-xs px-3 py-1.5 rounded-full border border-gray-300 text-gray-700 bg-white whitespace-nowrap">With Photos (1.5k)</button>
                <button className="text-xs px-3 py-1.5 rounded-full border border-gray-300 text-gray-700 bg-white whitespace-nowrap">5 Stars (2.1k)</button>
                <button className="text-xs px-3 py-1.5 rounded-full border border-gray-300 text-gray-700 bg-white whitespace-nowrap">4 Stars (201)</button>
              </div>

              <div className="border border-gray-100 rounded-lg p-3 bg-gray-50/50">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <div className="font-bold text-xs text-gray-800">Valerie T.</div>
                      <div className="flex text-[var(--star-color)] text-[10px]">★★★★★</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-400">12 Oct 2023</div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  Best purchase this year! The cooling gel actually works and stays cool for hours. My neck pain is gone after 3 nights. Highly recommend getting the charcoal one as well for my husband. Fast delivery!
                </p>
                <div className="mt-2 text-[10px] text-gray-400">Variation: Cooling Blue · Queen</div>
              </div>
            </div>

          </div>

          {/* 12. Bottom Action Bar */}
          <div className="bg-[var(--bg-primary)] absolute bottom-0 w-full max-w-[390px] h-14 border-t border-[var(--border-color)] flex shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
            <div className="flex h-full w-[40%] divide-x divide-[var(--border-color)]">
              <button className="flex-1 flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-[var(--accent)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <span className="text-[9px] font-medium">Store</span>
              </button>
              <button className="flex-1 flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-[var(--accent)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                <span className="text-[9px] font-medium">Chat</span>
              </button>
              <button 
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${isWishlisted ? 'text-[var(--accent)]' : 'text-gray-600 hover:text-[var(--accent)]'}`}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                <span className="text-[9px] font-medium">Wishlist</span>
              </button>
            </div>
            <div className="flex h-full w-[60%] font-medium">
              <button className="w-1/2 bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center text-[13px] border-t border-[var(--accent)]">
                Add to Cart
              </button>
              <button className="w-1/2 bg-[var(--accent)] text-white flex items-center justify-center text-[13px]">
                BUY NOW
              </button>
            </div>
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
