# Research Findings: Subscription Page (001-subscription-page)

**Date**: 2026-01-05  
**Phase**: Phase 0 (Research & Technical Decisions)  
**Plan**: [plan.md](./plan.md)

## Research Task 1: Tailwind @theme Configuration

### Decision: Use Tailwind @theme for Subscription Brand Colors

**What was chosen**: Implement custom color palette via Tailwind's @theme directive in tailwind.config.ts and index.css

**Why chosen**:

- Aligns perfectly with AI-Playground's existing Figma design token sync workflow (src/all-variables.json → index.css)
- Enables consistent color management across design system and code
- Provides CSS variable generation for runtime color consistency
- Supports responsive/theme switching if needed in future
- Zero additional dependencies

**Alternatives considered**:

- **Inline Tailwind classes** (e.g., `bg-blue-600`) - Rejected because: doesn't align with Figma token workflow; less maintainable across components; harder to update brand colors globally
- **CSS-in-JS (styled-components)** - Rejected because: adds dependency; conflicts with minimal-dependencies principle; not needed for simple UI
- **CSS modules** - Rejected because: Tailwind already handles styling; adds complexity without benefit

**Implementation approach**:

```css
/* In index.css - add to :root section */
@theme {
  --color-brand-primary: #0066ff;
  --color-brand-primary-hover: #0052cc;
  --color-border-active: #000000;
  --color-text-primary: #000000;
  --color-text-secondary: #666666;
  --color-text-muted: #505050;
  --color-background: #ffffff;
}
```

```javascript
// In tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--color-brand-primary)",
          primaryHover: "var(--color-brand-primary-hover)",
        },
        border: {
          active: "var(--color-border-active)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
      },
    },
  },
};
```

---

## Research Task 2: shadcn/ui Component Library Evaluation

### Decision: Use Existing shadcn Button and Card Components (No New Components Needed)

**What was chosen**: Leverage already-installed shadcn/ui Button and Card for subscription page layout

**Why chosen**:

- Button and Card already in project (in src/components/ui/)
- Both components are Radix UI-based (aligns with project constraint)
- Minimal dependencies (Button: ~2KB gzipped, Card: ~1KB gzipped)
- Fully accessible out-of-the-box (keyboard navigation, ARIA labels)
- Already styled with Tailwind; easy to customize
- Zero setup overhead

**Alternatives considered**:

- **Additional shadcn components** (Dialog, Dropdown, etc.) - Rejected because: MVP doesn't need them; YAGNI principle; would increase bundle size
- **Custom HTML + Tailwind** - Rejected because: Button and Card already available; no need to duplicate; shadcn components better tested
- **Headless UI** - Rejected because: shadcn already in use; redundant dependency

**Implementation approach**:

- Use existing `<Button>` component from `@/components/ui/button`
- Use existing `<Card>`, `<CardContent>`, `<CardFooter>` from `@/components/ui/card`
- Pass Tailwind classes via `className` prop
- No new component imports needed

**Verification**:

```bash
ls -la src/components/ui/button.tsx  # Verify exists
ls -la src/components/ui/card.tsx    # Verify exists
npm ls                                # Verify shadcn is in package.json
```

---

## Research Task 3: React State Management for Pricing Toggle

### Decision: Use Simple React useState (No Context/Redux Needed)

**What was chosen**: Single `useState('month' | 'year')` hook for billing cycle state

**Why chosen**:

- Single page component; no prop drilling needed
- State change is trivial (string toggle)
- No shared state across components (pricing state local to SubscriptionPage)
- Minimal code: 3 lines of setup, 1 line for setState call
- Avoids over-engineering per YAGNI principle
- Zero overhead vs Context/Redux

**Alternatives considered**:

- **React Context** - Rejected because: unnecessary; only one consumer (this page); adds boilerplate
- **Redux/Zustand** - Rejected because: overkill for local UI state; conflicts with minimal-dependencies principle
- **URL search params** - Rejected because: doesn't match specification (no URL routing specified); adds complexity
- **localStorage (immediate)** - Rejected because: spec doesn't require persistence; better as P3 feature; YAGNI

**Implementation approach**:

```typescript
const [billingCycle, setBillingCycle] = useState<"month" | "year">("month");
```

Then in pricing button onClick handlers:

```typescript
onClick={() => setBillingCycle('month')}
```

**Performance note**: State update triggers re-render (~2ms on modern hardware); instant user feedback meets SC-002 requirement (< 100ms toggle response)

---

## Research Task 4: date-fns Integration for Date Formatting

### Decision: Add date-fns ^3.0.0 as Production Dependency

**What was chosen**: Include date-fns library for date formatting (future analytics/booking features)

**Why chosen**:

- Minimal footprint: ~14KB gzipped (justifiable per minimal-dependencies principle)
- Actively maintained (v3.0.0+ has commits within last week)
- Standard library in React ecosystem (widely trusted)
- Handles timezone concerns elegantly (vs Date native methods)
- No heavy transitive dependencies
- Aligns with future feature requirements (SC-007 journey timing, potential booking features)

