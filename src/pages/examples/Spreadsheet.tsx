import { useState, useEffect } from 'react'

type Variant = 'green' | 'blue' | 'violet'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#22C55E': 'green',
  '#3B82F6': 'blue',
  '#8B5CF6': 'violet',
}

const THEMES: Record<Variant, Record<string, string>> = {
  green: {
    '--accent': '#22C55E', '--accent-hover': '#16A34A', '--accent-light': 'rgba(34,197,94,0.08)',
    '--bg-primary': '#FFFFFF', '--bg-secondary': '#F0FFF4', '--bg-card': '#FFFFFF',
    '--border': '#BBF7D0', '--text-primary': '#0F172A', '--text-secondary': '#64748B',
  },
  blue: {
    '--accent': '#3B82F6', '--accent-hover': '#2563EB', '--accent-light': 'rgba(59,130,246,0.08)',
    '--bg-primary': '#FFFFFF', '--bg-secondary': '#F0F5FF', '--bg-card': '#FFFFFF',
    '--border': '#DBEAFE', '--text-primary': '#0F172A', '--text-secondary': '#64748B',
  },
  violet: {
    '--accent': '#8B5CF6', '--accent-hover': '#7C3AED', '--accent-light': 'rgba(139,92,246,0.08)',
    '--bg-primary': '#FFFFFF', '--bg-secondary': '#FAF8FF', '--bg-card': '#FFFFFF',
    '--border': '#E8E0F0', '--text-primary': '#1A1A2E', '--text-secondary': '#7A6AAA',
  },
}

const colHeaders = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const defaultData: string[][] = [
  ['Product', 'Category', 'Q1 Sales', 'Q2 Sales', 'Q3 Sales', 'Q4 Sales', 'Total', 'Growth'],
  ['Widget Pro', 'Electronics', '$12,450', '$14,200', '$15,800', '$18,500', '$60,950', '+12.4%'],
  ['DataSync', 'Software', '$8,900', '$9,500', '$11,200', '$13,800', '$43,400', '+18.2%'],
  ['CloudBox', 'Storage', '$5,200', '$6,100', '$7,400', '$8,900', '$27,600', '+22.1%'],
  ['SecureNet', 'Security', '$15,600', '$16,800', '$17,200', '$19,100', '$68,700', '+8.5%'],
  ['AppForge', 'Dev Tools', '$3,400', '$4,200', '$5,600', '$7,800', '$21,000', '+32.6%'],
  ['FlowBoard', 'Project Mgmt', '$7,100', '$8,300', '$9,100', '$10,500', '$35,000', '+15.3%'],
  ['PixelEdit', 'Design', '$4,800', '$5,400', '$6,200', '$7,600', '$24,000', '+20.8%'],
  ['ChatPulse', 'Messaging', '$9,300', '$10,100', '$11,800', '$14,200', '$45,400', '+17.9%'],
  ['PayStream', 'Fintech', '$11,200', '$12,500', '$14,100', '$16,800', '$54,600', '+14.1%'],
  ['HealthTrack', 'Wellness', '$2,800', '$3,500', '$4,800', '$6,200', '$17,300', '+28.5%'],
]

const tabNames = ['Sales Data', 'Q4 Report', 'Summary']

