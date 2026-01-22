import { z } from "zod";

export const systemSplitSchema = z.object({
  type: z.string().min(1, "Type is required").max(100, "Type must be less than 100 characters"),
  capacity: z.number().min(1, "Capacity must be at least 1 kW").max(100000, "Capacity cannot exceed 100,000 kW"),
  meteringType: z.enum(["Net Metering", "Zero Export"], {
    errorMap: () => ({ message: "Please select a metering type" }),
  }),
});

export const inverterSchema = z.object({
  type: z.string().min(1, "Inverter type is required").max(100, "Type must be less than 100 characters"),
  rating: z.number().min(1, "Rating must be at least 1 kW").max(10000, "Rating cannot exceed 10,000 kW"),
  quantity: z.number().min(1, "Quantity must be at least 1").max(1000, "Quantity cannot exceed 1,000"),
});

export const boqFormSchema = z.object({
  // Client Info
  clientName: z.string().min(1, "Client name is required").max(200, "Client name must be less than 200 characters"),
  location: z.string().min(1, "Location is required").max(300, "Location must be less than 300 characters"),

  // System Config
  totalCapacity: z.number().min(1, "Total capacity must be at least 1 kW").max(100000, "Total capacity cannot exceed 100,000 kW"),
  moduleWattage: z.number().min(100, "Module wattage must be at least 100 Wp").max(1000, "Module wattage cannot exceed 1,000 Wp"),
  moduleType: z.string().min(1, "Module type is required").max(100, "Module type must be less than 100 characters"),

  // System Splits
  systemSplits: z.array(systemSplitSchema).min(1, "At least one system split is required"),

  // Inverters
  inverters: z.array(inverterSchema).min(1, "At least one inverter is required"),

  // Equipment
  stringCombiners: z.number().min(0, "String combiners cannot be negative").max(1000, "String combiners cannot exceed 1,000"),
  dcCableSpec: z.string().min(1, "DC cable spec is required").max(100, "DC cable spec must be less than 100 characters"),
  acCableSpec: z.string().min(1, "AC cable spec is required").max(100, "AC cable spec must be less than 100 characters"),
  mainAcCableSpec: z.string().min(1, "Main AC cable spec is required").max(100, "Main AC cable spec must be less than 100 characters"),
  earthingPoints: z.number().min(1, "At least 1 earthing point is required").max(1000, "Earthing points cannot exceed 1,000"),
  lightningArrestors: z.number().min(0, "Lightning arrestors cannot be negative").max(100, "Lightning arrestors cannot exceed 100"),
  cableTrenchLength: z.number().min(0, "Cable trench length cannot be negative").max(100000, "Cable trench length cannot exceed 100,000 m"),
});

export type BOQFormData = z.infer<typeof boqFormSchema>;
