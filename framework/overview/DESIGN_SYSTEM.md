# Design System

## Purpose

The Design System document defines the visual standards, component consistency rules, and token governance that all agents must follow when implementing UI for any project using this framework. It ensures that every component, page, and feature — regardless of who or what implements it — is visually consistent, accessible, and maintainable.

The Design System is not an aesthetic preference document. It is an engineering standard. Deviating from it produces visual inconsistency, increases maintenance cost, and creates design debt that compounds over time.

---

## Objectives

- Establish design tokens as the authoritative source for all visual values.
- Prevent visual inconsistency caused by hardcoded or duplicated style values.
- Ensure all UI components are reusable, accessible, and responsive by default.
- Provide a shared visual language that every agent — Frontend Developer, Figma Implementer, UI Reviewer — operates from.
- Define the quality standard the UI Reviewer Agent uses to evaluate implementations.

---

## Scope

**In Scope:**
- Design token definitions (colors, typography, spacing, borders, shadows, breakpoints).
- Component usage rules (reuse before creation).
- Layout system standards (containers, grids, flexbox patterns).
- Responsive design requirements.
- Accessibility standards at the visual layer.
- Animation and transition guidelines.

**Out of Scope:**
- Business logic — this is a visual standard document.
- Application routing — defined in the architecture.
- API integration — outside the design system scope.
- Framework-specific implementation syntax — the Design System is technology-agnostic.

---

## Core Principles

- **Token-first.** Every visual value — color, spacing, font size, border radius, shadow — must reference a named design token. Hardcoded values are a defect.
- **Reuse before creation.** Before any new component is built, the existing component library must be checked. Duplication is always more expensive than reuse.
- **Consistency is non-negotiable.** The same UI element must look and behave identically everywhere it appears in the application.
- **Accessibility is visual too.** Color contrast, focus state visibility, and touch target size are visual design decisions — not just code decisions.
- **Mobile-first by default.** All visual designs adapt from the smallest breakpoint upward — not the reverse.

---

## Architecture Context

The Design System operates at the intersection of design and implementation. It is referenced by:

| Agent | How They Use It |
|-------|----------------|
| Figma Implementer | Extracts and maps design tokens from design files to existing token names |
| Frontend Developer | Applies token names during implementation — never raw values |
| UI Reviewer | Uses token definitions and component standards to evaluate implementation accuracy |
| Solution Architect | References the Design System when designing component hierarchies in the Tech Spec |

---

## Responsibilities

This document is responsible for:
- Defining the design token categories that must be documented for every project.
- Establishing the rule that tokens — not raw values — are the implementation currency.
- Defining component reuse policy.
- Documenting responsive breakpoints and accessibility standards.
- Providing the UI Reviewer with the visual quality standard to evaluate against.

---

## Inputs

This document is populated at the start of a project (for new projects) or extracted from the existing system (for existing projects using the `project_research.md` skill).

Required token categories to populate:
- Color palette (brand, semantic, neutral, state colors)
- Typography (font families, size scale, weight scale, line heights)
- Spacing scale (margin, padding, gap values)
- Border radius scale
- Shadow definitions
- Breakpoints (Mobile, Tablet, Laptop, Desktop widths)

---

## Design Tokens

Design tokens are the atomic visual values of the Design System. They are defined once and referenced everywhere.

### Color Tokens
Define semantic color roles, not just raw hex values:
- `--color-primary` — Main brand color
- `--color-secondary` — Supporting brand color
- `--color-background` — Page/section background
- `--color-surface` — Card, modal, and container surfaces
- `--color-text-primary` — Primary body text
- `--color-text-secondary` — Supporting/muted text
- `--color-border` — Default border color
- `--color-error`, `--color-success`, `--color-warning`, `--color-info` — Semantic state colors

### Typography Tokens
- `--font-family-primary` — Main typeface
- `--font-family-mono` — Code/monospace typeface (if applicable)
- `--font-size-xs` through `--font-size-4xl` — Type scale
- `--font-weight-regular`, `--font-weight-medium`, `--font-weight-bold`
- `--line-height-tight`, `--line-height-base`, `--line-height-relaxed`

### Spacing Tokens
Use a consistent base scale (e.g., multiples of 4px or 8px):
- `--space-1` through `--space-16` (or equivalent scale)

