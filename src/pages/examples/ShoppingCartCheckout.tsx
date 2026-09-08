import { useState, useEffect } from 'react';

type Variant = 'pulse' | 'ocean' | 'emerald';


const ACCENT_TO_THEME: Record<string, Variant> = {
  '#EE4D2D': 'pulse',
  '#ee4d2d': 'pulse',
  '#0D6EFD': 'ocean',
  '#0d6efd': 'ocean',
  '#059669': 'emerald',
};

interface ProductItem {
  id: string;
  store: string;
  isMall: boolean;
  isPreferred: boolean;
  storeChat: string;
  storeExtras: string;
  name: string;
  imageBg: string;
  discount: string;
  badge: string;
  variant: string;
  price: number;
  original: number;
  quantity: number;
  selected: boolean;
  storePromo?: { text: string; addOnInfo: string; addOnLink: string };
}

const initialCart: ProductItem[] = [
  {
    id: 'p1',
    store: 'PULSE Sound Official Flagship ☆',
    isMall: true,
    isPreferred: false,
    storeChat: '💬 Chat Store',
    storeExtras: '✓ 100% Authentic Guarantee',
    name: 'Noise-Cancelling Wireless Earbuds (Pro...',
    imageBg: 'linear-gradient(135deg, #4b5563, #1f2937)',
    discount: '-40%',
    badge: 'PRO ANC',
    variant: 'Color: Midnight Black ▾',
    price: 19.99,
    original: 32.99,
    quantity: 1,
    selected: true,
    storePromo: { text: '$2.00 OFF min $20.00', addOnInfo: 'Add $0.01 more product to claim', addOnLink: 'Find Add-On ($0.01) >' }
  },
  {
    id: 'p2',
    store: 'CozyCloud Sleep Essentials ☆',
    isMall: false,
    isPreferred: true,
    storeChat: '💬 Chat Store',
    storeExtras: '📦 Dispatches in 24 hrs',
    name: 'Ergonomic Memory Foam Pillow (Cooling Gel Infused...',
    imageBg: 'linear-gradient(135deg, #5eead4, #0d9488)',
    discount: '-25%',
    badge: 'TOP RATED',
    variant: 'Model: Queen Contour (Standard) ▾',
    price: 34.90,
    original: 46.50,
    quantity: 1,
    selected: true
  }
];

