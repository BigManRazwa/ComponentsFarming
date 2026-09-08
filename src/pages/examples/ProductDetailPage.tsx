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

export function ProductDetailPage({ variant = 'pulse' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customAccent, setCustomAccent] = useState<{ accent: string; light: string; gradient: string } | null>(null);
  
  const [fsSeconds, setFsSeconds] = useState(4 * 3600 + 12 * 60 + 21);
  const [activeThumb, setActiveThumb] = useState(0);
  const [selectedTone, setSelectedTone] = useState(0);
  const [selectedDim, setSelectedDim] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

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
    const fsTimer = setInterval(() => setFsSeconds(prev => (prev <= 0 ? 0 : prev - 1)), 1000);
    return () => clearInterval(fsTimer);
  }, []);

  const fsTime = formatTime(fsSeconds);
  
  const thumbnails = [
    '#fecaca', '#bfdbfe', '#bbf7d0', '#fef08a', '#e9d5ff', '#fed7aa'
  ];

  const tones = ['Standard White', 'Cooling Blue', 'Charcoal Gray'];
  const dimensions = ['Standard 50x30cm', 'Queen 60x40cm', 'King 70x45cm'];

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

      <div className="marketplace-wrapper min-h-screen bg-[var(--bg-secondary)] text-[var(--text-primary)]" data-theme={activeTheme === 'pulse' ? undefined : activeTheme}>
        
        {/* 1. Top Utility Bar */}
        <div className="bg-[var(--bg-dark)] text-white text-[12px] py-1.5">
          <div className="w-full max-w-[1200px] mx-auto px-[15px] flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <a href="#" className="hover:opacity-80 transition-opacity">Seller Center</a>
              <span>|</span>
              <a href="#" className="hover:opacity-80 transition-opacity">Download App</a>
              <span>|</span>
              <span>Connect With Us</span>
            </div>
            <div className="flex gap-4 items-center">
              <a href="#" className="hover:opacity-80 transition-opacity flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                Notifications
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M12 18.75h.008v.008H12v-.008z" /></svg>
                Help & Support
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                Track Order
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.466.733-3.559" /></svg>
                English
              </a>
            </div>
          </div>
        </div>

        {/* 2. Main Navigation Bar */}
        <nav className="bg-[var(--bg-primary)] py-4 sticky top-0 z-[100] border-b border-[var(--border-color)]">
          <div className="w-full max-w-[1200px] mx-auto px-[15px] flex justify-between items-center">
            <a href="#" className="text-[32px] font-bold text-[var(--accent)] tracking-tighter">PULSE</a>
            
            <div className="flex-1 mx-10 flex flex-col">
              <div className="flex border-2 border-[var(--accent)] rounded overflow-hidden bg-white">
                <select className="px-2.5 border-none border-r border-[var(--border-color)] bg-[var(--bg-secondary)] text-[14px] outline-none">
                  <option>All Categories</option>
                </select>
                <input type="text" className="flex-1 px-[15px] py-[10px] border-none outline-none text-[14px]" placeholder="Search for products, brands and shops..." />
                <button className="bg-[var(--accent)] text-white px-[25px] font-semibold transition-colors hover:bg-[var(--accent-hover)] cursor-pointer outline-none border-none">🔍</button>
              </div>
              <div className="text-[12px] flex gap-3 mt-1.5">
                {['Trending keywords', 'Wireless Earbuds', 'Korean Skincare', 'Cat Tree', 'Sneakers 50% Off'].map(kw => (
                  <a key={kw} href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">{kw}</a>
                ))}
              </div>
            </div>

            <div className="flex gap-5 items-center">
              <div className="relative text-[24px] cursor-pointer">
                🛒
                <span className="absolute -top-1.5 -right-2 bg-[var(--accent)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">3</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                  <svg className="w-full h-full block" viewBox="0 0 32 32"><rect width="32" height="32" fill="#ccc"/><circle cx="16" cy="12" r="6" fill="#fff"/><path d="M6 28c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="none" stroke="#fff" strokeWidth="2"/></svg>
                </div>
                <span className="font-medium text-[14px] group-hover:text-[var(--accent)] transition-colors">Alex Rivera</span>
              </div>
            </div>
          </div>
        </nav>

        {/* 3. Sub Navigation */}
        <div className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
          <div className="w-full max-w-[1200px] mx-auto px-[15px] flex justify-between items-center">
            <div className="flex">
              <button className="bg-[var(--bg-secondary)] px-5 py-3 font-semibold flex items-center gap-2 border-r border-[var(--border-color)] cursor-pointer hover:bg-gray-200 transition-colors">
                ☰ ALL CATEGORIES
              </button>
              <div className="flex">
                {['Marketplace Home', 'Flash Deals', 'Mall Brands', 'Supermarket', 'Global Collection', 'Daily Vouchers', 'Top Trending'].map((tab, i) => (
                  <a key={tab} href="#" className={`px-5 py-3 text-[14px] font-medium transition-all ${i === 0 ? 'bg-[var(--accent-light)] text-[var(--accent)]' : 'hover:text-[var(--accent)]'}`}>
                    {tab}
                  </a>
                ))}
              </div>
            </div>
            <a href="#" className="text-[var(--accent)] font-semibold text-[14px] hover:opacity-80 transition-opacity">🎁 Claim $20 Welcome Prize</a>
          </div>
        </div>

        <div className="w-full max-w-[1200px] mx-auto px-[15px] py-4">
          {/* 4. Breadcrumb */}
          <div className="text-[14px] text-[var(--text-secondary)] mb-4 flex gap-2 items-center">
            <a href="#" className="hover:text-[var(--accent)]">Home</a>
            <span>{'>'}</span>
            <a href="#" className="hover:text-[var(--accent)]">Home & Living</a>
            <span>{'>'}</span>
            <a href="#" className="hover:text-[var(--accent)]">Bedding & Bath</a>
            <span>{'>'}</span>
            <a href="#" className="hover:text-[var(--accent)]">Pillows</a>
            <span>{'>'}</span>
            <span className="text-[var(--text-primary)]">Premium Ergonomic Memory Foam Pillow</span>
          </div>

          {/* 5. Product Section */}
          <div className="bg-[var(--bg-primary)] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-5 mb-5 flex gap-8">
            {/* Left Column - Image Gallery */}
            <div className="w-[45%] flex flex-col gap-4">
              <div className="w-full aspect-square rounded-lg relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-[var(--border-color)]">
                <div className="w-full h-full" style={{ backgroundColor: thumbnails[activeThumb] }}></div>
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-1 rounded text-white bg-[#D0011B] shadow-sm">MALL AUTHENTIC</span>
                  <span className="text-[10px] font-bold px-2 py-1 rounded text-white bg-[#00BFA5] shadow-sm w-max">TOP FREE SHIPPING</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                {thumbnails.map((color, i) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveThumb(i)}
                    className={`flex-1 aspect-square rounded cursor-pointer border-2 transition-all hover:opacity-80 ${activeThumb === i ? 'border-[var(--accent)]' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
              
              <div className="text-center text-[13px] text-[var(--text-secondary)] mt-1">
                Hover to Zoom
              </div>
              
              <div className="flex justify-between items-center mt-2 px-2 border-t border-[var(--border-color)] pt-4">
                <div className="flex gap-4 items-center">
                  <span className="text-[14px] text-[var(--text-secondary)]">Share:</span>
                  <button className="text-[18px] hover:text-[var(--accent)] transition-colors">🔗</button>
                  <button className="text-[18px] hover:text-[var(--accent)] transition-colors">💙</button>
                  <button className="text-[18px] hover:text-[var(--accent)] transition-colors">🔖</button>
                </div>
                <div className="flex items-center gap-1.5 text-[var(--text-primary)] text-[14px] cursor-pointer hover:text-[var(--accent)]">
                  <span className="text-[18px] text-[var(--accent)]">❤️</span> Favorite (1,842)
                </div>
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="w-[55%] flex flex-col">
              <div className="flex items-start gap-2 mb-2">
                <span className="bg-[#D0011B] text-white text-[12px] font-bold px-1.5 py-0.5 rounded mt-0.5 whitespace-nowrap">MALL</span>
                <h1 className="text-[20px] font-medium leading-[1.3] text-[var(--text-primary)]">
                  Premium Ergonomic Memory Foam Pillow – Orthopedic Neck Support with Cooling Gel Layer
                </h1>
              </div>
              
              <div className="text-[13px] text-[var(--text-secondary)] mb-3">
                Model: SL-9042-PRO • Zero-Pressure Rebound Cervical Sleep Ergonomics
              </div>
              
              <div className="flex items-center gap-3 text-[14px] mb-4 pb-4 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-1 text-[var(--accent)]">
                  <span className="font-bold underline">4.9</span>
                  <span className="text-[var(--star-color)] text-[12px]">★★★★★</span>
                </div>
                <div className="w-[1px] h-3.5 bg-[var(--border-color)]"></div>
                <div className="flex items-center gap-1">
                  <span className="underline">2,418</span> <span className="text-[var(--text-secondary)]">Ratings</span>
                </div>
                <div className="w-[1px] h-3.5 bg-[var(--border-color)]"></div>
                <div className="flex items-center gap-1">
                  <span>5.8k</span> <span className="text-[var(--text-secondary)]">Sold</span>
                </div>
                <div className="w-[1px] h-3.5 bg-[var(--border-color)]"></div>
                <div className="flex items-center gap-1">
                  <span>420</span> <span className="text-[var(--text-secondary)]">Q&As Answered</span>
                </div>
              </div>

              {/* Flash Sale Banner */}
              <div className="bg-[image:var(--bg-gradient)] text-white rounded-t p-3 flex justify-between items-center mt-2">
                <div className="flex items-center gap-2 font-bold text-[16px]">
                  🔥 FLASH SALE <span className="bg-[#D0011B] text-[10px] px-1.5 py-0.5 rounded ml-1">LIMITED STOCK</span>
                </div>
                <div className="flex items-center gap-2 text-[13px]">
                  <span>Ends in</span>
                  <div className="flex gap-1">
                    <div className="bg-[var(--bg-dark)] px-1.5 py-0.5 rounded font-mono font-bold text-[14px]">{fsTime.h}</div>
                    <div className="bg-[var(--bg-dark)] px-1.5 py-0.5 rounded font-mono font-bold text-[14px]">{fsTime.m}</div>
                    <div className="bg-[var(--bg-dark)] px-1.5 py-0.5 rounded font-mono font-bold text-[14px]">{fsTime.s}</div>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--bg-secondary)] p-4 flex flex-col gap-2 rounded-b mb-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-[var(--text-secondary)] text-[14px]">FLASH PRICE SGD</span>
                  <span className="text-[32px] font-bold text-[var(--text-price)] leading-none">$34.90</span>
                  <span className="text-[16px] text-[var(--text-secondary)] line-through ml-1">$49.60</span>
                  <span className="bg-[var(--accent-light)] text-[var(--accent)] text-[12px] font-bold px-1.5 py-0.5 rounded ml-2">-18% OFF</span>
                </div>
                <div className="flex items-center gap-3 text-[13px] mt-2">
                  <a href="#" className="text-[var(--accent)] flex items-center gap-1"><span className="text-[#F6A700]">🪙</span> Earn 30 Marketplace Coins</a>
                  <div className="w-[1px] h-3 bg-[var(--border-color)]"></div>
                  <span className="text-[#00BFA5] flex items-center gap-1">🛡️ Lowest Price Guaranteed within 30 Days</span>
                </div>
              </div>

              {/* Vouchers Row */}
              <div className="flex items-center gap-4 mb-5 text-[14px]">
                <span className="text-[var(--text-secondary)] w-[75px]">Vouchers</span>
                <div className="flex gap-2 flex-wrap flex-1">
                  <div className="bg-[#FFEEE8] border border-[#FFC2B3] text-[var(--accent)] px-2 py-1 rounded flex items-center gap-2">
                    <span className="text-[12px] font-medium">$5 OFF Min. Spend $30</span>
                    <button className="text-[11px] font-bold uppercase hover:opacity-80">CLAIM</button>
                  </div>
                  <div className="bg-[#E5FAF6] border border-[#A1EBDD] text-[#00BFA5] px-2 py-1 rounded flex items-center gap-2">
                    <span className="text-[12px] font-medium">FREE SHIP Auto-applied at cart</span>
                  </div>
                  <div className="bg-[#FFF8E1] border border-[#FFE082] text-[#F57C00] px-2 py-1 rounded flex items-center gap-2">
                    <span className="text-[12px] font-medium">10% COIN Cashback Cap $10</span>
                    <button className="text-[11px] font-bold uppercase hover:opacity-80">CLAIM</button>
                  </div>
                </div>
              </div>

              {/* Color Tone */}
              <div className="flex items-start gap-4 mb-4 text-[14px]">
                <span className="text-[var(--text-secondary)] w-[75px] mt-2">Color Tone</span>
                <div className="flex flex-wrap gap-2 flex-1">
                  {tones.map((tone, i) => (
                    <button 
                      key={i}
                      onClick={() => setSelectedTone(i)}
                      className={`px-4 py-2 border rounded transition-colors ${selectedTone === i ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-light)]' : 'border-[var(--border-color)] hover:border-[var(--accent)] hover:text-[var(--accent)]'}`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions */}
              <div className="flex items-start gap-4 mb-6 text-[14px]">
                <span className="text-[var(--text-secondary)] w-[75px] mt-2">Dimensions</span>
                <div className="flex flex-wrap gap-2 flex-1">
                  {dimensions.map((dim, i) => (
                    <button 
                      key={i}
                      onClick={() => setSelectedDim(i)}
                      className={`px-4 py-2 border rounded transition-colors ${selectedDim === i ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-light)]' : 'border-[var(--border-color)] hover:border-[var(--accent)] hover:text-[var(--accent)]'}`}
                    >
                      {dim}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6 text-[14px]">
                <span className="text-[var(--text-secondary)] w-[75px]">Quantity</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-[var(--border-color)] rounded">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center border-r border-[var(--border-color)] hover:bg-[var(--bg-secondary)]"
                    >-</button>
                    <div className="w-12 h-8 flex items-center justify-center text-[14px]">{quantity}</div>
                    <button 
                      onClick={() => setQuantity(Math.min(38, quantity + 1))}
                      className="w-8 h-8 flex items-center justify-center border-l border-[var(--border-color)] hover:bg-[var(--bg-secondary)]"
                    >+</button>
                  </div>
                  <span className="text-[13px] text-[var(--text-secondary)]">38 pieces remaining in flash batch</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 mt-2">
                <button className="flex-1 py-3.5 border-2 border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)] rounded flex items-center justify-center gap-2 font-medium text-[15px] transition-colors hover:bg-[var(--accent)] hover:text-white">
                  🛒 Add to Cart
                </button>
                <button className="flex-1 py-3.5 bg-[var(--accent)] text-white rounded flex items-center justify-center font-medium text-[15px] transition-colors hover:bg-[var(--accent-hover)] shadow-sm">
                  Buy Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex gap-6 mt-6 pt-4 border-t border-[var(--border-color)] text-[13px]">
                <div className="flex items-center gap-1.5 text-[#00BFA5]">
                  <span>🛡️</span>
                  <div>
                    <div className="font-medium">100% Authentic</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">double money-back refund</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[var(--accent)]">
                  <span>🔄</span>
                  <div>
                    <div className="font-medium text-[var(--text-primary)]">15-Day Free Returns</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">hassle-free doorstep pickup</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[#3b82f6]">
                  <span>🚚</span>
                  <div>
                    <div className="font-medium text-[var(--text-primary)]">Free Tracked Delivery</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">dispatched in 24 hours</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 6. Seller Card */}
          <div className="bg-[var(--bg-primary)] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-5 mb-5 flex justify-between items-center">
            <div className="flex items-center gap-4 flex-1 border-r border-[var(--border-color)] pr-6">
              <div className="w-[70px] h-[70px] rounded-full bg-gray-200 border border-[var(--border-color)] overflow-hidden">
                <svg className="w-full h-full block" viewBox="0 0 32 32"><rect width="32" height="32" fill="#ccc"/><circle cx="16" cy="12" r="6" fill="#fff"/><path d="M6 28c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="none" stroke="#fff" strokeWidth="2"/></svg>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="text-[16px] font-medium text-[var(--text-primary)] flex items-center gap-2">
                  SOMNUM Home & Living Official <span className="bg-[#D0011B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">MALL</span>
                </div>
                <div className="text-[12px] text-[var(--text-secondary)]">Active 3 mins ago • Verified Flagship</div>
                <div className="flex gap-2 mt-1">
                  <button className="px-3 py-1.5 bg-[var(--accent)] text-white text-[12px] rounded flex items-center gap-1 font-medium hover:bg-[var(--accent-hover)] transition-colors">
                    💬 Chat Now
                  </button>
                  <button className="px-3 py-1.5 border border-[var(--border-color)] text-[var(--text-secondary)] text-[12px] rounded flex items-center gap-1 font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                    🏪 Visit Shop
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex px-6 justify-between text-[13px]">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between w-[150px]"><span className="text-[var(--text-secondary)]">Store Ratings:</span> <span className="text-[var(--accent)] font-medium">4.9/5.0</span></div>
                <div className="flex justify-between w-[150px]"><span className="text-[var(--text-secondary)]">Chat Performance:</span> <span className="text-[var(--accent)] font-medium">99%</span></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between w-[150px]"><span className="text-[var(--text-secondary)]">Followers:</span> <span className="text-[var(--accent)] font-medium">150.4k</span></div>
                <div className="flex justify-between w-[150px]"><span className="text-[var(--text-secondary)]">Positive Feedback:</span> <span className="text-[var(--accent)] font-medium">98%</span></div>
              </div>
            </div>
          </div>

          {/* 7. Product Tabs */}
          <div className="bg-[var(--bg-primary)] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.05)] mb-8 overflow-hidden">
            <div className="flex border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
              {[
                'Product Specifications & Overview',
                'Ratings & Verified Reviews (2,418)',
                'Questions & Answers (420)'
              ].map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-4 text-[16px] font-medium transition-colors ${activeTab === i ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-primary)] hover:text-[var(--accent)]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 0 && (
                <div className="flex flex-col gap-8">
                  {/* 8. Specifications Table */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-2">Specifications</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-[14px]">
                      <div className="flex border-b border-[var(--border-color)] pb-3">
                        <span className="w-[140px] text-[var(--text-secondary)]">Brand</span>
                        <span className="flex-1 text-[var(--text-primary)]">SOMNUM Sleep Ergonomics</span>
                      </div>
                      <div className="flex border-b border-[var(--border-color)] pb-3">
                        <span className="w-[140px] text-[var(--text-secondary)]">Core Material</span>
                        <span className="flex-1 text-[var(--text-primary)]">CertiPUR-US® High-Density Memory Foam</span>
                      </div>
                      <div className="flex border-b border-[var(--border-color)] pb-3">
                        <span className="w-[140px] text-[var(--text-secondary)]">Cooling Tech</span>
                        <span className="flex-1 text-[var(--text-primary)]">Hydrophilic Cooling Gel Pad Layer</span>
                      </div>
                      <div className="flex border-b border-[var(--border-color)] pb-3">
                        <span className="w-[140px] text-[var(--text-secondary)]">Pillowcase Material</span>
                        <span className="flex-1 text-[var(--text-primary)]">Oeko-Tex 100 Jacquard Ice-Silk Mesh (Removable)</span>
                      </div>
                      <div className="flex border-b border-[var(--border-color)] pb-3">
                        <span className="w-[140px] text-[var(--text-secondary)]">Warranty Duration</span>
                        <span className="flex-1 text-[var(--text-primary)]">5-Year Manufacturer Warranty</span>
                      </div>
                      <div className="flex border-b border-[var(--border-color)] pb-3">
                        <span className="w-[140px] text-[var(--text-secondary)]">Country of Origin</span>
                        <span className="flex-1 text-[var(--text-primary)]">Japan Formulation / Global Assembly</span>
                      </div>
                    </div>
                  </div>

                  {/* 9. Feature Highlights Section */}
                  <div className="flex flex-col gap-5 mt-4">
                    <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-2">Engineered for Restorative Deep Sleep</h3>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="flex flex-col gap-3">
                        <div className="w-full h-[200px] bg-gradient-to-tr from-gray-200 to-gray-300 rounded-lg"></div>
                        <h4 className="font-bold text-[16px] text-[var(--text-primary)]">Dual-Curve Cervical Arc</h4>
                        <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                          Specially calibrated 9cm and 11cm contour elevations cradle the natural cervical curve, alleviating shoulder stiffness and eliminating morning-nerve tension.
                        </p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="w-full h-[200px] bg-gradient-to-tr from-gray-200 to-gray-300 rounded-lg"></div>
                        <h4 className="font-bold text-[16px] text-[var(--text-primary)]">Thermal Dispersion Gel</h4>
                        <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                          Embedded heat-sink gel grids absorb ambient cranial heat, regulating continuous thermal flow so you remain 2–3°C cooler at night without pillow flipping.
                        </p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="w-full h-[200px] bg-gradient-to-tr from-gray-200 to-gray-300 rounded-lg"></div>
                        <h4 className="font-bold text-[16px] text-[var(--text-primary)]">Zero Sag Rebound</h4>
                        <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                          Dynamic 5-second slow recovery foam maintains firm structural integrity for over 60,000 sleep compression cycles without hollow indentation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 1 && (
                <div className="py-10 text-center text-[var(--text-secondary)]">
                  Ratings and reviews content will go here.
                </div>
              )}
              {activeTab === 2 && (
                <div className="py-10 text-center text-[var(--text-secondary)]">
                  Questions and answers content will go here.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 10. Footer */}
        <footer className="bg-[var(--bg-dark)] text-[#ccc] pt-[60px] pb-5 text-[13px]">
          <div className="w-full max-w-[1200px] mx-auto px-[15px]">
            <div className="grid grid-cols-5 gap-[30px] mb-10">
              <div className="flex flex-col">
                <h4 className="text-white text-[14px] font-semibold mb-5 uppercase">Customer Care</h4>
                <ul className="flex flex-col gap-2.5">
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Order Tracking & Delivery</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Return & Refund Policy</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Shopper Protection Guarantee</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Contact Support 24/7</a></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-white text-[14px] font-semibold mb-5 uppercase">About PULSE</h4>
                <ul className="flex flex-col gap-2.5">
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">About Our Marketplace</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Careers & Culture</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Seller Terms & Policies</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Privacy Notice</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Flash Sale Program</a></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-white text-[14px] font-semibold mb-5 uppercase">Payment Methods</h4>
                <p className="mb-2.5">Secure transactions protected by 256-bit encryption</p>
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {['VISA', 'MC', 'PAYPAL', 'AMEX', 'COD'].map(icon => (
                    <div key={icon} className="w-[50px] h-[30px] bg-white rounded flex justify-center items-center text-[#333] font-bold text-[10px]">{icon}</div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <h4 className="text-white text-[14px] font-semibold mb-5 uppercase">Logistics Partners</h4>
                <p className="mb-2.5">Fast, tracked national & cross-border delivery</p>
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {['EXPRESS', 'GLOBAL', 'KING\'S', 'RETURN'].map(icon => (
                    <div key={icon} className="w-[50px] h-[30px] bg-white rounded flex justify-center items-center text-[#333] font-bold text-[10px]">{icon}</div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <h4 className="text-white text-[14px] font-semibold mb-5 uppercase">Mobile App</h4>
                <p>Scan QR code to claim your $15 in-app welcome deal</p>
                <div className="flex gap-[15px] mt-[15px]">
                  <div className="w-[80px] h-[80px] bg-white p-1.5">
                    <svg className="w-full h-full block" viewBox="0 0 100 100"><rect width="100" height="100" fill="#eee"/><path d="M20 20h20v20H20zm40 0h20v20H60zM20 60h20v20H20zm40 20h20v20H60z" fill="#333"/></svg>
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <div className="bg-[#333] text-white px-2.5 py-1.5 rounded text-[11px] text-center border border-[#444] cursor-pointer">App Store</div>
                    <div className="bg-[#333] text-white px-2.5 py-1.5 rounded text-[11px] text-center border border-[#444] cursor-pointer">Google Play</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-[#333] pt-5 flex justify-between items-center">
              <div>© 2026 PULSE Commerce Ltd.</div>
              <div className="flex gap-5">
                <a href="#" className="hover:text-[var(--accent)] transition-colors">Security Advisory</a>
                <a href="#" className="hover:text-[var(--accent)] transition-colors">Intellectual Property Rights</a>
                <a href="#" className="hover:text-[var(--accent)] transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Variant Switcher */}
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
