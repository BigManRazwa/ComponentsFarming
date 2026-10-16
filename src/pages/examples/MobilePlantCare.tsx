import { useState, useEffect } from 'react'

type Variant = 'emerald' | 'amber' | 'teal'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#10B981': 'emerald',
  '#F59E0B': 'amber',
  '#14B8A6': 'teal',
}

const THEMES: Record<Variant, Record<string, string>> = {
  emerald: {
    '--accent': '#10B981',
    '--accent-hover': '#059669',
    '--accent-light': 'rgba(16, 185, 129, 0.14)',
    '--bg-primary': '#09140F',
    '--bg-secondary': '#112019',
    '--bg-card': '#1A2E24',
    '--border': '#254234',
    '--text-primary': '#F0FDF4',
    '--text-secondary': '#85B59D',
  },
  amber: {
    '--accent': '#F59E0B',
    '--accent-hover': '#D97706',
    '--accent-light': 'rgba(245, 158, 11, 0.14)',
    '--bg-primary': '#18120A',
    '--bg-secondary': '#241B10',
    '--bg-card': '#332717',
    '--border': '#483822',
    '--text-primary': '#FFFBEB',
    '--text-secondary': '#C4AB89',
  },
  teal: {
    '--accent': '#14B8A6',
    '--accent-hover': '#0D9488',
    '--accent-light': 'rgba(20, 184, 166, 0.14)',
    '--bg-primary': '#081414',
    '--bg-secondary': '#0E2121',
    '--bg-card': '#163030',
    '--border': '#204545',
    '--text-primary': '#F0FDFA',
    '--text-secondary': '#82B8B8',
  },
}

interface PlantTask {
  id: string
  name: string
  type: string
  task: string
  action: 'water' | 'mist' | 'fertilize' | 'rotate'
  dueTime: string
  completed: boolean
}

interface Plant {
  id: string
  commonName: string
  scientificName: string
  waterDays: number
  sunlight: string
  health: number
  room: string
  icon: string
}

const INITIAL_TASKS: PlantTask[] = [
  { id: 't-1', name: 'Monstera Deliciosa', type: 'Swiss Cheese Plant', task: 'Water 350ml filtered water', action: 'water', dueTime: 'Today, 10:00 AM', completed: false },
  { id: 't-2', name: 'Fiddle Leaf Fig', type: 'Ficus Lyrata', task: 'Mist leaves & rotate 90°', action: 'mist', dueTime: 'Today, 2:00 PM', completed: false },
  { id: 't-3', name: 'Calathea Orbifolia', type: 'Prayer Plant', task: 'Soil moisture inspection', action: 'water', dueTime: 'Tomorrow', completed: true },
]

const MY_PLANTS: Plant[] = [
  { id: 'p-1', commonName: 'Monstera Deliciosa', scientificName: 'Monstera deliciosa', waterDays: 2, sunlight: 'Bright Indirect', health: 96, room: 'Living Room', icon: '🌿' },
  { id: 'p-2', commonName: 'Fiddle Leaf Fig', scientificName: 'Ficus lyrata', waterDays: 4, sunlight: 'Medium Light', health: 88, room: 'Study Studio', icon: '🪴' },
  { id: 'p-3', commonName: 'Snake Plant', scientificName: 'Sansevieria trifasciata', waterDays: 12, sunlight: 'Low to Bright', health: 100, room: 'Master Bedroom', icon: '🌱' },
  { id: 'p-4', commonName: 'Olive Tree', scientificName: 'Olea europaea', waterDays: 5, sunlight: 'Direct Sun', health: 92, room: 'Balcony', icon: '🫒' },
]

