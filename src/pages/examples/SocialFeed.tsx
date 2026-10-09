import { useState, useEffect } from 'react'

type Variant = 'blue' | 'violet' | 'rose';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#3B82F6': 'blue',
  '#8B5CF6': 'violet',
  '#F43F5E': 'rose',
};

export function SocialFeed({ variant = 'blue' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);

  const [activeNav, setActiveNav] = useState('Home');
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});

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
      
      const themeName = ACCENT_TO_THEME[variation.accent.toUpperCase()] || ACCENT_TO_THEME[variation.accent];
      if (themeName) { 
        setActiveTheme(themeName); 
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const toggleLike = (id: number) => {
    setLikedPosts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const navItems = [
    { name: 'Home', path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Explore', path: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    { name: 'Notifications', path: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', badge: '5' },
    { name: 'Messages', path: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', badge: '3' },
    { name: 'Bookmarks', path: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' },
    { name: 'Lists', path: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { name: 'Profile', path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'More', path: 'M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
  ];

  const trends = [
    { category: 'Technology', hashtag: '#AIRevolution', count: '12.5k posts' },
    { category: 'Business', hashtag: '#ConnectXGlobal', count: '9.1k posts' },
    { category: 'Finance', hashtag: '#CryptoMarket', count: '7.8k posts' },
    { category: 'Entertainment', hashtag: '#GameChanger', count: '6.2k posts' }
  ];

  const suggestions = [
    { name: 'Liam Taylor', handle: '@liamt', initial: 'LT' },
    { name: 'Emily Wilson', handle: '@emilyw', initial: 'EW' },
    { name: 'Noah Roberts', handle: '@noahr', initial: 'NR' }
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .social-feed-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .social-feed-wrapper[data-theme="blue"] {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-light: rgba(59,130,246,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #F8FAFC;
          --bg-card: #FFFFFF;
          --border: #E2E8F0;
          --text-primary: #0F172A;
          --text-secondary: #64748B;
        }
        .social-feed-wrapper[data-theme="violet"] {
          --accent: #8B5CF6;
          --accent-hover: #7C3AED;
          --accent-light: rgba(139,92,246,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #FAF8FF;
          --bg-card: #FFFFFF;
          --border: #E8E0F0;
          --text-primary: #1A1A2E;
          --text-secondary: #7A6AAA;
        }
        .social-feed-wrapper[data-theme="rose"] {
          --accent: #F43F5E;
          --accent-hover: #E11D48;
          --accent-light: rgba(244,63,94,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #FFF8FA;
          --bg-card: #FFFFFF;
          --border: #FFE0E8;
          --text-primary: #2E0A12;
          --text-secondary: #AA5070;
        }
      `}</style>

      <div 
        className="social-feed-wrapper grid grid-cols-[220px_1fr_300px] h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300"
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* Col 1: Sidebar */}
        <div className="bg-[var(--bg-primary)] border-r border-[var(--border)] py-4 flex flex-col">
          <div className="px-5 mb-5 text-xl font-bold">ConnectX</div>
          
          <nav className="px-3 flex-1">
            {navItems.map((item) => (
              <div 
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`px-4 py-2.5 rounded-full text-base flex items-center gap-4 cursor-pointer mb-1 transition-colors ${
                  activeNav === item.name 
                    ? 'font-bold' 
                    : 'hover:bg-[var(--bg-secondary)]'
                }`}
              >
                <div className="relative">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={activeNav === item.name ? 2.5 : 2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.path} />
                  </svg>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span>{item.name}</span>
              </div>
            ))}
            
            <button className="mx-2 mt-4 w-[calc(100%-16px)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full py-3 font-bold transition-colors cursor-pointer shadow-sm">
              Post
            </button>
          </nav>
          
          <div className="px-4 mt-auto mb-2">
            <div className="flex items-center gap-3 p-2 rounded-full hover:bg-[var(--bg-secondary)] cursor-pointer transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 flex items-center justify-center font-bold text-gray-600 shrink-0">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate">John Doe</div>
                <div className="text-sm text-[var(--text-secondary)] truncate">@johndoe</div>
              </div>
              <svg className="w-5 h-5 text-[var(--text-secondary)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Col 2: Feed */}
        <div className="overflow-y-auto bg-[var(--bg-primary)] border-r border-[var(--border)]">
          {/* Create Post */}
          <div className="border-b border-[var(--border)] p-4">
            <h2 className="font-bold text-base pb-3">Home</h2>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-gray-200 to-gray-300 rounded-full flex items-center justify-center font-bold text-gray-600 shrink-0">
                JD
              </div>
              <textarea 
                className="flex-1 bg-transparent text-sm py-2 resize-none outline-none placeholder-[var(--text-secondary)] min-h-[80px]"
                placeholder="What's on your mind?"
              ></textarea>
            </div>
            
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-[var(--border)]">
              <div className="flex gap-3">
                <button className="w-8 h-8 rounded-full hover:bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </button>
                <button className="w-8 h-8 rounded-full hover:bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
                <button className="w-8 h-8 rounded-full hover:bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] transition-colors cursor-pointer text-xs font-bold uppercase tracking-tighter">
                  GIF
                </button>
                <button className="w-8 h-8 rounded-full hover:bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </button>
                <button className="w-8 h-8 rounded-full hover:bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </button>
              </div>
              <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-5 py-2 rounded-full text-sm font-bold transition-colors shadow-sm cursor-pointer">
                Post
              </button>
            </div>
          </div>

          {/* Posts */}
          <div className="divide-y divide-[var(--border)]">
            
            {/* Post 1 */}
            <div className="p-4 flex gap-3 hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-tr from-green-400 to-emerald-500 rounded-full flex items-center justify-center font-bold text-white shrink-0">
                SJ
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-bold text-sm truncate">Sarah Jenkins</span>
                    <span className="text-sm text-[var(--text-secondary)] truncate">@sarahj</span>
                    <span className="text-sm text-[var(--text-secondary)]">·</span>
                    <span className="text-sm text-[var(--text-secondary)] shrink-0">2h</span>
                  </div>
                  <button className="w-8 h-8 rounded-full hover:bg-[var(--accent-light)] hover:text-[var(--accent)] text-[var(--text-secondary)] flex items-center justify-center transition-colors -mt-1 -mr-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                  </button>
                </div>
                <div className="mt-1 text-sm leading-relaxed whitespace-pre-wrap">
                  Exploring the beautiful landscapes of the Alps! Such a breathtaking view.
                </div>
                <div className="mt-3 h-48 bg-gradient-to-br from-blue-200 via-blue-300 to-indigo-300 rounded-xl w-full border border-[var(--border)] overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-white/50">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-between max-w-md">
                  <div className="flex items-center gap-1.5 text-[var(--text-secondary)] text-sm cursor-pointer hover:text-[var(--accent)] transition-colors group">
                    <div className="w-8 h-8 rounded-full group-hover:bg-[var(--accent-light)] flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    </div>
                    <span>12</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[var(--text-secondary)] text-sm cursor-pointer hover:text-green-500 transition-colors group">
                    <div className="w-8 h-8 rounded-full group-hover:bg-green-100 flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </div>
                    <span>45</span>
                  </div>
                  <div 
                    onClick={(e) => { e.stopPropagation(); toggleLike(1); }}
                    className={`flex items-center gap-1.5 text-sm cursor-pointer transition-colors group ${likedPosts[1] ? 'text-pink-600' : 'text-[var(--text-secondary)] hover:text-pink-600'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${likedPosts[1] ? 'bg-pink-100' : 'group-hover:bg-pink-100'}`}>
                      <svg className="w-4 h-4" fill={likedPosts[1] ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>
                    <span>{likedPosts[1] ? 109 : 108}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[var(--text-secondary)] text-sm cursor-pointer hover:text-[var(--accent)] transition-colors group">
                    <div className="w-8 h-8 rounded-full group-hover:bg-[var(--accent-light)] flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Post 2 */}
            <div className="p-4 flex gap-3 hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full flex items-center justify-center font-bold text-white shrink-0">
                DC
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-bold text-sm truncate">David Chen</span>
                    <span className="text-sm text-[var(--text-secondary)] truncate">@davidc_tech</span>
                    <span className="text-sm text-[var(--text-secondary)]">·</span>
                    <span className="text-sm text-[var(--text-secondary)] shrink-0">4h</span>
                  </div>
                  <button className="w-8 h-8 rounded-full hover:bg-[var(--accent-light)] hover:text-[var(--accent)] text-[var(--text-secondary)] flex items-center justify-center transition-colors -mt-1 -mr-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                  </button>
                </div>
                <div className="mt-1 text-sm leading-relaxed whitespace-pre-wrap">
                  Just launched my new project! It's a tool for developers to streamline workflow. Excited to share it with the community! <span className="text-[var(--accent)] cursor-pointer hover:underline">#Tech</span> <span className="text-[var(--accent)] cursor-pointer hover:underline">#Development</span>
                </div>
                
                <div className="mt-3 flex justify-between max-w-md">
                  <div className="flex items-center gap-1.5 text-[var(--text-secondary)] text-sm cursor-pointer hover:text-[var(--accent)] transition-colors group">
                    <div className="w-8 h-8 rounded-full group-hover:bg-[var(--accent-light)] flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    </div>
                    <span>28</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[var(--text-secondary)] text-sm cursor-pointer hover:text-green-500 transition-colors group">
                    <div className="w-8 h-8 rounded-full group-hover:bg-green-100 flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </div>
                    <span>62</span>
                  </div>
                  <div 
                    onClick={(e) => { e.stopPropagation(); toggleLike(2); }}
                    className={`flex items-center gap-1.5 text-sm cursor-pointer transition-colors group ${likedPosts[2] ? 'text-pink-600' : 'text-[var(--text-secondary)] hover:text-pink-600'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${likedPosts[2] ? 'bg-pink-100' : 'group-hover:bg-pink-100'}`}>
                      <svg className="w-4 h-4" fill={likedPosts[2] ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>
                    <span>{likedPosts[2] ? 196 : 195}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[var(--text-secondary)] text-sm cursor-pointer hover:text-[var(--accent)] transition-colors group">
                    <div className="w-8 h-8 rounded-full group-hover:bg-[var(--accent-light)] flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Post 3 */}
            <div className="p-4 flex gap-3 hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-white shrink-0">
                MG
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-bold text-sm truncate">Maria Garcia</span>
                    <span className="text-sm text-[var(--text-secondary)] truncate">@mariag</span>
                    <span className="text-sm text-[var(--text-secondary)]">·</span>
                    <span className="text-sm text-[var(--text-secondary)] shrink-0">6h</span>
                  </div>
                  <button className="w-8 h-8 rounded-full hover:bg-[var(--accent-light)] hover:text-[var(--accent)] text-[var(--text-secondary)] flex items-center justify-center transition-colors -mt-1 -mr-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                  </button>
                </div>
                <div className="mt-1 text-sm leading-relaxed whitespace-pre-wrap">
                  Enjoying a wonderful sunset at the beach today. The colors are incredible! <span className="text-[var(--accent)] cursor-pointer hover:underline">#Sunset</span> <span className="text-[var(--accent)] cursor-pointer hover:underline">#Nature</span>
                </div>
                
                <div className="mt-3 flex justify-between max-w-md">
                  <div className="flex items-center gap-1.5 text-[var(--text-secondary)] text-sm cursor-pointer hover:text-[var(--accent)] transition-colors group">
                    <div className="w-8 h-8 rounded-full group-hover:bg-[var(--accent-light)] flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    </div>
                    <span>19</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[var(--text-secondary)] text-sm cursor-pointer hover:text-green-500 transition-colors group">
                    <div className="w-8 h-8 rounded-full group-hover:bg-green-100 flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </div>
                    <span>31</span>
                  </div>
                  <div 
                    onClick={(e) => { e.stopPropagation(); toggleLike(3); }}
                    className={`flex items-center gap-1.5 text-sm cursor-pointer transition-colors group ${likedPosts[3] ? 'text-pink-600' : 'text-[var(--text-secondary)] hover:text-pink-600'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${likedPosts[3] ? 'bg-pink-100' : 'group-hover:bg-pink-100'}`}>
                      <svg className="w-4 h-4" fill={likedPosts[3] ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>
                    <span>{likedPosts[3] ? 89 : 88}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[var(--text-secondary)] text-sm cursor-pointer hover:text-[var(--accent)] transition-colors group">
                    <div className="w-8 h-8 rounded-full group-hover:bg-[var(--accent-light)] flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Col 3: Right Panel */}
        <div className="bg-[var(--bg-secondary)] overflow-y-auto p-5">
          {/* Search */}
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search ConnectX" 
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-full pl-10 pr-4 py-2.5 text-sm w-full outline-none focus:border-[var(--accent)] transition-colors text-[var(--text-primary)] placeholder-[var(--text-secondary)] shadow-sm"
            />
          </div>

          {/* Trending */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 shadow-sm">
            <h2 className="font-bold text-base">Trending</h2>
            <div className="mt-3 space-y-3">
              {trends.map((trend, i) => (
                <div key={i} className="cursor-pointer group">
                  <div className="text-xs text-[var(--text-secondary)] flex justify-between">
                    <span>{trend.category}</span>
                    <button className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors opacity-0 group-hover:opacity-100">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                    </button>
                  </div>
                  <div className="font-bold text-sm group-hover:text-[var(--accent)] transition-colors">{trend.hashtag}</div>
                  <div className="text-xs text-[var(--text-secondary)] mt-0.5">{trend.count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Who to Follow */}
          <div className="mt-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 shadow-sm mb-4">
            <h2 className="font-bold text-base">Who to Follow</h2>
            <div className="mt-3 space-y-3">
              {suggestions.map((user, i) => (
                <div key={i} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-10 h-10 bg-gradient-to-tr from-gray-200 to-gray-300 rounded-full flex items-center justify-center font-bold text-gray-600 shrink-0 group-hover:opacity-90 transition-opacity">
                    {user.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm truncate group-hover:underline">{user.name}</div>
                    <div className="text-xs text-[var(--text-secondary)] truncate">{user.handle}</div>
                  </div>
                  <button className="ml-auto bg-[var(--bg-primary)] hover:bg-[var(--accent-light)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] px-4 py-1.5 rounded-full text-xs font-bold transition-colors">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-xs text-[var(--text-secondary)] px-2 leading-relaxed">
            <a href="#" className="hover:underline">Terms of Service</a> · <a href="#" className="hover:underline">Privacy Policy</a> · <a href="#" className="hover:underline">Cookie Policy</a><br/>
            © 2026 ConnectX Corp.
          </div>
        </div>
      </div>
    </>
  );
}
