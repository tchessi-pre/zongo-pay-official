import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

type ReceiveQrCardProps = {
  qrData: string;
  phone: string;
  onCopy: () => void;
};

const ReceiveQrCard = ({ qrData, phone, onCopy }: ReceiveQrCardProps) => {
  return (
    <Card className="p-4 shadow-card border-0">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">Scannez mon QR code</h2>
          <p className="text-muted-foreground">
            Demandez à votre ami de scanner ce code pour vous envoyer de l'argent
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="bg-white p-2 sm:p-4 rounded-3xl shadow-soft">
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
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Ou partagez mon numéro :</p>
          <div className="flex items-center gap-3 bg-secondary p-4 rounded-2xl">
            <span className="flex-1 text-lg font-semibold text-foreground">{phone}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCopy}
              className="hover:bg-primary/10"
            >
              <Copy className="w-5 h-5 text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReceiveQrCard;

