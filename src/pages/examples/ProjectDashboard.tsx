import { useState, useEffect } from 'react';

type Variant = 'cyan' | 'violet' | 'amber';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#06B6D4': 'cyan',
  '#8B5CF6': 'violet',
  '#F59E0B': 'amber',
};

export function ProjectDashboard({ variant = 'cyan' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  
  const [activeNav, setActiveNav] = useState('My Work');
  const [activeTab, setActiveTab] = useState('List');
  const [isDetailOpen, setIsDetailOpen] = useState(true);
  const [inProgressOpen, setInProgressOpen] = useState(true);

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
    { name: 'My Work', iconPath: 'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z' },
    { name: 'Projects', iconPath: 'M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z' },
    { name: 'Roadmap', iconPath: 'M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z' },
    { name: 'Teams', iconPath: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z' },
    { name: 'Goals', iconPath: 'M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 0 1-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54m.023-8.25H16.48a4.5 4.5 0 0 1-1.423-.23l-3.114-1.04a4.5 4.5 0 0 0-1.423-.23H6.504c-.361 0-.633.304-.598.66.09 1.119.144 2.254.144 3.4m0 0c0 1.146-.054 2.281-.144 3.4-.035.356.237.66.598.66h3.99c.42 0 .835-.083 1.22-.241l3.522-1.447c.365-.15.753-.228 1.149-.228h1.22m0 0a8.959 8.959 0 0 0-1.001-.21m0 0a8.956 8.956 0 0 1-1.001.21' },
    { name: 'Reports', iconPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z' }
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .project-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .project-wrapper[data-theme="cyan"] {
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
        .project-wrapper[data-theme="violet"] {
          --accent: #8B5CF6;
          --accent-hover: #7C3AED;
          --accent-light: rgba(139,92,246,0.1);
          --bg-primary: #0C0A14;
          --bg-secondary: #14101E;
          --bg-card: #1A1428;
          --border: #241E3A;
          --text-primary: #F1F0FF;
          --text-secondary: #7C72A8;
        }
        .project-wrapper[data-theme="amber"] {
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
      `}</style>

      <div 
        className="project-wrapper grid grid-cols-[220px_1fr_320px] h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]" 
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* Col 1: Sidebar */}
        <div className="w-[220px] bg-[var(--bg-secondary)] border-r border-[var(--border)] py-4 flex flex-col">
          <div className="px-5 mb-5 flex items-center gap-2 text-[var(--accent)]">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            <span className="font-bold text-xl">Planify</span>
          </div>

          <div className="px-2">
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

          <div className="px-4 mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase text-[var(--text-secondary)] font-semibold tracking-wider">Projects</span>
              <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="py-2 px-3 rounded-lg text-sm cursor-pointer flex items-center gap-2 text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Web Platform 1.8
              </div>
              <div className="py-2 px-3 rounded-lg text-sm cursor-pointer flex items-center gap-2 bg-[var(--bg-card)] font-medium">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
                Mobile App v2.0
              </div>
            </div>
          </div>

          <div className="px-4 mt-auto pt-4 border-t border-[var(--border)]">
            <div className="flex items-center gap-3 cursor-pointer hover:bg-[var(--bg-card)] p-2 rounded-lg -mx-2 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--accent)] to-blue-500 flex items-center justify-center font-bold text-white shadow-md">
                SJ
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">Sarah Johnson</div>
                <div className="text-xs text-[var(--text-secondary)] truncate">Admin</div>
              </div>
            </div>
          </div>
        </div>

        {/* Col 2: Main Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] flex flex-col relative">
          {/* Project Header */}
          <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-bold text-xl">Mobile App v2.0</h1>
                <span className="bg-[var(--accent-light)] text-[var(--accent)] text-xs px-2 py-0.5 rounded-full font-medium border border-[var(--accent)]/20">In Progress</span>
              </div>
              <div className="flex items-center gap-3 w-64">
                <div className="flex-1 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent)] w-[67%] rounded-full"></div>
                </div>
                <span className="text-xs text-[var(--text-secondary)] shrink-0">24 of 36 tasks complete</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-[var(--bg-primary)]"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-[var(--bg-primary)]"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 border-2 border-[var(--bg-primary)]"></div>
                <div className="w-8 h-8 rounded-full bg-[var(--bg-card)] border-2 border-[var(--bg-primary)] flex items-center justify-center text-xs font-medium text-[var(--text-secondary)]">+2</div>
              </div>
              <button className="p-2 border border-[var(--border)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 border-b border-[var(--border)] flex gap-1">
            {['Board', 'List', 'Timeline', 'Calendar'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium cursor-pointer transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-[var(--accent)] text-[var(--accent)]'
                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="px-6 py-3 flex gap-3 items-center border-b border-[var(--border)] bg-[var(--bg-primary)]">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search..."
                className="w-48 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg pl-9 pr-3 py-1.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
            <select className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-sm text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] cursor-pointer appearance-none">
              <option>Assignees</option>
            </select>
            <select className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-sm text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] cursor-pointer appearance-none">
              <option>Priority</option>
            </select>
            <select className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-sm text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] cursor-pointer appearance-none ml-auto">
              <option>Sort: Due Date</option>
            </select>
            <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer shadow-md shadow-[var(--accent)]/10 ml-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Task
            </button>
          </div>

          {/* Task Groups */}
          <div className="px-6 py-4 flex-1">
            
            {/* In Progress */}
            <div className="mb-6">
              <div 
                className="flex items-center gap-2 mb-3 cursor-pointer group"
                onClick={() => setInProgressOpen(!inProgressOpen)}
              >
                <svg className={`w-4 h-4 text-[var(--text-secondary)] transition-transform ${inProgressOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <h2 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">In Progress</h2>
                <span className="text-xs text-[var(--text-secondary)] bg-[var(--bg-card)] px-2 py-0.5 rounded-full ml-1">4 tasks</span>
              </div>
              
              {inProgressOpen && (
                <div className="flex flex-col gap-2">
                  {[
                    { title: 'Design new user onboarding flow', tag: 'Design', user: 'SJ', bg: 'from-purple-500 to-pink-500', date: 'Oct 20', priority: 'bg-red-500' },
                    { title: 'Implement authentication API', tag: 'Backend', user: 'MK', bg: 'from-blue-500 to-cyan-500', date: 'Oct 18', priority: 'bg-red-500' },
                    { title: 'Build settings screen', tag: 'Frontend', user: 'SJ', bg: 'from-purple-500 to-pink-500', date: 'Oct 22', priority: 'bg-amber-500' },
                    { title: 'Write API documentation', tag: 'Docs', user: 'AL', bg: 'from-green-400 to-emerald-600', date: 'Oct 24', priority: 'bg-amber-500' }
                  ].map((task, i) => (
                    <div 
                      key={i} 
                      className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-3 flex items-center gap-4 cursor-pointer hover:border-[var(--accent)]/50 transition-colors shadow-sm"
                      onClick={() => setIsDetailOpen(true)}
                    >
                      <div className="w-4 h-4 border border-[var(--border)] rounded flex-shrink-0 cursor-pointer hover:border-[var(--accent)]"></div>
                      <div className={`w-2 h-2 rounded-full ${task.priority} flex-shrink-0`}></div>
                      <div className="flex-1 text-sm font-medium">{task.title}</div>
                      <div className="text-xs rounded-full px-2.5 py-0.5 bg-[var(--accent-light)] text-[var(--accent)] font-medium border border-[var(--accent)]/10">{task.tag}</div>
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${task.bg} flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}>{task.user}</div>
                      <div className="text-xs text-[var(--text-secondary)] w-12 text-right">{task.date}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* To Do */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 cursor-pointer group">
                  <svg className="w-4 h-4 text-[var(--text-secondary)] rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <h2 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">To Do</h2>
                  <span className="text-xs text-[var(--text-secondary)] bg-[var(--bg-card)] px-2 py-0.5 rounded-full ml-1">5 tasks</span>
                </div>
                <button className="text-[var(--text-secondary)] hover:text-[var(--accent)] text-sm flex items-center gap-1 cursor-pointer">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add Task
                </button>
              </div>
              
              <div className="flex flex-col gap-2">
                {[
                  { title: 'Update documentation', tag: 'Docs', user: 'AL', bg: 'from-green-400 to-emerald-600', date: 'Oct 25', priority: 'bg-amber-500' },
                  { title: 'Refactor login logic', tag: 'Backend', user: 'MK', bg: 'from-blue-500 to-cyan-500', date: 'Oct 27', priority: 'bg-green-500' },
                  { title: 'Design dark mode', tag: 'Design', user: 'SJ', bg: 'from-purple-500 to-pink-500', date: 'Oct 28', priority: 'bg-amber-500' },
                  { title: 'Add unit tests', tag: 'Testing', user: 'MK', bg: 'from-blue-500 to-cyan-500', date: 'Oct 30', priority: 'bg-green-500' },
                  { title: 'Optimize images', tag: 'Frontend', user: 'AL', bg: 'from-green-400 to-emerald-600', date: 'Nov 1', priority: 'bg-green-500' }
                ].map((task, i) => (
                  <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-3 flex items-center gap-4 cursor-pointer hover:border-[var(--accent)]/50 transition-colors shadow-sm">
                    <div className="w-4 h-4 border border-[var(--border)] rounded flex-shrink-0 cursor-pointer hover:border-[var(--accent)]"></div>
                    <div className={`w-2 h-2 rounded-full ${task.priority} flex-shrink-0`}></div>
                    <div className="flex-1 text-sm font-medium">{task.title}</div>
                    <div className="text-xs rounded-full px-2.5 py-0.5 bg-[var(--accent-light)] text-[var(--accent)] font-medium border border-[var(--accent)]/10">{task.tag}</div>
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${task.bg} flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}>{task.user}</div>
                    <div className="text-xs text-[var(--text-secondary)] w-12 text-right">{task.date}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Done */}
            <div>
              <div className="flex items-center gap-2 mb-3 cursor-pointer group">
                <svg className="w-4 h-4 text-[var(--text-secondary)] rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <h2 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">Done</h2>
                <span className="text-xs text-[var(--text-secondary)] bg-[var(--bg-card)] px-2 py-0.5 rounded-full ml-1">3 tasks</span>
              </div>
              
              <div className="flex flex-col gap-2 opacity-75">
                {[
                  { title: 'Setup CI/CD pipeline', tag: 'DevOps', user: 'MK', bg: 'from-blue-500 to-cyan-500', date: 'Oct 10' },
                  { title: 'Finalize wireframes', tag: 'Design', user: 'SJ', bg: 'from-purple-500 to-pink-500', date: 'Oct 8' },
                  { title: 'Database schema', tag: 'Backend', user: 'AL', bg: 'from-green-400 to-emerald-600', date: 'Oct 5' }
                ].map((task, i) => (
                  <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-3 flex items-center gap-4 shadow-sm">
                    <div className="w-4 h-4 rounded flex-shrink-0 bg-green-500/20 text-green-500 flex items-center justify-center">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                    <div className="flex-1 text-sm font-medium text-[var(--text-secondary)] line-through decoration-[var(--border)]">{task.title}</div>
                    <div className="text-xs rounded-full px-2.5 py-0.5 bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-medium border border-[var(--border)]">{task.tag}</div>
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${task.bg} flex items-center justify-center text-[10px] font-bold text-white shadow-sm grayscale`}>{task.user}</div>
                    <div className="text-xs text-green-500/70 w-20 text-right font-medium">Completed</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Col 3: Detail Panel */}
        {isDetailOpen && (
          <div className="w-[320px] bg-[var(--bg-secondary)] border-l border-[var(--border)] overflow-y-auto p-5 relative flex flex-col">
            <button 
              onClick={() => setIsDetailOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] rounded-lg transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-xs text-[var(--text-secondary)] font-medium tracking-wide">ID: MAP-124</div>
            <h2 className="font-bold text-lg mt-3 leading-snug">Design new user onboarding flow</h2>
            
            <div className="mt-5 flex flex-col gap-4">
              <div className="flex items-center">
                <div className="w-24 text-sm text-[var(--text-secondary)]">Status</div>
                <div className="bg-[var(--accent-light)] text-[var(--accent)] text-xs px-2.5 py-1 rounded-md font-medium border border-[var(--accent)]/20 inline-flex">In Progress</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-24 text-sm text-[var(--text-secondary)]">Assignee</div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">SJ</div>
                  <span className="text-sm font-medium">Sarah J.</span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-24 text-sm text-[var(--text-secondary)]">Due Date</div>
                <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-primary)]">
                  <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  Oct 20
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-24 text-sm text-[var(--text-secondary)]">Priority</div>
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  High
                </div>
              </div>
            </div>

            <hr className="border-[var(--border)] my-6" />
            
            <div>
              <h3 className="font-bold text-sm mb-2 text-[var(--text-primary)]">Description</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Define user journey for new users to build the first onboarding high-fidelity mockup.
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-sm mb-3 text-[var(--text-primary)]">Subtasks</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 w-4 h-4 rounded bg-green-500/20 text-green-500 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div className="flex-1 text-sm text-[var(--text-secondary)] line-through">Map user journey</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">Done</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 w-4 h-4 rounded border border-[var(--border)] bg-[var(--bg-card)] flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-[1px] bg-[var(--accent)]"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[var(--text-primary)] mb-1">Create high-fidelity mockups</div>
                    <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--accent)] w-[60%] rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-[10px] font-medium text-[var(--text-secondary)]">60%</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 w-4 h-4 rounded border border-[var(--border)] shrink-0"></div>
                  <div className="flex-1 text-sm text-[var(--text-primary)]">User testing</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex-1">
              <h3 className="font-bold text-sm mb-4 text-[var(--text-primary)]">Comments</h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 pb-3 border-b border-[var(--border)]/50">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-1">SJ</div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-bold text-xs text-[var(--text-primary)]">Sarah J.</span>
                      <span className="text-[10px] text-[var(--text-secondary)]">3 hours ago</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Design new user onboarding flow process!</p>
                  </div>
                </div>
                
                <div className="flex gap-3 pb-3 border-b border-[var(--border)]/50">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-1">MK</div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-bold text-xs text-[var(--text-primary)]">Mike K.</span>
                      <span className="text-[10px] text-[var(--text-secondary)]">2 hours ago</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Build settings screen looks good.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border)] bg-[var(--bg-secondary)] sticky bottom-0">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Add a comment..."
                  className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg pl-3 pr-10 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)]"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[var(--accent)] hover:bg-[var(--accent-light)] rounded-md transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
}
