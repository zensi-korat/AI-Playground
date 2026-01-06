# Feature Specification: Card Carousel Slider

**Feature Branch**: `002-card-carousel`  
**Created**: 2026-01-06  
**Status**: Draft  
**Input**: User description: "on click of this button i want to change the card to the next card available. add slider"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Navigate Between Cards (Priority: P1)

As a user viewing the subscription page, I want to navigate between multiple subscription plan cards using next/previous buttons, so I can compare different offerings without leaving the page.

**Why this priority**: Core functionality that enables users to browse multiple subscription options. Without this, users can only see one card at a time.

**Independent Test**: Can be fully tested by clicking navigation buttons and verifying the card content changes with smooth animation. Delivers value as a standalone feature - users can explore multiple subscription plans.

**Acceptance Scenarios**:

1. **Given** user is viewing Card 1, **When** user clicks "Next" button, **Then** Card 2 slides in from the right and Card 1 slides out to the left
2. **Given** user is viewing Card 2, **When** user clicks "Previous" button, **Then** Card 1 slides in from the left and Card 2 slides out to the right
3. **Given** user is viewing the last card (Card N), **When** user clicks "Next" button, **Then** carousel wraps around to Card 1 with smooth animation
4. **Given** user is viewing Card 1, **When** user clicks "Previous" button, **Then** carousel wraps around to the last card (Card N) with smooth animation

---

### User Story 2 - Visual Indicator of Current Position (Priority: P2)

As a user navigating between cards, I want to see dots or indicators showing which card I'm currently viewing and how many total cards exist, so I understand my position in the carousel.

**Why this priority**: Enhances user experience by providing context, but navigation works without it. P2 because it's a usability improvement on top of P1.

**Independent Test**: Can be tested by navigating cards and verifying the active dot indicator updates correctly. Delivers visual feedback that helps users understand the carousel structure.

**Acceptance Scenarios**:

1. **Given** user is viewing Card 1, **When** carousel loads, **Then** the first dot indicator is highlighted/active
2. **Given** user navigates to Card 2, **When** card animation completes, **Then** the second dot indicator becomes active and first dot becomes inactive
3. **Given** 3 cards exist, **When** user views any card, **Then** 3 dots are displayed with the corresponding dot highlighted

---

### User Story 3 - Touch/Swipe Gestures (Priority: P3)

As a mobile user, I want to swipe left/right on the card to navigate between cards, so I can use natural touch gestures instead of buttons.

**Why this priority**: Nice-to-have enhancement for mobile users. Button navigation (P1) works fine on mobile, but swipe gestures feel more native.

**Independent Test**: Can be tested on touch devices by swiping left/right and verifying card navigation. Delivers mobile-optimized interaction pattern.

**Acceptance Scenarios**:

1. **Given** user is on mobile viewing Card 1, **When** user swipes left on the card, **Then** Card 2 slides in from the right
2. **Given** user is on mobile viewing Card 2, **When** user swipes right on the card, **Then** Card 1 slides in from the left
3. **Given** user begins a swipe but doesn't complete the threshold, **When** user releases, **Then** card snaps back to original position

---

### User Story 4 - Keyboard Navigation (Priority: P3)

As a keyboard user, I want to use arrow keys to navigate between cards, so I can browse without using a mouse.

**Why this priority**: Accessibility enhancement. Not critical for MVP since button clicks work with keyboard (Tab + Enter), but arrow keys provide better UX.

**Independent Test**: Can be tested by using Left/Right arrow keys and verifying card navigation. Delivers keyboard-optimized experience.

**Acceptance Scenarios**:

1. **Given** user has focused the carousel, **When** user presses Right arrow key, **Then** next card slides in
2. **Given** user has focused the carousel, **When** user presses Left arrow key, **Then** previous card slides in

---

### User Story 3 - [Brief Title] (Priority: P3)

### Edge Cases

