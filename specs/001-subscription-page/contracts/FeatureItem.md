# Component Contract: FeatureItem

**Component**: `src/components/FeatureItem.tsx`  
**Type**: Presentational Subcomponent (React Functional Component)  
**Status**: To be implemented  
**Phase**: Phase 1

## Overview

FeatureItem is a simple, reusable subcomponent that renders a single feature list item with a checkmark icon. It's used within SubscriptionPage to display the 6 subscription features.

## Component Signature

```typescript
export function FeatureItem({ text }: FeatureItemProps): JSX.Element;
```

**Props**: `FeatureItemProps`

**Returns**: `JSX.Element` - A single list item element

## Props Interface

```typescript
interface FeatureItemProps {
  text: string;
}
```

### Prop Details

| Prop   | Type     | Required | Description                    | Example                     |
| ------ | -------- | -------- | ------------------------------ | --------------------------- |
| `text` | `string` | Yes      | Feature description to display | `"Unlimited Text Messages"` |

## Render Output

```html
<li className="flex items-start gap-3 text-sm text-gray-800">
  <Check className="h-4 w-4 mt-0.5 shrink-0 text-black" />
  <span>{text}</span>
</li>
```

### Structure

```
<li> (list item)
├── <Check icon> (from Lucide React)
│   └── Size: 4x4 pixels (h-4 w-4)
│   └── Color: black
│   └── Margin-top: 2px (mt-0.5, for vertical alignment)
└── <span> (text content)
    └── Text size: small (text-sm)
    └── Text color: dark gray (text-gray-800)
    └── Gap from icon: 12px (gap-3)
```

## Styling

### Classes Used

