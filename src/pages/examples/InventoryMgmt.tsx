import { useState, useEffect } from 'react';

type Variant = 'teal' | 'blue' | 'amber';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#14B8A6': 'teal',
  '#3B82F6': 'blue',
  '#F59E0B': 'amber',
};

export function InventoryMgmt({ variant = 'teal' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState('Inventory');
  const [selectedProduct, setSelectedProduct] = useState('SK001');

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('teal'); 
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
    { name: 'Dashboard', iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Inventory', iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { name: 'Orders', iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { name: 'Suppliers', iconPath: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' },
    { name: 'Warehouses', iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { name: 'Reports', iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Settings', iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z' }
  ];

  const products = [
    { sku: 'SK001', name: 'Wireless Headphones', category: 'Electronics', stockPct: 85, stockCount: 120, price: '$149.99', status: 'In Stock', icon: 'M9 19V6a3 3 0 016 0v13m-6 0a3 3 0 00-3-3H4a2 2 0 00-2 2v1a2 2 0 002 2h2a2 2 0 002-2m6 0a3 3 0 013-3h2a2 2 0 012 2v1a2 2 0 01-2 2h-2a2 2 0 01-2-2', barcode: '1234567890', supplier: 'AudioTech Corp', reorder: '20 units', location: 'Aisle 3, Shelf B' },
    { sku: 'SK002', name: 'Mechanic Mouse', category: 'Electronics', stockPct: 35, stockCount: 45, price: '$89.00', status: 'Low Stock', icon: 'M7 8a5 5 0 0110 0v8a5 5 0 01-10 0V8z M12 4v4', barcode: '2345678901', supplier: 'Peripheral Inc', reorder: '15 units', location: 'Aisle 4, Shelf A' },
    { sku: 'SK003', name: 'Gaming Keyboard', category: 'Accessories', stockPct: 5, stockCount: 3, price: '$179.50', status: 'Out of Stock', icon: 'M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z M7 10h.01M11 10h.01M15 10h.01M19 10h.01M7 14h10', barcode: '3456789012', supplier: 'Peripheral Inc', reorder: '25 units', location: 'Aisle 4, Shelf C' },
    { sku: 'SK004', name: 'Type-C Cable', category: 'Mobile', stockPct: 95, stockCount: 350, price: '$19.99', status: 'In Stock', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', barcode: '4567890123', supplier: 'FastCharge Co', reorder: '100 units', location: 'Aisle 1, Shelf D' },
    { sku: 'SK005', name: 'USB-C Dock', category: 'Accessories', stockPct: 60, stockCount: 78, price: '$129.99', status: 'In Stock', icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01', barcode: '5678901234', supplier: 'HubMasters', reorder: '30 units', location: 'Aisle 2, Shelf B' },
    { sku: 'SK006', name: 'VR Headset', category: 'Gadgets', stockPct: 20, stockCount: 12, price: '$549.00', status: 'Low Stock', icon: 'M4 8h16a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4a2 2 0 012-2z M12 10v4M8 12h.01M16 12h.01', barcode: '6789012345', supplier: 'FutureVision', reorder: '15 units', location: 'Aisle 5, Shelf A' }
  ];

  const getStatusColor = (status: string) => {
    if (status === 'In Stock') return 'bg-green-500/10 text-green-500';
    if (status === 'Low Stock') return 'bg-amber-500/10 text-amber-500';
    return 'bg-red-500/10 text-red-500';
  };

  const getBarColor = (pct: number) => {
    if (pct > 50) return 'bg-green-500';
    if (pct > 20) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const currentProduct = products.find(p => p.sku === selectedProduct) || products[0];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .inventory-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .inventory-wrapper[data-theme="teal"] {
          --accent: #14B8A6;
          --accent-hover: #0D9488;
          --accent-light: rgba(20,184,166,0.1);
          --bg-primary: #080E0E;
          --bg-secondary: #0E1616;
          --bg-card: #141E1E;
          --border: #1E2E2E;
          --text-primary: #F0FAFA;
          --text-secondary: #5A8A8A;
        }
        .inventory-wrapper[data-theme="blue"] {
          --accent: #3B82F6;
          --accent-hover: #2563EB;
          --accent-light: rgba(59,130,246,0.1);
          --bg-primary: #0C1220;
          --bg-secondary: #111828;
          --bg-card: #1A2236;
          --border: #1E2E42;
          --text-primary: #F1F5F9;
          --text-secondary: #64748B;
        }
        .inventory-wrapper[data-theme="amber"] {
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
      `}</style>

      <div 
        className="inventory-wrapper grid grid-cols-[200px_1fr_280px] h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]" 
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* Col 1: Sidebar */}
        <div className="bg-[var(--bg-secondary)] border-r border-[var(--border)] py-4 flex flex-col">
          <div className="px-4 mb-5 flex items-center gap-2 text-[var(--accent)]">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span className="font-bold text-xl tracking-tight">StockHub</span>
          </div>

          <div className="px-2 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-1 cursor-pointer transition-colors ${
                  activeNav === item.name
                    ? 'bg-[var(--accent-light)] text-[var(--accent)] font-medium'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                </svg>
                {item.name}
              </div>
            ))}
          </div>

          <div className="px-4 border-t border-[var(--border)] pt-4 mt-auto flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Main Warehouse</span>
          </div>
        </div>

        {/* Col 2: Main */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] flex flex-col">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="font-bold text-xl">Inventory Overview</h1>
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg className="w-4 h-4 text-[var(--text-secondary)] absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search inventory..."
                  className="w-64 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg pl-9 pr-4 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
              <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Product
              </button>
            </div>
          </div>

          <div className="px-6 mt-2 grid grid-cols-4 gap-3">
            {[
              { label: 'Total Products', value: '2,456', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', valueColor: 'text-[var(--text-primary)]', subtext: '' },
              { label: 'Low Stock', value: '23', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', valueColor: 'text-red-500', subtext: 'Low warning', subtextColor: 'text-red-500' },
              { label: 'In Transit', value: '145', icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0', valueColor: 'text-[var(--text-primary)]', subtext: '' },
              { label: 'Total Value', value: '$1.2M', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', valueColor: 'text-[var(--text-primary)]', subtext: '' }
            ].map((stat, i) => (
              <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                  <span className="text-xs text-[var(--text-secondary)] font-medium">{stat.label}</span>
                </div>
                <div className="flex items-end justify-between">
                  <div className={`font-bold text-xl ${stat.valueColor}`}>{stat.value}</div>
                  {stat.subtext && <div className={`text-xs font-medium ${stat.subtextColor}`}>{stat.subtext}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 mt-4 pb-4">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-[var(--border)] text-xs uppercase text-[var(--text-secondary)] tracking-wider flex items-center font-medium">
                <div className="flex-1">Product</div>
                <div className="w-20">SKU</div>
                <div className="w-24">Category</div>
                <div className="w-32">Stock</div>
                <div className="w-20">Price</div>
                <div className="w-24">Status</div>
              </div>
              <div>
                {products.map((product) => {
                  const isSelected = selectedProduct === product.sku;
                  return (
                    <div 
                      key={product.sku}
                      onClick={() => setSelectedProduct(product.sku)}
                      className={`px-4 py-3 border-b border-[var(--border)]/30 last:border-0 flex items-center cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-[var(--accent-light)] border-l-2 border-[var(--accent)] pl-[14px]' 
                          : 'hover:bg-[var(--bg-primary)]/30 border-l-2 border-transparent'
                      }`}
                    >
                      <div className="flex-1 flex items-center gap-3 pr-2 overflow-hidden">
                        <div className="w-8 h-8 rounded bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)] shrink-0">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={product.icon} />
                          </svg>
                        </div>
                        <span className="text-sm font-bold truncate text-[var(--text-primary)]">{product.name}</span>
                      </div>
                      <div className="w-20 text-xs text-[var(--text-secondary)] truncate">{product.sku}</div>
                      <div className="w-24 text-xs truncate">{product.category}</div>
                      <div className="w-32 pr-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[var(--text-secondary)]">{product.stockCount}</span>
                          <span className="font-medium">{product.stockPct}%</span>
                        </div>
                        <div className="h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden w-full">
                          <div 
                            className={`h-full rounded-full ${getBarColor(product.stockPct)}`} 
                            style={{ width: `${product.stockPct}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-20 text-sm font-medium">{product.price}</div>
                      <div className="w-24">
                        <span className={`text-xs rounded-full px-2 py-0.5 font-medium whitespace-nowrap ${getStatusColor(product.status)}`}>
                          {product.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Detail Panel */}
        <div className="bg-[var(--bg-secondary)] border-l border-[var(--border)] overflow-y-auto p-5 flex flex-col">
          <h2 className="font-bold text-sm">Product Details</h2>
          
          <div className="mt-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl h-32 flex items-center justify-center text-[var(--accent)] shadow-inner">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={currentProduct.icon} />
            </svg>
          </div>

          <h3 className="font-bold text-base mt-3 text-[var(--text-primary)]">{currentProduct.name}</h3>
          
          <div className="mt-3 space-y-2.5 text-sm text-[var(--text-secondary)]">
            <div className="flex justify-between"><span>SKU:</span> <span className="font-medium text-[var(--text-primary)]">{currentProduct.sku}</span></div>
            <div className="flex justify-between"><span>Barcode:</span> <span className="font-medium text-[var(--text-primary)]">{currentProduct.barcode}</span></div>
            <div className="flex justify-between"><span>Category:</span> <span className="font-medium text-[var(--text-primary)]">{currentProduct.category}</span></div>
            <div className="flex justify-between"><span>Supplier:</span> <span className="font-medium text-[var(--text-primary)]">{currentProduct.supplier}</span></div>
            <div className="flex justify-between"><span>Reorder Point:</span> <span className="font-medium text-[var(--text-primary)]">{currentProduct.reorder}</span></div>
            <div className="flex justify-between"><span>Location:</span> <span className="font-medium text-[var(--text-primary)]">{currentProduct.location}</span></div>
          </div>

          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <h4 className="font-bold text-sm mb-3">Stock History</h4>
            <div className="h-16 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-2 flex items-end gap-1 justify-between shadow-inner">
              {[40, 50, 30, 60, 80, 40, 20, 50, 70, 90, 60, 45].map((val, i) => (
                <div 
                  key={i} 
                  className="w-full bg-[var(--accent)]/40 hover:bg-[var(--accent)] rounded-t transition-colors cursor-pointer"
                  style={{ height: `${val}%` }}
                ></div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-2 mb-2">
            <button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium py-2.5 rounded-xl text-sm transition-colors cursor-pointer shadow-sm">
              Edit Product
            </button>
            <button className="w-full bg-[var(--bg-primary)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text-primary)] text-[var(--text-secondary)] font-medium py-2.5 rounded-xl text-sm transition-colors cursor-pointer shadow-sm">
              Reorder Stock
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
