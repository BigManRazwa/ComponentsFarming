import { useState, useEffect } from 'react';

type Variant = 'atlas' | 'nebula' | 'aurora';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#3B82F6': 'atlas',
  '#3b82f6': 'atlas',
  '#8B5CF6': 'nebula',
  '#8b5cf6': 'nebula',
  '#10B981': 'aurora',
  '#10b981': 'aurora',
};

export function SaasDashboard({ variant = 'atlas' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customAccent, setCustomAccent] = useState<{ accent: string; hover: string; light: string } | null>(null);
  
  const [activePage, setActivePage] = useState('Dashboard');
  const [activeTimeRange, setActiveTimeRange] = useState('6M');
  const [searchQuery, setSearchQuery] = useState('');
  const [isChartMounted, setIsChartMounted] = useState(false);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const timer = setTimeout(() => setIsChartMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;

      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('atlas');
        setCustomAccent(null);
        return;
      }

      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) {
        setActiveTheme(themeName);
        setCustomAccent(null);
      } else {
        setActiveTheme('atlas');
        setCustomAccent({
          accent: variation.accent,
          hover: variation.accent,
          light: variation.accent + '22',
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const metricCards = [
    { label: 'Total Revenue', value: '$48,235', trend: '+12.5%', isUp: true, icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ), bars: [30, 40, 50, 70, 90] },
    { label: 'Active Users', value: '12,409', trend: '+8.1%', isUp: true, icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
    ), bars: [20, 30, 40, 60, 80] },
    { label: 'Conversion Rate', value: '3.24%', trend: '-0.5%', isUp: false, icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
    ), bars: [60, 40, 50, 30, 45] },
    { label: 'MRR Growth', value: '+18.2%', trend: '+4.2%', isUp: true, icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
    ), bars: [10, 20, 35, 60, 95] },
  ];

  const chartBars = [55, 60, 58, 68, 75, 82];
  const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  const activities = [
    { text: "Sarah K. upgraded to Pro plan", time: "3m ago", dot: "bg-green-500" },
    { text: "New user signup: Ben Torres", time: "12m ago", dot: "bg-blue-500" },
    { text: "Revenue spike detected (+23%)", time: "3h ago", dot: "bg-amber-500" },
    { text: "Payment received: $299.00", time: "4h ago", dot: "bg-green-500" },
    { text: "Failed payment: Mike L. ($49)", time: "5h ago", dot: "bg-red-500" },
    { text: "Feature request submitted", time: "6h ago", dot: "bg-blue-500" },
  ];

  const transactions = [
    { id: "#TX1093", customer: "Sarah Kim", plan: "Pro", amount: "$149.00", status: "Paid", date: "Jun 15, 2024" },
    { id: "#TX1092", customer: "Mark Chen", plan: "Business", amount: "$299.00", status: "Paid", date: "Jun 15, 2024" },
    { id: "#TX1091", customer: "Shutah Kawng", plan: "Pro", amount: "$149.00", status: "Pending", date: "Jun 14, 2024" },
    { id: "#TX1090", customer: "Emily Rose", plan: "Starter", amount: "$49.00", status: "Paid", date: "Jun 14, 2024" },
    { id: "#TX1089", customer: "Mike Lawson", plan: "Pro", amount: "$149.00", status: "Failed", date: "Jun 13, 2024" },
    { id: "#TX1088", customer: "Ana Garcia", plan: "Business", amount: "$299.00", status: "Paid", date: "Jun 13, 2024" },
  ];

  const topCustomers = [
    { name: "Sarah Kim", email: "sarah@email.com", revenue: "$2,340" },
    { name: "Mark Chen", email: "mark@chen.io", revenue: "$1,890" },
    { name: "Emily Rose", email: "emily@rose.co", revenue: "$1,560" },
    { name: "Ana Garcia", email: "ana@garcia.dev", revenue: "$1,230" },
    { name: "Ben Torres", email: "ben@torres.com", revenue: "$980" },
  ];

  const sidebarItems = [
    { name: 'Dashboard', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg> },
    { name: 'Analytics', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> },
    { name: 'Customers', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg> },
    { name: 'Revenue', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { name: 'Products', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg> },
    { name: 'Messages', badge: '3', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.84 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg> },
    { name: 'Settings', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Failed': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .dashboard-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .dashboard-wrapper[data-theme="atlas"] {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-light: #DBEAFE;
          --bg-primary: #0F172A;
          --bg-secondary: #1E293B;
          --bg-card: #1E293B;
          --border: #334155;
          --text-primary: #F1F5F9;
          --text-secondary: #94A3B8;
        }
        .dashboard-wrapper[data-theme="nebula"] {
          --accent: #8B5CF6;
          --accent-hover: #7C3AED;
          --accent-light: #EDE9FE;
          --bg-primary: #0F0A1F;
          --bg-secondary: #1A1330;
          --bg-card: #1A1330;
          --border: #2E2650;
          --text-primary: #F1F5F9;
          --text-secondary: #A78BFA;
        }
        .dashboard-wrapper[data-theme="aurora"] {
          --accent: #10B981;
          --accent-hover: #059669;
          --accent-light: #D1FAE5;
          --bg-primary: #0A1A14;
          --bg-secondary: #132A20;
          --bg-card: #132A20;
          --border: #1F3D2E;
          --text-primary: #F1F5F9;
          --text-secondary: #6EE7B7;
        }
        ${customAccent ? `
        .dashboard-wrapper {
          --accent: ${customAccent.accent} !important;
          --accent-hover: ${customAccent.hover} !important;
          --accent-light: ${customAccent.light} !important;
        }
        ` : ''}
      `}</style>

      <div className="dashboard-wrapper min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]" data-theme={activeTheme}>
        
        {/* 1. Left Sidebar */}
        <div className="fixed top-0 left-0 w-60 h-full bg-[var(--bg-secondary)] border-r border-[var(--border)] flex flex-col z-20">
          <div className="h-16 flex items-center px-6 border-b border-[var(--border)]">
            <div className="flex items-center gap-2 text-[var(--accent)] font-bold text-xl cursor-pointer">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12l10 10 10-10L12 2zm0 14.5L7.5 12 12 7.5 16.5 12 12 16.5z"/></svg>
              Atlas
            </div>
          </div>
          
          <div className="flex-1 py-6 flex flex-col gap-1 px-3">
            {sidebarItems.map((item) => (
              <div 
                key={item.name}
                onClick={() => setActivePage(item.name)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                  activePage === item.name 
                    ? 'bg-[var(--accent)]/10 text-[var(--accent)]' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <div className="flex items-center gap-3 font-medium text-sm">
                  {item.icon}
                  {item.name}
                </div>
                {item.badge && (
                  <span className="bg-[var(--accent)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-[var(--border)]">
            <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-[var(--bg-primary)] transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--accent)] to-white/20 flex-shrink-0" />
              <div className="flex-1 overflow-hidden">
                <div className="text-sm font-semibold truncate">Jack Dorsey</div>
                <div className="text-xs text-[var(--text-secondary)] truncate">Admin</div>
              </div>
              <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
            </div>
          </div>
        </div>

        {/* Main Layout Area */}
        <div className="pl-60 flex flex-col min-h-screen">
          
          {/* 2. Top Header Bar */}
          <div className="sticky top-0 h-16 bg-[var(--bg-primary)]/80 backdrop-blur border-b border-[var(--border)] flex items-center justify-between px-8 z-10">
            <div>
              <h1 className="text-lg font-bold">Dashboard</h1>
              <div className="text-xs text-[var(--text-secondary)]">Welcome back, Jack</div>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search anything..." 
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-[var(--accent)] transition-colors text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-5">
              <div className="relative cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--bg-primary)]"></div>
              </div>
              <div className="w-9 h-9 rounded-full bg-[var(--accent)] flex items-center justify-center text-sm font-bold text-white cursor-pointer hover:opacity-90 transition-opacity">
                JD
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-x-hidden">
            {/* 3. Metric Cards Row */}
            <div className="grid grid-cols-4 gap-5 px-8 pt-6">
              {metricCards.map((card, i) => (
                <div key={i} className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-5 hover:border-[var(--accent)]/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                      {card.icon}
                    </div>
                    <div className={`text-xs font-semibold px-2 py-1 rounded-full ${card.isUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                      {card.trend}
                    </div>
                  </div>
                  <div className="text-sm text-[var(--text-secondary)] mb-1">{card.label}</div>
                  <div className="text-2xl font-bold mb-4">{card.value}</div>
                  <div className="h-6 flex items-end gap-1 w-full justify-between">
                    {card.bars.map((h, j) => (
                      <div key={j} className="flex-1 bg-[var(--accent)] rounded-t-sm transition-all duration-1000 ease-out opacity-80" style={{ height: isChartMounted ? `${h}%` : '0%' }}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 4. Main Content Area */}
            <div className="grid grid-cols-3 gap-5 px-8 py-5">
              
              {/* LEFT: Revenue Chart */}
              <div className="col-span-2 bg-[var(--bg-card)] rounded-xl border border-[var(--border)] flex flex-col">
                <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
                  <h2 className="font-bold">Revenue Trends</h2>
                  <div className="flex gap-2">
                    {['7D', '1M', '6M', '1Y', 'ALL'].map(range => (
                      <button 
                        key={range}
                        onClick={() => setActiveTimeRange(range)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                          activeTimeRange === range 
                            ? 'bg-[var(--accent)] text-white' 
                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex-1 relative mb-6 min-h-[200px]">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[60, 50, 40, 30, 20, 10].map(val => (
                        <div key={val} className="border-b border-dashed border-[var(--border)] w-full h-0 relative">
                          <span className="absolute -left-12 -top-2.5 text-xs text-[var(--text-secondary)]">${val}K</span>
                        </div>
                      ))}
                      <div className="border-b border-[var(--border)] w-full h-0"></div>
                    </div>
                    
                    {/* Chart Bars */}
                    <div className="absolute inset-0 left-2 right-2 bottom-0 flex items-end justify-between pt-5">
                      {chartBars.map((height, i) => (
                        <div key={i} className="relative group w-1/12 h-full flex items-end justify-center">
                          <div 
                            className="w-full bg-gradient-to-t from-transparent to-[var(--accent)] rounded-t opacity-80 transition-all duration-1000 ease-out group-hover:opacity-100 cursor-pointer"
                            style={{ height: isChartMounted ? `${height}%` : '0%' }}
                          ></div>
                          {/* Tooltip simulation */}
                          {height === Math.max(...chartBars) && (
                            <div className="absolute -top-8 bg-[var(--bg-secondary)] border border-[var(--border)] text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                              $48.2K
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* X-axis labels */}
                  <div className="flex justify-between pl-2 pr-2 text-xs text-[var(--text-secondary)] mb-4">
                    {chartLabels.map(label => <div key={label}>{label}</div>)}
                  </div>
                  
                  <div className="flex gap-6 pt-4 border-t border-[var(--border)] text-sm">
                    <div>
                      <span className="text-[var(--text-secondary)] mr-2">Avg. Revenue:</span>
                      <span className="font-semibold">$41.2K</span>
                    </div>
                    <div>
                      <span className="text-[var(--text-secondary)] mr-2">Peak:</span>
                      <span className="font-semibold">$48.2K (Jun)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Activity Feed */}
              <div className="col-span-1 bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
                <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
                  <h2 className="font-bold">Recent Activity</h2>
                  <a href="#" className="text-xs text-[var(--accent)] hover:underline">View All</a>
                </div>
                <div className="p-5">
                  <div className="flex flex-col">
                    {activities.map((act, i) => (
                      <div key={i} className="relative pl-6 pb-5 last:pb-0">
                        {i !== activities.length - 1 && (
                          <div className="absolute left-1.5 top-2 bottom-0 w-px bg-[var(--border)]"></div>
                        )}
                        <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-[var(--bg-card)] ${act.dot} z-10`}></div>
                        <div className="text-sm">{act.text}</div>
                        <div className="text-xs text-[var(--text-secondary)] mt-1">{act.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Bottom Section */}
            <div className="grid grid-cols-3 gap-5 px-8 pb-8">
              
              {/* LEFT: Recent Transactions */}
              <div className="col-span-2 bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
                <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
                  <h2 className="font-bold">Recent Transactions</h2>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                      <input 
                        type="text" 
                        placeholder="Search..." 
                        className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-md py-1.5 pl-8 pr-3 text-xs outline-none focus:border-[var(--accent)] transition-colors text-[var(--text-primary)]"
                      />
                    </div>
                    <button className="text-xs px-3 py-1.5 border border-[var(--accent)] text-[var(--accent)] rounded-md hover:bg-[var(--accent)]/10 transition-colors cursor-pointer">
                      Export
                    </button>
                  </div>
                </div>
                
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-[var(--text-secondary)] uppercase bg-[var(--bg-primary)]/50 border-b border-[var(--border)]">
                      <tr>
                        <th className="px-5 py-3 font-medium">ID</th>
                        <th className="px-5 py-3 font-medium">Customer</th>
                        <th className="px-5 py-3 font-medium">Plan</th>
                        <th className="px-5 py-3 font-medium">Amount</th>
                        <th className="px-5 py-3 font-medium">Status</th>
                        <th className="px-5 py-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx, i) => (
                        <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-primary)]/50 transition-colors cursor-pointer">
                          <td className="px-5 py-3 font-medium">{tx.id}</td>
                          <td className="px-5 py-3">{tx.customer}</td>
                          <td className="px-5 py-3 text-[var(--text-secondary)]">{tx.plan}</td>
                          <td className="px-5 py-3 font-medium">{tx.amount}</td>
                          <td className="px-5 py-3">
                            <span className={`px-2 py-1 rounded text-xs border font-medium ${getStatusColor(tx.status)}`}>
                              {tx.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-[var(--text-secondary)]">{tx.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* RIGHT: Top Customers */}
              <div className="col-span-1 bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
                <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
                  <h2 className="font-bold">Top Customers</h2>
                  <span className="text-xs bg-[var(--bg-primary)] border border-[var(--border)] px-2 py-1 rounded">This Month</span>
                </div>
                <div className="p-2">
                  {topCustomers.map((customer, i) => (
                    <div key={i} className="flex items-center p-3 hover:bg-[var(--bg-primary)]/50 rounded-lg cursor-pointer transition-colors">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--accent)] to-transparent flex-shrink-0 mr-3 opacity-80" />
                      <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-medium truncate">{customer.name}</div>
                        <div className="text-xs text-[var(--text-secondary)] truncate">{customer.email}</div>
                      </div>
                      <div className="font-bold text-sm ml-2">{customer.revenue}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Variant Switcher */}
        <div className="fixed bottom-5 right-5 bg-[var(--bg-card)] p-2.5 rounded-full shadow-lg flex gap-2.5 z-[1000] border border-[var(--border)]">
          {[
            { id: 'atlas', bg: '#3B82F6', label: 'Atlas Blue' },
            { id: 'nebula', bg: '#8B5CF6', label: 'Nebula Purple' },
            { id: 'aurora', bg: '#10B981', label: 'Aurora Green' }
          ].map(theme => (
            <button 
              key={theme.id}
              onClick={() => {
                setActiveTheme(theme.id as Variant);
                setCustomAccent(null);
              }}
              className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-transform relative group hover:scale-110 ${activeTheme === theme.id && !customAccent ? 'border-white scale-110' : 'border-transparent'}`}
              style={{ background: theme.bg }}
            >
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border)] text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 shadow-lg">
                {theme.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
