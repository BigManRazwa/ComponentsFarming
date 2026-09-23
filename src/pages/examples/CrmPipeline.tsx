import { useState, useEffect } from 'react';

type Variant = 'amber' | 'blue' | 'emerald';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#F59E0B': 'amber',
  '#3B82F6': 'blue',
  '#10B981': 'emerald',
};

export function CrmPipeline({ variant = 'amber' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState('Pipeline');

  const deals = [
    { id: 1, title: 'Global Industries', value: 150000, valueStr: '$150K', probability: 60, contact: 'Sarah', days: 15, column: 'Qualified' },
    { id: 2, title: 'Global Industries', value: 130000, valueStr: '$130K', probability: 55, contact: 'Sarah', days: 15, column: 'Qualified' },
    { id: 3, title: 'TechStart', value: 90000, valueStr: '$90K', probability: 45, contact: 'Mike', days: 8, column: 'Qualified' },
    { id: 4, title: 'Global Corp', value: 100000, valueStr: '$100K', probability: 65, contact: 'John', days: 15, column: 'Proposal' },
    { id: 5, title: 'Global Corp', value: 75000, valueStr: '$75K', probability: 60, contact: 'John', days: 12, column: 'Proposal' },
    { id: 6, title: 'InnoTech', value: 55000, valueStr: '$55K', probability: 50, contact: 'Lisa', days: 10, column: 'Proposal' },
    { id: 7, title: 'Acme Corp', value: 85000, valueStr: '$85K', probability: 80, contact: 'John', days: 10, column: 'Negotiation' },
    { id: 8, title: 'Acme Corp', value: 85000, valueStr: '$85K', probability: 75, contact: 'John', days: 8, column: 'Negotiation' },
    { id: 9, title: 'DataFlow', value: 45000, valueStr: '$45K', probability: 70, contact: 'Sarah', days: 5, column: 'Negotiation' },
    { id: 10, title: 'Won Deal', value: 25000, valueStr: '$25K', probability: 100, contact: 'John', days: 10, column: 'Closed Won' },
    { id: 11, title: 'Won Deal', value: 25000, valueStr: '$25K', probability: 100, contact: 'John', days: 8, column: 'Closed Won' },
    { id: 12, title: 'Won Deal', value: 25000, valueStr: '$25K', probability: 100, contact: 'Lisa', days: 5, column: 'Closed Won' },
    { id: 13, title: 'Won Deal', value: 20000, valueStr: '$20K', probability: 100, contact: 'Mike', days: 3, column: 'Closed Won' },
  ];

  const [selectedDeal, setSelectedDeal] = useState(deals[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(true);

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

  const navItems = [
    { name: 'Dashboard', iconPath: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z' },
    { name: 'Pipeline', iconPath: 'M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z' },
    { name: 'Contacts', iconPath: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
    { name: 'Deals', iconPath: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Tasks', iconPath: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Reports', iconPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
    { name: 'Settings', iconPath: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
  ];

  const columns = [
    { title: 'Qualified', value: '$1.1M', count: 6, key: 'Qualified' },
    { title: 'Proposal', value: '$680K', count: 4, key: 'Proposal' },
    { title: 'Negotiation', value: '$450K', count: 3, key: 'Negotiation' },
    { title: 'Closed Won', value: '$2.4M', count: 5, key: 'Closed Won' }
  ];

  const handleDealClick = (deal: any) => {
    setSelectedDeal(deal);
    setIsDetailOpen(true);
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .pipeline-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .pipeline-wrapper[data-theme="amber"] {
          --accent: #F59E0B;
          --accent-hover: #D97706;
          --accent-light: rgba(245,158,11,0.1);
          --bg-primary: #0F0D08;
          --bg-secondary: #161410;
          --bg-card: #1E1C16;
          --border: #2A2820;
          --text-primary: #FFF8F0;
          --text-secondary: #AA9960;
        }
        .pipeline-wrapper[data-theme="blue"] {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-light: rgba(59,130,246,0.1);
          --bg-primary: #0C1220;
          --bg-secondary: #111828;
          --bg-card: #1A2236;
          --border: #1E2E42;
          --text-primary: #F1F5F9;
          --text-secondary: #64748B;
        }
        .pipeline-wrapper[data-theme="emerald"] {
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
        className="pipeline-wrapper grid grid-cols-[200px_1fr_280px] h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]"
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* Col 1: Sidebar */}
        <div className="bg-[var(--bg-secondary)] border-r border-[var(--border)] py-4 flex flex-col">
          <div className="px-4 mb-5 flex items-center gap-2 text-[var(--accent)]">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            <span className="font-bold text-xl">SalesForce</span>
          </div>

          <div className="px-2 space-y-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                  activeNav === item.name
                    ? 'bg-[var(--accent-light)] text-[var(--accent)] font-medium'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                </svg>
                {item.name}
              </div>
            ))}
          </div>

          <div className="px-4 mt-auto pt-4 border-t border-[var(--border)]">
            <div className="flex items-center gap-3 cursor-pointer hover:bg-[var(--bg-card)] p-2 rounded-lg -mx-2 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--accent)] to-gray-700 flex items-center justify-center font-bold text-white shadow-md text-xs">
                AS
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">Alex Sales</div>
                <div className="text-xs text-[var(--text-secondary)] truncate">Sales Rep</div>
              </div>
            </div>
          </div>
        </div>

        {/* Col 2: Main */}
        <div className="overflow-y-auto bg-[var(--bg-primary)] flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 flex justify-between items-center border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <h1 className="font-bold text-xl">Sales Pipeline</h1>
              <span className="bg-[var(--accent-light)] text-[var(--accent)] text-xs px-2 py-0.5 rounded-full font-medium border border-[var(--accent)]/20">
                Q3 2024
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 border border-[var(--border)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                </svg>
              </button>
              <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer shadow-md shadow-[var(--accent)]/10">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                New Deal
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="px-6 py-4 grid grid-cols-4 gap-3">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="text-xs text-[var(--text-secondary)] font-medium">Total Revenue</div>
                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="font-bold text-xl">$2.4M</div>
            </div>
            
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="text-xs text-[var(--text-secondary)] font-medium">Win Rate</div>
                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <div className="font-bold text-xl">34%</div>
                <div className="flex items-center text-xs font-medium text-emerald-500">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                  </svg>
                  4%
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="text-xs text-[var(--text-secondary)] font-medium">Avg Deal Size</div>
                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <div className="font-bold text-xl">$65K</div>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="text-xs text-[var(--text-secondary)] font-medium">New Leads</div>
                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <div className="font-bold text-xl">45</div>
                <div className="text-xs font-medium text-[var(--accent)]">+12%</div>
              </div>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="px-6 mt-2 flex gap-4 overflow-x-auto pb-4 flex-1">
            {columns.map((col) => (
              <div key={col.key} className="min-w-[220px] flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold text-sm ${col.key === 'Closed Won' ? 'text-[var(--accent)]' : ''}`}>{col.title}</h3>
                    <span className="bg-[var(--bg-card)] rounded-full px-2 text-xs font-medium">{col.count}</span>
                  </div>
                  <span className="text-xs text-[var(--text-secondary)] font-medium">{col.value}</span>
                </div>
                
                <div className="flex flex-col gap-2 flex-1">
                  {deals.filter(d => d.column === col.key).map(deal => (
                    <div 
                      key={deal.id}
                      onClick={() => handleDealClick(deal)}
                      className={`bg-[var(--bg-card)] border rounded-xl p-3 cursor-pointer transition-colors ${
                        selectedDeal?.id === deal.id 
                          ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]' 
                          : 'border-[var(--border)] hover:border-[var(--accent)]/40'
                      }`}
                    >
                      <div className="font-bold text-sm truncate">{deal.title}</div>
                      <div className="font-bold text-base text-[var(--accent)] mt-1">{deal.valueStr}</div>
                      
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-[var(--text-secondary)]">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        {deal.contact}
                      </div>

                      <div className="h-1.5 bg-[var(--bg-secondary)] rounded-full mt-3 overflow-hidden">
                        <div 
                          className="h-full bg-[var(--accent)] rounded-full"
                          style={{ width: `${deal.probability}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2 text-xs text-[var(--text-secondary)] font-medium">
                        <span>{deal.probability}%</span>
                        <span>{deal.days}d</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: Detail Panel */}
        {isDetailOpen && selectedDeal && (
          <div className="bg-[var(--bg-secondary)] border-l border-[var(--border)] overflow-y-auto p-5 relative flex flex-col">
            <div className="flex justify-between items-start mb-1">
              <h2 className="font-bold text-base truncate pr-6">{selectedDeal.title}</h2>
              <button 
                onClick={() => setIsDetailOpen(false)}
                className="absolute top-5 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mt-2">
              <div className="text-xs text-[var(--text-secondary)]">Deal Value</div>
              <div className="font-bold text-2xl text-[var(--accent)]">{selectedDeal.valueStr}</div>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between border-b border-[var(--border)]/50 pb-2">
                <span className="text-[var(--text-secondary)]">Stage</span>
                <span className="font-medium">{selectedDeal.column}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--border)]/50 pb-2">
                <span className="text-[var(--text-secondary)]">Probability</span>
                <span className="font-medium">{selectedDeal.probability}%</span>
              </div>
              <div className="flex justify-between border-b border-[var(--border)]/50 pb-2">
                <span className="text-[var(--text-secondary)]">Owner</span>
                <span className="font-medium">John Doe</span>
              </div>
              <div className="flex justify-between border-b border-[var(--border)]/50 pb-2">
                <span className="text-[var(--text-secondary)]">Close Date</span>
                <span className="font-medium">Sep 30, 2024</span>
              </div>
            </div>

            <div className="mt-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3">
              <div className="font-bold text-sm mb-2">Contact</div>
              <div className="text-xs text-[var(--text-secondary)] space-y-1.5">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  johndoe@acme.com
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.54-4.24-7.136-7.136l1.292-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  +1 (555) 123-4567
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="font-bold text-sm mb-3">Activity</h3>
              <div className="relative border-l-2 border-[var(--border)] pl-4 ml-1 space-y-4">
                <div className="relative">
                  <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-[var(--accent)] ring-4 ring-[var(--bg-secondary)]"></div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <svg className="w-3.5 h-3.5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.54-4.24-7.136-7.136l1.292-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <div className="font-bold text-xs">Initial Call</div>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">Discussed requirements</div>
                  <div className="text-[10px] text-[var(--text-secondary)] mt-1 font-medium">Jul 15</div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-[var(--accent)] ring-4 ring-[var(--bg-secondary)]"></div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <svg className="w-3.5 h-3.5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <div className="font-bold text-xs">Proposal Sent</div>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">Sent pricing doc</div>
                  <div className="text-[10px] text-[var(--text-secondary)] mt-1 font-medium">Aug 5</div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-[var(--accent)] ring-4 ring-[var(--bg-secondary)]"></div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <svg className="w-3.5 h-3.5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <div className="font-bold text-xs">Demo</div>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">Product walkthrough</div>
                  <div className="text-[10px] text-[var(--text-secondary)] mt-1 font-medium">Aug 20</div>
                </div>
              </div>
            </div>

            <div className="mt-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3">
              <div className="font-bold text-sm mb-1">Next Steps</div>
              <div className="text-sm text-[var(--text-secondary)]">Follow up on proposal</div>
            </div>

            <button className="mt-5 w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl py-3 font-bold transition-colors cursor-pointer shadow-md shadow-[var(--accent)]/20 mb-4">
              Close Deal
            </button>
          </div>
        )}
      </div>
    </>
  );
}
