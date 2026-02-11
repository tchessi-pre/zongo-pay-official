import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { ChevronRight, Send, Users, Wallet } from "lucide-react";
import zongoLogo from "@/assets/zongo-logo.png";
import communityImage from "@/assets/onboarding-community.png";

const slides = [
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with logo */}
      <div className="p-6 flex justify-between items-center">
        <img src={zongoLogo} alt="Zongo Pay" className="h-10" />
        {currentSlide < slides.length - 1 && (
          <button
            onClick={handleSkip}
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Passer
          </button>
        )}
      </div>

      {/* Main content */}
      <Carousel setApi={setApi} className="flex-1">
        <CarouselContent className="h-full">
          {slides.map((slide, index) => {
            const Icon = slide.icon;
            return (
              <CarouselItem key={index} className="h-full">
                <div className="h-full flex flex-col items-center justify-center px-6 pb-12 animate-fade-in">
                  {/* Icon with gradient background */}
                  <div className="w-24 h-24 gradient-card rounded-3xl flex items-center justify-center mb-8 shadow-card">
                    <Icon className="w-12 h-12 text-white" />
                  </div>

                  {/* Image */}
                  <div className="w-full max-w-md mb-8 rounded-3xl overflow-hidden shadow-card">
                    <img src={slide.image} alt={slide.title} className="w-full h-64 object-cover" />
                  </div>

                  {/* Text content */}
                  <div className="text-center max-w-md space-y-4 animate-slide-up">
                    <h1 className="text-3xl font-bold text-foreground">{slide.title}</h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">{slide.description}</p>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Footer with dots and button */}
      <div className="p-6 space-y-6">
        {/* Dots indicator */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
            />
          ))}
        </div>

        {/* Next button */}
        <Button onClick={handleNext} className="w-full" size="lg">
          {currentSlide < slides.length - 1 ? "Suivant" : "Commencer"}
          <ChevronRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
