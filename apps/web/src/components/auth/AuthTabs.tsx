import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Mail } from 'lucide-react';
import PhoneAuthForm, { type PhoneAuthFormValues } from '@/components/auth/PhoneAuthForm';
import EmailAuthForm, { type EmailAuthFormValues } from '@/components/auth/EmailAuthForm';
import { toast } from 'sonner';

type AuthTabsProps = {
  isLogin: boolean;
  authMethod: 'phone' | 'email';
  loading: boolean;
  setAuthMethod: (value: 'phone' | 'email') => void;
  handlePhoneFormSubmit: (values: PhoneAuthFormValues) => void;
  handleEmailFormSubmit: (values: EmailAuthFormValues) => void;
  handleGoogleAuth: () => void;
  toggleMode: () => void;
};

const AuthTabs = ({
  isLogin,
  authMethod,
  loading,
  setAuthMethod,
  handlePhoneFormSubmit,
  handleEmailFormSubmit,
  handleGoogleAuth,
  toggleMode,
}: AuthTabsProps) => {
  return (
    <div className='space-y-4'>
      <Tabs value={authMethod} onValueChange={(v) => setAuthMethod(v as 'phone' | 'email')}>
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

        <TabsContent
          value='phone'
          className='mt-4 data-[state=inactive]:opacity-0 data-[state=inactive]:pointer-events-none data-[state=active]:opacity-100 transition-opacity duration-300'
        >
          <PhoneAuthForm
            isLogin={isLogin}
            loading={loading}
            onSubmit={handlePhoneFormSubmit}
            onGoogleAuth={handleGoogleAuth}
          />
        </TabsContent>

        <TabsContent
          value='email'
          className='mt-4 data-[state=inactive]:opacity-0 data-[state=inactive]:pointer-events-none data-[state=active]:opacity-100 transition-opacity duration-300'
        >
          <EmailAuthForm
            isLogin={isLogin}
            loading={loading}
            onSubmit={handleEmailFormSubmit}
            onGoogleAuth={handleGoogleAuth}
            onForgotPassword={() => {
              toast.info("Si un compte existe, un lien de réinitialisation sera envoyé.");
            }}
          />
        </TabsContent>
      </Tabs>

      <div className='text-center pt-2'>
        <button onClick={toggleMode} className='text-primary hover:underline font-medium'>
          {isLogin ? "Pas encore de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
        </button>
      </div>
    </div>
  );
};

export default AuthTabs;

