import { useState, useEffect } from 'react';

type Variant = 'emerald' | 'blue' | 'amber';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#10B981': 'emerald',
  '#3B82F6': 'blue',
  '#F59E0B': 'amber',
};

export function InvoiceDashboard({ variant = 'emerald' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  
  const [activeNav, setActiveNav] = useState('Invoices');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedInvoice, setSelectedInvoice] = useState('INV-2023-145');

  useEffect(() => {
    setActiveTheme(variant);
  }, [variant]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'SET_THEME_VARIATION') return;
      const variation = event.data.variation;
      if (!variation) { 
        setActiveTheme('emerald'); 
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
    { name: 'Dashboard', iconPath: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z' },
    { name: 'Invoices', iconPath: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
    { name: 'Clients', iconPath: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
    { name: 'Payments', iconPath: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z' },
    { name: 'Reports', iconPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
    { name: 'Settings', iconPath: 'M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z' }
  ];

  const invoices = [
    { id: 'INV-2023-145', client: 'Aero Dynamics', amount: '$12,450', date: 'Sep 15', dueDate: 'Sep 30', status: 'Paid' },
    { id: 'INV-2023-146', client: 'Skyline Corp.', amount: '$8,120', date: 'Sep 18', dueDate: 'Oct 02', status: 'Pending' },
    { id: 'INV-2023-147', client: 'Global Tech', amount: '$3,900', date: 'Sep 20', dueDate: 'Oct 05', status: 'Paid' },
    { id: 'INV-2023-148', client: 'Apex Solutions', amount: '$5,110', date: 'Sep 22', dueDate: 'Oct 06', status: 'Overdue' },
    { id: 'INV-2023-149', client: 'Vertex Ltd.', amount: '$18,240', date: 'Sep 25', dueDate: 'Oct 10', status: 'Pending' },
    { id: 'INV-2023-150', client: 'Fusion Inc.', amount: '$14,750', date: 'Sep 28', dueDate: 'Oct 13', status: 'Paid' }
  ];

  const renderStatus = (status: string) => {
    let classes = 'rounded-full px-2.5 py-0.5 text-xs font-medium ';
    if (status === 'Paid') classes += 'bg-green-500/20 text-green-500';
    else if (status === 'Pending') classes += 'bg-amber-500/20 text-amber-500';
    else if (status === 'Overdue') classes += 'bg-red-500/20 text-red-400';

    return <span className={classes}>{status}</span>;
  };

  const getActiveInvoice = () => invoices.find(inv => inv.id === selectedInvoice);
  const activeInvoiceDetails = getActiveInvoice();

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .invoice-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .invoice-wrapper[data-theme="emerald"] {
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
        .invoice-wrapper[data-theme="blue"] {
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
        .invoice-wrapper[data-theme="amber"] {
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
        className="invoice-wrapper grid grid-cols-[200px_1fr_320px] h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]" 
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* Col 1: Sidebar */}
        <div className="bg-[var(--bg-secondary)] border-r border-[var(--border)] py-4 flex flex-col">
          <div className="px-4 mb-5 flex items-center gap-2 text-[var(--accent)]">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-bold text-xl tracking-tight">BillFlow</span>
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

          <div className="px-4 border-t border-[var(--border)] pt-4 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center font-bold text-xs">
                  U
                </div>
                <div>
                  <div className="text-sm font-semibold">Finance Team</div>
                </div>
              </div>
              <span className="bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold px-2 py-0.5 rounded">Pro</span>
            </div>
          </div>
        </div>

        {/* Col 2: Main */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg-secondary)]/50">
            <h1 className="font-bold text-xl">Invoices</h1>
            <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-[var(--accent)]/20">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Create Invoice
            </button>
          </div>

          {/* Stats Row */}
          <div className="px-6 mt-4 grid grid-cols-4 gap-4">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 flex flex-col shadow-sm">
              <div className="text-[var(--text-secondary)] text-sm mb-1 font-medium">Total Revenue</div>
              <div className="font-bold text-2xl mb-2">$124,580</div>
              <div className="flex items-center gap-1 text-xs text-green-500 font-medium">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
                +12%
              </div>
            </div>
            
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 flex flex-col shadow-sm">
              <div className="text-[var(--text-secondary)] text-sm mb-1 font-medium">Pending</div>
              <div className="font-bold text-2xl mb-2">$18,240</div>
              <div className="text-xs text-[var(--text-secondary)]">48 invoices</div>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 flex flex-col shadow-sm relative overflow-hidden">
              <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="text-[var(--text-secondary)] text-sm mb-1 font-medium">Overdue</div>
              <div className="font-bold text-2xl mb-2 text-red-400">$3,420</div>
              <div className="text-xs text-[var(--text-secondary)]">7 invoices</div>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 flex flex-col shadow-sm">
              <div className="text-[var(--text-secondary)] text-sm mb-1 font-medium">Paid This Month</div>
              <div className="font-bold text-2xl mb-2">$42,800</div>
              <div className="text-xs text-[var(--text-secondary)]">31 invoices</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="px-6 mt-4 flex gap-1 border-b border-[var(--border)]">
            {['All', 'Paid', 'Pending', 'Overdue'].map((filter) => (
              <div
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                  activeFilter === filter
                    ? 'border-b-2 border-[var(--accent)] text-[var(--accent)] font-medium'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {filter}
              </div>
            ))}
          </div>

          {/* Invoice Table */}
          <div className="px-6 mt-2 pb-6">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase text-[var(--text-secondary)] tracking-wider">
                  <th className="py-3 font-medium">Invoice #</th>
                  <th className="py-3 font-medium">Client</th>
                  <th className="py-3 font-medium">Amount</th>
                  <th className="py-3 font-medium">Date</th>
                  <th className="py-3 font-medium">Due Date</th>
                  <th className="py-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr 
                    key={inv.id}
                    onClick={() => setSelectedInvoice(inv.id)}
                    className={`border-b border-[var(--border)]/30 text-sm cursor-pointer hover:bg-[var(--bg-card)]/50 transition-colors ${
                      selectedInvoice === inv.id ? 'bg-[var(--bg-card)] border-l-2 border-l-[var(--accent)]' : 'border-l-2 border-l-transparent'
                    }`}
                  >
                    <td className="py-3 pl-2 text-[var(--text-secondary)]">{inv.id}</td>
                    <td className="py-3 font-bold text-[var(--text-primary)]">{inv.client}</td>
                    <td className="py-3 font-medium">{inv.amount}</td>
                    <td className="py-3 text-[var(--text-secondary)]">{inv.date}</td>
                    <td className="py-3 text-[var(--text-secondary)]">{inv.dueDate}</td>
                    <td className="py-3 text-right pr-2">{renderStatus(inv.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Col 3: Detail Panel */}
        <div className="bg-[var(--bg-secondary)] border-l border-[var(--border)] overflow-y-auto p-5 flex flex-col">
          {activeInvoiceDetails && (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="font-bold text-[var(--text-primary)]">{activeInvoiceDetails.id}</div>
                {renderStatus(activeInvoiceDetails.status)}
              </div>
              
              <div className="mb-4">
                <div className="text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Client</div>
                <div className="font-bold text-lg leading-tight">{activeInvoiceDetails.client}</div>
                <div className="font-bold text-xl text-[var(--accent)] mt-1">{activeInvoiceDetails.amount}</div>
              </div>

              <div className="h-px bg-[var(--border)] w-full mb-4"></div>

              <div className="mb-4 text-sm text-[var(--text-secondary)] flex flex-col gap-2">
                <div>
                  <span className="font-medium text-[var(--text-primary)] block">Billed To:</span>
                  123 Corporate Blvd, Suite 400<br/>
                  New York, NY 10001
                </div>
                <div>
                  <span className="font-medium text-[var(--text-primary)]">Due Date:</span> {activeInvoiceDetails.dueDate}
                </div>
              </div>

              <div className="mt-2 mb-4">
                <h3 className="font-bold text-sm mb-3">Line Items</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between border-b border-[var(--border)]/50 pb-2">
                    <span className="text-[var(--text-secondary)]">Development Services</span>
                    <span className="font-medium">$10,000</span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--border)]/50 pb-2">
                    <span className="text-[var(--text-secondary)]">Design</span>
                    <span className="font-medium">$2,450</span>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-col gap-1 text-sm">
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Subtotal</span>
                    <span>$12,450</span>
                  </div>
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Tax</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between font-bold text-[var(--text-primary)] mt-1 pt-1 border-t border-[var(--border)]/50">
                    <span>Total</span>
                    <span>$12,450</span>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex-1">
                <h3 className="font-bold text-sm mb-4">Payment History</h3>
                <div className="relative pl-4 border-l border-[var(--border)] ml-2 space-y-4">
                  <div className="relative text-sm">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-[var(--bg-secondary)]"></div>
                    <div className="font-medium">Invoice Sent</div>
                    <div className="text-xs text-[var(--text-secondary)]">Sep 15</div>
                  </div>
                  <div className="relative text-sm">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--text-secondary)] ring-4 ring-[var(--bg-secondary)]"></div>
                    <div className="font-medium text-[var(--text-secondary)]">Reminder</div>
                    <div className="text-xs text-[var(--text-secondary)]">Sep 25</div>
                  </div>
                  <div className="relative text-sm">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-[var(--bg-secondary)]"></div>
                    <div className="font-medium">Payment Received</div>
                    <div className="text-xs text-[var(--text-secondary)]">Sep 30</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium py-2 rounded-lg text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
                <button className="w-full bg-[var(--bg-primary)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text-primary)] text-[var(--text-secondary)] font-medium py-2 rounded-lg text-sm transition-colors cursor-pointer flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Send Reminder
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
