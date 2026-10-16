import { useState, useEffect } from 'react'

type Variant = 'amber' | 'emerald' | 'rose'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#D97706': 'amber',
  '#059669': 'emerald',
  '#E11D48': 'rose',
}

const THEMES: Record<Variant, Record<string, string>> = {
  amber: {
    '--accent': '#D97706',
    '--accent-hover': '#B45309',
    '--accent-light': 'rgba(217, 119, 6, 0.14)',
    '--bg-primary': '#16110D',
    '--bg-secondary': '#221A14',
    '--bg-card': '#30251C',
    '--border': '#443427',
    '--text-primary': '#FFF8F2',
    '--text-secondary': '#C4AB97',
  },
  emerald: {
    '--accent': '#059669',
    '--accent-hover': '#047857',
    '--accent-light': 'rgba(5, 150, 105, 0.14)',
    '--bg-primary': '#0C1713',
    '--bg-secondary': '#13241E',
    '--bg-card': '#1C332B',
    '--border': '#29473D',
    '--text-primary': '#F0FDF4',
    '--text-secondary': '#93B9AB',
  },
  rose: {
    '--accent': '#E11D48',
    '--accent-hover': '#BE123C',
    '--accent-light': 'rgba(225, 29, 72, 0.14)',
    '--bg-primary': '#190E13',
    '--bg-secondary': '#25141B',
    '--bg-card': '#361D27',
    '--border': '#4C2837',
    '--text-primary': '#FFF1F2',
    '--text-secondary': '#D4A2B1',
  },
}

interface Drink {
  id: string
  name: string
  category: string
  description: string
  price: number
  caffeine: string
  rating: number
  calories: number
  isSeasonal?: boolean
}

const DRINKS: Drink[] = [
  {
    id: 'd-1',
    name: 'Toasted Vanilla Oat Latte',
    category: 'Espresso',
    description: 'Blonde espresso shaken with caramelized vanilla bean syrup and topped with creamy oatmilk.',
    price: 5.95,
    caffeine: '180mg',
    rating: 4.9,
    calories: 140,
    isSeasonal: true,
  },
  {
    id: 'd-2',
    name: 'Nitro Cold Brew with Salted Cream',
    category: 'Cold Brew',
    description: 'Slow-steeped microfoam cold brew finished with a rich savory-sweet caramel cream float.',
    price: 5.45,
    caffeine: '260mg',
    rating: 4.8,
    calories: 190,
  },
  {
    id: 'd-3',
    name: 'Spanish Cortado Especial',
    category: 'Espresso',
    description: 'Equal parts dark roast ristretto espresso and warm steamed whole milk with cinnamon dust.',
    price: 4.65,
    caffeine: '150mg',
    rating: 4.7,
    calories: 90,
  },
  {
    id: 'd-4',
    name: 'Ceremonial Matcha Cloud',
    category: 'Tea',
    description: 'Stone-ground Uji matcha whisked with lavender infused milk and honey cold foam.',
    price: 6.25,
    caffeine: '80mg',
    rating: 4.9,
    calories: 160,
    isSeasonal: true,
  },
]

