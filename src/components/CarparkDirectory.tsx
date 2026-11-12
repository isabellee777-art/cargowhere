import React, { useState } from 'react';
import {
  Search,
  Filter,
  Zap,
  Bookmark,
  Navigation,
  ArrowUpDown,
  Car
} from 'lucide-react';
import { Carpark, CarparkFilter } from '../types/carpark';
import { DISTRICT_LIST } from '../data/singaporeCarparks';

interface CarparkDirectoryProps {
  carparks: Carpark[];
  filter: CarparkFilter;
  onFilterChange: (newFilter: CarparkFilter) => void;
  onSelectCarpark: (carpark: Carpark) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const CarparkDirectory: React.FC<CarparkDirectoryProps> = ({
  carparks,
  filter,
  onFilterChange,
  onSelectCarpark,
  favorites,
  onToggleFavorite
}) => {
  const [showFilters, setShowFilters] = useState(false);

  // Filter logic
  const filteredCarparks = carparks
    .filter((cp) => {
      // Query search
      if (filter.searchQuery.trim()) {
        const q = filter.searchQuery.toLowerCase();
        const matchesName = cp.name.toLowerCase().includes(q);
        const matchesAddress = cp.address.toLowerCase().includes(q);
        const matchesNo = cp.carparkNo.toLowerCase().includes(q);
        const matchesDistrict = cp.district.toLowerCase().includes(q);
        if (!matchesName && !matchesAddress && !matchesNo && !matchesDistrict) return false;
      }

      // District filter
      if (filter.district !== 'All Singapore' && !cp.district.includes(filter.district) && !filter.district.includes(cp.district)) {
        return false;
      }

      // Agency filter
      if (filter.agency !== 'All' && cp.agency !== filter.agency) {
        return false;
      }

      // EV Charging only
      if (filter.hasEVOnly && !cp.evCharging.hasEV) {
        return false;
      }

      // Sheltered only
      if (filter.shelteredOnly && cp.carparkType === 'Surface / Open Air') {
        return false;
      }

      // Clearance limit
      if (filter.minHeightLimit > 0 && cp.heightLimit < filter.minHeightLimit) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filter.sortBy === 'availableDesc') {
        return b.availableLots - a.availableLots;
      } else if (filter.sortBy === 'rateAsc') {
        return a.rates.weekdayPeakRatePer30Min - b.rates.weekdayPeakRatePer30Min;
      } else if (filter.sortBy === 'nameAsc') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <div className="space-y-4">
      {/* Top Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filter.searchQuery}
              onChange={(e) => onFilterChange({ ...filter, searchQuery: e.target.value })}
              placeholder="Search by carpark name, road, HDB block, or district..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-800"
            />
          </div>

          {/* Quick Agency Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0 overflow-x-auto text-xs font-medium">
            {['All', 'Commercial', 'HDB', 'URA'].map((ag) => (
              <button
                key={ag}
                onClick={() => onFilterChange({ ...filter, agency: ag })}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  filter.agency === ag
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {ag}
              </button>
            ))}
          </div>

          {/* Toggle More Filters */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3.5 py-2.5 text-xs font-semibold rounded-xl border flex items-center justify-center gap-1.5 transition-colors ${
              showFilters || filter.hasEVOnly || filter.shelteredOnly || filter.minHeightLimit > 0
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Collapsible Advanced Filters */}
        {showFilters && (
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs animate-in fade-in duration-150">
            {/* District select */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">District</label>
              <select
                value={filter.district}
                onChange={(e) => onFilterChange({ ...filter, district: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
              >
                {DISTRICT_LIST.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort by */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Sort Order</label>
              <select
                value={filter.sortBy}
                onChange={(e) =>
                  onFilterChange({
                    ...filter,
                    sortBy: e.target.value as CarparkFilter['sortBy']
                  })
                }
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
              >
                <option value="availableDesc">Available Lots (Highest first)</option>
                <option value="rateAsc">Day Rate (Lowest first)</option>
                <option value="nameAsc">Name (A to Z)</option>
              </select>
            </div>

            {/* Minimum Height */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Clearance Limit</label>
              <select
                value={filter.minHeightLimit}
                onChange={(e) =>
                  onFilterChange({ ...filter, minHeightLimit: parseFloat(e.target.value) })
                }
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
              >
                <option value={0}>Any Height</option>
                <option value={2.0}>Min 2.0m</option>
                <option value={2.1}>Min 2.1m (High Van / MPV)</option>
              </select>
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-3 pt-4">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={filter.hasEVOnly}
                  onChange={(e) => onFilterChange({ ...filter, hasEVOnly: e.target.checked })}
                  className="rounded text-slate-900 focus:ring-slate-900"
                />
                <span>EV Charging</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={filter.shelteredOnly}
                  onChange={(e) => onFilterChange({ ...filter, shelteredOnly: e.target.checked })}
                  className="rounded text-slate-900 focus:ring-slate-900"
                />
                <span>Sheltered</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="font-semibold text-slate-800">{filteredCarparks.length}</strong> carparks
          {filter.district !== 'All Singapore' && ` in ${filter.district}`}
        </span>
        <span className="font-mono text-[11px]">Updated in real-time</span>
      </div>

      {/* High-density Data Table / Card Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Carpark & Location</th>
                <th className="py-3 px-4">Agency</th>
                <th className="py-3 px-4">Available Lots</th>
                <th className="py-3 px-4">Occupancy</th>
                <th className="py-3 px-4">Peak Rate (30m)</th>
                <th className="py-3 px-4">Features</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCarparks.map((cp) => {
                const isFav = favorites.includes(cp.id);

                let statusBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                if (cp.status === 'moderate') {
                  statusBadge = 'bg-amber-50 text-amber-700 border-amber-200';
                } else if (cp.status === 'scarce') {
                  statusBadge = 'bg-rose-50 text-rose-700 border-rose-200';
                } else if (cp.status === 'full') {
                  statusBadge = 'bg-slate-100 text-slate-700 border-slate-300';
                }

                return (
                  <tr
                    key={cp.id}
                    onClick={() => onSelectCarpark(cp)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                  >
                    {/* Carpark Name & Address */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(cp.id);
                          }}
                          className={`p-1 rounded hover:bg-slate-200/60 transition-colors ${
                            isFav ? 'text-rose-600' : 'text-slate-300 group-hover:text-slate-400'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                        </button>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                            {cp.name}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate max-w-xs">
                            {cp.address}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Agency */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-slate-600 font-medium bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {cp.agency}
                      </span>
                    </td>

                    {/* Available Lots */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-mono font-bold text-sm text-slate-900 tabular-nums">
                          {cp.availableLots}
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">
                          / {cp.totalLots}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Car className="w-3 h-3 text-slate-400" />
                        <span>{cp.lotBreakdown.cars.available} car lots</span>
                      </div>
                    </td>

                    {/* Occupancy Indicator */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              cp.occupancyPercent > 90
                                ? 'bg-rose-500'
                                : cp.occupancyPercent > 70
                                ? 'bg-amber-400'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${cp.occupancyPercent}%` }}
                          ></div>
                        </div>
                        <span className="font-mono text-slate-600 text-[11px] tabular-nums">
                          {cp.occupancyPercent}%
                        </span>
                      </div>
                      <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border ${statusBadge}`}>
                        {cp.status === 'plenty'
                          ? 'Plenty'
                          : cp.status === 'moderate'
                          ? 'Moderate'
                          : cp.status === 'scarce'
                          ? 'Scarce'
                          : 'Full'}
                      </span>
                    </td>

                    {/* Peak Rate */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-slate-800">
                        ${cp.rates.weekdayPeakRatePer30Min.toFixed(2)}
                      </span>
                      <div className="text-[10px] text-slate-500">
                        Grace {cp.rates.gracePeriodMins}m
                      </div>
                    </td>

                    {/* Features */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        {cp.evCharging.hasEV && (
                          <span
                            title={`EV Charging (${cp.evCharging.availableChargers}/${cp.evCharging.totalChargers} free)`}
                            className="p-1 rounded bg-emerald-50 text-emerald-700"
                          >
                            <Zap className="w-3.5 h-3.5" />
                          </span>
                        )}
                        <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {cp.heightLimit}m
                        </span>
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded truncate max-w-[80px]">
                          {cp.carparkType}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            const url = `https://www.google.com/maps/dir/?api=1&destination=${cp.coordinates.lat},${cp.coordinates.lng}`;
                            window.open(url, '_blank', 'noopener,noreferrer');
                          }}
                          title="Open Google Maps"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onSelectCarpark(cp)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-[11px] transition-colors"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
