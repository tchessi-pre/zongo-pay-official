import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CagnotteDetailsHeader from "@/components/cagnottes/CagnotteDetailsHeader";
import CreateCagnotteForm, { type CreateCagnotteFormData } from "@/components/cagnottes/CreateCagnotteForm";

const CreateCagnotte = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateCagnotteFormData>({
    name: "",
    description: "",
    target: "",
    type: "cagnotte",
    endDate: "",
    visibility: "private",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.target) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Simuler la création
    toast.success("Cagnotte créée avec succès !");
    navigate("/cagnottes");
  };

  return (
    <div className="min-h-screen bg-background">
      <CagnotteDetailsHeader
        title="Nouvelle cagnotte"
        description="Créez votre projet d'épargne"
        gradientClass="from-primary to-accent"
        onBack={() => navigate("/cagnottes")}
        onProfileClick={() => navigate("/profile")}
      />

      <div className="container max-w-2xl mx-auto px-4 py-6">
        <CreateCagnotteForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/cagnottes")}
        />
      </div>
    </div>
  );
};

export default CreateCagnotte;