- What happens when there's only 1 card? (Navigation buttons should be hidden or disabled)
- What happens when user rapidly clicks Next button multiple times? (Should debounce or queue transitions, not break animation)
- What happens during card transition when user clicks navigation button? (Should either queue the action or ignore until current transition completes)
- How does carousel handle window resize during transition? (Should maintain layout integrity)
- What if card content has different heights? (Carousel container should adjust height smoothly or maintain fixed height)
- What happens when user clicks Next while animation is still in progress? (Should prevent multiple simultaneous animations)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display multiple subscription plan cards (minimum 2, recommended 3-5)
- **FR-002**: System MUST provide "Next" and "Previous" navigation buttons visible on the card
- **FR-003**: Users MUST be able to navigate to the next card by clicking the "Next" button with smooth slide animation (300-500ms transition)
- **FR-004**: Users MUST be able to navigate to the previous card by clicking the "Previous" button with smooth slide animation
- **FR-005**: Carousel MUST wrap around - clicking "Next" on last card shows first card, clicking "Previous" on first card shows last card
- **FR-006**: System MUST show only one card at a time (current card is fully visible, others are hidden)
- **FR-007**: System MUST display dot indicators showing total number of cards and highlighting the current card (P2 requirement)
- **FR-008**: System MUST support touch/swipe gestures on mobile devices - swipe left for next, swipe right for previous (P3 requirement)
- **FR-009**: System MUST support keyboard navigation - Right arrow for next, Left arrow for previous (P3 requirement)
- **FR-010**: System MUST prevent animation glitches when user triggers navigation during an ongoing transition
- **FR-011**: Each card MUST maintain the same layout structure as the current subscription page (features list, pricing toggle, CTA button, footer)
- **FR-012**: Navigation buttons MUST be positioned clearly (e.g., left/right edges or bottom of card) and be touch-friendly (minimum 44x44px)
- **FR-013**: System MUST persist the currently selected pricing plan (monthly/yearly) when navigating between cards
- **FR-014**: System MUST be responsive at all breakpoints (375px mobile, 768px tablet, 1440px desktop)

### Key Entities *(include if feature involves data)*

- **SubscriptionCard**: Represents a complete subscription offering with features list, pricing tiers, CTA button, and footer. Each card has:
  - Unique identifier (e.g., "basic", "premium", "enterprise")
  - Character image/avatar
  - List of features (array of strings)
  - Pricing information (monthly and yearly rates)
  - CTA button text
  - Optional: Card title, description, highlight badge

- **CarouselState**: Represents the current state of the carousel:
  - Current card index (0-based)
  - Total number of cards
  - Animation state (idle, transitioning, direction)
  - Selected billing cycle (month/year) - shared across all cards

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can navigate between all cards within 5 seconds using Next/Previous buttons
- **SC-002**: Card transition animation completes in under 500ms with smooth 60fps performance
- **SC-003**: Carousel maintains functionality across all 3 breakpoints (375px, 768px, 1440px) without layout breakage
- **SC-004**: Dot indicators accurately reflect current card position with no delay or desynchronization
- **SC-005**: Touch swipe gestures (P3) have 90%+ success rate for intentional swipes (threshold: 50px horizontal movement)
- **SC-006**: Keyboard navigation (P3) responds instantly (< 100ms) to arrow key presses
- **SC-007**: Users can navigate to any card without encountering stuck states or broken animations
- **SC-008**: Lighthouse accessibility score remains 90+ after carousel implementation
- **SC-009**: Rapid button clicking (5 clicks/second) does not cause visual glitches or state corruption
- **SC-010**: Selected billing cycle persists correctly when navigating between cards (no reset to default)

## Assumptions

- **A-001**: Subscription card data will be hardcoded in the component initially (no API integration required for MVP)
- **A-002**: All cards have the same layout structure - no mixed card types (e.g., no "special offer" cards with different layouts)
- **A-003**: Character images for each card exist in `/public/clips-images/` or will be provided
- **A-004**: Maximum 5 subscription cards to prevent overwhelming users
- **A-005**: Carousel uses CSS transforms for animation (not position-based animation) for better performance
- **A-006**: No autoplay - carousel only advances when user explicitly triggers navigation
- **A-007**: No lazy loading of cards - all card data loaded upfront (acceptable for 3-5 cards)
- **A-008**: Browser support: Modern browsers with CSS transform support (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

## Dependencies

- **Existing**: React 19.2.0, Tailwind CSS 4.1.18, TypeScript 5.9.3, shadcn/ui components
- **Optional**: 
  - Swipe gesture library (P3) - consider `react-swipeable` (~3KB) or implement custom using touch events
  - Animation library (optional) - Framer Motion could be used but adds ~50KB (prefer CSS transforms per Minimal Dependencies principle)
- **Constitution Compliance**: All dependencies must align with Minimal Dependencies principle - prefer native CSS/JS solutions over heavy libraries

## Out of Scope

- **Autoplay/Auto-advance**: Carousel will not automatically advance cards on a timer
- **Infinite scroll/Virtual scrolling**: All cards rendered in DOM (acceptable for small number of cards)
- **Card-specific animations**: Each card has same slide transition (no custom animations per card)
- **Deep linking**: URL doesn't change when navigating cards (no routing integration)
- **Analytics tracking**: Navigation events not tracked (can be added later)
- **Multi-card view**: Always shows 1 card at a time (no "peek" at adjacent cards)
- **Thumbnail preview**: No thumbnail strip showing all cards at once
- **Card reordering**: Card order is fixed (no drag-to-reorder functionality)
