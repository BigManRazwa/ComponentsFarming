import { useState, useEffect } from 'react';

type Variant = 'blaze' | 'ocean' | 'lime';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#F97316': 'blaze',
  '#06B6D4': 'ocean',
  '#84CC16': 'lime',
};

export function MobileFitnessTracker({ variant = 'blaze' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [activeTab, setActiveTab] = useState<'Home' | 'Workouts' | 'Stats' | 'Profile'>('Home');
  const [progressLoaded, setProgressLoaded] = useState(false);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('blaze');
        return;
      }
      const themeName = ACCENT_TO_THEME[variation.accent] || 'blaze';
      setActiveTheme(themeName);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setProgressLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const dailyStats = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>
      ),
      value: "1,247",
      unit: "kcal",
      label: "Calories Burned",
      percent: 62
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      value: "8,432",
      unit: "steps",
      label: "Daily Steps",
      percent: 84
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      value: "45",
      unit: "min",
      label: "Active Minutes",
      percent: 64
    }
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .fitness-wrapper {
          --accent: #F97316;
          --accent-hover: #EA580C;
          --accent-light: #FFF7ED;
          --bg-primary: #111111;
          --bg-secondary: #1A1A1A;
          --bg-card: #222222;
          --border: #333333;
          --text-primary: #F5F5F5;
          --text-secondary: #888888;
          font-family: 'Inter', sans-serif;
        }
        .fitness-wrapper[data-theme="ocean"] {
          --accent: #06B6D4;
          --accent-hover: #0891B2;
          --accent-light: #ECFEFF;
          --bg-primary: #0A1114;
          --bg-secondary: #11191D;
          --bg-card: #172227;
          --border: #1E3038;
          --text-primary: #F5F5F5;
          --text-secondary: #67A8B8;
        }
        .fitness-wrapper[data-theme="lime"] {
          --accent: #84CC16;
          --accent-hover: #65A30D;
          --accent-light: #F7FEE7;
          --bg-primary: #101208;
          --bg-secondary: #171A10;
          --bg-card: #1E2218;
          --border: #2A3020;
          --text-primary: #F5F5F5;
          --text-secondary: #8AAA68;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .progress-ring {
          transition: stroke-dashoffset 1s ease-in-out;
        }
        .bar-chart-bar {
          transition: height 1s ease-in-out;
        }
      `}</style>

      <div className="fitness-wrapper min-h-screen bg-[#000000] flex justify-center text-[var(--text-primary)]" data-theme={activeTheme === 'blaze' ? undefined : activeTheme}>
        
        {/* Mobile Phone Container */}
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col pb-20 overflow-x-hidden">
          
          {/* 1. Status Bar */}
          <div className="bg-transparent px-5 py-3 flex items-center justify-between sticky top-0 z-50 text-white font-medium text-[14px]">
            <span>10:33</span>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
              <svg className="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 6h16a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V8a2 2 0 012-2z M20 10v4" /></svg>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 scrollbar-hide">
            {/* 2. Header */}
            <div className="px-5 pt-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--accent)] to-gray-600 p-0.5">
                  <div className="w-full h-full bg-[var(--bg-card)] rounded-full flex items-center justify-center text-[var(--accent)] font-bold">
                    AL
                  </div>
                </div>
                <div>
                  <div className="text-[var(--text-secondary)] text-sm">Good Morning,</div>
                  <div className="text-xl font-bold">Alex</div>
                </div>
              </div>
              <button className="relative w-10 h-10 rounded-full bg-[var(--bg-card)] flex items-center justify-center cursor-pointer">
                <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--accent)] rounded-full"></span>
              </button>
            </div>

            {/* 3. Today's Workout Card */}
            <div className="mx-5 mt-6 bg-[var(--bg-card)] rounded-2xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-1">
                <h2 className="font-bold text-lg">Today's Workout</h2>
                <span className="bg-[var(--accent)] text-[#000] text-xs font-bold px-2 py-1 rounded-full">FitTrack</span>
              </div>
              <div className="flex items-center gap-1.5 text-[var(--text-secondary)] mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M3 14h18m-9-4v4m-5-4v4m10-4v4M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" /></svg>
                <span className="text-sm">Upper Body Strength</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-[100px] h-[100px] relative">
                  <svg className="w-[100px] h-[100px] transform -rotate-90">
                    <circle cx="50" cy="50" r="40" stroke="var(--border)" strokeWidth="8" fill="transparent" />
                    <circle 
                      cx="50" cy="50" r="40" 
                      stroke="var(--accent)" 
                      strokeWidth="8" 
                      fill="transparent" 
                      strokeDasharray="251.2" 
                      strokeDashoffset={progressLoaded ? 251.2 * (1 - 0.65) : 251.2}
                      strokeLinecap="round"
                      className="progress-ring"
                    />
                  </svg>
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                    <span className="text-xl font-bold leading-none">65%</span>
                    <span className="text-[9px] text-[var(--text-secondary)] mt-1">Complete</span>
                    <span className="text-[8px] text-[var(--text-secondary)]">45 / 70 mins</span>
                  </div>
                </div>
                
                <div className="ml-5 flex flex-col gap-2 flex-1">
                  <div className="bg-[var(--bg-primary)] p-2 rounded-lg">
                    <div className="text-[10px] text-[var(--text-secondary)]">Time: 45:12</div>
                  </div>
                  <div className="bg-[var(--bg-primary)] p-2 rounded-lg">
                    <div className="text-[10px] text-[var(--text-secondary)]">Est. Calories: 310 kcal</div>
                  </div>
                  <div className="mt-1">
                    <span className="text-[var(--accent)] border border-[var(--accent)] text-[10px] font-bold px-2 py-1 rounded">In Progress</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Weekly Activity Chart */}
            <div className="mx-5 mt-6">
              <h2 className="font-bold text-lg mb-4">Weekly Activity</h2>
              <div className="flex justify-between items-end h-[120px] bg-[var(--bg-card)] p-4 rounded-2xl">
                {[
                  { l: 'M', h: 75, a: true },
                  { l: 'T', h: 85, a: true },
                  { l: 'W', h: 60, a: true },
                  { l: 'T', h: 70, a: true },
                  { l: 'F', h: 45, a: true },
                  { l: 'S', h: 30, a: true },
                  { l: 'S', h: 55, a: true, current: true }
                ].map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 w-8">
                    <div className="w-2 bg-[var(--bg-primary)] rounded-full h-[80px] flex items-end">
                      <div 
                        className={`w-full rounded-full bar-chart-bar ${day.current ? 'bg-white' : 'bg-[var(--accent)]'}`} 
                        style={{ height: progressLoaded ? `${day.h}%` : '0%' }}
                      ></div>
                    </div>
                    <span className={`text-xs ${day.current ? 'text-white font-bold' : 'text-[var(--text-secondary)]'}`}>{day.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Daily Stats Row */}
            <div className="mx-5 mt-6 grid grid-cols-3 gap-3">
              {dailyStats.map((stat, i) => (
                <div key={i} className="bg-[var(--bg-card)] rounded-xl p-3 text-center flex flex-col items-center">
                  <div className="text-[var(--accent)] mb-2 bg-[var(--bg-primary)] p-2 rounded-full">
                    {stat.icon}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold">{stat.value}</span>
                    <span className="text-[9px] text-[var(--text-secondary)]">{stat.unit}</span>
                  </div>
                  <div className="text-[10px] text-[var(--text-secondary)] mt-0.5 mb-2">{stat.label}</div>
                  <div className="w-full bg-[var(--bg-primary)] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[var(--accent)] h-full rounded-full bar-chart-bar" 
                      style={{ width: progressLoaded ? `${stat.percent}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* 6. Quick Actions */}
            <div className="mx-5 mt-6">
              <h2 className="font-bold text-lg mb-3">Quick Actions</h2>
              <div className="grid grid-cols-3 gap-3">
                <button className="bg-[var(--accent)] text-[#000] rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[var(--accent-hover)] transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M3 14h18m-9-4v4m-5-4v4m10-4v4M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" /></svg>
                  <span className="text-[11px] font-bold">Start Workout</span>
                </button>
                <button className="bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
                  <svg className="w-6 h-6 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2v20m-7-7h14m-7-7h14" /></svg>
                  <span className="text-[11px] font-medium">Nutrition</span>
                </button>
                <button className="bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
                  <svg className="w-6 h-6 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                  <span className="text-[11px] font-medium">Sleep</span>
                </button>
              </div>
            </div>

            {/* 7. Upcoming Workouts */}
            <div className="mx-5 mt-6 pb-24">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-lg">Upcoming Workouts</h2>
                <button className="text-[var(--accent)] text-xs font-medium cursor-pointer">View All</button>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { title: 'Leg Day', time: 'Tomorrow, 7:00 AM', duration: '45 min', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M3 14h18m-9-4v4m-5-4v4m10-4v4M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" /></svg> },
                  { title: 'Cardio HIIT', time: 'Wed, 6:00 AM', duration: '30 min', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
                  { title: 'Core & Abs', time: 'Thu, 7:00 AM', duration: '35 min', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
                ].map((item, i) => (
                  <div key={i} className="bg-[var(--bg-card)] rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--bg-primary)] text-[var(--accent)] flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{item.title}</div>
                        <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">{item.time}</div>
                      </div>
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] bg-[var(--bg-primary)] px-2 py-1 rounded">
                      {item.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 8. Bottom Navigation Bar */}
          <div className="fixed bottom-0 w-full max-w-[390px] h-20 bg-[var(--bg-secondary)] border-t border-[var(--border)] flex z-50 rounded-t-2xl px-2 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
            {[
              { id: 'Home', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
              { id: 'Workouts', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v4m-5-4v4m10-4v4M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" /></svg> },
              { id: 'Stats', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
              { id: 'Profile', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors ${activeTab === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
              >
                {tab.icon}
                <span className="text-[10px] font-medium">{tab.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Floating Variant Switcher */}
        <div className="fixed bottom-5 right-5 bg-[#222] p-2.5 rounded-full shadow-lg flex gap-2.5 z-[1000] border border-[#333]">
          {[
            { id: 'blaze', bg: '#F97316' },
            { id: 'ocean', bg: '#06B6D4' },
            { id: 'lime', bg: '#84CC16' }
          ].map(theme => (
            <button 
              key={theme.id}
              onClick={() => setActiveTheme(theme.id as Variant)}
              className={`w-[30px] h-[30px] rounded-full border-2 cursor-pointer transition-transform hover:scale-110 ${activeTheme === theme.id ? 'border-white scale-110' : 'border-transparent'}`}
              style={{ background: theme.bg }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