export function MobilePlantCare({ variant = 'emerald' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [tasks, setTasks] = useState<PlantTask[]>(INITIAL_TASKS)
  const [activeTab, setActiveTab] = useState<'care' | 'plants' | 'light' | 'profile'>('care')
  const [showLightMeter, setShowLightMeter] = useState(false)
  const [luxValue, setLuxValue] = useState(1850)

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

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const pendingCount = tasks.filter((t) => !t.completed).length

  return (
    <>
      <style>{`
        .plant-wrapper { font-family: ${customFont || "'Plus Jakarta Sans', system-ui, sans-serif"}; }
        .plant-wrapper * { box-sizing: border-box; }
        .plant-wrapper ::-webkit-scrollbar { display: none; }
      `}</style>
      <div
        className="plant-wrapper max-w-[390px] mx-auto min-h-screen relative flex flex-col pb-24"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Header */}
        <header className="px-5 pt-6 pb-4 border-b flex items-center justify-between sticky top-0 z-30 backdrop-blur-md" style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-lg shadow-sm" style={{ background: 'var(--accent)' }}>
              🌱
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base leading-tight">Flora Botanica</span>
              </div>
              <div className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                Indoor: 64% RH · 72°F
              </div>
            </div>
          </div>

          {/* Quick Light Sensor Trigger */}
          <button
            onClick={() => setShowLightMeter(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold cursor-pointer transition-transform active:scale-95"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
          >
            <span>☀️</span>
            <span>Lux Meter</span>
          </button>
        </header>

        {/* Hero Daily Overview Card */}
        <div className="p-5">
          <div className="p-4 rounded-3xl border relative overflow-hidden shadow-lg" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-15" style={{ background: 'var(--accent)' }}></div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                Hydration Routine
              </span>
              <span className="text-[11px] font-mono font-bold" style={{ color: 'var(--text-secondary)' }}>
                {pendingCount === 0 ? 'All hydrated!' : `${pendingCount} tasks left`}
              </span>
            </div>

            <div className="text-lg font-black leading-tight">
              {pendingCount > 0 ? `${pendingCount} plants thirsty today` : 'Great job! Green thumb unlocked.'}
            </div>

            {/* Health Meter Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[11px] font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                <span>Foliage Vitality Index</span>
                <span className="font-bold text-white">94% Optimal</span>
              </div>
              <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden p-0.5 border" style={{ borderColor: 'var(--border)' }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: '94%', background: 'var(--accent)' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Tasks Checklist */}
        <div className="px-5 space-y-3 mb-5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              Today's Care Actions
            </span>
            <span className="text-xs font-bold hover:underline cursor-pointer" style={{ color: 'var(--accent)' }}>
              History
            </span>
          </div>

          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="p-3.5 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all"
              style={{
                borderColor: task.completed ? 'transparent' : 'var(--border)',
                background: task.completed ? 'rgba(255,255,255,0.03)' : 'var(--bg-card)',
                opacity: task.completed ? 0.6 : 1,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl border flex items-center justify-center font-bold text-xs transition-colors"
                  style={{
                    borderColor: task.completed ? 'var(--accent)' : 'var(--border)',
                    background: task.completed ? 'var(--accent)' : 'var(--bg-secondary)',
                    color: task.completed ? '#FFF' : 'transparent',
                  }}
                >
                  ✓
                </div>

                <div>
                  <h4 className={`font-bold text-xs leading-snug ${task.completed ? 'line-through text-zinc-400' : 'text-white'}`}>
                    {task.name}
                  </h4>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    {task.task}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded border flex-shrink-0" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                {task.dueTime}
              </span>
            </div>
          ))}
        </div>

        {/* My Jungle / Plant Carousel */}
        <div className="px-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              My Sanctuary ({MY_PLANTS.length})
            </span>
            <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>
              + Add Plant
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {MY_PLANTS.map((plant) => (
              <div
                key={plant.id}
                className="p-4 rounded-3xl border flex flex-col justify-between transition-all hover:scale-[1.02] cursor-pointer"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{plant.icon}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                      {plant.health}%
                    </span>
                  </div>

                  <h4 className="font-bold text-xs leading-snug text-white">{plant.commonName}</h4>
                  <p className="text-[10px] italic line-clamp-1 mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    {plant.scientificName}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t space-y-1 text-[10px]" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                    <span>Water in:</span>
                    <span className="font-bold text-white">{plant.waterDays} days</span>
                  </div>
                  <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                    <span>Light:</span>
                    <span className="font-medium text-white truncate max-w-[70px]">{plant.sunlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Light Meter Drawer */}
        {showLightMeter && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-xs p-3">
            <div className="w-full max-w-[370px] rounded-3xl border p-5 space-y-4 shadow-2xl" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
              <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <h3 className="font-bold text-base">Ambient Sunlight Gauge</h3>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Measure exposure at foliage level
                  </p>
                </div>
                <button
                  onClick={() => setShowLightMeter(false)}
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold cursor-pointer"
                  style={{ borderColor: 'var(--border)' }}
                >
                  ✕
                </button>
              </div>

              {/* Sensor Dial Simulation */}
              <div className="p-5 rounded-2xl border text-center space-y-2" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                  Live Sensor Reading
                </span>
                <div className="text-3xl font-black font-mono text-white">{luxValue} <span className="text-sm font-normal">Lux</span></div>
                <div className="text-xs font-semibold px-3 py-1 rounded-full inline-block" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                  Bright Indirect Light (Ideal for Aroids)
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 block">Simulate Ambient Brightness</label>
                <input
                  type="range"
                  min="400"
                  max="4500"
                  value={luxValue}
                  onChange={(e) => setLuxValue(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <button
                onClick={() => setShowLightMeter(false)}
                className="w-full py-3 rounded-2xl font-bold text-sm text-white shadow-lg cursor-pointer transition-transform active:scale-95"
                style={{ background: 'var(--accent)' }}
              >
                Log Reading for Monstera
              </button>
            </div>
          </div>
        )}

        {/* Fixed Bottom Navigation Bar */}
        <nav
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] border-t px-6 py-3 z-40 backdrop-blur-md flex items-center justify-between"
          style={{ borderColor: 'var(--border)', background: 'rgba(9, 20, 15, 0.95)' }}
        >
          {[
            { id: 'care', label: 'Care', icon: '💧' },
            { id: 'plants', label: 'Plants', icon: '🌿' },
            { id: 'light', label: 'Diagnosis', icon: '🔍' },
            { id: 'profile', label: 'Journal', icon: '📖' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as any)
                if (item.id === 'light') setShowLightMeter(true)
              }}
              className="flex flex-col items-center gap-1 cursor-pointer transition-colors"
              style={{ color: activeTab === item.id ? 'var(--accent)' : 'var(--text-secondary)' }}
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}
