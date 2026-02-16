import { useState } from "react";
import {
  Send,
  QrCode,
  Users,
  ArrowDownLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BalanceHeader from "@/components/dashboard/BalanceHeader";
import QuickActions from "@/components/dashboard/QuickActions";
import TransactionsList from "@/components/dashboard/TransactionsList";
import TransactionDialog from "@/components/dashboard/TransactionDialog";
import { getProfileInitials } from "@/lib/utils";

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
      <BalanceHeader
        balance={balance}
        profileInitials={profileInitials}
        onProfileClick={() => navigate("/profile")}
      />

      <QuickActions actions={quickActions} onNavigate={(p) => navigate(p)} />
      <TransactionsList
        transactions={RECENT_TRANSACTIONS}
        onSelect={(tx) => setSelectedTransaction(tx)}
      />

      <TransactionDialog
        transaction={selectedTransaction}
        onOpenChange={() => setSelectedTransaction(null)}
      />
    </div>
  );
};

export default Dashboard;
