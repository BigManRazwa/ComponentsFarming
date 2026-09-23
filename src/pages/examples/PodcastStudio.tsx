import { useState, useEffect } from 'react';

type Variant = 'rose' | 'violet' | 'cyan';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#F43F5E': 'rose',
  '#8B5CF6': 'violet',
  '#06B6D4': 'cyan',
};

export function PodcastStudio({ variant = 'rose' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [selectedEpisode, setSelectedEpisode] = useState(156);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('rose'); 
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
    { name: 'Episodes', iconPath: 'M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z' },
    { name: 'Analytics', iconPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
    { name: 'Subscribers', iconPath: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
    { name: 'Monetize', iconPath: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Settings', iconPath: 'M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z' }
  ];

  const episodes = [
    { ep: 156, title: 'AI Revolution', duration: '35:21', date: 'Aug 11', plays: '1,892', status: 'Published' },
    { ep: 155, title: 'Future of Web3', duration: '42:15', date: 'Aug 4', plays: '1,654', status: 'Published' },
    { ep: 154, title: 'Design Systems', duration: '28:30', date: 'Jul 28', plays: '2,103', status: 'Published' },
    { ep: 153, title: 'Startup Stories', duration: '45:00', date: '—', plays: '—', status: 'Draft' },
    { ep: 152, title: 'Cloud Computing', duration: '38:45', date: 'Aug 20', plays: '—', status: 'Scheduled' },
  ];

  const renderStatus = (status: string) => {
    let classes = 'text-xs rounded-full px-2 py-0.5 font-medium ';
    if (status === 'Published') classes += 'bg-[var(--accent)] text-white';
    else if (status === 'Draft') classes += 'bg-amber-500 text-amber-950';
    else if (status === 'Scheduled') classes += 'bg-blue-500 text-blue-950';
    return <span className={classes}>{status}</span>;
  };

  // Fixed array of 40 numbers for stable waveform heights
  const waveformHeights = [
    40, 60, 30, 80, 50, 20, 70, 90, 45, 25, 
    35, 75, 55, 85, 95, 30, 65, 45, 80, 50, 
    70, 90, 60, 40, 20, 85, 35, 55, 75, 25,
    95, 45, 65, 30, 80, 50, 70, 90, 60, 40
  ];
  
  // Fixed array of 20 numbers for mini waveform heights
  const miniWaveformHeights = [
    30, 70, 40, 80, 50, 90, 45, 25, 65, 85, 
    35, 55, 75, 40, 60, 95, 50, 70, 30, 80
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .podcast-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .podcast-wrapper[data-theme="rose"] {
          --accent: #F43F5E;
          --accent-hover: #E11D48;
          --accent-light: rgba(244,63,94,0.1);
          --bg-primary: #0F0A0C;
          --bg-secondary: #1A1014;
          --bg-card: #241620;
          --border: #3A2030;
          --text-primary: #FFF0F3;
          --text-secondary: #C08090;
        }
        .podcast-wrapper[data-theme="violet"] {
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
        .podcast-wrapper[data-theme="cyan"] {
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
      `}</style>

      <div 
        className="podcast-wrapper grid grid-cols-[200px_1fr_300px] h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]" 
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* Col 1: Sidebar */}
        <div className="bg-[var(--bg-secondary)] border-r border-[var(--border)] py-4 flex flex-col">
          <div className="px-4 mb-5 flex items-center gap-2 text-[var(--accent)]">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-bold text-lg tracking-tight">PodStudio</span>
          </div>

          <div className="px-2 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-1 cursor-pointer transition-colors ${
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

          <div className="px-4 pt-4 mt-auto border-t border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--bg-card)] flex items-center justify-center font-bold text-white shadow-sm shadow-[var(--accent-light)]">
                TT
              </div>
              <div>
                <div className="text-sm font-bold text-[var(--text-primary)]">Tech Talk Daily</div>
                <div className="text-xs text-[var(--text-secondary)]">12.4K subs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Col 2: Main */}
        <div className="overflow-y-auto bg-[var(--bg-primary)] flex flex-col pb-8">
          {/* Podcast Header */}
          <div className="px-6 py-5 flex items-center gap-5 border-b border-[var(--border)]/50">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--bg-card)] shadow-md shadow-[var(--accent-light)]"></div>
            <div className="flex-1">
              <div className="text-xs text-[var(--text-secondary)] mb-1 uppercase tracking-wider font-semibold">Your Podcast</div>
              <h1 className="font-bold text-2xl mb-1 text-[var(--text-primary)]">Tech Talk Daily</h1>
              <div className="text-sm text-[var(--text-secondary)]">12.4K subscribers &middot; 156 episodes</div>
            </div>
            <div className="flex items-center gap-3">
              {[
                { icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3', val: '45.2K', label: 'Downloads' },
                { icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z', val: '24min', label: 'Avg Listen' },
                { icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z', val: '4.8', label: 'Rating' }
              ].map((stat, i) => (
                <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3 text-center min-w-[90px] shadow-sm">
                  <div className="flex justify-center mb-1 text-[var(--accent)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                    </svg>
                  </div>
                  <div className="font-bold text-sm text-[var(--text-primary)]">{stat.val}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Waveform */}
          <div className="mx-6 mt-6 h-16 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3 flex items-center gap-4 shadow-sm">
            <button className="w-10 h-10 bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm cursor-pointer text-white">
              <svg className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <div className="flex items-center gap-[2px] flex-1 h-full overflow-hidden px-1">
              {waveformHeights.map((h, i) => (
                <div 
                  key={i} 
                  className="w-1 rounded-full bg-[var(--accent)] transition-all hover:bg-[var(--text-primary)] cursor-pointer"
                  style={{ height: h + '%' }}
                ></div>
              ))}
            </div>
            <div className="text-xs text-[var(--text-secondary)] font-medium shrink-0">35:21</div>
          </div>

          {/* Episode List */}
          <div className="px-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-base text-[var(--text-primary)]">Episodes</h2>
              <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-sm">
                + New Episode
              </button>
            </div>
            
            <div className="flex flex-col gap-2">
              {episodes.map((ep) => (
                <div 
                  key={ep.ep}
                  onClick={() => setSelectedEpisode(ep.ep)}
                  className={`bg-[var(--bg-card)] border rounded-xl px-4 py-3 flex items-center gap-4 cursor-pointer transition-all ${
                    selectedEpisode === ep.ep 
                      ? 'border-[var(--accent)] shadow-[0_0_0_1px_var(--accent)]' 
                      : 'border-[var(--border)] hover:border-[var(--accent)]/30'
                  }`}
                >
                  <button className="w-9 h-9 border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors">
                    <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-[var(--text-primary)] mb-0.5">Ep. {ep.ep}: {ep.title}</div>
                    <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                      <span>{ep.duration}</span>
                      <span>&bull;</span>
                      <span>{ep.plays !== '—' ? ep.plays + ' plays' : 'No plays yet'}</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <div className="text-xs text-[var(--text-secondary)] font-medium">{ep.date}</div>
                    {renderStatus(ep.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 3: Detail Panel */}
        <div className="bg-[var(--bg-secondary)] border-l border-[var(--border)] overflow-y-auto p-5 flex flex-col">
          
          <div className="h-12 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg flex items-center px-3 gap-3 shadow-sm">
             <button className="w-6 h-6 bg-[var(--accent)] rounded-full flex items-center justify-center shrink-0 cursor-pointer text-white">
                <svg className="w-3 h-3 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
             </button>
             <div className="flex items-center gap-1 flex-1 h-full overflow-hidden py-2">
                {miniWaveformHeights.map((h, i) => (
                  <div 
                    key={i} 
                    className="w-1 rounded-full bg-[var(--accent)] opacity-80"
                    style={{ height: h + '%' }}
                  ></div>
                ))}
             </div>
          </div>

          <h3 className="font-bold text-base text-[var(--text-primary)] mt-4">
            Episode {selectedEpisode}: {episodes.find(e => e.ep === selectedEpisode)?.title || 'Selected Episode'}
          </h3>

          <div className="mt-4">
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Description</label>
            <textarea 
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-3 text-sm h-20 w-full text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] resize-none"
              defaultValue="In this episode, we dive deep into the recent advancements..."
            ></textarea>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
               <label className="block text-xs font-medium text-[var(--text-secondary)]">Show Notes</label>
               <div className="flex items-center gap-1 bg-[var(--bg-card)] border border-[var(--border)] rounded px-1 py-0.5">
                 {['B', 'I', 'U'].map((tool) => (
                   <button key={tool} className="w-5 h-5 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded text-xs font-serif cursor-pointer">
                     {tool}
                   </button>
                 ))}
                 <div className="w-px h-3 bg-[var(--border)] mx-0.5"></div>
                 <button className="w-5 h-5 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded text-xs cursor-pointer">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                 </button>
               </div>
            </div>
            <textarea 
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-3 text-sm h-24 w-full text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] resize-none"
              defaultValue="- Introduction to AI&#10;- The new models&#10;- Q&A session"
            ></textarea>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Tags</label>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[var(--accent-light)] text-[var(--accent)] text-xs font-medium rounded-full px-3 py-1 border border-[var(--accent)]/20">Technology</span>
              <span className="bg-[var(--accent-light)] text-[var(--accent)] text-xs font-medium rounded-full px-3 py-1 border border-[var(--accent)]/20">AI</span>
              <button className="text-[var(--text-secondary)] text-xs font-medium rounded-full px-3 py-1 border border-[var(--border)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] transition-colors cursor-pointer border-dashed">
                + Add
              </button>
            </div>
          </div>

          <div className="mt-4 mb-2">
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Schedule</label>
            <div className="relative">
              <input 
                type="text" 
                defaultValue="Aug 29, 2024"
                className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-2 pl-9 text-sm w-full text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              />
              <svg className="w-4 h-4 text-[var(--text-secondary)] absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-[var(--border)]/50">
            <button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl py-3 text-sm font-bold transition-colors cursor-pointer shadow-md shadow-[var(--accent)]/20">
              Publish Episode
            </button>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 bg-transparent border border-[var(--border)] hover:border-[var(--text-secondary)] text-[var(--text-primary)] rounded-xl py-2 text-sm font-medium transition-colors cursor-pointer">
                Preview
              </button>
              <button className="flex-1 bg-transparent border border-red-900/50 hover:border-red-500 text-red-500 hover:bg-red-500/10 rounded-xl py-2 text-sm font-medium transition-colors cursor-pointer">
                Delete
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
