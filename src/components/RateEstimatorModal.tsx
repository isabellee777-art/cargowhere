import React, { useState } from 'react';
import { X, Calculator, Clock, Sparkles } from 'lucide-react';
import { Carpark } from '../types/carpark';
import { estimateParkingCost } from '../services/carparkService';

interface RateEstimatorModalProps {
  carpark: Carpark | null;
  allCarparks: Carpark[];
  onClose: () => void;
  onSelectCarpark: (carpark: Carpark) => void;
}

export const RateEstimatorModal: React.FC<RateEstimatorModalProps> = ({
  carpark,
  allCarparks,
  onClose,
  onSelectCarpark
}) => {
  const [selectedCarparkId, setSelectedCarparkId] = useState<string>(
    carpark ? carpark.id : allCarparks[0]?.id || ''
  );
  const [dayType, setDayType] = useState<'weekday' | 'saturday' | 'sunday'>('weekday');
  const [startHour, setStartHour] = useState<number>(12); // 12 PM
  const [durationHours, setDurationHours] = useState<number>(2); // 2 hours

  const currentCp = allCarparks.find((c) => c.id === selectedCarparkId) || carpark || allCarparks[0];

  if (!currentCp) return null;

  const result = estimateParkingCost(currentCp, dayType, startHour, durationHours);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Singapore Parking Fee Estimator</h2>
              <p className="text-xs text-slate-500">Calculate exact charges before parking</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Carpark Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Destination Carpark
            </label>
            <select
              value={selectedCarparkId}
              onChange={(e) => {
                setSelectedCarparkId(e.target.value);
                const found = allCarparks.find((c) => c.id === e.target.value);
                if (found) onSelectCarpark(found);
              }}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              {allCarparks.map((cp) => (
                <option key={cp.id} value={cp.id}>
                  {cp.name} ({cp.district} - {cp.agency})
                </option>
              ))}
            </select>
          </div>

          {/* Day of Week */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Day of Week</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDayType('weekday')}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  dayType === 'weekday'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Weekday (Mon-Fri)
              </button>
              <button
                type="button"
                onClick={() => setDayType('saturday')}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  dayType === 'saturday'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Saturday
              </button>
              <button
                type="button"
                onClick={() => setDayType('sunday')}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  dayType === 'sunday'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Sunday / PH
              </button>
            </div>
          </div>

          {/* Entry Time & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Entry Time (Hour)
              </label>
              <select
                value={startHour}
                onChange={(e) => setStartHour(parseInt(e.target.value, 10))}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <option key={i} value={i}>
                    {i === 0
                      ? '12:00 AM (Midnight)'
                      : i < 12
                      ? `${i}:00 AM`
                      : i === 12
                      ? '12:00 PM (Noon)'
                      : `${i - 12}:00 PM`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Estimated Parking Duration
              </label>
              <select
                value={durationHours}
                onChange={(e) => setDurationHours(parseFloat(e.target.value))}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value={0.15}>10 mins (Grace Period test)</option>
                <option value={0.5}>30 mins</option>
                <option value={1}>1.0 hour</option>
                <option value={1.5}>1.5 hours</option>
                <option value={2}>2.0 hours</option>
                <option value={3}>3.0 hours</option>
                <option value={4}>4.0 hours</option>
                <option value={6}>6.0 hours</option>
                <option value={8}>8.0 hours</option>
                <option value={12}>12 hours (Full Day)</option>
              </select>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-inner">
            <div className="text-xs text-slate-400 font-medium">Estimated Parking Total</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
                S${result.totalCost.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400">
                ({durationHours >= 1 ? `${durationHours} hrs` : `${Math.round(durationHours * 60)} mins`})
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 flex items-start gap-2">
              <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>{result.breakdownText}</span>
            </div>

            {currentCp.hasGracePeriod && (
              <div className="mt-2 text-[11px] text-slate-400">
                Grace period: {currentCp.rates.gracePeriodMins} minutes before entry charges apply.
              </div>
            )}
          </div>

          {currentCp.freeParkingInfo && (
            <div className="text-xs bg-emerald-50 text-emerald-800 p-3 rounded-lg border border-emerald-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{currentCp.freeParkingInfo}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
