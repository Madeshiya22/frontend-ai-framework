# Skill: Responsive Validation

## Purpose

This skill systematically tests the frontend implementation across all defined viewport sizes, orientations, and browsers. It verifies that layout, content, and responsive behaviors match the design intent without breaking.

---

## Primary Objective

Produce a comprehensive Responsive Handoff Report that documents layout behavior across a strict breakpoint and cross-browser matrix, proving compliance with the Responsive Definition of Done.

---

## When to Use

**Use when:**
- A new feature or component has been implemented.
- The Orchestrator schedules responsive QA.
- A responsive defect has been remediated and requires re-validation.

**Do NOT use when:**
- Validating accessibility (use `accessibility.md`).
- Validating business logic or functional correctness (use `functional_testing.md`).

---

## Prerequisites

- Implementation source code.
- Approved Technical Specification (for defined breakpoints).
- Design Specification (if available, for visual regression checks).

---

## Expected Output (Responsive Handoff Report)

The skill must return a structured **Responsive Handoff Report** containing:
1. **Device Category Matrix**: PASS/FAIL per category (Mobile, Tablet, Laptop, Desktop, Ultra-wide).
2. **Orientation Matrix**: PASS/FAIL for Portrait vs. Landscape rendering.
3. **Cross-browser Compatibility Matrix**: PASS/FAIL for Chromium, WebKit, and Gecko engines.
4. **Validation Summary**: Explicit PASS/FAIL for Touch Targets, Overflow, Typography, Images, and Navigation.
5. **Visual Regression Log**: Discrepancies between implementation and design intent.
6. **Defect List**: Actionable descriptions of any responsive failures.
7. **Responsive Definition of Done**: Final verification statement.

---

## Execution Process

You must strictly execute the following sequence. Do not skip any phases.

### Phase 1: Responsive Testing Strategy & Setup
- Read the Tech Spec to identify the responsive scope and expected layout changes.
- Establish the **Breakpoint Validation Matrix** mapped to the standard Device Categories:
  - Mobile (e.g., 320px - 480px)
  - Tablet (e.g., 768px - 1024px)
  - Laptop (e.g., 1024px - 1440px)
  - Desktop (e.g., 1440px - 1920px)
  - Ultra-wide (e.g., 1920px+)

### Phase 2: Core Responsive Validation
At every breakpoint in the matrix, execute the following validations:
- **Layout Overflow Detection**: Verify that no content breaks out of its parent container.
- **Horizontal Scroll Detection**: Verify that absolutely zero horizontal scrolling exists at any breakpoint (unless explicitly designed, like a carousel).
- **Responsive Typography Validation**: Ensure font sizes scale correctly, remain legible (min 16px base recommended), and avoid excessive line-lengths or truncations.
- **Responsive Image Validation**: Ensure images scale proportionally, do not stretch/squash, and do not overflow their containers.
- **Responsive Navigation Validation**: Verify navigation adapts appropriately (e.g., inline links transition to a functional hamburger menu on mobile).

### Phase 3: Ergonomic & Orientation Validation
- **Touch Target Validation**: Ensure all interactive elements on Mobile and Tablet are at least 44x44px.
- **Orientation Testing**: Validate that transitioning between Portrait and Landscape modes on mobile/tablet devices maintains a usable layout without breaking.

### Phase 4: Cross-browser Compatibility Matrix
Validate the responsive layout across major rendering engines:
- **Chromium** (Chrome / Edge)
- **WebKit** (Safari / iOS)
- **Gecko** (Firefox)

### Phase 5: Visual Regression Checklist
Compare the rendered responsive layout against the Design Specification:
- Are margins, paddings, and flex/grid gaps scaling correctly?
- Does the stacking order on mobile match the intended visual hierarchy?
- Are responsive design tokens used exclusively?

### Phase 6: Responsive Definition of Done (DoD)
Before finalizing the report, verify the implementation meets the Responsive DoD:
- [ ] No horizontal scrollbars at any viewport width.
- [ ] No layout clipping or text overflow.
- [ ] Touch targets pass the 44x44px rule on mobile.
- [ ] Design intent is maintained across Chromium, WebKit, and Gecko.
- [ ] Orientation changes do not break layout.

---

## Error Handling

- **Missing Breakpoints**: If the Tech Spec omits breakpoints, assume standard device breakpoints and flag the assumption in the report.
- **Framework Limitations**: If the underlying UI framework behaves inconsistently across browsers, flag it as a framework constraint.

---

## Constraints

- NEVER modify code.
- NEVER assume functional correctness (leave to `functional_testing.md`).
- NEVER evaluate WCAG compliance here (leave to `accessibility.md`).
- NEVER approve an implementation with a horizontal scroll defect on mobile.

---

## Handoff

Output the **Responsive Handoff Report** to the Orchestrator, which will aggregate it with other QA reports to determine the final feature verdict.
