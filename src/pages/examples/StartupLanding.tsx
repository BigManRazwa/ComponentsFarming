import { useState, useEffect } from 'react';

type Variant = 'violet' | 'blue' | 'emerald';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#8B5CF6': 'violet',
  '#3B82F6': 'blue',
  '#10B981': 'emerald',
};

export function StartupLanding({ variant = 'violet' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('violet'); 
        setCustomFont(null); 
        return; 
      }
      if (variation.font) setCustomFont(variation.font);
      const themeName = ACCENT_TO_THEME[variation.accent];
      if (themeName) { 
        setActiveTheme(themeName); 
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .startup-wrapper {
          --accent: #8B5CF6;
          --accent-hover: #7C3AED;
          --accent-light: rgba(139,92,246,0.1);
          --gradient-from: #8B5CF6;
          --gradient-to: #3B82F6;
          --bg-primary: #09090B;
          --bg-secondary: #111113;
          --bg-card: #18181B;
          --border: #27272A;
          --text-primary: #FAFAFA;
          --text-secondary: #71717A;
          font-family: 'Inter', sans-serif;
        }
        .startup-wrapper[data-theme="blue"] {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-light: rgba(59,130,246,0.1);
          --gradient-from: #3B82F6;
          --gradient-to: #06B6D4;
        }
        .startup-wrapper[data-theme="emerald"] {
          --accent: #10B981;
          --accent-hover: #059669;
          --accent-light: rgba(16,185,129,0.1);
          --gradient-from: #10B981;
          --gradient-to: #06B6D4;
        }
      `}</style>

      <div 
        className="startup-wrapper min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]"
        data-theme={activeTheme === 'violet' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* 1. Nav */}
        <nav className="sticky top-0 bg-[var(--bg-primary)]/80 backdrop-blur z-50 px-8 py-4 border-b border-[var(--border)]/50 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer">
            <svg className="w-6 h-6 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <span className="font-bold text-xl">AetherFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-[var(--text-secondary)]">
            <span className="hover:text-[var(--text-primary)] cursor-pointer">Platform</span>
            <span className="hover:text-[var(--text-primary)] cursor-pointer">Features</span>
            <span className="hover:text-[var(--text-primary)] cursor-pointer">Pricing</span>
            <span className="hover:text-[var(--text-primary)] cursor-pointer">Docs</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">Login</span>
            <button className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white rounded-full px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity">Get Started Free</button>
          </div>
        </nav>

        {/* 2. Hero */}
        <section className="text-center pt-24 pb-16 px-8 max-w-4xl mx-auto relative">
          <div className="absolute w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          
          <div className="mx-auto border border-[var(--border)] rounded-full px-4 py-1.5 text-xs bg-[var(--accent-light)] text-[var(--accent)] flex items-center gap-2 w-fit mb-8 cursor-pointer hover:bg-[var(--accent)] hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6-6.2-4.5-6.2 4.5 2.4-7.6L2 9.6h7.6z"/></svg>
            New: AI Code Review is here &rarr;
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
            Ship faster with <br className="hidden md:block"/>
            <span className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] bg-clip-text text-transparent">AI-powered tools</span>
          </h1>
          
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mt-6">
            Build, deploy, and scale your products 10x faster with our intelligent development platform.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white rounded-full px-8 py-3.5 font-semibold shadow-lg shadow-[var(--accent)]/25 hover:opacity-90 transition-opacity w-full sm:w-auto">
              Get Started Free
            </button>
            <button className="border border-[var(--border)] rounded-full px-8 py-3.5 flex items-center justify-center gap-2 hover:bg-[var(--bg-secondary)] transition-colors w-full sm:w-auto">
              <svg className="w-5 h-5 text-[var(--text-primary)]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              Watch Demo
            </button>
          </div>
        </section>

        {/* 3. Trusted By */}
        <section className="py-12 border-y border-[var(--border)] px-8">
          <p className="text-sm text-[var(--text-secondary)] text-center mb-8">Trusted by 10,000+ teams worldwide</p>
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-40">
            {['GOOGLE', 'STRIPE', 'NOTION', 'FIGMA', 'VERCEL'].map(logo => (
              <span key={logo} className="text-xl font-bold tracking-wider">{logo}</span>
            ))}
          </div>
        </section>

        {/* 4. Features */}
        <section className="py-20 px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need</h2>
            <p className="text-[var(--text-secondary)] text-lg">A complete toolset designed to accelerate your workflow and boost productivity.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Instant Deploy', desc: 'Push to production in seconds with zero-config deployments and automatic scaling.', icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" /> },
              { title: 'Enterprise Security', desc: 'SOC 2 compliant with end-to-end encryption, SSO, and role-based access control.', icon: <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" /> },
              { title: 'Real-time Analytics', desc: 'Monitor performance, track errors, and optimize your app with live dashboards.', icon: <path d="M3 3v18h18v-2H5V3H3zm6 14h2V9H9v8zm4 0h2V5h-2v12zm4 0h2v-5h-2v5z" /> }
            ].map((feat, i) => (
              <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--accent)]/40 transition-colors group cursor-pointer">
                <div className="w-12 h-12 bg-[var(--accent-light)] rounded-full flex items-center justify-center text-[var(--accent)] mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">{feat.icon}</svg>
                </div>
                <h3 className="font-bold text-lg mb-2">{feat.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">{feat.desc}</p>
                <div className="text-[var(--accent)] text-sm font-medium flex items-center gap-1">
                  Learn more <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Social Proof */}
        <section className="py-16 px-8 bg-[var(--bg-secondary)]/50">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">10,000+ teams trust us</h2>
          
          <div className="flex justify-center -space-x-3 mt-4 mb-12">
            {[1, 2, 3, 4, 5].map((_avatar, i) => (
              <div key={i} className={`w-12 h-12 rounded-full border-2 border-[var(--bg-primary)] flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] z-${50 - i*10}`}>
                U{i+1}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { quote: "Reduced our deployment time by 80%. Game changer.", name: "Sarah Chen", role: "CTO at TechFlow" },
              { quote: "The analytics dashboard alone is worth 10x the price.", name: "Mark Davis", role: "VP Eng at ScaleUp" },
              { quote: "Best developer experience I've used in 15 years.", name: "Lisa Park", role: "Staff Eng at CloudBase" }
            ].map((test, i) => (
              <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 hover:shadow-lg hover:border-[var(--accent)]/30 transition-all">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6">"{test.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500"></div>
                  <div>
                    <div className="font-bold text-sm">{test.name}</div>
                    <div className="text-[var(--text-secondary)] text-xs">{test.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Pricing */}
        <section className="py-20 px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-[var(--text-secondary)] text-lg">No hidden fees. Cancel anytime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Free", price: "0", features: ["Up to 3 projects", "Basic analytics", "Community support", "1GB storage", "Deploy from CLI"], pop: false },
              { name: "Pro", price: "29", features: ["Unlimited projects", "Advanced analytics", "Priority support", "10GB storage", "Custom domains"], pop: true },
              { name: "Enterprise", price: "99", features: ["SSO & SAML", "99.9% SLA", "Dedicated manager", "Unlimited storage", "Custom integrations"], pop: false }
            ].map((plan, i) => (
              <div key={i} className={`bg-[var(--bg-card)] border rounded-2xl p-8 relative flex flex-col ${plan.pop ? 'border-[var(--accent)] shadow-xl shadow-[var(--accent)]/10 scale-105 z-10' : 'border-[var(--border)]'}`}>
                {plan.pop && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-bold text-lg mb-4">{plan.name}</h3>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-black">${plan.price}</span>
                  <span className="text-[var(--text-secondary)]">/mo</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-semibold transition-colors ${plan.pop ? 'bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white hover:opacity-90' : 'border border-[var(--border)] hover:bg-[var(--bg-secondary)]'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 7. FAQ */}
        <section className="py-20 px-8 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "How does the AI optimize deployments?", a: "Our AI analyzes your codebase and automatically configures the best build settings, caching strategies, and CDN routing for your specific framework." },
              { q: "What security certifications do you have?", a: "We are SOC 2 Type II certified, GDPR compliant, and undergo regular third-party penetration testing." },
              { q: "Can I switch plans anytime?", a: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Prorated refunds are automatically applied." },
              { q: "Do you offer custom enterprise solutions?", a: "Yes, our Enterprise plan is fully customizable. Contact our sales team to discuss your specific requirements." }
            ].map((faq, i) => (
              <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden">
                <button 
                  className="w-full px-6 py-4 text-left font-medium flex justify-between items-center hover:bg-[var(--bg-secondary)] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <svg className={`w-5 h-5 text-[var(--text-secondary)] transform transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-[var(--text-secondary)] bg-[var(--bg-card)] border-t border-[var(--border)]/50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 8. CTA Banner */}
        <section className="mx-8 my-12 rounded-2xl p-12 bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-center relative overflow-hidden max-w-5xl xl:mx-auto">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Ready to ship faster?</h2>
            <p className="text-white/80 text-lg mb-8">Join 10,000+ developers building the future.</p>
            <button className="bg-white text-[var(--accent)] font-bold rounded-full px-8 py-3.5 hover:scale-105 transition-transform shadow-xl">
              Get Started Free
            </button>
          </div>
        </section>

        {/* 9. Footer */}
        <footer className="py-12 px-8 border-t border-[var(--border)] bg-[var(--bg-primary)]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-2 mb-4 cursor-pointer">
                  <svg className="w-6 h-6 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <span className="font-bold text-xl">AetherFlow</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  The intelligent development platform for modern teams.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Features</li>
                  <li className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Pricing</li>
                  <li className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Integrations</li>
                  <li className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Changelog</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">About Us</li>
                  <li className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Careers</li>
                  <li className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Blog</li>
                  <li className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Contact</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Privacy Policy</li>
                  <li className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Terms of Service</li>
                  <li className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Cookie Policy</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-[var(--text-secondary)]">
                &copy; {new Date().getFullYear()} AetherFlow Inc. All rights reserved.
              </p>
              <div className="flex gap-4 text-[var(--text-secondary)]">
                <svg className="w-5 h-5 hover:text-[var(--text-primary)] cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                <svg className="w-5 h-5 hover:text-[var(--text-primary)] cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <svg className="w-5 h-5 hover:text-[var(--text-primary)] cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
