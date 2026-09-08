import { useState, useEffect } from 'react';

type Variant = 'pulse' | 'ocean' | 'emerald';

interface Product {
  t: string;
  p: number;
  o: number;
  r: number;
  s: string;
  m: boolean;
  f: boolean;
  sp?: boolean;
}

interface FSProduct {
  price: number;
  orig: number;
  sold: number;
}

const fsData: FSProduct[] = [
  { price: 34.90, orig: 69.80, sold: 85 },
  { price: 18.20, orig: 30.00, sold: 92 },
  { price: 46.50, orig: 100.00, sold: 45 },
  { price: 9.99, orig: 25.00, sold: 98 },
  { price: 29.90, orig: 59.90, sold: 65 },
  { price: 15.40, orig: 22.00, sold: 78 }
];

const initialProductsData: Product[] = [
  { t: "Premium Noise Cancelling Wireless Headphones - 40h Battery", p: 8.00, o: 15.00, r: 4.8, s: "2.4k", m: true, f: true },
  { t: "Advanced Snail Mucin Power Essence 100ml", p: 14.20, o: 22.00, r: 4.9, s: "15.5k", m: true, f: false },
  { t: "Men's Casual Short Sleeve Linen Shirt", p: 11.50, o: 18.00, r: 4.5, s: "1.2k", m: false, f: true },
  { t: "Ergonomic Memory Foam Orthopedic Pillow", p: 19.90, o: 35.00, r: 4.7, s: "800", m: false, f: true, sp: true },
  { t: "Smart Watch Fitness Tracker with Heart Rate Monitor", p: 16.80, o: 29.90, r: 4.6, s: "4.5k", m: true, f: true },
  { t: "Organic Vitamin C Serum for Face with Hyaluronic Acid", p: 13.90, o: 25.00, r: 4.8, s: "8.9k", m: true, f: false },
  { t: "Oversized Vintage Graphic T-Shirt Y2K Style", p: 27.50, o: 45.00, r: 4.4, s: "3.1k", m: false, f: false },
  { t: "Minimalist Ceramic Coffee Mug Set of 4", p: 15.90, o: 24.00, r: 4.9, s: "600", m: true, f: true },
  { t: "Fast Charging 10000mAh Power Bank Portable Charger", p: 12.40, o: 20.00, r: 4.7, s: "12k", m: false, f: true },
  { t: "Matte Liquid Lipstick Long Lasting Waterproof", p: 14.50, o: 19.00, r: 4.5, s: "5.5k", m: true, f: true, sp: true },
  { t: "Retro Classic Round Sunglasses Men Women", p: 17.90, o: 30.00, r: 4.6, s: "2.8k", m: false, f: true },
  { t: "Non-Stick Frying Pan Scratch Resistant", p: 4.90, o: 12.00, r: 4.3, s: "1.5k", m: false, f: false }
];

const categoryIcons = [
  { icon: '🖥️', name: 'Electronics' },
  { icon: '👕', name: 'Fashion' },
  { icon: '🛋️', name: 'Home & Living' },
  { icon: '💄', name: 'Beauty Care' },
  { icon: '🛒', name: 'Supermarket' },
  { icon: '🏋️', name: 'Sports' },
  { icon: '🧸', name: 'Baby & Toys' },
  { icon: '🚗', name: 'Automotive' }
];

const fsColors = ['#fecaca', '#bfdbfe', '#bbf7d0', '#fef08a', '#e9d5ff', '#fed7aa'];
const pColors = ['#fecaca', '#bfdbfe', '#bbf7d0', '#fef08a', '#e9d5ff', '#fed7aa', '#d9f99d', '#bae6fd'];

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

