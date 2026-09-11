import { useState, useEffect } from 'react';

type Variant = 'pulse' | 'ocean' | 'emerald';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#EE4D2D': 'pulse',
  '#ee4d2d': 'pulse',
  '#0D6EFD': 'ocean',
  '#0d6efd': 'ocean',
  '#059669': 'emerald',
};

export function MobileCartCheckout({ variant = 'pulse' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customAccent, setCustomAccent] = useState<{ accent: string; light: string; gradient: string } | null>(null);

  const [item1Checked, setItem1Checked] = useState(true);
  const [item2Checked, setItem2Checked] = useState(true);
  
  const [qty1, setQty1] = useState(1);
  const [qty2, setQty2] = useState(1);
  
  const [coinsEnabled, setCoinsEnabled] = useState(true);

  const price1 = 19.99;
  const orig1 = 32.99;
  const price2 = 34.90;
  const orig2 = 46.50;

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

  const allChecked = item1Checked && item2Checked;
  const toggleAll = () => {
    const newVal = !allChecked;
    setItem1Checked(newVal);
    setItem2Checked(newVal);
  };

  const handleQtyChange = (setter: React.Dispatch<React.SetStateAction<number>>, delta: number) => {
    setter(prev => Math.min(99, Math.max(1, prev + delta)));
  };

  const subtotal1 = item1Checked ? price1 * qty1 : 0;
  const subtotal2 = item2Checked ? price2 * qty2 : 0;
  const origSubtotal1 = item1Checked ? orig1 * qty1 : 0;
  const origSubtotal2 = item2Checked ? orig2 * qty2 : 0;
  
  const subtotal = subtotal1 + subtotal2;
  
  const voucherDiscount = subtotal >= 50 ? 8.00 : 0;
  const coinSavings = coinsEnabled ? 4.20 : 0;
  const shippingFee = subtotal > 30 ? 0 : 4.50;
  
  const finalTotal = Math.max(0, subtotal - voucherDiscount - coinSavings + shippingFee);
  
  // Savings calculations
  const itemSavings = (origSubtotal1 + origSubtotal2) - (subtotal1 + subtotal2);
  const totalSavingsAmount = itemSavings + voucherDiscount + coinSavings + (shippingFee === 0 && subtotal > 0 ? 4.50 : 0);
  
  const checkedCount = (item1Checked ? 1 : 0) + (item2Checked ? 1 : 0);

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

      <div className="marketplace-wrapper min-h-screen bg-[var(--bg-secondary)] flex justify-center text-[var(--text-primary)]" data-theme={activeTheme === 'pulse' ? undefined : activeTheme}>
        
        {/* Mobile Phone Container */}
        <div className="w-full max-w-[390px] min-h-screen bg-[#F5F5F5] relative shadow-2xl flex flex-col pb-24">
          
          {/* 1. Top Header Bar */}
          <div className="bg-[var(--bg-primary)] px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
            <button className="text-[var(--text-primary)]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[var(--accent)] text-white flex items-center justify-center font-bold text-xs rounded-sm">P</div>
              <span className="text-[var(--text-primary)] font-bold text-base">Cart &amp; Checkout</span>
            </div>
            <div className="relative">
              <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
              <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center leading-none">2</span>
              <div className="absolute -top-1 -right-6 w-6 h-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 border border-white"></div>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 scrollbar-hide">
            
            {/* 2. Shopping Cart Header */}
            <div className="bg-[var(--bg-primary)] px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                <span className="font-bold">Shopping Cart (4)</span>
              </div>
              <button className="text-[var(--accent)] text-sm font-medium">Manage</button>
            </div>

            {/* 3. Free Shipping Progress Banner */}
            <div className="bg-[var(--accent-light)] rounded-lg mx-4 mt-3 p-3">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[var(--accent)] mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.9 17.9 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                  <div className="text-sm">
                    Add <span className="font-bold">$10.10</span> more to enjoy <span className="text-[var(--accent)] font-bold">Free Express Shipping!</span>
                  </div>
                </div>
                <button className="text-[var(--accent)] text-xs font-medium whitespace-nowrap ml-2">Shop More &gt;</button>
              </div>
              <div className="bg-white/60 h-2 rounded-full overflow-hidden mb-1">
                <div className="bg-[var(--accent)] h-full rounded-full" style={{ width: '76%' }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-[var(--text-secondary)]">
                <span>Unlocked: Standard Free Delivery</span>
                <span className="text-[var(--accent)]">76% reached</span>
              </div>
            </div>

            {/* 4. Store Section 1 */}
            <div className="bg-[var(--bg-primary)] mt-3">
              <div className="px-4 py-3 flex items-center gap-3 border-b border-[var(--border-color)]">
                <div 
                  className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer ${item1Checked ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-gray-300'}`}
                  onClick={() => setItem1Checked(!item1Checked)}
                >
                  {item1Checked && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <span className="bg-[#D0011B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">MALL</span>
                  <span className="font-bold text-sm">Official Electronics Mall</span>
                  <svg className="w-3.5 h-3.5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </div>
                <button className="text-[var(--text-secondary)]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
                </button>
              </div>
              <div className="p-4 flex gap-3">
                <div 
                  className={`w-5 h-5 rounded-full border flex flex-shrink-0 items-center justify-center cursor-pointer mt-8 ${item1Checked ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-gray-300'}`}
                  onClick={() => setItem1Checked(!item1Checked)}
                >
                  {item1Checked && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                </div>
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 relative flex-shrink-0">
                  <div className="absolute top-0 left-0 bg-[var(--accent)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-tl-lg rounded-br-lg">-40%</div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm leading-tight line-clamp-2 mb-1">Noise-Cancelling Wireless Earbuds (Pro ANC Edition)</h3>
                    <div className="inline-flex items-center gap-1 bg-[#F5F5F5] text-[11px] text-[var(--text-secondary)] px-2 py-1 rounded">
                      Color: Midnight Black
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[var(--accent)] font-bold">${price1.toFixed(2)}</span>
                      <span className="text-[var(--text-secondary)] text-xs line-through">${orig1.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center border border-[var(--border-color)] rounded">
                      <button className="w-6 h-6 flex items-center justify-center text-[var(--text-secondary)]" onClick={() => handleQtyChange(setQty1, -1)}>&minus;</button>
                      <span className="w-8 text-center text-sm font-medium border-l border-r border-[var(--border-color)]">{qty1}</span>
                      <button className="w-6 h-6 flex items-center justify-center text-[var(--text-secondary)]" onClick={() => handleQtyChange(setQty1, 1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-3">
                <div className="flex items-center justify-between bg-[#FDF7F5] border border-orange-100 p-2 rounded" style={{ backgroundColor: 'var(--accent-light)' }}>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
                    <span className="text-[var(--accent)] text-[11px] font-medium">Shop voucher available: $2 OFF min $20</span>
                  </div>
                  <button className="text-[var(--accent)] text-[11px] font-bold">Claim</button>
                </div>
              </div>
            </div>

            {/* 5. Store Section 2 */}
            <div className="bg-[var(--bg-primary)] mt-3">
              <div className="px-4 py-3 flex items-center gap-3 border-b border-[var(--border-color)]">
                <div 
                  className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer ${item2Checked ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-gray-300'}`}
                  onClick={() => setItem2Checked(!item2Checked)}
                >
                  {item2Checked && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <span className="bg-[#F59E0B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">PREFERRED+</span>
                  <span className="font-bold text-sm">Home Essentials Official</span>
                  <svg className="w-3.5 h-3.5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </div>
                <button className="text-[var(--text-secondary)]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
                </button>
              </div>
              <div className="p-4 flex gap-3">
                <div 
                  className={`w-5 h-5 rounded-full border flex flex-shrink-0 items-center justify-center cursor-pointer mt-8 ${item2Checked ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-gray-300'}`}
                  onClick={() => setItem2Checked(!item2Checked)}
                >
                  {item2Checked && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                </div>
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-600 relative flex-shrink-0">
                  <div className="absolute top-0 left-0 bg-[var(--accent)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-tl-lg rounded-br-lg">-25%</div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm leading-tight line-clamp-2 mb-1">Ergonomic Memory Foam Pillow (Cooling Blue Tech)</h3>
                    <div className="inline-flex items-center gap-1 bg-[#F5F5F5] text-[11px] text-[var(--text-secondary)] px-2 py-1 rounded">
                      Standard – Gel Infused
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[var(--accent)] font-bold">${price2.toFixed(2)}</span>
                      <span className="text-[var(--text-secondary)] text-xs line-through">${orig2.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center border border-[var(--border-color)] rounded">
                      <button className="w-6 h-6 flex items-center justify-center text-[var(--text-secondary)]" onClick={() => handleQtyChange(setQty2, -1)}>&minus;</button>
                      <span className="w-8 text-center text-sm font-medium border-l border-r border-[var(--border-color)]">{qty2}</span>
                      <button className="w-6 h-6 flex items-center justify-center text-[var(--text-secondary)]" onClick={() => handleQtyChange(setQty2, 1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Marketplace Voucher Section */}
            <div className="bg-[var(--bg-primary)] px-4 py-3 mt-3 border-t border-b border-[var(--border-color)] flex justify-between items-center cursor-pointer">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" /></svg>
                  <span className="font-bold text-sm">Marketplace Voucher</span>
                </div>
                {voucherDiscount > 0 && (
                  <div className="flex items-center pl-7">
                    <span className="bg-[var(--accent)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">$8 OFF min spend $50</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[var(--text-secondary)] text-[13px]">Select / Code</span>
                <svg className="w-3.5 h-3.5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </div>
            </div>

            {/* 7. Redeem Coins Section */}
            <div className="bg-[var(--bg-primary)] px-4 py-3 border-b border-[var(--border-color)] flex justify-between items-center">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div>
                  <div className="font-bold text-sm">Redeem Coins</div>
                  <div className="text-[11px] text-[var(--text-secondary)]">
                    Balance: 420 Coins (<span className="text-[var(--accent)] font-bold">Save $4.20</span>)
                  </div>
                </div>
              </div>
              <button 
                className={`w-10 h-5 rounded-full relative transition-colors duration-200 ease-in-out ${coinsEnabled ? 'bg-[var(--accent)]' : 'bg-gray-200'}`}
                onClick={() => setCoinsEnabled(!coinsEnabled)}
              >
                <span className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full shadow transition-transform duration-200 ease-in-out ${coinsEnabled ? 'translate-x-5' : 'translate-x-0'}`}></span>
              </button>
            </div>

            {/* 8. Order Summary Section */}
            <div className="bg-[var(--bg-primary)] mt-3 px-4 py-4 border-t border-[var(--border-color)]">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                <span className="font-bold text-sm">Order Summary</span>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Merchandise Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {voucherDiscount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-[var(--accent)]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /></svg>
                      Voucher Discount
                    </span>
                    <span className="text-[var(--accent)]">-${voucherDiscount.toFixed(2)}</span>
                  </div>
                )}
                {coinSavings > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-[var(--accent)]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Coin Savings
                    </span>
                    <span className="text-[var(--accent)]">-${coinSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.9 17.9 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                    Shipping Fee
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    {shippingFee === 0 && subtotal > 0 && <span className="text-[11px] text-[var(--text-secondary)] line-through">$4.50</span>}
                    <span className={shippingFee === 0 && subtotal > 0 ? "text-[var(--accent)]" : ""}>{subtotal > 0 ? (shippingFee === 0 ? "Free" : `$${shippingFee.toFixed(2)}`) : "$0.00"}</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-[var(--border-color)] mt-3 pt-3 flex justify-between items-center">
                <span className="font-bold text-sm">Total Estimated Savings</span>
                <span className="text-[var(--accent)] font-bold text-base">${Math.max(0, totalSavingsAmount).toFixed(2)}</span>
              </div>
            </div>
            
          </div>

          {/* 9. Bottom Checkout Bar */}
          <div className="bg-[var(--bg-primary)] absolute bottom-0 w-full max-w-[390px] h-16 border-t border-[var(--border-color)] flex items-center justify-between px-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
            <div className="flex items-center gap-2 cursor-pointer pl-1" onClick={toggleAll}>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${allChecked ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-gray-300'}`}>
                {allChecked && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
              </div>
              <span className="text-sm">All</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <div className="text-sm">Total: <span className="text-[var(--accent)] font-bold text-lg">${finalTotal.toFixed(2)}</span></div>
                {totalSavingsAmount > 0 && <div className="text-[10px] text-[var(--text-secondary)] font-medium tracking-tight">Saved ${totalSavingsAmount.toFixed(2)}</div>}
              </div>
              <button className="bg-[var(--accent)] text-white text-sm font-bold px-6 py-2.5 rounded-full flex items-center gap-1 shadow-[0_4px_10px_rgba(var(--accent),0.2)]">
                Check Out {checkedCount > 0 && <span>({checkedCount})</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Variant Switcher (Fixed to Window) */}
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
