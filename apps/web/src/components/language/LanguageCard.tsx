import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { ReactNode } from "react";

type LanguageCardProps = {
  code: string;
  name: string;
  flag: ReactNode;
  selected: boolean;
  onSelect: (code: string) => void;
};

const LanguageCard = ({ code, name, flag, selected, onSelect }: LanguageCardProps) => {
  return (
    <Card
      className={`p-4 flex items-center justify-between cursor-pointer border-0 shadow-soft hover:shadow-card transition-all ${selected ? "ring-2 ring-primary" : ""}`}
      onClick={() => onSelect(code)}
    >
      <div className="flex items-center gap-4">
        <span className="text-2xl">{flag}</span>
        <span className="font-medium text-foreground">{name}</span>
      </div>
      {selected && (
        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
    </Card>
  );
};

export default LanguageCard;

