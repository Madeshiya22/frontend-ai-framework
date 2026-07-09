# Skill: Create Design Specification

## Purpose
This skill produces the Design Specification (`DESIGN_SPEC.md`), the single source of truth for the visual presentation of the product. It bridges the gap between Technical Specification (how it works) and Implementation (code) by defining exactly *how it looks*.

## Primary Objective
Generate a comprehensive, unambiguous `DESIGN_SPEC.md` document that the Frontend Developer can implement blindly without making any subjective visual decisions.

## When to Use
**Use when:**
- Triggered by the Orchestrator in Phase 3 of the frontend workflow.
- A new feature or component requires visual definition prior to implementation.

## Prerequisites
- Approved Product Requirement Document (PRD).
- Approved Technical Specification.

## Expected Output Structure (`DESIGN_SPEC.md`)
The output must strictly follow this structure and explicitly define all 18 requirements:

1. **Visual Design Language** (Modern, Minimal, Luxury, Corporate, etc., with overall personality/mood).
2. **Color System** (Hex codes for Primary, Secondary, Accent, Surface, Background, Text hierarchy).
3. **Typography System** (Font family, weights, heading scale, body scale, line heights, letter spacing).
4. **Spacing System** (Container widths, section spacing, component spacing, grid spacing in rem/px).
5. **Border Radius System** (Specific values for small, medium, large, full).
6. **Shadow System** (Specific CSS box-shadow values for different elevations).
7. **Component Standards** (Detailed styling for Buttons, Cards, Inputs, Navigation, Footer, Modals, Badges).
8. **Iconography Standards** (Icon library preference, stroke widths, default sizes).
9. **Image Strategy** (Aspect ratios, object-fit rules, overlay opacities).
10. **Section-by-Section Visual Guidelines** (Specific styling for every section defined in the Tech Spec, e.g., Hero, Testimonials).
11. **Mobile UX Guidelines** (Touch targets, bottom navigation rules, hidden elements).
12. **Empty / Loading / Error State Design** (Skeletons, empty illustrations, error colors).
13. **Motion Guidelines** (Planning only: Easing curves, durations for hover states, scroll reveals).
14. **Accessibility Visual Requirements** (WCAG AA contrast ratios checked, explicit focus ring styles).
15. **Responsive Design Rules** (Specific breakpoint behaviors, e.g., stacking order, font scaling).
16. **Design Consistency Rules** (Rules to ensure new elements match existing ones).
17. **Inspiration Sources** (e.g., Airbnb, Stripe, Linear).
18. **Definition of Visual Done** (Checklist for the UI Reviewer to validate against).

## Constraints
- **NEVER** write source code. Use CSS property-value pairs (e.g., `margin-top: 24px`) only as descriptive labels.
- **NEVER** leave a design decision to the developer (e.g., avoid "use a nice blue").
- **NEVER** contradict the Technical Specification`s functional requirements.
