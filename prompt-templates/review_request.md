# Review Request Template

## Purpose

This template structures a request to review an existing frontend implementation — either the code quality, the visual UI accuracy, the accessibility compliance, or the responsive behavior — without triggering a new implementation cycle. It routes the request to the correct specialist agent and produces a structured, actionable report.

---

## When to Use

**Use when:**
- An implementation has been completed and you want an independent quality audit before releasing it.
- You want to validate a specific component's code against the project's architecture standards.
- You want to verify a UI implementation against a design reference without full re-implementation.
- You want to check accessibility or responsive compliance on an existing component.
- You want a pre-merge code review on a specific set of files.

**Do NOT use when:**
- The implementation has not been delivered yet — use `feature_request.md` or `figma_request.md` to trigger implementation first.
- You are reporting a defect — use `bug_fix_request.md`.
- You want to refactor code without a prior audit — use `refactor_request.md`.
- You want a full pipeline run from requirements to deployment — use `feature_request.md`.

---

## Required Information

The following fields are mandatory. The AI will halt and request clarification if any are missing.

- **Target Component or Page** — The specific component, page, or file to be reviewed.
- **Review Type** — What kind of review is requested (one or more): Code Quality, UI/Design Accuracy, Accessibility, Responsive Behavior.
- **Technology Stack** — The framework and environment in which the code was written.

---

## Optional Information

Providing the following improves the precision and depth of the review.

- **Related PRD or Tech Spec** — The specification document that defines correct behavior (used as the evaluation standard).
- **Design Reference** — Figma link, mockup, or Design Specification Document (required for UI/Design Accuracy reviews).
- **Specific Concerns** — Particular areas to focus on: performance, state management, ARIA usage, mobile layout, token usage, etc.
- **Breakpoints to Test** — If requesting a responsive review, specify which breakpoints to validate.
- **Architecture Standard** — Reference to `overview/ARCHITECTURE.md` section or specific pattern to evaluate against.
- **Known Issues** — Any problems you already suspect — helps the reviewer focus attention efficiently.
- **Scope Exclusions** — Any files or areas explicitly out of scope for this review.

---

## Input Template

```
Target Component or Page:
[Component name, page name, or file path(s)]
Example: src/components/Sidebar/Sidebar.vue

Review Type (select all that apply):
[ ] Code Quality & Architecture
[ ] UI / Design Accuracy
[ ] Accessibility (WCAG AA)
[ ] Responsive Behavior

Technology Stack:
[Framework, styling methodology, state management approach]

Related PRD or Tech Spec:
[Document link or name / None]

Design Reference (for UI Review):
[Figma link / Design Specification Document / mockup file / None — not applicable]

Specific Concerns:
[List any particular areas to focus on]
Examples:
- Separation of concerns in component logic
- Correct usage of ARIA roles for the dropdown menu
- Mobile layout at 375px — suspected overflow issue
- Color token usage vs hardcoded values

Breakpoints to Test (for Responsive Review):
[List specific breakpoints / Use project defaults]
Example:
- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px

Architecture Standard to Evaluate Against:
[ARCHITECTURE.md section reference / None specified]

Known Issues or Suspicions:
[Describe any issues you already suspect / None]

Scope Exclusions:
[List any files or areas explicitly out of scope / None]

Additional Context:
[Any other relevant information]
```

---

## AI Instructions

When processing this template, the AI Orchestrator must:

1. **Route to the correct specialist agent(s)** based on the Review Type selected:
   - Code Quality → PR Auditor Agent using `code_review.md`.
   - UI / Design Accuracy → UI Reviewer Agent using `design_review.md`.
   - Accessibility → QA Engineer Agent using `accessibility.md`.
   - Responsive Behavior → QA Engineer Agent using `responsive.md`.
   - Multiple types selected → Spawn the appropriate agents in parallel.

2. **Verify prerequisites before routing.** A UI Review requires a design reference — if none is provided, halt and request it. Do not attempt a UI review without a design standard to compare against.

3. **Focus on stated concerns first.** If Specific Concerns are listed, address them explicitly in the report alongside the standard audit criteria.

4. **Reference the PRD or Tech Spec as the behavioral authority.** If behavior is ambiguous, the PRD defines what is correct — not the developer's implementation.

5. **Technology agnosticism.** Evaluate code within the context of the specified technology stack. Do not critique framework-specific patterns that are correct for the chosen stack.

