import { Card } from "@/components/ui/card";
import type { ComponentType } from "react";

type Action = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  path: string;
  color: string;
};

type QuickActionsProps = {
  actions: Action[];
  onNavigate: (path: string) => void;
};

const QuickActions = ({ actions, onNavigate }: QuickActionsProps) => {
  return (
    <div className="sticky top-24 z-50 px-6 -mt-12 bg-background pt-2">
      <Card className="p-6 shadow-card border-0">
        <div className="grid grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => onNavigate(action.path)}
                className="flex flex-col items-center gap-3 group"
              >
                <div
                  className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center shadow-soft transition-transform group-hover:scale-110`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-foreground">{action.label}</span>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default QuickActions;

