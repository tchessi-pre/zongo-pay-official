import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  Phone,
  Mail,
  Shield,
  Globe,
  CreditCard,
  HelpCircle,
  FileText,
  Share2,
  ChevronRight,
} from "lucide-react";
import zongoLogo from "@/assets/zongo-logo.png";
import { useState } from "react";
import Header from "@/components/header/Header";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileContactCard from "@/components/profile/ProfileContactCard";
import ProfileNotificationsCard from "@/components/profile/ProfileNotificationsCard";
import ProfileMenuSection from "@/components/profile/ProfileMenuSection";
import ProfileLogoutSection from "@/components/profile/ProfileLogoutSection";

const Profile = () => {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const profileInfo = {
    name: "Amina Touré",
    phone: "+225 07 12 34 56 78",
    email: "amina.toure@email.com",
    joinDate: "Janvier 2024",
    accountLevel: "Compte Vérifié",
  };

  const accountMenuItems = [
    { icon: CreditCard, label: "Moyens de paiement", path: "/payment-methods" },
    { icon: Shield, label: "Sécurité et confidentialité", path: "/security" },
    { icon: Globe, label: "Langue", value: "Français", path: "/language" },
  ];

  const supportMenuItems = [
    { icon: HelpCircle, label: "Centre d'aide", path: "/help" },
    { icon: Phone, label: "Contacter le support", path: "/support" },
    { icon: FileText, label: "Conditions d'utilisation", path: "/terms" },
  ];

  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
    } catch {
      return;
    }
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header
        title="Mon Profil"
        variant="gradient"
        className="sticky top-0 z-50 rounded-b-[2rem] animate-fade-in"
        onBack={() => navigate("/dashboard")}
      />

      {/* Profile details */}
      <div className="relative z-10 px-6 mt-12 space-y-6 animate-fade-in">
        <ProfileHero profileInfo={profileInfo} />

        <ProfileContactCard
          contact={{ phone: profileInfo.phone, email: profileInfo.email }}
        />

        <ProfileNotificationsCard
          enabled={notificationsEnabled}
          onToggle={setNotificationsEnabled}
        />

        <ProfileMenuSection
          title="Paramètres du compte"
          items={accountMenuItems}
          onItemClick={(path) => navigate(path)}
          variant="primary"
        />

        <ProfileMenuSection
          title="Aide et support"
          items={supportMenuItems}
          onItemClick={(path) => navigate(path)}
          variant="muted"
        />

        {/* Invite friends */}
        <Card className="p-4 gradient-card text-white border-0 shadow-card cursor-pointer hover:opacity-95 transition-opacity">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Share2 className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Inviter des amis</p>
              <p className="text-white/70 text-sm">Gagnez 500 F CFA par invitation</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/70" />
          </div>
        </Card>

        {/* Logout button */}
        <ProfileLogoutSection onLogout={handleLogout} />

        {/* App version */}
        <div className="text-center space-y-2 pt-4">
          <img src={zongoLogo} alt="Zongo Pay" className="h-10 mx-auto opacity-50" />
          <p className="text-xs text-muted-foreground">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
