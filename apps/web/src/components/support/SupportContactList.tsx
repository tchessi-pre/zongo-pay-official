import type { ElementType } from "react";
import SupportContactCard from "./SupportContactCard";

type SupportContact = {
  icon: ElementType;
  label: string;
  description: string;
  action?: string;
};

type SupportContactListProps = {
  contacts: SupportContact[];
  className?: string;
};

const SupportContactList = ({ contacts, className = "space-y-3 pt-2" }: SupportContactListProps) => {
  return (
    <div className={className}>
      {contacts.map((c) => (
        <SupportContactCard
          key={c.label}
          icon={c.icon}
          label={c.label}
          description={c.description}
          action={c.action}
        />
      ))}
    </div>
  );
};

export default SupportContactList;

