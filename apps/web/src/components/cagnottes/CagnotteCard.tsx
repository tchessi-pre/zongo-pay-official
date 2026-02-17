import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, TrendingUp } from "lucide-react";

export type Cagnotte = {
  id: number;
  name: string;
  target: number;
  current: number;
  participants: number;
  color: string;
};

type CagnotteCardProps = {
  cagnotte: Cagnotte;
  onClick: () => void;
};

const CagnotteCard = ({ cagnotte, onClick }: CagnotteCardProps) => {
  const progress = (cagnotte.current / cagnotte.target) * 100;

  return (
    <Card
      className="p-6 shadow-card border-0 hover:shadow-button transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-1">{cagnotte.name}</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{cagnotte.participants} participants</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>{progress.toFixed(0)}%</span>
            </div>
          </div>
        </div>
        <div className={`w-12 h-12 ${cagnotte.color} rounded-2xl flex items-center justify-center shadow-soft`}>
          <Users className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-foreground">
            {cagnotte.current.toLocaleString("fr-FR")} F CFA
          </span>
          <span className="text-muted-foreground">
            sur {cagnotte.target.toLocaleString("fr-FR")} F CFA
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CagnotteCard;

