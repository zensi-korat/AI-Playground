# Task Breakdown: Subscription Page (001-subscription-page)

**Phase**: Phase 2 (Task Breakdown)  
**Date**: 2026-01-06  
**Status**: Ready for Implementation  
**Branch**: `001-subscription-page`

## Overview

This document provides a detailed, step-by-step task breakdown for implementing the Subscription Page feature across 4 user stories. All tasks follow the constitutional mandate of zero testing (manual verification only). Tasks are organized by priority and can be executed independently within each phase.

**Total Tasks**: 33  
**Estimated Duration**: 3-4 hours (experienced developer)  
**Parallel Opportunities**: High within each user story phase

---

## Executive Summary

| Phase   | User Story            | Priority | Task Count | Parallelizable   | Duration |
| ------- | --------------------- | -------- | ---------- | ---------------- | -------- |
| Phase 1 | Setup                 | N/A      | 3          | Yes              | 15 min   |
| Phase 2 | Foundational          | N/A      | 2          | Yes              | 10 min   |
| Phase 3 | US1: View Offerings   | P1       | 7          | Yes (3 parallel) | 45 min   |
| Phase 4 | US2: Pricing Toggle   | P2       | 5          | Yes (2 parallel) | 30 min   |
| Phase 5 | US3: CTA Button       | P2       | 5          | Yes (2 parallel) | 25 min   |
| Phase 6 | US4: Trust/Compliance | P3       | 8          | Yes (3 parallel) | 30 min   |
| Phase 7 | Polish                | N/A      | 3          | Yes              | 20 min   |

---

## Phase 1: Setup

### Verify Project Dependencies

- [x] T001 Verify Node.js and npm versions (Node 18+, npm 9+)
- [x] T002 [P] Verify React 19.2.0 and Tailwind CSS 4.1.18 installed in package.json
- [x] T003 [P] Verify shadcn/ui Button and Card components exist at src/components/ui/button.tsx and src/components/ui/card.tsx

**Duration**: 15 minutes  
**Success Criteria**:

- ✅ Node version check passes (18.0.0+)
- ✅ package.json contains React 19.2.0+ and Tailwind CSS 4.1.18+
- ✅ Both shadcn components exist and import cleanly

---

## Phase 2: Foundational

### Configure Tailwind Theme Colors