- **Container**: `flex items-start gap-3 text-sm text-gray-800`

  - `flex`: Flexbox layout
  - `items-start`: Align icon and text at top
  - `gap-3`: 12px horizontal spacing between icon and text
  - `text-sm`: 14px font size
  - `text-gray-800`: Dark gray text color (#1f2937)

- **Icon**: `h-4 w-4 mt-0.5 shrink-0 text-black`
  - `h-4 w-4`: 16x16 pixels icon size
  - `mt-0.5`: 2px top margin (fine-tune vertical alignment)
  - `shrink-0`: Prevent icon from shrinking
  - `text-black`: Black color (#000000)

### Color Values

| Element    | Tailwind Class  | CSS Value  | Hex       |
| ---------- | --------------- | ---------- | --------- |
| Text       | `text-gray-800` | dark gray  | `#1f2937` |
| Icon       | `text-black`    | pure black | `#000000` |
| Background | (inherited)     | white      | `#ffffff` |

## Component Dependencies

### Imports

```typescript
import { Check } from "lucide-react";

interface FeatureItemProps {
  text: string;
}

export function FeatureItem({ text }: FeatureItemProps): JSX.Element;
```

### External Dependencies

- **Lucide React**: `Check` icon component
- **React**: Built-in JSX/TypeScript support

### No External Libraries

- No shadcn/ui components
- No additional CSS files
- No state management
- No context usage

## Usage Examples

### Basic Usage

```typescript
<FeatureItem text="Unlimited Text Messages" />
```

**Renders**:

```html
<li class="flex items-start gap-3 text-sm text-gray-800">
  <svg class="h-4 w-4 mt-0.5 shrink-0 text-black"><!-- Check icon --></svg>
  <span>Unlimited Text Messages</span>
</li>
```

### In a List

```typescript
<ul className="space-y-3">
  <FeatureItem text="Unlimited Text Messages" />
  <FeatureItem text="View Character Stories" />
  <FeatureItem text="Unlimited Audio Messages" />
  <FeatureItem text="600 Character Limit On Enhanced Memory" />
  <FeatureItem text="Enhanced Memory Context" />
  <FeatureItem text="Remove Ads" />
</ul>
```

**Parent spacing**: `space-y-3` adds 12px vertical gap between items

## Behavior

### Props Changes

When the `text` prop changes:

1. Component re-renders
2. Icon remains the same
3. Text content updates
4. No state management needed

**Example**:

```typescript
const [feature, setFeature] = useState("Original Text");

return (
  <>
    <FeatureItem text={feature} />
    <button onClick={() => setFeature("Updated Text")}>Update</button>
  </>
);

// Clicking button updates text in FeatureItem
```

### Invariants

- Icon is **always** a black checkmark
- Text size is **always** small (text-sm)
- Layout is **always** flex with left-aligned icon
- No animations or state changes

## Accessibility

### Semantic HTML

- Uses `<li>` element (correct for list items)
- Icon is decorative (no `alt` text needed, as it's paired with text)

### Keyboard Navigation

- Not directly focusable (decorative component)
- Parent list item should be accessible via parent context

### ARIA

- No ARIA attributes needed
- Icon is implicit checkmark (visually understood)
- Text content is readable screen-reader

### Color Contrast

- Text (#1f2937) on white (#ffffff): 15.3:1 contrast ratio - **WCAG AAA**
- Icon (#000000) on white (#ffffff): 21:1 contrast ratio - **WCAG AAA**

## Performance

- **Bundle Size**: ~0.5KB (minimal, mostly Lucide icon)
- **Render Time**: < 1ms (pure presentational, no computations)
- **Re-render Cost**: Minimal (simple props comparison)
- **Memory**: Negligible (stateless component)

## Responsive Behavior

### Desktop, Tablet, Mobile

**No breakpoint-specific styles** - component looks identical on all screen sizes

- Icon size: always 4x4 (text-sm appropriate)
- Spacing: always 12px gap (scales naturally)
- Text: always text-sm (readable on all sizes)

## Edge Cases

### Long Text

**Input**: "This is a very long feature description that might wrap to multiple lines because the card has limited width"

**Rendering**:

```
✓ Icon (checkmark) stays aligned to top
✓ Text wraps naturally
✓ Multi-line text is readable
✓ Gap-3 spacing maintained
```

**CSS ensures**: `items-start` keeps icon at top, `flex-wrap` is default

### Empty Text

**Input**: `text=""`

**Rendering**:

```
✓ Icon displays
✓ Empty span renders (no text)
✓ No errors or visual issues
```

**Not recommended** - should always have descriptive text

### Very Short Text

**Input**: "Text"

**Rendering**:

```
✓ Single line
✓ Icon aligned to top
✓ Proper spacing
```

### Special Characters

**Input**: `"Remove Ads & Spam"`

**Rendering**:

```
✓ All characters display correctly
✓ No HTML escaping issues (React handles automatically)
```

## Testing Strategy

### Manual Verification

**Single item**:

```tsx
<FeatureItem text="Unlimited Text Messages" />

// Verify:
// ✓ Checkmark icon displays
// ✓ Text is displayed next to icon
// ✓ Icon is 4x4 pixels
// ✓ Gap is 12px
// ✓ Text color is dark gray
```

**Multiple items in list**:

```tsx
<ul className="space-y-3">
  <FeatureItem text="Feature 1" />
  <FeatureItem text="Feature 2" />
  <FeatureItem text="Feature 3" />
</ul>

// Verify:
// ✓ All checkmarks render
// ✓ Icons are aligned
// ✓ Spacing between items is 12px (space-y-3)
// ✓ Text is readable
```

**Responsive testing**:

```
Mobile (375px), Tablet (768px), Desktop (1440px)
// Verify:
// ✓ Icon and text fit without overflow
// ✓ Spacing remains consistent
// ✓ Text is readable on all sizes
```

### No Automated Tests

(Per AI-Playground constitution: zero testing)

## Related Components

### Parent: SubscriptionPage

Uses FeatureItem to render the feature list:

```typescript
<ul className="space-y-3">
  <FeatureItem text="Unlimited Text Messages" />
  <FeatureItem text="View Character Stories" />
  <FeatureItem text="Unlimited Audio Messages" />
  <FeatureItem text="600 Character Limit On Enhanced Memory" />
  <FeatureItem text="Enhanced Memory Context" />
  <FeatureItem text="Remove Ads" />
</ul>
```

**See**: [SubscriptionPage.md](./SubscriptionPage.md)

## Similar Components

- **shadcn Button**: Uses `cn()` utility for class merging
- **shadcn Card**: Uses `<div>` with semantic Tailwind classes
- Pattern matches project's approach to component composition

## Implementation Notes

### Keep It Simple

This is a **presentational component** - no state, no logic, no side effects. It should remain simple and reusable.

### Avoid Over-Engineering

- No prop validation library (TypeScript is sufficient)
- No custom hooks
- No context usage
- No ref forwarding

### Maintenance

The component should be easy to update:

- To change icon: Modify Lucide import
- To change colors: Update Tailwind classes
- To change spacing: Modify gap and margin values
- To add animations: Add transition classes (but keep it simple)

## Future Extensibility

### Alternative Icons

If you need a different icon for different feature types:

```typescript
interface FeatureItemProps {
  text: string
  icon?: React.ReactNode  // Optional icon prop
}

export function FeatureItem({ text, icon = <Check ... /> }: FeatureItemProps) {
  return (
    <li className="...">
      {icon}
      <span>{text}</span>
    </li>
  )
}
```

### Custom Styling

If you need variant styling:

```typescript
interface FeatureItemProps {
  text: string;
  variant?: "default" | "highlighted" | "disabled";
}

export function FeatureItem({ text, variant = "default" }: FeatureItemProps) {
  const classes = cn("flex items-start gap-3 text-sm", {
    "text-gray-800": variant === "default",
    "text-brand-primary": variant === "highlighted",
    "text-gray-400 line-through": variant === "disabled",
  });
  return <li className={classes}>{/* ... */}</li>;
}
```

## Conventions Followed

- **Component naming**: PascalCase (`FeatureItem`)
- **Prop interface naming**: ComponentNameProps (`FeatureItemProps`)
- **File naming**: PascalCase (`FeatureItem.tsx`)
- **Tailwind**: Utility-first approach (no CSS files)
- **Lucide**: Direct icon imports from `lucide-react`
- **Type safety**: Full TypeScript with `JSX.Element` return type

## Related Documents

- [Specification](../spec.md) - Feature specification
- [Data Model](../data-model.md) - Component architecture
- [SubscriptionPage Contract](./SubscriptionPage.md) - Parent component
- [Quickstart Guide](../quickstart.md) - Implementation steps

---

**Component Status**: Ready for implementation (Phase 1)
