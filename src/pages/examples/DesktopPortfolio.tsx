import { useState, useEffect, useRef } from 'react';

type Variant = 'pulse' | 'ocean' | 'emerald';

const THEMES: Record<Variant, { accent: string; accentHover: string; accentBg: string; accentBorder: string; accentLight: string; gradientFrom: string; gradientTo: string }> = {
  pulse: {
    accent: '#EE4D2D',
    accentHover: '#ff6347',
    accentBg: 'rgba(238,77,45,0.08)',
    accentBorder: 'rgba(238,77,45,0.2)',
    accentLight: '#EE4D2D22',
    gradientFrom: '#EE4D2D',
    gradientTo: '#ff8a65',
  },
  ocean: {
    accent: '#0D6EFD',
    accentHover: '#3d8bfd',
    accentBg: 'rgba(13,110,253,0.08)',
    accentBorder: 'rgba(13,110,253,0.2)',
    accentLight: '#0D6EFD22',
    gradientFrom: '#0D6EFD',
    gradientTo: '#6ea8fe',
  },
  emerald: {
    accent: '#059669',
    accentHover: '#10b981',
    accentBg: 'rgba(5,150,105,0.08)',
    accentBorder: 'rgba(5,150,105,0.2)',
    accentLight: '#05966922',
    gradientFrom: '#059669',
    gradientTo: '#34d399',
  },
};

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#EE4D2D': 'pulse', '#ee4d2d': 'pulse',
  '#0D6EFD': 'ocean', '#0d6efd': 'ocean',
  '#059669': 'emerald',
};

interface CaseStudy {
  num: string;
  tags: string[];
  images: string[];
  title: string;
  description: string;
  meta: { label: string; value: string }[];
}

const caseStudies: CaseStudy[] = [
  {
    num: '01',
    tags: ['UI/UX DESIGN', 'BRANDING', 'FRONTEND DEV'],
    images: [
      'https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    ],
    title: 'Project Apex: Autonomous Orbital Station 1.0',
    description: 'A complete redesign of the autonomous orbital command interface with real-time telemetry dashboards and mission control systems.',
    meta: [
      { label: 'Client', value: 'AeroTech Industries' },
      { label: 'Duration', value: '6 months' },
      { label: 'Year', value: '2024' },
    ],
  },
  {
    num: '02',
    tags: ['WEB DESIGN', 'DEVELOPMENT'],
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&h=400&fit=crop',
    ],
    title: 'Kenzo Residence & Pavilion',
    description: 'Luxury real estate brand identity and web platform featuring immersive property showcases and virtual tour experiences.',
    meta: [
      { label: 'Client', value: 'Kenzo Properties' },
      { label: 'Duration', value: '4 months' },
      { label: 'Year', value: '2024' },
    ],
  },
  {
    num: '03',
    tags: ['INTERIOR DESIGN', 'BRANDING', 'UI/UX'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
    ],
    title: 'Amber Crest Biomorphic Indoor Architecture',
    description: 'Interior design studio portfolio showcasing biomorphic principles in luxury residential and commercial spaces.',
    meta: [
      { label: 'Client', value: 'Amber Crest Studio' },
      { label: 'Duration', value: '8 months' },
      { label: 'Year', value: '2023' },
    ],
  },
  {
    num: '04',
    tags: ['DATA VIZ', 'DASHBOARD', 'DESIGN SYSTEM'],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    ],
    title: 'Integrated Cognitive High-Frequency Link Topology',
    description: 'Advanced network topology visualization platform with real-time data flow monitoring and predictive analytics dashboards.',
    meta: [
      { label: 'Client', value: 'NexGen Data Labs' },
      { label: 'Duration', value: '5 months' },
      { label: 'Year', value: '2024' },
    ],
  },
];

const workSteps = [
  {
    num: '1',
    title: 'Start with a Clear Vision',
    description: 'I begin every project with a deep-dive discovery session. We explore your brand values, goals, and target audience to craft a strategic brief.',
  },
  {
    num: '2',
    title: 'Research and Explore',
    description: 'Thorough competitive analysis and user research. I examine industry trends, analyze competitors, and identify gaps to create standout designs.',
  },
  {
    num: '3',
    title: 'Design and Build',
    description: 'From wireframes to pixel-perfect designs and clean code. I craft responsive, performant digital experiences that feel intuitive.',
  },
  {
    num: '4',
    title: 'Deliver',
    description: 'Final review, testing, and handoff. Every project includes comprehensive documentation and ongoing support for a smooth launch.',
  },
];

