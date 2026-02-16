import { Card } from "@/components/ui/card";
import { Camera } from "lucide-react";
import type { RefObject } from "react";

type ScanFrameProps = {
  scanning: boolean;
  videoRef: RefObject<HTMLVideoElement>;
};

const ScanFrame = ({ scanning, videoRef }: ScanFrameProps) => {
  return (
    <Card className="p-8 shadow-card border-0">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">Scannez pour payer</h2>
          <p className="text-muted-foreground">
            Pointez votre caméra vers le QR code du destinataire
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-sm aspect-square bg-muted rounded-3xl overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
          {!scanning && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Camera className="w-24 h-24 text-muted-foreground" />
            </div>
          )}

          <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-2xl" />
        </div>
      </div>
    </Card>
  );
};

export default ScanFrame;
