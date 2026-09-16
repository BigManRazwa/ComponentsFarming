import { useState, useEffect } from 'react';

type Variant = 'electric' | 'sunset' | 'matrix';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#3B82F6': 'electric',
  '#F97316': 'sunset',
  '#22C55E': 'matrix',
};

export function ConferenceLanding({ variant = 'electric' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  
  const [activeDay, setActiveDay] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('electric'); 
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
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .conference-wrapper {
          --accent: #3B82F6;
          --accent-secondary: #8B5CF6;
          --bg-primary: #030712;
          --bg-secondary: #0F172A;
          --bg-card: rgba(15,23,42,0.8);
          --border: rgba(59,130,246,0.2);
          --text-primary: #F8FAFC;
          --text-secondary: #94A3B8;
          --glow: rgba(59,130,246,0.4);
          font-family: 'Space Grotesk', sans-serif;
        }
        .conference-wrapper[data-theme="sunset"] {
          --accent: #F97316;
          --accent-secondary: #EC4899;
          --bg-primary: #0C0308;
          --bg-secondary: #1A0A12;
          --bg-card: rgba(26,10,18,0.8);
          --border: rgba(249,115,22,0.2);
          --text-primary: #FFF5F0;
          --text-secondary: #B08898;
          --glow: rgba(249,115,22,0.4);
        }
        .conference-wrapper[data-theme="matrix"] {
          --accent: #22C55E;
          --accent-secondary: #06B6D4;
          --bg-primary: #020F05;
          --bg-secondary: #0A1A0E;
          --bg-card: rgba(10,26,14,0.8);
          --border: rgba(34,197,94,0.2);
          --text-primary: #F0FFF5;
          --text-secondary: #6AA880;
          --glow: rgba(34,197,94,0.4);
        }
        
        @keyframes float {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-float {
          animation: float 8s infinite ease-in-out;
        }
        .animate-float-delayed {
          animation: float 10s infinite ease-in-out 2s;
        }
        .animate-float-slow {
          animation: float 12s infinite ease-in-out 4s;
        }
      `}</style>

      <div 
        className="conference-wrapper min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden selection:bg-[var(--accent)] selection:text-white" 
        data-theme={activeTheme === 'electric' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        
        {/* 1. Navigation */}
        <nav className="sticky top-0 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border)] z-50">
          <div className="w-full max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group">
              <svg className="w-10 h-10 text-[var(--accent)] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L22 7.75v8.5L12 22l-10-5.75v-8.5L12 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v11.5M22 7.75L12 13.5l-10-5.75M12 2.5l5 2.875m-10 0l5-2.875" />
              </svg>
              <span className="font-bold text-2xl tracking-widest uppercase bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                DEVCON
              </span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              {['Schedule', 'Speakers', 'Venue', 'Tickets', 'Sponsors', 'FAQ'].map(item => (
                <button key={item} className="text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors cursor-pointer uppercase tracking-wider">
                  {item}
                </button>
              ))}
            </div>

            <button className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white font-bold rounded-full px-6 py-2.5 shadow-lg shadow-[var(--glow)] hover:scale-105 transition-all cursor-pointer uppercase text-sm tracking-wide">
              Register
            </button>
          </div>
        </nav>

        {/* 2. Hero */}
        <section className="min-h-[85vh] relative flex items-center justify-center overflow-hidden py-20">
          {/* Animated Background Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--accent)] rounded-full blur-[120px] opacity-20 animate-float pointer-events-none"></div>
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[var(--accent-secondary)] rounded-full blur-[100px] opacity-20 animate-float-delayed pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-[var(--accent)] rounded-full blur-[150px] opacity-10 animate-float-slow pointer-events-none"></div>
          
          {/* Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-5" 
               style={{ backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center text-center gap-6">
            <div className="border border-[var(--accent)] text-[var(--accent)] rounded-full tracking-widest text-xs font-bold px-4 py-1.5 uppercase bg-[var(--accent)]/10 backdrop-blur-sm">
              October 14-16, 2025
            </div>
            
            <div className="relative">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black bg-gradient-to-br from-[var(--text-primary)] via-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent drop-shadow-[0_0_30px_var(--glow)]">
                DEVCON
              </h1>
              <h2 className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent absolute top-0 left-0 w-full" style={{ WebkitTextStroke: '2px var(--accent)', opacity: 0.5, transform: 'translate(8px, 8px)' }}>
                2025
              </h2>
            </div>

            <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-xl mx-auto font-medium">
              The Ultimate Developer Conference & Innovation Summit
            </p>
            <p className="text-sm font-semibold tracking-wider text-[var(--text-secondary)] uppercase">
              San Francisco • 5000+ Attendees • 150+ Speakers
            </p>

            <div className="flex flex-wrap justify-center gap-4 my-8">
              {[
                { label: 'Days', val: '78' },
                { label: 'Hours', val: '14' },
                { label: 'Minutes', val: '32' },
                { label: 'Seconds', val: '45' }
              ].map((time, i) => (
                <div key={time.label} className="flex items-center gap-4">
                  <div className="bg-[var(--bg-card)] backdrop-blur-xl border border-[var(--border)] rounded-xl p-4 min-w-[80px] md:min-w-[100px] flex flex-col items-center justify-center shadow-[0_0_20px_var(--glow)]">
                    <span className="text-3xl md:text-5xl font-black text-[var(--text-primary)]">{time.val}</span>
                    <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest mt-1">{time.label}</span>
                  </div>
                  {i < 3 && <span className="text-4xl font-black text-[var(--accent)] opacity-50 animate-pulse">:</span>}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mt-4">
              <button className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white font-bold rounded-full px-10 py-4 shadow-[0_0_30px_var(--glow)] hover:scale-105 transition-all cursor-pointer uppercase text-lg tracking-wide w-full sm:w-auto">
                Get Tickets
              </button>
              <button className="border-2 border-[var(--accent)] text-[var(--text-primary)] bg-[var(--bg-primary)]/50 backdrop-blur font-bold rounded-full px-10 py-4 hover:bg-[var(--accent)]/10 hover:border-[var(--accent-secondary)] transition-all cursor-pointer uppercase text-lg tracking-wide flex items-center justify-center gap-2 w-full sm:w-auto">
                <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Watch Trailer
              </button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16 border-t border-[var(--border)] pt-8 w-full max-w-4xl">
              {[
                { val: '5000+', lbl: 'Attendees' },
                { val: '150+', lbl: 'Speakers' },
                { val: '4', lbl: 'Days' },
                { val: '12', lbl: 'Tracks' }
              ].map(stat => (
                <div key={stat.lbl} className="flex flex-col items-center">
                  <span className="text-3xl font-black text-[var(--accent)]">{stat.val}</span>
                  <span className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">{stat.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Speakers */}
        <section className="py-24 bg-[var(--bg-secondary)] border-y border-[var(--border)] relative z-10">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest mb-4 bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">Distinguished Speakers</h2>
              <p className="text-[var(--accent)] font-semibold tracking-widest uppercase">Learn from industry leaders</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Sarah Chen', role: 'CTO, Quantum Dynamics', talk: 'Building the Future with AI' },
                { name: 'Michael Rodriguez', role: 'VP Eng, CloudScale', talk: 'Scaling to 100M Users' },
                { name: 'Dr. Evelyn Reed', role: 'AI Research Lead', talk: 'Ethics in Machine Learning' },
                { name: 'James Park', role: 'Founder, DevTools Inc', talk: 'The Next Wave of DX' },
                { name: 'Aisha Patel', role: 'Staff Eng, MegaCorp', talk: 'WebAssembly in Production' },
                { name: 'David Kim', role: 'CTO, StartupLab', talk: 'From Zero to IPO' }
              ].map((spk, i) => (
                <div key={i} className="bg-[var(--bg-card)] backdrop-blur-lg border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--accent)] hover:shadow-[0_0_30px_var(--glow)] transition-all duration-300 group cursor-pointer hover:-translate-y-2">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] p-[2px] mb-6 ring-4 ring-[var(--accent)]/20 group-hover:ring-[var(--accent)]/50 transition-all">
                    <div className="w-full h-full rounded-full bg-[var(--bg-primary)] flex items-center justify-center overflow-hidden">
                      <svg className="w-12 h-12 text-[var(--text-secondary)] opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center text-[var(--text-primary)] mb-1">{spk.name}</h3>
                  <p className="text-[var(--text-secondary)] text-sm font-medium text-center mb-4 uppercase tracking-wide">{spk.role}</p>
                  <div className="bg-[var(--bg-primary)]/50 p-4 rounded-xl border border-[var(--border)]/50">
                    <p className="text-[var(--accent)] text-sm font-semibold italic text-center mb-3">"{spk.talk}"</p>
                    <div className="text-center">
                      <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        View Talk 
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Schedule */}
        <section className="py-24 bg-[var(--bg-primary)] relative z-10">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest mb-4">Conference Schedule</h2>
              <div className="flex justify-center gap-2 md:gap-4 mt-8 flex-wrap">
                {[1, 2, 3].map(day => (
                  <button 
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm border transition-all cursor-pointer ${activeDay === day ? 'bg-[var(--accent)] border-[var(--accent)] text-white shadow-[0_0_20px_var(--glow)]' : 'bg-transparent border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]'}`}
                  >
                    Day {day} - Oct {13 + day}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {[
                { time: '9:00 AM', track: 'Keynote', color: 'var(--accent)', spk: 'Sarah Chen', title: 'Opening Keynote: The Future is Now', room: 'Main Hall' },
                { time: '10:00 AM', track: 'AI/ML', color: '#3B82F6', spk: 'Dr. Evelyn Reed', title: 'Deep Learning Breakthroughs 2025', room: 'Hall A' },
                { time: '10:00 AM', track: 'WebDev', color: '#22C55E', spk: 'James Park', title: 'Modern Frontend Architecture', room: 'Hall B' },
                { time: '11:30 AM', track: 'Cloud', color: '#F59E0B', spk: 'Michael Rodriguez', title: 'Serverless at Scale', room: 'Hall A' },
                { time: '11:30 AM', track: 'DevOps', color: '#EF4444', spk: 'Aisha Patel', title: 'CI/CD Pipeline Revolution', room: 'Hall B' },
                { time: '1:00 PM', track: 'Break', color: 'var(--text-secondary)', spk: '', title: 'Lunch Break & Networking', room: 'Dining Pavilion', isBreak: true },
                { time: '2:00 PM', track: 'AI/ML', color: '#3B82F6', spk: 'David Kim', title: 'LLMs in Production', room: 'Hall A' },
                { time: '3:30 PM', track: 'Panel', color: '#8B5CF6', spk: 'All Speakers', title: 'The Future of Software', room: 'Main Hall' }
              ].map((sess, i) => (
                <div key={i} className={`bg-[var(--bg-card)] backdrop-blur-md border rounded-xl p-4 md:px-8 md:py-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 transition-all hover:border-[var(--accent)] group ${sess.isBreak ? 'border-[var(--border)]/50 bg-[var(--bg-secondary)]' : 'border-[var(--border)]'}`}>
                  <div className="w-24 shrink-0 text-[var(--accent)] font-mono font-bold text-sm md:text-base">
                    {sess.time}
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm border" style={{ borderColor: sess.color, color: sess.color, backgroundColor: `color-mix(in srgb, ${sess.color} 10%, transparent)` }}>
                        {sess.track}
                      </span>
                      {sess.spk && <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase">{sess.spk}</span>}
                    </div>
                    <h4 className={`font-bold text-lg md:text-xl ${sess.isBreak ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)] group-hover:text-[var(--accent)]'} transition-colors`}>{sess.title}</h4>
                  </div>
                  <div className="shrink-0 text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {sess.room}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Tickets */}
        <section className="py-24 bg-[var(--bg-secondary)] border-y border-[var(--border)] relative z-10">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest mb-4">Ticket Options</h2>
              <p className="text-[var(--accent)] font-semibold tracking-widest uppercase">Secure your spot at DEVCON 2025</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
              {[
                { name: 'Early Bird', price: '699', feat: ['Conference access', 'Workshop access', 'Lunch included', 'Digital materials', 'Community Slack'], style: 'normal' },
                { name: 'General', price: '899', pop: true, feat: ['Everything in Early Bird', 'Priority seating', 'Networking dinner', 'Speaker meet & greet', 'Recorded sessions'], style: 'featured' },
                { name: 'VIP', price: '1,299', feat: ['Everything in General', 'Front row seats', 'Private lounge', '1-on-1 mentor sessions', 'Swag bag', 'Airport shuttle'], style: 'normal' }
              ].map((tier, i) => (
                <div key={i} className={`bg-[var(--bg-card)] backdrop-blur-xl border rounded-3xl p-8 relative transition-all duration-300 hover:shadow-[0_0_30px_var(--glow)] flex flex-col h-full ${tier.style === 'featured' ? 'border-[var(--accent)] shadow-[0_0_20px_var(--glow)] md:scale-105 z-10' : 'border-[var(--border)]'}`}>
                  {tier.pop && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold uppercase tracking-widest text-[var(--text-secondary)] text-center mb-4">{tier.name}</h3>
                  <div className="text-center mb-8">
                    <span className="text-5xl font-black text-[var(--text-primary)]">${tier.price}</span>
                    <span className="text-[var(--text-secondary)] font-medium">/person</span>
                  </div>
                  <hr className="border-[var(--border)] mb-8" />
                  <ul className="space-y-4 mb-8 flex-1">
                    {tier.feat.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-sm font-medium text-[var(--text-primary)]">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all cursor-pointer ${tier.style === 'featured' ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white hover:scale-105 shadow-lg' : 'bg-transparent border-2 border-[var(--accent)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-white'}`}>
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Sponsors */}
        <section className="py-24 bg-[var(--bg-primary)] relative z-10">
          <div className="w-full max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest mb-16">Our Sponsors</h2>
            
            <div className="mb-16">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--accent)] mb-8">Platinum</h3>
              <div className="flex flex-wrap justify-center gap-12 md:gap-24">
                {['GOOGLE', 'AWS', 'META', 'MICROSOFT'].map(s => (
                  <span key={s} className="text-4xl md:text-5xl font-black text-[var(--text-secondary)] opacity-60 hover:opacity-100 hover:text-[var(--text-primary)] transition-all cursor-pointer drop-shadow-md">{s}</span>
                ))}
              </div>
            </div>
            
            <div className="mb-16">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--accent-secondary)] mb-8">Gold</h3>
              <div className="flex flex-wrap justify-center gap-10 md:gap-16">
                {['NVIDIA', 'STRIPE', 'VERCEL', 'FIGMA'].map(s => (
                  <span key={s} className="text-2xl md:text-3xl font-bold text-[var(--text-secondary)] opacity-50 hover:opacity-100 hover:text-[var(--text-primary)] transition-all cursor-pointer">{s}</span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-8">Silver</h3>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {['GITHUB', 'DOCKER', 'MONGODB', 'REDIS'].map(s => (
                  <span key={s} className="text-xl font-bold text-[var(--text-secondary)] opacity-40 hover:opacity-100 hover:text-[var(--text-primary)] transition-all cursor-pointer">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Venue */}
        <section className="py-24 bg-[var(--bg-secondary)] border-y border-[var(--border)] relative z-10">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest mb-4">Venue & Accommodation</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-primary)] rounded-3xl aspect-video border border-[var(--border)] flex items-center justify-center relative overflow-hidden group p-4 shadow-[0_0_20px_var(--glow)]">
                <div className="absolute inset-0 bg-[var(--accent)]/10"></div>
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, var(--accent) 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.2 }}></div>
                <div className="relative z-10 text-center">
                  <svg className="w-16 h-16 text-[var(--accent)] mx-auto mb-4 drop-shadow-[0_0_10px_var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <h3 className="text-2xl font-black uppercase tracking-wider mb-2">Moscone Center</h3>
                  <p className="text-[var(--text-secondary)] font-medium">747 Howard St, San Francisco, CA 94103</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold uppercase tracking-widest text-[var(--accent)] mb-6">Nearby Hotels</h3>
                {[
                  { name: 'Hilton SF', stars: '4.5', dist: '0.2 mi', price: '249' },
                  { name: 'Marriott Union Square', stars: '4.3', dist: '0.5 mi', price: '199' },
                  { name: 'W Hotel', stars: '4.7', dist: '0.1 mi', price: '329' }
                ].map((hotel, i) => (
                  <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 hover:border-[var(--accent)] transition-all shadow-lg hover:shadow-[0_0_15px_var(--glow)]">
                    <div>
                      <h4 className="font-bold text-lg">{hotel.name}</h4>
                      <div className="flex items-center gap-3 text-sm mt-1">
                        <span className="text-yellow-500 font-bold flex items-center gap-1">
                          {hotel.stars} ★
                        </span>
                        <span className="text-[var(--text-secondary)]">•</span>
                        <span className="text-[var(--text-secondary)] font-medium">{hotel.dist}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="block font-black text-xl text-[var(--accent)]">${hotel.price}</span>
                        <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">/night</span>
                      </div>
                      <button className="bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/50 hover:bg-[var(--accent)] hover:text-white px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer">
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="py-24 bg-[var(--bg-primary)] relative z-10">
          <div className="w-full max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest mb-4">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-3">
              {[
                { q: "What's included in the ticket price?", a: "All tickets include full conference access, daily keynotes, track sessions, lunch, and access to the sponsor hall. Check the Tickets section for specific tier benefits." },
                { q: "Is there a refund policy?", a: "Yes, full refunds are available up to 30 days before the event. Between 14-29 days, a 50% refund is provided. No refunds within 14 days of the event." },
                { q: "Are workshops included?", a: "Workshops are included with all ticket tiers, but require pre-registration as space is limited. VIP ticket holders get priority registration." },
                { q: "Is there a student discount?", a: "Yes! Students get 50% off General admission with a valid university ID. Apply through our student portal." },
                { q: "What COVID safety measures are in place?", a: "We follow all local San Francisco health guidelines. Currently, this includes enhanced ventilation and optional masking." },
                { q: "Can I transfer my ticket?", a: "Yes, tickets are fully transferable up to 7 days before the event via your attendee dashboard." }
              ].map((faq, i) => (
                <div key={i} className={`bg-[var(--bg-card)] border rounded-xl overflow-hidden transition-all ${openFaq === i ? 'border-[var(--accent)] shadow-[0_0_15px_var(--glow)]' : 'border-[var(--border)] hover:border-[var(--accent)]/50'}`}>
                  <div 
                    className="px-6 py-5 flex items-center justify-between cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <h4 className="font-bold text-lg pr-4">{faq.q}</h4>
                    <svg className={`w-5 h-5 text-[var(--accent)] transform transition-transform duration-300 shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-[var(--text-secondary)] font-medium leading-relaxed border-t border-[var(--border)] pt-4 mt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Newsletter */}
        <section className="py-24 bg-[var(--bg-secondary)] border-y border-[var(--border)] relative z-10">
          <div className="w-full max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest mb-4">Stay In The Loop</h2>
            <p className="text-[var(--text-secondary)] font-medium mb-10">Get updates on speakers, schedule changes, and exclusive offers.</p>
            
            <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto bg-[var(--bg-card)] border border-[var(--border)] rounded-full p-2 focus-within:border-[var(--accent)] focus-within:shadow-[0_0_20px_var(--glow)] transition-all">
              <input type="email" placeholder="Enter your email" className="flex-1 bg-transparent px-6 py-3 outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)]" />
              <button className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white font-bold rounded-full px-8 py-3 shadow-lg hover:scale-105 transition-all cursor-pointer uppercase tracking-wider text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* 10. Footer */}
        <footer className="py-16 bg-[var(--bg-primary)] border-t border-[var(--border)] relative z-10">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L22 7.75v8.5L12 22l-10-5.75v-8.5L12 2z" />
                </svg>
                <span className="font-black text-2xl tracking-widest uppercase bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                  DEVCON
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                {['Twitter', 'GitHub', 'LinkedIn', 'YouTube'].map(social => (
                  <button key={social} className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:shadow-[0_0_10px_var(--glow)] transition-all cursor-pointer">
                    <span className="text-xs font-bold">{social[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-y border-[var(--border)]/50 py-12">
              {[
                { title: 'About', links: ['About DEVCON', 'Team', 'Careers'] },
                { title: 'Event', links: ['Schedule', 'Speakers', 'Venue', 'Tickets'] },
                { title: 'Resources', links: ['Blog', 'Press Kit', 'Code of Conduct'] },
                { title: 'Contact', links: ['hello@devcon.dev', '+1 (555) 123-4567', 'San Francisco, CA'] }
              ].map(col => (
                <div key={col.title}>
                  <h4 className="font-bold text-[var(--text-primary)] uppercase tracking-widest mb-6">{col.title}</h4>
                  <ul className="space-y-4">
                    {col.links.map(link => (
                      <li key={link}>
                        <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] font-medium text-sm transition-colors">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
              <p>© 2025 DEVCON. All rights reserved.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[var(--accent)] transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Theme Switcher */}
        <div className="fixed bottom-6 right-6 bg-[var(--bg-primary)]/80 backdrop-blur-xl p-2 rounded-full shadow-[0_0_30px_var(--glow)] flex gap-2 z-[1000] border border-[var(--border)]">
          {[
            { id: 'electric', bg: '#3B82F6', label: 'Electric' },
            { id: 'sunset', bg: '#F97316', label: 'Sunset' },
            { id: 'matrix', bg: '#22C55E', label: 'Matrix' }
          ].map(theme => (
            <button 
              key={theme.id}
              onClick={() => setActiveTheme(theme.id as Variant)}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform relative group hover:scale-110 ${activeTheme === theme.id ? 'border-[var(--text-primary)] scale-110' : 'border-transparent'}`}
              style={{ background: theme.bg }}
              aria-label={theme.label}
            >
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-widest px-2 py-1 rounded opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 shadow-lg">
                {theme.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
