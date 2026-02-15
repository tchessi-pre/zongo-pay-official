import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, TrendingUp, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Header from "@/components/Header";

const CagnotteDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - sera remplacé par de vraies données
  const cagnotte = {
    id: id,
    name: "Voyage à Kpalimé",
    target: 500000,
    current: 320000,
    participants: [
      { name: "Kofi A.", amount: 50000, date: "2024-01-15" },
      { name: "Ama B.", amount: 75000, date: "2024-01-14" },
      { name: "Kwame C.", amount: 100000, date: "2024-01-12" },
      { name: "Efua D.", amount: 45000, date: "2024-01-10" },
      { name: "Yao E.", amount: 50000, date: "2024-01-08" },
    ],
    deadline: "2024-06-30",
    color: "from-orange-500 to-amber-500",
    description: "Épargne collective pour notre voyage de fin d'année à Kpalimé",
    createdBy: "Kofi A.",
    createdDate: "2024-01-05"
  };

  const progress = (cagnotte.current / cagnotte.target) * 100;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header
        containerClassName={`sticky top-0 z-50 bg-gradient-to-br ${cagnotte.color} rounded-b-[2rem] p-6 text-white`}
        onBack={() => navigate("/cagnottes")}
        profileInitials={(JSON.parse(localStorage.getItem("user") || "{}")?.firstName?.[0] || "U").toUpperCase()}
        onProfileClick={() => navigate("/profile")}
      >
        <div className="space-y-2 mt-4">
          <h1 className="text-2xl font-bold">{cagnotte.name}</h1>
          <p className="text-white/90 text-sm">{cagnotte.description}</p>
        </div>
      </Header>

      {/* Montants */}
      <div className="p-6 space-y-4">
        <Card className="shadow-card border-0">
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-muted-foreground">Collecté</p>
                <p className="text-3xl font-bold text-foreground">
                  {cagnotte.current.toLocaleString()} F
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Objectif</p>
                <p className="text-xl font-semibold text-foreground">
                  {cagnotte.target.toLocaleString()} F
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

        {/* Infos */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="shadow-card border-0">
            <CardContent className="pt-4 pb-4 text-center">
              <Users className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{cagnotte.participants.length}</p>
              <p className="text-xs text-muted-foreground">Participants</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardContent className="pt-4 pb-4 text-center">
              <Target className="h-5 w-5 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {((cagnotte.target - cagnotte.current) / 1000).toFixed(0)}k
              </p>
              <p className="text-xs text-muted-foreground">Restant</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardContent className="pt-4 pb-4 text-center">
              <Calendar className="h-5 w-5 text-accent mx-auto mb-2" />
              <p className="text-sm font-bold text-foreground">30 Jun</p>
              <p className="text-xs text-muted-foreground">Échéance</p>
            </CardContent>
          </Card>
        </div>

        {/* Contributions */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              Contributions récentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cagnotte.participants.map((participant, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                    {participant.name.split(' ')[0][0]}{participant.name.split(' ')[1][0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{participant.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(participant.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long'
                    })}
                  </p>
                </div>
                <p className="font-bold text-success">
                  +{participant.amount.toLocaleString()} F
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <Button
            className="w-full"
            size="lg"
            variant="default"
            onClick={() => navigate(`/cagnottes/${id}/contribute`)}
          >
            Contribuer maintenant
          </Button>
          <Button
            className="w-full"
            size="lg"
            variant="outline"
            onClick={() => navigate(`/cagnottes/${id}/invite`)}
          >
            Inviter des participants
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CagnotteDetails;
