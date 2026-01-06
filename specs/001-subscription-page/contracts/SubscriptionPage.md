# Component Contract: SubscriptionPage

**Component**: `src/pages/SubscriptionPage.tsx`  
**Type**: Page Component (React Functional Component)  
**Status**: To be implemented  
**Phase**: Phase 1

## Overview

The SubscriptionPage is a self-contained page component that displays a subscription pricing offer with interactive pricing toggle. It manages local state for billing cycle selection (monthly/yearly) and renders a card-based layout with features, pricing options, security messaging, and call-to-action button.

## Component Signature

```typescript
export default function SubscriptionPage(): JSX.Element;
```

**Props**: None (self-contained; no props accepted)

**Returns**: `JSX.Element` - The complete subscription page component tree

## Responsibilities

1. **Render card-based layout** - Display main Card component with proper spacing and responsive width
2. **Manage billing cycle state** - Track and update selected pricing tier (monthly/yearly)
3. **Render feature list** - Display 6 subscription features with checkmark icons
4. **Render pricing buttons** - Two interactive buttons with visual selection state
5. **Display security messaging** - Show badge with "Secured with App Store, Cancel anytime"
6. **Display call-to-action** - Prominent blue button labeled "Visual Studio Code →"
7. **Display footer links** - Privacy Policy, User Agreement, EULA links

## Internal State

```typescript
const [billingCycle, setBillingCycle] = useState<"month" | "year">("month");
```

- **Type**: `'month' | 'year'`
- **Initial value**: `'month'`
- **Purpose**: Track which pricing tier is currently selected
- **Update triggers**: User clicks pricing button

## Render Output

### Layout Structure

```
<div className="flex min-h-screen w-full bg-white text-black overflow-auto">
  <main className="flex-1 flex flex-col items-center py-12 px-4">
    <div className="w-full max-w-md">
      <Card>
        {/* Image section */}
        {/* Features section */}
        {/* Pricing section */}
        {/* Footer section */}
      </Card>
    </div>
  </main>
</div>
```

### Key DOM Elements

| Section      | Element        | Classes                                                      | Content                |
| ------------ | -------------- | ------------------------------------------------------------ | ---------------------- |
| Container    | `<div>`        | `flex min-h-screen w-full bg-white text-black overflow-auto` | Full-screen container  |
| Main         | `<main>`       | `flex-1 flex flex-col items-center py-12 px-4`               | Centered content area  |
| Card wrapper | `<div>`        | `w-full max-w-md`                                            | Responsive max-width   |
| Card         | `<Card>`       | -                                                            | shadcn Card component  |
| Image        | `<img>`        | `w-full h-full object-cover`                                 | Character image        |
| Features     | `<ul>`         | `space-y-3`                                                  | Feature list container |
| Pricing grid | `<div>`        | `grid grid-cols-2 gap-3`                                     | 2-column button grid   |
| Footer       | `<CardFooter>` | `flex-col gap-4 px-6 pb-6`                                   | Footer section         |

## Styling

### Colors (via Tailwind @theme)

- **Background**: `bg-white`
- **Text**: `text-black`, `text-gray-600`, `text-gray-500`
- **CTA Button**: `bg-[#0066FF]` (brand-primary), `hover:bg-[#0052CC]` (hover)
- **Borders**: `border-black` (active), `border-gray-300` (inactive)

### Responsive Breakpoints

```
Mobile (375px):
- Card: full-width with px-4 padding
- Image: h-56 (224px height)
- Text: text-xs, text-sm, text-2xl
- Button: full-width, h-12 (48px)

Tablet (768px):
- Card: max-w-md (448px)
- Image: h-56 (same)
- Text: same
- Button: same

Desktop (1440px):
- Card: max-w-md (448px), centered
- Image: h-56 (same)
- Text: same
- Button: same
```

## Component Dependencies

### Imports

```typescript
import * as React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FeatureItem } from "@/components/FeatureItem";
```

### External Dependencies

- **React 19.2.0**: Core framework (useState hook)
- **Lucide React**: Check icon for features
- **shadcn/ui Button**: CTA button component
- **shadcn/ui Card**: Card container component
- **Tailwind CSS 4**: Styling via utility classes

### Internal Dependencies

- `@/lib/utils` - `cn()` utility function
- `@/components/FeatureItem` - Subcomponent for feature list items

## Child Components

### FeatureItem

```typescript
import { FeatureItem } from "@/components/FeatureItem";

// Usage
<FeatureItem text="Unlimited Text Messages" />;
```

**Props**: `{ text: string }`

**Responsibility**: Render single feature with checkmark icon

**See**: [FeatureItem.md](./FeatureItem.md)

## Feature List

The component renders exactly 6 features:

1. "Unlimited Text Messages"
2. "View Character Stories"
3. "Unlimited Audio Messages"
4. "600 Character Limit On Enhanced Memory"
5. "Enhanced Memory Context"
6. "Remove Ads"

**Hardcoded in component** (no external data source)

## Pricing Configuration

