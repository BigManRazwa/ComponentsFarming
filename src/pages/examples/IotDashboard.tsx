import { useState, useEffect } from 'react'

type Variant = 'cyan' | 'amber' | 'emerald'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#06B6D4': 'cyan',
  '#F59E0B': 'amber',
  '#10B981': 'emerald',
}

const THEMES: Record<Variant, Record<string, string>> = {
  cyan: {
    '--accent': '#06B6D4', '--accent-hover': '#0891B2', '--accent-light': 'rgba(6,182,212,0.1)',
    '--bg-primary': '#0F172A', '--bg-secondary': '#1E293B', '--bg-card': '#334155',
    '--border': '#475569', '--text-primary': '#F8FAFC', '--text-secondary': '#94A3B8',
  },
  amber: {
    '--accent': '#F59E0B', '--accent-hover': '#D97706', '--accent-light': 'rgba(245,158,11,0.1)',
    '--bg-primary': '#1A1814', '--bg-secondary': '#242018', '--bg-card': '#3A3020',
    '--border': '#4A4030', '--text-primary': '#FFF8F0', '--text-secondary': '#AA9960',
  },
  emerald: {
    '--accent': '#10B981', '--accent-hover': '#059669', '--accent-light': 'rgba(16,185,129,0.1)',
    '--bg-primary': '#0A0F0C', '--bg-secondary': '#101A14', '--bg-card': '#162220',
    '--border': '#1E3A30', '--text-primary': '#F0FFF8', '--text-secondary': '#6BAA88',
  },
}

const rooms = ['Living Room', 'Bedroom', 'Kitchen', 'Garage', 'Office']

