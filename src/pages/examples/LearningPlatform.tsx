import { useState, useEffect } from 'react';

type Variant = 'indigo' | 'teal' | 'amber';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#6366F1': 'indigo',
  '#14B8A6': 'teal',
  '#F59E0B': 'amber'
};

export function LearningPlatform({ variant = 'indigo' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [customAccent, setCustomAccent] = useState<{ accent: string; hover: string; hero: string } | null>(null);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      
      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('indigo');
        setCustomAccent(null);
        return;
      }

      const themeName = ACCENT_TO_THEME[variation.accent.toUpperCase()];
      if (themeName) {
        setActiveTheme(themeName);
        setCustomAccent(null);
      } else {
        setActiveTheme('indigo');
        setCustomAccent({
          accent: variation.accent,
          hover: variation.accent,
          hero: `linear-gradient(135deg, ${variation.accent} 0%, ${variation.accent}dd 50%, ${variation.accent}99 100%)`
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const categories = ['All', 'Development', 'Design', 'Business', 'Marketing', 'Data Science'];

  const popularCourses = [
    { title: "Python for Data Science", instructor: "Sarah Chen", rating: 4.8, students: "35.6K", price: 89.99, orig: 129.99, category: "Data Science", color: "from-blue-400 to-indigo-500" },
    { title: "Advanced UI/UX Design", instructor: "David Miller", rating: 4.7, students: "28.2K", price: 79.99, orig: 119.99, category: "Design", color: "from-pink-400 to-rose-500" },
    { title: "Growth Marketing Masterclass", instructor: "Alice Green", rating: 4.9, students: "42.1K", price: 94.99, orig: 149.99, category: "Marketing", color: "from-emerald-400 to-teal-500" },
    { title: "Web Development Bootcamp", instructor: "Mark Thompson", rating: 4.8, students: "51.3K", price: 99.99, orig: 199.99, category: "Development", color: "from-purple-400 to-fuchsia-500" },
  ];

  const continueCourses = [
    { title: "Complete Python Bootcamp", instructor: "Sarah Chen", progress: 65, color: "from-blue-400 to-indigo-500" },
    { title: "React & TypeScript", instructor: "Mark Thompson", progress: 32, color: "from-purple-400 to-fuchsia-500" },
  ];

  const topInstructors = [
    { name: "Sarah Chen", specialty: "Data Science", rating: 4.9, courses: 12, students: "89K", color: "from-blue-400 to-indigo-500" },
    { name: "David Miller", specialty: "UI/UX", rating: 4.7, courses: 8, students: "56K", color: "from-pink-400 to-rose-500" },
    { name: "Alice Green", specialty: "Marketing", rating: 4.9, courses: 15, students: "102K", color: "from-emerald-400 to-teal-500" },
    { name: "Mark Thompson", specialty: "Web Dev", rating: 4.8, courses: 20, students: "145K", color: "from-purple-400 to-fuchsia-500" },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .learning-wrapper {
          --accent: #6366F1;
          --accent-hover: #4F46E5;
          --bg-primary: #FFFFFF;
          --bg-secondary: #F8FAFC;
          --bg-card: #FFFFFF;
          --border: #E2E8F0;
          --text-primary: #0F172A;
          --text-secondary: #64748B;
          --hero-bg: linear-gradient(135deg, #4338CA 0%, #6366F1 50%, #818CF8 100%);
          font-family: 'Inter', sans-serif;
        }
        .learning-wrapper[data-theme="teal"] {
          --accent: #14B8A6;
          --accent-hover: #0D9488;
          --bg-primary: #FFFFFF;
          --bg-secondary: #F0FDFA;
          --bg-card: #FFFFFF;
          --border: #CCFBF1;
          --text-primary: #0F172A;
          --text-secondary: #64748B;
          --hero-bg: linear-gradient(135deg, #0F766E 0%, #14B8A6 50%, #5EEAD4 100%);
        }
        .learning-wrapper[data-theme="amber"] {
          --accent: #F59E0B;
          --accent-hover: #D97706;
          --bg-primary: #FFFFFF;
          --bg-secondary: #FFFBEB;
          --bg-card: #FFFFFF;
          --border: #FEF3C7;
          --text-primary: #0F172A;
          --text-secondary: #64748B;
          --hero-bg: linear-gradient(135deg, #B45309 0%, #F59E0B 50%, #FCD34D 100%);
        }
        ${customAccent ? `
        .learning-wrapper {
          --accent: ${customAccent.accent} !important;
          --accent-hover: ${customAccent.hover} !important;
          --hero-bg: ${customAccent.hero} !important;
        }
        ` : ''}
      `}</style>
      <div className="learning-wrapper min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]" data-theme={activeTheme === 'indigo' ? undefined : activeTheme}>
      
        {/* Navigation */}
        <nav className="sticky top-0 bg-[var(--bg-primary)] shadow-sm z-50 border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* Left */}
            <div className="flex items-center gap-2 text-[var(--accent)] cursor-pointer">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="text-xl font-bold">LearnHub</span>
            </div>
            
            {/* Center links */}
            <div className="flex items-center gap-8 font-medium text-[var(--text-primary)]">
              {['Browse', 'My Courses', 'Community', 'Pricing'].map(link => (
                <span key={link} className="cursor-pointer hover:text-[var(--accent)] transition-colors">{link}</span>
              ))}
            </div>
            
            {/* Right */}
            <div className="flex items-center gap-6">
              <div className="relative cursor-pointer text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[var(--bg-primary)]"></span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-500 cursor-pointer border-2 border-transparent hover:border-[var(--accent)] transition-colors"></div>
            </div>
          </div>
        </nav>
        
        {/* Hero Section */}
        <section className="py-16 text-white" style={{ background: 'var(--hero-bg)' }}>
          <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4 drop-shadow-sm">Master New Skills Today</h1>
            <p className="text-lg opacity-90 mb-10 max-w-2xl">Explore thousands of courses taught by industry experts.</p>
            
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-2 flex items-center mb-12">
              <svg className="w-6 h-6 text-gray-400 ml-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input 
                type="text" 
                className="flex-1 text-gray-800 bg-transparent outline-none py-3 px-2 placeholder-gray-400" 
                placeholder="Search for courses, skills, or instructors..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors text-white px-8 py-3 rounded-lg font-medium cursor-pointer">
                Search
              </button>
            </div>
            
            <div className="flex gap-16 font-medium">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">50K+</span>
                <span className="text-sm opacity-80">Students</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">2,000+</span>
                <span className="text-sm opacity-80">Courses</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">500+</span>
                <span className="text-sm opacity-80">Instructors</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">4.8</span>
                <span className="text-sm opacity-80">Avg Rating</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Category Filter */}
        <section className="py-8 bg-[var(--bg-primary)] border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-4 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-medium transition-colors cursor-pointer border ${activeCategory === cat ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : 'bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Continue Learning */}
        <section className="py-12 bg-[var(--bg-primary)] border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Continue Learning</h2>
            <div className="grid grid-cols-2 gap-6">
              {continueCourses.map((course, i) => (
                <div key={i} className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border)] flex items-center gap-5 cursor-pointer hover:shadow-md transition-shadow group">
                  <div className={`w-[80px] h-[80px] rounded-lg bg-gradient-to-br ${course.color} flex-shrink-0`}></div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-[var(--accent)] transition-colors">{course.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-3">{course.instructor}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{course.progress}% Complete</span>
                    </div>
                  </div>
                  <span className="text-[var(--accent)] font-medium text-sm hover:underline">Resume</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Courses Grid */}
        <section className="py-12 bg-[var(--bg-secondary)] border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Popular Courses</h2>
              <span className="text-[var(--accent)] font-medium cursor-pointer hover:underline">View All</span>
            </div>
            
            <div className="grid grid-cols-4 gap-6">
              {popularCourses.map((course, i) => (
                <div key={i} className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group flex flex-col">
                  <div className={`h-40 bg-gradient-to-br ${course.color} relative`}>
                    <div className="absolute top-3 left-3 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {course.category}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-[var(--accent)] transition-colors">{course.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-3">{course.instructor}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-4">
                      <div className="flex text-amber-400 text-xs">
                        {'★★★★★'.split('').map((star, j) => (
                          <span key={j}>{star}</span>
                        ))}
                      </div>
                      <span className="font-medium text-[var(--text-primary)]">{course.rating}</span>
                      <span>({course.students})</span>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-[var(--border)]">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-bold text-xl">${course.price}</span>
                        <span className="text-sm text-[var(--text-secondary)] line-through">${course.orig}</span>
                      </div>
                      <button className="w-full bg-[var(--accent)] text-white font-medium py-2.5 rounded-lg hover:bg-[var(--accent-hover)] transition-colors cursor-pointer">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instructor Spotlight */}
        <section className="py-12 bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Top Instructors</h2>
            <div className="grid grid-cols-4 gap-6">
              {topInstructors.map((inst, i) => (
                <div key={i} className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-tr ${inst.color} mb-4`}></div>
                  <h3 className="font-bold text-lg mb-1">{inst.name}</h3>
                  <p className="text-[var(--text-secondary)] text-sm mb-3">{inst.specialty}</p>
                  
                  <div className="flex justify-center items-center gap-1 text-amber-400 text-sm mb-4">
                    <span>★</span>
                    <span className="font-medium text-[var(--text-primary)]">{inst.rating}</span>
                  </div>
                  
                  <div className="flex justify-center gap-4 text-xs text-[var(--text-secondary)]">
                    <div className="flex flex-col">
                      <span className="font-bold text-[var(--text-primary)]">{inst.courses}</span>
                      <span>Courses</span>
                    </div>
                    <div className="w-px bg-[var(--border)]"></div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[var(--text-primary)]">{inst.students}</span>
                      <span>Students</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 text-white" style={{ background: 'var(--hero-bg)' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-6 text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="text-lg font-bold">LearnHub</span>
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-6">Empowering learners worldwide to master new skills and advance their careers through expert-led online education.</p>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Platform</h4>
                <ul className="space-y-3 text-sm text-white/80">
                  <li className="hover:text-white cursor-pointer transition-colors">Browse Courses</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Learning Paths</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Pricing Plans</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Certificates</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Resources</h4>
                <ul className="space-y-3 text-sm text-white/80">
                  <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Student Stories</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Partnerships</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Community</h4>
                <ul className="space-y-3 text-sm text-white/80">
                  <li className="hover:text-white cursor-pointer transition-colors">Discussion Forums</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Discord Server</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Upcoming Events</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Teach on LearnHub</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/20 flex justify-between items-center text-sm text-white/80">
              <p>© 2026 LearnHub Inc. All rights reserved.</p>
              <div className="flex gap-6">
                <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                <span className="hover:text-white cursor-pointer transition-colors">Cookie Settings</span>
              </div>
            </div>
          </div>
        </footer>

        {/* Theme Switcher */}
        <div className="fixed bottom-6 right-6 bg-white p-2 rounded-full shadow-lg flex gap-2 z-[100] border border-[var(--border)]">
          {[
            { id: 'indigo', bg: '#6366F1', label: 'Indigo' },
            { id: 'teal', bg: '#14B8A6', label: 'Teal' },
            { id: 'amber', bg: '#F59E0B', label: 'Amber' }
          ].map(theme => (
            <button 
              key={theme.id}
              onClick={() => {
                setActiveTheme(theme.id as Variant);
                setCustomAccent(null);
              }}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform relative group hover:scale-110 ${activeTheme === theme.id && !customAccent ? 'border-gray-800 scale-110' : 'border-transparent'}`}
              style={{ background: theme.bg }}
            >
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 whitespace-nowrap shadow-md">
                {theme.label}
              </span>
            </button>
          ))}
        </div>

      </div>
    </>
  );
}
