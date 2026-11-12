export type CarparkAgency = 'HDB' | 'URA' | 'LTA' | 'Commercial';
export type CarparkType = 'Multi-Storey' | 'Basement' | 'Surface / Open Air' | 'Mechanised';
export type VehicleType = 'C' | 'Y' | 'H'; // C: Car, Y: Motorcycle, H: Heavy Vehicle
export type AvailabilityStatus = 'plenty' | 'moderate' | 'scarce' | 'full';

export interface LotTypeBreakdown {
  total: number;
  available: number;
}

export interface EVChargingInfo {
  hasEV: boolean;
  totalChargers: number;
  availableChargers: number;
  provider?: string;
  speed?: string; // e.g. '22kW AC' or '50kW DC Fast'
}

export interface ParkingRates {
  weekdayPeak: string;
  weekdayPeakHours: string;
  weekdayPeakRatePer30Min: number;
  weekdayOffPeak: string;
  weekdayOffPeakHours: string;
  weekdayOffPeakRatePer30Min: number;
  saturdayRate: string;
  sundayPHRate: string;
  gracePeriodMins: number;
  nightParkingMax?: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Carpark {
  id: string;
  carparkNo: string;
  name: string;
  agency: CarparkAgency;
  address: string;
  district: string;
  coordinates: Coordinates;
  totalLots: number;
  availableLots: number;
  status: AvailabilityStatus;
  occupancyPercent: number; // 0 to 100
  lotBreakdown: {
    cars: LotTypeBreakdown;
    motorcycles?: LotTypeBreakdown;
    heavy?: LotTypeBreakdown;
  };
  evCharging: EVChargingInfo;
  rates: ParkingRates;
  carparkType: CarparkType;
  paymentSystem: string;
  heightLimit: number; // in meters
  hasGracePeriod: boolean;
  freeParkingInfo?: string;
  historicalOccupancy: number[]; // 24 entries (0:00 to 23:00)
  lastUpdated: string;
  distanceKm?: number;
}

export interface CarparkFilter {
  searchQuery: string;
  district: string;
  agency: string;
  carparkType: string;
  minAvailableLots: number;
  hasEVOnly: boolean;
  shelteredOnly: boolean;
  maxRatePerHalfHour: number;
  vehicleType: VehicleType;
  minHeightLimit: number;
  sortBy: 'availableDesc' | 'rateAsc' | 'distanceAsc' | 'nameAsc';
}

export interface UserLocation {
  name: string;
  lat: number;
  lng: number;
  isCustom?: boolean;
}
