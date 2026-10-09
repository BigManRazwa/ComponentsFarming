import { useState, useEffect } from 'react'

type Variant = 'blue' | 'emerald' | 'amber'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#3B82F6': 'blue',
  '#10B981': 'emerald',
  '#F59E0B': 'amber',
}

const THEMES: Record<Variant, Record<string, string>> = {
  blue: {
    '--accent': '#3B82F6', '--accent-hover': '#2563EB', '--accent-light': 'rgba(59,130,246,0.12)',
    '--bg-primary': '#1E1E2E', '--bg-secondary': '#181825', '--bg-card': '#252538',
    '--border': '#313244', '--text-primary': '#CDD6F4', '--text-secondary': '#6C7086',
  },
  emerald: {
    '--accent': '#10B981', '--accent-hover': '#059669', '--accent-light': 'rgba(16,185,129,0.12)',
    '--bg-primary': '#0A0F0C', '--bg-secondary': '#080D0A', '--bg-card': '#121E18',
    '--border': '#1E3A30', '--text-primary': '#F0FFF8', '--text-secondary': '#6BAA88',
  },
  amber: {
    '--accent': '#F59E0B', '--accent-hover': '#D97706', '--accent-light': 'rgba(245,158,11,0.12)',
    '--bg-primary': '#1A1814', '--bg-secondary': '#14120E', '--bg-card': '#242018',
    '--border': '#3A3020', '--text-primary': '#FFF8F0', '--text-secondary': '#AA9960',
  },
}

const fileTree = [
  { name: 'src', type: 'folder', indent: 0, open: true },
  { name: 'components', type: 'folder', indent: 1, open: true },
  { name: 'Button.tsx', type: 'file', indent: 2, ext: 'tsx' },
  { name: 'Card.tsx', type: 'file', indent: 2, ext: 'tsx' },
  { name: 'Modal.tsx', type: 'file', indent: 2, ext: 'tsx' },
  { name: 'pages', type: 'folder', indent: 1, open: false },
  { name: 'hooks', type: 'folder', indent: 1, open: false },
  { name: 'App.tsx', type: 'file', indent: 1, ext: 'tsx' },
  { name: 'index.ts', type: 'file', indent: 1, ext: 'ts' },
  { name: 'styles.css', type: 'file', indent: 1, ext: 'css' },
  { name: 'package.json', type: 'file', indent: 0, ext: 'json' },
  { name: 'tsconfig.json', type: 'file', indent: 0, ext: 'json' },
]

