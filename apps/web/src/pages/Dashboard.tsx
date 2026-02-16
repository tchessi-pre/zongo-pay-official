import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Send,
  QrCode,
  Users,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import zongoLogo from "@/assets/zongo-logo.png";
import Header from "@/components/Header";

type TransactionType = "received" | "sent";

type Transaction = {
  id: number;
  name: string;
  amount: number;
  type: TransactionType;
  date: string;
  reference: string;
  status: string;
};

const RECENT_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    name: "Kofi Mensah",
    amount: 15000,
    type: "received",
    date: "Aujourd'hui, 14:30",
    reference: "TXN-2024-001",
    status: "Complété",
  },
  {
    id: 2,
    name: "Aïcha Diallo",
    amount: -8500,
    type: "sent",
    date: "Hier, 09:15",
    reference: "TXN-2024-002",
    status: "Complété",
  },
  {
    id: 3,
    name: "Cagnotte Vacances",
    amount: 20000,
    type: "received",
    date: "Hier, 16:45",
    reference: "TXN-2024-003",
    status: "Complété",
  },
];

type LocalUser = {
  firstName?: string;
  lastName?: string;
};

const getProfileInitials = (): string => {
  if (typeof window === "undefined") return "U";
  try {
    const raw = window.localStorage.getItem("user");
    if (!raw) return "U";
    const parsed = JSON.parse(raw) as LocalUser;
    const parts = [parsed.firstName, parsed.lastName].filter(Boolean) as string[];
    if (!parts.length) return "U";
    return parts
      .map((part) => part.trim()[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  } catch {
    return "U";
  }
};

const Dashboard = () => {
  const [balance] = useState(125000);
  const navigate = useNavigate();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [profileInitials] = useState(getProfileInitials);

  const quickActions = [
    { icon: Send, label: "Envoyer", path: "/send", color: "gradient-card" },
    { icon: QrCode, label: "Scanner", path: "/scan", color: "gradient-success" },
    { icon: ArrowDownLeft, label: "Recevoir", path: "/receive", color: "bg-primary" },
    { icon: Users, label: "Cagnottes", path: "/cagnottes", color: "bg-success" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header
        variant="gradient"
        className="sticky top-0 z-40 pb-16 rounded-b-[3rem]"
        left={<img src={zongoLogo} alt="Zongo Pay" className="h-10 brightness-0 invert" />}
        profileInitials={profileInitials}
        onProfileClick={() => navigate("/profile")}
      >
        <div className="space-y-2 mt-8">
          <p className="text-white/80 text-sm font-medium">Solde disponible</p>
          <h1 className="text-5xl font-bold">{balance.toLocaleString("fr-FR")} F CFA</h1>
        </div>
      </Header>

      {/* Quick Actions */}
      <div className="sticky top-24 z-50 px-6 -mt-12 bg-background pt-2">
        <Card className="p-6 shadow-card border-0">
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div
                    className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center shadow-soft transition-transform group-hover:scale-110`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{action.label}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Recent Transactions */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Transactions récentes</h2>
            <Button variant="link" className="text-primary">
              Voir tout
            </Button>
          </div>

          <div className="space-y-3">
            {RECENT_TRANSACTIONS.map((transaction) => (
              <Card
                key={transaction.id}
                className="p-4 flex items-center justify-between border-0 shadow-soft hover:shadow-card transition-shadow cursor-pointer"
                onClick={() => setSelectedTransaction(transaction)}
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
                  className={`font-bold text-lg ${transaction.type === "received" ? "text-success" : "text-foreground"
                    }`}
                >
                  {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount.toLocaleString("fr-FR")} F
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Detail Dialog */}
      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-center">Détails de la transaction</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-6">
              <div className="text-center py-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${selectedTransaction.type === "received" ? "bg-success/10" : "bg-primary/10"
                    }`}
                >
                  {selectedTransaction.type === "received" ? (
                    <ArrowDownLeft className="w-8 h-8 text-success" />
                  ) : (
                    <ArrowUpRight className="w-8 h-8 text-primary" />
                  )}
                </div>
                <p
                  className={`text-3xl font-bold ${selectedTransaction.type === "received" ? "text-success" : "text-foreground"
                    }`}
                >
                  {selectedTransaction.amount > 0 ? "+" : ""}
                  {selectedTransaction.amount.toLocaleString("fr-FR")} F CFA
                </p>
                <p className="text-muted-foreground mt-1">
                  {selectedTransaction.type === "received" ? "Reçu de" : "Envoyé à"} {selectedTransaction.name}
                </p>
              </div>

              <div className="space-y-3 bg-muted/50 rounded-2xl p-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{selectedTransaction.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Référence</span>
                  <span className="font-medium text-sm">{selectedTransaction.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Statut</span>
                  <span className="font-medium text-success">{selectedTransaction.status}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
