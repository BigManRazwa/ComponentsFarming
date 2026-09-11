import { useState, useEffect } from 'react';

type Variant = 'jade' | 'royal' | 'copper';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#10B981': 'jade',
  '#6366F1': 'royal',
  '#F59E0B': 'copper',
};

export function MobileBanking({ variant = 'jade' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [activeTab, setActiveTab] = useState<'Home' | 'Cards' | 'Scan' | 'Analytics' | 'Profile'>('Home');
  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('jade');
        return;
      }
      const themeName = ACCENT_TO_THEME[variation.accent] || 'jade';
      setActiveTheme(themeName);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .banking-wrapper {
          --accent: #10B981;
          --accent-hover: #059669;
          --bg-primary: #0A0F0E;
          --bg-secondary: #111A17;
          --bg-card: #162220;
          --border: #1E3A34;
          --text-primary: #F5F5F5;
          --text-secondary: #6B9E8E;
          font-family: 'Inter', sans-serif;
        }
        .banking-wrapper[data-theme="royal"] {
          --accent: #6366F1;
          --accent-hover: #4F46E5;
          --bg-primary: #0A0A14;
          --bg-secondary: #111120;
          --bg-card: #16162E;
          --border: #1E1E40;
          --text-primary: #F5F5F5;
          --text-secondary: #8888BB;
        }
        .banking-wrapper[data-theme="copper"] {
          --accent: #F59E0B;
          --accent-hover: #D97706;
          --bg-primary: #0F0D08;
          --bg-secondary: #1A1610;
          --bg-card: #22201A;
          --border: #3A3428;
          --text-primary: #F5F5F5;
          --text-secondary: #AA9968;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="banking-wrapper min-h-screen bg-[#000000] flex justify-center text-[var(--text-primary)]" data-theme={activeTheme === 'jade' ? undefined : activeTheme}>
        
        {/* Mobile Phone Container */}
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col pb-20 overflow-x-hidden">
          
          {/* Status Bar */}
          <div className="bg-transparent px-5 py-3 flex items-center justify-between sticky top-0 z-50 text-white font-medium text-[14px]">
            <span>10:33</span>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
              <svg className="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 6h16a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V8a2 2 0 012-2z M20 10v4" /></svg>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 scrollbar-hide">
            {/* 1. Header */}
            <div className="px-5 pt-4 flex justify-between items-center">
              <div>
                <div className="text-[var(--text-secondary)] text-sm">Good Morning,</div>
                <div className="text-xl font-bold">Alex</div>
              </div>
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--accent)] to-gray-600 flex items-center justify-center cursor-pointer">
                <div className="w-[36px] h-[36px] bg-[var(--bg-card)] rounded-full flex items-center justify-center font-bold">AL</div>
                <span className="absolute top-0 right-0 w-3 h-3 bg-[#10B981] border-2 border-[var(--bg-primary)] rounded-full"></span>
              </div>
            </div>

            {/* 2. Balance Card */}
            <div className="mx-5 mt-4 bg-[var(--bg-card)] rounded-2xl p-5 border border-[var(--border)] shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--bg-card)] via-[var(--accent)] to-[var(--bg-card)] opacity-50"></div>
              
              <div className="flex justify-between items-center mb-2">
                <div className="text-[var(--text-secondary)] text-sm flex items-center gap-2">
                  Total Balance
                  <button onClick={() => setShowBalance(!showBalance)} className="cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {showBalance ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0a9.953 9.953 0 015.71-2.29c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0l3.29 3.29" /></svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-6">
                {showBalance ? "$24,580.50" : "••••••••"}
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-bold italic">VISA</div>
                  <div className="text-sm text-[var(--text-secondary)]">•••• 5678</div>
                </div>
                <div className="bg-[var(--accent)] bg-opacity-20 text-[var(--accent)] text-xs font-bold px-2 py-1 rounded">
                  Active
                </div>
              </div>
            </div>

            {/* 3. Quick Actions */}
            <div className="mx-5 mt-5 grid grid-cols-4 gap-3">
              {[
                { label: 'Send', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>, bg: 'bg-[var(--accent)] text-[#000]' },
                { label: 'Receive', icon: <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>, bg: 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)]' },
                { label: 'Pay Bills', icon: <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, bg: 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)]' },
                { label: 'Top Up', icon: <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>, bg: 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)]' }
              ].map((action, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <button className={`w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity ${action.bg}`}>
                    {action.icon}
                  </button>
                  <span className="text-xs text-[var(--text-secondary)] font-medium">{action.label}</span>
                </div>
              ))}
            </div>

            {/* 4. Recent Transactions */}
            <div className="mx-5 mt-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-lg">Recent Transactions</h2>
                <button className="text-[var(--accent)] text-xs font-medium cursor-pointer">See All</button>
              </div>
              
              <div className="flex flex-col gap-2">
                {[
                  { name: 'Netflix', date: 'Today 10:30 AM', amount: '-$15.99', badge: 'Streaming', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
                  { name: 'Starbucks', date: 'Today 8:15 AM', amount: '-$6.50', badge: 'Food & Drink', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 8h-3V4H3c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2h5c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1z" /></svg> },
                  { name: 'Amazon', date: 'Yesterday', amount: '-$142.00', badge: 'Shopping', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> },
                  { name: 'Uber Ride', date: 'Yesterday', amount: '-$24.50', badge: 'Transport', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h8a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2zM4 11h16M7 15h10" /></svg> },
                  { name: 'Spotify', date: 'Dec 14', amount: '-$9.99', badge: 'Streaming', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm12-3c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zM9 10l12-3" /></svg> }
                ].map((tx, i) => (
                  <div key={i} className="bg-[var(--bg-card)] rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--accent)] to-gray-600 text-[#000] flex items-center justify-center p-[1px]">
                         <div className="w-full h-full bg-[var(--bg-card)] rounded-full flex items-center justify-center text-[var(--accent)]">
                           {tx.icon}
                         </div>
                      </div>
                      <div>
                        <div className="font-bold text-sm">{tx.name}</div>
                        <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">{tx.date}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-sm font-bold text-red-400">{tx.amount}</div>
                      <div className="text-[10px] bg-[var(--bg-primary)] px-2 py-0.5 rounded text-[var(--text-secondary)]">
                        {tx.badge}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Spending Overview */}
            <div className="mx-5 mt-6 pb-24">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-lg">Spending Overview</h2>
                <span className="bg-[var(--accent)] bg-opacity-20 text-[var(--accent)] text-xs font-medium px-2 py-1 rounded">This Week</span>
              </div>
              
              <div className="bg-[var(--bg-card)] rounded-xl p-4 flex flex-col items-center">
                <div className="relative w-[120px] h-[120px] mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="60" cy="60" r="50" stroke="#4B5563" strokeWidth="12" fill="transparent" strokeDasharray="31.4 314" strokeDashoffset="-282.6" />
                    <circle cx="60" cy="60" r="50" stroke="#F97316" strokeWidth="12" fill="transparent" strokeDasharray="62.8 314" strokeDashoffset="-219.8" />
                    <circle cx="60" cy="60" r="50" stroke="#3B82F6" strokeWidth="12" fill="transparent" strokeDasharray="94.2 314" strokeDashoffset="-125.6" />
                    <circle cx="60" cy="60" r="50" stroke="var(--accent)" strokeWidth="12" fill="transparent" strokeDasharray="125.6 314" />
                  </svg>
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                    <span className="text-sm font-bold leading-none">$198.99</span>
                    <span className="text-[8px] text-[var(--text-secondary)] mt-1">Spent this week</span>
                  </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span><span className="text-[var(--text-secondary)]">Food (40%)</span></div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span><span className="text-[var(--text-secondary)]">Shopping (30%)</span></div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500"></span><span className="text-[var(--text-secondary)]">Transport (20%)</span></div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-500"></span><span className="text-[var(--text-secondary)]">Other (10%)</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Bottom Navigation Bar */}
          <div className="fixed bottom-0 w-full max-w-[390px] h-20 bg-[var(--bg-secondary)] border-t border-[var(--border)] flex justify-around items-center z-50 rounded-t-2xl px-2 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
            {[
              { id: 'Home', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
              { id: 'Cards', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> },
              { id: 'Scan', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>, isRaised: true },
              { id: 'Analytics', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
              { id: 'Profile', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center justify-center cursor-pointer transition-colors ${tab.isRaised ? '-mt-6' : ''} ${activeTab === tab.id && !tab.isRaised ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
              >
                {tab.isRaised ? (
                  <div className="w-14 h-14 bg-[var(--accent)] text-[#000] rounded-full flex items-center justify-center shadow-lg border-4 border-[var(--bg-secondary)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  </div>
                ) : (
                  <>
                    {tab.icon}
                    <span className="text-[10px] font-medium mt-1">{tab.id}</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Variant Switcher */}
        <div className="fixed bottom-5 right-5 bg-[#222] p-2.5 rounded-full shadow-lg flex gap-2.5 z-[1000] border border-[#333]">
          {[
            { id: 'jade', bg: '#10B981' },
            { id: 'royal', bg: '#6366F1' },
            { id: 'copper', bg: '#F59E0B' }
          ].map(theme => (
            <button 
              key={theme.id}
              onClick={() => setActiveTheme(theme.id as Variant)}
              className={`w-[30px] h-[30px] rounded-full border-2 cursor-pointer transition-transform hover:scale-110 ${activeTheme === theme.id ? 'border-white scale-110' : 'border-transparent'}`}
              style={{ background: theme.bg }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
