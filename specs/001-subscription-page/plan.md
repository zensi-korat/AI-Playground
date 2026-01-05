# Implementation Plan: Subscription Page

**Branch**: `001-subscription-page` | **Date**: 2026-01-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-subscription-page/spec.md`

## Summary

Build a visually rich, responsive subscription offer page using React 19, Tailwind CSS 4, and shadcn/ui components. The page displays subscription features with interactive pricing toggle (monthly $9.99 vs yearly $99) and prominent call-to-action button. Uses Tailwind @theme for colors, date-fns for formatting, and localStorage for optional goal tracking. All quality assurance through manual verification per AI-Playground constitution (zero testing).

## Technical Context

**Language/Version**: TypeScript 5.9.3  
**Primary Dependencies**: React 19.2.0, Tailwind CSS 4.1.18, Vite 7.2.4, shadcn/ui, date-fns, Lucide React  
**Storage**: localStorage (for optional goal tracking, deferred to Phase 3)  
**Testing**: CONSTITUTION: NO TESTING for AI-Playground - manual verification only  
**Target Platform**: Web (React SPA)  
**Project Type**: Single frontend application  
**Performance Goals**: Toggle response < 100ms, page load < 3 seconds, Lighthouse 90+  
**Constraints**: Responsive at 375px (mobile), 768px (tablet), 1440px (desktop); max card width 448px; no testing infrastructure  
**Scale/Scope**: Single page with 4 user stories, 6 features list items, 2 pricing tiers, card-based layout

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle | Compliance | Notes |
|-----------|-----------|-------|
| **Clean Code** | ✅ PASS | Component-based structure, reusable subcomponents (FeatureItem), clear naming conventions |
| **Simple UX** | ✅ PASS | Single card layout, minimal interaction (click to toggle pricing), no unnecessary features, clear CTA |
| **Responsive Design** | ✅ PASS | Mobile-first Tailwind approach, 3 breakpoints tested (375px, 768px, 1440px) |
| **Minimal Dependencies** | ✅ PASS | Uses existing stack (React, Tailwind, Lucide, shadcn); no new heavy libraries; date-fns adds ~14KB gzipped (justified for date formatting) |
| **Zero Testing** | ✅ PASS | No test files, no test frameworks, all QA via manual browser verification |
| **Overall** | ✅ **PASS GATE** | Feature complies with all constitutional principles. Ready for Phase 0 research. |

## Project Structure

### Documentation (this feature)

```text
specs/001-subscription-page/
├── spec.md                          # Feature specification
├── plan.md                          # This file (implementation plan)
├── research.md                      # Phase 0 output (research findings)
├── data-model.md                    # Phase 1 output (component structure)
├── quickstart.md                    # Phase 1 output (getting started)
├── contracts/                       # Phase 1 output (component APIs)
│   ├── SubscriptionPage.md
│   ├── FeatureItem.md
│   └── PricingToggle.md
├── checklists/
│   └── requirements.md              # Quality validation checklist
├── CLARIFICATION_COMPLETE.md        # Clarification analysis
└── tasks.md                         # Phase 2 output (task breakdown)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── ui/                          # shadcn/ui and custom UI components
│   │   ├── button.tsx               # Already exists - shadcn Button
│   │   ├── card.tsx                 # Already exists - shadcn Card
│   │   └── [other ui components]/
│   └── [feature components]/
├── pages/
│   ├── SubscriptionPage.tsx         # Main page component
│   └── [other pages]/
├── utils/
│   ├── formatUser.ts                # Existing formatter utility
│   └── [other utilities]/
├── lib/
│   ├── utils.ts                     # Tailwind cn() utility
│   └── [other lib utilities]/
├── App.tsx                          # Main app component with routing
├── main.tsx                         # Entry point
├── index.css                        # Global styles with Tailwind @theme directives
└── [other source files]/

