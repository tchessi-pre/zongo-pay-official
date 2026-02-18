import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getProfileInitials } from "@/lib/utils";
import ReceiveHeader from "@/components/receive/ReceiveHeader";
import ReceiveQrCard from "@/components/receive/ReceiveQrCard";
import ReceiveShareButton from "@/components/receive/ReceiveShareButton";

const Receive = () => {
  const navigate = useNavigate();
  const profileInitials = getProfileInitials();

  const userPhone = useMemo(() => "+228 90 12 34 56", []);
  const qrData = useMemo(() => `zongo://pay/${userPhone}`, [userPhone]);

  const handleCopy = () => {
    navigator.clipboard.writeText(userPhone);
    toast.success("Numéro copié dans le presse-papier");
  };

  const handleShare = async () => {
    if (typeof navigator === "undefined") {
      handleCopy();
      return;
    }

    const shareText = `Envoyez-moi de l'argent sur Zongo Pay : ${userPhone}`;
    const shareData: ShareData = {
      title: "Zongo Pay",
      text: shareText,
    };

    if (!navigator.share || (navigator.canShare && !navigator.canShare(shareData))) {
      handleCopy();
      return;
    }

    try {
      await navigator.share(shareData);
      toast.success("Lien de paiement partagé");
    } catch (error) {
      const isAbortError =
        error instanceof DOMException && (error.name === "AbortError" || error.name === "NotAllowedError");
      if (isAbortError) {
        return;
      }

      toast.error("Impossible de partager, numéro copié à la place");
      handleCopy();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ReceiveHeader
        profileInitials={profileInitials}
        onBack={() => navigate("/dashboard")}
        onProfileClick={() => navigate("/profile")}
      />
      <div className="p-6 space-y-6 animate-fade-in">
        <ReceiveQrCard qrData={qrData} phone={userPhone} onCopy={handleCopy} />
        <ReceiveShareButton onShare={handleShare} />
      </div>
    </div>
  );
};

export default Receive;
