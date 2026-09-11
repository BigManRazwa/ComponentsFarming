import { useState, useEffect } from 'react';

type Variant = 'midnight' | 'sepia' | 'frost';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#E11D48': 'midnight',
  '#e11d48': 'midnight',
  '#B45309': 'sepia',
  '#b45309': 'sepia',
  '#0284C7': 'frost',
  '#0284c7': 'frost'
};

export function BlogMagazine({ variant = 'midnight' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [activeCategory, setActiveCategory] = useState<string>('Home');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [customAccent, setCustomAccent] = useState<{ accent: string; hover: string } | null>(null);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;

      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('midnight');
        setCustomAccent(null);
        return;
      }

      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) {
        setActiveTheme(themeName);
        setCustomAccent(null);
      } else {
        setActiveTheme('midnight');
        setCustomAccent({
          accent: variation.accent,
          hover: variation.accent + 'dd'
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const articles = [
    {
      category: 'Startup Culture',
      title: 'Navigating Remote Work Challenges',
      excerpt: 'How distributed teams are staying connected and productive in the new normal while avoiding burnout and maintaining work-life balance.',
      author: 'Michael Brown',
      date: 'Oct 24'
    },
    {
      category: 'Science',
      title: 'The New Era of Quantum Computing',
      excerpt: 'Exploring the recent breakthroughs and practical applications of qubit technology that could revolutionize computation as we know it.',
      author: 'Dr. Emily White',
      date: 'Oct 23'
    },
    {
      category: 'Opinion',
      title: 'Why the Right to Repair is Essential',
      excerpt: 'An argument for consumer freedom in maintaining their own electronic devices and the environmental impact of planned obsolescence.',
      author: 'David Kim',
      date: 'Oct 22'
    }
  ];

  const trending = [
    { title: 'Solar Panel Innovations', category: 'Science' },
    { title: 'The Rise of Fintech', category: 'Finance' },
    { title: 'Future Cities', category: 'Technology' },
    { title: 'HealthTech Startups', category: 'Health' },
    { title: 'Cyber Security Trends', category: 'Technology' }
  ];

  const tags = ['AI', 'Gadgets', 'Innovation', 'Software', 'Environment', 'Space', 'Health', 'Digital', 'Blockchain', 'Design'];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Merriweather:wght@400;700;900&display=swap" rel="stylesheet" />
      <style>{`
        .blog-wrapper {
          --accent: #E11D48;
          --accent-hover: #BE123C;
          --bg-primary: #0F0F0F;
          --bg-secondary: #1A1A1A;
          --bg-card: #1E1E1E;
          --border: #2A2A2A;
          --text-primary: #F5F5F5;
          --text-secondary: #888888;
          --text-tertiary: #666666;
          font-family: 'Inter', sans-serif;
        }
        .blog-wrapper[data-theme="sepia"] {
          --accent: #B45309;
          --accent-hover: #92400E;
          --bg-primary: #1A1610;
          --bg-secondary: #221E16;
          --bg-card: #2A2418;
          --border: #3A3020;
          --text-primary: #F5F0E8;
          --text-secondary: #AA9968;
          --text-tertiary: #887748;
        }
        .blog-wrapper[data-theme="frost"] {
          --accent: #0284C7;
          --accent-hover: #0369A1;
          --bg-primary: #0A1118;
          --bg-secondary: #111920;
          --bg-card: #162028;
          --border: #1E3040;
          --text-primary: #F0F8FF;
          --text-secondary: #6899BB;
          --text-tertiary: #4A7A9A;
        }
        ${customAccent ? `
        .blog-wrapper {
          --accent: ${customAccent.accent} !important;
          --accent-hover: ${customAccent.hover} !important;
        }
        ` : ''}
        .font-merri {
          font-family: 'Merriweather', serif;
        }
      `}</style>

      <div className="blog-wrapper min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300" data-theme={activeTheme === 'midnight' ? undefined : activeTheme}>
        
        {/* 1. Navigation */}
        <nav className="sticky top-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur border-b border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <svg className="w-8 h-8 text-[var(--accent)] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
              <span className="text-2xl font-bold text-[var(--accent)] tracking-tight">ThePulse</span>
            </div>

            {/* Center Links */}
            <div className="hidden md:flex gap-8">
              {['Home', 'Technology', 'Culture', 'Science', 'Opinion'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm font-medium transition-colors cursor-pointer ${activeCategory === cat ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Right */}
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setSearchOpen(!searchOpen)} 
                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
          {searchOpen && (
            <div className="absolute top-20 left-0 w-full bg-[var(--bg-card)] border-b border-[var(--border)] p-4 shadow-lg animate-in fade-in slide-in-from-top-4">
              <div className="max-w-3xl mx-auto flex">
                <input 
                  type="text" 
                  placeholder="Search articles, authors, or topics..." 
                  className="w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] px-6 py-4 rounded-l-lg border-none outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
                <button className="bg-[var(--accent)] text-white px-8 rounded-r-lg font-semibold cursor-pointer hover:bg-[var(--accent-hover)] transition-colors">
                  Search
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* 2. Featured Article Hero */}
        <div className="max-w-6xl mx-auto px-6 mt-8">
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden cursor-pointer group">
            {/* Gradient placeholder background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-card)] to-[var(--bg-primary)] group-hover:scale-105 transition-transform duration-700"></div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000e6] via-[#00000099] to-transparent"></div>
            
            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 p-10 w-full max-w-4xl">
              <span className="inline-block bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                Technology
              </span>
              <h1 className="font-merri text-3xl md:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                The Future of AI: How Machine Learning is Reshaping Industries
              </h1>
              
              <div className="flex items-center gap-4 text-gray-300 text-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--accent)] to-purple-500"></div>
                <span className="font-medium text-white">Sarah Chen</span>
                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                <span>8 min read</span>
                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                <span>Oct 25, 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
          
          {/* Left Column - Article Feed */}
          <div>
            <h2 className="text-2xl font-bold font-merri mb-8 border-b border-[var(--border)] pb-4">Latest Stories</h2>
            
            <div className="flex flex-col gap-8">
              {articles.map((article, idx) => (
                <article key={idx} className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] overflow-hidden flex flex-col md:flex-row hover:border-[var(--accent)] transition-colors duration-300 cursor-pointer group">
                  <div className="w-full md:w-64 h-48 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] shrink-0 overflow-hidden relative">
                     <div className="absolute inset-0 bg-[var(--accent)]/10 group-hover:bg-[var(--accent)]/20 transition-colors"></div>
                  </div>
                  
                  <div className="p-6 flex flex-col justify-center flex-1">
                    <span className="text-[var(--accent)] text-xs font-bold uppercase tracking-wider mb-2">
                      {article.category}
                    </span>
                    <h3 className="font-merri text-xl font-bold mb-3 group-hover:text-[var(--accent)] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-500 to-gray-700"></div>
                        <span className="font-medium text-[var(--text-secondary)]">{article.author}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                      <span className="text-[var(--accent)] text-sm font-semibold hover:underline">Read More →</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            <button className="mt-10 w-full py-4 border-2 border-[var(--border)] rounded-xl font-semibold text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer">
              Load More Articles
            </button>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-8 relative">
            <div className="sticky top-28">
              
              {/* Trending Now */}
              <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-6">
                <h3 className="font-merri text-lg font-bold mb-6 flex items-center gap-2 border-b border-[var(--border)] pb-4">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
                  Trending Now
                </h3>
                <div className="space-y-5">
                  {trending.map((item, idx) => (
                    <div key={idx} className="flex gap-4 cursor-pointer group">
                      <span className="text-3xl font-bold text-[var(--accent)] opacity-50 font-merri">{idx + 1}</span>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-tight mb-1">{item.title}</h4>
                        <span className="text-xs text-[var(--text-tertiary)]">{item.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-6 mt-8">
                <svg className="w-8 h-8 text-[var(--accent)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <h3 className="font-merri text-lg font-bold mb-2">Subscribe to our Newsletter</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-6">Get the latest stories delivered to your inbox.</p>
                <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] text-[var(--text-primary)]"
                    required
                  />
                  <button type="submit" className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold py-3 rounded-lg text-sm transition-colors cursor-pointer">
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Popular Tags */}
              <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-6 mt-8">
                <h3 className="font-merri text-lg font-bold mb-5 border-b border-[var(--border)] pb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span 
                      key={tag}
                      className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full px-3 py-1 text-sm text-[var(--text-secondary)] hover:text-white hover:bg-[var(--accent)] hover:border-[var(--accent)] cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </aside>

        </div>

        {/* 4. Footer */}
        <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)] py-12 mt-12">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
                <span className="text-xl font-bold text-[var(--text-primary)]">ThePulse</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                Your daily source for the latest trends, insights, and stories that matter.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Categories</h4>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">Technology</li>
                <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">Science</li>
                <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">Culture</li>
                <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">Opinion</li>
                <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">Startups</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Resources</h4>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">Write for Us</li>
                <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">Advertise</li>
                <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">Contact</li>
                <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">RSS Feed</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Legal</h4>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">Cookie Policy</li>
                <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">Accessibility</li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-[var(--border)] text-sm text-[var(--text-tertiary)] flex flex-col md:flex-row justify-between items-center">
            <p>© 2024 ThePulse Magazine. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-[var(--accent)] transition-colors">Twitter</a>
              <a href="#" className="hover:text-[var(--accent)] transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-[var(--accent)] transition-colors">Instagram</a>
            </div>
          </div>
        </footer>

        {/* Theme Switcher */}
        <div className="fixed bottom-6 right-6 flex gap-3 p-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-full shadow-2xl z-50">
          {[
            { id: 'midnight', color: '#E11D48', label: 'Midnight Rose' },
            { id: 'sepia', color: '#B45309', label: 'Sepia Amber' },
            { id: 'frost', color: '#0284C7', label: 'Frost Sky' }
          ].map(theme => (
            <button
              key={theme.id}
              onClick={() => {
                setActiveTheme(theme.id as Variant);
                setCustomAccent(null);
              }}
              className={`w-6 h-6 rounded-full cursor-pointer transition-transform group relative ${activeTheme === theme.id && !customAccent ? 'scale-125 ring-2 ring-offset-2 ring-offset-[var(--bg-card)] ring-[var(--text-primary)]' : 'hover:scale-110'}`}
              style={{ backgroundColor: theme.color }}
            >
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium">
                {theme.label}
              </span>
            </button>
          ))}
        </div>

      </div>
    </>
  );
}
