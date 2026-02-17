import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MessageCircle, Clock } from "lucide-react";
import Header from "@/components/header/Header";

const Support = () => {
  const navigate = useNavigate();

  const contactOptions = [
    {
      icon: Phone,
      label: "Appeler le support",
      description: "+225 07 00 00 00 00",
      action: "tel:+2250700000000"
    },
    {
      icon: Mail,
      label: "Envoyer un email",
      description: "support@zongopay.com",
      action: "mailto:support@zongopay.com"
    },
    {
      icon: MessageCircle,
      label: "Chat en direct",
      description: "Discutez avec un conseiller",
      action: "chat"
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header
        title="Contacter le support"
        variant="gradient"
        onBack={() => navigate("/profile")}
      />

      <div className="px-6 py-6 space-y-4">
        <Card className="p-4 border-0 shadow-card bg-primary/5">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">Horaires d'ouverture</p>
              <p className="text-sm text-muted-foreground">Lun - Sam : 8h00 - 20h00</p>
            </div>
          </div>
        </Card>

        <div className="space-y-3 pt-2">
          {contactOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.label}
                className="p-4 flex items-center gap-4 shadow-soft hover:shadow-card transition-shadow cursor-pointer border-0"
                onClick={() => {
                  if (option.action.startsWith("tel:") || option.action.startsWith("mailto:")) {
                    window.location.href = option.action;
                  }
                }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{option.label}</p>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Support;
