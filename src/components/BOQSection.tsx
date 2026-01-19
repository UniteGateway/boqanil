import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface BOQSectionProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
}

export function BOQSection({ title, icon: Icon, children, className = "" }: BOQSectionProps) {
  return (
    <section className={`bg-card rounded-lg card-elevated overflow-hidden ${className}`}>
      <div className="solar-gradient px-6 py-4 flex items-center gap-3">
        <div className="p-2 bg-primary-foreground/20 rounded-lg backdrop-blur-sm">
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
        <h2 className="text-lg font-semibold text-primary-foreground">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </section>
  );
}
