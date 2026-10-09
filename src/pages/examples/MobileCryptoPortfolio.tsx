import { useState, useEffect } from 'react';

type Variant = 'amber' | 'cyan' | 'emerald';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#F59E0B': 'amber',
  '#06B6D4': 'cyan',
  '#10B981': 'emerald',
};

export function MobileCryptoPortfolio({ variant = 'amber' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  const [activeTimeframe, setActiveTimeframe] = useState<string>('1W');
  const [activeTab, setActiveTab] = useState<string>('Portfolio');

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('amber'); 
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

  const actionButtons = [
    { id: 'send', label: 'Send', path: 'M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25' },
    { id: 'receive', label: 'Receive', path: 'M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25' },
    { id: 'swap', label: 'Swap', path: 'M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5' },
    { id: 'buy', label: 'Buy', path: 'M12 4.5v15m7.5-7.5h-15' },
  ];

  const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  const assets = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: '$42,580', change: '+3.2%', isUp: true, color: '#F7931A', letter: 'B', sparkline: 'M0,15 L4,10 L8,12 L12,5 L16,8 L20,0' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: '$2,245', change: '+1.8%', isUp: true, color: '#627EEA', letter: 'E', sparkline: 'M0,12 L4,14 L8,8 L12,10 L16,4 L20,2' },
    { id: 'sol', name: 'Solana', symbol: 'SOL', price: '$98.50', change: '-2.1%', isUp: false, color: '#9945FF', letter: 'S', sparkline: 'M0,2 L4,8 L8,6 L12,12 L16,10 L20,15' },
    { id: 'ada', name: 'Cardano', symbol: 'ADA', price: '$0.58', change: '+5.4%', isUp: true, color: '#0033AD', letter: 'C', sparkline: 'M0,15 L5,8 L10,12 L15,4 L20,0' },
    { id: 'avax', name: 'Avalanche', symbol: 'AVAX', price: '$35.20', change: '-0.8%', isUp: false, color: '#E84142', letter: 'A', sparkline: 'M0,5 L5,8 L10,6 L15,12 L20,15' },
  ];

  const transactions = [
    { id: 1, type: 'Bought Bitcoin', date: 'Oct 14', amount: '+0.05 BTC', usd: '$2,129', isBuy: true, path: 'M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25' },
    { id: 2, type: 'Sold Ethereum', date: 'Oct 13', amount: '-1.2 ETH', usd: '$2,694', isBuy: false, path: 'M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25' },
    { id: 3, type: 'Bought Solana', date: 'Oct 12', amount: '+10 SOL', usd: '$985', isBuy: true, path: 'M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25' },
  ];

  const bottomTabs = [
    { id: 'Portfolio', path: 'M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z' },
    { id: 'Markets', path: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941' },
    { id: 'Trade', path: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99' },
    { id: 'Settings', path: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' }
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .crypto-wrapper {
          --accent: #F59E0B;
          --accent-hover: #D97706;
          --accent-light: rgba(245,158,11,0.1);
          --bg-primary: #0F0D08;
          --bg-secondary: #161410;
          --bg-card: #1E1C16;
          --border: #2A2820;
          --text-primary: #FFF8F0;
          --text-secondary: #AA9960;
          font-family: 'Inter', sans-serif;
        }
        .crypto-wrapper[data-theme="cyan"] {
          --accent: #06B6D4;
          --accent-hover: #0891B2;
          --accent-light: rgba(6,182,212,0.1);
          --bg-primary: #0A0E14;
          --bg-secondary: #111820;
          --bg-card: #1A2230;
          --border: #1E2E40;
          --text-primary: #F1F5F9;
          --text-secondary: #64748B;
        }
        .crypto-wrapper[data-theme="emerald"] {
          --accent: #10B981;
          --accent-hover: #059669;
          --accent-light: rgba(16,185,129,0.1);
          --bg-primary: #0A0F0C;
          --bg-secondary: #101A14;
          --bg-card: #162220;
          --border: #1E3A30;
          --text-primary: #F0FFF8;
          --text-secondary: #6BAA88;
        }
      `}</style>

      <div 
        className="crypto-wrapper min-h-screen bg-black flex justify-center text-[var(--text-primary)]"
        data-theme={activeTheme === 'amber' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col pb-24 overflow-x-hidden">
          
          {/* 1. Header */}
          <div className="px-5 pt-5 flex justify-between items-center z-10">
            <div className="font-bold text-xl">Portfolio</div>
            <div className="flex gap-4">
              <svg className="w-6 h-6 text-[var(--text-primary)] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <svg className="w-6 h-6 text-[var(--text-primary)] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          {/* 2. Total Balance */}
          <div className="px-5 mt-5 text-center">
            <div className="text-sm text-[var(--text-secondary)]">Total Balance</div>
            <div className="font-bold text-4xl mt-1">$48,352.80</div>
            <div className="mt-2 flex justify-center items-center gap-2">
              <svg className="w-4 h-4 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
              <span className="text-[#10B981] text-sm font-bold">+$2,341.50</span>
              <span className="text-[#10B981] text-sm">(+5.1%)</span>
            </div>
            
            <div className="mt-5 flex justify-center gap-4">
              {actionButtons.map(btn => (
                <div key={btn.id} className="flex flex-col items-center gap-1.5 cursor-pointer">
                  <div className="w-12 h-12 bg-[var(--bg-card)] border border-[var(--border)] rounded-full flex items-center justify-center hover:border-[var(--accent)] transition-colors">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d={btn.path} />
                    </svg>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">{btn.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Portfolio Chart */}
          <div className="mx-5 mt-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4">
            <div className="flex gap-3 mb-3">
              {timeframes.map(tf => (
                <div 
                  key={tf}
                  onClick={() => setActiveTimeframe(tf)}
                  className={`text-xs cursor-pointer pb-1 ${activeTimeframe === tf ? 'text-[var(--accent)] border-b-2 border-[var(--accent)] font-bold' : 'text-[var(--text-secondary)]'}`}
                >
                  {tf}
                </div>
              ))}
            </div>
            <div className="h-32 relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-t border-dashed border-[var(--border)] w-full"></div>
                <div className="border-t border-dashed border-[var(--border)] w-full"></div>
                <div className="border-t border-dashed border-[var(--border)] w-full"></div>
              </div>
              
              <div className="absolute inset-0 pointer-events-none pb-2 flex flex-col justify-between text-[10px] text-[var(--text-secondary)] right-0 text-right">
                <span>$52K</span>
                <span>$48K</span>
                <span>$44K</span>
              </div>
              
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,80 Q10,70 20,60 T40,50 T60,30 T80,40 T100,10 L100,100 L0,100 Z" fill="url(#chart-gradient)" />
                <polyline 
                  points="0,80 20,60 40,50 60,30 80,40 100,10" 
                  fill="none" 
                  stroke="var(--accent)" 
                  strokeWidth="2" 
                />
              </svg>
            </div>
          </div>

          {/* 4. Your Assets */}
          <div className="px-5 mt-5">
            <div className="flex justify-between items-end">
              <div className="font-bold text-base">Your Assets</div>
              <div className="text-[var(--accent)] text-xs cursor-pointer font-medium">See All</div>
            </div>
            
            <div className="mt-3 space-y-2">
              {assets.map(asset => (
                <div key={asset.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3 flex items-center cursor-pointer hover:border-[var(--accent)] transition-colors">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-base text-white"
                    style={{ backgroundColor: asset.color }}
                  >
                    {asset.letter}
                  </div>
                  
                  <div className="flex-1 ml-3">
                    <div className="font-bold text-sm">{asset.name}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{asset.symbol}</div>
                  </div>
                  
                  <div className="w-16 h-6 ml-2 mr-4 hidden sm:block md:block">
                     <svg className="w-full h-full" viewBox="0 0 20 15" preserveAspectRatio="none">
                       <path 
                         d={asset.sparkline} 
                         fill="none" 
                         stroke={asset.isUp ? '#10B981' : '#EF4444'} 
                         strokeWidth="1.5" 
                       />
                     </svg>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-sm">{asset.price}</div>
                    <div className={`text-xs ${asset.isUp ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                      {asset.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Recent Transactions */}
          <div className="px-5 mt-5 pb-24">
            <div className="font-bold text-base">Recent</div>
            
            <div className="mt-3 space-y-2">
              {transactions.map(tx => (
                <div key={tx.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3 flex items-center cursor-pointer hover:border-[var(--accent)] transition-colors">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${tx.isBuy ? 'bg-[#10B981]/20' : 'bg-[#EF4444]/20'}`}>
                    <svg className={`w-5 h-5 ${tx.isBuy ? 'text-[#10B981]' : 'text-[#EF4444]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={tx.path} />
                    </svg>
                  </div>
                  
                  <div className="flex-1 ml-3">
                    <div className="font-bold text-sm">{tx.type}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{tx.date}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-sm">{tx.amount}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{tx.usd}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Bottom Nav */}
          <div className="fixed bottom-0 w-full max-w-[390px] bg-[var(--bg-primary)]/95 backdrop-blur border-t border-[var(--border)] z-50">
            <div className="flex justify-around items-center h-16 pb-2">
              {bottomTabs.map(tab => (
                <div 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1 w-16 h-full cursor-pointer transition-colors ${activeTab === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={tab.path} />
                    {tab.id === 'Portfolio' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                    )}
                  </svg>
                  <span className="text-[10px] font-medium">{tab.id}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
