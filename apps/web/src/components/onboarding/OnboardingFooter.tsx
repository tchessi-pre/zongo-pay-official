import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

type OnboardingFooterProps = {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
};

const OnboardingFooter = ({
  currentSlide,
  totalSlides,
  onNext,
}: OnboardingFooterProps) => {
  const isLastSlide = currentSlide === totalSlides - 1;

  return (
    <div className="px-4 pb-4 pt-2 space-y-4">
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted"
              }`}
          />
        ))}
      </div>

      <Button onClick={onNext} className="w-full" size="lg">
        {isLastSlide ? "Commencer" : "Suivant"}
        <ChevronRight className="ml-2" />
      </Button>
    </div>
  );
};

export default OnboardingFooter;
