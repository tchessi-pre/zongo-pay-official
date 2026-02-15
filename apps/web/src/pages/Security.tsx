import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Shield, Lock, Fingerprint, Smartphone, ChevronRight } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";

const Security = () => {
  const navigate = useNavigate();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const securityOptions = [
    { icon: Lock, label: "Changer le code PIN", description: "Modifier votre code secret", path: "/change-pin" },
    { icon: Lock, label: "Changer le mot de passe", description: "Modifier votre mot de passe", path: "/change-password" },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header
        title="Sécurité et confidentialité"
        variant="gradient"
        onBack={() => navigate("/profile")}
      />

      <div className="px-6 py-6 space-y-4">
        <Card className="p-4 border-0 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Fingerprint className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="font-medium text-foreground">Authentification biométrique</span>
                <p className="text-sm text-muted-foreground">Face ID / Empreinte digitale</p>
              </div>
            </div>
            <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
          </div>
        </Card>

        <Card className="p-4 border-0 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="font-medium text-foreground">Vérification en 2 étapes</span>
                <p className="text-sm text-muted-foreground">SMS de confirmation</p>
              </div>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>
        </Card>

        <div className="pt-4 space-y-2">
          {securityOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.label}
                className="p-4 flex items-center justify-between shadow-soft hover:shadow-card transition-shadow cursor-pointer border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{option.label}</span>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Security;
