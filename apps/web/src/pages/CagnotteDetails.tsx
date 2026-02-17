import { useNavigate, useParams } from "react-router-dom";
import CagnotteDetailsHeader from "@/components/cagnottes/CagnotteDetailsHeader";
import CagnotteAmountsCard from "@/components/cagnottes/CagnotteAmountsCard";
import CagnotteInfoGrid from "@/components/cagnottes/CagnotteInfoGrid";
import CagnotteContributionsCard from "@/components/cagnottes/CagnotteContributionsCard";
import CagnotteActions from "@/components/cagnottes/CagnotteActions";

const CagnotteDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const cagnotte = {
    id: id,
    name: "Voyage à Kpalimé",
    target: 500000,
    current: 320000,
    participants: [
      { name: "Kofi A.", amount: 50000, date: "2024-01-15" },
      { name: "Ama B.", amount: 75000, date: "2024-01-14" },
      { name: "Kwame C.", amount: 100000, date: "2024-01-12" },
      { name: "Efua D.", amount: 45000, date: "2024-01-10" },
      { name: "Yao E.", amount: 50000, date: "2024-01-08" },
    ],
    deadline: "2024-06-30",
    color: "from-orange-500 to-amber-500",
    description: "Épargne collective pour notre voyage de fin d'année à Kpalimé",
    createdBy: "Kofi A.",
    createdDate: "2024-01-05"
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <CagnotteDetailsHeader
        title={cagnotte.name}
        description={cagnotte.description}
        gradientClass={cagnotte.color}
        onBack={() => navigate("/cagnottes")}
        onProfileClick={() => navigate("/profile")}
      />

      <div className="p-6 space-y-4">
        <CagnotteAmountsCard current={cagnotte.current} target={cagnotte.target} />

        <CagnotteInfoGrid
          participantsCount={cagnotte.participants.length}
          remaining={cagnotte.target - cagnotte.current}
          deadlineLabel={"30 Jun"}
        />

        <CagnotteContributionsCard participants={cagnotte.participants} />

        <CagnotteActions
          onContribute={() => navigate(`/cagnottes/${id}/contribute`)}
          onInvite={() => navigate(`/cagnottes/${id}/invite`)}
        />
      </div>
    </div>
  );
};

export default CagnotteDetails;
