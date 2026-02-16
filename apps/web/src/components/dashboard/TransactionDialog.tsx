import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

type Transaction = {
  id: number;
  name: string;
  amount: number;
  type: "received" | "sent";
  date: string;
  reference: string;
  status: string;
};

type TransactionDialogProps = {
  transaction: Transaction | null;
  onOpenChange: (open: boolean) => void;
};

const TransactionDialog = ({ transaction, onOpenChange }: TransactionDialogProps) => {
  return (
    <Dialog open={!!transaction} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-center">Détails de la transaction</DialogTitle>
        </DialogHeader>
        {transaction && (
          <div className="space-y-6">
            <div className="text-center py-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  transaction.type === "received" ? "bg-success/10" : "bg-primary/10"
                }`}
              >
                {transaction.type === "received" ? (
                  <ArrowDownLeft className="w-8 h-8 text-success" />
                ) : (
                  <ArrowUpRight className="w-8 h-8 text-primary" />
                )}
              </div>
              <p
                className={`text-3xl font-bold ${
                  transaction.type === "received" ? "text-success" : "text-foreground"
                }`}
              >
                {transaction.amount > 0 ? "+" : ""}
                {transaction.amount.toLocaleString("fr-FR")} F CFA
              </p>
              <p className="text-muted-foreground mt-1">
                {transaction.type === "received" ? "Reçu de" : "Envoyé à"} {transaction.name}
              </p>
            </div>

            <div className="space-y-3 bg-muted/50 rounded-2xl p-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{transaction.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Référence</span>
                <span className="font-medium text-sm">{transaction.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Statut</span>
                <span className="font-medium text-success">{transaction.status}</span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;

