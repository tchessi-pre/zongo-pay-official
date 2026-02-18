import Header from "@/components/header/Header";

type ScanHeaderProps = {
  profileInitials: string;
  onBack: () => void;
  onProfileClick: () => void;
  title?: string;
};

const ScanHeader = ({
  profileInitials,
  onBack,
  onProfileClick,
  title = "Scanner un QR code",
}: ScanHeaderProps) => {
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

export default ScanHeader;

