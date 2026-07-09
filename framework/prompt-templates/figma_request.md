# Figma Request Template

## Purpose

This template structures a request to convert a Figma design file, mockup, screenshot, or wireframe into production-ready frontend code. It ensures the Figma Implementer Agent receives all required design context and technical constraints before extracting design tokens and producing an implementation.

---

## When to Use

**Use when:**
- A Figma file, exported design assets, or UI mockups are the primary source for a new implementation.
- Converting a specific set of design views or components to code.
- The visual design is the driving input, and business requirements are secondary or already understood.

**Do NOT use when:**
- No design asset exists — use `feature_request.md` to define the feature first.
- The implementation already exists and you need to validate it against the design — use `review_request.md`.
- The request is a new feature with no design reference — use `feature_request.md`.
- You are reporting a visual bug in an existing implementation — use `bug_fix_request.md`.

---

## Required Information

The following fields are mandatory. The AI will halt and request clarification if any are missing.

- **Design Source** — Figma link, exported asset files, or screenshot images.
- **Target Views or Pages** — Which specific views, pages, or components should be implemented.
- **Technology Stack** — The framework, styling methodology, and component model for this project.
- **Breakpoints** — The responsive breakpoints the implementation must support.

---

## Optional Information

Providing the following improves fidelity and reduces review cycles.

- **Existing Component Reference** — Names or paths of existing components to reuse (to avoid duplication).
- **Design Tokens Reference** — Existing CSS variables, Tailwind config, or theme tokens to map extracted values to.
- **Special Interactions or Animations** — Hover states, transitions, entrance animations, and other micro-interactions.
- **Priority Views** — If multiple views are provided, specify which should be implemented first.
- **Known Deviations** — Any intentional differences between the design and the implementation (e.g., "the animation from the design is out of scope for this sprint").
- **API or Data Requirements** — If the component needs real data rather than static content.

---

## Input Template

```
Design Source:
[Figma link / exported asset file names / screenshot images]

Target Views or Pages:
[List the specific views, pages, or components to be implemented]
Example:
- Homepage Hero Section
- Pricing Cards
- Mobile Navigation Menu

Technology Stack:
[Framework, styling methodology, state management approach]

Breakpoints:
[List all required breakpoints]
Example:
- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px

Existing Components to Reuse:
[Component names or file paths / None known]

Design Tokens Reference:
[CSS variable file path / Tailwind config path / None — will be extracted from design]

Special Interactions or Animations:
[Hover states, transitions, entrance animations, etc. / None]

Priority Views (if multiple):
[Which view should be implemented first, second, etc.]

Known Deviations from Design:
[List any intentional differences / None]

Additional Context:
[Any other relevant information]
```

---

## AI Instructions

When processing this template, the AI Orchestrator must:

1. **Verify the design source is accessible.** If the Figma link is inaccessible or no assets were provided, halt immediately and request valid design assets.

2. **Run the Figma pipeline.** This template triggers: `figma_to_code.md` → Design Specification Document generation → `implement_section.md` → `responsive.md` → `accessibility.md` → `design_review.md`.

3. **Extract before implementing.** The Figma Implementer Agent must complete the full Design Specification Document (all tokens, layouts, states, breakpoints) before any code is written.

4. **Respect the existing component library.** Check the Application Analysis Report for reusable components before creating new ones.

5. **Map extracted tokens to the existing token system.** Do not introduce new CSS variables or theme tokens without flagging them for the Solution Architect.

6. **Technology agnosticism.** Implement using the specified technology stack — adapt markup, styling, and component model accordingly.

7. **Do not invent interaction states.** If a hover or focus state is not defined in the design, flag it — do not invent it.

8. **Implement responsive behavior.** Every defined breakpoint must be implemented. Missing mobile behavior is a Critical failure.

---

## Validation Checklist

Before routing this request to the pipeline, verify:
- [ ] Design source is provided and accessible.
- [ ] Target views or pages are explicitly listed.
- [ ] Technology stack is defined.
- [ ] Breakpoints are defined (or confirmed as project defaults).
- [ ] The request is for a new implementation — not a validation of an existing one.

If the design source is inaccessible: halt and request a valid link or exported assets before proceeding.

---

## Expected Output

Processing this template through the pipeline produces:
1. **Design Specification Document** — All tokens, layouts, typography, spacing, interaction states per view and breakpoint.
2. **Implementation** — Pixel-perfect markup and styles using the selected technology stack.
3. **QA Reports** — Responsive and Accessibility validation.
4. **UI Review Report** — Design-to-implementation pixel accuracy verification.
5. **Code Review Report** — PR Auditor architecture and quality audit.
6. **Deployment Readiness Report** — Final release authorization.

---

## Constraints

- NEVER begin implementation before the Design Specification Document is complete.
- NEVER invent design values not present in the source.
- NEVER skip a defined breakpoint.
- NEVER ignore the existing component library — check for reuse before creating new components.
- NEVER introduce new design tokens without flagging them for the Solution Architect.
- NEVER make UX or product decisions — implement the design as specified, flag gaps.

---

## Best Practices

- Provide the Figma link with view access enabled — inaccessible files cause pipeline halts.
- List all target views explicitly — do not assume "all views in the file."
- If the design has multiple component states (empty, loading, error), mention them — they are commonly missed.
- Specify existing design token file paths to ensure token mapping is accurate.
- If you know certain interaction states are out of scope, declare them under "Known Deviations" to prevent unnecessary escalation.

---

## Example Request

```
Design Source:
https://figma.com/example-dashboard-redesign

Target Views or Pages:
- Analytics Dashboard — Main Overview Card
- Analytics Dashboard — Data Table Component
- Analytics Dashboard — Filter Sidebar (desktop and mobile collapsed states)

Technology Stack:
Vue 3 with Composition API, Tailwind CSS, Pinia for state management.

Breakpoints:
- Mobile: 375px
- Tablet: 768px
- Laptop: 1024px
- Desktop: 1440px

Existing Components to Reuse:
BaseButton (src/components/BaseButton.vue), DataTable (src/components/DataTable.vue)

Design Tokens Reference:
tailwind.config.js — existing color and spacing tokens defined there.

Special Interactions or Animations:
- Cards have a 200ms ease-in-out box-shadow transition on hover.
- Filter sidebar slides in from the left on mobile (300ms ease).

Priority Views:
1. Analytics Dashboard — Main Overview Card
2. Filter Sidebar
3. Data Table Component

Known Deviations from Design:
- The shimmer loading animation shown in the design is out of scope for this sprint.

Additional Context:
The dashboard uses a 12-column grid system. The existing grid utility is defined in src/styles/grid.css.
```

---

## Success Criteria

The Orchestrator considers this template successfully processed when:
- The design source was accessible and the Design Specification Document was produced.
- All target views are implemented at all defined breakpoints.
- No design values were invented — all are extracted from the source.
- The UI Review Report returns APPROVED — implementation matches the design.
- Responsive, Accessibility, and Code Review reports all return APPROVED.
