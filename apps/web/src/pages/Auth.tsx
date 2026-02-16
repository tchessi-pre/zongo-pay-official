import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail } from "lucide-react";
import zongoLogo from "@/assets/zongo-logo.png";
import PhoneAuthForm from "@/components/auth/PhoneAuthForm";
import EmailAuthForm from "@/components/auth/EmailAuthForm";
import OtpVerificationForm from "@/components/auth/OtpVerificationForm";
import { AuthMode, useAuthController } from "@/hooks/useAuthController";

type AuthProps = {
  initialMode?: AuthMode;
};

const Auth = ({ initialMode = "login" }: AuthProps) => {
  const {
    isLogin,
    authMethod,
    loading,
    otpSent,
    otp,
    timer,
    canResend,
    pendingUser,
    setAuthMethod,
    setOtp,
    handlePhoneFormSubmit,
    handleResendOtp,
    handleEditPhone,
    handleVerifyOtp,
    handleEmailFormSubmit,
    handleGoogleAuth,
    toggleMode,
  } = useAuthController(initialMode);

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
              <OtpVerificationForm
                otp={otp}
                loading={loading}
                timer={timer}
                canResend={canResend}
                phone={pendingUser?.phone || ""}
                onOtpChange={(value) => setOtp(value)}
                onSubmit={handleVerifyOtp}
                onEditPhone={handleEditPhone}
                onResend={handleResendOtp}
              />
            ) : (
              <div className="space-y-4">
                <Tabs value={authMethod} onValueChange={(v) => setAuthMethod(v as "phone" | "email")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="phone" className="gap-2"><Phone className="w-4 h-4" />Téléphone</TabsTrigger>
                    <TabsTrigger value="email" className="gap-2"><Mail className="w-4 h-4" />Email</TabsTrigger>
                  </TabsList>

                  <TabsContent value="phone" className="mt-4">
                    <PhoneAuthForm
                      isLogin={isLogin}
                      loading={loading}
                      onSubmit={handlePhoneFormSubmit}
                      onGoogleAuth={handleGoogleAuth}
                    />
                  </TabsContent>

                  <TabsContent value="email" className="mt-4">
                    <EmailAuthForm
                      isLogin={isLogin}
                      loading={loading}
                      onSubmit={handleEmailFormSubmit}
                      onGoogleAuth={handleGoogleAuth}
                    />
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
