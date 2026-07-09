# Enterprise Frontend AI Design Guidelines

## Philosophy
This document establishes the overarching aesthetic philosophy and visual baselines for the Enterprise Frontend AI Framework. 

## The UI/UX Designer Role
The `UI/UX Designer` is the sole authority on visual decision-making. Frontend Developers must never guess or invent styles. The output of the UI/UX Designer (the `DESIGN_SPEC.md`) is absolute and must be followed pixel-for-pixel.

## Enterprise Aesthetic Standards
All designs produced by the UI/UX Designer must adhere to the following enterprise baselines unless explicitly overridden by the Product Manager:

1. **Modern Premium Aesthetic:**
   - interfaces must feel polished, lightweight, and fast.
   - Heavy use of whitespace to reduce cognitive load.
   - High signal-to-noise ratio (avoid unnecessary borders or heavy backgrounds).

2. **Typography-First:**
   - Use high-legibility sans-serif fonts (e.g., Inter, Roboto, SF Pro) for UI.
   - Use strict typographic scales. Do not arbitrarily size text.

3. **Subtle Elevation & Depth:**
   - Use soft, diffused drop shadows to indicate elevation.
   - Avoid harsh, opaque shadows.

4. **Meaningful Motion:**
   - Animations should be subtle and serve a purpose (e.g., indicating state change or guiding the eye).
   - Use spring-based physics for interaction (e.g., hover scaling) over linear transitions.
   - Max duration for UI transitions: 300ms.

5. **Accessibility as a Baseline:**
   - Minimum WCAG AA compliance for all text contrast (4.5:1 for normal text).
   - Interactive elements must have a defined `:focus-visible` state (e.g., a 2px offset ring).
   - Minimum touch target size on mobile: 44x44px.

## Design tokens
Design Specs must produce tokens that the Developer can easily map to CSS variables or Tailwind configuration:
- `primary`, `secondary`, `surface`, `background`, `text-primary`, `text-secondary`, `border`.

## Dark Mode Strategy
By default, enterprise applications should plan for Dark Mode. The Design Spec must specify color inversions for surface and background layers.
