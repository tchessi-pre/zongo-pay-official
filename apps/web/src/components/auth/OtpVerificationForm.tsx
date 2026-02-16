import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type OtpVerificationFormProps = {
  otp: string;
  loading: boolean;
  timer: number;
  canResend: boolean;
  phone: string;
  onOtpChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onEditPhone: () => void;
  onResend: () => void;
};

const OtpVerificationForm = ({
  otp,
  loading,
  timer,
  canResend,
  phone,
  onOtpChange,
  onSubmit,
  onEditPhone,
  onResend,
}: OtpVerificationFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <Label className="text-center block">Code de vérification</Label>
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={onOtpChange}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Code envoyé au +228 {phone}</span>
          {!canResend && timer > 0 && <span className="text-primary font-medium">({timer}s)</span>}
        </div>
      </div>
      <div className="space-y-3">
        <Button type="submit" className="w-full" size="lg" disabled={loading || otp.length !== 6}>
          {loading ? "Vérification..." : "Vérifier le code"}
        </Button>
        <Button type="button" variant="ghost" className="w-full" onClick={onEditPhone}>
          Modifier le numéro
        </Button>
      </div>
      <div className="text-center">
        <button
          type="button"
          onClick={onResend}
          disabled={!canResend}
          className={`text-sm font-medium ${canResend ? "text-primary hover:underline cursor-pointer" : "text-muted-foreground cursor-not-allowed"}`}
        >
          {canResend ? "Renvoyer le code" : `Renvoyer le code (${timer}s)`}
        </button>
      </div>
    </form>
  );
};

export default OtpVerificationForm;

