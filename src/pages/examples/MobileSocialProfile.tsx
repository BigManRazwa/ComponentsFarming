import { useState, useEffect } from 'react';

type Variant = 'blue' | 'pink' | 'dark';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#3B82F6': 'blue',
  '#EC4899': 'pink',
  '#6366F1': 'dark',
};

export function MobileSocialProfile({ variant = 'blue' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState('grid');
  const [activeBottomTab, setActiveBottomTab] = useState('Profile');

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

  const highlights = [
    { label: 'Travel', gradient: 'from-blue-400 to-cyan-400' },
    { label: 'Food', gradient: 'from-orange-400 to-red-400' },
    { label: 'Design', gradient: 'from-purple-400 to-blue-400' },
    { label: 'Pets', gradient: 'from-pink-400 to-orange-400' },
    { label: 'Music', gradient: 'from-green-400 to-teal-400' },
    { label: 'Gym', gradient: 'from-amber-400 to-red-400' },
  ];

  const posts = [
    { id: 1, gradient: 'from-blue-400 to-purple-500', likes: '2,340', comments: '128' },
    { id: 2, gradient: 'from-orange-400 to-pink-500', isVideo: true, likes: '8,920', comments: '456' },
    { id: 3, gradient: 'from-teal-400 to-green-500', likes: '1,560', comments: '89' },
    { id: 4, gradient: 'from-pink-400 to-rose-500', likes: '4,210', comments: '234' },
    { id: 5, gradient: 'from-purple-400 to-indigo-500', isVideo: true, likes: '12,400', comments: '678' },
    { id: 6, gradient: 'from-amber-400 to-orange-500', likes: '3,890', comments: '167' },
    { id: 7, gradient: 'from-cyan-400 to-blue-500', isMulti: true, likes: '2,100', comments: '95' },
    { id: 8, gradient: 'from-red-400 to-pink-500', likes: '6,780', comments: '345' },
    { id: 9, gradient: 'from-green-400 to-lime-500', likes: '1,890', comments: '112' },
    { id: 10, gradient: 'from-violet-400 to-purple-500', isVideo: true, likes: '15,200', comments: '890' },
    { id: 11, gradient: 'from-blue-400 to-teal-500', likes: '2,670', comments: '143' },
    { id: 12, gradient: 'from-orange-400 to-yellow-500', likes: '4,560', comments: '256' },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .social-wrapper {
          --accent: #3B82F6;
          --accent-light: rgba(59,130,246,0.1);
          --bg-primary: #FFFFFF;
          --bg-secondary: #FAFAFA;
          --bg-card: #FFFFFF;
          --border: #EFEFEF;
          --text-primary: #1A1A1A;
          --text-secondary: #888888;
          font-family: 'Inter', sans-serif;
        }
        .social-wrapper[data-theme="pink"] {
          --accent: #EC4899;
          --accent-light: rgba(236,72,153,0.1);
          --bg-primary: #FFF5F8;
          --bg-secondary: #FFF0F5;
          --bg-card: #FFFFFF;
          --border: #FFD6E8;
          --text-primary: #1A1A1A;
          --text-secondary: #AA6688;
        }
        .social-wrapper[data-theme="dark"] {
          --accent: #6366F1;
          --accent-light: rgba(99,102,241,0.1);
          --bg-primary: #0A0A0F;
          --bg-secondary: #12121A;
          --bg-card: #1A1A24;
          --border: #2A2A38;
          --text-primary: #F5F5FF;
          --text-secondary: #7878AA;
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
        className="social-wrapper min-h-screen bg-neutral-100 flex justify-center text-[var(--text-primary)]"
        data-theme={activeTheme === 'blue' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col pb-safe">
          
          {/* 1. Header */}
          <div className="px-4 py-3 flex justify-between items-center border-b border-[var(--border)]">
            <div className="flex items-center gap-1.5 cursor-pointer">
              <span className="font-bold text-lg">@alexdesigns</span>
              <svg className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <div className="flex items-center gap-4 text-[var(--text-primary)]">
              <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pb-16 scrollbar-hide">
            {/* 2. Profile Info */}
            <div className="px-4 py-4">
              <div className="flex items-center gap-5">
                <div className="w-[80px] h-[80px] rounded-full ring-2 ring-[var(--accent)]/30 p-1 shrink-0 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500">
                  <div className="w-full h-full rounded-full bg-[var(--bg-primary)] p-0.5">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-400 to-purple-400"></div>
                  </div>
                </div>
                <div className="flex-1 flex justify-around">
                  <div className="flex flex-col items-center cursor-pointer">
                    <span className="font-bold text-lg">1,284</span>
                    <span className="text-xs text-[var(--text-secondary)]">Posts</span>
                  </div>
                  <div className="flex flex-col items-center cursor-pointer">
                    <span className="font-bold text-lg">45.2K</span>
                    <span className="text-xs text-[var(--text-secondary)]">Followers</span>
                  </div>
                  <div className="flex flex-col items-center cursor-pointer">
                    <span className="font-bold text-lg">892</span>
                    <span className="text-xs text-[var(--text-secondary)]">Following</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <h2 className="font-bold text-sm">Alex Chen</h2>
                <p className="text-sm">UI/UX Designer • Creating beautiful interfaces</p>
                <p className="text-sm">Based in San Francisco 🌉</p>
                <a href="#" className="text-[var(--accent)] text-sm font-medium hover:underline">designfolio.co/alex</a>
              </div>

              <div className="mt-3 flex gap-2">
                <button className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg py-1.5 text-sm font-semibold hover:bg-[var(--accent-light)] transition-colors cursor-pointer">
                  Edit Profile
                </button>
                <button className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg py-1.5 text-sm font-semibold hover:bg-[var(--accent-light)] transition-colors cursor-pointer">
                  Share Profile
                </button>
                <button className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-3 flex items-center justify-center hover:bg-[var(--accent-light)] transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 3. Story Highlights */}
            <div className="px-4 mt-2">
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer group">
                    <div className="w-[64px] h-[64px] rounded-full ring-2 ring-[var(--border)] p-0.5 group-hover:ring-[var(--accent)] transition-colors">
                      <div className={`w-full h-full rounded-full bg-gradient-to-br ${item.gradient}`}></div>
                    </div>
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Content Tabs */}
            <div className="mt-4 flex border-b border-[var(--border)]">
              <button 
                onClick={() => setActiveTab('grid')}
                className={`flex-1 py-3 flex justify-center border-b-2 cursor-pointer transition-colors ${activeTab === 'grid' ? 'border-[var(--accent)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button 
                onClick={() => setActiveTab('reels')}
                className={`flex-1 py-3 flex justify-center border-b-2 cursor-pointer transition-colors ${activeTab === 'reels' ? 'border-[var(--accent)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button 
                onClick={() => setActiveTab('tags')}
                className={`flex-1 py-3 flex justify-center border-b-2 cursor-pointer transition-colors ${activeTab === 'tags' ? 'border-[var(--accent)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>

            {/* 5. Photo Grid */}
            <div className="grid grid-cols-3 gap-0.5">
              {posts.map((post) => (
                <div key={post.id} className="aspect-square relative cursor-pointer group bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className={`w-full h-full bg-gradient-to-br ${post.gradient}`}></div>
                  
                  {post.isVideo && (
                    <div className="absolute top-2 right-2 text-white drop-shadow-md">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                  {post.isMulti && (
                    <div className="absolute top-2 right-2 text-white drop-shadow-md">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity duration-200">
                    <div className="flex items-center gap-1.5 text-white">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <span className="font-bold text-sm">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                      </svg>
                      <span className="font-bold text-sm">{post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Bottom Nav */}
          <div className="fixed bottom-0 w-full max-w-[390px] bg-[var(--bg-primary)]/95 backdrop-blur border-t border-[var(--border)] z-50 pb-safe">
            <div className="flex justify-around items-center py-2">
              <button 
                onClick={() => setActiveBottomTab('Home')}
                className={`p-2 cursor-pointer transition-colors ${activeBottomTab === 'Home' ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                <svg className="w-7 h-7" fill={activeBottomTab === 'Home' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </button>
              <button 
                onClick={() => setActiveBottomTab('Search')}
                className={`p-2 cursor-pointer transition-colors ${activeBottomTab === 'Search' ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={activeBottomTab === 'Search' ? "2.5" : "1.5"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
              <button 
                onClick={() => setActiveBottomTab('Create')}
                className={`p-2 cursor-pointer transition-colors ${activeBottomTab === 'Create' ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={activeBottomTab === 'Create' ? "2.5" : "1.5"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button 
                onClick={() => setActiveBottomTab('Reels')}
                className={`p-2 cursor-pointer transition-colors ${activeBottomTab === 'Reels' ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                <svg className="w-7 h-7" fill={activeBottomTab === 'Reels' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button 
                onClick={() => setActiveBottomTab('Profile')}
                className={`p-2 cursor-pointer transition-colors ${activeBottomTab === 'Profile' ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 ring-2 ${activeBottomTab === 'Profile' ? 'ring-[var(--accent)]' : 'ring-transparent'}`}></div>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
