import React, { useState, useEffect, useCallback } from 'react';
import {
  MapPin,
  Car,
  Zap,
  Clock,
  SlidersHorizontal,
  ChevronRight,
  TrendingDown,
  Info
} from 'lucide-react';
import { Carpark, CarparkFilter, Coordinates } from './types/carpark';
import { SINGAPORE_CARPARKS, DISTRICT_LIST } from './data/singaporeCarparks';
import { fetchLiveCarparks, LiveFeedMeta } from './services/carparkService';
import { Navbar, ActiveNavTab } from './components/Navbar';
import { CarparkMap } from './components/CarparkMap';
import { CarparkDetailsModal } from './components/CarparkDetailsModal';
import { CarparkDirectory } from './components/CarparkDirectory';
import { QuickFinder } from './components/QuickFinder';
import { RateEstimatorModal } from './components/RateEstimatorModal';
import { BackendIntegrationModal } from './components/BackendIntegrationModal';
import { FavoritesView } from './components/FavoritesView';

export default function App() {
  const [carparks, setCarparks] = useState<Carpark[]>(SINGAPORE_CARPARKS);
  const [selectedCarpark, setSelectedCarpark] = useState<Carpark | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('map');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [liveMeta, setLiveMeta] = useState<LiveFeedMeta | null>(null);
  const [backendGuideOpen, setBackendGuideOpen] = useState<boolean>(false);
  const [estimatorModalOpen, setEstimatorModalOpen] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  // Favorites stored in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('parksg_favorites');
      return saved ? JSON.parse(saved) : ['MBS', 'ION', 'HDB_TOA_PAYOH_HUB'];
    } catch {
      return ['MBS', 'ION', 'HDB_TOA_PAYOH_HUB'];
    }
  });

  // Filter state
  const [filter, setFilter] = useState<CarparkFilter>({
    searchQuery: '',
    district: 'All Singapore',
    agency: 'All',
    carparkType: 'All',
    minAvailableLots: 0,
    hasEVOnly: false,
    shelteredOnly: false,
    maxRatePerHalfHour: 10,
    vehicleType: 'C',
    minHeightLimit: 0,
    sortBy: 'availableDesc'
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('parksg_favorites', JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  };

  // Live Data Fetch Handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const { carparks: updatedCarparks, meta } = await fetchLiveCarparks();
      setCarparks(updatedCarparks);
      setLiveMeta(meta);

      // Keep selected carpark fresh if open
      if (selectedCarpark) {
        const refreshed = updatedCarparks.find((c) => c.id === selectedCarpark.id);
        if (refreshed) setSelectedCarpark(refreshed);
      }
    } catch (err) {
      console.error('Failed to sync live carparks:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, [selectedCarpark]);

  // Initial fetch and auto-refresh interval
  useEffect(() => {
    handleRefresh();
    const interval = setInterval(handleRefresh, 60000); // sync every 60s
    return () => clearInterval(interval);
  }, [handleRefresh]);

  // Aggregate stats
  const totalLotsAvailable = carparks.reduce((acc, c) => acc + c.availableLots, 0);
  const totalCapacity = carparks.reduce((acc, c) => acc + c.totalLots, 0);
  const overallOccupancy = Math.round(((totalCapacity - totalLotsAvailable) / totalCapacity) * 100);
  const totalEVChargers = carparks.reduce((acc, c) => acc + (c.evCharging.hasEV ? c.evCharging.availableChargers : 0), 0);

  // Filtered carparks for the map sidebar
  const mapSidebarCarparks = carparks.filter((cp) => {
    if (filter.district !== 'All Singapore' && !cp.district.includes(filter.district) && !filter.district.includes(cp.district)) {
      return false;
    }
    if (filter.searchQuery.trim()) {
      const q = filter.searchQuery.toLowerCase();
      return (
        cp.name.toLowerCase().includes(q) ||
        cp.address.toLowerCase().includes(q) ||
        cp.carparkNo.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        favoritesCount={favorites.length}
        liveMeta={liveMeta}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        onOpenBackendGuide={() => setBackendGuideOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Hero Context & Singapore Live Summary Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                <span>Republic of Singapore</span>
                <span>·</span>
                <span>Land Transport Authority & HDB Open Data</span>
                <span>·</span>
                <span className="font-mono text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
                  {liveMeta?.statusText || 'Connected (Live)'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Real-Time Carpark Availability & Rates
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Track live vacant lots, electronic parking rates, EV charging points, and clearance limits across Singapore commercial centres, HDB estates, and URA parking.
              </p>
            </div>

            {/* Quick Metrics KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 shrink-0">
              <div className="p-2">
                <div className="text-[11px] text-slate-500 font-medium">Available Lots</div>
                <div className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                  {totalLotsAvailable.toLocaleString()}
                </div>
              </div>

              <div className="p-2">
                <div className="text-[11px] text-slate-500 font-medium">Island Occupancy</div>
                <div className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                  {overallOccupancy}%
                </div>
              </div>

              <div className="p-2">
                <div className="text-[11px] text-slate-500 font-medium">EV Bays Free</div>
                <div className="text-xl font-bold font-mono text-emerald-600 tabular-nums flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  {totalEVChargers}
                </div>
              </div>

              <div className="p-2">
                <div className="text-[11px] text-slate-500 font-medium">Tracked Hubs</div>
                <div className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                  {carparks.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher Content */}
        {activeTab === 'map' && (
          <div className="space-y-4">
            {/* Quick District Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
                District:
              </span>
              {DISTRICT_LIST.map((dist) => (
                <button
                  key={dist}
                  onClick={() => setFilter({ ...filter, district: dist })}
                  className={`px-3 py-1.5 rounded-lg border font-medium transition-all whitespace-nowrap shrink-0 ${
                    filter.district === dist
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {dist}
                </button>
              ))}
            </div>

            {/* Split Screen: Map (65%) + Interactive Sidebar (35%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-[620px]">
              {/* Left / Bottom Panel: Scrollable Carpark Cards */}
              <div className="lg:col-span-5 flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-full">
                <div className="p-3.5 border-b border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-800">
                      {filter.district === 'All Singapore' ? 'All Locations' : filter.district}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px] ml-1.5">
                      ({mapSidebarCarparks.length} Carparks)
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab('directory')}
                    className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-0.5"
                  >
                    <span>Table View</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                  {mapSidebarCarparks.map((cp) => {
                    const isSelected = selectedCarpark?.id === cp.id;
                    let badgeBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                    if (cp.status === 'moderate') {
                      badgeBg = 'bg-amber-50 text-amber-700 border-amber-200';
                    } else if (cp.status === 'scarce') {
                      badgeBg = 'bg-rose-50 text-rose-700 border-rose-200';
                    } else if (cp.status === 'full') {
                      badgeBg = 'bg-slate-100 text-slate-700 border-slate-300';
                    }

                    return (
                      <div
                        key={cp.id}
                        onClick={() => setSelectedCarpark(cp)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/20'
                            : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200/90'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className={`text-[10px] font-mono mb-0.5 ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                              {cp.agency} · {cp.district}
                            </div>
                            <h3 className="font-bold text-xs sm:text-sm leading-tight">{cp.name}</h3>
                            <p className={`text-[11px] truncate max-w-[240px] mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                              {cp.address}
                            </p>
                          </div>

                          <div className="text-right shrink-0">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${badgeBg}`}>
                              {cp.availableLots} Lots
                            </span>
                            <div className={`text-[10px] font-mono mt-1 ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                              {cp.occupancyPercent}% full
                            </div>
                          </div>
                        </div>

                        <div className={`mt-2.5 pt-2 border-t flex items-center justify-between text-[11px] ${
                          isSelected ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-600'
                        }`}>
                          <div className="flex items-center gap-2">
                            <span>${cp.rates.weekdayPeakRatePer30Min.toFixed(2)}/30m</span>
                            <span>·</span>
                            <span>{cp.carparkType}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {cp.evCharging.hasEV && (
                              <span title="EV Charging Station" className="text-emerald-400">
                                <Zap className="w-3 h-3" />
                              </span>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCarpark(cp);
                              }}
                              className={`text-[10px] font-semibold underline underline-offset-2 ${
                                isSelected ? 'text-white' : 'text-slate-900'
                              }`}
                            >
                              Inspect Details
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Panel: Interactive Leaflet Map */}
              <div className="lg:col-span-7 h-full">
                <CarparkMap
                  carparks={carparks}
                  selectedCarpark={selectedCarpark}
                  onSelectCarpark={setSelectedCarpark}
                  userLocation={userLocation}
                  activeDistrict={filter.district}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'directory' && (
          <CarparkDirectory
            carparks={carparks}
            filter={filter}
            onFilterChange={setFilter}
            onSelectCarpark={setSelectedCarpark}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {activeTab === 'nearMe' && (
          <QuickFinder
            carparks={carparks}
            userLocation={userLocation}
            onSetUserLocation={(coords) => setUserLocation(coords)}
            onSelectCarpark={setSelectedCarpark}
          />
        )}

        {activeTab === 'estimator' && (
          <div className="max-w-2xl mx-auto">
            <RateEstimatorModal
              carpark={selectedCarpark || carparks[0]}
              allCarparks={carparks}
              onClose={() => setActiveTab('map')}
              onSelectCarpark={setSelectedCarpark}
            />
          </div>
        )}

        {activeTab === 'favorites' && (
          <FavoritesView
            favorites={favorites}
            carparks={carparks}
            onSelectCarpark={setSelectedCarpark}
            onRemoveFavorite={toggleFavorite}
            onBrowseAll={() => setActiveTab('directory')}
          />
        )}
      </main>

      {/* Carpark Detail Drawer / Modal */}
      {selectedCarpark && activeTab !== 'estimator' && (
        <CarparkDetailsModal
          carpark={selectedCarpark}
          onClose={() => setSelectedCarpark(null)}
          isFavorite={favorites.includes(selectedCarpark.id)}
          onToggleFavorite={toggleFavorite}
          onOpenEstimator={(cp) => {
            setSelectedCarpark(cp);
            setEstimatorModalOpen(true);
          }}
        />
      )}

      {/* Floating Cost Estimator Modal when opened from Detail Modal */}
      {estimatorModalOpen && selectedCarpark && (
        <RateEstimatorModal
          carpark={selectedCarpark}
          allCarparks={carparks}
          onClose={() => setEstimatorModalOpen(false)}
          onSelectCarpark={setSelectedCarpark}
        />
      )}

      {/* Backend Integration Guide Modal */}
      {backendGuideOpen && (
        <BackendIntegrationModal onClose={() => setBackendGuideOpen(false)} />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">ParkSG</span>
            <span>·</span>
            <span>Singapore Open Data Real-Time Carpark Tracker</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setBackendGuideOpen(true)}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Developer API Integration
            </button>
            <span className="text-slate-300">·</span>
            <span className="font-mono text-[11px]">
              Last sync: {liveMeta?.lastFetchedAt.toLocaleTimeString('en-SG') || 'Just now'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
