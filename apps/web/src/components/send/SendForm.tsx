import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2, Send as SendIcon, Wallet } from "lucide-react";

type Provider = "tmoney" | "moov";

type SendFormProps = {
  provider: Provider;
  recipient: string;
  amount: string;
  loading: boolean;
  onProviderChange: (provider: Provider) => void;
  onRecipientChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onQuickAmountSelect: (value: number) => void;
  onSubmit: (event: React.FormEvent) => void;
};

const QUICK_AMOUNTS = [5000, 10000, 25000];

const SendForm = ({
  provider,
  recipient,
  amount,
  loading,
  onProviderChange,
  onRecipientChange,
  onAmountChange,
  onQuickAmountSelect,
  onSubmit,
}: SendFormProps) => {
  const numericAmount = Number(amount);
  const hasAmount = amount.trim().length > 0;
  const isAmountValid = Number.isFinite(numericAmount) && numericAmount > 0;
  const hasRecipient = recipient.trim().length > 0;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Card className="p-6 shadow-card border-0">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Opérateur</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onProviderChange("tmoney")}
                disabled={loading}
                className={`flex items-center justify-center gap-2 h-14 rounded-xl border-2 transition-all font-semibold ${provider === "tmoney"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted bg-muted/30 text-muted-foreground"
                  } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                <Wallet className="w-5 h-5" />
                T-Money
              </button>
              <button
                type="button"
                onClick={() => onProviderChange("moov")}
                disabled={loading}
                className={`flex items-center justify-center gap-2 h-14 rounded-xl border-2 transition-all font-semibold ${provider === "moov"
                  ? "border-[hsl(var(--success))] bg-success/10 text-success"
                  : "border-muted bg-muted/30 text-muted-foreground"
                  } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                <Wallet className="w-5 h-5" />
                Moov Money
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">Destinataire</Label>
            <Input
              id="recipient"
              type="tel"
              placeholder="Numéro de téléphone ou nom"
              value={recipient}
              onChange={(e) => onRecipientChange(e.target.value)}
              required
              className="rounded-xl h-12"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Montant (F CFA)</Label>
            <div className="relative space-y-1">
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => onAmountChange(e.target.value)}
                required
                className="rounded-xl h-16 text-3xl font-bold text-center"
                disabled={loading}
                min={0}
              />
              {hasAmount && (
                <p className="text-xs text-muted-foreground text-right">
                  {isAmountValid
                    ? `${numericAmount.toLocaleString("fr-FR")} F CFA`
                    : "Montant invalide"}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Montants rapides</Label>
            <div className="grid grid-cols-3 gap-3">
              {QUICK_AMOUNTS.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  type="button"
                  variant="outline"
                  onClick={() => onQuickAmountSelect(quickAmount)}
                  className="h-12"
                  disabled={loading}
                >
                  {quickAmount.toLocaleString()} F
                </Button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={loading || !hasRecipient || !isAmountValid}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                Envoyer
                <SendIcon className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SendForm;
