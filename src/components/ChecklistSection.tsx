import { LucideIcon, CheckCircle2 } from "lucide-react";

interface ChecklistSectionProps {
  title: string;
  icon: LucideIcon;
  items: string[];
  className?: string;
}

export function ChecklistSection({ title, icon: Icon, items, className = "" }: ChecklistSectionProps) {
  return (
    <section className={`bg-card rounded-lg card-elevated overflow-hidden ${className}`}>
      <div className="solar-gradient px-6 py-4 flex items-center gap-3">
        <div className="p-2 bg-primary-foreground/20 rounded-lg backdrop-blur-sm">
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
        <h2 className="text-lg font-semibold text-primary-foreground">{title}</h2>
      </div>
      <div className="p-6">
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
