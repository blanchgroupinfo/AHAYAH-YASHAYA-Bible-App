import React, { useState } from 'react';
import { ViewState } from '../types';

interface NavMenuProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const links: { name: string; id: ViewState; icon: string }[] = [
  { name: 'Home Hub', id: 'home', icon: '🏛️' },
  { name: 'Calendar View', id: 'calendar', icon: '📅' },
  { name: 'Full Year', id: 'year', icon: '🗓️' },
  { name: 'Holy Feasts', id: 'feasts', icon: '📜' },
  { name: 'Truth Hub', id: 'knowledge', icon: '📖' },
  { name: 'Daily Sacrifice', id: 'offerings', icon: '🔥' },
  { name: 'Prayer Ledger', id: 'prayer', icon: '🙏' },
  { name: 'Baptism', id: 'baptism', icon: '🌊' },
  { name: 'Our Theology', id: 'about', icon: 'ℹ️' },
  { name: 'Settings', id: 'settings', icon: '⚙️' },
];

const NavMenu: React.FC<NavMenuProps> = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (id: ViewState) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className="flex flex-col gap-2">
      {/* Desktop Vertical Menu */}
      <div className="hidden lg:flex flex-col gap-1.5">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => handleNav(link.id)}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl font-serif font-bold text-sm tracking-wide transition-all group ${
              currentView === link.id 
                ? 'bg-gold-500 text-white shadow-xl scale-[1.02] translate-x-1' 
                : 'text-royal-100 hover:bg-white/5 hover:translate-x-1'
            }`}
          >
            <span className={`text-xl transition-transform group-hover:scale-110 ${currentView === link.id ? 'opacity-100' : 'opacity-60'}`}>{link.icon}</span>
            <span className="uppercase tracking-widest text-[11px]">{link.name}</span>
          </button>
        ))}
      </div>

      {/* Mobile Toggle & Drawer */}
      <div className="lg:hidden flex items-center">
        <button
          className="p-3 bg-white/10 rounded-xl text-royal-100 hover:text-white border border-white/20 flex items-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} /> : <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} />}
          </svg>
        </button>

        {isOpen && (
          <div className="fixed inset-0 bg-royal-950/80 backdrop-blur-md z-[60] flex flex-col p-8">
            <div className="flex justify-between items-center mb-12">
               <h2 className="text-xl font-serif font-black uppercase tracking-widest text-white">Truth Menu</h2>
               <button onClick={() => setIsOpen(false)} className="p-3 bg-white/10 rounded-full text-white">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2} /></svg>
               </button>
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto pb-12">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`flex items-center gap-6 p-6 rounded-2xl text-lg font-serif transition-all border-l-8 ${
                    currentView === link.id ? 'bg-gold-500 text-white border-white' : 'text-royal-100 border-transparent hover:bg-white/5'
                  }`}
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span className="uppercase tracking-widest text-sm font-black">{link.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavMenu;