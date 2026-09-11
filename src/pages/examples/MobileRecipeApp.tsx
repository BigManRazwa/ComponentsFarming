import { useState, useEffect } from 'react';

type Variant = 'tomato' | 'herb' | 'honey';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#DC2626': 'tomato',
  '#16A34A': 'herb',
  '#D97706': 'honey',
};

export function MobileRecipeApp({ variant = 'tomato' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [activeTab, setActiveTab] = useState<'Home' | 'Explore' | 'Add' | 'Saved' | 'Profile'>('Home');
  const [activeCategory, setActiveCategory] = useState('All');
  const [savedRecipes, setSavedRecipes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('tomato');
        return;
      }
      const themeName = ACCENT_TO_THEME[variation.accent] || 'tomato';
      setActiveTheme(themeName);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedRecipes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Salads', 'Drinks'];

  const popularRecipes = [
    { id: 'p1', title: 'Avocado Toast', chef: 'Chef Emma', time: '15 min', rating: '4.7', diff: 'Easy' },
    { id: 'p2', title: 'Pasta Carbonara', chef: 'Chef Luca', time: '25 min', rating: '4.9', diff: 'Medium' },
    { id: 'p3', title: 'Berry Smoothie Bowl', chef: 'Chef Nina', time: '10 min', rating: '4.6', diff: 'Easy' },
  ];

  const quickEasy = [
    { id: 'q1', title: 'Egg Fried Rice', time: '12 min' },
    { id: 'q2', title: 'Greek Salad', time: '8 min' },
    { id: 'q3', title: 'Smoothie', time: '5 min' },
    { id: 'q4', title: 'Bruschetta', time: '15 min' },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .recipe-wrapper {
          --accent: #DC2626;
          --accent-hover: #B91C1C;
          --accent-light: #FEF2F2;
          --bg-primary: #FFFAFA;
          --bg-secondary: #FFF5F5;
          --bg-card: #FFFFFF;
          --border: #FECACA;
          --text-primary: #1A1A1A;
          --text-secondary: #6B7280;
          font-family: 'Inter', sans-serif;
        }
        .recipe-wrapper[data-theme="herb"] {
          --accent: #16A34A;
          --accent-hover: #15803D;
          --accent-light: #F0FDF4;
          --bg-primary: #F9FFF5;
          --bg-secondary: #F0FDF4;
          --bg-card: #FFFFFF;
          --border: #BBF7D0;
          --text-primary: #1A1A1A;
          --text-secondary: #6B7280;
        }
        .recipe-wrapper[data-theme="honey"] {
          --accent: #D97706;
          --accent-hover: #B45309;
          --accent-light: #FFFBEB;
          --bg-primary: #FFFDF5;
          --bg-secondary: #FFF8E1;
          --bg-card: #FFFFFF;
          --border: #FDE68A;
          --text-primary: #1A1A1A;
          --text-secondary: #6B7280;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="recipe-wrapper min-h-screen bg-gray-100 flex justify-center text-[var(--text-primary)]" data-theme={activeTheme === 'tomato' ? undefined : activeTheme}>
        
        {/* Mobile Phone Container */}
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col pb-20 overflow-x-hidden shadow-2xl">
          
          {/* 1. Status Bar (Simulated) */}
          <div className="bg-transparent px-5 py-3 flex items-center justify-between sticky top-0 z-50 text-[var(--text-primary)] font-medium text-[14px]">
            <span>09:41</span>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
              <svg className="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 6h16a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V8a2 2 0 012-2z M20 10v4" /></svg>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 scrollbar-hide">
            
            {/* 1. Header */}
            <div className="px-5 pt-4 flex justify-between items-center">
              <div>
                <div className="text-[var(--text-secondary)] text-sm">Good Morning!</div>
                <div className="text-xl font-bold">What to cook today?</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--accent)] to-yellow-300 p-0.5">
                <div className="w-full h-full bg-[var(--bg-card)] rounded-full flex items-center justify-center text-[var(--accent)] font-bold text-sm">
                  ME
                </div>
              </div>
            </div>

            {/* 2. Search */}
            <div className="px-5 mt-4">
              <div className="bg-[var(--bg-secondary)] rounded-xl py-3 px-4 flex items-center gap-2 border border-[var(--border)]">
                <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search recipes..." 
                  className="bg-transparent border-none outline-none w-full text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
                />
              </div>
            </div>

            {/* 3. Category Pills */}
            <div className="px-5 mt-5 flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-colors cursor-pointer ${
                    activeCategory === cat 
                      ? 'bg-[var(--accent)] text-white' 
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 4. Featured Recipe */}
            <div className="mx-5 mt-6">
              <div className="flex items-center gap-1.5 mb-3">
                <h2 className="font-bold text-lg">Featured</h2>
                <svg className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-md group cursor-pointer">
                {/* Placeholder Image Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-red-300"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Top Actions */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                  </button>
                  <button 
                    onClick={(e) => toggleSave('featured', e)}
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                  >
                    <svg className="w-4 h-4" fill={savedRecipes['featured'] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                  </button>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white font-bold text-lg leading-tight">Creamy Tuscan Chicken</div>
                  <div className="text-white/80 text-sm mt-1">By Chef Marco</div>
                  <div className="flex gap-2 mt-3">
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-md text-white text-xs font-medium">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      35 min
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-md text-white text-xs font-medium">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      420 cal
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-md text-white text-xs font-medium">
                      <svg className="w-3 h-3 text-yellow-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      4.9
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Popular Recipes */}
            <div className="px-5 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Popular Recipes</h2>
                <button className="text-[var(--accent)] text-sm font-medium cursor-pointer">See All</button>
              </div>
              
              <div className="flex flex-col gap-3">
                {popularRecipes.map(recipe => (
                  <div key={recipe.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3 flex items-center gap-3 shadow-sm cursor-pointer hover:border-[var(--accent)] transition-colors">
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[var(--border)] to-[var(--bg-secondary)] flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="font-bold text-sm">{recipe.title}</div>
                        <button 
                          onClick={(e) => toggleSave(recipe.id, e)}
                          className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                        >
                          <svg className="w-5 h-5" fill={savedRecipes[recipe.id] ? "var(--accent)" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                        </button>
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] mb-2">{recipe.chef}</div>
                      <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {recipe.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                          {recipe.rating}
                        </div>
                        <div className="bg-[var(--accent-light)] text-[var(--accent)] px-1.5 py-0.5 rounded font-medium text-[10px]">
                          {recipe.diff}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Quick & Easy */}
            <div className="pl-5 mt-6 mb-2">
              <div className="flex items-center gap-1.5 mb-4 pr-5">
                <h2 className="font-bold text-lg">Quick & Easy</h2>
                <div className="flex items-center gap-1 bg-[var(--accent-light)] text-[var(--accent)] px-2 py-0.5 rounded-full text-xs font-medium ml-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Under 20 min
                </div>
              </div>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pr-5">
                {quickEasy.map(item => (
                  <div key={item.id} className="w-32 flex-shrink-0 cursor-pointer group">
                    <div className="w-full aspect-square rounded-xl bg-gradient-to-tr from-[var(--border)] to-[var(--bg-secondary)] mb-2 group-hover:opacity-90 transition-opacity"></div>
                    <div className="font-bold text-xs truncate">{item.title}</div>
                    <div className="text-xs text-[var(--text-secondary)] mt-0.5">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Weekly Meal Plan */}
            <div className="mx-5 mt-6 bg-[var(--accent-light)] rounded-xl p-5 mb-24 flex items-center justify-between border border-[var(--border)]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-bold text-[var(--text-primary)]">Weekly Meal Plan</h3>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-3">Plan your week</p>
                <button className="bg-[var(--accent)] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition-colors cursor-pointer">
                  Get Started
                </button>
              </div>
              <div className="w-20 h-20 opacity-50">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* 8. Bottom Nav */}
          <div className="fixed bottom-0 w-full max-w-[390px] h-20 bg-[var(--bg-primary)] border-t border-[var(--border)] flex z-50 rounded-t-2xl px-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
            <div className="flex w-full justify-between items-center relative">
              <button onClick={() => setActiveTab('Home')} className={`flex flex-col items-center justify-center gap-1 w-12 cursor-pointer ${activeTab === 'Home' ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>
                <svg className="w-6 h-6" fill={activeTab === 'Home' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                <span className="text-[10px] font-medium">Home</span>
              </button>
              
              <button onClick={() => setActiveTab('Explore')} className={`flex flex-col items-center justify-center gap-1 w-12 cursor-pointer ${activeTab === 'Explore' ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>
                <svg className="w-6 h-6" fill={activeTab === 'Explore' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                <span className="text-[10px] font-medium">Explore</span>
              </button>

              <div className="w-14 flex justify-center">
                <button onClick={() => setActiveTab('Add')} className="absolute -top-5 w-14 h-14 bg-[var(--accent)] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--accent-hover)] transition-transform hover:scale-105 cursor-pointer border-4 border-[var(--bg-primary)]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>

              <button onClick={() => setActiveTab('Saved')} className={`flex flex-col items-center justify-center gap-1 w-12 cursor-pointer ${activeTab === 'Saved' ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>
                <svg className="w-6 h-6" fill={activeTab === 'Saved' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                <span className="text-[10px] font-medium">Saved</span>
              </button>
              
              <button onClick={() => setActiveTab('Profile')} className={`flex flex-col items-center justify-center gap-1 w-12 cursor-pointer ${activeTab === 'Profile' ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>
                <svg className="w-6 h-6" fill={activeTab === 'Profile' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <span className="text-[10px] font-medium">Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Variant Switcher */}
        <div className="fixed bottom-5 right-5 bg-white p-2.5 rounded-full shadow-xl flex gap-2.5 z-[1000] border border-gray-200">
          {[
            { id: 'tomato', bg: '#DC2626' },
            { id: 'herb', bg: '#16A34A' },
            { id: 'honey', bg: '#D97706' }
          ].map(theme => (
            <button 
              key={theme.id}
              onClick={() => setActiveTheme(theme.id as Variant)}
              className={`w-[30px] h-[30px] rounded-full border-2 cursor-pointer transition-transform hover:scale-110 ${activeTheme === theme.id ? 'border-gray-800 scale-110' : 'border-transparent'}`}
              style={{ background: theme.bg }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
