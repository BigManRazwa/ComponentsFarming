import { useState, useEffect } from 'react';

type Variant = 'orange' | 'emerald' | 'rose';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#F97316': 'orange',
  '#10B981': 'emerald',
  '#F43F5E': 'rose',
};

export function MobileRecipeDetail({ variant = 'orange' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState<'Ingredients' | 'Instructions' | 'Reviews'>('Ingredients');
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('orange'); 
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

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const ingredientsList = [
    { name: 'Spaghetti', amount: '200g' },
    { name: 'Guanciale', amount: '150g' },
    { name: 'Egg Yolks', amount: '4' },
    { name: 'Pecorino Romano', amount: '100g' },
    { name: 'Black Pepper', amount: 'to taste' },
    { name: 'Salt', amount: 'to taste' },
    { name: 'Garlic', amount: '2 cloves' },
    { name: 'Olive Oil', amount: '2 tbsp' },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .recipe-wrapper {
          --accent: #F97316;
          --accent-hover: #EA580C;
          --accent-light: rgba(249,115,22,0.08);
          --bg-primary: #FFFAF5;
          --bg-secondary: #FFF0E0;
          --bg-card: #FFFFFF;
          --border: #FFE0C0;
          --text-primary: #2E1A08;
          --text-secondary: #AA8060;
          font-family: 'Inter', sans-serif;
        }
        .recipe-wrapper[data-theme="emerald"] {
          --accent: #10B981;
          --accent-hover: #059669;
          --accent-light: rgba(16,185,129,0.08);
          --bg-primary: #F5FFFA;
          --bg-secondary: #E0FFF0;
          --bg-card: #FFFFFF;
          --border: #C0F0D0;
          --text-primary: #0A2E1A;
          --text-secondary: #5A8A6A;
        }
        .recipe-wrapper[data-theme="rose"] {
          --accent: #F43F5E;
          --accent-hover: #E11D48;
          --accent-light: rgba(244,63,94,0.08);
          --bg-primary: #FFF5F7;
          --bg-secondary: #FFE8EC;
          --bg-card: #FFFFFF;
          --border: #FFD0D8;
          --text-primary: #2E0A12;
          --text-secondary: #AA5070;
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
        className="recipe-wrapper min-h-screen bg-neutral-100 flex justify-center text-[var(--text-primary)]"
        data-theme={activeTheme === 'orange' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col overflow-x-hidden pb-8">
          
          {/* 1. Header */}
          <div className="absolute top-0 z-10 px-5 pt-4 flex justify-between w-full">
            <div className="w-9 h-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow cursor-pointer">
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="flex gap-2">
              <div className="w-9 h-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow cursor-pointer">
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
              </div>
              <div 
                className="w-9 h-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow cursor-pointer"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <svg className={`w-5 h-5 ${isBookmarked ? 'text-[var(--accent)] fill-[var(--accent)]' : 'text-gray-800'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* 2. Hero Image */}
          <div className="h-[260px] bg-[var(--bg-secondary)] relative rounded-b-3xl overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/20 to-[var(--accent)]/5"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent"></div>
            
            <div className="absolute bottom-4 left-5 right-20">
              <h1 className="font-bold text-xl text-[var(--text-primary)]">Italian Pasta Carbonara</h1>
            </div>
            <div className="absolute bottom-4 right-5 text-right">
              <div className="flex items-center justify-end gap-1">
                <svg className="w-4 h-4 text-yellow-500 fill-yellow-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="font-bold text-sm text-[var(--text-primary)]">4.9</span>
              </div>
              <div className="text-xs text-[var(--text-secondary)]">2.1k reviews</div>
            </div>
          </div>

          {/* 3. Chef Info */}
          <div className="px-5 mt-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-hover)]"></div>
            <div className="flex-1 flex items-center gap-1">
              <span className="font-bold text-sm">Marco R.</span>
              <svg className="w-4 h-4 text-[var(--accent)] fill-[var(--accent)]" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            </div>
            <button className="border border-[var(--accent)] text-[var(--accent)] rounded-full px-3 py-1 text-xs font-semibold hover:bg-[var(--accent-light)] cursor-pointer">
              Follow
            </button>
          </div>

          {/* 4. Stats Row */}
          <div className="mx-5 mt-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 grid grid-cols-4 gap-2 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <svg className="w-5 h-5 text-[var(--accent)] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="font-bold text-sm">25 min</div>
              <div className="text-xs text-[var(--text-secondary)]">Prep</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <svg className="w-5 h-5 text-[var(--accent)] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
              </svg>
              <div className="font-bold text-sm">15 min</div>
              <div className="text-xs text-[var(--text-secondary)]">Cook</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <svg className="w-5 h-5 text-[var(--accent)] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              <div className="font-bold text-sm">Medium</div>
              <div className="text-xs text-[var(--text-secondary)]">Difficulty</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <svg className="w-5 h-5 text-[var(--accent)] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <div className="font-bold text-sm">4</div>
              <div className="text-xs text-[var(--text-secondary)]">Servings</div>
            </div>
          </div>

          {/* 5. Tabs */}
          <div className="px-5 mt-4 flex border-b border-[var(--border)] gap-6">
            {['Ingredients', 'Instructions', 'Reviews'].map((tab) => (
              <div 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-2 font-medium text-sm cursor-pointer transition-colors ${activeTab === tab ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
              >
                {tab}
              </div>
            ))}
          </div>

          {activeTab === 'Ingredients' && (
            <>
              {/* 6. Ingredients List */}
              <div className="px-5 mt-4 space-y-2">
                {ingredientsList.map((item, index) => {
                  const isChecked = !!checkedIngredients[index];
                  return (
                    <div 
                      key={index} 
                      className="flex items-center gap-3 py-2 border-b border-[var(--border)]/30 cursor-pointer"
                      onClick={() => toggleIngredient(index)}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${isChecked ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-[var(--text-secondary)]'}`}>
                        {isChecked && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                      </div>
                      <div className={`text-sm flex-1 ${isChecked ? 'line-through text-[var(--text-secondary)]' : 'font-medium'}`}>
                        {item.name}
                      </div>
                      <div className="text-sm text-[var(--text-secondary)]">{item.amount}</div>
                    </div>
                  );
                })}
              </div>

              {/* 7. Add to Cart */}
              <div className="px-5 mt-4">
                <button className="w-full bg-[var(--accent)] text-white rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[var(--accent-hover)] transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  Add All to Cart
                </button>
              </div>

              {/* 8. Nutrition Card */}
              <div className="mx-5 mt-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm">
                <div className="font-bold text-sm">Nutrition</div>
                <div className="grid grid-cols-4 gap-3 mt-3">
                  {[
                    { val: '580', label: 'Calories', pct: 75 },
                    { val: '24g', label: 'Protein', pct: 45 },
                    { val: '65g', label: 'Carbs', pct: 65 },
                    { val: '22g', label: 'Fat', pct: 30 }
                  ].map((nut, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="relative w-[44px] h-[44px] flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 44 44">
                          <circle cx="22" cy="22" r="18" fill="none" stroke="var(--bg-secondary)" strokeWidth="4" />
                          <circle 
                            cx="22" cy="22" r="18" fill="none" stroke="var(--accent)" strokeWidth="4" 
                            strokeDasharray="113.1" 
                            strokeDashoffset={113.1 - (113.1 * nut.pct) / 100}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-xs">
                          {nut.val}
                        </div>
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] mt-1">{nut.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Dummy content for other tabs */}
          {activeTab !== 'Ingredients' && (
            <div className="px-5 py-8 text-center text-[var(--text-secondary)] text-sm">
              Content for {activeTab} coming soon...
            </div>
          )}

          {/* 9. Start Cooking */}
          <div className="px-5 mt-4 pb-8">
            <button className="w-full bg-[var(--accent)] text-white rounded-2xl py-4 font-bold text-base shadow-lg shadow-[var(--accent)]/25 flex items-center justify-center gap-2 hover:bg-[var(--accent-hover)] transition-colors cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              Start Cooking
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
}
