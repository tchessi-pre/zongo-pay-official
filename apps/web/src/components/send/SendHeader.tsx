import Header from "@/components/header/Header";

type SendHeaderProps = {
  profileInitials: string;
  onBack: () => void;
  onProfileClick: () => void;
  title?: string;
};

const SendHeader = ({
  profileInitials,
  onBack,
  onProfileClick,
  title = "Envoyer de l'argent",
}: SendHeaderProps) => {
  return (
    <Header
      title={title}
      variant="gradient"
      className="sticky top-0 z-50 rounded-b-[1rem]"
      onBack={onBack}
      profileInitials={profileInitials}
      onProfileClick={onProfileClick}
    />
  );
};

export default SendHeader;

