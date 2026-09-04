import { Link } from 'react-router-dom'

const categories = [
  {
    title: 'Components',
    description: 'UI building blocks for your app',
    items: [
      { label: 'Button', path: '/components/button', desc: 'Versatile button with variants and sizes' },
      { label: 'Card', path: '/components/card', desc: 'Container for grouping related content' },
    ],
  },
]

export function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
          Component Library
        </h1>
        <p className="text-zinc-400 text-[15px] leading-relaxed max-w-2xl">
          Browse and preview components. This is a temporary dev container — your components
          live in{' '}
          <code className="text-purple-400 bg-purple-400/10 px-1.5 py-0.5 rounded text-xs">
            src/components/ui/
          </code>{' '}
          and can be lifted out when the real container ships.
        </p>
      </div>

      {categories.map((category) => (
        <div key={category.title} className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-1">{category.title}</h2>
          <p className="text-zinc-500 text-sm mb-5">{category.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {category.items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group block p-5 rounded-xl border border-zinc-800/60 bg-zinc-900/30 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all"
              >
                <h3 className="text-white font-medium text-sm group-hover:text-purple-400 transition-colors">
                  {item.label}
                </h3>
                <p className="text-zinc-600 text-xs mt-1.5">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
