
import React from 'react';
import { Location } from '../types';
import { MapPin, Star, ArrowRight } from 'lucide-react';

interface LocationCardProps {
  location: Location;
  isSelected: boolean;
  onSelect: (location: Location) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, isSelected, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(location)}
      className={`group relative p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
        isSelected 
          ? 'bg-white shadow-2xl ring-1 scale-[1.01] z-10' 
          : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-xl'
      }`}
      style={isSelected ? { borderColor: '#00AEEF', ringColor: '#00AEEF' } : {}}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded text-white shadow-sm" style={{ backgroundColor: '#00AEEF' }}>
          {location.category}
        </span>
        {location.rating && (
          <div className="flex items-center text-[10px] text-slate-400 font-black group-hover:text-slate-900 transition-colors">
            <Star size={12} className={`fill-current mr-1 transition-colors`} style={{ color: isSelected ? '#00AEEF' : '#e2e8f0' }} />
            {location.rating}
          </div>
        )}
      </div>
      
      <h3 className="text-slate-900 font-black text-base mb-1 tracking-tight uppercase group-hover:text-slate-700 transition-colors">
        {location.name}
      </h3>
      
      <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-2 font-medium">
        {location.description}
      </p>

      <div className="flex items-center text-slate-400 text-[9px] font-black uppercase tracking-[0.15em] gap-2 pt-4 border-t border-slate-50">
        <div className="flex items-center gap-1.5 truncate max-w-[180px]">
          <MapPin size={10} className="group-hover:text-slate-500 transition-colors" style={{ color: isSelected ? '#00AEEF' : '#cbd5e1' }} />
          <span className="truncate group-hover:text-slate-600 transition-colors">{location.address || 'Verified Destination'}</span>
        </div>
        <div className={`ml-auto transition-all duration-300 flex items-center gap-1 font-black ${isSelected ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} style={{ color: '#00AEEF' }}>
          View Details <ArrowRight size={10} />
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