const codeLines = [
  { num: 1, content: "import { useState } from 'react'", tokens: [{ t: 'import', c: '#C678DD' }, { t: " { ", c: '#ABB2BF' }, { t: 'useState', c: '#E5C07B' }, { t: " } ", c: '#ABB2BF' }, { t: 'from', c: '#C678DD' }, { t: " 'react'", c: '#98C379' }] },
  { num: 2, content: '', tokens: [] },
  { num: 3, content: 'interface ButtonProps {', tokens: [{ t: 'interface', c: '#C678DD' }, { t: ' ButtonProps', c: '#E5C07B' }, { t: ' {', c: '#ABB2BF' }] },
  { num: 4, content: '  label: string', tokens: [{ t: '  label', c: '#E06C75' }, { t: ': ', c: '#ABB2BF' }, { t: 'string', c: '#E5C07B' }] },
  { num: 5, content: '  variant?: "primary" | "secondary"', tokens: [{ t: '  variant', c: '#E06C75' }, { t: '?: ', c: '#ABB2BF' }, { t: '"primary"', c: '#98C379' }, { t: ' | ', c: '#ABB2BF' }, { t: '"secondary"', c: '#98C379' }] },
  { num: 6, content: '  onClick: () => void', tokens: [{ t: '  onClick', c: '#E06C75' }, { t: ': () => ', c: '#ABB2BF' }, { t: 'void', c: '#E5C07B' }] },
  { num: 7, content: '  disabled?: boolean', tokens: [{ t: '  disabled', c: '#E06C75' }, { t: '?: ', c: '#ABB2BF' }, { t: 'boolean', c: '#E5C07B' }] },
  { num: 8, content: '}', tokens: [{ t: '}', c: '#ABB2BF' }] },
  { num: 9, content: '', tokens: [] },
  { num: 10, content: 'export function Button({ label, variant = "primary", onClick, disabled }: ButtonProps) {', tokens: [{ t: 'export', c: '#C678DD' }, { t: ' ', c: '' }, { t: 'function', c: '#C678DD' }, { t: ' Button', c: '#61AFEF' }, { t: '({ label, variant = ', c: '#ABB2BF' }, { t: '"primary"', c: '#98C379' }, { t: ', onClick, disabled }: ButtonProps) {', c: '#ABB2BF' }] },
  { num: 11, content: '  const [isHovered, setIsHovered] = useState(false)', tokens: [{ t: '  const', c: '#C678DD' }, { t: ' [isHovered, setIsHovered] = ', c: '#ABB2BF' }, { t: 'useState', c: '#61AFEF' }, { t: '(', c: '#ABB2BF' }, { t: 'false', c: '#D19A66' }, { t: ')', c: '#ABB2BF' }] },
  { num: 12, content: '', tokens: [] },
  { num: 13, content: '  return (', tokens: [{ t: '  return', c: '#C678DD' }, { t: ' (', c: '#ABB2BF' }] },
  { num: 14, content: '    <button', tokens: [{ t: '    <', c: '#ABB2BF' }, { t: 'button', c: '#E06C75' }] },
  { num: 15, content: '      className={`btn btn-${variant}`}', tokens: [{ t: '      className', c: '#D19A66' }, { t: '={`btn btn-${', c: '#ABB2BF' }, { t: 'variant', c: '#E06C75' }, { t: '}`}', c: '#ABB2BF' }] },
  { num: 16, content: '      onClick={onClick}', tokens: [{ t: '      onClick', c: '#D19A66' }, { t: '={onClick}', c: '#ABB2BF' }] },
  { num: 17, content: '      disabled={disabled}', tokens: [{ t: '      disabled', c: '#D19A66' }, { t: '={disabled}', c: '#ABB2BF' }] },
  { num: 18, content: '    >', tokens: [{ t: '    >', c: '#ABB2BF' }] },
  { num: 19, content: '      {label}', tokens: [{ t: '      {label}', c: '#ABB2BF' }] },
  { num: 20, content: '    </button>', tokens: [{ t: '    </', c: '#ABB2BF' }, { t: 'button', c: '#E06C75' }, { t: '>', c: '#ABB2BF' }] },
  { num: 21, content: '  )', tokens: [{ t: '  )', c: '#ABB2BF' }] },
  { num: 22, content: '}', tokens: [{ t: '}', c: '#ABB2BF' }] },
]

const tabs = ['Button.tsx', 'Card.tsx', 'App.tsx']
const problems = [
  { type: 'warning', file: 'Card.tsx', line: 12, msg: "'className' is defined but never used" },
  { type: 'error', file: 'Modal.tsx', line: 28, msg: "Property 'onClose' is missing" },
]

