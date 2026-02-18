import { useNavigate } from "react-router-dom";
import { FileText, Shield, Scale } from "lucide-react";
import Header from "@/components/header/Header";
import DocumentList from "@/components/terms/DocumentList";
import { Card } from "@/components/ui/card";

const Terms = () => {
  const navigate = useNavigate();

  const documents = [
    {
      icon: FileText,
      label: "Conditions générales d'utilisation",
      description: "Dernière mise à jour : Janvier 2024"
    },
    {
      icon: Shield,
      label: "Politique de confidentialité",
      description: "Protection de vos données"
    },
    {
      icon: Scale,
      label: "Mentions légales",
      description: "Informations juridiques"
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header
        title="Conditions d'utilisation"
        variant="gradient"
        onBack={() => navigate("/profile")}
      />

      <div className="px-6 py-6">
        <DocumentList documents={documents} />

        <Card className="p-6 border-0 shadow-card mt-6">
          <h3 className="font-semibold text-foreground mb-3">À propos de Zongo Pay</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Zongo Pay est une solution de paiement mobile sécurisée qui vous permet d'envoyer et de recevoir
            de l'argent, de payer vos factures et de gérer vos cagnottes en toute simplicité.
            Notre mission est de rendre les services financiers accessibles à tous.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
