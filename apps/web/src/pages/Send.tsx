import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, User, Wallet } from "lucide-react";
import { toast } from "sonner";

const SendMoney = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<"tmoney" | "moov">("tmoney");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Paiement envoyé avec succès !");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 gradient-card text-white p-6 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-2xl font-bold">Envoyer de l'argent</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className="text-white hover:bg-white/10"
          >
            <User className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 space-y-6 animate-fade-in">
        <Card className="p-6 shadow-card border-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Provider Selection */}
            <div className="space-y-2">
              <Label>Opérateur</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setProvider("tmoney")}
                  className={`flex items-center justify-center gap-2 h-14 rounded-xl border-2 transition-all font-semibold ${provider === "tmoney"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-muted bg-muted/30 text-muted-foreground"
                    }`}
                >
                  <Wallet className="w-5 h-5" />
                  T-Money
                </button>
                <button
                  type="button"
                  onClick={() => setProvider("moov")}
                  className={`flex items-center justify-center gap-2 h-14 rounded-xl border-2 transition-all font-semibold ${provider === "moov"
                      ? "border-[hsl(var(--success))] bg-success/10 text-success"
                      : "border-muted bg-muted/30 text-muted-foreground"
                    }`}
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
                onChange={(e) => setRecipient(e.target.value)}
                required
                className="rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Montant (F CFA)</Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="rounded-xl h-16 text-3xl font-bold text-center"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (optionnel)</Label>
              <Textarea
                id="message"
                placeholder="Ajouter un message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-xl resize-none"
                rows={3}
              />
            </div>

            {/* Quick amounts */}
            <div className="space-y-2">
              <Label>Montants rapides</Label>
              <div className="grid grid-cols-3 gap-3">
                {[5000, 10000, 25000].map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    type="button"
                    variant="outline"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="h-12"
                  >
                    {quickAmount.toLocaleString()} F
                  </Button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Envoi en cours..." : "Envoyer"}
              <Send className="ml-2 w-5 h-5" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SendMoney;
