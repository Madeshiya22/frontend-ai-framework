# Refactor Request Template

## Purpose

This template structures a request to improve the internal quality of existing frontend code without changing its external behavior. It ensures the assigned agents understand the exact refactoring goal, the boundaries of the change, and the requirement that all existing functionality must remain unaffected.

---

## When to Use

**Use when:**
- Existing code is functionally correct but architecturally poor, unreadable, or unmaintainable.
- A component or module needs to be aligned with the project's established architecture standards.
- Duplicate code must be consolidated into a shared utility or component.
- A deprecated API, library, or pattern needs to be updated to a modern equivalent.
- Performance optimization is needed for a specific component without changing behavior.

**Do NOT use when:**
- Adding new features or changing behavior — use `feature_request.md`.
- Fixing a defect — use `bug_fix_request.md`.
- Reviewing existing code without making changes — use `review_request.md`.
- Converting a design to code — use `figma_request.md`.

---

## Required Information

The following fields are mandatory. The AI will halt and request clarification if any are missing.

- **Target Component or File** — The exact file path(s) or component name(s) to be refactored.
- **Refactoring Goal** — The specific improvement being sought (readability, performance, architecture alignment, API upgrade, deduplication, etc.).
- **Preserve Functionality** — Confirmation that existing external behavior must remain identical.
- **Technology Stack** — The framework and environment in which the refactoring occurs.

---

## Optional Information

Providing the following improves the precision and safety of the refactoring.

- **Specific Issues to Address** — Concrete problems identified in the code (e.g., "the component mixes data fetching and rendering logic," "this utility is duplicated in 4 files").
- **Architecture Standard to Align With** — Reference to `overview/ARCHITECTURE.md` or a specific pattern to follow.
- **Performance Targets** — If the refactor is performance-focused, define the target metric.
- **Related Components** — Other components that may be affected by this refactor.
- **Test Coverage** — Any existing tests that must continue to pass after the refactor.
- **Deprecated API Being Replaced** — The old API and its replacement equivalent.
- **Priority** — Whether this is blocking other work or is a standalone improvement.

---

## Input Template

```
Target Component or File:
[Exact file path(s) or component name(s) to be refactored]
Example: src/components/Dashboard/DataWidget.jsx

Refactoring Goal:
[What specific improvement are you seeking?]
Examples:
- Improve readability
- Align with ARCHITECTURE.md standards
- Consolidate duplicated logic into shared utility
- Upgrade from deprecated library X to library Y
- Separate data-fetching logic from rendering logic
- Optimize rendering performance

Preserve Functionality:
[Yes — behavior must remain identical / Describe any intentional behavior changes]

Technology Stack:
[Framework, styling methodology, state management approach]

Specific Issues to Address:
[Describe the concrete problems in the current code]
Example:
1. Data fetching is directly inside the component render function.
2. The same date-formatting logic is duplicated in 4 component files.
3. Inline styles are used instead of the project's CSS Module system.

Architecture Standard to Align With:
[Reference ARCHITECTURE.md section / specific pattern name / None specified]

Performance Targets (if applicable):
[Specific metric to achieve / Not applicable]

Related Components (potentially affected):
[List components that interact with or import the target component]

Existing Tests:
[List test files that must continue to pass / None known]

Deprecated API Being Replaced (if applicable):
[Old API name → New equivalent / Not applicable]

Additional Context:
[Any other relevant information]
```

---

## AI Instructions

When processing this template, the AI Orchestrator must:

1. **Read the target files before proposing any changes.** Understand what the code currently does before deciding how to improve it.

2. **Analyze the specific issues listed.** Map each stated issue to a concrete refactoring action. Do not invent additional issues to fix.

3. **Define a refactoring plan before executing.** Present the proposed changes and their rationale before writing any code. This is the approval gate for refactoring.

4. **Change structure, not behavior.** The external API, props interface, emitted events, and visible output of a refactored component must remain identical unless behavior changes are explicitly requested.

5. **Verify related components are unaffected.** If the target component is imported by other components, verify that changes to its interface (props, exports, class names) do not break them.

