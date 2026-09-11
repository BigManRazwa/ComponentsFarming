import { useState, useEffect } from 'react';

type Variant = 'navy' | 'forest' | 'slate';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#1E3A5F': 'navy',
  '#1e3a5f': 'navy',
  '#2D5016': 'forest',
  '#2d5016': 'forest',
  '#475569': 'slate',
};

export function RealEstateListing({ variant = 'navy' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customAccent, setCustomAccent] = useState<{ accent: string; hover: string; gradient: string } | null>(null);

  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('Any');
  const [priceRange, setPriceRange] = useState('Any');
  const [bedrooms, setBedrooms] = useState('Any');
  
  const [savedProperties, setSavedProperties] = useState<Record<number, boolean>>({});

  const toggleSave = (id: number) => {
    setSavedProperties(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;

      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('navy');
        setCustomAccent(null);
        return;
      }

      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) {
        setActiveTheme(themeName);
        setCustomAccent(null);
      } else {
        setActiveTheme('navy');
        setCustomAccent({
          accent: variation.accent,
          hover: variation.accent,
          gradient: `linear-gradient(135deg, #0F172A 0%, ${variation.accent} 100%)`
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
        .realestate-wrapper {
          --accent: #1E3A5F;
          --accent-hover: #15304F;
          --accent-light: #EFF6FF;
          --bg-primary: #FFFFFF;
          --bg-secondary: #F8FAFC;
          --bg-card: #FFFFFF;
          --border: #E2E8F0;
          --text-primary: #0F172A;
          --text-secondary: #64748B;
          --hero-bg: linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%);
          font-family: 'Inter', sans-serif;
        }
        .realestate-wrapper[data-theme="forest"] {
          --accent: #2D5016;
          --accent-hover: #1E3B0F;
          --accent-light: #F0FDF4;
          --bg-primary: #FFFFFF;
          --bg-secondary: #F7FEF2;
          --bg-card: #FFFFFF;
          --border: #D1E7C0;
          --text-primary: #14532D;
          --text-secondary: #4D7C3D;
          --hero-bg: linear-gradient(135deg, #14532D 0%, #2D5016 100%);
        }
        .realestate-wrapper[data-theme="slate"] {
          --accent: #475569;
          --accent-hover: #334155;
          --accent-light: #F8FAFC;
          --bg-primary: #FFFFFF;
          --bg-secondary: #F1F5F9;
          --bg-card: #FFFFFF;
          --border: #CBD5E1;
          --text-primary: #0F172A;
          --text-secondary: #64748B;
          --hero-bg: linear-gradient(135deg, #1E293B 0%, #475569 100%);
        }
        ${customAccent ? `
        .realestate-wrapper {
          --accent: ${customAccent.accent} !important;
          --accent-hover: ${customAccent.hover} !important;
          --hero-bg: ${customAccent.gradient} !important;
        }
        ` : ''}
      `}</style>

      <div className="realestate-wrapper min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]" data-theme={activeTheme === 'navy' ? undefined : activeTheme}>
        
        {/* 1. Navigation */}
        <nav className="sticky top-0 bg-[var(--bg-primary)] shadow-sm z-50">
          <div className="w-full max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer">
              <svg className="w-8 h-8 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-bold text-2xl tracking-tight">NestFind</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Buy', 'Rent', 'Sell', 'Agents', 'About'].map(tab => (
                <button
                  key={tab}
                  className="font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <button className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors cursor-pointer flex items-center gap-2 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                <span className="hidden sm:inline">Saved</span>
              </button>
              <button className="text-[var(--text-primary)] font-semibold hover:text-[var(--accent)] transition-colors cursor-pointer">Sign In</button>
              <button className="bg-[var(--accent)] text-white px-5 py-2.5 rounded-lg hover:bg-[var(--accent-hover)] transition-colors cursor-pointer font-semibold shadow-md">List Property</button>
            </div>
          </div>
        </nav>

        {/* 2. Hero Section */}
        <section className="bg-[image:var(--hero-bg)] py-24 text-white relative">
          <div className="w-full max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-sm">Find Your Dream Home</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-16 max-w-3xl mx-auto drop-shadow-sm font-light">Discover exceptional properties that perfectly fit your lifestyle.</p>
          </div>
          
          <div className="w-full max-w-5xl mx-auto px-4 -mb-16 relative z-10">
            <div className="bg-[var(--bg-card)] rounded-2xl shadow-2xl p-6 text-[var(--text-primary)] border border-[var(--border)]">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">Location</label>
                  <div className="flex items-center gap-2 border-b-2 border-[var(--border)] pb-2 focus-within:border-[var(--accent)] transition-colors">
                    <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <input type="text" placeholder="City, Neighborhood, or ZIP" className="outline-none bg-transparent font-medium w-full" value={location} onChange={e => setLocation(e.target.value)} />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">Property Type</label>
                  <div className="flex items-center gap-2 border-b-2 border-[var(--border)] pb-2 focus-within:border-[var(--accent)] transition-colors">
                    <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    <select className="outline-none bg-transparent font-medium w-full cursor-pointer text-[var(--text-primary)]" value={propertyType} onChange={e => setPropertyType(e.target.value)}>
                      <option>Any Type</option>
                      <option>House</option>
                      <option>Apartment</option>
                      <option>Condo</option>
                      <option>Villa</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">Price Range</label>
                  <div className="flex items-center gap-2 border-b-2 border-[var(--border)] pb-2 focus-within:border-[var(--accent)] transition-colors">
                    <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <select className="outline-none bg-transparent font-medium w-full cursor-pointer text-[var(--text-primary)]" value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                      <option>Any Price</option>
                      <option>$0 - $500k</option>
                      <option>$500k - $1M</option>
                      <option>$1M - $2M</option>
                      <option>$2M+</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">Bedrooms</label>
                  <div className="flex items-center gap-2 border-b-2 border-[var(--border)] pb-2 focus-within:border-[var(--accent)] transition-colors">
                    <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    <select className="outline-none bg-transparent font-medium w-full cursor-pointer text-[var(--text-primary)]" value={bedrooms} onChange={e => setBedrooms(e.target.value)}>
                      <option>Any Beds</option>
                      <option>1+ Beds</option>
                      <option>2+ Beds</option>
                      <option>3+ Beds</option>
                      <option>4+ Beds</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-[var(--accent)] text-white font-bold text-lg py-4 rounded-xl hover:bg-[var(--accent-hover)] transition-colors shadow-lg cursor-pointer">
                Search Properties
              </button>
            </div>
          </div>
        </section>

        {/* 3. Featured Properties */}
        <section className="bg-[var(--bg-secondary)] py-20 pt-36">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[var(--text-primary)]">Featured Properties</h2>
              <p className="text-[var(--text-secondary)] text-lg">Hand-picked selections of our finest listings</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { id: 1, price: '$875,000', address: '123 Maple Avenue, Aspen, CO', beds: 4, baths: 3, sqft: '3,200', bg: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
                { id: 2, price: '$1,250,000', address: '78 Oak Lane, Beverly Hills, CA', beds: 5, baths: 6, sqft: '4,800', bg: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)' },
                { id: 3, price: '$799,000', address: '45 Pine Road, Austin, TX', beds: 4, baths: 3.5, sqft: '2,950', bg: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' }
              ].map((prop) => (
                <div key={prop.id} className="bg-[var(--bg-card)] rounded-xl shadow-sm hover:shadow-xl border border-[var(--border)] overflow-hidden transition-all duration-300 group cursor-pointer flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: prop.bg }}></div>
                    <span className="absolute top-4 left-4 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1.5 rounded shadow-sm tracking-wide">FOR SALE</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleSave(prop.id); }}
                      className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow hover:bg-white transition-colors cursor-pointer"
                    >
                      <svg className={`w-5 h-5 transition-colors ${savedProperties[prop.id] ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{prop.price}</h3>
                    <div className="flex items-start gap-1.5 text-[var(--text-secondary)] mb-5">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="font-medium text-sm leading-relaxed">{prop.address}</span>
                    </div>
                    
                    <div className="flex items-center justify-between border-y border-[var(--border)] py-4 mb-5 mt-auto">
                      <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                        <span className="font-semibold text-sm">{prop.beds} Beds</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        <span className="font-semibold text-sm">{prop.baths} Baths</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                        <span className="font-semibold text-sm">{prop.sqft} Sqft</span>
                      </div>
                    </div>
                    
                    <button className="w-full py-2.5 border-2 border-[var(--accent)] text-[var(--accent)] rounded-lg font-bold hover:bg-[var(--accent)] hover:text-white transition-colors cursor-pointer">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Why Choose Us */}
        <section className="bg-[var(--bg-primary)] py-20">
          <div className="w-full max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[var(--text-primary)]">Why Choose NestFind?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-20 h-20 bg-[var(--accent-light)] rounded-2xl flex items-center justify-center mb-6 text-[var(--accent)]">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">Expert Guidance</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">Our experienced agents provide invaluable insights and support throughout your entire real estate journey.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-20 h-20 bg-[var(--accent-light)] rounded-2xl flex items-center justify-center mb-6 text-[var(--accent)]">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">Extensive Listings</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">Access an unparalleled portfolio of premium properties tailored to meet diverse preferences and budgets.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-20 h-20 bg-[var(--accent-light)] rounded-2xl flex items-center justify-center mb-6 text-[var(--accent)]">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">Seamless Process</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">Experience a streamlined, stress-free transaction process designed to get you into your new home faster.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Stats Bar */}
        <section className="bg-[var(--accent)] py-12 text-white">
          <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
            <div className="px-4">
              <p className="text-3xl md:text-4xl font-bold mb-2">12K+</p>
              <p className="text-white/80 font-medium">Properties Listed</p>
            </div>
            <div className="px-4">
              <p className="text-3xl md:text-4xl font-bold mb-2">3,500+</p>
              <p className="text-white/80 font-medium">Happy Clients</p>
            </div>
            <div className="px-4 border-t border-white/20 md:border-t-0 pt-8 md:pt-0">
              <p className="text-3xl md:text-4xl font-bold mb-2">500+</p>
              <p className="text-white/80 font-medium">Expert Agents</p>
            </div>
            <div className="px-4 border-t border-white/20 md:border-t-0 pt-8 md:pt-0">
              <p className="text-3xl md:text-4xl font-bold mb-2">15+</p>
              <p className="text-white/80 font-medium">Years Experience</p>
            </div>
          </div>
        </section>

        {/* 6. Neighborhoods */}
        <section className="bg-[var(--bg-secondary)] py-20">
          <div className="w-full max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[var(--text-primary)]">Popular Neighborhoods</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Downtown Manhattan', listings: 245, bg: 'linear-gradient(to top, #09203f 0%, #537895 100%)' },
                { name: 'Beverly Hills', listings: 189, bg: 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)' },
                { name: 'Lake Austin', listings: 312, bg: 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)' },
                { name: 'Pacific Heights', listings: 156, bg: 'linear-gradient(to top, #30cfd0 0%, #330867 100%)' }
              ].map((hood) => (
                <div key={hood.name} className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={{ background: hood.bg }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center text-center">
                    <h3 className="text-white text-xl font-bold mb-2">{hood.name}</h3>
                    <p className="text-white/90 text-sm font-medium">{hood.listings} listings</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Footer */}
        <footer className="bg-gray-900 text-gray-300 py-16">
          <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-gray-800 pb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-8 h-8 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-bold text-2xl text-white tracking-tight">NestFind</span>
              </div>
              <p className="text-sm opacity-80 leading-relaxed mb-6">Your trusted partner in finding the perfect home. We provide comprehensive real estate services with a personal touch.</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white hover:underline transition-all">About Us</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Careers</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Press & Media</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Services</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white hover:underline transition-all">Buy a Home</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Rent a Home</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Sell a Home</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Property Valuation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Resources</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white hover:underline transition-all">Agent Directory</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Neighborhood Guides</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Mortgage Calculator</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Real Estate Blog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm opacity-70">
            <p>© 2026 NestFind Inc. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </footer>

        {/* Theme Switcher */}
        <div className="fixed bottom-6 right-6 bg-[var(--bg-primary)] p-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex gap-2 z-[1000] border border-[var(--border)]">
          {[
            { id: 'navy', bg: '#1E3A5F', label: 'Navy' },
            { id: 'forest', bg: '#2D5016', label: 'Forest' },
            { id: 'slate', bg: '#475569', label: 'Slate' }
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
