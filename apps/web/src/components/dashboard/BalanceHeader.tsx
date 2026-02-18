import { useMemo } from 'react';
import type { ReactNode } from 'react';
import Header from '@/components/header/Header';
import zongoLogo from '@/assets/zongo-logo.png';

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
  title = 'Solde disponible',
  subtitle,
  locale = 'fr-FR',
  currency,
  formatBalance,
  className,
  children,
}: BalanceHeaderProps) => {
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
        // fallthrough
      }
    }
    return `${balance.toLocaleString(locale)} F CFA`;
  }, [balance, currency, formatBalance, locale]);

  return (
    <Header
      variant='gradient'
      className={`sticky top-0 z-40 pb-16 rounded-b-[3rem] animate-fade-in ${className ?? ''
        }`}
      profileInitials={profileInitials}
      onProfileClick={onProfileClick}
    >
      <div className='space-y-2 mt-2 animate-slide-up'>
        <div className='flex items-center justify-between'>
          <p className='text-white/80 text-sm font-medium'>{title}</p>
          <img
            src={zongoLogo}
            alt='Zongo Pay'
            className='h-14 rounded-md'
          />
        </div>
        <h1 className='text-3xl font-bold'>{formatted}</h1>
        {subtitle ? <p className='text-white/60 text-xs'>{subtitle}</p> : null}
        {children}
      </div>
    </Header>
  );
};

export default BalanceHeader;
