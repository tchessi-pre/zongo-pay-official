import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { LucideIcon } from "lucide-react";

export type OnboardingSlide = {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
};

type OnboardingCarouselProps = {
  slides: OnboardingSlide[];
  setApi: (api: CarouselApi) => void;
};

const OnboardingCarousel = ({ slides, setApi }: OnboardingCarouselProps) => {
  return (
    <Carousel setApi={setApi} className="flex-1 overflow-hidden">
      <CarouselContent className="h-full">
        {slides.map((slide, index) => {
          const Icon = slide.icon;
          return (
            <CarouselItem key={index} className="h-full">
              <div className="h-full flex flex-col items-center justify-between px-6 py-4 animate-fade-in">
                <div className="w-20 h-20 gradient-card rounded-3xl flex items-center justify-center mb-4 shadow-card">
                  <Icon className="w-10 h-10 text-white" />
                </div>

                <div className="w-full max-w-md mb-4 rounded-3xl overflow-hidden shadow-card flex-1">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="text-center max-w-md space-y-3 animate-slide-up">
                  <h1 className="text-2xl font-bold text-foreground">{slide.title}</h1>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default OnboardingCarousel;
