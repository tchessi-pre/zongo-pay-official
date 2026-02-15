import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Info, type LucideIcon } from "lucide-react";
import Header from "@/components/Header";

const HelpDetail = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const helpContent: Record<string, { title: string; icon: string; sections: Array<{ title: string; icon: LucideIcon; content: string }> }> = {
    "send-money": {
      title: "Envoyer de l'argent",
      icon: "💸",
      sections: [
        {
          title: "Comment envoyer de l'argent",
          icon: CheckCircle2,
          content: "1. Ouvrez Zongo Pay et allez à la section Envoyer\n2. Entrez le numéro du destinataire\n3. Confirmez le montant\n4. Validez avec votre code PIN\n5. L'argent est transféré instantanément",
        },
        {
          title: "Limites de transfert",
          icon: AlertCircle,
          content: "Les limites quotidiennes dépendent de votre niveau de vérification :\n• Compte standard : 500 000 F CFA\n• Compte vérifié : 5 000 000 F CFA",
        },
        {
          title: "Frais de transfert",
          icon: Info,
          content: "Les frais de transfert varient selon le montant :\n• Jusqu'à 100 000 F CFA : 500 F\n• 100 000 - 500 000 F CFA : 1%\n• Plus de 500 000 F CFA : nous consulter",
        },
      ],
    },
    "qr-payments": {
      title: "Paiements QR",
      icon: "📱",
      sections: [
        {
          title: "Comment scanner un QR code",
          icon: CheckCircle2,
          content: "1. Appuyez sur l'icône Scan en bas de l'écran\n2. Pointez votre caméra vers le QR code\n3. Appuyez sur la notification qui s'affiche\n4. Confirmez le paiement\n5. Entrez votre code PIN",
        },
        {
          title: "Générer votre QR code",
          icon: Info,
          content: "Pour générer votre propre QR code :\n1. Allez à Recevoir\n2. Appuyez sur 'Générer QR code'\n3. Choisissez le montant (ou laissez vide)\n4. Partagez le QR avec vos clients",
        },
      ],
    },
    "pools": {
      title: "Cagnottes",
      icon: "👥",
      sections: [
        {
          title: "Créer une cagnotte",
          icon: CheckCircle2,
          content: "1. Allez à la section Cagnottes\n2. Appuyez sur 'Créer une cagnotte'\n3. Donnez un nom et une description\n4. Fixez l'objectif d'épargne\n5. Invitez des participants",
        },
        {
          title: "Contribuer à une cagnotte",
          icon: Info,
          content: "Pour contribuer à une cagnotte :\n1. Cherchez la cagnotte dans votre liste\n2. Appuyez sur 'Contribuer'\n3. Entrez votre montant\n4. Confirmez l'opération",
        },
      ],
    },
    "payment-methods": {
      title: "Moyens de paiement",
      icon: "💳",
      sections: [
        {
          title: "Ajouter un moyen de paiement",
          icon: CheckCircle2,
          content: "1. Allez aux Paramètres du compte\n2. Cliquez sur 'Moyens de paiement'\n3. Appuyez sur 'Ajouter un moyen'\n4. Choisissez Orange Money, MTN Mobile Money ou Banque\n5. Complétez vos informations",
        },
        {
          title: "Moyens acceptés",
          icon: Info,
          content: "Zongo Pay accepte :\n• Orange Money\n• MTN Mobile Money\n• Virement bancaire\n• Cartes bancaires (bientôt)",
        },
      ],
    },
    "security": {
      title: "Sécurité",
      icon: "🔒",
      sections: [
        {
          title: "Protéger votre compte",
          icon: CheckCircle2,
          content: "1. Activez l'authentification biométrique\n2. Utilisez un code PIN fort\n3. Ne partagez jamais votre code PIN\n4. Activez la vérification en 2 étapes\n5. Vérifiez régulièrement vos transactions",
        },
        {
          title: "En cas de doute",
          icon: AlertCircle,
          content: "Si vous pensez que votre compte a été compromis :\n1. Changez immédiatement votre code PIN\n2. Contactez le support\n3. N'effectuez aucune transaction\n4. Vérifiez vos transactions récentes",
        },
      ],
    },
    "faq": {
      title: "Questions fréquentes",
      icon: "❓",
      sections: [
        {
          title: "Combien de temps pour un transfert ?",
          icon: Info,
          content: "Les transferts sont instantanés vers tous les opérateurs partenaires. Si vous avez du retard, contactez le support.",
        },
        {
          title: "Comment réinitialiser mon code PIN ?",
          icon: Info,
          content: "1. Allez à Paramètres > Sécurité\n2. Cliquez sur 'Changer le code PIN'\n3. Répondez à vos questions de sécurité\n4. Créez un nouveau code PIN",
        },
        {
          title: "Pouvez-vous récupérer de l'argent transféré par erreur ?",
          icon: AlertCircle,
          content: "Oui, mais il faut agir rapidement. Contactez le support dans les 24 heures avec la preuve de votre transfert.",
        },
      ],
    },
  };

  const content = helpContent[category || ""];

  if (!content) {
    return (
      <div className="min-h-screen bg-background pb-8">
        <Header title="Aide non trouvée" variant="gradient" onBack={() => navigate("/help")} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header title={content.title} variant="gradient" onBack={() => navigate("/help")} />

      <div className="px-6 py-6 space-y-4">
        {content.sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} className="p-6 border-0 shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{section.title}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}

        <Card className="p-6 border-0 shadow-card bg-primary/5 mt-6">
          <p className="text-sm text-muted-foreground mb-4">Vous ne trouvez pas la réponse ?</p>
          <Button
            onClick={() => navigate("/support")}
            className="w-full"
          >
            Contacter le support
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default HelpDetail;