export function MobileCoffeeShop({ variant = 'amber' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedSize, setSelectedSize] = useState<'Tall' | 'Grande' | 'Venti'>('Grande')
  const [milkOption, setMilkOption] = useState('Oatmilk')
  const [shotCount, setShotCount] = useState(2)
  const [syrupPumps, setSyrupPumps] = useState(3)
  const [cartCount, setCartCount] = useState(1)
  const [showCustomizer, setShowCustomizer] = useState(false)

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'SET_THEME_VARIATION') {
        const accent = e.data.variation?.accent
        if (accent) {
          const v = ACCENT_TO_THEME[accent.toUpperCase()] || ACCENT_TO_THEME[accent]
          if (v) setCurrentTheme(v)
        }
        if (e.data.variation?.font) setCustomFont(e.data.variation.font)
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  const theme = THEMES[currentTheme]
  const cssVars = Object.entries(theme).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Record<string, string>)

  const categories = ['All', 'Espresso', 'Cold Brew', 'Tea', 'Pastries']
  const filteredDrinks = activeCategory === 'All' ? DRINKS : DRINKS.filter((d) => d.category === activeCategory)

  return (
    <>
      <style>{`
        .coffee-wrapper { font-family: ${customFont || "'Plus Jakarta Sans', system-ui, sans-serif"}; }
        .coffee-wrapper * { box-sizing: border-box; }
        .coffee-wrapper ::-webkit-scrollbar { display: none; }
      `}</style>
      <div
        className="coffee-wrapper max-w-[390px] mx-auto min-h-screen relative flex flex-col pb-28"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Header */}
        <header className="px-5 pt-6 pb-4 border-b flex items-center justify-between sticky top-0 z-30 backdrop-blur-md" style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm" style={{ background: 'var(--accent)' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm">Blue Roastery</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <div className="text-[11px] flex items-center gap-1 font-medium" style={{ color: 'var(--text-secondary)' }}>
                <span>4th & Pine · 6 min pickup</span>
              </div>
            </div>
          </div>

          {/* Stars Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
            <span style={{ color: 'var(--accent)' }}>★</span>
            <span>140</span>
          </div>
        </header>

        {/* Hero Loyalty Card */}
        <div className="p-5">
          <div className="p-4 rounded-3xl border relative overflow-hidden shadow-lg" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl opacity-15" style={{ background: 'var(--accent)' }}></div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                Rewards Gold Member
              </span>
              <span className="text-[11px] font-mono font-bold" style={{ color: 'var(--text-secondary)' }}>
                10 pts to free brew
              </span>
            </div>
            <div className="text-lg font-black leading-tight">Order ahead, skip the line</div>
            <div className="mt-3 w-full bg-black/40 h-2 rounded-full overflow-hidden p-0.5 border" style={{ borderColor: 'var(--border)' }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: '85%', background: 'var(--accent)' }}></div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="px-5 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer"
              style={{
                background: activeCategory === c ? 'var(--accent)' : 'var(--bg-card)',
                color: activeCategory === c ? '#FFF' : 'var(--text-secondary)',
                border: `1px solid ${activeCategory === c ? 'transparent' : 'var(--border)'}`,
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured Seasonal Card */}
        <div className="px-5 mb-4">
          <div
            className="p-4 rounded-3xl border cursor-pointer transition-all hover:scale-[1.01]"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
            onClick={() => setShowCustomizer(true)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                Barista Pick of the Day
              </span>
              <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>
                ★ 4.9
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-base leading-tight">Toasted Vanilla Oat Latte</h3>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Caramelized vanilla beans shaken with double espresso & silky oatmilk.
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs">
                  <span className="font-black text-sm text-white">$5.95</span>
                  <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                    Grande · 140 cal
                  </span>
                </div>
              </div>

              <div className="w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center font-bold text-2xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                ☕️
              </div>
            </div>

            <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--border)' }}>
              <span className="font-semibold text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                Tap to customize milk & syrups
              </span>
              <span className="font-bold flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                Customize →
              </span>
            </div>
          </div>
        </div>

        {/* Drink Catalog List */}
        <div className="px-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider px-1" style={{ color: 'var(--text-secondary)' }}>
            Handcrafted Menu
          </div>

          {filteredDrinks.map((drink) => (
            <div
              key={drink.id}
              className="p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-colors"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm leading-snug">{drink.name}</h4>
                  {drink.isSeasonal && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                      New
                    </span>
                  )}
                </div>
                <p className="text-[11px] line-clamp-1 mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  {drink.description}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <span className="font-bold text-white">${drink.price.toFixed(2)}</span>
                  <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                    • {drink.calories} cal • {drink.caffeine}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setCartCount((prev) => prev + 1)}
                className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white flex-shrink-0 cursor-pointer shadow-sm transition-transform active:scale-90"
                style={{ background: 'var(--accent)' }}
              >
                +
              </button>
            </div>
          ))}
        </div>

        {/* Customization Drawer Modal */}
        {showCustomizer && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-3">
            <div className="w-full max-w-[370px] rounded-3xl border p-5 space-y-4 shadow-2xl" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
              <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <h3 className="font-bold text-base">Customize Drink</h3>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Toasted Vanilla Oat Latte
                  </p>
                </div>
                <button onClick={() => setShowCustomizer(false)} className="w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold cursor-pointer" style={{ borderColor: 'var(--border)' }}>
                  ✕
                </button>
              </div>

              {/* Size Select */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Cup Size
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['Tall', 'Grande', 'Venti'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className="py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer"
                      style={{
                        background: selectedSize === size ? 'var(--accent)' : 'var(--bg-card)',
                        borderColor: selectedSize === size ? 'transparent' : 'var(--border)',
                        color: selectedSize === size ? '#FFF' : 'var(--text-primary)',
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Option */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Milk Choice
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {['Oatmilk', 'Whole Milk', 'Almond Milk', 'Breve (+0.80)'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMilkOption(m)}
                      className="py-2 px-3 rounded-xl text-xs font-semibold border text-left truncate cursor-pointer"
                      style={{
                        background: milkOption === m ? 'var(--accent-light)' : 'var(--bg-card)',
                        borderColor: milkOption === m ? 'var(--accent)' : 'var(--border)',
                        color: milkOption === m ? 'var(--accent)' : 'var(--text-secondary)',
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Espresso Shots */}
              <div className="flex items-center justify-between py-1">
                <span className="text-xs font-bold text-white">Espresso Shots</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setShotCount((p) => Math.max(1, p - 1))} className="w-7 h-7 rounded-lg border font-bold text-xs" style={{ borderColor: 'var(--border)' }}>
                    -
                  </button>
                  <span className="font-mono font-bold text-xs">{shotCount}</span>
                  <button onClick={() => setShotCount((p) => p + 1)} className="w-7 h-7 rounded-lg border font-bold text-xs" style={{ borderColor: 'var(--border)' }}>
                    +
                  </button>
                </div>
              </div>

              {/* Vanilla Syrup Pumps */}
              <div className="flex items-center justify-between py-1">
                <span className="text-xs font-bold text-white">Vanilla Syrup Pumps</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setSyrupPumps((p) => Math.max(0, p - 1))} className="w-7 h-7 rounded-lg border font-bold text-xs" style={{ borderColor: 'var(--border)' }}>
                    -
                  </button>
                  <span className="font-mono font-bold text-xs">{syrupPumps}</span>
                  <button onClick={() => setSyrupPumps((p) => p + 1)} className="w-7 h-7 rounded-lg border font-bold text-xs" style={{ borderColor: 'var(--border)' }}>
                    +
                  </button>
                </div>
              </div>

              {/* Confirm customization */}
              <button
                onClick={() => {
                  setShowCustomizer(false)
                  setCartCount((p) => p + 1)
                }}
                className="w-full py-3 rounded-2xl font-bold text-sm text-white shadow-lg cursor-pointer transition-transform active:scale-95"
                style={{ background: 'var(--accent)' }}
              >
                Add {selectedSize} to Order · $5.95
              </button>
            </div>
          </div>
        )}

        {/* Fixed Bottom Checkout Bar */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] border-t px-5 py-3.5 z-40 backdrop-blur-md" style={{ borderColor: 'var(--border)', background: 'rgba(22, 17, 13, 0.95)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
                {cartCount} {cartCount === 1 ? 'item' : 'items'} in order
              </div>
              <div className="font-black text-base text-white">${(cartCount * 5.75).toFixed(2)}</div>
            </div>

            <button
              onClick={() => alert(`Reviewing order (${cartCount} items)`)}
              className="px-6 py-2.5 rounded-2xl font-bold text-sm text-white flex items-center gap-2 cursor-pointer shadow-lg transition-transform active:scale-95"
              style={{ background: 'var(--accent)' }}
            >
              <span>View Order</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
