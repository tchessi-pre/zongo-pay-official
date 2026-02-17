import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type CarouselApi } from "@/components/ui/carousel";
import { Send, Users, Wallet } from "lucide-react";
import communityImage from "@/assets/onboarding-community.png";
import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import OnboardingCarousel, { type OnboardingSlide } from "@/components/onboarding/OnboardingCarousel";
import OnboardingFooter from "@/components/onboarding/OnboardingFooter";

const slides: OnboardingSlide[] = [
  {
    icon: Send,
    title: "Paye facilement entre amis",
    description: "Envoie et reçois de l'argent instantanément avec un simple QR code",
    image: communityImage,
  },
  {
    icon: Users,
    title: "Épargne ensemble avec ta communauté",
    description: "Crée des cagnottes et tontines pour réaliser vos projets communs",
    image: communityImage,
  },
  {
    icon: Wallet,
    title: "Tout ton argent, en un seul endroit",
    description: "Gère tes finances simplement et en toute sécurité",
    image: communityImage,
  },
];

const Onboarding = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!api) return;

    setCurrentSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      api?.scrollNext();
    } else {
      navigate("/auth");
    }
  };

  const handleSkip = () => {
    navigate("/auth");
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <OnboardingHeader
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onSkip={handleSkip}
      />

      <OnboardingCarousel slides={slides} setApi={setApi} />

      <OnboardingFooter
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onNext={handleNext}
      />
    </div>
  );
};

export default Onboarding;
