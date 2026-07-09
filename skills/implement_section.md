# Skill: Implement Section

## Purpose

This skill is the primary code execution skill in the framework. It translates an approved Technical Specification into production-ready frontend code — creating or modifying only the files explicitly defined in the Tech Spec. It is the only skill authorized to write implementation code for new features and sections.

---

## Primary Objective

Produce clean, modular, accessible, and responsive implementation code that precisely satisfies every requirement in the approved Technical Specification, integrates seamlessly into the existing project, and introduces zero regressions to existing functionality.

---

## When to Use

**Use when:**
- A Technical Specification has been approved.
- A new component, section, page, or feature needs to be implemented.
- An existing component needs to be modified as defined in the Tech Spec.

**Do NOT use when:**
- The Tech Spec has not been approved — wait for approval.
- The task is a visual bug fix with no spec — use `design_review.md` process instead.
- The task is a code refactor — route to refactor request template.
- The task is a Figma-to-code conversion — run `figma_to_code.md` first to produce the Design Specification, then return here.

---

## Prerequisites

- Approved Technical Specification (from `create_tech_spec.md`).
- Application Analysis Report (to know which existing components to reuse).
- Project Research Report (to apply correct styling patterns and token names).
- Design Specification Document (from `figma_to_code.md`, if design was provided).
- Design System guidelines (`overview/DESIGN_SYSTEM.md`).
- Access to the project's source code.

---

## Inputs

- Approved Technical Specification (required).
- Application Analysis Report (required — reuse decisions depend on it).
- Project Research Report (required — styling consistency depends on it).
- Design Specification Document (required if a design was provided; optional otherwise).
- Design System guidelines (required).

---

## Expected Outputs

- **New source files** as listed under "Files to Create" in the Tech Spec (components, pages, utilities, styles).
- **Modified source files** with precise, targeted edits as listed under "Files to Modify" in the Tech Spec.
- **Implementation Summary** documenting:
  - Files created (with paths).
  - Files modified (with paths and description of changes).
  - Existing components reused (with paths).
  - Design tokens applied (with names).
  - Any deviations from the Tech Spec (with justification — must be flagged, never silent).

---

## Execution Process

1. **Read the Tech Spec in full before writing a single line of code.** Understand the component hierarchy, implementation order, files to create, files to modify, and design token requirements.

2. **Read the Application Analysis and Project Research Reports.** Identify which components, utilities, and styles already exist and can be reused. Build a mental model of the codebase.

3. **Review the Design Specification (if available).** Understand the exact visual values (spacing, colors, typography) before implementing styles.

4. **Follow the Tech Spec's defined implementation order.** Begin with the lowest-level dependencies (utilities, hooks, shared components) and build up to page-level integration.

5. **For each file to create:**
   - Scaffold the file at the exact path defined in the Tech Spec.
   - Write the component or module following the project's established structure and naming conventions.
   - Apply design tokens — never hardcode color, spacing, or typography values.
   - Write semantic, accessible markup appropriate to the selected technology stack.
   - Implement responsive behavior for all defined breakpoints.
   - Add accessibility attributes: ARIA roles, labels, `alt` text, focus states, and keyboard navigation support for all interactive elements.

6. **For each file to modify:**
   - Make only the specific, targeted changes described in the Tech Spec.
   - Do not refactor, reformat, or otherwise alter code outside the defined scope of change.

7. **Apply state management.** Implement local or global state as defined in the Tech Spec. Use the project's established state pattern — do not introduce a new one.

8. **Implement API integration points.** If the Tech Spec defines data fetching or mutations, implement them using the project's established data-fetching pattern.

9. **Verify reuse.** Before creating any new utility, confirm it does not already exist in the Application Analysis Report.

10. **Self-review.** Run through the Validation Checklist before producing the Implementation Summary.

11. **Produce the Implementation Summary.** Document every file created, every file modified, every component reused, and every deviation from the Tech Spec.

12. **Submit.** Deliver the implementation output and Implementation Summary to the Orchestrator.

---

## Validation Checklist

Before submitting the implementation, self-verify:
- [ ] Every component in the Tech Spec's "Files to Create" list is implemented.
- [ ] Every file in the "Files to Modify" list has been precisely updated.
- [ ] No files outside the Tech Spec scope were created or modified.
- [ ] All design tokens are used — no hardcoded color, spacing, or typography values.
- [ ] All interactive elements have ARIA attributes, focus states, and keyboard navigation.
- [ ] Layout is responsive at all breakpoints defined in the Tech Spec.
- [ ] Existing components were reused wherever applicable — no duplication introduced.
- [ ] State management follows the project's established pattern.
- [ ] Implementation Summary is complete and accurate.
- [ ] All Tech Spec deviations are documented in the Implementation Summary with justification.

---

## Error Handling

- **Tech Spec is ambiguous on a specific detail:** Stop. Flag the ambiguity. Request clarification from the Solution Architect via the Orchestrator. Do not make assumptions.
- **Required component not found in codebase:** Verify with Application Analysis Report. If genuinely missing, flag it and create the component as a new file following project conventions.
- **Design token not defined in Design System:** Use the most semantically appropriate existing token. Flag the gap in the Implementation Summary for the UI Reviewer.
- **File to modify contains conflicting existing code:** Do not overwrite. Document the conflict in the Implementation Summary. Escalate to the Solution Architect.
- **Required dependency missing from project:** Do not install autonomously. Halt and escalate to the Solution Architect.
- **Tech Spec implementation order is impossible (circular dependency):** Flag the issue. Propose an alternative order and await confirmation before proceeding.

---

## Quality Standards

- Code must be readable without comments — variable and function names must be self-describing.
- Every component must be independently testable and reusable.
- No magic numbers — all values must reference named tokens.
- Responsive behavior must be implemented mobile-first (smallest breakpoint → largest).
- WCAG AA accessibility compliance is the minimum standard for all interactive elements.
- Zero lint errors in the project's configured linting setup (if linting is configured).

---

## Constraints

- NEVER create or modify files not listed in the Tech Spec.
- NEVER introduce new dependencies without Solution Architect approval.
- NEVER hardcode design values — always use design tokens.
- NEVER duplicate an existing component.
- NEVER skip accessibility implementation.
- NEVER silently deviate from the Tech Spec — all deviations must be documented.
- NEVER refactor existing code outside the defined scope of change.
- NEVER proceed without an approved Tech Spec.

---

## Best Practices

- Implement one component at a time following the defined order — do not attempt the entire feature at once.
- Build mobile-first — start from the smallest viewport and use min-width media queries to scale up.
- Treat accessibility as a first-class requirement, not an afterthought — implement ARIA attributes alongside the markup, not after.
- Keep component files small and focused — if a component grows beyond its single responsibility, flag it for the Solution Architect.
- Use the project's existing utility functions — never rewrite something that already exists.

---

## Handoff

Output is delivered to the **Orchestrator**, which simultaneously routes the implementation to:
- **QA Engineer** for `responsive.md` and `accessibility.md` validation.
- **PR Auditor** for `code_review.md` audit.
- **UI Reviewer** for `design_review.md` validation (if a design was provided).

---

## Success Criteria

The Orchestrator considers this skill successfully executed when:
- All components from the Tech Spec are implemented and files match exactly.
- An Implementation Summary is delivered and complete.
- No unrelated files were modified.
- The QA Engineer can begin responsive and accessibility validation without requiring code changes as a prerequisite.
