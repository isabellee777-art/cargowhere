import React from 'react';
import { RefreshCw, Code2 } from 'lucide-react';
import { LiveFeedMeta } from '../services/carparkService';

export type ActiveNavTab = 'map' | 'directory' | 'nearMe' | 'favorites' | 'estimator';

interface NavbarProps {
  activeTab: ActiveNavTab;
  onTabChange: (tab: ActiveNavTab) => void;
  favoritesCount: number;
  liveMeta: LiveFeedMeta | null;
  isRefreshing: boolean;
  onRefresh: () => void;
  onOpenBackendGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  favoritesCount,
  liveMeta,
  isRefreshing,
  onRefresh,
  onOpenBackendGuide
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onTabChange('map')}
            className="text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-sm font-mono font-bold">
              P
            </span>
            <span>ParkSG</span>
          </button>
        </div>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <button
            onClick={() => onTabChange('map')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'map'
                ? 'text-slate-900 border-b-2 border-slate-900 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Live Map
          </button>
          <button
            onClick={() => onTabChange('directory')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'directory'
                ? 'text-slate-900 border-b-2 border-slate-900 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Carpark Directory
          </button>
          <button
            onClick={() => onTabChange('nearMe')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'nearMe'
                ? 'text-slate-900 border-b-2 border-slate-900 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Near Me
          </button>
          <button
            onClick={() => onTabChange('estimator')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'estimator'
                ? 'text-slate-900 border-b-2 border-slate-900 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Rate Estimator
          </button>
          <button
            onClick={() => onTabChange('favorites')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'text-slate-900 border-b-2 border-slate-900 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            <span>Saved Lots</span>
            {favoritesCount > 0 && (
              <span className="font-mono text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded-full">
                {favoritesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action (+ Developer backend trigger) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenBackendGuide}
            title="Backend Integration Guide & Schema"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Backend API</span>
          </button>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Refresh Live Lots'}</span>
          </button>
        </div>
      </div>

      {/* Mobile nav strip */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 bg-slate-50 px-2 py-2 text-[11px] font-semibold text-slate-600">
        <button
          onClick={() => onTabChange('map')}
          className={`px-2 py-1 rounded ${activeTab === 'map' ? 'bg-white text-slate-900 shadow-sm font-bold' : ''}`}
        >
          Map
        </button>
        <button
          onClick={() => onTabChange('directory')}
          className={`px-2 py-1 rounded ${activeTab === 'directory' ? 'bg-white text-slate-900 shadow-sm font-bold' : ''}`}
        >
          Directory
        </button>
        <button
          onClick={() => onTabChange('nearMe')}
          className={`px-2 py-1 rounded ${activeTab === 'nearMe' ? 'bg-white text-slate-900 shadow-sm font-bold' : ''}`}
        >
          Near Me
        </button>
        <button
          onClick={() => onTabChange('estimator')}
          className={`px-2 py-1 rounded ${activeTab === 'estimator' ? 'bg-white text-slate-900 shadow-sm font-bold' : ''}`}
        >
          Rates
        </button>
        <button
          onClick={() => onTabChange('favorites')}
          className={`px-2 py-1 rounded ${activeTab === 'favorites' ? 'bg-white text-slate-900 shadow-sm font-bold' : ''}`}
        >
          Saved ({favoritesCount})
        </button>
      </div>
    </header>
  );
};
