import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { getProfileInitials } from "@/lib/utils";
import ScanHeader from "@/components/scan/ScanHeader";
import ScanFrame from "@/components/scan/ScanFrame";
import QrScanner from "qr-scanner";
import qrWorkerUrl from "qr-scanner/qr-scanner-worker.min.js?url";

type BarcodeDetectorLike = {
  detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue?: string }>>;
};

const Scan = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const barcodeDetectorRef = useRef<BarcodeDetectorLike | null>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [profileInitials] = useState(getProfileInitials);
  const handleStartScan = () => {
    if (scanning) {
      stopCamera();
      return;
    }
    startCamera();
  };

  const startCamera = async () => {
    setRequesting(true);
    try {
      const hasBarcodeDetector = "BarcodeDetector" in window;
      if (!videoRef.current) throw new Error("video");
      if (hasBarcodeDetector && navigator.mediaDevices?.getUserMedia) {
        let media: MediaStream | null = null;
        try {
          media = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { exact: "environment" } },
            audio: false,
          });
        } catch {
          media = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
            audio: false,
          });
        }
        setStream(media);
        (videoRef.current as HTMLVideoElement & { srcObject?: MediaStream }).srcObject = media;
        videoRef.current.setAttribute("playsinline", "");
        videoRef.current.setAttribute("autoplay", "");
        videoRef.current.muted = true;
        setScanning(true);
        const onReady = async () => {
          try {
            await videoRef.current?.play();
          } catch { void 0; }
          try {
            const BD =
              (window as unknown as {
                BarcodeDetector?: new (options?: { formats?: string[] }) => {
                  detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue?: string }>>;
                };
              }).BarcodeDetector ?? null;
            barcodeDetectorRef.current = BD ? new BD({ formats: ["qr_code"] }) : null;
          } catch {
            barcodeDetectorRef.current = null;
          }
          startDetectLoop();
        };
        if (videoRef.current.readyState >= 2) {
          void onReady();
        } else {
          videoRef.current.onloadedmetadata = onReady;
        }
      } else {
        QrScanner.WORKER_PATH = qrWorkerUrl;
        const scanner = new QrScanner(
          videoRef.current,
          (result) => {
            const data =
              typeof result === "string"
                ? result
                : "data" in (result as unknown as { data?: string })
                  ? (result as unknown as { data?: string }).data
                  : undefined;
            if (!data) {
              toast.error("QR code invalide");
              return;
            }
            stopCamera();
            toast.success("QR code détecté");
            navigate("/send", {
              state: {
                fromScan: true,
                qrData: data,
              },
            });
          },
          {
            preferredCamera: "environment",
            highlightScanRegion: true,
            highlightCodeOutline: true,
            returnDetailedScanResult: true,
          }
        );
        qrScannerRef.current = scanner;
        await scanner.start();
        setScanning(true);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof DOMException && err.name === "NotAllowedError"
          ? "Permission caméra refusée"
          : "Impossible d'accéder à la caméra";
      toast.error(msg);
    } finally {
      setRequesting(false);
    }
  };

  const stopCamera = () => {
    setScanning(false);
    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    barcodeDetectorRef.current = null;
    if (qrScannerRef.current) {
      try {
        void qrScannerRef.current.stop();
      } catch { void 0; }
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
    if (videoRef.current) {
      (videoRef.current as HTMLVideoElement & { srcObject?: MediaStream | null }).srcObject = null;
    }
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
  };

  const startDetectLoop = () => {
    const detect = async () => {
      if (!videoRef.current) {
        rafIdRef.current = requestAnimationFrame(detect);
        return;
      }
      if (barcodeDetectorRef.current) {
        try {
          const barcodes = await barcodeDetectorRef.current.detect(videoRef.current);
          if (barcodes && barcodes.length > 0) {
            stopCamera();
            const first = barcodes[0];
            const value = "rawValue" in first ? (first as { rawValue?: string }).rawValue : undefined;
            if (!value) {
              toast.error("QR code invalide");
              return;
            }
            toast.success("QR code détecté");
            navigate("/send", {
              state: {
                fromScan: true,
                qrData: value,
              },
            });
            return;
          }
        } catch {
          // ignore detection errors, continue
        }
      }
      rafIdRef.current = requestAnimationFrame(detect);
    };
    if (rafIdRef.current == null) {
      rafIdRef.current = requestAnimationFrame(detect);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (qrScannerRef.current) {
        try {
          void qrScannerRef.current.stop();
        } catch { void 0; }
        qrScannerRef.current.destroy();
        qrScannerRef.current = null;
      }
    };
  }, [stream]);

  return (
    <div className="min-h-screen bg-background">
      <ScanHeader
        profileInitials={profileInitials}
        onBack={() => navigate("/dashboard")}
        onProfileClick={() => navigate("/profile")}
      />

      <div className="p-6 space-y-6 animate-fade-in">
        <ScanFrame scanning={scanning} videoRef={videoRef} />

        <Button
          onClick={handleStartScan}
          variant="gradient"
          className="w-full"
          size="lg"
          disabled={requesting}
        >
          {requesting ? "Ouverture de la caméra..." : scanning ? "Arrêter la caméra" : "Activer la caméra"}
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
