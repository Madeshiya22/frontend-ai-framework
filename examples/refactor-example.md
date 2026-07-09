# Example: Refactor Request

## Scenario

The UserDashboard component has grown over 6 months into a 450-line monolith that mixes data fetching, business logic, and markup in a single file. It violates multiple architecture standards and is becoming difficult to maintain. The team submits a Refactor Request to break it apart without changing any user-visible behavior.

---

## Input

```
Target Component or File:
src/components/UserDashboard/UserDashboard.tsx
src/components/UserDashboard/UserDashboard.module.css

Refactoring Goal:
1. Separate all data-fetching logic into a dedicated custom hook.
2. Separate business logic (metric calculation, data transformation)
   into standalone utility functions.
3. Decompose the monolithic component into focused sub-components,
   each with a single responsibility.
4. Migrate all inline styles to CSS Module classes.

Preserve Functionality:
Yes — all visible behavior, props interface, and rendered output must
remain identical after refactoring.

Technology Stack:
React 18 with TypeScript, CSS Modules.

Specific Issues to Address:
1. useEffect on line 34 makes three separate API calls directly inside
   the component. These belong in a custom hook.
2. Lines 120–165 contain metric calculation logic (percentage changes,
   trend indicators) directly in the render function. These are pure
   functions that belong in a utility file.
3. The component renders three visually distinct sections
   (MetricsSummary, ActivityFeed, QuickActions) as inline JSX blocks
   within a single return statement — each should be its own component.
4. Lines 87, 134, and 201 use inline styles for dynamic positioning.
   Two of these are not dynamic — they should be CSS Module classes.

Architecture Standard to Align With:
ARCHITECTURE.md:
- "No API calls inside component render functions. Use hooks."
- "No business logic in markup. Use utility functions."
- "Components that render three distinct UI sections should be
   decomposed into sub-components."

Performance Targets:
Not applicable — this is a structural refactor.

Related Components (potentially affected):
src/pages/DashboardPage.tsx — imports UserDashboard as a default export.
src/components/UserDashboard/__tests__/UserDashboard.test.tsx — must pass.

Existing Tests:
src/components/UserDashboard/__tests__/UserDashboard.test.tsx
  — 12 test cases covering rendering, metric display, and activity feed.
  All must continue to pass after refactoring.

Deprecated API Being Replaced:
Not applicable — no API changes, only structural reorganization.

Additional Context:
The UserDashboard accepts two props: userId (string) and onNavigate
(function). These props must remain the same after refactoring —
the DashboardPage import must not require any changes.
```

---

## Expected AI Behaviour

1. **Orchestrator routes** to the PR Auditor / Frontend Developer — does NOT trigger the full Planning Pipeline.
2. **Agent reads `UserDashboard.tsx` in full** before proposing any changes.
3. **Agent produces a Refactoring Plan** — listing every proposed file, every moved function, and every extracted component. Presents to user for approval before writing code.
4. After plan approval, **agent implements in order**: utilities first → hook → sub-components → parent component cleanup → style migration.
5. **Agent verifies** the `DashboardPage.tsx` import still works unchanged.
6. **Agent verifies** all 12 test cases still pass after refactoring.
7. **Code Review** confirms architecture compliance after implementation.

---

## Refactoring Plan (Expected Output Before Implementation)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REFACTORING PLAN — UserDashboard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files to CREATE:
──────────────
src/hooks/useUserDashboard.ts
  → Extracts 3 API calls from useEffect (lines 34–78).
  → Exposes { metrics, activity, quickActions, isLoading, error }.

src/utils/dashboardMetrics.ts
  → Extracts calculatePercentageChange(), getTrendIndicator(),
    formatMetricValue() from render function (lines 120–165).
  → Pure functions, no side effects, fully testable.

src/components/UserDashboard/MetricsSummary/
  index.tsx        → Extracts metrics display section (lines 180–240).
  index.module.css → Scoped styles for metrics grid.

src/components/UserDashboard/ActivityFeed/
  index.tsx        → Extracts activity list section (lines 241–320).
  index.module.css → Scoped styles for feed items.

src/components/UserDashboard/QuickActions/
  index.tsx        → Extracts quick actions section (lines 321–390).
  index.module.css → Scoped styles for action buttons.

Files to MODIFY:
───────────────
src/components/UserDashboard/UserDashboard.tsx
  → Remove all API calls, business logic, and section JSX.
  → Import and compose MetricsSummary, ActivityFeed, QuickActions.
  → Import and use useUserDashboard hook.
  → Props interface unchanged: { userId: string, onNavigate: Function }
  → Target size: ~60 lines (from 450 lines).

src/components/UserDashboard/UserDashboard.module.css
  → Add 2 new classes to replace inline styles on lines 87 and 134.
  → Line 201 inline style is dynamic (width calculated at runtime) —
    kept as inline style. Documented as intentional.

Files UNCHANGED:
───────────────
src/pages/DashboardPage.tsx        — import still valid, no changes.
src/__tests__/UserDashboard.test.tsx — all 12 tests remain valid.

BEHAVIOR PRESERVATION CONFIRMATION:
  External props interface: userId, onNavigate — unchanged.
  Rendered output: identical — sub-components render same DOM structure.
  Test coverage: all 12 test cases remain applicable.

[SYSTEM] Refactoring Plan delivered. Awaiting user approval to begin.
```

---

## Expected Output

After approval and implementation:

1. **Refactoring Plan** — presented and approved before any code changes.
2. **Refactored files** — `UserDashboard.tsx` reduced to ~60 lines; 5 new files created; CSS module updated.
3. **Implementation Summary** — all files created/modified listed; deviations (dynamic inline style retained) documented with justification.
4. **Test verification** — all 12 existing tests pass.
5. **Code Review Report** — PR Auditor confirms ARCHITECTURE.md compliance; score improves from estimated 55 → 94.

---

## Common Mistakes

| Mistake | Consequence | Prevention |
|---------|-------------|------------|
| Starting refactoring without a plan | Developer goes in a different direction than expected; wasted work | Always produce and approve the Refactoring Plan before writing code |
| Changing the props interface during refactoring | `DashboardPage.tsx` import breaks — regression | Props interface is a non-negotiable constraint — document and preserve it |
| Adding new features during refactoring | Scope creep; tests break for non-structural reasons | A refactor changes structure only — new behavior is a separate Feature Request |
| Not running existing tests after refactoring | Silent regression — functionality broken without notice | "Preserve Functionality: Yes" means tests must pass — verify before submitting |
| Migrating all inline styles including dynamic ones | Dynamic styles require runtime values — CSS Modules cannot handle them | Audit each inline style — keep dynamic ones, migrate static ones only |