6. **Produce actionable findings only.** Every finding must have a specific file reference, severity, and a concrete recommendation. Vague findings ("this could be better") are not acceptable.

7. **Do not implement fixes.** This template produces reports — not code. If fixes are needed, a follow-up `bug_fix_request.md` or `refactor_request.md` should be submitted.

---

## Validation Checklist

Before routing this request to the pipeline, verify:
- [ ] Target Component or Page is specific (file path or component name).
- [ ] At least one Review Type is selected.
- [ ] Technology Stack is defined.
- [ ] If UI Review is selected: a design reference is provided.
- [ ] If Responsive Review is selected: breakpoints are defined or project defaults are confirmed.

If UI Review is requested without a design reference: halt and request the design source.

---

## Expected Output

Based on the Review Type(s) selected, the pipeline produces one or more of:
1. **Code Review Report** (Code Quality) — Architecture compliance, separation of concerns, naming, dead code, performance risks. Score out of 100.
2. **UI Review Report** (Design Accuracy) — Component-by-component comparison against design with expected vs. actual values. Score out of 100.
3. **Accessibility Validation Report** (Accessibility) — WCAG AA criterion-by-criterion results. Score out of 100.
4. **Responsive Validation Report** (Responsive) — Breakpoint-by-breakpoint layout results. Score out of 100.

Each report includes:
- Findings list with severity, file reference, and remediation recommendation.
- Final APPROVED or REJECTED verdict.

---

## Constraints

- NEVER write or modify code as part of a review — produce reports only.
- NEVER approve a component with a Critical finding in any report.
- NEVER conduct a UI review without a design reference.
- NEVER evaluate code based on personal preference — all findings must reference the architecture standard or WCAG criteria.
- NEVER scope the review beyond the files listed in the Target.
- NEVER conflate different review types — code quality, UI accuracy, accessibility, and responsiveness are separate concerns and separate reports.

---

## Best Practices

- Select the most relevant Review Type(s) — requesting all four for a simple component creates unnecessary overhead.
- Provide the PRD or Tech Spec link whenever possible — it is the single most impactful context for a code review.
- List Known Issues or Suspicions — focused reviewer attention produces faster, higher-quality findings.
- For accessibility reviews, specify the WCAG level (AA is the standard minimum).
- If you are requesting this review before a pull request merge, mention it — the PR Auditor will frame findings with that context.

---

## Example Request

```
Target Component or Page:
src/components/PricingTable/PricingTable.tsx
src/components/PricingTable/PricingTable.module.css

Review Type:
[x] Code Quality & Architecture
[x] UI / Design Accuracy
[x] Accessibility (WCAG AA)
[ ] Responsive Behavior

Technology Stack:
Next.js with TypeScript, CSS Modules, no external state management.

Related PRD or Tech Spec:
Pricing Table Feature — Tech Spec v1.2 (docs/tech-specs/pricing-table.md)

Design Reference:
https://figma.com/pricing-table-final-v2

Specific Concerns:
- The "Featured Plan" card uses an inline style for the gradient border. Suspect this should use a CSS Module class.
- The toggle between Monthly/Annual pricing uses local state. PRD specifies it should persist in URL query params.
- The "Get Started" buttons may be missing aria-label for screen readers (they have identical visible text for each plan).

Breakpoints to Test:
Not requested — responsive review is out of scope for this request.

Architecture Standard to Evaluate Against:
ARCHITECTURE.md — "No inline styles. All components must use CSS Module classes."

Known Issues or Suspicions:
- Inline gradient style on the featured card (see Specific Concerns).
- Missing URL persistence for the pricing toggle.
- Possible ARIA issue on CTA buttons.

Scope Exclusions:
The parent PricingPage.tsx is explicitly out of scope. Review the PricingTable component only.

Additional Context:
This component will be used in both the Marketing Site and the SaaS onboarding flow. Reusability is important — the component should not depend on any page-level context.
```

---

## Success Criteria

The Orchestrator considers this template successfully processed when:
- The correct specialist agent(s) were invoked based on Review Type.
- All selected review types produced a structured report with a verdict.
- All specific concerns listed by the user were explicitly addressed in the report.
- Every finding has a file reference, severity, and remediation recommendation.
- The user receives a clear picture of whether the component is production-ready or requires remediation.
