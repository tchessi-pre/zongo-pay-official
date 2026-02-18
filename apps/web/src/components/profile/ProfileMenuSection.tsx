import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import type { ElementType } from "react";

type MenuItem = {
  icon: ElementType;
  label: string;
  path: string;
  value?: string;
};

type ProfileMenuSectionProps = {
  title: string;
  items: MenuItem[];
  onItemClick: (path: string) => void;
  variant?: "primary" | "muted";
};

const ProfileMenuSection = ({
  title,
  items,
  onItemClick,
  variant = "primary",
}: ProfileMenuSectionProps) => {
  const iconContainerBase =
    variant === "primary"
      ? "bg-primary/10 text-primary"
      : "bg-muted text-muted-foreground";

  const titleClass =
    "text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1 mb-3";

  return (
    <div className="space-y-1">
      <h3 className={titleClass}>{title}</h3>
      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.label}
              className="p-4 flex items-center justify-between shadow-soft hover:shadow-card transition-shadow cursor-pointer border-0"
              onClick={() => onItemClick(item.path)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconContainerBase}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.value && (
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                )}
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export type { MenuItem };
export default ProfileMenuSection;

