import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Phone, Mail, Eye, EyeOff } from "lucide-react";
import zongoLogo from "@/assets/zongo-logo.png";

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setTimer(60);
      setCanResend(false);
      toast.success("Code OTP envoyé au " + phone);
    }, 1500);
  };

  const handleResendOtp = () => {
    setTimer(60);
    setCanResend(false);
    toast.success("Nouveau code envoyé");
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Veuillez entrer un code à 6 chiffres");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!isLogin) {
        localStorage.setItem("user", JSON.stringify({ firstName, lastName, email, phone }));
        toast.success("Compte créé avec succès !");
      } else {
        toast.success("Connexion réussie !");
      }
      navigate("/dashboard");
    }, 1500);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    if (password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!isLogin) {
        localStorage.setItem("user", JSON.stringify({ firstName, lastName, email, phone: "" }));
        toast.success("Compte créé avec succès !");
      } else {
        toast.success("Connexion réussie !");
      }
      navigate("/dashboard");
    }, 1500);
  };

  const handleGoogleAuth = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("user", JSON.stringify({ firstName: "Utilisateur", lastName: "Google", email: "user@gmail.com", phone: "" }));
      toast.success("Connexion Google réussie !");
      navigate("/dashboard");
    }, 1500);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setOtpSent(false);
    setOtp("");
    setPassword("");
    setConfirmPassword("");
  };

  const NameFields = () => (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-2">
        <Label htmlFor="firstName">Prénom</Label>
        <Input id="firstName" placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="rounded-xl" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Nom</Label>
        <Input id="lastName" placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="rounded-xl" />
      </div>
    </div>
  );

  const Divider = () => (
    <div className="relative my-2">
      <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-muted" /></div>
      <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">ou</span></div>
    </div>
  );

  const GoogleButton = () => (
    <Button type="button" variant="outline" className="w-full gap-2" size="lg" onClick={handleGoogleAuth} disabled={loading}>
      <GoogleIcon />
      Continuer avec Google
    </Button>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <img src={zongoLogo} alt="Zongo Pay" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground">Bienvenue sur Zongo Pay</h1>
          <p className="text-muted-foreground mt-2">Le paiement à visage humain</p>
        </div>

        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>{isLogin ? "Se connecter" : "Créer un compte"}</CardTitle>
            <CardDescription>
              {otpSent
                ? "Entrez le code reçu par SMS"
                : isLogin
                  ? "Connectez-vous pour accéder à votre compte"
                  : "Rejoignez la communauté Zongo Pay"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {otpSent ? (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-center block">Code de vérification</Label>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
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
                  <Button type="button" variant="ghost" className="w-full" onClick={() => { setOtpSent(false); setOtp(""); setTimer(60); setCanResend(false); }}>
                    Modifier le numéro
                  </Button>
                </div>
                <div className="text-center">
                  <button type="button" onClick={handleResendOtp} disabled={!canResend} className={`text-sm font-medium ${canResend ? "text-primary hover:underline cursor-pointer" : "text-muted-foreground cursor-not-allowed"}`}>
                    {canResend ? "Renvoyer le code" : `Renvoyer le code (${timer}s)`}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <Tabs value={authMethod} onValueChange={(v) => setAuthMethod(v as "phone" | "email")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="phone" className="gap-2"><Phone className="w-4 h-4" />Téléphone</TabsTrigger>
                    <TabsTrigger value="email" className="gap-2"><Mail className="w-4 h-4" />Email</TabsTrigger>
                  </TabsList>

                  <TabsContent value="phone" className="mt-4">
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      {!isLogin && <NameFields />}
                      {!isLogin && (
                        <div className="space-y-2">
                          <Label htmlFor="emailPhone">Email</Label>
                          <Input id="emailPhone" type="email" placeholder="exemple@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="rounded-xl" />
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="phone">Numéro de téléphone</Label>
                        <div className="flex gap-2">
                          <Input value="+228" disabled className="w-20 rounded-xl bg-muted" />
                          <Input id="phone" type="tel" placeholder="XX XX XX XX" value={phone} onChange={(e) => setPhone(e.target.value)} required maxLength={10} className="rounded-xl flex-1" />
                        </div>
                        <p className="text-xs text-muted-foreground">Format: 90 12 34 56</p>
                      </div>
                      <Button type="submit" className="w-full" size="lg" disabled={loading}>
                        {loading ? "Envoi..." : "Recevoir le code OTP"}
                      </Button>
                      <Divider />
                      <GoogleButton />
                    </form>
                  </TabsContent>

                  <TabsContent value="email" className="mt-4">
                    <form onSubmit={handleEmailAuth} className="space-y-4">
                      {!isLogin && <NameFields />}
                      <div className="space-y-2">
                        <Label htmlFor="emailInput">Email</Label>
                        <Input id="emailInput" type="email" placeholder="exemple@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <div className="relative">
                          <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="rounded-xl pr-10" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      {!isLogin && (
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                          <Input id="confirmPassword" type={showPassword ? "text" : "password"} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} className="rounded-xl" />
                        </div>
                      )}
                      {isLogin && (
                        <div className="text-right">
                          <button type="button" className="text-sm text-primary hover:underline font-medium">Mot de passe oublié ?</button>
                        </div>
                      )}
                      <Button type="submit" className="w-full" size="lg" disabled={loading}>
                        {loading ? (isLogin ? "Connexion..." : "Création...") : (isLogin ? "Se connecter" : "Créer mon compte")}
                      </Button>
                      <Divider />
                      <GoogleButton />
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="text-center pt-2">
                  <button onClick={toggleMode} className="text-primary hover:underline font-medium">
                    {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
