import { useState, useEffect } from 'react';

type Variant = 'teal' | 'violet' | 'rose';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#14B8A6': 'teal',
  '#8B5CF6': 'violet',
  '#F43F5E': 'rose',
};

const postData = [
  {
    id: 1,
    username: 'alex_smith',
    timestamp: '15m',
    imageGradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    likes: '1,234 likes',
    caption: 'Breathtaking views on today\'s hike!',
    hashtags: '#nature #hiking #sunset',
    comments: 'View all 42 comments'
  },
  {
    id: 2,
    username: 'sarah_jones',
    timestamp: '45m',
    imageGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    likes: '892 likes',
    caption: 'Charlie loved the beach day!',
    hashtags: '#goldendoodle #doglife #beach',
    comments: 'View all 28 comments'
  },
  {
    id: 3,
    username: 'mike_creative',
    timestamp: '2h',
    imageGradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    likes: '2,156 likes',
    caption: 'New artwork dropping next week. Stay tuned!',
    hashtags: '#art #design #creative',
    comments: 'View all 156 comments'
  },
  {
    id: 4,
    username: 'emma_travels',
    timestamp: '5h',
    imageGradient: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
    likes: '3,421 likes',
    caption: 'Found paradise in Bali. Never leaving!',
    hashtags: '#travel #bali #wanderlust',
    comments: 'View all 210 comments'
  }
];

const stories = [
  { name: 'Your Story', isUser: true },
  { name: 'Alex' },
  { name: 'Sarah' },
  { name: 'Mike' },
  { name: 'Emma' },
  { name: 'Chloe' },
  { name: 'David' }
];

