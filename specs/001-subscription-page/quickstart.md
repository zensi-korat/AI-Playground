# Quickstart: Subscription Page Development

**Feature**: 001-subscription-page  
**Branch**: `001-subscription-page`  
**Component**: `src/pages/SubscriptionPage.tsx`  
**Subcomponent**: `src/components/FeatureItem.tsx`

## Prerequisites

- Node.js 18+ (already installed)
- npm 9+ (already installed)
- Git (already installed)
- Text editor (VS Code recommended)

## Project Setup

### 1. Switch to Feature Branch

```bash
git checkout 001-subscription-page
```

### 2. Install Dependencies

```bash
npm install
```

If date-fns is not yet in package.json (to be verified):

```bash
npm install date-fns@^3.0.0
```

### 3. Verify Project Structure

```bash
# Verify key directories exist
ls -la src/components/ui/           # shadcn Button and Card
ls -la src/pages/                   # Where SubscriptionPage.tsx will live
ls -la src/utils/                   # Utility functions (cn, etc.)
ls -la src/lib/                     # Library utilities

# Verify Tailwind is configured
cat tailwind.config.ts | grep "theme"
cat src/index.css | grep "@tailwind"
```

### 4. Start Development Server

```bash
npm run dev
```

Server starts at `http://localhost:5173` (Vite default)

## Implementation Guide

### Phase 1: View Subscription Offerings (US1)

**Goal**: Create responsive card layout with all required elements

**Steps**:

1. **Create FeatureItem subcomponent** (`src/components/FeatureItem.tsx`):

   ```bash
   cat > src/components/FeatureItem.tsx << 'EOF'
   import { Check } from "lucide-react"

   interface FeatureItemProps {
     text: string
   }

   export function FeatureItem({ text }: FeatureItemProps) {
     return (
       <li className="flex items-start gap-3 text-sm text-gray-800">
         <Check className="h-4 w-4 mt-0.5 shrink-0 text-black" />
         <span>{text}</span>
       </li>
     )
   }
   EOF
   ```

2. **Create SubscriptionPage component** (`src/pages/SubscriptionPage.tsx`):

   - Import React, Button, Card components
   - Set up container with flexbox layout
   - Create Card with image section
   - Add CardContent with features list
   - Render FeatureItem components

3. **Manual Verification** (Desktop - 1440px):

   ```
   ✅ Card is centered with max-width
   ✅ Character image displays with correct aspect ratio
   ✅ 6 features are listed with checkmarks
   ✅ All content fits without scrolling
   ```

4. **Responsive Check** (Mobile - 375px):

   ```
   Open dev tools (F12) → Toggle device toolbar → Select iPhone SE
   ✅ Card is full-width with padding
   ✅ All elements stack vertically
   ✅ Text is readable
   ✅ Image doesn't overflow
   ```

5. **Responsive Check** (Tablet - 768px):
   ```
   Toggle device toolbar → Select iPad
   ✅ Card is properly sized
   ✅ Spacing is appropriate
   ✅ All elements are visible
   ```

### Phase 2: Switch Between Pricing Plans (US2)

**Goal**: Add interactive pricing toggle with state management

**Steps**:

1. **Add useState hook**:

   ```typescript
   const [billingCycle, setBillingCycle] = useState<"month" | "year">("month");
   ```

2. **Create pricing buttons**:

   - Two-column grid layout
   - Conditional border styling (black when selected)
   - onClick handlers to toggle state
   - Display correct pricing: $9.99 for monthly, $99 for yearly
   - Show breakdown "USD 8.25 / Month" for yearly only

3. **Manual Verification**:
   ```
   ✅ Click monthly button → border turns black, "$9.99" displays
   ✅ Click yearly button → border turns black, "$99" and breakdown display
   ✅ Toggle back and forth → no delay, state updates instantly
   ✅ Response time is < 100ms (visually instantaneous)
   ```

### Phase 3: Proceed to Checkout (US3)

**Goal**: Add prominent CTA button with styling

**Steps**:

1. **Create CTA button in CardFooter**:

   - Use shadcn Button component
   - Background color: #0066FF (brand-primary)
   - Hover state: #0052CC (darker blue)
   - Full width (w-full)
   - Height: 48px (h-12)
   - Font: Semibold text
   - Text: "Visual Studio Code →"

2. **Manual Verification**:

   ```
   Desktop (1440px):
   ✅ Button is visually prominent with blue color
   ✅ Hover over button → color darkens (#0052CC)
   ✅ Button has clear text with arrow

   Mobile (375px):
   ✅ Button spans full width of card
   ✅ Button is easily tappable (48px height = 44x44px minimum)
   ✅ Text is readable
   ```

### Phase 4: Trust and Legal Compliance (US4)

**Goal**: Add security badge and footer links

**Steps**:

1. **Create security badge**:

   - Checkmark icon (SVG or Lucide)
   - Text: "Secured with App Store, Cancel anytime"
   - Small text size (text-xs)
   - Gray color (text-gray-600)

2. **Create footer links**:

   - Three links: Privacy Policy, User Agreement, EULA
   - Separated by dividers ("|")
   - Small text size (text-[10px])
   - Gray color (text-gray-500)
   - Underline on hover

3. **Manual Verification**:
   ```
   ✅ Security badge displays with icon and text
   ✅ Footer links are centered and separated
   ✅ Links are underlined on hover (desktop)
   ✅ Links are tappable (44x44px minimum, mobile)
   ✅ All text is readable at appropriate sizes
   ```

