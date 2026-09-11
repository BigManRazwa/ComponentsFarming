import { useState, useEffect } from 'react';

type Variant = 'azure' | 'sunset' | 'aurora';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#06B6D4': 'azure',
  '#F97316': 'sunset',
  '#A855F7': 'aurora',
};

export function MobileWeatherApp({ variant = 'azure' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [activeTab, setActiveTab] = useState<string>('Today');
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('azure');
        return;
      }
      const themeName = ACCENT_TO_THEME[variation.accent] || 'azure';
      setActiveTheme(themeName);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .weather-wrapper {
          --accent: #06B6D4;
          --accent-light: #22D3EE;
          --bg-gradient-start: #0C1445;
          --bg-gradient-end: #1E3A5F;
          --bg-card: rgba(255, 255, 255, 0.08);
          --border: rgba(255, 255, 255, 0.12);
          --text-primary: #FFFFFF;
          --text-secondary: rgba(255, 255, 255, 0.6);
          font-family: 'Inter', sans-serif;
        }
        .weather-wrapper[data-theme="sunset"] {
          --accent: #F97316;
          --accent-light: #FB923C;
          --bg-gradient-start: #1A0A00;
          --bg-gradient-end: #4A1A00;
          --bg-card: rgba(255, 200, 150, 0.08);
          --border: rgba(255, 200, 150, 0.12);
          --text-primary: #FFFFFF;
          --text-secondary: rgba(255, 220, 180, 0.6);
        }
        .weather-wrapper[data-theme="aurora"] {
          --accent: #A855F7;
          --accent-light: #C084FC;
          --bg-gradient-start: #0A0520;
          --bg-gradient-end: #1E0A3E;
          --bg-card: rgba(200, 150, 255, 0.08);
          --border: rgba(200, 150, 255, 0.12);
          --text-primary: #FFFFFF;
          --text-secondary: rgba(220, 180, 255, 0.6);
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
        className="weather-wrapper min-h-screen flex justify-center text-[var(--text-primary)]" 
        data-theme={activeTheme === 'azure' ? undefined : activeTheme}
        style={{ background: '#000000' }}
      >
        {/* Mobile Phone Container */}
        <div 
          className="w-full max-w-[390px] min-h-screen relative flex flex-col pb-20 overflow-x-hidden"
          style={{ background: 'linear-gradient(180deg, var(--bg-gradient-start), var(--bg-gradient-end))' }}
        >
        
          {/* Header */}
          <div className="px-5 pt-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-2 cursor-pointer">
              <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-bold text-lg">San Francisco, CA</span>
            </div>
            <button className="cursor-pointer">
              <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto flex-1 scrollbar-hide z-10 pb-24">
            {/* Current Weather */}
            <div className="text-center py-8 flex flex-col items-center">
              <svg className="w-[80px] h-[80px] text-white stroke-[var(--accent)]" fill="currentColor" strokeWidth="1" stroke="var(--accent)" viewBox="0 0 24 24">
                <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1287 20.1706 10.1837 17.8385 10.0163C17.3879 7.18182 14.9354 5 12 5C9.36214 5 7.14725 6.81559 6.27376 9.22744C3.89674 9.47545 2 11.5367 2 14C2 16.7614 4.23858 19 7 19H17.5Z" opacity="0.8" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" fill="none" d="M12 3V2M12 22v-1M5.636 5.636L4.929 4.93M19.071 19.071l-.707-.707M3 12H2m20 0h-1M5.636 18.364l-.707.707M19.071 4.929l-.707.707" />
              </svg>
              <div 
                className="text-7xl font-bold text-white mt-4 cursor-pointer"
                onClick={() => setTemperatureUnit(u => u === 'C' ? 'F' : 'C')}
              >
                {temperatureUnit === 'C' ? '24°' : '75°'}
              </div>
              <div className="text-xl text-[var(--text-secondary)] mt-1">Partly Cloudy</div>
              <div className="text-sm text-[var(--text-secondary)] mt-1">
                Feels like {temperatureUnit === 'C' ? '22°' : '72°'}
              </div>
              <div className="flex items-center gap-4 text-sm text-[var(--accent)] mt-3">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                  {temperatureUnit === 'C' ? '26°' : '79°'}
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                  {temperatureUnit === 'C' ? '18°' : '64°'}
                </div>
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="mx-5 mt-4">
              <div className="bg-[var(--bg-card)] backdrop-blur-md rounded-2xl border border-[var(--border)] p-4">
                <h3 className="text-sm font-medium mb-3">Hourly Forecast</h3>
                <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
                  {[
                    { time: 'Now', temp: '24°', icon: 'cloud-sun' },
                    { time: '12:00', temp: '21°', icon: 'cloud-sun' },
                    { time: '13:00', temp: '24°', icon: 'cloud' },
                    { time: '14:00', temp: '23°', icon: 'cloud' },
                    { time: '15:00', temp: '22°', icon: 'cloud' },
                    { time: '16:00', temp: '20°', icon: 'cloud-sun' },
                    { time: '17:00', temp: '19°', icon: 'sun' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center min-w-[40px]">
                      <span className="text-xs text-[var(--text-secondary)] mb-2">{item.time}</span>
                      {item.icon === 'sun' && (
                         <svg className="w-6 h-6 text-[#FDB813] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <circle cx="12" cy="12" r="5" strokeWidth="2" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                         </svg>
                      )}
                      {item.icon === 'cloud' && (
                         <svg className="w-6 h-6 text-white opacity-80 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                         </svg>
                      )}
                      {item.icon === 'cloud-sun' && (
                         <svg className="w-6 h-6 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="#FDB813" d="M19 5V4M22 8h-1M16.4 3.6l-.7.7M21.4 5.6l-.7.7" />
                         </svg>
                      )}
                      <span className="text-sm font-bold">{item.temp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="mx-5 mt-4">
              <div className="bg-[var(--bg-card)] backdrop-blur-md rounded-2xl border border-[var(--border)] p-4">
                <h3 className="text-sm font-medium mb-1">5-Day Forecast</h3>
                <div className="flex flex-col">
                  {[
                    { day: 'Wed', icon: 'cloud-sun', desc: 'Sun/Cloud', hl: '25/16' },
                    { day: 'Thu', icon: 'sun', desc: 'Sun', hl: '26/17' },
                    { day: 'Fri', icon: 'cloud', desc: 'Cloudy', hl: '23/15' },
                    { day: 'Sat', icon: 'cloud-sun', desc: 'Sun/Cloud', hl: '24/16' },
                    { day: 'Sun', icon: 'sun', desc: 'Sun', hl: '27/18' },
                  ].map((item, idx, arr) => (
                    <div key={idx} className={`flex items-center justify-between py-3 ${idx !== arr.length - 1 ? 'border-b border-[var(--border)]' : ''}`}>
                      <span className="w-16 text-[var(--text-primary)] font-medium">{item.day}</span>
                      
                      <div className="flex items-center justify-center w-8">
                      {item.icon === 'sun' && (
                         <svg className="w-6 h-6 text-[#FDB813]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <circle cx="12" cy="12" r="4" strokeWidth="2" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4V3m0 18v-1M5.636 5.636l-.707-.707m14.142 14.142l-.707-.707M4 12H3m18 0h-1M5.636 18.364l-.707.707M18.364 5.636l.707-.707"/>
                         </svg>
                      )}
                      {item.icon === 'cloud' && (
                         <svg className="w-6 h-6 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                         </svg>
                      )}
                      {item.icon === 'cloud-sun' && (
                         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="#FDB813" d="M19 5V4M22 8h-1M16.4 3.6l-.7.7M21.4 5.6l-.7.7" />
                         </svg>
                      )}
                      </div>

                      <span className="flex-1 text-center text-sm text-[var(--text-secondary)]">{item.desc}</span>
                      
                      <div className="w-16 text-right">
                        <span className="font-bold">{item.hl.split('/')[0]}°</span>
                        <span className="text-[var(--text-secondary)] ml-1">/ {item.hl.split('/')[1]}°</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="mx-5 mt-4 grid grid-cols-2 gap-3">
              {[
                { label: 'Humidity', value: '65%', icon: <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
                { label: 'Wind', value: '12 km/h', icon: <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg> },
                { label: 'UV Index', value: '3 Low', icon: <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
                { label: 'Visibility', value: '10 km', icon: <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> },
                { label: 'Pressure', value: '1013 hPa', icon: <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg> },
                { label: 'Sunrise', value: '6:42 AM', icon: <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg> },
              ].map((item, idx) => (
                <div key={idx} className="bg-[var(--bg-card)] backdrop-blur-md rounded-xl border border-[var(--border)] p-4 flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    {item.icon}
                    <span className="text-xs text-[var(--text-secondary)]">{item.label}</span>
                  </div>
                  <span className="text-lg font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-0 w-full h-20 bg-[var(--bg-gradient-end)]/90 backdrop-blur-md border-t border-[var(--border)] flex z-50 px-2 shadow-xl">
            {[
              { id: 'Today', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
              { id: 'Forecast', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
              { id: 'Map', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
              { id: 'Settings', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors ${activeTab === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
              >
                {tab.icon}
                <span className="text-[10px] font-medium">{tab.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Floating Variant Switcher */}
        <div className="fixed bottom-24 right-5 bg-[#222]/80 backdrop-blur-md p-2.5 rounded-full shadow-lg flex gap-2.5 z-[1000] border border-[#333]">
          {[
            { id: 'azure', bg: '#06B6D4' },
            { id: 'sunset', bg: '#F97316' },
            { id: 'aurora', bg: '#A855F7' }
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
