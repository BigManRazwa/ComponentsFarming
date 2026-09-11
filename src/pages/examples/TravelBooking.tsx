import { useState, useEffect } from 'react';

type Variant = 'explorer' | 'sunset' | 'arctic';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#2563EB': 'explorer',
  '#2563eb': 'explorer',
  '#F59E0B': 'sunset',
  '#f59e0b': 'sunset',
  '#0EA5E9': 'arctic',
  '#0ea5e9': 'arctic',
};

export function TravelBooking({ variant = 'explorer' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customAccent, setCustomAccent] = useState<{ accent: string; hover: string; gradient: string } | null>(null);

  const [activeTab, setActiveTab] = useState<'Flights'|'Hotels'|'Cars'|'Packages'|'Activities'>('Flights');
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');
  const [activeDestination, setActiveDestination] = useState<number | null>(null);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;

      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('explorer');
        setCustomAccent(null);
        return;
      }

      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) {
        setActiveTheme(themeName);
        setCustomAccent(null);
      } else {
        setActiveTheme('explorer');
        setCustomAccent({
          accent: variation.accent,
          hover: variation.accent,
          gradient: `linear-gradient(135deg, #1e3a5f 0%, ${variation.accent} 100%)`
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .travel-wrapper {
          --accent: #2563EB;
          --accent-hover: #1D4ED8;
          --bg-primary: #FFFFFF;
          --bg-secondary: #F8FAFC;
          --bg-card: #FFFFFF;
          --border: #E2E8F0;
          --text-primary: #0F172A;
          --text-secondary: #64748B;
          --hero-gradient: linear-gradient(135deg, #1e3a5f 0%, #2563EB 100%);
          font-family: 'Inter', sans-serif;
        }
        .travel-wrapper[data-theme="sunset"] {
          --accent: #F59E0B;
          --accent-hover: #D97706;
          --bg-primary: #FFFBF0;
          --bg-secondary: #FFF8E7;
          --bg-card: #FFFFFF;
          --border: #F3E8D0;
          --text-primary: #1C1917;
          --text-secondary: #78716C;
          --hero-gradient: linear-gradient(135deg, #92400E 0%, #F59E0B 100%);
        }
        .travel-wrapper[data-theme="arctic"] {
          --accent: #0EA5E9;
          --accent-hover: #0284C7;
          --bg-primary: #F0F9FF;
          --bg-secondary: #E0F2FE;
          --bg-card: #FFFFFF;
          --border: #BAE6FD;
          --text-primary: #0C4A6E;
          --text-secondary: #64748B;
          --hero-gradient: linear-gradient(135deg, #0C4A6E 0%, #0EA5E9 100%);
        }
        ${customAccent ? `
        .travel-wrapper {
          --accent: ${customAccent.accent} !important;
          --accent-hover: ${customAccent.hover} !important;
          --hero-gradient: ${customAccent.gradient} !important;
        }
        ` : ''}
      `}</style>

      <div className="travel-wrapper min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]" data-theme={activeTheme === 'explorer' ? undefined : activeTheme}>
        
        {/* 1. Navigation */}
        <nav className="sticky top-0 bg-[var(--bg-primary)] shadow-sm z-50 border-b border-[var(--border)]">
          <div className="w-full max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer">
              <svg className="w-8 h-8 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-bold text-xl tracking-tight">Globetrotter</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              {(['Flights', 'Hotels', 'Cars', 'Packages', 'Activities'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-5 font-medium text-sm cursor-pointer transition-colors relative ${activeTab === tab ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent)]"></span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6 text-sm font-medium">
              <button className="text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer">USD</button>
              <button className="text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer">Support</button>
              <button className="text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer">My Bookings</button>
              <button className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition-colors cursor-pointer">Sign In</button>
            </div>
          </div>
        </nav>

        {/* 2. Hero Search Section */}
        <section className="bg-[image:var(--hero-gradient)] py-20 text-white relative">
          <div className="w-full max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">Where do you want to go?</h1>
            <p className="text-lg opacity-90 mb-12 drop-shadow-sm">Discover amazing places at exclusive prices</p>
          </div>
          
          <div className="w-full max-w-5xl mx-auto px-4 -mb-12 relative z-10">
            <div className="bg-[var(--bg-card)] rounded-2xl shadow-xl p-6 text-[var(--text-primary)]">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex flex-col gap-1.5 border border-[var(--border)] p-3 rounded-xl focus-within:border-[var(--accent)] transition-colors">
                  <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Destination
                  </label>
                  <input type="text" placeholder="London, NYC, Maldives..." className="outline-none bg-transparent text-sm font-medium w-full" value={destination} onChange={e => setDestination(e.target.value)} />
                </div>
                
                <div className="flex flex-col gap-1.5 border border-[var(--border)] p-3 rounded-xl focus-within:border-[var(--accent)] transition-colors">
                  <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Check-in
                  </label>
                  <input type="date" className="outline-none bg-transparent text-sm font-medium w-full text-[var(--text-primary)]" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                </div>
                
                <div className="flex flex-col gap-1.5 border border-[var(--border)] p-3 rounded-xl focus-within:border-[var(--accent)] transition-colors">
                  <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Check-out
                  </label>
                  <input type="date" className="outline-none bg-transparent text-sm font-medium w-full text-[var(--text-primary)]" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                </div>
                
                <div className="flex flex-col gap-1.5 border border-[var(--border)] p-3 rounded-xl focus-within:border-[var(--accent)] transition-colors">
                  <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    Guests
                  </label>
                  <select className="outline-none bg-transparent text-sm font-medium w-full cursor-pointer" value={guests} onChange={e => setGuests(e.target.value)}>
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button className="w-full bg-[var(--accent)] text-white font-bold text-lg py-3 rounded-xl hover:bg-[var(--accent-hover)] transition-colors shadow-md cursor-pointer">
                Search
              </button>
            </div>
          </div>
        </section>

        {/* 3. Popular Destinations */}
        <section className="bg-[var(--bg-secondary)] py-20 pt-32">
          <div className="w-full max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2">Popular Destinations</h2>
            <p className="text-[var(--text-secondary)] mb-8">Explore our most booked locations</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { name: 'Bali', country: 'Indonesia', price: 599, bg: 'linear-gradient(135deg, #FFB75E, #ED8F03)' },
                { name: 'Tokyo', country: 'Japan', price: 899, bg: 'linear-gradient(135deg, #FF9A9E, #FECFEF)' },
                { name: 'Paris', country: 'France', price: 749, bg: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' },
                { name: 'Santorini', country: 'Greece', price: 999, bg: 'linear-gradient(135deg, #89f7fe, #66a6ff)' }
              ].map((dest, i) => (
                <div 
                  key={dest.name} 
                  className="group rounded-xl overflow-hidden relative h-[300px] cursor-pointer shadow-sm hover:shadow-xl transition-all"
                  onMouseEnter={() => setActiveDestination(i)}
                  onMouseLeave={() => setActiveDestination(null)}
                >
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={{ background: dest.bg }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white flex flex-col items-start">
                    <h3 className="text-2xl font-bold">{dest.name}</h3>
                    <p className="text-sm opacity-90 mb-3">{dest.country}</p>
                    <div className="flex w-full items-center justify-between">
                      <span className="font-semibold">From ${dest.price}+</span>
                      <button className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${activeDestination === i ? 'bg-white text-[var(--text-primary)] border-white' : 'border-white/50 hover:border-white'}`}>
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Trending Deals */}
        <section className="bg-[var(--bg-primary)] py-16">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Trending Deals</h2>
                <p className="text-[var(--text-secondary)]">Limited time offers you can't miss</p>
              </div>
              <button className="text-[var(--accent)] font-semibold hover:underline cursor-pointer">View All</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'London Weekend', sub: '3 nights from $299', badge: 'Save 20%', bg: '#e0c3fc', stars: 4.8, revs: 124 },
                { title: 'New York Getaway', sub: '4 nights from $499', badge: '15% Off', bg: '#c2e9fb', stars: 4.9, revs: 342 },
                { title: 'Phuket Escape', sub: '7 nights from $399', badge: 'Special Offer', bg: '#d4fc79', stars: 4.7, revs: 89 }
              ].map(deal => (
                <div key={deal.title} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="h-48 relative overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{ background: `linear-gradient(135deg, ${deal.bg}, #f8f9fa)` }}></div>
                    <span className="absolute top-4 left-4 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">{deal.badge}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{deal.title}</h3>
                      <div className="flex items-center gap-1 text-sm font-semibold">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        {deal.stars}
                      </div>
                    </div>
                    <p className="text-[var(--text-secondary)] font-medium mb-4">{deal.sub}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[var(--text-secondary)]">({deal.revs} reviews)</span>
                      <button className="text-[var(--accent)] font-semibold hover:underline">View Deal →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Trust Badges */}
        <section className="bg-[var(--bg-secondary)] py-12 border-y border-[var(--border)]">
          <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-[var(--bg-primary)] p-3 rounded-xl shadow-sm text-[var(--accent)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Best Price Guarantee</h4>
                <p className="text-sm text-[var(--text-secondary)]">Find a lower price and we'll match it</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-[var(--bg-primary)] p-3 rounded-xl shadow-sm text-[var(--accent)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">24/7 Global Support</h4>
                <p className="text-sm text-[var(--text-secondary)]">We are here to help anytime, anywhere</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-[var(--bg-primary)] p-3 rounded-xl shadow-sm text-[var(--accent)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Free Cancellation</h4>
                <p className="text-sm text-[var(--text-secondary)]">On most bookings up to 24h before</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Newsletter & Footer */}
        <footer className="bg-slate-900 text-slate-300">
          <div className="border-b border-slate-800">
            <div className="w-full max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Subscribe for exclusive deals</h3>
                <p className="opacity-80">Get the best travel offers delivered to your inbox.</p>
              </div>
              <div className="flex w-full md:w-auto max-w-md gap-2">
                <input type="email" placeholder="Your email address" className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors text-white" />
                <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold px-6 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap">Subscribe</button>
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Cancellation Options</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Safety Information</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Destinations</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Cities</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Airports</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Countries</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Regions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="w-full max-w-7xl mx-auto px-4 py-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm opacity-60">
            <p>© 2026 Globetrotter Travel Inc. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">Instagram</a>
            </div>
          </div>
        </footer>

        {/* Theme Switcher */}
        <div className="fixed bottom-6 right-6 bg-[var(--bg-primary)] p-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex gap-2 z-[1000] border border-[var(--border)]">
          {[
            { id: 'explorer', bg: '#2563EB', label: 'Explorer' },
            { id: 'sunset', bg: '#F59E0B', label: 'Sunset' },
            { id: 'arctic', bg: '#0EA5E9', label: 'Arctic' }
          ].map(theme => (
            <button 
              key={theme.id}
              onClick={() => {
                setActiveTheme(theme.id as Variant);
                setCustomAccent(null);
              }}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform relative group hover:scale-110 ${activeTheme === theme.id && !customAccent ? 'border-[var(--text-primary)] scale-110' : 'border-transparent'}`}
              style={{ background: theme.bg }}
              aria-label={theme.label}
            >
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 font-medium shadow-md">
                {theme.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
