import { useState, useEffect } from 'react';

export function MobileDatingApp({ variant = 'coral' }: { variant?: 'coral' | 'purple' | 'blue' }) {
  const [activeTab, setActiveTab] = useState('discover');

  // Font injection
  useEffect(() => {
    window.postMessage({ type: 'customFont', fontName: 'Inter' }, '*');
  }, []);

  const themeVars = {
    coral: {
      '--accent': '#FF6B6B',
      '--accent-hover': '#EF4444',
      '--accent-light': 'rgba(255,107,107,0.1)',
      '--gradient-from': '#FF6B6B',
      '--gradient-to': '#FF8E53',
      '--bg-primary': '#FFFFFF',
      '--bg-secondary': '#FAF5F5',
      '--bg-card': '#FFFFFF',
      '--border': '#F0E0E0',
      '--text-primary': '#1A1A1A',
      '--text-secondary': '#888888',
    },
    purple: {
      '--accent': '#A855F7',
      '--accent-hover': '#9333EA',
      '--accent-light': 'rgba(168,85,247,0.1)',
      '--gradient-from': '#A855F7',
      '--gradient-to': '#6366F1',
      '--bg-primary': '#FFFFFF',
      '--bg-secondary': '#F8F5FF',
      '--bg-card': '#FFFFFF',
      '--border': '#E8D8F8',
      '--text-primary': '#1A1A1A',
      '--text-secondary': '#8878A8',
    },
    blue: {
      '--accent': '#3B82F6',
      '--accent-hover': '#2563EB',
      '--accent-light': 'rgba(59,130,246,0.1)',
      '--gradient-from': '#3B82F6',
      '--gradient-to': '#06B6D4',
      '--bg-primary': '#FFFFFF',
      '--bg-secondary': '#F0F5FF',
      '--bg-card': '#FFFFFF',
      '--border': '#DBEAFE',
      '--text-primary': '#1A1A1A',
      '--text-secondary': '#6B8CAE',
    },
  }[variant] as unknown as React.CSSProperties;

  const tabs = [
    { id: 'discover', icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" },
    { id: 'likes', icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", badge: '5' },
    { id: 'chat', icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", badge: '3' },
    { id: 'profile', icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  ];

  const peopleNear = [
    { name: 'Emma', gradient: 'from-pink-400 to-orange-400' },
    { name: 'Lily', gradient: 'from-purple-400 to-blue-400' },
    { name: 'Maya', gradient: 'from-blue-400 to-teal-400' },
    { name: 'Zoe', gradient: 'from-amber-400 to-red-400' },
    { name: 'Ava', gradient: 'from-green-400 to-teal-400' },
    { name: 'Mia', gradient: 'from-pink-400 to-rose-400' },
  ];

  const activity = [
    { text: 'Emma liked your photo', time: '2m ago', gradient: 'from-pink-400 to-orange-400' },
    { text: 'Lily sent you a message', time: '15m ago', gradient: 'from-purple-400 to-blue-400' },
    { text: 'Maya wants to connect', time: '1h ago', gradient: 'from-blue-400 to-teal-400' },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div 
        className="dating-wrapper w-full max-w-[390px] h-[844px] overflow-hidden relative shadow-2xl rounded-[40px] border-8 border-gray-900"
        style={{ ...themeVars, backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}
        data-theme="light"
      >
        <div className="h-full overflow-y-auto overflow-x-hidden no-scrollbar">
          
          {/* 1. Header */}
          <div className="px-5 pt-12 pb-2 flex justify-between items-center sticky top-0 z-10" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
              <span className="font-bold text-xl tracking-tight">Spark</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>San Francisco</span>
            </div>
            <div className="cursor-pointer hover:opacity-70 transition-opacity">
              <svg className="w-6 h-6" style={{ color: 'var(--text-secondary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
          </div>

          {/* 2. Profile Card */}
          <div className="mx-5 mt-3 relative rounded-3xl overflow-hidden shadow-xl" style={{ backgroundColor: 'var(--bg-card)' }}>
            <div 
              className="h-[380px] relative w-full"
              style={{ background: 'linear-gradient(to bottom right, var(--gradient-from), var(--gradient-to))' }}
            >
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3ApIi8+PC9zdmc+')]"></div>
              
              {/* Image dots */}
              <div className="absolute bottom-20 flex gap-1.5 justify-center w-full z-10">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${i === 0 ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`} />
                ))}
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Info overlay */}
              <div className="absolute bottom-0 p-5 w-full z-10">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-white">Sarah, 28</h2>
                  <svg className="w-5 h-5 text-blue-500 fill-white" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"/>
                  </svg>
                </div>
                <p className="text-sm text-white/80 mt-1 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  2 miles away
                </p>
              </div>
            </div>

            <div className="p-5" style={{ backgroundColor: 'var(--bg-card)' }}>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Coffee lover &bull; Hiking enthusiast &bull; Dog mom
              </p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {['Photography', 'Travel', 'Yoga', 'Cooking'].map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium border"
                    style={{ 
                      color: 'var(--accent)', 
                      backgroundColor: 'var(--accent-light)',
                      borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' 
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span 
                  className="text-sm font-bold text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(to right, var(--gradient-from), var(--gradient-to))' }}
                >
                  92% Match
                </span>
              </div>
            </div>
          </div>

          {/* 3. Action Buttons */}
          <div className="flex justify-center items-center gap-6 mt-6 px-5 relative z-10">
            <button className="w-14 h-14 border-2 border-red-300 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform bg-white cursor-pointer group">
              <svg className="w-6 h-6 text-red-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button className="w-12 h-12 border-2 border-amber-300 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform bg-white cursor-pointer group">
              <svg className="w-6 h-6 text-amber-400 fill-current group-hover:text-amber-500 transition-colors" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </button>
            <button 
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
              style={{ 
                background: 'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
                boxShadow: '0 10px 15px -3px color-mix(in srgb, var(--accent) 30%, transparent)' 
              }}
            >
              <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>

          {/* 4. People Near You */}
          <div className="px-5 mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold">People near you</h3>
              <button className="text-xs font-semibold cursor-pointer" style={{ color: 'var(--accent)' }}>See all</button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {peopleNear.map((person, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer">
                  <div className={`w-16 h-16 p-0.5 rounded-full bg-gradient-to-tr ${person.gradient}`}>
                    <div className="w-full h-full bg-white rounded-full p-0.5">
                      <div className={`w-full h-full rounded-full bg-gradient-to-br ${person.gradient} opacity-80`} />
                    </div>
                  </div>
                  <span className="text-xs font-medium">{person.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Recent Activity */}
          <div className="px-5 mt-2 pb-28">
            <h3 className="text-sm font-bold mb-3">Recent Activity</h3>
            <div className="flex flex-col gap-3">
              {activity.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${item.gradient} flex-shrink-0`} />
                  <div className="flex-1">
                    <p className="text-sm font-bold line-clamp-1">{item.text}</p>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 6. Bottom Nav */}
        <div 
          className="absolute bottom-0 w-full backdrop-blur-md border-t z-50 px-2 pb-5 pt-3 flex justify-around items-center"
          style={{ backgroundColor: 'color-mix(in srgb, var(--bg-card) 95%, transparent)', borderColor: 'var(--border)' }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center gap-1 p-2 relative cursor-pointer group"
                style={{ color: isActive ? 'var(--accent)' : 'var(--text-secondary)' }}
              >
                <div className="relative">
                  <svg className={`w-6 h-6 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 1.5 : 2} d={tab.icon} />
                  </svg>
                  {tab.badge && (
                    <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                      {tab.badge}
                    </span>
                  )}
                </div>
                {isActive && (
                  <div className="w-1 h-1 rounded-full absolute -bottom-1" style={{ backgroundColor: 'var(--accent)' }} />
                )}
              </button>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
