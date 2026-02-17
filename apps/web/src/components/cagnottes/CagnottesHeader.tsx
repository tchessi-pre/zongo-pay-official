import Header from "@/components/header/Header";
import { getProfileInitials } from "@/lib/utils";

type CagnottesHeaderProps = {
  onBack: () => void;
  onProfileClick: () => void;
};

const CagnottesHeader = ({ onBack, onProfileClick }: CagnottesHeaderProps) => {
  const profileInitials = getProfileInitials();

  return (
    <Header
      title="Mes Cagnottes"
      variant="gradient"
      className="sticky top-0 z-50 rounded-b-[2rem]"
      onBack={onBack}
      profileInitials={profileInitials}
      onProfileClick={onProfileClick}
    >
      <p className="text-white/90 mt-6">Épargnez ensemble pour vos projets communs</p>
    </Header>
  );
};

export default CagnottesHeader;