export function ShoppingCartCheckout({ variant = 'pulse' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customAccent, setCustomAccent] = useState<{ accent: string; light: string; gradient: string } | null>(null);
  
  const [cartItems, setCartItems] = useState<ProductItem[]>(initialCart);
  const [useCoins, setUseCoins] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

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
          gradient: `linear-gradient(135deg, ${variation.accent}cc, ${variation.accent})`
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items => items.map(item => {
      if (item.id === id) {
        const newQ = Math.max(1, Math.min(99, item.quantity + delta));
        return { ...item, quantity: newQ };
      }
      return item;
    }));
  };

  const toggleSelect = (id: string) => {
    setCartItems(items => items.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const toggleSelectAll = () => {
    const allSelected = cartItems.every(i => i.selected);
    setCartItems(items => items.map(item => ({ ...item, selected: !allSelected })));
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // Calculations
  const selectedItems = cartItems.filter(i => i.selected);
  const totalItems = selectedItems.reduce((acc, i) => acc + i.quantity, 0);
  const merchandiseSubtotal = selectedItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  
  const shippingThreshold = 65.00;
  const progressPercent = Math.min(100, Math.round((merchandiseSubtotal / shippingThreshold) * 100));
  const missingForShipping = Math.max(0, shippingThreshold - merchandiseSubtotal);
  const isFreeShipping = merchandiseSubtotal >= shippingThreshold;

  const platformVoucherDiscount = merchandiseSubtotal >= 40 ? 8.00 : 0;
  const coinsDiscount = useCoins ? 4.20 : 0;
  const shippingSubtotal = 4.50;
  const shippingCost = isFreeShipping ? 0 : 4.50;
  const totalSavings = platformVoucherDiscount + coinsDiscount + (isFreeShipping ? shippingSubtotal : 0);
  const totalPayment = merchandiseSubtotal - platformVoucherDiscount - coinsDiscount + shippingCost;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      <style>{`
        .marketplace-wrapper {
          --accent: #EE4D2D;
          --accent-hover: #D73211;
          --accent-light: #FFEEE8;
          --bg-primary: #FFFFFF;
          --bg-secondary: #F5F5F5;
          --bg-dark: #1A1A2E;
          --text-primary: #333333;
          --text-secondary: #757575;
          --text-price: #EE4D2D;
          --border-color: #E8E8E8;
          --star-color: #FFC107;
          --bg-gradient: linear-gradient(135deg, #FF6B6B, #EE4D2D);
          font-family: 'Roboto', sans-serif;
        }
        .marketplace-wrapper[data-theme="ocean"] {
          --accent: #0D6EFD;
          --accent-hover: #0b5ed7;
          --accent-light: #E7F1FF;
          --bg-secondary: #F8FAFC;
          --bg-dark: #1E293B;
          --text-price: #0D6EFD;
          --border-color: #E2E8F0;
          --bg-gradient: linear-gradient(135deg, #3B82F6, #0EA5E9);
        }
        .marketplace-wrapper[data-theme="emerald"] {
          --accent: #059669;
          --accent-hover: #047857;
          --accent-light: #D1FAE5;
          --bg-secondary: #F0FDF4;
          --bg-dark: #1A2E23;
          --text-price: #059669;
          --border-color: #D1D5DB;
          --bg-gradient: linear-gradient(135deg, #34D399, #059669);
        }
        ${customAccent ? `
        .marketplace-wrapper {
          --accent: ${customAccent.accent} !important;
          --accent-hover: ${customAccent.accent} !important;
          --accent-light: ${customAccent.light} !important;
          --text-price: ${customAccent.accent} !important;
          --bg-gradient: ${customAccent.gradient} !important;
        }
        ` : ''}
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="marketplace-wrapper min-h-screen bg-[var(--bg-secondary)] text-[var(--text-primary)]" data-theme={activeTheme === 'pulse' ? undefined : activeTheme}>
        
        {/* 1. Top Utility Bar */}
        <div className="bg-[var(--bg-dark)] text-white text-[12px] py-1.5">
          <div className="w-full max-w-[1200px] mx-auto px-[15px] flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <a href="#" className="hover:opacity-80 transition-opacity">Seller Center</a>
              <span>|</span>
              <a href="#" className="hover:opacity-80 transition-opacity">Download App</a>
              <span>|</span>
              <span>Connect With Us</span>
            </div>
            <div className="flex gap-4 items-center">
              <a href="#" className="hover:opacity-80 transition-opacity flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                Notifications
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M12 18.75h.008v.008H12v-.008z" /></svg>
                Help & Support
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                Track Order
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.466.733-3.559" /></svg>
                English (US)
              </a>
            </div>
          </div>
        </div>

        {/* 2. Main Navigation Bar */}
        <nav className="bg-[var(--bg-primary)] py-4 sticky top-0 z-[100] border-b border-[var(--border-color)]">
          <div className="w-full max-w-[1200px] mx-auto px-[15px] flex justify-between items-center">
            <a href="#" className="text-[32px] font-bold text-[var(--accent)] tracking-tighter">PULSE</a>
            
            <div className="flex-1 mx-10 flex flex-col">
              <div className="flex border-2 border-[var(--accent)] rounded overflow-hidden bg-white">
                <select className="px-2.5 border-none border-r border-[var(--border-color)] bg-[var(--bg-secondary)] text-[14px] outline-none">
                  <option>All Categories</option>
                </select>
                <input type="text" className="flex-1 px-[15px] py-[10px] border-none outline-none text-[14px]" placeholder="Search for products, brands and shops..." />
                <button className="bg-[var(--accent)] text-white px-[25px] font-semibold transition-colors hover:bg-[var(--accent-hover)] cursor-pointer outline-none border-none">🔍</button>
              </div>
              <div className="text-[12px] flex gap-3 mt-1.5">
                {['Wireless Earbuds', 'Korean Skincare', 'Cat Tree', 'Sneakers 50% Off', 'Mechanical Keyboard'].map(kw => (
                  <a key={kw} href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">{kw}</a>
                ))}
              </div>
            </div>

            <div className="flex gap-5 items-center">
              <div className="relative text-[24px] cursor-pointer">
                🛒
                <span className="absolute -top-1.5 -right-2 bg-[var(--accent)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">{cartItems.length}</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden relative">
                  <span className="absolute top-0 right-0 bg-yellow-400 text-white text-[8px] font-bold px-1 rounded-bl">GOLD</span>
                  <svg className="w-full h-full block" viewBox="0 0 32 32"><rect width="32" height="32" fill="#ccc"/><circle cx="16" cy="12" r="6" fill="#fff"/><path d="M6 28c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="none" stroke="#fff" strokeWidth="2"/></svg>
                </div>
                <span className="font-medium text-[14px] group-hover:text-[var(--accent)] transition-colors">Alex Rivera</span>
              </div>
            </div>
          </div>
        </nav>

        {/* 3. Sub Navigation */}
        <div className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] shadow-[0_2px_4px_rgba(0,0,0,0.02)] mb-6">
          <div className="w-full max-w-[1200px] mx-auto px-[15px] flex justify-between items-center">
            <div className="flex">
              <button className="bg-[var(--bg-secondary)] px-5 py-3 font-semibold flex items-center gap-2 border-r border-[var(--border-color)] cursor-pointer hover:bg-gray-200 transition-colors">
                ☰ ALL CATEGORIES
              </button>
              <div className="flex">
                {['Marketplace Home', 'Flash Deals', 'Mall Brands', 'Supermarket', 'Global Collection', 'Daily Vouchers', 'Top Trending'].map((tab, i) => (
                  <a key={tab} href="#" className={`px-5 py-3 text-[14px] font-medium transition-all ${i === 0 ? 'bg-[var(--accent-light)] text-[var(--accent)]' : 'hover:text-[var(--accent)]'}`}>
                    {tab}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1200px] mx-auto px-[15px] grid grid-cols-[1fr_340px] gap-6 items-start pb-10">
          
          <div className="flex flex-col gap-4">
            {/* 4. Free Shipping Progress Bar */}
            <div className="bg-white border border-[var(--border-color)] rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🛒</span>
                  {isFreeShipping ? (
                    <span className="font-semibold text-sm">You've unlocked FREE EXPRESS SHIPPING!</span>
                  ) : (
                    <span className="font-semibold text-sm">Add <span className="text-[var(--accent)]">${missingForShipping.toFixed(2)}</span> more to unlock FREE EXPRESS SHIPPING!</span>
                  )}
                  <span className="bg-[#10b981] text-white text-[10px] px-2 py-0.5 rounded font-bold ml-2">{progressPercent}% REACHED</span>
                </div>
                {!isFreeShipping && (
                  <a href="#" className="text-[var(--accent)] text-sm font-medium hover:underline">Browse Add-On Items →</a>
                )}
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-[image:var(--bg-gradient)] transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                <div>Current Tier: Standard ($4.50)</div>
                <div className="font-medium text-gray-800">${merchandiseSubtotal.toFixed(2)} / $65.00 Threshold</div>
                <div>⏰ Express 24h Eligible at $65</div>
              </div>
            </div>

            {/* 5. Cart Table Header */}
            <div className="bg-white border border-[var(--border-color)] rounded-lg p-4 shadow-sm flex items-center text-sm font-medium">
              <div className="flex-1 flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={cartItems.length > 0 && cartItems.every(i => i.selected)} 
                  onChange={toggleSelectAll}
                  className="w-4 h-4 accent-[var(--accent)] cursor-pointer"
                />
                <span>Select All ({cartItems.length} Items)</span>
              </div>
              <div className="w-[120px] text-center text-[var(--text-secondary)]">Unit Price</div>
              <div className="w-[120px] text-center text-[var(--text-secondary)]">Quantity</div>
              <div className="w-[100px] text-center text-[var(--text-secondary)]">Total</div>
              <div className="w-[80px] text-right text-[var(--text-secondary)]">Actions</div>
            </div>

            {/* 6 & 7. Store Groups */}
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white border border-[var(--border-color)] rounded-lg shadow-sm flex flex-col">
                <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={item.selected} 
                      onChange={() => toggleSelect(item.id)}
                      className="w-4 h-4 accent-[var(--accent)] cursor-pointer"
                    />
                    {item.isMall && <span className="bg-[#D0011B] text-white text-[10px] px-1.5 py-0.5 rounded font-bold">MALL</span>}
                    {item.isPreferred && <span className="bg-[#0ea5e9] text-white text-[10px] px-1.5 py-0.5 rounded font-bold">PREFERRED</span>}
                    <span className="font-bold text-sm">{item.store}</span>
                    <button className="text-[var(--accent)] bg-[var(--accent-light)] px-2 py-1 rounded text-xs flex items-center gap-1 font-medium hover:bg-[var(--accent)] hover:text-white transition-colors">{item.storeChat}</button>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">{item.storeExtras}</div>
                </div>
                
                <div className="p-4 flex items-center">
                  <div className="flex-1 flex items-start gap-4">
                    <input 
                      type="checkbox" 
                      checked={item.selected} 
                      onChange={() => toggleSelect(item.id)}
                      className="w-4 h-4 accent-[var(--accent)] cursor-pointer mt-8"
                    />
                    <div className="w-[80px] h-[80px] rounded relative" style={{ background: item.imageBg }}>
                      <span className="absolute top-0 right-0 bg-[var(--accent)] text-white text-[10px] font-bold px-1 py-0.5 rounded-bl">
                        {item.discount}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded font-bold w-max">{item.badge}</span>
                      <span className="text-sm line-clamp-2 max-w-[250px] leading-snug">{item.name}</span>
                      <div className="text-xs text-[var(--text-secondary)] bg-gray-50 p-1 rounded inline-block w-max mt-1 border border-gray-100 cursor-pointer hover:border-gray-300">
                        {item.variant}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-[120px] flex flex-col items-center justify-center gap-1">
                    <span className="text-sm font-medium line-through text-[var(--text-secondary)]">${item.original.toFixed(2)}</span>
                    <span className="text-sm font-bold text-gray-800">${item.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="w-[120px] flex justify-center">
                    <div className="flex items-center border border-[var(--border-color)] rounded">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">-</button>
                      <div className="w-10 h-8 flex items-center justify-center text-sm font-medium border-x border-[var(--border-color)]">{item.quantity}</div>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">+</button>
                    </div>
                  </div>
                  
                  <div className="w-[100px] text-center font-bold text-[var(--text-price)] text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <div className="w-[80px] flex justify-end">
                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2 cursor-pointer">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                </div>

                {item.storePromo && (
                  <div className="bg-orange-50 border-t border-[var(--border-color)] px-4 py-2.5 flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--accent)]">🏷 Store Promo:</span>
                      <span className="border border-[var(--accent)] text-[var(--accent)] px-1.5 py-0.5 rounded">{item.storePromo.text}</span>
                      <span className="text-gray-600">{item.storePromo.addOnInfo}</span>
                    </div>
                    <a href="#" className="text-[var(--accent)] font-medium hover:underline">{item.storePromo.addOnLink}</a>
                  </div>
                )}
              </div>
            ))}

            {cartItems.length === 0 && (
              <div className="bg-white border border-[var(--border-color)] rounded-lg p-10 text-center text-[var(--text-secondary)] shadow-sm">
                <div className="text-4xl mb-4">🛒</div>
                <div className="font-medium text-lg mb-2">Your shopping cart is empty</div>
                <button className="mt-4 bg-[var(--accent)] text-white px-6 py-2 rounded font-medium hover:bg-[var(--accent-hover)] transition-colors">Go Shopping Now</button>
              </div>
            )}

            {/* 8. Trust Badges Row */}
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="bg-white border border-[var(--border-color)] rounded-lg p-3 flex items-center gap-3 shadow-sm">
                <div className="text-2xl">✅</div>
                <div>
                  <div className="font-bold text-sm text-gray-800">100% Authentic</div>
                  <div className="text-[11px] text-[var(--text-secondary)]">Direct from brand distributors</div>
                </div>
              </div>
              <div className="bg-white border border-[var(--border-color)] rounded-lg p-3 flex items-center gap-3 shadow-sm">
                <div className="text-2xl">🔄</div>
                <div>
                  <div className="font-bold text-sm text-gray-800">15 Days Return</div>
                  <div className="text-[11px] text-[var(--text-secondary)]">Hassle-free instant refund</div>
                </div>
              </div>
              <div className="bg-white border border-[var(--border-color)] rounded-lg p-3 flex items-center gap-3 shadow-sm">
                <div className="text-2xl">🚚</div>
                <div>
                  <div className="font-bold text-sm text-gray-800">Fast On-Time Shipping</div>
                  <div className="text-[11px] text-[var(--text-secondary)]">$1.00 compensation if late</div>
                </div>
              </div>
            </div>

          </div>

          {/* 9. Right Sidebar — Order Summary */}
          <div className="flex flex-col gap-4 sticky top-[100px]">
            
            {/* Platform Voucher card */}
            <div className="bg-white border border-[var(--border-color)] rounded-lg shadow-sm">
              <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <span>🏷</span> Platform Voucher
                </div>
                <button className="text-[var(--accent)] text-sm font-medium hover:underline cursor-pointer">Select Voucher {'>'}</button>
              </div>
              <div className="p-4 flex flex-col gap-3">
                {platformVoucherDiscount > 0 && (
                  <div className="bg-[var(--accent-light)] border border-[var(--accent)] border-opacity-30 rounded p-2.5 flex items-start gap-3">
                    <div className="bg-[var(--accent)] text-white font-bold text-sm px-2 py-1 rounded">-$8.00</div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-800">Mega Mid-Month Cashback</div>
                      <div className="text-[11px] text-[var(--text-secondary)]">Min spend $40.00 applied</div>
                    </div>
                    <div className="text-[#10b981] font-bold">✓</div>
                  </div>
                )}
                <div className="flex border border-[var(--border-color)] rounded overflow-hidden">
                  <input 
                    type="text" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="ENTER COUPON OR PROMO CODE" 
                    className="flex-1 px-3 py-2 text-xs outline-none uppercase"
                  />
                  <button className="bg-gray-800 text-white px-4 py-2 text-xs font-semibold hover:bg-black transition-colors cursor-pointer">Apply</button>
                </div>
              </div>
            </div>

            {/* Redeem Coins card */}
            <div className="bg-white border border-[var(--border-color)] rounded-lg shadow-sm p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-400 flex justify-center items-center text-white text-xs font-bold border border-yellow-500">P</div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    Redeem Coins <span className="bg-[#10b981] text-white text-[9px] px-1.5 py-0.5 rounded">420 Available</span>
                  </div>
                  <div className="text-[11px] text-[var(--text-secondary)]">Save $4.20 on this order</div>
                </div>
              </div>
              <div 
                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${useCoins ? 'bg-[var(--accent)]' : 'bg-gray-300'}`}
                onClick={() => setUseCoins(!useCoins)}
              >
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${useCoins ? 'translate-x-5' : ''}`}></div>
              </div>
            </div>

            {/* Order Summary breakdown */}
            <div className="bg-white border border-[var(--border-color)] rounded-lg shadow-sm">
              <div className="p-4 border-b border-[var(--border-color)] font-semibold text-sm">
                Order Summary
              </div>
              <div className="p-4 flex flex-col gap-2.5 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Merchandise Subtotal</span>
                  <span>${merchandiseSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Platform Voucher Discount</span>
                  <span className="text-[var(--accent)]">-${platformVoucherDiscount.toFixed(2)} ℹ️</span>
                </div>
                {useCoins && (
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Pulse Coins Applied (420)</span>
                    <span className="text-[var(--accent)]">-${coinsDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Shipping Subtotal <span className="bg-gray-800 text-white text-[9px] px-1 py-0.5 rounded ml-1">PROMO</span></span>
                  <span><span className="line-through text-gray-400 mr-2">${shippingSubtotal.toFixed(2)}</span>{isFreeShipping ? <span className="text-[#10b981]">Free ($0.00)</span> : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                
                <hr className="border-t border-dashed border-[var(--border-color)] my-1" />
                
                <div className="flex justify-between font-bold text-[var(--accent)]">
                  <span>🏷 Total Savings</span>
                  <span>${totalSavings.toFixed(2)}</span>
                </div>

                <hr className="border-t border-[var(--border-color)] my-1" />

                <div className="flex justify-between items-end mt-1 mb-2">
                  <span className="text-sm font-medium">Total Payment<br/><span className="text-[10px] text-[var(--text-secondary)] font-normal">(inclusive of all local taxes)</span></span>
                  <span className="text-2xl font-bold text-[var(--accent)]">${Math.max(0, totalPayment).toFixed(2)}</span>
                </div>

                <button className="w-full bg-[var(--accent)] text-white font-bold py-3.5 rounded text-sm transition-transform hover:-translate-y-[1px] hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none" disabled={totalItems === 0}>
                  PROCEED TO CHECKOUT ({totalItems} ITEMS) →
                </button>

                <div className="flex justify-center gap-3 text-[10px] text-[var(--text-secondary)] mt-1">
                  <span className="flex items-center gap-1">🔒 256-Bit SSL Encrypted</span>
                  <span className="flex items-center gap-1">🛡 Buyer Protection</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[var(--border-color)] rounded-lg shadow-sm p-4 flex items-center justify-between">
              <span className="text-sm text-gray-700 font-medium">🎧 Need checkout assistance?</span>
              <button className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer">Live Help</button>
            </div>

          </div>
        </div>

        {/* 10. Footer */}
        <footer className="bg-[var(--bg-dark)] text-[#ccc] pt-[60px] pb-5 text-[13px]">
          <div className="w-full max-w-[1200px] mx-auto px-[15px]">
            <div className="grid grid-cols-5 gap-[30px] mb-10">
              <div className="flex flex-col">
                <h4 className="text-white text-[14px] font-semibold mb-5 uppercase">Customer Care</h4>
                <ul className="flex flex-col gap-2.5">
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Order Tracking & Delivery</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Return & Refund Policy</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Shopper Protection Guarantee</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Contact Support 24/7</a></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-white text-[14px] font-semibold mb-5 uppercase">About PULSE</h4>
                <ul className="flex flex-col gap-2.5">
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">About Our Marketplace</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Careers & Culture</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Seller Terms & Policies</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Privacy Notice</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Flash Sale Program</a></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-white text-[14px] font-semibold mb-5 uppercase">Payment Methods</h4>
                <p className="mb-2.5">Secure transactions protected by 256-bit encryption</p>
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {['VISA', 'MC', 'PAYPAL', 'AMEX', 'COD'].map(icon => (
                    <div key={icon} className="w-[50px] h-[30px] bg-white rounded flex justify-center items-center text-[#333] font-bold text-[10px]">{icon}</div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <h4 className="text-white text-[14px] font-semibold mb-5 uppercase">Logistics Partners</h4>
                <p className="mb-2.5">Fast, tracked national & cross-border delivery</p>
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {['EXPRESS', 'GLOBAL', 'KING\'S', 'RETURN'].map(icon => (
                    <div key={icon} className="w-[50px] h-[30px] bg-white rounded flex justify-center items-center text-[#333] font-bold text-[10px]">{icon}</div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <h4 className="text-white text-[14px] font-semibold mb-5 uppercase">Mobile App</h4>
                <p>Scan QR code to claim your $15 in-app welcome deal</p>
                <div className="flex gap-[15px] mt-[15px]">
                  <div className="w-[80px] h-[80px] bg-white p-1.5">
                    <svg className="w-full h-full block" viewBox="0 0 100 100"><rect width="100" height="100" fill="#eee"/><path d="M20 20h20v20H20zm40 0h20v20H60zM20 60h20v20H20zm40 20h20v20H60z" fill="#333"/></svg>
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <div className="bg-[#333] text-white px-2.5 py-1.5 rounded text-[11px] text-center border border-[#444] cursor-pointer">App Store</div>
                    <div className="bg-[#333] text-white px-2.5 py-1.5 rounded text-[11px] text-center border border-[#444] cursor-pointer">Google Play</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-[#333] pt-5 flex justify-between items-center">
              <div>© 2026 PULSE Commerce Ltd.</div>
              <div className="flex gap-5">
                <a href="#" className="hover:text-[var(--accent)] transition-colors">Security Advisory</a>
                <a href="#" className="hover:text-[var(--accent)] transition-colors">Intellectual Property Rights</a>
                <a href="#" className="hover:text-[var(--accent)] transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Variant Switcher */}
        <div className="fixed bottom-5 right-5 bg-white p-2.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.15)] flex gap-2.5 z-[1000] border border-[var(--border-color)]">
          {[
            { id: 'pulse', bg: '#EE4D2D', label: 'Pulse Red' },
            { id: 'ocean', bg: '#0D6EFD', label: 'Ocean Commerce' },
            { id: 'emerald', bg: '#059669', label: 'Emerald Market' }
          ].map(theme => (
            <button 
              key={theme.id}
              onClick={() => {
                setActiveTheme(theme.id as Variant);
                setCustomAccent(null);
              }}
              className={`w-[30px] h-[30px] rounded-full border-2 cursor-pointer transition-transform relative group hover:scale-110 ${activeTheme === theme.id && !customAccent ? 'border-[#333] scale-110' : 'border-transparent'}`}
              style={{ background: theme.bg }}
            >
              <span className="absolute -top-[35px] left-1/2 -translate-x-1/2 bg-[#333] text-white text-[12px] px-2 py-1 rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity group-hover:opacity-100">
                {theme.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
