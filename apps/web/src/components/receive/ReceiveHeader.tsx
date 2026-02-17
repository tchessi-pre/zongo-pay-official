import Header from "@/components/Header";

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
      className="sticky top-0 z-50 rounded-b-[2rem]"
      onBack={onBack}
      profileInitials={profileInitials}
      onProfileClick={onProfileClick}
    />
  );
};

export default ReceiveHeader;

