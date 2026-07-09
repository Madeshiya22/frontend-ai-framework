# Skill: Design Review

## Purpose

This skill validates the implemented UI against the approved design specification, verifying pixel-accurate implementation of layout, design tokens, typography, interaction states, and overall visual polish. It operates independently of code review or functional testing to ensure the product looks exactly as intended.

---

## Primary Objective

Produce a formalized **UI Handoff Report** that evaluates the frontend implementation against Design System, Layout, Interaction, and Visual Validation requirements, providing categorized feedback without arbitrary numerical scores.

---

## When to Use

**Use when:**
- A new feature or component has been implemented.
- The Orchestrator routes an implementation to the UI Reviewer.

**Do NOT use when:**
- Executing functional testing (use `functional_testing.md`).
- Executing responsive layout behavior validation (use `responsive.md`).
- Executing WCAG accessibility compliance (use `accessibility.md`).
- Auditing code quality (use `code_review.md`).

---

## Prerequisites

- Implementation source code / rendered UI preview.
- Approved Technical Specification.
- Design Specification Document (or Figma files).
- Design System guidelines (`../overview/DESIGN_SYSTEM.md`).

---

## Expected Output (UI Handoff Report)

The skill must return a structured **UI Handoff Report**. Do not use numeric scores. The report must contain:

1. **Design System Compliance Summary**: High-level overview of how strictly the implementation adheres to tokens, scales, and established patterns.
2. **Findings List**: For each visual deviation, explicitly document:
   - **Finding**: Clear description of the visual issue.
   - **Visual Severity**: Critical, High, Medium, Low, or Cosmetic.
   - **Affected Components**: Specific components or elements impacted.
   - **Screenshot Reference**: Specific image name, file, or coordinate reference (if available).
   - **Recommendation**: Exact, actionable remediation guidance (e.g., "Change margin-top from 16px to 24px").
3. **Overall UI Review Recommendation**: Must be exactly one of:
   - **APPROVED**: No visual deviations found.
   - **APPROVED WITH CHANGES**: Minor Cosmetic or Low severity findings that can be fixed quickly.
   - **CHANGES REQUESTED**: One or more Medium, High, or Critical visual deviations exist.

---

## Execution Process

You must strictly execute the following review phases.

### Phase 1 - Design System Review
- **Design Token Compliance**: Verify absolutely no hardcoded hex colors, pixel spacings, or typography values exist in place of available design tokens.
- **Color Consistency**: Verify background, border, text, and brand colors match the design specification exactly.
- **Typography Scale**: Verify font family, weight, size, line-height, and letter spacing match the predefined scale.
- **Spacing Scale**: Verify margins, paddings, and gaps map to the exact intervals defined in the spacing system (e.g., 4px, 8px, 16px).
- **Border Radius**: Verify all corners match the defined rounding scale (e.g., sharp, rounded, pill).
- **Shadows**: Verify drop shadows and elevations match the exact opacity, blur, and spread defined in the tokens.
- **Iconography**: Verify icon families, stroke weights, and sizes are consistent.

### Phase 2 - Layout Review
- **Grid Consistency**: Verify the layout respects the underlying 8px, 12-column, or modular grid system.
- **Alignment**: Verify horizontal and vertical centering, baseline alignment of text, and edge alignment of disparate elements.
- **Visual Hierarchy**: Verify that the size, weight, and spatial relationships between elements communicate the exact hierarchy intended by the design.
- **Component Consistency**: Verify instances of the same component (e.g., primary button, product card) look identical across different screens.
- **Spacing Consistency**: Ensure consistent optical spacing between related groups of elements.
- **Responsive Visual Review Summary**: Visually verify that the layout adapts at breakpoints as specified in the design. *(Note: Do not execute functional layout resizing tests here; just verify the visual intent of the responsive states provided in the design).*

### Phase 3 - Interaction Review
- **Animation Consistency**: Verify animation durations, easing curves, and choreographies match the design intent.
- **Hover States**: Visually verify cursor changes, color shifts, and elevation changes on hover.
- **Focus States**: Visually verify keyboard focus rings match the design specification.
- **Transition Consistency**: Verify smooth visual transitions between states (e.g., opening a modal or expanding an accordion).
- **Loading State**: Visually verify skeletons, spinners, and disabled states during data fetching.
- **Empty State**: Visually verify the layout and illustrations presented when no data exists.
- **Error State**: Visually verify inline validation colors, error toasts, and error boundaries.

### Phase 4 - Visual Validation
- **Pixel-Perfect Validation**: Compare the rendered UI side-by-side with the design mockup.
- **Screenshot Comparison Guidance**: If utilizing image comparison, overlay screenshots at 50% opacity or utilize visual diffing techniques to detect sub-pixel deviations.
- **Visual Regression Checklist**: Verify that newly introduced components did not unintentionally alter the spacing or styling of adjacent, previously approved UI elements.
- **Accessibility Visual Review Summary**: Visually verify that color contrast and focus rings appear correct. *(Note: Do not execute functional WCAG testing here; just verify the visual presentation).*
- **Technical Specification Traceability**: Ensure every visual component built maps back to a requirement in the Tech Spec.
- **Definition of Done Validation**: Verify the UI explicitly meets the visual quality Definition of Done criteria outlined in the Tech Spec.

### Phase 5 - UI Handoff Report Generation
- Compile all findings from Phases 1-4.
- Determine the Visual Severity for every finding.
- Generate the final Design System Compliance Summary.
- Issue the final Overall UI Review Recommendation.

---

## Constraints

- NEVER write or modify code for the developer.
- NEVER evaluate functional correctness (QA's job).
- NEVER invent design decisions not present in the approved design.
- NEVER use numeric scores (e.g., "90/100").
