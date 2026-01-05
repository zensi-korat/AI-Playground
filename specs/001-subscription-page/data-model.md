# Data Model & Component Structure: Subscription Page

**Phase**: Phase 1 (Design & Contracts)  
**Date**: 2026-01-05  
**Feature**: 001-subscription-page  

## Component Architecture

```
SubscriptionPage (page component)
└── Container (flex, min-h-screen, bg-white)
    └── Main (flex-1, flex flex-col items-center)
        └── Card (w-full max-w-md)
            ├── Card Image Container (h-56, relative)
            │   └── Image (w-full h-full object-cover)
            ├── CardContent (space-y-6)
            │   ├── Features List (ul space-y-3)
            │   │   ├── FeatureItem ("Unlimited Text Messages")
            │   │   ├── FeatureItem ("View Character Stories")
            │   │   ├── FeatureItem ("Unlimited Audio Messages")
            │   │   ├── FeatureItem ("600 Character Limit On Enhanced Memory")
            │   │   ├── FeatureItem ("Enhanced Memory Context")
            │   │   └── FeatureItem ("Remove Ads")
            │   └── Pricing Grid (grid grid-cols-2 gap-3)
            │       ├── Monthly Button (border-2, rounded-lg)
            │       │   ├── Label: "Per Month"
            │       │   └── Price: "$ 9.99"
            │       └── Yearly Button (border-2, rounded-lg)
            │           ├── Label: "Per Year"
            │           ├── Price: "$ 99"
            │           └── Breakdown: "USD 8.25 / Month"
            └── CardFooter (flex-col gap-4)
                ├── Security Badge (flex items-center gap-2)
                │   ├── Icon (SVG checkmark)
                │   └── Text: "Secured with App Store, Cancel anytime"
                ├── CTA Button (w-full, bg-brand-primary, hover:bg-brand-primary-hover)
                │   └── Text: "Visual Studio Code →"
                └── Footer Links (flex gap-3 justify-center)
                    ├── Link ("Privacy Policy")
                    ├── Divider ("|")
                    ├── Link ("User Agreement")
                    ├── Divider ("|")
                    └── Link ("EULA")
```

## Data Models

### SubscriptionPage Component

**File**: `src/pages/SubscriptionPage.tsx`

**Props**: None (self-contained page component)

**State**:
```typescript
const [billingCycle, setBillingCycle] = useState<'month' | 'year'>('month')
```

**Responsibilities**:
- Render main card layout
- Manage billing cycle state
- Coordinate feature list rendering
- Render pricing toggle buttons
- Display CTA and footer

**Exports**:
```typescript
export default function SubscriptionPage(): JSX.Element
```

---

### FeatureItem Subcomponent

**File**: `src/components/FeatureItem.tsx`

**Props**:
```typescript
interface FeatureItemProps {
  text: string
}
```

**State**: None (presentational component)

**Responsibilities**:
- Render single feature list item
- Display checkmark icon (Lucide Check)
- Apply consistent spacing and typography

**Exports**:
```typescript
export function FeatureItem({ text }: FeatureItemProps): JSX.Element
```

---

### Data Models (No Database - All Hardcoded for MVP)

```typescript
// Feature list items (hardcoded in component)
const FEATURES = [
  "Unlimited Text Messages",
  "View Character Stories",
  "Unlimited Audio Messages",
  "600 Character Limit On Enhanced Memory",
  "Enhanced Memory Context",
  "Remove Ads"
]

// Pricing tiers (derived from state)
type BillingCycle = 'month' | 'year'

interface PricingTier {
  cycle: BillingCycle
  label: string
  price: number
  breakdown?: string
}

const PRICING: Record<BillingCycle, PricingTier> = {
  month: { cycle: 'month', label: 'Per Month', price: 9.99 },
  year: { cycle: 'year', label: 'Per Year', price: 99, breakdown: 'USD 8.25 / Month' }
}
```

---

## Type Definitions

```typescript
// src/types/subscription.ts (optional, if extracted to separate file)

export type BillingCycle = 'month' | 'year'

export interface SubscriptionFeature {
  text: string
}

export interface SubscriptionTier {
  cycle: BillingCycle
  label: string
  price: number
  breakdown?: string
}

export interface SubscriptionPageState {
  billingCycle: BillingCycle
  features: SubscriptionFeature[]
}
```

---

## Styling Model

### Color Palette (via Tailwind @theme)

```css
@theme {
  --color-brand-primary: #0066FF;
  --color-brand-primary-hover: #0052CC;
  --color-border-active: #000000;
  --color-border-inactive: #d3d3d3;
  --color-text-primary: #000000;
  --color-text-secondary: #666666;
  --color-text-muted: #505050;
  --color-background: #ffffff;
}
```

### Layout Breakpoints

