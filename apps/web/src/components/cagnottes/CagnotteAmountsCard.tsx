import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type CagnotteAmountsCardProps = {
  current: number;
  target: number;
};

const CagnotteAmountsCard = ({ current, target }: CagnotteAmountsCardProps) => {
  const progress = (current / target) * 100;

  return (
    <Card className="shadow-card border-0">
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-muted-foreground">Collecté</p>
            <p className="text-3xl font-bold text-foreground">
              {current.toLocaleString()} F
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Objectif</p>
            <p className="text-xl font-semibold text-foreground">
              {target.toLocaleString()} F
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-muted-foreground text-right">
            {progress.toFixed(1)}% atteint
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CagnotteAmountsCard;

