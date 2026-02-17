import zongoLogo from "@/assets/zongo-logo.png";

type OnboardingHeaderProps = {
  currentSlide: number;
  totalSlides: number;
  onSkip: () => void;
};

const OnboardingHeader = ({
  currentSlide,
  totalSlides,
  onSkip,
}: OnboardingHeaderProps) => {
  const showSkip = currentSlide < totalSlides - 1;

  return (
    <div className="px-4 pt-4 pb-2 flex justify-between items-center">
      <img src={zongoLogo} alt="Zongo Pay" className="h-8" />
      {showSkip && (
        <button
          onClick={onSkip}
          className="text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          Passer
        </button>
      )}
    </div>
  );
};

export default OnboardingHeader;