NOTE: AI-Playground constitution prohibits testing - no tests/ directory
```

**Structure Decision**: Single frontend project (Option 1). Feature is implemented entirely in `src/pages/SubscriptionPage.tsx` with subcomponent `src/components/FeatureItem.tsx`. Leverages existing shadcn/ui infrastructure and Tailwind CSS setup. No new directories needed.

## Phase 0: Research & Technical Decisions

### Research Tasks

1. **Tailwind @theme Configuration**: Understand how to define custom colors via @theme directive in tailwind.config.ts for brand colors, accent colors, and state colors
   - **Decision**: Use Tailwind's @theme for subscription page brand colors (#0066FF CTA button, black borders, gray accents)
   - **Rationale**: Aligns with Figma design tokens sync workflow; enables CSS variable generation for consistency

2. **shadcn/ui Component Library**: Evaluate which shadcn/ui components are most suitable for subscription page (Button, Card, already in use)
   - **Decision**: Use existing shadcn Button and Card components; no additional shadcn components needed for MVP
   - **Rationale**: Button and Card already in project; components are low-dependency, align with Radix UI constraint

3. **localStorage for Goals (Future)**: Research React patterns for localStorage integration for optional goal tracking feature (deferred to P3)
   - **Decision**: Use React Context + custom hook (useLocalStorage) for future integration
   - **Rationale**: Avoids testing complexity; simple synchronous API; no external library needed

4. **date-fns Integration**: Verify date-fns is available and suitable for date formatting (future analytics feature)
   - **Decision**: Add date-fns ^3.0.0 to package.json (justified for date formatting; ~14KB gzipped; actively maintained)
   - **Rationale**: Minimal footprint, widely used, handles timezone concerns elegantly

5. **React State Management**: Confirm useState for billing cycle toggle is appropriate vs Context/Redux
   - **Decision**: Use simple React useState for billingCycle state (monthly/year toggle)
   - **Rationale**: Single page, single piece of local state; no prop drilling; YAGNI principle

### Research Output: research.md

Will be generated in Phase 0 completion with findings for each research task.

## Phase 1: Design & Architecture

### Component Structure

```
SubscriptionPage (page component)
├── Card (shadcn)
│   ├── Character Image (img element)
│   ├── CardContent
│   │   ├── FeatureList
│   │   │   ├── FeatureItem (recurring, 6x)
│   │   │   │   ├── Check icon (Lucide)
│   │   │   │   └── Feature text
│   │   └── PricingGrid
│   │       ├── PricingButton (monthly)
│   │       │   ├── Label: "Per Month"
│   │       │   └── Price: "$ 9.99"
│   │       └── PricingButton (yearly)
│   │           ├── Label: "Per Year"
│   │           ├── Price: "$ 99"
│   │           └── Breakdown: "USD 8.25 / Month"
│   └── CardFooter
│       ├── Security Badge
│       │   ├── Icon
│       │   └── Text: "Secured with App Store, Cancel anytime"
│       ├── Button (CTA)
│       │   └── Text: "Visual Studio Code →"
│       └── Footer Links
│           ├── Privacy Policy
│           ├── User Agreement
│           └── EULA
```

### Data Models

```typescript
// PricingPlan - represents a subscription tier
interface PricingPlan {
  name: 'month' | 'year'
  price: number
  label: string
  breakdown?: string  // e.g., "USD 8.25 / Month"
}

// SubscriptionFeature - represents a feature row
interface SubscriptionFeature {
  text: string
  icon?: React.ReactNode
}

// Component Props
interface SubscriptionPageProps {
  // No props needed for MVP - self-contained
}

interface FeatureItemProps {
  text: string
}
```

### Styling Strategy

- **Colors**: Use Tailwind @theme directives in index.css for subscription brand colors
  - Primary (CTA): #0066FF (blue)
  - Hover (CTA): #0052CC (darker blue)
  - Borders (active): #000000 (black)
  - Background: #ffffff (white)
  - Text: #000000 (black), #666666 (gray-600), #505050 (gray-500)
- **Layout**: Tailwind grid/flex utilities for responsive layout
- **Spacing**: Tailwind spacing scale (px, py, gap, etc.)
- **Typography**: Tailwind text utilities (text-xs, text-sm, text-2xl, font-black, etc.)

### Component APIs

**SubscriptionPage.tsx**
```typescript
export default function SubscriptionPage(): JSX.Element
```

**FeatureItem.tsx** (subcomponent)
```typescript
interface FeatureItemProps {
  text: string
}