export function CodeEditor({ variant = 'blue' }: { variant?: Variant }) {
  const [activeFile, setActiveFile] = useState('Button.tsx')
  const [activePanel, setActivePanel] = useState('Problems')
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

  const extColors: Record<string, string> = { tsx: '#3B82F6', ts: '#3B82F6', css: '#8B5CF6', json: '#F59E0B' }

  return (
    <>
      <style>{`
        .code-wrapper { font-family: ${customFont || "'Inter', sans-serif"}; }
        .code-wrapper * { box-sizing: border-box; }
        .code-wrapper ::-webkit-scrollbar { width: 6px; height: 6px; }
        .code-wrapper ::-webkit-scrollbar-track { background: transparent; }
        .code-wrapper ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
      `}</style>
      <div className="code-wrapper h-screen grid grid-rows-[auto_1fr_160px] overflow-hidden" style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }} data-theme={currentTheme}>
        {/* Tab Bar */}
        <div className="flex items-center border-b" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveFile(tab)}
              className="px-4 py-2 text-xs flex items-center gap-2 cursor-pointer border-r"
              style={{
                background: activeFile === tab ? 'var(--bg-primary)' : 'transparent',
                borderColor: 'var(--border)',
                color: activeFile === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
                borderTop: activeFile === tab ? '2px solid var(--accent)' : '2px solid transparent',
              }}>
              <div className="w-2 h-2 rounded-full" style={{ background: extColors[tab.split('.').pop() || ''] || 'var(--text-secondary)' }} />
              {tab}
              <span className="ml-2 opacity-50 hover:opacity-100">×</span>
            </button>
          ))}
        </div>

        {/* Main: Sidebar + Editor */}
        <div className="grid grid-cols-[200px_1fr_40px] overflow-hidden">
          {/* File Explorer */}
          <div className="border-r overflow-y-auto py-2" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
            <div className="px-3 py-1 text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--text-secondary)' }}>Explorer</div>
            <div className="mt-1">
              {fileTree.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 px-2 py-0.5 cursor-pointer text-xs hover:opacity-80"
                  style={{ paddingLeft: `${item.indent * 12 + 8}px`, color: item.name === activeFile ? 'var(--accent)' : 'var(--text-secondary)', background: item.name === activeFile ? 'var(--accent-light)' : 'transparent' }}>
                  {item.type === 'folder' ? (
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.open ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'}/></svg>
                  ) : (
                    <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: extColors[item.ext || ''] || '#6C7086', opacity: 0.6 }} />
                  )}
                  <span className={item.type === 'folder' ? 'font-semibold' : ''}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Editor */}
          <div className="overflow-auto" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
            {codeLines.map(line => (
              <div key={line.num} className="flex items-center hover:brightness-110" style={{ background: line.num === 10 ? 'var(--accent-light)' : 'transparent' }}>
                <div className="w-12 text-right pr-4 py-0.5 select-none text-xs flex-shrink-0" style={{ color: line.num === 10 ? 'var(--accent)' : 'var(--text-secondary)', fontSize: 11 }}>
                  {line.num}
                </div>
                <div className="py-0.5 text-xs whitespace-pre" style={{ fontSize: 12 }}>
                  {line.tokens.map((tok, i) => (
                    <span key={i} style={{ color: tok.c || 'var(--text-primary)' }}>{tok.t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Activity Bar */}
          <div className="border-l flex flex-col items-center py-2 gap-1" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
            {[
              'M4 6h16M4 12h16M4 18h16',
              'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
              'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2',
              'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z',
              'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
            ].map((d, i) => (
              <button key={i} className="w-8 h-8 flex items-center justify-center rounded cursor-pointer" style={{ color: i === 0 ? 'var(--accent)' : 'var(--text-secondary)' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={d}/></svg>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="border-t flex flex-col" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
          <div className="flex border-b" style={{ borderColor: 'var(--border)' }}>
            {['Problems', 'Output', 'Terminal', 'Debug'].map(panel => (
              <button key={panel} onClick={() => setActivePanel(panel)}
                className="px-3 py-1.5 text-xs cursor-pointer"
                style={{ color: activePanel === panel ? 'var(--accent)' : 'var(--text-secondary)', borderBottom: activePanel === panel ? '2px solid var(--accent)' : '2px solid transparent' }}>
                {panel}
                {panel === 'Problems' && <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs" style={{ background: '#EF444430', color: '#EF4444', fontSize: 9 }}>2</span>}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-2 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>
            {problems.map((p, i) => (
              <div key={i} className="flex items-center gap-2 py-1 cursor-pointer hover:opacity-80">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill={p.type === 'error' ? '#EF4444' : '#F59E0B'} viewBox="0 0 24 24">
                  {p.type === 'error' ? <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/> : <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>}
                </svg>
                <span style={{ color: 'var(--text-secondary)' }}>{p.file}:{p.line}</span>
                <span>{p.msg}</span>
              </div>
            ))}
          </div>
          {/* Status Bar */}
          <div className="flex items-center px-3 py-1 text-xs border-t" style={{ background: 'var(--accent)', borderColor: 'var(--border)' }}>
            <span className="text-white/90">main</span>
            <span className="mx-3 text-white/50">|</span>
            <span className="text-white/90">TypeScript React</span>
            <div className="flex-1" />
            <span className="text-white/90">Ln 10, Col 42</span>
            <span className="mx-3 text-white/50">|</span>
            <span className="text-white/90">UTF-8</span>
          </div>
        </div>
      </div>
    </>
  )
}
