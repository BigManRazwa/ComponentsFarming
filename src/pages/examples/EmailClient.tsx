import { useState, useEffect } from 'react';

export function EmailClient({ variant = 'blue' }: { variant?: 'blue' | 'violet' | 'teal' }) {
  const [activeFolder, setActiveFolder] = useState('Inbox');
  const [activeEmail, setActiveEmail] = useState(1);

  const themes = {
    blue: {
      '--accent': '#3B82F6',
      '--accent-hover': '#2563EB',
      '--accent-light': 'rgba(59,130,246,0.1)',
      '--bg-primary': '#0C1220',
      '--bg-secondary': '#111828',
      '--bg-card': '#1A2236',
      '--border': '#1E2E42',
      '--text-primary': '#F1F5F9',
      '--text-secondary': '#64748B'
    },
    violet: {
      '--accent': '#8B5CF6',
      '--accent-hover': '#7C3AED',
      '--accent-light': 'rgba(139,92,246,0.1)',
      '--bg-primary': '#0C0A14',
      '--bg-secondary': '#14101E',
      '--bg-card': '#1A1428',
      '--border': '#241E3A',
      '--text-primary': '#F1F0FF',
      '--text-secondary': '#7C72A8'
    },
    teal: {
      '--accent': '#14B8A6',
      '--accent-hover': '#0D9488',
      '--accent-light': 'rgba(20,184,166,0.1)',
      '--bg-primary': '#080E0E',
      '--bg-secondary': '#0E1616',
      '--bg-card': '#141E1E',
      '--border': '#1E2E2E',
      '--text-primary': '#F0FAFA',
      '--text-secondary': '#5A8A8A'
    }
  };

  useEffect(() => {
    window.postMessage({ type: 'customFont', font: 'Inter' }, '*');
  }, []);

  const navItems = [
    { name: 'Inbox', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', badge: '24' },
    { name: 'Starred', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
    { name: 'Sent', icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8' },
    { name: 'Drafts', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', badge: '3' },
    { name: 'Spam', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
    { name: 'Trash', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' }
  ];

  const labels = [
    { name: 'Work', color: '#3B82F6' },
    { name: 'Personal', color: '#10B981' },
    { name: 'Finance', color: '#F59E0B' }
  ];

  const emails = [
    { id: 1, unread: true, initials: 'BS', avatarColor: 'bg-blue-500', name: 'Bavin Smith', subject: 'Q4 Marketing Report', preview: 'Hello, here\'s the Q4 marketing...', time: '5:38 PM', starred: true, attachment: true },
    { id: 2, unread: true, initials: 'PG', avatarColor: 'bg-green-500', name: 'Peter Garcia', subject: 'Design Review Meeting', preview: 'Hi team, let\'s schedule...', time: '3:00 PM', attachment: true },
    { id: 3, unread: false, initials: 'BS', avatarColor: 'bg-blue-500', name: 'Bavin Smith', subject: 'Budget Approval', preview: 'Please review the attached...', time: '3:00 PM', attachment: true },
    { id: 4, unread: false, initials: 'KS', avatarColor: 'bg-teal-500', name: 'Karen Smith', subject: 'Project Update', preview: 'The sprint is going well...', time: 'Jul 2023' },
    { id: 5, unread: false, initials: 'BG', avatarColor: 'bg-purple-500', name: 'Brian Grant', subject: 'New Feature Request', preview: 'We have a new requirement...', time: 'Tuesday', attachment: true },
    { id: 6, unread: false, initials: 'JC', avatarColor: 'bg-orange-500', name: 'Julia Chen', subject: 'Weekly Standup Notes', preview: 'Here are the notes from...', time: 'Tuesday' },
    { id: 7, unread: false, initials: 'BS', avatarColor: 'bg-blue-500', name: 'Bavin Smith', subject: 'Quarterly Review', preview: 'Attached is the quarterly...', time: 'Monday', attachment: true },
    { id: 8, unread: false, initials: 'MD', avatarColor: 'bg-red-500', name: 'Mike Davis', subject: 'Team Lunch', preview: 'Anyone up for lunch...', time: 'Monday' }
  ];

  return (
    <div 
      className="email-wrapper grid grid-cols-[220px_350px_1fr] h-screen overflow-hidden text-[var(--text-primary)] font-sans"
      style={{
        ...themes[variant],
        backgroundColor: 'var(--bg-primary)'
      } as React.CSSProperties}
      data-theme="dark"
    >
      {/* Sidebar */}
      <div className="flex flex-col w-[220px] bg-[var(--bg-secondary)] border-r border-[var(--border)] py-4 h-full">
        <div className="px-5 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="font-bold text-lg text-[var(--accent)]">MailFlow</span>
        </div>

        <button className="mx-4 mb-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl py-2.5 font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Compose
        </button>

        <div className="flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <div 
              key={item.name}
              onClick={() => setActiveFolder(item.name)}
              className={`px-3 py-2.5 rounded-lg text-sm mb-1 mx-2 flex items-center justify-between cursor-pointer transition-colors ${
                activeFolder === item.name 
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
                  activeFolder === item.name 
                    ? 'bg-[var(--accent)] text-white' 
                    : 'bg-[var(--border)] text-[var(--text-primary)]'
                }`}>
                  {item.badge}
                </span>
              )}
            </div>
          ))}

          <div className="border-b border-[var(--border)] my-3 mx-4"></div>

          <div className="px-4">
            <h3 className="text-xs uppercase text-[var(--text-secondary)] tracking-wider mb-2 font-medium">Labels</h3>
            {labels.map((label) => (
              <div key={label.name} className="py-1.5 flex items-center gap-2 text-sm cursor-pointer hover:bg-[var(--bg-card)] px-2 -mx-2 rounded-lg text-[var(--text-secondary)] transition-colors">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: label.color }}></div>
                {label.name}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-4 mt-auto">
          <div className="text-xs text-[var(--text-secondary)] mb-1.5 flex justify-between">
            <span>Storage</span>
            <span>2.4 GB of 15 GB</span>
          </div>
          <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--accent)] rounded-full w-[16%]"></div>
          </div>
        </div>
      </div>

      {/* Email List */}
      <div className="w-[350px] border-r border-[var(--border)] flex flex-col bg-[var(--bg-primary)] h-full">
        <div className="p-3 border-b border-[var(--border)]">
          <div className="relative">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search mail..." 
              className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
            />
          </div>
        </div>
        
        <div className="px-3 py-2 flex gap-2 border-b border-[var(--border)] overflow-x-auto no-scrollbar shrink-0">
          <button className="bg-[var(--accent)] text-white rounded-full px-3 py-1 text-xs whitespace-nowrap cursor-pointer">All Mail</button>
          <button className="bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-secondary)] rounded-full px-3 py-1 text-xs whitespace-nowrap cursor-pointer transition-colors">Unread</button>
          <button className="bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-secondary)] rounded-full px-3 py-1 text-xs whitespace-nowrap cursor-pointer transition-colors">Attachments</button>
          <button className="bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-secondary)] rounded-full px-3 py-1 text-xs whitespace-nowrap cursor-pointer transition-colors">Today</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {emails.map((email) => (
            <div 
              key={email.id}
              onClick={() => setActiveEmail(email.id)}
              className={`px-4 py-3 border-b border-[var(--border)] cursor-pointer flex gap-3 transition-colors ${
                activeEmail === email.id
                  ? 'bg-[var(--bg-card)] border-l-2 border-l-[var(--accent)] pl-[14px]'
                  : 'hover:bg-[var(--bg-card)]/50 border-l-2 border-l-transparent'
              }`}
            >
              <div className="w-2 h-2 shrink-0 mt-2">
                {email.unread && <div className="w-full h-full bg-[var(--accent)] rounded-full"></div>}
              </div>
              
              <div className={`w-9 h-9 rounded-full ${email.avatarColor} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                {email.initials}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className={`text-sm truncate mr-2 ${email.unread ? 'font-bold text-[var(--text-primary)]' : 'font-semibold text-[var(--text-primary)]'}`}>
                    {email.name}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)] shrink-0">{email.time}</span>
                </div>
                <div className={`text-sm truncate mb-1 ${email.unread ? 'font-semibold text-[var(--text-primary)]' : 'text-[var(--text-primary)]'}`}>
                  {email.subject}
                </div>
                <div className="text-xs text-[var(--text-secondary)] truncate">
                  {email.preview}
                </div>
              </div>

              <div className="flex flex-col items-end justify-start gap-2 shrink-0 pt-1">
                <svg className={`w-4 h-4 cursor-pointer ${email.starred ? 'text-amber-400 fill-amber-400' : 'text-[var(--text-secondary)] hover:text-amber-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                {email.attachment && (
                  <svg className="w-3.5 h-3.5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Pane */}
      <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] p-6 h-full flex flex-col">
        <div className="pb-4 border-b border-[var(--border)]">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-sm font-bold text-white">
                MM
              </div>
              <div>
                <div className="font-bold text-[var(--text-primary)]">Manara Mathwon</div>
                <div className="text-xs text-[var(--text-secondary)]">manara.m@example.com</div>
              </div>
            </div>
            <div className="text-xs text-[var(--text-secondary)] pt-1">
              Oct 24, 2023, 5:38 PM
            </div>
          </div>
          
          <h1 className="text-xl font-bold mt-4 text-[var(--text-primary)]">Q4 Marketing Report</h1>
          
          <div className="mt-4 flex gap-2">
            <button className="border border-[var(--border)] hover:bg-[var(--bg-card)] rounded-lg px-4 py-1.5 text-sm flex gap-2 items-center text-[var(--text-primary)] transition-colors cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              Reply
            </button>
            <button className="border border-[var(--border)] hover:bg-[var(--bg-card)] rounded-lg px-4 py-1.5 text-sm flex gap-2 items-center text-[var(--text-primary)] transition-colors cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
              </svg>
              Forward
            </button>
            <div className="flex-1"></div>
            <button className="p-2 border border-[var(--border)] hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] transition-colors cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
            <button className="p-2 border border-[var(--border)] hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] transition-colors cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </button>
            <button className="p-2 border border-[var(--border)] hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] hover:text-red-400 transition-colors cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-6 text-sm leading-relaxed text-[var(--text-secondary)] flex-1">
          <p className="mb-4">Hi Desa,</p>
          <p className="mb-4">We have prepared the Q4 marketing report covering analytics, growth metrics, and content performance.</p>
          
          <h2 className="font-bold text-[var(--text-primary)] mb-2 mt-6">Key Highlights:</h2>
          <ul className="list-disc pl-5 mb-4 space-y-1">
            <li>Social media engagement up 24%</li>
            <li>Email open rates increased to 38%</li>
            <li>Website traffic grew by 15%</li>
          </ul>
          
          <p className="mb-4">Here are the organizational management updates.</p>
          
          <div className="w-full h-48 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl mt-4 mb-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[var(--accent)] transition-colors">
            <svg className="w-8 h-8 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-[var(--text-secondary)]">Click to view image</span>
          </div>
          
          <p className="mb-1">Thank you for your review.</p>
          <p className="mb-6">Best regards,<br/>Manara</p>
        </div>

        <div className="mt-auto bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shrink-0">
          <input 
            type="text" 
            placeholder="Reply..." 
            className="bg-transparent text-sm w-full outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)] mb-4"
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button className="p-1.5 rounded hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.9 7.4L9 16.6m-3.2-5.7L2.1 12l3.7-1.1M21.9 12l-3.7 1.1 3.7-1.1zm-8-4.6l4.9 9.2-4.9-9.2z" />
                </svg>
              </button>
              <button className="p-1.5 rounded hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </button>
              <button className="p-1.5 rounded hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </button>
            </div>
            <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-2">
              Send
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
