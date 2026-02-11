import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Smartphone } from "lucide-react";
import zongoLogo from "@/assets/zongo-logo.png";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (isStandalone) return;

    // Check if dismissed recently (within 7 days)
    const dismissedAt = localStorage.getItem("pwa-prompt-dismissed");
    if (dismissedAt) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) return;
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // For iOS, show dialog after a delay
    if (isIOSDevice) {
      const timer = setTimeout(() => setShowDialog(true), 3000);
      return () => clearTimeout(timer);
    }

    // For other browsers, listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowDialog(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    }
    setShowDialog(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa-prompt-dismissed", Date.now().toString());
    setShowDialog(false);
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader className="text-center items-center">
          <div className="w-20 h-20 rounded-2xl gradient-card flex items-center justify-center mb-4 shadow-lg">
            <img src={zongoLogo} alt="Zongo Pay" className="w-12 h-12" />
          </div>
          <DialogTitle className="text-xl font-bold">
            Installer Zongo Pay
          </DialogTitle>
          <DialogDescription className="text-center">
            Ajoutez Zongo Pay à votre écran d'accueil pour un accès rapide et une meilleure expérience.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <Smartphone className="w-5 h-5 text-primary" />
            <span className="text-sm">Accès instantané depuis l'écran d'accueil</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <Download className="w-5 h-5 text-primary" />
            <span className="text-sm">Fonctionne même hors connexion</span>
          </div>
        </div>

        {isIOS ? (
          <div className="bg-accent/10 p-4 rounded-xl text-sm text-center">
            <p className="font-medium mb-2">Sur iPhone/iPad :</p>
            <p className="text-muted-foreground">
              Appuyez sur <span className="font-semibold">Partager</span> puis{" "}
              <span className="font-semibold">"Sur l'écran d'accueil"</span>
            </p>
          </div>
        ) : null}

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {!isIOS && (
            <Button onClick={handleInstall} className="w-full" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Installer l'application
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={handleDismiss}
            className="w-full text-muted-foreground"
          >
            Plus tard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PWAInstallPrompt;