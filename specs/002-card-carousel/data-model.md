# Data Model & Architecture: Card Carousel Slider

**Feature**: Card Carousel Slider | **Date**: 2026-01-06  
**Purpose**: Define TypeScript interfaces, component structure, and data flow

---

## TypeScript Interfaces

### Core Data Types

```typescript
// File: src/types/subscription.ts

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
  cards: SubscriptionCard[]
  
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
 * Props for individual subscription card component
 */
export interface SubscriptionCardComponentProps {
  /** Subscription card data */
  card: SubscriptionCard
  
  /** Current billing cycle (month or year) */
  billingCycle: BillingCycle
  
  /** Callback to change billing cycle */
  onBillingCycleChange: (cycle: BillingCycle) => void
  
  /** Callback when CTA button clicked */
  onCtaClick: () => void
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
```

---

## Component Architecture

### Component Hierarchy

```text
<SubscriptionCarousel>                      # Main carousel wrapper
├── <div ref={emblaRef}>                    # Embla viewport (required structure)
│   └── <div className="flex">              # Embla container (horizontal flexbox)
│       ├── <SubscriptionCardSlide>         # Slide 1: Card + controls wrapper
│       │   └── <SubscriptionCardContent>   # Card content (reuses existing layout)
│       │       ├── <Card>                  # shadcn/ui Card
│       │       │   ├── <img>               # Character image
│       │       │   ├── <h2>                # Card title
│       │       │   ├── <p>                 # Description (optional)
│       │       │   ├── <PricingToggle>     # Billing cycle buttons
│       │       │   ├── <ul>                # Features list
│       │       │   │   └── <FeatureItem>   # Reuse existing component
│       │       │   ├── <Button>            # CTA button
│       │       │   └── <footer>            # Security badge + links
│       ├── <SubscriptionCardSlide>         # Slide 2...
│       └── <SubscriptionCardSlide>         # Slide N...
├── <CarouselNavigation>                    # Prev/Next buttons
│   ├── <Button variant="ghost">            # Previous button (ChevronLeft icon)
│   └── <Button variant="ghost">            # Next button (ChevronRight icon)
└── <CarouselDots>                          # Dot indicators (P2)
    └── <button>×N                          # One button per slide
```

### Component Responsibilities

| Component                     | Responsibility                                                                 | State Managed                   |
| ----------------------------- | ------------------------------------------------------------------------------ | ------------------------------- |
| `SubscriptionCarousel`        | Top-level container, Embla initialization, keyboard events, billing cycle state | `billingCycle`, `emblaApi`      |
| `SubscriptionCardSlide`       | Wrapper for individual slide (min-w-0 flex-[0_0_100%] for full-width)         | None (presentational)           |
| `SubscriptionCardContent`     | Card content layout (reuses existing SubscriptionPage structure)               | None (receives props)           |
| `PricingToggle`               | Monthly/Yearly toggle buttons                                                  | None (controlled by parent)     |
| `CarouselNavigation`          | Previous/Next navigation buttons with click handlers                           | None (calls Embla API methods)  |
| `CarouselDots`                | Dot indicators with click-to-navigate functionality                            | `selectedIndex` (from Embla)    |
| `FeatureItem`                 | Feature list item with check icon (existing, reused)                           | None (presentational)           |

---

## Data Flow

### State Management

```typescript
// SubscriptionCarousel component state
const [billingCycle, setBillingCycle] = useState<BillingCycle>('month')
const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: true,           // Wrap-around navigation
  duration: 30,         // Animation duration
  draggable: true,      // Enable touch/swipe
  align: 'center',      // Center-align slides
})
```

### Data Flow Diagram

```text
User Action                 Component                     State/API
───────────                 ─────────                     ─────────

Click "Next" ──────────> CarouselNavigation ─────────> emblaApi.scrollNext()
                                                           │
                                                           ├─> Embla updates internal state
                                                           └─> Triggers 'select' event
                                                                 │
                                                                 └─> CarouselDots listens
                                                                      └─> Updates selectedIndex

Click "Monthly" ───────> PricingToggle ───────────────> setBillingCycle('month')
                                                           │
                                                           └─> Re-renders all cards
                                                                └─> Shows monthly pricing

Swipe Left ────────────> Embla viewport ───────────────> emblaApi.scrollNext()
                         (draggable:true)                  │
                                                           └─> Same as "Next" button

Press Right Arrow ─────> SubscriptionCarousel ──────────> emblaApi.scrollNext()
                         (keydown listener)                │
                                                           └─> Same as "Next" button

Click Dot #2 ──────────> CarouselDots ─────────────────> emblaApi.scrollTo(2)
                                                           │
                                                           └─> Jumps to slide 2
```