- [x] T004 [P] Update tailwind.config.ts to extend theme with brand colors (#0066FF, #0052CC, #000000 borders, gray accents)
- [x] T005 [P] Add @theme directives to src/index.css for brand color CSS variables (--color-brand-primary, --color-brand-hover, --color-text-default, etc.)

**Dependencies**: Phase 1 (all tasks)  
**Duration**: 10 minutes  
**Success Criteria**:

- ✅ Tailwind config includes all 6 brand colors
- ✅ index.css contains @theme block with CSS variable definitions
- ✅ Classes like `bg-brand-primary` resolve correctly in dev server
- ✅ `npm run dev` starts without errors

---

## Phase 3: User Story 1 - View Subscription Offerings (P1)

**User Story**: "As a user, I want to view the subscription offerings in a responsive card layout with features list, so I can understand what's included in the subscription"

**Independent Test Criteria**:

- ✅ SubscriptionPage component renders without errors
- ✅ Card displays with responsive layout (full-width mobile, centered on desktop)
- ✅ 6 features render correctly with checkmark icons
- ✅ Page is responsive at 375px, 768px, 1440px viewports
- ✅ Max card width is 448px on desktop
- ✅ Lighthouse score 90+, load time < 3s
- ✅ No console errors or warnings

### Create FeatureItem Subcomponent

- [x] T006 Create src/components/FeatureItem.tsx with FeatureItemProps interface (text: string)
- [x] T007 [P] Implement FeatureItem render: `<li>` with Lucide Check icon (4x4px, black) and text span
- [x] T008 [P] Style FeatureItem with Tailwind: flex items-start gap-3 text-sm text-gray-800 (semantic HTML, no role needed)

**Dependencies**: Phase 2 (all tasks)  
**Parallelizable**: T007 and T008 can run in parallel  
**Duration**: 15 minutes  
**Success Criteria**:

- ✅ FeatureItem exports correctly from src/components/FeatureItem.tsx
- ✅ Component accepts text prop and renders in `<li>` element
- ✅ Check icon displays with correct size and color
- ✅ Text wraps properly on narrow viewports
- ✅ No TypeScript errors

### Create SubscriptionPage Container & Layout

- [x] T009 Create src/pages/SubscriptionPage.tsx as default export JSX.Element
- [x] T010 [P] Implement main flex container: flex justify-center items-center min-h-screen bg-white
- [x] T011 [P] Add responsive max-width Card using shadcn Card: max-w-md on desktop, full-width on mobile

**Dependencies**: T005 (Tailwind config)  
**Parallelizable**: T010 and T011 can run in parallel  
**Duration**: 15 minutes  
**Success Criteria**:

- ✅ SubscriptionPage exports as default function
- ✅ Component renders without props needed
- ✅ Container is centered with proper flex alignment
- ✅ Card is responsive (448px max on desktop, full-width on mobile)
- ✅ No TypeScript errors

### Implement Features List

- [x] T012 [P] [US1] Create features data array in SubscriptionPage.tsx with 6 feature texts
- [x] T013 [P] [US1] Render features list: `<ul>` with space-y-3 gap, map over array calling FeatureItem for each
- [x] T014 [P] [US1] Style features section: CardContent with space-y-6, ul with proper list styling

**Dependencies**: T006-T011 (all components)  
**Parallelizable**: T012, T013, T014 can run in parallel  
**Duration**: 15 minutes  
**Success Criteria**:

- ✅ Features array contains exactly 6 items
- ✅ All 6 FeatureItem components render with correct text
- ✅ List is properly spaced (space-y-3 between items)
- ✅ Icons align vertically with text
- ✅ Responsive on mobile (text doesn't overflow)

### Verify Responsive Layout (US1)

- [ ] T015 [P] [US1] Test SubscriptionPage on 375px viewport (mobile): full-width card, readable text, icons visible
- [ ] T016 [P] [US1] Test SubscriptionPage on 768px viewport (tablet): card centered, proper spacing
- [ ] T017 [P] [US1] Test SubscriptionPage on 1440px viewport (desktop): card at max-w-md (448px), centered, clean layout

**Dependencies**: T014 (features rendered)  
**Parallelizable**: T015, T016, T017 can run in parallel (use browser dev tools)  
**Duration**: 15 minutes  
**Success Criteria**:

- ✅ Mobile (375px): No text overflow, icons visible, card full-width
- ✅ Tablet (768px): Card centered with padding, readable spacing
- ✅ Desktop (1440px): Card at 448px max width, centered, clean appearance
- ✅ All 6 features visible and properly formatted on all viewports
- ✅ Lighthouse score 90+ (Performance, Accessibility, Best Practices, SEO)

**US1 Complete**: Features list rendering with responsive layout ✅

---

## Phase 4: User Story 2 - Pricing Toggle (P2)

**User Story**: "As a user, I want to toggle between monthly ($9.99) and yearly ($99) pricing options with clear price breakdowns, so I can see the best deal for my needs"

**Independent Test Criteria**:

- ✅ Two pricing buttons render (monthly and yearly)
- ✅ Clicking monthly button shows $9.99, clicking yearly shows $99 + breakdown
- ✅ State toggles correctly (billingCycle updates on click)
- ✅ Toggle response is instant (< 100ms)
- ✅ Active button shows visual distinction (border, color)
- ✅ Inactive button shows different styling
- ✅ Responsive on all viewports (2-column grid)

### Add React State for Billing Cycle

- [ ] T018 [P] [US2] Add useState hook to SubscriptionPage: `const [billingCycle, setBillingCycle] = useState<"month" | "year">("month")`
- [ ] T019 [P] [US2] Create pricing data structure with month/year tiers (price, label, breakdown)

**Dependencies**: Phase 2 (Tailwind config)  
**Parallelizable**: T018 and T019 can run in parallel  
**Duration**: 10 minutes  
**Success Criteria**:

- ✅ useState hook is properly typed as "month" | "year"
- ✅ Initial state is "month"
- ✅ Pricing data includes both tiers with all required fields
- ✅ No TypeScript errors on state or data

### Implement Pricing Buttons

- [ ] T020 [P] [US2] Create pricing button grid: grid grid-cols-2 gap-3 in CardContent section
- [ ] T021 [P] [US2] Render monthly pricing button with border-2 styling, onClick handler calls setBillingCycle('month')
- [ ] T022 [P] [US2] Render yearly pricing button with border-2 styling, onClick handler calls setBillingCycle('year')

**Dependencies**: T018-T019 (state and data)  
**Parallelizable**: T021 and T022 can run in parallel  
**Duration**: 15 minutes  
**Success Criteria**:

- ✅ Pricing buttons render in 2-column grid
- ✅ Monthly button shows "$9.99" and "Per Month"
- ✅ Yearly button shows "$99" and "Per Year" with breakdown "USD 8.25 / Month"
- ✅ Buttons have border-2 styling for definition
- ✅ Clicking buttons calls onClick handlers
- ✅ No TypeScript errors

### Add Active State Styling

- [ ] T023 [P] [US2] Update pricing button classes: active button shows border-2 border-black and bg-gray-100, inactive shows border-2 border-gray-300
- [ ] T024 [P] [US2] Test toggle functionality: click monthly → border changes to black, click yearly → border changes to black

**Dependencies**: T020-T022 (buttons rendered)  
**Duration**: 10 minutes  
**Success Criteria**:

- ✅ Active button (billingCycle match) shows black border and light background
- ✅ Inactive button shows gray border and white background
- ✅ Toggle is instant (< 100ms response time)
- ✅ State updates correctly on each click
- ✅ Visual feedback is clear to user

**US2 Complete**: Pricing toggle with state management and visual feedback ✅

---

## Phase 5: User Story 3 - CTA Button (P2)

**User Story**: "As a user, I want a prominent call-to-action button to proceed to checkout, so I can easily start my subscription"

**Independent Test Criteria**:

- ✅ CTA button renders with text "Visual Studio Code →"
- ✅ Button styling is prominent (#0066FF primary blue)
- ✅ Button shows hover state (#0052CC darker blue)
- ✅ Button is full-width in CardFooter
- ✅ Button is focusable and accessible (keyboard nav)
- ✅ Responsive on all viewports (doesn't overflow)
- ✅ Click handler is ready (can be wired to routing later)

### Create CTA Button Section

- [ ] T025 [P] [US3] Add CardFooter container to SubscriptionPage with flex-col layout
- [ ] T026 [P] [US3] Implement CTA button using shadcn Button: w-full bg-brand-primary hover:bg-brand-primary-hover text-white

**Dependencies**: T005 (Tailwind colors), T022 (buttons section complete)  
**Parallelizable**: T025 and T026 can run in parallel  
**Duration**: 10 minutes  
**Success Criteria**:

- ✅ CardFooter renders below pricing buttons
- ✅ CTA button renders with text "Visual Studio Code →"
- ✅ Button uses brand primary color (#0066FF)
- ✅ Button is full-width (w-full)
- ✅ No TypeScript errors

### Style CTA Button & Hover State

- [ ] T027 [P] [US3] Add hover state to CTA button: bg-brand-primary-hover (#0052CC) on :hover
- [ ] T028 [P] [US3] Verify button text is white and arrow is included (use text content "Visual Studio Code →")
- [ ] T029 [P] [US3] Test on mobile (375px), tablet (768px), desktop (1440px): button full-width, readable, no overflow

**Dependencies**: T026 (button rendered)  
**Parallelizable**: T027, T028, T029 can run in parallel  
**Duration**: 15 minutes  
**Success Criteria**:

- ✅ Hover state changes to #0052CC (darker blue)
- ✅ Button text is visible in white
- ✅ Arrow character displays correctly
- ✅ Button is full-width on all viewports
- ✅ Touch-friendly size on mobile (min 44x44px)
- ✅ No overflow or text wrapping issues

**US3 Complete**: Prominent CTA button with styling and hover effects ✅

---

## Phase 6: User Story 4 - Trust & Compliance (P3)

**User Story**: "As a user, I want to see security badges and links to privacy/legal documents, so I can trust the service and understand the terms"

**Independent Test Criteria**:

- ✅ Security badge renders with checkmark icon and text "Secured with App Store, Cancel anytime"
- ✅ Privacy Policy, User Agreement, and EULA links render
- ✅ Links are semantic `<a>` tags with href attributes
- ✅ Links display with visual dividers ("|")
- ✅ All footer elements centered and properly spaced
- ✅ Responsive on all viewports (footer doesn't overflow)
- ✅ Links are keyboard accessible (Tab navigation)
- ✅ WCAG 2.1 AA+ compliance (color contrast 7:1+)

### Add Security Badge

- [ ] T030 [P] [US4] Add security badge to CardFooter above CTA button: flex items-center gap-2 with checkmark icon
- [ ] T031 [P] [US4] Render security badge icon using Lucide Check (4x4 black)
- [ ] T032 [P] [US4] Style security badge text: text-xs text-gray-600 ("Secured with App Store, Cancel anytime")

**Dependencies**: T025 (CardFooter created)  
**Parallelizable**: T031 and T032 can run in parallel  
**Duration**: 15 minutes  
**Success Criteria**:

- ✅ Security badge renders above CTA button
- ✅ Checkmark icon displays with correct color and size
- ✅ Badge text is readable (text-xs, gray-600 for secondary info)
- ✅ Proper spacing between icon and text (gap-2)
- ✅ No TypeScript errors

### Add Footer Links

- [ ] T033 [P] [US4] Create footer links section below CTA button: flex justify-center gap-1 items-center
- [ ] T034 [P] [US4] Render three footer links as `<a>` tags: Privacy Policy, User Agreement, EULA (href="#" for now, placeholder)
- [ ] T035 [P] [US4] Add dividers between links: "|" character with text-gray-400 color

**Dependencies**: T025 (CardFooter created)  
**Parallelizable**: T033, T034, T035 can run in parallel  
**Duration**: 15 minutes  
**Success Criteria**:

- ✅ Footer links section renders below CTA button
- ✅ Three links render with correct text (Privacy Policy, User Agreement, EULA)
- ✅ Links are semantic `<a>` tags (not buttons)
- ✅ Links have href attributes (placeholder "#")
- ✅ Dividers display between links
- ✅ All footer elements are centered

### Style Footer & Add Accessibility

- [ ] T036 [P] [US4] Style footer links: text-xs text-gray-600 underline on hover, proper link colors (no visited state needed)
- [ ] T037 [P] [US4] Verify footer layout is responsive on 375px (single row, no overflow), 768px (single row), 1440px (single row centered)

**Dependencies**: T034-T035 (links rendered)  
**Parallelizable**: T036 and T037 can run in parallel  
**Duration**: 10 minutes  
**Success Criteria**:

- ✅ Links have text-gray-600 color initially
- ✅ Links show underline on hover
- ✅ Footer layout is single row on all viewports
- ✅ No text overflow or wrapping issues
- ✅ Dividers align with links vertically
- ✅ WCAG AA+ color contrast (7:1+)
- ✅ Links are keyboard focusable (Tab key)

**US4 Complete**: Trust and compliance elements with links and security badge ✅

---

## Phase 7: Polish & Cross-Cutting Concerns

### Comprehensive Verification

- [ ] T038 [P] [US1-US4] Run comprehensive manual verification on 375px (mobile) viewport: all features visible, pricing toggle works, CTA button responsive, footer readable
- [ ] T039 [P] [US1-US4] Run comprehensive manual verification on 768px (tablet) viewport: proper spacing, card centered, all elements aligned
- [ ] T040 [P] [US1-US4] Run comprehensive manual verification on 1440px (desktop) viewport: card at max width, clean layout, professional appearance

**Duration**: 15 minutes  
**Success Criteria**:

- ✅ Mobile (375px): All content visible, no overflow, touchable buttons (44x44px)
- ✅ Tablet (768px): Proper spacing, readable text, card centered
- ✅ Desktop (1440px): Card at 448px max width, clean layout, professional
- ✅ All features, pricing, CTA, footer working on all viewports
- ✅ No console errors or warnings

### Accessibility & Performance Review

- [ ] T041 [P] Verify Lighthouse score 90+ (Performance, Accessibility, Best Practices, SEO)
- [ ] T042 [P] Verify toggle response time < 100ms (manually test: click pricing button, measure state update)
- [ ] T043 [P] Verify page load time < 3 seconds, total bundle size, no unused CSS

**Duration**: 15 minutes  
**Success Criteria**:

- ✅ Lighthouse Performance: 90+
- ✅ Lighthouse Accessibility: 90+
- ✅ Lighthouse Best Practices: 90+
- ✅ Lighthouse SEO: 90+
- ✅ Pricing toggle response: < 100ms
- ✅ Page load time: < 3 seconds
- ✅ No performance regressions

### Code Cleanup & Commit

- [ ] T044 No test files needed (CONSTITUTION: Zero Testing mandate)
- [ ] T045 [P] Review SubscriptionPage.tsx for clean code: no console logs, proper TypeScript types, clear variable names
- [ ] T046 [P] Review FeatureItem.tsx for clean code: reusable subcomponent, semantic HTML, proper exports

**Duration**: 10 minutes  
**Success Criteria**:

- ✅ No console.log statements or debug code
- ✅ All TypeScript types properly annotated
- ✅ Variable and component names are clear and descriptive
- ✅ Component structure is clean (no prop drilling)
- ✅ Semantic HTML used (no unnecessary divs, proper tags)
- ✅ Proper exports (default for page, named for subcomponent)
- ✅ Ready for code review

---

## Task Execution Strategy

### Recommended Execution Order

1. **Sequential**: Phase 1 (Setup) → Phase 2 (Foundational) - blocking prerequisites
2. **Parallel within Phase 3**: T006-T008 (FeatureItem) can run parallel to T009-T014 (main container + features)
3. **Sequential**: Phase 3 → Phase 4 - needs pricing grid location from Phase 3
4. **Parallel within Phase 4**: T021-T022 (pricing buttons) can run parallel
5. **Sequential**: Phase 4 → Phase 5 - CTA button location needs CardFooter from Phase 4
6. **Parallel within Phase 5**: T027-T029 (styling) can run parallel
7. **Sequential**: Phase 5 → Phase 6 - footer location needs CardFooter from Phase 5
8. **Parallel within Phase 6**: Security badge (T030-T032) can run parallel to footer links (T033-T035)
9. **Parallel in Phase 7**: All verification tasks can run in parallel (different breakpoints, different tools)

### Parallelization Examples

**Example 1: Phase 3 Parallelization** (5 developers, 15 min execution)

- Developer A: T006-T008 (FeatureItem component)
- Developer B: T009-T011 (main container)
- Developer C: T012-T014 (features list)
- Developer D+E: T015-T017 (responsive verification)
- Result: US1 complete in 15 min with parallel execution

**Example 2: Phase 4 Parallelization** (3 developers, 10 min execution)

- Developer A: T018-T019 (state and data)
- Developer B: T021-T022 (pricing buttons)
- Developer C: T023-T024 (active state styling)
- Result: US2 complete in 10 min with parallel execution

**Example 3: Phase 6 Parallelization** (4 developers, 10 min execution)

- Developer A: T030-T032 (security badge)
- Developer B: T033-T035 (footer links)
- Developer C+D: Responsive testing
- Result: US4 complete in 10 min with parallel execution

### Estimated Timeline

| Scenario                   | Duration    | Notes                                  |
| -------------------------- | ----------- | -------------------------------------- |
| **Sequential** (1 dev)     | 3-4 hours   | All tasks in order, no parallelization |
| **Distributed** (4-5 devs) | 1.5-2 hours | Parallel execution within phases       |
| **Agile** (2-3 devs)       | 2-2.5 hours | Balanced parallelization               |

---

## Dependency Graph

```
Phase 1: Setup
  ├── T001 ✓
  ├── T002 ✓
  └── T003 ✓
        ↓
Phase 2: Foundational (depends on Phase 1)
  ├── T004 ✓
  └── T005 ✓
        ↓
Phase 3: US1 - View Offerings (depends on Phase 2)
  ├── [T006, T007, T008] FeatureItem (parallel)
  ├── [T009, T010, T011] Container (parallel)
  ├── [T012, T013, T014] Features list (parallel, depends on FeatureItem)
  └── [T015, T016, T017] Verification (parallel, depends on features list)
        ↓
Phase 4: US2 - Pricing Toggle (depends on Phase 3)
  ├── [T018, T019] State + Data (parallel)
  ├── [T020, T021, T022] Buttons (parallel, depends on state)
  └── [T023, T024] Styling (parallel, depends on buttons)
        ↓
Phase 5: US3 - CTA Button (depends on Phase 4)
  ├── [T025, T026] Button section (parallel, depends on Phase 4)
  ├── [T027, T028, T029] Styling (parallel, depends on button)
        ↓
Phase 6: US4 - Trust/Compliance (depends on Phase 5)
  ├── [T030, T031, T032] Security badge (parallel, depends on Phase 5)
  ├── [T033, T034, T035] Footer links (parallel, depends on Phase 5)
  └── [T036, T037] Footer styling (parallel, depends on links)
        ↓
Phase 7: Polish (depends on Phase 6)
  ├── [T038, T039, T040] Comprehensive verification (parallel)
  ├── [T041, T042, T043] Performance verification (parallel)
  └── [T044, T045, T046] Code cleanup (parallel)
```

---

## Success Criteria Summary

**Phase 1 (Setup)**: All dependencies verified  
**Phase 2 (Foundational)**: Tailwind colors configured  
**Phase 3 (US1)**: Features rendering with responsive layout ✅  
**Phase 4 (US2)**: Pricing toggle working with state updates ✅  
**Phase 5 (US3)**: CTA button styled and responsive ✅  
**Phase 6 (US4)**: Trust badges and footer links complete ✅  
**Phase 7 (Polish)**: All verification passed, ready for merge ✅

**Final Gate**: Lighthouse 90+, responsive on 375/768/1440px, toggle < 100ms, load < 3s, no console errors ✅

---

## Notes

- **Testing**: CONSTITUTION mandate: ZERO TESTING. All verification is manual browser testing.
- **File Paths**: All paths are relative to repository root (e.g., `src/pages/SubscriptionPage.tsx`)
- **Dependencies**: Only use existing packages + date-fns (already justified in research.md)
- **Styling**: All styling via Tailwind classes and @theme colors; no CSS files needed
- **Git Commits**: Commit after each user story completion with clear messages (e.g., "feat: add pricing toggle functionality")

---

## Ready for Implementation

All tasks are defined, sequenced, and ready for execution. Begin with Phase 1 (Setup) and follow the dependency graph for optimal execution path.

**Next Steps**:

1. Execute Phase 1 (Setup verification)
2. Execute Phase 2 (Tailwind configuration)
3. Execute Phase 3 (US1: Features layout)
4. Execute Phase 4 (US2: Pricing toggle)
5. Execute Phase 5 (US3: CTA button)
6. Execute Phase 6 (US4: Trust badges)
7. Execute Phase 7 (Polish & verification)
8. Push commits and create PR to main
9. Request code review
10. Merge to main
