import { useState, useEffect } from 'react';

type Variant = 'teal' | 'violet' | 'rose';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#14B8A6': 'teal',
  '#8B5CF6': 'violet',
  '#F43F5E': 'rose',
};

export function MobileHabitTracker({ variant = 'teal' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState(16);
  const [activeTab, setActiveTab] = useState('Today');
  
  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning Meditation', streak: '12 days', time: '7:00 AM', duration: '15 min', icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5', completed: true },
    { id: 2, name: 'Drink Water', streak: '12 days', time: 'All day', duration: '8 glasses', icon: 'M21 16.811c0 .864-.336 1.692-.934 2.302l-4.793 4.88A3.25 3.25 0 0113 24v-4.991c0-.865.336-1.693.934-2.303l4.793-4.88c.598-.61 1.402-.952 2.247-.952h.026z', completed: true, customIcon: 'droplet' },
    { id: 3, name: 'Exercise', streak: '12 days', time: '8:00 AM', duration: '30 min', icon: 'M13.5 2.25a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM12.44 6.968l-1.085-3.254c-.1-.301-.4-.504-.716-.504h-1.09c-.317 0-.616.203-.717.504l-1.084 3.254a3.75 3.75 0 002.32 4.708l1.396.465c.571.19 1.13.435 1.673.73l.635.344a6.75 6.75 0 013.208 4.67l.386 2.316a1.5 1.5 0 002.96-.492l-.386-2.316a9.75 9.75 0 00-4.633-6.746l-.635-.344a11.233 11.233 0 00-2.33-.94l-1.396-.466a.75.75 0 01-.464-.941z', completed: true },
    { id: 4, name: 'Read Book', streak: '3 days', time: '9:00 PM', duration: '20 min', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25', completed: false },
    { id: 5, name: 'Journal', streak: '4 days', time: '9:30 PM', duration: '10 min', icon: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125', completed: false },
    { id: 6, name: 'Sleep by 10PM', streak: '1 day', time: '10:00 PM', duration: '—', icon: 'M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z', completed: false },
  ]);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('teal'); 
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

  const toggleHabit = (id: number) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const days = [
    { name: 'Mon', date: 14, completed: true },
    { name: 'Tue', date: 15, completed: true },
    { name: 'Wed', date: 16, completed: false },
    { name: 'Thu', date: 17, completed: false },
    { name: 'Fri', date: 18, completed: false },
    { name: 'Sat', date: 19, completed: false },
    { name: 'Sun', date: 20, completed: false },
  ];

  const barChartData = [
    { name: 'Mon', pct: 100 },
    { name: 'Tue', pct: 87 },
    { name: 'Wed', pct: 75 },
    { name: 'Thu', pct: 0 },
    { name: 'Fri', pct: 0 },
    { name: 'Sat', pct: 0 },
    { name: 'Sun', pct: 0 },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .habit-wrapper {
          --accent: #14B8A6;
          --accent-hover: #0D9488;
          --accent-light: rgba(20,184,166,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #F0FAFA;
          --bg-card: #FFFFFF;
          --border: #D0E8E8;
          --text-primary: #1A1A1A;
          --text-secondary: #6A8A8A;
          font-family: 'Inter', sans-serif;
        }
        .habit-wrapper[data-theme="violet"] {
          --accent: #8B5CF6;
          --accent-hover: #7C3AED;
          --accent-light: rgba(139,92,246,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #F5F0FF;
          --bg-card: #FFFFFF;
          --border: #E0D0F0;
          --text-primary: #1A1A1A;
          --text-secondary: #7A6AAA;
        }
        .habit-wrapper[data-theme="rose"] {
          --accent: #F43F5E;
          --accent-hover: #E11D48;
          --accent-light: rgba(244,63,94,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #FFF5F7;
          --bg-card: #FFFFFF;
          --border: #FFD8E0;
          --text-primary: #1A1A1A;
          --text-secondary: #AA6680;
        }
      `}</style>

      <div 
        className="habit-wrapper min-h-screen bg-neutral-100 flex justify-center text-[var(--text-primary)]"
        data-theme={activeTheme === 'teal' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col pb-24 overflow-x-hidden">
          
          {/* 1. Header */}
          <div className="px-5 pt-4 flex justify-between items-center">
            <h1 className="font-bold text-2xl">My Habits</h1>
            <div className="w-8 h-8 border border-[var(--border)] rounded-full flex items-center justify-center cursor-pointer text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
            </div>
          </div>

          {/* 2. Week Strip */}
          <div className="px-5 mt-3">
            <div className="flex justify-between">
              {days.map((day) => {
                const isSelected = selectedDay === day.date;
                return (
                  <div 
                    key={day.date} 
                    onClick={() => setSelectedDay(day.date)}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <span className="text-xs text-[var(--text-secondary)] font-medium">{day.name}</span>
                    <div className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-colors relative ${
                      isSelected 
                        ? 'bg-[var(--accent)] text-white shadow-md' 
                        : 'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                    }`}>
                      {day.date}
                      {day.completed && !isSelected && (
                        <div className="absolute -bottom-1.5 w-1 h-1 bg-[var(--accent)] rounded-full"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Streak & Progress */}
          <div className="mx-5 mt-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--text-secondary)] font-medium">Streak</span>
              <span className="text-lg">🔥</span>
              <span className="font-bold text-lg">21 days</span>
            </div>
            
            <div className="mt-4 flex justify-center">
              <div className="relative w-[120px] h-[120px]">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="var(--border)" 
                    strokeWidth="8" 
                  />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="var(--accent)" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    strokeDasharray={`${(progressPercent / 100) * 251.2} 251.2`} 
                    className="transition-all duration-500 ease-in-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-bold text-2xl">{progressPercent}%</span>
                  <span className="text-xs text-[var(--text-secondary)] font-medium">{completedCount}/{totalCount} Habits</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Habits List */}
          <div className="px-5 mt-5 space-y-3">
            {habits.map(habit => (
              <div 
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  habit.completed 
                    ? 'bg-[var(--accent)] border-[var(--accent)]' 
                    : 'border-[var(--text-secondary)]'
                }`}>
                  {habit.completed && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold text-sm truncate ${habit.completed ? 'text-[var(--text-secondary)] line-through' : ''}`}>
                      {habit.name}
                    </h3>
                    <span className="text-xs bg-[var(--accent-light)] text-[var(--accent)] rounded-full px-2 py-0.5 font-medium whitespace-nowrap">
                      {habit.streak}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      <span className="text-xs text-[var(--text-secondary)] font-medium">{habit.time}</span>
                    </div>
                    {habit.duration !== '—' && (
                      <span className="text-xs text-[var(--text-secondary)] font-medium">• {habit.duration}</span>
                    )}
                  </div>
                  
                  {habit.customIcon === 'droplet' && (
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= 6 ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}></div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="w-8 h-8 bg-[var(--accent-light)] rounded-lg flex items-center justify-center flex-shrink-0">
                  {habit.customIcon === 'droplet' ? (
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d={habit.icon} />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 5. Weekly Overview */}
          <div className="mx-5 mt-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-sm">Weekly Overview</h3>
            <div className="flex justify-between items-end h-24 mt-3 gap-2">
              {barChartData.map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                  <span className="text-xs text-[var(--text-secondary)] font-medium">{Math.round(bar.pct * 8 / 100)}/8</span>
                  <div className="w-full max-w-[24px] h-16 bg-[var(--bg-secondary)] rounded-t-md relative flex items-end justify-center">
                    <div 
                      className="w-full bg-[var(--accent)] rounded-t-md transition-all duration-500" 
                      style={{ height: `${bar.pct}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-[var(--text-secondary)] font-medium">{bar.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Quote Card */}
          <div className="mx-5 mt-5 mb-5 bg-[var(--accent-light)] border border-[var(--accent)]/20 rounded-xl p-4 flex gap-3 shadow-sm">
            <span className="text-lg">💡</span>
            <p className="italic text-sm text-[var(--text-secondary)] font-medium leading-relaxed">
              "Consistency is the key to creating lasting change."
            </p>
          </div>

          {/* 7. Bottom Nav */}
          <div className="fixed bottom-0 w-full max-w-[390px] bg-[var(--bg-card)]/95 backdrop-blur-md border-t border-[var(--border)] z-50 px-2 pt-2 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex justify-around items-center h-12">
              {[
                { 
                  id: 'Today', 
                  paths: ["M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"]
                },
                { 
                  id: 'Analytics', 
                  paths: ["M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"]
                },
                { 
                  id: 'Community', 
                  paths: ["M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"]
                },
                { 
                  id: 'Settings', 
                  paths: ["M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281zM15 12a3 3 0 11-6 0 3 3 0 016 0z"]
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
