import type { ElementType } from "react";
import HelpCategoryCard from "./HelpCategoryCard";

type HelpCategory = {
  icon: ElementType;
  label: string;
  description: string;
  onClick?: () => void;
};

type HelpCategoryListProps = {
  categories: HelpCategory[];
  className?: string;
};

const HelpCategoryList = ({ categories, className = "space-y-3" }: HelpCategoryListProps) => {
  return (
    <div className={className}>
      {categories.map((c) => (
        <HelpCategoryCard
          key={c.label}
          icon={c.icon}
          label={c.label}
          description={c.description}
          onClick={c.onClick}
        />
      ))}
    </div>
  );
};

export default HelpCategoryList;

