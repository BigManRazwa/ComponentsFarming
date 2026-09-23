import { useState, useEffect } from 'react';

type Variant = 'blue' | 'violet' | 'emerald';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#3B82F6': 'blue',
  '#8B5CF6': 'violet',
  '#10B981': 'emerald',
};

const ICONS = {
  sun: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z",
  cloud: "M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z",
  rain: "M12 21v-8.25M8.625 21v-8.25M15.375 21v-8.25M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z",
  pin: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
  gear: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  wind: "M3 11.25h13.5M3 7.5h9M3 15h11.25 M16.5 11.25a2.25 2.25 0 110-4.5h-.75M12 7.5a2.25 2.25 0 100-4.5H3.75M14.25 15a2.25 2.25 0 100 4.5h-.75",
  drop: "M12 3c-1.338 2.559-4.5 6.78-4.5 9.75 0 2.485 2.015 4.5 4.5 4.5s4.5-2.015 4.5-4.5c0-2.97-3.162-7.191-4.5-9.75z",
  gauge: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  eye: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  sunrise: "M12 3v2.25M17.5 5.5l-1.5 1.5M6.5 5.5l1.5 1.5M21 12h-2.25M5.25 12H3M3 18h18 M15.75 18a3.75 3.75 0 10-7.5 0"
};

const HOURLY = [
  { time: 'Now', icon: 'sun', temp: '23°' },
  { time: '1PM', icon: 'sun', temp: '24°' },
  { time: '2PM', icon: 'sun', temp: '25°' },
  { time: '3PM', icon: 'cloud', temp: '26°' },
  { time: '4PM', icon: 'cloud', temp: '24°' },
  { time: '5PM', icon: 'rain', temp: '22°' },
];

const DAILY = [
  { day: 'Mon', icon: 'sun', rain: '—', low: 18, high: 26, minT: 15, maxT: 28 },
  { day: 'Tue', icon: 'cloud', rain: '20%', low: 17, high: 24, minT: 15, maxT: 28 },
  { day: 'Wed', icon: 'rain', rain: '80%', low: 15, high: 21, minT: 15, maxT: 28 },
  { day: 'Thu', icon: 'rain', rain: '60%', low: 16, high: 22, minT: 15, maxT: 28 },
  { day: 'Fri', icon: 'sun', rain: '—', low: 18, high: 27, minT: 15, maxT: 28 },
  { day: 'Sat', icon: 'sun', rain: '10%', low: 19, high: 28, minT: 15, maxT: 28 },
  { day: 'Sun', icon: 'cloud', rain: '30%', low: 17, high: 25, minT: 15, maxT: 28 },
];

const DETAILS = [
  { icon: 'sun', label: 'UV Index', value: '6', sub: 'High', subColor: 'text-amber-400' },
  { icon: 'wind', label: 'Wind', value: '12 km/h', sub: 'NW' },
  { icon: 'drop', label: 'Humidity', value: '65%', sub: '' },
  { icon: 'gauge', label: 'Pressure', value: '1013', sub: 'hPa' },
  { icon: 'eye', label: 'Visibility', value: '10 km', sub: '' },
  { icon: 'sunrise', label: 'Sunrise', value: '6:32 AM', sub: 'Sunset 7:45 PM' },
];

