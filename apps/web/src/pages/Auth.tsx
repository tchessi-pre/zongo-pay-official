import OtpVerificationForm from '@/components/auth/OtpVerificationForm';
import { AuthMode, useAuthController } from '@/hooks/useAuthController';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthShell from '@/components/auth/AuthShell';
import AuthTabs from '@/components/auth/AuthTabs';

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
            <AuthTabs
              isLogin={isLogin}
              authMethod={authMethod}
              loading={loading}
              setAuthMethod={setAuthMethod}
              handlePhoneFormSubmit={handlePhoneFormSubmit}
              handleEmailFormSubmit={handleEmailFormSubmit}
              handleGoogleAuth={handleGoogleAuth}
              toggleMode={toggleMode}
            />
          )}
        </AuthShell>
      </div>
    </div>
  );
};

export default Auth;
