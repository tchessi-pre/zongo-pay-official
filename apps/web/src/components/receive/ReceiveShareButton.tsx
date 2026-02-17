import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

type ReceiveShareButtonProps = {
  onShare: () => void;
};

const ReceiveShareButton = ({ onShare }: ReceiveShareButtonProps) => {
  return (
    <Button onClick={onShare} variant="gradient" className="w-full" size="lg">
      <Share2 className="mr-2 w-5 h-5" />
      Partager mon QR code
    </Button>
  );
};

export default ReceiveShareButton;

