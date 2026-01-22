import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Save, FolderOpen, Trash2, Home, Building2, Factory } from "lucide-react";
import {
  BOQTemplate,
  getAllTemplates,
  saveCustomTemplate,
  deleteCustomTemplate,
  getCustomTemplates,
} from "@/lib/boqTemplates";
import { BOQData } from "@/types/boq";
import { toast } from "sonner";

interface TemplateSelectorProps {
  currentData: BOQData;
  onLoadTemplate: (data: Partial<BOQData>) => void;
}

const typeIcons = {
  residential: Home,
  commercial: Building2,
  industrial: Factory,
  custom: Save,
};

const typeColors = {
  residential: "bg-green-500/10 text-green-600 border-green-200",
  commercial: "bg-blue-500/10 text-blue-600 border-blue-200",
  industrial: "bg-orange-500/10 text-orange-600 border-orange-200",
  custom: "bg-purple-500/10 text-purple-600 border-purple-200",
};

export const TemplateSelector = ({
  currentData,
  onLoadTemplate,
}: TemplateSelectorProps) => {
  const [templates, setTemplates] = useState<BOQTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");

  useEffect(() => {
    setTemplates(getAllTemplates());
  }, []);

  const handleLoadTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      onLoadTemplate(template.data);
      setSelectedTemplate(templateId);
      toast.success(`Loaded template: ${template.name}`);
    }
  };

  const handleSaveTemplate = () => {
    if (!newTemplateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }

    const templateId = `custom-${Date.now()}`;
    const { clientName, location, ...templateData } = currentData;

    const newTemplate: BOQTemplate = {
      id: templateId,
      name: newTemplateName.trim(),
      type: "custom",
      data: templateData,
    };

    saveCustomTemplate(newTemplate);
    setTemplates(getAllTemplates());
    setNewTemplateName("");
    setSaveDialogOpen(false);
    toast.success(`Template "${newTemplateName}" saved successfully`);
  };

  const handleDeleteTemplate = (templateId: string, templateName: string) => {
    deleteCustomTemplate(templateId);
    setTemplates(getAllTemplates());
    if (selectedTemplate === templateId) {
      setSelectedTemplate("");
    }
    toast.success(`Template "${templateName}" deleted`);
  };

  const customTemplates = getCustomTemplates();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <FolderOpen className="w-4 h-4 text-muted-foreground" />
        <Select value={selectedTemplate} onValueChange={handleLoadTemplate}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Load from template..." />
          </SelectTrigger>
          <SelectContent>
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              Residential
            </div>
            {templates
              .filter((t) => t.type === "residential")
              .map((template) => {
                const Icon = typeIcons[template.type];
                return (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-green-600" />
                      {template.name}
                    </div>
                  </SelectItem>
                );
              })}

            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">
              Commercial
            </div>
            {templates
              .filter((t) => t.type === "commercial")
              .map((template) => {
                const Icon = typeIcons[template.type];
                return (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-blue-600" />
                      {template.name}
                    </div>
                  </SelectItem>
                );
              })}

            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">
              Industrial
            </div>
            {templates
              .filter((t) => t.type === "industrial")
              .map((template) => {
                const Icon = typeIcons[template.type];
                return (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-orange-600" />
                      {template.name}
                    </div>
                  </SelectItem>
                );
              })}

            {customTemplates.length > 0 && (
              <>
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">
                  Custom Templates
                </div>
                {customTemplates.map((template) => {
                  const Icon = typeIcons[template.type];
                  return (
                    <SelectItem key={template.id} value={template.id}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-purple-600" />
                        {template.name}
                      </div>
                    </SelectItem>
                  );
                })}
              </>
            )}
          </SelectContent>
        </Select>
      </div>

      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Save className="w-4 h-4" />
            Save as Template
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save as Template</DialogTitle>
            <DialogDescription>
              Save your current configuration as a reusable template. Client
              name and location will not be saved.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="templateName">Template Name</Label>
              <Input
                id="templateName"
                placeholder="e.g., My 500kW Commercial Setup"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={typeColors.custom}>
                Custom Template
              </Badge>
              <Badge variant="secondary">
                {currentData.totalCapacity} kW
              </Badge>
              <Badge variant="secondary">
                {currentData.inverters.length} Inverter(s)
              </Badge>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate}>Save Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {customTemplates.length > 0 && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
              <Trash2 className="w-4 h-4" />
              Manage
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Custom Templates</DialogTitle>
              <DialogDescription>
                Delete custom templates you no longer need.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 py-4">
              {customTemplates.map((template) => (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">{template.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {template.data.totalCapacity} kW
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() =>
                      handleDeleteTemplate(template.id, template.name)
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
