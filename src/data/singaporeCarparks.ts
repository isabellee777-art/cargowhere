import { Carpark } from '../types/carpark';

export const SINGAPORE_CARPARKS: Carpark[] = [
  // --- MARINA BAY & CBD ---
  {
    id: 'MBS',
    carparkNo: 'MBS01',
    name: 'Marina Bay Sands',
    agency: 'Commercial',
    address: '10 Bayfront Ave, Singapore 018956',
    district: 'Marina Bay / CBD',
    coordinates: { lat: 1.2834, lng: 103.8607 },
    totalLots: 1250,
    availableLots: 312,
    status: 'moderate',
    occupancyPercent: 75,
    lotBreakdown: {
      cars: { total: 1100, available: 268 },
      motorcycles: { total: 150, available: 44 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 16,
      availableChargers: 5,
      provider: 'SP Mobility',
      speed: '50kW DC / 22kW AC'
    },
    rates: {
      weekdayPeak: '$3.50 for 1st hr, $1.80/30m subsequent',
      weekdayPeakHours: '07:00 - 19:00',
      weekdayPeakRatePer30Min: 1.80,
      weekdayOffPeak: '$1.50 / 30 mins',
      weekdayOffPeakHours: '19:00 - 07:00',
      weekdayOffPeakRatePer30Min: 1.50,
      saturdayRate: '$3.50 for 1st hr, $1.80/30m (Capped at $28.00/day)',
      sundayPHRate: '$3.50 for 1st hr, $1.80/30m (Capped at $28.00/day)',
      gracePeriodMins: 10,
      nightParkingMax: 18.00
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.0,
    hasGracePeriod: true,
    historicalOccupancy: [20, 15, 12, 10, 12, 22, 45, 68, 78, 85, 88, 92, 90, 86, 82, 80, 84, 88, 90, 82, 65, 48, 35, 25],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'SUNTEC',
    carparkNo: 'STC01',
    name: 'Suntec City Mall & Convention',
    agency: 'Commercial',
    address: '3 Temasek Blvd, Singapore 038983',
    district: 'Marina Bay / CBD',
    coordinates: { lat: 1.2935, lng: 103.8572 },
    totalLots: 3100,
    availableLots: 1184,
    status: 'plenty',
    occupancyPercent: 62,
    lotBreakdown: {
      cars: { total: 2850, available: 1090 },
      motorcycles: { total: 250, available: 94 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 22,
      availableChargers: 9,
      provider: 'Shell Recharge',
      speed: '60kW DC / 22kW AC'
    },
    rates: {
      weekdayPeak: '$2.60 for 1st hr, $1.30/30m subsequent',
      weekdayPeakHours: '07:00 - 17:00',
      weekdayPeakRatePer30Min: 1.30,
      weekdayOffPeak: '$2.80 per entry',
      weekdayOffPeakHours: '17:00 - 07:00',
      weekdayOffPeakRatePer30Min: 0.70,
      saturdayRate: '$2.60 for 1st 4 hrs, $1.30/30m subsequent',
      sundayPHRate: '$2.60 for 1st 4 hrs, $1.30/30m subsequent',
      gracePeriodMins: 15,
      nightParkingMax: 6.00
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.0,
    hasGracePeriod: true,
    freeParkingInfo: 'Spend $50 to redeem $3.00 parking coupon',
    historicalOccupancy: [15, 12, 10, 8, 10, 20, 48, 72, 82, 86, 90, 94, 91, 85, 80, 78, 80, 85, 82, 68, 50, 35, 25, 18],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'RAFFLES_CITY',
    carparkNo: 'RFC01',
    name: 'Raffles City Shopping Centre',
    agency: 'Commercial',
    address: '252 North Bridge Rd, Singapore 179103',
    district: 'Marina Bay / CBD',
    coordinates: { lat: 1.2941, lng: 103.8532 },
    totalLots: 1045,
    availableLots: 184,
    status: 'moderate',
    occupancyPercent: 82,
    lotBreakdown: {
      cars: { total: 980, available: 168 },
      motorcycles: { total: 65, available: 16 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 8,
      availableChargers: 2,
      provider: 'Charge+',
      speed: '22kW AC'
    },
    rates: {
      weekdayPeak: '$3.30 for 1st hr, $0.90 per 15 mins',
      weekdayPeakHours: '08:00 - 18:00',
      weekdayPeakRatePer30Min: 1.80,
      weekdayOffPeak: '$3.30 per entry',
      weekdayOffPeakHours: '18:00 - 08:00',
      weekdayOffPeakRatePer30Min: 0.85,
      saturdayRate: '$3.30 for 1st 2 hrs, $0.90 per 15m subsequent',
      sundayPHRate: '$3.30 for 1st 2 hrs, $0.90 per 15m subsequent',
      gracePeriodMins: 10
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.1,
    hasGracePeriod: true,
    historicalOccupancy: [18, 12, 10, 8, 10, 25, 55, 76, 88, 92, 95, 96, 92, 88, 84, 82, 86, 90, 85, 70, 52, 38, 28, 20],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'URA_MAXWELL',
    carparkNo: 'URAM01',
    name: 'URA Maxwell Road Car Park',
    agency: 'URA',
    address: '45 Maxwell Rd, Singapore 069118',
    district: 'Marina Bay / CBD',
    coordinates: { lat: 1.2789, lng: 103.8465 },
    totalLots: 420,
    availableLots: 42,
    status: 'scarce',
    occupancyPercent: 90,
    lotBreakdown: {
      cars: { total: 380, available: 34 },
      motorcycles: { total: 40, available: 8 }
    },
    evCharging: {
      hasEV: false,
      totalChargers: 0,
      availableChargers: 0
    },
    rates: {
      weekdayPeak: '$1.40 per 30 mins',
      weekdayPeakHours: '07:00 - 17:00',
      weekdayPeakRatePer30Min: 1.40,
      weekdayOffPeak: '$0.70 per 30 mins',
      weekdayOffPeakHours: '17:00 - 07:00',
      weekdayOffPeakRatePer30Min: 0.70,
      saturdayRate: '$1.40 per 30 mins (07:00 - 17:00)',
      sundayPHRate: 'Free parking on Sunday (07:00 - 22:30)',
      gracePeriodMins: 15,
      nightParkingMax: 5.00
    },
    carparkType: 'Surface / Open Air',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 4.5,
    hasGracePeriod: true,
    freeParkingInfo: 'Free parking Sundays & Public Holidays 07:00 - 22:30',
    historicalOccupancy: [10, 8, 6, 5, 8, 22, 60, 85, 95, 98, 98, 95, 92, 90, 86, 84, 80, 75, 60, 42, 28, 18, 14, 10],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'ONE_RAFFLES_PLACE',
    carparkNo: 'ORP01',
    name: 'One Raffles Place Tower',
    agency: 'Commercial',
    address: '1 Raffles Pl, Singapore 048616',
    district: 'Marina Bay / CBD',
    coordinates: { lat: 1.2843, lng: 103.8510 },
    totalLots: 320,
    availableLots: 19,
    status: 'scarce',
    occupancyPercent: 94,
    lotBreakdown: {
      cars: { total: 320, available: 19 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 4,
      availableChargers: 1,
      provider: 'SP Mobility',
      speed: '22kW AC'
    },
    rates: {
      weekdayPeak: '$3.70 for 1st hr, $1.85 per 30m',
      weekdayPeakHours: '07:00 - 18:00',
      weekdayPeakRatePer30Min: 1.85,
      weekdayOffPeak: '$3.80 per entry',
      weekdayOffPeakHours: '18:00 - 07:00',
      weekdayOffPeakRatePer30Min: 0.95,
      saturdayRate: '$3.80 per entry (07:00 - 07:00)',
      sundayPHRate: '$3.80 per entry (07:00 - 07:00)',
      gracePeriodMins: 10
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 1.9,
    hasGracePeriod: true,
    historicalOccupancy: [12, 10, 8, 6, 12, 35, 75, 92, 98, 99, 99, 98, 97, 95, 92, 88, 80, 65, 45, 30, 20, 15, 12, 10],
    lastUpdated: new Date().toISOString()
  },

  // --- ORCHARD ROAD & SOMERSET ---
  {
    id: 'ION',
    carparkNo: 'ION01',
    name: 'ION Orchard',
    agency: 'Commercial',
    address: '2 Orchard Turn, Singapore 238801',
    district: 'Orchard / Somerset',
    coordinates: { lat: 1.3040, lng: 103.8318 },
    totalLots: 650,
    availableLots: 88,
    status: 'moderate',
    occupancyPercent: 86,
    lotBreakdown: {
      cars: { total: 600, available: 75 },
      motorcycles: { total: 50, available: 13 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 8,
      availableChargers: 2,
      provider: 'SP Mobility',
      speed: '50kW DC Fast'
    },
    rates: {
      weekdayPeak: '$3.00 for 1st hr, $1.50 per 30m',
      weekdayPeakHours: '08:00 - 17:00',
      weekdayPeakRatePer30Min: 1.50,
      weekdayOffPeak: '$4.50 per entry',
      weekdayOffPeakHours: '17:00 - 08:00',
      weekdayOffPeakRatePer30Min: 1.10,
      saturdayRate: '$4.00 for 1st 2 hrs, $1.80 per 30m subsequent',
      sundayPHRate: '$4.00 for 1st 2 hrs, $1.80 per 30m subsequent',
      gracePeriodMins: 10
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.1,
    hasGracePeriod: true,
    historicalOccupancy: [22, 15, 12, 10, 10, 15, 28, 45, 65, 78, 85, 92, 94, 92, 88, 86, 90, 95, 96, 88, 70, 50, 36, 26],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'TAKASHIMAYA',
    carparkNo: 'TKY01',
    name: 'Ngee Ann City (Takashimaya)',
    agency: 'Commercial',
    address: '391 Orchard Rd, Singapore 238873',
    district: 'Orchard / Somerset',
    coordinates: { lat: 1.3023, lng: 103.8344 },
    totalLots: 1200,
    availableLots: 342,
    status: 'plenty',
    occupancyPercent: 71,
    lotBreakdown: {
      cars: { total: 1100, available: 310 },
      motorcycles: { total: 100, available: 32 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 12,
      availableChargers: 4,
      provider: 'Charge+',
      speed: '22kW AC'
    },
    rates: {
      weekdayPeak: '$2.80 for 1st hr, $1.40 per 30m',
      weekdayPeakHours: '08:00 - 17:00',
      weekdayPeakRatePer30Min: 1.40,
      weekdayOffPeak: '$4.20 per entry',
      weekdayOffPeakHours: '17:00 - 08:00',
      weekdayOffPeakRatePer30Min: 1.05,
      saturdayRate: '$4.20 for 1st 2 hrs, $1.60 per 30m',
      sundayPHRate: '$4.20 for 1st 2 hrs, $1.60 per 30m',
      gracePeriodMins: 10
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.0,
    hasGracePeriod: true,
    historicalOccupancy: [18, 12, 10, 8, 10, 14, 25, 42, 60, 72, 82, 90, 92, 88, 85, 84, 88, 92, 90, 80, 62, 45, 30, 22],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'PARAGON',
    carparkNo: 'PGN01',
    name: 'Paragon Shopping Centre',
    agency: 'Commercial',
    address: '290 Orchard Rd, Singapore 238859',
    district: 'Orchard / Somerset',
    coordinates: { lat: 1.3039, lng: 103.8358 },
    totalLots: 450,
    availableLots: 38,
    status: 'scarce',
    occupancyPercent: 91,
    lotBreakdown: {
      cars: { total: 420, available: 34 },
      motorcycles: { total: 30, available: 4 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 4,
      availableChargers: 1,
      provider: 'SP Mobility',
      speed: '22kW AC'
    },
    rates: {
      weekdayPeak: '$3.50 for 1st hr, $1.80 per 30m',
      weekdayPeakHours: '07:00 - 17:00',
      weekdayPeakRatePer30Min: 1.80,
      weekdayOffPeak: '$4.80 per entry',
      weekdayOffPeakHours: '17:00 - 07:00',
      weekdayOffPeakRatePer30Min: 1.20,
      saturdayRate: '$4.80 for 1st 2 hrs, $1.80 per 30m',
      sundayPHRate: '$4.80 for 1st 2 hrs, $1.80 per 30m',
      gracePeriodMins: 10
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.0,
    hasGracePeriod: true,
    historicalOccupancy: [15, 10, 8, 6, 8, 12, 22, 48, 70, 85, 92, 96, 97, 95, 92, 90, 94, 98, 96, 86, 68, 45, 28, 18],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'SOMERSET313',
    carparkNo: 'SOM313',
    name: '313@somerset',
    agency: 'Commercial',
    address: '313 Orchard Rd, Singapore 238895',
    district: 'Orchard / Somerset',
    coordinates: { lat: 1.3010, lng: 103.8384 },
    totalLots: 280,
    availableLots: 46,
    status: 'moderate',
    occupancyPercent: 83,
    lotBreakdown: {
      cars: { total: 260, available: 42 },
      motorcycles: { total: 20, available: 4 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 4,
      availableChargers: 2,
      provider: 'Shell Recharge',
      speed: '22kW AC'
    },
    rates: {
      weekdayPeak: '$2.80 for 1st hr, $1.40 per 30m',
      weekdayPeakHours: '08:00 - 18:00',
      weekdayPeakRatePer30Min: 1.40,
      weekdayOffPeak: '$3.50 per entry',
      weekdayOffPeakHours: '18:00 - 08:00',
      weekdayOffPeakRatePer30Min: 0.90,
      saturdayRate: '$3.50 for 1st 2 hrs, $1.50 per 30m',
      sundayPHRate: '$3.50 for 1st 2 hrs, $1.50 per 30m',
      gracePeriodMins: 10
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.0,
    hasGracePeriod: true,
    historicalOccupancy: [20, 14, 10, 8, 10, 16, 30, 50, 70, 80, 88, 93, 94, 91, 88, 85, 89, 93, 91, 82, 65, 45, 32, 24],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'PLAZA_SING',
    carparkNo: 'PLS01',
    name: 'Plaza Singapura',
    agency: 'Commercial',
    address: '68 Orchard Rd, Singapore 238839',
    district: 'Orchard / Somerset',
    coordinates: { lat: 1.3007, lng: 103.8449 },
    totalLots: 715,
    availableLots: 245,
    status: 'plenty',
    occupancyPercent: 65,
    lotBreakdown: {
      cars: { total: 660, available: 220 },
      motorcycles: { total: 55, available: 25 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 10,
      availableChargers: 4,
      provider: 'SP Mobility',
      speed: '50kW DC / 22kW AC'
    },
    rates: {
      weekdayPeak: '$2.50 for 1st hr, $1.20 per 30m',
      weekdayPeakHours: '08:00 - 18:00',
      weekdayPeakRatePer30Min: 1.20,
      weekdayOffPeak: '$3.20 per entry',
      weekdayOffPeakHours: '18:00 - 08:00',
      weekdayOffPeakRatePer30Min: 0.80,
      saturdayRate: '$3.20 for 1st 2 hrs, $1.20 per 30m',
      sundayPHRate: '$3.20 for 1st 2 hrs, $1.20 per 30m',
      gracePeriodMins: 10
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.05,
    hasGracePeriod: true,
    historicalOccupancy: [16, 12, 10, 8, 10, 18, 35, 55, 72, 80, 86, 90, 88, 84, 82, 80, 84, 88, 86, 75, 58, 40, 28, 20],
    lastUpdated: new Date().toISOString()
  },

  // --- BUGIS & ROCHOR & CITY HALL ---
  {
    id: 'BUGIS_JUNCTION',
    carparkNo: 'BGJ01',
    name: 'Bugis Junction & Bugis+',
    agency: 'Commercial',
    address: '200 Victoria St, Singapore 188021',
    district: 'Bugis / City Hall',
    coordinates: { lat: 1.3001, lng: 103.8554 },
    totalLots: 648,
    availableLots: 172,
    status: 'plenty',
    occupancyPercent: 73,
    lotBreakdown: {
      cars: { total: 590, available: 155 },
      motorcycles: { total: 58, available: 17 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 6,
      availableChargers: 3,
      provider: 'Charge+',
      speed: '22kW AC'
    },
    rates: {
      weekdayPeak: '$2.40 for 1st hr, $1.20 per 30m',
      weekdayPeakHours: '08:00 - 17:00',
      weekdayPeakRatePer30Min: 1.20,
      weekdayOffPeak: '$3.20 per entry',
      weekdayOffPeakHours: '17:00 - 08:00',
      weekdayOffPeakRatePer30Min: 0.80,
      saturdayRate: '$3.20 for 1st 2 hrs, $1.20 per 30m',
      sundayPHRate: '$3.20 for 1st 2 hrs, $1.20 per 30m',
      gracePeriodMins: 10
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.0,
    hasGracePeriod: true,
    historicalOccupancy: [18, 14, 10, 8, 10, 18, 38, 62, 78, 84, 88, 92, 90, 86, 84, 82, 86, 90, 88, 76, 58, 42, 28, 20],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'GOLDEN_MILE',
    carparkNo: 'GMT01',
    name: 'Golden Mile Complex / Tower',
    agency: 'Commercial',
    address: '6001 Beach Rd, Singapore 199589',
    district: 'Bugis / City Hall',
    coordinates: { lat: 1.3025, lng: 103.8640 },
    totalLots: 380,
    availableLots: 98,
    status: 'moderate',
    occupancyPercent: 74,
    lotBreakdown: {
      cars: { total: 340, available: 86 },
      motorcycles: { total: 40, available: 12 }
    },
    evCharging: {
      hasEV: false,
      totalChargers: 0,
      availableChargers: 0
    },
    rates: {
      weekdayPeak: '$1.60 per 30 mins',
      weekdayPeakHours: '07:00 - 17:00',
      weekdayPeakRatePer30Min: 1.60,
      weekdayOffPeak: '$2.50 per entry',
      weekdayOffPeakHours: '17:00 - 07:00',
      weekdayOffPeakRatePer30Min: 0.60,
      saturdayRate: '$2.50 per entry',
      sundayPHRate: '$2.50 per entry',
      gracePeriodMins: 10
    },
    carparkType: 'Multi-Storey',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.1,
    hasGracePeriod: true,
    historicalOccupancy: [15, 12, 10, 8, 10, 20, 45, 68, 75, 80, 85, 88, 86, 82, 80, 78, 82, 84, 80, 68, 50, 35, 24, 18],
    lastUpdated: new Date().toISOString()
  },

  // --- HARBOURFRONT & SOUTHERN ---
  {
    id: 'VIVOCITY',
    carparkNo: 'VVC01',
    name: 'VivoCity & HarbourFront',
    agency: 'Commercial',
    address: '1 HarbourFront Walk, Singapore 098585',
    district: 'HarbourFront / Sentosa',
    coordinates: { lat: 1.2644, lng: 103.8222 },
    totalLots: 2179,
    availableLots: 840,
    status: 'plenty',
    occupancyPercent: 61,
    lotBreakdown: {
      cars: { total: 2000, available: 780 },
      motorcycles: { total: 179, available: 60 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 14,
      availableChargers: 6,
      provider: 'Shell Recharge',
      speed: '50kW DC / 22kW AC'
    },
    rates: {
      weekdayPeak: '$1.60 for 1st hr, $0.80 per 30m',
      weekdayPeakHours: '07:00 - 18:00',
      weekdayPeakRatePer30Min: 0.80,
      weekdayOffPeak: '$3.50 per entry',
      weekdayOffPeakHours: '18:00 - 07:00',
      weekdayOffPeakRatePer30Min: 0.70,
      saturdayRate: '$1.80 for 1st hr, $0.90 per 30m',
      sundayPHRate: '$1.80 for 1st hr, $0.90 per 30m',
      gracePeriodMins: 15
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.05,
    hasGracePeriod: true,
    freeParkingInfo: 'Weekdays 12:00 - 14:00 Free 1st hour with dining receipt',
    historicalOccupancy: [12, 10, 8, 6, 8, 14, 25, 45, 62, 70, 78, 84, 82, 80, 78, 76, 80, 85, 84, 72, 54, 38, 25, 16],
    lastUpdated: new Date().toISOString()
  },

  // --- CHANGI & EAST COAST ---
  {
    id: 'JEWEL_CHANGI',
    carparkNo: 'JWL01',
    name: 'Jewel Changi Airport (T1/Jewel)',
    agency: 'Commercial',
    address: '78 Airport Blvd, Singapore 819666',
    district: 'Changi / East Coast',
    coordinates: { lat: 1.3602, lng: 103.9898 },
    totalLots: 2500,
    availableLots: 980,
    status: 'plenty',
    occupancyPercent: 60,
    lotBreakdown: {
      cars: { total: 2350, available: 920 },
      motorcycles: { total: 150, available: 60 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 18,
      availableChargers: 7,
      provider: 'SP Mobility',
      speed: '50kW DC / 22kW AC'
    },
    rates: {
      weekdayPeak: '$0.04 per min ($2.40/hr)',
      weekdayPeakHours: 'All Day',
      weekdayPeakRatePer30Min: 1.20,
      weekdayOffPeak: '$0.04 per min ($2.40/hr)',
      weekdayOffPeakHours: 'All Day',
      weekdayOffPeakRatePer30Min: 1.20,
      saturdayRate: '$0.04 per min (capped at $35.00/24h)',
      sundayPHRate: '$0.04 per min (capped at $35.00/24h)',
      gracePeriodMins: 10
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.1,
    hasGracePeriod: true,
    historicalOccupancy: [35, 30, 25, 20, 25, 40, 55, 68, 74, 80, 85, 88, 86, 84, 82, 80, 82, 86, 84, 75, 62, 50, 42, 38],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'TAMPINES_MALL',
    carparkNo: 'TPM01',
    name: 'Tampines Mall & Tampines 1',
    agency: 'Commercial',
    address: '4 Tampines Central 5, Singapore 529510',
    district: 'Tampines / East',
    coordinates: { lat: 1.3533, lng: 103.9452 },
    totalLots: 620,
    availableLots: 110,
    status: 'moderate',
    occupancyPercent: 82,
    lotBreakdown: {
      cars: { total: 570, available: 96 },
      motorcycles: { total: 50, available: 14 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 6,
      availableChargers: 2,
      provider: 'Charge+',
      speed: '22kW AC'
    },
    rates: {
      weekdayPeak: '$1.50 for 1st hr, $0.60 per 15m',
      weekdayPeakHours: '08:00 - 18:00',
      weekdayPeakRatePer30Min: 1.20,
      weekdayOffPeak: '$2.80 per entry',
      weekdayOffPeakHours: '18:00 - 08:00',
      weekdayOffPeakRatePer30Min: 0.70,
      saturdayRate: '$2.80 for 1st 2 hrs, $0.60 per 15m',
      sundayPHRate: '$2.80 for 1st 2 hrs, $0.60 per 15m',
      gracePeriodMins: 10
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.0,
    hasGracePeriod: true,
    historicalOccupancy: [15, 10, 8, 6, 8, 15, 32, 58, 72, 82, 88, 92, 90, 85, 82, 80, 85, 90, 88, 78, 60, 42, 28, 18],
    lastUpdated: new Date().toISOString()
  },

  // --- WEST & JURONG ---
  {
    id: 'JURONG_POINT',
    carparkNo: 'JRP01',
    name: 'Jurong Point Shopping Centre',
    agency: 'Commercial',
    address: '1 Jurong West Central 2, Singapore 648886',
    district: 'Jurong / West',
    coordinates: { lat: 1.3402, lng: 103.7067 },
    totalLots: 1450,
    availableLots: 420,
    status: 'plenty',
    occupancyPercent: 71,
    lotBreakdown: {
      cars: { total: 1350, available: 390 },
      motorcycles: { total: 100, available: 30 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 12,
      availableChargers: 5,
      provider: 'SP Mobility',
      speed: '50kW DC / 22kW AC'
    },
    rates: {
      weekdayPeak: '$1.40 for 1st 2 hrs, $1.20 per subsequent hr',
      weekdayPeakHours: '07:00 - 17:00',
      weekdayPeakRatePer30Min: 0.60,
      weekdayOffPeak: '$2.20 per entry',
      weekdayOffPeakHours: '17:00 - 07:00',
      weekdayOffPeakRatePer30Min: 0.55,
      saturdayRate: '$2.20 for 1st 2 hrs, $1.30/hr',
      sundayPHRate: '$2.20 for 1st 2 hrs, $1.30/hr',
      gracePeriodMins: 15
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.1,
    hasGracePeriod: true,
    historicalOccupancy: [18, 12, 10, 8, 10, 18, 38, 60, 75, 84, 88, 92, 90, 85, 82, 80, 84, 88, 86, 75, 58, 42, 30, 22],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'WESTGATE',
    carparkNo: 'WST01',
    name: 'Westgate & Jem Mall',
    agency: 'Commercial',
    address: '3 Gateway Dr, Singapore 608532',
    district: 'Jurong / West',
    coordinates: { lat: 1.3338, lng: 103.7428 },
    totalLots: 1210,
    availableLots: 310,
    status: 'plenty',
    occupancyPercent: 74,
    lotBreakdown: {
      cars: { total: 1120, available: 285 },
      motorcycles: { total: 90, available: 25 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 10,
      availableChargers: 4,
      provider: 'Shell Recharge',
      speed: '60kW DC / 22kW AC'
    },
    rates: {
      weekdayPeak: '$1.50 for 1st hr, $0.60 per 15m',
      weekdayPeakHours: '08:00 - 18:00',
      weekdayPeakRatePer30Min: 1.20,
      weekdayOffPeak: '$2.80 per entry',
      weekdayOffPeakHours: '18:00 - 08:00',
      weekdayOffPeakRatePer30Min: 0.70,
      saturdayRate: '$2.80 for 1st 2 hrs, $0.60 per 15m',
      sundayPHRate: '$2.80 for 1st 2 hrs, $0.60 per 15m',
      gracePeriodMins: 10
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.0,
    hasGracePeriod: true,
    historicalOccupancy: [15, 12, 10, 8, 10, 18, 40, 65, 80, 88, 92, 95, 92, 88, 85, 82, 86, 92, 90, 78, 60, 42, 28, 18],
    lastUpdated: new Date().toISOString()
  },

  // --- HDB RESIDENTIAL & TOWN CENTRES (Standard HDB EPS Rates) ---
  {
    id: 'HDB_TOA_PAYOH_HUB',
    carparkNo: 'TPH01',
    name: 'HDB Hub Toa Payoh (Blk 480 / 500)',
    agency: 'HDB',
    address: '480 Lor 6 Toa Payoh, Singapore 310480',
    district: 'Toa Payoh / Central',
    coordinates: { lat: 1.3328, lng: 103.8491 },
    totalLots: 890,
    availableLots: 215,
    status: 'plenty',
    occupancyPercent: 75,
    lotBreakdown: {
      cars: { total: 780, available: 185 },
      motorcycles: { total: 110, available: 30 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 8,
      availableChargers: 3,
      provider: 'SP Mobility',
      speed: '22kW AC'
    },
    rates: {
      weekdayPeak: '$0.60 per 30 mins (HDB Tier 1)',
      weekdayPeakHours: '07:00 - 17:00',
      weekdayPeakRatePer30Min: 0.60,
      weekdayOffPeak: '$0.60 per 30 mins (Capped at $5.00/night)',
      weekdayOffPeakHours: '17:00 - 07:00',
      weekdayOffPeakRatePer30Min: 0.60,
      saturdayRate: '$0.60 per 30 mins',
      sundayPHRate: 'Free parking 07:00 - 22:30 (HDB Scheme)',
      gracePeriodMins: 15,
      nightParkingMax: 5.00
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.15,
    hasGracePeriod: true,
    freeParkingInfo: 'Free parking Sundays & Public Holidays 07:00 - 22:30',
    historicalOccupancy: [40, 35, 30, 25, 30, 50, 75, 90, 94, 96, 95, 92, 88, 85, 82, 80, 84, 88, 85, 75, 65, 55, 48, 42],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'HDB_AMK_CENTRAL',
    carparkNo: 'AMK712',
    name: 'HDB Ang Mo Kio Central (Blk 712)',
    agency: 'HDB',
    address: 'Blk 712 Ang Mo Kio Ave 6, Singapore 560712',
    district: 'Ang Mo Kio / Central',
    coordinates: { lat: 1.3695, lng: 103.8468 },
    totalLots: 560,
    availableLots: 88,
    status: 'moderate',
    occupancyPercent: 84,
    lotBreakdown: {
      cars: { total: 490, available: 74 },
      motorcycles: { total: 70, available: 14 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 4,
      availableChargers: 1,
      provider: 'EV One',
      speed: '22kW AC'
    },
    rates: {
      weekdayPeak: '$0.60 per 30 mins',
      weekdayPeakHours: '07:00 - 17:00',
      weekdayPeakRatePer30Min: 0.60,
      weekdayOffPeak: '$0.60 per 30 mins (Capped at $5.00/night)',
      weekdayOffPeakHours: '17:00 - 07:00',
      weekdayOffPeakRatePer30Min: 0.60,
      saturdayRate: '$0.60 per 30 mins',
      sundayPHRate: 'Free parking 07:00 - 22:30',
      gracePeriodMins: 15,
      nightParkingMax: 5.00
    },
    carparkType: 'Multi-Storey',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.15,
    hasGracePeriod: true,
    freeParkingInfo: 'Free parking on Sundays & PH (07:00 - 22:30)',
    historicalOccupancy: [65, 60, 58, 55, 60, 70, 80, 85, 88, 90, 88, 85, 82, 80, 78, 80, 84, 88, 86, 82, 78, 72, 68, 65],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'HDB_BEDOK_CENTRAL',
    carparkNo: 'BDK208',
    name: 'HDB Bedok Central (Blk 208 New Upper Changi)',
    agency: 'HDB',
    address: 'Blk 208 New Upper Changi Rd, Singapore 460208',
    district: 'Bedok / East',
    coordinates: { lat: 1.3242, lng: 103.9318 },
    totalLots: 480,
    availableLots: 35,
    status: 'scarce',
    occupancyPercent: 92,
    lotBreakdown: {
      cars: { total: 420, available: 28 },
      motorcycles: { total: 60, available: 7 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 4,
      availableChargers: 0,
      provider: 'SP Mobility',
      speed: '22kW AC'
    },
    rates: {
      weekdayPeak: '$0.60 per 30 mins',
      weekdayPeakHours: '07:00 - 17:00',
      weekdayPeakRatePer30Min: 0.60,
      weekdayOffPeak: '$0.60 per 30 mins (Capped at $5.00/night)',
      weekdayOffPeakHours: '17:00 - 07:00',
      weekdayOffPeakRatePer30Min: 0.60,
      saturdayRate: '$0.60 per 30 mins',
      sundayPHRate: 'Free parking on Sunday 07:00 - 22:30',
      gracePeriodMins: 15,
      nightParkingMax: 5.00
    },
    carparkType: 'Multi-Storey',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.15,
    hasGracePeriod: true,
    historicalOccupancy: [70, 68, 65, 62, 65, 75, 85, 92, 95, 98, 96, 92, 90, 88, 86, 88, 92, 95, 92, 88, 82, 78, 74, 70],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'HDB_BISHAN_NORTH',
    carparkNo: 'BS28',
    name: 'HDB Bishan North Shopping Mall (Blk 282)',
    agency: 'HDB',
    address: 'Blk 282 Bishan St 22, Singapore 570282',
    district: 'Bishan / Central',
    coordinates: { lat: 1.3585, lng: 103.8447 },
    totalLots: 420,
    availableLots: 124,
    status: 'plenty',
    occupancyPercent: 70,
    lotBreakdown: {
      cars: { total: 370, available: 108 },
      motorcycles: { total: 50, available: 16 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 2,
      availableChargers: 1,
      provider: 'EV One',
      speed: '22kW AC'
    },
    rates: {
      weekdayPeak: '$0.60 per 30 mins',
      weekdayPeakHours: '07:00 - 17:00',
      weekdayPeakRatePer30Min: 0.60,
      weekdayOffPeak: '$0.60 per 30 mins (Capped at $5.00/night)',
      weekdayOffPeakHours: '17:00 - 07:00',
      weekdayOffPeakRatePer30Min: 0.60,
      saturdayRate: '$0.60 per 30 mins',
      sundayPHRate: 'Free parking 07:00 - 22:30',
      gracePeriodMins: 15,
      nightParkingMax: 5.00
    },
    carparkType: 'Multi-Storey',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.15,
    hasGracePeriod: true,
    historicalOccupancy: [60, 58, 55, 52, 55, 65, 75, 82, 86, 88, 85, 82, 80, 78, 75, 78, 82, 85, 82, 78, 72, 68, 64, 60],
    lastUpdated: new Date().toISOString()
  },

  // --- WOODLANDS & NORTH ---
  {
    id: 'CAUSEWAY_POINT',
    carparkNo: 'CWP01',
    name: 'Causeway Point Woodlands',
    agency: 'Commercial',
    address: '1 Woodlands Sq, Singapore 738099',
    district: 'Woodlands / North',
    coordinates: { lat: 1.4361, lng: 103.7858 },
    totalLots: 820,
    availableLots: 195,
    status: 'moderate',
    occupancyPercent: 76,
    lotBreakdown: {
      cars: { total: 750, available: 175 },
      motorcycles: { total: 70, available: 20 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 6,
      availableChargers: 2,
      provider: 'Shell Recharge',
      speed: '50kW DC / 22kW AC'
    },
    rates: {
      weekdayPeak: '$1.40 for 1st hr, $0.60 per 15m',
      weekdayPeakHours: '08:00 - 18:00',
      weekdayPeakRatePer30Min: 1.20,
      weekdayOffPeak: '$2.50 per entry',
      weekdayOffPeakHours: '18:00 - 08:00',
      weekdayOffPeakRatePer30Min: 0.60,
      saturdayRate: '$2.50 for 1st 2 hrs, $0.60 per 15m',
      sundayPHRate: '$2.50 for 1st 2 hrs, $0.60 per 15m',
      gracePeriodMins: 10
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.0,
    hasGracePeriod: true,
    historicalOccupancy: [15, 10, 8, 6, 8, 15, 35, 58, 74, 82, 88, 92, 90, 86, 82, 80, 84, 88, 86, 75, 58, 40, 26, 18],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'NORTHPOINT_CITY',
    carparkNo: 'NPC01',
    name: 'Northpoint City Yishun',
    agency: 'Commercial',
    address: '930 Yishun Ave 2, Singapore 769098',
    district: 'Woodlands / North',
    coordinates: { lat: 1.4296, lng: 103.8359 },
    totalLots: 1100,
    availableLots: 320,
    status: 'plenty',
    occupancyPercent: 70,
    lotBreakdown: {
      cars: { total: 1020, available: 295 },
      motorcycles: { total: 80, available: 25 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 8,
      availableChargers: 3,
      provider: 'SP Mobility',
      speed: '50kW DC / 22kW AC'
    },
    rates: {
      weekdayPeak: '$1.40 for 1st hr, $0.60 per 15m',
      weekdayPeakHours: '08:00 - 18:00',
      weekdayPeakRatePer30Min: 1.20,
      weekdayOffPeak: '$2.50 per entry',
      weekdayOffPeakHours: '18:00 - 08:00',
      weekdayOffPeakRatePer30Min: 0.60,
      saturdayRate: '$2.50 for 1st 2 hrs, $0.60 per 15m',
      sundayPHRate: '$2.50 for 1st 2 hrs, $0.60 per 15m',
      gracePeriodMins: 10
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.1,
    hasGracePeriod: true,
    historicalOccupancy: [14, 10, 8, 6, 8, 14, 32, 54, 70, 80, 86, 90, 88, 84, 80, 78, 82, 86, 84, 72, 55, 38, 24, 16],
    lastUpdated: new Date().toISOString()
  },

  // --- DOWNTOWN & CLARKE QUAY ---
  {
    id: 'CLARKE_QUAY_CENTRAL',
    carparkNo: 'CQC01',
    name: 'The Central @ Clarke Quay',
    agency: 'Commercial',
    address: '6 Eu Tong Sen St, Singapore 059817',
    district: 'Marina Bay / CBD',
    coordinates: { lat: 1.2889, lng: 103.8466 },
    totalLots: 510,
    availableLots: 64,
    status: 'moderate',
    occupancyPercent: 87,
    lotBreakdown: {
      cars: { total: 470, available: 58 },
      motorcycles: { total: 40, available: 6 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 4,
      availableChargers: 1,
      provider: 'SP Mobility',
      speed: '22kW AC'
    },
    rates: {
      weekdayPeak: '$2.80 for 1st hr, $1.40 per 30m',
      weekdayPeakHours: '06:00 - 17:00',
      weekdayPeakRatePer30Min: 1.40,
      weekdayOffPeak: '$4.50 per entry',
      weekdayOffPeakHours: '17:00 - 06:00',
      weekdayOffPeakRatePer30Min: 1.10,
      saturdayRate: '$4.50 per entry (06:00 - 06:00)',
      sundayPHRate: '$4.50 per entry (06:00 - 06:00)',
      gracePeriodMins: 10
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 2.0,
    hasGracePeriod: true,
    historicalOccupancy: [25, 20, 15, 12, 10, 15, 32, 55, 75, 85, 90, 94, 92, 88, 85, 84, 88, 94, 98, 95, 85, 65, 45, 32],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'CHINATOWN_POINT',
    carparkNo: 'CNP01',
    name: 'Chinatown Point',
    agency: 'Commercial',
    address: '133 New Bridge Rd, Singapore 059413',
    district: 'Marina Bay / CBD',
    coordinates: { lat: 1.2851, lng: 103.8441 },
    totalLots: 390,
    availableLots: 52,
    status: 'moderate',
    occupancyPercent: 86,
    lotBreakdown: {
      cars: { total: 360, available: 47 },
      motorcycles: { total: 30, available: 5 }
    },
    evCharging: {
      hasEV: true,
      totalChargers: 2,
      availableChargers: 0,
      provider: 'Charge+',
      speed: '22kW AC'
    },
    rates: {
      weekdayPeak: '$2.50 for 1st hr, $1.25 per 30m',
      weekdayPeakHours: '07:00 - 17:00',
      weekdayPeakRatePer30Min: 1.25,
      weekdayOffPeak: '$3.50 per entry',
      weekdayOffPeakHours: '17:00 - 07:00',
      weekdayOffPeakRatePer30Min: 0.85,
      saturdayRate: '$3.50 per entry',
      sundayPHRate: '$3.50 per entry',
      gracePeriodMins: 10
    },
    carparkType: 'Basement',
    paymentSystem: 'Electronic Parking System (EPS)',
    heightLimit: 1.95,
    hasGracePeriod: true,
    historicalOccupancy: [15, 10, 8, 6, 8, 15, 35, 62, 80, 88, 92, 95, 94, 90, 86, 84, 88, 92, 88, 76, 58, 40, 25, 18],
    lastUpdated: new Date().toISOString()
  }
];

export const POPULAR_LOCATIONS: { name: string; district: string; lat: number; lng: number }[] = [
  { name: 'Orchard MRT / ION Orchard', district: 'Orchard / Somerset', lat: 1.3040, lng: 103.8318 },
  { name: 'Raffles Place MRT (CBD)', district: 'Marina Bay / CBD', lat: 1.2839, lng: 103.8515 },
  { name: 'Marina Bay Sands', district: 'Marina Bay / CBD', lat: 1.2834, lng: 103.8607 },
  { name: 'Bugis MRT & Junction', district: 'Bugis / City Hall', lat: 1.3001, lng: 103.8554 },
  { name: 'VivoCity & Sentosa Gateway', district: 'HarbourFront / Sentosa', lat: 1.2644, lng: 103.8222 },
  { name: 'Jewel Changi Airport', district: 'Changi / East Coast', lat: 1.3602, lng: 103.9898 },
  { name: 'Jurong East MRT (Westgate / Jem)', district: 'Jurong / West', lat: 1.3338, lng: 103.7428 },
  { name: 'Toa Payoh Central Hub', district: 'Toa Payoh / Central', lat: 1.3328, lng: 103.8491 },
  { name: 'Woodlands Civic Centre', district: 'Woodlands / North', lat: 1.4361, lng: 103.7858 }
];

export const DISTRICT_LIST = [
  'All Singapore',
  'Orchard / Somerset',
  'Marina Bay / CBD',
  'Bugis / City Hall',
  'HarbourFront / Sentosa',
  'Changi / East Coast',
  'Jurong / West',
  'Toa Payoh / Central',
  'Woodlands / North'
];
