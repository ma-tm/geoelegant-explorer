
import React, { useState } from 'react';
import { Compass, Bookmark, History, Settings, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';

const NavSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  
  const menuItems = [
    { icon: <Compass size={20} />, label: 'Discover', active: true },
    { icon: <Bookmark size={20} />, label: 'Favorites' },
    { icon: <History size={20} />, label: 'Activity' },
    { icon: <LayoutGrid size={20} />, label: 'Grid' },
    { icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <nav className={`bg-slate-50 border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out z-50 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex-1 py-6 flex flex-col gap-1">
        {menuItems.map((item, idx) => (
          <button 
            key={idx}
            className={`flex items-center gap-4 px-5 py-4 transition-all relative group ${
              item.active 
                ? 'text-slate-900 bg-white shadow-sm border-r-4' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
            style={item.active ? { borderRightColor: '#00AEEF' } : {}}
          >
            <div className="min-w-[24px] flex justify-center" style={item.active ? { color: '#00AEEF' } : {}}>
              {item.icon}
            </div>
            {!isCollapsed && <span className="text-sm font-bold uppercase tracking-tight">{item.label}</span>}
            
            {isCollapsed && (
              <span className="absolute left-full ml-4 px-2 py-1 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-[0.2em] z-50 shadow-xl" style={{ backgroundColor: '#00AEEF' }}>
                {item.label}
              </span>
            )}
          </button>
        ))}
      </div>

      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-5 border-t border-slate-200 text-slate-400 hover:text-slate-900 transition-colors flex items-center justify-center bg-slate-100/50"
      >
        {isCollapsed ? <ChevronRight size={18} /> : <div className="flex items-center gap-2"><ChevronLeft size={18} /><span className="text-[10px] font-black uppercase tracking-widest">Minimize</span></div>}
      </button>
    </nav>
  );
};

export default NavSidebar;
