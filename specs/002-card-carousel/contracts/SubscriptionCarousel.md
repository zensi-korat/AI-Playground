# Component Contract: SubscriptionCarousel

**Version**: 1.0.0 | **Date**: 2026-01-06  
**Status**: Draft | **Type**: Composite Component (uses Embla Carousel)

---

## Purpose

Main carousel wrapper component that displays multiple subscription plan cards with smooth slide navigation, dot indicators, and optional touch/keyboard controls. Manages shared billing cycle state across all cards and provides intuitive navigation UI.

---

## API Specification

### Component Signature

```typescript
export function SubscriptionCarousel(
  props: SubscriptionCarouselProps
): JSX.Element;

interface SubscriptionCarouselProps {
  /** Array of subscription cards to display in carousel */
  cards: SubscriptionCard[];

  /** Initial billing cycle (default: 'month') */
  initialBillingCycle?: BillingCycle;

  /** Callback when user clicks CTA button */
  onCtaClick?: (cardId: string, billingCycle: BillingCycle) => void;

  /** Whether to show dot indicators (default: true) */
  showDots?: boolean;

  /** Whether to enable touch/swipe gestures (default: true) */
  enableSwipe?: boolean;

  /** Whether to enable keyboard navigation (default: true) */
  enableKeyboard?: boolean;
}
```

### Props

| Prop                  | Type                                                   | Required | Default     | Description                                            |
| --------------------- | ------------------------------------------------------ | -------- | ----------- | ------------------------------------------------------ |
| `cards`               | `SubscriptionCard[]`                                   | Yes      | -           | Array of 2-5 subscription cards to display             |
| `initialBillingCycle` | `'month' \| 'year'`                                    | No       | `'month'`   | Starting billing cycle for pricing display             |
| `onCtaClick`          | `(cardId: string, billingCycle: BillingCycle) => void` | No       | `undefined` | Callback fired when user clicks CTA button on any card |
| `showDots`            | `boolean`                                              | No       | `true`      | Whether to render dot indicators below carousel        |
| `enableSwipe`         | `boolean`                                              | No       | `true`      | Whether to enable touch/mouse drag gestures            |
| `enableKeyboard`      | `boolean`                                              | No       | `true`      | Whether to enable arrow key navigation                 |

---

## Behavior Specifications

### User Interactions

**Navigation Buttons**:

- Click "Previous" button → Navigate to previous card with slide-left animation
- Click "Next" button → Navigate to next card with slide-right animation
- Wrap-around enabled: Last card → Next → First card, First card → Previous → Last card
- Buttons always visible (only hidden if `cards.length === 1`)

**Dot Indicators** (if `showDots === true`):

- Click any dot → Navigate directly to that card index
- Active dot highlighted with black background, inactive dots gray
- Smooth color transition (300ms) when switching slides
- Accessible: aria-label "Go to slide N", aria-current="true" for active dot

**Touch Gestures** (if `enableSwipe === true`):

- Swipe left → Navigate to next card
- Swipe right → Navigate to previous card
- Incomplete swipe (< 50px horizontal) → Snap back to current card
- Works on both touch devices (mobile/tablet) and mouse drag (desktop)

**Keyboard Navigation** (if `enableKeyboard === true`):

- Focus carousel (Tab to container) → Press Right Arrow → Next card
- Focus carousel → Press Left Arrow → Previous card
- Keyboard events only fire when carousel container has focus (tabIndex={0})

**Billing Cycle Toggle**:

- User changes billing cycle on any card → All cards update immediately
- State persists across card navigation (shared `billingCycle` state)
- Pricing and monthly breakdown update accordingly

**CTA Button Click**:

- User clicks CTA → Fire `onCtaClick(cardId, billingCycle)` callback
- If no callback provided, button still renders but no action occurs

### State Management

**Internal State**:

```typescript
const [billingCycle, setBillingCycle] = useState<BillingCycle>(
  initialBillingCycle || "month"
);
const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: cards.length > 1,
  duration: 30,
  draggable: enableSwipe,
  align: "center",
  dragFree: false,
  containScroll: "trimSnaps",
  slidesToScroll: 1,
});
```

**Derived State**:

