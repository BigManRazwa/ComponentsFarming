import { useState, useEffect } from 'react';

export function MobileCryptoWallet({ variant = 'green' }: { variant?: 'green' | 'blue' | 'gold' }) {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    window.postMessage({ type: 'customFont', font: 'Inter' }, '*');
  }, []);

  const themes = {
    green: {
      '--accent': '#22C55E',
      '--accent-hover': '#16A34A',
      '--accent-light': 'rgba(34,197,94,0.12)',
      '--positive': '#22C55E',
      '--negative': '#EF4444',
      '--bg-primary': '#0A0A0A',
      '--bg-secondary': '#141414',
      '--bg-card': '#1A1A1A',
      '--border': '#262626',
      '--text-primary': '#FAFAFA',
      '--text-secondary': '#737373',
    },
    blue: {
      '--accent': '#3B82F6',
      '--accent-hover': '#2563EB',
      '--accent-light': 'rgba(59,130,246,0.12)',
      '--positive': '#22C55E',
      '--negative': '#EF4444',
      '--bg-primary': '#080C14',
      '--bg-secondary': '#0E1420',
      '--bg-card': '#141E2A',
      '--border': '#1E2A3A',
      '--text-primary': '#F1F5F9',
      '--text-secondary': '#64748B',
    },
    gold: {
      '--accent': '#F59E0B',
      '--accent-hover': '#D97706',
      '--accent-light': 'rgba(245,158,11,0.12)',
      '--positive': '#22C55E',
      '--negative': '#EF4444',
      '--bg-primary': '#0C0A05',
      '--bg-secondary': '#14100A',
      '--bg-card': '#1A1610',
      '--border': '#2A2418',
      '--text-primary': '#FFF8E8',
      '--text-secondary': '#AA9960',
    }
  };

  const themeStyle = themes[variant] as React.CSSProperties;

  return (
    <div className="crypto-wrapper w-full min-h-screen bg-[#050505] flex items-center justify-center p-4 sm:p-8 font-sans">
      <div 
        style={themeStyle}
        className="w-full max-w-[390px] h-[844px] bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden flex flex-col shadow-2xl rounded-[40px] border-[8px] border-black ring-1 ring-white/10"
      >
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden pb-24">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-6 pb-2">
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="font-bold tracking-wide text-lg">CoinVault</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative cursor-pointer">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[var(--accent)] border-2 border-[var(--bg-primary)] rounded-full"></div>
              </div>
              <div className="w-7 h-7 rounded-full bg-[var(--accent-light)] flex items-center justify-center cursor-pointer border border-[var(--border)] overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=Crypto${variant}&backgroundColor=transparent`} alt="User avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Portfolio Card */}
          <div className="mx-5 mt-4 bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] p-5 relative overflow-hidden group hover:border-[var(--accent)] transition-colors duration-300">
            <div className="flex items-center justify-between mb-1 relative z-10">
              <span className="text-xs text-[var(--text-secondary)] font-medium">My Portfolio</span>
              <div className="flex items-center gap-1 bg-[var(--bg-secondary)] px-2 py-1 rounded text-[10px] text-[var(--text-secondary)] cursor-pointer hover:bg-[var(--accent-light)] hover:text-[var(--accent)] transition-colors">
                24h
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-black mb-1 tracking-tight relative z-10">$24,582.40</div>
            <div className="flex items-center gap-1 text-[var(--positive)] font-semibold text-sm relative z-10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 15-6-6-6 6"/>
              </svg>
              <span>$763.15 (+3.2%)</span>
            </div>
            
            {/* SVG Mini Chart */}
            <div className="h-16 mt-3 -mx-5 -mb-5 relative opacity-80 group-hover:opacity-100 transition-opacity">
              <svg width="100%" height="100%" viewBox="0 0 300 64" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`chartGradient-${variant}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points="0,64 0,55 50,48 100,56 150,35 200,42 250,20 300,12 300,64" fill={`url(#chartGradient-${variant})`} />
                <polyline points="0,55 50,48 100,56 150,35 200,42 250,20 300,12" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-5 mt-5 grid grid-cols-4 gap-3">
            {[
              { paths: ['m5 12 7-7 7 7','M12 19V5'], label: 'Send' },
              { paths: ['m19 12-7 7-7-7','M12 5v14'], label: 'Receive' },
              { paths: ['M16 3h5v5','M4 20L21 3','M21 16v5h-5','M15 15l6 6','M4 4l5 5'], label: 'Swap' },
              { paths: ['M5 12h14','M12 5v14'], label: 'Buy' },
            ].map((action, i) => (
              <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl py-3 flex flex-col items-center gap-2 cursor-pointer hover:bg-[var(--accent-light)] hover:border-[var(--accent)] transition-all">
                <div className="w-9 h-9 rounded-full bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {action.paths.map((d: string, j: number) => <path key={j} d={d} />)}
                  </svg>
                </div>
                <span className="text-xs font-medium">{action.label}</span>
              </div>
            ))}
          </div>

          {/* Assets */}
          <div className="px-5 mt-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg">Your Assets</h2>
              <span className="text-sm font-medium text-[var(--accent)] cursor-pointer hover:text-[var(--accent-hover)]">See All</span>
            </div>
            
            <div className="space-y-2">
              {[
                { initial: 'B', name: 'Bitcoin', ticker: 'BTC', price: '$42,150.75', change: '+2.1%', isUp: true, color: '#F7931A', bg: 'rgba(247, 147, 26, 0.15)', sparkline: '0,24 16,18 32,20 48,12 64,8' },
                { initial: 'E', name: 'Ethereum', ticker: 'ETH', price: '$2,283.60', change: '+4.5%', isUp: true, color: '#627EEA', bg: 'rgba(98, 126, 234, 0.15)', sparkline: '0,28 16,22 32,24 48,16 64,6' },
                { initial: 'S', name: 'Solana', ticker: 'SOL', price: '$98.42', change: '-1.2%', isUp: false, color: '#14F195', bg: 'rgba(20, 241, 149, 0.15)', sparkline: '0,8 16,14 32,12 48,22 64,26' },
                { initial: 'A', name: 'Cardano', ticker: 'ADA', price: '$0.58', change: '+6.8%', isUp: true, color: '#0033AD', bg: 'rgba(0, 51, 173, 0.15)', sparkline: '0,26 16,16 32,20 48,10 64,4' },
              ].map((asset, i) => (
                <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 flex items-center cursor-pointer hover:border-[var(--text-secondary)] transition-colors">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white shrink-0" style={{ backgroundColor: asset.color }}>
                    {asset.initial}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="font-bold text-sm leading-tight">{asset.name}</div>
                    <div className="text-xs text-[var(--text-secondary)] mt-0.5">{asset.ticker}</div>
                  </div>
                  
                  {/* Sparkline */}
                  <div className="w-16 h-8 mx-2 shrink-0">
                    <svg width="100%" height="100%" viewBox="0 0 64 32" preserveAspectRatio="none">
                      <polyline 
                        points={asset.sparkline} 
                        fill="none" 
                        stroke={asset.isUp ? 'var(--positive)' : 'var(--negative)'} 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <div className="font-bold text-sm leading-tight">{asset.price}</div>
                    <div className={`text-xs mt-0.5 font-medium ${asset.isUp ? 'text-[var(--positive)]' : 'text-[var(--negative)]'}`}>
                      {asset.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Watchlist */}
          <div className="pl-5 mt-6">
            <div className="flex items-center justify-between mb-3 pr-5">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg">Watchlist</h2>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-[var(--accent)] cursor-pointer hover:text-[var(--accent-hover)]">Edit</span>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-4 pr-5 [&::-webkit-scrollbar]:hidden">
              {[
                { initial: 'D', ticker: 'DOGE', change: '+5.2%', isUp: true, color: '#C2A633' },
                { initial: 'M', ticker: 'MATIC', change: '-0.8%', isUp: false, color: '#8247E5' },
                { initial: 'L', ticker: 'LINK', change: '+3.1%', isUp: true, color: '#2A5ADA' },
              ].map((coin, i) => (
                <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3 min-w-[120px] flex flex-col cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white" style={{ backgroundColor: coin.color }}>
                      {coin.initial}
                    </div>
                    <span className="font-bold text-sm">{coin.ticker}</span>
                  </div>
                  <div className={`text-xs font-medium ${coin.isUp ? 'text-[var(--positive)]' : 'text-[var(--negative)]'}`}>
                    {coin.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="px-5 mt-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg">Recent Transactions</h2>
              <span className="text-sm font-medium text-[var(--accent)] cursor-pointer hover:text-[var(--accent-hover)]">View All</span>
            </div>
            
            <div className="space-y-2">
              {[
                { type: 'Received', coin: 'Bitcoin', amount: '+0.051 BTC', time: '11:15 AM', isPos: true, paths: ['m19 12-7 7-7-7','M12 5v14'], iconColor: 'text-[var(--positive)]', iconBg: 'bg-[var(--positive)]/10' },
                { type: 'Bought', coin: 'Ethereum', amount: '0.23 ETH', time: '10:32 AM', isPos: true, paths: ['M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'], iconColor: 'text-blue-500', iconBg: 'bg-blue-500/10' },
                { type: 'Swapped', coin: 'ETH → SOL', amount: '1.5 SOL', time: '9:55 AM', isPos: true, paths: ['M16 3h5v5','M4 20L21 3','M21 16v5h-5','M15 15l6 6','M4 4l5 5'], iconColor: 'text-purple-500', iconBg: 'bg-purple-500/10' },
                { type: 'Sold', coin: 'Solana', amount: '-1.5 SOL', time: '9:02 AM', isPos: false, paths: ['m5 12 7-7 7 7','M12 19V5'], iconColor: 'text-[var(--negative)]', iconBg: 'bg-[var(--negative)]/10' },
              ].map((tx, i) => (
                <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-[var(--text-secondary)] transition-colors">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${tx.iconBg} ${tx.iconColor}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {tx.paths.map((d, j) => <path key={j} d={d} />)}
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm leading-tight">{tx.type}</div>
                    <div className="text-xs text-[var(--text-secondary)] mt-0.5">{tx.coin}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold text-sm leading-tight ${tx.isPos ? 'text-[var(--text-primary)]' : 'text-[var(--negative)]'}`}>{tx.amount}</div>
                    <div className="text-xs text-[var(--text-secondary)] mt-0.5">{tx.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Overview */}
          <div className="mx-5 mt-6 mb-8">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
              <h3 className="font-bold text-sm mb-2">Market Overview</h3>
              <div className="flex flex-col">
                {[
                  { label: 'Market Cap', value: '$1.82T' },
                  { label: '24h Volume', value: '$89.4B' },
                  { label: 'BTC Dominance', value: '52.3%' }
                ].map((stat, i, arr) => (
                  <div key={i} className={`flex justify-between items-center py-2 ${i !== arr.length - 1 ? 'border-b border-[var(--border)]' : ''}`}>
                    <span className="text-xs text-[var(--text-secondary)] font-medium">{stat.label}</span>
                    <span className="font-bold text-sm">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-[var(--bg-primary)]/95 backdrop-blur-md border-t border-[var(--border)] flex items-center justify-between px-6 pb-4 pt-2 z-50">
          {[
            { id: 'home', paths: ['m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'], label: 'Home' },
            { id: 'markets', paths: ['M18 20V10','M12 20V4','M6 20v-4'], label: 'Markets' },
            { id: 'trade', paths: ['M16 3h5v5','M4 20L21 3','M21 16v5h-5'], label: 'Trade' },
            { id: 'wallet', paths: ['M21 12V7H5a2 2 0 0 1 0-4h14v4','M3 5v14a2 2 0 0 0 2 2h16v-5','M18 12a2 2 0 0 0 0 4h4v-4z'], label: 'Wallet' },
            { id: 'settings', paths: ['M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z','M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'], label: 'Settings' },
          ].map((tab) => (
            <div 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${activeTab === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={activeTab === tab.id ? 'scale-110 transition-transform' : ''}>
                {tab.paths.map((d, j) => <path key={j} d={d} />)}
              </svg>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
