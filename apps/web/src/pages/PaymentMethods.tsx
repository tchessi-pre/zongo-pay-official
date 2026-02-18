import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Smartphone, Building2 } from "lucide-react";
import Header from "@/components/header/Header";
import PaymentMethodsList from "@/components/payment/PaymentMethodsList";

const PaymentMethods = () => {
  const navigate = useNavigate();

  const paymentMethods = [
    { id: 1, type: "mobile", name: "Orange Money", number: "••••56 78", icon: Smartphone, primary: true },
    { id: 2, type: "mobile", name: "MTN Mobile Money", number: "••••12 34", icon: Smartphone, primary: false },
    { id: 3, type: "bank", name: "Banque Atlantique", number: "••••4567", icon: Building2, primary: false },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header
        title="Moyens de paiement"
        variant="gradient"
        onBack={() => navigate("/profile")}
      />

      <div className="px-6 py-6">
        <PaymentMethodsList
          methods={paymentMethods.map(({ icon, name, number, primary }) => ({
            icon,
            name,
            number,
            primary,
          }))}
        />

        <Button className="w-full mt-6" variant="outline">
          <Plus className="w-5 h-5 mr-2" />
          Ajouter un moyen de paiement
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethods;