export function MobileWeatherPro({ variant = 'blue' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);

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

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .weather-wrapper {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-light: rgba(59,130,246,0.12);
          --bg-primary: #0A1628;
          --bg-secondary: #0F1E36;
          --bg-card: #162A48;
          --border: #1E3A5A;
          --text-primary: #F1F5F9;
          --text-secondary: #64748B;
          font-family: 'Inter', sans-serif;
        }
        .weather-wrapper[data-theme="violet"] {
          --accent: #8B5CF6;
          --accent-hover: #7C3AED;
          --accent-light: rgba(139,92,246,0.12);
          --bg-primary: #0C0A1E;
          --bg-secondary: #14102A;
          --bg-card: #1E1838;
          --border: #2A2048;
          --text-primary: #F1F0FF;
          --text-secondary: #7C72A8;
        }
        .weather-wrapper[data-theme="emerald"] {
          --accent: #10B981;
          --accent-hover: #059669;
          --accent-light: rgba(16,185,129,0.12);
          --bg-primary: #081410;
          --bg-secondary: #0E1E18;
          --bg-card: #162E24;
          --border: #1E4030;
          --text-primary: #F0FFF8;
          --text-secondary: #5A8A70;
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
        className="weather-wrapper min-h-screen bg-black flex justify-center text-[var(--text-primary)]"
        data-theme={activeTheme === 'blue' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] flex flex-col pb-8 overflow-x-hidden relative">
          
          {/* 1. Header */}
          <div className="px-5 pt-5 flex justify-between items-center z-10">
            <div className="flex items-center gap-1.5">
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d={ICONS.pin} />
              </svg>
              <div className="font-bold text-base">San Francisco</div>
            </div>
            <svg className="w-6 h-6 text-[var(--text-secondary)] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d={ICONS.gear} />
            </svg>
          </div>

          {/* 2. Current Weather */}
          <div className="px-5 mt-6 text-center">
            <div className="flex justify-center">
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="4" className="text-amber-400" fill="currentColor" opacity="0.8"/>
                <path strokeLinecap="round" strokeLinejoin="round" className="text-amber-400" d="M12 3v2m0 14v2m9-9h-2M5 12H3m13.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l-1.414-1.414M7.05 7.05L5.636 5.636"/>
                <path strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]" strokeWidth="2" fill="var(--bg-primary)" d="M7 16a4 4 0 01-1-7.87 5 5 0 019.8-1.5 4.5 4.5 0 01-8.8 9.37z" />
              </svg>
            </div>
            <div className="font-bold text-7xl mt-2 tracking-tighter">23°</div>
            <div className="text-lg text-[var(--text-secondary)] mt-1 font-medium">Partly Cloudy</div>
            <div className="text-sm text-[var(--text-secondary)] mt-1">Feels like 21°</div>
            <div className="flex justify-center gap-4 mt-2">
              <span className="text-sm text-[var(--text-secondary)]">H: 26°</span>
              <span className="text-sm text-[var(--text-secondary)]">L: 18°</span>
            </div>
          </div>

          {/* 3. Hourly Forecast */}
          <div className="mx-5 mt-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4">
            <div className="text-xs uppercase text-[var(--text-secondary)] font-semibold tracking-wider">Hourly Forecast</div>
            <div className="flex gap-5 mt-3 overflow-x-auto pb-1 scrollbar-hide">
              {HOURLY.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 min-w-[45px]">
                  <div className="text-xs text-[var(--text-secondary)]">{item.time}</div>
                  <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[item.icon as keyof typeof ICONS]} />
                  </svg>
                  <div className="font-bold text-sm">{item.temp}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. 7-Day Forecast */}
          <div className="mx-5 mt-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4">
            <div className="text-xs uppercase text-[var(--text-secondary)] font-semibold tracking-wider">7-Day Forecast</div>
            <div className="mt-3 space-y-0">
              {DAILY.map((item, idx) => {
                const rangeDiff = item.maxT - item.minT;
                const leftPos = ((item.low - item.minT) / rangeDiff) * 100;
                const barWidth = ((item.high - item.low) / rangeDiff) * 100;

                return (
                  <div key={idx} className="py-2.5 flex items-center border-b border-[var(--border)]/30 last:border-0">
                    <div className="text-sm w-12 font-medium">{item.day}</div>
                    <div className="w-8 flex justify-center">
                      <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[item.icon as keyof typeof ICONS]} />
                      </svg>
                    </div>
                    <div className="text-xs text-[var(--accent)] w-10 font-medium pl-1">{item.rain}</div>
                    <div className="text-xs text-[var(--text-secondary)] w-8 text-right pr-2">{item.low}°</div>
                    <div className="flex-1 h-1.5 bg-[var(--bg-secondary)]/50 rounded-full relative mx-1 overflow-hidden">
                      <div 
                        className="absolute h-full bg-[var(--accent)] rounded-full opacity-80"
                        style={{ left: `${leftPos}%`, width: `${barWidth}%` }}
                      ></div>
                    </div>
                    <div className="text-xs font-bold w-8 text-left pl-2">{item.high}°</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Weather Details */}
          <div className="mx-5 mt-4 grid grid-cols-2 gap-3">
            {DETAILS.map((detail, idx) => (
              <div key={idx} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3 flex flex-col justify-between min-h-[90px]">
                <div className="flex items-center gap-1.5 mb-2">
                  <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[detail.icon as keyof typeof ICONS]} />
                  </svg>
                  <div className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider">{detail.label}</div>
                </div>
                <div>
                  <div className="font-bold text-lg leading-tight">{detail.value}</div>
                  {detail.sub && (
                    <div className={`text-xs mt-0.5 ${detail.subColor || 'text-[var(--text-secondary)]'}`}>
                      {detail.sub}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 6. Air Quality */}
          <div className="mx-5 mt-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 mb-8">
            <div className="text-xs uppercase text-[var(--text-secondary)] font-semibold tracking-wider">Air Quality</div>
            <div className="mt-2 flex items-baseline gap-2">
              <div className="font-bold text-lg text-[var(--accent)]">Good</div>
              <div className="text-sm text-[var(--text-secondary)]">AQI 42</div>
            </div>
            <div className="mt-3 h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden relative">
              <div 
                className="absolute h-full rounded-full" 
                style={{ 
                  width: '42%',
                  background: 'linear-gradient(90deg, #10B981, #F59E0B)' 
                }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-[var(--text-secondary)]">
              <span>Good</span>
              <span>Moderate</span>
              <span>Poor</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
