import { useMemo } from "react";
import type { ReactNode } from "react";
import zongoLogo from "@/assets/zongo-logo.png";
import { useAuth } from "@/auth/AuthContext";

type BalanceHeaderProps = {
  balance: number;
  profileInitials: string;
  onProfileClick: () => void;
  title?: string;
  subtitle?: string;
  locale?: string;
  currency?: string;
  formatBalance?: (value: number) => string;
  className?: string;
  leftContent?: ReactNode;
  children?: ReactNode;
};

const BalanceHeader = ({
  balance,
  profileInitials,
  title,
  subtitle,
  locale = 'fr-FR',
  currency,
  formatBalance,
  leftContent,
  children,
}: BalanceHeaderProps) => {
  const { user } = useAuth();
  const userName = useMemo(() => {
    if (user) {
      const first = user.firstName?.trim() || "";
      const last = user.lastName?.trim() || "";
      const full = [first, last].filter(Boolean).join(" ").trim();
      return full || user.email || user.phone || "Utilisateur";
    }
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return "Utilisateur";
      const u = JSON.parse(raw) as {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
      };
      const first = u.firstName?.trim() || "";
      const last = u.lastName?.trim() || "";
      const full = [first, last].filter(Boolean).join(" ").trim();
      return full || u.email || u.phone || "Utilisateur";
    } catch {
      return "Utilisateur";
    }
  }, [user]);

  const formatted = useMemo(() => {
    if (formatBalance) return formatBalance(balance);
    if (currency) {
      try {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
          maximumFractionDigits: 0,
        }).format(balance);
      } catch {
        return `${balance.toLocaleString(locale)} F CFA`;
      }
    }
    return `${balance.toLocaleString(locale)} F CFA`;
  }, [balance, currency, formatBalance, locale]);

  return (
    <div className="sticky top-0 z-40 p-4 animate-slide-up">
        <div className="relative overflow-hidden rounded-2xl gradient-card px-5 py-4 shadow-lg backdrop-blur-sm border border-white/15 h-48">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10" />
            <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-white/5" />
          </div>

          <div className="relative flex items-start justify-between gap-4 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="hidden sm:block h-7 w-10 rounded-md bg-white/15 border border-white/30" />
                <div className="flex items-center gap-2">
                  {leftContent}
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/90">
                    Carte Zongo Pay
                  </p>
                </div>
              </div>
              {subtitle ? (
                <p className="text-xs text-white/90">{subtitle}</p>
              ) : (
                <p className="text-xs text-white/90">{title ?? userName}</p>
              )}
            </div>
            <img
              src={zongoLogo}
              alt="Zongo Pay"
              className="h-14 w-14 rounded-xl object-contain"
            />
          </div>

          <div className="relative flex items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="text-[11px] text-white/80">Solde disponible</p>
              <p className="text-3xl md:text-4xl font-semibold leading-tight text-slate-100">
                {formatted}
              </p>
            </div>
            <div className="space-y-1 text-right text-[11px] text-white/90">
              <p className="tracking-[0.18em] uppercase">
                TOGO • {currency ?? "XOF"}
              </p>
              <p className="text-[10px]">
                Titulaire · {profileInitials}
              </p>
            </div>
          </div>
        </div>
        {children ? <div className="mt-4">{children}</div> : null}
      </div>
  );
};

export default BalanceHeader;
