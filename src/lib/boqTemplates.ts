import { BOQData } from "@/types/boq";

export interface BOQTemplate {
  id: string;
  name: string;
  type: "residential" | "commercial" | "industrial" | "custom";
  data: Omit<BOQData, "clientName" | "location">;
}

export const defaultTemplates: BOQTemplate[] = [
  {
    id: "residential-small",
    name: "Residential - Small (5-10 kW)",
    type: "residential",
    data: {
      totalCapacity: 10,
      moduleWattage: 545,
      moduleType: "Mono PERC Tier-1",
      systemSplits: [
        { type: "Rooftop", capacity: 10, meteringType: "Net Metering" },
      ],
      inverters: [
        { type: "String Inverter", rating: 10, quantity: 1 },
      ],
      stringCombiners: 1,
      dcCableSpec: "4 Sqmm Cu",
      acCableSpec: "3.5C 16 Sqmm Cu",
      mainAcCableSpec: "3.5C 16 Sqmm Cu",
      earthingPoints: 2,
      lightningArrestors: 1,
      cableTrenchLength: 20,
    },
  },
  {
    id: "residential-medium",
    name: "Residential - Medium (15-25 kW)",
    type: "residential",
    data: {
      totalCapacity: 25,
      moduleWattage: 545,
      moduleType: "Mono PERC Tier-1",
      systemSplits: [
        { type: "Rooftop", capacity: 25, meteringType: "Net Metering" },
      ],
      inverters: [
        { type: "String Inverter", rating: 25, quantity: 1 },
      ],
      stringCombiners: 2,
      dcCableSpec: "4 Sqmm Cu",
      acCableSpec: "3.5C 35 Sqmm Cu",
      mainAcCableSpec: "3.5C 50 Sqmm Cu",
      earthingPoints: 4,
      lightningArrestors: 2,
      cableTrenchLength: 30,
    },
  },
  {
    id: "commercial-small",
    name: "Commercial - Small (50-100 kW)",
    type: "commercial",
    data: {
      totalCapacity: 100,
      moduleWattage: 545,
      moduleType: "Topcon Bifacial Tier-1",
      systemSplits: [
        { type: "Rooftop", capacity: 100, meteringType: "Net Metering" },
      ],
      inverters: [
        { type: "String Inverter", rating: 50, quantity: 2 },
      ],
      stringCombiners: 4,
      dcCableSpec: "4 / 6 Sqmm Cu",
      acCableSpec: "3.5C 70 Sqmm Al",
      mainAcCableSpec: "3.5C 120 Sqmm Al",
      earthingPoints: 8,
      lightningArrestors: 4,
      cableTrenchLength: 100,
    },
  },
  {
    id: "commercial-medium",
    name: "Commercial - Medium (200-500 kW)",
    type: "commercial",
    data: {
      totalCapacity: 500,
      moduleWattage: 580,
      moduleType: "Topcon Bifacial Tier-1",
      systemSplits: [
        { type: "Rooftop", capacity: 300, meteringType: "Net Metering" },
        { type: "Carport", capacity: 200, meteringType: "Net Metering" },
      ],
      inverters: [
        { type: "String Inverter", rating: 100, quantity: 5 },
      ],
      stringCombiners: 10,
      dcCableSpec: "4 / 6 Sqmm Cu",
      acCableSpec: "3.5C 120 Sqmm Al",
      mainAcCableSpec: "3.5C 240 Sqmm Al",
      earthingPoints: 16,
      lightningArrestors: 8,
      cableTrenchLength: 300,
    },
  },
  {
    id: "industrial-medium",
    name: "Industrial - Medium (1-2 MW)",
    type: "industrial",
    data: {
      totalCapacity: 1500,
      moduleWattage: 580,
      moduleType: "Topcon Bifacial Tier-1",
      systemSplits: [
        { type: "Ground Mount", capacity: 1000, meteringType: "Net Metering" },
        { type: "Rooftop", capacity: 500, meteringType: "Zero Export" },
      ],
      inverters: [
        { type: "Central Inverter", rating: 500, quantity: 2 },
        { type: "String Inverter", rating: 100, quantity: 5 },
      ],
      stringCombiners: 30,
      dcCableSpec: "4 / 6 Sqmm Cu",
      acCableSpec: "3.5C 185 Sqmm Al",
      mainAcCableSpec: "3.5C 400 Sqmm Al",
      earthingPoints: 40,
      lightningArrestors: 16,
      cableTrenchLength: 800,
    },
  },
  {
    id: "industrial-large",
    name: "Industrial - Large (3-5 MW)",
    type: "industrial",
    data: {
      totalCapacity: 5000,
      moduleWattage: 580,
      moduleType: "Topcon Bifacial Tier-1",
      systemSplits: [
        { type: "Ground Mount", capacity: 4000, meteringType: "Net Metering" },
        { type: "Rooftop", capacity: 1000, meteringType: "Zero Export" },
      ],
      inverters: [
        { type: "Central Inverter", rating: 1000, quantity: 4 },
        { type: "String Inverter", rating: 100, quantity: 10 },
      ],
      stringCombiners: 60,
      dcCableSpec: "4 / 6 Sqmm Cu",
      acCableSpec: "3.5C 300 Sqmm Al",
      mainAcCableSpec: "3.5C 630 Sqmm Al",
      earthingPoints: 80,
      lightningArrestors: 32,
      cableTrenchLength: 2000,
    },
  },
];

const CUSTOM_TEMPLATES_KEY = "boq_custom_templates";

export const getCustomTemplates = (): BOQTemplate[] => {
  try {
    const stored = localStorage.getItem(CUSTOM_TEMPLATES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveCustomTemplate = (template: BOQTemplate): void => {
  const existing = getCustomTemplates();
  const updated = [...existing.filter((t) => t.id !== template.id), template];
  localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(updated));
};

export const deleteCustomTemplate = (templateId: string): void => {
  const existing = getCustomTemplates();
  const updated = existing.filter((t) => t.id !== templateId);
  localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(updated));
};

export const getAllTemplates = (): BOQTemplate[] => {
  return [...defaultTemplates, ...getCustomTemplates()];
};
