import { useNavigate } from "react-router-dom";
import { Send, QrCode, Users, CreditCard, Shield, HelpCircle } from "lucide-react";
import Header from "@/components/header/Header";
import HelpCategoryList from "@/components/help/HelpCategoryList";

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

      <div className="px-6 py-6">
        <p className="text-muted-foreground mb-4">Comment pouvons-nous vous aider ?</p>

        <HelpCategoryList
          categories={helpCategories.map((c) => {
            const routePaths: Record<string, string> = {
              "Envoyer de l'argent": "/help/send-money",
              "Paiements QR": "/help/qr-payments",
              "Cagnottes": "/help/pools",
              "Moyens de paiement": "/help/payment-methods",
              "Sécurité": "/help/security",
              "Questions fréquentes": "/help/faq",
            };
            return {
              ...c,
              onClick: () => navigate(routePaths[c.label]),
            };
          })}
        />
      </div>
    </div>
  );
};

export default Help;
