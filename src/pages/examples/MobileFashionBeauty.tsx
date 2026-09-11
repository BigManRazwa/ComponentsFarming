import { useState, useEffect, useRef } from 'react';

type Variant = 'pulse' | 'ocean' | 'emerald';

const THEMES: Record<Variant, { accent: string; accentLight: string; accentSoft: string }> = {
  pulse: { accent: '#B8574B', accentLight: '#B8574B18', accentSoft: '#B8574B30' },
  ocean: { accent: '#3B6FB5', accentLight: '#3B6FB518', accentSoft: '#3B6FB530' },
  emerald: { accent: '#4A8B6F', accentLight: '#4A8B6F18', accentSoft: '#4A8B6F30' },
};

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#EE4D2D': 'pulse', '#ee4d2d': 'pulse',
  '#0D6EFD': 'ocean', '#0d6efd': 'ocean',
  '#059669': 'emerald',
};

/* ─── IntersectionObserver hook ─── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, v };
}

/* ─── Data ─── */
const heroProducts = [
  { name: 'The Drape Line...', sub: 'Natural Ecru', price: 280, badge: 'Organic Flax', img: 'linear-gradient(135deg, #D4C5B0 0%, #E8DED0 50%, #C9B99A 100%)' },
  { name: 'Balancing Dew...', sub: '100ml Cold-Infused', price: 84, badge: 'Fresh Harvest', img: 'linear-gradient(135deg, #C4A97D 0%, #D4BC96 50%, #B89B6A 100%)' },
  { name: 'Cloud Cashmer...', sub: 'Soft Oat Warmth', price: 340, badge: '', img: 'linear-gradient(135deg, #E2D5C3 0%, #D8C8B2 50%, #CBB89E 100%)' },
  { name: 'Camellia...', sub: '30ml Pure Potency', price: 92, badge: 'Cold Pressed', img: 'linear-gradient(135deg, #C0A882 0%, #D4BFA0 50%, #AE9670 100%)' },
];

const editorialProducts = [
  { num: '01', name: 'Raw Silk Trench Coat', price: '$680', desc: 'Hand-finished raw silk with natural draping. An investment piece for conscious dressing.', img: 'linear-gradient(135deg, #E5DBC9 0%, #D4C7B2 50%, #C9B99A 100%)' },
  { num: '02', name: 'Incandescent Barrier Balm', price: '$48', desc: 'Cold-pressed botanical barrier with frankincense resin. Locks in hydration without residue.', img: 'linear-gradient(135deg, #8B7355 0%, #A08662 50%, #7A654A 100%)' },
  { num: '03', name: 'Planted Cotton Textures', price: '', desc: 'Organic cotton grown with regenerative farming principles. 85% lower water usage.', img: 'linear-gradient(135deg, #C4B396 0%, #D8CCBA 50%, #B0A080 100%)' },
  { num: '04', name: 'Wild Fig & Vetiver Botanical Mix', price: '$72', desc: 'A grounding aromatic blend crafted from wildcrafted Mediterranean botanicals.', img: 'linear-gradient(135deg, #9B8564 0%, #B49A74 50%, #887450 100%)' },
  { num: '05', name: 'Ribbed Modal Lounge Romper', price: '$165', desc: 'Ultra-soft modal ribbed fabric for effortless living. Designed for comfort and movement.', img: 'linear-gradient(135deg, #D4C5B0 0%, #C9B8A0 50%, #BEA990 100%)' },
];