---

## Styling Strategy

### Tailwind CSS Classes

**Carousel Container**:
```tsx
<div className="w-full px-4 md:px-8 lg:px-16 py-8">
  <div className="max-w-2xl mx-auto relative">
    {/* Embla viewport */}
  </div>
</div>
```

**Embla Viewport** (required by Embla):
```tsx
<div ref={emblaRef} className="overflow-hidden">
  {/* Embla container */}
</div>
```

**Embla Container** (horizontal scroll):
```tsx
<div className="flex">
  {/* Slides */}
</div>
```

**Individual Slide** (full-width, no shrink):
```tsx
<div className="min-w-0 flex-[0_0_100%]">
  {/* Card content */}
</div>
```

**Navigation Buttons**:
```tsx
// Previous button (absolute positioned)
<Button
  variant="ghost"
  size="icon"
  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-12 md:h-12"
  aria-label="Previous card"
>
  <ChevronLeft className="h-6 w-6" />
</Button>

// Next button (absolute positioned)
<Button
  variant="ghost"
  size="icon"
  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-12 md:h-12"
  aria-label="Next card"
>
  <ChevronRight className="h-6 w-6" />
</Button>
```

**Dot Indicators**:
```tsx
<div className="flex gap-2 justify-center mt-6">
  <button
    className={cn(
      "w-2 h-2 rounded-full transition-colors duration-300",
      isActive ? "bg-black" : "bg-gray-300 hover:bg-gray-400"
    )}
    aria-label={`Go to slide ${index + 1}`}
    aria-current={isActive ? "true" : "false"}
  />
</div>
```

**Responsive Adjustments**:
- **Mobile (375px)**: Smaller buttons (w-11 h-11), tighter padding (px-4)
- **Tablet (768px)**: Medium buttons (w-12 h-12), moderate padding (px-8)
- **Desktop (1440px)**: Same as tablet, max-width container (max-w-2xl)

---

## Animation Specifications

### Embla Configuration

```typescript
const emblaOptions: EmblaOptionsType = {
  loop: true,              // Enable wrap-around (FR-005)
  duration: 30,            // Animation speed (Embla units, ~400ms real-time)
  skipSnaps: false,        // Smooth scroll to each slide
  align: 'center',         // Center-align slides in viewport
  draggable: true,         // Enable touch/mouse dragging (FR-008)
  dragFree: false,         // Snap to slides (not free-scroll)
  containScroll: 'trimSnaps',  // Clean edge behavior
  slidesToScroll: 1,       // Navigate one slide at a time
}
```

### CSS Transitions

Embla handles slide transitions internally. Additional transitions for UI elements:

```css
/* Dot indicator transition (300ms color change) */
.carousel-dot {
  transition: background-color 300ms ease-in-out;
}

/* Navigation button hover (200ms opacity change) */
.carousel-nav-button {
  transition: opacity 200ms ease-in-out;
}

/* Pricing toggle button (150ms color change) */
.pricing-toggle-button {
  transition: background-color 150ms ease-in-out, color 150ms ease-in-out;
}
```

**Performance Target**: All animations maintain 60fps (16.67ms per frame)

---

## Accessibility Considerations

### ARIA Labels

```tsx
// Main carousel container
<div role="region" aria-label="Subscription plans carousel" tabIndex={0}>

// Navigation buttons
<Button aria-label="Previous subscription plan" />
<Button aria-label="Next subscription plan" />

// Dot indicators
<button
  aria-label={`Go to subscription plan ${index + 1}`}
  aria-current={isActive ? "true" : "false"}
/>

// Individual slides (for screen readers)
<div role="group" aria-label={`Subscription plan: ${card.title}`}>
```

