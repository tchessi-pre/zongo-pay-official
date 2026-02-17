import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Calendar } from "lucide-react";

type CagnotteInfoGridProps = {
  participantsCount: number;
  remaining: number;
  deadlineLabel: string;
};

const CagnotteInfoGrid = ({
  participantsCount,
  remaining,
  deadlineLabel,
}: CagnotteInfoGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="shadow-card border-0">
        <CardContent className="pt-4 pb-4 text-center">
          <Users className="h-5 w-5 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{participantsCount}</p>
          <p className="text-xs text-muted-foreground">Participants</p>
        </CardContent>
      </Card>

      <Card className="shadow-card border-0">
        <CardContent className="pt-4 pb-4 text-center">
          <Target className="h-5 w-5 text-success mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">
            {remaining.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">Restant</p>
        </CardContent>
      </Card>

      <Card className="shadow-card border-0">
        <CardContent className="pt-4 pb-4 text-center">
          <Calendar className="h-5 w-5 text-accent mx-auto mb-2" />
          <p className="text-sm font-bold text-foreground">{deadlineLabel}</p>
          <p className="text-xs text-muted-foreground">Échéance</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CagnotteInfoGrid;

