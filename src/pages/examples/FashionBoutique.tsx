import { useState, useEffect } from 'react';

type Variant = 'noir' | 'blush' | 'ivory';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#C9A96E': 'noir',
  '#D4748A': 'blush',
  '#8B7355': 'ivory',
};

const newArrivals = [
  { id: 1, name: 'Silk Wrap Dress', price: 450, brand: 'ÉLEVE' },
  { id: 2, name: 'Cashmere Blend Coat', price: 980, brand: 'ÉLEVE' },
  { id: 3, name: 'Leather Chelsea Boots', price: 360, brand: 'ÉLEVE' },
  { id: 4, name: 'Structured Tote Bag', price: 520, brand: 'ÉLEVE' },
];

const bestsellers = [
  { id: 5, name: 'Tailored Blazer', price: 680, brand: 'ÉLEVE' },
  { id: 6, name: 'Silk Scarf', price: 180, brand: 'ÉLEVE' },
  { id: 7, name: 'Wool Trousers', price: 320, brand: 'ÉLEVE' },
  { id: 8, name: 'Leather Belt', price: 150, brand: 'ÉLEVE' },
];

export function FashionBoutique({ variant = 'noir' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [bagCount, setBagCount] = useState(0);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('noir');
        return;
      }
      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) {
        setActiveTheme(themeName);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addToBag = () => setBagCount(prev => prev + 1);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      <style>{`
        .fashion-wrapper {
          --accent: #C9A96E;
          --accent-hover: #B8965A;
          --bg-primary: #0A0A0A;
          --bg-secondary: #141414;
          --bg-card: #1A1A1A;
          --border: #2A2A2A;
          --text-primary: #F5F5F5;
          --text-secondary: #888888;
          font-family: 'Inter', sans-serif;
        }
        .fashion-wrapper[data-theme="blush"] {
          --accent: #D4748A;
          --accent-hover: #C4607A;
          --bg-primary: #0F0A0C;
          --bg-secondary: #1A1216;
          --bg-card: #201820;
          --border: #3A2530;
          --text-primary: #F5F0F2;
          --text-secondary: #AA8890;
        }
        .fashion-wrapper[data-theme="ivory"] {
          --accent: #8B7355;
          --accent-hover: #7A6248;
          --bg-primary: #FAF8F5;
          --bg-secondary: #F0EDE8;
          --bg-card: #FFFFFF;
          --border: #E0D8D0;
          --text-primary: #2A2420;
          --text-secondary: #8A7A68;
        }
        .font-heading {
          font-family: 'Cormorant Garamond', serif;
        }
      `}</style>

      <div className="fashion-wrapper min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-white" data-theme={activeTheme === 'noir' ? undefined : activeTheme}>
        
        {/* Nav */}
        <nav className="sticky top-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur border-b border-[var(--border)] py-4">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="font-heading text-2xl tracking-[0.4em] uppercase text-[var(--accent)] cursor-pointer">
              ÉLEVE
            </div>
            <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase">
              <span className="cursor-pointer hover:text-[var(--accent)] transition-colors">Women</span>
              <span className="cursor-pointer hover:text-[var(--accent)] transition-colors">Men</span>
              <span className="cursor-pointer hover:text-[var(--accent)] transition-colors">Accessories</span>
              <span className="cursor-pointer text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors">Sale</span>
            </div>
            <div className="flex gap-6 items-center">
              <svg className="w-5 h-5 cursor-pointer hover:text-[var(--accent)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
              <svg className="w-5 h-5 cursor-pointer hover:text-[var(--accent)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
              <svg className="w-5 h-5 cursor-pointer hover:text-[var(--accent)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
              <div className="relative cursor-pointer group">
                <svg className="w-5 h-5 group-hover:text-[var(--accent)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                {bagCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[var(--accent)] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-medium">{bagCount}</span>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="aspect-[21/9] relative bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-card)] overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
            <h1 className="font-heading text-5xl md:text-7xl tracking-wide mb-4 drop-shadow-lg">AUTUMN COLLECTION 2024</h1>
            <p className="font-heading italic text-xl md:text-2xl mb-8 text-gray-200">Discover timeless elegance</p>
            <button className="border border-[var(--accent)] hover:bg-[var(--accent)] text-white uppercase tracking-widest px-10 py-3 text-sm transition-all duration-300">
              SHOP NOW
            </button>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-heading text-3xl tracking-[0.3em] uppercase text-center mb-12">SHOP BY CATEGORY</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {['Dresses', 'Outerwear', 'Footwear', 'Accessories'].map((cat) => (
                <div key={cat} className="group relative aspect-[3/4] cursor-pointer overflow-hidden bg-[var(--bg-card)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] opacity-50 group-hover:scale-105 transition-transform duration-700"></div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-2xl tracking-widest uppercase text-white drop-shadow-md">{cat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16 bg-[var(--bg-primary)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-12 border-b border-[var(--border)] pb-4">
              <h2 className="font-heading text-3xl tracking-widest uppercase">NEW ARRIVALS</h2>
              <span className="text-[var(--accent)] uppercase tracking-wider text-sm cursor-pointer hover:text-[var(--accent-hover)] transition-colors">View All</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {newArrivals.map((p) => (
                <div key={p.id} className="group cursor-pointer">
                  <div className="aspect-[3/4] relative overflow-hidden bg-[var(--bg-card)] border border-[var(--border)]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg-secondary)] to-transparent opacity-30"></div>
                    
                    {/* hover overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-10">
                      <button className="bg-white/90 text-black px-6 py-2 uppercase text-xs tracking-wider hover:bg-white transition-colors w-3/4">Quick View</button>
                      <button onClick={(e) => { e.stopPropagation(); addToBag(); }} className="bg-[var(--accent)] text-white px-6 py-2 uppercase text-xs tracking-wider hover:bg-[var(--accent-hover)] transition-colors w-3/4">Add to Bag</button>
                    </div>
                    
                    {/* Wishlist */}
                    <button onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }} className="absolute top-4 right-4 z-20 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                       {wishlist.has(p.id) ? (
                         <svg className="w-6 h-6 fill-[var(--accent)] text-[var(--accent)]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} stroke="currentColor" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                       ) : (
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} stroke="currentColor" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                       )}
                    </button>
                  </div>
                  <div className="mt-4 flex flex-col gap-1 items-center">
                    <span className="text-xs text-[var(--text-secondary)] tracking-widest uppercase">{p.brand}</span>
                    <span className="font-medium text-[var(--text-primary)]">{p.name}</span>
                    <span className="text-[var(--text-secondary)] mt-1">${p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Banner */}
        <section className="my-8 max-w-7xl mx-auto px-6">
          <div className="aspect-[3/1] relative bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-primary)] border border-[var(--border)] overflow-hidden flex flex-col items-center justify-center text-center p-8 group cursor-pointer">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700"></div>
            <h2 className="font-heading text-4xl tracking-widest uppercase mb-4 relative z-10 text-white">FEATURED COLLECTION</h2>
            <span className="text-[var(--accent)] border-b border-[var(--accent)] pb-1 uppercase tracking-widest text-sm relative z-10">Explore Lookbook</span>
          </div>
        </section>

        {/* Bestsellers */}
        <section className="py-16 bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-12 border-b border-[var(--border)] pb-4">
              <h2 className="font-heading text-3xl tracking-widest uppercase">BESTSELLERS</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestsellers.map((p) => (
                <div key={p.id} className="group cursor-pointer">
                  <div className="aspect-[3/4] relative overflow-hidden bg-[var(--bg-card)] border border-[var(--border)]">
                    <div className="absolute inset-0 bg-gradient-to-bl from-[var(--bg-primary)] to-transparent opacity-30"></div>
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-10">
                      <button className="bg-white/90 text-black px-6 py-2 uppercase text-xs tracking-wider hover:bg-white transition-colors w-3/4">Quick View</button>
                      <button onClick={(e) => { e.stopPropagation(); addToBag(); }} className="bg-[var(--accent)] text-white px-6 py-2 uppercase text-xs tracking-wider hover:bg-[var(--accent-hover)] transition-colors w-3/4">Add to Bag</button>
                    </div>
                    
                    <button onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }} className="absolute top-4 right-4 z-20 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                       {wishlist.has(p.id) ? (
                         <svg className="w-6 h-6 fill-[var(--accent)] text-[var(--accent)]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} stroke="currentColor" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                       ) : (
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} stroke="currentColor" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                       )}
                    </button>
                  </div>
                  <div className="mt-4 flex flex-col gap-1 items-center">
                    <span className="text-xs text-[var(--text-secondary)] tracking-widest uppercase">{p.brand}</span>
                    <span className="font-medium text-[var(--text-primary)]">{p.name}</span>
                    <span className="text-[var(--text-secondary)] mt-1">${p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[var(--bg-primary)] border-t border-[var(--border)] pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16">
              <h3 className="font-heading text-2xl tracking-widest uppercase mb-4">JOIN OUR WORLD</h3>
              <p className="text-[var(--text-secondary)] mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
              <div className="flex w-full max-w-md border-b border-[var(--border)] focus-within:border-[var(--accent)] transition-colors">
                <input type="email" placeholder="Enter your email address" className="bg-transparent border-none outline-none py-3 flex-1 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]" />
                <button className="text-[var(--accent)] font-medium text-sm tracking-widest uppercase px-4 hover:text-[var(--accent-hover)] transition-colors">SUBSCRIBE</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm mb-12">
              <div className="flex flex-col gap-4">
                <div className="font-heading text-xl tracking-[0.2em] uppercase text-[var(--accent)] mb-2">ÉLEVE</div>
                <p className="text-[var(--text-secondary)] leading-relaxed">Redefining modern luxury through timeless design, exceptional quality, and sustainable practices.</p>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="tracking-widest uppercase mb-2">Shop</h4>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">New Arrivals</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Bestsellers</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Women's Collection</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Men's Collection</a>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="tracking-widest uppercase mb-2">Customer Care</h4>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Contact Us</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Shipping & Returns</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Size Guide</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">FAQ</a>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="tracking-widest uppercase mb-2">Follow Us</h4>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Instagram</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Pinterest</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Facebook</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Twitter</a>
              </div>
            </div>
            
            <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[var(--text-secondary)]">
              <div>&copy; 2026 ÉLEVE BOUTIQUE. ALL RIGHTS RESERVED.</div>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[var(--accent)] transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Variant Switcher */}
        <div className="fixed bottom-6 right-6 bg-[var(--bg-card)] p-3 rounded-full shadow-2xl flex gap-3 z-[100] border border-[var(--border)]">
          {[
            { id: 'noir', bg: '#C9A96E', label: 'Noir Gold' },
            { id: 'blush', bg: '#D4748A', label: 'Blush Pink' },
            { id: 'ivory', bg: '#8B7355', label: 'Ivory Brown' }
          ].map(theme => (
            <button 
              key={theme.id}
              onClick={() => setActiveTheme(theme.id as Variant)}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform relative group hover:scale-110 ${activeTheme === theme.id ? 'border-[var(--text-primary)] scale-110' : 'border-transparent'}`}
              style={{ background: theme.bg }}
            >
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border)] text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity group-hover:opacity-100">
                {theme.label}
              </span>
            </button>
          ))}
        </div>

      </div>
    </>
  );
}
