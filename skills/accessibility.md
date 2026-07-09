# Skill: Accessibility Validation

## Purpose

This skill systematically tests the frontend implementation for compliance with Web Content Accessibility Guidelines (WCAG). It exists because accessibility is a non-negotiable quality standard — not a nice-to-have — and because accessibility failures can exclude users, create legal liability, and signal overall implementation quality issues.

---

## Primary Objective

Produce an Accessibility Validation Report that tests the implementation against WCAG AA criteria, documents every failure with sufficient detail for immediate remediation, and provides a clear pass/fail verdict.

---

## When to Use

**Use when:**
- A new feature or component has been implemented.
- The Orchestrator has routed the implementation to the QA phase.
- An accessibility failure has been fixed and re-validation is required.

**Do NOT use when:**
- No implementation has been delivered.
- The task is a backend-only change with no UI output.
- The request is explicitly scoped to exclude accessibility (rare — must be explicitly stated in PRD).

---

## Prerequisites

- Implementation output (from `implement_section.md` or `figma_to_code.md`).
- Approved PRD (for any specific accessibility requirements stated by the user).
- Approved Tech Spec (for component list and interactive element inventory).

---

## Inputs

- Implemented source code (required).
- Approved PRD (required — for stated accessibility requirements and acceptance criteria).
- Approved Tech Spec (required — for component and interactive element scope).

---

## Expected Outputs

An **Accessibility Validation Report** containing:
1. Test Scope (components and interactive elements tested)
2. WCAG Criterion Results (each tested criterion: PASS / FAIL)
3. Semantic HTML Audit (correct use of heading hierarchy, landmarks, lists, etc.)
4. ARIA Attribute Audit (missing, incorrect, or redundant ARIA attributes)
5. Keyboard Navigation Audit (tab order, focus management, keyboard-operable interactions)
6. Focus State Audit (visible focus indicators on all interactive elements)
7. Color Contrast Audit (text and UI components against WCAG AA contrast ratios)
8. Alt Text Audit (all images and icons)
9. Form Accessibility Audit (labels, error messages, required field indicators)
10. Failure Details (for each failure: component, criterion, description, severity, fix recommendation)
11. Overall Accessibility Score (out of 100)
12. Final Verdict: APPROVED or REJECTED

---

## Execution Process

1. **Review the Tech Spec.** Identify all implemented components, pages, and interactive elements to build a complete test scope.

2. **Review the PRD.** Note any specific accessibility requirements or acceptance criteria defined by the user.

3. **Build the test plan.** List every interactive element and content area to be tested.

4. **Test semantic HTML structure.**
   - Verify a single, correctly-placed `<h1>` per page.
   - Verify heading hierarchy is logical (h1 → h2 → h3, no skipped levels).
   - Verify landmark regions are present: `<header>`, `<main>`, `<footer>`, `<nav>`, `<aside>` where appropriate.
   - Verify lists use `<ul>` or `<ol>` where semantically correct.
   - Verify buttons are `<button>` elements (not `<div>` or `<span>`).
   - Verify links are `<a>` elements with `href` attributes.

5. **Test ARIA attributes.**
   - Verify `aria-label` or `aria-labelledby` is present on all interactive elements without visible text labels.
   - Verify `aria-expanded` is used on toggle controls (menus, accordions, dropdowns).
   - Verify `aria-hidden="true"` is applied to decorative icons and images.
   - Verify `role` attributes are used correctly and only when native HTML semantics are insufficient.
   - Flag any redundant ARIA (e.g., `role="button"` on a `<button>` element).

6. **Test keyboard navigation.**
   - Tab through all interactive elements. Verify every interactive element is reachable via keyboard.
   - Verify the tab order is logical and follows the visual reading order.
   - Verify modal dialogs trap focus when open and return focus to the trigger element when closed.
   - Verify dropdown menus and accordions can be opened, navigated, and closed via keyboard.
   - Verify no keyboard traps exist (user can always tab out of any element).

7. **Test focus states.**
   - Verify every interactive element (buttons, links, inputs, selects) has a clearly visible focus indicator.
   - Verify focus indicators meet WCAG 2.2 minimum size and contrast requirements.
   - Flag any instance where `outline: none` was applied without a custom focus style replacement.