export function MarketplaceFeed({ variant = 'pulse' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [heroSeconds, setHeroSeconds] = useState(21 * 3600 + 14 * 60 + 6);
  const [fsSeconds, setFsSeconds] = useState(7 * 3600 + 14 * 60 + 29);
  const [activeTab, setActiveTab] = useState('all');
  const [productCount, setProductCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isGridFading, setIsGridFading] = useState(false);
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
    const heroTimer = setInterval(() => setHeroSeconds(prev => (prev <= 0 ? 21 * 3600 + 14 * 60 + 6 : prev - 1)), 1000);
    const fsTimer = setInterval(() => setFsSeconds(prev => (prev <= 0 ? 7 * 3600 + 14 * 60 + 29 : prev - 1)), 1000);
    return () => {
      clearInterval(heroTimer);
      clearInterval(fsTimer);
    };
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsGridFading(true);
    setTimeout(() => {
      setIsGridFading(false);
      setProductCount(10);
    }, 300);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setProductCount(20);
      setIsLoadingMore(false);
    }, 800);
  };

  const heroTime = formatTime(heroSeconds);
  const fsTime = formatTime(fsSeconds);

  const displayedProducts = Array.from({ length: productCount }).map((_, i) => initialProductsData[i % initialProductsData.length]);

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
                {['Wireless Earbuds', 'Korean Skincare', 'Cat Tree', 'Sneakers 50% Off', 'Mechanical Keyboard'].map(kw => (
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

        <div className="w-full max-w-[1200px] mx-auto px-[15px]">
          {/* 4. Hero Section */}
          <section className="py-5">
            <div className="grid grid-cols-[200px_1fr_280px] gap-4">
              <div className="bg-[var(--bg-primary)] rounded-lg p-4 flex flex-col gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                {['🏠 Marketplace Home', '👤 My Account', '🛒 My Cart', '❤️ Saved Items', '🛍️ Purchase History', '🎫 My Vouchers'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[14px] text-[var(--text-primary)] p-2 rounded-md transition-colors cursor-pointer hover:bg-[var(--bg-secondary)] hover:text-[var(--accent)]">
                    {item}
                  </div>
                ))}
                <hr className="border-none border-t border-[var(--border-color)] my-1" />
                <div className="flex items-center gap-2.5 text-[14px] text-[var(--text-primary)] p-2 rounded-md transition-colors cursor-pointer hover:bg-[var(--bg-secondary)] hover:text-[var(--accent)]">📱 Electronics</div>
                <div className="flex items-center gap-2.5 text-[14px] text-[var(--text-primary)] p-2 rounded-md transition-colors cursor-pointer hover:bg-[var(--bg-secondary)] hover:text-[var(--accent)]">👗 Fashion</div>
              </div>
              
              <div className="bg-[image:var(--bg-gradient)] rounded-lg p-10 text-white flex flex-col justify-center relative overflow-hidden">
                <div className="inline-block bg-white/20 px-3 py-1.5 rounded-full text-[14px] font-semibold mb-[15px] border border-white/40 self-start">
                  Min Spend $0 Free Shipping
                </div>
                <p className="font-semibold uppercase mb-[5px]">GET READY TO SPLURGE! AMAZING DEALS ON TOP BRANDS</p>
                <h1 className="text-[42px] leading-[1.1] mb-2.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] font-bold">SUPER PAYDAY</h1>
                <p className="text-[18px] opacity-90 mb-5">
                  UP TO 80% OFF EVERYTHING<br/>
                  <span className="text-[14px] bg-white text-[var(--accent)] px-1.5 py-0.5 rounded font-bold mt-1 inline-block">Extra 15% Cash Return Coins</span>
                </p>
                <button className="bg-white text-[var(--accent)] px-[30px] py-[12px] rounded font-bold text-[16px] self-start uppercase transition-transform hover:-translate-y-[2px] shadow-[0_4px_10px_rgba(0,0,0,0.15)] cursor-pointer">
                  SHOP NOW
                </button>
                
                <div className="absolute bottom-5 right-5 bg-black/40 px-[15px] py-[10px] rounded-md backdrop-blur-[4px]">
                  <div className="text-[12px] mb-1 opacity-90">Ends in</div>
                  <div className="flex gap-1 font-bold font-mono text-[18px]">
                    <span>{heroTime.h}</span>:<span>{heroTime.m}</span>:<span>{heroTime.s}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="bg-[var(--bg-primary)] rounded-lg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between flex-1">
                  <div>
                    <div className="font-bold text-[14px] mb-2 text-[var(--text-primary)]">💰 DAILY COINS CENTER</div>
                    <div className="text-[13px] text-[var(--text-secondary)] mb-3 leading-[1.4]">Check-in for +150 Coins. Redeem direct bill discounts at final checkout.</div>
                  </div>
                  <button className="bg-[var(--accent)] text-white p-2 rounded font-semibold text-[13px] w-full transition-colors hover:bg-[var(--accent-hover)] cursor-pointer">Claim Streak Day 4</button>
                </div>
                <div className="bg-[var(--bg-primary)] rounded-lg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between flex-1">
                  <div>
                    <div className="font-bold text-[14px] mb-2 text-[var(--text-primary)]">🎫 PAYDAY VOUCHERS</div>
                    <div className="text-[20px] font-bold text-[var(--accent)] mb-1">$12 OFF <span className="text-[12px] text-[var(--text-secondary)] font-normal">Min. $60</span></div>
                    <div className="text-[13px] text-[var(--text-secondary)] mb-3 leading-[1.4]">Limited 300 vouchers released per hour.</div>
                  </div>
                  <button className="bg-[var(--accent)] text-white p-2 rounded font-semibold text-[13px] w-full transition-colors hover:bg-[var(--accent-hover)] cursor-pointer">Claim instantly</button>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Category Icons Row */}
          <section className="bg-[var(--bg-primary)] py-6 mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="grid grid-cols-8 gap-2.5">
              {categoryIcons.map((cat, i) => (
                <div key={i} className="flex flex-col items-center gap-3 cursor-pointer transition-transform hover:-translate-y-[3px] group">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-[24px] text-[var(--accent)] transition-colors group-hover:bg-[var(--accent-light)] group-hover:text-[var(--accent)]">
                    {cat.icon}
                  </div>
                  <div className="text-[13px] text-center font-medium transition-colors group-hover:text-[var(--accent)]">{cat.name}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Flash Sale Section */}
          <section className="bg-[var(--bg-primary)] p-5 rounded-lg mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-5 border-b border-[var(--border-color)] pb-[15px]">
              <div className="flex items-center gap-[15px]">
                <div className="text-[20px] font-bold text-[var(--accent)] flex items-center gap-1.5">🔥 FLASH SALE</div>
                <div className="flex gap-1">
                  <div className="bg-[var(--bg-dark)] text-white px-1.5 py-1 rounded font-bold font-mono text-[14px]">{fsTime.h}</div>
                  <div className="bg-[var(--bg-dark)] text-white px-1.5 py-1 rounded font-bold font-mono text-[14px]">{fsTime.m}</div>
                  <div className="bg-[var(--bg-dark)] text-white px-1.5 py-1 rounded font-bold font-mono text-[14px]">{fsTime.s}</div>
                </div>
                <div className="text-[var(--text-secondary)] text-[14px] border-l border-[var(--border-color)] pl-[15px]">Current Slot 12:00 - 16:00</div>
              </div>
              <a href="#" className="text-[var(--accent)] font-medium text-[14px] hover:underline">See All Flash Deals {'>'}</a>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2.5 scrollbar-hide">
              {fsData.map((item, i) => (
                <div key={i} className="min-w-[180px] bg-white border border-[var(--border-color)] rounded-lg overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] cursor-pointer">
                  <div className="w-full h-[180px] relative" style={{ background: fsColors[i % fsColors.length] }}>
                    <div className="absolute top-0 right-0 bg-[var(--accent)] text-white text-[12px] font-bold px-2 py-1 rounded-bl-lg">
                      -{Math.round((1 - item.price/item.orig)*100)}%
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-[var(--text-price)] text-[18px] font-bold flex items-baseline gap-1.5">
                      <span className="text-[14px]">$</span>{item.price.toFixed(2)}
                    </div>
                    <div className="text-[12px] text-[var(--text-secondary)] line-through">${item.orig.toFixed(2)}</div>
                    <div className="mt-2.5 bg-[var(--accent-light)] h-4 rounded-full relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-[var(--accent)] rounded-full" style={{ width: `${item.sold}%` }}></div>
                      <div className="absolute w-full text-center text-[10px] text-white leading-4 font-bold z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{item.sold}% SOLD</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Daily Discover Section */}
          <section className="mb-6">
            <div className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] sticky top-[70px] z-[90]">
              <div className="flex items-center justify-between">
                <div className="flex overflow-x-auto scrollbar-hide">
                  {[
                    { id: 'all', label: 'DAILY DISCOVER' },
                    { id: 'electronics', label: 'Electronics Deals' },
                    { id: 'beauty', label: 'Beauty & Health' },
                    { id: 'fashion', label: 'Fashion Trends' },
                    { id: 'home', label: 'Home Essentials' }
                  ].map(tab => (
                    <div 
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`px-6 py-4 text-[15px] font-semibold border-b-[3px] transition-all whitespace-nowrap cursor-pointer ${activeTab === tab.id ? 'text-[var(--accent)] border-[var(--accent)]' : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--accent)]'}`}
                    >
                      {tab.label}
                    </div>
                  ))}
                </div>
                <div className="text-[13px] font-medium text-[#00BFA5] px-[15px]">🛡️ 100% Authentic Guarantee</div>
              </div>
            </div>
            
            <div className={`grid grid-cols-5 gap-3 mt-4 transition-opacity duration-300 ${isGridFading ? 'opacity-50' : 'opacity-100'}`}>
              {displayedProducts.map((item, i) => (
                <div key={i} className="bg-[var(--bg-primary)] rounded overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:border-[var(--accent)] cursor-pointer flex flex-col border border-transparent">
                  <div className="w-full pt-[100%] relative bg-[var(--bg-secondary)]" style={{ background: pColors[i % pColors.length] }}>
                    <div className="absolute bottom-0 left-0 flex flex-col gap-1 p-2 w-full">
                      {item.m && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm text-white w-max bg-[#D0011B]">MALL</span>}
                      {item.sp && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm text-white w-max bg-[#5a6268] opacity-90">SPONSORED</span>}
                      {item.f && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm text-white w-max bg-[#00BFA5]">Free Shipping</span>}
                    </div>
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <div className="text-[13px] leading-[1.4] h-[36px] overflow-hidden line-clamp-2 mb-2">{item.t}</div>
                    <div className="flex items-baseline gap-1.5 mt-auto">
                      <div className="text-[var(--text-price)] text-[18px] font-semibold"><span className="text-[12px]">$</span>{item.p.toFixed(2)}</div>
                      <div className="text-[12px] text-[var(--text-secondary)] line-through">${item.o.toFixed(2)}</div>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-[12px] text-[var(--text-secondary)]">
                      <div className="flex items-center gap-0.5 text-[var(--star-color)]">★ {item.r}</div>
                      <div>{item.s} sold</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 8. Load More Button */}
            {productCount < 20 && (
              <div className="flex justify-center my-[30px] mb-[50px]">
                <button 
                  onClick={handleLoadMore}
                  className="bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] px-10 py-3.5 text-[14px] font-medium rounded transition-all shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] cursor-pointer"
                >
                  {isLoadingMore ? 'LOADING...' : 'LOAD MORE RECOMMENDATIONS'}
                </button>
              </div>
            )}
          </section>
        </div>

        {/* 9. Footer */}
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
