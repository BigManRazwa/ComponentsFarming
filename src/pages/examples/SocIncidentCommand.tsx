import { useState, useEffect } from 'react'

type Variant = 'crimson' | 'emerald' | 'cyan'

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#F43F5E': 'crimson',
  '#10B981': 'emerald',
  '#06B6D4': 'cyan',
}

const THEMES: Record<Variant, Record<string, string>> = {
  crimson: {
    '--accent': '#F43F5E',
    '--accent-hover': '#E11D48',
    '--accent-light': 'rgba(244, 63, 94, 0.16)',
    '--bg-primary': '#0A0507',
    '--bg-secondary': '#14090E',
    '--bg-card': '#1F0E16',
    '--border': '#361726',
    '--text-primary': '#FFF1F2',
    '--text-secondary': '#B87B94',
  },
  emerald: {
    '--accent': '#10B981',
    '--accent-hover': '#059669',
    '--accent-light': 'rgba(16, 185, 129, 0.16)',
    '--bg-primary': '#040B07',
    '--bg-secondary': '#0A160F',
    '--bg-card': '#102418',
    '--border': '#193D28',
    '--text-primary': '#F0FDF4',
    '--text-secondary': '#68A684',
  },
  cyan: {
    '--accent': '#06B6D4',
    '--accent-hover': '#0891B2',
    '--accent-light': 'rgba(6, 182, 212, 0.16)',
    '--bg-primary': '#04090D',
    '--bg-secondary': '#09121A',
    '--bg-card': '#0E1F2E',
    '--border': '#16334D',
    '--text-primary': '#F0FDFA',
    '--text-secondary': '#6D97BD',
  },
}

interface Incident {
  id: string
  title: string
  target: string
  sourceIp: string
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM'
  time: string
  status: 'MITIGATING' | 'INVESTIGATING' | 'BLOCKED'
}

const INCIDENTS: Incident[] = [
  {
    id: 'INC-9041',
    title: 'Kernel Privilege Escalation (CVE-2026-1182)',
    target: 'db-cluster-node-04',
    sourceIp: '185.220.101.5',
    severity: 'CRITICAL',
    time: '02m ago',
    status: 'MITIGATING',
  },
  {
    id: 'INC-9039',
    title: 'Volumetric SYN Flood 420 Gbps',
    target: 'edge-gateway-eu-west',
    sourceIp: 'Multiple (Botnet Mirai.v4)',
    severity: 'CRITICAL',
    time: '07m ago',
    status: 'BLOCKED',
  },
  {
    id: 'INC-9036',
    title: 'Lateral Movement via SMB Port 445',
    target: 'corp-activedirectory-01',
    sourceIp: '10.240.12.88',
    severity: 'HIGH',
    time: '14m ago',
    status: 'INVESTIGATING',
  },
  {
    id: 'INC-9032',
    title: 'C2 Beaconing Pattern Detected',
    target: 'api-worker-k8s-pod',
    sourceIp: '45.154.255.89',
    severity: 'HIGH',
    time: '28m ago',
    status: 'BLOCKED',
  },
]

