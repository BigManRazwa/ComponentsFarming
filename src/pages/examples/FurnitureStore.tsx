import { useState, useEffect } from 'react';

type Variant = 'walnut' | 'sage' | 'charcoal';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#8B6914': 'walnut',
  '#5F8D4E': 'sage',
  '#374151': 'charcoal',
};

const featuredProducts = [
  { id: 1, name: 'Milano Sofa', description: 'Italian leather, 3-seater', price: 2499 },
  { id: 2, name: 'Oak Dining Table', description: 'Solid oak, seats 6', price: 1899 },
  { id: 3, name: 'Linen Armchair', description: 'Belgian linen, walnut legs', price: 899 },
  { id: 4, name: 'Marble Side Table', description: 'Carrara marble top', price: 649 },
];

const newArrivals = [
  { id: 5, name: 'Velvet Bed Frame', price: 3299 },
  { id: 6, name: 'Walnut Bookshelf', price: 1449 },
  { id: 7, name: 'Ceramic Table Lamp', price: 189 },
];

const rooms = ['Living Room', 'Bedroom', 'Dining Room', 'Home Office'];

const features = ['Handcrafted Quality', 'Sustainable Materials', 'Free White Glove Delivery', 'Lifetime Warranty'];

export function FurnitureStore({ variant = 'walnut' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('walnut');
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

  const addToCart = () => setCartCount(prev => prev + 1);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        .furniture-wrapper {
          --accent: #8B6914;
          --accent-hover: #7A5B0E;
          --bg-primary: #FAF7F2;
          --bg-secondary: #F0EBE3;
          --bg-card: #FFFFFF;
          --border: #E0D5C5;
          --text-primary: #2A2118;
          --text-secondary: #8A7A68;
          --hero-overlay: rgba(42,33,24,0.6);
          font-family: 'Inter', sans-serif;
        }
        .furniture-wrapper[data-theme="sage"] {
          --accent: #5F8D4E;
          --accent-hover: #4A7A3D;
          --bg-primary: #F7FAF5;
          --bg-secondary: #EDF2E8;
          --bg-card: #FFFFFF;
          --border: #C8D8BE;
          --text-primary: #1A2A15;
          --text-secondary: #5A7A4A;
          --hero-overlay: rgba(26,42,21,0.6);
        }
        .furniture-wrapper[data-theme="charcoal"] {
          --accent: #374151;
          --accent-hover: #1F2937;
          --bg-primary: #FAFAFA;
          --bg-secondary: #F3F4F6;
          --bg-card: #FFFFFF;
          --border: #D1D5DB;
          --text-primary: #111827;
          --text-secondary: #6B7280;
          --hero-overlay: rgba(17,24,39,0.6);
        }
        .font-heading {
          font-family: 'Playfair Display', serif;
        }
      `}</style>

      <div className="furniture-wrapper min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-white" data-theme={activeTheme === 'walnut' ? undefined : activeTheme}>
        
        {/* Top Bar */}
        <div className="bg-[var(--text-primary)] text-white text-xs py-2 text-center">
          FREE SHIPPING on orders over $499 | Easy 60-Day Returns
        </div>

        {/* Nav */}
        <nav className="sticky top-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[var(--accent)] cursor-pointer">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-3-2.5L12 21l-4-2.5L5 21V5z" />
              </svg>
              <span className="font-heading text-2xl tracking-wide font-bold">HAVEN</span>
            </div>
            <div className="hidden md:flex gap-8 text-sm font-medium">
              <span className="cursor-pointer hover:text-[var(--accent)] transition-colors">Living Room</span>
              <span className="cursor-pointer hover:text-[var(--accent)] transition-colors">Bedroom</span>
              <span className="cursor-pointer hover:text-[var(--accent)] transition-colors">Dining</span>
              <span className="cursor-pointer hover:text-[var(--accent)] transition-colors">Office</span>
              <span className="cursor-pointer hover:text-[var(--accent)] transition-colors">Outdoor</span>
            </div>
            <div className="flex gap-6 items-center">
              <svg className="w-6 h-6 cursor-pointer hover:text-[var(--accent)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <svg className="w-6 h-6 cursor-pointer hover:text-[var(--accent)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <div className="relative cursor-pointer group">
                <svg className="w-6 h-6 group-hover:text-[var(--accent)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[var(--accent)] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{cartCount}</span>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="aspect-[21/9] relative overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)]">
          <div className="absolute inset-0 bg-[var(--hero-overlay)]"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white z-10">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl mb-4 font-bold drop-shadow-md">Design Your Perfect Space</h1>
            <p className="text-lg md:text-xl mb-8 drop-shadow max-w-2xl text-gray-100">Handcrafted furniture for modern living</p>
            <div className="flex gap-4 flex-col sm:flex-row">
              <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-8 py-3 text-sm font-medium transition-colors cursor-pointer">
                Explore Collection
              </button>
              <button className="border-2 border-white hover:bg-white hover:text-[var(--text-primary)] text-white px-8 py-3 text-sm font-medium transition-colors cursor-pointer">
                Free Design Consultation
              </button>
            </div>
          </div>
        </section>

        {/* Shop by Room */}
        <section className="py-16 bg-[var(--bg-primary)]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-heading text-3xl text-center mb-10 font-bold">Shop by Room</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rooms.map((room) => (
                <div key={room} className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-[var(--bg-secondary)] border border-[var(--border)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--bg-secondary)] opacity-50 group-hover:scale-105 transition-transform duration-500"></div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-2xl text-white font-bold tracking-wide drop-shadow-lg">{room}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
              <h2 className="font-heading text-3xl font-bold">Featured Pieces</h2>
              <span className="text-[var(--accent)] text-sm font-medium hover:text-[var(--accent-hover)] transition-colors cursor-pointer">View All &rarr;</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((p, i) => (
                <div key={p.id} className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden group">
                  <div className={`h-56 relative overflow-hidden bg-gradient-to-tr ${i % 2 === 0 ? 'from-[var(--bg-secondary)] to-[var(--bg-primary)]' : 'from-[var(--bg-primary)] to-[var(--bg-secondary)]'}`}>
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <button onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }} className="absolute top-3 right-3 z-20 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors bg-[var(--bg-card)] p-2 rounded-full shadow-sm">
                       {wishlist.has(p.id) ? (
                         <svg className="w-5 h-5 fill-[var(--accent)] text-[var(--accent)]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} stroke="currentColor" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                       ) : (
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} stroke="currentColor" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                       )}
                    </button>
                  </div>
                  <div className="p-5 flex flex-col h-full">
                    <h3 className="font-heading font-bold text-lg mb-1">{p.name}</h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-4">{p.description}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-medium">${p.price.toLocaleString()}</span>
                      <button onClick={(e) => { e.stopPropagation(); addToCart(); }} className="bg-[var(--bg-primary)] hover:bg-[var(--accent)] text-[var(--text-primary)] hover:text-white px-4 py-2 text-sm font-medium rounded transition-colors border border-[var(--border)] hover:border-[var(--accent)] cursor-pointer">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Banner */}
        <section className="py-16 bg-[var(--bg-primary)] border-y border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {features.map((feature, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--accent)] border border-[var(--border)]">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-heading font-bold text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16 bg-[var(--bg-secondary)]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center gap-1 text-[var(--accent)] mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <h3 className="font-heading text-2xl md:text-3xl italic leading-relaxed mb-8">
              "The Milano Sofa completely transformed our living room. The craftsmanship is impeccable, and the leather quality exceeds all expectations. It's truly a piece we'll cherish for a lifetime."
            </h3>
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg mb-1">Sarah Jenkins</span>
              <span className="text-[var(--text-secondary)] text-sm flex items-center gap-1">
                <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Verified Buyer
              </span>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16 bg-[var(--bg-primary)]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-heading text-3xl font-bold mb-10 text-center">New Arrivals</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {newArrivals.map((p) => (
                <div key={p.id} className="group cursor-pointer">
                  <div className="aspect-square bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] overflow-hidden relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg-card)] to-transparent opacity-50"></div>
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button onClick={(e) => { e.stopPropagation(); addToCart(); }} className="bg-[var(--bg-card)] text-[var(--text-primary)] px-6 py-2 rounded-full font-medium shadow-lg hover:bg-[var(--accent)] hover:text-white transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <h4 className="font-heading font-bold text-lg">{p.name}</h4>
                    <span className="font-medium text-[var(--text-secondary)]">${p.price.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter + Footer */}
        <footer className="bg-[var(--bg-card)] border-t border-[var(--border)] pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 pb-12 border-b border-[var(--border)]">
              <div className="max-w-md text-center md:text-left">
                <h3 className="font-heading text-2xl font-bold mb-2">Join the HAVEN family</h3>
                <p className="text-[var(--text-secondary)]">Sign up for our newsletter to receive design tips, new arrival updates, and exclusive offers.</p>
              </div>
              <div className="flex w-full md:w-auto gap-2">
                <input type="email" placeholder="Email address" className="bg-[var(--bg-primary)] border border-[var(--border)] px-4 py-3 rounded outline-none focus:border-[var(--accent)] transition-colors w-full md:w-80" />
                <button className="bg-[var(--accent)] text-white px-6 py-3 rounded font-medium hover:bg-[var(--accent-hover)] transition-colors cursor-pointer">Subscribe</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm mb-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[var(--accent)] mb-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-3-2.5L12 21l-4-2.5L5 21V5z" />
                  </svg>
                  <span className="font-heading text-xl font-bold text-[var(--text-primary)]">HAVEN</span>
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed">Crafting beautiful spaces with thoughtfully designed, sustainably sourced furniture for the modern home.</p>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wider text-xs">Shop</h4>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Living Room</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Bedroom</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Dining Room</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Home Office</a>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wider text-xs">Customer Service</h4>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Contact Us</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Shipping & Returns</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Track Order</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">FAQ</a>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wider text-xs">About</h4>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Our Story</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Sustainability</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Careers</a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Press</a>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[var(--border)] text-xs text-[var(--text-secondary)] gap-4">
              <p>&copy; 2026 HAVEN Home Store. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[var(--accent)] transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Variant Switcher */}
        <div className="fixed bottom-6 right-6 bg-[var(--bg-card)] p-3 rounded-full shadow-lg flex gap-3 z-[100] border border-[var(--border)]">
          {[
            { id: 'walnut', bg: '#8B6914', label: 'Walnut' },
            { id: 'sage', bg: '#5F8D4E', label: 'Sage' },
            { id: 'charcoal', bg: '#374151', label: 'Charcoal' }
          ].map(theme => (
            <button 
              key={theme.id}
              onClick={() => setActiveTheme(theme.id as Variant)}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform relative group hover:scale-110 ${activeTheme === theme.id ? 'border-[var(--text-primary)] scale-110' : 'border-transparent'}`}
              style={{ background: theme.bg }}
            >
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border)] text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 font-medium">
                {theme.label}
              </span>
            </button>
          ))}
        </div>

      </div>
    </>
  );
}
