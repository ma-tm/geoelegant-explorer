
import React from 'react';
import { Location } from '../types';
import LocationCard from './LocationCard';
import { Search, ChevronRight, ChevronLeft, Loader2, Sparkles, Filter } from 'lucide-react';

interface ResultsSidebarProps {
  locations: Location[];
  summary: string;
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  onSearch: (query: string) => void;
  isLoading: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const ResultsSidebar: React.FC<ResultsSidebarProps> = ({ 
  locations, 
  summary, 
  selectedLocation, 
  onLocationSelect, 
  isLoading,
  isCollapsed,
  onToggleCollapse
}) => {
  return (
    <aside 
      className={`relative h-full bg-slate-50 border-l border-slate-200 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col z-40 ${
        isCollapsed ? 'w-0 border-l-0' : 'w-[400px]'
      }`}
    >
      <button 
        onClick={onToggleCollapse}
        className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 rounded-lg p-2.5 shadow-2xl hover:brightness-110 z-50 text-white ${
          isCollapsed ? '-left-14 opacity-100 scale-110' : '-left-5'
        }`}
        style={{ backgroundColor: '#00AEEF' }}
      >
        {isCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <div className={`flex flex-col h-full overflow-hidden transition-opacity duration-300 ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="p-8 pb-6 bg-white border-b border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase">
              Results
              <span className="ml-3 text-[10px] font-bold text-white px-2 py-1 rounded tracking-widest shadow-sm" style={{ backgroundColor: '#00AEEF' }}>{locations.length}</span>
            </h2>
            <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 custom-scrollbar bg-slate-50/50">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-300">
              <Loader2 size={32} className="animate-spin mb-6" style={{ color: '#00AEEF' }} />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Synchronizing Data</p>
            </div>
          ) : (
            <>
              {summary && (
                <div className="mb-6 p-5 bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: '#00AEEF' }} />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: '#00AEEF' }}>Insight Summary</h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">"{summary}"</p>
                </div>
              )}
              
              <div className="space-y-4 pb-12">
                {locations.length > 0 ? (
                  locations.map((loc) => (
                    <LocationCard 
                      key={loc.id} 
                      location={loc} 
                      isSelected={selectedLocation?.id === loc.id}
                      onSelect={onLocationSelect}
                    />
                  ))
                ) : (
                  <div className="text-center py-20 opacity-20 flex flex-col items-center gap-4">
                    <Search size={40} className="text-slate-900" />
                    <p className="text-xs font-black uppercase tracking-widest text-slate-900">Search for locations</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="p-6 border-t border-slate-200 flex items-center justify-center bg-slate-100/50 backdrop-blur-sm">
          <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.4em] flex items-center gap-3">
            <Sparkles size={10} style={{ color: '#00AEEF' }} />
            Core Engine v2.5
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ResultsSidebar;
