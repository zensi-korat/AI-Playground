<!--
Sync Impact Report:
Version: 1.0.0 (initial ratification)
Modified Principles: N/A (initial creation)
Added Sections: All principles and governance structure
Removed Sections: None
Templates Status:
  ✅ plan-template.md - reviewed, testing references noted as optional
  ✅ spec-template.md - reviewed, aligns with constitution
  ✅ tasks-template.md - reviewed, testing references noted as optional
  ⚠ All prompt files in .github/prompts/ - reviewed, no agent-specific references
Follow-up TODOs: None
-->

# AI-Playground Constitution

## Core Principles

### I. Clean Code (NON-NEGOTIABLE)

Code MUST be readable, maintainable, and self-documenting:

- Use clear, descriptive names for variables, functions, and components
- Keep functions small and focused on a single responsibility
- Avoid code duplication (DRY principle)
- Use consistent formatting and follow established conventions
- Comment only when necessary to explain "why", not "what"
- Refactor complex logic into smaller, composable units

**Rationale**: Clean code reduces cognitive load, accelerates onboarding, and minimizes bugs. In a no-testing environment, code clarity is the primary defense against defects.

### II. Simple UX (NON-NEGOTIABLE)

User interface MUST prioritize simplicity and intuitive interaction:

- Design for the common case; advanced features should not complicate basic flows
- Minimize clicks and cognitive effort to complete tasks
- Provide clear, immediate feedback for all user actions
- Use familiar patterns and conventions from established design systems
- Avoid unnecessary features (YAGNI - You Aren't Gonna Need It)
- Every UI element must have a clear purpose

**Rationale**: Simple UX reduces user errors, improves adoption, and decreases support burden. Complexity is a liability.

### III. Responsive Design (NON-NEGOTIABLE)

All interfaces MUST work seamlessly across device sizes:

- Mobile-first approach using Tailwind's responsive utilities
- Test layouts at mobile (375px), tablet (768px), and desktop (1440px) breakpoints
- Touch targets must be adequately sized (minimum 44x44px)
- Content must be readable without horizontal scrolling
- Images and media must scale appropriately
- Navigation must adapt to screen size (e.g., hamburger menu on mobile)

**Rationale**: Users access applications from diverse devices. Responsive design ensures consistent experience and maximizes reach.

### IV. Minimal Dependencies (NON-NEGOTIABLE)

Dependency management MUST favor lean, stable, well-maintained packages:

- Evaluate necessity before adding any dependency
- Prefer native solutions or simple implementations over heavyweight libraries
- Dependencies must be actively maintained (commits within last 6 months)
- Avoid packages with deep dependency trees or known security issues
- Document reason for each non-obvious dependency in package.json comments
- Regular audit of unused dependencies (quarterly review)

**Rationale**: Each dependency is a potential security risk, maintenance burden, and bundle size increase. Minimal dependencies = faster builds, smaller bundles, fewer breaking changes.

## Technology Stack

The project MUST use the following technology stack as defined in `package.json`:

- **Framework**: React 19.2.0 with React DOM 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18 with Tailwind Vite plugin
- **Routing**: React Router DOM 7.11.0
- **UI Components**: Radix UI primitives, Lucide React icons
- **Language**: TypeScript 5.9.3
- **Linting**: ESLint 9.39.1 with TypeScript and React plugins

Version changes require constitution amendment and migration plan.

## Testing Policy (NON-NEGOTIABLE)

This project operates with **ZERO TESTING**:

- NO unit tests
- NO integration tests
- NO end-to-end tests
- NO test frameworks or testing libraries
- NO coverage tools

**This policy supersedes all other guidance, templates, and documentation that reference testing.**

All quality assurance is achieved through:

1. Manual verification during development
2. Code review focusing on clarity and correctness
3. Adherence to Clean Code principles
4. Incremental, observable changes

**Rationale**: This is an experimental/prototype project prioritizing rapid iteration over formal quality gates.

## Development Workflow

### Code Organization

- Components in `src/components/` (reusable) and `src/pages/` (routes)
- Utilities in `src/utils/` for shared helper functions
- Design tokens in `src/all-variables.json` synced via `src/scripts/sync-tokens.js`
- Global styles in `src/index.css` with CSS variables from Figma

### Change Process

1. Make small, incremental changes focused on single concerns
2. Verify changes manually in browser (dev server must run successfully)
3. Ensure responsive behavior across breakpoints
4. Review code for clarity and adherence to principles
5. Commit with clear, descriptive messages

### Figma Sync Workflow

When design tokens change:

1. Export updated `all-variables.json` from Figma
2. Run `node src/scripts/sync-tokens.js` to regenerate CSS variables
3. Verify visual consistency across components

## Governance

This constitution is the highest authority for development decisions in AI-Playground:

- All feature implementations MUST comply with core principles
- Complexity must be justified against constitution principles
- Templates and prompts in `.specify/` and `.github/prompts/` are advisory; when in conflict, constitution prevails
- Amendments require explicit documentation in this file

### Amendment Process

1. Propose change with clear rationale
2. Update this document with new version number following semantic versioning:
   - **MAJOR**: Principle removal/redefinition or backward-incompatible changes
   - **MINOR**: New principle or materially expanded guidance
   - **PATCH**: Clarifications, wording improvements, non-semantic refinements
3. Update `LAST_AMENDED_DATE` and document changes in Sync Impact Report
4. Review and update affected templates/documentation
5. Commit with message: `docs: amend constitution to vX.Y.Z (summary)`

### Compliance

- All code changes must align with constitutional principles
- PR reviews must verify: clean code, simple UX, responsive design, minimal dependencies
- No testing-related tasks or infrastructure may be introduced

**Version**: 1.0.0 | **Ratified**: 2026-01-05 | **Last Amended**: 2026-01-05
