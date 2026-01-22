import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  MapPin,
  Zap,
  LayoutGrid,
  Battery,
  Cable,
  Shield,
  Plus,
  Trash2,
  FileText,
  Sun,
} from "lucide-react";
import { BOQData, SystemSplit, Inverter, defaultBOQData } from "@/types/boq";
import { TemplateSelector } from "@/components/TemplateSelector";

interface BOQFormProps {
  onSubmit: (data: BOQData) => void;
}

export const BOQForm = ({ onSubmit }: BOQFormProps) => {
  const [formData, setFormData] = useState<BOQData>(defaultBOQData);

  const updateField = <K extends keyof BOQData>(field: K, value: BOQData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSystemSplit = () => {
    setFormData((prev) => ({
      ...prev,
      systemSplits: [
        ...prev.systemSplits,
        { type: "Ground Mount", capacity: 100, meteringType: "Net Metering" },
      ],
    }));
  };

  const removeSystemSplit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      systemSplits: prev.systemSplits.filter((_, i) => i !== index),
    }));
  };

  const updateSystemSplit = (index: number, field: keyof SystemSplit, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      systemSplits: prev.systemSplits.map((split, i) =>
        i === index ? { ...split, [field]: value } : split
      ),
    }));
  };

  const addInverter = () => {
    setFormData((prev) => ({
      ...prev,
      inverters: [
        ...prev.inverters,
        { type: "String Inverter", rating: 100, quantity: 1 },
      ],
    }));
  };

  const removeInverter = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      inverters: prev.inverters.filter((_, i) => i !== index),
    }));
  };

  const updateInverter = (index: number, field: keyof Inverter, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      inverters: prev.inverters.map((inv, i) =>
        i === index ? { ...inv, [field]: value } : inv
      ),
    }));
  };

  const loadTemplate = (templateData: Partial<BOQData>) => {
    setFormData((prev) => ({
      ...prev,
      ...templateData,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const totalModules = Math.ceil((formData.totalCapacity * 1000) / formData.moduleWattage);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="solar-gradient py-8 px-6">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="p-3 bg-primary-foreground/20 rounded-xl backdrop-blur-sm">
              <Sun className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                Create BOQ
              </h1>
              <p className="text-primary-foreground/80 mt-1">
                Fill in the details to generate your Bill of Quantities
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Template Selector */}
      <div className="container max-w-4xl mx-auto px-6 pt-6">
        <div className="bg-card rounded-xl card-elevated p-4 animate-fade-in">
          <TemplateSelector currentData={formData} onLoadTemplate={loadTemplate} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="container max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Client Information */}
        <div className="bg-card rounded-xl card-elevated p-6 animate-slide-up">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Client Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                placeholder="e.g., Kishore Exports"
                value={formData.clientName}
                onChange={(e) => updateField("clientName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Location
              </Label>
              <Input
                id="location"
                placeholder="e.g., Martur, Ongole Dist., AP"
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* System Configuration */}
        <div className="bg-card rounded-xl card-elevated p-6 animate-slide-up stagger-1">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-primary" />
            System Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="totalCapacity" className="flex items-center gap-1">
                <Zap className="w-4 h-4" /> Total Capacity (kW)
              </Label>
              <Input
                id="totalCapacity"
                type="number"
                min="1"
                value={formData.totalCapacity}
                onChange={(e) => updateField("totalCapacity", Number(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="moduleWattage">Module Wattage (Wp)</Label>
              <Input
                id="moduleWattage"
                type="number"
                min="100"
                value={formData.moduleWattage}
                onChange={(e) => updateField("moduleWattage", Number(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="moduleType">Module Type</Label>
              <Input
                id="moduleType"
                placeholder="e.g., Topcon Bifacial Tier-1"
                value={formData.moduleType}
                onChange={(e) => updateField("moduleType", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Calculated Modules: <span className="font-mono font-semibold text-foreground">{totalModules} Nos</span>
            </p>
          </div>
        </div>

        {/* System Splits */}
        <div className="bg-card rounded-xl card-elevated p-6 animate-slide-up stagger-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Battery className="w-5 h-5 text-primary" />
              System Splits
            </h2>
            <Button type="button" variant="outline" size="sm" onClick={addSystemSplit}>
              <Plus className="w-4 h-4 mr-1" /> Add Split
            </Button>
          </div>
          <div className="space-y-4">
            {formData.systemSplits.map((split, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg border border-border">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Input
                    placeholder="e.g., Rooftop"
                    value={split.type}
                    onChange={(e) => updateSystemSplit(index, "type", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Capacity (kW)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={split.capacity}
                    onChange={(e) => updateSystemSplit(index, "capacity", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Metering Type</Label>
                  <Select
                    value={split.meteringType}
                    onValueChange={(value) => updateSystemSplit(index, "meteringType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Net Metering">Net Metering</SelectItem>
                      <SelectItem value="Zero Export">Zero Export</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => removeSystemSplit(index)}
                    disabled={formData.systemSplits.length <= 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inverters */}
        <div className="bg-card rounded-xl card-elevated p-6 animate-slide-up stagger-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Inverters
            </h2>
            <Button type="button" variant="outline" size="sm" onClick={addInverter}>
              <Plus className="w-4 h-4 mr-1" /> Add Inverter
            </Button>
          </div>
          <div className="space-y-4">
            {formData.inverters.map((inverter, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg border border-border">
                <div className="space-y-2 md:col-span-1">
                  <Label>Type</Label>
                  <Input
                    placeholder="e.g., String Inverter"
                    value={inverter.type}
                    onChange={(e) => updateInverter(index, "type", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rating (kW)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={inverter.rating}
                    onChange={(e) => updateInverter(index, "rating", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={inverter.quantity}
                    onChange={(e) => updateInverter(index, "quantity", Number(e.target.value))}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => removeInverter(index)}
                    disabled={formData.inverters.length <= 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Electrical BOS */}
        <div className="bg-card rounded-xl card-elevated p-6 animate-slide-up stagger-4">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Cable className="w-5 h-5 text-primary" />
            Electrical Balance of System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>String Combiners (Qty)</Label>
              <Input
                type="number"
                min="1"
                value={formData.stringCombiners}
                onChange={(e) => updateField("stringCombiners", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>DC Cable Spec</Label>
              <Input
                placeholder="e.g., 4 / 6 Sqmm Cu"
                value={formData.dcCableSpec}
                onChange={(e) => updateField("dcCableSpec", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>AC Cable Spec</Label>
              <Input
                placeholder="e.g., 3.5C 70 / 120 Sqmm Al"
                value={formData.acCableSpec}
                onChange={(e) => updateField("acCableSpec", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Main AC Cable Spec</Label>
              <Input
                placeholder="e.g., 3.5C 240 Sqmm Al"
                value={formData.mainAcCableSpec}
                onChange={(e) => updateField("mainAcCableSpec", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Protection & Civil */}
        <div className="bg-card rounded-xl card-elevated p-6 animate-slide-up stagger-5">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Protection & Civil Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Earthing Points (DDR)</Label>
              <Input
                type="number"
                min="1"
                value={formData.earthingPoints}
                onChange={(e) => updateField("earthingPoints", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Lightning Arrestors</Label>
              <Input
                type="number"
                min="1"
                value={formData.lightningArrestors}
                onChange={(e) => updateField("lightningArrestors", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Cable Trench Length (m)</Label>
              <Input
                type="number"
                min="1"
                value={formData.cableTrenchLength}
                onChange={(e) => updateField("cableTrenchLength", Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button type="submit" size="lg" className="gap-2 px-8">
            <FileText className="w-5 h-5" />
            Generate BOQ Document
          </Button>
        </div>
      </form>
    </div>
  );
};
