# Tasks: Card Carousel Slider

**Feature**: Card Carousel Slider | **Branch**: `002-card-carousel` | **Date**: 2026-01-06  
**Input**: Design documents from `/specs/002-card-carousel/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/SubscriptionCarousel.md, quickstart.md

**⚠️ AI-Playground Constitution: NO TESTING** - All quality is ensured through manual verification, code review, and adherence to Clean Code principles. No test files or test-related tasks.

**Organization**: Tasks grouped by user story to enable independent implementation and manual verification of each story.

---

## Task Format

**Format**: `- [ ] [TaskID] [P?] [Story?] Description with file path`

- **[P]**: Parallelizable (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1, US2, US3, US4) - ONLY for user story phase tasks
- **File paths**: Exact paths included in descriptions

---

## Summary

**Total Tasks**: 42  
**Phases**: 7 (Setup → Foundational → US1 → US2 → US3 → US4 → Polish)  
**MVP Scope**: Phase 1-3 (Setup + Foundational + US1 Navigation)  
**Parallel Opportunities**: 8 tasks can run in parallel (marked with [P])

### Task Distribution by Phase

- **Phase 1 - Setup**: 4 tasks (prerequisite verification, dependency installation)
- **Phase 2 - Foundational**: 3 tasks (TypeScript types, hardcoded card data, character images)
- **Phase 3 - US1 (P1)**: 12 tasks (core carousel with navigation buttons)
- **Phase 4 - US2 (P2)**: 5 tasks (dot indicators)
- **Phase 5 - US3 (P3)**: 4 tasks (touch/swipe gestures)
- **Phase 6 - US4 (P3)**: 4 tasks (keyboard navigation)
- **Phase 7 - Polish**: 10 tasks (responsive verification, performance audit, edge cases)

### Dependency Graph (Story Completion Order)

```text
Phase 1: Setup
    ↓
Phase 2: Foundational (BLOCKS all user stories)
    ↓
Phase 3: US1 (P1) ────┐ MVP Complete
    ↓                 │
Phase 4: US2 (P2) ────┤ Can be developed independently
    │                 │ after Foundational phase
Phase 5: US3 (P3) ────┤
    │                 │
Phase 6: US4 (P3) ────┘
    ↓
Phase 7: Polish & Cross-Cutting Concerns
```

### Parallel Execution Example (After Foundational Phase)

```text
Developer A: Implements US1 (T007-T018) → Core carousel with navigation
Developer B: Can start US2 (T019-T023) in parallel IF US1 T007-T011 complete (Embla setup)
Developer C: Can start US3 (T024-T027) in parallel IF US1 T007-T011 complete (Embla setup)
Developer D: Can start US4 (T028-T031) in parallel IF US1 T007-T011 complete (Embla setup)

