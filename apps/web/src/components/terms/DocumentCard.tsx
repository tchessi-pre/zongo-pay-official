import { Card } from "@/components/ui/card";
import type { ElementType } from "react";

type DocumentCardProps = {
  icon: ElementType;
  label: string;
  description: string;
};

const DocumentCard = ({ icon: Icon, label, description }: DocumentCardProps) => {
  return (
    <Card className="p-4 flex items-center gap-4 shadow-soft hover:shadow-card transition-shadow cursor-pointer border-0">
      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
};

export default DocumentCard;

