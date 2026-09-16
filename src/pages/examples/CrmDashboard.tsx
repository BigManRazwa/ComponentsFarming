import { useState, useEffect } from 'react';

type Variant = 'teal' | 'indigo' | 'amber';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#14B8A6': 'teal',
  '#14b8a6': 'teal',
  '#6366F1': 'indigo',
  '#6366f1': 'indigo',
  '#F59E0B': 'amber',
  '#f59e0b': 'amber',
};

export function CrmDashboard({ variant = 'teal' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customAccent, setCustomAccent] = useState<{ accent: string; hover: string; } | null>(null);
  
  const [activePage, setActivePage] = useState('Dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, text: "Meet Sarah - Horizon Tech", date: "Nov 8", done: false },
    { id: 2, text: "Follow-up call - Acme Corp", date: "Nov 9", done: false },
    { id: 3, text: "Demo - Nexus Solutions", date: "Nov 11", done: false },
    { id: 4, text: "Review proposal - Quantum", date: "Nov 12", done: false },
  ]);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;

      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('teal');
        setCustomAccent(null);
        return;
      }

      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) {
        setActiveTheme(themeName);
        setCustomAccent(null);
      } else {
        setActiveTheme('teal');
        setCustomAccent({
          accent: variation.accent,
          hover: variation.accent,
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const navItems = [
    { name: 'Dashboard', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg> },
    { name: 'Contacts', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg> },
    { name: 'Deals', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg> },
    { name: 'Pipeline', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" /></svg> },
    { name: 'Reports', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> },
    { name: 'Settings', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  ];

  const statCards = [
    { label: 'Total Revenue', value: '$284,500', trend: '+8%', isUp: true, icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    )},
    { label: 'Active Deals', value: '47', trend: '-3%', isUp: false, icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v3.659M15 10.5h.008v.008H15v-.008zm-6 0h.008v.008H9v-.008z" /></svg>
    )},
    { label: 'Win Rate', value: '68.2%', trend: '+5.1%', isUp: true, icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>
    )},
    { label: 'New Leads', value: '124', trend: '+12%', isUp: true, icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
    )}
  ];

  const funnelData = [
    { label: 'Lead', count: 210, percent: '100%', width: '100%', opacity: '1' },
    { label: 'Qualified', count: 145, percent: '69%', width: '85%', opacity: '0.9' },
    { label: 'Proposal', count: 88, percent: '42%', width: '65%', opacity: '0.8' },
    { label: 'Negotiation', count: 56, percent: '27%', width: '45%', opacity: '0.7' },
    { label: 'Closed', count: 38, percent: '18%', width: '30%', opacity: '0.6' }
  ];

  const recentDeals = [
    { company: 'Horizon Tech', value: '$15,000', stage: 'Closed-Won', stageColor: 'bg-green-500/10 text-green-500 border-green-500/20', date: 'Oct 24' },
    { company: 'Acme Corp', value: '$22,500', stage: 'Proposal', stageColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20', date: 'Oct 28' },
    { company: 'Nexus Solutions', value: '$9,800', stage: 'Qualified', stageColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20', date: 'Nov 1' },
    { company: 'Quantum Dynamics', value: '$45,000', stage: 'Negotiation', stageColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20', date: 'Nov 3' },
    { company: 'Apex Industries', value: '$18,200', stage: 'Lead', stageColor: 'bg-gray-500/10 text-gray-400 border-gray-500/20', date: 'Nov 5' }
  ];

  const activityFeed = [
    { text: "David Miller closed deal with Horizon Tech", time: "3h ago", initials: "DM" },
    { text: "Sarah Johnson sent proposal to Acme Corp", time: "5h ago", initials: "SJ" },
    { text: "Mark Lee added 5 new leads", time: "8h ago", initials: "ML" },
    { text: "Jessica White scheduled demo", time: "1d ago", initials: "JW" },
  ];

  const sidebarWidth = isCollapsed ? 'w-20' : 'w-56';
  const mainMargin = isCollapsed ? 'ml-20' : 'ml-56';

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .crm-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .crm-wrapper[data-theme="teal"] {
          --accent: #14B8A6;
          --accent-hover: #0D9488;
          --bg-primary: #0F1419;
          --bg-secondary: #1A2332;
          --bg-card: #1E2A3A;
          --border: #2A3A4A;
          --text-primary: #F1F5F9;
          --text-secondary: #64748B;
        }
        .crm-wrapper[data-theme="indigo"] {
          --accent: #6366F1;
          --accent-hover: #4F46E5;
          --bg-primary: #0F0F1A;
          --bg-secondary: #1A1A30;
          --bg-card: #1E1E38;
          --border: #2A2A50;
          --text-primary: #F1F0FF;
          --text-secondary: #7C72A8;
        }
        .crm-wrapper[data-theme="amber"] {
          --accent: #F59E0B;
          --accent-hover: #D97706;
          --bg-primary: #141008;
          --bg-secondary: #1E1A10;
          --bg-card: #282018;
          --border: #3A3020;
          --text-primary: #FFF8E8;
          --text-secondary: #AA9960;
        }
        ${customAccent ? `
        .crm-wrapper {
          --accent: ${customAccent.accent} !important;
          --accent-hover: ${customAccent.hover} !important;
        }
        ` : ''}
      `}</style>

      <div className="crm-wrapper min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300" data-theme={activeTheme}>
        
        {/* 1. Sidebar */}
        <div className={`fixed top-0 left-0 ${sidebarWidth} h-screen bg-[var(--bg-secondary)] border-r border-[var(--border)] py-4 flex flex-col z-50 transition-all duration-300`}>
          <div className="flex items-center justify-between px-5 mb-8">
            <div className="flex items-center gap-3 text-[var(--accent)] cursor-pointer overflow-hidden">
              <svg className="w-7 h-7 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.53 5.47a1.5 1.5 0 00-2.12 0l-7.9 7.9c-.8.8-2.2.8-3 0s-.8-2.2 0-3l7.9-7.9a1.5 1.5 0 00-2.12-2.12l-7.9 7.9c-1.97 1.97-1.97 5.17 0 7.14s5.17 1.97 7.14 0l7.9-7.9a1.5 1.5 0 000-2.12z"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88a.996.996 0 10-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 10-1.42-1.41z"/>
              </svg>
              {!isCollapsed && <span className="font-bold text-lg whitespace-nowrap">SalesForge</span>}
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-1 px-3">
            {navItems.map((item) => (
              <div 
                key={item.name}
                onClick={() => setActivePage(item.name)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors ${
                  activePage === item.name 
                    ? 'bg-[var(--accent)]/10 text-[var(--accent)] font-medium' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
              </div>
            ))}
          </div>

          <div className="px-3 mt-auto">
            <div className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-[var(--bg-primary)] transition-colors ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
              <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold flex-shrink-0">
                AR
              </div>
              {!isCollapsed && (
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-semibold truncate">Alex Rivera</div>
                  <div className="text-xs text-[var(--text-secondary)] truncate">Sales Manager</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. Top Bar */}
        <div className={`${mainMargin} sticky top-0 h-16 bg-[var(--bg-primary)]/90 backdrop-blur border-b border-[var(--border)] flex items-center justify-between px-6 z-40 transition-all duration-300`}>
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1 rounded-md cursor-pointer">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-64 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg py-1.5 pl-9 pr-4 text-sm outline-none focus:border-[var(--accent)] transition-colors text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
              />
            </div>
            
            <div className="relative cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
              <div className="absolute top-0 right-0 w-2 h-2 bg-[var(--accent)] rounded-full"></div>
            </div>
            
            <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              New Deal
            </button>
          </div>
        </div>

        {/* 3. Stats Row */}
        <div className={`${mainMargin} px-6 pt-6 grid grid-cols-4 gap-4 transition-all duration-300`}>
          {statCards.map((card, i) => (
            <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent)]/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                  {card.icon}
                </div>
                <div className={`text-xs font-semibold px-2 py-1 rounded-full ${card.isUp ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {card.trend}
                </div>
              </div>
              <div className="text-sm text-[var(--text-secondary)] mb-1">{card.label}</div>
              <div className="text-2xl font-bold">{card.value}</div>
            </div>
          ))}
        </div>

        {/* 4. Main Content */}
        <div className={`${mainMargin} px-6 py-4 grid grid-cols-[1fr_340px] gap-4 transition-all duration-300 items-start`}>
          
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            
            {/* Pipeline Funnel */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">Pipeline Funnel</h2>
                <span className="text-xs bg-[var(--bg-primary)] border border-[var(--border)] px-2 py-1 rounded text-[var(--text-secondary)]">This Quarter</span>
              </div>
              
              <div className="flex flex-col gap-3">
                {funnelData.map((row, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-24 text-sm text-[var(--text-secondary)] flex-shrink-0">{row.label}</div>
                    <div className="flex-1 bg-[var(--bg-primary)] rounded h-8 overflow-hidden relative border border-[var(--border)]/50">
                      <div 
                        className="h-full bg-[var(--accent)] transition-all duration-1000"
                        style={{ width: row.width, opacity: row.opacity }}
                      />
                    </div>
                    <div className="w-16 text-right font-medium text-sm flex-shrink-0">{row.count}</div>
                    <div className="w-12 text-right text-xs text-[var(--text-secondary)] flex-shrink-0">{row.percent}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Deals Table */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Recent Deals</h2>
                <button className="text-xs px-3 py-1.5 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-primary)] rounded-md hover:bg-[var(--bg-primary)] transition-colors cursor-pointer flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                  Insert Deal
                </button>
              </div>
              
              <div className="w-full overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-[var(--text-secondary)] uppercase bg-[var(--bg-primary)]/50 border-b border-[var(--border)]">
                    <tr>
                      <th className="px-4 py-3 font-medium">Company</th>
                      <th className="px-4 py-3 font-medium">Value</th>
                      <th className="px-4 py-3 font-medium">Stage</th>
                      <th className="px-4 py-3 font-medium">Close Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDeals.map((deal, i) => (
                      <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-primary)]/50 transition-colors">
                        <td className="px-4 py-3 font-medium">{deal.company}</td>
                        <td className="px-4 py-3">{deal.value}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${deal.stageColor}`}>
                            {deal.stage}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[var(--text-secondary)]">{deal.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>

          {/* Right Column */}
          <div className="sticky top-20 flex flex-col gap-4">
            
            {/* Upcoming Tasks */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
              <h2 className="font-bold text-lg mb-4">Upcoming Tasks</h2>
              <div className="flex flex-col">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 py-3 border-b border-[var(--border)] last:border-0">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer transition-colors ${
                        task.done ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-[var(--text-secondary)] hover:border-[var(--accent)]'
                      }`}
                    >
                      {task.done && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                    </button>
                    <div className={`text-sm flex-1 truncate transition-colors ${task.done ? 'text-[var(--text-secondary)] line-through' : ''}`}>
                      {task.text}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] flex-shrink-0">{task.date}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Recent Activity</h2>
                <a href="#" className="text-xs text-[var(--accent)] hover:underline">View All</a>
              </div>
              <div className="flex flex-col gap-4">
                {activityFeed.map((act, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border)] flex items-center justify-center text-xs font-semibold flex-shrink-0 text-[var(--accent)]">
                      {act.initials}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm leading-tight mb-1">{act.text}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{act.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Variant Switcher (Floating) */}
        <div className="fixed bottom-5 right-5 bg-[var(--bg-card)] p-2.5 rounded-full shadow-lg flex gap-2.5 z-50 border border-[var(--border)]">
          {[
            { id: 'teal', bg: '#14B8A6', label: 'Teal (Default)' },
            { id: 'indigo', bg: '#6366F1', label: 'Indigo' },
            { id: 'amber', bg: '#F59E0B', label: 'Amber' }
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