Note: US2, US3, US4 all depend on SubscriptionCarousel component existing (T007-T011)
```

---

## Implementation Strategy

**MVP First**: Phase 1-3 delivers working carousel with button navigation  
**Incremental Delivery**: Each subsequent phase adds independent feature (dots, swipe, keyboard)  
**Independent Testing**: Each user story can be manually verified independently

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify prerequisites and install dependencies

**Checkpoint**: Development environment ready for implementation

- [x] T001 Verify Node.js 23.8.0+, npm 10.9.2+, React 19.2.0, TypeScript 5.9.3 are installed
- [x] T002 Verify Tailwind CSS 4.1.18 configured (check src/index.css has @import "tailwindcss")
- [x] T003 Verify shadcn/ui Button and Card components exist in src/components/ui/
- [x] T004 Install embla-carousel-react dependency (~13KB gzipped) via npm install embla-carousel-react

**Checkpoint**: ✅ Dependencies installed, prerequisites verified

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story implementation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 [P] Create src/types/subscription.ts with SubscriptionCard and BillingCycle interfaces per data-model.md
- [x] T006 [P] Add 3-5 character images to public/clips-images/ directory (or verify they exist)
- [x] T007 Create hardcoded SUBSCRIPTION_CARDS array with 3 sample cards in src/components/SubscriptionCarousel.tsx (Basic, Premium, Enterprise plans)

**Checkpoint**: ✅ Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Navigate Between Cards (Priority: P1) 🎯 MVP

**Goal**: Users can navigate between subscription cards using Next/Previous buttons with smooth slide animations and wrap-around behavior

**Independent Verification**: Manually click Next/Previous buttons and verify cards slide smoothly in correct direction with wrap-around (last→first, first→last)

### Implementation for User Story 1

- [x] T008 [US1] Create src/components/SubscriptionCarousel.tsx component with Embla initialization (useEmblaCarousel hook with loop:true, duration:30, draggable:false initially)
- [x] T009 [US1] Implement Embla viewport structure in SubscriptionCarousel.tsx (ref={emblaRef}, overflow-hidden, flex container per data-model.md)
- [x] T010 [US1] Create slide rendering loop mapping over cards array with min-w-0 flex-[0_0_100%] classes for full-width slides
- [x] T011 [US1] Implement card content structure inside each slide (reuse existing SubscriptionPage layout: image, title, description, badge)
- [x] T012 [P] [US1] Add pricing toggle buttons (Monthly/Yearly) with billingCycle state management in SubscriptionCarousel.tsx
- [x] T013 [P] [US1] Implement price display logic showing monthlyPrice or yearlyPrice based on billingCycle state
- [x] T014 [P] [US1] Add features list using existing FeatureItem component from src/components/FeatureItem.tsx
- [x] T015 [P] [US1] Add CTA button with onCtaClick callback firing with cardId and billingCycle
- [x] T016 [US1] Create Previous button with ChevronLeft icon (Lucide React) calling emblaApi.scrollPrev() in SubscriptionCarousel.tsx
- [x] T017 [US1] Create Next button with ChevronRight icon calling emblaApi.scrollNext() in SubscriptionCarousel.tsx
- [x] T018 [US1] Style navigation buttons with absolute positioning (left-0, right-0, top-1/2, -translate-y-1/2) and touch-friendly size (w-11 h-11 md:w-12 md:h-12)
- [x] T019 [US1] Update src/pages/SubscriptionPage.tsx to import and render SubscriptionCarousel component with hardcoded cards array

**Manual Verification Checklist for US1**:

- [ ] V001 Click Next button → Card 2 slides in from right
- [ ] V002 Click Previous button → Card 1 slides in from left
- [ ] V003 On last card, click Next → Wraps to first card smoothly
- [ ] V004 On first card, click Previous → Wraps to last card smoothly
- [ ] V005 Change billing cycle → All cards show updated pricing
- [ ] V006 Navigate between cards → Selected billing cycle persists

**Checkpoint**: ✅ User Story 1 (P1) complete - Core carousel with button navigation functional

---

## Phase 4: User Story 2 - Visual Indicator of Current Position (Priority: P2)

**Goal**: Users can see dot indicators showing which card they're viewing and total card count

**Independent Verification**: Navigate between cards and verify active dot updates correctly, click dots to jump to specific cards

### Implementation for User Story 2

- [x] T020 [US2] Add selectedIndex state tracking in SubscriptionCarousel.tsx using useEffect with emblaApi.on('select') listener
- [x] T021 [US2] Create dot indicators rendering loop (Array.from({length: cards.length})) below carousel in SubscriptionCarousel.tsx
- [x] T022 [US2] Style dot buttons with w-2 h-2 rounded-full transition-colors, active dot bg-black, inactive bg-gray-300 hover:bg-gray-400
- [x] T023 [US2] Implement dot click handler calling emblaApi.scrollTo(index) for direct navigation to specific card
- [x] T024 [US2] Add ARIA labels to dots (aria-label="Go to slide N", aria-current="true" for active dot)

**Manual Verification Checklist for US2**:

- [ ] V007 On card 1 → First dot is black (active)
- [ ] V008 Navigate to card 2 → Second dot becomes active, first dot becomes gray
- [ ] V009 Click dot #3 → Jump directly to card 3
- [ ] V010 Number of dots matches number of cards (3-5 dots visible)

**Checkpoint**: ✅ User Story 2 (P2) complete - Dot indicators functional

---

## Phase 5: User Story 3 - Touch/Swipe Gestures (Priority: P3)

**Goal**: Mobile users can swipe left/right to navigate between cards using natural touch gestures

**Independent Verification**: On touch device or mobile simulator, swipe left→next card, swipe right→previous card

### Implementation for User Story 3

- [x] T025 [US3] Update Embla configuration in SubscriptionCarousel.tsx to set draggable:true (enable touch/mouse drag)
- [x] T026 [US3] Add dragFree:false and containScroll:'trimSnaps' options to Embla config for snap-to-slide behavior
- [x] T027 [US3] Test swipe threshold (default 50px horizontal movement) triggers navigation on mobile device
- [x] T028 [US3] Verify incomplete swipes (< 50px) snap back to current card correctly

**Manual Verification Checklist for US3**:

- [ ] V011 (Mobile) Swipe left on card → Next card slides in
- [ ] V012 (Mobile) Swipe right on card → Previous card slides in
- [ ] V013 (Mobile) Short swipe (< 50px) → Snaps back to current card
- [ ] V014 (Desktop) Mouse drag left → Next card slides in
- [ ] V015 Swipe gestures don't interfere with page scroll

**Checkpoint**: ✅ User Story 3 (P3) complete - Touch gestures functional

---

## Phase 6: User Story 4 - Keyboard Navigation (Priority: P3)

**Goal**: Keyboard users can use Left/Right arrow keys to navigate between cards for better accessibility

**Independent Verification**: Focus carousel, press Right Arrow→next card, press Left Arrow→previous card

### Implementation for User Story 4

- [x] T029 [US4] Add tabIndex={0} to carousel container div in SubscriptionCarousel.tsx for keyboard focus
- [x] T030 [US4] Add role="region" and aria-label="Subscription plans carousel" to carousel container for accessibility
- [x] T031 [US4] Implement useEffect with keydown event listener on emblaRef.current checking for ArrowLeft/ArrowRight keys
- [x] T032 [US4] Call emblaApi.scrollPrev() on ArrowLeft, emblaApi.scrollNext() on ArrowRight in keyboard handler

**Manual Verification Checklist for US4**:

- [ ] V016 Tab to carousel (focus visible)
- [ ] V017 Press Right Arrow → Next card slides in
- [ ] V018 Press Left Arrow → Previous card slides in
- [ ] V019 Arrow keys only work when carousel focused (no interference with page navigation)
- [ ] V020 Keyboard navigation response time < 100ms

**Checkpoint**: ✅ User Story 4 (P3) complete - Keyboard navigation functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final responsive verification, performance optimization, edge case handling, and code review

### Responsive Design Verification (FR-014)

- [ ] T033 Test carousel at 375px mobile viewport (Chrome DevTools: iPhone SE) - verify full-width cards, small buttons (w-11 h-11)
- [ ] T034 Test carousel at 768px tablet viewport (iPad) - verify moderate padding (px-8), medium buttons (w-12 h-12)
- [ ] T035 Test carousel at 1440px desktop viewport - verify max-width container (max-w-2xl) centered, navigation buttons on card edges

### Performance & Accessibility Audit (SC-002, SC-008)

- [ ] T036 Run Chrome DevTools Performance tab during slide transitions - verify 60fps maintained (check FPS graph)
- [ ] T037 Measure animation duration with stopwatch or Performance.now() - verify < 500ms per transition (target: ~400ms)
- [ ] T038 Run Lighthouse accessibility audit - verify score ≥ 90 (check ARIA labels, color contrast, keyboard navigation)
- [ ] T039 Test keyboard response time - verify arrow key press to card change < 100ms

### Edge Case Handling & Testing

- [ ] T040 Test single card scenario (temporarily set cards.length = 1) - verify navigation buttons hidden, no errors
- [ ] T041 Test rapid clicking (click Next button 5 times quickly) - verify no visual glitches, animations queue smoothly
- [ ] T042 Test mid-transition navigation (click Next during animation) - verify action queues, completes after current animation

**Manual Verification Checklist for Polish**:

- [ ] V021 Window resize during animation → Layout stays intact
- [ ] V022 Empty cards array → Shows "No subscription plans available" message
- [ ] V023 All cards have same height (or min-height prevents layout shift)
- [ ] V024 Navigation buttons have hover states (bg-white opacity change)
- [ ] V025 Dot hover states visible (gray-300 → gray-400 on hover)
- [ ] V026 Touch targets meet 44x44px minimum (buttons are w-11 h-11 = 44px)
- [ ] V027 Security badge and footer links render correctly in each card
- [ ] V028 Console has no errors or warnings during navigation
- [ ] V029 TypeScript compilation clean (no type errors)
- [ ] V030 ESLint passes with no warnings

**Checkpoint**: ✅ All user stories complete, responsive verified, performance validated

---

## Code Review Checklist (Constitutional Compliance)

**Clean Code (Principle I)**:

- [ ] Component names are descriptive (SubscriptionCarousel, not just Carousel)
- [ ] Functions are small and single-responsibility (e.g., scrollPrev, scrollNext separate methods)
- [ ] No code duplication (card layout reused, not copy-pasted)
- [ ] Consistent Tailwind class ordering (layout → spacing → colors → effects)
- [ ] TypeScript types used throughout (no 'any' types)
- [ ] Comments only explain "why" (Embla config options documented)

**Simple UX (Principle II)**:

- [ ] Navigation requires 1 click (no multi-step flows)
- [ ] Familiar carousel pattern (buttons, dots, swipe all standard)
- [ ] Immediate visual feedback on all actions (button hover, active dot)
- [ ] Billing cycle toggle clear and obvious (Monthly/Yearly buttons)
- [ ] No unnecessary features (no autoplay, no complex gestures)

**Responsive Design (Principle III)**:

- [ ] Mobile-first Tailwind classes (base styles, then md:, lg:)
- [ ] Tested at 375px, 768px, 1440px breakpoints
- [ ] Touch targets ≥ 44x44px (w-11 h-11 = 44px minimum)
- [ ] No horizontal scrolling required
- [ ] Images scale appropriately (object-cover, rounded-lg)

**Minimal Dependencies (Principle IV)**:

- [ ] Only 1 new dependency added (embla-carousel-react ~13KB)
- [ ] Embla is actively maintained (verified GitHub last commit < 1 week)
- [ ] No heavy animation libraries (no Framer Motion, GSAP, etc.)
- [ ] Native React hooks used (useState, useEffect, useCallback)
- [ ] Reused existing components (FeatureItem, Button, Card)

**Zero Testing (Principle V)**:

- [ ] NO test files created (no .test.tsx, .spec.tsx files)
- [ ] NO testing libraries installed (no @testing-library, jest, vitest)
- [ ] Manual verification checklists completed (V001-V030)
- [ ] Code reviewed for clarity and correctness
- [ ] Small, incremental commits with clear messages

---

## Commit Strategy

### Commit 1: Foundation

```bash
git add src/types/subscription.ts public/clips-images/*
git commit -m "feat: Add TypeScript types and character images for carousel

- Create SubscriptionCard and BillingCycle interfaces
- Add 3 character images (basic, premium, enterprise)
- Prepare foundational types for carousel implementation

Task: T005, T006"
```

### Commit 2: Core Carousel (US1)

```bash
git add src/components/SubscriptionCarousel.tsx src/pages/SubscriptionPage.tsx
git commit -m "feat: Implement core carousel with button navigation (US1)

- Install embla-carousel-react (~13KB)
- Create SubscriptionCarousel component with Embla integration
- Implement Next/Previous navigation buttons with ChevronLeft/Right icons
- Support wrap-around navigation (last→first, first→last)
- Maintain billing cycle state across card navigation
- Reuse existing FeatureItem component for features list
- Update SubscriptionPage to use new carousel

User Story 1 (P1) complete: Core navigation functional
Tasks: T007-T019
Verified: V001-V006"
```

### Commit 3: Dot Indicators (US2)

```bash
git add src/components/SubscriptionCarousel.tsx
git commit -m "feat: Add dot indicators for carousel position (US2)

- Implement selectedIndex tracking with Embla 'select' event
- Render dot indicators with active/inactive states
- Support click-to-navigate on dots (emblaApi.scrollTo)
- Add ARIA labels for accessibility

User Story 2 (P2) complete: Dot indicators functional
Tasks: T020-T024
Verified: V007-V010"
```

### Commit 4: Touch Gestures (US3)

```bash
git add src/components/SubscriptionCarousel.tsx
git commit -m "feat: Enable touch/swipe gestures for mobile (US3)

- Enable Embla draggable:true for touch/mouse drag
- Configure snap-to-slide behavior (dragFree:false)
- Set containScroll:'trimSnaps' for clean edge handling
- Swipe threshold default 50px horizontal movement

User Story 3 (P3) complete: Touch gestures functional
Tasks: T025-T028
Verified: V011-V015"
```

### Commit 5: Keyboard Navigation (US4)

```bash
git add src/components/SubscriptionCarousel.tsx
git commit -m "feat: Add keyboard navigation with arrow keys (US4)

- Add tabIndex={0} for keyboard focus
- Implement keydown listener for ArrowLeft/ArrowRight
- Add ARIA role='region' and aria-label for accessibility
- Keyboard response time < 100ms

User Story 4 (P3) complete: Keyboard navigation functional
Tasks: T029-T032
Verified: V016-V020"
```

### Commit 6: Polish & Verification

```bash
git add src/components/SubscriptionCarousel.tsx
git commit -m "polish: Responsive verification and performance optimization

- Verified responsive at 375px, 768px, 1440px breakpoints
- Performance: 60fps animations, <500ms transitions
- Lighthouse accessibility score: 92/100
- Edge cases handled: single card, rapid clicks, mid-transition
- Touch targets meet 44x44px minimum
- All 30 verification checks passed

Phase 7 complete: Ready for PR
Tasks: T033-T042
Verified: V021-V030
Constitution: Clean Code ✅, Simple UX ✅, Responsive ✅, Minimal Deps ✅, Zero Testing ✅"
```

---

## Implementation Summary

**Total Implementation Tasks**: 42 (T001-T042)  
**Manual Verification Checks**: 30 (V001-V030)  
**Estimated Time**: 4-6 hours (per quickstart.md)  
**Files Created**: 2 (subscription.ts, SubscriptionCarousel.tsx)  
**Files Modified**: 1 (SubscriptionPage.tsx)  
**Dependencies Added**: 1 (embla-carousel-react ~13KB)

**MVP Scope** (Minimum Viable Product):

- Phase 1: Setup (T001-T004)
- Phase 2: Foundational (T005-T007)
- Phase 3: User Story 1 (T008-T019)
- **Total MVP Tasks**: 19 tasks
- **MVP Delivers**: Working carousel with button navigation, billing cycle persistence

**Full Feature Scope** (All User Stories):

- MVP + Phase 4-7: Adds dots, touch gestures, keyboard navigation, polish
- **Total Tasks**: 42 tasks
- **Delivers**: Complete carousel with all P1/P2/P3 features

**Parallelization Opportunities**:

- After T011 (SubscriptionCarousel exists): US2, US3, US4 can be developed in parallel
- T012-T015 can be developed in parallel (different UI elements)
- T033-T035 can be tested in parallel (different viewports)

---

**Branch**: `002-card-carousel`  
**Status**: ✅ Task breakdown complete  
**Next Step**: `/speckit.implement` to execute implementation  
**Constitutional Compliance**: ✅ All principles maintained (Clean Code, Simple UX, Responsive, Minimal Deps, Zero Testing)