- Current slide index: Read from `emblaApi.selectedScrollSnap()`
- Total slides: `cards.length`
- Animation state: Managed internally by Embla

### Edge Cases

1. **Single Card** (`cards.length === 1`):

   - Navigation buttons hidden
   - Dot indicators hidden (or show single inactive dot)
   - Loop disabled in Embla config
   - Swipe/keyboard still work (no-op, stays on same slide)

2. **Rapid Navigation Clicks**:

   - Embla queues actions, processes sequentially
   - No visual glitches or state corruption
   - Each click adds to queue, executes after previous animation completes

3. **Mid-Transition Navigation**:

   - User clicks Next during slide animation → Action queued, executes after current finishes
   - No interruption of ongoing animation (smooth continuation)

4. **Window Resize During Animation**:

   - Embla auto-recalculates slide positions
   - Animation continues smoothly to correct position
   - Responsive padding adjusts via Tailwind breakpoints

5. **Empty Cards Array** (`cards.length === 0`):
   - Render empty state: "No subscription plans available" message
   - No carousel UI (buttons, dots, etc.)

---

## Accessibility

### ARIA Attributes

```tsx
<div
  role="region"
  aria-label="Subscription plans carousel"
  tabIndex={enableKeyboard ? 0 : undefined}
>
  <button aria-label="Previous subscription plan">...</button>
  <button aria-label="Next subscription plan">...</button>

  {/* Dot indicators */}
  <button
    aria-label={`Go to subscription plan ${index + 1}`}
    aria-current={isActive ? "true" : "false"}
  ></button>
</div>
```

### Keyboard Support

| Key         | Action                                    |
| ----------- | ----------------------------------------- |
| Tab         | Focus carousel container, then buttons    |
| Right Arrow | Navigate to next slide (when focused)     |
| Left Arrow  | Navigate to previous slide (when focused) |
| Enter/Space | Activate focused button                   |

### Screen Reader Considerations

- Announce current slide on navigation: "Slide 2 of 3, Premium Plan"
- Announce billing cycle changes: "Switched to yearly billing"
- Navigation buttons have descriptive aria-labels
- Dots have aria-current for active state

---

## Performance Requirements

| Metric                     | Target | Measurement Method                                      |
| -------------------------- | ------ | ------------------------------------------------------- |
| Animation frame rate       | 60fps  | Chrome DevTools Performance tab during slide transition |
| Transition duration        | <500ms | Stopwatch or Performance.now() measurements             |
| Keyboard response          | <100ms | Time from keydown to emblaApi.scrollNext() call         |
| Lighthouse Accessibility   | 90+    | Lighthouse audit in Chrome DevTools                     |
| Touch gesture success rate | 90%+   | Manual testing: 9/10 intentional swipes navigate        |

---

## Styling

### Tailwind Classes

**Container**:

```tsx
<div className="w-full px-4 md:px-8 lg:px-16 py-8">
  <div className="max-w-2xl mx-auto relative">
```

**Embla Viewport**:

```tsx
<div ref={emblaRef} className="overflow-hidden">
```

**Embla Container**:

```tsx
<div className="flex">
```

**Individual Slide**:

```tsx
<div className="min-w-0 flex-[0_0_100%] px-2">
```

**Navigation Buttons**:

```tsx
<Button
  variant="ghost"
  size="icon"
  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md"
>
```

**Dot Indicators**:

```tsx
<div className="flex gap-2 justify-center mt-6">
  <button
    className={cn(
      "w-2 h-2 rounded-full transition-colors duration-300",
      isActive ? "bg-black" : "bg-gray-300 hover:bg-gray-400"
    )}
  />
</div>
```

### Responsive Behavior

- **375px (mobile)**: Full-width slides, small padding (px-4), buttons w-11 h-11
- **768px (tablet)**: Moderate padding (px-8), buttons w-12 h-12
- **1440px (desktop)**: Max-width container (max-w-2xl), centered, same as tablet buttons

---

## Dependencies

| Dependency                 | Version    | Usage                                |
| -------------------------- | ---------- | ------------------------------------ |
| `react`                    | 19.2.0     | Component framework                  |
| `embla-carousel-react`     | ^8.0.0     | Carousel engine (NEW)                |
| `lucide-react`             | (existing) | ChevronLeft, ChevronRight icons      |
| `@/components/ui/button`   | (existing) | Navigation buttons                   |
| `@/components/ui/card`     | (existing) | Card container for each slide        |
| `@/components/FeatureItem` | (existing) | Feature list items                   |
| `@/lib/utils`              | (existing) | `cn` utility for conditional classes |

