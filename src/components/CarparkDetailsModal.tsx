import React from 'react';
import {
  X,
  Navigation,
  Copy,
  Check,
  Zap,
  Clock,
  ShieldAlert,
  Car,
  Bookmark,
  Sparkles,
  Calculator
} from 'lucide-react';
import { Carpark } from '../types/carpark';

interface CarparkDetailsModalProps {
  carpark: Carpark | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (carparkId: string) => void;
  onOpenEstimator: (carpark: Carpark) => void;
}

export const CarparkDetailsModal: React.FC<CarparkDetailsModalProps> = ({
  carpark,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenEstimator
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!carpark) return null;

  const currentHour = new Date().getHours();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${carpark.name}, ${carpark.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openGoogleMapsDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${carpark.coordinates.lat},${carpark.coordinates.lng}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Status visual colors
  let statusBadgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  let statusText = 'Plenty of Lots Available';
  if (carpark.status === 'moderate') {
    statusBadgeBg = 'bg-amber-50 text-amber-800 border-amber-200';
    statusText = 'Moderate Availability';
  } else if (carpark.status === 'scarce') {
    statusBadgeBg = 'bg-rose-50 text-rose-800 border-rose-200';
    statusText = 'Filling Fast (Scarce)';
  } else if (carpark.status === 'full') {
    statusBadgeBg = 'bg-slate-100 text-slate-800 border-slate-300';
    statusText = 'Carpark Full';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold">
              <span className="text-slate-500">{carpark.agency} Carpark</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 font-mono">{carpark.carparkNo}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500">{carpark.district}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">{carpark.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{carpark.address}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(carpark.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isFavorite
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Availability KPI Banner */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <div className="text-xs font-medium text-slate-500">Live Available Lots</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight">
                    {carpark.availableLots}
                  </span>
                  <span className="text-sm font-semibold text-slate-500 font-mono">
                    / {carpark.totalLots} total lots
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusBadgeBg}`}>
                  {statusText}
                </span>
                <span className="text-xs font-mono font-medium text-slate-500 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg">
                  {carpark.occupancyPercent}% Occupied
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  carpark.occupancyPercent > 90
                    ? 'bg-rose-600'
                    : carpark.occupancyPercent > 70
                    ? 'bg-amber-500'
                    : 'bg-emerald-600'
                }`}
                style={{ width: `${carpark.occupancyPercent}%` }}
              ></div>
            </div>

            {/* Breakdown by vehicle type */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-200/60 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200/70">
                <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
                  <Car className="w-3.5 h-3.5 text-slate-600" />
                  <span>Car Lots</span>
                </div>
                <div className="font-mono font-semibold text-slate-900 text-sm">
                  {carpark.lotBreakdown.cars.available} <span className="text-slate-400 font-normal">/ {carpark.lotBreakdown.cars.total}</span>
                </div>
              </div>

              {carpark.lotBreakdown.motorcycles && (
                <div className="bg-white p-2.5 rounded-lg border border-slate-200/70">
                  <div className="text-slate-500 mb-0.5">Motorcycle Lots</div>
                  <div className="font-mono font-semibold text-slate-900 text-sm">
                    {carpark.lotBreakdown.motorcycles.available} <span className="text-slate-400 font-normal">/ {carpark.lotBreakdown.motorcycles.total}</span>
                  </div>
                </div>
              )}

              <div className="bg-white p-2.5 rounded-lg border border-slate-200/70">
                <div className="flex items-center gap-1 text-slate-500 mb-0.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>EV Bays</span>
                </div>
                <div className="font-mono font-semibold text-slate-900 text-sm">
                  {carpark.evCharging.hasEV ? (
                    `${carpark.evCharging.availableChargers} / ${carpark.evCharging.totalChargers} free`
                  ) : (
                    <span className="text-slate-400 font-normal">None</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Key Attributes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
              <div className="text-[11px] text-slate-500 font-medium">Clearance Height</div>
              <div className="text-sm font-bold font-mono text-slate-800 mt-1 flex items-center gap-1">
                {carpark.heightLimit}m
                {carpark.heightLimit <= 2.0 && (
                  <span title="Low clearance warning" className="text-amber-600">
                    <ShieldAlert className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
              <div className="text-[11px] text-slate-500 font-medium">Carpark Type</div>
              <div className="text-sm font-semibold text-slate-800 mt-1 truncate">
                {carpark.carparkType}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
              <div className="text-[11px] text-slate-500 font-medium">Grace Period</div>
              <div className="text-sm font-bold text-slate-800 mt-1 font-mono">
                {carpark.rates.gracePeriodMins} mins
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
              <div className="text-[11px] text-slate-500 font-medium">Payment Mode</div>
              <div className="text-sm font-semibold text-slate-800 mt-1 truncate">
                EPS (CashCard / NETS)
              </div>
            </div>
          </div>

          {/* Parking Rates Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-700" />
                Parking Rates & Charges
              </h3>
              <button
                onClick={() => onOpenEstimator(carpark)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors"
              >
                <Calculator className="w-3.5 h-3.5" />
                Calculate exact fee
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
              <div className="p-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="font-semibold text-slate-900">Weekday Day (Peak)</span>
                  <span className="text-slate-500 ml-2 font-mono">({carpark.rates.weekdayPeakHours})</span>
                </div>
                <div className="font-mono font-medium text-slate-700">
                  {carpark.rates.weekdayPeak}
                </div>
              </div>

              <div className="p-3 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="font-semibold text-slate-900">Weekday Evening / Night</span>
                  <span className="text-slate-500 ml-2 font-mono">({carpark.rates.weekdayOffPeakHours})</span>
                </div>
                <div className="font-mono font-medium text-slate-700">
                  {carpark.rates.weekdayOffPeak}
                </div>
              </div>

              <div className="p-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="font-semibold text-slate-900">Saturdays</span>
                </div>
                <div className="font-mono font-medium text-slate-700">
                  {carpark.rates.saturdayRate}
                </div>
              </div>

              <div className="p-3 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="font-semibold text-slate-900">Sundays & Public Holidays</span>
                </div>
                <div className="font-mono font-medium text-slate-700">
                  {carpark.rates.sundayPHRate}
                </div>
              </div>
            </div>

            {carpark.freeParkingInfo && (
              <div className="mt-2 text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded-lg border border-emerald-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{carpark.freeParkingInfo}</span>
              </div>
            )}
          </div>

          {/* 24-Hour Typical Occupancy Trend */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900">
                24-Hour Occupancy Pattern (Typical)
              </h3>
              <span className="text-xs text-slate-500">
                Current Hour: <strong className="font-mono text-slate-800">{currentHour}:00</strong>
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <div className="h-24 flex items-end gap-1 pt-4">
                {carpark.historicalOccupancy.map((val, idx) => {
                  const isNow = idx === currentHour;
                  let barColor = 'bg-emerald-500';
                  if (val > 85) barColor = 'bg-rose-500';
                  else if (val > 70) barColor = 'bg-amber-400';

                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center group relative h-full justify-end"
                    >
                      <div
                        className={`w-full rounded-t transition-all ${barColor} ${
                          isNow ? 'ring-2 ring-slate-900 ring-offset-1' : 'opacity-80 hover:opacity-100'
                        }`}
                        style={{ height: `${val}%` }}
                      ></div>
                      <span className="text-[9px] text-slate-400 font-mono mt-1 hidden sm:block">
                        {idx % 4 === 0 ? idx : ''}
                      </span>
                      {/* Tooltip on hover */}
                      <div className="absolute -top-7 bg-slate-900 text-white text-[10px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                        {idx}:00 — {val}%
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-200 mt-2">
                <span>12 AM (Midnight)</span>
                <span>6 AM</span>
                <span>12 PM (Noon)</span>
                <span>6 PM</span>
                <span>11 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action Strip */}
        <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleCopyAddress}
            className="w-full sm:w-auto px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Address Copied!' : 'Copy Address'}
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              onClick={() => onOpenEstimator(carpark)}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-slate-600" />
              Cost Calculator
            </button>
            <button
              onClick={openGoogleMapsDirections}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5" />
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
