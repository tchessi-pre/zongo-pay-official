import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Share2, Copy, QrCode } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import Header from "@/components/header/Header";

const InviteParticipants = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [showQR, setShowQR] = useState(false);

  // Mock data
  const cagnotte = {
    id: id,
    name: "Voyage à Kpalimé",
    inviteLink: `https://zongo.app/cagnottes/${id}/join`,
  };

  const copyLink = () => {
    navigator.clipboard.writeText(cagnotte.inviteLink);
    toast({
      title: "Lien copié !",
      description: "Le lien d'invitation a été copié dans le presse-papier",
    });
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: cagnotte.name,
          text: `Rejoignez ma cagnotte "${cagnotte.name}" sur Zongo !`,
          url: cagnotte.inviteLink,
        });
      } catch (err) {
        console.log("Partage annulé");
      }
    } else {
      copyLink();
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header
        title="Inviter des participants"
        variant="gradient"
        className="sticky top-0 z-50 rounded-b-[2rem]"
        onBack={() => navigate(`/cagnottes/${id}`)}
        profileInitials={(JSON.parse(localStorage.getItem("user") || "{}")?.firstName?.[0] || "U").toUpperCase()}
        onProfileClick={() => navigate("/profile")}
      >
        <p className="text-white/90 text-sm mt-2">{cagnotte.name}</p>
      </Header>

      {/* Content */}
      <div className="p-6 space-y-4">
        <Card className="shadow-card border-0">
          <CardContent className="pt-6 space-y-4">
            <p className="text-muted-foreground text-sm">
              Partagez ce lien avec vos amis pour qu'ils rejoignent la cagnotte
            </p>

            {/* Link display */}
            <div className="flex gap-2">
              <div className="flex-1 bg-muted/30 rounded-xl p-4">
                <p className="text-sm font-mono break-all text-foreground">
                  {cagnotte.inviteLink}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <Button
                className="w-full"
                size="lg"
                onClick={shareLink}
              >
                <Share2 className="mr-2 h-5 w-5" />
                Partager le lien
              </Button>

              <Button
                className="w-full"
                size="lg"
                variant="outline"
                onClick={copyLink}
              >
                <Copy className="mr-2 h-5 w-5" />
                Copier le lien
              </Button>

              <Button
                className="w-full"
                size="lg"
                variant="secondary"
                onClick={() => setShowQR(!showQR)}
              >
                <QrCode className="mr-2 h-5 w-5" />
                {showQR ? "Masquer" : "Afficher"} le QR Code
              </Button>
            </div>

            {/* QR Code */}
            {showQR && (
              <div className="flex justify-center pt-4">
                <div className="bg-white p-4 sm:p-8 rounded-3xl shadow-soft">
                  <QRCodeSVG
                    value={cagnotte.inviteLink}
                    size={200}
                    level="H"
                    includeMargin={true}
                    fgColor="#FF8C42"
                    className="w-full h-auto max-w-[200px] sm:max-w-[250px]"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info card */}
        <Card className="shadow-card border-0 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              💡 <span className="font-semibold">Astuce :</span> Les participants pourront voir les contributions et contribuer à la cagnotte après avoir rejoint via ce lien.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InviteParticipants;
