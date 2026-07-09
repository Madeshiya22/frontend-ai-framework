# Skill: Functional Validation

## Purpose

This skill systematically tests the frontend implementation for business logic correctness, functional reliability, state management integrity, and performance sanity. It serves as the single source of truth for all functional testing.

---

## Primary Objective

Produce a comprehensive Functional Handoff Report that documents the execution of test scenarios against the PRD, verifying that all business requirements, user flows, state transitions, and edge cases are handled correctly.

---

## When to Use

**Use when:**
- A new feature or component has been implemented.
- The Orchestrator schedules functional QA.
- A functional defect has been remediated and requires re-validation.

**Do NOT use when:**
- Validating layout resizing (use `responsive.md`).
- Validating WCAG compliance (use `accessibility.md`).
- Reviewing visual aesthetics against Figma (use `design_review.md`).

---

## Prerequisites

- Implementation source code.
- Approved PRD (for business requirements and acceptance criteria).
- Approved Technical Specification (for state management and API definitions).

---

## Expected Output (Functional Handoff Report)

The skill must return a structured **Functional Handoff Report** containing:
1. **Test Evidence**: Documentation of steps taken or data inputs used for each test.
2. **Test Result**: Explicit PASS / FAIL for each test scenario.
3. **Observations**: Any unexpected behaviors or minor deviations found during testing.
4. **Recommendations**: Specific fixes for failed tests.
5. **Known Limitations**: Any test scenarios blocked by missing API endpoints or environmental constraints.

---

## Execution Process

You must strictly execute the following sequence. Do not skip any phases.

### Phase 1: Functional Testing Strategy
- Read the PRD acceptance criteria to build a comprehensive test matrix.
- Identify all interactive elements, data mutations, and expected state changes defined in the Tech Spec.

### Phase 2: Core Business Logic & User Flows
- **Business Logic Validation**: Verify that the application correctly processes data according to the PRD rules (e.g., price calculations, filtering logic).
- **User Flow Validation**: Test end-to-end user journeys (e.g., complete a checkout process). Verify navigation routing is correct.
- **Form Validation**: Test all input fields. Verify required fields, regex patterns (email, phone), character limits, and proper form submission behavior.
- **API / Mock Data Validation**: Verify the frontend correctly integrates with endpoints or mock data. Ensure payloads match expected schemas.
- **State Management Validation**: Verify global and local state accurately update across components. Ensure no stale data is rendered.

### Phase 3: State Visualization Testing
Test all possible component states explicitly:
- **Loading State Validation**: Verify spinners, skeletons, or disabled buttons appear during async operations.
- **Success State Validation**: Verify success toasts, redirects, or confirmation messages appear after successful operations.
- **Failure State Validation**: Verify graceful degradation when operations fail (e.g., network timeout).
- **Error State Validation**: Verify inline validation errors on forms or specific component error boundaries.
- **Empty State Validation**: Verify empty lists, empty carts, or null data render a helpful empty state rather than a blank screen.

### Phase 4: Ergonomics & Reliability
- **Edge Case Testing**: Test boundary conditions (e.g., 0 items, extremely long strings, negative numbers, special characters).
- **Regression Testing**: Verify that newly introduced code does not break adjacent, previously existing functionality.
- **Performance Sanity Checks**: Verify there are no infinite rendering loops, massive memory leaks, or unoptimized network waterfalls (e.g., fetching data on every keystroke without debouncing).

### Phase 5: Functional Definition of Done (DoD)
Before finalizing the report, verify the implementation meets the Functional DoD:
- [ ] 100% of PRD acceptance criteria are met.
- [ ] Forms validate correctly and prevent invalid submissions.
- [ ] Loading, Success, Error, Failure, and Empty states are completely implemented.
- [ ] State remains consistent across navigation.
- [ ] No regressions introduced to existing features.

---

## Error Handling

- **Missing Backend Integration**: If the UI relies on a backend that is not yet available, document it as a "Known Limitation" and test using mock data or stubbed responses.
- **Ambiguous Requirements**: If the PRD is unclear on how an edge case should be handled, test the most logical fallback and explicitly request clarification in the "Observations".

---

## Constraints

- NEVER modify code.
- NEVER assume accessibility correctness (leave to `accessibility.md`).
- NEVER test viewport resizing here (leave to `responsive.md`).
- NEVER approve an implementation if a Critical functional bug (e.g., crash, data loss, security flaw) exists.

---

## Handoff

Output the **Functional Handoff Report** to the Orchestrator, which will aggregate it with other QA reports to determine the final feature verdict.
