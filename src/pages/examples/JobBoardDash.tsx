import { useState, useEffect } from 'react';

export function JobBoardDash({ variant = 'blue' }: { variant?: 'blue' | 'emerald' | 'violet' }) {
  const [activeNav, setActiveNav] = useState('Jobs');
  const [activeFilter, setActiveFilter] = useState('Remote');
  const [bookmarked, setBookmarked] = useState<Record<number, boolean>>({});

  const themes = {
    blue: {
      '--accent': '#3B82F6',
      '--accent-hover': '#2563EB',
      '--accent-light': 'rgba(59,130,246,0.08)',
      '--bg-primary': '#FFFFFF',
      '--bg-secondary': '#F0F5FF',
      '--bg-card': '#FFFFFF',
      '--border': '#DBEAFE',
      '--text-primary': '#1A1A2E',
      '--text-secondary': '#6B8CAE'
    },
    emerald: {
      '--accent': '#10B981',
      '--accent-hover': '#059669',
      '--accent-light': 'rgba(16,185,129,0.08)',
      '--bg-primary': '#FFFFFF',
      '--bg-secondary': '#F0FFF8',
      '--bg-card': '#FFFFFF',
      '--border': '#D1FAE5',
      '--text-primary': '#1A2E1A',
      '--text-secondary': '#5A8A6A'
    },
    violet: {
      '--accent': '#8B5CF6',
      '--accent-hover': '#7C3AED',
      '--accent-light': 'rgba(139,92,246,0.08)',
      '--bg-primary': '#FFFFFF',
      '--bg-secondary': '#F5F0FF',
      '--bg-card': '#FFFFFF',
      '--border': '#E0D0F0',
      '--text-primary': '#1A1A2E',
      '--text-secondary': '#7A6AAA'
    }
  };

  useEffect(() => {
    window.postMessage({ type: 'customFont', font: 'Inter' }, '*');
  }, []);

  const navItems = [
    { name: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Jobs', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'Applications', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Candidates', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { name: 'Company', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { name: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
  ];

  const filters = ['Remote', 'Full-time', 'Part-time', 'Contract', 'Internship'];

  const jobs = [
    { id: 1, initial: 'G', initialColor: 'text-blue-500', title: 'Senior React Developer', company: 'Google', location: 'San Francisco, CA · Remote', salary: '$150K - $200K', posted: '2 days ago', tags: ['React', 'TypeScript', 'Node.js'] },
    { id: 2, initial: 'S', initialColor: 'text-purple-500', title: 'Frontend Engineer', company: 'Stripe', location: 'San Francisco, CA · Remote', salary: '$140K - $180K', posted: '3 days ago', tags: ['React', 'TypeScript'] },
    { id: 3, initial: 'N', initialColor: 'text-red-500', title: 'React Native Lead', company: 'Netflix', location: 'Los Angeles, CA · Remote', salary: '$160K - $210K', posted: '1 day ago', tags: ['React', 'TypeScript', 'Node.js'] },
    { id: 4, initial: 'A', initialColor: 'text-pink-500', title: 'Full Stack Developer', company: 'Airbnb', location: 'San Francisco, CA', salary: '$130K - $170K', posted: '5 days ago', tags: ['React', 'Python', 'AWS'] }
  ];

  const applications = [
    { count: 12, label: 'Applied', color: 'text-blue-500', border: 'border-[var(--accent)]' },
    { count: 5, label: 'In Review', color: 'text-orange-500', border: 'border-orange-500' },
    { count: 3, label: 'Interview', color: 'text-purple-500', border: 'border-purple-500' },
    { count: 1, label: 'Offer', color: 'text-green-500', border: 'border-green-500' }
  ];

  const skillsMatch = [
    { name: 'React', percentage: 95 },
    { name: 'TypeScript', percentage: 88 },
    { name: 'Node.js', percentage: 72 },
    { name: 'Python', percentage: 60 }
  ];

  const savedJobs = [
    { title: 'Senior Frontend Engineer', company: 'Meta' },
    { title: 'React UI Developer', company: 'Vercel' },
    { title: 'Software Engineer II', company: 'Microsoft' }
  ];

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div 
      className="jobboard-wrapper grid grid-cols-[200px_1fr_280px] h-screen overflow-hidden font-sans"
      style={{
        ...themes[variant],
        backgroundColor: 'var(--bg-primary)'
      } as React.CSSProperties}
      data-theme="light"
    >
      {/* Col 1: Sidebar */}
      <div className="flex flex-col bg-[var(--bg-secondary)] border-r border-[var(--border)] py-4 h-full">
        <div className="px-4 mb-5 flex items-center gap-2">
          <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="font-bold text-lg text-[var(--accent)]">JobFlow</span>
        </div>

        <div className="px-2 flex-1">
          {navItems.map((item) => (
            <div 
              key={item.name}
              onClick={() => setActiveNav(item.name)}
              className={`px-3 py-2 rounded-lg text-sm mb-1 flex items-center gap-3 cursor-pointer transition-colors ${
                activeNav === item.name 
                  ? 'bg-[var(--accent-light)] text-[var(--accent)] font-medium' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.name}
            </div>
          ))}
        </div>

        <div className="px-4 mt-auto">
          <div className="flex items-center gap-3 border-t border-[var(--border)] pt-4">
            <div className="w-9 h-9 min-w-[36px] rounded-full bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-hover)]"></div>
            <div className="overflow-hidden">
              <div className="text-sm font-medium text-[var(--text-primary)] truncate">Sarah Chen</div>
              <div className="text-xs text-[var(--text-secondary)] truncate">Job Seeker</div>
            </div>
          </div>
        </div>
      </div>

      {/* Col 2: Main */}
      <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] h-full relative pb-10">
        <div className="mx-6 mt-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3 flex flex-wrap gap-3 shadow-sm">
          <div className="flex-1 flex items-center border border-[var(--border)] rounded-lg px-4 py-2.5 bg-[var(--bg-primary)]">
            <svg className="w-5 h-5 text-[var(--text-secondary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search jobs, companies..." 
              className="w-full bg-transparent border-none outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
            />
          </div>
          
          <div className="w-full md:w-48 flex items-center border border-[var(--border)] rounded-lg px-4 py-2.5 bg-[var(--bg-primary)]">
            <svg className="w-5 h-5 text-[var(--text-secondary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input 
              type="text" 
              defaultValue="San Francisco, CA"
              className="w-full bg-transparent border-none outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
            />
          </div>
          
          <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap">
            Search
          </button>
        </div>

        <div className="px-6 mt-4 flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-colors ${
                activeFilter === filter
                  ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                  : 'bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="px-6 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map(job => (
            <div 
              key={job.id} 
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 cursor-pointer hover:shadow-md hover:border-[var(--accent)] transition-all group"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-[var(--bg-secondary)] rounded-xl flex items-center justify-center font-bold text-lg">
                  <span className={job.initialColor}>{job.initial}</span>
                </div>
                <div className="text-xs text-[var(--text-secondary)]">{job.posted}</div>
              </div>
              
              <div className="mt-3">
                <h3 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{job.title}</h3>
                <div className="text-xs text-[var(--text-secondary)] mt-1">{job.company}</div>
                <div className="flex items-center text-xs text-[var(--text-secondary)] mt-1.5 gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </div>
              </div>
              
              <div className="font-bold text-sm text-[var(--accent)] mt-3">
                {job.salary}
              </div>
              
              <div className="flex flex-wrap gap-1.5 mt-3">
                {job.tags.map(tag => (
                  <span key={tag} className="bg-[var(--accent-light)] text-[var(--accent)] text-xs rounded-full px-2.5 py-0.5 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="mt-4 flex justify-between items-center border-t border-[var(--border)] pt-4">
                <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                  Apply Now
                </button>
                <button 
                  onClick={(e) => toggleBookmark(job.id, e)}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    bookmarked[job.id] 
                      ? 'bg-[var(--accent-light)] text-[var(--accent)]' 
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--accent)]'
                  }`}
                >
                  <svg className="w-4 h-4" fill={bookmarked[job.id] ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Col 3: Right Panel */}
      <div className="w-[280px] bg-[var(--bg-secondary)] border-l border-[var(--border)] overflow-y-auto p-5 h-full">
        {/* Your Applications */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm">
          <h3 className="font-bold text-sm text-[var(--text-primary)]">Your Applications</h3>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {applications.map((app, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-2">
                <div className={`w-14 h-14 rounded-full border-4 ${app.border} flex items-center justify-center mb-2 bg-[var(--bg-secondary)]`}>
                  <span className="font-bold text-[var(--text-primary)]">{app.count}</span>
                </div>
                <span className="text-xs text-[var(--text-secondary)] font-medium">{app.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Match */}
        <div className="mt-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm">
          <h3 className="font-bold text-sm text-[var(--text-primary)] mb-4">Skills Match</h3>
          <div className="space-y-4">
            {skillsMatch.map(skill => (
              <div key={skill.name}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-[var(--text-primary)]">{skill.name}</span>
                  <span className="text-[var(--text-secondary)]">{skill.percentage}%</span>
                </div>
                <div className="h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--accent)] rounded-full"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Jobs */}
        <div className="mt-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-sm text-[var(--text-primary)]">Saved Jobs</h3>
            <span className="bg-[var(--accent-light)] text-[var(--accent)] text-xs px-2 py-0.5 rounded-full font-medium">3</span>
          </div>
          <div className="space-y-3">
            {savedJobs.map((job, idx) => (
              <div key={idx} className="flex items-start justify-between gap-2 p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors cursor-pointer group">
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">{job.title}</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{job.company}</p>
                </div>
                <svg className="w-4 h-4 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-xs font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors py-2 border border-dashed border-[var(--border)] rounded-lg hover:border-[var(--accent)] cursor-pointer">
            View all saved jobs
          </button>
        </div>
      </div>
    </div>
  );
}
