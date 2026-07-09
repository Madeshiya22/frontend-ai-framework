# Example: Bug Fix Request

## Scenario

After a recent deployment, QA reports that the search input on the products listing page stops working after the user applies a filter. The search field renders correctly but typing into it produces no results and no visible error. A bug fix request is submitted.

---

## Input

```
Issue Title:
Search input stops working after applying a filter on the Products page

Issue Description:
On the Products listing page, the search input works correctly on initial
page load. However, after the user applies any filter (category, price range,
or status), the search input stops responding. Typing into it no longer
triggers a search or updates the product list. The input field remains
visible and accepts keystrokes but produces no output change.

Affected Component or Page:
src/pages/ProductsPage/ProductsPage.tsx
src/components/ProductSearch/ProductSearch.tsx

Steps to Reproduce:
1. Navigate to /products.
2. Confirm the search input works (type "widget" — results update correctly).
3. Apply any filter from the filter sidebar (e.g., Category: Electronics).
4. Observe the product list filters correctly.
5. Now type in the search input (e.g., "widget").
6. Observe: product list does not update. No loading state. No error.

Expected Behavior:
The search input should continue to trigger search queries and update
the product list after any filter has been applied.

Actual Behavior:
After a filter is applied, typing into the search input has no visible
effect on the product list.

Technology Stack:
Next.js 14 with TypeScript, Tailwind CSS, Zustand for state management.

Severity:
High — core search functionality is broken in a post-filter state.
Affects all users who use both filtering and search together.

Error Logs or Console Output:
No JavaScript errors in the console.
No failed network requests observed in the Network tab.
The search API is not being called after filter is applied.

Screenshot or Recording:
[Screen recording attached — shows filter applied, then search typed,
no list update]

Browser and Device:
Chrome 125 on macOS. Also reproduced on Firefox 126 and Safari 17.
Cross-browser — not environment-specific.

Regression Context:
This was working correctly before the filter sidebar refactor (PR #284),
which was merged 3 days ago. The search worked independently before the
refactor. The refactor moved filter state from local component state
into Zustand.

Related PRD or Tech Spec:
Products Page — Filter and Search Integration Tech Spec v2.0

Additional Context:
The filter state is now managed in src/stores/productFilterStore.ts.
The ProductSearch component previously subscribed to a prop-drilled
onSearch callback. After the refactor, it may not be re-subscribing
correctly when the store state changes.
```

---

## Expected AI Behaviour

1. **Orchestrator routes** to the PR Auditor / Frontend Developer for diagnosis — NOT through the full Planning Pipeline.
2. **Agent reads** `ProductSearch.tsx` and `ProductsPage.tsx` in full before writing anything.
3. **Agent traces** the `onSearch` callback chain — who calls it, what it updates.
4. **Agent inspects** `productFilterStore.ts` to understand how filter state is managed.
5. **Agent identifies root cause** — the `ProductSearch` component's search handler was likely using a stale closure that captured the pre-filter state, because the callback is not updated when the Zustand store changes.
6. **Agent scopes the fix narrowly** — only the event handler wiring. No refactoring of unrelated code.
7. **Agent verifies** the fix resolves Steps to Reproduce before submitting.
8. **Agent confirms** no other functionality was affected by the targeted change.

---

## Root Cause Analysis (Expected Output)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROOT CAUSE ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File:    src/components/ProductSearch/ProductSearch.tsx
Issue:   Stale closure on search handler

Before the PR #284 refactor, the onSearch callback was prop-drilled
from ProductsPage and recreated on each render, keeping it fresh.

After the refactor, ProductsPage passes a memoized handleSearch function
to ProductSearch. This function closes over the Zustand filter state at
the time it is created. When filters change and the Zustand store updates,
the handleSearch closure retains the OLD filter values because it is not
re-created.

Result: The search is executed against stale filters — the API call uses
outdated filter parameters, returns results that don't match the current
filter state, and the UI appears not to respond.
```

---

## Fix Implementation (Expected Output)

```diff
// src/pages/ProductsPage/ProductsPage.tsx

- const handleSearch = useCallback((query: string) => {
-   fetchProducts({ query, filters: currentFilters });
- }, []); // ← empty deps array = stale closure
+ const handleSearch = useCallback((query: string) => {
+   fetchProducts({ query, filters: currentFilters });
+ }, [currentFilters]); // ← filters added to dependency array
```

**Files Modified:** `src/pages/ProductsPage/ProductsPage.tsx` — 1 line changed.
**Files Created:** None.
**Regression Impact:** The `handleSearch` callback now updates whenever `currentFilters` changes, which is the correct behavior. No other functionality is affected.

---

## Expected Output

1. **Root Cause Analysis** — specific file, specific line, precise explanation of why it fails.
2. **Targeted Fix** — minimal change (one line in this case) with diff format.
3. **Regression Impact Statement** — what was checked and confirmed unaffected.
4. **Verification** — Steps to Reproduce now produce the correct behavior after fix.

---

## Common Mistakes

| Mistake | Consequence | Prevention |
|---------|-------------|------------|
| Fixing without understanding the root cause | Different symptom, same bug — or new bug introduced | Always trace the full call chain before writing a fix |
| Refactoring the component while fixing the bug | New bugs introduced; PR scope expands unexpectedly | Fix is minimal and targeted — refactoring is a separate request |
| Not checking the regression context (PR #284) | Missing the critical clue that points to the root cause | Always read the regression context — it narrows the search space dramatically |
| Not verifying the fix with the reproduction steps | Bug submitted as fixed when it is not | Walk through every step in Steps to Reproduce after applying the fix |
| Fixing only one browser when it is cross-browser | Fix works on Chrome, fails on Firefox | Cross-browser bugs need cross-browser confirmation |
