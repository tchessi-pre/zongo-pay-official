import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CagnottesHeader from "@/components/cagnottes/CagnottesHeader";
import CagnotteCard, { type Cagnotte } from "@/components/cagnottes/CagnotteCard";

const Cagnottes = () => {
  const navigate = useNavigate();

  const cagnottes: Cagnotte[] = [
    {
      id: 1,
      name: "Vacances à Grand-Bassam",
      target: 500000,
      current: 325000,
      participants: 8,
      color: "gradient-card",
    },
    {
      id: 2,
      name: "Cadeau d'anniversaire Kofi",
      target: 150000,
      current: 145000,
      participants: 12,
      color: "gradient-success",
    },
    {
      id: 3,
      name: "Projet associatif",
      target: 1000000,
      current: 420000,
      participants: 25,
      color: "bg-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <CagnottesHeader
        onBack={() => navigate("/dashboard")}
        onProfileClick={() => navigate("/profile")}
      />

      {/* Cagnottes list */}
      <div className="p-6 space-y-4 animate-fade-in">
        {cagnottes.map((cagnotte) => (
          <CagnotteCard
            key={cagnotte.id}
            cagnotte={cagnotte}
            onClick={() => navigate(`/cagnottes/${cagnotte.id}`)}
          />
        ))}

        {/* Create new cagnotte */}
        <Button
          onClick={() => navigate("/cagnottes/new")}
          variant="gradient"
          className="w-full"
          size="lg"
        >
          <Plus className="mr-2 w-5 h-5" />
          Créer une cagnotte
        </Button>
      </div>
    </div>
  );
};

export default Cagnottes;
