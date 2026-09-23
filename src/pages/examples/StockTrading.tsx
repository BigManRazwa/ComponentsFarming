import { useState, useEffect } from 'react';

type Variant = 'green' | 'blue' | 'amber';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#22C55E': 'green',
  '#3B82F6': 'blue',
  '#F59E0B': 'amber',
};

export function StockTrading({ variant = 'green' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState('Portfolio');
  const [buyMode, setBuyMode] = useState<'buy'|'sell'>('buy');
  const [orderType, setOrderType] = useState<'market'|'limit'>('market');
  const [shares, setShares] = useState('100');
  const [activeTimeRange, setActiveTimeRange] = useState('1D');

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

  const topTabs = ['Portfolio', 'Markets', 'Watchlist', 'News'];
  const timeRanges = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  const holdings = [
    { ticker: 'AAPL', price: '$178.42', change: '+2.34%', amount: '$83,080', pnl: '+23.00%', isPositive: true },
    { ticker: 'GOOGL', price: '$124.25', change: '+2.36%', amount: '$73.78', pnl: '+10.00%', isPositive: true },
    { ticker: 'TSLA', price: '$13.00', change: '-3.39%', amount: '$234.53', pnl: '-0.00%', isPositive: false },
    { ticker: 'MSFT', price: '$79.50', change: '+1.57%', amount: '$81.25', pnl: '+10.00%', isPositive: true },
    { ticker: 'NVDA', price: '$170.43', change: '+2.34%', amount: '$28.28', pnl: '+6.58%', isPositive: true },
  ];

  const watchlist = [
    { ticker: 'AAPL', company: 'Apple', price: '$178.42', change: '+2.34%', isPositive: true },
    { ticker: 'GOOGL', company: 'Alphabet', price: '$124.25', change: '+2.36%', isPositive: true },
    { ticker: 'TSLA', company: 'Tesla', price: '$13.00', change: '-3.39%', isPositive: false },
    { ticker: 'MSFT', company: 'Microsoft', price: '$79.05', change: '+1.57%', isPositive: true },
    { ticker: 'AMZN', company: 'Amazon', price: '$26.50', change: '-0.78%', isPositive: false },
    { ticker: 'NVDA', company: 'Nvidia', price: '$170.43', change: '+2.34%', isPositive: true },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .trading-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .trading-wrapper[data-theme="green"] {
          --accent: #22C55E;
          --accent-hover: #16A34A;
          --accent-light: rgba(34,197,94,0.1);
          --red: #EF4444;
          --bg-primary: #0A0E14;
          --bg-secondary: #111820;
          --bg-card: #1A2230;
          --border: #1E2E40;
          --text-primary: #F1F5F9;
          --text-secondary: #64748B;
        }
        .trading-wrapper[data-theme="blue"] {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-light: rgba(59,130,246,0.1);
          --red: #EF4444;
          --bg-primary: #0C1220;
          --bg-secondary: #111828;
          --bg-card: #1A2236;
          --border: #1E2E42;
          --text-primary: #F1F5F9;
          --text-secondary: #64748B;
        }
        .trading-wrapper[data-theme="amber"] {
          --accent: #F59E0B;
          --accent-hover: #D97706;
          --accent-light: rgba(245,158,11,0.1);
          --red: #EF4444;
          --bg-primary: #0F0D08;
          --bg-secondary: #161410;
          --bg-card: #1E1C16;
          --border: #2A2820;
          --text-primary: #FFF8F0;
          --text-secondary: #AA9960;
        }
      `}</style>

      <div 
        className="trading-wrapper flex flex-col h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]"
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* Top Nav */}
        <div className="bg-[var(--bg-secondary)] border-b border-[var(--border)] px-6 h-14 flex items-center shrink-0">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h2.25l2.25-9 4.5 16.5 3-12h4.5" />
            </svg>
            <span className="font-bold text-lg text-[var(--accent)]">TradeX</span>
          </div>

          <div className="flex gap-1 ml-8">
            {topTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                  activeTab === tab ? 'bg-[var(--bg-card)] font-medium' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-4">
            <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] font-bold text-sm">
                SH
              </div>
              <span className="text-sm font-medium">Shavson</span>
              <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Left Panel */}
          <div className="w-[280px] bg-[var(--bg-secondary)] border-r border-[var(--border)] p-4 flex flex-col shrink-0">
            {/* Order Form */}
            <div className="flex rounded-lg overflow-hidden bg-[var(--bg-card)] mb-3">
              <button 
                onClick={() => setBuyMode('buy')}
                className={`flex-1 py-2.5 text-center font-semibold text-sm cursor-pointer transition-colors ${
                  buyMode === 'buy' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Buy
              </button>
              <button 
                onClick={() => setBuyMode('sell')}
                className={`flex-1 py-2.5 text-center font-semibold text-sm cursor-pointer transition-colors ${
                  buyMode === 'sell' ? 'bg-[var(--bg-card)] text-[var(--text-primary)] border-b-2 border-transparent' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Sell
              </button>
            </div>

            <div className="flex gap-1 mb-3">
              <button 
                onClick={() => setOrderType('market')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                  orderType === 'market' ? 'bg-[var(--bg-card)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Market
              </button>
              <button 
                onClick={() => setOrderType('limit')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                  orderType === 'limit' ? 'bg-[var(--bg-card)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Limit
              </button>
            </div>

            <div className="mb-3">
              <label className="block text-xs text-[var(--text-secondary)] mb-1">Shares</label>
              <input 
                type="number"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] transition-colors text-[var(--text-primary)]"
              />
            </div>

            <div className="flex justify-between items-center text-sm mb-4">
              <span className="text-[var(--text-secondary)]">Estimated cost</span>
              <span className="font-bold">$17,842</span>
            </div>

            <button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl py-3 font-bold text-sm cursor-pointer transition-colors">
              Place Order
            </button>

            <div className="my-4 border-b border-[var(--border)] w-full h-px"></div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Available</span>
                <span className="font-medium">$45,230</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Buying Power</span>
                <span className="font-medium">$90,460</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Open Orders</span>
                <span className="font-medium">2</span>
              </div>
            </div>
          </div>

          {/* Center Content */}
          <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] pb-6">
            
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <h1 className="font-bold text-2xl">AAPL</h1>
                  <span className="text-[var(--text-secondary)] text-sm">Apple Inc.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-3xl">$178.42</span>
                  <span className="bg-[var(--accent-light)] text-[var(--accent)] rounded-full px-3 py-1 text-sm font-medium">
                    +$4.08 (+2.34%)
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6 flex gap-2">
              {timeRanges.map(tr => (
                <button
                  key={tr}
                  onClick={() => setActiveTimeRange(tr)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    activeTimeRange === tr ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
                  }`}
                >
                  {tr}
                </button>
              ))}
            </div>

            {/* Chart Area */}
            <div className="mx-6 mt-3 h-[280px] bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 relative flex flex-col">
              <div className="flex-1 relative">
                {/* SVG Chart */}
                <svg viewBox="0 0 800 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  {[0, 40, 80, 120, 160, 200].map(y => (
                    <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
                  ))}

                  <polygon 
                    points="0,200 0,160 100,150 200,120 300,140 400,90 500,110 600,60 700,70 800,20 800,200"
                    fill="url(#chartGradient)"
                  />
                  <polyline 
                    points="0,160 100,150 200,120 300,140 400,90 500,110 600,60 700,70 800,20"
                    fill="none" 
                    stroke="var(--accent)" 
                    strokeWidth="2.5"
                  />
                  
                  {/* Hover Crosshair (static for visual) */}
                  <line x1="600" y1="0" x2="600" y2="200" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="600" cy="60" r="4" fill="var(--bg-card)" stroke="var(--accent)" strokeWidth="2" />
                </svg>
              </div>

              {/* Y-axis Labels */}
              <div className="absolute right-4 top-4 bottom-4 flex flex-col justify-between text-xs text-[var(--text-secondary)] pointer-events-none">
                <span>180.00</span>
                <span>175.00</span>
                <span>170.00</span>
                <span>165.00</span>
                <span>160.00</span>
                <span>155.00</span>
              </div>

              {/* Current Price Label */}
              <div className="absolute right-12 top-[60px] bg-[var(--accent)] text-white text-xs px-2 py-0.5 rounded font-medium shadow-md">
                $176.42
              </div>
            </div>

            {/* Volume Bars */}
            <div className="mx-6 mt-2 h-12 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-2 flex items-end gap-px">
              {Array.from({ length: 48 }).map((_, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-[var(--accent)] opacity-40 rounded-t-sm"
                  style={{ height: `${20 + Math.random() * 80}%` }}
                ></div>
              ))}
            </div>

            {/* Portfolio Summary */}
            <div className="px-6 mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
                <div className="text-xs text-[var(--text-secondary)] mb-1">Total Value</div>
                <div className="font-bold text-xl mb-2">$124,580</div>
                <div className="h-6 w-full">
                  <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
                    <polyline points="0,20 20,15 40,18 60,10 80,12 100,2" fill="none" stroke="var(--accent)" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
                <div className="text-xs text-[var(--text-secondary)] mb-1">Today's P&L</div>
                <div className="font-bold text-xl text-[var(--accent)] mb-1">+$2,340</div>
                <div className="text-xs text-[var(--accent)] font-medium">+1.88%</div>
              </div>
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
                <div className="text-xs text-[var(--text-secondary)] mb-1">Total Return</div>
                <div className="font-bold text-xl text-[var(--accent)] mb-1">+18.4%</div>
                <div className="text-xs text-[var(--text-secondary)]">Since Jan 2023</div>
              </div>
            </div>

            {/* Holdings Table */}
            <div className="px-6 mt-4 pb-4">
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
                    <tr>
                      <th className="py-3 px-4 font-medium text-xs uppercase text-[var(--text-secondary)]">Holding</th>
                      <th className="py-3 px-4 font-medium text-xs uppercase text-[var(--text-secondary)]">Price</th>
                      <th className="py-3 px-4 font-medium text-xs uppercase text-[var(--text-secondary)]">Change</th>
                      <th className="py-3 px-4 font-medium text-xs uppercase text-[var(--text-secondary)]">Amount</th>
                      <th className="py-3 px-4 font-medium text-xs uppercase text-[var(--text-secondary)]">P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((h, i) => (
                      <tr key={i} className="border-b border-[var(--border)]/50 last:border-0 hover:bg-[var(--bg-primary)] transition-colors cursor-pointer">
                        <td className="py-3 px-4 font-bold">{h.ticker}</td>
                        <td className="py-3 px-4">{h.price}</td>
                        <td className={`py-3 px-4 font-medium ${h.isPositive ? 'text-[#22C55E]' : 'text-[var(--red)]'}`}>{h.change}</td>
                        <td className="py-3 px-4">{h.amount}</td>
                        <td className={`py-3 px-4 font-medium ${h.isPositive ? 'text-[#22C55E]' : 'text-[var(--red)]'}`}>{h.pnl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Panel */}
          <div className="w-[240px] bg-[var(--bg-secondary)] border-l border-[var(--border)] p-4 overflow-y-auto shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-sm">Watchlist</h2>
              <button className="w-6 h-6 rounded-full hover:bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col">
              {watchlist.map((item, i) => (
                <div key={i} className="py-3 border-b border-[var(--border)]/50 last:border-0 cursor-pointer hover:bg-[var(--bg-card)]/50 transition-colors flex items-center justify-between group rounded px-2 -mx-2">
                  <div>
                    <div className="font-bold text-sm">{item.ticker}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{item.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{item.price}</div>
                    <div className={`text-[10px] font-bold rounded-full px-2 py-0.5 mt-0.5 inline-block ${
                      item.isPositive ? 'bg-[#22C55E]/20 text-[#22C55E]' : 'bg-[var(--red)]/20 text-[var(--red)]'
                    }`}>
                      {item.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
