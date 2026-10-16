import { useState, useEffect } from 'react'

type Variant = 'sky' | 'indigo' | 'emerald'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#0284C7': 'sky',
  '#6366F1': 'indigo',
  '#10B981': 'emerald',
}

const THEMES: Record<Variant, Record<string, string>> = {
  sky: {
    '--accent': '#0284C7',
    '--accent-hover': '#0369A1',
    '--accent-light': 'rgba(2, 132, 199, 0.12)',
    '--bg-primary': '#0B132B',
    '--bg-secondary': '#111C38',
    '--bg-card': '#192648',
    '--border': '#243560',
    '--text-primary': '#F8FAFC',
    '--text-secondary': '#94A3B8',
  },
  indigo: {
    '--accent': '#6366F1',
    '--accent-hover': '#4F46E5',
    '--accent-light': 'rgba(99, 102, 241, 0.12)',
    '--bg-primary': '#0F172A',
    '--bg-secondary': '#1E293B',
    '--bg-card': '#27354E',
    '--border': '#334155',
    '--text-primary': '#F8FAFC',
    '--text-secondary': '#94A3B8',
  },
  emerald: {
    '--accent': '#10B981',
    '--accent-hover': '#059669',
    '--accent-light': 'rgba(16, 185, 129, 0.12)',
    '--bg-primary': '#081411',
    '--bg-secondary': '#0F211C',
    '--bg-card': '#162F28',
    '--border': '#1F4238',
    '--text-primary': '#F0FDF4',
    '--text-secondary': '#86EFAC',
  },
}

interface Flight {
  id: string
  airline: string
  flightNo: string
  depTime: string
  arrTime: string
  depAirport: string
  arrAirport: string
  duration: string
  stops: string
  stopDetails?: string
  price: number
  isBest?: boolean
  isCheapest?: boolean
  amenities: string[]
}

const FLIGHTS: Flight[] = [
  {
    id: 'fl-1',
    airline: 'All Nippon Airways (ANA)',
    flightNo: 'NH 109',
    depTime: '10:45 AM',
    arrTime: '2:30 PM (+1)',
    depAirport: 'JFK',
    arrAirport: 'HND',
    duration: '14h 45m',
    stops: 'Nonstop',
    price: 890,
    isBest: true,
    amenities: ['Wi-Fi', 'Power outlets', 'Seatback entertainment', 'Complimentary meals'],
  },
  {
    id: 'fl-2',
    airline: 'Japan Airlines (JAL)',
    flightNo: 'JL 005',
    depTime: '01:15 PM',
    arrTime: '05:10 PM (+1)',
    depAirport: 'JFK',
    arrAirport: 'HND',
    duration: '14h 55m',
    stops: 'Nonstop',
    price: 935,
    amenities: ['High-speed Wi-Fi', 'Premium dining', 'USB-C ports', 'Extra legroom'],
  },
  {
    id: 'fl-3',
    airline: 'United Airlines',
    flightNo: 'UA 875',
    depTime: '07:30 AM',
    arrTime: '04:15 PM (+1)',
    depAirport: 'JFK',
    arrAirport: 'NRT',
    duration: '16h 45m',
    stops: '1 Stop',
    stopDetails: '1h 50m in SFO',
    price: 760,
    isCheapest: true,
    amenities: ['Wi-Fi available', 'In-seat power', 'Complimentary snacks'],
  },
  {
    id: 'fl-4',
    airline: 'Delta Air Lines',
    flightNo: 'DL 295',
    depTime: '11:20 AM',
    arrTime: '06:05 PM (+1)',
    depAirport: 'JFK',
    arrAirport: 'HND',
    duration: '17h 45m',
    stops: '1 Stop',
    stopDetails: '2h 15m in SEA',
    price: 815,
    amenities: ['Free messaging', 'Seatback screen', 'Audio & video on demand'],
  },
]

