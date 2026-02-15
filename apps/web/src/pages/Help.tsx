import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ChevronRight, Send, QrCode, Users, CreditCard, Shield, HelpCircle } from "lucide-react";
import Header from "@/components/Header";

const Help = () => {
  const navigate = useNavigate();

  const helpCategories = [
    { icon: Send, label: "Envoyer de l'argent", description: "Comment effectuer un transfert" },
    { icon: QrCode, label: "Paiements QR", description: "Scanner et payer avec QR code" },
    { icon: Users, label: "Cagnottes", description: "Créer et gérer des cagnottes" },
    { icon: CreditCard, label: "Moyens de paiement", description: "Ajouter et gérer vos comptes" },
    { icon: Shield, label: "Sécurité", description: "Protéger votre compte" },
    { icon: HelpCircle, label: "Questions fréquentes", description: "Réponses aux questions courantes" },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header title="Centre d'aide" variant="gradient" onBack={() => navigate("/profile")} />

      <div className="px-6 py-6 space-y-3">
        <p className="text-muted-foreground mb-4">Comment pouvons-nous vous aider ?</p>

        {helpCategories.map((category) => {
          const Icon = category.icon;
          const routePaths: Record<string, string> = {
            "Envoyer de l'argent": "/help/send-money",
            "Paiements QR": "/help/qr-payments",
            "Cagnottes": "/help/pools",
            "Moyens de paiement": "/help/payment-methods",
            "Sécurité": "/help/security",
            "Questions fréquentes": "/help/faq",
          };
          return (
            <Card
              key={category.label}
              className="p-4 flex items-center justify-between shadow-soft hover:shadow-card transition-shadow cursor-pointer border-0"
              onClick={() => navigate(routePaths[category.label])}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="font-medium text-foreground">{category.label}</span>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Help;