export function FeatureItem({ text }: FeatureItemProps): JSX.Element
```

**Styling**
- Component uses `cn()` utility (from @/lib/utils) to conditionally merge Tailwind classes
- No CSS files needed; all styles via Tailwind classes

### Phase 1 Outputs

- **data-model.md**: Component structure, data models, TypeScript interfaces
- **quickstart.md**: How to run the page, environment setup, verification steps
- **contracts/**: OpenAPI-style component interface documentation

## Phase 2: Task Breakdown

### Phase 2 Overview

Phase 2 will generate tasks.md with detailed, independent tasks for:

1. **Setup Phase**: Verify dependencies, add date-fns if needed, check Tailwind/shadcn setup
2. **Foundational Phase**: Configure @theme colors in Tailwind config, set up global styles
3. **User Story 1 (P1)**: Implement card layout and responsive structure
4. **User Story 2 (P2)**: Add pricing toggle functionality with state management
5. **User Story 3 (P2)**: Implement CTA button with styling and hover states
6. **User Story 4 (P3)**: Add security badge and footer links
7. **Polish Phase**: Manual verification on all breakpoints, accessibility review, code cleanup

### Key Implementation Details

- **Pricing Toggle**: Controlled React component using `useState('month' | 'year')`
- **Responsive Images**: Use object-cover to fill image container while maintaining aspect ratio
- **Keyboard Accessibility**: All buttons natively focusable; links are semantic HTML
- **Mobile Optimization**: Full-width card, touch-friendly button sizes (44x44px minimum)
- **Bundle Impact**: No additional UI libraries needed (shadcn components already imported)

## Complexity Tracking

| Consideration | Status | Justification |
|---|---|---|
| **date-fns Dependency** | Justified | Added for date formatting (future analytics); ~14KB gzipped; no alternative within minimal-dependencies constraint |
| **localStorage Usage** | P3 Deferral | Optional goal tracking feature deferred to Phase 3; not needed for MVP |
| **Component Substructure** | Simple | Single subcomponent (FeatureItem); no complex prop drilling or state management needed |
| **Styling Complexity** | Low | Tailwind @theme approach; no custom CSS files or BEM conventions needed |
| **API Integrations** | None | All data hardcoded in component for MVP; payment processing deferred |

## Next Steps

1. **Phase 0 (Research)**: Run research tasks, document findings in research.md
2. **Phase 1 (Design)**: Generate data-model.md, contracts/, quickstart.md
3. **Phase 2 (Tasks)**: Generate tasks.md with detailed task breakdown per user story
4. **Implementation**: Execute Phase 2 tasks in priority order (P1 → P2 → P3)
5. **Manual Verification**: Test on 375px, 768px, 1440px viewports; verify all acceptance criteria
6. **Commit & Review**: Push commits, request code review, merge to main

## Assumptions

- shadcn/ui Button and Card components are already properly set up in the project
- Tailwind CSS is configured and @theme directive support is available in tailwind.config.ts
- React Router is set up for page routing (SubscriptionPage route will be added in separate feature if needed)
- Lucide React icons are available via @/components/ui/lucide-react or similar import path
- date-fns will be added to package.json (justifiable addition per minimal-dependencies principle)
- No payment processing integration needed for MVP (deferred to separate feature)

## Dependencies

- **Existing**: React 19, Tailwind CSS 4, Vite, TypeScript, Lucide React, shadcn/ui Button and Card
- **To Add**: date-fns ^3.0.0 (for date formatting, ~14KB gzipped)
- **Test Dependencies**: None (constitution prohibits testing)

## Success Criteria

- [x] Plan is comprehensive and addresses all user stories
- [x] Plan aligns with AI-Playground constitution (clean code, simple UX, responsive, minimal deps, zero testing)
- [x] Technical context is clear (no NEEDS CLARIFICATION markers)
- [x] Phase breakdown is feasible for implementation
- [x] Component structure is documented and testable (via manual verification)
- [x] Research tasks are identified and actionable
- [x] Ready for Phase 0 research and subsequent plan refinement
