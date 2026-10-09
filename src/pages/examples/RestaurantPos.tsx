import { useState, useEffect } from 'react';

type Variant = 'red' | 'amber' | 'emerald';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#EF4444': 'red',
  '#F59E0B': 'amber',
  '#10B981': 'emerald',
};

export function RestaurantPos({ variant = 'red' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);

  const [activeNav, setActiveNav] = useState('Orders');
  const [activeCategory, setActiveCategory] = useState('Mains');
  
  const [cart, setCart] = useState([
    { id: 2, name: 'Caesar Salad', price: 10.00, qty: 1 },
    { id: 3, name: 'Grilled Salmon', price: 22.00, qty: 1 },
    { id: 4, name: 'Pasta Carbonara', price: 16.00, qty: 1 },
  ]);

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) {
        setActiveTheme('red');
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

  const navItems = [
    { name: 'Orders', badge: '8', iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { name: 'Menu', iconPath: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
    { name: 'Tables', iconPath: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6z' },
    { name: 'Kitchen', iconPath: 'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z' },
    { name: 'Reservations', iconPath: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5' },
    { name: 'Reports', iconPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
    { name: 'Settings', iconPath: 'M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z' }
  ];

  const categories = ['Starters', 'Mains', 'Desserts', 'Drinks'];

  const menuItems = [
    { id: 1, name: 'Margherita Pizza', price: 14.00, iconPath: 'M12 21a9 9 0 100-18 9 9 0 000 18z M12 21L12 12 3.5 8.5' },
    { id: 2, name: 'Caesar Salad', price: 10.00, iconPath: 'M3 10.5A2.5 2.5 0 015.5 8h13A2.5 2.5 0 0121 10.5v1.5a6 6 0 01-6 6H9a6 6 0 01-6-6v-1.5z' },
    { id: 3, name: 'Grilled Salmon', price: 22.00, iconPath: 'M5.23 7.21a35.98 35.98 0 00-1.32 9.02A35.98 35.98 0 005.23 21h13.54a35.98 35.98 0 001.32-4.77A35.98 35.98 0 0018.77 7.21H5.23z' },
    { id: 4, name: 'Pasta Carbonara', price: 16.00, iconPath: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m18-6v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2m0 6a2 2 0 002 2h14a2 2 0 002-2v-6H3v6z' },
    { id: 5, name: 'Beef Burger', price: 18.00, iconPath: 'M4.5 12h15m-15 0a7.5 7.5 0 1115 0m-15 0v3a2.25 2.25 0 002.25 2.25h10.5A2.25 2.25 0 0019.5 15v-3' },
    { id: 6, name: 'Tomato Soup', price: 8.00, iconPath: 'M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 12a3 3 0 100-6 3 3 0 000 6z' },
    { id: 7, name: 'Tiramisu', price: 9.00, iconPath: 'M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z' },
    { id: 8, name: 'Latte', price: 5.00, iconPath: 'M15 2.25a3 3 0 01-3 3h-1.5a3 3 0 01-3-3m0 0V2.25m6 0V2.25M7.5 15.75A9 9 0 0016.5 6.75H6a9 9 0 001.5 9z' }
  ];

  const orderQueue = [
    { id: '#1234', table: 'Table 3', time: '2m ago', status: 'Pending', statusColor: 'amber' },
    { id: '#1235', table: 'Table 8', time: '4m ago', status: 'Preparing', statusColor: 'accent' },
    { id: '#1236', table: 'Table 12', time: '6m ago', status: 'Pending', statusColor: 'amber' }
  ];

  const addToCart = (item: { id: number, name: string, price: number }) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === item.id);
      if (existing) {
        return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(p => {
      if (p.id === id) {
        const newQty = Math.max(0, p.qty + delta);
        return { ...p, qty: newQty };
      }
      return p;
    }).filter(p => p.qty > 0));
  };

  const removeCartItem = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .pos-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .pos-wrapper[data-theme="red"] {
          --accent: #EF4444;
          --accent-hover: #DC2626;
          --accent-light: rgba(239,68,68,0.1);
          --bg-primary: #0F0A0A;
          --bg-secondary: #1A1212;
          --bg-card: #241A1A;
          --border: #3A2424;
          --text-primary: #FFF0F0;
          --text-secondary: #C08080;
        }
        .pos-wrapper[data-theme="amber"] {
          --accent: #F59E0B;
          --accent-hover: #D97706;
          --accent-light: rgba(245,158,11,0.1);
          --bg-primary: #0F0D08;
          --bg-secondary: #161410;
          --bg-card: #1E1C16;
          --border: #2A2820;
          --text-primary: #FFF8F0;
          --text-secondary: #AA9960;
        }
        .pos-wrapper[data-theme="emerald"] {
          --accent: #10B981;
          --accent-hover: #059669;
          --accent-light: rgba(16,185,129,0.1);
          --bg-primary: #0A0F0C;
          --bg-secondary: #101A14;
          --bg-card: #162220;
          --border: #1E3A30;
          --text-primary: #F0FFF8;
          --text-secondary: #6BAA88;
        }
      `}</style>

      <div 
        className="pos-wrapper grid grid-cols-[180px_1fr_280px] h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]" 
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* Col 1: Sidebar */}
        <div className="bg-[var(--bg-secondary)] border-r border-[var(--border)] py-4 flex flex-col">
          <div className="px-3 mb-5 flex items-center gap-2 text-[var(--accent)]">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
            <span className="font-bold text-lg tracking-tight">BistroOS</span>
          </div>

          <div className="px-2 flex-1 overflow-y-auto space-y-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                  activeNav === item.name
                    ? 'bg-[var(--accent-light)] text-[var(--accent)] font-medium'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                </svg>
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span className="bg-[var(--accent)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="px-4 border-t border-[var(--border)] pt-4 mt-auto">
            <div className="border border-[var(--accent)] rounded-lg px-3 py-1.5 text-xs text-[var(--accent)] text-center font-medium bg-[var(--accent-light)] cursor-pointer">
              Table 5
            </div>
          </div>
        </div>

        {/* Col 2: Menu Grid */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] flex flex-col">
          {/* Category Tabs */}
          <div className="px-5 pt-4 flex gap-2 border-b border-[var(--border)] pb-3">
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${
                  activeCategory === cat
                    ? 'text-[var(--accent)] border-b-2 border-[var(--accent)] -mb-[13px]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </div>
            ))}
          </div>

          {/* Menu Items */}
          <div className="px-5 mt-4 grid grid-cols-4 gap-3">
            {menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => addToCart(item)}
                className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden cursor-pointer hover:border-[var(--accent)]/40 transition-colors shadow-sm flex flex-col"
              >
                <div className="h-24 bg-[var(--bg-secondary)] flex items-center justify-center">
                  <svg className="w-8 h-8 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                  </svg>
                </div>
                <div className="p-3">
                  <div className="font-bold text-sm text-[var(--text-primary)] truncate">{item.name}</div>
                  <div className="text-[var(--accent)] text-sm font-bold mt-1">${item.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Queue */}
          <div className="px-5 mt-auto pt-6 pb-4 border-t border-[var(--border)]">
            <h3 className="font-bold text-sm text-[var(--text-primary)] mb-2">Order Queue</h3>
            <div className="space-y-2">
              {orderQueue.map((order, i) => (
                <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3 flex items-center gap-4 shadow-sm">
                  <div className="font-bold text-sm text-[var(--text-primary)] w-14">{order.id}</div>
                  <div className="bg-[var(--bg-secondary)] px-2 py-0.5 rounded text-xs text-[var(--text-primary)] border border-[var(--border)]">
                    {order.table}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] w-16">{order.time}</div>
                  
                  <div className="flex-1 flex justify-end">
                    <div className={`px-2.5 py-1 rounded text-xs font-medium ${
                      order.statusColor === 'accent' 
                        ? 'bg-[var(--accent-light)] text-[var(--accent)]' 
                        : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 3: Cart Panel */}
        <div className="bg-[var(--bg-secondary)] border-l border-[var(--border)] flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg-secondary)]">
            <div className="font-bold text-sm text-[var(--text-primary)]">Table 5</div>
            <div className="bg-[var(--accent)] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
              {cart.reduce((sum, item) => sum + item.qty, 0)}
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-3 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-sm text-[var(--text-primary)]">{item.name}</div>
                  <button 
                    onClick={() => removeCartItem(item.id)}
                    className="text-[var(--text-secondary)] hover:text-red-500 transition-colors p-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-sm font-medium text-[var(--accent)]">${(item.price * item.qty).toFixed(2)}</div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQty(item.id, -1)}
                      className="w-7 h-7 border border-[var(--border)] rounded flex items-center justify-center cursor-pointer hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors bg-[var(--bg-secondary)]"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                      </svg>
                    </button>
                    <div className="text-sm font-bold w-4 text-center text-[var(--text-primary)]">{item.qty}</div>
                    <button 
                      onClick={() => updateQty(item.id, 1)}
                      className="w-7 h-7 border border-[var(--border)] rounded flex items-center justify-center cursor-pointer hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors bg-[var(--bg-secondary)]"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {cart.length === 0 && (
              <div className="text-center text-sm text-[var(--text-secondary)] py-10">
                Cart is empty
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="px-4 py-4 border-t border-[var(--border)] space-y-2 bg-[var(--bg-secondary)]">
            <div className="flex justify-between text-sm">
              <div className="text-[var(--text-secondary)]">Subtotal</div>
              <div className="font-medium text-[var(--text-primary)]">${subtotal.toFixed(2)}</div>
            </div>
            <div className="flex justify-between text-sm">
              <div className="text-[var(--text-secondary)]">Tax (8%)</div>
              <div className="font-medium text-[var(--text-primary)]">${tax.toFixed(2)}</div>
            </div>
            <div className="border-t border-[var(--border)] my-2"></div>
            <div className="flex justify-between items-center text-base font-bold">
              <div className="text-[var(--text-primary)]">Total</div>
              <div className="text-[var(--text-primary)]">${total.toFixed(2)}</div>
            </div>
            <button className="mt-3 w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl py-3 font-bold transition-colors shadow-sm shadow-[var(--accent)]/20 cursor-pointer">
              Place Order
            </button>
            <button className="mt-2 w-full border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-xl py-2.5 text-sm font-medium transition-colors cursor-pointer">
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
