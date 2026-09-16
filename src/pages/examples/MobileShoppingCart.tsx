import { useState, useEffect } from 'react';

type Variant = 'indigo' | 'emerald' | 'rose';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#6366F1': 'indigo',
  '#10B981': 'emerald',
  '#F43F5E': 'rose',
};

type CartItem = {
  id: string;
  name: string;
  details: string;
  price: number;
  qty: number;
};

export function MobileShoppingCart({ variant = 'indigo' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');

  const [items, setItems] = useState<CartItem[]>([
    { id: '1', name: 'Wireless Headphones', details: 'Color: Black', price: 299.99, qty: 1 },
    { id: '2', name: 'Phone Case', details: 'Color: Clear • Size: M', price: 29.99, qty: 2 },
    { id: '3', name: 'USB-C Cable', details: 'Color: White • 2m', price: 14.99, qty: 1 },
  ]);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('indigo'); 
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

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const itemsCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        .cart-wrapper {
          --accent: #6366F1;
          --accent-hover: #4F46E5;
          --accent-light: rgba(99,102,241,0.08);
          --bg-primary: #F5F5FF;
          --bg-secondary: #EEEEFF;
          --bg-card: #FFFFFF;
          --border: #E0E0F0;
          --text-primary: #1A1A2E;
          --text-secondary: #6B6B8A;
          font-family: 'Inter', sans-serif;
        }
        .cart-wrapper[data-theme="emerald"] {
          --accent: #10B981;
          --accent-hover: #059669;
          --accent-light: rgba(16,185,129,0.08);
          --bg-primary: #F0FFF8;
          --bg-secondary: #E6FFF0;
          --bg-card: #FFFFFF;
          --border: #D1FAE5;
          --text-primary: #1A2E1A;
          --text-secondary: #5A8A6A;
        }
        .cart-wrapper[data-theme="rose"] {
          --accent: #F43F5E;
          --accent-hover: #E11D48;
          --accent-light: rgba(244,63,94,0.08);
          --bg-primary: #FFF5F7;
          --bg-secondary: #FFF0F3;
          --bg-card: #FFFFFF;
          --border: #FFE0E6;
          --text-primary: #2E1A1A;
          --text-secondary: #AA6680;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div 
        className="cart-wrapper min-h-screen bg-neutral-100 flex justify-center text-[var(--text-primary)]"
        data-theme={activeTheme === 'indigo' ? undefined : activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        <div className="w-full max-w-[390px] min-h-screen bg-[var(--bg-primary)] relative flex flex-col overflow-x-hidden">
          
          {/* 1. Header */}
          <div className="px-5 pt-4 flex items-center gap-3">
            <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <h1 className="font-bold text-xl flex-1">My Cart</h1>
            <span className="text-sm text-[var(--text-secondary)]">{itemsCount} items</span>
          </div>

          {/* 2. Cart Items */}
          <div className="px-5 mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 flex gap-4 relative">
                <div className="w-20 h-20 bg-[var(--bg-secondary)] rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-8 h-8 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm pr-6">{item.name}</h3>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 text-[var(--text-secondary)] cursor-pointer hover:text-red-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{item.details}</p>
                  
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQty(item.id, -1)}
                        className="w-7 h-7 border border-[var(--border)] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[var(--bg-secondary)]"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                      <button 
                        onClick={() => updateQty(item.id, 1)}
                        className="w-7 h-7 bg-[var(--accent)] text-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-[var(--accent-hover)]"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                      </button>
                    </div>
                    <span className="font-bold text-sm">${item.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-center py-8 text-[var(--text-secondary)]">Your cart is empty</div>
            )}
          </div>

          {/* 3. Promo Code */}
          <div className="px-5 mt-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code" 
                className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] placeholder-[var(--text-secondary)]"
              />
              <button className="bg-[var(--accent)] text-white rounded-xl px-5 py-3 text-sm font-semibold hover:bg-[var(--accent-hover)] cursor-pointer transition-colors">
                Apply
              </button>
            </div>
          </div>

          {/* 4. Order Summary */}
          <div className="mx-5 mt-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5">
            <h3 className="font-bold text-sm mb-3">Order Summary</h3>
            <div className="flex justify-between py-2 text-sm">
              <span className="text-[var(--text-secondary)]">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 text-sm">
              <span className="text-[var(--text-secondary)]">Shipping</span>
              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-green-700 text-xs rounded-full px-2 py-0.5 font-medium">Free</span>
                <span className="font-medium text-green-700">Free</span>
              </div>
            </div>
            <div className="flex justify-between py-2 text-sm">
              <span className="text-[var(--text-secondary)]">Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="border-b border-[var(--border)] my-2"></div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold">Total</span>
              <div className="text-right">
                <span className="font-bold text-lg">${total.toFixed(2)}</span>
                <div className="text-[var(--accent)] text-xs mt-1">You save $45.00</div>
              </div>
            </div>
          </div>

          {/* 5. Checkout Button */}
          <div className="px-5 mt-4">
            <button className="w-full bg-[var(--accent)] text-white rounded-2xl py-4 font-bold text-base shadow-lg shadow-[var(--accent)]/25 cursor-pointer flex items-center justify-center gap-2 hover:bg-[var(--accent-hover)] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Proceed to Checkout
            </button>
            <div className="text-center text-[var(--accent)] text-sm mt-3 cursor-pointer hover:underline font-medium">
              Continue Shopping
            </div>
          </div>

          {/* 6. Security Badge */}
          <div className="px-5 mt-3 pb-6">
            <div className="flex items-center justify-center gap-2 text-xs text-[var(--text-secondary)]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span>Secure Checkout</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              <span>256-bit SSL</span>
            </div>
          </div>

          {/* 7. Suggested Items */}
          <div className="px-5 mt-4 pb-8">
            <h3 className="font-bold text-sm">You might also like</h3>
            <div className="flex gap-3 mt-3 overflow-x-auto pb-2 scrollbar-hide">
              {[
                { name: 'Wireless Charger', price: 24.99 },
                { name: 'Screen Protector', price: 12.99 },
                { name: 'AirPods Case', price: 19.99 }
              ].map((product, idx) => (
                <div key={idx} className="min-w-[140px] bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm">
                  <div className="h-24 bg-[var(--bg-secondary)] w-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-[var(--text-secondary)] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</h4>
                    <div className="text-xs text-[var(--accent)] font-medium mt-1">${product.price.toFixed(2)}</div>
                    <button className="w-full mt-2 border border-[var(--accent)] text-[var(--accent)] rounded-lg py-1.5 text-xs font-medium hover:bg-[var(--accent)] hover:text-white transition-colors cursor-pointer">
                      + Add
                    </button>
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