8. **Test color contrast.**
   - Verify body text meets WCAG AA: minimum 4.5:1 contrast ratio against its background.
   - Verify large text (18px+ or 14px+ bold) meets WCAG AA: minimum 3:1 ratio.
   - Verify UI components (input borders, button borders, focus indicators) meet 3:1 ratio.
   - Flag any text rendered over complex backgrounds or images.

9. **Test alt text.**
   - Verify all `<img>` elements have an `alt` attribute.
   - Verify decorative images have `alt=""`.
   - Verify informative images have descriptive, meaningful alt text.
   - Verify SVG icons used as controls have accessible text via `aria-label` or `<title>`.

10. **Test form accessibility.**
    - Verify every form input has an associated `<label>` element (via `for`/`id` or `aria-labelledby`).
    - Verify required fields are indicated both visually and via `aria-required="true"`.
    - Verify error messages are associated with their input via `aria-describedby`.
    - Verify error messages are announced to screen readers.

11. **Document all failures.** For each failure: component, WCAG criterion violated, description, severity (Critical / High / Medium / Low), and specific fix recommendation.

12. **Calculate the Accessibility Score.** Weight failures by severity and WCAG level (A violations are more severe than AA).

13. **Compile the report.** Assemble all results into the structured Accessibility Validation Report.

14. **Submit.** Deliver to the Orchestrator with a final verdict: APPROVED or REJECTED.

---

## Validation Checklist

Before submitting the report, verify:
- [ ] All components and interactive elements from the Tech Spec are in scope.
- [ ] Semantic HTML has been fully audited.
- [ ] All ARIA attributes have been verified.
- [ ] Keyboard navigation has been tested on all interactive elements.
- [ ] Focus states have been verified on all interactive elements.
- [ ] Color contrast has been checked for all text and UI components.
- [ ] All images and icons have appropriate alt text.
- [ ] All form elements have associated labels and error handling.
- [ ] Every failure has a WCAG criterion reference, severity, and fix recommendation.
- [ ] Accessibility Score is calculated.
- [ ] Final verdict is clearly stated.

---

## Error Handling

- **No implementation provided:** Halt. Return: "No implementation available for accessibility testing."
- **Dynamic content loaded asynchronously:** Note that dynamic content requires additional testing in a live environment. Flag for manual verification.
- **Third-party component with known accessibility issues:** Document the issue. Flag as "Third-party accessibility gap" — remediation may be limited.
- **Color values not extractable from code:** Use the Design Specification tokens for contrast calculation. Flag the limitation.

---

## Quality Standards

- Every WCAG AA criterion applicable to the implementation must be tested.
- Every failure must cite the specific WCAG criterion (e.g., "WCAG 2.1 1.4.3 — Contrast (Minimum)").
- Fix recommendations must be specific enough for a developer to apply immediately.
- A Critical failure means: the feature is completely inaccessible to at least one user group.

---

## Constraints

- NEVER modify code.
- NEVER approve any implementation with an unresolved WCAG Level A failure.
- NEVER skip keyboard navigation testing.
- NEVER skip color contrast testing.
- NEVER approve `outline: none` without a visible replacement focus style.
- NEVER conflate accessibility failures with responsive or functional failures — they are separate reports.

---

## Best Practices

- Test keyboard navigation before any other check — it reveals the most impactful failures fastest.
- Use WCAG 2.1 AA as the minimum standard. Note WCAG 2.2 improvements where applicable.
- Check focus order by tabbing through the entire page in sequence — trust the tab order, not the visual layout.
- Test with long content and dynamic states — many accessibility issues only appear in non-default states.
- Every `aria-*` attribute must serve a purpose — redundant ARIA is noise that confuses screen readers.

---

## Handoff

Output is delivered to the **Orchestrator**, which aggregates it with the Responsive Report (from `responsive.md`), Code Review Report (from `code_review.md`), and UI Review Report (from `design_review.md`) to determine the overall pipeline verdict.

---

## Success Criteria

The Orchestrator considers this skill successfully executed when:
- A complete Accessibility Validation Report is delivered.
- All WCAG AA applicable criteria have been tested.
- Every failure is documented with a criterion reference and fix recommendation.
- A final APPROVED or REJECTED verdict is included.
