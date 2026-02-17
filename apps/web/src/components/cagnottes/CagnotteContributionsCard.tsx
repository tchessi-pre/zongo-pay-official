import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Participant = {
  name: string;
  amount: number;
  date: string;
};

type CagnotteContributionsCardProps = {
  participants: Participant[];
};

const CagnotteContributionsCard = ({ participants }: CagnotteContributionsCardProps) => {
  const formatInitials = (fullName: string) => {
    const parts = fullName.split(" ").filter(Boolean);
    const first = parts[0]?.[0] ?? "";
    const second = parts[1]?.[0] ?? "";
    return `${first}${second}`.toUpperCase();
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long" });

  return (
    <Card className="shadow-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-primary" />
          Contributions récentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {participants.map((participant, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                {formatInitials(participant.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{participant.name}</p>
              <p className="text-xs text-muted-foreground">{formatDate(participant.date)}</p>
            </div>
            <p className="font-bold text-success">+{participant.amount.toLocaleString()} F</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CagnotteContributionsCard;

