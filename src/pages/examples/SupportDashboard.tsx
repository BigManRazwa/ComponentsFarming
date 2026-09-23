import { useState, useEffect } from 'react';

type Variant = 'cyan' | 'violet' | 'emerald';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#06B6D4': 'cyan',
  '#8B5CF6': 'violet',
  '#10B981': 'emerald',
};

export function SupportDashboard({ variant = 'cyan' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState('inbox');
  const [selectedTicket, setSelectedTicket] = useState(1);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('cyan'); 
        setCustomFont(null); 
        return; 
      }
      
      if (variation.font) setCustomFont(variation.font);
      
      const themeName = ACCENT_TO_THEME[variation.accent.toUpperCase()] || ACCENT_TO_THEME[variation.accent];
      if (themeName) { 
        setActiveTheme(themeName); 
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const navItems = [
    { id: 'inbox', label: 'Inbox', badge: '12', icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" },
    { id: 'assigned', label: 'Assigned', icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z M21 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75" },
    { id: 'tickets', label: 'All Tickets', icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" },
    { id: 'kb', label: 'Knowledge Base', icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { id: 'reports', label: 'Reports', icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { id: 'settings', label: 'Settings', icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  ];

  const tickets = [
    { id: 1, name: "Sarah Johnson", message: "I need help with my billing...", time: "7:08 AM", priority: "red", unread: true },
    { id: 2, name: "Mike Chen", message: "The export feature isn't...", time: "6:45 AM", priority: "amber", unread: true },
    { id: 3, name: "Emily Davis", message: "Thank you for resolving...", time: "6:30 AM", priority: "green", unread: false },
    { id: 4, name: "James Wilson", message: "How do I upgrade my plan?", time: "5:15 AM", priority: "amber", unread: false },
    { id: 5, name: "Lisa Wang", message: "I can't access my dashboard", time: "4:30 AM", priority: "red", unread: false },
    { id: 6, name: "David Kim", message: "Great support experience!", time: "3:20 AM", priority: "green", unread: false },
  ];

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'red': return 'bg-red-500';
      case 'amber': return 'bg-amber-500';
      case 'green': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .support-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .support-wrapper[data-theme="cyan"] {
          --accent: #06B6D4;
          --accent-hover: #0891B2;
          --accent-light: rgba(6,182,212,0.1);
          --bg-primary: #0A0E14;
          --bg-secondary: #111820;
          --bg-card: #1A2230;
          --border: #1E2E40;
          --text-primary: #F1F5F9;
          --text-secondary: #64748B;
        }
        .support-wrapper[data-theme="violet"] {
          --accent: #8B5CF6;
          --accent-hover: #7C3AED;
          --accent-light: rgba(139,92,246,0.1);
          --bg-primary: #0C0A14;
          --bg-secondary: #14101E;
          --bg-card: #1A1428;
          --border: #241E3A;
          --text-primary: #F1F0FF;
          --text-secondary: #7C72A8;
        }
        .support-wrapper[data-theme="emerald"] {
          --accent: #10B981;
          --accent-hover: #059669;
          --accent-light: rgba(16,185,129,0.1);
          --bg-primary: #0A0F0C;
          --bg-secondary: #101A14;
          --bg-card: #162220;
          --border: #1E3A30;
          --text-primary: #F0FFF8;
          --text-secondary: #6BAA88;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: var(--border);
          border-radius: 20px;
        }
      `}</style>

      <div 
        className="support-wrapper grid grid-cols-[200px_280px_1fr_240px] h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300"
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* Col 1: Sidebar */}
        <div className="bg-[var(--bg-secondary)] border-r border-[var(--border)] py-4 flex flex-col h-full">
          <div className="px-4 mb-5 flex items-center gap-2">
            <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z M4 10v4 m16-4v4" />
            </svg>
            <span className="font-bold text-lg text-[var(--accent)]">HelpDesk</span>
          </div>

          <nav className="px-2 space-y-1 flex-1">
            {navItems.map(item => (
              <div 
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`px-3 py-2 rounded-lg text-sm flex items-center justify-between cursor-pointer transition-colors ${
                  activeNav === item.id 
                    ? 'bg-[var(--accent-light)] text-[var(--accent)] font-medium' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-[var(--accent)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
          </nav>

          <div className="px-4 mt-auto">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--bg-card)] cursor-pointer transition-colors border border-transparent hover:border-[var(--border)]">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                  AS
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[var(--bg-secondary)]"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">Alex Support</div>
                <div className="text-xs text-[var(--text-secondary)]">Online</div>
              </div>
            </div>
          </div>
        </div>

        {/* Col 2: Ticket List */}
        <div className="bg-[var(--bg-primary)] border-r border-[var(--border)] flex flex-col h-full overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border)] flex justify-between items-center shrink-0">
            <h2 className="font-bold text-sm">Conversations</h2>
            <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {tickets.map(ticket => (
              <div 
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket.id)}
                className={`px-4 py-3 border-b border-[var(--border)]/30 cursor-pointer transition-colors ${
                  selectedTicket === ticket.id 
                    ? 'bg-[var(--accent-light)] border-l-2 border-l-[var(--accent)]' 
                    : 'hover:bg-[var(--bg-card)]/50 border-l-2 border-l-transparent'
                }`}
              >
                <div className="flex gap-3">
                  <div className="relative shrink-0">
                    <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                      {ticket.name.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className={`text-sm truncate pr-2 ${ticket.unread ? 'font-bold' : 'font-medium'}`}>
                        {ticket.name}
                      </h3>
                    </div>
                    <p className={`text-xs truncate mb-1.5 ${ticket.unread ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)]'}`}>
                      {ticket.message}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[var(--text-secondary)]">{ticket.time}</span>
                      <div className="flex items-center gap-2">
                        {ticket.unread && (
                          <div className="w-2 h-2 rounded-full bg-[var(--accent)]"></div>
                        )}
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(ticket.priority)}`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: Chat Area */}
        <div className="flex flex-col bg-[var(--bg-primary)] h-full overflow-hidden">
          {/* Chat Header */}
          <div className="px-5 py-3 border-b border-[var(--border)] flex justify-between items-center shrink-0 bg-[var(--bg-primary)]/90 backdrop-blur z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center text-sm font-bold text-white shadow-sm">
                SJ
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-[var(--text-primary)]">Sarah Johnson</h2>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-[var(--text-secondary)]">sarah@example.com</span>
                  <span className="bg-[var(--accent-light)] text-[var(--accent)] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">Premium Plan</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-lg hover:bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer border border-transparent hover:border-[var(--border)]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer border border-transparent hover:border-[var(--border)]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-4 space-y-4">
            
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-1">SJ</div>
              <div className="flex flex-col items-start max-w-md">
                <div className="bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] px-4 py-3 rounded-xl rounded-tl-none text-sm shadow-sm leading-relaxed">
                  Hi, I'm having an issue with my subscription billing. I was charged twice this month.
                </div>
                <span className="text-xs text-[var(--text-secondary)] mt-1 ml-1">7:08 AM</span>
              </div>
            </div>

            <div className="flex gap-3 flex-row-reverse">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-1">AS</div>
              <div className="flex flex-col items-end max-w-md">
                <div className="bg-[var(--accent-light)] border border-[var(--accent)]/20 text-[var(--text-primary)] px-4 py-3 rounded-xl rounded-tr-none text-sm shadow-sm leading-relaxed">
                  Hi Sarah! I'm sorry to hear about the double charge. Let me look into your account right away.
                </div>
                <span className="text-xs text-[var(--text-secondary)] mt-1 mr-1">7:10 AM</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-1">SJ</div>
              <div className="flex flex-col items-start max-w-md">
                <div className="bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] px-4 py-3 rounded-xl rounded-tl-none text-sm shadow-sm leading-relaxed">
                  Thank you. My account email is sarah@example.com
                </div>
                <span className="text-xs text-[var(--text-secondary)] mt-1 ml-1">7:11 AM</span>
              </div>
            </div>

            <div className="flex gap-3 flex-row-reverse">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-1">AS</div>
              <div className="flex flex-col items-end max-w-md">
                <div className="bg-[var(--accent-light)] border border-[var(--accent)]/20 text-[var(--text-primary)] px-4 py-3 rounded-xl rounded-tr-none text-sm shadow-sm leading-relaxed">
                  I can see the duplicate charge of $29.99. I've initiated a refund that should appear in 3-5 business days.
                </div>
                <span className="text-xs text-[var(--text-secondary)] mt-1 mr-1">7:15 AM</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-1">SJ</div>
              <div className="flex flex-col items-start max-w-md">
                <div className="bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] px-4 py-3 rounded-xl rounded-tl-none text-sm shadow-sm leading-relaxed">
                  That's great! Will I still have access to my premium features?
                </div>
                <span className="text-xs text-[var(--text-secondary)] mt-1 ml-1">7:16 AM</span>
              </div>
            </div>

            <div className="flex gap-3 flex-row-reverse">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-1">AS</div>
              <div className="flex flex-col items-end max-w-md">
                <div className="bg-[var(--accent-light)] border border-[var(--accent)]/20 text-[var(--text-primary)] px-4 py-3 rounded-xl rounded-tr-none text-sm shadow-sm leading-relaxed">
                  Absolutely! Your Premium Plan remains active. Is there anything else I can help with?
                </div>
                <span className="text-xs text-[var(--text-secondary)] mt-1 mr-1">7:18 AM</span>
              </div>
            </div>

          </div>

          {/* Input */}
          <div className="px-5 py-3 border-t border-[var(--border)] flex items-center gap-3 shrink-0">
            <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            
            <input 
              type="text" 
              placeholder="Type your reply..." 
              className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--accent)] transition-colors text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
            />
            
            <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl px-5 py-2.5 text-sm transition-colors cursor-pointer shrink-0 shadow-sm">
              Send
            </button>
          </div>
        </div>

        {/* Col 4: Details Panel */}
        <div className="bg-[var(--bg-secondary)] border-l border-[var(--border)] overflow-y-auto custom-scrollbar p-5 h-full">
          <h2 className="font-bold text-sm mb-4">Ticket Details</h2>
          
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Priority</span>
              <div className="flex items-center gap-1.5 font-medium">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                High
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Category</span>
              <span className="font-medium">Billing</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Status</span>
              <span className="bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold px-2 py-0.5 rounded uppercase">
                Open
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Created</span>
              <span className="font-medium">Oct 15, 2023</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Ticket ID</span>
              <span className="font-medium">#TK-1024</span>
            </div>
          </div>
          
          <div className="h-px bg-[var(--border)] my-5"></div>
          
          <div>
            <h3 className="text-xs uppercase font-bold text-[var(--text-secondary)] mb-3">Assigned To</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                  AS
                </div>
                <span className="text-sm font-medium">Alex S.</span>
              </div>
              <a href="#" className="text-xs text-[var(--accent)] hover:underline">Reassign</a>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xs uppercase font-bold text-[var(--text-secondary)] mb-3">Customer Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-[var(--text-secondary)] text-xs">Email</span>
                <span className="font-medium truncate">sarah@example.com</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[var(--text-secondary)] text-xs">Plan</span>
                <span className="font-medium">Premium</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[var(--text-secondary)] text-xs">Member Since</span>
                <span className="font-medium">Jan 2022</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[var(--text-secondary)] text-xs">Total Tickets</span>
                <span className="font-medium">8</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xs uppercase font-bold text-[var(--text-secondary)] mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[var(--bg-card)] border border-[var(--border)] text-xs px-2.5 py-1 rounded-full text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)] cursor-pointer transition-colors">
                billing
              </span>
              <span className="bg-[var(--bg-card)] border border-[var(--border)] text-xs px-2.5 py-1 rounded-full text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)] cursor-pointer transition-colors">
                refund
              </span>
              <span className="bg-[var(--bg-card)] border border-[var(--border)] text-xs px-2.5 py-1 rounded-full text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)] cursor-pointer transition-colors">
                premium
              </span>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xs uppercase font-bold text-[var(--text-secondary)] mb-3">Internal Notes</h3>
            <textarea 
              className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-3 text-xs h-20 outline-none focus:border-[var(--accent)] transition-colors text-[var(--text-primary)] placeholder-[var(--text-secondary)] resize-none"
              placeholder="Add an internal note..."
            ></textarea>
            <button className="w-full mt-2 bg-[var(--bg-card)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)] border border-[var(--border)] hover:border-[var(--accent)]/50 text-[var(--text-primary)] text-xs font-medium rounded-lg py-2 transition-colors cursor-pointer shadow-sm">
              Add Note
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
}
