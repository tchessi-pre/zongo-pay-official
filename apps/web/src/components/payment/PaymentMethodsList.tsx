import PaymentMethodCard from "./PaymentMethodCard";
import type { ElementType } from "react";

type PaymentMethod = {
  icon: ElementType;
  name: string;
  number: string;
  primary?: boolean;
};

type PaymentMethodsListProps = {
  methods: PaymentMethod[];
  className?: string;
};

const PaymentMethodsList = ({ methods, className = "space-y-4" }: PaymentMethodsListProps) => {
  return (
    <div className={className}>
      {methods.map((m, idx) => (
        <PaymentMethodCard key={`${m.name}-${idx}`} icon={m.icon} name={m.name} number={m.number} primary={m.primary} />
      ))}
    </div>
  );
};

export default PaymentMethodsList;

