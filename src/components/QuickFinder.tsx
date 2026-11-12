import React, { useState } from 'react';
import { MapPin, Navigation, Compass, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { Carpark, Coordinates } from '../types/carpark';
import { POPULAR_LOCATIONS } from '../data/singaporeCarparks';
import { calculateDistanceKm } from '../services/carparkService';

interface QuickFinderProps {
  carparks: Carpark[];
  userLocation: Coordinates | null;
  onSetUserLocation: (coords: Coordinates, name: string) => void;
  onSelectCarpark: (carpark: Carpark) => void;
}

export const QuickFinder: React.FC<QuickFinderProps> = ({
  carparks,
  userLocation,
  onSetUserLocation,
  onSelectCarpark
}) => {
  const [selectedHubIndex, setSelectedHubIndex] = useState<number>(0);
  const [detectingGps, setDetectingGps] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  const activeOrigin: Coordinates = userLocation || {
    lat: POPULAR_LOCATIONS[selectedHubIndex].lat,
    lng: POPULAR_LOCATIONS[selectedHubIndex].lng
  };

  const handleDetectGps = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }

    setDetectingGps(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setDetectingGps(false);
        onSetUserLocation(
          { lat: pos.coords.latitude, lng: pos.coords.longitude },
          'Your Current Location'
        );
      },
      () => {
        setDetectingGps(false);
        setGpsError('Unable to retrieve location. Defaulting to Orchard Road.');
        onSetUserLocation(
          { lat: POPULAR_LOCATIONS[0].lat, lng: POPULAR_LOCATIONS[0].lng },
          POPULAR_LOCATIONS[0].name
        );
      },
      { timeout: 7000 }
    );
  };

  // Sort carparks by distance from active origin
  const nearbyCarparks = [...carparks]
    .map((cp) => {
      const dist = calculateDistanceKm(activeOrigin, cp.coordinates);
      return {
        ...cp,
        distanceKm: dist
      };
    })
    .sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));

  return (
    <div className="space-y-6">
      {/* Origin Selection Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-slate-700" />
              Nearest Carpark Finder
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Find the closest available parking lots from your destination or live GPS
            </p>
          </div>

          <button
            onClick={handleDetectGps}
            disabled={detectingGps}
            className="px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors shrink-0"
          >
            <Navigation className={`w-3.5 h-3.5 ${detectingGps ? 'animate-spin' : ''}`} />
            {detectingGps ? 'Detecting GPS...' : 'Use My Live GPS'}
          </button>
        </div>

        {gpsError && (
          <div className="mt-3 text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
            {gpsError}
          </div>
        )}

        {/* Quick Hub Buttons */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="text-xs font-semibold text-slate-600 mb-2">
            Or select popular destination in Singapore:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_LOCATIONS.map((loc, idx) => (
              <button
                key={loc.name}
                onClick={() => {
                  setSelectedHubIndex(idx);
                  onSetUserLocation({ lat: loc.lat, lng: loc.lng }, loc.name);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  userLocation?.lat === loc.lat && userLocation?.lng === loc.lng
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Nearby Results List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing closest carparks from current origin</span>
          <span className="font-mono">{nearbyCarparks.length} Carparks</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {nearbyCarparks.slice(0, 9).map((cp, idx) => {
            const dist = cp.distanceKm || 0;
            const walkMins = Math.round((dist * 1000) / 80); // ~80m per min
            const driveMins = Math.max(1, Math.round((dist / 30) * 60)); // ~30km/h city

            let statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
            if (cp.status === 'moderate') {
              statusColor = 'text-amber-700 bg-amber-50 border-amber-200';
            } else if (cp.status === 'scarce') {
              statusColor = 'text-rose-700 bg-rose-50 border-rose-200';
            } else if (cp.status === 'full') {
              statusColor = 'text-slate-700 bg-slate-100 border-slate-300';
            }

            return (
              <div
                key={cp.id}
                onClick={() => onSelectCarpark(cp)}
                className="bg-white border border-slate-200 hover:border-slate-400/80 rounded-xl p-4 shadow-sm hover:shadow transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
                    <span className="font-semibold text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      #{idx + 1} · {dist} km away
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${statusColor}`}>
                      {cp.availableLots} Lots Free
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-rose-600 transition-colors">
                    {cp.name}
                  </h3>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{cp.address}</p>

                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-600 font-mono">
                    <span>🚗 ~{driveMins} min drive</span>
                    <span>·</span>
                    <span>🚶 ~{walkMins} min walk</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-slate-600">
                    <span className="font-medium">Rate: </span>
                    <span className="font-mono text-slate-900 font-semibold">${cp.rates.weekdayPeakRatePer30Min.toFixed(2)}</span> / 30m
                  </div>

                  <div className="flex items-center gap-1.5">
                    {cp.evCharging.hasEV && (
                      <span title="EV Charging Station" className="text-emerald-600">
                        <Zap className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {cp.freeParkingInfo && (
                      <span title="Free parking scheme available" className="text-amber-500">
                        <Sparkles className="w-3.5 h-3.5" />
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
