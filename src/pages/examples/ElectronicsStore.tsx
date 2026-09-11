import { useState, useEffect } from 'react';

type Variant = 'cobalt' | 'neon' | 'carbon';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#2563EB': 'cobalt',
  '#2563eb': 'cobalt',
  '#10B981': 'neon',
  '#10b981': 'neon',
  '#F59E0B': 'carbon',
  '#f59e0b': 'carbon',
};

export function ElectronicsStore({ variant = 'cobalt' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [cartCount, setCartCount] = useState(2);
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(12 * 3600 + 45 * 60 + 30);
  const [customAccent, setCustomAccent] = useState<{ accent: string; hover: string } | null>(null);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;

      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('cobalt');
        setCustomAccent(null);
        return;
      }

      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) {
        setActiveTheme(themeName);
        setCustomAccent(null);
      } else {
        setActiveTheme('cobalt');
        setCustomAccent({
          accent: variation.accent,
          hover: variation.accent, // Simplified hover for custom
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev <= 0 ? 12 * 3600 + 45 * 60 + 30 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const t = formatTime(timeLeft);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    { name: 'Laptops', count: 342, icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /> },
    { name: 'Smartphones', count: 528, icon: <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /> },
    { name: 'Headphones', count: 215, icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /> },
    { name: 'Gaming', count: 187, icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /> },
    { name: 'Smartwatches', count: 94, icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { name: 'Cameras', count: 156, icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /> }
  ];

  const products = [
    { id: 1, name: 'Sony WH-1000XM5', brand: 'Sony', price: 278.00, oldPrice: 349.99, rating: 4.8, badge: 'SALE' },
    { id: 2, name: 'iPhone 15 Pro Max', brand: 'Apple', price: 1199.00, oldPrice: null, rating: 4.9, badge: 'NEW' },
    { id: 3, name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', price: 1099.00, oldPrice: 1299.99, rating: 4.7, badge: 'SALE' },
    { id: 4, name: 'iPad Air M2', brand: 'Apple', price: 599.00, oldPrice: null, rating: 4.8, badge: 'NEW' }
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .electronics-wrapper {
          --accent: #2563EB;
          --accent-hover: #1D4ED8;
          --bg-primary: #0A0A12;
          --bg-secondary: #101020;
          --bg-card: #161628;
          --border: #222240;
          --text-primary: #F5F5FF;
          --text-secondary: #8888AA;
          font-family: 'Inter', sans-serif;
        }
        .electronics-wrapper[data-theme="neon"] {
          --accent: #10B981;
          --accent-hover: #059669;
          --bg-primary: #0A0F0C;
          --bg-secondary: #101A14;
          --bg-card: #162220;
          --border: #1E3A30;
          --text-primary: #F5FFF8;
          --text-secondary: #6BAA88;
        }
        .electronics-wrapper[data-theme="carbon"] {
          --accent: #F59E0B;
          --accent-hover: #D97706;
          --bg-primary: #0F0D08;
          --bg-secondary: #161410;
          --bg-card: #1E1C16;
          --border: #2A2820;
          --text-primary: #FFF8F0;
          --text-secondary: #AA9960;
        }
        ${customAccent ? `
        .electronics-wrapper {
          --accent: ${customAccent.accent} !important;
          --accent-hover: ${customAccent.hover} !important;
        }
        ` : ''}
      `}</style>

      <div className="electronics-wrapper min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300" data-theme={activeTheme === 'cobalt' ? undefined : activeTheme}>
        
        {/* 1. Top Bar */}
        <div className="bg-[var(--accent)] text-white text-center text-sm py-1 font-medium transition-colors">
          FREE SHIPPING on all orders over $99 | 30-Day Returns
        </div>

        {/* 2. Nav */}
        <nav className="sticky top-0 bg-[var(--bg-primary)] border-b border-[var(--border)] z-50 transition-colors">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer">
              <svg className="w-8 h-8 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-bold text-xl tracking-tight text-[var(--accent)]">TechVault</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 font-medium text-sm">
              {['Laptops', 'Phones', 'Audio', 'Gaming', 'Wearables', 'Accessories'].map(item => (
                <a key={item} href="#" className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">{item}</a>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <svg className="w-5 h-5 text-[var(--text-primary)] hover:text-[var(--accent)] cursor-pointer transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <svg className="w-5 h-5 text-[var(--text-primary)] hover:text-[var(--accent)] cursor-pointer transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <div className="relative cursor-pointer" onClick={() => setCartCount(c => c + 1)}>
                <svg className="w-5 h-5 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="absolute -top-2 -right-2 bg-[var(--accent)] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>
              </div>
            </div>
          </div>
        </nav>

        {/* 3. Hero */}
        <section className="py-12 bg-[var(--bg-secondary)] transition-colors">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block px-3 py-1 bg-[var(--accent)] text-white text-xs font-bold rounded-full tracking-wider">NEW</span>
              <h1 className="text-5xl font-bold leading-tight">MacBook Pro M4</h1>
              <ul className="space-y-3 text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  M4 Pro chip for unprecedented performance
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Up to 18h battery life
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Stunning Liquid Retina XDR display
                </li>
              </ul>
              <div className="text-2xl font-bold">From $1,999</div>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-lg transition-colors cursor-pointer">
                  Pre-Order Now
                </button>
                <button className="px-8 py-3 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] font-medium rounded-lg transition-colors cursor-pointer">
                  Learn More
                </button>
              </div>
            </div>
            <div className="w-full aspect-video bg-gradient-to-br from-[var(--border)] to-[var(--bg-card)] rounded-2xl border border-[var(--border)] shadow-2xl flex items-center justify-center">
              <svg className="w-32 h-32 text-[var(--accent)] opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
          </div>
        </section>

        {/* 4. Top Categories */}
        <section className="py-12 bg-[var(--bg-primary)] transition-colors">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {categories.map((cat, i) => (
                <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 flex flex-col items-center text-center cursor-pointer hover:border-[var(--accent)] transition-colors group">
                  <div className="w-12 h-12 flex items-center justify-center text-[var(--accent)] mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      {cat.icon}
                    </svg>
                  </div>
                  <div className="font-medium text-sm mb-1">{cat.name}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{cat.count} Products</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Best Sellers */}
        <section className="py-12 bg-[var(--bg-secondary)] transition-colors">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Best Sellers</h2>
              <a href="#" className="text-[var(--accent)] font-medium hover:underline">View All</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-[var(--bg-primary)] to-[var(--border)] relative flex items-center justify-center">
                    <div className="absolute top-3 left-3 bg-[var(--accent)] text-white text-xs font-bold px-2 py-1 rounded">
                      {p.badge}
                    </div>
                    <button 
                      onClick={() => toggleWishlist(p.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[var(--bg-primary)]/50 flex items-center justify-center text-white hover:bg-[var(--accent)] transition-colors cursor-pointer"
                    >
                      <svg className={`w-4 h-4 ${wishlist[p.id] ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </button>
                    <svg className="w-16 h-16 text-[var(--text-secondary)] opacity-30 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-xs text-[var(--text-secondary)] mb-1">{p.brand}</div>
                    <div className="font-bold mb-2 line-clamp-1">{p.name}</div>
                    <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)] mb-4">
                      <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      {p.rating}
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-lg">${p.price.toFixed(2)}</span>
                        {p.oldPrice && <span className="text-xs text-[var(--text-secondary)] line-through">${p.oldPrice.toFixed(2)}</span>}
                      </div>
                      <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Deal of the Day */}
        <section className="py-12 bg-[var(--bg-primary)] transition-colors">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold">Deal of the Day</h2>
              <div className="flex gap-2">
                <span className="bg-[var(--accent)] text-white px-2 py-1 rounded font-mono font-bold">{t.h}h</span>
                <span className="bg-[var(--accent)] text-white px-2 py-1 rounded font-mono font-bold">{t.m}m</span>
                <span className="bg-[var(--accent)] text-white px-2 py-1 rounded font-mono font-bold">{t.s}s</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-card)] rounded-2xl border border-[var(--border)] overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/2 p-12 flex items-center justify-center relative">
                <div className="absolute top-6 left-6 bg-red-500 text-white font-bold px-4 py-2 rounded-full transform -rotate-12 shadow-lg z-10">
                  SAVE $150
                </div>
                <div className="w-64 h-64 bg-[var(--bg-primary)] rounded-full flex items-center justify-center opacity-50 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-[var(--accent)] opacity-20 animate-pulse"></div>
                  <svg className="w-24 h-24 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
              </div>
              <div className="md:w-1/2 p-12 flex flex-col justify-center">
                <div className="text-[var(--text-secondary)] font-medium mb-2">Gaming Consoles</div>
                <h3 className="text-3xl font-bold mb-4">PlayStation 5 Digital Bundle</h3>
                <p className="text-[var(--text-secondary)] mb-6">Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.</p>
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-4xl font-bold text-[var(--accent)]">$399.99</span>
                  <span className="text-xl text-[var(--text-secondary)] line-through">$549.99</span>
                </div>
                <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors cursor-pointer self-start">
                  Grab Deal
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Newsletter + Footer */}
        <section className="bg-[var(--bg-secondary)] border-y border-[var(--border)] py-16 transition-colors">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-4">Subscribe to TechVault</h3>
            <p className="text-[var(--text-secondary)] mb-8">Get the latest updates on new products and upcoming sales.</p>
            <div className="flex max-w-md mx-auto">
              <input type="email" placeholder="Enter your email address" className="flex-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-l-lg px-4 py-3 outline-none focus:border-[var(--accent)] text-[var(--text-primary)]" />
              <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-6 py-3 rounded-r-lg font-medium transition-colors cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        <footer className="bg-[var(--bg-primary)] py-12 transition-colors">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span className="font-bold text-lg text-[var(--accent)]">TechVault</span>
              </div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Your ultimate destination for the latest electronics, gadgets, and tech accessories.</p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Shop</h4>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">MacBooks & PCs</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Smartphones</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Audio & Headphones</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Gaming Consoles</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Legal</h4>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Shipping Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-[var(--border)] text-center text-sm text-[var(--text-secondary)]">
            © 2026 TechVault. All rights reserved.
          </div>
        </footer>

        {/* Floating Theme Switcher */}
        <div className="fixed bottom-6 right-6 bg-[var(--bg-card)] p-3 rounded-full border border-[var(--border)] flex gap-3 shadow-2xl z-50">
          {[
            { id: 'cobalt', color: '#2563EB', title: 'Cobalt Blue' },
            { id: 'neon', color: '#10B981', title: 'Neon Green' },
            { id: 'carbon', color: '#F59E0B', title: 'Carbon Amber' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTheme(t.id as Variant);
                setCustomAccent(null);
              }}
              title={t.title}
              className={`w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-110 ${activeTheme === t.id && !customAccent ? 'ring-2 ring-white ring-offset-2 ring-offset-[var(--bg-card)] scale-110' : ''}`}
              style={{ backgroundColor: t.color }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
