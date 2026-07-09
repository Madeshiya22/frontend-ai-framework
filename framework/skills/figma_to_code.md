# Skill: Figma to Code

## Purpose

This skill converts a provided design source — Figma file, mockup image, screenshot, or wireframe — into a structured set of implementation-ready design specifications and, when assigned, into actual frontend code. It exists to eliminate the translation gap between design intent and code output, ensuring the implemented UI is pixel-accurate and visually consistent with the approved design.

---

## Primary Objective

Extract every visual specification from the provided design source and produce either a Design Specification Document (for handoff to the Frontend Developer) or pixel-perfect implementation code — depending on the Orchestrator's assignment — with zero design assumptions or invented values.

---

## When to Use

**Use when:**
- A Figma file, mockup, screenshot, or wireframe has been provided as part of the feature request.
- The Frontend Developer needs an exact design specification before implementing.
- The Orchestrator has assigned design-to-code implementation directly to the Figma Implementer.

**Do NOT use when:**
- No design asset has been provided (route to Frontend Developer using PRD and Design System only).
- The implementation is already complete — this skill is a pre-implementation step.
- The request is a bug fix with no design changes.

---

## Prerequisites

- A design source: Figma link, exported design assets, mockup images, or screenshots (required).
- Approved Tech Spec (for component names, file paths, and breakpoint reference).
- Project Design System and token definitions (`../overview/DESIGN_SYSTEM.md`).
- Project Research Report (for existing token naming conventions).

---

## Inputs

- Design source: Figma link, image files, or screenshots (required).
- Approved Tech Spec (required — for component and breakpoint mapping).
- Project design tokens and CSS variable reference (required).
- Component library reference (optional — to identify existing components to map to).

---

## Expected Outputs

A **Design Specification Document** containing:
1. Design Token Inventory (all extracted tokens with names matching the project's variable naming)
2. Layout Specification per Section/Component (container width, grid columns, gap values, alignment)
3. Typography Specification (font family, size, weight, line height, letter spacing per text element)
4. Color Specification (background, text, border, and icon colors mapped to token names)
5. Spacing Specification (margin, padding, and gap values per component)
6. Border and Shadow Specification (border width, radius, shadow values)
7. Responsive Behavior (how each component adapts at Mobile, Tablet, Laptop, Desktop)
8. Interaction States (hover, focus, active, disabled — visual specification for each)
9. Animation and Transition Specification (timing, easing, triggered by)
10. Component Map (design component → code component name and file path)
11. Implementation Notes (edge cases, special behaviors, missing states)

**And/or:** Pixel-perfect markup and styles (if code implementation was assigned by the Orchestrator).

---

## Execution Process

1. **Receive and open the design source.** Access the Figma file or inspect the provided design assets.

2. **Analyze the full design scope.** Review all pages, views, and states included in the design before extracting any values. Understand the complete picture first.

3. **Extract the color palette.** Document every color used in the design. Map each to the project's existing CSS variable or token name. Flag any colors not present in the existing token system.

4. **Extract typography.** For every text element in the design, document: font family, size (in `rem` or `px`), font weight, line height, and letter spacing. Map to existing typography tokens where possible.

5. **Extract spacing values.** Document all margin, padding, and gap values. Align to the project's spacing scale (e.g., multiples of 4px, 8px, etc.).

6. **Extract border and shadow values.** Document border widths, border radii, and box shadow specifications.

7. **Analyze layout structure.** For each section and component: document the layout approach (grid vs. flexbox), container max-width, column structure, and alignment rules.

8. **Document responsive behavior.** For each defined breakpoint, describe how the layout, font sizes, spacing, and component structure adapt.

9. **Document interaction states.** For every interactive element (buttons, links, inputs, cards): document the visual specification for hover, focus, active, and disabled states.

10. **Document animations and transitions.** For any animated element: document the property being animated, duration, easing function, and trigger event.

11. **Create the component map.** For each design component, identify its counterpart in the codebase (from the Application Analysis Report). If no counterpart exists, name the new component following project naming conventions and note it as "new."

12. **Write implementation notes.** Document any edge cases, truncation behaviors, overflow handling, empty states, or special behaviors visible in the design.

13. **Self-review.** Verify completeness against the Validation Checklist.

14. **If code was assigned:** Implement markup and styles using the selected technology stack with zero deviation from the extracted specification.

15. **Submit.** Deliver the Design Specification Document (and code if assigned) to the Orchestrator.

---

## Validation Checklist

Before submitting, verify:
- [ ] All colors are documented with token names or hex values.
- [ ] All typography values are documented per element.
- [ ] Spacing values are documented and aligned to the project's scale.
- [ ] Layout structure is documented for every section.
- [ ] Responsive behavior is documented for every defined breakpoint.
- [ ] All interaction states are documented for every interactive element.
- [ ] Component map is complete — every design component has a code counterpart.
- [ ] No values were invented — every value was extracted from the design source.
- [ ] Implementation notes cover all edge cases visible in the design.

---

## Error Handling

- **Figma link inaccessible:** Halt. Return: "Design file inaccessible. Please provide a valid Figma link or exported assets."
- **Missing breakpoint view in design:** Flag: "Mobile/Tablet view not provided in design." Do not invent — request from user or flag as "Responsive behavior TBD."
- **Color not in project token system:** Document the raw hex value. Flag it as a new token for the Solution Architect to add to the Design System.
- **Low-resolution mockup:** Note limitation. Extract what is possible. Flag uncertain values as approximate.
- **Design conflicts with PRD:** Document the conflict explicitly. Escalate to Product Manager and Solution Architect. Do not resolve unilaterally.
- **Missing interaction states in design:** Document as "State not specified in design." Do not invent. Flag for UI Reviewer awareness.

---

## Quality Standards

- Every token value must be exact — no approximations unless flagged.
- The component map must be complete — every design component must have a named code counterpart.
- The specification must be usable by a developer with zero additional design tool access.
- Responsive specifications must cover all defined breakpoints without exception.

---

## Constraints

- NEVER invent design values not present in the source.
- NEVER skip any defined breakpoint.
- NEVER document generic values — all values must be specific and extractable from the design.
- NEVER make product or UX decisions — extract what is there, flag what is missing.
- NEVER override the project's existing token naming conventions.

---

## Best Practices

- Extract tokens before layout — tokens are the foundation of everything else.
- Use the project's CSS variable naming convention when naming extracted tokens.
- Always check interaction states — they are the most commonly missed part of a design handoff.
- Document spacing in the same unit system used by the project (px, rem, Tailwind scale).
- A "component not found in codebase" note in the Component Map is a flag for the Solution Architect — include it every time.

---

## Handoff

Output is delivered to the **Orchestrator**, which passes the Design Specification Document to the **Frontend Developer** (for `implement_section.md`) and the **UI Reviewer** (as the reference standard for `design_review.md`).

---

## Success Criteria

The Orchestrator considers this skill successfully executed when:
- A complete Design Specification Document is delivered with all token, layout, typography, and responsive details.
- Every design component is mapped to a code component.
- No values were invented — all are extracted from the source design.
- The Frontend Developer can implement the UI without accessing the original design file.
