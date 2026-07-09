# Skill: Accessibility Validation

## Purpose

This skill systematically tests the frontend implementation for strict compliance with Web Content Accessibility Guidelines (WCAG 2.2 AA). Accessibility is a non-negotiable enterprise quality standard. This skill ensures the implementation is usable by everyone, including those relying on assistive technologies.

---

## Primary Objective

Produce a comprehensive Accessibility Handoff Report that documents compliance against a strict WCAG 2.2 AA checklist, explicitly verifying semantics, screen readers, keyboard navigation, and contrast, to prove the Accessibility Definition of Done is met.

---

## When to Use

**Use when:**
- A new feature or component has been implemented.
- The Orchestrator schedules accessibility QA.
- An accessibility defect has been remediated and requires re-validation.

**Do NOT use when:**
- Validating layout resizing (use `responsive.md`).
- Validating business logic or functional correctness (use `functional_testing.md`).
- Reviewing visual aesthetics against Figma (use `design_review.md`).

---

## Prerequisites

- Implementation source code.
- Approved Technical Specification (for component scope).

---

## Expected Output (Accessibility Handoff Report)

The skill must return a structured **Accessibility Handoff Report** containing:
1. **WCAG 2.2 AA Matrix**: PASS/FAIL status for all applicable criteria.
2. **Screen Reader & Keyboard Matrix**: Verification of focus flow and announcement.
3. **Semantics & ARIA Log**: Documentation of any invalid semantic structures or redundant ARIA.
4. **Contrast & Visual Accessibility Log**: Contrast ratios and reduced motion support.
5. **Defect List**: Actionable descriptions of any accessibility failures with fix recommendations.
6. **Accessibility Definition of Done**: Final verification statement.

---

## Execution Process

You must strictly execute the following sequence. Do not skip any phases.

### Phase 1: Semantic Structure & Navigation
- **Semantic HTML Validation**: Verify that `<button>`, `<a>`, `<nav>`, `<main>`, etc., are used correctly instead of generic `<div>` elements.
- **Landmark & Heading Hierarchy Validation**: Ensure exactly one `<h1>` per page. Verify heading levels do not skip (h1 -> h2 -> h3). Verify all regions are wrapped in appropriate landmarks.
- **Accessible Tables**: When applicable, verify tables use `<caption>`, `<th>`, `scope`, and are not used for layout purposes.

### Phase 2: Keyboard & Focus Management
- **Keyboard Navigation Testing**: Tab through the entire page. Verify every interactive element is reachable without a mouse. Verify no keyboard traps exist.
- **Focus Management**: Verify every interactive element has a highly visible focus indicator. Ensure modal dialogs trap focus when open and return focus to the trigger when closed.

### Phase 3: Screen Reader & ARIA Validation
- **Screen Reader Validation**: Simulate reading the DOM with a screen reader. Verify dynamic updates (e.g., toasts, errors) are announced using `aria-live`.
- **ARIA Validation**: Verify `aria-expanded`, `aria-hidden`, `aria-describedby`, etc., are used correctly. Flag any redundant ARIA (e.g., `role="button"` on a `<button>`).

### Phase 4: Visual & Content Accessibility
- **Color Contrast Verification**: Ensure text meets 4.5:1 (normal) or 3:1 (large) contrast ratio against backgrounds. Ensure UI boundaries (inputs, borders) meet 3:1.
- **Accessible Images (Alt Text)**: Verify all informative images have descriptive `alt` text. Verify decorative images have `alt=""` or `aria-hidden="true"`.
- **Motion & Reduced Motion Validation**: If animations exist, verify they respect `@media (prefers-reduced-motion: reduce)`.

### Phase 5: Form Accessibility
- **Accessible Forms Validation**: Verify every input has a programmatic `<label>`. Verify required fields are marked visually and semantically (`aria-required`). Verify error messages are announced to screen readers and linked via `aria-describedby`.

### Phase 6: Accessibility Definition of Done (DoD)
Before finalizing the report, verify the implementation meets the Accessibility DoD:
- [ ] No WCAG 2.2 AA violations.
- [ ] 100% keyboard navigable with visible focus states.
- [ ] Screen readers can interpret all dynamic state changes.
- [ ] Semantic HTML is favored over ARIA wherever possible.
- [ ] All forms, images, and contrast ratios pass.

---

## Error Handling

- **Untestable States**: If a dynamic state requires complex backend data to trigger (e.g., specific error toasts), flag it for manual screen reader testing.
- **Third-Party Constraints**: If an inaccessible component is imported from an external library, document the gap as "Third-party accessibility gap" for the Architect.

---

## Constraints

- NEVER modify code.
- NEVER assume functional correctness (leave to `functional_testing.md`).
- NEVER approve an implementation with an unresolved WCAG Level A or AA failure.
- NEVER approve `outline: none` without a custom visible focus replacement.

---

## Handoff

Output the **Accessibility Handoff Report** to the Orchestrator, which will aggregate it with other QA reports to determine the final feature verdict.
