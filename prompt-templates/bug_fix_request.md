# Bug Fix Request Template

## Purpose

This template structures a defect report into a standardized format that gives the AI Orchestrator and the assigned agents everything needed to diagnose, reproduce, and fix a bug in the frontend application — without guesswork, scope ambiguity, or unintended side effects.

---

## When to Use

**Use when:**
- An existing feature is not behaving as specified in its PRD or acceptance criteria.
- A visual defect has been identified in a deployed or staged UI.
- A console error, runtime exception, or broken interaction has been reported.
- A regression has been introduced — an existing working feature is now broken.

**Do NOT use when:**
- You are requesting a new feature — use `feature_request.md`.
- You want to refactor code that is functionally correct — use `refactor_request.md`.
- You want a visual improvement that was not in the original design — use `feature_request.md`.
- You are reporting a design-to-code deviation without an error — use `review_request.md`.

---

## Required Information

The following fields are mandatory. The AI will halt and request clarification if any are missing.

- **Issue Title** — A short, descriptive title identifying the bug.
- **Issue Description** — A clear explanation of what is wrong and why it is a problem.
- **Steps to Reproduce** — A numbered list of exact steps to reproduce the issue.
- **Expected Behavior** — What should happen according to the PRD, design, or reasonable expectation.
- **Actual Behavior** — What actually happens instead.
- **Affected Component or Page** — The specific component, page, or file where the bug occurs.
- **Technology Stack** — The framework and environment where the bug occurs.

---

## Optional Information

Providing the following accelerates diagnosis and reduces resolution time.

- **Error Logs or Console Output** — Any JavaScript errors, stack traces, or network errors.
- **Screenshot or Screen Recording** — Visual evidence of the bug.
- **Browser and Device** — The browser name, version, and device type where the issue was observed.
- **Severity** — Critical (blocks usage), High (major UX defect), Medium (noticeable but workaround exists), Low (minor visual issue).
- **Related PRD or Tech Spec** — Reference to the original specification that defines the correct behavior.
- **Regression Context** — If this worked before, what changed? (Last known good commit, recent deployment, etc.)
- **Related Test Case** — If a QA test case covers this behavior, reference it.

---

## Input Template

```
Issue Title:
[Short, descriptive title of the bug]

Issue Description:
[Clear explanation of what is wrong and why it is a problem]

Affected Component or Page:
[Component name, page name, or file path]

Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]
[Continue as needed]

Expected Behavior:
[What should happen according to the specification or design]

Actual Behavior:
[What actually happens instead]

Technology Stack:
[Framework, styling methodology, and any relevant dependencies]

Severity:
[Critical / High / Medium / Low]

Error Logs or Console Output:
[Paste error messages, stack traces, or network errors / None]

Screenshot or Recording:
[Attach file or describe visual defect / None]

Browser and Device:
[Browser name + version, device type / Not specified]

Regression Context:
[Did this work before? What changed? / Not a regression / Unknown]

Related PRD or Tech Spec:
[Reference document link or name / None]

Additional Context:
[Any other relevant information]
```

---

## AI Instructions

When processing this template, the AI Orchestrator must:

1. **Verify reproducibility first.** Confirm that the Steps to Reproduce are complete and unambiguous before attempting diagnosis. If the steps are unclear, request clarification.

2. **Identify the root cause before producing a fix.** Do not immediately write code. First analyze the affected component, the expected behavior, and the divergence.

3. **Scope the fix narrowly.** The fix must address only the reported issue. It must not refactor, reformat, or modify unrelated code.

4. **Verify the fix does not introduce regressions.** For any file modified, assess whether the change could affect adjacent functionality.

5. **Reference the original specification.** If a PRD or Tech Spec is referenced, use it as the authority on the correct behavior — not the developer's interpretation.

6. **Technology agnosticism.** Diagnose and fix within the context of the specified technology stack.

7. **Do not scope-creep.** If additional issues are discovered during diagnosis, document them separately — do not fix them in this request without explicit user approval.

---

## Validation Checklist

Before routing this request to the pipeline, verify:
- [ ] Issue Title is present and specific.
- [ ] Steps to Reproduce are numbered and complete.
- [ ] Expected Behavior is clearly stated.
- [ ] Actual Behavior is clearly stated (not the same as Expected Behavior).
- [ ] Affected Component or Page is identified.
- [ ] Technology Stack is defined.
- [ ] Severity is classified.

If Steps to Reproduce are missing or the Expected vs. Actual behaviors are identical: halt and request clarification.

---

## Expected Output

Processing this template through the pipeline produces:
1. **Root Cause Analysis** — Explanation of why the bug occurs at the code level.
2. **Fix Implementation** — Targeted code changes that resolve the issue.
3. **Regression Impact Assessment** — Confirmation that adjacent features are unaffected.
4. **QA Verification** — Confirmation that the fix resolves the reported issue and does not introduce new failures.
5. **Code Review Report** — PR Auditor confirms the fix follows architecture standards.

---

## Constraints

- NEVER modify files outside the scope of the reported bug.
- NEVER refactor code while fixing a bug — fixes must be minimal and targeted.
- NEVER assume the correct behavior — reference the PRD, Tech Spec, or design specification.
- NEVER introduce new features or improvements alongside a bug fix.
- NEVER close the bug without verifying reproduction steps pass after the fix.
- NEVER ignore error logs if provided — they are the primary diagnostic input.

---

## Best Practices

- Severity classification determines urgency: Critical bugs halt the pipeline and require immediate resolution; Low bugs can be batched.
- Always provide the exact error message — "it breaks" is not a diagnostic input.
- Include browser and device information — many bugs are environment-specific.
- If the issue is a regression, state what changed — this narrows the fix scope dramatically.
- A narrow, precise fix is always better than a broad refactor — resist the urge to clean up while fixing.

---

## Example Request

```
Issue Title:
Mobile navigation menu does not close after selecting a link

Issue Description:
On mobile viewports, clicking a navigation link navigates to the correct page but the hamburger menu remains open. Users must manually close it by tapping the hamburger icon again.

Affected Component or Page:
MobileNavigation component (src/components/MobileNavigation)

Steps to Reproduce:
1. Open the application on a mobile device or browser at 375px width.
2. Tap the hamburger icon to open the navigation menu.
3. Tap any navigation link (e.g., "About", "Pricing").
4. Observe that the page navigates correctly but the menu remains open.

Expected Behavior:
Clicking a navigation link should navigate to the selected page AND close the mobile navigation menu.

Actual Behavior:
The navigation menu stays open after a link is clicked. It must be manually closed.

Technology Stack:
Next.js with TypeScript, Tailwind CSS, no external state management library.

Severity:
High

Error Logs or Console Output:
None — no console errors observed.

Screenshot or Recording:
[Screen recording attached showing the menu staying open]

Browser and Device:
Chrome 124 on iPhone 14 (375px). Also reproduced on Firefox mobile.

Regression Context:
This was working correctly before the navigation refactor in last sprint. The menu state management was moved from local component state to a shared layout state.

Related PRD or Tech Spec:
Mobile Navigation Tech Spec — MobileNavigation.md

Additional Context:
The menu open/close state is now managed by a Layout-level context provider (src/context/NavigationContext.tsx). The link click handler likely does not call the close function from context.
```

---

## Success Criteria

The Orchestrator considers this template successfully processed when:
- Root cause was identified and explained.
- A targeted fix was implemented without modifying unrelated files.
- QA verification confirms the bug is resolved using the original reproduction steps.
- Regression assessment confirms no adjacent features were affected.
- Code Review returns APPROVED.
