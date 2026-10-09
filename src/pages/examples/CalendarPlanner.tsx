import { useState, useEffect } from 'react';

type Variant = 'blue' | 'violet' | 'emerald';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#3B82F6': 'blue',
  '#8B5CF6': 'violet',
  '#10B981': 'emerald'
};

export function CalendarPlanner({ variant = 'blue' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState(15);
  const [activeView, setActiveView] = useState('Week');
  
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review wireframes', checked: true },
    { id: 2, text: 'Prepare presentation', checked: false },
    { id: 3, text: 'Send weekly report', checked: false }
  ]);

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

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  const myCalendars = [
    { id: 1, name: 'Work', color: 'bg-[#3B82F6]' },
    { id: 2, name: 'Personal', color: 'bg-[#22C55E]' },
    { id: 3, name: 'Meetings', color: 'bg-[#A855F7]' },
    { id: 4, name: 'Reminders', color: 'bg-[#F59E0B]' }
  ];

  // Events layout setup
  const events = [
    { id: 1, text: "Team Standup", loc: "Zoom", day: 0, startHour: 9, durationHour: 1, color: "var(--accent)" },
    { id: 2, text: "Design Review", loc: "Room 3A", day: 1, startHour: 10, durationHour: 1.5, color: "#22C55E" },
    { id: 3, text: "Client Call", loc: "Google Meet", day: 1, startHour: 14, durationHour: 1, color: "#A855F7" },
    { id: 4, text: "Team Standup", loc: "Zoom", day: 2, startHour: 9, durationHour: 1, color: "var(--accent)" },
    { id: 5, text: "Lunch with Sarah", loc: "Café Nero", day: 3, startHour: 11, durationHour: 1, color: "#F59E0B" },
    { id: 6, text: "Sprint Planning", loc: "Room 5B", day: 4, startHour: 15, durationHour: 1.5, color: "#22C55E" }
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .calendar-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .calendar-wrapper[data-theme="blue"] {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-light: rgba(59,130,246,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #F8FAFC;
          --bg-card: #FFFFFF;
          --border: #E2E8F0;
          --text-primary: #0F172A;
          --text-secondary: #64748B;
        }
        .calendar-wrapper[data-theme="violet"] {
          --accent: #8B5CF6;
          --accent-hover: #7C3AED;
          --accent-light: rgba(139,92,246,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #FAF8FF;
          --bg-card: #FFFFFF;
          --border: #E8E0F0;
          --text-primary: #1A1A2E;
          --text-secondary: #7A6AAA;
        }
        .calendar-wrapper[data-theme="emerald"] {
          --accent: #10B981;
          --accent-hover: #059669;
          --accent-light: rgba(16,185,129,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #F0FFF8;
          --bg-card: #FFFFFF;
          --border: #D1FAE5;
          --text-primary: #1A2E1A;
          --text-secondary: #5A8A6A;
        }
      `}</style>

      <div 
        className="calendar-wrapper grid grid-cols-[220px_1fr_280px] h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]" 
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* Col 1: Sidebar */}
        <div className="bg-[var(--bg-secondary)] border-r border-[var(--border)] py-4 flex flex-col">
          <div className="px-4 mb-4 flex items-center gap-2 text-[var(--accent)]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <span className="font-bold text-lg">PlanIt</span>
          </div>

          <button className="mx-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl py-2.5 font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm shadow-[var(--accent)]/20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Event
          </button>

          <div className="mx-4 mt-6">
            <div className="grid grid-cols-7 text-xs text-[var(--text-secondary)] text-center mb-2 font-medium">
              <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
            </div>
            <div className="grid grid-cols-7 gap-y-1">
              <div className="text-xs text-center py-1.5 text-transparent">30</div>
              <div className="text-xs text-center py-1.5 text-transparent">31</div>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <div 
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`text-xs text-center py-1.5 rounded cursor-pointer transition-colors ${
                    day === 15 
                      ? 'bg-[var(--accent)] text-white font-medium shadow-sm' 
                      : day === selectedDate 
                        ? 'bg-[var(--accent-light)] text-[var(--accent)] font-medium'
                        : 'hover:bg-[var(--accent-light)] text-[var(--text-primary)]'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 mt-6">
            <div className="text-xs uppercase text-[var(--text-secondary)] font-bold mb-3 tracking-wider">My Calendars</div>
            <div className="space-y-3">
              {myCalendars.map(cal => (
                <label key={cal.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-3 h-3 rounded-full ${cal.color} shadow-sm shrink-0`}></div>
                  <span className="text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">{cal.name}</span>
                  <input type="checkbox" defaultChecked className="hidden" />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2: Week View */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] flex flex-col relative min-w-[600px]">
          <div className="px-4 py-3 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg-primary)] sticky top-0 z-20">
            <h1 className="font-bold text-lg text-[var(--text-primary)]">October 2024</h1>
            
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button className="w-8 h-8 border border-[var(--border)] rounded-lg flex items-center justify-center cursor-pointer text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button className="w-8 h-8 border border-[var(--border)] rounded-lg flex items-center justify-center cursor-pointer text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

              <div className="flex bg-[var(--bg-secondary)] rounded-lg p-0.5">
                {['Day', 'Week', 'Month'].map(view => (
                  <button 
                    key={view}
                    onClick={() => setActiveView(view)}
                    className={`text-xs px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                      activeView === view 
                        ? 'bg-[var(--bg-card)] shadow-sm text-[var(--text-primary)] font-semibold border border-[var(--border)]' 
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex border-b border-[var(--border)] bg-[var(--bg-primary)] sticky top-[57px] z-20">
            <div className="w-16 shrink-0"></div>
            {['Mon 14', 'Tue 15', 'Wed 16', 'Thu 17', 'Fri 18', 'Sat 19', 'Sun 20'].map((day, i) => (
              <div key={day} className={`flex-1 text-center py-2 border-l border-[var(--border)] text-xs ${i === 1 ? 'text-[var(--accent)] font-semibold' : 'text-[var(--text-primary)] font-medium'}`}>
                {day}
              </div>
            ))}
          </div>

          <div className="flex-1 relative flex">
            {/* Time labels */}
            <div className="w-16 shrink-0 flex flex-col pt-16">
              {['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'].map((time) => (
                <div key={time} className="h-16 relative">
                  <span className="absolute -top-2.5 right-2 text-xs text-[var(--text-secondary)]">{time}</span>
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex-1 relative mt-16">
              <div className="absolute inset-0 flex flex-col">
                {Array.from({ length: 11 }).map((_, i) => (
                  <div key={i} className="h-16 border-t border-[var(--border)]/50"></div>
                ))}
              </div>
              
              <div className="absolute inset-0 flex">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="flex-1 border-l border-[var(--border)] relative">
                    {events.filter(e => e.day === i).map(event => {
                      const topOffset = (event.startHour - 8) * 4; // 4rem per hour
                      const height = event.durationHour * 4;
                      return (
                        <div 
                          key={event.id}
                          className="absolute left-1 right-1 rounded-lg px-2 py-1 text-xs cursor-pointer overflow-hidden hover:opacity-90 transition-opacity"
                          style={{
                            top: `${topOffset}rem`,
                            height: `${height}rem`,
                            backgroundColor: event.color === 'var(--accent)' ? 'var(--accent-light)' : `color-mix(in srgb, ${event.color} 20%, transparent)`,
                            borderLeft: `2px solid ${event.color}`,
                            color: event.color === 'var(--accent)' ? 'var(--accent)' : event.color
                          }}
                        >
                          <div className="font-semibold truncate">
                            {event.text}
                          </div>
                          <div className="text-[10px] mt-0.5 flex items-center gap-1 opacity-90">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" />
                            </svg>
                            {event.loc}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Detail Panel */}
        <div className="bg-[var(--bg-secondary)] border-l border-[var(--border)] overflow-y-auto p-5">
          <div className="flex flex-col mb-4">
            <span className="font-bold text-sm text-[var(--text-primary)]">Today's Schedule</span>
            <span className="text-xs text-[var(--text-secondary)] mt-0.5">Tue, 15 October 2024</span>
          </div>

          <div className="space-y-3">
            {[
              { id: 1, title: 'Team Standup', time: '9:00 - 10:00 AM', loc: 'Zoom', attendees: 4, color: 'bg-[var(--accent)]' },
              { id: 2, title: 'Design Review', time: '2:00 - 3:00 PM', loc: 'Room 3A', attendees: 3, color: 'bg-[#22C55E]' },
              { id: 3, title: '1:1 with Manager', time: '4:00 - 5:00 PM', loc: 'Office', attendees: 2, color: 'bg-[#A855F7]' },
            ].map(item => (
              <div key={item.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3 cursor-pointer hover:border-[var(--accent)] transition-colors shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <div className="text-xs text-[var(--text-secondary)] font-medium">{item.time}</div>
                </div>
                <div className="font-bold text-sm text-[var(--text-primary)] mt-1 mb-2">{item.title}</div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] mb-3">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" />
                  </svg>
                  {item.loc}
                </div>
                <div className="flex -space-x-2 mt-2">
                  {Array.from({ length: item.attendees }).map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--bg-card)] flex items-center justify-center overflow-hidden shrink-0">
                       <svg className="w-3.5 h-3.5 text-[var(--text-secondary)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="font-bold text-sm text-[var(--text-primary)] mt-6 mb-3">Tasks</div>
          <div className="space-y-3">
            {tasks.map(task => (
              <label key={task.id} className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors cursor-pointer shrink-0 ${task.checked ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-[var(--border)] group-hover:border-[var(--accent)]'}`}>
                  {task.checked && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <input 
                  type="checkbox" 
                  checked={task.checked} 
                  onChange={() => toggleTask(task.id)}
                  className="hidden" 
                />
                <span className={`text-sm transition-colors truncate ${task.checked ? 'line-through text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>
                  {task.text}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