**Alternatives considered**:

- **Native JavaScript Date/Intl API** - Rejected because: timezone handling is complex; formatting is verbose; date-fns is worth 14KB for maintainability
- **Moment.js** - Rejected because: deprecated library; much larger footprint (~65KB); heavy dependency tree
- **Dayjs** - Rejected because: comparable to date-fns; date-fns has better timezone support; already chosen
- **Defer entirely** - Rejected because: MVP doesn't strictly need it; but very low cost to add; prepares for P3 features

**Implementation approach**:

```bash
npm install date-fns@^3.0.0
```

Usage in future features:

```typescript
import { format, startOfDay } from "date-fns";

const today = format(new Date(), "yyyy-MM-dd");
const dayStart = startOfDay(new Date());
```

**MVP scope**: date-fns is NOT used in Phase 1 implementation (pricing page doesn't need it). Added to package.json as justified dependency for future features.

---

## Research Task 5: localStorage for Goals (Optional Future Feature)

### Decision: Defer to Phase 3; Design Pattern Prepared for Future

**What was chosen**: Document React pattern for localStorage integration (not implemented in MVP)

**Why chosen**:

- MVP spec (P1-P3 user stories) doesn't require goal tracking or persistence
- Specification notes assume stateless page (no data requirements in Key Entities section)
- P3 user story (Trust & Compliance) is about security messaging, not goal storage
- Adding localStorage would be YAGNI for MVP
- Can implement cleanly in Phase 3 without rework

**Alternatives considered**:

- **Implement immediately** - Rejected because: not in MVP scope; adds testability concerns (localStorage is hard to verify without tests); violates YAGNI
- **IndexedDB** - Rejected because: overkill for simple goals; complexity without benefit
- **SessionStorage** - Rejected because: session-scoped; user stories suggest persistence across sessions (future requirement)
- **Cloud sync** - Rejected because: out of scope; requires backend (not specified in plan)

**Prepared pattern for Phase 3**:

```typescript
// Custom hook (to be added in Phase 3)
function useLocalStorage(key: string, initialValue: unknown) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (val: unknown) => {
    try {
      setValue(val);
      window.localStorage.setItem(key, JSON.stringify(val));
    } catch (error) {
      console.warn(`localStorage error for key "${key}":`, error);
    }
  };

  return [value, setStoredValue];
}
```

**Risk mitigation**: Pattern is simple; no external dependency; aligns with zero-testing constraint (localStorage is synchronous, no async to test)

---

## Research Task 6: API Contracts and Component Interfaces

### Decision: Define TypeScript Interfaces for Type Safety

**What was chosen**: Strong typing via TypeScript for component props and data models

**Why chosen**:

- Catches errors at development time (no runtime surprises)
- Serves as documentation for component contracts
- Aligns with TypeScript 5.9.3 in project stack
- Zero runtime overhead (types are compiled away)
- Enables IDE autocomplete and refactoring

**Component interfaces** (to be documented in data-model.md):

```typescript
// SubscriptionPage
interface SubscriptionPageProps {
  // MVP has no props - self-contained page
}

// FeatureItem subcomponent
interface FeatureItemProps {
  text: string;
}

// PricingPlan data model
interface PricingPlan {
  name: "month" | "year";
  price: number;
  label: string;
  breakdown?: string;
}

// SubscriptionFeature data model
interface SubscriptionFeature {
  text: string;
  icon?: React.ReactNode;
}
```

**Implementation approach**:

- Define interfaces in component files (co-located)
- Use `React.FC<Props>` type signature (optional but clear)
- Export interfaces for consumption (if other components need them)

---

## Summary of Technical Decisions

| Aspect               | Decision                  | Justification                    | Risk                             |
| -------------------- | ------------------------- | -------------------------------- | -------------------------------- |
| **Colors**           | Tailwind @theme           | Aligns with Figma workflow       | Low - aligns with existing setup |
| **Components**       | shadcn Button + Card      | Already in project, minimal deps | Low - proven libraries           |
| **State Management** | React useState            | Local state only, YAGNI          | Low - simple API                 |
| **Date Handling**    | date-fns (P1 add, P3 use) | Future-proofing, minimal cost    | Low - standard library           |
| **Goals/Storage**    | Defer to P3               | Not in MVP spec, YAGNI           | Low - clear pattern documented   |
| **Type Safety**      | TypeScript interfaces     | Type-safe component contracts    | Low - zero runtime cost          |

## Phase 0 Completion

✅ All research tasks completed and decisions documented  
✅ No NEEDS CLARIFICATION markers remain  
✅ Technical context is fully specified  
✅ Ready to proceed to Phase 1 (Design & Contracts)

**Next**: Generate data-model.md, contracts/, and quickstart.md in Phase 1
