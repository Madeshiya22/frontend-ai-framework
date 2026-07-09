# Skill: Responsive Validation

## Purpose

This skill systematically tests the frontend implementation across all defined viewport sizes to verify that the layout, content, and interactions behave correctly at every breakpoint. It exists because responsive failures are the most common class of frontend defect — and because a UI that breaks on mobile is not production-ready, regardless of how it looks on desktop.

---

## Primary Objective

Produce a Responsive Validation Report that documents the layout behavior of every implemented component at every defined breakpoint, identifies all responsive failures, and provides a clear pass/fail verdict for the implementation.

---

## When to Use

**Use when:**
- A new feature or component has been implemented (via `implement_section.md` or `figma_to_code.md`).
- The Orchestrator has routed the implementation to the QA phase.
- A previous responsive failure has been fixed and re-validation is required.

**Do NOT use when:**
- No implementation has been delivered.
- The task is a backend-only change with no UI output.
- Accessibility validation (`accessibility.md`) has not been scheduled — both must run in parallel, not in sequence.

---

## Prerequisites

- Implementation output (from `implement_section.md` or `figma_to_code.md`).
- Approved Tech Spec (for defined breakpoints and component list).
- Approved PRD (for non-functional responsive requirements).
- Design Specification Document (if available — for responsive design intent reference).

---

## Inputs

- Implemented source code (required).
- Approved Tech Spec (required — defines breakpoints and component scope).
- Design Specification (optional — for breakpoint-specific layout intent).

---

## Expected Outputs

A **Responsive Validation Report** containing:
1. Test Scope (components and pages tested)
2. Breakpoints Tested (e.g., 320px, 768px, 1024px, 1440px)
3. Results Matrix (component × breakpoint → PASS / FAIL / PARTIAL)
4. Failure Details (for each failure: component, breakpoint, description, severity)
5. Hardcoded Value Violations (any fixed widths, heights, or non-responsive units found in code)
6. Overflow Issues (horizontal scroll, content overflow at any breakpoint)
7. Overall Responsive Score (out of 100)
8. Final Verdict: APPROVED or REJECTED

---

## Execution Process

1. **Review the Tech Spec.** Identify the complete list of implemented components and the defined responsive breakpoints (minimum: Mobile, Tablet, Laptop, Desktop).

2. **Review the Design Specification (if available).** Understand the intended responsive behavior for each component at each breakpoint.

3. **Build the test matrix.** Create a grid: all components (rows) × all breakpoints (columns). Every cell must be completed.

4. **Inspect the code for hardcoded values.** Before visual testing, scan the implementation for: fixed pixel widths (`width: 400px`), non-responsive font sizes, non-responsive height definitions. Flag every instance.

5. **Test at Mobile breakpoint (e.g., 320px–428px).**
   - Verify stacking behavior — columns should collapse to single-column.
   - Verify text is readable without zoom.
   - Verify no horizontal overflow exists.
   - Verify touch targets (buttons, links) meet minimum size requirements (44×44px recommended).
   - Verify images scale and do not overflow containers.

6. **Test at Tablet breakpoint (e.g., 768px–1024px).**
   - Verify the layout transition from mobile to tablet is smooth.
   - Verify multi-column layouts appear where designed.
   - Verify navigation adapts correctly (hamburger vs. inline nav).

7. **Test at Laptop breakpoint (e.g., 1024px–1280px).**
   - Verify full desktop layout begins to appear.
   - Verify no awkward breakpoints between tablet and desktop.

8. **Test at Desktop breakpoint (e.g., 1280px–1920px).**
   - Verify maximum content width is constrained (content does not stretch to full screen width on ultra-wide monitors unless designed to do so).
   - Verify all components are correctly positioned at full width.

9. **Test each interactive element at every breakpoint.**
   - Buttons, links, form inputs, dropdowns, and modals must all function at every breakpoint.

10. **Document all failures.** For each failure: component name, breakpoint, description of failure, severity (Critical / High / Medium / Low), and screenshot or code reference.

11. **Calculate the Responsive Score.** Weight failures by severity. Critical failures deduct the most points.

12. **Compile the report.** Assemble all results into the structured Responsive Validation Report.

13. **Submit.** Deliver to the Orchestrator with a final verdict: APPROVED or REJECTED.

---

## Validation Checklist

Before submitting the report, verify:
- [ ] All defined breakpoints have been tested.
- [ ] All implemented components appear in the test matrix.
- [ ] All hardcoded value violations are documented.
- [ ] All horizontal overflow instances are documented.
- [ ] Every failure has a severity, description, and component reference.
- [ ] The Responsive Score is calculated and included.
- [ ] Final verdict is clearly stated.

---

## Error Handling

- **No implementation provided:** Halt. Return: "No implementation available for responsive testing."
- **Breakpoints not defined in Tech Spec:** Use standard breakpoints (Mobile: 375px, Tablet: 768px, Laptop: 1024px, Desktop: 1440px) and note the assumption.
- **Implementation uses an unfamiliar framework:** Apply generic responsive testing principles. Flag any framework-specific testing gaps.
- **Dynamic content varies layout significantly:** Test with both empty and populated states. Document if behavior differs.

---

## Quality Standards

- Every component must be tested at every defined breakpoint — no skipping.
- All failure descriptions must be specific enough for a developer to reproduce the issue in under 60 seconds.
- Hardcoded value violations must cite exact file and line references.
- The Responsive Score must accurately reflect the weighted severity of all failures.

---

## Constraints

- NEVER modify code.
- NEVER skip a breakpoint.
- NEVER approve an implementation with a Critical responsive failure (e.g., horizontal scroll on mobile, completely broken layout).
- NEVER test only the happy path — test with long content, empty states, and edge case data.
- NEVER conflate responsive failures with accessibility or functional failures — they are separate reports.

---

## Best Practices

- Always test at the smallest defined breakpoint first — it reveals the most failures.
- Use real content in tests — placeholder text hides truncation and overflow issues.
- Test navigation specifically — it is the most commonly broken element at mobile breakpoints.
- Check that touch targets are adequately sized on mobile (minimum 44×44px).
- Horizontal scrollbar at any breakpoint is always a Critical failure.

---

## Handoff

Output is delivered to the **Orchestrator**, which aggregates it with the Accessibility Report (from `accessibility.md`), Code Review Report (from `code_review.md`), and UI Review Report (from `design_review.md`) to determine the overall pipeline verdict.

---

## Success Criteria

The Orchestrator considers this skill successfully executed when:
- A complete Responsive Validation Report is delivered.
- All defined breakpoints have been tested.
- All failures are documented with severity and description.
- A final APPROVED or REJECTED verdict is included.
