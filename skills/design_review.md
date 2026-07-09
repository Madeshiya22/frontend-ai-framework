# Skill: Design Review

## Purpose

This skill validates the implemented UI against the approved design specification, verifying pixel-accurate implementation of spacing, typography, color, alignment, and interaction states. It exists because code that passes QA and code review can still fail to match the intended design — and visual inconsistency undermines trust in the product's quality.

---

## Primary Objective

Produce a UI Review Report that compares the implementation component-by-component against the approved design source, documents every visual deviation with exact expected vs. actual values, and provides a final verdict that either approves the implementation for release or returns it for precise visual corrections.

---

## When to Use

**Use when:**
- A design reference (Figma file, mockup, or Design Specification Document) was part of the feature request.
- The Orchestrator has routed the implementation to the review phase.
- A previously rejected UI has been corrected and requires re-validation.

**Do NOT use when:**
- No design reference was provided (there is nothing to compare against).
- The implementation has not been delivered.
- The task is a backend change or accessibility fix with no visual component.

---

## Prerequisites

- Implementation output (from `implement_section.md` or `figma_to_code.md`).
- Design Specification Document (from `figma_to_code.md`) OR original design assets.
- Design System guidelines (`overview/DESIGN_SYSTEM.md`) — for token compliance.
- Approved Tech Spec (for component scope and breakpoint reference).

---

## Inputs

- Implemented source code (required).
- Design Specification Document or original design file/assets (required).
- Design System guidelines (required — for token name verification).
- Approved Tech Spec (required — for component and breakpoint scope).

---

## Expected Outputs

A **UI Review Report** containing:
1. Review Scope (components reviewed)
2. Design Source Reference (Figma link, mockup file name, or specification document)
3. Component-Level Findings (per component: spacing, typography, color, alignment deviations)
4. Interaction State Results (hover, focus, active, disabled — PASS / FAIL per state per component)
5. Responsive Visual Verification (per breakpoint — PASS / FAIL per component)
6. Design Token Compliance (are the correct tokens used? Are any values hardcoded?)
7. Deviation Details (for each deviation: component, property, expected value, actual value, severity)
8. Visual Quality Score (out of 100)
9. Final Verdict: APPROVED or REJECTED

---

## Execution Process

1. **Review the Design Specification Document.** Internalize all token values, layout specifications, typography rules, spacing values, and interaction states before examining the implementation.

2. **Build the review scope.** List all components defined in the Tech Spec. These are the components to review — no more, no less.

3. **Review spacing — component by component.**
   - Compare all margin, padding, and gap values in the implementation against the Design Specification.
   - Flag any deviation with: expected value, actual value, component name, and property.

4. **Review typography — element by element.**
   - Compare font family, font size, font weight, line height, and letter spacing for every text element.
   - Verify text colors match the design tokens.

5. **Review colors — element by element.**
   - Compare background colors, border colors, text colors, and icon colors against the design specification.
   - Verify the correct design token variable is being used (not a hardcoded value that happens to match).

6. **Review alignment.**
   - Verify horizontal and vertical alignment of every element within its container.
   - Verify text alignment (left, center, right) matches the design.
   - Verify icon and image positioning relative to accompanying text.

7. **Review visual hierarchy.**
   - Verify that size, weight, and spatial relationships between elements communicate the same hierarchy as the design.
   - A heading that appears too small or too large relative to its context is a visual hierarchy failure.

8. **Review interaction states.**
   - For every interactive element (buttons, links, cards, inputs): verify hover, focus, active, and disabled states match the design specification.
   - Any missing or incorrect interaction state is a finding.

9. **Review responsive visual behavior.**
   - At each defined breakpoint, verify that the visual layout matches the design's responsive intent.
   - Check for spacing inconsistencies, font size changes, and layout reflow at each breakpoint.

10. **Review design token compliance.**
    - Verify that CSS variables, Tailwind config values, or theme tokens are used for all visual values.
    - Any hardcoded value that should reference a design token is a finding.

11. **Document all deviations.** For each deviation: component name, CSS property or visual element, expected value (from design spec), actual value (from implementation), and severity (Critical / High / Medium / Low).

12. **Calculate the Visual Quality Score.** Weight deviations by severity.

13. **Compile the report.** Assemble all results into the structured UI Review Report.

14. **Submit.** Deliver to the Orchestrator with a final verdict: APPROVED or REJECTED.

---

## Validation Checklist

Before submitting the report, verify:
- [ ] Every component in the Tech Spec has been reviewed.
- [ ] Spacing has been compared for all components.
- [ ] Typography has been compared for all text elements.
- [ ] Colors have been compared for all visual elements.
- [ ] Alignment has been verified for all elements.
- [ ] All defined interaction states have been checked.
- [ ] All defined breakpoints have been visually verified.
- [ ] Design token compliance has been verified (no unintentional hardcoded values).
- [ ] Every deviation has expected value, actual value, component, property, and severity documented.
- [ ] Visual Quality Score is calculated.
- [ ] Final verdict is clearly stated.

---

## Error Handling

- **No design reference available:** Halt. Return: "No design specification or design assets provided. UI Review cannot proceed."
- **Design Specification incomplete (missing breakpoint):** Flag: "Responsive design for [breakpoint] not specified." Do not invent. Mark the breakpoint as "Unverifiable — design intent not provided."
- **Implementation not renderable (code-only, no preview):** Flag the limitation. Review what can be inferred from the code. Flag areas requiring visual preview as "Requires live render verification."
- **Design conflicts with PRD:** Document the conflict. Escalate to the Product Manager. Do not reject the implementation for a design flaw.
- **Token in implementation does not match Design System:** Flag as "Token mismatch — verify against Design System." Treat as a Medium finding unless it results in a visible color or sizing difference.

---

## Quality Standards

- Every deviation must specify the exact expected value and the exact actual value — "slightly off" is not a valid finding.
- Findings must be organized by component, not randomly listed.
- The UI Review Report must enable the Frontend Developer to make every fix without opening the original design file.
- The Visual Quality Score must accurately reflect the weighted severity of all deviations.

---

## Constraints

- NEVER invent design decisions — only evaluate against the provided design source.
- NEVER modify code.
- NEVER approve a Critical visual deviation (e.g., completely wrong layout, wrong color scheme, missing section).
- NEVER skip any component, state, or breakpoint in the review scope.
- NEVER base findings on subjective preference — every finding must reference the design specification.
- NEVER conflate visual quality with functional correctness or code quality — those are separate concerns.

---

## Best Practices

- Review in the order components appear in the design — top-to-bottom, left-to-right.
- Check the smallest breakpoint last — it is the most commonly missed.
- Use exact numerical comparisons — pixel values, color codes, font sizes.
- Verify interaction states systematically — do not rely on memory of what was designed.
- A hardcoded value that produces the correct visual result is still a finding — it will cause problems when the design system updates.

---

## Handoff

Output is delivered to the **Orchestrator**, which aggregates it with the Responsive Report (from `responsive.md`), Accessibility Report (from `accessibility.md`), and Code Review Report (from `code_review.md`) to determine the overall pipeline verdict.

---

## Success Criteria

The Orchestrator considers this skill successfully executed when:
- A complete UI Review Report is delivered covering all components and breakpoints.
- Every deviation specifies expected vs. actual values.
- All interaction states have been reviewed.
- The Visual Quality Score is accurately calculated.
- A final APPROVED or REJECTED verdict is included.
