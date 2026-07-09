# Figma Workflow

## Purpose

Define the complete execution sequence for converting a design source — Figma file, mockup, screenshot, or wireframe — into a pixel-perfect, production-ready frontend implementation. This workflow is the primary path when the visual design is the driving input and business requirements are either already understood or secondary.

---

## Scope

**In Scope:**
- Converting Figma designs, mockups, screenshots, and wireframes to frontend code.
- Extracting design tokens, layout specifications, and interaction states.
- Implementing responsive layouts across all defined breakpoints.
- Validating implementation against the design source.

**Out of Scope:**
- Defining new business requirements — use `frontend_workflow.md` if a PRD is needed first.
- Backend or API integration (unless design includes data-driven components).
- Creating a new design system from scratch — the existing project's Design System is the token source.

---

## Trigger

This workflow is triggered when the Orchestrator receives:
- A completed `figma_request.md` prompt template.
- A direct request to convert a design file to code.
- The Orchestrator determines the primary input is visual rather than a business requirement.

---

## Preconditions

- A design source is accessible: Figma link (with view permission), exported assets, or uploaded mockup images.
- The technology stack for implementation is defined.
- The responsive breakpoints are defined (or project defaults are confirmed).
- The project codebase is accessible for component reuse analysis.

If the design source is inaccessible: the workflow halts immediately and requests valid assets.

---

## Inputs

- Design source: Figma link / exported assets / mockup images (required).
- Technology stack definition (required).
- Defined breakpoints (required or confirmed as project defaults).
- Approved Tech Spec or component list (optional — if planning was done first).
- Existing component library reference (optional).
- Design token file path (optional — for token mapping).

---

## Outputs

- Design Specification Document (all tokens, layouts, typography, interaction states per breakpoint).
- Production-ready implementation (markup, styles, logic).
- Responsive Validation Report (APPROVED).
- Accessibility Validation Report (APPROVED).
- UI Review Report — design-to-code pixel accuracy (APPROVED).
- Code Review Report (APPROVED).
- Implementation Summary.

---

## Workflow Stages

### Stage F1: Design Source Validation
Verify the design source is accessible and contains the target views. If the Figma link is broken or assets are missing, halt immediately. Request valid design assets before proceeding.

### Stage F2: Application Analysis
Spawn the **Solution Architect Agent** with `website_analysis.md` to identify existing components, styling system, and project structure. This prevents duplication and ensures new code integrates consistently.

### Stage F3: Design Specification Extraction
Spawn the **Figma Implementer Agent** with `figma_to_code.md`. Extract all design tokens (colors, typography, spacing, radii, shadows), layout specifications, responsive behavior per breakpoint, and interaction states. Produce the complete Design Specification Document.

### Stage F4: Component Mapping
Within Stage F3, map every design component to its code counterpart. Components that already exist in the codebase are marked for reuse. New components are named following project conventions and scheduled for creation.

### Stage F5: Implementation
Spawn the **Frontend Developer Agent** with `implement_section.md`. Using the Design Specification Document as the visual source of truth and the Application Analysis for reuse context, implement all defined components at all defined breakpoints.

### Stage F6: Parallel Validation
Spawn four agents simultaneously:
- **QA Engineer** → `responsive.md` (all breakpoints)
- **QA Engineer** → `accessibility.md` (WCAG AA)
- **PR Auditor** → `code_review.md` (architecture compliance)
- **UI Reviewer** → `design_review.md` (pixel accuracy vs. Design Spec)

### Stage F7: Score Aggregation and Decision
Collect all four reports. Aggregate scores. Apply decision logic.

### Stage F8: Delivery
If all reports are APPROVED, compile the Unified Delivery Report and route to the Release Pipeline for final deployment authorization.

---

## Agent Mapping

| Stage | Agent | Role |
|-------|-------|------|
| F2 | Solution Architect | Application and component analysis |
| F3–F4 | Figma Implementer | Design token extraction, component mapping |
| F5 | Frontend Developer | Code implementation |
| F6 | QA Engineer (×2) | Responsive and accessibility validation |
| F6 | PR Auditor | Code quality and architecture review |
| F6 | UI Reviewer | Design-to-code pixel accuracy review |

---

## Skill Mapping

| Stage | Skill |
|-------|-------|
| F2 | `website_analysis.md` |
| F3–F4 | `figma_to_code.md` |
| F5 | `implement_section.md` |
| F6 | `responsive.md`, `accessibility.md`, `code_review.md`, `design_review.md` |

---

## Approval Gates

This workflow does not require a PRD or Tech Spec approval gate because the design source serves as the specification. However:

| Gate | Condition | Action |
|------|-----------|--------|
| Design Source Validation | Stage F1 | HALT if design is inaccessible. Request valid assets. |
| Review Score Gate | Stage F7 | Score < 90 → fixes required before delivery. |
| Final Release Sign-off | Release Pipeline | STOP. Await user approval before deployment. |

---

## Decision Points

- **Design source accessible?** → NO: halt. Request valid assets. YES: proceed.
- **Component exists in codebase?** → YES: reuse. NO: create new following project conventions.
- **Interaction state defined in design?** → YES: implement. NO: flag as "not specified" — do not invent.
- **Review score >= 90?** → Proceed to Release Pipeline.
- **Review score 75–89?** → Present to user. Await approval to continue or fix.
- **Review score < 75?** → Route failed reports to Frontend Developer. Apply fixes. Re-run failed checks.

---

## Error Recovery

- **Figma link inaccessible:** Halt at F1. Request valid assets. Do not estimate or invent values.
- **Missing breakpoint in design:** Flag in Design Specification as "not provided." Request from user. Do not invent.
- **Design value conflicts with existing token system:** Flag the new token. Alert Solution Architect to add it to the Design System before implementation proceeds.
- **UI Review fails (score < 75):** Route the specific deviations back to the Frontend Developer. Apply precise visual corrections. Re-run UI Review only.
- **Accessibility Critical failure:** Route back to Frontend Developer with the specific WCAG violations. Fix. Re-run Accessibility Validation only.

---

## Retry Logic

- **Stage F3 (extraction failure):** Retry with clearer asset format. Attempt 2: request exported layers. Attempt 3: halt with error.
- **Stage F5 (implementation failure):** Attempt 1: re-run with clarified context. Attempt 2: escalate model. Attempt 3: halt.
- **Stage F6 (review failure):** Route specific failures back to Frontend Developer. Re-run only the failed checks — not the full review set.

Maximum retries per agent: 3. After 3 failures, halt with Failure Analysis Report.

---

## Success Criteria

This workflow is considered complete when:
- Design source was accessible and the Design Specification Document was produced.
- All defined components are implemented at all defined breakpoints.
- No design values were invented — all extracted from the source.
- All four review reports return APPROVED verdicts.
- Release Pipeline returns AUTHORIZED.
- User provides final deployment sign-off.

---

## Handoff

Upon successful completion, the Implementation Summary and all review reports are compiled into the Unified Delivery Report. The Orchestrator routes to the Release Pipeline for final sign-off and then enters standby: `[SYSTEM] Figma Workflow Complete. Awaiting next command.`
