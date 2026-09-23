import { useState, useEffect } from 'react';

export function MobileEventTickets({ variant = 'purple' }: { variant?: 'purple' | 'rose' | 'cyan' }) {
  const [activeTab, setActiveTab] = useState('discover');
  const [activeCategory, setActiveCategory] = useState('Music');

  useEffect(() => {
    window.postMessage({ type: 'customFont', font: 'Inter' }, '*');
  }, []);

  const themes = {
    purple: {
      '--accent': '#A855F7',
      '--accent-hover': '#9333EA',
      '--accent-light': 'rgba(168,85,247,0.12)',
      '--gradient-from': '#A855F7',
      '--gradient-to': '#EC4899',
      '--bg-primary': '#0A0A0F',
      '--bg-secondary': '#12121A',
      '--bg-card': '#1A1A25',
      '--border': '#252535',
      '--text-primary': '#FAFAFA',
      '--text-secondary': '#8888AA',
    },
    rose: {
      '--accent': '#F43F5E',
      '--accent-hover': '#E11D48',
      '--accent-light': 'rgba(244,63,94,0.12)',
      '--gradient-from': '#F43F5E',
      '--gradient-to': '#F97316',
      '--bg-primary': '#0F0A0A',
      '--bg-secondary': '#1A1012',
      '--bg-card': '#241618',
      '--border': '#3A2025',
      '--text-primary': '#FFF0F2',
      '--text-secondary': '#C08090',
    },
    cyan: {
      '--accent': '#06B6D4',
      '--accent-hover': '#0891B2',
      '--accent-light': 'rgba(6,182,212,0.12)',
      '--gradient-from': '#06B6D4',
      '--gradient-to': '#3B82F6',
      '--bg-primary': '#080C10',
      '--bg-secondary': '#0E1418',
      '--bg-card': '#141C22',
      '--border': '#1E2A32',
      '--text-primary': '#F0FAFA',
      '--text-secondary': '#5A8A9A',
    }
  };

  const themeStyle = themes[variant] as React.CSSProperties;

  return (
    <div className="events-wrapper w-full min-h-screen bg-[#050505] flex items-center justify-center p-4 sm:p-8 font-sans" data-theme={variant}>
      <div 
        style={themeStyle}
        className="w-full max-w-[390px] h-[844px] bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden flex flex-col shadow-2xl rounded-[40px] border-[8px] border-black ring-1 ring-white/10"
      >
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden pb-24">
          
          {/* Header */}
          <div className="px-5 pt-4 flex justify-between items-center">
            <h1 className="font-bold text-2xl">Events</h1>
            <div className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-xs text-[var(--text-secondary)] font-medium">New York</span>
            </div>
            <div className="cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>

          {/* Featured Event */}
          <div className="mx-5 mt-4">
            <div className="rounded-2xl overflow-hidden relative h-[180px] bg-gradient-to-br" style={{ backgroundImage: 'linear-gradient(to bottom right, var(--gradient-from), var(--gradient-to))' }}>
              <div className="absolute top-[-20%] left-[-10%] w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
              <div className="absolute bottom-[20%] right-[-10%] w-24 h-24 rounded-full bg-white/10 blur-lg"></div>
              
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1">
                <span className="text-sm text-white font-bold">From $49</span>
              </div>
              
              <div className="absolute bottom-0 left-0 p-5 w-full bg-gradient-to-t from-black/60 to-transparent">
                <h2 className="font-bold text-xl text-white mb-2 leading-tight">Summer Music Festival</h2>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="text-sm text-white/80 font-medium">Aug 15-17</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-sm text-white/80 font-medium">Central Park</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="px-5 mt-4">
            <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {['All', 'Music', 'Sports', 'Comedy', 'Theater', 'Food'].map(cat => (
                <div 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm cursor-pointer whitespace-nowrap transition-colors font-medium border ${
                    activeCategory === cat 
                      ? 'bg-[var(--accent)] border-[var(--accent)] text-white' 
                      : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="px-5 mt-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base">Upcoming</h3>
              <span className="text-[var(--accent)] text-xs font-semibold cursor-pointer">See all</span>
            </div>
            
            {[
              { color: 'purple', title: 'Jazz Night', venue: 'Blue Note', time: 'Tonight 8PM', price: '$35' },
              { color: 'pink', title: 'Comedy Show', venue: 'Laugh Factory', time: 'Tomorrow', price: '$25' },
              { color: 'blue', title: 'Art Exhibition', venue: 'MoMA', time: 'Oct 15', price: 'Free', isFree: true },
              { color: 'amber', title: 'Food Festival', venue: 'Brooklyn', time: 'Oct 20', price: '$15' }
            ].map((ev, i) => (
              <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden mb-3 flex cursor-pointer hover:border-[var(--accent)] hover:border-opacity-40 transition-colors h-[100px]">
                <div className={`w-24 h-full bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] opacity-30`}></div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm leading-tight">{ev.title}</h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      </svg>
                      <span className="text-[10px] text-[var(--text-secondary)]">{ev.venue}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span className="text-[10px] text-[var(--text-secondary)]">{ev.time}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`font-bold text-sm ${ev.isFree ? 'text-green-500' : 'text-[var(--accent)]'}`}>{ev.price}</span>
                    <button className="bg-[var(--accent)] text-white text-[10px] px-3 py-1 rounded-full font-semibold hover:opacity-90">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Popular Venues */}
          <div className="px-5 mt-5">
            <h3 className="font-bold text-base">Popular Venues</h3>
            <div className="flex gap-3 mt-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
              {[
                { name: 'Madison Square', loc: 'Midtown', rating: '4.9' },
                { name: 'Blue Note Jazz', loc: 'Greenwich', rating: '4.8' },
                { name: 'Brooklyn Steel', loc: 'Williamsburg', rating: '4.7' },
                { name: 'Radio City', loc: 'Rockefeller', rating: '4.9' }
              ].map((venue, i) => (
                <div key={i} className="min-w-[140px] bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden cursor-pointer hover:border-[var(--text-secondary)] transition-colors">
                  <div className="h-20 bg-gradient-to-br from-[var(--gradient-from)] to-[var(--bg-secondary)] opacity-40"></div>
                  <div className="p-3">
                    <h4 className="font-bold text-xs truncate">{venue.name}</h4>
                    <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">{venue.loc}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="text-[10px] font-bold">{venue.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Tickets */}
          <div className="px-5 mt-5">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-bold text-base">My Tickets</h3>
              <div className="w-5 h-5 rounded-full bg-[var(--accent)] text-white text-[10px] flex items-center justify-center font-bold">2</div>
            </div>
            
            {[
              { title: 'Jazz Night', time: 'Tonight 8PM', seat: 'Seat A12', gate: 'Gate 2' },
              { title: 'Art Exhibition', time: 'Oct 15', seat: 'General Admission', gate: 'Gate 1' }
            ].map((ticket, i) => (
              <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl mb-3 relative overflow-hidden cursor-pointer hover:border-[var(--accent)] transition-colors">
                <div className="p-4 border-b border-dashed border-[var(--border)] relative">
                  <div className="absolute -left-2 -bottom-2 w-4 h-4 rounded-full bg-[var(--bg-primary)] border border-[var(--border)]"></div>
                  <div className="absolute -right-2 -bottom-2 w-4 h-4 rounded-full bg-[var(--bg-primary)] border border-[var(--border)]"></div>
                  <h4 className="font-bold text-base">{ticket.title}</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{ticket.time}</p>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-0.5">Seat</p>
                      <p className="font-bold text-sm">{ticket.seat}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-0.5">Gate</p>
                      <p className="font-bold text-sm">{ticket.gate}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-white rounded p-1 opacity-80" style={{ backgroundImage: 'radial-gradient(black 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-[var(--bg-primary)]/95 backdrop-blur-md border-t border-[var(--border)] flex items-center justify-between px-6 pb-4 pt-2 z-50">
          {[
            { id: 'discover', paths: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'], label: 'Discover', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg> },
            { id: 'tickets', label: 'My Tickets', icon: <div className="relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[var(--accent)] rounded-full text-[8px] flex items-center justify-center font-bold text-white border border-[var(--bg-primary)]">2</div>
              </div> },
            { id: 'favorites', label: 'Favorites', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
            { id: 'profile', label: 'Profile', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
          ].map((tab) => (
            <div 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${activeTab === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            >
              <div className={activeTab === tab.id ? 'scale-110 transition-transform' : 'transition-transform'}>
                {tab.icon}
              </div>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