### Border & Shadow Tokens
- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`

### Breakpoints
- `--breakpoint-mobile`: target breakpoint value
- `--breakpoint-tablet`: target breakpoint value
- `--breakpoint-laptop`: target breakpoint value
- `--breakpoint-desktop`: target breakpoint value

---

## UI Components

### Reuse Policy
Before implementing any UI element, check the existing component library. A component already exists if:
- It appears in the component inventory (from Application Analysis).
- It is documented in the project's component catalog or Storybook (if applicable).

**Never duplicate a component. Extend it if needed — do not recreate it.**

### Core Component Categories
Every project should have (or plan to implement) components in these categories:
- **Navigation:** Navbar, Sidebar, Breadcrumbs, Tabs
- **Actions:** Button (primary, secondary, ghost, destructive), Icon Button, Link
- **Inputs:** Text Input, Textarea, Select, Checkbox, Radio, Toggle, Date Picker
- **Feedback:** Alert, Toast/Notification, Badge, Progress, Skeleton Loader
- **Containers:** Card, Modal/Dialog, Drawer, Accordion, Tooltip, Popover
- **Layout:** Container, Section, Grid, Stack, Divider
- **Display:** Avatar, Tag, Table, Empty State, Error State

---

## Layout System

Follow a consistent layout architecture across all views:
- **Containers:** Define max-width and horizontal padding centrally.
- **Grid Systems:** Use the defined column count and gap values from the design tokens.
- **Flexbox Patterns:** Document alignment and gap conventions for common flex containers.
- **Section Spacing:** Use spacing tokens for vertical rhythm between sections — never arbitrary values.
- **Visual Hierarchy:** Larger elements signal importance — maintain size relationships from the design.

---

## Responsive Design

Every implementation must be responsive by default across all defined breakpoints:
- **Mobile-first:** Begin implementation at the smallest breakpoint. Scale up.
- **No hardcoded widths:** Use percentage, `max-width`, or responsive utility classes.
- **Fluid typography:** Font sizes should adapt across breakpoints using the defined type scale.
- **Breakpoint consistency:** All agents use the same breakpoint values — defined in the token system.

---

## Accessibility Standards

Visual accessibility is a Design System responsibility:

- **Color Contrast:** Body text must meet WCAG AA (4.5:1 minimum). Large text: 3:1 minimum. UI components: 3:1 minimum.
- **Focus States:** Every interactive element must have a clearly visible focus indicator. `outline: none` is forbidden without a custom replacement.
- **Touch Targets:** Minimum 44×44px for all interactive elements on touch devices.
- **Text Resize:** Layouts must not break when text is scaled to 200%.

---

## Animation and Transition Guidelines

- Use consistent transition durations from the token system (e.g., `--transition-fast: 150ms`, `--transition-base: 250ms`, `--transition-slow: 350ms`).
- Use `ease-in-out` easing by default unless the design specifies otherwise.
- Respect `prefers-reduced-motion` — wrap non-essential animations in a media query check.

---

## Dependencies

- `overview/PROJECT_OVERVIEW.md` — provides the technology stack that determines the token implementation format (CSS variables, Tailwind config, JS theme object, etc.).
- `skills/project_research.md` — extracts the actual token values from the existing project.
- `skills/figma_to_code.md` — maps design file values to the token system.
- `skills/design_review.md` — validates implementations against the Design System.

---

## Constraints

- NEVER hardcode a color, spacing, font size, or shadow value — always use the token.
- NEVER create a new component when an existing one can be extended.
- NEVER define breakpoints inconsistently across files — they come from the token system.
- NEVER implement `outline: none` on any interactive element without a visible replacement focus style.
- NEVER introduce a visual pattern that is not part of the Design System without Solution Architect approval.

---

## Common Mistakes

- **Hardcoding hex values instead of using token variables.** The most frequent and most damaging consistency violation.
- **Creating a new Button component because the existing one "doesn't quite work."** Extend the existing component. Creating a second one creates permanent divergence.
- **Skipping mobile design.** "I'll handle mobile later" always results in a broken mobile implementation. Mobile-first means mobile is first.
- **Inconsistent spacing.** Using `margin: 13px` instead of `var(--space-3)` or `padding: 24px` directly instead of the token creates unmaintainable styles.
- **Ignoring color contrast for non-body text.** Placeholder text, labels, helper text, and disabled states frequently fail contrast checks.

---

## Success Criteria

The Design System is correctly applied when:
- All visual values in the implementation reference design tokens — no hardcoded values.
- No duplicate components exist — every component type is implemented once and reused.
- All components are responsive at all defined breakpoints.
- WCAG AA color contrast passes for all text and interactive elements.
- Every interactive element has a visible focus state.
- The UI Reviewer can approve the implementation based on pixel-accurate token compliance.
