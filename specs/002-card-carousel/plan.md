# Implementation Plan: Card Carousel Slider

**Branch**: `002-card-carousel` | **Date**: 2026-01-06 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-card-carousel/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a card carousel slider that allows users to navigate between multiple subscription plan cards using next/previous buttons with smooth slide animations, dot indicators for current position, and optional touch/keyboard navigation. Technical approach uses Embla Carousel (best-in-class React carousel library) with Tailwind CSS for styling, implementing wrap-around navigation and 300-500ms transitions with 60fps performance.

## Technical Context

**Language/Version**: TypeScript 5.9.3, React 19.2.0  
**Primary Dependencies**: Embla Carousel React (best carousel library), Tailwind CSS 4.1.18, shadcn/ui components  
**Storage**: N/A (hardcoded card data in component)  
**Testing**: CONSTITUTION: NO TESTING - manual verification only at 375px, 768px, 1440px breakpoints  
**Target Platform**: Modern web browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
**Project Type**: Web application (React SPA with Vite)  
**Performance Goals**: 60fps animations, <500ms transitions, <100ms keyboard response, Lighthouse 90+ accessibility  
**Constraints**: <500ms animation duration, touch targets ≥44x44px, wrap-around navigation, no animation glitches on rapid clicks  
**Scale/Scope**: 3-5 subscription cards per carousel, single carousel instance per page

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                  | Status | Assessment                                                                                                   |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| I. Clean Code              | ✅ PASS | Carousel logic can be cleanly abstracted with single-responsibility hooks/components. Embla provides clean API. |
| II. Simple UX              | ✅ PASS | Natural button navigation + familiar carousel pattern. 1-2 clicks to navigate cards. Minimal cognitive load.  |
| III. Responsive Design     | ✅ PASS | Embla natively supports responsive breakpoints. Touch targets meet 44x44px minimum. Mobile-first approach.    |
| IV. Minimal Dependencies   | ✅ PASS | Embla Carousel (~13KB gzipped) is actively maintained, focused library. No heavy animation frameworks.        |
| V. Zero Testing            | ✅ PASS | Manual verification at 3 breakpoints. No test files. Verification checklist for visual QA only.               |

**GATE STATUS: ✅ ALL CHECKS PASSED - Proceed to Phase 0 Research**

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── ui/                    # shadcn/ui primitives (existing)
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── FeatureItem.tsx        # Existing subscription feature item
│   └── SubscriptionCarousel.tsx  # NEW: Main carousel wrapper component
├── pages/
│   └── SubscriptionPage.tsx   # MODIFIED: Refactor to use SubscriptionCarousel
├── lib/
│   └── utils.ts               # Existing utility functions (cn helper)
├── hooks/                     # NEW: Directory for carousel hooks
│   └── useCarousel.ts         # NEW: Carousel state management hook
└── types/                     # NEW: Directory for TypeScript types
    └── subscription.ts        # NEW: SubscriptionCard and CarouselState types

public/
└── clips-images/              # Character images for subscription cards
```

**Structure Decision**: Single web application structure. New `hooks/` and `types/` directories for carousel logic and TypeScript interfaces. Main carousel component in `components/` directory. Existing shadcn/ui components reused. No test files per constitution.

## Phase 0: Research & Technical Decisions

**Goal**: Resolve all technical unknowns and establish implementation patterns

**Research Tasks**:
1. Evaluate carousel libraries (Embla vs alternatives)
2. Define animation strategy (CSS transforms vs library)
3. Determine touch gesture implementation approach
4. Establish dot indicator patterns
5. Define responsive behavior patterns
6. Determine state management approach

**Output**: `research.md` with all decisions documented

## Phase 1: Design & Contracts

**Goal**: Define component architecture and data models before implementation

**Tasks**:
1. Create `data-model.md` with TypeScript interfaces
2. Generate `contracts/SubscriptionCarousel.md` component API
3. Generate `quickstart.md` setup guide
4. Update agent context with new technologies

**Output**: Complete design documentation ready for task breakdown
