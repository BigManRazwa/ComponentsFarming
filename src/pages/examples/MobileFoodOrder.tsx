import { useState, useEffect } from 'react';

type Variant = 'green' | 'orange' | 'blue';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#22C55E': 'green',
  '#F97316': 'orange',
  '#3B82F6': 'blue',
};

export function MobileFoodOrder({ variant = 'green' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('green'); 
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

  const steps = [
    { status: 'done', title: 'Order Confirmed', time: '6:30 PM' },
    { status: 'done', title: 'Preparing', time: '6:35 PM' },
    { status: 'active', title: 'On the Way', time: 'Est. 6:50 PM' },
    { status: 'pending', title: 'Delivered', time: '' },
  ];

  const items = [
    { name: 'Classic Burger x2', price: 18.00 },
    { name: 'Fries Large', price: 5.50 },
    { name: 'Cola', price: 3.00 },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .foodorder-wrapper {
          --accent: #22C55E;
          --accent-hover: #16A34A;
          --accent-light: rgba(34,197,94,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #F0FFF4;
          --bg-card: #FFFFFF;
          --border: #D1FAE5;
          --text-primary: #1A2E1A;
          --text-secondary: #5A8A5A;
          font-family: 'Inter', sans-serif;
        }
        .foodorder-wrapper[data-theme="orange"] {
          --accent: #F97316;
          --accent-hover: #EA580C;
          --accent-light: rgba(249,115,22,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #FFF7ED;
          --bg-card: #FFFFFF;
          --border: #FFEDD5;
          --text-primary: #2E1A08;
          --text-secondary: #AA7A40;
        }
        .foodorder-wrapper[data-theme="blue"] {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-light: rgba(59,130,246,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #EFF6FF;
          --bg-card: #FFFFFF;
          --border: #DBEAFE;
          --text-primary: #1A1A2E;
          --text-secondary: #6B8CAE;
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
        className="foodorder-wrapper min-h-screen bg-neutral-100 flex justify-center text-[var(--text-primary)]"
        data-theme={activeTheme === 'green' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col overflow-x-hidden shadow-2xl">
          
          {/* 1. Header */}
          <div className="px-5 pt-4 flex items-center gap-3">
            <div className="w-9 h-9 border border-[var(--border)] rounded-full flex items-center justify-center cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
              <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </div>
            <h1 className="font-bold text-lg flex-1 text-center">Order #4521</h1>
            <div className="w-9 h-9 border border-[var(--border)] rounded-full flex items-center justify-center cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
              <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* 2. Status Stepper */}
          <div className="px-5 mt-5">
            <div className="relative pl-8">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-[var(--border)]"></div>
              {steps.map((step, idx) => (
                <div key={idx} className="relative py-3">
                  {step.status === 'done' && (
                    <>
                      <div className="absolute left-0 w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center z-10 -ml-3.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--accent)] -ml-[1px]"></div>
                    </>
                  )}
                  {step.status === 'active' && (
                    <div className="absolute left-0 w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center z-10 -ml-3.5 ring-4 ring-[var(--accent-light)]">
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                  )}
                  {step.status === 'pending' && (
                    <div className="absolute left-0 w-7 h-7 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center z-10 -ml-3.5 border border-[var(--border)]">
                      <div className="w-2.5 h-2.5 bg-[var(--text-secondary)] rounded-full opacity-50"></div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center ml-2">
                    <span className={`text-sm ${step.status === 'active' || step.status === 'done' ? 'font-bold' : 'font-medium text-[var(--text-secondary)]'}`}>
                      {step.title}
                    </span>
                    <span className={`text-xs ${step.status === 'active' ? 'font-bold text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>
                      {step.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Estimated Time */}
          <div className="px-5 mt-3 flex items-center gap-2">
            <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-bold text-2xl">15 min</span>
            <span className="text-sm text-[var(--text-secondary)] font-medium">estimated delivery</span>
          </div>

          {/* 4. Map Area */}
          <div className="mx-5 mt-4 h-[140px] bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden relative shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            </div>
            
            {/* Route line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <path d="M 40 70 Q 150 20 250 80 T 350 70" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="6 6" />
            </svg>

            {/* Restaurant marker */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h8M3 13a4 4 0 018 0M3 13v8m8-8v8m9-10v12M17 3v4a4 4 0 004 4" />
              </svg>
            </div>

            {/* Driver marker */}
            <div className="absolute right-[40%] top-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center shadow-lg border-2 border-white z-10">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>

            {/* Delivery marker */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
          </div>

          {/* 5. Driver Card */}
          <div className="mx-5 mt-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--border)] rounded-full flex items-center justify-center overflow-hidden shrink-0">
               <svg className="w-6 h-6 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
               </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">John D.</h3>
              <div className="flex items-center gap-1 mt-0.5">
                <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">4.9</span>
                <span className="text-xs text-[var(--text-secondary)] ml-1">Honda Civic - White</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-[var(--accent-light)] border border-[var(--border)] rounded-full flex items-center justify-center cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
                <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </button>
              <button className="w-10 h-10 bg-[var(--accent-light)] border border-[var(--border)] rounded-full flex items-center justify-center cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
                <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.47-2.564c-1.736-1.011-2.94-2.73-2.94-4.656 0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              </button>
            </div>
          </div>

          {/* 6. Order Summary */}
          <div className="mx-5 mt-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                  </svg>
                </div>
                <span className="font-bold text-sm group-hover:text-[var(--accent)] transition-colors">Burger Palace</span>
              </div>
              <svg className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            
            <div className="border-b border-[var(--border)] my-3"></div>
            
            <div className="space-y-2.5">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="font-medium text-[var(--text-primary)]">{item.name}</span>
                  <span className="font-medium text-[var(--text-primary)]">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-b border-[var(--border)] my-3"></div>

            <div className="flex justify-between text-sm py-1">
              <span className="text-[var(--text-secondary)] font-medium">Subtotal</span>
              <span className="font-medium">$26.50</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span className="text-[var(--text-secondary)] font-medium">Delivery Fee</span>
              <span className="font-medium">$2.00</span>
            </div>
            <div className="flex justify-between font-bold text-base mt-2">
              <span>Total</span>
              <span>$28.50</span>
            </div>
          </div>

          {/* 7. Action Button */}
          <div className="px-5 mt-4 pb-8">
            <button className="w-full bg-[var(--accent)] text-white rounded-2xl py-4 font-bold text-base shadow-lg shadow-[var(--accent)]/25 flex items-center justify-center gap-2 cursor-pointer hover:bg-[var(--accent-hover)] transition-colors active:scale-[0.98]">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
              Rate & Review
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
