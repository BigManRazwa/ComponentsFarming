import { useState, useEffect } from 'react';

type Variant = 'cyan' | 'violet' | 'lime';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#06B6D4': 'cyan',
  '#8B5CF6': 'violet',
  '#84CC16': 'lime',
};

export function AnalyticsDashboard({ variant = 'cyan' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  
  const [activePage, setActivePage] = useState('Dashboard');
  const [activeTimeRange, setActiveTimeRange] = useState('6M');

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('cyan'); 
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

  const navItems = [
    { name: 'Dashboard', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg> },
    { name: 'Reports', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg> },
    { name: 'Data Sources', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg> },
    { name: 'Alerts', icon: <div className="relative"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg><span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span></div> },
    { name: 'Team', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg> },
    { name: 'Settings', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .analytics-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .analytics-wrapper[data-theme="cyan"] {
          --accent: #06B6D4;
          --accent-hover: #0891B2;
          --accent-light: rgba(6,182,212,0.12);
          --bg-primary: #0A0F14;
          --bg-secondary: #111820;
          --bg-card: #161E28;
          --border: #1E2A36;
          --text-primary: #F1F5F9;
          --text-secondary: #64748B;
        }
        .analytics-wrapper[data-theme="violet"] {
          --accent: #8B5CF6;
          --accent-hover: #7C3AED;
          --accent-light: rgba(139,92,246,0.12);
          --bg-primary: #0C0A14;
          --bg-secondary: #141020;
          --bg-card: #1A1428;
          --border: #241E36;
          --text-primary: #F1F0FF;
          --text-secondary: #7C72A8;
        }
        .analytics-wrapper[data-theme="lime"] {
          --accent: #84CC16;
          --accent-hover: #65A30D;
          --accent-light: rgba(132,204,22,0.12);
          --bg-primary: #0A0F08;
          --bg-secondary: #111810;
          --bg-card: #162018;
          --border: #1E2A1A;
          --text-primary: #F5FFF0;
          --text-secondary: #6A8860;
        }
      `}</style>

      <div 
        className="analytics-wrapper min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]" 
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* 1. Sidebar */}
        <div className="fixed top-0 left-0 w-56 h-screen bg-[var(--bg-secondary)] border-r border-[var(--border)] py-4 flex flex-col z-50">
          <div className="px-6 mb-8 flex items-center gap-2">
            <svg className="w-8 h-8 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l3-9 5 18 3-9h3" />
            </svg>
            <span className="font-bold text-lg">DataPulse</span>
          </div>

          <div className="px-3 flex-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => setActivePage(item.name)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 cursor-pointer transition-colors ${
                  activePage === item.name
                    ? 'bg-[var(--accent)]/10 text-[var(--accent)] font-medium'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item.icon}
                {item.name}
              </div>
            ))}
          </div>

          <div className="px-6 mt-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center font-bold">
                SC
              </div>
              <div>
                <div className="text-sm font-semibold">Sarah Chen</div>
                <div className="text-xs text-[var(--text-secondary)]">Data Analyst</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Top Bar */}
        <div className="ml-56 sticky top-0 h-16 bg-[var(--bg-primary)]/90 backdrop-blur border-b border-[var(--border)] z-40 px-6 py-3 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h1 className="font-bold text-xl">Dashboard</h1>
            <span className="text-[var(--text-secondary)] text-sm">Overview</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-sm">
              <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Jan 1 - Jun 30, 2025</span>
            </div>
            <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* 3. KPI Stats */}
        <div className="ml-56 px-6 pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: '2.4M', change: '+12%', isPositive: true, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
            { label: 'Revenue', value: '$847K', change: '+8.3%', isPositive: true, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
            { label: 'Conversion Rate', value: '4.2%', change: '-0.5%', isPositive: false, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
            { label: 'Active Sessions', value: '18.5K', change: '+15%', isPositive: true, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg> },
          ].map((stat, i) => (
            <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="w-[36px] h-[36px] rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className={`text-xs font-semibold px-2 py-1 rounded-md ${stat.isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {stat.change}
                </div>
              </div>
              <div className="text-[var(--text-secondary)] text-sm mb-1">{stat.label}</div>
              <div className="font-bold text-2xl">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* 4. Main Content */}
        <div className="ml-56 px-6 py-4 grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">
          
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            
            {/* Traffic Chart */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-bold text-lg">Website Traffic</h2>
                  <p className="text-[var(--text-secondary)] text-sm">Last 6 months</p>
                </div>
                <div className="flex bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-1">
                  {['6M', '1Y', 'All'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTimeRange(tab)}
                      className={`px-3 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                        activeTimeRange === tab ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-64 w-full relative mb-4">
                <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  {[0, 50, 100, 150, 200].map(y => (
                    <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
                  ))}
                  
                  {/* Y-axis Labels */}
                  <text x="-10" y="200" fill="var(--text-secondary)" fontSize="12" textAnchor="end" alignmentBaseline="middle">0</text>
                  <text x="-10" y="150" fill="var(--text-secondary)" fontSize="12" textAnchor="end" alignmentBaseline="middle">40K</text>
                  <text x="-10" y="100" fill="var(--text-secondary)" fontSize="12" textAnchor="end" alignmentBaseline="middle">80K</text>
                  <text x="-10" y="50" fill="var(--text-secondary)" fontSize="12" textAnchor="end" alignmentBaseline="middle">120K</text>
                  <text x="-10" y="0" fill="var(--text-secondary)" fontSize="12" textAnchor="end" alignmentBaseline="middle">160K</text>

                  {/* Chart Line & Area (Data: Jan:40K, Feb:52K, Mar:48K, Apr:75K, May:62K, Jun:95K) 
                      Mapped Y: 40K -> 150, 52K -> 135, 48K -> 140, 75K -> 106.25, 62K -> 122.5, 95K -> 81.25
                      Mapped X: 0, 120, 240, 360, 480, 600
                  */}
                  <polygon 
                    points="0,200 0,150 120,135 240,140 360,106.25 480,122.5 600,81.25 600,200"
                    fill="url(#areaGradient)"
                  />
                  <polyline 
                    points="0,150 120,135 240,140 360,106.25 480,122.5 600,81.25"
                    fill="none" 
                    stroke="var(--accent)" 
                    strokeWidth="3"
                  />
                  
                  {/* Data Points */}
                  {[
                    { x: 0, y: 150 }, { x: 120, y: 135 }, { x: 240, y: 140 },
                    { x: 360, y: 106.25 }, { x: 480, y: 122.5 }, { x: 600, y: 81.25 }
                  ].map((pt, i) => (
                    <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="var(--bg-card)" stroke="var(--accent)" strokeWidth="2" />
                  ))}

                  {/* X-axis Labels */}
                  <text x="0" y="220" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">Jan</text>
                  <text x="120" y="220" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">Feb</text>
                  <text x="240" y="220" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">Mar</text>
                  <text x="360" y="220" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">Apr</text>
                  <text x="480" y="220" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">May</text>
                  <text x="600" y="220" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">Jun</text>
                </svg>
              </div>
              
              <div className="flex items-center gap-6 mt-6 border-t border-[var(--border)] pt-4">
                <div>
                  <span className="text-[var(--text-secondary)] text-sm mr-2">Peak:</span>
                  <span className="font-bold">95K</span>
                </div>
                <div>
                  <span className="text-[var(--text-secondary)] text-sm mr-2">Avg:</span>
                  <span className="font-bold">62K</span>
                </div>
                <div>
                  <span className="text-[var(--text-secondary)] text-sm mr-2">Growth:</span>
                  <span className="font-bold text-green-500">+34%</span>
                </div>
              </div>
            </div>

            {/* Revenue by Channel + Traffic Sources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              
              {/* Left Card */}
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
                <h2 className="font-bold text-lg mb-6">Revenue by Channel</h2>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Direct', value: '$340K', pct: 40, opacity: 1 },
                    { label: 'Organic', value: '$255K', pct: 30, opacity: 0.8 },
                    { label: 'Paid', value: '$170K', pct: 20, opacity: 0.6 },
                    { label: 'Social', value: '$52K', pct: 6, opacity: 0.4 },
                    { label: 'Referral', value: '$30K', pct: 4, opacity: 0.2 },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-20 text-sm text-[var(--text-secondary)]">{row.label}</div>
                      <div className="flex-1 h-6 bg-[var(--bg-primary)] rounded overflow-hidden">
                        <div className="h-full bg-[var(--accent)] rounded" style={{ width: `${row.pct}%`, opacity: row.opacity }}></div>
                      </div>
                      <div className="w-16 text-right font-medium text-sm">{row.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Card */}
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 flex flex-col items-center justify-center">
                <h2 className="font-bold text-lg mb-6 w-full">Traffic Sources</h2>
                
                {/* 120px Donut Chart SVG */}
                <div className="relative w-[120px] h-[120px] mb-6">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {/* Circle Math: C = 2 * PI * r = 2 * 3.14159 * 40 ≈ 251.3 */}
                    {/* Direct 42% -> 105.5 */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent)" strokeWidth="20" strokeDasharray="105.5 251.3" />
                    {/* Organic 28% -> 70.3 */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#22C55E" strokeWidth="20" strokeDasharray="70.3 251.3" strokeDashoffset="-105.5" />
                    {/* Social 18% -> 45.2 */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#A855F7" strokeWidth="20" strokeDasharray="45.2 251.3" strokeDashoffset="-175.8" />
                    {/* Referral 12% -> 30.1 */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#F59E0B" strokeWidth="20" strokeDasharray="30.1 251.3" strokeDashoffset="-221" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-bold">100%</div>
                </div>

                <div className="w-full grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]"></span>
                    <span className="text-[var(--text-secondary)]">Direct (42%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></span>
                    <span className="text-[var(--text-secondary)]">Organic (28%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7]"></span>
                    <span className="text-[var(--text-secondary)]">Social (18%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                    <span className="text-[var(--text-secondary)]">Referral (12%)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Pages Table */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Top Pages</h2>
                <button className="text-[var(--accent)] text-sm font-medium hover:underline cursor-pointer">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-[var(--text-secondary)] border-b border-[var(--border)]">
                    <tr>
                      <th className="pb-3 font-medium">Page URL</th>
                      <th className="pb-3 font-medium">Visitors</th>
                      <th className="pb-3 font-medium">Bounce Rate</th>
                      <th className="pb-3 font-medium">Avg Duration</th>
                      <th className="pb-3 font-medium">Conversions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { url: '/home', vis: '12,409', bounce: '40.7%', dur: '02:45', conv: '89' },
                      { url: '/pricing', vis: '8,201', bounce: '35.2%', dur: '03:15', conv: '124' },
                      { url: '/blog/ai-trends', vis: '6,188', bounce: '52.8%', dur: '04:20', conv: '45' },
                      { url: '/features', vis: '5,432', bounce: '38.1%', dur: '02:58', conv: '67' },
                      { url: '/docs', vis: '4,891', bounce: '28.4%', dur: '06:12', conv: '38' },
                      { url: '/about', vis: '3,127', bounce: '45.6%', dur: '01:45', conv: '22' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-primary)]/50 transition-colors">
                        <td className="py-3 text-[var(--text-primary)] font-medium">{row.url}</td>
                        <td className="py-3">{row.vis}</td>
                        <td className="py-3">{row.bounce}</td>
                        <td className="py-3">{row.dur}</td>
                        <td className="py-3">{row.conv}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            
            {/* Real-time Activity */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  Live Activity
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                </h2>
                <span className="text-xs text-[var(--text-secondary)] bg-[var(--bg-primary)] px-2 py-1 rounded">128 online</span>
              </div>
              
              <div className="flex flex-col">
                {[
                  { color: 'bg-green-500', text: 'User signed up', time: '2s ago' },
                  { color: 'bg-blue-500', text: 'Page viewed: /pricing', time: '15s ago' },
                  { color: 'bg-amber-500', text: 'Purchase: Pro Plan', time: '32s ago' },
                  { color: 'bg-red-500', text: 'Alert triggered: High bounce', time: '1m ago' },
                  { color: 'bg-green-500', text: 'User signed up', time: '2m ago' },
                  { color: 'bg-blue-500', text: 'Report generated', time: '3m ago' },
                  { color: 'bg-amber-500', text: 'Purchase: Team Plan', time: '4m ago' },
                  { color: 'bg-green-500', text: 'User signed up', time: '5m ago' },
                  { color: 'bg-red-500', text: 'Alert: Server spike', time: '6m ago' },
                  { color: 'bg-blue-500', text: 'Data source connected', time: '8m ago' },
                ].map((act, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-[var(--border)]/30 last:border-0 text-xs">
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${act.color}`}></span>
                    <span className="flex-1 text-[var(--text-primary)]">{act.text}</span>
                    <span className="text-[var(--text-secondary)] shrink-0">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 mt-4">
              <h2 className="font-bold text-lg mb-4">This Week</h2>
              <div className="flex flex-col">
                {[
                  { label: 'New Signups', value: '1,284', change: '+23%', color: 'text-green-500' },
                  { label: 'Support Tickets', value: '47', change: '-12%', color: 'text-green-500' },
                  { label: 'API Calls', value: '2.1M', change: '+8%', color: 'text-green-500' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                    <span className="text-sm text-[var(--text-secondary)]">{stat.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">{stat.value}</span>
                      <span className={`text-xs font-semibold ${stat.color}`}>{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
