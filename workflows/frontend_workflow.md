# Frontend Workflow

## Purpose

Define the complete, end-to-end execution sequence for building a new frontend feature from initial requirement intake through production deployment. This workflow is the primary execution path of the Enterprise Frontend AI Framework — it coordinates every agent, skill, and pipeline in the correct order to deliver a production-ready implementation.

---

## Scope

**In Scope:**
- New feature requests that require planning, implementation, review, and deployment.
- Feature enhancements that introduce new components or modify existing behavior.

**Out of Scope:**
- Design-to-code conversion without business requirements — use `figma_workflow.md`.
- Final release preparation for an already-reviewed implementation — use `release_workflow.md`.
- Bug fixes and refactors — these use targeted sub-workflows, not the full frontend workflow.

---

## Trigger

This workflow is triggered when the Orchestrator receives a request through:
- `prompt-templates/feature_request.md` — a structured new feature request.
- A direct user instruction to build a new feature or page.

---

## Preconditions

- A valid, filled `feature_request.md` has been submitted.
- All required fields (Feature Name, Business Goal, Tech Stack, Acceptance Criteria) are present.
- The project repository or codebase is accessible.

---

## Inputs

- Feature Request (from `prompt-templates/feature_request.md`)
- Project codebase access
- Design reference (optional — Figma link, mockup, or screenshot)
- Existing component library reference (optional)

---

## Outputs

- Approved Product Requirement Document (PRD)
- Approved Technical Specification
- Production-ready implementation (source code)
- QA Responsive Validation Report (APPROVED)
- QA Accessibility Validation Report (APPROVED)
- Code Review Report (APPROVED)
- UI Review Report (APPROVED — if design was provided)
- Deployment Readiness Report (AUTHORIZED)
- Unified Delivery Report

---

## Workflow Stages

### Stage 1: Requirement Analysis
Validate the incoming request. Route to the Product Manager Agent to generate a structured PRD from the feature request. All ambiguities must be resolved before proceeding.

### Stage 2: PRD Approval Gate
Present the PRD to the user. The pipeline is on hold. No technical work begins until the user explicitly approves the PRD.

### Stage 3: Application Analysis
The Solution Architect executes `website_analysis.md` and `project_research.md` to fully understand the existing codebase, component inventory, and styling system before designing anything.

### Stage 4: Technical Specification
The Solution Architect designs the complete implementation plan — component hierarchy, files to create/modify, technology stack confirmation, implementation order, and risk assessment.

### Stage 5: Tech Spec Approval Gate
Present the Technical Specification to the user. The pipeline is on hold. No code is written until the user explicitly approves the Tech Spec.

### Stage 6: Implementation
The Frontend Developer executes `implement_section.md`, writing all components, styles, and logic exactly as defined in the approved Tech Spec. If a design reference was provided, the Figma Implementer executes `figma_to_code.md` first to produce the Design Specification for the Frontend Developer.

### Stage 7: Parallel Review
Four agents run simultaneously:
- QA Engineer: `responsive.md`
- QA Engineer: `accessibility.md`
- PR Auditor: `code_review.md`
- UI Reviewer: `design_review.md` (only if design reference was provided)

### Stage 8: Review Score Aggregation
All review reports are collected and scored. The aggregated score determines the next action.

### Stage 9: Deployment Readiness
If all reviews pass, the Solution Architect executes `deployment.md` to perform final build and environment validation.

### Stage 10: Final Approval Gate
Present the Unified Delivery Report to the user. Await final deployment sign-off before authorizing release.

---

## Agent Mapping

| Stage | Agent |
|-------|-------|
| Requirement Analysis | Product Manager |
| Application Analysis | Solution Architect |
| Technical Specification | Solution Architect |
| Design Extraction | Figma Implementer (if design provided) |
| Implementation | Frontend Developer |
| Responsive Validation | QA Engineer |
| Accessibility Validation | QA Engineer |
| Code Review | PR Auditor |
| UI Review | UI Reviewer (if design provided) |
| Deployment Readiness | Solution Architect |

---

## Skill Mapping

| Stage | Skill |
|-------|-------|
| Requirement Analysis | `create_prd.md` |
| Application Analysis | `website_analysis.md`, `project_research.md` |
| Technical Specification | `create_tech_spec.md` |
| Design Extraction | `figma_to_code.md` |
| Implementation | `implement_section.md` |
| Responsive Validation | `responsive.md` |
| Accessibility Validation | `accessibility.md` |
| Code Review | `code_review.md` |
| UI Review | `design_review.md` |
| Deployment Readiness | `deployment.md` |

---

## Approval Gates

| Gate | Condition | Action |
|------|-----------|--------|
| PRD Approval | After Stage 2 | STOP. Await user explicit approval. |
| Tech Spec Approval | After Stage 5 | STOP. Await user explicit approval. |
| Final Release Sign-off | After Stage 9 | STOP. Await user explicit approval. |

---

## Decision Points

- **Has design reference?** → YES: invoke Figma Implementer before Frontend Developer. NO: Frontend Developer uses PRD + Design System only.
- **Review score >= 90?** → Proceed to Deployment Readiness.
- **Review score 75–89?** → Present to user. Await approval to continue or request fixes.
- **Review score < 75?** → Trigger Retry Logic. Route failed reports back to Frontend Developer.

---

## Error Recovery

- **PRD rejected by user:** Return to Product Manager Agent. Incorporate feedback and regenerate.
- **Tech Spec rejected by user:** Return to Solution Architect. Incorporate feedback and regenerate.
- **Review score < 75:** Spawn Frontend Developer with failed reports as context. Apply targeted fixes. Re-run failed review checks only.
- **Figma link inaccessible:** Halt Stage 6. Request valid design assets. Do not proceed with design implementation until resolved.
- **Build failure in Stage 9:** Halt. Return error to Solution Architect. Resolve before re-attempting deployment authorization.

---

## Retry Logic

- **Attempt 1:** Re-run the failed agent with the error report as additional context.
- **Attempt 2:** Escalate to a higher-reasoning model. Provide strict constraints.
- **Attempt 3:** Hard stop. Notify user. Request manual intervention.

Maximum retry attempts per agent: 3. After 3 failures, the pipeline halts with a Failure Analysis Report.

---

## Success Criteria

This workflow is considered complete when:
- PRD was approved by the user.
- Tech Spec was approved by the user.
- All implemented components match the Tech Spec.
- All four review reports return APPROVED verdicts.
- Deployment Readiness Report returns AUTHORIZED.
- User has provided final release sign-off.
- Unified Delivery Report is delivered.

---

## Handoff

Upon successful completion, the Orchestrator delivers the Unified Delivery Report to the user and enters standby: `[SYSTEM] Pipeline Execution Complete. Awaiting next command.`
