import { useState, useEffect } from 'react';

type Variant = 'indigo' | 'cyan' | 'emerald';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#6366F1': 'indigo',
  '#06B6D4': 'cyan',
  '#10B981': 'emerald',
};

export function AnalyticsDash({ variant = 'indigo' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState('Analytics');
  const [activeTab, setActiveTab] = useState('Page Views');

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('indigo'); 
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
    { name: 'Overview', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Audience', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { name: 'Acquisition', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Behavior', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { name: 'Conversions', icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122' },
    { name: 'Reports', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .analytics-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .analytics-wrapper[data-theme="indigo"] {
          --accent: #6366F1;
          --accent-hover: #4F46E5;
          --accent-light: rgba(99,102,241,0.1);
          --bg-primary: #0C0A1E;
          --bg-secondary: #14102A;
          --bg-card: #1E1838;
          --border: #2A2048;
          --text-primary: #F1F0FF;
          --text-secondary: #7C72A8;
        }
        .analytics-wrapper[data-theme="cyan"] {
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
        .analytics-wrapper[data-theme="emerald"] {
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
        className="analytics-wrapper grid grid-cols-[200px_1fr] h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]"
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* Col 1: Sidebar */}
        <div className="bg-[var(--bg-secondary)] border-r border-[var(--border)] py-4 flex flex-col h-full">
          <div className="px-4 mb-5 flex items-center gap-2">
            <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="font-bold text-[var(--accent)] text-lg">DataPulse</span>
          </div>

          <div className="px-2 flex-1 space-y-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`px-3 py-2 rounded-lg text-sm flex items-center gap-3 cursor-pointer transition-colors ${
                  activeNav === item.name 
                    ? 'bg-[var(--bg-card)] text-[var(--accent)]' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {item.name}
              </div>
            ))}
          </div>

          <div className="px-4 mt-auto">
            <div className="bg-[var(--accent-light)] rounded-lg p-3 text-center border border-[var(--accent)]/20">
              <div className="font-bold text-[var(--accent)] text-sm mb-1">Pro Plan</div>
              <div className="text-xs text-[var(--text-secondary)]">12 days remaining</div>
            </div>
          </div>
        </div>

        {/* Col 2: Main */}
        <div className="overflow-y-auto bg-[var(--bg-primary)] px-6 py-5">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-bold text-xl">Analytics Overview</h1>
              <div className="text-sm text-[var(--text-secondary)] mt-1">Jun 1, 2023 - Jun 30, 2023</div>
            </div>
            <div className="flex items-center gap-3">
              <button className="border border-[var(--border)] hover:bg-[var(--bg-card)] rounded-lg px-4 py-2 text-sm transition-colors cursor-pointer text-[var(--text-primary)]">
                Export
              </button>
              <select className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-2 text-sm outline-none cursor-pointer text-[var(--text-primary)] appearance-none">
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>This Year</option>
              </select>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="mt-4 grid grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-xs text-[var(--text-secondary)] font-medium">Page Views</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-2xl">2.4M</span>
                <span className="text-[#10B981] text-xs font-medium flex items-center">
                  <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  +12.5%
                </span>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-xs text-[var(--text-secondary)] font-medium">Visitors</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-2xl">847K</span>
                <span className="text-[#10B981] text-xs font-medium flex items-center">
                  <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  +8.3%
                </span>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-[var(--text-secondary)] font-medium">Avg. Session</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-2xl">4m 32s</span>
                <span className="text-[#EF4444] text-xs font-medium flex items-center">
                  <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  -2.1%
                </span>
              </div>
            </div>
            {/* Card 4 */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <span className="text-xs text-[var(--text-secondary)] font-medium">Bounce Rate</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-2xl">32.5%</span>
                <span className="text-[#10B981] text-xs font-medium flex items-center">
                  <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  -5.8%
                </span>
              </div>
            </div>
          </div>

          {/* Traffic Chart */}
          <div className="mt-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-sm">Traffic Overview</h2>
              <div className="flex gap-3">
                {['Visitors', 'Page Views', 'Sessions'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm cursor-pointer transition-colors pb-1 border-b-2 ${
                      activeTab === tab ? 'border-[var(--accent)] text-[var(--text-primary)] font-medium' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-48 mt-4 relative">
              {/* Y-axis */}
              <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-[var(--text-secondary)] w-10 text-right pr-2">
                <span>50K</span>
                <span>40K</span>
                <span>30K</span>
                <span>20K</span>
                <span>10K</span>
                <span>0</span>
              </div>
              
              {/* Chart Grid and Bars */}
              <div className="absolute left-10 right-0 top-0 bottom-6">
                {/* Horizontal Grid lines */}
                {[0, 25, 50, 75, 100].map(p => (
                  <div key={p} className="absolute w-full border-t border-dashed border-[var(--border)]/30" style={{ top: `${p}%` }}></div>
                ))}
                
                {/* Bars */}
                <div className="absolute inset-0 flex justify-around items-end">
                  {[
                    { a: 40, b: 60 },
                    { a: 50, b: 70 },
                    { a: 30, b: 45 },
                    { a: 65, b: 85 },
                    { a: 75, b: 90 },
                    { a: 45, b: 65 },
                    { a: 80, b: 100 }
                  ].map((bar, i) => (
                    <div key={i} className="flex gap-1 items-end h-full w-8 pb-1 pt-4 relative z-10">
                      <div className="w-1/2 bg-[var(--accent)]/40 rounded-t-sm transition-all" style={{ height: `${bar.a}%` }}></div>
                      <div className="w-1/2 bg-[var(--accent)] rounded-t-sm transition-all" style={{ height: `${bar.b}%` }}></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* X-axis */}
              <div className="absolute left-10 right-0 bottom-0 h-6 flex justify-around items-end text-xs text-[var(--text-secondary)]">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map(month => (
                  <span key={month} className="w-8 text-center">{month}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Two Column Section */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            
            {/* Traffic Sources */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
              <h2 className="font-bold text-sm">Traffic Sources</h2>
              <div className="mt-4 w-32 h-32 mx-auto relative flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="16" fill="transparent" stroke="var(--bg-secondary)" strokeWidth="4"></circle>
                  {/* Organic 42% */}
                  <circle cx="18" cy="18" r="16" fill="transparent" stroke="var(--accent)" strokeWidth="4" strokeDasharray="42 100" strokeDashoffset="0"></circle>
                  {/* Direct 28% */}
                  <circle cx="18" cy="18" r="16" fill="transparent" stroke="#3B82F6" strokeWidth="4" strokeDasharray="28 100" strokeDashoffset="-42"></circle>
                  {/* Social 18% */}
                  <circle cx="18" cy="18" r="16" fill="transparent" stroke="#F59E0B" strokeWidth="4" strokeDasharray="18 100" strokeDashoffset="-70"></circle>
                  {/* Referral 12% */}
                  <circle cx="18" cy="18" r="16" fill="transparent" stroke="#10B981" strokeWidth="4" strokeDasharray="12 100" strokeDashoffset="-88"></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
                  847K
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent)]"></div>
                  <span className="text-[var(--text-secondary)]">Organic Search</span>
                  <span className="ml-auto font-medium">42%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#3B82F6]"></div>
                  <span className="text-[var(--text-secondary)]">Direct</span>
                  <span className="ml-auto font-medium">28%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div>
                  <span className="text-[var(--text-secondary)]">Social</span>
                  <span className="ml-auto font-medium">18%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                  <span className="text-[var(--text-secondary)]">Referral</span>
                  <span className="ml-auto font-medium">12%</span>
                </div>
              </div>
            </div>

            {/* Top Pages */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
              <h2 className="font-bold text-sm">Top Pages</h2>
              <div className="mt-3 space-y-2">
                {[
                  { path: '/home', views: '45.2K', width: '100%' },
                  { path: '/products', views: '32.1K', width: '71%' },
                  { path: '/blog', views: '24.8K', width: '55%' },
                  { path: '/pricing', views: '18.5K', width: '41%' },
                  { path: '/about', views: '12.3K', width: '27%' }
                ].map((page, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5">
                    <span className="text-sm w-24 truncate">{page.path}</span>
                    <span className="text-sm text-[var(--text-secondary)] w-16 text-right">{page.views}</span>
                    <div className="w-20 h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden ml-4">
                      <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: page.width }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          {/* Device & Location */}
          <div className="mt-4 grid grid-cols-2 gap-4 pb-6">
            
            {/* Devices */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
              <h2 className="font-bold text-sm">Devices</h2>
              <div className="mt-4 space-y-3">
                {[
                  { name: 'Desktop', perc: '58%', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                  { name: 'Mobile', perc: '34%', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
                  { name: 'Tablet', perc: '8%', icon: 'M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' }
                ].map(device => (
                  <div key={device.name}>
                    <div className="flex items-center mb-1">
                      <svg className="w-4 h-4 text-[var(--text-secondary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={device.icon} />
                      </svg>
                      <span className="text-sm">{device.name}</span>
                      <span className="text-sm text-[var(--text-secondary)] ml-auto">{device.perc}</span>
                    </div>
                    <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: device.perc }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
              <h2 className="font-bold text-sm">Top Countries</h2>
              <div className="mt-3 space-y-2">
                {[
                  { flag: '🇺🇸', name: 'United States', visitors: '32%', width: '100%' },
                  { flag: '🇬🇧', name: 'UK', visitors: '18%', width: '56%' },
                  { flag: '🇩🇪', name: 'Germany', visitors: '12%', width: '37%' },
                  { flag: '🇫🇷', name: 'France', visitors: '8%', width: '25%' },
                  { flag: '🇯🇵', name: 'Japan', visitors: '6%', width: '19%' }
                ].map(loc => (
                  <div key={loc.name} className="flex items-center py-1">
                    <span className="mr-2 text-base">{loc.flag}</span>
                    <span className="text-sm w-28 truncate">{loc.name}</span>
                    <span className="text-xs text-[var(--text-secondary)] w-12 text-right">{loc.visitors}</span>
                    <div className="w-16 h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden ml-4">
                      <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: loc.width }}></div>
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
