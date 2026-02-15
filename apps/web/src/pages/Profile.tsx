import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Phone,
  Mail,
  Shield,
  LogOut,
  ChevronRight,
  Camera,
  Bell,
  Globe,
  CreditCard,
  HelpCircle,
  FileText,
  Star,
  Share2
} from "lucide-react";
import zongoLogo from "@/assets/zongo-logo.png";
import { useState } from "react";
import Header from "@/components/Header";

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
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header
        title="Mon Profil"
        variant="gradient"
        className="relative pb-12 rounded-b-[3rem]"
        onBack={() => navigate("/dashboard")}
      >
        <div className="text-center space-y-3 mt-8">
          <div className="relative inline-block">
            <Avatar className="w-28 h-28 border-4 border-white/30 shadow-lg">
              <AvatarImage src="" alt={profileInfo.name} />
              <AvatarFallback className="bg-white/20 text-white text-3xl font-bold backdrop-blur-sm">
                {profileInfo.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-card hover:scale-105 transition-transform">
              <Camera className="w-4 h-4 text-primary" />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profileInfo.name}</h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                <span className="text-sm font-medium">{profileInfo.accountLevel}</span>
              </div>
            </div>
            <p className="text-white/70 text-sm mt-2">Membre depuis {profileInfo.joinDate}</p>
          </div>
        </div>
      </Header>

      {/* Profile details */}
      <div className="relative z-10 px-6 -mt-6 space-y-6 animate-fade-in">
        {/* Contact info card */}
        <Card className="p-6 shadow-card border-0">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Informations de contact
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Téléphone</p>
                <p className="font-semibold text-foreground">{profileInfo.phone}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold text-foreground">{profileInfo.email}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </Card>

        {/* Notifications toggle */}
        <Card className="p-4 shadow-card border-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="font-medium text-foreground">Notifications</span>
                <p className="text-sm text-muted-foreground">Alertes et rappels</p>
              </div>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
        </Card>

        {/* Account menu items */}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1 mb-3">
            Paramètres du compte
          </h3>
          <div className="space-y-2">
            {accountMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.label}
                  className="p-4 flex items-center justify-between shadow-soft hover:shadow-card transition-shadow cursor-pointer border-0"
                  onClick={() => navigate(item.path)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && (
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Support menu items */}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1 mb-3">
            Aide et support
          </h3>
          <div className="space-y-2">
            {supportMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.label}
                  className="p-4 flex items-center justify-between shadow-soft hover:shadow-card transition-shadow cursor-pointer border-0"
                  onClick={() => navigate(item.path)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span className="font-medium text-foreground">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Card>
              );
            })}
          </div>
        </div>

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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10" size="lg">
              <LogOut className="mr-2 w-5 h-5" />
              Se déconnecter
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Se déconnecter ?</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir vous déconnecter de votre compte Zongo Pay ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Se déconnecter
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* App version */}
        <div className="text-center space-y-2 pt-4">
          <img src={zongoLogo} alt="Zongo Pay" className="h-8 mx-auto opacity-50" />
          <p className="text-xs text-muted-foreground">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
