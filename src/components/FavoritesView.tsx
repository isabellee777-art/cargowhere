import React from 'react';
import { Bookmark, Navigation, Trash2, Zap, ArrowRight, Bell } from 'lucide-react';
import { Carpark } from '../types/carpark';

interface FavoritesViewProps {
  favorites: string[];
  carparks: Carpark[];
  onSelectCarpark: (carpark: Carpark) => void;
  onRemoveFavorite: (id: string) => void;
  onBrowseAll: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  carparks,
  onSelectCarpark,
  onRemoveFavorite,
  onBrowseAll
}) => {
  const favoriteCarparks = carparks.filter((cp) => favorites.includes(cp.id));

  if (favoriteCarparks.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto my-8">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <Bookmark className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">No Saved Carparks Yet</h3>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Bookmark your daily office, favourite shopping malls, or frequent residential carparks for quick 1-tap live lot tracking.
        </p>
        <button
          onClick={onBrowseAll}
          className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors inline-flex items-center gap-1.5"
        >
          <span>Browse All Carparks</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-rose-500 fill-current" />
            Saved Carparks Watchlist
          </h2>
          <p className="text-xs text-slate-500">Live lots for your bookmarked locations in Singapore</p>
        </div>
        <span className="text-xs font-mono font-semibold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
          {favoriteCarparks.length} Saved
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteCarparks.map((cp) => {
          let badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
          if (cp.status === 'moderate') {
            badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
          } else if (cp.status === 'scarce') {
            badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
          } else if (cp.status === 'full') {
            badgeColor = 'bg-slate-100 text-slate-700 border-slate-300';
          }

          const isLow = cp.availableLots < 30;

          return (
            <div
              key={cp.id}
              onClick={() => onSelectCarpark(cp)}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-400/80 transition-all cursor-pointer shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-slate-500">
                    {cp.district} · {cp.agency}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(cp.id);
                    }}
                    title="Remove from favorites"
                    className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="font-bold text-slate-900 text-sm group-hover:text-rose-600 transition-colors">
                  {cp.name}
                </h3>
                <p className="text-xs text-slate-500 truncate mt-0.5">{cp.address}</p>

                {/* Available lots highlight */}
                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Available Lots</div>
                    <div className="text-2xl font-black font-mono text-slate-900 tabular-nums">
                      {cp.availableLots}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border ${badgeColor}`}>
                      {cp.occupancyPercent}% Occupied
                    </span>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">
                      Total: {cp.totalLots}
                    </div>
                  </div>
                </div>

                {isLow && (
                  <div className="mt-2 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2 flex items-center gap-1.5">
                    <Bell className="w-3 h-3 text-amber-600 shrink-0" />
                    <span>Low lot warning: fewer than 30 lots remaining</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="text-slate-600">
                  <span className="font-medium">Rate: </span>
                  <span className="font-mono text-slate-900 font-semibold">${cp.rates.weekdayPeakRatePer30Min.toFixed(2)}</span> / 30m
                </div>

                <div className="flex items-center gap-2">
                  {cp.evCharging.hasEV && (
                    <span title="EV Charging Station" className="text-emerald-600">
                      <Zap className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const url = `https://www.google.com/maps/dir/?api=1&destination=${cp.coordinates.lat},${cp.coordinates.lng}`;
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                    title="Open Google Maps"
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
