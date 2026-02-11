import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Share2, Copy, User } from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";

const Receive = () => {
  const navigate = useNavigate();
  const userPhone = "+225 07 12 34 56 78"; // Mock data
  const qrData = `zongo://pay/${userPhone}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(userPhone);
    toast.success("Numéro copié dans le presse-papier");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Zongo Pay",
          text: `Envoyez-moi de l'argent sur Zongo Pay : ${userPhone}`,
        });
      } catch (error) {
        console.log("Partage annulé");
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 gradient-card text-white p-6 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-2xl font-bold">Recevoir de l'argent</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className="text-white hover:bg-white/10"
          >
            <User className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* QR Code */}
      <div className="p-6 space-y-6 animate-fade-in">
        <Card className="p-8 shadow-card border-0">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Scannez mon QR code</h2>
              <p className="text-muted-foreground">
                Demandez à votre ami de scanner ce code pour vous envoyer de l'argent
              </p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center w-full">
              <div className="bg-white p-4 sm:p-8 rounded-3xl shadow-soft">
                <QRCodeSVG
                  value={qrData}
                  size={200}
                  level="H"
                  includeMargin={true}
                  fgColor="#FF8C42"
                  className="w-full h-auto max-w-[200px] sm:max-w-[250px]"
                />
              </div>
            </div>

            {/* Phone number */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Ou partagez mon numéro :</p>
              <div className="flex items-center gap-3 bg-secondary p-4 rounded-2xl">
                <span className="flex-1 text-lg font-semibold text-foreground">{userPhone}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="hover:bg-primary/10"
                >
                  <Copy className="w-5 h-5 text-primary" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Share button */}
        <Button onClick={handleShare} variant="gradient" className="w-full" size="lg">
          <Share2 className="mr-2 w-5 h-5" />
          Partager mon QR code
        </Button>
      </div>
    </div>
  );
};

export default Receive;