---

## Usage Example

```tsx
import { SubscriptionCarousel } from "@/components/SubscriptionCarousel";
import type { SubscriptionCard } from "@/types/subscription";

function SubscriptionPage() {
  const cards: SubscriptionCard[] = [
    {
      id: "basic",
      title: "Basic Plan",
      characterImage: "/clips-images/basic.png",
      characterImageAlt: "Basic plan character",
      features: ["Core features", "Email support", "5 GB storage"],
      monthlyPrice: 9.99,
      yearlyPrice: 99.0,
      ctaText: "Start Free Trial",
    },
    {
      id: "premium",
      title: "Premium Plan",
      description: "Most Popular",
      characterImage: "/clips-images/premium.png",
      characterImageAlt: "Premium plan character",
      features: ["All Basic features", "Priority support", "50 GB storage"],
      monthlyPrice: 19.99,
      yearlyPrice: 199.0,
      ctaText: "Get Started",
      badge: "50% OFF",
    },
  ];

  const handleCtaClick = (cardId: string, billingCycle: "month" | "year") => {
    console.log(`User selected ${cardId} with ${billingCycle} billing`);
    // Trigger checkout flow, analytics, etc.
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SubscriptionCarousel
        cards={cards}
        initialBillingCycle="year"
        onCtaClick={handleCtaClick}
        showDots={true}
        enableSwipe={true}
        enableKeyboard={true}
      />
    </div>
  );
}
```

---

## Testing Checklist (Manual Verification)

**Functional Tests**:

- [ ] Click Next button navigates to next card with slide animation
- [ ] Click Previous button navigates to previous card
- [ ] Wrap-around works: Last → Next → First, First → Previous → Last
- [ ] Click dot #2 → Jumps directly to slide 2
- [ ] Swipe left on mobile → Next card
- [ ] Swipe right on mobile → Previous card
- [ ] Focus carousel + Right Arrow → Next card
- [ ] Focus carousel + Left Arrow → Previous card
- [ ] Change billing cycle → All cards update
- [ ] Click CTA → Callback fires with correct cardId and billingCycle

**Edge Case Tests**:

- [ ] Single card: Navigation buttons hidden
- [ ] Rapid click Next 5x → No visual glitches
- [ ] Click Next during animation → Queues action, no crash
- [ ] Resize window during animation → Layout stays intact
- [ ] Empty cards array → Shows "No plans available" message

**Responsive Tests**:

- [ ] 375px mobile: Full-width cards, small buttons
- [ ] 768px tablet: Moderate padding, medium buttons
- [ ] 1440px desktop: Max-width container, centered

**Performance Tests**:

- [ ] Chrome DevTools: Animation at 60fps
- [ ] Transition completes in <500ms
- [ ] Keyboard response <100ms
- [ ] Lighthouse Accessibility score 90+

**Accessibility Tests**:

- [ ] Screen reader announces slide changes
- [ ] All buttons have aria-labels
- [ ] Keyboard navigation works without mouse
- [ ] Focus indicators visible on Tab
- [ ] Color contrast meets WCAG AA standards

---

## Implementation Notes

1. **Install Embla first**: Run `npm install embla-carousel-react` before implementation
2. **Start with P1**: Get basic navigation working before dots (P2) and gestures/keyboard (P3)
3. **Reuse existing components**: Card, Button, FeatureItem from Feature 001
4. **Billing cycle state**: Lift to SubscriptionCarousel, pass down to all card slides
5. **Character images**: Ensure 3-5 images exist in `/public/clips-images/` before testing
6. **Manual verification**: Test at all 3 breakpoints (375px, 768px, 1440px)

---

## Version History

| Version | Date       | Changes                        |
| ------- | ---------- | ------------------------------ |
| 1.0.0   | 2026-01-06 | Initial contract specification |

---

**Contract Status**: ✅ Complete and ready for implementation  
**Next Step**: Generate quickstart guide and implementation tasks
