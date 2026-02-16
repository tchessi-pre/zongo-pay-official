import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

type TransactionCommon = {
  id: number;
  name: string;
  amount: number;
  type: "received" | "sent";
  date: string;
};

type TransactionsListProps<T extends TransactionCommon = TransactionCommon> = {
  transactions: T[];
  onSelect: (tx: T) => void;
};

function TransactionsList<T extends TransactionCommon = TransactionCommon>({
  transactions,
  onSelect,
}: TransactionsListProps<T>) {
  return (
    <div className="mt-8 px-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Transactions récentes</h2>
        <Button variant="link" className="text-primary">
          Voir tout
        </Button>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <Card
            key={transaction.id}
            className="p-4 flex items-center justify-between border-0 shadow-soft hover:shadow-card transition-shadow cursor-pointer"
            onClick={() => onSelect(transaction)}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${transaction.type === "received" ? "bg-success/10" : "bg-primary/10"
                  }`}
              >
                {transaction.type === "received" ? (
                  <ArrowDownLeft className="w-5 h-5 text-success" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                )}
              </div>
              <div>
                <p className="font-semibold text-foreground">{transaction.name}</p>
                <p className="text-xs text-muted-foreground">{transaction.date}</p>
              </div>
            </div>
            <p
              className={`font-bold text-md ${transaction.type === "received" ? "text-success" : "text-foreground"
                }`}
            >
              {transaction.amount > 0 ? "+" : ""}
              {transaction.amount.toLocaleString("fr-FR")} F
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TransactionsList;
