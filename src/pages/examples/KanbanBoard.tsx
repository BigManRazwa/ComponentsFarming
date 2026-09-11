import { useState, useEffect } from 'react';

type Variant = 'ocean' | 'violet' | 'pine';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#3B82F6': 'ocean',
  '#3b82f6': 'ocean',
  '#8B5CF6': 'violet',
  '#8b5cf6': 'violet',
  '#059669': 'pine',
};

export function KanbanBoard({ variant = 'ocean' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customAccent, setCustomAccent] = useState<{ accent: string; hover: string } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;

      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('ocean');
        setCustomAccent(null);
        return;
      }

      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) {
        setActiveTheme(themeName);
        setCustomAccent(null);
      } else {
        setActiveTheme('ocean');
        setCustomAccent({
          accent: variation.accent,
          hover: variation.accent,
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const navItems = [
    { name: 'Dashboard', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>, active: false },
    { name: 'Board', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.5-15h15c.828 0 1.5.672 1.5 1.5v12c0 .828-.672 1.5-1.5 1.5h-15c-.828 0-1.5-.672-1.5-1.5v-12c0-.828.672-1.5 1.5-1.5z" /></svg>, active: true },
    { name: 'Timeline', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>, active: false },
    { name: 'Team', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>, active: false },
    { name: 'Settings', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, active: false }
  ];

  const columns = [
    {
      id: 'backlog',
      title: 'Backlog',
      count: 4,
      tasks: [
        { id: 't1', title: 'Fix auth token refresh', desc: "Token expires but doesn't auto-refresh...", tags: [{ label: 'Bug', color: 'tag-red' }, { label: 'High', color: 'tag-amber' }], comments: 3, attachments: 1, avatar: 'JD', priority: 'amber' },
        { id: 't2', title: 'Dark mode settings', desc: 'Add toggle in user preferences', tags: [{ label: 'Feature', color: 'tag-blue' }], comments: 5, attachments: 0, avatar: 'AR', priority: 'amber' },
        { id: 't3', title: 'Competitor analysis Q4', desc: 'Review competitor features...', tags: [{ label: 'Research', color: 'tag-green' }], comments: 2, attachments: 2, avatar: 'SK', priority: 'green' },
        { id: 't4', title: 'Onboarding flow redesign', desc: 'Simplify the 5-step...', tags: [{ label: 'Design', color: 'bg-purple-900' }], comments: 8, attachments: 0, avatar: 'MK', priority: 'amber' }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      count: 3,
      tasks: [
        { id: 't5', title: 'User dashboard v2', desc: 'Rebuild with new chart library', tags: [{ label: 'Feature', color: 'tag-blue' }, { label: 'High', color: 'tag-amber' }], comments: 12, attachments: 4, avatar: 'JD', priority: 'red', progress: 60 },
        { id: 't6', title: 'Memory leak in WebSocket', desc: 'Connection not closing on unmount', tags: [{ label: 'Bug', color: 'tag-red' }], comments: 6, attachments: 0, avatar: 'AR', priority: 'red' },
        { id: 't7', title: 'Export to PDF', desc: 'Allow users to export reports', tags: [{ label: 'Feature', color: 'tag-blue' }], comments: 3, attachments: 1, avatar: 'SK', priority: 'green' }
      ]
    },
    {
      id: 'review',
      title: 'Review',
      count: 2,
      tasks: [
        { id: 't8', title: 'Payment integration', desc: 'Stripe API v3 migration', tags: [{ label: 'Feature', color: 'tag-blue' }, { label: 'Urgent', color: 'tag-red' }], comments: 15, attachments: 6, avatar: 'MK', priority: 'red' },
        { id: 't9', title: 'Email templates', desc: 'Responsive transactional emails', tags: [{ label: 'Design', color: 'tag-amber' }], comments: 4, attachments: 0, avatar: 'JD', priority: 'amber' }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      count: 3,
      muted: true,
      tasks: [
        { id: 't10', title: 'SSO implementation', desc: '', tags: [{ label: 'Feature', color: 'tag-blue' }], comments: 9, attachments: 0, avatar: 'AR', priority: 'green', done: true },
        { id: 't11', title: 'Fix timezone offset', desc: '', tags: [{ label: 'Bug', color: 'tag-red' }], comments: 2, attachments: 0, avatar: 'SK', priority: 'green', done: true },
        { id: 't12', title: 'API rate limiting', desc: '', tags: [{ label: 'Feature', color: 'tag-blue' }], comments: 7, attachments: 0, avatar: 'MK', priority: 'green', done: true }
      ]
    }
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .kanban-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .kanban-wrapper[data-theme="ocean"] {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --bg-primary: #0B1120;
          --bg-secondary: #111827;
          --bg-card: #1E293B;
          --bg-column: #151D2E;
          --border: #1E3050;
          --text-primary: #F1F5F9;
          --text-secondary: #64748B;
          --tag-blue: #1E3A5F;
          --tag-green: #14532D;
          --tag-amber: #78350F;
          --tag-red: #7F1D1D;
        }
        .kanban-wrapper[data-theme="violet"] {
          --accent: #8B5CF6;
          --accent-hover: #7C3AED;
          --bg-primary: #0D0B1A;
          --bg-secondary: #141028;
          --bg-card: #1E1835;
          --bg-column: #16102A;
          --border: #2A1E50;
          --text-primary: #F1F0FF;
          --text-secondary: #7C72A8;
          --tag-blue: #1E1A5F;
          --tag-green: #14402D;
          --tag-amber: #5F3A0F;
          --tag-red: #5F1D2D;
        }
        .kanban-wrapper[data-theme="pine"] {
          --accent: #059669;
          --accent-hover: #047857;
          --bg-primary: #0A110E;
          --bg-secondary: #0F1A15;
          --bg-card: #162220;
          --bg-column: #10201A;
          --border: #1E3830;
          --text-primary: #F0FFF5;
          --text-secondary: #5A8A70;
          --tag-blue: #1A3A5F;
          --tag-green: #0A4020;
          --tag-amber: #5F440F;
          --tag-red: #5F1D1D;
        }
        ${customAccent ? `
        .kanban-wrapper {
          --accent: ${customAccent.accent} !important;
          --accent-hover: ${customAccent.hover} !important;
        }
        ` : ''}
        
        .tag-blue { background-color: var(--tag-blue); }
        .tag-green { background-color: var(--tag-green); }
        .tag-amber { background-color: var(--tag-amber); }
        .tag-red { background-color: var(--tag-red); }
      `}</style>

      <div className="kanban-wrapper min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col" data-theme={activeTheme}>
        
        {/* 1. Sidebar */}
        <div className={`fixed top-0 left-0 h-screen bg-[var(--bg-secondary)] border-r border-[var(--border)] flex flex-col z-50 transition-all duration-300 ${isSidebarOpen ? 'w-56' : 'w-20'}`}>
          <div className="flex items-center justify-between p-4 mb-2">
            <div className={`flex items-center gap-2 text-[var(--accent)] font-bold text-xl cursor-pointer ${!isSidebarOpen && 'hidden'}`}>
              <svg className="w-7 h-7 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/></svg>
              TaskFlow
            </div>
            {!isSidebarOpen && (
              <svg className="w-7 h-7 flex-shrink-0 text-[var(--accent)] mx-auto cursor-pointer" onClick={() => setIsSidebarOpen(true)} fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/></svg>
            )}
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
              <svg className={`w-5 h-5 transition-transform ${!isSidebarOpen ? 'hidden' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
            </button>
          </div>
          
          <div className="flex-1 px-3">
            {navItems.map((item, i) => (
              <div 
                key={i}
                className={`flex items-center ${isSidebarOpen ? 'px-3 justify-start' : 'justify-center'} py-2 mb-1 rounded-lg text-sm cursor-pointer transition-colors ${
                  item.active
                    ? 'bg-[var(--accent)]/10 text-[var(--accent)]' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'
                }`}
                title={!isSidebarOpen ? item.name : undefined}
              >
                {item.icon}
                {isSidebarOpen && <span className="ml-3 font-medium">{item.name}</span>}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-[var(--border)] flex items-center gap-3 cursor-pointer hover:bg-[var(--bg-primary)] transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--accent)] to-white/20 flex-shrink-0 flex items-center justify-center text-sm font-bold">AR</div>
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <div className="text-sm font-semibold truncate">Alex Rivera</div>
                <div className="text-xs text-[var(--accent)] bg-[var(--accent)]/10 inline-block px-1.5 py-0.5 rounded mt-0.5">Pro Plan</div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-56' : 'ml-20'}`}>
          
          {/* 2. Top Bar */}
          <div className="sticky top-0 h-16 bg-[var(--bg-primary)] border-b border-[var(--border)] z-40 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold">Product Launch</h1>
              <span className="bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold px-2 py-1 rounded">Sprint 4</span>
            </div>
            
            <div className="flex-1 max-w-md mx-6">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                <input 
                  type="text" 
                  placeholder="Search tasks..." 
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg py-2 pl-9 pr-4 text-sm outline-none focus:border-[var(--accent)] transition-colors text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" /></svg>
              </button>
              <button className="relative text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[var(--bg-primary)]"></div>
              </button>
              <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                Add Task
              </button>
            </div>
          </div>

          {/* 3. Kanban Columns */}
          <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 pb-20">
            <div className="flex gap-4 h-full">
              {columns.map(col => (
                <div key={col.id} className="w-72 flex-shrink-0 bg-[var(--bg-column)] rounded-xl border border-[var(--border)] p-3 flex flex-col max-h-full">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-sm">{col.title}</h2>
                      <span className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-xs px-2 py-0.5 rounded-full">{col.count}</span>
                    </div>
                    <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {col.tasks.map(task => (
                      <div key={task.id} className={`bg-[var(--bg-card)] rounded-lg border border-[var(--border)] p-3 cursor-pointer hover:border-[var(--accent)]/50 transition-colors shadow-sm ${col.muted ? 'opacity-80' : ''}`}>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {task.tags.map((tag, i) => (
                            <span key={i} className={`${tag.color} text-white/90 text-[10px] font-medium px-2 py-0.5 rounded`}>
                              {tag.label}
                            </span>
                          ))}
                        </div>
                        
                        <div className="font-semibold text-sm mb-1 leading-snug">
                          {task.title}
                        </div>
                        
                        {task.desc && (
                          <div className="text-[var(--text-secondary)] text-xs mb-3 truncate">
                            {task.desc}
                          </div>
                        )}

                        {(task as any).progress !== undefined && (
                          <div className="w-full bg-[var(--bg-secondary)] rounded-full h-1.5 mb-3">
                            <div className="bg-[var(--accent)] h-1.5 rounded-full" style={{ width: `${(task as any).progress}%` }}></div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]/50">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[var(--accent)] to-white/20 flex items-center justify-center text-[10px] font-bold">
                              {task.avatar}
                            </div>
                            {task.priority === 'red' && <div className="w-2 h-2 rounded-full bg-red-500" title="Urgent Priority"></div>}
                            {task.priority === 'amber' && <div className="w-2 h-2 rounded-full bg-amber-500" title="High Priority"></div>}
                            {task.priority === 'green' && <div className="w-2 h-2 rounded-full bg-emerald-500" title="Normal Priority"></div>}
                          </div>
                          
                          <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                            {(task as any).done ? (
                              <div className="flex items-center gap-1 text-emerald-500">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                              </div>
                            ) : (
                              <>
                                {task.attachments > 0 && (
                                  <div className="flex items-center gap-1 text-xs">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {task.attachments}
                                  </div>
                                )}
                                <div className="flex items-center gap-1 text-xs">
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                  {task.comments}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 4. Progress Footer Bar */}
          <div className={`fixed bottom-0 right-0 bg-[var(--bg-secondary)] border-t border-[var(--border)] px-6 py-2.5 flex items-center justify-between z-40 transition-all duration-300 ${isSidebarOpen ? 'left-56' : 'left-20'}`}>
            <div className="flex items-center gap-4 flex-1 max-w-2xl">
              <span className="text-sm font-semibold whitespace-nowrap">Sprint 4</span>
              <div className="flex-1 flex items-center gap-3">
                <div className="w-full bg-[var(--bg-primary)] rounded-full h-2 border border-[var(--border)]">
                  <div className="bg-[var(--accent)] h-1.5 rounded-full m-[1px]" style={{ width: '55%' }}></div>
                </div>
                <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap">55% (7 of 12 tasks done)</span>
              </div>
            </div>
            <div className="text-sm text-[var(--text-secondary)] flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              4 days remaining
            </div>
          </div>
        </div>

        {/* Floating Theme Switcher */}
        <div className="fixed top-20 right-6 bg-[var(--bg-card)] p-2 rounded-full shadow-lg flex flex-col gap-2 z-[100] border border-[var(--border)]">
          {[
            { id: 'ocean', bg: '#3B82F6', label: 'Ocean Blue' },
            { id: 'violet', bg: '#8B5CF6', label: 'Violet' },
            { id: 'pine', bg: '#059669', label: 'Pine Green' }
          ].map(theme => (
            <button 
              key={theme.id}
              onClick={() => {
                setActiveTheme(theme.id as Variant);
                setCustomAccent(null);
              }}
              className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-transform relative group hover:scale-110 ${activeTheme === theme.id && !customAccent ? 'border-white scale-110' : 'border-transparent'}`}
              style={{ background: theme.bg }}
            >
              <span className="absolute right-10 top-1/2 -translate-y-1/2 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border)] text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 shadow-lg">
                {theme.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--text-secondary);
        }
      `}</style>
    </>
  );
}
