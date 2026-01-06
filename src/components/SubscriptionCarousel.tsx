import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FeatureItem } from "@/components/FeatureItem";
import { cn } from "@/lib/utils";
import type {
  SubscriptionCarouselProps,
  BillingCycle,
  SubscriptionCard,
} from "@/types/subscription";

// Hardcoded subscription cards data (T007)
const SUBSCRIPTION_CARDS: SubscriptionCard[] = [
  {
    id: "basic",
    title: "Basic Plan",
    description: "Perfect for individuals",
    characterImage: "/clips-images/avatar-1.png",
    characterImageAlt: "Basic plan character illustration",
    features: [
      "Unlimited Text Messages",
      "View Character Stories",
      "Access to core features",
      "Email support",
      "5 GB storage",
    ],
    monthlyPrice: 9.99,
    yearlyPrice: 99.0,
    ctaText: "Start Free Trial",
  },
  {
    id: "premium",
    title: "Premium Plan",
    description: "Most Popular",
    characterImage: "/clips-images/user-profile-1.png",
    characterImageAlt: "Premium plan character illustration",
    features: [
      "Unlimited Text Messages",
      "View Character Stories",
      "Unlimited Audio Messages",
      "600 Character Limit On Enhanced Memory",
      "Enhanced Memory Context",
      "Remove Ads",
    ],
    monthlyPrice: 19.99,
    yearlyPrice: 199.0,
    ctaText: "Get Started",
    badge: "50% OFF",
  },
  {
    id: "enterprise",
    title: "Enterprise Plan",
    description: "For large teams",
    characterImage: "/clips-images/show-thumb-1.png",
    characterImageAlt: "Enterprise plan character illustration",
    features: [
      "All Premium features",
      "24/7 phone support",
      "Unlimited storage",
      "Custom analytics",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    monthlyPrice: 49.99,
    yearlyPrice: 499.0,
    ctaText: "Contact Sales",
  },
];

export function SubscriptionCarousel({
  cards = SUBSCRIPTION_CARDS,
  initialBillingCycle = "month",
  onCtaClick,
  showDots = true,
  enableSwipe = true,
  enableKeyboard = true,
}: SubscriptionCarouselProps) {
  const [billingCycle, setBillingCycle] =
    useState<BillingCycle>(initialBillingCycle);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Initialize Embla Carousel with configuration (T008, T009)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: cards.length > 1,
      duration: 30, // ~400ms transition
      align: "center",
      dragFree: false, // T026: Snap-to-slide behavior
      containScroll: "trimSnaps", // T026: Clean edge handling
      slidesToScroll: 1,
    },
    enableSwipe ? [] : undefined // T025: Enable swipe via plugins array (empty = default drag plugin)
  );

  // Navigation callbacks (T016, T017)
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  // Track selected index for dot indicators (T020)
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Keyboard navigation (T029-T032)
  useEffect(() => {
    if (!emblaApi || !enableKeyboard) return;

    const container = document.querySelector(
      '[role="region"][aria-label="Subscription plans carousel"]'
    );
    if (!container) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        scrollNext();
      }
    };

    container.addEventListener("keydown", handleKeyDown as EventListener);

    return () => {
      container.removeEventListener("keydown", handleKeyDown as EventListener);
    };
  }, [emblaApi, enableKeyboard, scrollPrev, scrollNext]);

  // Handle empty cards array (T040 edge case)
  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-100 text-gray-500">
        No subscription plans available
      </div>
    );
  }

  const showNavigation = cards.length > 1;

  return (
    <div className="flex min-h-screen w-full bg-white text-black overflow-auto">
      <main className="flex-1 flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-md relative">
          {/* Embla Carousel Container (T009, T010) */}
          <div
            ref={emblaRef}
            className="overflow-hidden"
            tabIndex={enableKeyboard ? 0 : undefined} // T029: Keyboard focus
            role="region" // T030: Accessibility
            aria-label="Subscription plans carousel" // T030: Accessibility
          >
            <div className="flex">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="min-w-0 flex-[0_0_100%]" // T010: Full-width slides
                >
                  {/* Card Content (T011-T015) */}
                  <Card className="bg-white border border-gray-200 overflow-hidden shadow-sm">
                    {/* Character Image */}
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={card.characterImage}
                        alt={card.characterImageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <CardContent className="space-y-6 pt-6 px-6">
                      {/* Title & Badge */}
                      {card.badge && (
                        <div className="text-center">
                          <span className="inline-block bg-black text-white text-xs px-3 py-1 rounded-full">
                            {card.badge}
                          </span>
                        </div>
                      )}

                      {/* Features List (T014) */}
                      <ul className="space-y-3">
                        {card.features.map((feature, idx) => (
                          <FeatureItem key={idx} text={feature} />
                        ))}
                      </ul>

                      {/* Pricing Toggle (T012, T013) */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setBillingCycle("month")}
                          className={cn(
                            "rounded-lg py-4 px-3 text-center transition-all border-2",
                            billingCycle === "month"
                              ? "border-black bg-white"
                              : "border-gray-300 bg-white hover:border-gray-400"
                          )}
                        >
                          <div className="text-xs text-gray-600 mb-1">
                            Per Month
                          </div>
                          <div className="text-2xl font-black text-black">
                            $ {card.monthlyPrice.toFixed(2)}
                          </div>
                        </button>
                        <button
                          onClick={() => setBillingCycle("year")}
                          className={cn(
                            "rounded-lg py-4 px-3 text-center transition-all border-2",
                            billingCycle === "year"
                              ? "border-black bg-white"
                              : "border-gray-300 bg-white hover:border-gray-400"
                          )}
                        >
                          <div className="text-xs text-gray-600 mb-1">
                            Per Year
                          </div>
                          <div className="text-2xl font-black text-black">
                            $ {card.yearlyPrice.toFixed(0)}
                          </div>
                          <div className="text-[10px] text-gray-500 mt-1">
                            USD {(card.yearlyPrice / 12).toFixed(2)} / Month
                          </div>
                        </button>
                      </div>
                    </CardContent>

                    <CardFooter className="flex-col gap-4 px-6 pb-6">
                      {/* Security Badge */}
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <svg
                          className="h-3 w-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Secured with App Store, Cancel anytime</span>
                      </div>

                      {/* CTA Button (T015) */}
                      <Button
                        className="w-full text-white rounded-lg h-12 text-base font-semibold"
                        style={{
                          backgroundColor: "var(--fg-brand-primary)",
                        }}
                        onClick={() => onCtaClick?.(card.id, billingCycle)}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "var(--fg-brand-primary-hover, #2a85e0)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "var(--fg-brand-primary)")
                        }
                      >
                        {card.ctaText} →
                      </Button>

                      {/* Footer Links */}
                      <div className="flex gap-3 text-[10px] text-gray-500 justify-center">
                        <a href="#" className="hover:text-gray-700 underline">
                          Privacy Policy
                        </a>
                        <span>|</span>
                        <a href="#" className="hover:text-gray-700 underline">
                          User Agreement
                        </a>
                        <span>|</span>
                        <a href="#" className="hover:text-gray-700 underline">
                          EULA
                        </a>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons (T016-T018) */}
          {showNavigation && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md"
                aria-label="Previous subscription plan"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md"
                aria-label="Next subscription plan"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Dot Indicators (T020-T024) */}
          {showDots && showNavigation && (
            <div className="flex gap-2 justify-center mt-6">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)} // T023: Click-to-navigate
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors duration-300", // T022: Styling
                    index === selectedIndex
                      ? "bg-black"
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                  aria-label={`Go to subscription plan ${index + 1}`} // T024: Accessibility
                  aria-current={index === selectedIndex ? "true" : "false"} // T024: Accessibility
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
