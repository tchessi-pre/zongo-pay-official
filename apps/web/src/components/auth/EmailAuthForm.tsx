import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Divider } from "@/components/auth/Divider";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { NameFields } from "@/components/auth/NameFields";
import { Eye, EyeOff } from "lucide-react";

type EmailAuthFormValues = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type EmailAuthFormProps = {
  isLogin: boolean;
  loading: boolean;
  onSubmit: (values: EmailAuthFormValues) => void;
  onGoogleAuth: () => void;
};

const EmailAuthForm = ({ isLogin, loading, onSubmit, onGoogleAuth }: EmailAuthFormProps) => {
  const form = useForm<EmailAuthFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = form.handleSubmit(onSubmit);

  const firstName = form.watch("firstName") || "";
  const lastName = form.watch("lastName") || "";

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
      <div className="space-y-2">
        <Label htmlFor="emailInput">Email</Label>
        <Input
          id="emailInput"
          type="email"
          placeholder="exemple@email.com"
          className="rounded-xl"
          {...form.register("email", { required: true })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            minLength={6}
            className="rounded-xl pr-10"
            {...form.register("password", { required: true, minLength: 6 })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>
      {!isLogin && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            minLength={6}
            className="rounded-xl"
            {...form.register("confirmPassword", { required: true, minLength: 6 })}
          />
        </div>
      )}
      {isLogin && (
        <div className="text-right">
          <button type="button" className="text-sm text-primary hover:underline font-medium">
            Mot de passe oublié ?
          </button>
        </div>
      )}
      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? (isLogin ? "Connexion..." : "Création...") : (isLogin ? "Se connecter" : "Créer mon compte")}
      </Button>
      <Divider />
      <GoogleButton loading={loading} onClick={onGoogleAuth} />
    </form>
  );
};

export type { EmailAuthFormValues };
export default EmailAuthForm;

