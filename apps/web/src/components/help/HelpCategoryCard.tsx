import { Card } from "@/components/ui/card";
import type { ElementType } from "react";
import { ChevronRight } from "lucide-react";

type HelpCategoryCardProps = {
  icon: ElementType;
  label: string;
  description: string;
  onClick?: () => void;
};

const HelpCategoryCard = ({ icon: Icon, label, description, onClick }: HelpCategoryCardProps) => {
  return (
    <Card
      className="p-4 flex items-center justify-between shadow-soft hover:shadow-card transition-shadow cursor-pointer border-0"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </Card>
  );
};

export default HelpCategoryCard;

