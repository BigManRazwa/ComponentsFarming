import { useState, useEffect } from 'react';

type Variant = 'dark' | 'blue' | 'green';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#000000': 'dark',
  '#3B82F6': 'blue',
  '#22C55E': 'green',
};

export function MobileRideSharing({ variant = 'dark' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  const [selectedRide, setSelectedRide] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('Home');

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('dark'); 
        setCustomFont(null); 
        return; 
      }
      if (variation.font) setCustomFont(variation.font);
      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) { 
        setActiveTheme(themeName); 
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const rides = [
    { id: 0, name: 'RideGo X', seats: 4, time: '4 min', price: '$12.50', icon: (
      <svg className="w-10 h-10 text-[var(--text-primary)]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
      </svg>
    )},
    { id: 1, name: 'Comfort', seats: 4, time: '6 min', price: '$18.00', icon: (
      <svg className="w-10 h-10 text-[var(--text-primary)]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
      </svg>
    )},
    { id: 2, name: 'RideGo XL', seats: 6, time: '8 min', price: '$24.50', icon: (
      <svg className="w-12 h-12 text-[var(--text-primary)]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 8H5c-1.1 0-2 .9-2 2v8h2v2c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-2h10v2c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-2h2v-8c0-1.1-.9-2-2-2zm-12.5 8c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        <path d="M5 8h14v2H5z" opacity=".3"/>
      </svg>
    )}
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .ride-wrapper {
          --accent: #000000;
          --accent-hover: #1A1A1A;
          --accent-text: #FFFFFF;
          --bg-primary: #FFFFFF;
          --bg-secondary: #F5F5F5;
          --bg-card: #FFFFFF;
          --border: #E5E5E5;
          --text-primary: #1A1A1A;
          --text-secondary: #888888;
          --map-bg: #E8F0FE;
          font-family: 'Inter', sans-serif;
        }
        .ride-wrapper[data-theme="blue"] {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-text: #FFFFFF;
          --bg-primary: #FFFFFF;
          --bg-secondary: #F0F7FF;
          --bg-card: #FFFFFF;
          --border: #DBEAFE;
          --text-primary: #1A1A1A;
          --text-secondary: #6B8CAE;
          --map-bg: #DBEAFE;
        }
        .ride-wrapper[data-theme="green"] {
          --accent: #22C55E;
          --accent-hover: #16A34A;
          --accent-text: #FFFFFF;
          --bg-primary: #FFFFFF;
          --bg-secondary: #F0FFF5;
          --bg-card: #FFFFFF;
          --border: #D1FAE5;
          --text-primary: #1A1A1A;
          --text-secondary: #5A8A6A;
          --map-bg: #D1FAE5;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div 
        className="ride-wrapper min-h-screen bg-neutral-100 flex justify-center text-[var(--text-primary)]"
        data-theme={activeTheme === 'dark' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col pb-24 overflow-x-hidden">
          
          {/* 1. Header */}
          <div className="px-5 pt-4 flex justify-between items-center z-10">
            <button className="cursor-pointer">
              <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="font-bold text-lg">RideGo</div>
            <button className="cursor-pointer">
              <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>

          {/* 2. Search Bar */}
          <div className="mx-5 mt-3">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm p-3 relative">
              {/* Connector line */}
              <div className="absolute left-[21px] top-[26px] h-4 border-l-2 border-dashed border-[var(--border)]"></div>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 ml-1"></div>
                <div className="flex-1 text-sm text-[var(--text-primary)]">Current Location</div>
                <svg className="w-4 h-4 text-[var(--text-secondary)] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              
              <div className="flex items-center gap-3 mt-3">
                <div className="w-2 h-2 bg-red-500 ml-1"></div>
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  className="flex-1 text-sm font-bold bg-transparent border-none outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
                />
                <svg className="w-4 h-4 text-[var(--text-secondary)] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* 3. Map Area */}
          <div className="mx-5 mt-3 relative">
            <div 
              className="h-48 bg-[var(--map-bg)] rounded-2xl relative overflow-hidden"
              style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            >
              {/* Route Path */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <path 
                  d="M 50 150 Q 150 150 200 100 T 300 50" 
                  fill="none" 
                  stroke="var(--accent)" 
                  strokeWidth="4" 
                  strokeDasharray="8 8"
                />
              </svg>
              
              {/* Pickup Pin */}
              <div className="absolute bottom-[30px] left-[40px] w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              
              {/* Destination Pin */}
              <svg className="absolute top-[30px] right-[70px] w-8 h-8 text-red-500 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>

              {/* ETA Badge */}
              <div className="absolute bottom-3 left-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-full px-3 py-1 text-xs font-semibold shadow-sm text-[var(--text-primary)]">
                4 min away
              </div>
            </div>
          </div>

          {/* 4. Ride Options */}
          <div className="mx-5 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="font-bold text-sm">Choose a ride</h2>
              <span className="bg-[var(--accent)] text-[var(--accent-text)] text-[10px] font-bold px-1.5 py-0.5 rounded">Recommended</span>
            </div>
            
            {rides.map((ride) => (
              <div 
                key={ride.id}
                onClick={() => setSelectedRide(ride.id)}
                className={`bg-[var(--bg-card)] border rounded-xl p-4 mb-2 flex items-center gap-3 cursor-pointer transition-colors ${selectedRide === ride.id ? 'border-[var(--accent)] bg-[var(--accent)]/5' : 'border-[var(--border)]'}`}
              >
                <div className="w-14 flex items-center justify-center">
                  {ride.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-[var(--text-primary)]">{ride.name}</span>
                    <span className="flex items-center text-xs text-[var(--text-secondary)]">
                      <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                      {ride.seats}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">Arrives in {ride.time}</p>
                </div>
                <div className="font-bold text-sm text-[var(--text-primary)]">
                  {ride.price}
                </div>
              </div>
            ))}
          </div>

          {/* 5. Promo Banner */}
          <div className="mx-5 mt-3">
            <div className="bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-xl p-3 flex items-center gap-3">
              <svg className="w-8 h-8 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5h.008v.008H6V7.5z" />
              </svg>
              <div className="flex-1">
                <div className="font-bold text-sm text-[var(--text-primary)]">Save 20% with RideGo Plus</div>
                <div className="text-xs text-[var(--text-secondary)]">First month free</div>
              </div>
              <button className="bg-[var(--accent)] text-[var(--accent-text)] text-xs font-bold px-3 py-1.5 rounded-full">
                Try
              </button>
            </div>
          </div>

          {/* 6. Payment & Action */}
          <div className="mx-5 mt-4 pb-24">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3 flex items-center gap-3">
              <svg className="w-6 h-6 text-[var(--text-primary)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
              </svg>
              <div className="flex-1 text-sm font-medium text-[var(--text-primary)]">Visa •••• 4242</div>
              <button className="text-[var(--accent)] font-bold text-xs cursor-pointer">Change</button>
            </div>
            
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3 mt-2 flex items-center gap-3 cursor-pointer">
              <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1 font-bold text-sm text-[var(--text-primary)] flex items-center gap-1">
                Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="text-xs text-[var(--text-secondary)]">Schedule for later</div>
            </div>

            <button className="mt-4 w-full bg-[var(--accent)] text-[var(--accent-text)] rounded-xl py-4 text-center font-bold text-lg shadow-lg hover:bg-[var(--accent-hover)] transition-colors">
              Request {rides.find(r => r.id === selectedRide)?.name}
            </button>
            <div className="text-xs text-[var(--text-secondary)] text-center mt-2">
              You'll be picked up at Main St
            </div>
          </div>

          {/* 7. Bottom Nav */}
          <div className="fixed bottom-0 w-full max-w-[390px] bg-[var(--bg-card)]/95 backdrop-blur-md border-t border-[var(--border)] z-50">
            <div className="flex justify-around items-center h-16 pb-2">
              {[
                { id: 'Home', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
                { id: 'Services', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
                { id: 'Activity', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
                { id: 'Account', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1 w-16 h-full cursor-pointer transition-colors ${activeTab === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  <div className={`transition-transform duration-200 ${activeTab === tab.id ? 'scale-110' : ''}`}>
                    {tab.icon}
                  </div>
                  <span className="text-[10px] font-medium">{tab.id}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
