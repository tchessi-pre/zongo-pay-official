import Header from "@/components/header/Header";

type ReceiveHeaderProps = {
  profileInitials: string;
  onBack: () => void;
  onProfileClick: () => void;
  title?: string;
};

const ReceiveHeader = ({
  profileInitials,
  onBack,
  onProfileClick,
  title = "Recevoir de l'argent",
}: ReceiveHeaderProps) => {
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

export default ReceiveHeader;

