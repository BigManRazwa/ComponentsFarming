import { useState, useEffect } from 'react';

export function BlogEditor({ variant = 'indigo' }: { variant?: 'indigo' | 'emerald' | 'rose' }) {
  const [activeNav, setActiveNav] = useState('My Posts');
  const [activeTool, setActiveTool] = useState('');

  const themes = {
    indigo: {
      '--accent': '#6366F1',
      '--accent-hover': '#4F46E5',
      '--accent-light': 'rgba(99,102,241,0.08)',
      '--bg-primary': '#FFFFFF',
      '--bg-secondary': '#F8F8FF',
      '--bg-card': '#FFFFFF',
      '--border': '#E0E0F0',
      '--text-primary': '#1A1A2E',
      '--text-secondary': '#6B6B8A'
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
    rose: {
      '--accent': '#F43F5E',
      '--accent-hover': '#E11D48',
      '--accent-light': 'rgba(244,63,94,0.08)',
      '--bg-primary': '#FFFFFF',
      '--bg-secondary': '#FFF5F7',
      '--bg-card': '#FFFFFF',
      '--border': '#FFE0E6',
      '--text-primary': '#2E1A1A',
      '--text-secondary': '#AA6680'
    }
  };

  useEffect(() => {
    window.postMessage({ type: 'customFont', font: 'Inter' }, '*');
  }, []);

  const navItems = [
    { name: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'My Posts', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Drafts', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z', badge: '3' },
    { name: 'Published', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', badge: '12' },
    { name: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
  ];

  const tools = [
    { name: 'Bold', icon: 'M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z' },
    { name: 'Italic', icon: 'M10 4h8 M14 4l-4 16 M6 20h8' },
    { name: 'H1', icon: 'M4 6v12 M14 6v12 M4 12h10 M17 12l2-2v8' },
    { name: 'H2', icon: 'M3 6v12 M13 6v12 M3 12h10 M17 9a2 2 0 114 0c0 2-4 5-4 5h4' },
    { name: 'Quote', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { name: 'Link', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
    { name: 'Image', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Code', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { name: 'Ordered List', icon: 'M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01' },
    { name: 'Unordered List', icon: 'M8 6h13 M8 12h13 M8 18h13 M4 6h2v2H4z M4 12h2v2H4z M4 18h2v2H4z' }
  ];

  return (
    <div 
      className="editor-wrapper grid grid-cols-[200px_1fr_280px] h-screen overflow-hidden font-sans"
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span className="font-bold text-lg text-[var(--accent)]">WriteFlow</span>
        </div>

        <div className="px-2 flex-1">
          {navItems.map((item) => (
            <div 
              key={item.name}
              onClick={() => setActiveNav(item.name)}
              className={`px-3 py-2 rounded-lg text-sm mb-1 flex items-center justify-between cursor-pointer transition-colors ${
                activeNav === item.name 
                  ? 'bg-[var(--accent-light)] text-[var(--accent)] font-medium' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.name}
              </div>
              {item.badge && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeNav === item.name 
                    ? 'bg-[var(--accent)] text-white' 
                    : 'bg-[var(--border)] text-[var(--text-primary)]'
                }`}>
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="px-4 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-hover)]"></div>
            <div>
              <div className="text-sm font-medium text-[var(--text-primary)]">Sarah Mitchell</div>
              <div className="text-xs bg-[var(--accent-light)] text-[var(--accent)] px-2 py-0.5 rounded-md inline-block mt-0.5 font-medium">Pro Writer</div>
            </div>
          </div>
        </div>
      </div>

      {/* Col 2: Editor */}
      <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] py-8 px-8 h-full relative">
        <div className="max-w-3xl mx-auto">
          <input 
            type="text" 
            defaultValue="The Future of AI in Design"
            placeholder="Your story title..."
            className="w-full bg-transparent border-none outline-none text-4xl font-bold text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
          />

          <div className="mt-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-hover)]"></div>
            <div>
              <div className="text-sm font-medium text-[var(--text-primary)]">Sarah Mitchell</div>
            </div>
            <div className="text-xs bg-[var(--accent-light)] text-[var(--accent)] px-2 py-1 rounded-md font-medium">Published Oct 15</div>
          </div>

          <div className="mt-6 flex items-center gap-1 border-y border-[var(--border)] py-2 sticky top-0 bg-[var(--bg-primary)] z-10">
            {tools.map((tool) => (
              <button
                key={tool.name}
                onClick={() => setActiveTool(tool.name)}
                title={tool.name}
                className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${
                  activeTool === tool.name 
                    ? 'bg-[var(--accent-light)] text-[var(--accent)]' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tool.icon} />
                </svg>
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--text-secondary)]">
            <p>Artificial intelligence is rapidly transforming the landscape of design. We are seeing a monumental shift in how creatives approach their daily workflows, integrating new tools that augment human capabilities rather than replace them. The focus has moved towards higher-level strategic thinking, with AI handling the repetitive technical tasks.</p>
            
            <blockquote className="border-l-4 border-[var(--accent)] pl-4 py-2 italic text-lg text-[var(--text-primary)] my-6">
              "AI will not replace designers, but designers who use AI will replace those who do not."
            </blockquote>
            
            <p>The integration of AI-powered tools allows for rapid ideation and prototyping. By automating structural generation, traditional <code className="bg-[var(--bg-secondary)] px-1 rounded text-[var(--text-primary)]">design_tools</code> are evolving into collaborative partners that can predict intent and suggest optimizations in real-time.</p>
            
            <div className="w-full h-48 bg-[var(--bg-secondary)] border-2 border-dashed border-[var(--border)] rounded-xl flex items-center justify-center my-6 flex-col gap-2 cursor-pointer hover:border-[var(--accent)] transition-colors">
              <svg className="w-8 h-8 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-[var(--text-secondary)]">Click to add image</span>
            </div>
            
            <p className="italic text-xs text-[var(--text-secondary)] text-center -mt-2 mb-6">Placeholder for AI-generated UI wireframe visualization.</p>
            
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Impact on Prototyping</li>
              <li>Automated Layouts</li>
              <li>Personalization</li>
            </ul>
            
            <p>As we look to the horizon, embracing these innovations will be critical for anyone aiming to stay competitive. The synergy between human empathy and machine efficiency is poised to deliver experiences that are both functionally superior and deeply resonant.</p>
          </div>

          <div className="mt-8 pt-4 border-t border-[var(--border)] flex justify-between text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-1.5">
              <span>1,245 words</span>
              <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]"></span>
              <span>5 min read</span>
            </div>
            <span>Last saved 2 min ago</span>
          </div>
        </div>
      </div>

      {/* Col 3: Settings Panel */}
      <div className="w-[280px] bg-[var(--bg-secondary)] border-l border-[var(--border)] overflow-y-auto p-5 h-full">
        <button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl py-3 font-bold mb-5 transition-colors cursor-pointer">
          Publish
        </button>

        <div className="mb-4">
          <span className="font-bold text-sm text-[var(--text-primary)] block mb-2">Featured Image</span>
          <div className="h-32 border-2 border-dashed border-[var(--border)] rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[var(--accent)] transition-colors">
            <svg className="w-6 h-6 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-xs text-[var(--text-secondary)]">Upload or select featured image</span>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Category</label>
          <select className="bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] rounded-lg px-3 py-2 text-sm w-full outline-none focus:border-[var(--accent)]">
            <option>Technology</option>
            <option>Design</option>
            <option>Business</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Tags</label>
          <div className="flex flex-wrap gap-2">
            {['AI', 'Design', 'UX'].map(tag => (
              <span key={tag} className="flex items-center gap-1 bg-[var(--accent-light)] text-[var(--accent)] rounded-full px-3 py-1 text-xs">
                {tag}
                <svg className="w-3 h-3 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            ))}
            <button className="text-xs text-[var(--text-secondary)] border border-[var(--border)] rounded-full px-3 py-1 hover:bg-[var(--bg-card)] cursor-pointer">
              + Add
            </button>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">SEO Title</label>
          <input 
            type="text" 
            placeholder="Enter SEO title"
            className="bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] rounded-lg px-3 py-2 text-sm w-full outline-none focus:border-[var(--accent)]"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Meta Description</label>
          <textarea 
            placeholder="Enter description..."
            className="bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] rounded-lg px-3 py-2 text-sm w-full h-20 outline-none focus:border-[var(--accent)] resize-none"
          ></textarea>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Publish Schedule</label>
          <select className="bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] rounded-lg px-3 py-2 text-sm w-full outline-none focus:border-[var(--accent)]">
            <option>Publish Immediately</option>
            <option>Schedule</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Visibility</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="visibility" defaultChecked className="accent-[var(--accent)]" />
              <span className="text-sm text-[var(--text-secondary)]">Public</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="visibility" className="accent-[var(--accent)]" />
              <span className="text-sm text-[var(--text-secondary)]">Members Only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="visibility" className="accent-[var(--accent)]" />
              <span className="text-sm text-[var(--text-secondary)]">Private</span>
            </label>
          </div>
        </div>

        <div className="my-4 border-t border-[var(--border)]"></div>

        <div className="flex gap-2">
          <button className="flex-1 bg-transparent border border-[var(--border)] hover:bg-[var(--bg-card)] text-[var(--text-secondary)] rounded-lg py-2 text-sm font-medium transition-colors cursor-pointer">
            Preview
          </button>
          <button className="flex-1 bg-transparent border border-[var(--border)] hover:bg-[var(--bg-card)] text-[var(--text-secondary)] rounded-lg py-2 text-sm font-medium transition-colors cursor-pointer">
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
}
