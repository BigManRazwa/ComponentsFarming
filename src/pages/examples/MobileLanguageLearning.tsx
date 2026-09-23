import { useState, useEffect } from 'react';

type Variant = 'green' | 'blue' | 'orange';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#22C55E': 'green',
  '#3B82F6': 'blue',
  '#F97316': 'orange',
};

export function MobileLanguageLearning({ variant = 'green' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Learn');

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('green'); 
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

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .language-wrapper {
          --accent: #22C55E;
          --accent-hover: #16A34A;
          --accent-light: rgba(34,197,94,0.1);
          --bg-primary: #FFFFFF;
          --bg-secondary: #F0FFF0;
          --bg-card: #FFFFFF;
          --border: #E0F0E0;
          --text-primary: #1A1A1A;
          --text-secondary: #888888;
          font-family: 'Inter', sans-serif;
        }
        .language-wrapper[data-theme="blue"] {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-light: rgba(59,130,246,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #F0F5FF;
          --bg-card: #FFFFFF;
          --border: #DBEAFE;
          --text-primary: #1A1A1A;
          --text-secondary: #6B8CAE;
        }
        .language-wrapper[data-theme="orange"] {
          --accent: #F97316;
          --accent-hover: #EA580C;
          --accent-light: rgba(249,115,22,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #FFF8F0;
          --bg-card: #FFFFFF;
          --border: #FED7AA;
          --text-primary: #1A1A1A;
          --text-secondary: #AA8860;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pulsing-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 var(--accent-light); }
          70% { box-shadow: 0 0 0 15px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
      `}</style>

      <div 
        className="language-wrapper min-h-screen bg-neutral-100 flex justify-center text-[var(--text-primary)]"
        data-theme={activeTheme === 'green' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col pb-24 overflow-x-hidden">
        
          {/* 1. Stats Bar */}
          <div className="px-5 pt-3 flex justify-between items-center z-10 sticky top-0 bg-[var(--bg-primary)]/90 backdrop-blur-md pb-2">
            <div className="flex items-center gap-1.5 cursor-pointer">
              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M11.644 1.59a.75.75 0 01.656-.033 9.965 9.965 0 012.785 1.998 8.685 8.685 0 011.69 2.533c.3.708.57 1.554.57 2.412 0 .973-.243 1.954-.707 2.89a.75.75 0 00.993 1.002 8.48 8.48 0 002.327-2.316.75.75 0 011.238.835 11.248 11.248 0 01-2.903 3.654A11.085 11.085 0 0112 18.5a11.085 11.085 0 01-6.294-1.936 11.248 11.248 0 01-2.903-3.654.75.75 0 011.238-.835 8.48 8.48 0 002.327 2.316.75.75 0 00.993-1.002c-.464-.936-.707-1.917-.707-2.89 0-.858.27-1.704.57-2.412a8.685 8.685 0 011.69-2.533 9.965 9.965 0 012.785-1.998.75.75 0 01.645-.008z"/></svg>
              <span className="font-bold text-sm text-orange-500">14</span>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer">
              <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 17.5a7.75 7.75 0 110-15.5 7.75 7.75 0 010 15.5zm-1.06-4.5h2.12v-5.25h-2.12v5.25zm1.06-7.5a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"/></svg>
              <span className="font-bold text-sm text-[var(--accent)]">2,450 XP</span>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.25L4.5 9l7.5 12.75L19.5 9 12 2.25z"/></svg>
              <span className="font-bold text-sm text-blue-500">48</span>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/></svg>
              <span className="font-bold text-sm text-red-500">5</span>
            </div>
          </div>

          {/* 2. Current Course Card */}
          <div className="mx-5 mt-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇪🇸</span>
                <span className="font-bold text-lg">Spanish - Unit 3</span>
              </div>
              <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </div>
            
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-grow">
                <div className="h-3 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent)] rounded-full w-[65%]"></div>
                </div>
                <div className="mt-1.5 text-xs text-[var(--text-secondary)] font-medium">65% Complete</div>
              </div>
              <div className="relative w-10 h-10 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-[var(--bg-secondary)]" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-[var(--accent)]" strokeDasharray="65, 100" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
              </div>
            </div>
          </div>

          {/* 3. Lesson Path */}
          <div className="px-5 mt-6 relative flex flex-col items-center">
            {/* The line */}
            <div className="absolute top-8 bottom-12 left-1/2 -translate-x-1/2 w-0 border-l-2 border-dashed border-[var(--border)] z-0"></div>
            
            <div className="flex flex-col gap-10 w-full relative z-10 py-2">
              {/* Node 1 */}
              <div className="flex flex-col items-center cursor-pointer group">
                <div className="w-[56px] h-[56px] rounded-full bg-[var(--accent)] flex items-center justify-center shadow-[0_4px_0_var(--accent-hover)] active:translate-y-1 active:shadow-none transition-all">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
                <span className="mt-2 text-xs font-bold text-[var(--accent)]">Intro</span>
              </div>
              
              {/* Node 2 - slight offset */}
              <div className="flex flex-col items-center cursor-pointer group ml-12">
                <div className="w-[56px] h-[56px] rounded-full bg-[var(--accent)] flex items-center justify-center shadow-[0_4px_0_var(--accent-hover)] active:translate-y-1 active:shadow-none transition-all">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
                <span className="mt-2 text-xs font-bold text-[var(--text-primary)]">Basics</span>
              </div>
              
              {/* Node 3 - ACTIVE */}
              <div className="flex flex-col items-center cursor-pointer group mr-12 relative">
                <div className="w-[56px] h-[56px] rounded-full border-4 border-[var(--accent)] bg-white flex items-center justify-center shadow-md pulsing-ring">
                  <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <span className="mt-2 text-xs font-bold text-[var(--accent)]">Food & Dining</span>
              </div>
              
              {/* Node 4 - LOCKED */}
              <div className="flex flex-col items-center group">
                <div className="w-[56px] h-[56px] rounded-full bg-[var(--bg-secondary)] flex items-center justify-center border-2 border-[var(--border)] shadow-[0_4px_0_var(--border)]">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd"/></svg>
                </div>
                <span className="mt-2 text-xs font-bold text-[var(--text-secondary)]">Greetings</span>
              </div>
            </div>
          </div>

          {/* 4. Daily Practice */}
          <div className="px-5 mt-6 grid grid-cols-2 gap-3">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <h3 className="text-xs uppercase text-[var(--text-secondary)] tracking-wider font-bold">Daily Practice</h3>
              <div className="font-bold text-sm mt-1">Match words</div>
              <div className="flex items-center gap-1 mt-1 text-[var(--text-secondary)]">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span className="text-xs">15 min</span>
              </div>
              
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="border border-[var(--border)] rounded-lg px-2 py-1 text-xs font-medium bg-[var(--bg-card)] text-[var(--text-primary)]">Hola</span>
                  <span className="text-[var(--text-secondary)] text-xs">=</span>
                  <span className="bg-[var(--accent-light)] border border-[var(--accent)] text-[var(--accent)] rounded-lg px-2 py-1 text-xs font-medium flex items-center gap-1">
                    Hello <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="border border-[var(--border)] rounded-lg px-2 py-1 text-xs font-medium">Gracias</span>
                  <span className="text-[var(--text-secondary)] text-xs">=</span>
                  <span className="border border-[var(--border)] rounded-lg px-2 py-1 text-xs font-medium">Thank you</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="border border-[var(--border)] rounded-lg px-2 py-1 text-xs font-medium">Agua</span>
                  <span className="text-[var(--text-secondary)] text-xs">=</span>
                  <span className="border border-[var(--border)] rounded-lg px-2 py-1 text-xs font-medium">Water</span>
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <h3 className="text-xs uppercase text-[var(--text-secondary)] tracking-wider font-bold">Weekly League</h3>
              <div className="mt-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🥇</span>
                    <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500"></div>
                    <span className="text-xs font-bold">Sarah</span>
                  </div>
                  <span className="text-xs text-[var(--text-secondary)] font-semibold">2,980 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🥈</span>
                    <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-tr from-green-400 to-emerald-500"></div>
                    <span className="text-xs font-bold">Mike</span>
                  </div>
                  <span className="text-xs text-[var(--text-secondary)] font-semibold">2,710 XP</span>
                </div>
                <div className="flex items-center justify-between bg-[var(--accent-light)] -mx-2 px-2 py-1 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🥉</span>
                    <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-tr from-orange-400 to-red-500"></div>
                    <span className="text-xs font-bold text-[var(--text-primary)]">Sofia</span>
                  </div>
                  <span className="text-xs text-[var(--text-secondary)] font-bold">2,450 XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Achievements */}
          <div className="px-5 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-base">Achievements</h2>
              <span className="text-[var(--accent)] text-xs font-bold cursor-pointer">See all</span>
            </div>
            
            <div className="flex gap-4 mt-3 overflow-x-auto scrollbar-hide pb-2">
              <div className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer">
                <div className="w-[56px] h-[56px] rounded-full bg-gradient-to-b from-amber-300 to-amber-500 flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>
                </div>
                <span className="text-xs font-bold text-center">Explorer</span>
              </div>
              <div className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer">
                <div className="w-[56px] h-[56px] rounded-full bg-gradient-to-b from-amber-300 to-amber-500 flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"/></svg>
                </div>
                <span className="text-xs font-bold text-center">Challenger</span>
              </div>
              <div className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer">
                <div className="w-[56px] h-[56px] rounded-full bg-gradient-to-b from-amber-300 to-amber-500 flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24"><path d="M11.644 1.59a.75.75 0 01.656-.033 9.965 9.965 0 012.785 1.998 8.685 8.685 0 011.69 2.533c.3.708.57 1.554.57 2.412 0 .973-.243 1.954-.707 2.89a.75.75 0 00.993 1.002 8.48 8.48 0 002.327-2.316.75.75 0 011.238.835 11.248 11.248 0 01-2.903 3.654A11.085 11.085 0 0112 18.5a11.085 11.085 0 01-6.294-1.936 11.248 11.248 0 01-2.903-3.654.75.75 0 011.238-.835 8.48 8.48 0 002.327 2.316.75.75 0 00.993-1.002c-.464-.936-.707-1.917-.707-2.89 0-.858.27-1.704.57-2.412a8.685 8.685 0 011.69-2.533 9.965 9.965 0 012.785-1.998.75.75 0 01.645-.008z"/></svg>
                </div>
                <span className="text-xs font-bold text-center">Super Streak</span>
              </div>
            </div>
          </div>

          {/* 6. Quick Stats */}
          <div className="mx-5 mt-6 mb-8 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 pb-24 shadow-sm">
            <h3 className="font-bold text-sm mb-3">This Week</h3>
            <div className="grid grid-cols-3 gap-3 divide-x divide-[var(--border)]">
              <div className="text-center flex flex-col gap-1">
                <span className="font-bold text-lg">7</span>
                <span className="text-xs text-[var(--text-secondary)]">Days Active</span>
              </div>
              <div className="text-center flex flex-col gap-1">
                <span className="font-bold text-lg text-[var(--text-primary)]">142</span>
                <span className="text-xs text-[var(--text-secondary)]">Words Learned</span>
              </div>
              <div className="text-center flex flex-col gap-1">
                <span className="font-bold text-lg">45</span>
                <span className="text-xs text-[var(--text-secondary)]">Minutes Avg</span>
              </div>
            </div>
          </div>

          {/* 7. Bottom Nav */}
          <div className="fixed bottom-0 w-full max-w-[390px] bg-[var(--bg-card)]/95 backdrop-blur-md border-t border-[var(--border)] z-50 px-2 pt-2 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex justify-around items-center h-12">
              {[
                { 
                  id: 'Learn', 
                  paths: ["M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"]
                },
                { 
                  id: 'Practice', 
                  paths: ["M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"]
                },
                { 
                  id: 'Leaderboard', 
                  paths: ["M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M18.75 4.236c.982.143 1.954.317 2.916.52a6.003 6.003 0 01-5.395 4.972m0 0a5.002 5.002 0 00-10.45 0m10.45 0c-.571.583-1.32.96-2.15 1.096m-6.15-1.096c.57.583 1.32.96 2.15 1.096m0 0v-3.375m0 0V4.5m0 0v-.75m0 0c.935 0 1.764.394 2.35 1.026m-2.35-1.026c-.935 0-1.764.394-2.35 1.026m0 0v.75m0 0c.982.143 1.954.317 2.916.52M12 9.75v3.375m0 0v3.375"]
                },
                { 
                  id: 'Profile', 
                  paths: ["M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"]
                },
                { 
                  id: 'Shop', 
                  paths: ["M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"]
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