export function MobileSocialFeed({ variant = 'teal' }: { variant?: 'teal' | 'violet' | 'rose' }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [activeTab, setActiveTab] = useState<'home'|'search'|'create'|'notifications'|'profile'>('home');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
  const [customAccent, setCustomAccent] = useState<string | null>(null);

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
      const themeName = ACCENT_TO_THEME[variation.accent.toUpperCase()];
      if (themeName) {
        setActiveTheme(themeName);
        setCustomAccent(null);
      } else {
        setActiveTheme('teal');
        setCustomAccent(variation.accent);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const toggleLike = (id: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const toggleSave = (id: number) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .social-wrapper {
          --accent: #14B8A6;
          --accent-hover: #0D9488;
          --bg-primary: #111111;
          --bg-secondary: #1A1A1A;
          --bg-card: #1E1E1E;
          --border: #2A2A2A;
          --text-primary: #F5F5F5;
          --text-secondary: #888888;
          font-family: 'Inter', sans-serif;
        }
        .social-wrapper[data-theme="violet"] {
          --accent: #8B5CF6;
          --accent-hover: #7C3AED;
          --bg-primary: #0F0B18;
          --bg-secondary: #161022;
          --bg-card: #1C1530;
          --border: #2A2040;
          --text-primary: #F5F5F5;
          --text-secondary: #9B8FC0;
        }
        .social-wrapper[data-theme="rose"] {
          --accent: #F43F5E;
          --accent-hover: #E11D48;
          --bg-primary: #140A0C;
          --bg-secondary: #1C1012;
          --bg-card: #221418;
          --border: #3A1E24;
          --text-primary: #F5F5F5;
          --text-secondary: #C08090;
        }
        ${customAccent ? `
        .social-wrapper {
          --accent: ${customAccent} !important;
          --accent-hover: ${customAccent} !important;
        }
        ` : ''}
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .like-anim {
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .like-anim:active {
          transform: scale(0.8);
        }
        .like-anim.liked {
          animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          fill: var(--accent);
          color: var(--accent);
        }
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
      `}</style>

      <div className="social-wrapper min-h-screen bg-[var(--bg-secondary)] flex justify-center text-[var(--text-primary)]" data-theme={activeTheme === 'teal' ? undefined : activeTheme}>
        
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative shadow-2xl flex flex-col pb-20">
          
          {/* Header */}
          <div className="sticky top-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur px-4 py-3 flex items-center justify-between border-b border-[var(--border)]">
            <span className="text-[var(--accent)] font-bold tracking-wider text-xl">CONNECT</span>
            <div className="flex items-center gap-4">
              <div className="relative cursor-pointer text-[var(--text-primary)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div className="absolute top-0 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-[var(--bg-primary)]"></div>
              </div>
              <div className="cursor-pointer text-[var(--text-primary)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 scrollbar-hide">
            {/* Stories */}
            <div className="px-4 py-3 border-b border-[var(--border)]">
              <span className="text-[var(--text-secondary)] text-sm font-semibold mb-2 block">Stories</span>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                {stories.map((story, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${story.isUser ? 'border-2 border-dashed border-[var(--border)]' : 'border-2 border-[var(--accent)] p-0.5'}`}>
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-gray-600 relative overflow-hidden flex items-center justify-center">
                        {story.isUser && (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-[var(--text-primary)] truncate max-w-[64px]">{story.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Post Feed */}
            <div className="flex flex-col gap-6 pt-2 pb-6">
              {postData.map(post => {
                const isLiked = likedPosts.has(post.id);
                const isSaved = savedPosts.has(post.id);
                return (
                  <div key={post.id} className="flex flex-col">
                    <div className="px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-500"></div>
                        <span className="font-bold text-sm">{post.username}</span>
                      </div>
                      <span className="text-[var(--text-secondary)] text-xs">{post.timestamp}</span>
                    </div>
                    
                    <div className="w-full aspect-[4/3]" style={{ background: post.imageGradient }}></div>
                    
                    <div className="px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button onClick={() => toggleLike(post.id)} className={`cursor-pointer text-[var(--text-primary)] like-anim ${isLiked ? 'liked' : ''}`}>
                          <svg className="w-6 h-6" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        <button className="cursor-pointer text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </button>
                        <button className="cursor-pointer text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </div>
                      <button onClick={() => toggleSave(post.id)} className="cursor-pointer text-[var(--text-primary)]">
                        <svg className="w-6 h-6" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>

                    <div className="px-4 flex flex-col gap-1">
                      <span className="font-bold text-sm cursor-pointer">{post.likes}</span>
                      <div className="text-sm">
                        <span className="font-bold cursor-pointer mr-1">{post.username}</span>
                        <span>{post.caption}</span>
                        <span className="text-[var(--accent)] ml-1 cursor-pointer hover:underline">{post.hashtags}</span>
                      </div>
                      <span className="text-[var(--text-secondary)] text-sm cursor-pointer mt-1">{post.comments}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Floating Compose Button */}
          <div className="absolute bottom-24 right-8 z-40">
            <button className="w-14 h-14 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-lg hover:bg-[var(--accent-hover)] transition-colors cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-0 w-full bg-[var(--bg-secondary)] border-t border-[var(--border)] h-16 flex items-center justify-around z-50">
            {[
              { id: 'home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { id: 'search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
              { id: 'create', icon: 'M12 4v16m8-8H4', circle: true },
              { id: 'notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
              { id: 'profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`cursor-pointer p-2 rounded-full transition-colors ${activeTab === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
                {tab.circle ? (
                  <div className="w-8 h-8 rounded border-2 border-current flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
                    </svg>
                  </div>
                ) : (
                  <svg className="w-6 h-6" fill={activeTab === tab.id ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={tab.icon} />
                  </svg>
                )}
              </button>
            ))}
          </div>

        </div>

        {/* Floating Theme Switcher */}
        <div className="fixed bottom-5 right-5 bg-[var(--bg-card)] p-2.5 rounded-full shadow-lg flex gap-2.5 z-[1000] border border-[var(--border)]">
          {[
            { id: 'teal', bg: '#14B8A6' },
            { id: 'violet', bg: '#8B5CF6' },
            { id: 'rose', bg: '#F43F5E' }
          ].map(theme => (
            <button 
              key={theme.id}
              onClick={() => {
                setActiveTheme(theme.id as Variant);
                setCustomAccent(null);
              }}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform hover:scale-110 ${activeTheme === theme.id && !customAccent ? 'border-[var(--text-primary)] scale-110' : 'border-transparent'}`}
              style={{ background: theme.bg }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
