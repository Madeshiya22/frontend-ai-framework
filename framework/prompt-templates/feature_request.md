# Feature Request Template

## Purpose

This template structures a user's request for a new frontend feature into a standardized format that the AI Orchestrator can process reliably. It ensures the Product Manager Agent receives all required business context before generating a PRD, and that the Solution Architect receives all technical constraints before designing the implementation.

---

## When to Use

**Use when:**
- Requesting a new feature, page, section, or UI component to be added to the application.
- Requesting an enhancement to an existing feature that changes its behavior or adds new functionality.
- Requesting a new user flow or user interaction pattern.

**Do NOT use when:**
- Reporting a defect in existing functionality — use `bug_fix_request.md`.
- Converting a Figma design to code — use `figma_request.md`.
- Requesting code cleanup or refactoring without new functionality — use `refactor_request.md`.
- Requesting a code or UI review of existing work — use `review_request.md`.

---

## Required Information

The following fields are mandatory. The AI will halt and request clarification if any are missing.

- **Feature Name** — A clear, descriptive name for the feature.
- **Business Goal** — Why this feature is needed. What problem does it solve? What value does it deliver?
- **Target Users** — Who will use this feature?
- **Technology Stack** — The framework, styling methodology, and state management approach for this project.
- **Functional Requirements** — What the feature must do. Be specific.
- **Acceptance Criteria** — How will you know the feature is complete? What must be verifiably true?

---

## Optional Information

Providing the following improves output quality and reduces clarification cycles.

- **Design Reference** — Figma link, mockup image, screenshot, or wireframe.
- **Existing Component Reference** — Names or paths of existing components the new feature should reuse.
- **Non-Functional Requirements** — Performance targets, browser support, accessibility level.
- **API or Data Requirements** — Endpoints, data structures, or state management considerations.
- **Deadline or Priority** — Urgency context that affects scope decisions.
- **Out of Scope** — Explicitly list anything that should NOT be included in this feature.
- **Related Features** — Any existing features that this new feature interacts with or depends on.

---

## Input Template

```
Feature Name:
[Enter a clear, descriptive name for the feature]

Business Goal:
[Explain why this feature is needed and what value it delivers]

Target Users:
[Who will use this feature and in what context?]

Technology Stack:
[Framework, styling methodology, state management approach]

Functional Requirements:
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

Non-Functional Requirements:
- Responsive: [Yes / No — specify breakpoints if yes]
- Accessibility: [WCAG AA / WCAG AAA / None specified]
- Performance: [Any specific performance requirements?]

Acceptance Criteria:
1. [Criterion 1 — must be testable and measurable]
2. [Criterion 2]
3. [Criterion 3]

Design Reference:
[Figma link / mockup / screenshot / None]

Existing Components to Reuse:
[Component names or file paths / None known]

Out of Scope:
[List anything that should NOT be built in this request]

Additional Context:
[Any other relevant information]
```

---

## AI Instructions

When processing this template, the AI Orchestrator must:

1. **Analyze completeness first.** Before routing to any agent, verify all required fields are filled. If any required field is missing or too vague, request clarification — do not proceed with assumptions.

2. **Route to the correct pipeline.** This template always triggers the Planning Pipeline: Product Manager Agent → Solution Architect Agent → Frontend Developer Agent.

3. **Load the correct skill sequence.** `create_prd.md` → `website_analysis.md` → `project_research.md` → `create_tech_spec.md` → `implement_section.md`.

4. **Do not begin implementation immediately.** The PRD must be generated and approved before any technical work starts. The Tech Spec must be approved before any code is written.

5. **Technology agnosticism.** The selected technology stack must be respected throughout the pipeline. Never default to a specific framework if a different one is defined.

6. **Never expand scope.** Implement exactly what is requested. The Out of Scope section is a hard boundary.

7. **Treat acceptance criteria as QA test conditions.** The QA Engineer will use these directly — they must be specific and testable.

---

## Validation Checklist

Before routing this request to the pipeline, verify:
- [ ] Feature Name is present and descriptive.
- [ ] Business Goal is specific — not just "improve UX."
- [ ] Target Users are identified.
- [ ] Technology Stack is defined.
- [ ] At least one Functional Requirement is listed.
- [ ] At least one Acceptance Criterion is present and testable.
- [ ] The request is clearly a new feature — not a bug fix, refactor, or review.

If any required field is empty or vague: halt and request the missing information before proceeding.

---

## Expected Output

Processing this template through the full pipeline produces:
1. **Product Requirement Document (PRD)** — Generated by the Product Manager Agent.
2. **Technical Specification** — Generated by the Solution Architect Agent.
3. **Implementation** — Produced by the Frontend Developer Agent.
4. **QA Reports** — Responsive and Accessibility validation.
5. **Code Review Report** — PR Auditor audit.
6. **UI Review Report** — If a design reference was provided.
7. **Deployment Readiness Report** — Final release authorization.

---

## Constraints

- NEVER begin implementation before the PRD is approved.
- NEVER begin implementation before the Tech Spec is approved.
- NEVER implement functionality not listed in the Functional Requirements.
- NEVER modify files outside the scope defined in the Tech Spec.
- NEVER ignore the technology stack — adapt all output to the selected stack.
- NEVER assume missing acceptance criteria — request them.

---

## Best Practices

- Write acceptance criteria from the perspective of a QA tester — "Given X, when Y, then Z."
- Provide a design reference whenever possible — it reduces ambiguity and review cycles.
- Be specific in functional requirements — "the button shows a loading state during submission" is better than "the form submits."
- Define Out of Scope explicitly — it prevents scope creep more effectively than any other practice.
- If the feature interacts with an existing feature, name it — the Solution Architect needs to know about dependencies.

---

## Example Request

```
Feature Name:
User Notification Center

Business Goal:
Users need a way to see all system notifications in one place to avoid missing important updates.

Target Users:
Logged-in users of the SaaS dashboard application.

Technology Stack:
React with TypeScript, CSS Modules for styling, React Context for state management.

Functional Requirements:
1. Display a notification bell icon in the top navigation bar.
2. Show an unread count badge on the bell icon when there are unread notifications.
3. Open a dropdown panel listing notifications when the bell is clicked.
4. Each notification shows a title, description, and timestamp.
5. Mark individual notifications as read on click.
6. Include a "Mark all as read" button.

Non-Functional Requirements:
- Responsive: Yes — Mobile (375px), Tablet (768px), Desktop (1440px)
- Accessibility: WCAG AA
- Performance: Dropdown must open in under 100ms

Acceptance Criteria:
1. The bell icon is visible in the navigation bar at all breakpoints.
2. The unread badge displays the correct count and disappears when all notifications are read.
3. The dropdown panel opens on bell click and closes on click-outside or Escape key.
4. Clicking a notification marks it as read and updates the badge count.
5. "Mark all as read" marks all notifications as read in one action.
6. Keyboard navigation works: Tab to bell, Enter/Space to open, Escape to close.

Design Reference:
https://figma.com/example-notification-center

Existing Components to Reuse:
Navbar component (src/components/Navbar), Badge component (src/components/Badge)

Out of Scope:
- Notification settings or preferences page.
- Push notification support.
- Real-time WebSocket integration (static data only for now).
```

---

## Success Criteria

The Orchestrator considers this template successfully processed when:
- All required fields were present and validated.
- The pipeline was correctly routed to the Planning Pipeline.
- A PRD was generated and approved by the user.
- A Tech Spec was generated and approved by the user.
- Implementation, QA, Review, and Deployment phases completed with APPROVED verdicts.
