import { create } from 'zustand';

export interface DriverData {
  driver_number: number;
  broadcast_name: string;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  headshot_url: string;
  position: number;
  gap_to_leader: string;
  interval: string;
  last_lap_time: string;
  best_lap_time: string;
  sector_1: string;
  sector_2: string;
  sector_3: string;
  tyre_compound: string;
  tyre_age: number;
  is_in_pit: boolean;
}

export interface TelemetryData {
  rpm: number;
  speed: number;
  gear: number;
  throttle: number;
  brake: number;
  drs: boolean;
  time: number;
}

interface F1StoreState {
  isLive: boolean;
  sessionName: string;
  trackName: string;
  lap: number;
  totalLaps: number;
  status: 'Green' | 'Yellow' | 'Red' | 'VSC' | 'SC' | 'Finished';
  drivers: DriverData[];
  selectedDriver: number | null;
  telemetryHistory: TelemetryData[];
  currentTelemetry: TelemetryData | null;
  
  setLiveStatus: (isLive: boolean) => void;
  updateDrivers: (drivers: DriverData[]) => void;
  setSelectedDriver: (driverNumber: number) => void;
  updateTelemetry: (telemetry: TelemetryData) => void;
}

const mockDrivers: DriverData[] = [
  { driver_number: 1, broadcast_name: "M VERSTAPPEN", full_name: "Max Verstappen", name_acronym: "VER", team_name: "Red Bull Racing", team_colour: "3671C6", headshot_url: "", position: 1, gap_to_leader: "Leader", interval: "Leader", last_lap_time: "1:32.456", best_lap_time: "1:31.987", sector_1: "29.123", sector_2: "35.451", sector_3: "27.882", tyre_compound: "SOFT", tyre_age: 12, is_in_pit: false },
  { driver_number: 4, broadcast_name: "L NORRIS", full_name: "Lando Norris", name_acronym: "NOR", team_name: "McLaren", team_colour: "FF8000", headshot_url: "", position: 2, gap_to_leader: "+4.215", interval: "+4.215", last_lap_time: "1:32.412", best_lap_time: "1:32.100", sector_1: "29.210", sector_2: "35.340", sector_3: "27.862", tyre_compound: "MEDIUM", tyre_age: 15, is_in_pit: false },
  { driver_number: 16, broadcast_name: "C LECLERC", full_name: "Charles Leclerc", name_acronym: "LEC", team_name: "Ferrari", team_colour: "E8002D", headshot_url: "", position: 3, gap_to_leader: "+7.892", interval: "+3.677", last_lap_time: "1:32.650", best_lap_time: "1:32.333", sector_1: "29.300", sector_2: "35.500", sector_3: "27.850", tyre_compound: "HARD", tyre_age: 20, is_in_pit: false },
  { driver_number: 44, broadcast_name: "L HAMILTON", full_name: "Lewis Hamilton", name_acronym: "HAM", team_name: "Mercedes", team_colour: "27F4D2", headshot_url: "", position: 4, gap_to_leader: "+11.450", interval: "+3.558", last_lap_time: "1:32.800", best_lap_time: "1:32.500", sector_1: "29.350", sector_2: "35.600", sector_3: "27.850", tyre_compound: "HARD", tyre_age: 21, is_in_pit: false },
];

export const useF1Store = create<F1StoreState>((set) => ({
  isLive: true,
  sessionName: "Race - Bahrain Grand Prix",
  trackName: "Bahrain International Circuit",
  lap: 45,
  totalLaps: 57,
  status: 'Green',
  drivers: mockDrivers,
  selectedDriver: 1,
  telemetryHistory: [],
  currentTelemetry: null,
  
  setLiveStatus: (isLive) => set({ isLive }),
  updateDrivers: (drivers) => set({ drivers }),
  setSelectedDriver: (selectedDriver) => set({ selectedDriver, telemetryHistory: [] }),
  updateTelemetry: (telemetry) => set((state) => {
    const newHistory = [...state.telemetryHistory, telemetry].slice(-100);
    return {
      currentTelemetry: telemetry,
      telemetryHistory: newHistory
    };
  })
}));
