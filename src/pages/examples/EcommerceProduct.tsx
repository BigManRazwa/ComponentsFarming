import { useState, useEffect } from 'react';

type Variant = 'orange' | 'blue' | 'emerald';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#F97316': 'orange',
  '#3B82F6': 'blue',
  '#10B981': 'emerald',
};

export function EcommerceProduct({ variant = 'orange' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('White');
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('orange'); 
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

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .product-wrapper {
          --accent: #F97316;
          --accent-hover: #EA580C;
          --accent-light: rgba(249,115,22,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #F9FAFB;
          --bg-card: #FFFFFF;
          --border: #E5E7EB;
          --text-primary: #111827;
          --text-secondary: #6B7280;
          font-family: 'Inter', sans-serif;
        }
        .product-wrapper[data-theme="blue"] {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-light: rgba(59,130,246,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #F0F5FF;
          --bg-card: #FFFFFF;
          --border: #DBEAFE;
          --text-primary: #111827;
          --text-secondary: #6B8CAE;
        }
        .product-wrapper[data-theme="emerald"] {
          --accent: #10B981;
          --accent-hover: #059669;
          --accent-light: rgba(16,185,129,0.08);
          --bg-primary: #FFFFFF;
          --bg-secondary: #F0FFF8;
          --bg-card: #FFFFFF;
          --border: #D1FAE5;
          --text-primary: #111827;
          --text-secondary: #5A8A6A;
        }
      `}</style>

      <div 
        className="product-wrapper min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]" 
        data-theme={activeTheme === 'orange' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="max-w-6xl mx-auto px-8">
          
          {/* 1. Nav */}
          <nav className="py-4 border-b border-[var(--border)] flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer">
              <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="font-bold text-xl tracking-tight">ShopHub</span>
            </div>
            <div className="text-sm text-[var(--text-secondary)] font-medium">
              Home {'>'} Audio {'>'} <span className="text-[var(--text-primary)]">Headphones</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors cursor-pointer p-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors cursor-pointer p-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors cursor-pointer relative p-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">3</span>
              </button>
            </div>
          </nav>

          {/* 2. Product Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left: Image Gallery */}
            <div>
              <div className="aspect-square bg-[var(--bg-secondary)] rounded-2xl flex items-center justify-center relative border border-[var(--border)] overflow-hidden">
                <div className="absolute top-4 left-4 bg-red-500 text-white rounded-full px-3 py-1 text-xs font-bold z-10 shadow-sm">
                  25% OFF
                </div>
                <div className="w-2/3 h-2/3 bg-[var(--bg-primary)] rounded-full blur-3xl opacity-50 absolute"></div>
                <svg className="w-1/2 h-1/2 text-[var(--text-secondary)]/20 relative z-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12v6c0 1.1.9 2 2 2h2v-6H4v-2c0-4.42 3.58-8 8-8s8 3.58 8 8v2h-2v6h2c1.1 0 2-.9 2-2v-6c0-5.52-4.48-10-10-10z" />
                </svg>
              </div>
              
              <div className="flex gap-3 mt-4">
                {[0, 1, 2, 3].map(index => (
                  <button 
                    key={index} 
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 bg-[var(--bg-secondary)] rounded-xl cursor-pointer transition-all flex items-center justify-center flex-shrink-0
                      ${selectedImage === index ? 'border-2 border-[var(--accent)] ring-2 ring-[var(--accent)]/20' : 'border border-[var(--border)] hover:border-[var(--accent)]'}
                    `}
                  >
                    <svg className={`w-8 h-8 ${selectedImage === index ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]/40'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12v6c0 1.1.9 2 2 2h2v-6H4v-2c0-4.42 3.58-8 8-8s8 3.58 8 8v2h-2v6h2c1.1 0 2-.9 2-2v-6c0-5.52-4.48-10-10-10z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">SoundPro Max</h1>
              
              <div className="flex items-center gap-3 mt-2">
                <div className="flex text-amber-400">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-bold text-[var(--text-primary)]">4.8</span>
                <span className="text-[var(--text-secondary)] text-sm">(2,847 reviews)</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded ml-2">In Stock</span>
              </div>

              <div className="flex items-end gap-3 mt-4">
                <span className="text-3xl font-bold text-[var(--text-primary)]">$299.99</span>
                <span className="line-through text-[var(--text-secondary)] text-lg mb-0.5">$399.99</span>
                <span className="text-red-500 font-semibold mb-1">25% OFF</span>
              </div>

              <div className="border-b border-[var(--border)] my-5"></div>

              {/* Color Options */}
              <div className="mt-4">
                <span className="font-bold text-sm block mb-2">Color: <span className="font-normal text-[var(--text-secondary)]">{selectedColor}</span></span>
                <div className="flex gap-3">
                  {[
                    { name: 'White', hex: '#F5F5F5' },
                    { name: 'Black', hex: '#1A1A1A' },
                    { name: 'Navy', hex: '#1E3A5F' }
                  ].map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all ${selectedColor === color.name ? 'ring-2 ring-[var(--accent)] ring-offset-2 border-transparent' : 'border-[var(--border)]'}`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Options */}
              <div className="mt-6">
                <span className="font-bold text-sm block mb-2">Model</span>
                <div className="flex gap-3">
                  {['Standard', 'Pro'].map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors border ${
                        selectedSize === size 
                          ? 'border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]' 
                          : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-6">
                <span className="font-bold text-sm block mb-2">Quantity</span>
                <div className="flex items-center">
                  <button onClick={decreaseQuantity} className="w-10 h-10 border border-[var(--border)] rounded-l-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] cursor-pointer transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                    </svg>
                  </button>
                  <div className="w-12 h-10 border-y border-[var(--border)] flex items-center justify-center font-bold text-[var(--text-primary)]">
                    {quantity}
                  </div>
                  <button onClick={increaseQuantity} className="w-10 h-10 border border-[var(--border)] rounded-r-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] cursor-pointer transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-3">
                <button className="flex-1 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl py-3.5 font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
                <button className="flex-1 border-2 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-light)] rounded-xl py-3.5 font-bold transition-colors cursor-pointer">
                  Buy Now
                </button>
              </div>

              {/* Shipping Info */}
              <div className="mt-6 bg-[var(--bg-secondary)] rounded-xl p-4 space-y-3 border border-[var(--border)]">
                <div className="flex items-center gap-3 text-[var(--text-secondary)] text-sm font-medium">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Free shipping over $200
                </div>
                <div className="flex items-center gap-3 text-[var(--text-secondary)] text-sm font-medium">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  2 year warranty
                </div>
                <div className="flex items-center gap-3 text-[var(--text-secondary)] text-sm font-medium">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  30-day returns
                </div>
              </div>
              
            </div>
          </div>

          {/* 3. Tabs Section */}
          <div className="mt-16">
            <div className="flex border-b border-[var(--border)] overflow-x-auto no-scrollbar">
              {['Description', 'Specifications', 'Reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap
                    ${activeTab === tab ? 'border-b-2 border-[var(--accent)] text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="py-8 min-h-[300px]">
              {activeTab === 'Description' && (
                <div className="max-w-3xl animate-in fade-in duration-300">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Immersive Sound Experience</h3>
                  <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                    <p>
                      Experience audio like never before with the SoundPro Max. Engineered with precision-tuned 40mm drivers, 
                      these headphones deliver crisp highs, detailed mids, and deep, resonant bass that brings your music to life.
                      The advanced Active Noise Cancelling technology completely immerses you in sound by blocking out external noise.
                    </p>
                    <p>
                      Crafted for all-day comfort, the memory foam ear cups and lightweight headband ensure you can listen for hours 
                      without fatigue. With an impressive 30-hour battery life and quick-charge capabilities, your music never has to stop.
                    </p>
                  </div>
                  <div className="mt-8 space-y-3">
                    {[
                      'Industry-leading Active Noise Cancelling',
                      'High-Resolution Audio compatible',
                      'Multipoint connection for seamless device switching'
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium text-[var(--text-primary)]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Specifications' && (
                <div className="max-w-3xl animate-in fade-in duration-300 border border-[var(--border)] rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <tbody className="divide-y divide-[var(--border)]">
                      {[
                        { label: 'Type', value: 'Over-Ear' },
                        { label: 'Driver', value: '40mm Dynamic' },
                        { label: 'Battery Life', value: 'Up to 30 hours' },
                        { label: 'Connectivity', value: 'Bluetooth 5.2, 3.5mm Aux' },
                        { label: 'Weight', value: '250g' },
                        { label: 'Noise Cancelling', value: 'Active ANC with Ambient Mode' }
                      ].map((spec, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-[var(--bg-secondary)]' : 'bg-[var(--bg-primary)]'}>
                          <td className="px-6 py-4 font-semibold text-[var(--text-primary)] w-1/3 border-r border-[var(--border)]">{spec.label}</td>
                          <td className="px-6 py-4 text-[var(--text-secondary)]">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'Reviews' && (
                <div className="animate-in fade-in duration-300">
                  <div className="flex flex-col md:flex-row gap-12 mb-10">
                    <div className="flex flex-col items-center justify-center p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border)] min-w-[200px]">
                      <span className="text-5xl font-bold text-[var(--text-primary)] mb-2">4.8</span>
                      <div className="flex text-amber-400 mb-2">
                        {[1,2,3,4,5].map(star => (
                          <svg key={star} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-[var(--text-secondary)] font-medium">Based on 2,847 reviews</span>
                    </div>

                    <div className="flex-1 space-y-2 max-w-md">
                      {[
                        { stars: 5, pct: 78 },
                        { stars: 4, pct: 15 },
                        { stars: 3, pct: 5 },
                        { stars: 2, pct: 1 },
                        { stars: 1, pct: 1 }
                      ].map(bar => (
                        <div key={bar.stars} className="flex items-center gap-3">
                          <span className="text-sm font-medium text-[var(--text-secondary)] w-12">{bar.stars} stars</span>
                          <div className="flex-1 h-2.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${bar.pct}%` }}></div>
                          </div>
                          <span className="text-sm text-[var(--text-secondary)] w-8 text-right">{bar.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { rating: 5, title: 'Best headphones ever!', text: 'The noise cancellation on these is simply magical. I use them everyday for work and commuting. Battery life easily lasts a full week of heavy use.', author: 'Sarah K.', date: 'Oct 24, 2025' },
                      { rating: 5, title: 'Amazing sound quality', text: 'Upgraded from my old pair and the difference is night and day. The bass is punchy without being overpowering, and the mids are incredibly clear.', author: 'John D.', date: 'Oct 22, 2025' },
                      { rating: 4, title: 'Great value', text: 'For the price, you cannot beat the feature set. They are very comfortable, even when wearing glasses. Deducted one star because the app could be better.', author: 'Mike P.', date: 'Oct 20, 2025' }
                    ].map((review, i) => (
                      <div key={i} className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border)]">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, idx) => (
                              <svg key={idx} className={`w-4 h-4 ${idx < review.rating ? '' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-[var(--text-secondary)]">{review.date}</span>
                        </div>
                        <h4 className="font-bold text-[var(--text-primary)] mb-2">{review.title}</h4>
                        <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">{review.text}</p>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center font-bold text-xs uppercase">
                            {review.author.charAt(0)}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-[var(--text-primary)]">{review.author}</span>
                            <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Verified Buyer</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 4. Related Products */}
          <div className="mt-8 pb-20">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'SoundPro Earbuds', price: '149.99', rating: 4.6 },
                { name: 'Premium Audio Cable', price: '29.99', rating: 4.8 },
                { name: 'Headphone Stand', price: '49.99', rating: 4.9 },
                { name: 'Travel Case Pro', price: '39.99', rating: 4.7 }
              ].map((product, i) => (
                <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden cursor-pointer group hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-[var(--bg-secondary)] flex items-center justify-center overflow-hidden">
                    <svg className="w-1/3 h-1/3 text-[var(--text-secondary)]/30 group-hover:scale-110 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12v6c0 1.1.9 2 2 2h2v-6H4v-2c0-4.42 3.58-8 8-8s8 3.58 8 8v2h-2v6h2c1.1 0 2-.9 2-2v-6c0-5.52-4.48-10-10-10z" />
                    </svg>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-[var(--text-primary)] text-sm mb-1 group-hover:text-[var(--accent)] transition-colors">{product.name}</h4>
                    <div className="flex items-center gap-1 mb-2">
                      <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs text-[var(--text-secondary)] font-medium">{product.rating}</span>
                    </div>
                    <span className="font-bold text-[var(--text-primary)]">${product.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
