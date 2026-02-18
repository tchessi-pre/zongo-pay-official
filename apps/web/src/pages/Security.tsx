import { useNavigate } from "react-router-dom";
import { Lock, Fingerprint, Smartphone, ChevronRight } from "lucide-react";
import { useState } from "react";
import Header from "@/components/header/Header";
import SettingToggleCard from "@/components/security/SettingToggleCard";
import SettingNavCard from "@/components/security/SettingNavCard";

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
        <SettingToggleCard
          icon={Fingerprint}
          title="Authentification biométrique"
          description="Face ID / Empreinte digitale"
          checked={biometricEnabled}
          onCheckedChange={setBiometricEnabled}
        />

        <SettingToggleCard
          icon={Smartphone}
          title="Vérification en 2 étapes"
          description="SMS de confirmation"
          checked={twoFactorEnabled}
          onCheckedChange={setTwoFactorEnabled}
        />

        <div className="pt-4 space-y-2">
          {securityOptions.map((option) => (
            <SettingNavCard
              key={option.label}
              icon={option.icon}
              label={option.label}
              description={option.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Security;
