import { useState, useEffect } from 'react'

type Variant = 'blue' | 'violet' | 'emerald';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#3B82F6': 'blue',
  '#8B5CF6': 'violet',
  '#10B981': 'emerald',
};

export function ChatApp({ variant = 'blue' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  
  const [activeConvo, setActiveConvo] = useState(1);

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
      
      const themeName = ACCENT_TO_THEME[variation.accent.toUpperCase()] || ACCENT_TO_THEME[variation.accent];
      if (themeName) { 
        setActiveTheme(themeName); 
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const conversations = [
    { id: 1, name: "Project Apollo", type: "group", lastMsg: "Okay, reviewing now...", time: "10:32 AM", unread: 3 },
    { id: 2, name: "Design Sync", type: "group", lastMsg: "Great job on the mockups!", time: "10:32 AM", unread: 1 },
    { id: 3, name: "Marketing Sync", type: "channel", lastMsg: "Replied", time: "9:55 AM", unread: 0 },
    { id: 4, name: "Sarah Jenkins", type: "dm", lastMsg: "Okay, reviewing now...", time: "10:32 AM", unread: 5 },
    { id: 5, name: "Dave Thompson", type: "dm", lastMsg: "Great job on the mockups!", time: "10:32 AM", unread: 0 },
    { id: 6, name: "#general", type: "channel", lastMsg: "Great job on the mockups!", time: "9:55 AM", unread: 0 },
    { id: 7, name: "Alice Green", type: "dm", lastMsg: "Great job on the mockups!", time: "9:55 AM", unread: 2 },
    { id: 8, name: "Alex Chen", type: "dm", lastMsg: "Okay, job on the mockups!", time: "9:55 AM", unread: 0 },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .chat-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .chat-wrapper[data-theme="blue"] {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-light: rgba(59,130,246,0.12);
          --bg-primary: #0B0E14;
          --bg-secondary: #111822;
          --bg-card: #161E2A;
          --bg-message: #1A2436;
          --border: #1E2A3A;
          --text-primary: #F1F5F9;
          --text-secondary: #64748B;
        }
        .chat-wrapper[data-theme="violet"] {
          --accent: #8B5CF6;
          --accent-hover: #7C3AED;
          --accent-light: rgba(139,92,246,0.12);
          --bg-primary: #0C0A14;
          --bg-secondary: #14101E;
          --bg-card: #1A1428;
          --bg-message: #201836;
          --border: #241E3A;
          --text-primary: #F1F0FF;
          --text-secondary: #7C72A8;
        }
        .chat-wrapper[data-theme="emerald"] {
          --accent: #10B981;
          --accent-hover: #059669;
          --accent-light: rgba(16,185,129,0.12);
          --bg-primary: #080E0C;
          --bg-secondary: #0E1816;
          --bg-card: #142220;
          --bg-message: #1A2E2A;
          --border: #1E3630;
          --text-primary: #F0FFF5;
          --text-secondary: #5A8A78;
        }
        
        @keyframes typing {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
        
        .typing-dot {
          animation: typing 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        
        /* Custom scrollbar for chat */
        .chat-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .chat-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background-color: var(--border);
          border-radius: 20px;
        }
      `}</style>

      <div 
        className="chat-wrapper grid grid-cols-[72px_280px_1fr_300px] h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300"
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        
        {/* Col 1: Icon Sidebar */}
        <div className="w-[72px] bg-[var(--bg-secondary)] border-r border-[var(--border)] py-4 flex flex-col items-center">
          <div className="w-10 h-10 bg-[var(--accent)] rounded-xl flex items-center justify-center font-bold text-white mb-4">
            TC
          </div>
          
          <div className="w-8 h-px bg-[var(--border)] mb-4"></div>
          
          <div className="flex flex-col gap-2 w-full px-4 items-center">
            <button className="w-10 h-10 rounded-xl bg-[var(--accent-light)] flex items-center justify-center cursor-pointer transition-colors text-[var(--accent)]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </button>
            <button className="w-10 h-10 rounded-xl hover:bg-[var(--bg-card)] flex items-center justify-center cursor-pointer transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </button>
            <button className="w-10 h-10 rounded-xl hover:bg-[var(--bg-card)] flex items-center justify-center cursor-pointer transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </button>
            <button className="w-10 h-10 rounded-xl hover:bg-[var(--bg-card)] flex items-center justify-center cursor-pointer transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-[var(--bg-secondary)]"></span>
            </button>
            <button className="w-10 h-10 rounded-xl hover:bg-[var(--bg-card)] flex items-center justify-center cursor-pointer transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>
          </div>
          
          <div className="mt-auto">
            <div className="w-10 h-10 rounded-full border-2 border-[var(--accent)] flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 text-xs font-bold text-white cursor-pointer hover:opacity-80 transition-opacity">
              AK
            </div>
          </div>
        </div>

        {/* Col 2: Conversation List */}
        <div className="w-[280px] bg-[var(--bg-secondary)] border-r border-[var(--border)] flex flex-col">
          <div className="px-4 py-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Messages</h2>
            <button className="w-8 h-8 rounded-full bg-[var(--bg-card)] hover:bg-[var(--border)] flex items-center justify-center transition-colors cursor-pointer text-[var(--text-primary)]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
          </div>
          
          <div className="mx-3 my-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-2 flex items-center gap-2 focus-within:border-[var(--accent)] transition-colors">
            <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Search..." className="bg-transparent text-sm w-full outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)]" />
          </div>
          
          <div className="flex-1 overflow-y-auto chat-scroll mt-2">
            {conversations.map((c) => (
              <div 
                key={c.id} 
                onClick={() => setActiveConvo(c.id)}
                className={`px-3 py-3 cursor-pointer border-b border-[var(--border)]/30 flex items-center gap-3 transition-colors ${
                  activeConvo === c.id 
                    ? 'bg-[var(--accent-light)] border-l-2 border-l-[var(--accent)]' 
                    : 'hover:bg-[var(--bg-card)] border-l-2 border-l-transparent'
                }`}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-800 flex items-center justify-center text-xs font-bold text-white shadow-sm shrink-0">
                    {c.name.substring(0, 2).toUpperCase()}
                  </div>
                  {c.id % 2 === 0 && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[var(--bg-secondary)]"></div>}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-sm truncate pr-2">{c.name}</h3>
                    <span className="text-xs text-[var(--text-secondary)] shrink-0">{c.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={`text-xs truncate ${c.unread > 0 ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)]'}`}>
                      {c.lastMsg}
                    </p>
                    {c.unread > 0 && (
                      <span className="ml-2 w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: Chat Area */}
        <div className="flex-1 flex flex-col bg-[var(--bg-primary)] min-w-0">
          
          {/* Chat Header */}
          <div className="px-6 py-3 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg-primary)]/90 backdrop-blur z-10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 border-2 border-[var(--bg-primary)] flex items-center justify-center text-xs font-bold text-white shadow-sm">PR</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-purple-400 border-2 border-[var(--bg-primary)] flex items-center justify-center text-xs font-bold text-white shadow-sm">MC</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-600 to-pink-400 border-2 border-[var(--bg-primary)] flex items-center justify-center text-xs font-bold text-white shadow-sm">+3</div>
              </div>
              <div>
                <h2 className="font-bold text-[var(--text-primary)]">Project Apollo</h2>
                <div className="text-[var(--text-secondary)] text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  5 members | Online
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 rounded-lg hover:bg-[var(--bg-card)] flex items-center justify-center transition-colors cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </button>
              <button className="w-9 h-9 rounded-lg hover:bg-[var(--bg-card)] flex items-center justify-center transition-colors cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </button>
              <div className="w-px h-5 bg-[var(--border)] mx-1"></div>
              <button className="w-9 h-9 rounded-lg hover:bg-[var(--bg-card)] flex items-center justify-center transition-colors cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto chat-scroll px-6 py-4 flex flex-col gap-6">
            
            {/* Msg 1 */}
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-1">MC</div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-bold text-sm">Mark Chen</span>
                  <span className="text-xs text-[var(--text-secondary)]">10:15 AM</span>
                </div>
                <div className="bg-[var(--bg-message)] text-[var(--text-primary)] px-4 py-3 rounded-2xl rounded-tl-sm text-sm border border-[var(--border)]/50 shadow-sm leading-relaxed">
                  Hi team! We need to finalize the Q3 milestones by EOD.
                </div>
              </div>
            </div>

            {/* Msg 2 (Sent) */}
            <div className="flex gap-3 max-w-[85%] self-end flex-row-reverse">
              <div className="w-8 h-8 rounded-full border-2 border-[var(--accent)] flex items-center justify-center bg-gray-800 text-[10px] font-bold text-white shrink-0 mt-1">AK</div>
              <div className="flex flex-col items-end">
                <div className="flex items-baseline gap-2 mb-1 flex-row-reverse">
                  <span className="font-bold text-sm">Sarah Jenkins</span>
                  <span className="text-xs text-[var(--text-secondary)]">10:16 AM</span>
                </div>
                <div className="bg-[var(--accent)] text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm shadow-sm leading-relaxed">
                  On it! I'm reviewing the spreadsheet now.
                </div>
                <div className="flex gap-1.5 mt-1.5 justify-end">
                  <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-full px-2 py-0.5 text-xs flex items-center gap-1 cursor-pointer hover:border-[var(--accent)]/50 transition-colors">
                    <span>👍</span> <span className="text-[var(--text-secondary)] font-medium">3</span>
                  </div>
                  <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-full px-2 py-0.5 text-xs flex items-center gap-1 cursor-pointer hover:border-[var(--accent)]/50 transition-colors">
                    <span>❤️</span> <span className="text-[var(--text-secondary)] font-medium">2</span>
                  </div>
                  <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-full px-2 py-0.5 text-xs flex items-center gap-1 cursor-pointer hover:border-[var(--accent)]/50 transition-colors">
                    <span>😄</span> <span className="text-[var(--text-secondary)] font-medium">1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Msg 3 */}
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-1">SJ</div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-bold text-sm">Sarah</span>
                  <span className="text-xs text-[var(--text-secondary)]">10:17 AM</span>
                </div>
                <div className="bg-[var(--bg-message)] text-[var(--text-primary)] px-4 py-3 rounded-2xl rounded-tl-sm text-sm border border-[var(--border)]/50 shadow-sm leading-relaxed mb-2">
                  I think we can push the deployment date slightly.
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[var(--accent)] hover:underline cursor-pointer">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                  Reply thread: 2 replies
                </div>
              </div>
            </div>

            {/* Msg 4 */}
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-1">AC</div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-bold text-sm">Alex Chen</span>
                  <span className="text-xs text-[var(--text-secondary)]">10:18 AM</span>
                </div>
                <div className="bg-[var(--bg-message)] text-[var(--text-primary)] px-4 py-3 rounded-2xl rounded-tl-sm text-sm border border-[var(--border)]/50 shadow-sm leading-relaxed">
                  Agree, let's keep it realistic.
                </div>
              </div>
            </div>

            {/* Msg 5 (System) */}
            <div className="flex justify-center my-2">
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-full px-4 py-1.5 text-xs text-[var(--text-secondary)] font-medium">
                Dave Thompson joined the conversation
              </div>
            </div>

            {/* Msg 6 (File Attachment) */}
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-1">MC</div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-bold text-sm">Mark Chen</span>
                  <span className="text-xs text-[var(--text-secondary)]">10:22 AM</span>
                </div>
                <div className="bg-[var(--bg-message)] text-[var(--text-primary)] px-4 py-3 rounded-2xl rounded-tl-sm text-sm border border-[var(--border)]/50 shadow-sm leading-relaxed mb-2">
                  Here's the updated timeline:
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-3 flex items-center gap-3 w-64 hover:border-[var(--accent)]/50 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded bg-[var(--bg-primary)] flex items-center justify-center text-red-400 group-hover:text-red-500 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6M9 17h6M13 9V3" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate group-hover:text-[var(--accent)] transition-colors">Q3_Roadmap_v2.pdf</div>
                    <div className="text-xs text-[var(--text-secondary)]">2.4 MB</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Msg 7 (Typing) */}
            <div className="flex gap-3 max-w-[85%] items-center mt-2">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">SJ</div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] italic">
                Sarah is typing
                <div className="flex gap-1 bg-[var(--bg-card)] px-2 py-1.5 rounded-full border border-[var(--border)]/50">
                  <div className="w-1 h-1 bg-[var(--text-secondary)] rounded-full typing-dot"></div>
                  <div className="w-1 h-1 bg-[var(--text-secondary)] rounded-full typing-dot"></div>
                  <div className="w-1 h-1 bg-[var(--text-secondary)] rounded-full typing-dot"></div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Message Input */}
          <div className="px-6 py-4 border-t border-[var(--border)] shrink-0">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex items-center px-3 gap-2 focus-within:border-[var(--accent)] transition-colors shadow-sm">
              <button className="w-8 h-8 rounded-lg hover:bg-[var(--bg-primary)] flex items-center justify-center transition-colors cursor-pointer text-[var(--text-secondary)] hover:text-[var(--accent)] shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              </button>
              
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 bg-transparent text-sm py-3.5 outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)]" 
              />
              
              <button className="w-8 h-8 rounded-lg hover:bg-[var(--bg-primary)] flex items-center justify-center transition-colors cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)] shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </button>
              
              <div className="h-6 flex items-center px-2 border border-[var(--border)] rounded text-[10px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] cursor-pointer transition-colors uppercase shrink-0">
                GIF
              </div>
              
              <button className="w-8 h-8 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] flex items-center justify-center transition-colors cursor-pointer text-white shrink-0 shadow-sm ml-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
          
        </div>

        {/* Col 4: Details Panel */}
        <div className="w-[300px] bg-[var(--bg-secondary)] border-l border-[var(--border)] overflow-y-auto chat-scroll flex flex-col">
          
          {/* User Profile */}
          <div className="p-6 border-b border-[var(--border)] text-center relative">
            <button className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto flex items-center justify-center text-xl font-bold text-white shadow-lg mb-3 relative">
              PA
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--bg-secondary)]"></div>
            </div>
            
            <h2 className="font-bold text-lg text-[var(--text-primary)]">Project Apollo</h2>
            <div className="flex items-center justify-center gap-1.5 mt-1 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-[var(--text-secondary)] font-medium">Online</span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm mt-2">Product Design Team</p>
          </div>

          {/* Shared Files */}
          <div className="p-5 border-b border-[var(--border)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs uppercase font-bold text-[var(--text-secondary)] tracking-wider">Shared Files</h3>
              <a href="#" className="text-xs text-[var(--accent)] hover:underline">View All</a>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="w-8 h-8 rounded bg-[var(--bg-primary)] flex items-center justify-center text-red-400 group-hover:bg-[var(--accent-light)] group-hover:text-[var(--accent)] transition-colors shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6M9 17h6M13 9V3" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate group-hover:text-[var(--accent)] transition-colors">Product_Mockups_V3.pdf</div>
                  <div className="text-xs text-[var(--text-secondary)]">4.2 MB</div>
                </div>
              </div>
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="w-8 h-8 rounded bg-[var(--bg-primary)] flex items-center justify-center text-orange-400 group-hover:bg-[var(--accent-light)] group-hover:text-[var(--accent)] transition-colors shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6M9 17h6M13 9V3" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate group-hover:text-[var(--accent)] transition-colors">Launch_Strategy.pptx</div>
                  <div className="text-xs text-[var(--text-secondary)]">8.1 MB</div>
                </div>
              </div>
            </div>
          </div>

          {/* Shared Links */}
          <div className="p-5 border-b border-[var(--border)]">
            <h3 className="text-xs uppercase font-bold text-[var(--text-secondary)] tracking-wider mb-4">Shared Links</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--accent)] group-hover:bg-[var(--accent-light)] transition-colors shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                </div>
                <a href="#" className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] hover:underline truncate">linear.app/task123</a>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--accent)] group-hover:bg-[var(--accent-light)] transition-colors shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                </div>
                <a href="#" className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] hover:underline truncate">design-system.io</a>
              </div>
            </div>
          </div>

          {/* Pinned Messages */}
          <div className="p-5 border-b border-[var(--border)]">
            <h3 className="text-xs uppercase font-bold text-[var(--text-secondary)] tracking-wider mb-4">Pinned Messages</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border)] hover:border-[var(--accent)]/50 transition-colors cursor-pointer group">
                <svg className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--text-primary)] line-clamp-2">"Q3 Roadmap finalized"</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border)] hover:border-[var(--accent)]/50 transition-colors cursor-pointer group">
                <svg className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--text-primary)] line-clamp-2">"Team Meeting Notes"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Members */}
          <div className="p-5 pb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs uppercase font-bold text-[var(--text-secondary)] tracking-wider">Members</h3>
              <span className="bg-[var(--bg-primary)] text-[var(--text-secondary)] text-xs font-bold px-2 py-0.5 rounded border border-[var(--border)]">5</span>
            </div>
            
            <div className="mb-4">
              <div className="text-[10px] uppercase font-bold text-[var(--accent)] mb-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span> Online (3)
              </div>
              <div className="space-y-3 pl-1">
                <div className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white relative">
                    MC
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[var(--bg-secondary)]"></div>
                  </div>
                  <span className="text-sm font-medium group-hover:text-[var(--accent)] transition-colors">Mark Chen</span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white relative">
                    SJ
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[var(--bg-secondary)]"></div>
                  </div>
                  <span className="text-sm font-medium group-hover:text-[var(--accent)] transition-colors">Sarah Jenkins</span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-[10px] font-bold text-white relative">
                    AC
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[var(--bg-secondary)]"></div>
                  </div>
                  <span className="text-sm font-medium group-hover:text-[var(--accent)] transition-colors">Alex Chen</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-[10px] uppercase font-bold text-[var(--text-secondary)] mb-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-secondary)]"></span> Offline (2)
              </div>
              <div className="space-y-3 pl-1 opacity-60">
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-[10px] font-bold text-white relative grayscale">
                    DT
                  </div>
                  <span className="text-sm font-medium">Dave Thompson</span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-[10px] font-bold text-white relative grayscale">
                    AG
                  </div>
                  <span className="text-sm font-medium">Alice Green</span>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </>
  );
}