- **Mobile**: 375px (max-width: md)
- **Tablet**: 768px (min-width: md, max-width: lg)
- **Desktop**: 1440px+ (min-width: lg)

### Responsive Adjustments

```
Mobile (375px):
- Card: full width with px-4 padding
- Image height: h-56 (224px)
- Grid: grid-cols-2 (pricing buttons stack horizontally)
- Text sizes: text-xs, text-sm, text-2xl

Tablet (768px):
- Card: max-w-md (448px)
- Image height: h-56 (224px)
- Grid: grid-cols-2 (same)
- Text sizes: same

Desktop (1440px):
- Card: max-w-md (448px, centered)
- Image height: h-56 (224px)
- Grid: grid-cols-2 (same)
- Text sizes: same
```

---

## Component State Flow

```
SubscriptionPage (billingCycle state)
  │
  ├─→ User clicks "Per Month" button
  │   └─→ setBillingCycle('month')
  │       └─→ Component re-renders
  │           └─→ Monthly button shows border-black
  │           └─→ Price displays "$ 9.99"
  │
  └─→ User clicks "Per Year" button
      └─→ setBillingCycle('year')
          └─→ Component re-renders
              └─→ Yearly button shows border-black
              └─→ Price displays "$ 99"
              └─→ Breakdown displays "USD 8.25 / Month"
```

---

## Dependencies

### External Libraries

- **React 19.2.0**: Component framework
- **Tailwind CSS 4.1.18**: Styling with @theme support
- **Lucide React**: Check icon for features
- **shadcn/ui Button**: CTA button component
- **shadcn/ui Card**: Card container component
- **TypeScript 5.9.3**: Type safety

### Internal Dependencies

- `@/lib/utils` - `cn()` utility for class merging
- `@/components/ui/button` - Button component
- `@/components/ui/card` - Card, CardContent, CardFooter
- `lucide-react` - Check icon

### No Test Dependencies

(Per AI-Playground constitution: zero testing)

---

## Component Interfaces (Contract)

### SubscriptionPage

```typescript
/**
 * Subscription pricing page component
 * 
 * Displays subscription features and pricing options with interactive toggle.
 * Uses local state for pricing cycle (monthly/yearly) toggle.
 * 
 * Props: None
 * State: billingCycle ('month' | 'year'), default 'month'
 * 
 * Renders:
 * - Card with character image at top
 * - 6 subscription features with checkmarks
 * - 2 pricing buttons (monthly/yearly toggle)
 * - Security badge ("Secured with App Store, Cancel anytime")
 * - CTA button ("Visual Studio Code →")
 * - Footer with Privacy Policy, User Agreement, EULA links
 * 
 * Responsive: 375px (mobile), 768px (tablet), 1440px+ (desktop)
 * Accessibility: Semantic HTML, keyboard focusable, ARIA labels where needed
 */
export default function SubscriptionPage(): JSX.Element
```

### FeatureItem

```typescript
/**
 * Feature list item subcomponent
 * 
 * Renders a single feature with checkmark icon
 * 
 * Props:
 * - text: string - Feature description text
 * 
 * Example:
 * <FeatureItem text="Unlimited Text Messages" />
 */
export function FeatureItem({ text }: FeatureItemProps): JSX.Element
```

---

## Future Extensibility

### Phase 3: Goal Tracking Feature

When implementing goal tracking via localStorage:

```typescript
// Future addition to SubscriptionPage
const [selectedGoal, setSelectedGoal] = useLocalStorage('subscription-goal', null)

const handleCTAClick = () => {
  // Track goal selection
  setSelectedGoal({
    plan: billingCycle,
    timestamp: new Date().toISOString(),
    // ... other tracking data
  })
  // Navigate to checkout or payment
}
```

### Phase 4: Payment Processing

When integrating payment:

```typescript
// Future addition
interface PaymentConfig {
  productId: string
  amount: number
  currency: 'USD'
}

const handleCheckout = async (config: PaymentConfig) => {
  // Call payment API
  // Handle success/error states
}
```

---

## Quality Metrics

| Metric | Target | Approach |
|--------|--------|----------|
| **Bundle Size Impact** | < 10KB | Only UI components + Tailwind classes |
| **Render Performance** | < 2ms initial render | Minimal state, no complex computations |
| **Toggle Response** | < 100ms | Simple setState, no async operations |
| **Accessibility Score** | 90+ | Semantic HTML, ARIA labels, keyboard navigation |
| **Code Maintainability** | High | TypeScript, clear naming, focused components |
| **Test Coverage** | N/A | Manual verification (per constitution) |

---

## Summary

✅ Component architecture is clear and manageable  
✅ Data models are simple and unambiguous  
✅ Type definitions provide type safety  
✅ Styling strategy is consistent with project  
✅ No complex state management needed  
✅ Ready for implementation phase  

**Next**: Generate quickstart.md and contracts/ in Phase 1
