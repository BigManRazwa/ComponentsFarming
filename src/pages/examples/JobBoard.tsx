import { useState, useEffect } from 'react';

type Variant = 'violet' | 'emerald' | 'rose';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#7C3AED': 'violet',
  '#059669': 'emerald',
  '#E11D48': 'rose',
};

export function JobBoard({ variant = 'violet' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);

  const [experience, setExperience] = useState<string>('Mid');
  const [jobType, setJobType] = useState<string>('Full-time');
  const [bookmarked, setBookmarked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('violet'); 
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

  const toggleBookmark = (id: number) => {
    setBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const jobs = [
    { id: 1, company: 'Google', role: 'Senior Software Engineer', loc: 'Mountain View, CA', salary: '$180K-$210K', type: 'Remote, Full-time, Senior', time: '2h ago', desc: 'Design and develop highly scalable distributed systems. Work with cross-functional teams to deliver impactful product features on a global scale.' },
    { id: 2, company: 'Spotify', role: 'Product Manager', loc: 'New York, NY', salary: '$150K-$190K', type: 'Hybrid, Full-time, Mid', time: '5h ago', desc: 'Lead product strategy and execution for our core discovery features. Collaborate with engineering, design, and data science to improve user engagement.' },
    { id: 3, company: 'Airbnb', role: 'UI/UX Designer', loc: 'San Francisco, CA', salary: '$130K-$160K', type: 'Remote, Full-time, Senior', time: '1d ago', desc: 'Craft beautiful, intuitive experiences for our host community. Create wireframes, prototypes, and high-fidelity designs for multi-platform products.' },
    { id: 4, company: 'Stripe', role: 'Data Scientist', loc: 'Remote', salary: '$170K-$200K', type: 'Remote, Full-time, Senior', time: '1d ago', desc: 'Build machine learning models to detect fraud and improve payment conversion rates. Analyze vast amounts of transaction data to derive insights.' },
    { id: 5, company: 'Slack', role: 'Frontend Engineer', loc: 'San Francisco, CA', salary: '$140K-$175K', type: 'Hybrid, Full-time, Mid', time: '2d ago', desc: 'Implement highly interactive and performant UI components using React and TypeScript. Optimize web application performance for millions of users.' },
    { id: 6, company: 'Netflix', role: 'DevOps Engineer', loc: 'Los Angeles, CA', salary: '$160K-$195K', type: 'Remote, Full-time, Senior', time: '3d ago', desc: 'Build and maintain scalable CI/CD pipelines. Ensure high availability and reliability of our microservices architecture running on AWS.' },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        .jobboard-wrapper {
          --accent: #7C3AED;
          --accent-hover: #6D28D9;
          --accent-light: rgba(124, 58, 237, 0.1);
          --bg-primary: #09090B;
          --bg-secondary: #18181B;
          --bg-card: #1C1C22;
          --border: #27272A;
          --text-primary: #FAFAFA;
          --text-secondary: #71717A;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .jobboard-wrapper[data-theme="emerald"] {
          --accent: #059669;
          --accent-hover: #047857;
          --accent-light: rgba(5, 150, 105, 0.1);
          --bg-primary: #050F0A;
          --bg-secondary: #0A1A14;
          --bg-card: #0F2018;
          --border: #1A3828;
          --text-primary: #F0FFF5;
          --text-secondary: #5A8A70;
        }
        .jobboard-wrapper[data-theme="rose"] {
          --accent: #E11D48;
          --accent-hover: #BE123C;
          --accent-light: rgba(225, 29, 72, 0.1);
          --bg-primary: #0C0508;
          --bg-secondary: #180A12;
          --bg-card: #1E0E18;
          --border: #2A1A22;
          --text-primary: #FFF5F8;
          --text-secondary: #AA6688;
        }
      `}</style>
      
      <div 
        className="jobboard-wrapper min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]"
        data-theme={activeTheme === 'violet' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* 1. Nav */}
        <nav className="sticky top-0 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border)] z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer">
              <svg className="w-8 h-8 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
              </svg>
              <span className="font-bold text-2xl tracking-tight text-[var(--accent)]">HireHub</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {['Browse Jobs', 'Companies', 'Salary Guide', 'Resources'].map((item) => (
                <a key={item} href="#" className="text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden sm:block bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-semibold py-2.5 px-6 rounded-full transition-colors cursor-pointer shadow-lg shadow-[var(--accent-light)]">
                Post a Job
              </button>
              <div className="w-10 h-10 rounded-full bg-[var(--bg-card)] border-2 border-[var(--border)] overflow-hidden cursor-pointer hover:border-[var(--accent)] transition-colors flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--text-secondary)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </nav>

        {/* 2. Hero */}
        <section className="py-20 bg-[var(--bg-secondary)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              Find Your <span className="text-[var(--accent)]">Dream Job</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
              Connect with top companies hiring now across tech, design, and more. Your next career move starts here.
            </p>

            <div className="bg-[var(--bg-card)] border border-[var(--border)] p-2 rounded-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto shadow-2xl">
              <div className="flex-1 flex items-center bg-[var(--bg-primary)] rounded-xl px-4 py-3 border border-transparent focus-within:border-[var(--accent)] transition-colors">
                <svg className="w-5 h-5 text-[var(--text-secondary)] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input type="text" placeholder="Job title, keywords, or company" className="w-full bg-transparent outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)]" />
              </div>
              <div className="w-full md:w-48 flex items-center bg-[var(--bg-primary)] rounded-xl px-4 py-3 border border-transparent focus-within:border-[var(--accent)] transition-colors">
                <svg className="w-5 h-5 text-[var(--text-secondary)] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <input type="text" placeholder="City or remote" className="w-full bg-transparent outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)]" />
              </div>
              <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-3 px-8 rounded-xl transition-colors cursor-pointer w-full md:w-auto">
                Search
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="text-[var(--text-secondary)] text-sm font-medium">Trending:</span>
              {['Software Engineer', 'Product Manager', 'Remote', 'Data Scientist', 'Marketing'].map(tag => (
                <button key={tag} className="bg-[var(--accent-light)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Stats Bar */}
        <section className="py-8 bg-[var(--bg-primary)] border-y border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {[
                { label: 'Active Jobs', val: '45,000+' },
                { label: 'Top Companies', val: '12,500+' },
                { label: 'Remote Roles', val: '8,200+' },
                { label: 'Countries', val: '150+' }
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[var(--accent)] mb-1">{stat.val}</div>
                  <div className="text-[var(--text-secondary)] font-medium text-sm uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Featured Companies */}
        <section className="py-16 bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Companies</h2>
                <p className="text-[var(--text-secondary)]">Top organizations looking for talent today</p>
              </div>
              <a href="#" className="text-[var(--accent)] hover:text-[var(--accent-hover)] font-semibold text-sm flex items-center gap-1 transition-colors">
                View All <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { name: 'Google', ind: 'Tech', roles: 215 },
                { name: 'Airbnb', ind: 'Travel', roles: 48 },
                { name: 'Spotify', ind: 'Music', roles: 15 },
                { name: 'Slack', ind: 'Communication', roles: 35 },
                { name: 'Stripe', ind: 'Finance', roles: 25 }
              ].map(comp => (
                <div key={comp.name} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 flex flex-col items-center text-center hover:border-[var(--accent)] hover:-translate-y-1 transition-all cursor-pointer shadow-sm hover:shadow-[0_10px_20px_var(--accent-light)]">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-2xl font-bold text-[var(--text-primary)] mb-4">
                    {comp.name[0]}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{comp.name}</h3>
                  <p className="text-[var(--text-secondary)] text-sm mb-4">{comp.ind}</p>
                  <div className="mt-auto bg-[var(--accent-light)] text-[var(--accent)] font-semibold text-sm px-4 py-1.5 rounded-full w-full">
                    {comp.roles} Open Roles
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Job Listings + Sidebar */}
        <section className="py-16 bg-[var(--bg-primary)]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
            
            {/* Left: Job Cards */}
            <div>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Recommended for you</h2>
                <div className="text-sm text-[var(--text-secondary)]">Showing {jobs.length} jobs</div>
              </div>
              
              <div className="space-y-5">
                {jobs.map(job => (
                  <div key={job.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--accent)]/50 transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-xl font-bold">
                          {job.company[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[var(--text-primary)]">{job.company}</span>
                            <span className="text-[var(--text-secondary)]">•</span>
                            <span className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                              {job.loc}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-primary)] px-3 py-1 rounded-full border border-[var(--border)]">
                        {job.time}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors cursor-pointer inline-block">
                      {job.role}
                    </h3>
                    <div className="text-[var(--accent)] font-semibold mb-3">
                      {job.salary} <span className="text-[var(--text-secondary)] font-normal text-sm">/ year</span>
                    </div>
                    
                    <p className="text-[var(--text-secondary)] text-sm mb-5 line-clamp-2">
                      {job.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.type.split(', ').map(tag => {
                        const isRemote = tag === 'Remote';
                        const isTime = tag === 'Full-time' || tag === 'Hybrid';
                        let tagClass = "bg-[var(--bg-primary)] border-[var(--border)] text-[var(--text-secondary)]";
                        
                        if (isRemote) tagClass = "bg-[#059669]/10 border-[#059669]/20 text-[#10B981]";
                        if (isTime) tagClass = "bg-[#2563EB]/10 border-[#2563EB]/20 text-[#3B82F6]";
                        
                        return (
                          <span key={tag} className={`text-xs font-semibold px-3 py-1.5 rounded-md border ${tagClass}`}>
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                      <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold py-2 px-6 rounded-lg transition-colors cursor-pointer text-sm">
                        Apply Now
                      </button>
                      <button 
                        onClick={() => toggleBookmark(job.id)}
                        className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${bookmarked[job.id] ? 'bg-[var(--accent-light)] border-[var(--accent)] text-[var(--accent)]' : 'bg-transparent border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]'}`}
                      >
                        <svg className="w-5 h-5" fill={bookmarked[job.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right: Sidebar Filters */}
            <div className="relative">
              <div className="sticky top-28 space-y-6">
                
                <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Filters</h3>
                    <button className="text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer">Clear all</button>
                  </div>
                  
                  {/* Experience */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-sm">Experience Level</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Entry', 'Mid', 'Senior'].map(lvl => (
                        <button 
                          key={lvl}
                          onClick={() => setExperience(lvl)}
                          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${experience === lvl ? 'bg-[var(--accent)] border-[var(--accent)] text-white' : 'bg-transparent border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]'}`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Job Type */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-sm">Job Type</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Full-time', 'Part-time', 'Contract', 'Freelance'].map(type => (
                        <button 
                          key={type}
                          onClick={() => setJobType(type)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${jobType === type ? 'bg-[var(--accent)] border-[var(--accent)] text-white' : 'bg-transparent border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Salary */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-sm">Salary Range</h4>
                      <span className="text-xs font-medium text-[var(--accent)]">$80K - $220K+</span>
                    </div>
                    <div className="h-2 w-full bg-[var(--bg-primary)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--accent)] rounded-full w-[70%] ml-[20%]"></div>
                    </div>
                  </div>
                  
                  {/* Industry */}
                  <div>
                    <h4 className="font-semibold mb-3 text-sm">Industry</h4>
                    <div className="space-y-3">
                      {['Tech', 'Finance', 'Design', 'Marketing', 'Healthcare'].map((ind, i) => (
                        <label key={ind} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${i < 2 ? 'bg-[var(--accent)] border-[var(--accent)] text-white' : 'border-[var(--text-secondary)] group-hover:border-[var(--accent)] text-transparent'}`}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{ind}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Job Alert */}
                <div className="bg-[var(--accent-light)] border border-[var(--accent)]/30 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <svg className="w-24 h-24 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-[var(--accent)] text-white p-2 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                      </div>
                      <h3 className="font-bold text-lg text-[var(--text-primary)]">Get Job Alerts</h3>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mb-5">Receive matching jobs in your inbox as soon as they are posted.</p>
                    <div className="space-y-3">
                      <input type="email" placeholder="Your email address" className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-2.5 outline-none focus:border-[var(--accent)] transition-colors text-sm" />
                      <button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold py-2.5 rounded-xl transition-colors cursor-pointer text-sm shadow-md">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            
          </div>
        </section>

        {/* 6. Newsletter + Footer */}
        <section className="py-20 bg-[var(--bg-secondary)] border-y border-[var(--border)]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Start?</h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8">Join 500K+ professionals finding their dream jobs on HireHub every day.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-3.5 px-8 rounded-xl transition-colors cursor-pointer">
                Create an Account
              </button>
              <button className="bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--text-secondary)] text-[var(--text-primary)] font-bold py-3.5 px-8 rounded-xl transition-colors cursor-pointer">
                Post a Job
              </button>
            </div>
          </div>
        </section>

        <footer className="py-16 bg-[var(--bg-primary)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
              <div className="col-span-2 lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-8 h-8 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                  </svg>
                  <span className="font-bold text-2xl tracking-tight text-[var(--accent)]">HireHub</span>
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-sm mb-8">
                  The most trusted platform for finding top talent and landing your next dream job. We connect great companies with exceptional people.
                </p>
                <div className="flex items-center gap-4">
                  {['twitter', 'linkedin', 'github', 'youtube'].map(social => (
                    <a key={social} href="#" className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors">
                      <span className="text-xs font-bold uppercase">{social[0]}</span>
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-6 text-[var(--text-primary)]">For Candidates</h4>
                <ul className="space-y-4">
                  {['Browse Jobs', 'Salary Guide', 'Career Advice', 'Resume Builder'].map(link => (
                    <li key={link}><a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-6 text-[var(--text-primary)]">For Employers</h4>
                <ul className="space-y-4">
                  {['Post a Job', 'Search Resumes', 'Pricing', 'Resources'].map(link => (
                    <li key={link}><a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-6 text-[var(--text-primary)]">HireHub</h4>
                <ul className="space-y-4">
                  {['About Us', 'Careers', 'Press', 'Contact'].map(link => (
                    <li key={link}><a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-[var(--text-secondary)]">© 2026 HireHub Inc. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Terms of Service</a>
                <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
