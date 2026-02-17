import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import CagnotteDetailsHeader from "@/components/cagnottes/CagnotteDetailsHeader";
import CagnotteAmountsCard from "@/components/cagnottes/CagnotteAmountsCard";
import ContributeToPoolForm from "@/components/cagnottes/ContributeToPoolForm";

const ContributeToPool = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const cagnotte = {
    id: id,
    name: "Voyage à Kpalimé",
    target: 500000,
    current: 320000,
    color: "from-orange-500 to-amber-500",
  };

  const balance = 125000;

  const handleContribute = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Montant invalide",
        description: "Veuillez entrer un montant valide",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Contribution réussie !",
      description: `Vous avez contribué ${parseFloat(amount).toLocaleString()} F à la cagnotte`,
    });

    setTimeout(() => {
      navigate(`/cagnottes/${id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <CagnotteDetailsHeader
        title="Contribuer maintenant"
        description={cagnotte.name}
        gradientClass={cagnotte.color}
        onBack={() => navigate(`/cagnottes/${id}`)}
        onProfileClick={() => navigate("/profile")}
      />

      <div className="p-6 space-y-4">
        <CagnotteAmountsCard current={cagnotte.current} target={cagnotte.target} />

        <ContributeToPoolForm
          amount={amount}
          message={message}
          balance={balance}
          onAmountChange={setAmount}
          onMessageChange={setMessage}
          onSubmit={handleContribute}
        />
      </div>
    </div>
  );
};

export default ContributeToPool;
