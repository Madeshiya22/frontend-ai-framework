# Example: Review Request

## Scenario

A frontend developer has implemented a Data Export Modal — a complex component that allows users to configure and trigger a data export. Before merging, the team wants an independent quality review covering code architecture, accessibility compliance, and UI accuracy against the Figma design. They submit a Review Request.

---

## Input

```
Target Component or Page:
src/components/DataExportModal/DataExportModal.tsx
src/components/DataExportModal/DataExportModal.module.css
src/components/DataExportModal/useExportConfig.ts

Review Type:
[x] Code Quality & Architecture
[x] UI / Design Accuracy
[x] Accessibility (WCAG AA)
[ ] Responsive Behavior

Technology Stack:
React 18 with TypeScript, CSS Modules.

Related PRD or Tech Spec:
Data Export Feature — Tech Spec v1.1 (docs/data-export-tech-spec.md)

Design Reference:
https://figma.com/data-export-modal-final

Specific Concerns:
1. The modal's close behavior — suspect the Escape key handler may not be
   removing the event listener on unmount.
2. The "Format Selection" radio group may be missing proper aria-radiogroup
   labeling.
3. The export button uses inline style for the loading spinner width.
   Should be a CSS Module class.

Breakpoints to Test:
Not requested — modal renders at a fixed max-width, responsive review
is out of scope.

Architecture Standard to Evaluate Against:
ARCHITECTURE.md — "No API calls inside component render functions.
Use custom hooks for data fetching and mutations."

Known Issues or Suspicions:
- useExportConfig.ts may be directly calling fetch() instead of using
  the project's established useApi() utility.
- Potential memory leak from event listener not cleaned up.

Scope Exclusions:
The parent DataExportPage.tsx is out of scope. Review the modal only.

Additional Context:
This modal is used in two places: the Reports page and the Settings page.
It must be self-contained with no page-level context dependencies.
```

---

## Expected AI Behaviour

1. **Orchestrator routes** to three agents in parallel: PR Auditor, UI Reviewer, QA Engineer (Accessibility).
2. **PR Auditor** reads `DataExportModal.tsx`, `DataExportModal.module.css`, and `useExportConfig.ts`.
3. **PR Auditor** checks scope compliance (only these 3 files reviewed).
4. **PR Auditor** specifically investigates the `useExportConfig.ts` hook for direct `fetch()` usage.
5. **PR Auditor** checks for event listener cleanup in the modal's useEffect.
6. **UI Reviewer** loads the Figma design and compares component-by-component.
7. **UI Reviewer** checks the inline style on the export button (flags as finding).
8. **QA Engineer** tests the radio group for `aria-radiogroup` and `aria-label`.
9. **QA Engineer** tests the modal for focus trap, Escape key, and close-on-backdrop.
10. All three agents return reports. **Orchestrator aggregates** and presents the full Review Report set.

---

## Code Review Report (Example Output)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CODE REVIEW REPORT — DataExportModal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files Reviewed: DataExportModal.tsx, DataExportModal.module.css,
                useExportConfig.ts

Scope Compliance: PASS — only listed files reviewed, matches Tech Spec scope.

FINDINGS
─────────────────────────────────────────
[CRITICAL] Memory Leak — useExportConfig.ts, Line 34
  The Escape key event listener added in useEffect has no cleanup function.
  The listener persists after the component unmounts, causing a memory leak.
  Recommendation: Return a cleanup function from useEffect that calls
  document.removeEventListener('keydown', handleEscape).

[HIGH] Architecture Violation — useExportConfig.ts, Line 18
  Direct fetch() call inside the hook. The project uses useApi() utility
  (src/utils/useApi.ts) for all HTTP requests.
  Recommendation: Replace fetch('/api/export', options) with
  useApi('/api/export', { method: 'POST', body: config }).

[MEDIUM] Inline Style Violation — DataExportModal.tsx, Line 87
  Export button spinner uses inline style={{ width: '20px', height: '20px' }}.
  Should be a CSS Module class per ARCHITECTURE.md standards.
  Recommendation: Add .spinnerIcon class to DataExportModal.module.css.

[LOW] Unused Import — DataExportModal.tsx, Line 3
  React is imported but not required (project uses React 17+ JSX transform).
  Recommendation: Remove the unused import.

CODE QUALITY SCORE: 72 / 100
VERDICT: REJECTED — 2 unresolved Critical/High findings.
```

---

## Accessibility Report (Example Output)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACCESSIBILITY VALIDATION REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[CRITICAL] Missing aria-radiogroup — Format Selection section
  WCAG 2.1 1.3.1 — Info and Relationships
  The format selection radio inputs are grouped visually but the containing
  element has no role="radiogroup" and no aria-labelledby.
  Screen readers cannot determine the group's purpose.
  Recommendation: Add role="radiogroup" aria-labelledby="format-label" to
  the container. Add id="format-label" to the visible "Export Format" label.

[PASS] Focus Trap — modal correctly traps focus within the dialog.
[PASS] Escape Key — closes the modal (Note: event listener leak found
       separately by PR Auditor).
[PASS] Modal role — dialog element has role="dialog" and aria-modal="true".
[PASS] Close button — has aria-label="Close export dialog".

ACCESSIBILITY SCORE: 78 / 100
VERDICT: REJECTED — 1 Critical WCAG finding.
```

---

## Expected Output

Three structured reports:
1. **Code Review Report** — 4 findings (1 Critical, 1 High, 1 Medium, 1 Low), score 72, REJECTED.
2. **Accessibility Report** — 1 Critical finding, score 78, REJECTED.
3. **UI Review Report** — inline style deviation on button confirmed, 1 Medium finding, APPROVED overall (score 91).

The developer receives precise, actionable remediation instructions for each finding.

---

## Common Mistakes

| Mistake | Consequence | Prevention |
|---------|-------------|------------|
| Reviewing the parent page instead of the specified component | Out-of-scope findings create noise and confusion | Scope exclusions are hard boundaries — respect them |
| Accepting "it looks correct" as a UI finding | Vague findings cannot be acted upon | Every UI deviation needs expected value and actual value |
| Running reviews sequentially instead of in parallel | Pipeline takes 3× longer than necessary | All three review types spawn simultaneously |
| Approving with a Critical finding because "score is high" | A Critical finding blocks approval regardless of score | One Critical finding = automatic REJECTED, regardless of total score |
| Not providing remediation recommendations | Developer doesn't know how to fix the finding | Every finding must include a specific recommendation |
