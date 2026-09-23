import { useState, useEffect } from 'react';

type Variant = 'orange' | 'blue' | 'emerald';

const ACCENT_TO_THEME: Record<string, Variant> = {
  '#F97316': 'orange',
  '#3B82F6': 'blue',
  '#10B981': 'emerald'
};

export function BookingCalendar({ variant = 'orange' }: { variant?: Variant }) {
  const [activeTheme, setActiveTheme] = useState<Variant>(variant);
  const [customFont, setCustomFont] = useState<string | null>(null);
  
  const [activeNav, setActiveNav] = useState('Calendar');
  const [viewMode, setViewMode] = useState('Week');
  
  const bookings = [
    { id: 1, text: "Suite 401 - Johnson", room: "Suite 401", guest: "Emily Johnson", email: "emily.j@example.com", checkIn: "Sep 18, 2023", checkOut: "Sep 21, 2023", nights: 3, total: "$1,240", status: "Paid", reqs: "Late checkout, 2 extra towels", bg: "var(--accent)", colStart: 1, colSpan: 3, rowStart: 3, rowSpan: 1 },
    { id: 2, text: "Deluxe 205 - Smith", room: "Deluxe 205", guest: "Michael Smith", email: "msmith99@example.com", checkIn: "Sep 21, 2023", checkOut: "Sep 22, 2023", nights: 1, total: "$320", status: "Unpaid", reqs: "None", bg: "#3B82F6", colStart: 4, colSpan: 2, rowStart: 4, rowSpan: 1 },
    { id: 3, text: "Standard 102 - Garcia", room: "Standard 102", guest: "Elena Garcia", email: "elena.g@example.com", checkIn: "Sep 19, 2023", checkOut: "Sep 22, 2023", nights: 3, total: "$750", status: "Paid", reqs: "Near elevator", bg: "#22C55E", colStart: 2, colSpan: 4, rowStart: 6, rowSpan: 3 },
    { id: 4, text: "Penthouse - Lee", room: "Penthouse", guest: "David Lee", email: "david.lee@example.com", checkIn: "Sep 21, 2023", checkOut: "Sep 21, 2023", nights: 1, total: "$1,500", status: "Paid", reqs: "Champagne on arrival", bg: "#A855F7", colStart: 4, colSpan: 1, rowStart: 2, rowSpan: 1 },
  ];
  
  const [selectedBooking, setSelectedBooking] = useState(bookings[0]);

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

  const navItems = [
    { name: 'Dashboard', icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z' },
    { name: 'Calendar', icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5' },
    { name: 'Rooms', icon: 'M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75' },
    { name: 'Guests', icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
    { name: 'Bookings', icon: 'M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
    { name: 'Settings', icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .booking-wrapper {
          font-family: 'Inter', sans-serif;
        }
        .booking-wrapper[data-theme="orange"] {
          --accent: #F97316;
          --accent-hover: #EA580C;
          --accent-light: rgba(249,115,22,0.1);
          --bg-primary: #0F0D08;
          --bg-secondary: #161410;
          --bg-card: #1E1C16;
          --border: #2A2820;
          --text-primary: #FFF8F0;
          --text-secondary: #AA9960;
        }
        .booking-wrapper[data-theme="blue"] {
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
        .booking-wrapper[data-theme="emerald"] {
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
        className="booking-wrapper grid grid-cols-[200px_1fr_300px] h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]" 
        data-theme={activeTheme}
        style={{ fontFamily: customFont || undefined }}
      >
        {/* Col 1: Sidebar */}
        <div className="w-[200px] bg-[var(--bg-secondary)] border-r border-[var(--border)] py-4 flex flex-col">
          <div className="px-4 mb-5 flex items-center gap-2 text-[var(--accent)]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
            <span className="font-bold text-lg">StayBook</span>
          </div>

          <div className="px-2">
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                  activeNav === item.name
                    ? 'bg-[var(--accent-light)] text-[var(--accent)] font-medium'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {item.name}
              </div>
            ))}
          </div>

          <div className="px-4 mt-6">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3">
              <div className="text-xs uppercase text-[var(--text-secondary)] font-semibold mb-1">Room Status</div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-bold text-lg text-[var(--text-primary)]">12/20</span>
                <span className="text-xs text-[var(--text-secondary)]">rooms occupied</span>
              </div>
              <div className="flex items-end gap-1 h-10">
                <div className="flex-1 bg-[var(--border)] rounded-sm h-[40%]"></div>
                <div className="flex-1 bg-[var(--accent)] rounded-sm h-[70%]"></div>
                <div className="flex-1 bg-[var(--accent)] rounded-sm h-[90%]"></div>
                <div className="flex-1 bg-[var(--accent)] rounded-sm h-[60%]"></div>
                <div className="flex-1 bg-[var(--border)] rounded-sm h-[30%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Col 2: Main Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] flex flex-col relative">
          <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg-primary)] sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <h1 className="font-bold text-xl text-[var(--text-primary)]">September 2023</h1>
              <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
              <button className="px-3 py-1 border border-[var(--border)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-card)] cursor-pointer ml-2">
                Today
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-0.5">
                <button 
                  onClick={() => setViewMode('Month')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md cursor-pointer transition-colors ${viewMode === 'Month' ? 'bg-[var(--accent)] text-white shadow' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  Month
                </button>
                <button 
                  onClick={() => setViewMode('Week')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md cursor-pointer transition-colors ${viewMode === 'Week' ? 'bg-[var(--accent)] text-white shadow' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  Week
                </button>
              </div>
              <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-md shadow-[var(--accent)]/10">
                + New Booking
              </button>
            </div>
          </div>

          <div className="px-6 mt-2 flex-1 flex flex-col min-w-[700px]">
            {/* Grid Header */}
            <div className="ml-12 grid grid-cols-7 gap-px text-center text-xs text-[var(--text-secondary)] py-2">
              <div className="font-medium">Mon 18</div>
              <div className="font-medium">Tue 19</div>
              <div className="font-medium text-[var(--accent)]">Wed 20</div>
              <div className="font-medium">Thu 21</div>
              <div className="font-medium">Fri 22</div>
              <div className="font-medium">Sat 23</div>
              <div className="font-medium">Sun 24</div>
            </div>

            <div className="flex-1 relative flex">
              {/* Time Column */}
              <div className="w-12 flex flex-col text-[10px] text-[var(--text-secondary)] pt-4 border-r border-[var(--border)]/30">
                {['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'].map((time) => (
                  <div key={time} className="h-12 -mt-1.5 pr-2 text-right">{time}</div>
                ))}
              </div>

              {/* Grid Background */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 grid grid-cols-7">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={`col-${i}`} className="border-r border-[var(--border)]/20 last:border-r-0"></div>
                  ))}
                </div>
                <div className="absolute inset-0 flex flex-col">
                  {Array.from({ length: 13 }).map((_, i) => (
                    <div key={`row-${i}`} className="h-12 border-b border-[var(--border)]/20 last:border-b-0"></div>
                  ))}
                </div>

                {/* Booking Blocks */}
                <div className="absolute inset-0 grid grid-cols-7" style={{ gridTemplateRows: 'repeat(13, 3rem)' }}>
                  {bookings.map((booking) => {
                    const isSelected = selectedBooking.id === booking.id;
                    return (
                      <div
                        key={booking.id}
                        onClick={() => setSelectedBooking(booking)}
                        className={`absolute rounded-lg px-2 py-1 text-xs text-white cursor-pointer overflow-hidden m-0.5 shadow-sm transition-all ${isSelected ? 'ring-2 ring-white/40 z-10 scale-[1.02]' : 'hover:scale-[1.01] hover:z-10'}`}
                        style={{
                          backgroundColor: booking.bg,
                          gridColumnStart: booking.colStart,
                          gridColumnEnd: `span ${booking.colSpan}`,
                          gridRowStart: booking.rowStart,
                          gridRowEnd: `span ${booking.rowSpan}`,
                          left: `${((booking.colStart - 1) * 100) / 7}%`,
                          width: `calc(${((booking.colSpan) * 100) / 7}% - 4px)`,
                          top: `${(booking.rowStart - 1) * 3}rem`,
                          height: `calc(${booking.rowSpan * 3}rem - 4px)`
                        }}
                      >
                        <div className="font-semibold truncate">{booking.text}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Detail Panel */}
        <div className="w-[300px] bg-[var(--bg-secondary)] border-l border-[var(--border)] overflow-y-auto p-5 relative flex flex-col">
          <div className="font-bold text-sm mb-4 text-[var(--text-primary)]">Booking Details</div>
          
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm">
            <div className="font-bold text-[var(--text-primary)] mb-3">{selectedBooking.room} - {selectedBooking.guest.split(' ')[1]}</div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--accent)] to-amber-500 flex items-center justify-center font-bold text-white shadow-md text-lg shrink-0">
                {selectedBooking.guest.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm text-[var(--text-primary)] truncate">{selectedBooking.guest}</div>
                <div className="text-xs text-[var(--text-secondary)] truncate">{selectedBooking.email}</div>
              </div>
            </div>

            <hr className="border-[var(--border)] my-4" />

            <div className="text-sm space-y-3">
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Room</span>
                <span className="font-medium text-[var(--text-primary)]">{selectedBooking.room}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Check-in</span>
                <span className="font-medium text-[var(--text-primary)]">{selectedBooking.checkIn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Check-out</span>
                <span className="font-medium text-[var(--text-primary)]">{selectedBooking.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Nights</span>
                <span className="font-medium text-[var(--text-primary)]">{selectedBooking.nights}</span>
              </div>
              <div className="flex justify-between mt-2 pt-2 border-t border-[var(--border)]/50">
                <span className="text-[var(--text-secondary)]">Total</span>
                <span className="font-bold text-[var(--accent)]">{selectedBooking.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Payment</span>
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${selectedBooking.status === 'Paid' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                  {selectedBooking.status}
                </span>
              </div>
            </div>

            <div className="mt-4 bg-[var(--bg-primary)]/50 rounded-lg p-3 border border-[var(--border)]/50">
              <div className="text-[10px] uppercase text-[var(--text-secondary)] font-semibold mb-1">Special Requests</div>
              <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {selectedBooking.reqs}
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="flex-1 py-2 border border-[var(--border)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer">
              Edit
            </button>
            <button className="flex-1 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg text-sm font-medium transition-colors shadow-md shadow-[var(--accent)]/10 cursor-pointer">
              Check Out
            </button>
          </div>

          <div className="mt-8">
            <div className="font-bold text-sm mb-3 text-[var(--text-primary)]">Upcoming</div>
            <div className="space-y-2">
              {[
                { name: "David Kim", room: "Suite 502", date: "Sep 22", status: "Confirmed", color: "bg-green-500" },
                { name: "Lisa Wang", room: "Deluxe 303", date: "Sep 23", status: "Pending", color: "bg-amber-500" },
                { name: "James Moore", room: "Standard 104", date: "Sep 24", status: "Confirmed", color: "bg-green-500" }
              ].map((guest, i) => (
                <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-3 flex items-center justify-between shadow-sm cursor-pointer hover:border-[var(--accent)]/50 transition-colors">
                  <div>
                    <div className="font-bold text-sm text-[var(--text-primary)]">{guest.name}</div>
                    <div className="text-xs text-[var(--text-secondary)] flex items-center gap-1.5 mt-0.5">
                      <span>{guest.room}</span>
                      <span className="w-1 h-1 rounded-full bg-[var(--border)]"></span>
                      <span>{guest.date}</span>
                    </div>
                  </div>
                  <div className={`w-2.5 h-2.5 rounded-full ${guest.color} shadow-sm`}></div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
