import { useState, useEffect } from 'react';

type Variant = 'indigo' | 'teal' | 'amber';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#6366F1': 'indigo',
  '#14B8A6': 'teal',
  '#F59E0B': 'amber',
};

export function AdminCms({ variant = 'indigo' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  
  const [activeNav, setActiveNav] = useState('Content');

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
    { name: 'Dashboard', iconPath: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z' },
    { name: 'Content', iconPath: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
    { name: 'Media', iconPath: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
    { name: 'Users', iconPath: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
    { name: 'Pages', iconPath: 'M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122' },
    { name: 'Comments', iconPath: 'M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z' },
    { name: 'Analytics', iconPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
    { name: 'Settings', iconPath: 'M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z' }
  ];

  const contentRows = [
    { title: 'Exploring the New UI', author: 'Admin', status: 'Published', category: 'Technology', date: 'Oct 26', views: '1,704' },
    { title: '10 Tips for Workflows', author: 'Madison', status: 'Draft', category: 'Lifestyle', date: 'Oct 26', views: '323' },
    { title: 'Design and Analytics', author: 'Sarah', status: 'Published', category: 'Design', date: 'Oct 25', views: '268' },
    { title: 'Efficient Workflows', author: 'Jason', status: 'Published', category: 'Design', date: 'Oct 25', views: '304' },
    { title: 'The New UI', author: 'Sarah', status: 'Scheduled', category: 'Technology', date: 'Oct 24', views: '380' },
    { title: 'Design Trends 2025', author: 'Jason', status: 'Scheduled', category: 'Design', date: 'Oct 24', views: '233' },
    { title: 'Finding Efficiency', author: 'Rakan', status: 'Published', category: 'Design', date: 'Oct 23', views: '357' },
    { title: 'Efficient Workflows', author: 'Hanson', status: 'Published', category: 'Lifestyle', date: 'Oct 23', views: '224' }
  ];

  const renderStatus = (status: string) => {
    let classes = 'rounded-full px-2 py-0.5 text-xs font-medium ';
    if (status === 'Published') classes += 'bg-green-500/10 text-green-500';
    else if (status === 'Draft') classes += 'bg-amber-500/10 text-amber-500';
    else if (status === 'Scheduled') classes += 'bg-blue-500/10 text-blue-500';

    return <span className={classes}>{status}</span>;
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .admin-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .admin-wrapper[data-theme="indigo"] {
          --accent: #6366F1;
          --accent-hover: #4F46E5;
          --accent-light: rgba(99,102,241,0.1);
          --bg-primary: #0A0A12;
          --bg-secondary: #111118;
          --bg-card: #18181F;
          --border: #252530;
          --text-primary: #F1F1F8;
          --text-secondary: #6B6B80;
        }
        .admin-wrapper[data-theme="teal"] {
          --accent: #14B8A6;
          --accent-hover: #0D9488;
          --accent-light: rgba(20,184,166,0.1);
          --bg-primary: #080E0E;
          --bg-secondary: #0E1616;
          --bg-card: #141E1E;
          --border: #1E2E2E;
          --text-primary: #F0FAFA;
          --text-secondary: #5A8A8A;
        }
        .admin-wrapper[data-theme="amber"] {
          --accent: #F59E0B;
          --accent-hover: #D97706;
          --accent-light: rgba(245,158,11,0.1);
          --bg-primary: #0C0A05;
          --bg-secondary: #141008;
          --bg-card: #1A1610;
          --border: #2A2418;
          --text-primary: #FFF8E8;
          --text-secondary: #AA9960;
        }
      `}</style>

      <div 
        className="admin-wrapper grid grid-cols-[220px_1fr_300px] h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]" 
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* Col 1: Sidebar */}
        <div className="w-[220px] bg-[var(--bg-secondary)] border-r border-[var(--border)] py-4 flex flex-col">
          <div className="px-4 mb-6 flex items-center gap-2 text-[var(--accent)]">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <span className="font-bold text-xl tracking-tight">AdminHub</span>
          </div>

          <div className="px-3 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 cursor-pointer transition-colors ${
                  activeNav === item.name
                    ? 'bg-[var(--accent-light)] text-[var(--accent)] font-medium'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                </svg>
                {item.name}
              </div>
            ))}
          </div>

          <div className="px-4 border-t border-[var(--border)] pt-4 mt-auto">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center font-bold">
                A
              </div>
              <div>
                <div className="text-sm font-semibold">Admin User</div>
                <div className="text-xs text-[var(--text-secondary)]">admin@hub.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Col 2: Main */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] flex flex-col">
          <div className="px-6 pt-4">
            <div className="text-sm text-[var(--text-secondary)] mb-2 flex items-center gap-2">
              <span className="cursor-pointer hover:text-[var(--accent)]">Dashboard</span> 
              <span className="text-[var(--border)]">/</span> 
              <span className="text-[var(--accent)] font-medium">Content</span>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-xl">Content Management</h1>
              <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-[var(--accent)]/20">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                New Post
              </button>
            </div>
          </div>

          <div className="px-6 mt-4 grid grid-cols-4 gap-4">
            {[
              { label: 'Total Posts', value: '1,247', color: 'text-[var(--accent)]', iconPath: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
              { label: 'Published', value: '892', color: 'text-green-500', iconPath: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { label: 'Drafts', value: '234', color: 'text-amber-500', iconPath: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125' },
              { label: 'Scheduled', value: '121', color: 'text-blue-500', iconPath: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' }
            ].map((stat, i) => (
              <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 flex items-start gap-4">
                <div className={`p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] ${stat.color}`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.iconPath} />
                  </svg>
                </div>
                <div>
                  <div className="text-[var(--text-secondary)] text-sm mb-1">{stat.label}</div>
                  <div className={`font-bold text-xl ${stat.color}`}>{stat.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 mt-4 flex gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search content..."
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg pl-9 pr-3 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
            {['All Statuses', 'Categories', 'Date Range'].map((filter, i) => (
              <select key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] cursor-pointer appearance-none">
                <option>{filter}</option>
              </select>
            ))}
          </div>

          <div className="px-6 mt-4 pb-6">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border)] text-xs uppercase text-[var(--text-secondary)] tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium">Author</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Views</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contentRows.map((row, i) => (
                    <tr key={i} className="border-b border-[var(--border)]/30 last:border-0 hover:bg-[var(--bg-secondary)]/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-[var(--text-primary)]">{row.title}</td>
                      <td className="px-4 py-3 text-[var(--text-secondary)]">{row.author}</td>
                      <td className="px-4 py-3">{renderStatus(row.status)}</td>
                      <td className="px-4 py-3 text-[var(--text-secondary)]">{row.category}</td>
                      <td className="px-4 py-3 text-[var(--text-secondary)]">{row.date}</td>
                      <td className="px-4 py-3 font-medium">{row.views}</td>
                      <td className="px-4 py-3 flex items-center justify-end gap-2 text-[var(--text-secondary)]">
                        <button className="p-1.5 hover:text-[var(--accent)] hover:bg-[var(--accent-light)] rounded transition-colors cursor-pointer" title="Edit">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                        </button>
                        <button className="p-1.5 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors cursor-pointer" title="Delete">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Col 3: Right Panel */}
        <div className="w-[300px] bg-[var(--bg-secondary)] border-l border-[var(--border)] overflow-y-auto p-4 flex flex-col">
          
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 mb-4 shadow-sm">
            <h2 className="font-bold text-sm mb-3">Quick Actions</h2>
            <button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium py-2 rounded-lg text-sm mb-2 transition-colors cursor-pointer shadow-sm">
              New Post
            </button>
            <button className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text-primary)] text-[var(--text-secondary)] font-medium py-2 rounded-lg text-sm mb-2 transition-colors cursor-pointer">
              Upload Media
            </button>
            <button className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text-primary)] text-[var(--text-secondary)] font-medium py-2 rounded-lg text-sm transition-colors cursor-pointer">
              Manage Users
            </button>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 mb-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-sm">Recent Activity</h2>
              <span className="text-[var(--accent)] text-xs font-medium cursor-pointer hover:underline">View All</span>
            </div>
            <div className="flex flex-col">
              {[
                { text: 'Admin edited post: Top 10 Trends', time: '2m ago', color: 'bg-[var(--accent)]' },
                { text: 'Editor published a new Draft', time: '15m ago', color: 'bg-green-500' },
                { text: 'Admin edited post: Top 10 Trends', time: '1h ago', color: 'bg-amber-500' },
                { text: 'New user registered', time: '2h ago', color: 'bg-blue-500' },
                { text: 'Admin published post', time: '3h ago', color: 'bg-[var(--accent)]' }
              ].map((act, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-[var(--border)]/30 last:border-0 text-xs">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${act.color}`}></span>
                  <span className="flex-1 text-[var(--text-primary)] leading-tight">{act.text}</span>
                  <span className="text-[var(--text-secondary)] shrink-0">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-sm">Content Calendar</h2>
              <div className="flex gap-1">
                <button className="p-1 text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
                <button className="p-1 text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
              </div>
            </div>
            <div className="text-center text-sm mb-2 font-medium text-[var(--text-secondary)]">October 2025</div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-1 font-medium text-[var(--text-secondary)]">
              <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-[var(--text-primary)]">
              {/* Dummy calendar dates */}
              <div className="p-1 text-[var(--text-secondary)] opacity-50">28</div>
              <div className="p-1 text-[var(--text-secondary)] opacity-50">29</div>
              <div className="p-1 text-[var(--text-secondary)] opacity-50">30</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">1</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">2</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">3</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">4</div>
              
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">5</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">6</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer relative">7<span className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[var(--accent)] rounded-full"></span></div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">8</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">9</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">10</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">11</div>

              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">12</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer relative">13<span className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full"></span></div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">14</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">15</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">16</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">17</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">18</div>

              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">19</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">20</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">21</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">22</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">23</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer relative">24<span className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[var(--accent)] rounded-full"></span></div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">25</div>

              <div className="p-1 rounded bg-[var(--accent)] text-white font-bold cursor-pointer">26</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">27</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">28</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">29</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">30</div>
              <div className="p-1 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">31</div>
              <div className="p-1 text-[var(--text-secondary)] opacity-50">1</div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
