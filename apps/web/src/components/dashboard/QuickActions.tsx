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
    <div className="fixed inset-x-0 bottom-0 z-50 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-t">
      <div className="px-6 py-3">
        <div className="grid grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => onNavigate(action.path)}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={`w-12 h-12 ${action.color} rounded-2xl flex items-center justify-center shadow-soft transition-transform group-hover:scale-110`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-foreground">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;

