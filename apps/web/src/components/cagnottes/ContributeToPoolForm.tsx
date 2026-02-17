import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet } from "lucide-react";

type ContributeToPoolFormProps = {
  amount: string;
  message: string;
  balance: number;
  onAmountChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onSubmit: () => void;
};

const quickAmounts = [10000, 25000, 50000, 100000];

const ContributeToPoolForm = ({
  amount,
  message,
  balance,
  onAmountChange,
  onMessageChange,
  onSubmit,
}: ContributeToPoolFormProps) => {
  const parsedAmount = amount ? parseFloat(amount) : 0;
  const hasAmount = amount.trim().length > 0 && parsedAmount > 0;

  return (
    <div className="space-y-4">
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
              onChange={(e) => onAmountChange(e.target.value)}
              className="text-lg h-14"
            />
          </div>

          <div className="space-y-2">
            <Label>Montants rapides</Label>
            <div className="grid grid-cols-2 gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  onClick={() => onAmountChange(quickAmount.toString())}
                  className="h-12"
                >
                  {quickAmount.toLocaleString()} F
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message (optionnel)</Label>
            <Input
              id="message"
              placeholder="Laissez un message..."
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card border-0 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Votre solde actuel</p>
            <p className="text-lg font-bold text-foreground">
              {balance.toLocaleString()} F
            </p>
          </div>
        </CardContent>
      </Card>

      <Button
        className="w-full"
        size="lg"
        onClick={onSubmit}
      >
        Contribuer {hasAmount && `${parsedAmount.toLocaleString()} F`}
      </Button>
    </div>
  );
};

export default ContributeToPoolForm;

