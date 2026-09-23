import { useState, useEffect } from 'react';

type Variant = 'blue' | 'teal' | 'violet';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#3B82F6': 'blue',
  '#14B8A6': 'teal',
  '#8B5CF6': 'violet',
};

export function FileManager({ variant = 'blue' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  
  const [activeNav, setActiveNav] = useState('All Files');
  const [selectedFile, setSelectedFile] = useState<number | null>(null);

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
    { name: 'All Files', iconPath: 'M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776' },
    { name: 'Recent', iconPath: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Starred', iconPath: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.148.621-.531 1.121-1.07.838l-4.75-2.482a.563.563 0 00-.528 0l-4.75 2.482c-.54.283-1.218-.217-1.07-.838l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' },
    { name: 'Shared', iconPath: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
    { name: 'Trash', iconPath: 'M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' },
  ];

  const folders = [
    { id: 1, name: 'Documents', items: '120 items', date: 'Oct 26' },
    { id: 2, name: 'Images', items: '85 items', date: 'Oct 25' },
    { id: 3, name: 'Videos', items: '34 items', date: 'Oct 24' },
  ];

  const files = [
    { id: 4, name: 'Annual Report.pdf', type: 'PDF', color: 'bg-red-500', size: '2.4 MB', date: 'Oct 26', fullName: 'Annual Report 2023.pdf', desc: 'PDF Document' },
    { id: 5, name: 'hero-banner.png', type: 'PNG', color: 'bg-green-500', size: '1.8 MB', date: 'Oct 25', fullName: 'hero-banner-v2.png', desc: 'Image File' },
    { id: 6, name: 'proposal.docx', type: 'DOCX', color: 'bg-blue-500', size: '540 KB', date: 'Oct 24', fullName: 'Q4_proposal.docx', desc: 'Word Document' },
    { id: 7, name: 'demo-video.mp4', type: 'MP4', color: 'bg-orange-500', size: '45 MB', date: 'Oct 22', fullName: 'product-demo-final.mp4', desc: 'Video File' },
    { id: 8, name: 'design-system.fig', type: 'FIG', color: 'bg-purple-500', size: '12 MB', date: 'Oct 20', fullName: 'design-system.fig', desc: 'Figma Document' },
  ];

  const selectedItemDetail = files.find(f => f.id === selectedFile) || {
    id: 8, name: 'design-system.fig', type: 'FIG', color: 'bg-purple-500', size: '12 MB', date: 'Oct 20', fullName: 'design-system.fig', desc: 'Figma Document'
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .filemanager-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .filemanager-wrapper[data-theme="blue"] {
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
        .filemanager-wrapper[data-theme="teal"] {
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
        .filemanager-wrapper[data-theme="violet"] {
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
      `}</style>

      <div 
        className="filemanager-wrapper grid grid-cols-[220px_1fr_280px] h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]" 
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* Col 1: Sidebar */}
        <div className="w-[220px] bg-[var(--bg-secondary)] border-r border-[var(--border)] py-4 flex flex-col">
          <div className="px-5 mb-5 flex items-center gap-2 text-[var(--accent)]">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>
            <span className="font-bold text-xl tracking-tight">CloudVault</span>
          </div>

          <div className="px-4 mb-4 flex gap-2">
            <button className="flex-1 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New
            </button>
            <button className="flex-1 bg-transparent border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-primary)] px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Upload
            </button>
          </div>

          <div className="px-2 flex-1 overflow-y-auto">
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
            <div className="text-xs text-[var(--text-secondary)] font-medium">Storage</div>
            <div className="h-2 bg-[var(--border)] rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-[var(--accent)] w-[42%]"></div>
            </div>
            <div className="text-xs text-[var(--text-secondary)] mt-1">4.2 GB of 10 GB</div>
            <div className="text-[var(--accent)] text-xs mt-2 font-medium cursor-pointer hover:underline">Upgrade Plan</div>
          </div>
        </div>

        {/* Col 2: Main */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] flex flex-col">
          <div className="px-6 py-3 border-b border-[var(--border)] flex items-center justify-between">
            <div className="text-sm font-medium flex items-center gap-2">
              <span className="cursor-pointer hover:text-[var(--accent)]">My Files</span> 
              <span className="text-[var(--text-secondary)]">/</span> 
              <span className="cursor-pointer hover:text-[var(--accent)]">Projects</span> 
              <span className="text-[var(--text-secondary)]">/</span> 
              <span className="text-[var(--text-primary)]">Design</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex border border-[var(--border)] rounded-lg overflow-hidden">
                <button className="bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)] p-1.5 cursor-pointer text-[var(--text-primary)]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                </button>
                <button className="bg-transparent hover:bg-[var(--bg-secondary)] p-1.5 cursor-pointer text-[var(--text-secondary)] border-l border-[var(--border)]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>
              </div>
              <select className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] cursor-pointer appearance-none">
                <option>Name</option>
                <option>Size</option>
                <option>Date Modified</option>
              </select>
              <button className="text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="px-6 py-4 grid grid-cols-4 gap-4">
            {/* Folders */}
            {folders.map(folder => (
              <div 
                key={folder.id} 
                onClick={() => setSelectedFile(folder.id)}
                className={`bg-[var(--bg-card)] border rounded-xl p-4 cursor-pointer transition-all hover:border-[var(--accent)]/40 ${selectedFile === folder.id ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' : 'border-[var(--border)]'}`}
              >
                <div className="flex justify-between items-start">
                  <svg className="w-12 h-12 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                  </svg>
                  <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                  </button>
                </div>
                <div className="font-bold text-sm mt-3">{folder.name}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[var(--text-secondary)]">{folder.items}</span>
                  <span className="text-xs text-[var(--text-secondary)]">{folder.date}</span>
                </div>
              </div>
            ))}

            {/* Files */}
            {files.map(file => (
              <div 
                key={file.id} 
                onClick={() => setSelectedFile(file.id)}
                className={`bg-[var(--bg-card)] border rounded-xl p-4 cursor-pointer transition-all hover:border-[var(--accent)]/40 ${selectedFile === file.id ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' : 'border-[var(--border)]'}`}
              >
                <div className="h-24 bg-[var(--bg-secondary)] rounded-lg flex items-center justify-center mb-3 relative group">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold text-white shadow-sm ${file.color}`}>
                    {file.type}
                  </span>
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4 text-[var(--text-secondary)] hover:text-amber-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.148.621-.531 1.121-1.07.838l-4.75-2.482a.563.563 0 00-.528 0l-4.75 2.482c-.54.283-1.218-.217-1.07-.838l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                  </div>
                </div>
                <div className="text-sm font-medium truncate">{file.name}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[var(--text-secondary)]">{file.size}</span>
                  <span className="text-xs text-[var(--text-secondary)]">{file.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: Right Panel */}
        <div className="w-[280px] bg-[var(--bg-secondary)] border-l border-[var(--border)] overflow-y-auto p-5 flex flex-col">
          <div className="h-40 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex items-center justify-center mb-4 shadow-sm">
            <span className={`px-4 py-2 rounded-lg text-lg font-bold text-white shadow-sm ${selectedItemDetail.color || 'bg-purple-500'}`}>
              {selectedItemDetail.type || 'FIG'}
            </span>
          </div>
          <div className="font-bold text-base truncate" title={selectedItemDetail.fullName}>{selectedItemDetail.fullName}</div>
          <div className="text-sm text-[var(--text-secondary)] mt-1">{selectedItemDetail.desc}</div>
          
          <hr className="border-[var(--border)] my-4" />
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Size</span>
              <span className="font-medium">{selectedItemDetail.size || '12 MB'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Modified</span>
              <span className="font-medium">Oct 20, 2023</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Created</span>
              <span className="font-medium">Sep 15, 2023</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Owner</span>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[var(--accent)] text-white text-[10px] flex items-center justify-center font-bold">
                  A
                </div>
                <span className="font-medium">Alex</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Location</span>
              <span className="font-medium truncate max-w-[120px]" title="Projects > Design">Projects &gt; Design</span>
            </div>
          </div>
          
          <hr className="border-[var(--border)] my-4" />
          
          <div>
            <div className="font-bold text-sm mb-3">Sharing</div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs bg-[var(--bg-card)] border border-[var(--border)] px-2 py-1 rounded-md text-[var(--text-secondary)] font-medium">Private</span>
              <button className="text-xs bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer">
                Share
              </button>
            </div>
            <div className="space-y-1">
              <div className="py-2 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold">
                  S
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">Sarah Jenkins</div>
                </div>
                <span className="text-[10px] bg-[var(--bg-card)] border border-[var(--border)] px-1.5 py-0.5 rounded text-[var(--text-secondary)]">Editor</span>
              </div>
              <div className="py-2 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs flex items-center justify-center font-bold">
                  M
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">Mike Ross</div>
                </div>
                <span className="text-[10px] bg-[var(--bg-card)] border border-[var(--border)] px-1.5 py-0.5 rounded text-[var(--text-secondary)]">Viewer</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-2">
            <button className="flex-1 bg-transparent border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text-primary)] text-[var(--text-secondary)] px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
              Download
            </button>
            <button className="flex-1 bg-transparent border border-red-500/30 text-red-400 hover:bg-red-500/10 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