export function SocIncidentCommand({ variant = 'crimson' }: { variant?: Variant }) {
  const [currentTheme, setCurrentTheme] = useState<Variant>(variant)
  const [customFont, setCustomFont] = useState('')
  const [selectedIncident, setSelectedIncident] = useState('INC-9041')
  const [isIsolated, setIsIsolated] = useState(false)
  const [activeTab, setActiveTab] = useState<'map' | 'pcap' | 'forensics'>('map')

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
        .soc-wrapper { font-family: ${customFont || "'JetBrains Mono', 'Fira Code', monospace"}; }
        .soc-wrapper * { box-sizing: border-box; }
        .soc-wrapper ::-webkit-scrollbar { width: 4px; height: 4px; }
        .soc-wrapper ::-webkit-scrollbar-track { background: var(--bg-primary); }
        .soc-wrapper ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
        .grid-matrix {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>
      <div
        className="soc-wrapper min-h-screen flex flex-col select-none"
        style={{ ...cssVars, background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        data-theme={currentTheme}
      >
        {/* Top SOC Incident Status Bar */}
        <header className="border-b px-6 py-2.5 flex items-center justify-between text-xs font-mono" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <span className="font-black text-sm tracking-wider uppercase">DEFCON 2 // GLOBAL SOC COMMAND</span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
              <span>THREAT LEVEL: <strong className="text-red-400">CRITICAL</strong></span>
              <span>INGEST: <strong className="text-white">16,420 eps</strong></span>
              <span>FILTERED: <strong className="text-emerald-400">99.84%</strong></span>
              <span>FIREWALL: <strong className="text-white">SNORT-NG 4.2</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded border text-[11px] font-bold" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>SIEM NODE:</span>
              <span style={{ color: 'var(--accent)' }}>US-EAST-1A</span>
            </div>

            <button
              onClick={() => setIsIsolated(!isIsolated)}
              className="px-3.5 py-1 rounded font-bold text-xs cursor-pointer tracking-wider uppercase transition-all shadow"
              style={{
                background: isIsolated ? '#10B981' : 'var(--accent)',
                color: '#FFF',
                boxShadow: '0 0 12px var(--accent-light)',
              }}
            >
              {isIsolated ? 'ENDPOINT ISOLATED' : 'CONTAIN THREAT'}
            </button>
          </div>
        </header>

        {/* 3-Column Tactical SOC Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Real-Time Incident Stream & CVE Database (Cols 3) */}
          <aside className="lg:col-span-3 border-r p-4 flex flex-col justify-between space-y-4 overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold tracking-widest uppercase text-[11px]" style={{ color: 'var(--accent)' }}>
                  [ACTIVE INCIDENTS]
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-red-500/20 text-red-400">
                  4 UNRESOLVED
                </span>
              </div>

              {/* Incidents List */}
              <div className="space-y-2.5">
                {INCIDENTS.map((inc) => {
                  const isSelected = selectedIncident === inc.id
                  return (
                    <div
                      key={inc.id}
                      onClick={() => setSelectedIncident(inc.id)}
                      className="p-3 rounded-xl border transition-all cursor-pointer space-y-1.5"
                      style={{
                        borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                        background: isSelected ? 'var(--bg-card)' : 'transparent',
                        boxShadow: isSelected ? '0 0 10px var(--accent-light)' : 'none',
                      }}
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono font-bold" style={{ color: 'var(--accent)' }}>
                          {inc.id}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="px-1.5 py-0.2 rounded font-black text-[9px]"
                            style={{
                              background: inc.severity === 'CRITICAL' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                              color: inc.severity === 'CRITICAL' ? '#EF4444' : '#F59E0B',
                            }}
                          >
                            {inc.severity}
                          </span>
                          <span className="text-zinc-500">{inc.time}</span>
                        </div>
                      </div>

                      <h4 className="font-bold text-xs leading-snug text-white truncate">{inc.title}</h4>

                      <div className="flex justify-between text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                        <span className="truncate max-w-[130px]">DST: {inc.target}</span>
                        <span className="font-mono text-zinc-400">{inc.status}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Zero-Day Vulnerability Feed */}
              <div className="p-3 rounded-xl border space-y-2 mt-4" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                  ZERO-DAY CVE WATCHLIST
                </span>
                {[
                  { cve: 'CVE-2026-1182', score: '9.8', desc: 'Linux eBPF Local Privilege Escalation' },
                  { cve: 'CVE-2026-0489', score: '8.4', desc: 'OpenSSL Timing Attack in TLS 1.3 Handshake' },
                  { cve: 'CVE-2026-3021', score: '7.5', desc: 'Kube-proxy IPVS Rule Injection' },
                ].map((item) => (
                  <div key={item.cve} className="text-[10px] border-b pb-1.5 last:border-none" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex justify-between font-bold">
                      <span className="text-white">{item.cve}</span>
                      <span className="text-red-400">CVSS {item.score}</span>
                    </div>
                    <p className="text-[9px] truncate" style={{ color: 'var(--text-secondary)' }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SOC Shift Roster */}
            <div className="pt-2 border-t text-[11px] flex justify-between items-center" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              <span>ON-DUTY: <strong>SecOps Alpha Team</strong></span>
              <span className="text-emerald-400 font-bold">● 6 ANALYSTS</span>
            </div>
          </aside>

          {/* Center Column: Global Attack Vector Map & Hex Packet Dump (Cols 6) */}
          <main className="lg:col-span-6 flex flex-col p-4 space-y-3 overflow-hidden">
            {/* View Mode Tabs */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5 text-xs font-mono font-bold">
                {(['map', 'pcap', 'forensics'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer uppercase"
                    style={{
                      background: activeTab === tab ? 'var(--accent)' : 'transparent',
                      borderColor: activeTab === tab ? 'transparent' : 'var(--border)',
                      color: activeTab === tab ? '#FFF' : 'var(--text-secondary)',
                    }}
                  >
                    {tab === 'map' ? 'Global Threat Vector' : tab === 'pcap' ? 'Raw Packet Hex Dump' : 'Sandbox Forensics'}
                  </button>
                ))}
              </div>

              <div className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                ZOOM: <strong className="text-white">AUTO-FOCUS TARGET</strong>
              </div>
            </div>

            {/* Threat Vector Canvas Simulation */}
            {activeTab === 'map' && (
              <div className="aspect-[16/9] w-full rounded-2xl border relative overflow-hidden flex flex-col justify-between p-4 grid-matrix shadow-2xl" style={{ borderColor: 'var(--accent)', background: '#030508' }}>
                {/* Simulated Geographic Attack Trajectories */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Target Node: Core DC */}
                  <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-cyan-400 animate-ping"></div>
                    <div className="w-3 h-3 rounded-full bg-cyan-500 absolute top-0.5"></div>
                    <span className="text-[10px] font-mono font-bold text-cyan-300 mt-2 bg-black/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
                      US-EAST-1 [PRIMARY DC]
                    </span>
                  </div>

                  {/* Attacker Origin Node 1: Frankfurt */}
                  <div className="absolute top-1/3 left-1/3 flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-red-600 absolute"></div>
                    <span className="text-[9px] font-mono font-bold text-red-400 mt-2 bg-black/80 px-1 rounded border border-red-500/30">
                      AS-9402 [FRANKFURT]
                    </span>
                  </div>

                  {/* Attacker Origin Node 2: Asia Pacific */}
                  <div className="absolute bottom-1/4 left-1/5 flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                    <span className="text-[9px] font-mono text-amber-400 mt-1 bg-black/80 px-1 rounded">
                      SYN FLOOD VECTOR #2
                    </span>
                  </div>

                  {/* Connecting Trajectory Curve */}
                  <svg className="w-full h-full absolute inset-0 stroke-red-500/60" fill="none">
                    <path d="M 320 180 Q 480 80 620 220" strokeWidth="2" strokeDasharray="6 4" />
                    <path d="M 220 320 Q 420 360 620 220" strokeWidth="1.5" strokeDasharray="4 4" className="stroke-amber-500/50" />
                  </svg>
                </div>

                {/* Top telemetry overlay */}
                <div className="z-10 flex justify-between text-[11px] font-mono">
                  <span className="text-red-400 font-bold">● ACTIVE EXPLOIT INGESTION DETECTED</span>
                  <span style={{ color: 'var(--text-secondary)' }}>PEAK VOLUMETRIC: 420 Gbps (18.2M pps)</span>
                </div>

                {/* Bottom telemetry overlay */}
                <div className="z-10 flex justify-between items-end text-[10px] font-mono">
                  <div className="space-y-0.5">
                    <div className="text-zinc-400">SRC: 185.220.101.5:49152 → DST: 10.240.12.88:445</div>
                    <div className="text-red-400">SIGNATURE: ET EXPLOIT MS-SMB Lateral Reconnaissance Probe</div>
                  </div>
                  <span className="bg-black/80 px-2 py-1 rounded border" style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}>
                    BGP ANYCAST MITIGATION: ON
                  </span>
                </div>
              </div>
            )}

            {/* Hex PCAP Packet Inspection */}
            {activeTab !== 'map' && (
              <div className="aspect-[16/9] w-full rounded-2xl border p-4 font-mono text-xs overflow-y-auto space-y-1 bg-black/80" style={{ borderColor: 'var(--accent)' }}>
                <div className="text-zinc-400 pb-2 border-b border-white/10 flex justify-between text-[11px]">
                  <span>OFFSET 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F</span>
                  <span className="text-red-400">MALICIOUS PAYLOAD</span>
                </div>
                <div className="text-emerald-400">00000000  7f 45 4c 46 02 01 01 00  00 00 00 00 00 00 00 00  |.ELF............|</div>
                <div className="text-emerald-400">00000010  03 00 3e 00 01 00 00 00  90 58 00 00 00 00 00 00  |..&gt;......X......|</div>
                <div className="text-red-400 font-bold">00000020  40 00 00 00 00 00 00 00  18 1f 02 00 00 00 00 00  |@...............| [SHELLCODE]</div>
                <div className="text-zinc-400">00000030  00 00 00 00 40 00 38 00  09 00 40 00 1f 00 1e 00  |....@.8...@.....|</div>
                <div className="text-zinc-400">00000040  06 00 00 00 04 00 00 00  40 00 00 00 00 00 00 00  |........@.......|</div>
                <div className="text-amber-400">00000050  2f 62 69 6e 2f 73 68 00  63 61 74 20 2f 65 74 63  |/bin/sh.cat /etc|</div>
                <div className="text-amber-400">00000060  2f 73 68 61 64 6f 77 00  7c 20 6e 63 20 34 35 2e  |/shadow.| nc 45.| [CREDENTIAL EXFIL]</div>
              </div>
            )}

            {/* Incident Diagnostic Metrics */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl border font-mono space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                  CONTAINMENT STATUS
                </span>
                <div className={`font-bold ${isIsolated ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isIsolated ? 'ISOLATED [AIR-GAPPED]' : 'ACTIVE EXPOSURE'}
                </div>
              </div>

              <div className="p-3 rounded-xl border font-mono space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                  BLOCKED IP CIDR
                </span>
                <div className="font-bold text-white">185.220.101.0/24</div>
              </div>

              <div className="p-3 rounded-xl border font-mono space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>
                  FORENSIC PCAP DUMP
                </span>
                <div className="font-bold text-cyan-400">CAP_8091.PCAP [1.4GB]</div>
              </div>
            </div>
          </main>

          {/* Right Column: Threat Classification & SIEM Event Terminal (Cols 3) */}
          <aside className="lg:col-span-3 border-l p-4 flex flex-col justify-between space-y-4 overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold tracking-widest uppercase text-[11px]" style={{ color: 'var(--accent)' }}>
                  [ATTACK TAXONOMY]
                </span>
                <span className="text-[10px] font-mono text-zinc-400">LAST 24H</span>
              </div>

              {/* Taxonomy Bar Charts */}
              <div className="space-y-2.5 text-xs font-mono">
                {[
                  { label: 'DDoS / Syn Flood', pct: 44, color: '#F43F5E' },
                  { label: 'Brute Force & Kerberoast', pct: 28, color: '#F59E0B' },
                  { label: 'Zero-Day RCE Exploit', pct: 18, color: '#8B5CF6' },
                  { label: 'C2 Reverse Shell', pct: 10, color: '#06B6D4' },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span>{item.label}</span>
                      <span className="font-bold">{item.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded bg-black/40 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                      <div className="h-full rounded" style={{ width: `${item.pct}%`, background: item.color }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quarantine Actions */}
              <div className="p-3 rounded-xl border space-y-2 mt-4" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--accent)' }}>
                  INCIDENT RESPONSE PLAYBOOKS
                </span>
                <div className="space-y-1.5 text-[11px] font-mono">
                  <button className="w-full py-1.5 px-2 rounded border text-left hover:bg-white/5 cursor-pointer flex justify-between" style={{ borderColor: 'var(--border)' }}>
                    <span>1. Rotate Kerberos Tickets</span>
                    <span className="text-emerald-400">DONE</span>
                  </button>
                  <button className="w-full py-1.5 px-2 rounded border text-left hover:bg-white/5 cursor-pointer flex justify-between" style={{ borderColor: 'var(--border)' }}>
                    <span>2. Scrub BGP Route Tables</span>
                    <span className="text-emerald-400">DONE</span>
                  </button>
                  <button className="w-full py-1.5 px-2 rounded border text-left hover:bg-white/5 cursor-pointer flex justify-between" style={{ borderColor: 'var(--border)' }}>
                    <span>3. Invalidate Active JWTs</span>
                    <span className="text-amber-400">PENDING</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Real-Time SIEM Log Stream Terminal */}
            <div className="p-3 rounded-xl border font-mono text-[9px] space-y-1 bg-black/70" style={{ borderColor: 'var(--border)' }}>
              <div className="font-bold text-zinc-400 pb-1 border-b border-white/10">[SIEM EVENT AUDIT]</div>
              <div className="text-red-400">13:51:02 IDS: ALERT Exploit Attempt [185.220.101.5]</div>
              <div className="text-emerald-400">13:51:08 ACL: DROP tcp from any to :445</div>
              <div className="text-zinc-400">13:51:14 K8S: Container quarantine initiated</div>
              <div className="text-cyan-400">13:51:22 SOC: Analyst JD assigned to INC-9041</div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
