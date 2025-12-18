# Project Instructions & Coding Standards

This file serves as the definitive source of truth for coding standards and workflows in this project.

## 1. Styling & Design Tokens

### ❌ No Arbitrary Tailwind Values
Do **NOT** use arbitrary values in Tailwind classes (e.g., `w-[15px]`, `bg-[#F0F0F0]`, `m-[13px]`).
- **Bad**: `class="w-[350px] bg-[#1a1a1a]"`
- **Good**: `class="w-token bg-brand-primary"` (mapped to variables)

### ✅ CSS Variables First
If you encounter a style that does not exist in the current Tailwind configuration or CSS variables:
1.  **Create a new CSS variable** in `src/index.css`.
2.  Use that variable in your code (either via `var(--name)` or a Tailwind class mapped to it).
3.  **Do not** hardcode the value in the component.

## 2. Source of Truth
- **Figma Variables**: `src/all-variables.json` is the source of truth for design tokens.
- **Syncing**: Use `node src/scripts/sync-tokens.js` to sync variables from JSON to CSS.

## 3. Component Updates
## 3. Component Updates
- When updating components based on Figma, ensure every style property (padding, typography, shadows) is mapped to a variable.

## 4. Zensi Page Design Requirements
- **Pixel‑Perfect Match**: Reproduce the Figma page exactly – spacing, typography, colors, border‑radius, shadows, and layout must match.
- **Color System**: Use only color tokens defined in `src/index.css` (e.g., `var(--colors-brand500)`). No arbitrary color values.
- **Typography**: Follow Figma typography precisely – use Tailwind font‑size, weight, line‑height utilities that match the design.
- **Spacing & Sizing**: Use Tailwind’s built‑in spacing utilities or theme tokens; never use arbitrary `[value]` syntax.
- **Components**: Reuse existing Shadcn UI components; create new ones only when necessary.
- **Responsiveness**: Mobile‑first layout that adapts gracefully to larger screens.
- **Accessibility**: Use semantic HTML, ARIA attributes, and ensure keyboard navigation.
- **Code Quality**: Follow project conventions, use `cn()` for class merging, keep imports minimal.
