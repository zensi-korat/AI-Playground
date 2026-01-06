import type { UseEmblaCarouselType } from 'embla-carousel-react'

type EmblaCarouselType = UseEmblaCarouselType[1]

/**
 * Represents a single subscription plan card with all display information
 */
export interface SubscriptionCard {
  /** Unique identifier for the subscription plan (e.g., "basic", "premium", "enterprise") */
  id: string

  /** Display title of the subscription plan */
  title: string

  /** Optional description or tagline (e.g., "Most Popular", "Best Value") */
  description?: string

  /** Path to character image in /public/clips-images/ */
  characterImage: string

  /** Alt text for character image (accessibility) */
  characterImageAlt: string

  /** Array of feature descriptions shown in the card */
  features: string[]

  /** Monthly price in USD */
  monthlyPrice: number

  /** Yearly price in USD (for annual billing) */
  yearlyPrice: number

  /** Call-to-action button text (e.g., "Start Free Trial", "Get Started") */
  ctaText: string

  /** Optional badge text (e.g., "50% OFF", "NEW") */
  badge?: string
}

/**
 * Billing cycle options for subscription pricing
 */
export type BillingCycle = 'month' | 'year'

/**
 * Props for the main SubscriptionCarousel component
 */
export interface SubscriptionCarouselProps {
  /** Array of subscription cards to display in carousel */
  cards?: SubscriptionCard[]

  /** Initial billing cycle (default: 'month') */
  initialBillingCycle?: BillingCycle

  /** Callback when user clicks CTA button */
  onCtaClick?: (cardId: string, billingCycle: BillingCycle) => void

  /** Whether to show dot indicators (default: true) */
  showDots?: boolean

  /** Whether to enable touch/swipe gestures (default: true) */
  enableSwipe?: boolean

  /** Whether to enable keyboard navigation (default: true) */
  enableKeyboard?: boolean
}

/**
 * Props for carousel navigation buttons
 */
export interface CarouselNavigationProps {
  /** Embla API instance for programmatic control */
  emblaApi: EmblaCarouselType | undefined

  /** Whether previous button should be visible (default: true) */
  showPrevButton?: boolean

  /** Whether next button should be visible (default: true) */
  showNextButton?: boolean
}

/**
 * Props for carousel dot indicators
 */
export interface CarouselDotsProps {
  /** Embla API instance for programmatic control */
  emblaApi: EmblaCarouselType | undefined

  /** Total number of slides */
  slideCount: number
}
