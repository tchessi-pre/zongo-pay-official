import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type ProfileNotificationsCardProps = {
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

const ProfileNotificationsCard = ({
  enabled,
  onToggle,
}: ProfileNotificationsCardProps) => {
  return (
    <Card className="p-4 shadow-card border-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <span className="font-medium text-foreground">Notifications</span>
            <p className="text-sm text-muted-foreground">Alertes et rappels</p>
          </div>
        </div>
        <Switch checked={enabled} onCheckedChange={onToggle} />
      </div>
    </Card>
  );
};

export default ProfileNotificationsCard;

