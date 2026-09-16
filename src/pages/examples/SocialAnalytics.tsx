import { useState, useEffect } from 'react';

type Variant = 'blue' | 'rose' | 'violet';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#3B82F6': 'blue',
  '#F43F5E': 'rose',
  '#8B5CF6': 'violet',
};

export function SocialAnalytics({ variant = 'blue' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  
  const [activeNav, setActiveNav] = useState('Overview');
  const [activeTab, setActiveTab] = useState('30D');

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('blue'); 
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
    { name: 'Overview', path: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
    { name: 'Audience', path: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
    { name: 'Content', path: 'M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z' },
    { name: 'Engagement', path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' },
    { name: 'Campaigns', path: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 14H6v-2h2v2zm0-4H6V6h2v4zm7 4h-5v-2h5v2zm3-4H10V6h8v4z' },
    { name: 'Scheduling', path: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z' },
    { name: 'Reports', path: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z' }
  ];

  const socialAccounts = [
    { name: 'Facebook', followers: '12.5K followers', platform: 'f', color: '#1877F2' },
    { name: 'Instagram', followers: '45.2K followers', platform: 'ig', color: '#E4405F' },
    { name: 'Twitter', followers: '8.9K followers', platform: 'tw', color: '#1DA1F2' },
    { name: 'YouTube', followers: '23.1K followers', platform: 'yt', color: '#FF0000' }
  ];

  const stats = [
    { label: 'Total Followers', value: '89.7K', change: '+2.4K this month', isUp: true },
    { label: 'Engagement Rate', value: '4.8%', change: '+0.6% vs last month', isUp: true },
    { label: 'Total Impressions', value: '1.2M', change: '+18% vs last month', isUp: true },
    { label: 'Link Clicks', value: '34.2K', change: '-3% vs last month', isUp: false }
  ];

  const topPosts = [
    { title: 'Product Launch Teaser', platform: 'Instagram', engagement: '12.4K', time: '2d ago', color: '#E4405F' },
    { title: 'Behind the Scenes', platform: 'YouTube', engagement: '8.9K', time: '3d ago', color: '#FF0000' },
    { title: 'Customer Story', platform: 'Facebook', engagement: '6.2K', time: '5d ago', color: '#1877F2' },
    { title: 'Tips & Tricks Thread', platform: 'Twitter', engagement: '4.8K', time: '1w ago', color: '#1DA1F2' }
  ];

  const platforms = [
    { name: 'Instagram', followers: '45.2K', rate: '5.2%', growth: '+12%', isUp: true, pct: 85, color: '#E4405F' },
    { name: 'YouTube', followers: '23.1K', rate: '3.8%', growth: '+8%', isUp: true, pct: 60, color: '#FF0000' },
    { name: 'Facebook', followers: '12.5K', rate: '2.4%', growth: '-2%', isUp: false, pct: 35, color: '#1877F2' },
    { name: 'Twitter', followers: '8.9K', rate: '4.1%', growth: '+5%', isUp: true, pct: 45, color: '#1DA1F2' }
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .social-analytics-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .social-analytics-wrapper[data-theme="blue"] {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-light: rgba(59,130,246,0.12);
          --bg-primary: #0A0E18;
          --bg-secondary: #111828;
          --bg-card: #1A2236;
          --border: #1E2E42;
          --text-primary: #F1F5F9;
          --text-secondary: #64748B;
        }
        .social-analytics-wrapper[data-theme="rose"] {
          --accent: #F43F5E;
          --accent-hover: #E11D48;
          --accent-light: rgba(244,63,94,0.12);
          --bg-primary: #140A0E;
          --bg-secondary: #1C1016;
          --bg-card: #24161C;
          --border: #3A1E28;
          --text-primary: #FFF0F2;
          --text-secondary: #C08090;
        }
        .social-analytics-wrapper[data-theme="violet"] {
          --accent: #8B5CF6;
          --accent-hover: #7C3AED;
          --accent-light: rgba(139,92,246,0.12);
          --bg-primary: #0C0A14;
          --bg-secondary: #14101E;
          --bg-card: #1A1428;
          --border: #241E3A;
          --text-primary: #F1F0FF;
          --text-secondary: #7C72A8;
        }
      `}</style>

      <div 
        className="social-analytics-wrapper grid grid-cols-[240px_1fr] min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]" 
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* Col 1: Sidebar */}
        <div className="w-[240px] bg-[var(--bg-secondary)] border-r border-[var(--border)] py-5 flex flex-col">
          <div className="px-5 mb-6 flex items-center gap-2">
            <svg className="w-8 h-8 text-[var(--accent)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 9h4v11H4zm12-4h4v15h-4zM10 14h4v6h-4z"/>
            </svg>
            <span className="font-bold text-[var(--accent)] text-lg">SocialPulse</span>
          </div>
          
          <div className="flex-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`px-3 py-2.5 rounded-lg text-sm mb-1 flex items-center gap-3 cursor-pointer mx-2 transition-colors ${
                  activeNav === item.name
                    ? 'bg-[var(--accent-light)] text-[var(--accent)] font-medium'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d={item.path} />
                </svg>
                {item.name}
              </div>
            ))}
            
            <div className="border-b border-[var(--border)] my-4 mx-4"></div>
            
            <div className="px-4">
              <div className="text-xs text-[var(--text-secondary)] uppercase font-semibold mb-3 tracking-wider">Connected</div>
              {socialAccounts.map((account) => (
                <div key={account.name} className="py-2 flex items-center gap-3 text-sm cursor-pointer hover:bg-[var(--bg-primary)] px-2 -mx-2 rounded-lg transition-colors">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: account.color }}>
                    {account.platform === 'f' ? 'f' : account.platform === 'ig' ? <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7.25A4.75,4.75 0 1,1 7.25,12A4.75,4.75 0 0,1 12,7.25M12,9A3,3 0 1,0 15,12A3,3 0 0,0 12,9M17.25,5.5A1.25,1.25 0 1,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5Z"/></svg> : account.platform === 'tw' ? <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16.02 6.02,17.25 7.91,17.28C6.44,18.43 4.59,19.11 2.56,19.11C2.22,19.11 1.88,19.09 1.55,19.05C3.44,20.26 5.68,21 8.08,21C15.93,21 20.22,14.5 20.22,8.87C20.22,8.68 20.21,8.5 20.21,8.31C21.04,7.71 21.78,7 22.46,6Z"/></svg> : <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.17,18.94 12.06,18.94H11.94C9.83,18.94 8.12,18.91 6.82,18.84C5.5,18.78 4.64,18.69 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.83,5.06 11.94,5.06H12.06C14.17,5.06 15.88,5.09 17.18,5.16C18.5,5.22 19.36,5.31 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"/></svg>}
                  </div>
                  <div>
                    <div className="font-medium text-[var(--text-primary)]">{account.name}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{account.followers}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="px-5 mt-auto pt-4 border-t border-[var(--border)] flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold">
              MT
            </div>
            <div>
              <div className="text-sm font-semibold text-[var(--text-primary)]">Marketing Team</div>
              <div className="text-xs text-[var(--text-secondary)] bg-[var(--bg-primary)] px-2 py-0.5 rounded inline-block mt-0.5 border border-[var(--border)]">Pro Plan</div>
            </div>
          </div>
        </div>

        {/* Col 2: Main */}
        <div className="overflow-y-auto bg-[var(--bg-primary)]">
          {/* Header */}
          <div className="px-6 py-4 flex justify-between items-center border-b border-[var(--border)] sticky top-0 bg-[var(--bg-primary)]/90 backdrop-blur z-10">
            <div className="flex items-center gap-3">
              <h1 className="font-bold text-xl">Overview</h1>
              <span className="text-[var(--text-secondary)] bg-[var(--bg-secondary)] px-2.5 py-1 rounded-md text-sm border border-[var(--border)]">Last 30 days</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer">
                <svg className="w-4 h-4 text-[var(--text-secondary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Apr 1 - Apr 30</span>
              </button>
              <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Export Report
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="px-6 mt-5 grid grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm hover:border-[var(--accent)]/30 transition-colors cursor-default">
                <div className="text-[var(--text-secondary)] text-sm mb-1">{stat.label}</div>
                <div className="font-bold text-2xl mb-2">{stat.value}</div>
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <span className={`flex items-center justify-center w-5 h-5 rounded-full ${stat.isUp ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {stat.isUp ? (
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                    ) : (
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                    )}
                  </span>
                  <span className={stat.isUp ? 'text-green-500' : 'text-red-500'}>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Engagement Chart */}
          <div className="px-6 mt-5">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">Engagement Over Time</h2>
                <div className="flex bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-1">
                  {['7D', '30D', '90D'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                        activeTab === tab ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[240px] w-full relative mb-4">
                <svg viewBox="0 0 800 240" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  {[0, 60, 120, 180, 240].map(y => (
                    <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
                  ))}
                  
                  {/* Y-axis Labels */}
                  <text x="-15" y="240" fill="var(--text-secondary)" fontSize="12" textAnchor="end" alignmentBaseline="middle">0</text>
                  <text x="-15" y="180" fill="var(--text-secondary)" fontSize="12" textAnchor="end" alignmentBaseline="middle">2K</text>
                  <text x="-15" y="120" fill="var(--text-secondary)" fontSize="12" textAnchor="end" alignmentBaseline="middle">4K</text>
                  <text x="-15" y="60" fill="var(--text-secondary)" fontSize="12" textAnchor="end" alignmentBaseline="middle">6K</text>
                  <text x="-15" y="0" fill="var(--text-secondary)" fontSize="12" textAnchor="end" alignmentBaseline="middle">8K</text>

                  {/* Line 1 (Likes): 3K, 5K, 4.2K, 7K -> mapped to Y: 150, 90, 114, 30 */}
                  <polyline 
                    points="0,150 266,90 533,114 800,30"
                    fill="none" 
                    stroke="var(--accent)" 
                    strokeWidth="3"
                  />
                  {/* Line 2 (Comments): 1K, 2.5K, 2K, 3.5K -> mapped to Y: 210, 165, 180, 135 */}
                  <polyline 
                    points="0,210 266,165 533,180 800,135"
                    fill="none" 
                    stroke="var(--text-secondary)" 
                    strokeWidth="3"
                    strokeDasharray="6 4"
                  />

                  {/* Data Points Likes */}
                  {[ { x: 0, y: 150 }, { x: 266, y: 90 }, { x: 533, y: 114 }, { x: 800, y: 30 } ].map((pt, i) => (
                    <circle key={`l-${i}`} cx={pt.x} cy={pt.y} r="5" fill="var(--bg-card)" stroke="var(--accent)" strokeWidth="2" />
                  ))}

                  {/* Data Points Comments */}
                  {[ { x: 0, y: 210 }, { x: 266, y: 165 }, { x: 533, y: 180 }, { x: 800, y: 135 } ].map((pt, i) => (
                    <circle key={`c-${i}`} cx={pt.x} cy={pt.y} r="4" fill="var(--bg-card)" stroke="var(--text-secondary)" strokeWidth="2" />
                  ))}

                  {/* X-axis Labels */}
                  <text x="0" y="260" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">Week 1</text>
                  <text x="266" y="260" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">Week 2</text>
                  <text x="533" y="260" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">Week 3</text>
                  <text x="800" y="260" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">Week 4</text>
                </svg>
              </div>

              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[var(--accent)]"></span>
                  <span className="text-sm text-[var(--text-primary)]">Likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[var(--text-secondary)] border border-[var(--text-secondary)] border-dashed"></span>
                  <span className="text-sm text-[var(--text-primary)]">Comments</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Performance + Audience */}
          <div className="px-6 mt-5 grid grid-cols-2 gap-4">
            {/* Left Card */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
              <h2 className="font-bold text-lg mb-4">Top Performing Posts</h2>
              <div className="flex flex-col">
                {topPosts.map((post, i) => (
                  <div key={i} className="py-3 border-b border-[var(--border)]/30 last:border-0 flex items-center justify-between hover:bg-[var(--bg-primary)]/50 -mx-2 px-2 rounded-lg cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg shrink-0" style={{ background: `linear-gradient(135deg, ${post.color}, var(--bg-primary))` }}></div>
                      <div>
                        <div className="text-sm font-bold">{post.title}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs px-1.5 py-0.5 rounded-sm text-white bg-black/20 backdrop-blur" style={{ backgroundColor: post.color }}>{post.platform}</span>
                          <span className="text-xs text-[var(--text-secondary)]">{post.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{post.engagement}</div>
                      <div className="text-xs text-[var(--text-secondary)]">Engagements</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 shadow-sm flex flex-col">
              <h2 className="font-bold text-lg mb-4">Audience Demographics</h2>
              <div className="flex-1 flex flex-col justify-center gap-8">
                <div className="flex items-center gap-6">
                  {/* Donut Chart: 18-24 35%, 25-34 28%, 35-44 22%, 45+ 15% */}
                  <div className="relative w-[100px] h-[100px] shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="16" />
                      {/* C = 251.3 */}
                      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent)" strokeWidth="16" strokeDasharray="88 251.3" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#22C55E" strokeWidth="16" strokeDasharray="70.4 251.3" strokeDashoffset="-88" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#F59E0B" strokeWidth="16" strokeDasharray="55.3 251.3" strokeDashoffset="-158.4" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#A855F7" strokeWidth="16" strokeDasharray="37.7 251.3" strokeDashoffset="-213.7" />
                    </svg>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 flex-1 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm bg-[var(--accent)]"></span>
                        <span className="text-[var(--text-secondary)]">18-24</span>
                      </div>
                      <span className="font-bold">35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm bg-[#22C55E]"></span>
                        <span className="text-[var(--text-secondary)]">25-34</span>
                      </div>
                      <span className="font-bold">28%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm bg-[#F59E0B]"></span>
                        <span className="text-[var(--text-secondary)]">35-44</span>
                      </div>
                      <span className="font-bold">22%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm bg-[#A855F7]"></span>
                        <span className="text-[var(--text-secondary)]">45+</span>
                      </div>
                      <span className="font-bold">15%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-[var(--text-secondary)]">Gender Split</span>
                    <span className="font-medium text-xs">58% Female / 42% Male</span>
                  </div>
                  <div className="w-full h-3 bg-[#3B82F6] rounded-full overflow-hidden flex">
                    <div className="h-full bg-[var(--accent)]" style={{ width: '58%' }}></div>
                    <div className="h-full bg-[var(--bg-secondary)]" style={{ width: '42%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Breakdown */}
          <div className="px-6 mt-5 pb-8">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
              <h2 className="font-bold text-lg mb-4">Platform Performance</h2>
              <div className="flex flex-col">
                {platforms.map((plat, i) => (
                  <div key={i} className="py-3 border-b border-[var(--border)] last:border-0 flex items-center gap-6">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0" style={{ backgroundColor: plat.color }}>
                       {plat.name === 'Facebook' ? 'f' : plat.name === 'Instagram' ? <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7.25A4.75,4.75 0 1,1 7.25,12A4.75,4.75 0 0,1 12,7.25M12,9A3,3 0 1,0 15,12A3,3 0 0,0 12,9M17.25,5.5A1.25,1.25 0 1,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5Z"/></svg> : plat.name === 'Twitter' ? <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16.02 6.02,17.25 7.91,17.28C6.44,18.43 4.59,19.11 2.56,19.11C2.22,19.11 1.88,19.09 1.55,19.05C3.44,20.26 5.68,21 8.08,21C15.93,21 20.22,14.5 20.22,8.87C20.22,8.68 20.21,8.5 20.21,8.31C21.04,7.71 21.78,7 22.46,6Z"/></svg> : <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.17,18.94 12.06,18.94H11.94C9.83,18.94 8.12,18.91 6.82,18.84C5.5,18.78 4.64,18.69 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.83,5.06 11.94,5.06H12.06C14.17,5.06 15.88,5.09 17.18,5.16C18.5,5.22 19.36,5.31 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"/></svg>}
                    </div>
                    <div className="w-24 shrink-0 font-bold">{plat.name}</div>
                    <div className="w-24 shrink-0 text-sm">
                      <div className="text-[var(--text-secondary)] text-xs">Followers</div>
                      <div className="font-medium">{plat.followers}</div>
                    </div>
                    <div className="w-24 shrink-0 text-sm">
                      <div className="text-[var(--text-secondary)] text-xs">Engagement</div>
                      <div className="font-medium">{plat.rate}</div>
                    </div>
                    <div className="w-20 shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${plat.isUp ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {plat.growth}
                      </span>
                    </div>
                    <div className="flex-1 flex items-center pl-4">
                      <div className="w-full h-2.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${plat.pct}%`, backgroundColor: plat.color }}></div>
                      </div>
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
