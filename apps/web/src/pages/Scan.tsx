import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QrCode, Camera } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";

const Scan = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);

  const handleStartScan = () => {
    setScanning(true);
    // Simuler un scan réussi après 2 secondes
    setTimeout(() => {
      setScanning(false);
      toast.success("QR code scanné avec succès !");
      navigate("/send");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Scanner un QR code"
        variant="gradient"
        className="sticky top-0 z-50 rounded-b-[2rem]"
        onBack={() => navigate("/dashboard")}
        profileInitials={(JSON.parse(localStorage.getItem("user") || "{}")?.firstName?.[0] || "U").toUpperCase()}
        onProfileClick={() => navigate("/profile")}
      />

      {/* Scanner area */}
      <div className="p-6 space-y-6 animate-fade-in">
        <Card className="p-8 shadow-card border-0">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Scannez pour payer</h2>
              <p className="text-muted-foreground">
                Pointez votre caméra vers le QR code du destinataire
              </p>
            </div>

            {/* Scanner frame */}
            <div className="relative mx-auto w-full max-w-sm aspect-square bg-muted rounded-3xl overflow-hidden">
              {scanning ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-success/20">
                  <div className="animate-pulse">
                    <QrCode className="w-24 h-24 text-primary" />
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-24 h-24 text-muted-foreground" />
                </div>
              )}

              {/* Scanner corners */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-2xl" />
            </div>
          </div>
        </Card>

        {/* Action button */}
        <Button
          onClick={handleStartScan}
          variant="gradient"
          className="w-full"
          size="lg"
          disabled={scanning}
        >
          {scanning ? "Scan en cours..." : "Activer la caméra"}
          <Camera className="ml-2 w-5 h-5" />
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Assurez-vous que le QR code est bien éclairé et visible
        </p>
      </div>
    </div>
  );
};

export default Scan;
