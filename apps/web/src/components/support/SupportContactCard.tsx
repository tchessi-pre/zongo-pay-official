import { Card } from "@/components/ui/card";
import type { ElementType } from "react";

type SupportContactCardProps = {
  icon: ElementType;
  label: string;
  description: string;
  action?: string;
};

const handleAction = (action?: string) => {
  if (!action) return;
  if (action.startsWith("tel:") || action.startsWith("mailto:")) {
    window.location.href = action;
  }
};

const SupportContactCard = ({ icon: Icon, label, description, action }: SupportContactCardProps) => {
  return (
    <Card
      className="p-4 flex items-center gap-4 shadow-soft hover:shadow-card transition-shadow cursor-pointer border-0"
      onClick={() => handleAction(action)}
    >
      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <p className="font-semibold text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
};

export default SupportContactCard;

