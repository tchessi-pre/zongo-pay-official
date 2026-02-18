import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PhoneAuthFormValues } from "@/components/auth/PhoneAuthForm";
import { EmailAuthFormValues } from "@/components/auth/EmailAuthForm";
import { useAuth } from "@/auth/AuthContext";

/**
 * Méthodes possibles pour s'authentifier.
 */
type AuthMethod = "phone" | "email";

/**
 * Représente l'utilisateur authentifié ou en cours de création.
 */
type AuthUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

/**
 * Mode d'écran courant : connexion ou inscription.
 */
export type AuthMode = "login" | "register";

/**
 * Contrôleur d'authentification qui encapsule la logique (état, navigation, timers, handlers).
 * Sépare la logique métier du composant de vue `Auth`.
 *
 * @param {"login"|"register"} initialMode - Mode d'entrée (connexion ou inscription)
 * @returns {{
 *   isLogin: boolean;
 *   authMethod: "phone"|"email";
 *   loading: boolean;
 *   otpSent: boolean;
 *   otp: string;
 *   timer: number;
 *   canResend: boolean;
 *   pendingUser: any;
 *   setAuthMethod: (m: "phone"|"email") => void;
 *   setOtp: (v: string) => void;
 *   handlePhoneFormSubmit: (values: PhoneAuthFormValues) => void | Promise<void>;
 *   handleResendOtp: () => void;
 *   handleEditPhone: () => void;
 *   handleVerifyOtp: (e: React.FormEvent) => void | Promise<void>;
 *   handleEmailFormSubmit: (values: EmailAuthFormValues) => void | Promise<void>;
 *   handleGoogleAuth: () => void;
 *   toggleMode: () => void;
 * }}
 */
export const useAuthController = (initialMode: AuthMode) => {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [authMethod, setAuthMethod] = useState<AuthMethod>("phone");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [pendingUser, setPendingUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { setUser } = useAuth();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (otpSent) {
      const startRaw = sessionStorage.getItem("otpStartAt");
      const start = startRaw ? parseInt(startRaw, 10) : Date.now();
      if (!startRaw) sessionStorage.setItem("otpStartAt", String(start));
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const remaining = Math.max(60 - elapsed, 0);
      if (remaining !== timer) setTimer(remaining);
    }
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
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [otpSent, timer]);

  /**
   * Soumet le formulaire téléphone et déclenche l'envoi du code OTP.
   *
   * @param {PhoneAuthFormValues} values - Données de l'utilisateur (téléphone, noms, email)
   * @returns {void}
   */
  const handlePhoneFormSubmit = async (values: PhoneAuthFormValues) => {
    const user: AuthUser = {
      firstName: values.firstName || "",
      lastName: values.lastName || "",
      email: values.email || "",
      phone: values.phone,
    };
    setPendingUser(user);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setTimer(60);
      setCanResend(false);
      sessionStorage.setItem("otpStartAt", String(Date.now()));
      toast({
        description: "Code OTP envoyé au " + values.phone,
      });
    }, 1500);
  };

  /**
   * Demande l'envoi d'un nouveau code OTP et réinitialise le timer.
   *
   * @returns {void}
   */
  const handleResendOtp = () => {
    setTimer(60);
    setCanResend(false);
    sessionStorage.setItem("otpStartAt", String(Date.now()));
    toast({
      description: "Nouveau code envoyé",
    });
  };

  /**
   * Revient à la saisie du numéro (annule l'étape OTP en cours).
   *
   * @returns {void}
   */
  const handleEditPhone = () => {
    setOtpSent(false);
    setOtp("");
    setTimer(60);
    setCanResend(false);
  };

  /**
   * Vérifie le code OTP et finalise la connexion ou l'inscription.
   *
   * @param {React.FormEvent} e - Événement de soumission de formulaire
   * @returns {void}
   */
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        description: "Veuillez entrer un code à 6 chiffres",
      });
      return;
    }
    if (!pendingUser) {
      toast({
        variant: "destructive",
        description: "Aucune information utilisateur trouvée pour vérifier le code",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser(pendingUser);
      toast({
        description: !isLogin ? "Compte créé avec succès !" : "Connexion réussie !",
      });
      sessionStorage.removeItem("otpStartAt");
      navigate("/dashboard");
    }, 1500);
  };

  /**
   * Soumet le formulaire email/mot de passe. Valide les mots de passe, persiste l'utilisateur en inscription.
   *
   * @param {EmailAuthFormValues} values - Données du formulaire email
   * @returns {void}
   */
  const handleEmailFormSubmit = async (values: EmailAuthFormValues) => {
    if (!isLogin && values.password !== values.confirmPassword) {
      toast({
        variant: "destructive",
        description: "Les mots de passe ne correspondent pas",
      });
      return;
    }
    if (values.password.length < 6) {
      toast({
        variant: "destructive",
        description: "Le mot de passe doit contenir au moins 6 caractères",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser({
        firstName: values.firstName || "",
        lastName: values.lastName || "",
        email: values.email,
        phone: "",
      });
      toast({
        description: !isLogin ? "Compte créé avec succès !" : "Connexion réussie !",
      });
      navigate("/dashboard");
    }, 1500);
  };

  /**
   * Lance un flux de connexion Google simulé (données statiques).
   *
   * @returns {void}
   */
  const handleGoogleAuth = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser({
        firstName: "Utilisateur",
        lastName: "Google",
        email: "user@gmail.com",
        phone: "",
      });
      toast({
        description: "Connexion Google réussie !",
      });
      navigate("/dashboard");
    }, 1500);
  };

  /**
   * Bascule entre login et register en mettant à jour l'URL si nécessaire.
   *
   * @returns {void}
   */
  const toggleMode = () => {
    if (location.pathname === "/login") {
      navigate("/register");
      return;
    }
    if (location.pathname === "/register") {
      navigate("/login");
      return;
    }
    setIsLogin(!isLogin);
    setOtpSent(false);
    setOtp("");
    setPendingUser(null);
  };

  /**
   * Expose l'état et les handlers au composant de vue `Auth`.
   */
  return {
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
  };
};
