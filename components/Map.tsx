
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Location } from '../types';
import { Info, List, X } from 'lucide-react';

// Fix for default marker icons
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  darkTheme: boolean;
}

const RecenterMap: React.FC<{ coords: [number, number] }> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(coords, 14, { duration: 1.5 });
  }, [coords, map]);
  return null;
};

const Map: React.FC<MapProps> = ({ locations, selectedLocation, onLocationSelect, darkTheme }) => {
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const defaultCenter: [number, number] = [41.3851, 2.1734];

  const standardUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const grayscaleUrl = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    <div className="flex-1 h-full w-full relative group">
      <MapContainer 
        center={defaultCenter} 
        zoom={13} 
        className="w-full h-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url={darkTheme ? grayscaleUrl : standardUrl}
        />
        
        {locations.map((loc) => (
          <Marker 
            key={loc.id} 
            position={[loc.lat, loc.lng]}
            eventHandlers={{
              click: () => onLocationSelect(loc)
            }}
          >
            <Popup>
              <div className="p-3 min-w-[180px]">
                <h4 className="font-black text-slate-900 mb-2 uppercase text-xs tracking-tight">{loc.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-black uppercase text-white tracking-widest px-2 py-1 bg-slate-900 rounded shadow-md">
                    {loc.category}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {selectedLocation && (
          <RecenterMap coords={[selectedLocation.lat, selectedLocation.lng]} />
        )}
      </MapContainer>

      {/* Legend Toggle Button */}
      <div className="absolute top-6 left-6 z-[999] flex flex-col gap-3 items-start">
        <button 
          onClick={() => setIsLegendOpen(!isLegendOpen)}
          className={`p-3 rounded-xl shadow-2xl transition-all duration-300 border flex items-center justify-center ${
            isLegendOpen 
              ? 'bg-slate-900 text-white border-slate-700' 
              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
          }`}
          title={isLegendOpen ? "Hide Legend" : "Show Legend"}
        >
          {isLegendOpen ? <X size={20} /> : <List size={20} />}
        </button>

        {/* Map Legend Overlay */}
        <div 
          className={`bg-white/95 backdrop-blur shadow-2xl border border-slate-200 rounded-xl p-5 w-64 transition-all duration-300 transform origin-top-left ${
            isLegendOpen 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-90 pointer-events-none translate-y-[-10px]'
          }`}
        >
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <Info size={14} style={{ color: '#00AEEF' }} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Geographic Legend</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full shadow-md ring-2 ring-slate-100" style={{ backgroundColor: '#00AEEF' }} />
              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Active Focal Point</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-slate-300 shadow-sm" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Neighboring Node</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-slate-50 border border-slate-200 rounded shadow-sm" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Boundary Reference</span>
            </div>
            <div className="pt-2">
              <div className="text-[8px] font-black uppercase text-slate-300 tracking-[0.1em]">Layer: {darkTheme ? 'Monochrome' : 'Standard'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