6. **Technology agnosticism.** Refactor within the patterns of the specified technology stack. Do not introduce patterns from a different framework.

7. **Scope strictly.** Only modify the files explicitly listed as targets. Do not opportunistically refactor adjacent code.

---

## Validation Checklist

Before routing this request to the pipeline, verify:
- [ ] Target component or file path is specific and valid.
- [ ] Refactoring goal is clearly stated — not just "clean it up."
- [ ] Preserve Functionality is explicitly confirmed.
- [ ] Technology stack is defined.
- [ ] At least one specific issue to address is listed.

If the refactoring goal is vague (e.g., "just make it better"): halt and request specific issues to be addressed.

---

## Expected Output

Processing this template through the pipeline produces:
1. **Refactoring Plan** — Proposed changes with rationale, presented for approval before execution.
2. **Refactored Implementation** — Updated source files with improvements applied.
3. **Regression Verification** — Confirmation that external behavior is identical to pre-refactor.
4. **Code Review Report** — PR Auditor verifies the refactoring achieves its stated goal and meets architecture standards.
5. **Implementation Summary** — List of all files modified with a description of changes.

---

## Constraints

- NEVER change the external behavior of the refactored component unless explicitly requested.
- NEVER modify files not listed as targets.
- NEVER introduce new dependencies without explicit approval.
- NEVER use the refactor as an opportunity to add features.
- NEVER present a refactoring plan that reduces test coverage.
- NEVER refactor without first reading and understanding the current implementation.

---

## Best Practices

- State specific problems — "the component is 400 lines and mixes three concerns" is actionable; "it's messy" is not.
- Reference the `overview/ARCHITECTURE.md` standard explicitly — the PR Auditor will evaluate against it.
- If the refactor affects an exported interface (props, return values), list all consuming components so regression checks can be scoped.
- For performance refactors, define the target metric before starting — otherwise, there is no success condition.
- Request a refactoring plan and approve it before implementation — it avoids wasted work if the approach is wrong.

---

## Example Request

```
Target Component or File:
src/components/UserProfileCard/UserProfileCard.jsx
src/components/UserProfileCard/UserProfileCard.css

Refactoring Goal:
1. Separate data-fetching logic from the rendering component.
2. Replace inline styles with CSS Module classes.
3. Consolidate duplicated avatar URL formatting logic (also exists in src/utils/helpers.js).

Preserve Functionality:
Yes — external behavior, props interface, and visual output must remain identical.

Technology Stack:
React with JavaScript, CSS Modules for styling, React Query for data fetching.

Specific Issues to Address:
1. The UserProfileCard component directly calls the API using fetch() inside a useEffect. This should be moved to a React Query hook in src/hooks/useUserProfile.js.
2. Five style rules are defined as inline objects inside the JSX. These should be migrated to CSS Module classes in UserProfileCard.module.css.
3. The avatar URL construction logic (adding size parameters to the URL) is duplicated from the logic in src/utils/helpers.js formatAvatarUrl(). The component should use the shared utility.

Architecture Standard to Align With:
ARCHITECTURE.md — "Separate data-fetching from rendering. All API calls must use React Query hooks."

Performance Targets:
Not applicable — this is a structural refactor.

Related Components:
src/pages/ProfilePage.jsx imports UserProfileCard.
src/components/CommentList/CommentList.jsx also imports UserProfileCard.

Existing Tests:
src/__tests__/UserProfileCard.test.jsx — must continue to pass.

Deprecated API Being Replaced:
fetch() inside useEffect → React Query useQuery() hook.

Additional Context:
The React Query client is already configured in src/providers/QueryProvider.jsx. No new setup is needed.
```

---

## Success Criteria

The Orchestrator considers this template successfully processed when:
- A refactoring plan was presented and approved before implementation.
- All stated specific issues are resolved in the refactored code.
- External behavior is verified as identical (no functional regressions).
- All related component imports remain valid.
- Code Review returns APPROVED confirming the refactor achieves its stated architectural goal.
