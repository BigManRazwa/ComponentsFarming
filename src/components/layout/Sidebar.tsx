import { useState } from 'react'
import { NavLink } from 'react-router-dom'

type NavItem = {
  label: string
  path: string
}

type NavCategory = {
  title: string
  items: NavItem[]
}

const navigation: NavCategory[] = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Overview', path: '/' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Button', path: '/components/button' },
      { label: 'Card', path: '/components/card' },
    ],
  },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 shrink-0 bg-zinc-950 border-r border-zinc-800/60
          flex flex-col h-screen
          transform transition-transform duration-200
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-5 border-b border-zinc-800/60">
          <h1 className="text-base font-semibold text-white flex items-center gap-2">
            <span className="text-purple-400 text-lg">⚡</span>
            Components
          </h1>
          <p className="text-[11px] text-zinc-600 mt-1 tracking-wide uppercase">Component Library</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navigation.map((category) => (
            <div key={category.title}>
              <h2 className="text-[11px] font-semibold text-zinc-600 uppercase tracking-wider mb-2 px-3">
                {category.title}
              </h2>
              <ul className="space-y-0.5">
                {category.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-lg text-[13px] transition-colors ${
                          isActive
                            ? 'bg-purple-500/10 text-purple-400 font-medium'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                        }`
                      }
                      end
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800/60">
          <p className="text-[11px] text-zinc-700 text-center">
            Temporary Dev Container
          </p>
        </div>
      </aside>
    </>
  )
}
