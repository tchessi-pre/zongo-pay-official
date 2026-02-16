import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SendHeader from "@/components/send/SendHeader";
import SendForm from "@/components/send/SendForm";
import PendingScanBanner, {
  type PendingScanData,
} from "@/components/send/PendingScanBanner";
import { getProfileInitials } from "@/lib/utils";

const SendMoney = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scanState = location.state as { fromScan?: boolean; qrData?: string } | null;
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<"tmoney" | "moov">("tmoney");
  const [profileInitials] = useState(getProfileInitials);
  const [pendingScan, setPendingScan] = useState<PendingScanData | null>(null);

  useEffect(() => {
    if (!scanState?.fromScan || !scanState.qrData) return;
    try {
      const parsed = JSON.parse(scanState.qrData) as {
        recipient?: string;
        amount?: number | string;
        provider?: string;
      };
      const rawRecipient = typeof parsed.recipient === "string" ? parsed.recipient.trim() : "";
      const rawAmount =
        typeof parsed.amount === "number" || typeof parsed.amount === "string" ? parsed.amount : "";
      const amountStr = String(rawAmount).trim();
      const numericAmount = Number(amountStr);
      const providerCandidate =
        typeof parsed.provider === "string" ? parsed.provider.toLowerCase().trim() : "";
      const providerValue =
        providerCandidate === "tmoney" || providerCandidate === "moov"
          ? (providerCandidate as "tmoney" | "moov")
          : undefined;

      if (!rawRecipient || !Number.isFinite(numericAmount) || numericAmount <= 0) {
        throw new Error();
      }
      setPendingScan({
        recipient: rawRecipient,
        amount: amountStr,
        provider: providerValue,
      });
    } catch {
      try {
        const [rawRecipient, rawAmount, rawProvider] = scanState.qrData.split("|");
        const recipientPart = rawRecipient?.trim() ?? "";
        const amountStr = rawAmount?.trim() ?? "";
        const numericAmount = Number(amountStr);
        const providerCandidate = rawProvider?.toLowerCase().trim() ?? "";
        const providerValue =
          providerCandidate === "tmoney" || providerCandidate === "moov"
            ? (providerCandidate as "tmoney" | "moov")
            : undefined;

        if (!recipientPart || !Number.isFinite(numericAmount) || numericAmount <= 0) {
          throw new Error();
        }
        setPendingScan({
          recipient: recipientPart,
          amount: amountStr,
          provider: providerValue,
        });
      } catch {
        toast.error("QR code non reconnu");
      }
    }
  }, [scanState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim()) {
      toast.error("Veuillez saisir un destinataire");
      return;
    }
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      toast.error("Le montant doit être supérieur à 0");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Paiement envoyé avec succès !");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <SendHeader
        profileInitials={profileInitials}
        onBack={() => navigate("/dashboard")}
        onProfileClick={() => navigate("/profile")}
      />

      <PendingScanBanner
        pendingScan={pendingScan}
        onUse={() => {
          if (!pendingScan) return;
          setRecipient(pendingScan.recipient);
          setAmount(pendingScan.amount);
          if (pendingScan.provider) {
            setProvider(pendingScan.provider);
          }
          setPendingScan(null);
        }}
        onIgnore={() => setPendingScan(null)}
      />

      <SendForm
        provider={provider}
        recipient={recipient}
        amount={amount}
        loading={loading}
        onProviderChange={setProvider}
        onRecipientChange={setRecipient}
        onAmountChange={setAmount}
        onQuickAmountSelect={(value) => setAmount(value.toString())}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default SendMoney;