export function FlightBooking({ variant = 'sky' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [selectedTrip, setSelectedTrip] = useState<'round' | 'oneway' | 'multi'>('round')
  const [selectedSort, setSelectedSort] = useState<'best' | 'cheapest' | 'fastest'>('best')
  const [selectedStops, setSelectedStops] = useState<string[]>(['nonstop', '1stop'])
  const [expandedFlight, setExpandedFlight] = useState<string | null>('fl-1')
  const [cabinClass, setCabinClass] = useState('Economy')

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

  return (
    <>
      <style>{`
        .flight-wrapper { font-family: ${customFont || "'Plus Jakarta Sans', system-ui, sans-serif"}; }
        .flight-wrapper * { box-sizing: border-box; }
        .flight-wrapper ::-webkit-scrollbar { width: 6px; height: 6px; }
        .flight-wrapper ::-webkit-scrollbar-track { background: var(--bg-primary); }
        .flight-wrapper ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
      `}</style>
      <div
        className="flight-wrapper min-h-screen flex flex-col"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top Navbar */}
        <header className="border-b px-8 py-3.5 flex items-center justify-between" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ background: 'var(--accent)' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <span className="font-bold text-lg tracking-tight">SkyFlow</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                Flights
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              <span className="px-3 py-1.5 rounded-lg cursor-pointer transition-colors" style={{ color: 'var(--accent)', background: 'var(--accent-light)' }}>
                Explore Flights
              </span>
              <span className="px-3 py-1.5 rounded-lg hover:text-white cursor-pointer transition-colors">Hotels</span>
              <span className="px-3 py-1.5 rounded-lg hover:text-white cursor-pointer transition-colors">Car Rentals</span>
              <span className="px-3 py-1.5 rounded-lg hover:text-white cursor-pointer transition-colors">My Trips</span>
            </nav>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span>USD ($)</span>
            </button>
            <div className="w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--accent)' }}>
              <span className="font-bold text-xs text-white">JD</span>
            </div>
          </div>
        </header>

        {/* Hero Search Bar */}
        <section className="px-8 py-6 border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
          <div className="max-w-7xl mx-auto space-y-4">
            {/* Trip Type Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <button
                  onClick={() => setSelectedTrip('round')}
                  className="px-3.5 py-1.5 rounded-lg cursor-pointer transition-colors"
                  style={{
                    background: selectedTrip === 'round' ? 'var(--accent)' : 'var(--bg-card)',
                    color: selectedTrip === 'round' ? '#FFF' : 'var(--text-secondary)',
                  }}
                >
                  Round Trip
                </button>
                <button
                  onClick={() => setSelectedTrip('oneway')}
                  className="px-3.5 py-1.5 rounded-lg cursor-pointer transition-colors"
                  style={{
                    background: selectedTrip === 'oneway' ? 'var(--accent)' : 'var(--bg-card)',
                    color: selectedTrip === 'oneway' ? '#FFF' : 'var(--text-secondary)',
                  }}
                >
                  One Way
                </button>
                <button
                  onClick={() => setSelectedTrip('multi')}
                  className="px-3.5 py-1.5 rounded-lg cursor-pointer transition-colors"
                  style={{
                    background: selectedTrip === 'multi' ? 'var(--accent)' : 'var(--bg-card)',
                    color: selectedTrip === 'multi' ? '#FFF' : 'var(--text-secondary)',
                  }}
                >
                  Multi-City
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-white">1 Adult</span>
                  <span>•</span>
                  <select
                    value={cabinClass}
                    onChange={(e) => setCabinClass(e.target.value)}
                    className="bg-transparent border-none outline-none font-medium cursor-pointer"
                    style={{ color: 'var(--accent)' }}
                  >
                    <option value="Economy">Economy</option>
                    <option value="Premium Economy">Premium Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First Class</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Main Search Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Origin */}
              <div className="p-3 rounded-xl border flex flex-col cursor-pointer transition-all hover:border-sky-500/50" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Departure
                </span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold text-base">New York</span>
                  <span className="text-xs px-2 py-0.5 rounded font-mono font-bold" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                    JFK
                  </span>
                </div>
                <span className="text-[11px] truncate mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  John F. Kennedy Intl
                </span>
              </div>

              {/* Destination */}
              <div className="p-3 rounded-xl border flex flex-col cursor-pointer transition-all hover:border-sky-500/50" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Destination
                </span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold text-base">Tokyo</span>
                  <span className="text-xs px-2 py-0.5 rounded font-mono font-bold" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                    HND
                  </span>
                </div>
                <span className="text-[11px] truncate mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  Haneda International
                </span>
              </div>

              {/* Dates */}
              <div className="p-3 rounded-xl border flex flex-col cursor-pointer transition-all hover:border-sky-500/50" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Travel Dates
                </span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold text-base">Nov 14 – Nov 28</span>
                  <svg className="w-4 h-4" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  14 days trip
                </span>
              </div>

              {/* Search Button */}
              <button
                className="h-full rounded-xl flex items-center justify-center gap-2 font-bold text-white cursor-pointer shadow-lg transition-transform active:scale-95"
                style={{ background: 'var(--accent)' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search Flights</span>
              </button>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column: Filters */}
          <aside className="space-y-6">
            <div className="p-5 rounded-2xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm tracking-wide">Filters</h3>
                <button className="text-xs font-semibold hover:underline cursor-pointer" style={{ color: 'var(--accent)' }}>
                  Reset all
                </button>
              </div>

              {/* Stops Filter */}
              <div className="py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-secondary)' }}>
                  Stops
                </h4>
                <div className="space-y-2 text-sm">
                  {[
                    { id: 'nonstop', label: 'Nonstop only', count: '2 flights', price: '$890' },
                    { id: '1stop', label: '1 Stop', count: '4 flights', price: '$760' },
                    { id: '2stops', label: '2+ Stops', count: '8 flights', price: '$680' },
                  ].map((s) => (
                    <label key={s.id} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedStops.includes(s.id)}
                          onChange={() => {
                            setSelectedStops((prev) => (prev.includes(s.id) ? prev.filter((x) => x !== s.id) : [...prev, s.id]))
                          }}
                          className="w-4 h-4 rounded cursor-pointer accent-sky-500"
                        />
                        <span className="text-xs font-medium group-hover:text-white transition-colors">{s.label}</span>
                      </div>
                      <span className="text-[11px] font-mono" style={{ color: 'var(--text-secondary)' }}>
                        from {s.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Airlines */}
              <div className="py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-secondary)' }}>
                  Airlines
                </h4>
                <div className="space-y-2 text-sm">
                  {[
                    { name: 'All Nippon Airways (ANA)', price: '$890' },
                    { name: 'Japan Airlines (JAL)', price: '$935' },
                    { name: 'United Airlines', price: '$760' },
                    { name: 'Delta Air Lines', price: '$815' },
                  ].map((airline) => (
                    <label key={airline.name} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-2.5">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded cursor-pointer accent-sky-500" />
                        <span className="text-xs font-medium group-hover:text-white transition-colors truncate max-w-[130px]">
                          {airline.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono" style={{ color: 'var(--text-secondary)' }}>
                        {airline.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="pt-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Max Price
                  </h4>
                  <span className="text-xs font-bold font-mono" style={{ color: 'var(--accent)' }}>
                    $1,200
                  </span>
                </div>
                <input type="range" min="600" max="1500" defaultValue="1200" className="w-full accent-sky-500 cursor-pointer" />
                <div className="flex justify-between text-[10px] mt-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                  <span>$600</span>
                  <span>$1,500</span>
                </div>
              </div>
            </div>

            {/* Travel Insight Badge */}
            <div className="p-4 rounded-2xl border flex items-start gap-3" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-xs">
                <div className="font-bold text-white mb-0.5">Price Prediction</div>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Prices are unlikely to drop for Tokyo dates in November. We recommend booking soon.
                </p>
              </div>
            </div>
          </aside>

          {/* Right Column: Search Results */}
          <div className="lg:col-span-3 space-y-4">
            {/* Price Alert Banner */}
            <div className="p-4 rounded-2xl border flex items-center justify-between gap-4" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ background: 'var(--accent)' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Track prices for JFK → HND</div>
                  <div className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                    Get notifications whenever fares for these dates drop below $800.
                  </div>
                </div>
              </div>
              <button className="px-3.5 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer hover:bg-white/5 transition-colors" style={{ borderColor: 'var(--border)' }}>
                Track Fares
              </button>
            </div>

            {/* Sorting Tabs */}
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                Showing <strong className="text-white">4</strong> available flights
              </div>

              <div className="flex items-center gap-2 p-1 rounded-xl border text-xs font-semibold" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                {[
                  { id: 'best', label: 'Best', sub: '$890 · 14h 45m' },
                  { id: 'cheapest', label: 'Cheapest', sub: '$760 · 16h 45m' },
                  { id: 'fastest', label: 'Fastest', sub: '$890 · 14h 45m' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedSort(tab.id as any)}
                    className="px-3 py-1.5 rounded-lg cursor-pointer transition-all flex flex-col items-center"
                    style={{
                      background: selectedSort === tab.id ? 'var(--accent)' : 'transparent',
                      color: selectedSort === tab.id ? '#FFF' : 'var(--text-secondary)',
                    }}
                  >
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Flight Cards List */}
            <div className="space-y-4">
              {FLIGHTS.map((flight) => {
                const isExpanded = expandedFlight === flight.id
                return (
                  <div
                    key={flight.id}
                    className="rounded-2xl border transition-all duration-200 overflow-hidden"
                    style={{
                      borderColor: isExpanded ? 'var(--accent)' : 'var(--border)',
                      background: 'var(--bg-secondary)',
                      boxShadow: isExpanded ? '0 8px 30px -10px var(--accent-light)' : 'none',
                    }}
                  >
                    {/* Card Top Row */}
                    <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer" onClick={() => setExpandedFlight(isExpanded ? null : flight.id)}>
                      {/* Left: Airline & Times */}
                      <div className="flex items-center gap-6 flex-1">
                        {/* Airline logo mark */}
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xs uppercase tracking-tighter" style={{ background: 'var(--bg-card)', color: 'var(--accent)' }}>
                          {flight.airline.slice(0, 3)}
                        </div>

                        {/* Times & Timeline */}
                        <div className="flex items-center gap-8 flex-1">
                          {/* Departure */}
                          <div>
                            <div className="text-xl font-black">{flight.depTime}</div>
                            <div className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                              {flight.depAirport}
                            </div>
                          </div>

                          {/* Flight path line */}
                          <div className="flex-1 flex flex-col items-center">
                            <span className="text-[11px] font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                              {flight.duration}
                            </span>
                            <div className="w-full flex items-center gap-1.5">
                              <div className="h-[2px] flex-1 rounded" style={{ background: 'var(--border)' }}></div>
                              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }}></div>
                              <div className="h-[2px] flex-1 rounded" style={{ background: 'var(--border)' }}></div>
                            </div>
                            <span className="text-[10px] mt-1 font-semibold" style={{ color: flight.stops === 'Nonstop' ? '#10B981' : '#F59E0B' }}>
                              {flight.stops} {flight.stopDetails && `(${flight.stopDetails})`}
                            </span>
                          </div>

                          {/* Arrival */}
                          <div>
                            <div className="text-xl font-black">{flight.arrTime}</div>
                            <div className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                              {flight.arrAirport}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Price & CTA */}
                      <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0" style={{ borderColor: 'var(--border)' }}>
                        <div className="text-right">
                          <div className="text-2xl font-black">${flight.price}</div>
                          <div className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                            Roundtrip · per traveler
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            alert(`Selected flight: ${flight.flightNo} ($${flight.price})`)
                          }}
                          className="px-5 py-2.5 rounded-xl font-bold text-sm text-white cursor-pointer shadow-md transition-all hover:opacity-90 active:scale-95"
                          style={{ background: 'var(--accent)' }}
                        >
                          Select
                        </button>
                      </div>
                    </div>

                    {/* Card Amenities Footer / Expand Details */}
                    <div className="px-5 py-3 border-t flex flex-wrap items-center justify-between gap-2 text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                      <div className="flex flex-wrap items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
                        <span className="font-semibold text-white">{flight.airline} · {flight.flightNo}</span>
                        <span>•</span>
                        {flight.amenities.map((amenity, i) => (
                          <span key={i} className="flex items-center gap-1">
                            <span>✓</span> {amenity}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => setExpandedFlight(isExpanded ? null : flight.id)}
                        className="font-semibold text-xs flex items-center gap-1 cursor-pointer hover:underline"
                        style={{ color: 'var(--accent)' }}
                      >
                        {isExpanded ? 'Hide details' : 'Flight details'}
                        <svg className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    {/* Detailed Flight Breakdown Drawer */}
                    {isExpanded && (
                      <div className="p-6 border-t space-y-4" style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}>
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                            1
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between text-sm font-bold">
                              <span>Departure: {flight.depAirport} · {flight.depTime}</span>
                              <span style={{ color: 'var(--text-secondary)' }}>Terminal 4</span>
                            </div>
                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                              Aircraft: Boeing 787-9 Dreamliner · Seat pitch: 34" · Wi-Fi streaming enabled
                            </p>
                          </div>
                        </div>

                        <div className="ml-4 pl-8 border-l-2 py-2 text-xs space-y-1" style={{ borderColor: 'var(--border)' }}>
                          <span className="text-[11px] font-semibold" style={{ color: 'var(--accent)' }}>
                            Flight time: {flight.duration}
                          </span>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                            2
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between text-sm font-bold">
                              <span>Arrival: {flight.arrAirport} · {flight.arrTime}</span>
                              <span style={{ color: 'var(--text-secondary)' }}>Terminal 3</span>
                            </div>
                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                              Baggage claim carousel 4 · Immigration & customs processing
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
