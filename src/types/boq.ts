export interface SystemSplit {
  type: string;
  capacity: number;
  meteringType: "Net Metering" | "Zero Export";
}

export interface Inverter {
  type: string;
  rating: number;
  quantity: number;
}

export interface BOQData {
  // Client Info
  clientName: string;
  location: string;
  
  // System Config
  totalCapacity: number;
  moduleWattage: number;
  moduleType: string;
  
  // System Splits
  systemSplits: SystemSplit[];
  
  // Inverters
  inverters: Inverter[];
  
  // Equipment
  stringCombiners: number;
  dcCableSpec: string;
  acCableSpec: string;
  mainAcCableSpec: string;
  earthingPoints: number;
  lightningArrestors: number;
  cableTrenchLength: number;
}

export const defaultBOQData: BOQData = {
  clientName: "",
  location: "",
  totalCapacity: 550,
  moduleWattage: 610,
  moduleType: "Topcon Bifacial Tier-1",
  systemSplits: [
    { type: "Rooftop (2 Sheds)", capacity: 100, meteringType: "Net Metering" },
    { type: "Ground Mount", capacity: 250, meteringType: "Net Metering" },
    { type: "Ground Mount", capacity: 200, meteringType: "Zero Export" },
  ],
  inverters: [
    { type: "String Inverter – Net Metering", rating: 110, quantity: 3 },
    { type: "String Inverter – Net Metering", rating: 20, quantity: 1 },
    { type: "String Inverter – Zero Export", rating: 100, quantity: 2 },
  ],
  stringCombiners: 12,
  dcCableSpec: "4 / 6 Sqmm Cu (UV-resistant)",
  acCableSpec: "3.5C 70 / 120 Sqmm Al",
  mainAcCableSpec: "3.5C 240 Sqmm Al",
  earthingPoints: 20,
  lightningArrestors: 2,
  cableTrenchLength: 100,
};
