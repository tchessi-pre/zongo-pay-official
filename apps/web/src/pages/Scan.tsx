import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Zap } from "lucide-react";
import { getProfileInitials } from "@/lib/utils";
import ScanHeader from "@/components/scan/ScanHeader";
import ScanFrame from "@/components/scan/ScanFrame";
import { useToast } from "@/hooks/use-toast";
import QrScanner from "qr-scanner";
import qrWorkerUrl from "qr-scanner/qr-scanner-worker.min.js?url";

type BarcodeDetectorLike = {
  detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue?: string }>>;
};

const Scan = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [pending, setPending] = useState<{
    raw: string;
    recipient: string;
    amount: number;
    provider?: "tmoney" | "moov";
  } | null>(null);
  const [invalid, setInvalid] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoTrackRef = useRef<MediaStreamTrack | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const barcodeDetectorRef = useRef<BarcodeDetectorLike | null>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [profileInitials] = useState(getProfileInitials);
  const [canUseTorch, setCanUseTorch] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const fee = pending ? Math.round(pending.amount * 0.01) + 100 : 0;
  const total = pending ? pending.amount + fee : 0;

  const playBeep = () => {
    try {
      const AC =
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext ||
        AudioContext;
      const ctx = new AC();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
      setTimeout(() => {
        try { void ctx.close(); } catch { void 0; }
      }, 300);
    } catch { void 0; }
  };

  const toggleTorch = async () => {
    const track = videoTrackRef.current;
    if (!track) return;
    try {
      const caps = (track as MediaStreamTrack & {
        getCapabilities?: () => MediaTrackCapabilities & { torch?: boolean };
      }).getCapabilities?.();
      if (!caps || !("torch" in caps)) {
        setCanUseTorch(false);
        toast({
          variant: "destructive",
          description: "Flash non disponible sur cet appareil",
        });
        return;
      }
      await track.applyConstraints({
        advanced: [{ torch: !isTorchOn }],
      } as unknown as MediaTrackConstraints);
      setIsTorchOn((prev) => !prev);
    } catch {
      toast({
        variant: "destructive",
        description: "Impossible de contrôler le flash",
      });
    }
  };
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
      setCanUseTorch(false);
      setIsTorchOn(false);
      videoTrackRef.current = null;
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
        const firstTrack = media.getVideoTracks()[0];
        videoTrackRef.current = firstTrack ?? null;
        try {
          const caps = (firstTrack as MediaStreamTrack & {
            getCapabilities?: () => MediaTrackCapabilities & { torch?: boolean };
          })?.getCapabilities?.();
          const supportsTorch = !!caps && "torch" in caps;
          setCanUseTorch(supportsTorch);
          setIsTorchOn(false);
        } catch {
          setCanUseTorch(false);
          setIsTorchOn(false);
        }
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
              toast({
                variant: "destructive",
                description: "QR code invalide",
              });
              return;
            }
            stopCamera();
            playBeep();
            const parsed = parseQrPayload(data);
            if (!parsed) {
              setInvalid("QR code non reconnu");
              return;
            }
            setPending({ raw: data, ...parsed });
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
      toast({
        variant: "destructive",
        description: msg,
      });
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
    const track = videoTrackRef.current;
    if (track) {
      try {
        void track.applyConstraints({
          advanced: [{ torch: false }],
        } as unknown as MediaTrackConstraints);
      } catch { void 0; }
    }
    videoTrackRef.current = null;
    setCanUseTorch(false);
    setIsTorchOn(false);
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
              toast({
                variant: "destructive",
                description: "QR code invalide",
              });
              return;
            }
            playBeep();
            const parsed = parseQrPayload(value);
            if (!parsed) {
              setInvalid("QR code non reconnu");
              return;
            }
            setPending({ raw: value, ...parsed });
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

  const parseQrPayload = (input: string) => {
    try {
      const parsed = JSON.parse(input) as {
        recipient?: string;
        amount?: number | string;
        provider?: string;
      };
      const recipient =
        typeof parsed.recipient === "string" ? parsed.recipient.trim() : "";
      const amountNum = Number(
        typeof parsed.amount === "number" || typeof parsed.amount === "string"
          ? parsed.amount
          : ""
      );
      const prov =
        typeof parsed.provider === "string"
          ? parsed.provider.toLowerCase().trim()
          : "";
      const provider =
        prov === "tmoney" || prov === "moov" ? (prov as "tmoney" | "moov") : undefined;
      if (!recipient || !Number.isFinite(amountNum) || amountNum <= 0) return null;
      return { recipient, amount: amountNum, provider };
    } catch {
      try {
        const [r, a, p] = input.split("|");
        const recipient = r?.trim() ?? "";
        const amountNum = Number(a?.trim() ?? "");
        const prov = p?.toLowerCase().trim() ?? "";
        const provider =
          prov === "tmoney" || prov === "moov" ? (prov as "tmoney" | "moov") : undefined;
        if (!recipient || !Number.isFinite(amountNum) || amountNum <= 0) return null;
        return { recipient, amount: amountNum, provider };
      } catch {
        return null;
      }
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

        {canUseTorch && (
          <Button
            type="button"
            variant={isTorchOn ? "secondary" : "outline"}
            className="w-full"
            size="sm"
            onClick={() => {
              void toggleTorch();
            }}
          >
            {isTorchOn ? "Éteindre le flash" : "Allumer le flash"}
            <Zap className="ml-2 w-4 h-4" />
          </Button>
        )}

        <p className="text-sm text-center text-muted-foreground">
          Assurez-vous que le QR code est bien éclairé et visible
        </p>
      </div>

      {(pending || invalid) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <Card className="w-full max-w-md p-6 space-y-6">
            {!invalid && pending ? (
              <>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Confirmer l’envoi</h3>
                  <p className="text-sm text-muted-foreground">
                    Vérifiez les détails avant de valider la transaction.
                  </p>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center justify-between">
                    <span className="text-muted-foreground">Destinataire</span>
                    <span className="font-semibold">{pending.recipient}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-muted-foreground">Montant</span>
                    <span className="font-semibold">
                      {pending.amount.toLocaleString("fr-FR")} F CFA
                    </span>
                  </p>
                  {pending.provider && (
                    <p className="flex items-center justify-between">
                      <span className="text-muted-foreground">Opérateur</span>
                      <span className="font-semibold">
                        {pending.provider === "tmoney" ? "T-Money" : "Moov Money"}
                      </span>
                    </p>
                  )}
                  <p className="flex items-center justify-between">
                    <span className="text-muted-foreground">Frais</span>
                    <span className="font-semibold">
                      {fee.toLocaleString("fr-FR")} F CFA
                    </span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-muted-foreground">Montant total débité</span>
                    <span className="font-semibold">
                      {total.toLocaleString("fr-FR")} F CFA
                    </span>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPending(null);
                      startCamera();
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="gradient"
                    onClick={() => {
                      const data = pending.raw;
                      setPending(null);
                      navigate("/send", {
                        state: { fromScan: true, qrData: data },
                      });
                    }}
                  >
                    Confirmer
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">QR non reconnu</h3>
                  <p className="text-sm text-muted-foreground">
                    Le code scanné n’est pas au format attendu. Vérifiez le QR ou essayez à nouveau.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setInvalid(null);
                    }}
                  >
                    Fermer
                  </Button>
                  <Button
                    variant="gradient"
                    onClick={() => {
                      setInvalid(null);
                      startCamera();
                    }}
                  >
                    Réessayer
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default Scan;