## Verification Checklist

### User Story 1: View Subscription Offerings

- [ ] Card layout is centered and responsive
- [ ] Character image displays with correct aspect ratio
- [ ] All 6 features are visible with checkmarks
- [ ] No horizontal scrolling on any viewport
- [ ] Mobile (375px): Full-width, elements stack vertically
- [ ] Tablet (768px): Properly sized, readable
- [ ] Desktop (1440px): Centered, all visible without scroll

### User Story 2: Switch Between Pricing Plans

- [ ] Monthly button: click → border black, "$9.99" displays
- [ ] Yearly button: click → border black, "$99" and "USD 8.25 / Month" display
- [ ] Toggle between buttons → no delay, smooth transitions
- [ ] Response time < 100ms (measure with dev tools performance tab)

### User Story 3: Proceed to Checkout

- [ ] CTA button is blue (#0066FF) with white text
- [ ] Hover state: darker blue (#0052CC)
- [ ] Full-width button, 48px height
- [ ] Text is "Visual Studio Code →" with arrow
- [ ] Mobile: easily tappable, full-width
- [ ] Desktop: button is prominent and clickable

### User Story 4: Trust and Legal Compliance

- [ ] Security badge displays with checkmark icon
- [ ] Text: "Secured with App Store, Cancel anytime"
- [ ] Footer: 3 links (Privacy Policy, User Agreement, EULA) separated by dividers
- [ ] Links are underlined on hover (desktop)
- [ ] Links are tappable on mobile
- [ ] All text is readable and appropriately sized

## Testing Procedure (Manual Verification)

### Breakpoint Testing

**Mobile (375px)**:

```bash
# Dev Tools → Toggle Device Toolbar → iPhone SE
# Verify:
- Card is full-width with padding
- All elements stack vertically
- No horizontal scrolling
- Text is readable
- Images scale appropriately
- Buttons are tappable (44x44px minimum)
```

**Tablet (768px)**:

```bash
# Dev Tools → iPad
# Verify:
- Card is properly sized
- Spacing is appropriate
- Grid layout works (2-column for pricing buttons)
- Text is readable
- All elements visible without scroll
```

**Desktop (1440px)**:

```bash
# Dev Tools → Close device toolbar (or set viewport to 1440px)
# Verify:
- Card is centered with max-width 448px
- All elements visible without scroll
- Spacing looks balanced
- Button hover states work
```

### Browser Compatibility

Test in:

- Chrome (latest) ✅
- Firefox (latest) ✅
- Safari (latest) ✅
- Edge (latest) ✅

### Accessibility Checks

```bash
# Chrome Dev Tools → Lighthouse → Accessibility
# Target: 90+

# Verify:
- All buttons are focusable (Tab key)
- All buttons have clear labels
- Color contrast is adequate (WCAG AA)
- No console errors
- Semantic HTML is used (button, nav, etc.)
```

### Performance Verification

```bash
# Chrome Dev Tools → Performance tab
# Record page load and state toggle

# Verify:
- Initial render < 3 seconds
- Toggle response < 100ms
- No jank or flashing
- No memory leaks
```

## Debugging Tips

### Issue: Button styles not applying

**Check**:

1. Verify Tailwind is configured: `grep @tailwind src/index.css`
2. Verify shadcn Button is imported: `ls src/components/ui/button.tsx`
3. Check for typos in className props
4. Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Issue: Icons not showing (Check, etc.)

**Check**:

1. Verify Lucide React is installed: `npm ls lucide-react`
2. Check import path: `import { Check } from "lucide-react"`
3. Verify icon name is correct: [Lucide Icons](https://lucide.dev/)

### Issue: Card not centered

**Check**:

1. Parent container uses `flex` with `items-center`
2. Card has `max-w-md` class
3. Container is `min-h-screen`

### Issue: Responsive not working

**Check**:

1. Verify Tailwind is processing the file: `npm run build`
2. Check for typos in breakpoint prefixes: `sm:`, `md:`, `lg:`
3. Verify `tailwind.config.ts` includes the correct content paths

## Development Workflow

1. **Start dev server**: `npm run dev`
2. **Make a small change**: Edit component file
3. **Verify in browser**: Hot module reload (automatic)
4. **Test on all breakpoints**: Dev tools device toggle
5. **Commit change**: `git commit -m "..."`
6. **Repeat** for each task

## Deployment

Once all verification is complete:

```bash
# Run production build
npm run build

# Verify output size
du -sh dist/

# Preview production build
npm run preview

# Push to remote
git push origin 001-subscription-page
```

## Common Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint

# View git status
git status

# Commit changes
git add .
git commit -m "..."

# Push to remote
git push origin 001-subscription-page
```

## Next Steps

1. Implement Phase 1: View Subscription Offerings (US1)
2. Test on all 3 breakpoints
3. Implement Phase 2: Pricing Toggle (US2)
4. Test toggle functionality
5. Implement Phase 3: CTA Button (US3)
6. Test button styling and hover states
7. Implement Phase 4: Security Badge & Footer (US4)
8. Final verification across all scenarios
9. Commit and push

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Support

If you encounter issues:

1. Check the manual verification checklist above
2. Review the component contracts in data-model.md
3. Examine the existing SubscriptionPage.tsx implementation
4. Check the browser console for errors
5. Use Chrome DevTools to inspect elements and styles

---

**Ready to implement!** 🚀

Start with Phase 1 and follow the verification checklist for each user story.
