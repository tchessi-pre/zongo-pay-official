import { Card } from "@/components/ui/card";
import type { ElementType } from "react";

type PaymentMethodCardProps = {
  icon: ElementType;
  name: string;
  number: string;
  primary?: boolean;
};

const PaymentMethodCard = ({ icon: Icon, name, number, primary }: PaymentMethodCardProps) => {
  return (
    <Card className="p-4 border-0 shadow-card">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{number}</p>
        </div>
        {primary && (
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
            Principal
          </span>
        )}
      </div>
    </Card>
  );
};

export default PaymentMethodCard;

