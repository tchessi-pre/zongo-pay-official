import Header from "@/components/header/Header";
import { getProfileInitials } from "@/lib/utils";

type CagnotteDetailsHeaderProps = {
  title: string;
  description: string;
  gradientClass: string;
  onBack: () => void;
  onProfileClick: () => void;
};

const CagnotteDetailsHeader = ({
  title,
  description,
  gradientClass,
  onBack,
  onProfileClick,
}: CagnotteDetailsHeaderProps) => {
  const profileInitials = getProfileInitials();

  return (
    <Header
      containerClassName={`sticky top-0 z-50 bg-gradient-to-br ${gradientClass} rounded-b-[2rem] p-6 text-white`}
      onBack={onBack}
      profileInitials={profileInitials}
      onProfileClick={onProfileClick}
    >
      <div className="space-y-2 mt-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-white/90 text-sm">{description}</p>
      </div>
    </Header>
  );
};

export default CagnotteDetailsHeader;