export function Spreadsheet({ variant = 'green' }: { variant?: Variant }) {
  const [selectedCell, setSelectedCell] = useState<[number, number]>([1, 2])
  const [activeTab, setActiveTab] = useState('Sales Data')
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
        .sheet-wrapper { font-family: ${customFont || "'Inter', sans-serif"}; }
        .sheet-wrapper * { box-sizing: border-box; }
        .sheet-wrapper ::-webkit-scrollbar { width: 8px; height: 8px; }
        .sheet-wrapper ::-webkit-scrollbar-track { background: var(--bg-secondary); }
        .sheet-wrapper ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
      `}</style>
      <div className="sheet-wrapper h-screen flex flex-col overflow-hidden" style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }} data-theme={currentTheme}>
        {/* Toolbar */}
        <div className="px-4 py-2 border-b flex items-center gap-3" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="var(--accent)" viewBox="0 0 24 24"><path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z"/></svg>
            <span className="font-bold text-sm" style={{ color: 'var(--accent)' }}>GridFlow</span>
          </div>
          <div className="h-5 w-px mx-1" style={{ background: 'var(--border)' }} />
          {/* Format buttons */}
          <div className="flex items-center gap-0.5">
            {['B', 'I', 'U'].map(f => (
              <button key={f} className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold cursor-pointer hover:opacity-80 border" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                {f}
              </button>
            ))}
          </div>
          <div className="h-5 w-px mx-1" style={{ background: 'var(--border)' }} />
          {/* Alignment */}
          <div className="flex items-center gap-0.5">
            {[
              'M4 6h16M4 12h8m-8 6h16',
              'M4 6h16M4 12h16M4 18h16',
              'M4 6h16M12 12h8M4 18h16',
            ].map((d, i) => (
              <button key={i} className="w-7 h-7 rounded flex items-center justify-center cursor-pointer hover:opacity-80 border" style={{ borderColor: 'var(--border)' }}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="var(--text-secondary)" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={d}/></svg>
              </button>
            ))}
          </div>
          <div className="h-5 w-px mx-1" style={{ background: 'var(--border)' }} />
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded border cursor-pointer" style={{ background: 'var(--accent)', borderColor: 'var(--border)' }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Fill</span>
          </div>
          <div className="flex-1" />
          {/* Cell reference */}
          <div className="px-2 py-1 rounded border text-xs font-mono" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            {colHeaders[selectedCell[1]]}{selectedCell[0] + 1}
          </div>
          {/* Formula bar */}
          <div className="flex-1 max-w-xs px-2 py-1 rounded border text-xs" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>fx</span> {defaultData[selectedCell[0]]?.[selectedCell[1]] || ''}
          </div>
        </div>

        {/* Spreadsheet Grid */}
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse" style={{ minWidth: 900 }}>
            <thead>
              <tr>
                <th className="sticky top-0 left-0 z-20 w-10 text-xs border-b border-r" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }} />
                {colHeaders.map(h => (
                  <th key={h} className="sticky top-0 z-10 px-3 py-2 text-xs font-semibold text-center border-b border-r min-w-[120px]" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {defaultData.map((row, ri) => (
                <tr key={ri}>
                  <td className="sticky left-0 z-10 px-2 py-1.5 text-xs text-center border-b border-r font-medium" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                    {ri + 1}
                  </td>
                  {row.map((cell, ci) => {
                    const isSelected = selectedCell[0] === ri && selectedCell[1] === ci
                    const isHeader = ri === 0
                    const isGrowth = ci === 7 && ri > 0
                    return (
                      <td key={ci} onClick={() => setSelectedCell([ri, ci])}
                        className="px-3 py-1.5 text-xs border-b border-r cursor-pointer transition-colors"
                        style={{
                          borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                          background: isSelected ? 'var(--accent-light)' : isHeader ? 'var(--bg-secondary)' : 'var(--bg-card)',
                          fontWeight: isHeader ? 700 : ci === 6 ? 600 : 400,
                          color: isGrowth ? (cell.startsWith('+') ? '#22C55E' : '#EF4444') : isHeader ? 'var(--text-primary)' : 'var(--text-primary)',
                          outline: isSelected ? '2px solid var(--accent)' : 'none',
                          outlineOffset: -1,
                        }}>
                        {cell}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom: Sheet tabs + status */}
        <div className="flex items-center border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
          <button className="px-2 py-1.5 border-r cursor-pointer" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          </button>
          {tabNames.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-4 py-2 text-xs border-r cursor-pointer"
              style={{
                borderColor: 'var(--border)',
                background: activeTab === tab ? 'var(--bg-card)' : 'transparent',
                color: activeTab === tab ? 'var(--accent)' : 'var(--text-secondary)',
                fontWeight: activeTab === tab ? 600 : 400,
                borderBottom: activeTab === tab ? '2px solid var(--accent)' : '2px solid transparent',
              }}>
              {tab}
            </button>
          ))}
          <div className="flex-1" />
          <div className="px-4 py-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
            Sum: $398,950 · Avg: $39,895 · Count: 10
          </div>
        </div>
      </div>
    </>
  )
}
