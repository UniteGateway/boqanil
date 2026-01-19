import {
  Sun,
  Zap,
  Cable,
  Gauge,
  Building,
  Wrench,
  LayoutGrid,
  Calculator,
  Leaf,
  Battery,
  Printer
} from "lucide-react";
import { BOQSection } from "@/components/BOQSection";
import { BOQTable } from "@/components/BOQTable";
import { StatCard } from "@/components/StatCard";
import { ChecklistSection } from "@/components/ChecklistSection";
import { Button } from "@/components/ui/button";

const Index = () => {
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="solar-gradient py-12 px-6 print:py-6 print:bg-primary">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary-foreground/20 rounded-xl backdrop-blur-sm print:bg-transparent">
                <Sun className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                  Solar Power Plant BOQ
                </h1>
                <p className="text-primary-foreground/80 mt-1">
                  Bill of Quantities — 550 kW Commercial Installation
                </p>
              </div>
            </div>
            <Button
              onClick={handlePrint}
              variant="secondary"
              className="print:hidden gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Project Summary Stats */}
      <div className="container max-w-6xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
          <StatCard
            label="Total Capacity"
            value="550 kW"
            subValue="DC Power"
            icon={Zap}
          />
          <StatCard
            label="Module Type"
            value="610 Wp"
            subValue="Topcon Bifacial Tier-1"
            icon={LayoutGrid}
          />
          <StatCard
            label="Total Modules"
            value="902"
            subValue="Nos (approx)"
            icon={Calculator}
          />
          <StatCard
            label="Configuration"
            value="3-Split"
            subValue="100kW + 250kW + 200kW"
            icon={Battery}
          />
        </div>
      </div>

      {/* System Split Info */}
      <div className="container max-w-6xl mx-auto px-6 mt-8">
        <div className="bg-card rounded-lg card-elevated p-6 animate-slide-up stagger-1">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-success" />
            System Configuration Split
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted rounded-lg p-4 border-l-4 border-primary">
              <p className="text-sm text-muted-foreground">Rooftop (2 Sheds)</p>
              <p className="text-xl font-bold text-foreground">100 kW</p>
              <span className="inline-block mt-2 text-xs font-medium px-2 py-1 bg-success/10 text-success rounded-full">
                Net Metering
              </span>
            </div>
            <div className="bg-muted rounded-lg p-4 border-l-4 border-primary">
              <p className="text-sm text-muted-foreground">Ground Mount</p>
              <p className="text-xl font-bold text-foreground">250 kW</p>
              <span className="inline-block mt-2 text-xs font-medium px-2 py-1 bg-success/10 text-success rounded-full">
                Net Metering
              </span>
            </div>
            <div className="bg-muted rounded-lg p-4 border-l-4 border-accent">
              <p className="text-sm text-muted-foreground">Ground Mount</p>
              <p className="text-xl font-bold text-foreground">200 kW</p>
              <span className="inline-block mt-2 text-xs font-medium px-2 py-1 bg-accent/20 text-accent-foreground rounded-full">
                Zero Export
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main BOQ Sections */}
      <main className="container max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Section 1: PV Modules & Mounting */}
        <BOQSection
          title="1. PV Modules & Mounting"
          icon={LayoutGrid}
          className="animate-slide-up stagger-2"
        >
          <BOQTable
            headers={["Item", "Specifications", "Qty / Unit"]}
            rows={[
              { item: "PV Modules", specification: "610 Wp Topcon Bifacial Tier-1", quantity: "902 Nos" },
              { item: "Module Mounting – Rooftop", specification: "HDG/Aluminium", quantity: "~100 kW capacity" },
              { item: "Module Mounting – Ground (Net Metering)", specification: "HDG Ground Structure", quantity: "~250 kW" },
              { item: "Module Mounting – Ground (Zero Export)", specification: "HDG Ground Structure", quantity: "~200 kW" },
              { item: "String Combiners DC", specification: "16 Strings / 1 Out", quantity: "~12 Nos" },
            ]}
          />
        </BOQSection>

        {/* Section 2: Inverters & Power Conversion */}
        <BOQSection
          title="2. Inverters & Power Conversion"
          icon={Zap}
          className="animate-slide-up stagger-3"
        >
          <BOQTable
            headers={["Item", "Rating", "Qty"]}
            rows={[
              { item: "String Inverter – Net Metering", specification: "110 kW", quantity: "3 Nos" },
              { item: "String Inverter – Net Metering", specification: "20 kW", quantity: "1 No" },
              { item: "String Inverter – Zero Export", specification: "100 kW", quantity: "2 Nos" },
              { item: "Zero Export Controller / EMS", specification: "Utility Grade", quantity: "1 Set" },
            ]}
          />
          <p className="text-sm text-muted-foreground mt-4 italic">
            * String inverters are chosen to match ~25–30% higher DC than AC for bifacial yield optimization.
          </p>
        </BOQSection>

        {/* Section 3: Electrical BOS */}
        <BOQSection
          title="3. Electrical Balance of System (BOS)"
          icon={Cable}
          className="animate-slide-up stagger-4"
        >
          <BOQTable
            headers={["Item", "Description"]}
            rows={[
              { item: "DC Cables", specification: "4 / 6 Sqmm Cu (UV-resistant)" },
              { item: "AC Cables", specification: "3.5C 70 / 120 Sqmm Al for inverter to LT Panel" },
              { item: "Main AC Cables (100 m)", specification: "3.5C 240 Sqmm Al" },
              { item: "DC Disconnects", specification: "Per inverter string division" },
              { item: "LT Panel with Protections", specification: "Net Metering & Zero Export Panels" },
              { item: "Earthing System", specification: "20+ DDR with Chemical Earthing" },
              { item: "Lightning Arrestors (LA)", specification: "ESE Type – 2 Nos" },
              { item: "Cable Trays & Conduits", specification: "GI Cable Trays + RCC Trench" },
            ]}
          />
        </BOQSection>

        {/* Section 4: Net Metering & Zero Export */}
        <BOQSection
          title="4. Net Metering & Zero Export Compliance"
          icon={Gauge}
          className="animate-slide-up stagger-5"
        >
          <BOQTable
            headers={["Item", "Qty"]}
            rows={[
              { item: "Bi-Directional Net Meter", quantity: "1 Set" },
              { item: "Synchronization Panel", quantity: "1 Set" },
              { item: "Zero Export Meter + Limit Controller", quantity: "1 Set" },
              { item: "Remote Monitoring (Plant + Inverters + EMS)", quantity: "1 System" },
            ]}
          />
        </BOQSection>

        {/* Section 5: Civil & Site Work */}
        <BOQSection
          title="5. Civil & Site Work"
          icon={Building}
          className="animate-slide-up stagger-6"
        >
          <BOQTable
            headers={["Item", "Details"]}
            rows={[
              { item: "Ground Structure Foundation", specification: "RCC Pedestal / Micro Pile" },
              { item: "Solar Yard Fencing", specification: "Per site boundary" },
              { item: "Inverter / Control Room", specification: "1 No (if required)" },
              { item: "Cable Duct / Trench", specification: "100 mts Covered" },
            ]}
          />
        </BOQSection>

        {/* Section 6: Installation & Project Execution */}
        <ChecklistSection
          title="6. Installation & Project Execution"
          icon={Wrench}
          className="animate-slide-up"
          items={[
            "Site Mobilization",
            "Module & BOS Installation",
            "Cable Laying & Termination",
            "Earthing & Lightning Protection",
            "Panel / Inverter Wiring",
            "Net Metering & Zero Export Commissioning",
            "Testing, Commissioning & Handover",
            "O&M Manual + As-Built Drawings",
          ]}
        />

        {/* Module Calculation Note */}
        <div className="bg-muted/50 rounded-lg p-6 border border-border animate-slide-up">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            Module Count Calculation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Total DC Capacity</p>
              <p className="font-mono font-semibold text-foreground">550 kW</p>
            </div>
            <div>
              <p className="text-muted-foreground">Module Size</p>
              <p className="font-mono font-semibold text-foreground">610 Wp</p>
            </div>
            <div>
              <p className="text-muted-foreground">Modules Required</p>
              <p className="font-mono font-semibold text-foreground">550,000 / 610 ≈ 902 Nos</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            * You can adjust rounding to 900 or 912 modules depending on string configuration (string size and inverter ratio).
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-6 mt-10">
        <div className="container max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Sun className="w-5 h-5 text-primary" />
            <span className="text-sm">
              550 kW Solar Power Plant — Topcon Bifacial Technology
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
