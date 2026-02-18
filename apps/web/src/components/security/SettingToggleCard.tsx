import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import type { ElementType } from "react";

type SettingToggleCardProps = {
  icon: ElementType;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
};

const SettingToggleCard = ({ icon: Icon, title, description, checked, onCheckedChange }: SettingToggleCardProps) => {
  return (
    <Card className="p-4 border-0 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <span className="font-medium text-foreground">{title}</span>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
      </div>
    </Card>
  );
};

export default SettingToggleCard;

