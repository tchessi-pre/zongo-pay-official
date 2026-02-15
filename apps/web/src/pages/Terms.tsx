import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { FileText, Shield, Scale } from "lucide-react";
import Header from "@/components/Header";

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

      <div className="px-6 py-6 space-y-3">
        {documents.map((doc) => {
          const Icon = doc.icon;
          return (
            <Card
              key={doc.label}
              className="p-4 flex items-center gap-4 shadow-soft hover:shadow-card transition-shadow cursor-pointer border-0"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{doc.label}</p>
                <p className="text-sm text-muted-foreground">{doc.description}</p>
              </div>
            </Card>
          );
        })}

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
