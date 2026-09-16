import { useState, useEffect } from 'react';

type Variant = 'flame' | 'royal' | 'mint';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#F97316': 'flame',
  '#8B5CF6': 'royal',
  '#14B8A6': 'mint',
};

export function MobilePodcastApp({ variant = 'flame' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Technology');
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('flame'); 
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

  const categories = ['Technology', 'Business', 'Comedy', 'True Crime', 'Science', 'Health', 'Education', 'Sports'];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        .podcast-wrapper {
          --accent: #F97316;
          --accent-hover: #EA580C;
          --accent-light: rgba(249,115,22,0.15);
          --bg-primary: #0A0A0A;
          --bg-secondary: #141414;
          --bg-card: #1E1E1E;
          --border: #2A2A2A;
          --text-primary: #FAFAFA;
          --text-secondary: #888;
          font-family: 'Inter', sans-serif;
        }
        .podcast-wrapper[data-theme="royal"] {
          --accent: #8B5CF6;
          --accent-hover: #7C3AED;
          --accent-light: rgba(139,92,246,0.15);
          --bg-primary: #0A080F;
          --bg-secondary: #14101A;
          --bg-card: #1E1820;
          --border: #2A2440;
          --text-primary: #F5F0FF;
          --text-secondary: #9988BB;
        }
        .podcast-wrapper[data-theme="mint"] {
          --accent: #14B8A6;
          --accent-hover: #0D9488;
          --accent-light: rgba(20,184,166,0.15);
          --bg-primary: #080C0E;
          --bg-secondary: #0E1418;
          --bg-card: #141E22;
          --border: #1E2E34;
          --text-primary: #F0FAFF;
          --text-secondary: #6899AA;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div 
        className="podcast-wrapper min-h-screen bg-black flex justify-center text-[var(--text-primary)]" 
        data-theme={activeTheme === 'flame' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col pb-20 overflow-x-hidden">
          
          <div className="overflow-y-auto flex-1 scrollbar-hide pb-6">
            
            {/* 1. Header */}
            <div className="px-5 pt-4 flex justify-between items-center">
              <div className="flex items-center gap-2 cursor-pointer">
                <svg className="w-8 h-8 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
                <span className="font-bold text-xl tracking-wide">PodVibe</span>
              </div>
              <div className="flex items-center gap-4">
                <svg className="w-6 h-6 text-[var(--text-primary)] cursor-pointer hover:text-[var(--accent)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <div className="relative cursor-pointer group">
                  <svg className="w-6 h-6 text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[var(--accent)] rounded-full border-2 border-[var(--bg-primary)]"></span>
                </div>
              </div>
            </div>

            {/* 2. Now Playing Card */}
            <div className="mx-5 mt-4 bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] p-4 overflow-hidden shadow-lg">
              <div className="aspect-video rounded-xl relative overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--accent-light)] flex items-center justify-center cursor-pointer group">
                <svg className="w-16 h-16 text-[var(--accent)] opacity-50 group-hover:opacity-80 transition-opacity group-hover:scale-110 duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between px-3 pb-2">
                  <div className="flex gap-1 items-end h-4">
                    {[40, 70, 40, 100, 60, 30, 80].map((h, i) => (
                      <div key={i} className="w-1 bg-white/70 rounded-full animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider">Tech Insights Podcast</div>
                <h2 className="font-bold text-lg leading-tight mt-1 truncate">AI Revolution: What's Next?</h2>
                <div className="text-sm text-[var(--text-secondary)] mt-0.5">Alex Mercer</div>
              </div>

              <div className="mt-4">
                <div className="bg-[var(--border)] rounded-full h-1.5 w-full cursor-pointer relative overflow-hidden">
                  <div className="bg-[var(--accent)] h-full w-[26%] rounded-full absolute top-0 left-0"></div>
                </div>
                <div className="flex justify-between mt-1.5 text-xs text-[var(--text-secondary)] font-medium">
                  <span>12:45</span>
                  <span>48:30</span>
                </div>
              </div>

              <div className="mt-2 flex justify-center items-center gap-5">
                <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer p-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </button>
                <button className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors cursor-pointer">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-full flex items-center justify-center text-white shadow-[0_0_15px_var(--accent-light)] transition-transform active:scale-95 cursor-pointer flex-shrink-0"
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                    <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  )}
                </button>
                <button className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors cursor-pointer">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer p-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </button>
              </div>

              <div className="flex justify-between items-center mt-3 pt-3 border-t border-[var(--border)]">
                <button onClick={() => setIsLiked(!isLiked)} className={`cursor-pointer transition-colors p-1 ${isLiked ? 'text-red-500' : 'text-[var(--text-secondary)] hover:text-white'}`}>
                  <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
                <div className="text-xs font-bold bg-[var(--bg-secondary)] px-2.5 py-1 rounded-md text-[var(--text-secondary)] hover:text-white cursor-pointer transition-colors">
                  1.5x
                </div>
                <button className="text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 3. Continue Listening */}
            <div className="px-5 mt-6">
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="font-bold text-lg">Continue Listening</h3>
                <span className="text-[var(--accent)] text-sm font-medium cursor-pointer hover:underline">See All</span>
              </div>
              
              <div className="flex flex-col gap-2">
                {[
                  { ep: 'SEO Strategies 2025', pod: 'Marketing 101', dur: '18/35 min', prog: 51, grad: 'from-pink-500 to-rose-500' },
                  { ep: 'Global Economic Update', pod: 'Daily News', dur: '5/12 min', prog: 41, grad: 'from-blue-500 to-indigo-500' },
                  { ep: 'Python Best Practices', pod: 'Code Talk', dur: '22/55 min', prog: 40, grad: 'from-emerald-400 to-teal-500' }
                ].map((item, i) => (
                  <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-2.5 flex items-center gap-3 cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors group">
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${item.grad} flex-shrink-0 flex items-center justify-center relative shadow-sm`}>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate">{item.ep}</div>
                      <div className="text-xs text-[var(--text-secondary)] truncate mb-1.5">{item.pod}</div>
                      <div className="flex items-center gap-2">
                        <div className="bg-[var(--border)] rounded-full h-1 w-full relative overflow-hidden">
                          <div className="bg-[var(--accent)] h-full rounded-full absolute left-0 top-0" style={{ width: `${item.prog}%` }}></div>
                        </div>
                        <span className="text-[10px] text-[var(--text-secondary)] flex-shrink-0 font-medium w-12 text-right">{item.dur}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Trending Episodes */}
            <div className="px-5 mt-6">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-bold text-lg">Trending</h3>
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13.07 4.8 14.56 2.96C14.7 2.78 14.58 2.5 14.34 2.5C11.96 2.5 9.77 4.09 8.65 6.22C7.75 7.9 7.7 9.87 8.35 11.66C8.42 11.87 8.24 12.06 8.04 11.97C7.4 11.69 6.81 11.27 6.32 10.74C6.18 10.59 5.95 10.61 5.86 10.8C5.07 12.39 5.09 14.3 5.92 15.86C6.54 17.03 7.55 17.9 8.76 18.39C9.22 18.57 9.53 19 9.56 19.49C9.61 20.3 8.94 21 8.1 21H15.9C16.74 21 17.41 20.3 17.46 19.49C17.49 19 17.8 18.57 18.26 18.39C19.47 17.9 20.48 17.03 21.1 15.86C21.93 14.3 21.95 12.39 21.16 10.8C21.07 10.61 20.84 10.59 20.7 10.74C20.21 11.27 19.62 11.69 18.98 11.97C18.78 12.06 18.6 11.87 18.67 11.66C18.92 10.8 18.96 9.88 18.78 9.03C18.71 8.73 18.31 8.67 18.15 8.94C17.63 9.85 16.92 10.61 16.08 11.19C15.9 11.31 15.65 11.24 15.54 11.05C15.44 10.86 15.51 10.61 15.7 10.49C16.34 10.05 17.05 9.75 17.8 9.57C17.8 9.57 17.7 9.58 17.66 11.2Z" /></svg>
                <span className="text-sm text-[var(--text-secondary)]">This Week</span>
              </div>
              
              <div className="flex flex-col">
                {[
                  { pod: 'The Tech Hour', ep: 'AI Revolution Pt. 2', plays: '245K plays', grad: 'from-purple-500 to-indigo-500' },
                  { pod: 'StartupFM', ep: 'Raising Series A', plays: '198K plays', grad: 'from-orange-400 to-amber-500' },
                  { pod: 'Crime Weekly', ep: 'The Missing File', plays: '187K plays', grad: 'from-gray-700 to-slate-900' },
                  { pod: 'Science Now', ep: 'Mars Colony Update', plays: '156K plays', grad: 'from-cyan-500 to-blue-500' },
                  { pod: 'Comedy Hour', ep: 'Stand-up Specials', plays: '142K plays', grad: 'from-yellow-400 to-orange-500' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 mb-3 cursor-pointer group hover:bg-[var(--bg-secondary)] p-1 rounded-lg transition-colors">
                    <div className="w-6 font-black text-xl text-[var(--accent)] text-center">{i + 1}</div>
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${item.grad} flex-shrink-0 shadow-inner`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate group-hover:text-[var(--accent)] transition-colors">{item.pod}</div>
                      <div className="text-xs text-[var(--text-secondary)] truncate">{item.ep}</div>
                    </div>
                    <div className="text-[10px] text-[var(--text-secondary)] bg-[var(--bg-card)] border border-[var(--border)] px-2 py-1 rounded-md font-medium whitespace-nowrap">
                      {item.plays}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Browse Categories */}
            <div className="mt-6">
              <h3 className="font-bold text-lg px-5 mb-3">Categories</h3>
              <div className="flex gap-2 overflow-x-auto px-5 scrollbar-hide pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer shadow-sm ${
                      activeCategory === cat 
                        ? 'bg-[var(--accent)] text-white' 
                        : 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. New Releases */}
            <div className="px-5 mt-6">
              <div className="flex justify-between items-baseline mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">New Releases</h3>
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M11.64 5.23a.5.5 0 00-.71 0l-1.9 1.9-2.68-.3a.5.5 0 00-.54.54l.3 2.68-1.9 1.9a.5.5 0 000 .71l1.9 1.9-.3 2.68a.5.5 0 00.54.54l2.68-.3 1.9 1.9a.5.5 0 00.71 0l1.9-1.9 2.68.3a.5.5 0 00.54-.54l-.3-2.68 1.9-1.9a.5.5 0 000-.71l-1.9-1.9.3-2.68a.5.5 0 00-.54-.54l-2.68.3-1.9-1.9z" /></svg>
                </div>
                <span className="text-[var(--accent)] text-sm font-medium cursor-pointer hover:underline">View All</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: 'Startup Grind', eps: '128 episodes', grad: 'from-pink-500 to-purple-600' },
                  { title: 'History Uncovered', eps: '64 episodes', grad: 'from-amber-700 to-stone-800' },
                  { title: 'Gaming Now', eps: '215 episodes', grad: 'from-emerald-400 to-cyan-500' },
                  { title: 'Mindful Moments', eps: '89 episodes', grad: 'from-sky-300 to-indigo-400' }
                ].map((item, i) => (
                  <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden cursor-pointer group hover:shadow-md hover:border-[var(--accent-light)] transition-all">
                    <div className={`aspect-square w-full bg-gradient-to-br ${item.grad} relative`}>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                      <div className="absolute bottom-2 right-2 w-7 h-7 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="font-bold text-sm truncate group-hover:text-[var(--accent)] transition-colors">{item.title}</div>
                      <div className="text-xs text-[var(--text-secondary)] mt-0.5">{item.eps}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Your Queue */}
            <div className="mx-5 mt-6 pb-4">
              <div className="flex justify-between items-baseline mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">Queue</h3>
                  <span className="text-[var(--text-secondary)] text-sm">(2 items)</span>
                </div>
                <span className="text-[var(--accent)] text-xs font-medium cursor-pointer hover:underline">Clear</span>
              </div>
              
              <div className="flex flex-col gap-2">
                {[
                  { title: 'How to Lead', dur: '34 min', grad: 'from-blue-600 to-violet-600' },
                  { title: 'Deep Work Tips', dur: '45 min', grad: 'from-teal-500 to-emerald-600' }
                ].map((item, i) => (
                  <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-2.5 flex items-center gap-3 cursor-move hover:border-[var(--text-secondary)] transition-colors">
                    <div className="text-[var(--text-secondary)] cursor-grab active:cursor-grabbing px-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" /></svg>
                    </div>
                    <div className={`w-10 h-10 rounded-md bg-gradient-to-br ${item.grad} flex-shrink-0 shadow-sm`}></div>
                    <div className="flex-1 font-semibold text-sm truncate">{item.title}</div>
                    <div className="text-xs font-medium text-[var(--text-secondary)] pr-1">{item.dur}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 8. Bottom Nav */}
          <div className="fixed bottom-0 w-full max-w-[390px] bg-[var(--bg-primary)]/95 backdrop-blur-md border-t border-[var(--border)] z-50 px-2 py-2 pb-5">
            <div className="flex justify-around items-center h-12">
              {[
                { id: 'Home', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
                { id: 'Search', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg> },
                { id: 'Library', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg> },
                { id: 'Downloads', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg> },
                { id: 'Profile', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg> }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1 w-14 cursor-pointer transition-colors ${activeTab === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  <div className={`transition-transform duration-200 ${activeTab === tab.id ? 'scale-110' : ''}`}>
                    {tab.icon}
                  </div>
                  <span className="text-[9px] font-medium tracking-wide">{tab.id}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
