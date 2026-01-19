
import React, { useState } from 'react';
import { Search, Map as MapIcon, Home, Layers, Bell, User, PanelRight } from 'lucide-react';

interface TopNavbarProps {
  onSearch: (query: string) => void;
  onGoHome: () => void;
  onToggleLayer: () => void;
  onToggleResults: () => void;
  isResultsOpen: boolean;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ 
  onSearch, 
  onGoHome, 
  onToggleLayer, 
  onToggleResults,
  isResultsOpen 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <header className="h-16 bg-slate-900 text-white flex items-center justify-between px-6 z-[1001] shadow-2xl border-b border-slate-800">
      <div className="flex items-center gap-3 w-64">
        <div className="p-1.5 bg-slate-800 rounded-lg shadow-inner">
          <MapIcon size={20} style={{ color: '#00AEEF' }} />
        </div>
        <h1 className="font-bold tracking-tighter text-lg hidden md:block uppercase italic">
          Geo<span style={{ color: '#00AEEF' }}>Core</span>
        </h1>
      </div>

      <div className="flex-1 max-w-2xl px-4">
        <form onSubmit={handleSubmit} className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Explore the world..."
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-[#00AEEF] focus:bg-slate-800 transition-all outline-none"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00AEEF] transition-colors" size={16} />
        </form>
      </div>

      <div className="flex items-center gap-2 w-64 justify-end">
        <button 
          onClick={onToggleResults} 
          className={`p-2 rounded-lg transition-all ${isResultsOpen ? 'bg-[#00AEEF] text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          title="Toggle Results"
        >
          <PanelRight size={20} />
        </button>
        <button onClick={onGoHome} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white" title="Home">
          <Home size={20} />
        </button>
        <button onClick={onToggleLayer} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white" title="Map Layers">
          <Layers size={20} />
        </button>
        <div className="h-6 w-px bg-slate-800 mx-2" />
        <button className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all shadow-sm">
          <User size={18} />
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
