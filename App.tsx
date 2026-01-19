
import React, { useState, useCallback, useEffect } from 'react';
import NavSidebar from './components/NavSidebar';
import ResultsSidebar from './components/ResultsSidebar';
import TopNavbar from './components/TopNavbar';
import Map from './components/Map';
import { Location, SearchResult } from './types';
import { searchLocations } from './services/geminiService';

const App: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [summary, setSummary] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isResultsCollapsed, setIsResultsCollapsed] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    setIsResultsCollapsed(false);
    setError(null);
    try {
      const result: SearchResult = await searchLocations(query);
      setLocations(result.locations);
      setSummary(result.summary);
      if (result.locations.length > 0) {
        setSelectedLocation(result.locations[0]);
      }
    } catch (err) {
      console.error(err);
      setError("Network intelligence currently unavailable.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGoHome = () => {
    handleSearch("Barcelona gothic quarter");
  };

  const handleToggleLayer = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleToggleResults = () => {
    setIsResultsCollapsed(!isResultsCollapsed);
  };

  const handleLocationSelect = useCallback((location: Location) => {
    setSelectedLocation(location);
  }, []);

  useEffect(() => {
    handleSearch("Barcelona gothic quarter");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-100 font-sans text-slate-900 overflow-hidden">
      <TopNavbar 
        onSearch={handleSearch} 
        onGoHome={handleGoHome}
        onToggleLayer={handleToggleLayer}
        onToggleResults={handleToggleResults}
        isResultsOpen={!isResultsCollapsed}
      />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        <NavSidebar />

        <main className="flex-1 relative flex flex-col min-w-0 bg-slate-200">
          {error && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[2000] bg-slate-900 text-white px-8 py-4 rounded-lg shadow-2xl border border-slate-700 font-black text-[10px] uppercase tracking-widest flex items-center gap-4 animate-in fade-in zoom-in duration-300">
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
              {error}
            </div>
          )}
          
          <Map 
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
            darkTheme={isDarkTheme}
          />
        </main>

        <ResultsSidebar 
          locations={locations}
          summary={summary}
          selectedLocation={selectedLocation}
          onLocationSelect={handleLocationSelect}
          onSearch={handleSearch}
          isLoading={isLoading}
          isCollapsed={isResultsCollapsed}
          onToggleCollapse={handleToggleResults}
        />
      </div>
    </div>
  );
};

export default App;
