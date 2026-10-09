import { useState, useEffect } from 'react';

type Variant = 'indigo' | 'emerald' | 'rose';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#6366F1': 'indigo',
  '#10B981': 'emerald',
  '#F43F5E': 'rose',
};

const popularCourses = [
  { id: 1, rating: "4.7", title: "JavaScript Pro", instructor: "Sarah Miller", price: "$49.99" },
  { id: 2, rating: "4.5", title: "UI/UX Design", instructor: "Alex Chen", price: "$39.99" },
  { id: 3, rating: "4.8", title: "Python AI", instructor: "Dr. James", price: "$59.99" },
  { id: 4, rating: "4.6", title: "Node.js API", instructor: "Mike Wilson", price: "$44.99" },
];

const categories = [
  { id: 'development', name: 'Development', icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5' },
  { id: 'design', name: 'Design', icon: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125' },
  { id: 'business', name: 'Business', icon: 'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z' },
  { id: 'marketing', name: 'Marketing', icon: 'M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z' },
  { id: 'data', name: 'Data', icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125' },
];

const instructors = [
  { id: 1, name: 'Sarah M.', specialty: 'JavaScript' },
  { id: 2, name: 'Alex C.', specialty: 'UI/UX' },
  { id: 3, name: 'Dr. James', specialty: 'Python' },
];

const tabs = [
  { id: 'home', name: 'Home', icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' },
  { id: 'courses', name: 'Courses', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
  { id: 'learning', name: 'My Learning', icon: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0zM15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z' },
  { id: 'certificates', name: 'Certificates', icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.536a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' },
  { id: 'profile', name: 'Profile', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' }
];

export function MobileCourseApp({ variant = 'indigo' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('development');
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('indigo'); 
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
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .course-wrapper {
          --accent: #6366F1;
          --accent-hover: #4F46E5;
          --accent-light: rgba(99,102,241,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #F0F0FF;
          --bg-card: #FFFFFF;
          --border: #DDDDF8;
          --text-primary: #1A1A2E;
          --text-secondary: #6B6BAE;
          font-family: 'Inter', sans-serif;
        }
        .course-wrapper[data-theme="emerald"] {
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
        .course-wrapper[data-theme="rose"] {
          --accent: #F43F5E;
          --accent-hover: #E11D48;
          --accent-light: rgba(244,63,94,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #FFF0F3;
          --bg-card: #FFFFFF;
          --border: #FFD0D8;
          --text-primary: #2E0A12;
          --text-secondary: #AA5070;
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
        className="course-wrapper min-h-screen bg-neutral-100 flex justify-center text-[var(--text-primary)]"
        data-theme={activeTheme === 'indigo' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col overflow-x-hidden">
          
          {/* 1. Header */}
          <div className="px-5 pt-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <svg className="w-7 h-7 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <h1 className="font-bold text-xl">LearnX</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                <div className="absolute -top-1 -right-1 bg-[var(--accent)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">3</div>
              </div>
              <div className="w-8 h-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full overflow-hidden cursor-pointer flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
            </div>
          </div>

          {/* 2. Search */}
          <div className="px-5 mt-3">
            <div className="relative">
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search courses, skills..." 
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] placeholder-[var(--text-secondary)]"
              />
            </div>
          </div>

          {/* 3. Continue Learning */}
          <div className="px-5 mt-5">
            <h2 className="font-bold text-base">Continue Learning</h2>
            <div className="mt-3 bg-[var(--accent)] rounded-2xl p-4 text-white relative overflow-hidden shadow-lg shadow-[var(--accent)]/30">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-full opacity-10"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white rounded-full opacity-10"></div>
              
              <div className="relative z-10">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                  </div>
                  <div className="flex-1 ml-3">
                    <h3 className="font-bold text-base">React Masterclass</h3>
                    <p className="text-xs opacity-80 mt-0.5">65% Complete</p>
                  </div>
                </div>
                
                <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-2 bg-white rounded-full w-[65%]"></div>
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs opacity-80">12 of 18 lessons</span>
                  <button className="bg-white text-[var(--accent)] px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer hover:bg-opacity-90 transition-opacity">
                    Resume
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Popular Courses */}
          <div className="px-5 mt-5">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-base">Popular Courses</h2>
              <span className="text-[var(--accent)] text-xs font-semibold cursor-pointer hover:underline">See All</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {popularCourses.map((course) => (
                <div key={course.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:border-[var(--accent)] transition-colors group">
                  <div className="h-24 bg-gradient-to-br from-[var(--accent-light)] to-[var(--bg-secondary)] relative flex items-center justify-center">
                    <svg className="w-10 h-10 text-[var(--accent)] opacity-40 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                    <div className="absolute top-2 right-2 bg-white shadow text-xs px-1.5 py-0.5 rounded-full flex items-center gap-0.5 font-semibold">
                      <svg className="w-3 h-3 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                      {course.rating}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm leading-tight group-hover:text-[var(--accent)] transition-colors">{course.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">{course.instructor}</p>
                    <div className="font-bold text-sm text-[var(--accent)] mt-1">{course.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Categories */}
          <div className="px-5 mt-5">
            <h2 className="font-bold text-sm">Categories</h2>
            <div className="flex gap-4 mt-3 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  onClick={() => setActiveCategory(category.id)}
                  className="flex flex-col items-center gap-2 min-w-[56px] cursor-pointer group"
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    activeCategory === category.id 
                      ? 'bg-[var(--accent-light)] border-2 border-[var(--accent)] text-[var(--accent)]' 
                      : 'bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]'
                  }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={category.icon} />
                    </svg>
                  </div>
                  <span className={`text-xs ${activeCategory === category.id ? 'font-bold text-[var(--accent)]' : 'font-medium text-[var(--text-secondary)]'}`}>
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Top Instructors */}
          <div className="px-5 mt-5 pb-24">
            <h2 className="font-bold text-sm">Top Instructors</h2>
            <div className="flex gap-4 mt-3 overflow-x-auto pb-1 scrollbar-hide">
              {instructors.map((instructor) => (
                <div key={instructor.id} className="flex flex-col items-center gap-1.5 min-w-[80px] cursor-pointer group">
                  <div className="w-16 h-16 bg-[var(--bg-secondary)] rounded-full border-2 border-[var(--accent-light)] flex items-center justify-center overflow-hidden group-hover:border-[var(--accent)] transition-colors">
                    <svg className="w-8 h-8 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div className="text-center mt-0.5">
                    <h3 className="font-bold text-xs">{instructor.name}</h3>
                    <p className="text-[10px] text-[var(--text-secondary)]">{instructor.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Bottom Nav */}
          <div className="fixed bottom-0 w-full max-w-[390px] bg-[var(--bg-card)]/95 backdrop-blur border-t border-[var(--border)] z-50">
            <div className="flex justify-between items-center px-6 py-3">
              {tabs.map((tab) => (
                <div 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex flex-col items-center gap-1 cursor-pointer"
                >
                  <svg 
                    className={`w-6 h-6 transition-colors ${activeTab === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--accent)]'}`} 
                    fill={activeTab === tab.id ? 'currentColor' : 'none'} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    strokeWidth={activeTab === tab.id ? "0" : "1.5"}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                  </svg>
                  <span className={`text-[10px] ${activeTab === tab.id ? 'font-bold text-[var(--accent)]' : 'font-medium text-[var(--text-secondary)]'}`}>
                    {tab.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
