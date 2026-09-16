import { useState, useEffect } from 'react';

const THEMES = {
  orange: {
    '--accent': '#F97316',
    '--accent-hover': '#EA580C',
    '--accent-light': 'rgba(249,115,22,0.12)',
    '--bg-primary': '#0A0A0A',
    '--bg-secondary': '#141414',
    '--bg-card': '#1A1A1A',
    '--border': '#262626',
    '--text-primary': '#FAFAFA',
    '--text-secondary': '#737373',
  },
  cyan: {
    '--accent': '#06B6D4',
    '--accent-hover': '#0891B2',
    '--accent-light': 'rgba(6,182,212,0.12)',
    '--bg-primary': '#080C10',
    '--bg-secondary': '#0E1418',
    '--bg-card': '#141C22',
    '--border': '#1E2A32',
    '--text-primary': '#F0FAFA',
    '--text-secondary': '#5A8A8A',
  },
  lime: {
    '--accent': '#84CC16',
    '--accent-hover': '#65A30D',
    '--accent-light': 'rgba(132,204,22,0.12)',
    '--bg-primary': '#080A06',
    '--bg-secondary': '#10140E',
    '--bg-card': '#181E16',
    '--border': '#202A1A',
    '--text-primary': '#F5FFF0',
    '--text-secondary': '#6A8860',
  }
};