Pricing tiers are derived from `billingCycle` state:

| Cycle     | Label       | Price  | Breakdown          |
| --------- | ----------- | ------ | ------------------ |
| `'month'` | "Per Month" | `9.99` | (none)             |
| `'year'`  | "Per Year"  | `99`   | "USD 8.25 / Month" |

**Hardcoded values** (no API calls)

## Interaction Model

### User Interactions

**Click Monthly Button**:

```
1. User clicks monthly pricing button
2. onClick handler: setBillingCycle('month')
3. Component re-renders
4. Monthly button shows: border-black, price "$ 9.99"
5. Yearly button shows: border-gray-300
```

**Click Yearly Button**:

```
1. User clicks yearly pricing button
2. onClick handler: setBillingCycle('year')
3. Component re-renders
4. Yearly button shows: border-black, price "$ 99", breakdown "USD 8.25 / Month"
5. Monthly button shows: border-gray-300
```

**Click CTA Button**:

```
1. User clicks "Visual Studio Code →" button
2. Current implementation: No handler (button is placeholder)
3. Future: Will navigate to checkout or payment flow
```

**Click Footer Links**:

```
1. User clicks Privacy Policy, User Agreement, or EULA
2. Current implementation: href="#" (no navigation)
3. Future: Will navigate to respective pages
```

## Performance Characteristics

- **Initial Render**: < 3 seconds (typical page load)
- **State Toggle**: < 100ms (simple setState, no async operations)
- **Re-render Latency**: ~2ms (modern hardware, simple component tree)
- **Bundle Impact**: ~2KB gzipped (component only, deps are shared)

## Accessibility

### Keyboard Navigation

- All buttons are focusable via Tab key
- Pricing buttons: Can toggle with spacebar or enter
- CTA button: Can activate with spacebar or enter
- Footer links: Can navigate with Tab + enter or click

### ARIA Labels

```html
<!-- Image -->
<img alt="Character" ... />

<!-- Buttons -->
<button>Per Month</button>
<button>Per Year</button>
<button>Visual Studio Code →</button>
```

### Color Contrast

- Text on white: Black (#000000) - WCAG AAA compliant
- CTA button: White text on blue (#0066FF) - WCAG AA compliant
- Helper text: Gray (#666666) on white - WCAG AA compliant

### Semantic HTML

- Uses `<main>`, `<ul>`, `<li>` semantic elements
- Buttons are HTML `<button>` elements
- Image has alt text

## Edge Cases & Error Handling

### Image Loading Failure

**Current behavior**: Image broken icon displayed (browser default)

**Future improvement**: Placeholder or fallback component

### Very Narrow Viewport (< 320px)

**Current behavior**: Card may overflow slightly

**Recommendation**: Add horizontal scroll or adjust padding

### Very Large Viewport (> 1440px)

**Current behavior**: Card maintains max-width of 448px, stays centered

**Expected**: Properly centered, balanced spacing

### JavaScript Disabled

**Current behavior**: Pricing toggle doesn't work; page displays with default (monthly)

**Recommendation**: Show both pricing tiers or use noscript fallback

## Testing Strategy

### Manual Verification (Per Constitution)

**Viewport Testing**:

- [ ] Mobile (375px): Full-width, readable, no overflow
- [ ] Tablet (768px): Properly sized, all elements visible
- [ ] Desktop (1440px): Centered, balanced spacing

**Interaction Testing**:

- [ ] Click monthly button: border black, "$9.99" displays
- [ ] Click yearly button: border black, "$99" and breakdown display
- [ ] Toggle repeatedly: smooth, no flashing, < 100ms response

**Visual Testing**:

- [ ] Colors correct: blue CTA (#0066FF), black borders, gray text
- [ ] Spacing correct: gap-3 between features, gap-4 in footer
- [ ] Typography correct: text-xs labels, text-2xl prices, text-sm features

**Accessibility Testing**:

- [ ] Tab navigation works
- [ ] All buttons focusable
- [ ] Lighthouse accessibility score 90+
- [ ] No console errors

### No Automated Tests

(Per AI-Playground constitution: zero testing)

## Future Extensions

### Phase 3: Goal Tracking

```typescript
const [selectedGoal, setSelectedGoal] = useLocalStorage(
  "subscription-goal",
  null
);

const handleCTAClick = () => {
  setSelectedGoal({
    plan: billingCycle,
    timestamp: new Date().toISOString(),
  });
};
```

### Phase 4: Payment Integration

```typescript
const handleCheckout = async () => {
  const product =
    billingCycle === "month" ? "monthly-subscription" : "annual-subscription";
  // Call payment API
};
```

## Related Documents

- [Specification](../spec.md) - Full feature specification
- [Data Model](../data-model.md) - Component architecture and types
- [FeatureItem Contract](./FeatureItem.md) - Subcomponent API
- [Implementation Plan](../plan.md) - Technical decisions and phases
- [Quickstart Guide](../quickstart.md) - Development setup and verification

---

**Component Status**: Ready for implementation (Phase 1)
