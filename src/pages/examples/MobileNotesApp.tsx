import { useState, useEffect } from 'react';

type Variant = 'amber' | 'blue' | 'rose';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#F59E0B': 'amber',
  '#3B82F6': 'blue',
  '#F43F5E': 'rose',
};

export function MobileNotesApp({ variant = 'amber' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('Notes');
  
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({
    'avocados': true,
    'milk': false,
    'monday': true,
    'tuesday': false,
  });

  const toggleCheckbox = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckboxes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('amber'); 
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

  const categories = ["All", "Personal", "Work", "Ideas", "Archive"];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .notes-wrapper {
          --accent: #F59E0B;
          --accent-hover: #D97706;
          --accent-light: rgba(245,158,11,0.1);
          --bg-primary: #FFFBF0;
          --bg-secondary: #FFF8E6;
          --bg-card: #FFFFFF;
          --border: #F0E6CC;
          --text-primary: #1A1A1A;
          --text-secondary: #888888;
          font-family: 'Inter', sans-serif;
        }
        .notes-wrapper[data-theme="blue"] {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-light: rgba(59,130,246,0.08);
          --bg-primary: #F5F8FF;
          --bg-secondary: #EEF2FF;
          --bg-card: #FFFFFF;
          --border: #DBEAFE;
          --text-primary: #1A1A1A;
          --text-secondary: #6B8CAE;
        }
        .notes-wrapper[data-theme="rose"] {
          --accent: #F43F5E;
          --accent-hover: #E11D48;
          --accent-light: rgba(244,63,94,0.08);
          --bg-primary: #FFF5F7;
          --bg-secondary: #FFF0F3;
          --bg-card: #FFFFFF;
          --border: #FFE0E6;
          --text-primary: #1A1A1A;
          --text-secondary: #AA6680;
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
        className="notes-wrapper min-h-screen bg-neutral-100 flex justify-center text-[var(--text-primary)]"
        data-theme={activeTheme === 'amber' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col pb-24 overflow-x-hidden">
          
          {/* 1. Header */}
          <div className="px-5 pt-4 flex justify-between items-center z-10">
            <h1 className="font-bold text-2xl">My Notes</h1>
            <div className="flex gap-3 text-[var(--text-primary)]">
              <button className="p-1.5 hover:bg-[var(--bg-secondary)] rounded-full transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
              <button className="p-1.5 hover:bg-[var(--bg-secondary)] rounded-full transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </button>
            </div>
          </div>

          {/* 2. Category Pills */}
          <div className="px-5 mt-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                      : 'bg-[var(--bg-secondary)] border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Pinned Notes */}
          <div className="px-5 mt-4">
            <div className="flex items-center gap-1.5 mb-2">
              <svg className="w-3.5 h-3.5 text-[var(--text-secondary)]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.828 3h3.982a2 2 0 011.992 2.181l-.637 7A2 2 0 0113.174 14H11v4a1 1 0 01-2 0v-4H6.826a2 2 0 01-1.991-1.819l-.637-7A2 2 0 016.19 3h3.638z" />
              </svg>
              <h2 className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-semibold">Pinned</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm relative cursor-pointer hover:shadow-md transition-shadow flex flex-col h-full">
                <svg className="w-3 h-3 text-[var(--accent)] absolute top-3 right-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.828 3h3.982a2 2 0 011.992 2.181l-.637 7A2 2 0 0113.174 14H11v4a1 1 0 01-2 0v-4H6.826a2 2 0 01-1.991-1.819l-.637-7A2 2 0 016.19 3h3.638z" />
                </svg>
                <h3 className="font-bold text-sm text-[var(--text-primary)] pr-4 line-clamp-1 mb-1">Project Roadmap</h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3 flex-grow">Q4 goals and milestones for the mobile app redesign...</p>
                <div className="flex items-center gap-1.5 mt-auto">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                  <span className="text-xs text-[var(--text-secondary)] font-medium">Oct 26</span>
                </div>
              </div>

              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm relative cursor-pointer hover:shadow-md transition-shadow flex flex-col h-full">
                <svg className="w-3 h-3 text-[var(--accent)] absolute top-3 right-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.828 3h3.982a2 2 0 011.992 2.181l-.637 7A2 2 0 0113.174 14H11v4a1 1 0 01-2 0v-4H6.826a2 2 0 01-1.991-1.819l-.637-7A2 2 0 016.19 3h3.638z" />
                </svg>
                <h3 className="font-bold text-sm text-[var(--text-primary)] pr-4 line-clamp-1 mb-1">Meeting Notes</h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3 flex-grow">Discussion points from the design review with the team...</p>
                <div className="flex items-center gap-1.5 mt-auto">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                  <span className="text-xs text-[var(--text-secondary)] font-medium">Oct 25</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Notes Grid */}
          <div className="px-5 mt-5">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-semibold">Notes <span className="font-normal">(8)</span></h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pb-8">
              {/* Note 1 */}
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow flex flex-col">
                <div className="mb-2">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">Work</span>
                </div>
                <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1">Design System</h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-3 mb-3 flex-grow">Color tokens, typography scale, spacing...</p>
                <div className="mt-auto">
                  <span className="text-xs text-[var(--text-secondary)] font-medium">Oct 24</span>
                </div>
              </div>

              {/* Note 2 - Checkbox list */}
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow flex flex-col">
                <div className="mb-2">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">Personal</span>
                </div>
                <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1.5">Grocery List</h3>
                <div className="space-y-1.5 mb-3 flex-grow">
                  <div 
                    className="flex items-center gap-2 group cursor-pointer" 
                    onClick={(e) => toggleCheckbox('avocados', e)}
                  >
                    <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-colors ${checkboxes.avocados ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-gray-300'}`}>
                      {checkboxes.avocados && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className={`text-xs ${checkboxes.avocados ? 'text-[var(--text-secondary)] line-through' : 'text-[var(--text-primary)]'}`}>Avocados</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 group cursor-pointer" 
                    onClick={(e) => toggleCheckbox('milk', e)}
                  >
                    <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-colors ${checkboxes.milk ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-gray-300'}`}>
                      {checkboxes.milk && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className={`text-xs ${checkboxes.milk ? 'text-[var(--text-secondary)] line-through' : 'text-[var(--text-primary)]'}`}>Milk</span>
                  </div>
                </div>
                <div className="mt-auto">
                  <span className="text-xs text-[var(--text-secondary)] font-medium">Oct 23</span>
                </div>
              </div>

              {/* Note 3 */}
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow flex flex-col">
                <div className="mb-2">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">Ideas</span>
                </div>
                <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1">Book Recommendations</h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-3 mb-3 flex-grow">Atomic Habits, Deep Work, The Design of...</p>
                <div className="mt-auto">
                  <span className="text-xs text-[var(--text-secondary)] font-medium">Oct 22</span>
                </div>
              </div>

              {/* Note 4 - Checkbox list */}
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow flex flex-col">
                <div className="mb-2">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">Personal</span>
                </div>
                <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1.5">Workout Plan</h3>
                <div className="space-y-1.5 mb-3 flex-grow">
                  <div 
                    className="flex items-center gap-2 group cursor-pointer" 
                    onClick={(e) => toggleCheckbox('monday', e)}
                  >
                    <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-colors ${checkboxes.monday ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-gray-300'}`}>
                      {checkboxes.monday && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className={`text-xs ${checkboxes.monday ? 'text-[var(--text-secondary)] line-through' : 'text-[var(--text-primary)]'}`}>Monday - Upper</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 group cursor-pointer" 
                    onClick={(e) => toggleCheckbox('tuesday', e)}
                  >
                    <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-colors ${checkboxes.tuesday ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-gray-300'}`}>
                      {checkboxes.tuesday && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className={`text-xs ${checkboxes.tuesday ? 'text-[var(--text-secondary)] line-through' : 'text-[var(--text-primary)]'}`}>Tuesday - Cardio</span>
                  </div>
                </div>
                <div className="mt-auto">
                  <span className="text-xs text-[var(--text-secondary)] font-medium">Oct 21</span>
                </div>
              </div>

              {/* Note 5 */}
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow flex flex-col">
                <div className="mb-2">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">Ideas</span>
                </div>
                <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1">App Ideas</h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-3 mb-3 flex-grow whitespace-pre-wrap">1. Habit tracker with AI
2. Social recipe sharing...</p>
                <div className="mt-auto">
                  <span className="text-xs text-[var(--text-secondary)] font-medium">Oct 20</span>
                </div>
              </div>

              {/* Note 6 */}
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow flex flex-col">
                <div className="mb-2">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">Personal</span>
                </div>
                <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1">Travel Packing</h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-3 mb-3 flex-grow">Passport, charger, headphones, sunscreen...</p>
                <div className="mt-auto">
                  <span className="text-xs text-[var(--text-secondary)] font-medium">Oct 19</span>
                </div>
              </div>

            </div>
          </div>

          {/* 5. Floating Action Button */}
          <div className="fixed bottom-24 w-full max-w-[390px] pointer-events-none z-40">
            <button className="absolute right-6 bottom-0 w-14 h-14 bg-[var(--accent)] text-white rounded-full shadow-xl shadow-[var(--accent)]/30 flex items-center justify-center cursor-pointer pointer-events-auto hover:bg-[var(--accent-hover)] transition-colors group">
              <div className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-40 group-hover:animate-ping"></div>
              <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>

          {/* 6. Bottom Nav */}
          <div className="fixed bottom-0 w-full max-w-[390px] bg-[var(--bg-card)]/95 backdrop-blur-md border-t border-[var(--border)] z-50 px-2 pt-2 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex justify-around items-center h-12">
              {[
                { 
                  id: 'Notes', 
                  paths: [
                    "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  ] 
                },
                { 
                  id: 'Tasks', 
                  paths: [
                    "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ] 
                },
                { 
                  id: 'Folders', 
                  paths: [
                    "M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                  ] 
                },
                { 
                  id: 'Favorites', 
                  paths: [
                    "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  ] 
                },
                { 
                  id: 'Settings', 
                  paths: [
                    "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
                    "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ] 
                }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1 w-14 cursor-pointer transition-colors ${
                    activeTab === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <div className={`transition-transform duration-200 ${activeTab === tab.id ? 'scale-110' : ''}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      {tab.paths.map((path, idx) => (
                        <path key={idx} strokeLinecap="round" strokeLinejoin="round" d={path} />
                      ))}
                    </svg>
                  </div>
                  <span className="text-[10px] font-medium tracking-wide">{tab.id}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