const NAV_ITEMS = [
  { id: 'home', label: 'Home', path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'workouts', label: 'Workouts', path: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3' },
  { id: 'plans', label: 'Plans', path: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'stats', label: 'Stats', path: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { id: 'profile', label: 'Profile', path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
];

const WEEK_DATA = [
  { day: 'Mon', p: 80 },
  { day: 'Tue', p: 60 },
  { day: 'Wed', p: 100 },
  { day: 'Thu', p: 40 },
  { day: 'Fri', p: 90 },
  { day: 'Sat', p: 20 },
  { day: 'Sun', p: 68, active: true },
];

const PLANS = [
  { id: 1, name: 'HIIT Cardio Blast', duration: '4 weeks', difficulty: 'Hard', badgeColor: 'bg-red-500', from: 'from-red-900/40', to: 'to-black' },
  { id: 2, name: 'Yoga & Flexibility', duration: '6 weeks', difficulty: 'Easy', badgeColor: 'bg-green-500', from: 'from-green-900/40', to: 'to-black' },
  { id: 3, name: 'Full Body Transform', duration: '8 weeks', difficulty: 'Medium', badgeColor: 'bg-amber-500', from: 'from-amber-900/40', to: 'to-black' },
];

const ACHIEVEMENTS = [
  { id: 1, type: 'Gold', name: '7-Day Streak', desc: 'Worked out 7 days in a row', bg: 'bg-yellow-500', path: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 2, type: 'Silver', name: 'Heavy Lifter', desc: 'Lifted 500kg total this week', bg: 'bg-gray-400', path: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9' },
  { id: 3, type: 'Bronze', name: 'Early Bird', desc: '5 morning workouts completed', bg: 'bg-orange-600', path: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' },
];

const INITIAL_EXERCISES = [
  { id: 1, group: 'Dumbbell', name: 'Bench Press', sets: '4 x 10 reps', weight: '60 kg', status: 'done', path: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2' },
  { id: 2, group: 'Arms', name: 'Bicep Curls', sets: '3 x 12 reps', weight: '15 kg', status: 'done', path: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11' },
  { id: 3, group: 'Shoulders', name: 'Shoulder Press', sets: '4 x 8 reps', weight: '20 kg', status: 'progress', path: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
  { id: 4, group: 'Back', name: 'Lat Pulldown', sets: '3 x 10 reps', weight: '45 kg', status: 'upcoming', path: 'M4 8V4m0 0h16v4m-16-4l8 14 8-14' },
];

export function MobileWorkoutPlanner({ variant = 'orange' }: { variant?: 'orange' | 'cyan' | 'lime' }) {
  const [activeTab, setActiveTab] = useState('home');
  const [exercises, setExercises] = useState(INITIAL_EXERCISES);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.parent.postMessage({ type: 'updateFont', font: 'Inter' }, '*');
    }
  }, []);

  const themeStyles = THEMES[variant] as React.CSSProperties;
  
  const toggleExerciseStatus = (id: number) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id === id) {
        if (ex.status === 'upcoming') return { ...ex, status: 'progress' };
        if (ex.status === 'progress') return { ...ex, status: 'done' };
        return { ...ex, status: 'upcoming' };
      }
      return ex;
    }));
  };

  return (
    <div 
      className="workout-wrapper max-w-[390px] mx-auto min-h-screen relative overflow-y-auto bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans" 
      data-theme={variant} 
      style={themeStyles}
    >
      {/* 1. Header */}
      <header className="px-5 pt-8 pb-2 flex justify-between items-center sticky top-0 bg-[var(--bg-primary)]/90 backdrop-blur z-40">
        <div>
          <h1 className="font-bold text-xl">Hey, Alex 👋</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">Let's crush it today</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 cursor-pointer">
            <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-sm">12</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center cursor-pointer relative">
            <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[var(--accent)]"></div>
            <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        </div>
      </header>

      {/* 2. Today's Progress Card */}
      <div className="mx-5 mt-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 shadow-lg">
        <h2 className="text-sm font-semibold text-[var(--text-secondary)] mb-4 uppercase tracking-wider">Today's Progress</h2>
        <div className="flex items-center gap-6">
          <div className="relative w-[80px] h-[80px] shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--bg-secondary)" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="68, 100" className="drop-shadow-md" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold">68%</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-2.5">
            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-[var(--text-secondary)]">Calories</span>
                <span className="font-medium">486 / 720</span>
              </div>
              <div className="h-1.5 w-full bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-[var(--text-secondary)]">Steps</span>
                <span className="font-medium">8,420 / 10,000</span>
              </div>
              <div className="h-1.5 w-full bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-[var(--text-secondary)]">Water</span>
                  <span className="font-medium">6/8</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-[var(--text-secondary)]">Active Min</span>
                  <span className="font-medium">42/60</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Today's Workout */}
      <div className="px-5 mt-6">
        <div className="flex justify-between items-end mb-3">
          <h2 className="font-bold text-lg">Today's Workout</h2>
          <span className="text-xs text-[var(--accent)] font-semibold cursor-pointer">View All</span>
        </div>
        <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)' }}>
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-5 -mb-5"></div>
          
          <div className="relative z-10">
            <h3 className="font-bold text-xl text-white mb-1">Upper Body Strength</h3>
            <p className="text-white/80 text-xs font-medium mb-4">45 min • 12 exercises • Intermediate</p>
            
            <div className="flex gap-4 mb-5">
              <div className="flex items-center gap-1.5 bg-black/20 rounded-lg px-2.5 py-1 backdrop-blur-sm">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
                <span className="text-xs font-bold text-white">320 cal</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 rounded-lg px-2.5 py-1 backdrop-blur-sm">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-bold text-white">45 min</span>
              </div>
            </div>
            
            <button className="w-full bg-white text-[var(--accent-hover)] font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-transform duration-200">
              Start Workout
            </button>
          </div>
        </div>
      </div>

      {/* 4. Exercise List */}
      <div className="px-5 mt-6">
        <h2 className="font-bold text-lg mb-3">Exercises (4)</h2>
        <div className="flex flex-col gap-2">
          {exercises.map((ex) => (
            <div 
              key={ex.id} 
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3.5 flex items-center gap-3 cursor-pointer hover:border-[var(--accent)]/50 transition-colors"
              onClick={() => toggleExerciseStatus(ex.id)}
            >
              <div className="w-10 h-10 shrink-0 rounded-full bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={ex.path} />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm truncate">{ex.name}</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ex.sets}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="font-bold text-sm">{ex.weight}</span>
                {ex.status === 'done' && (
                  <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                {ex.status === 'progress' && (
                  <div className="w-5 h-5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center animate-pulse">
                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
                  </div>
                )}
                {ex.status === 'upcoming' && (
                  <div className="w-5 h-5 rounded-full border-2 border-[var(--border)] flex items-center justify-center">
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Weekly Activity */}
      <div className="px-5 mt-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="font-bold text-lg">This Week</h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">Oct 12 - Oct 18</p>
          </div>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4">
          <div className="flex justify-between items-end gap-2 h-24">
            {WEEK_DATA.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 w-8 group cursor-pointer">
                <div className="w-full h-[80px] bg-[var(--bg-secondary)] rounded-md overflow-hidden relative flex items-end">
                  <div 
                    className={`w-full rounded-md transition-all duration-500 ${day.active ? 'bg-[var(--accent)] animate-pulse' : 'bg-[var(--accent)]/70 group-hover:bg-[var(--accent)]'}`}
                    style={{ height: `${day.p}%` }}
                  >
                    {day.active && (
                      <div className="absolute inset-0 bg-white/20 blur-sm"></div>
                    )}
                  </div>
                </div>
                <span className={`text-[10px] font-medium ${day.active ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Recommended Plans */}
      <div className="mt-8">
        <div className="px-5 flex justify-between items-end mb-3">
          <h2 className="font-bold text-lg">Recommended</h2>
          <span className="text-xs text-[var(--accent)] font-semibold cursor-pointer">See All</span>
        </div>
        <div className="flex gap-4 overflow-x-auto px-5 pb-4 snap-x hide-scrollbar">
          {PLANS.map((plan) => (
            <div key={plan.id} className="min-w-[220px] bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden snap-start cursor-pointer hover:border-[var(--accent)] transition-colors">
              <div className={`h-24 bg-gradient-to-b ${plan.from} ${plan.to} relative`}>
                <div className="absolute top-2.5 right-2.5">
                  <span className={`text-[9px] font-bold px-2 py-1 rounded-md text-white shadow-sm ${plan.badgeColor}`}>
                    {plan.difficulty}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white">
                  <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4l12 6-12 6z" />
                  </svg>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-sm truncate">{plan.name}</h4>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[var(--text-secondary)]">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{plan.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Achievements */}
      <div className="mx-5 mt-4 mb-28">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
          <h3 className="font-bold text-sm mb-3">Recent Achievements</h3>
          <div className="flex flex-col gap-3">
            {ACHIEVEMENTS.map((ach) => (
              <div key={ach.id} className="flex items-center gap-3 py-1">
                <div className={`w-10 h-10 rounded-full ${ach.bg} shadow-lg flex items-center justify-center text-white/90 shrink-0`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={ach.path} />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm">{ach.name}</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ach.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 8. Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-[390px] bg-[var(--bg-primary)]/95 backdrop-blur-md border-t border-[var(--border)] z-50 px-6 py-3 flex justify-between items-center pb-6">
        {NAV_ITEMS.map((item) => (
          <div 
            key={item.id} 
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${activeTab === item.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            onClick={() => setActiveTab(item.id)}
          >
            <div className={`relative p-1.5 rounded-xl ${activeTab === item.id ? 'bg-[var(--accent-light)]' : ''}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === item.id ? "2.5" : "2"} d={item.path} />
              </svg>
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Scoped styles to hide scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
