import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Carpark, Coordinates } from '../types/carpark';

interface CarparkMapProps {
  carparks: Carpark[];
  selectedCarpark: Carpark | null;
  onSelectCarpark: (carpark: Carpark) => void;
  userLocation: Coordinates | null;
  activeDistrict: string;
}

export const CarparkMap: React.FC<CarparkMapProps> = ({
  carparks,
  selectedCarpark,
  onSelectCarpark,
  userLocation,
  activeDistrict
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [1.325, 103.84],
        zoom: 12,
        zoomControl: false,
        attributionControl: true
      });

      // CartoDB Positron clean map tiles (high legibility for dashboard maps)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Add Zoom Control to bottom-right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      // Map cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    carparks.forEach((cp) => {
      const isSelected = selectedCarpark?.id === cp.id;

      // Status styling colors
      let bgClass = 'bg-emerald-600';
      let borderClass = 'border-emerald-700';
      if (cp.status === 'moderate') {
        bgClass = 'bg-amber-500';
        borderClass = 'border-amber-600';
      } else if (cp.status === 'scarce') {
        bgClass = 'bg-rose-600';
        borderClass = 'border-rose-700';
      } else if (cp.status === 'full') {
        bgClass = 'bg-slate-700';
        borderClass = 'border-slate-800';
      }

      const isEv = cp.evCharging.hasEV;

      // Custom HTML Marker Icon
      const customIcon = L.divIcon({
        className: 'custom-carpark-pin',
        html: `
          <div class="relative cursor-pointer group transform transition-all duration-150 ${isSelected ? 'scale-125 z-50' : 'hover:scale-110 z-20'}">
            <div class="${bgClass} text-white font-mono font-bold text-xs px-2 py-1 rounded-md shadow-md border ${borderClass} flex items-center gap-1 whitespace-nowrap">
              <span>${cp.availableLots}</span>
              ${isEv ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-200"></span>' : ''}
            </div>
            <div class="w-2 h-2 ${bgClass} rotate-45 mx-auto -mt-1 shadow-sm"></div>
          </div>
        `,
        iconSize: [40, 28],
        iconAnchor: [20, 28],
        popupAnchor: [0, -28]
      });

      const marker = L.marker([cp.coordinates.lat, cp.coordinates.lng], { icon: customIcon });

      marker.on('click', () => {
        onSelectCarpark(cp);
      });

      marker.addTo(map);
      markersRef.current[cp.id] = marker;
    });
  }, [carparks, selectedCarpark, onSelectCarpark]);

  // Pan to selected carpark
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedCarpark) return;

    map.flyTo([selectedCarpark.coordinates.lat, selectedCarpark.coordinates.lng], 15, {
      duration: 0.8
    });
  }, [selectedCarpark]);

  // Handle User Location marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'user-location-marker',
        html: `
          <div class="relative flex items-center justify-center">
            <div class="w-6 h-6 rounded-full bg-blue-500/30 animate-ping absolute"></div>
            <div class="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-lg relative z-10"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
        zIndexOffset: 1000
      }).addTo(map);

      userMarkerRef.current = marker;
    }
  }, [userLocation]);

  // Fit bounds when active district changes (if not 'All Singapore')
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || activeDistrict === 'All Singapore') return;

    const districtCarparks = carparks.filter((cp) => cp.district.includes(activeDistrict) || activeDistrict.includes(cp.district));
    if (districtCarparks.length > 0) {
      const bounds = L.latLngBounds(districtCarparks.map((cp) => [cp.coordinates.lat, cp.coordinates.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [activeDistrict, carparks]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Map Legend */}
      <div className="absolute top-3 left-3 z-[400] bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-lg shadow-sm px-3 py-2 text-xs text-slate-600">
        <div className="font-semibold text-slate-800 text-[11px] mb-1.5 uppercase tracking-wide">Lots Availability</div>
        <div className="flex flex-col gap-1 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-emerald-600 inline-block"></span>
            <span>Plenty (&gt;25% lots vacant)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block"></span>
            <span>Moderate (10% - 25% lots)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-rose-600 inline-block"></span>
            <span>Scarce (&lt;10% lots)</span>
          </div>
        </div>
      </div>

      {/* Quick Singapore District Jump Pills */}
      <div className="absolute bottom-3 left-3 z-[400] hidden sm:flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-lg p-1.5 shadow-sm text-xs">
        <span className="text-[11px] font-semibold text-slate-500 px-1">Jump to:</span>
        <button
          onClick={() => mapInstanceRef.current?.flyTo([1.2834, 103.855], 14)}
          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium transition-colors"
        >
          CBD / Marina
        </button>
        <button
          onClick={() => mapInstanceRef.current?.flyTo([1.303, 103.834], 15)}
          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium transition-colors"
        >
          Orchard Rd
        </button>
        <button
          onClick={() => mapInstanceRef.current?.flyTo([1.336, 103.738], 14)}
          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium transition-colors"
        >
          Jurong West
        </button>
        <button
          onClick={() => mapInstanceRef.current?.flyTo([1.360, 103.989], 14)}
          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium transition-colors"
        >
          Changi
        </button>
      </div>
    </div>
  );
};
