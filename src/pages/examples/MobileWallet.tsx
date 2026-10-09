import { useState, useEffect } from 'react'

type Variant = 'blue' | 'violet' | 'emerald'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#3B82F6': 'blue',
  '#8B5CF6': 'violet',
  '#10B981': 'emerald',
}

const THEMES: Record<Variant, Record<string, string>> = {
  blue: {
    '--accent': '#3B82F6', '--accent-hover': '#2563EB', '--accent-light': 'rgba(59,130,246,0.08)',
    '--bg-primary': '#0C1220', '--bg-secondary': '#111828', '--bg-card': '#1A2236',
    '--border': '#1E2E42', '--text-primary': '#F1F5F9', '--text-secondary': '#64748B',
  },
  violet: {
    '--accent': '#8B5CF6', '--accent-hover': '#7C3AED', '--accent-light': 'rgba(139,92,246,0.08)',
    '--bg-primary': '#0C0A14', '--bg-secondary': '#14101E', '--bg-card': '#1A1428',
    '--border': '#241E3A', '--text-primary': '#F1F0FF', '--text-secondary': '#7C72A8',
  },
  emerald: {
    '--accent': '#10B981', '--accent-hover': '#059669', '--accent-light': 'rgba(16,185,129,0.08)',
    '--bg-primary': '#0A0F0C', '--bg-secondary': '#101A14', '--bg-card': '#162220',
    '--border': '#1E3A30', '--text-primary': '#F0FFF8', '--text-secondary': '#6BAA88',
  },
}

const cards = [
  { name: 'Main Card', number: '•••• •••• •••• 4829', balance: '$12,458.50', type: 'Visa', gradient: 'linear-gradient(135deg, var(--accent), var(--accent-hover))' },
  { name: 'Savings', number: '•••• •••• •••• 7162', balance: '$34,220.00', type: 'Mastercard', gradient: 'linear-gradient(135deg, #8B5CF6, #6366F1)' },
]

const transactions = [
  { name: 'Spotify Premium', category: 'Entertainment', amount: '-$9.99', time: 'Today, 2:30 PM', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z' },
  { name: 'Salary Deposit', category: 'Income', amount: '+$4,500.00', time: 'Today, 9:00 AM', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { name: 'Amazon Purchase', category: 'Shopping', amount: '-$67.50', time: 'Yesterday', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  { name: 'Uber Ride', category: 'Transport', amount: '-$23.40', time: 'Yesterday', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
  { name: 'Freelance Payment', category: 'Income', amount: '+$850.00', time: 'Oct 3', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
]

const quickActions = [
  { name: 'Send', icon: 'M12 19V5m0 0l-7 7m7-7l7 7' },
  { name: 'Request', icon: 'M12 5v14m0 0l7-7m-7 7l-7-7' },
  { name: 'Pay', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { name: 'Top Up', icon: 'M12 4v16m8-8H4' },
]

const bottomTabs = [
  { name: 'Home', path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Cards', path: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { name: 'Activity', path: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { name: 'Profile', path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
]

export function MobileWallet({ variant = 'blue' }: { variant?: Variant }) {
  const [activeCard, setActiveCard] = useState(0)
  const [activeTab, setActiveTab] = useState('Home')
  const [customFont, setCustomFont] = useState('')
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'SET_THEME_VARIATION') {
        const accent = e.data.variation?.accent;
        if (accent) {
          const v = ACCENT_TO_THEME[accent.toUpperCase()] || ACCENT_TO_THEME[accent];
          if (v) setCurrentTheme(v);
        }
        if (e.data.variation?.font) setCustomFont(e.data.variation.font);
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  const theme = THEMES[currentTheme]
  const cssVars = Object.entries(theme).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Record<string, string>)

  return (
    <>
      <style>{`
        .wallet-wrapper { font-family: ${customFont || "'Inter', sans-serif"}; }
        .wallet-wrapper * { box-sizing: border-box; }
        .wallet-wrapper ::-webkit-scrollbar { display: none; }
      `}</style>
      <div className="wallet-wrapper max-w-[390px] mx-auto min-h-screen relative" style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }} data-theme={currentTheme}>
        {/* Header */}
        <div className="px-5 pt-5 flex justify-between items-center">
          <div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Welcome back</div>
            <div className="font-bold text-lg mt-0.5">My Wallet</div>
          </div>
          <div className="relative cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="var(--text-secondary)" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full" style={{ background: '#EF4444' }} />
          </div>
        </div>

        {/* Card Carousel */}
        <div className="px-5 mt-5">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {cards.map((card, i) => (
              <div key={i} onClick={() => setActiveCard(i)}
                className="min-w-[300px] rounded-2xl p-5 cursor-pointer relative overflow-hidden transition-transform"
                style={{ background: card.gradient, transform: activeCard === i ? 'scale(1)' : 'scale(0.95)', opacity: activeCard === i ? 1 : 0.7 }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', transform: 'translate(30%, -30%)' }} />
                <div className="flex justify-between items-start">
                  <div className="text-white/60 text-xs">{card.name}</div>
                  <div className="text-white font-bold text-sm">{card.type}</div>
                </div>
                <div className="text-white font-bold text-2xl mt-6">{card.balance}</div>
                <div className="text-white/70 text-sm mt-4 tracking-wider font-mono">{card.number}</div>
              </div>
            ))}
          </div>
          {/* Card dots */}
          <div className="flex justify-center gap-1.5 mt-2">
            {cards.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full transition-colors" style={{ background: activeCard === i ? 'var(--accent)' : 'var(--border)' }} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-5 mt-5 flex justify-around">
          {quickActions.map(action => (
            <button key={action.name} className="flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-light)' }}>
                <svg className="w-5 h-5" fill="none" stroke="var(--accent)" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={action.icon}/></svg>
              </div>
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{action.name}</span>
            </button>
          ))}
        </div>

        {/* Transactions */}
        <div className="px-5 mt-6 pb-24">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-base">Recent Transactions</span>
            <span className="text-xs cursor-pointer" style={{ color: 'var(--accent)' }}>See All</span>
          </div>
          <div className="space-y-2.5">
            {transactions.map(tx => (
              <div key={tx.name} className="flex items-center gap-3 rounded-xl p-3 cursor-pointer" style={{ background: 'var(--bg-card)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: tx.amount.startsWith('+') ? 'rgba(16,185,129,0.1)' : 'var(--accent-light)' }}>
                  <svg className="w-5 h-5" fill="none" stroke={tx.amount.startsWith('+') ? '#10B981' : 'var(--accent)'} strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={tx.icon}/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{tx.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{tx.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm" style={{ color: tx.amount.startsWith('+') ? '#10B981' : 'var(--text-primary)' }}>{tx.amount}</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{tx.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] border-t z-50 backdrop-blur-md" style={{ background: 'rgba(12,18,32,0.95)', borderColor: 'var(--border)' }}>
          <div className="flex justify-around py-2">
            {bottomTabs.map(tab => (
              <button key={tab.name} onClick={() => setActiveTab(tab.name)}
                className="flex flex-col items-center gap-0.5 cursor-pointer"
                style={{ color: activeTab === tab.name ? 'var(--accent)' : 'var(--text-secondary)' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={tab.path}/></svg>
                <span className="text-xs">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
