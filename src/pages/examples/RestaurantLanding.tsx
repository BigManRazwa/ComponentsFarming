import { useState, useEffect } from 'react';

type Variant = 'golden' | 'burgundy' | 'sage';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#D4A853': 'golden',
  '#8B2252': 'burgundy',
  '#6B8E6B': 'sage'
};

export function RestaurantLanding({ variant = 'golden' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('Menu');
  const [guestCount, setGuestCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('golden');
        return;
      }
      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) {
        setActiveTheme(themeName);
      } else {
        setActiveTheme('golden');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Menu', 'Reservations', 'About', 'Gallery', 'Contact'];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      <style>{`
        .restaurant-wrapper {
          --accent: #D4A853;
          --accent-hover: #C49B45;
          --bg-primary: #1A1A1A;
          --bg-secondary: #242424;
          --text-primary: #F5F0E8;
          --text-secondary: #A09880;
          --border: #333333;
          font-family: 'Inter', sans-serif;
        }
        .restaurant-wrapper[data-theme="burgundy"] {
          --accent: #8B2252;
          --accent-hover: #7A1E48;
          --bg-primary: #1A1216;
          --bg-secondary: #241C20;
          --text-primary: #F5EEF0;
          --text-secondary: #A08890;
          --border: #3A2530;
        }
        .restaurant-wrapper[data-theme="sage"] {
          --accent: #6B8E6B;
          --accent-hover: #5A7D5A;
          --bg-primary: #161A16;
          --bg-secondary: #1E241E;
          --text-primary: #F0F5F0;
          --text-secondary: #88A088;
          --border: #2A352A;
        }
        .heading-font {
          font-family: 'Playfair Display', serif;
        }
      `}</style>

      <div className="restaurant-wrapper min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]" data-theme={activeTheme === 'golden' ? undefined : activeTheme}>
        
        {/* 1. Navigation Bar */}
        <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md shadow-lg border-b border-[var(--border)]' : 'bg-transparent'}`}>
          <div className="w-full max-w-[1200px] mx-auto px-6 h-20 flex justify-between items-center">
            <div className="flex flex-col items-start cursor-pointer">
              <span className="heading-font text-3xl font-bold tracking-wider text-[var(--text-primary)]">AURORA</span>
              <span className="text-[10px] tracking-[0.3em] font-semibold text-[var(--accent)] uppercase mt-1">Fine Dining</span>
            </div>
            
            <div className="flex items-center gap-8">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => setActiveNav(link)}
                      className={`text-sm tracking-wide transition-colors cursor-pointer ${activeNav === link ? 'text-[var(--accent)]' : 'text-[var(--text-primary)] hover:text-[var(--accent)]'}`}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
              <button className="border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ml-4">
                Online Booking
              </button>
            </div>
          </div>
        </nav>

        {/* 2. Hero Section */}
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Background Placeholder */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,var(--bg-secondary)_0%,var(--bg-primary)_100%)] opacity-80"></div>
          <div className="absolute inset-0 z-0 bg-black/40"></div>
          
          <div className="relative z-10 text-center flex flex-col items-center px-4 max-w-4xl mx-auto mt-20">
            <span className="text-sm font-semibold tracking-[0.4em] text-[var(--accent)] uppercase mb-6 drop-shadow-md">Welcome To Aurora</span>
            <h1 className="heading-font text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
              Experience Fine Dining
            </h1>
            <p className="heading-font italic text-xl md:text-2xl text-[var(--text-secondary)] mb-12 drop-shadow-md">
              A Culinary Journey Awaits
            </p>
            <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-8 py-3 rounded-full text-lg font-medium transition-transform hover:scale-105 cursor-pointer shadow-xl">
              Reserve a Table
            </button>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce text-[var(--text-secondary)]">
            <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* 3. Signature Dishes Section */}
        <section className="py-20 bg-[var(--bg-primary)]">
          <div className="w-full max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col items-center mb-16">
              <h2 className="text-sm font-semibold tracking-[0.3em] uppercase text-[var(--text-primary)] mb-4">Signature Dishes</h2>
              <div className="h-[2px] w-[60px] bg-[var(--accent)]"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Wagyu Beef Wellington', desc: 'Dark glaze, truffle mash, seasonal roots', price: '$65' },
                { name: 'Seared Scallops & Risotto', desc: 'Lemon zest, asparagus, parmesan', price: '$48' },
                { name: 'Dover Sole Meunière', desc: 'Brown butter, capers, heritage potatoes', price: '$52' },
              ].map((dish, i) => (
                <div key={i} className="flex flex-col group cursor-pointer">
                  <div className="w-full aspect-[4/3] rounded-lg mb-6 overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] border border-[var(--border)] relative transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-[var(--accent)] opacity-5 group-hover:opacity-10 transition-opacity"></div>
                  </div>
                  <h3 className="heading-font text-2xl font-bold text-[var(--text-primary)] mb-2 transition-colors group-hover:text-[var(--accent)]">{dish.name}</h3>
                  <p className="heading-font italic text-sm text-[var(--text-secondary)] mb-4 flex-grow">{dish.desc}</p>
                  <div className="text-lg font-medium text-[var(--accent)]">{dish.price}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Reservation Form Section */}
        <section className="py-20 bg-[var(--bg-secondary)]">
          <div className="w-full max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              
              {/* Form Column */}
              <div className="bg-[var(--bg-primary)] p-10 rounded-xl border border-[var(--border)] shadow-xl">
                <h2 className="heading-font text-4xl font-bold text-[var(--text-primary)] mb-2">Book Your Table</h2>
                <p className="text-[var(--text-secondary)] mb-8">Make an evening to remember</p>
                
                <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Date</label>
                      <input 
                        type="date" 
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] px-4 py-3 rounded-md outline-none focus:border-[var(--accent)] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Time</label>
                      <select 
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] px-4 py-3 rounded-md outline-none focus:border-[var(--accent)] transition-colors"
                      >
                        <option value="">Select Time</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                        <option value="21:00">21:00</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Guests</label>
                      <select 
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] px-4 py-3 rounded-md outline-none focus:border-[var(--accent)] transition-colors"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Name</label>
                      <input 
                        type="text" 
                        placeholder="Your full name"
                        className="bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] px-4 py-3 rounded-md outline-none focus:border-[var(--accent)] transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Special Requests</label>
                    <textarea 
                      rows={3} 
                      placeholder="Dietary requirements, occasions, etc."
                      className="bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] px-4 py-3 rounded-md outline-none focus:border-[var(--accent)] transition-colors resize-none"
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium py-4 rounded-md mt-2 transition-colors cursor-pointer text-lg">
                    Request Booking
                  </button>
                </form>
              </div>

              {/* Chef Column */}
              <div className="flex flex-col items-center md:items-start pl-0 md:pl-10 text-center md:text-left">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[var(--accent)] to-[var(--bg-primary)] flex items-center justify-center mb-6 shadow-lg border-2 border-[var(--border)]">
                  <svg className="w-10 h-10 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <blockquote className="heading-font text-2xl md:text-3xl italic text-[var(--text-primary)] leading-relaxed mb-6">
                  "Each dish is a masterpiece, crafted with passion, precision, and the finest seasonal ingredients."
                </blockquote>
                <p className="text-[var(--accent)] font-medium mb-12 uppercase tracking-widest text-sm">
                  — Julian Croft, Head Chef
                </p>
                
                <div className="flex w-full justify-between border-t border-[var(--border)] pt-8">
                  <div className="flex flex-col">
                    <span className="heading-font text-3xl text-[var(--text-primary)] mb-1">15+</span>
                    <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Years</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="heading-font text-3xl text-[var(--text-primary)] mb-1">3</span>
                    <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Michelin Stars</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="heading-font text-3xl text-[var(--text-primary)] mb-1">200+</span>
                    <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Dishes</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* 5. Gallery Section */}
        <section className="py-20 bg-[var(--bg-primary)]">
          <div className="w-full max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-sm font-semibold tracking-[0.3em] uppercase text-[var(--text-primary)] mb-2">Gallery</h2>
              <a href="#" className="text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors">@aurorafinedining</a>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)]">
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--accent)] group-hover:scale-105 transition-all duration-300 z-10 rounded-lg"></div>
                  <div className="absolute inset-0 bg-[var(--text-primary)] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <svg className="w-8 h-8 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Footer */}
        <footer className="py-16 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
          <div className="w-full max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              
              <div className="flex flex-col">
                <span className="heading-font text-2xl font-bold tracking-wider text-[var(--text-primary)] mb-1">AURORA</span>
                <span className="text-[10px] tracking-[0.3em] font-semibold text-[var(--accent)] uppercase mb-6">Fine Dining</span>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  An unforgettable culinary experience where tradition meets innovation in the heart of the city.
                </p>
              </div>
              
              <div className="flex flex-col">
                <h4 className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--text-primary)] mb-6">Opening Hours</h4>
                <ul className="flex flex-col gap-3 text-sm text-[var(--text-secondary)]">
                  <li className="flex justify-between"><span>Mon - Thu</span> <span>5:00 PM - 10:00 PM</span></li>
                  <li className="flex justify-between"><span>Fri - Sat</span> <span>5:00 PM - 11:00 PM</span></li>
                  <li className="flex justify-between"><span>Sun</span> <span>Closed</span></li>
                </ul>
              </div>
              
              <div className="flex flex-col">
                <h4 className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--text-primary)] mb-6">Contact</h4>
                <ul className="flex flex-col gap-4 text-sm text-[var(--text-secondary)]">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--accent)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span>123 Culinary Avenue,<br/>Gourmet District, NY 10001</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    <span>+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span>reservations@aurora.com</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col">
                <h4 className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--text-primary)] mb-6">Newsletter</h4>
                <p className="text-[var(--text-secondary)] text-sm mb-4">Subscribe for seasonal menus and exclusive event invitations.</p>
                <form className="flex" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="bg-[var(--bg-primary)] border border-[var(--border)] border-r-0 text-[var(--text-primary)] px-4 py-2 text-sm rounded-l-md outline-none focus:border-[var(--accent)] transition-colors w-full"
                  />
                  <button type="submit" className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 text-sm font-medium rounded-r-md transition-colors cursor-pointer shrink-0">
                    Subscribe
                  </button>
                </form>
              </div>
              
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[var(--border)] text-xs text-[var(--text-secondary)]">
              <p>© 2026 Aurora Fine Dining. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[var(--accent)] transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating Theme Switcher */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full shadow-2xl z-50">
          {[
            { id: 'golden', color: '#D4A853', name: 'Golden' },
            { id: 'burgundy', color: '#8B2252', name: 'Burgundy' },
            { id: 'sage', color: '#6B8E6B', name: 'Sage' },
          ].map((theme) => (
            <button
              key={theme.id}
              onClick={() => setActiveTheme(theme.id as Variant)}
              className={`w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-110 relative group ${activeTheme === theme.id ? 'ring-2 ring-offset-2 ring-offset-[var(--bg-secondary)] ring-white' : ''}`}
              style={{ backgroundColor: theme.color }}
              aria-label={`Switch to ${theme.name} theme`}
            >
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-[var(--bg-secondary)] text-[var(--text-primary)] text-xs border border-[var(--border)] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {theme.name}
              </span>
            </button>
          ))}
        </div>

      </div>
    </>
  );
}
