import { useMemo } from "react";
import type { ReactNode } from "react";
import Header from "@/components/header/Header";
import zongoLogo from "@/assets/zongo-logo.png";

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
  onProfileClick,
  title = "Solde disponible",
  subtitle,
  locale = "fr-FR",
  currency,
  formatBalance,
  className,
  leftContent,
  children,
}: BalanceHeaderProps) => {
  const formatted = useMemo(() => {
    if (formatBalance) return formatBalance(balance);
    if (currency) {
      try {
        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency,
          maximumFractionDigits: 0,
        }).format(balance);
      } catch {
        // fallthrough
      }
    }
    return `${balance.toLocaleString(locale)} F CFA`;
  }, [balance, currency, formatBalance, locale]);

  return (
    <Header
      variant="gradient"
      className={`sticky top-0 z-40 pb-16 rounded-b-[3rem] ${className ?? ""}`}
      left={
        leftContent ?? (
          <img src={zongoLogo} alt="Zongo Pay" className="h-12 brightness-0 invert" />
        )
      }
      profileInitials={profileInitials}
      onProfileClick={onProfileClick}
    >
      <div className="space-y-2 mt-8">
        <p className="text-white/80 text-sm font-medium">{title}</p>
        <h1 className="text-4xl font-bold">{formatted}</h1>
        {subtitle ? <p className="text-white/60 text-xs">{subtitle}</p> : null}
        {children}
      </div>
    </Header>
  );
};

export default BalanceHeader;