const devices = [
  { id: '1', name: 'Main Lights', type: 'light', room: 'Living Room', status: true, value: 85, icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { id: '2', name: 'AC Unit', type: 'climate', room: 'Living Room', status: true, value: 72, icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z' },
  { id: '3', name: 'Smart TV', type: 'media', room: 'Living Room', status: false, value: 0, icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: '4', name: 'Security Camera', type: 'security', room: 'Garage', status: true, value: 100, icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
  { id: '5', name: 'Coffee Maker', type: 'appliance', room: 'Kitchen', status: false, value: 0, icon: 'M13 10V3L4 14h7v8l9-11h-7z' },
  { id: '6', name: 'Thermostat', type: 'climate', room: 'Bedroom', status: true, value: 68, icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
]

export function IotDashboard({ variant = 'cyan' }: { variant?: Variant }) {
  const [activeRoom, setActiveRoom] = useState('Living Room')
  const [deviceList, setDeviceList] = useState(devices)
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

  const toggleDevice = (id: string) => {
    setDeviceList(prev => prev.map(d => d.id === id ? { ...d, status: !d.status } : d))
  }

  const theme = THEMES[currentTheme]
  const cssVars = Object.entries(theme).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Record<string, string>)
  const filteredDevices = deviceList.filter(d => d.room === activeRoom || activeRoom === 'All')
  
  const activeCount = deviceList.filter(d => d.status).length
  const energyUsage = 4.2 + (activeCount * 0.4)

  return (
    <>
      <style>{`
        .iot-wrapper { font-family: ${customFont || "'Inter', sans-serif"}; }
        .iot-wrapper * { box-sizing: border-box; }
        .iot-wrapper ::-webkit-scrollbar { width: 8px; height: 8px; }
        .iot-wrapper ::-webkit-scrollbar-track { background: var(--bg-primary); }
        .iot-wrapper ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
        .glass-panel { background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); border: 1px solid var(--border); }
      `}</style>
      <div className="iot-wrapper h-screen flex overflow-hidden" style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }} data-theme={currentTheme}>
        
        {/* Sidebar */}
        <div className="w-64 border-r flex flex-col" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">SmartHome</h1>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Alex's Residence</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider mb-3 px-2 mt-4" style={{ color: 'var(--text-secondary)' }}>Rooms</div>
            <button onClick={() => setActiveRoom('All')} 
                    className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium transition-all"
                    style={{ background: activeRoom === 'All' ? 'var(--accent-light)' : 'transparent', color: activeRoom === 'All' ? 'var(--accent)' : 'var(--text-secondary)' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
              All Devices
            </button>
            {rooms.map(room => (
              <button key={room} onClick={() => setActiveRoom(room)} 
                      className="w-full text-left px-4 py-3 rounded-xl flex items-center justify-between text-sm font-medium transition-all"
                      style={{ background: activeRoom === room ? 'var(--accent-light)' : 'transparent', color: activeRoom === room ? 'var(--accent)' : 'var(--text-secondary)' }}>
                <span>{room}</span>
                {activeRoom === room && <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }}></div>}
              </button>
            ))}
          </div>

          <div className="p-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="glass-panel rounded-2xl p-4 flex flex-col items-center text-center">
              <svg className="w-8 h-8 mb-2" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v8l9-11h-7z"/></svg>
              <div className="font-bold text-2xl">{energyUsage.toFixed(1)} <span className="text-sm font-normal" style={{ color: 'var(--text-secondary)' }}>kWh</span></div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Today's Energy Usage</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full relative">
          {/* Header */}
          <header className="h-20 border-b flex items-center justify-between px-8 z-10" style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}>
            <div>
              <h2 className="text-2xl font-bold">{activeRoom === 'All' ? 'All Devices' : activeRoom}</h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{filteredDevices.length} devices connected</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-full border text-sm font-medium flex items-center gap-2" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                System Online
              </div>
              <div className="w-10 h-10 rounded-full border overflow-hidden cursor-pointer" style={{ borderColor: 'var(--border)' }}>
                <img src="https://i.pravatar.cc/100?img=11" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </header>

          {/* Device Grid */}
          <main className="flex-1 overflow-y-auto p-8 z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDevices.map(device => (
                <div key={device.id} className="rounded-3xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col"
                     style={{ 
                       background: device.status ? 'var(--accent)' : 'var(--bg-secondary)', 
                       color: device.status ? '#FFF' : 'var(--text-primary)',
                       border: `1px solid ${device.status ? 'transparent' : 'var(--border)'}`,
                       boxShadow: device.status ? '0 10px 30px -10px var(--accent)' : 'none',
                       height: '180px'
                     }}>
                  
                  {/* Background decoration for active cards */}
                  {device.status && (
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full mix-blend-overlay opacity-20"
                         style={{ background: 'white', transform: 'translate(30%, -30%)' }}></div>
                  )}

                  <div className="flex justify-between items-start mb-auto relative z-10">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                         style={{ background: device.status ? 'rgba(255,255,255,0.2)' : 'var(--bg-card)' }}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={device.icon}/></svg>
                    </div>
                    
                    {/* Toggle Switch */}
                    <div onClick={(e) => { e.stopPropagation(); toggleDevice(device.id); }}
                         className="w-12 h-6 rounded-full p-1 cursor-pointer transition-colors relative"
                         style={{ background: device.status ? 'rgba(255,255,255,0.3)' : 'var(--bg-card)' }}>
                      <div className="w-4 h-4 rounded-full bg-white transition-transform duration-300"
                           style={{ transform: device.status ? 'translateX(24px)' : 'translateX(0)', background: device.status ? '#FFF' : 'var(--text-secondary)' }}></div>
                    </div>
                  </div>

                  <div className="relative z-10 mt-4">
                    <h3 className="font-bold text-lg">{device.name}</h3>
                    <p className="text-sm mt-1 transition-colors" style={{ color: device.status ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)' }}>
                      {device.status ? (device.type === 'light' ? `${device.value}% Brightness` : device.type === 'climate' ? `${device.value}°F Set` : 'Running') : 'Off'}
                    </p>
                  </div>
                </div>
              ))}

              {/* Add Device Card */}
              <div className="rounded-3xl p-6 border border-dashed flex flex-col items-center justify-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                   style={{ borderColor: 'var(--border)', height: '180px' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: 'var(--bg-secondary)' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                </div>
                <span className="font-semibold">Add Device</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