const navItems = ['Home', 'Projects', 'About', 'Contact', 'Community', 'Support'];

/* ─── Intersection Observer hook for scroll animations ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* ─── Animated particles / orbs for the hero ─── */
function HeroBackground({ accent, gradientTo }: { accent: string; gradientTo: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient mesh */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 40%, ${accent} 0%, transparent 70%),
            radial-gradient(ellipse 60% 80% at 80% 20%, ${gradientTo} 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 50% 80%, ${accent} 0%, transparent 70%)
          `,
        }}
      />

      {/* Floating orbs */}
      {[
        { size: 300, x: '15%', y: '20%', dur: '20s', delay: '0s', opacity: 0.06 },
        { size: 200, x: '75%', y: '30%', dur: '25s', delay: '-5s', opacity: 0.05 },
        { size: 250, x: '50%', y: '70%', dur: '22s', delay: '-10s', opacity: 0.04 },
        { size: 150, x: '85%', y: '75%', dur: '18s', delay: '-3s', opacity: 0.05 },
        { size: 180, x: '30%', y: '60%', dur: '30s', delay: '-8s', opacity: 0.03 },
      ].map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${i % 2 === 0 ? accent : gradientTo} 0%, transparent 70%)`,
            opacity: orb.opacity,
            animation: `heroFloat${i} ${orb.dur} ease-in-out infinite`,
            animationDelay: orb.delay,
            filter: 'blur(40px)',
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(${accent}30 1px, transparent 1px),
            linear-gradient(90deg, ${accent}30 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'gridPulse 8s ease-in-out infinite',
        }}
      />

      {/* Animated scan line */}
      <div
        className="absolute left-0 right-0 h-[1px] opacity-[0.08]"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          animation: 'scanLine 6s ease-in-out infinite',
        }}
      />

      {/* Animated particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`p${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: i % 2 === 0 ? accent : gradientTo,
            opacity: Math.random() * 0.3 + 0.1,
            animation: `particleDrift ${Math.random() * 10 + 15}s linear infinite`,
            animationDelay: `${-Math.random() * 20}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes heroFloat0 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -40px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.95); }
          75% { transform: translate(40px, 30px) scale(1.05); }
        }
        @keyframes heroFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.15); }
          66% { transform: translate(30px, -20px) scale(0.9); }
        }
        @keyframes heroFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, 40px) scale(1.08); }
          50% { transform: translate(-30px, -10px) scale(0.92); }
          75% { transform: translate(-10px, 30px) scale(1.12); }
        }
        @keyframes heroFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, -35px) scale(1.1); }
        }
        @keyframes heroFloat4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(35px, -25px) scale(1.05); }
          66% { transform: translate(-15px, 35px) scale(0.95); }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.06; }
        }
        @keyframes scanLine {
          0% { top: -5%; }
          100% { top: 105%; }
        }
        @keyframes particleDrift {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-400px) translateX(40px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ─── Global animation styles ─── */
const globalStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(60px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes borderGlow {
    0%, 100% { border-color: rgba(255,255,255,0.05); }
    50% { border-color: rgba(255,255,255,0.12); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up { animation: fadeInUp 0.7s ease-out both; }
  .animate-fade-in-left { animation: fadeInLeft 0.7s ease-out both; }
  .animate-fade-in-right { animation: fadeInRight 0.7s ease-out both; }
  .animate-fade-in-scale { animation: fadeInScale 0.6s ease-out both; }
  .animate-slide-in-up { animation: slideInUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
  .stagger-5 { animation-delay: 0.5s; }
  .stagger-6 { animation-delay: 0.6s; }
`;

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */
export function DesktopPortfolio({ variant = 'pulse' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [customAccent, setCustomAccent] = useState<{ accent: string; light: string; gradient: string; accentHover: string; gradientTo: string } | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Sync with variant prop
  useEffect(() => { setActiveTheme(variant); }, [variant]);

  // Listen for style variation messages from ThemeDetail
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('pulse');
        setCustomAccent(null);
        return;
      }
      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) {
        setActiveTheme(themeName);
        setCustomAccent(null);
      } else {
        setActiveTheme('pulse');
        setCustomAccent({
          accent: variation.accent,
          light: variation.accent + '22',
          gradient: `linear-gradient(135deg, ${variation.accent}cc, ${variation.accent})`,
          accentHover: variation.accent + 'dd',
          gradientTo: variation.accent + '88',
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Parallax scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseTheme = THEMES[activeTheme];
  const t = customAccent
    ? {
        accent: customAccent.accent,
        accentHover: customAccent.accentHover,
        accentBg: customAccent.accent + '14',
        accentBorder: customAccent.accent + '33',
        accentLight: customAccent.light,
        gradientFrom: customAccent.accent,
        gradientTo: customAccent.gradientTo,
      }
    : baseTheme;

  // Section refs for scroll animations
  const heroRef = useInView(0.1);
  const caseStudiesRef = useInView(0.1);
  const aboutRef = useInView(0.1);
  const contactRef = useInView(0.1);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }} className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <style>{globalStyles}</style>

      {/* Theme Switcher - Floating */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex gap-2 p-2 rounded-full bg-[#141414]/90 backdrop-blur-lg border border-[#222] shadow-2xl">
        {(Object.keys(THEMES) as Variant[]).map((v) => (
          <button
            key={v}
            onClick={() => { setActiveTheme(v); setCustomAccent(null); }}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-all duration-300"
            style={{
              backgroundColor: THEMES[v].accent,
              outline: activeTheme === v && !customAccent ? `2px solid ${THEMES[v].accent}` : 'none',
              outlineOffset: '2px',
              transform: activeTheme === v && !customAccent ? 'scale(1.15)' : 'scale(1)',
            }}
            title={v.charAt(0).toUpperCase() + v.slice(1)}
          />
        ))}
      </div>

      {/* ═══════════════════ NAVIGATION ═══════════════════ */}
      <nav
        className="sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-300"
        style={{
          backgroundColor: scrollY > 50 ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.8)',
          borderColor: scrollY > 50 ? '#222' : '#1a1a1a',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{ backgroundColor: t.accent }}
            >
              P
            </div>
            <span className="text-sm font-semibold text-white tracking-wide hidden sm:inline">ELENA STUDIO</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, i) => (
              <button
                key={item}
                className="px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 relative group"
                style={{
                  color: i === 0 ? t.accent : '#888',
                  backgroundColor: i === 0 ? t.accentBg : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (i !== 0) { e.currentTarget.style.color = '#ccc'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; }
                }}
                onMouseLeave={(e) => {
                  if (i !== 0) { e.currentTarget.style.color = '#888'; e.currentTarget.style.backgroundColor = 'transparent'; }
                }}
              >
                {item}
                {i === 0 && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ backgroundColor: t.accent }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              className="hidden sm:block px-5 py-2 text-[13px] font-semibold text-white rounded-lg transition-all duration-300 hover:shadow-lg active:scale-[0.97]"
              style={{
                backgroundColor: t.accent,
                boxShadow: `0 4px 20px ${t.accent}30`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = t.accentHover;
                e.currentTarget.style.boxShadow = `0 6px 30px ${t.accent}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = t.accent;
                e.currentTarget.style.boxShadow = `0 4px 20px ${t.accent}30`;
              }}
            >
              Get in Touch
            </button>
            <button
              className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: mobileMenuOpen ? '400px' : '0',
            opacity: mobileMenuOpen ? 1 : 0,
          }}
        >
          <div className="border-t border-[#1a1a1a] px-4 sm:px-6 py-4 space-y-1">
            {navItems.map((item, i) => (
              <button
                key={item}
                className="block w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all"
                style={{
                  color: i === 0 ? t.accent : '#888',
                  backgroundColor: i === 0 ? t.accentBg : 'transparent',
                }}
              >
                {item}
              </button>
            ))}
            <button
              className="w-full mt-3 px-5 py-2.5 text-sm font-semibold text-white rounded-lg"
              style={{ backgroundColor: t.accent }}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center overflow-hidden" ref={heroRef.ref}>
        <HeroBackground accent={t.accent} gradientTo={t.gradientTo} />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 w-full">
          {/* Breadcrumb-style top text */}
          <div
            className={`flex flex-wrap items-center gap-2 text-[10px] sm:text-xs text-zinc-600 mb-8 sm:mb-12 tracking-widest uppercase ${heroRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            <span>Creative Design · Interaction Design · Branding</span>
            <span className="mx-1 sm:mx-2">•</span>
            <span>Trusted Since 2019</span>
          </div>

          {/* Large hero text block */}
          <div
            className={`relative rounded-xl sm:rounded-2xl overflow-hidden p-6 sm:p-10 lg:p-16 ${heroRef.isVisible ? 'animate-slide-in-up stagger-1' : 'opacity-0'}`}
            style={{
              background: 'linear-gradient(135deg, rgba(17,17,17,0.9) 0%, rgba(13,13,13,0.95) 50%, rgba(17,17,17,0.9) 100%)',
              border: '1px solid #1a1a1a',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="relative z-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
                <span className="text-white inline-block" style={{ animation: heroRef.isVisible ? 'fadeInUp 0.7s ease-out 0.3s both' : 'none' }}>
                  Crafting Digital
                </span>
                <br />
                <span
                  className="inline-block"
                  style={{
                    color: t.accent,
                    animation: heroRef.isVisible ? 'fadeInUp 0.7s ease-out 0.5s both' : 'none',
                    textShadow: `0 0 60px ${t.accent}30`,
                  }}
                >
                  Experiences
                </span>
                <span
                  className="text-zinc-600 inline-block"
                  style={{ animation: heroRef.isVisible ? 'fadeInUp 0.7s ease-out 0.6s both' : 'none' }}
                >
                  {' '}That
                </span>
                <br />
                <span
                  className="text-zinc-400 inline-block"
                  style={{ animation: heroRef.isVisible ? 'fadeInUp 0.7s ease-out 0.7s both' : 'none' }}
                >
                  Inspire & Convert
                </span>
              </h1>
              <p
                className="mt-4 sm:mt-6 text-zinc-500 text-sm sm:text-[15px] leading-relaxed max-w-xl"
                style={{ animation: heroRef.isVisible ? 'fadeInUp 0.7s ease-out 0.9s both' : 'none' }}
              >
                Award-winning designer specializing in brand identity, web design, and interactive experiences for forward-thinking companies.
              </p>

              {/* CTA buttons */}
              <div
                className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8"
                style={{ animation: heroRef.isVisible ? 'fadeInUp 0.7s ease-out 1.1s both' : 'none' }}
              >
                <button
                  className="px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:shadow-lg active:scale-[0.97]"
                  style={{
                    backgroundColor: t.accent,
                    boxShadow: `0 4px 20px ${t.accent}30`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 8px 40px ${t.accent}50`;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 4px 20px ${t.accent}30`;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  View My Work →
                </button>
                <button className="px-6 py-3 text-sm font-medium text-zinc-400 rounded-xl border border-[#222] hover:border-[#333] hover:text-white transition-all duration-300">
                  Download Resume
                </button>
              </div>
            </div>

            {/* Decorative corner glow */}
            <div
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{
                backgroundColor: t.accent,
                opacity: 0.05,
                animation: 'heroFloat1 20s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════ SELECTED CASE STUDIES ═══════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20" ref={caseStudiesRef.ref}>
        {/* Section header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4 ${caseStudiesRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <div>
            <p className="text-[10px] sm:text-xs tracking-widest text-zinc-600 uppercase mb-2">Featured Work · 2023 — 2024</p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Selected Case Studies
            </h2>
          </div>
          <button
            className="flex items-center gap-2 text-sm font-medium transition-all duration-300 group"
            style={{ color: t.accent }}
            onMouseEnter={(e) => e.currentTarget.style.color = t.accentHover}
            onMouseLeave={(e) => e.currentTarget.style.color = t.accent}
          >
            View all work
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {caseStudies.map((study, i) => (
            <div
              key={study.num}
              className={caseStudiesRef.isVisible ? 'animate-slide-in-up' : 'opacity-0'}
              style={{ animationDelay: `${0.15 * (i + 1)}s` }}
            >
              <CaseStudyCard study={study} theme={t} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ ABOUT + HOW I WORK ═══════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20" ref={aboutRef.ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* About Column */}
          <div className={aboutRef.isVisible ? 'animate-fade-in-left' : 'opacity-0'}>
            <p className="text-[10px] sm:text-xs tracking-widest text-zinc-600 uppercase mb-2">About</p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Elena Varner
            </h2>

            {/* Avatar Card */}
            <div
              className="rounded-xl sm:rounded-2xl overflow-hidden border border-[#1a1a1a] bg-[#111] p-5 sm:p-6 mb-6 transition-all duration-500 hover:border-[#252525]"
              style={{ animation: aboutRef.isVisible ? 'fadeInUp 0.7s ease-out 0.2s both' : 'none' }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold shrink-0 transition-transform duration-500 hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.gradientTo})` }}
                >
                  EV
                </div>
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">Elena Varner</p>
                  <p className="text-zinc-500 text-xs sm:text-sm">Creative Director & Designer</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                With over 8 years of experience in digital design, I help brands tell their stories through thoughtful, strategic design that drives real results.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
                {['Dribbble', 'Behance', 'LinkedIn'].map((platform) => (
                  <button
                    key={platform}
                    className="px-3 py-1.5 text-xs rounded-lg border transition-all duration-300"
                    style={{ borderColor: '#222', color: '#888' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = t.accent;
                      e.currentTarget.style.color = t.accent;
                      e.currentTarget.style.backgroundColor = t.accentBg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#222';
                      e.currentTarget.style.color = '#888';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-3 sm:gap-4"
              style={{ animation: aboutRef.isVisible ? 'fadeInUp 0.7s ease-out 0.4s both' : 'none' }}
            >
              {[
                { value: '50+', label: 'Projects' },
                { value: '8+', label: 'Years' },
                { value: '30+', label: 'Clients' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="text-center p-3 sm:p-4 rounded-xl border border-[#1a1a1a] bg-[#0e0e0e] transition-all duration-500 hover:border-[#252525] group"
                  style={{ animation: aboutRef.isVisible ? `countUp 0.5s ease-out ${0.5 + i * 0.15}s both` : 'none' }}
                >
                  <p
                    className="text-lg sm:text-xl font-bold transition-colors duration-300"
                    style={{ color: t.accent }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-zinc-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How I Work Column */}
          <div className={aboutRef.isVisible ? 'animate-fade-in-right' : 'opacity-0'}>
            <p className="text-[10px] sm:text-xs tracking-widest text-zinc-600 uppercase mb-2">Process</p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              How I Work
            </h2>

            <div className="space-y-4 sm:space-y-5">
              {workSteps.map((step, i) => (
                <div
                  key={step.num}
                  className="group flex gap-4 sm:gap-5 p-4 sm:p-5 rounded-xl border border-[#1a1a1a] bg-[#0e0e0e] hover:border-[#252525] transition-all duration-500 cursor-default"
                  style={{
                    animation: aboutRef.isVisible ? `fadeInUp 0.6s ease-out ${0.3 + i * 0.12}s both` : 'none',
                  }}
                >
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: t.accentBg,
                      color: t.accent,
                      border: `1px solid ${t.accentBorder}`,
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-[14px] sm:text-[15px] font-semibold text-white mb-1 group-hover:text-zinc-100 transition-colors">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div
              className="mt-6 sm:mt-8 p-5 sm:p-6 rounded-xl border border-[#1a1a1a] bg-[#0e0e0e] hover:border-[#252525] transition-all duration-500"
              style={{ animation: aboutRef.isVisible ? 'fadeInUp 0.7s ease-out 0.8s both' : 'none' }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mb-3 transition-colors duration-300" style={{ color: t.accent }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed italic">
                "Thankfully, I feel a lot better today. It's an amazing day when you feel like this."
              </p>
              <p className="text-[10px] sm:text-xs text-zinc-600 mt-3">— Alex Thompson, CEO at TechVentures</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CONTACT / LET'S WORK TOGETHER ═══════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20" ref={contactRef.ref}>
        <div
          className={`rounded-xl sm:rounded-2xl border border-[#1a1a1a] bg-[#0e0e0e] overflow-hidden ${contactRef.isVisible ? 'animate-fade-in-scale' : 'opacity-0'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left - CTA */}
            <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-[10px] sm:text-xs tracking-widest text-zinc-600 uppercase mb-3">Contact</p>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                Let's work together
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed mb-6 sm:mb-8 max-w-md">
                I'm available for freelance projects, creative collaborations, and full-time opportunities. Let's create something incredible together.
              </p>

              <div className="space-y-3">
                {[
                  { icon: '✉', label: 'hello@elenavarner.com' },
                  { icon: '📍', label: 'San Francisco, CA' },
                  { icon: '🕐', label: 'Available for projects — Q4 2024' },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 text-xs sm:text-sm text-zinc-400 transition-all duration-300 hover:text-zinc-300"
                    style={{ animation: contactRef.isVisible ? `fadeInLeft 0.5s ease-out ${0.3 + i * 0.1}s both` : 'none' }}
                  >
                    <span className="text-sm sm:text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="flex gap-3 mt-6 sm:mt-8">
                {['Twitter', 'GitHub', 'Dribbble'].map((social) => (
                  <button
                    key={social}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#222] flex items-center justify-center text-zinc-600 text-xs font-medium transition-all duration-300"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = t.accent;
                      e.currentTarget.style.color = t.accent;
                      e.currentTarget.style.backgroundColor = t.accentBg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#222';
                      e.currentTarget.style.color = '#666';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {social[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Form */}
            <div className="p-6 sm:p-10 lg:p-14 border-t lg:border-t-0 lg:border-l border-[#1a1a1a]">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Start a project</h3>
              <p className="text-xs sm:text-sm text-zinc-600 mb-5 sm:mb-6">Fill out the form and I'll get back to you within 24 hours.</p>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-[10px] sm:text-xs text-zinc-500 mb-1.5 font-medium">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] text-sm text-white placeholder-zinc-700 focus:outline-none transition-all duration-300"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = t.accent;
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${t.accent}15`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#1a1a1a';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs text-zinc-500 mb-1.5 font-medium">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] text-sm text-white placeholder-zinc-700 focus:outline-none transition-all duration-300"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = t.accent;
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${t.accent}15`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#1a1a1a';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs text-zinc-500 mb-1.5 font-medium">Tell me about your project</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="I'm looking for..."
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] text-sm text-white placeholder-zinc-700 focus:outline-none transition-all duration-300 resize-none"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = t.accent;
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${t.accent}15`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#1a1a1a';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <button
                  className="w-full py-2.5 sm:py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 active:scale-[0.98]"
                  style={{
                    backgroundColor: t.accent,
                    boxShadow: `0 4px 20px ${t.accent}25`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = t.accentHover;
                    e.currentTarget.style.boxShadow = `0 6px 30px ${t.accent}40`;
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = t.accent;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${t.accent}25`;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Send Message →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center text-white text-[9px] sm:text-[10px] font-bold"
                style={{ backgroundColor: t.accent }}
              >
                P
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-zinc-500 tracking-wide">ELENA STUDIO</span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              {['Privacy', 'Terms', 'Sitemap'].map((item) => (
                <button
                  key={item}
                  className="text-[10px] sm:text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>

            <p className="text-[10px] sm:text-xs text-zinc-700">
              © 2024 Elena Varner. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Case Study Card Component ─── */
function CaseStudyCard({ study, theme }: { study: CaseStudy; theme: typeof THEMES['pulse'] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group rounded-xl sm:rounded-2xl border border-[#1a1a1a] bg-[#111] overflow-hidden transition-all duration-500 cursor-pointer"
      style={{
        borderColor: hovered ? '#252525' : '#1a1a1a',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 40px rgba(0,0,0,0.3), 0 0 60px ${theme.accent}08` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top bar: number + tags */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 flex items-center justify-between gap-2">
        <span
          className="text-xl sm:text-2xl font-bold transition-colors duration-300"
          style={{ color: hovered ? theme.accent : '#333' }}
        >
          {study.num}
        </span>
        <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-end">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-medium tracking-wider rounded-md border uppercase transition-all duration-300"
              style={{
                borderColor: hovered ? theme.accentBorder : '#222',
                color: hovered ? theme.accent : '#666',
                backgroundColor: hovered ? theme.accentBg : '#0e0e0e',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Images row */}
      <div className="px-4 sm:px-6 pb-3 sm:pb-4 grid grid-cols-2 gap-2 sm:gap-3">
        {study.images.map((img, i) => (
          <div key={i} className="aspect-[3/2] rounded-lg overflow-hidden bg-[#0a0a0a]">
            <img
              src={img}
              alt={`${study.title} screenshot ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700"
              style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
            />
          </div>
        ))}
      </div>

      {/* Title + Description */}
      <div className="px-4 sm:px-6 pb-3 sm:pb-4">
        <h3 className="text-[13px] sm:text-[15px] font-semibold text-white mb-1 sm:mb-1.5 transition-colors duration-300">
          {study.title}
        </h3>
        <p className="text-[10px] sm:text-xs text-zinc-600 leading-relaxed line-clamp-2">
          {study.description}
        </p>
      </div>

      {/* Meta row */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-5 flex items-center justify-between">
        <div className="flex gap-2 sm:gap-4 flex-wrap">
          {study.meta.map((m) => (
            <div key={m.label} className="text-[9px] sm:text-[10px]">
              <span className="text-zinc-600">{m.label}: </span>
              <span className="text-zinc-400 font-medium">{m.value}</span>
            </div>
          ))}
        </div>
        <svg
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 shrink-0 ml-2"
          style={{
            color: hovered ? theme.accent : '#333',
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  );
}
