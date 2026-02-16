type PendingScanData = {
  recipient: string;
  amount: string;
  provider?: "tmoney" | "moov";
};

type PendingScanBannerProps = {
  pendingScan: PendingScanData | null;
  onUse: () => void;
  onIgnore: () => void;
};

const PendingScanBanner = ({ pendingScan, onUse, onIgnore }: PendingScanBannerProps) => {
  if (!pendingScan) return null;
  return (
    <div className="px-6 pt-4">
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-2">
        <p className="text-xs font-semibold text-primary uppercase tracking-wide">
          Informations scannées
        </p>
        <p className="text-sm text-foreground">
          Destinataire: <span className="font-semibold">{pendingScan.recipient}</span>
        </p>
        <p className="text-sm text-foreground">
          Montant:{" "}
          <span className="font-semibold">
            {Number(pendingScan.amount).toLocaleString("fr-FR")} F CFA
          </span>
        </p>
        {pendingScan.provider && (
          <p className="text-sm text-foreground">
            Opérateur:{" "}
            <span className="font-semibold">
              {pendingScan.provider === "tmoney" ? "T-Money" : "Moov Money"}
            </span>
          </p>
        )}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onUse}
            className="flex-1 h-10 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
          >
            Utiliser ces infos
          </button>
          <button
            type="button"
            onClick={onIgnore}
            className="flex-1 h-10 rounded-xl border border-muted bg-background text-sm font-semibold text-muted-foreground"
          >
            Ignorer
          </button>
        </div>
      </div>
    </div>
  );
};

export type { PendingScanData, PendingScanBannerProps };
export default PendingScanBanner;