const ritualSteps = [
  { num: '01', time: '03 Mins', tag: 'Thermal Base', title: 'Thermal Cleansing', desc: 'Run a pump of botanical cleansing balm between palms to melt texture. Press gently onto dry facial contours, releasing micro-impurities and unburdening congested pores.', details: [['WATER TEMP', '37°C/Lukewarm'], ['KEY BOTANICAL', 'Rice Bran & Yuzu']], tip: 'Pre-Tip: Infuse the steam for three deep cycles before moving until the veins turn milky white.' },
  { num: '02', time: '02 Mins', tag: 'Hydration', title: 'Cellular Hydration Mist', desc: 'Hold mist 6 inches from face and let it descend as an even botanical cloud. Cusp over cheeks and forehead with a slow, deliberate pressure to lock moisture deep into cellular junctions.', details: [['Application Method', 'Gentle Press (No Rubbing)'], ['Formulation Focus', 'Hyaluronic & White Lotus']], tip: '' },
  { num: '03', time: '03 Mins', tag: '', title: 'Sculpt & Lymphatic Drainage', desc: 'Using a gua sha stone or gentle knuckle pressure, sweep along the mandible line towards the earlobes, gliding downward along the cervical lymph channels.', details: [['CADENCE', '5 Upward Passes'], ['PRESSURE', 'Medium'], ['ANGLE', '15° Flat Plane']], tip: '' },
  { num: '04', time: '02 Mins', tag: 'Final Shield', title: 'Barrier Sealing Elixir', desc: 'Seal hydration with 3 concentrated drops of cold-pressed botanical oil. Smooth firmly over nose and mouth. Breath slowly, then pat into the skin barrier until dry to the touch.', details: [['Finishing Touch', 'Mindful Stillness'], ['', 'Locked & Protected']], tip: '' },
];

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */
export function MobileFashionBeauty({ variant = 'pulse' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customAccent, setCustomAccent] = useState<{ accent: string; accentLight: string; accentSoft: string } | null>(null);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [activePill, setActivePill] = useState(0);
  const [bottomNav, setBottomNav] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioProgress] = useState(35);

  useEffect(() => { setActiveTheme(variant); }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { setActiveTheme('pulse'); setCustomAccent(null); return; }
      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) { setActiveTheme(themeName); setCustomAccent(null); }
      else {
        setActiveTheme('pulse');
        setCustomAccent({
          accent: variation.accent,
          accentLight: variation.accent + '18',
          accentSoft: variation.accent + '30',
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const t = customAccent || THEMES[activeTheme];
  const s1 = useInView(); const s2 = useInView(); const s3 = useInView(); const s4 = useInView();
  const s5 = useInView(); const s6 = useInView(); const s7 = useInView();

  const pills = ['ALL ESSENTIALS', 'RAW SILK & LINEN', 'DEWY BOTA...'];
  const navItems = [
    { label: 'HOME', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4' },
    { label: 'COLLECTION', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { label: 'RITUALS', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { label: 'JOURNAL', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { label: 'ACCOUNT', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  const anim = (visible: boolean, delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `all 0.6s ease-out ${delay}s`,
  });

  return (
    <div className="min-h-screen bg-zinc-950 flex items-start justify-center py-6">
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(15px); } to { opacity:1; transform:translateY(0); } }
        .anim-up { animation: fadeUp 0.5s ease-out both; }
      `}</style>

      {/* Floating theme switcher */}
      <div className="fixed bottom-6 right-6 z-[60] flex gap-2 p-1.5 rounded-full bg-zinc-900/90 backdrop-blur border border-zinc-700 shadow-xl">
        {(Object.keys(THEMES) as Variant[]).map((v) => (
          <button key={v} onClick={() => { setActiveTheme(v); setCustomAccent(null); }}
            className="w-6 h-6 rounded-full transition-all"
            style={{ backgroundColor: THEMES[v].accent, outline: activeTheme === v && !customAccent ? `2px solid ${THEMES[v].accent}` : 'none', outlineOffset: 2, transform: activeTheme === v && !customAccent ? 'scale(1.2)' : 'scale(1)' }}
          />
        ))}
      </div>

      {/* ═══ PHONE FRAME ═══ */}
      <div className="w-[390px] min-h-[844px] bg-[#F5F0EB] relative overflow-y-auto overflow-x-hidden pb-20" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

        {/* ═══════ TOP BAR ═══════ */}
        <div className="sticky top-0 z-30 bg-[#F5F0EB]/95 backdrop-blur-md px-5 py-3 flex items-center justify-between border-b border-[#E5DDD3]/60">
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] tracking-[0.3em] text-[#8B8579]" style={{ fontFamily: 'system-ui, sans-serif' }}>É P U R E</span>
            <span className="text-[15px] font-bold text-[#2C2C2C] ml-1">ÉPURE</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Search */}
            <svg className="w-[18px] h-[18px] text-[#2C2C2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            {/* User */}
            <svg className="w-[18px] h-[18px] text-[#2C2C2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            {/* Cart with badge */}
            <div className="relative">
              <svg className="w-[18px] h-[18px] text-[#2C2C2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white text-[8px] flex items-center justify-center font-bold" style={{ backgroundColor: t.accent, fontFamily: 'system-ui' }}>3</span>
            </div>
          </div>
        </div>

        {/* ═══════ SCREEN 1: HERO ═══════ */}
        <div ref={s1.ref} style={anim(s1.v)}>
          {/* Hero Image */}
          <div className="relative mx-4 mt-4 rounded-2xl overflow-hidden h-[320px]" style={{ background: 'linear-gradient(160deg, #E8DED0 0%, #D4C5B0 30%, #C9B99A 60%, #BEB09A 100%)' }}>
            {/* Decorative overlay */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(245,240,235,0.3) 100%)' }} />
            {/* Silhouette shape */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[280px] rounded-t-full" style={{ background: 'linear-gradient(180deg, #FFFDF9 0%, #F0E6D8 100%)', opacity: 0.3 }} />
            {/* Edition tag */}
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#2C2C2C]/70 backdrop-blur">
              <span className="text-[9px] tracking-widest text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>EDITION 04 • EQUINOX</span>
            </div>
          </div>

          {/* Hero Text */}
          <div className="px-5 pt-5 pb-2">
            <p className="text-[9px] tracking-[0.25em] text-[#8B8579] uppercase mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>The Spring Equinox Edition</p>
            <h1 className="text-[26px] leading-[1.2] text-[#2C2C2C] italic mb-3">
              Quietude in Form &<br />Formula
            </h1>
            <p className="text-[12px] leading-[1.6] text-[#8B8579] mb-5" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Conscious silken silhouettes meet cold-pressed botanical extractions. Tailored for calm mornings and slow transitions.
            </p>
            <button className="px-6 py-3 rounded-full bg-[#2C2C2C] text-white text-[11px] tracking-[0.1em] font-medium flex items-center gap-2" style={{ fontFamily: 'system-ui, sans-serif' }}>
              EXPLORE SPRING ATELIER <span>→</span>
            </button>
          </div>
        </div>

        {/* ═══════ CATEGORY PILLS ═══════ */}
        <div ref={s2.ref} style={anim(s2.v, 0.1)} className="px-5 pt-5 pb-2">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {pills.map((pill, i) => (
              <button key={pill} onClick={() => setActivePill(i)}
                className="shrink-0 px-4 py-2 rounded-full text-[10px] tracking-wider font-medium transition-all whitespace-nowrap"
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  backgroundColor: activePill === i ? '#2C2C2C' : 'transparent',
                  color: activePill === i ? '#FFFDF9' : '#8B8579',
                  border: activePill === i ? '1px solid #2C2C2C' : '1px solid #D4C5B0',
                }}>
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* ═══════ CURATED FOR CALM (Product Grid) ═══════ */}
        <div ref={s3.ref} style={anim(s3.v, 0.15)} className="px-5 pt-4 pb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] tracking-[0.2em] text-[#8B8579] uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>Selected Works</span>
            <span className="text-[10px] tracking-wider text-[#8B8579] flex items-center gap-1" style={{ fontFamily: 'system-ui, sans-serif' }}>VIEW ALL <span>→</span></span>
          </div>
          <h2 className="text-[22px] text-[#2C2C2C] italic mb-4">Curated for Calm</h2>

          <div className="grid grid-cols-2 gap-3">
            {heroProducts.map((p, i) => (
              <div key={i} className="group" style={{ animation: s3.v ? `fadeUp 0.5s ease-out ${0.1 * i}s both` : 'none', opacity: s3.v ? undefined : 0 }}>
                <div className="relative aspect-square rounded-xl overflow-hidden mb-2" style={{ background: p.img }}>
                  {/* Wishlist */}
                  <button onClick={() => setWishlist(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; })}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur flex items-center justify-center transition-all">
                    <svg className="w-3.5 h-3.5" fill={wishlist.has(i) ? t.accent : 'none'} stroke={wishlist.has(i) ? t.accent : '#2C2C2C'} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                  </button>
                  {/* Badge */}
                  {p.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[8px] tracking-wider bg-white/80 backdrop-blur text-[#2C2C2C]" style={{ fontFamily: 'system-ui, sans-serif' }}>{p.badge}</span>
                  )}
                </div>
                <p className="text-[12px] text-[#2C2C2C] font-medium truncate">{p.name}</p>
                <p className="text-[10px] text-[#8B8579] mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>{p.sub}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#2C2C2C] font-bold" style={{ fontFamily: 'system-ui, sans-serif' }}>${p.price}</span>
                  <button className="w-6 h-6 rounded-full border border-[#D4C5B0] flex items-center justify-center text-[#2C2C2C] text-[14px] leading-none hover:border-[#2C2C2C] transition-colors">+</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ DAILY PAUSE ═══════ */}
        <div ref={s4.ref} style={anim(s4.v, 0.1)} className="mx-4 mb-6 rounded-2xl bg-[#2C2C2C] p-6 text-center">
          <p className="text-[9px] tracking-[0.3em] text-[#8B8579] uppercase mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>Daily Pause</p>
          <p className="text-[16px] leading-[1.5] text-[#E5DDD3] italic mb-3">
            "A gentle rhythm for intentional living and mindful self care."
          </p>
          <p className="text-[10px] text-[#8B8579] leading-relaxed mb-5" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Take three conscious breaths before continuing your passage through the gallery.
          </p>
          <button className="px-5 py-2.5 rounded-full border text-[10px] tracking-wider text-[#E5DDD3] transition-all"
            style={{ borderColor: t.accent, fontFamily: 'system-ui, sans-serif' }}>
            ⊕ BEGIN 40S STILLNESS
          </button>
          <div className="mt-5 pt-4 border-t border-[#3D3D3D]">
            <p className="text-[8px] tracking-[0.25em] text-[#5A5A5A] uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>ÉPURE ATELIER • CONSCIOUS SLOW CREATION</p>
            <p className="text-[9px] text-[#4A4A4A] mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>Crafted in harmony with seasonal cycles and natural rhythms.</p>
          </div>
        </div>

        {/* ═══════ DIVIDER ═══════ */}
        <div className="flex items-center gap-3 px-5 py-4">
          <div className="flex-1 h-px bg-[#D4C5B0]" />
          <span className="text-[8px] tracking-[0.3em] text-[#8B8579]" style={{ fontFamily: 'system-ui, sans-serif' }}>ATELIER / CARE / LIVING</span>
          <div className="flex-1 h-px bg-[#D4C5B0]" />
        </div>

        {/* ═══════ SCREEN 2: CURATED PRESENCE ═══════ */}
        <div className="px-5 pb-2">
          <h2 className="text-[22px] text-[#2C2C2C] italic mb-1">Curated Presence</h2>
          <p className="text-[11px] text-[#8B8579] leading-relaxed mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Mindfully selected garments and botanicals, each chosen for intentional daily rituals.
          </p>
        </div>

        {/* Editorial Product Cards */}
        <div ref={s5.ref} className="px-4 space-y-4 pb-6">
          {editorialProducts.map((p, i) => (
            <div key={i} style={anim(s5.v, 0.1 * i)} className="rounded-2xl bg-[#FFFDF9] border border-[#E5DDD3]/60 overflow-hidden">
              {/* Image */}
              <div className="h-[200px] relative" style={{ background: p.img }}>
                <span className="absolute top-3 left-3 text-[9px] tracking-widest text-white/80 bg-[#2C2C2C]/40 backdrop-blur px-2 py-1 rounded" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  No. {p.num}
                </span>
              </div>
              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[15px] text-[#2C2C2C] font-medium leading-tight flex-1">{p.name}</h3>
                  {p.price && <span className="text-[14px] text-[#2C2C2C] font-bold ml-3" style={{ fontFamily: 'system-ui, sans-serif' }}>{p.price}</span>}
                </div>
                <p className="text-[11px] text-[#8B8579] leading-relaxed mb-3" style={{ fontFamily: 'system-ui, sans-serif' }}>{p.desc}</p>
                <button className="px-4 py-2 rounded-full text-[9px] tracking-wider border transition-all"
                  style={{ borderColor: t.accent, color: t.accent, fontFamily: 'system-ui, sans-serif' }}>
                  + ESSENTIAL №.{p.num}
                </button>
              </div>
            </div>
          ))}

          {/* Quote Block */}
          <div className="py-6 px-2 text-center">
            <p className="text-[15px] text-[#2C2C2C] italic leading-[1.7] mb-3">
              "Garments and scents should not mask who you are, but reveal the essence you hold within."
            </p>
            <span className="text-[9px] tracking-[0.2em] text-[#8B8579] uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>— Épure Atelier</span>
          </div>

          {/* Mindful Packaging Pledge */}
          <div className="rounded-2xl border border-[#E5DDD3] bg-[#FFFDF9] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: t.accentLight }}>
                <svg className="w-4 h-4" style={{ color: t.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              </div>
              <h3 className="text-[13px] text-[#2C2C2C] font-medium">Mindful Packaging Pledge</h3>
            </div>
            <p className="text-[10px] text-[#8B8579] leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Every ÉPURE parcel ships in 100% compostable materials. Zero plastic, always. Our packaging is designed to return to the earth.
            </p>
          </div>
        </div>

        {/* ═══════ DIVIDER ═══════ */}
        <div className="flex items-center gap-3 px-5 py-6">
          <div className="flex-1 h-px bg-[#D4C5B0]" />
          <span className="text-[8px] tracking-[0.3em] text-[#8B8579]" style={{ fontFamily: 'system-ui, sans-serif' }}>RITUALS & ROUTINES</span>
          <div className="flex-1 h-px bg-[#D4C5B0]" />
        </div>

        {/* ═══════ SCREEN 3: GUIDED SEQUENCES ═══════ */}
        <div ref={s6.ref} style={anim(s6.v)} className="px-5 pb-4">
          <h2 className="text-[24px] text-[#2C2C2C] mb-2">Guided Sequences</h2>
          <p className="text-[11px] text-[#8B8579] leading-relaxed mb-3" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Step 1 of 4 • Awaken Body & Spirit. A 4-step sensory progression designed to clarify and replenish.
          </p>
          <div className="flex items-center gap-4 mb-5" style={{ fontFamily: 'system-ui, sans-serif' }}>
            <div className="flex items-center gap-1.5 text-[10px] text-[#8B8579]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              12 MINS TOTAL
            </div>
            <span className="text-[10px] text-[#8B8579]">4 RITUAL STEPS</span>
          </div>

          {/* Audio Player */}
          <div className="rounded-xl bg-[#FFFDF9] border border-[#E5DDD3] p-4 mb-6">
            <p className="text-[8px] tracking-[0.2em] text-[#8B8579] uppercase mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>KINOSENSIC SOUNDSCAPE</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setAudioPlaying(!audioPlaying)}
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all"
                style={{ backgroundColor: t.accent }}>
                {audioPlaying ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                ) : (
                  <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>
              <div className="flex-1">
                <p className="text-[12px] text-[#2C2C2C] font-medium mb-1">01 Ambient Morning Linen</p>
                <div className="w-full bg-[#E5DDD3] rounded-full h-1 relative">
                  <div className="h-1 rounded-full transition-all duration-300" style={{ width: `${audioProgress}%`, backgroundColor: t.accent }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[9px] text-[#8B8579]" style={{ fontFamily: 'system-ui, sans-serif' }}>4:28</span>
                  <span className="text-[9px] text-[#8B8579]" style={{ fontFamily: 'system-ui, sans-serif' }}>12:40</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sequence Progression */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] tracking-[0.15em] text-[#8B8579] uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>Sequence Progression</span>
            <span className="text-[9px] text-[#8B8579]" style={{ fontFamily: 'system-ui, sans-serif' }}>All Steps Required</span>
          </div>
        </div>

        {/* Ritual Steps */}
        <div ref={s7.ref} className="px-4 space-y-3 pb-6">
          {ritualSteps.map((step, i) => (
            <div key={i} style={anim(s7.v, 0.12 * i)} className="rounded-xl bg-[#FFFDF9] border border-[#E5DDD3] overflow-hidden">
              {/* Step header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E5DDD3]/60">
                <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded text-white" style={{ backgroundColor: t.accent, fontFamily: 'system-ui, sans-serif' }}>STEP {step.num}</span>
                <span className="text-[9px] text-[#8B8579]" style={{ fontFamily: 'system-ui, sans-serif' }}>{step.time}</span>
                {step.tag && <span className="text-[9px] px-2 py-0.5 rounded bg-[#F5F0EB] text-[#8B8579] ml-auto" style={{ fontFamily: 'system-ui, sans-serif' }}>{step.tag}</span>}
              </div>
              {/* Step body */}
              <div className="p-4">
                <h3 className="text-[14px] text-[#2C2C2C] font-medium mb-2">{step.title}</h3>
                <p className="text-[10px] text-[#8B8579] leading-relaxed mb-3" style={{ fontFamily: 'system-ui, sans-serif' }}>{step.desc}</p>
                {/* Detail tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {step.details.filter(d => d[0]).map((d, j) => (
                    <div key={j} className="px-2.5 py-1.5 rounded-lg bg-[#F5F0EB] text-[9px]" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      <span className="text-[#8B8579]">{d[0]}: </span>
                      <span className="text-[#2C2C2C] font-medium">{d[1]}</span>
                    </div>
                  ))}
                </div>
                {step.tip && (
                  <div className="mt-2 p-3 rounded-lg bg-[#F5F0EB]/80 border border-[#E5DDD3]/40">
                    <p className="text-[9px] text-[#8B8579] italic leading-relaxed">{step.tip}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Daily Routine Notification */}
          <div className="rounded-xl bg-[#FFFDF9] border border-[#E5DDD3] p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: t.accentLight }}>
              <svg className="w-4 h-4" style={{ color: t.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            </div>
            <div>
              <p className="text-[11px] text-[#2C2C2C] font-medium">Daily Routine Notification</p>
              <p className="text-[9px] text-[#8B8579]" style={{ fontFamily: 'system-ui, sans-serif' }}>Scheduled for 07:30 AM Daily</p>
            </div>
          </div>

          {/* Curate to Cart */}
          <div className="rounded-2xl border border-[#E5DDD3] bg-[#FFFDF9] overflow-hidden">
            <div className="px-4 pt-4 pb-2">
              <p className="text-[8px] tracking-[0.25em] text-[#8B8579] uppercase mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>Curate to Cart</p>
            </div>
            <div className="px-4 pb-4">
              <div className="flex gap-3">
                <div className="w-20 h-20 rounded-xl shrink-0" style={{ background: 'linear-gradient(135deg, #C0A882, #D4BFA0)' }} />
                <div>
                  <h3 className="text-[13px] text-[#2C2C2C] font-medium mb-1">The Morning Awakening Kit</h3>
                  <p className="text-[9px] text-[#8B8579] leading-relaxed mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>Complete 4-step botanical care ritual. Everything you need in one mindful parcel.</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold" style={{ color: t.accent, fontFamily: 'system-ui, sans-serif' }}>$84</span>
                    <span className="text-[11px] text-[#8B8579] line-through" style={{ fontFamily: 'system-ui, sans-serif' }}>$124</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-3 py-3 rounded-full text-white text-[11px] tracking-wider font-medium transition-all"
                style={{ backgroundColor: t.accent, fontFamily: 'system-ui, sans-serif' }}>
                ADD TO BAG • $84
              </button>
              <div className="flex items-center justify-center gap-4 mt-3">
                <span className="text-[9px] text-[#8B8579] flex items-center gap-1" style={{ fontFamily: 'system-ui, sans-serif' }}>✓ Carbon Neutral</span>
                <span className="text-[9px] text-[#8B8579] flex items-center gap-1" style={{ fontFamily: 'system-ui, sans-serif' }}>✓ Complimentary Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ BOTTOM NAVIGATION ═══════ */}
        <div className="sticky bottom-0 z-30 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-[#E5DDD3] flex items-stretch">
          {navItems.map((item, i) => (
            <button key={item.label} onClick={() => setBottomNav(i)}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all"
              style={{ color: bottomNav === i ? t.accent : '#8B8579' }}>
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={bottomNav === i ? 2 : 1.5} d={item.icon} />
              </svg>
              <span className="text-[8px] tracking-wider font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>{item.label}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
