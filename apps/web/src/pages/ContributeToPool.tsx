import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import { getProfileInitials } from "@/lib/utils";

const ContributeToPool = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  // Mock data
  const cagnotte = {
    id: id,
    name: "Voyage à Kpalimé",
    target: 500000,
    current: 320000,
    color: "from-orange-500 to-amber-500",
  };

  const progress = (cagnotte.current / cagnotte.target) * 100;

  const quickAmounts = [10000, 25000, 50000, 100000];

  const handleContribute = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Montant invalide",
        description: "Veuillez entrer un montant valide",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Contribution réussie !",
      description: `Vous avez contribué ${parseFloat(amount).toLocaleString()} F à la cagnotte`,
    });

    setTimeout(() => {
      navigate(`/cagnottes/${id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header
        title="Contribuer maintenant"
        variant="gradient"
        className="sticky top-0 z-50 rounded-b-[2rem]"
        onBack={() => navigate(`/cagnottes/${id}`)}
        profileInitials={getProfileInitials()}
        onProfileClick={() => navigate("/profile")}
      >
        <p className="text-white/90 text-sm mt-2">{cagnotte.name}</p>
      </Header>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Progress Card */}
        <Card className="shadow-card border-0">
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-muted-foreground">Collecté</p>
                <p className="text-2xl font-bold text-foreground">
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

        {/* Amount Input */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wallet className="h-5 w-5 text-primary" />
              Montant de la contribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Montant (F CFA)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Entrez le montant"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg h-14"
              />
            </div>

            {/* Quick amounts */}
            <div className="space-y-2">
              <Label>Montants rapides</Label>
              <div className="grid grid-cols-2 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="h-12"
                  >
                    {quickAmount.toLocaleString()} F
                  </Button>
                ))}
              </div>
            </div>

            {/* Message (optional) */}
            <div className="space-y-2">
              <Label htmlFor="message">Message (optionnel)</Label>
              <Input
                id="message"
                placeholder="Laissez un message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Balance info */}
        <Card className="shadow-card border-0 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Votre solde actuel</p>
              <p className="text-lg font-bold text-foreground">125,000 F</p>
            </div>
          </CardContent>
        </Card>

        {/* Contribute button */}
        <Button
          className="w-full"
          size="lg"
          onClick={handleContribute}
        >
          Contribuer {amount && `${parseFloat(amount).toLocaleString()} F`}
        </Button>
      </div>
    </div>
  );
};

export default ContributeToPool;
