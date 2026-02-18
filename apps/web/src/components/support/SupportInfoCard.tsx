import { Card } from "@/components/ui/card";
import type { ElementType } from "react";

type SupportInfoCardProps = {
  icon: ElementType;
  title: string;
  subtitle: string;
};

const SupportInfoCard = ({ icon: Icon, title, subtitle }: SupportInfoCardProps) => {
  return (
    <Card className="p-4 border-0 shadow-card bg-primary/5">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-primary" />
        <div>
          <p className="font-medium text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </Card>
  );
};

export default SupportInfoCard;

