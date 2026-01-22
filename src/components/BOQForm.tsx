import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { BOQData, defaultBOQData } from "@/types/boq";
import { TemplateSelector } from "@/components/TemplateSelector";
import { boqFormSchema, BOQFormData } from "@/lib/boqValidation";

interface BOQFormProps {
  onSubmit: (data: BOQData) => void;
}

export const BOQForm = ({ onSubmit }: BOQFormProps) => {
  const form = useForm<BOQFormData>({
    resolver: zodResolver(boqFormSchema),
    defaultValues: defaultBOQData,
    mode: "onBlur",
  });

  const {
    fields: systemSplitFields,
    append: appendSystemSplit,
    remove: removeSystemSplit,
  } = useFieldArray({
    control: form.control,
    name: "systemSplits",
  });

  const {
    fields: inverterFields,
    append: appendInverter,
    remove: removeInverter,
  } = useFieldArray({
    control: form.control,
    name: "inverters",
  });

  const loadTemplate = (templateData: Partial<BOQData>) => {
    Object.entries(templateData).forEach(([key, value]) => {
      form.setValue(key as keyof BOQFormData, value as any, { shouldValidate: true });
    });
  };

  const handleFormSubmit = (data: BOQFormData) => {
    onSubmit(data as BOQData);
  };

  const totalModules = Math.ceil(
    (form.watch("totalCapacity") * 1000) / form.watch("moduleWattage")
  );

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
          <TemplateSelector currentData={form.getValues() as BOQData} onLoadTemplate={loadTemplate} />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="container max-w-4xl mx-auto px-6 py-10 space-y-8">
          {/* Client Information */}
          <div className="bg-card rounded-xl card-elevated p-6 animate-slide-up">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Client Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Kishore Exports" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> Location
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Martur, Ongole Dist., AP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* System Configuration */}
          <div className="bg-card rounded-xl card-elevated p-6 animate-slide-up stagger-1">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-primary" />
              System Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="totalCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Zap className="w-4 h-4" /> Total Capacity (kW)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="moduleWattage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Module Wattage (Wp)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="100"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="moduleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Module Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Topcon Bifacial Tier-1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Calculated Modules: <span className="font-mono font-semibold text-foreground">{isNaN(totalModules) ? 0 : totalModules} Nos</span>
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
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendSystemSplit({ type: "Ground Mount", capacity: 100, meteringType: "Net Metering" })}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Split
              </Button>
            </div>
            {form.formState.errors.systemSplits?.root && (
              <p className="text-sm font-medium text-destructive mb-4">
                {form.formState.errors.systemSplits.root.message}
              </p>
            )}
            <div className="space-y-4">
              {systemSplitFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg border border-border">
                  <FormField
                    control={form.control}
                    name={`systemSplits.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Rooftop" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`systemSplits.${index}.capacity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity (kW)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`systemSplits.${index}.meteringType`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Metering Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Net Metering">Net Metering</SelectItem>
                            <SelectItem value="Zero Export">Zero Export</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeSystemSplit(index)}
                      disabled={systemSplitFields.length <= 1}
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
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendInverter({ type: "String Inverter", rating: 100, quantity: 1 })}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Inverter
              </Button>
            </div>
            {form.formState.errors.inverters?.root && (
              <p className="text-sm font-medium text-destructive mb-4">
                {form.formState.errors.inverters.root.message}
              </p>
            )}
            <div className="space-y-4">
              {inverterFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg border border-border">
                  <FormField
                    control={form.control}
                    name={`inverters.${index}.type`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-1">
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., String Inverter" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`inverters.${index}.rating`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating (kW)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`inverters.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeInverter(index)}
                      disabled={inverterFields.length <= 1}
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
              <FormField
                control={form.control}
                name="stringCombiners"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>String Combiners (Qty)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dcCableSpec"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DC Cable Spec</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 4 / 6 Sqmm Cu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acCableSpec"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AC Cable Spec</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 3.5C 70 / 120 Sqmm Al" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mainAcCableSpec"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main AC Cable Spec</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 3.5C 240 Sqmm Al" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Protection & Civil */}
          <div className="bg-card rounded-xl card-elevated p-6 animate-slide-up stagger-5">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Protection & Civil Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="earthingPoints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Earthing Points (DDR)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lightningArrestors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lightning Arrestors</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cableTrenchLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cable Trench Length (m)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
      </Form>
    </div>
  );
};