### Keyboard Navigation

- **Tab**: Focus carousel container, then navigation buttons, then dots
- **Left Arrow**: Navigate to previous slide (when carousel focused)
- **Right Arrow**: Navigate to next slide (when carousel focused)
- **Enter/Space**: Activate focused button (navigation or dot)

### Screen Reader Announcements

- Announce current slide when navigation occurs: "Slide 2 of 3, Premium Plan"
- Announce billing cycle changes: "Switched to yearly billing"
- Announce when wrap-around occurs: "Wrapped to first slide" (optional)

---

## Edge Case Handling

### Single Card Scenario (FR-006 Edge Case)

```typescript
// Hide navigation when only 1 card
const showNavigation = cards.length > 1

// Disable loop when only 1 card
const emblaOptions = {
  loop: cards.length > 1,
  // ... other options
}
```

### Rapid Clicking Protection

Embla internally debounces navigation calls. No additional guard needed unless performance issues observed during manual testing.

### Mid-Transition Click Handling

Embla queues navigation actions. If user clicks during transition, the next action executes after current animation completes. No custom logic required.

### Variable Card Heights

```typescript
// Option 1: Fixed height (recommended for consistency)
<div className="min-h-[600px]">

// Option 2: Dynamic height (smooth transition with CSS)
<div style={{ minHeight: `${maxCardHeight}px` }}>
```

**Recommendation**: Use fixed min-height (600px mobile, 650px desktop) to prevent layout shift.

---

## File Structure Summary

```text
src/
├── types/
│   └── subscription.ts              # All TypeScript interfaces (NEW)
├── components/
│   ├── SubscriptionCarousel.tsx     # Main carousel component (NEW)
│   ├── SubscriptionCardSlide.tsx    # Individual slide wrapper (NEW)
│   ├── CarouselNavigation.tsx       # Prev/Next buttons (NEW)
│   ├── CarouselDots.tsx             # Dot indicators (NEW)
│   ├── FeatureItem.tsx              # Reused from Feature 001
│   └── ui/
│       ├── button.tsx               # shadcn/ui (existing)
│       └── card.tsx                 # shadcn/ui (existing)
├── hooks/
│   └── useCarouselKeyboard.ts       # Keyboard navigation hook (NEW - optional)
└── pages/
    └── SubscriptionPage.tsx         # Updated to use SubscriptionCarousel
```

**Total New Files**: 6 (subscription.ts, 4 components, 1 optional hook)  
**Modified Files**: 1 (SubscriptionPage.tsx)

---

## Sample Card Data Structure

```typescript
// Example hardcoded data in SubscriptionCarousel.tsx
const subscriptionCards: SubscriptionCard[] = [
  {
    id: 'basic',
    title: 'Basic Plan',
    description: 'Perfect for individuals',
    characterImage: '/clips-images/character-basic.png',
    characterImageAlt: 'Basic plan character illustration',
    features: [
      'Access to core features',
      'Email support',
      '5 GB storage',
      'Basic analytics',
    ],
    monthlyPrice: 9.99,
    yearlyPrice: 99.00,
    ctaText: 'Start Free Trial',
  },
  {
    id: 'premium',
    title: 'Premium Plan',
    description: 'Most Popular',
    characterImage: '/clips-images/character-premium.png',
    characterImageAlt: 'Premium plan character illustration',
    features: [
      'All Basic features',
      'Priority support',
      '50 GB storage',
      'Advanced analytics',
      'Custom integrations',
    ],
    monthlyPrice: 19.99,
    yearlyPrice: 199.00,
    ctaText: 'Get Started',
    badge: '50% OFF',
  },
  {
    id: 'enterprise',
    title: 'Enterprise Plan',
    description: 'For large teams',
    characterImage: '/clips-images/character-enterprise.png',
    characterImageAlt: 'Enterprise plan character illustration',
    features: [
      'All Premium features',
      '24/7 phone support',
      'Unlimited storage',
      'Custom analytics',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    monthlyPrice: 49.99,
    yearlyPrice: 499.00,
    ctaText: 'Contact Sales',
  },
]
```

---

**Data Model Complete**: ✅ All interfaces and architecture documented  
**Next Step**: Generate component contracts
