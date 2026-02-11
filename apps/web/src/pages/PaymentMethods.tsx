import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Plus, Smartphone, Building2 } from "lucide-react";

const PaymentMethods = () => {
  const navigate = useNavigate();

  const paymentMethods = [
    { id: 1, type: "mobile", name: "Orange Money", number: "••••56 78", icon: Smartphone, primary: true },
    { id: 2, type: "mobile", name: "MTN Mobile Money", number: "••••12 34", icon: Smartphone, primary: false },
    { id: 3, type: "bank", name: "Banque Atlantique", number: "••••4567", icon: Building2, primary: false },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="gradient-card text-white p-6 rounded-b-[2rem]">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className="text-white hover:bg-white/10 -ml-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Moyens de paiement</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <Card key={method.id} className="p-4 border-0 shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{method.name}</p>
                  <p className="text-sm text-muted-foreground">{method.number}</p>
                </div>
                {method.primary && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                    Principal
                  </span>
                )}
              </div>
            </Card>
          );
        })}

        <Button className="w-full mt-6" variant="outline">
          <Plus className="w-5 h-5 mr-2" />
          Ajouter un moyen de paiement
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethods;
