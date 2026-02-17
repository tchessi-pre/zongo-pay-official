import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Mail } from 'lucide-react';
import PhoneAuthForm from '@/components/auth/PhoneAuthForm';
import EmailAuthForm from '@/components/auth/EmailAuthForm';
import OtpVerificationForm from '@/components/auth/OtpVerificationForm';
import { AuthMode, useAuthController } from '@/hooks/useAuthController';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthShell from '@/components/auth/AuthShell';
import { toast } from 'sonner';

type AuthProps = {
  initialMode?: AuthMode;
};

const Auth = ({ initialMode = 'login' }: AuthProps) => {
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
    <div className='min-h-screen bg-background flex flex-col items-center justify-center p-6'>
      <div className='w-full max-w-md space-y-8 animate-fade-in'>
        <AuthHeader
          title='Bienvenue sur Zongo Pay'
          subtitle='Le paiement à visage humain'
        />

        <AuthShell
          title={isLogin ? 'Se connecter' : 'Créer un compte'}
          description={
            otpSent
              ? 'Entrez le code reçu par SMS'
              : isLogin
                ? 'Connectez-vous pour accéder à votre compte'
                : 'Rejoignez la communauté Zongo Pay'
          }
        >
            {otpSent ? (
              <OtpVerificationForm
                otp={otp}
                loading={loading}
                timer={timer}
                canResend={canResend}
                phone={pendingUser?.phone || ''}
                onOtpChange={(value) => setOtp(value)}
                onSubmit={handleVerifyOtp}
                onEditPhone={handleEditPhone}
                onResend={handleResendOtp}
              />
            ) : (
              <div className='space-y-4'>
                <Tabs
                  value={authMethod}
                  onValueChange={(v) => setAuthMethod(v as 'phone' | 'email')}
                >
                  <TabsList className='grid w-full grid-cols-2'>
                    <TabsTrigger value='phone' className='gap-2'>
                      <Phone className='w-4 h-4' />
                      Téléphone
                    </TabsTrigger>
                    <TabsTrigger value='email' className='gap-2'>
                      <Mail className='w-4 h-4' />
                      Email
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value='phone' className='mt-4'>
                    <PhoneAuthForm
                      isLogin={isLogin}
                      loading={loading}
                      onSubmit={handlePhoneFormSubmit}
                      onGoogleAuth={handleGoogleAuth}
                    />
                  </TabsContent>

                  <TabsContent value='email' className='mt-4'>
                    <EmailAuthForm
                      isLogin={isLogin}
                      loading={loading}
                      onSubmit={handleEmailFormSubmit}
                      onGoogleAuth={handleGoogleAuth}
                      onForgotPassword={() => {
                        toast.info(
                          "Si un compte existe, un lien de réinitialisation sera envoyé."
                        );
                      }}
                    />
                  </TabsContent>
                </Tabs>

                <div className='text-center pt-2'>
                  <button
                    onClick={toggleMode}
                    className='text-primary hover:underline font-medium'
                  >
                    {isLogin
                      ? "Pas encore de compte ? S'inscrire"
                      : 'Déjà un compte ? Se connecter'}
                  </button>
                </div>
              </div>
            )}
        </AuthShell>
      </div>
    </div>
  );
};

export default Auth;
