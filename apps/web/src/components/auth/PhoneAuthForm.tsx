import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NameFields } from "@/components/auth/NameFields";

type PhoneAuthFormValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone: string;
};

type PhoneAuthFormProps = {
  isLogin: boolean;
  loading: boolean;
  onSubmit: (values: PhoneAuthFormValues) => void;
  onGoogleAuth: () => void;
};

const PhoneAuthForm = ({ isLogin, loading, onSubmit, onGoogleAuth }: PhoneAuthFormProps) => {
  const form = useForm<PhoneAuthFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    const onlyDigits = (values.phone || "").replace(/\D/g, "");
    const tgDigits = onlyDigits.slice(-8);
    const e164 = tgDigits ? `+228${tgDigits}` : "";
    onSubmit({ ...values, phone: e164 });
  });

  const firstName = form.watch("firstName") || "";
  const lastName = form.watch("lastName") || "";
  const rawPhone = form.watch("phone") || "";
  const formatTg = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 8);
    return d.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <NameFields
          firstName={firstName}
          lastName={lastName}
          onFirstNameChange={(value) => form.setValue("firstName", value)}
          onLastNameChange={(value) => form.setValue("lastName", value)}
        />
      )}
      {!isLogin && (
        <div className="space-y-2">
          <Label htmlFor="emailPhone">Email</Label>
          <Input
            id="emailPhone"
            type="email"
            placeholder="exemple@email.com"
            className="rounded-xl"
            {...form.register("email")}
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="phone">Numéro de téléphone</Label>
        <div className="flex gap-2">
          <Input value="+228" disabled className="w-20 rounded-xl bg-muted" />
          <Input
            id="phone"
            type="tel"
            placeholder="XX XX XX XX"
            inputMode="numeric"
            className="rounded-xl flex-1"
            value={formatTg(rawPhone)}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 8);
              form.setValue("phone", v, { shouldDirty: true, shouldTouch: true });
            }}
            {...form.register("phone", { required: true })}
          />
        </div>
        <p className="text-xs text-muted-foreground">Format: 90 12 34 56</p>
      </div>
      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? "Envoi..." : "Recevoir le code OTP"}
      </Button>
    </form>
  );
};

export type { PhoneAuthFormValues };
export default PhoneAuthForm;

