# Frontend Workflow

## Purpose

Define the complete, end-to-end execution sequence for building a new frontend feature from initial requirement intake through production deployment. This workflow is the primary execution path of the Enterprise Frontend AI Framework — it coordinates every agent, skill, and pipeline in the correct order to deliver a production-ready implementation.

*Architecture Note: All global execution rules, including Approval Gates and Hard Stop Enforcement, are managed centrally by `../ORCHESTRATOR.md`. This workflow dictates the high-level business sequence only.*

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
- `../prompt-templates/feature_request.md` — a structured new feature request.
- A direct user instruction to build a new feature or page.

---

## Preconditions

- A valid, filled `feature_request.md` has been submitted.
- All required fields (Feature Name, Business Goal, Tech Stack, Acceptance Criteria) are present.
- The project repository or codebase is accessible.

---

## Inputs

- Feature Request (from `../prompt-templates/feature_request.md`)
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
Validate the incoming request. Route to the Product Manager Agent to generate a structured PRD.

### Stage 2: Technical Specification
The Solution Architect designs the complete implementation plan.

### Stage 3: Design Specification (Mandatory)
The UI/UX Designer executes ../skills/create_design_spec.md to define the comprehensive visual language.

### Stage 4: Implementation
The Frontend Developer executes ../skills/implement_section.md following PRD + TECH_SPEC + DESIGN_SPEC exactly.

### Stage 5: Build Verification
Run compilation and build checks to ensure 0 errors.

### Stage 6: UI/UX Enhancement
Frontend Developer applies premium design touches exactly as defined in the Design Spec.

### Stage 7: Responsive Polish
Ensure mobile, tablet, and desktop layout perfection.

### Stage 8: Accessibility Polish
Implement WCAG AA compliance and ARIA labels.

### Stage 9: Animations
Add Framer Motion or CSS transitions as planned in the Design Spec.

### Stage 10: Performance Optimization
Code splitting, lazy loading, LCP optimization.

### Stage 11: QA Review
QA Engineer validates functional correctness.

### Stage 12: PR Audit
PR Auditor validates framework compliance and modularity.

### Stage 13: UI Review
UI Reviewer strictly compares Actual UI against DESIGN_SPEC for PASS/FAIL.

### Stage 14: Deployment Readiness
Solution Architect validates environment and authorizes release.

---

## Agent Mapping

| Stage | Agent |
|-------|-------|
| 1. Requirement Analysis | Product Manager |
| 2. Technical Specification | Solution Architect |
| 3. Design Specification | UI/UX Designer |
| 4. Implementation | Frontend Developer |
| 5. Build Verification | Solution Architect |
| 6. UI/UX Enhancement | Frontend Developer |
| 7. Responsive Polish | Frontend Developer / QA |
| 8. Accessibility Polish | Frontend Developer / QA |
| 9. Animations | Frontend Developer |
| 10. Performance Optimization | Solution Architect |
| 11. QA Review | QA Engineer |
| 12. PR Audit | PR Auditor |
| 13. UI Review | UI Reviewer |
| 14. Deployment Readiness | Solution Architect |

-------|-------|
| Requirement Analysis | Product Manager |
| Application Analysis | Solution Architect |
| Technical Specification | Solution Architect |
| Design Specification | UI/UX Designer |
| Implementation | Frontend Developer |
| Responsive Validation | QA Engineer |
| Accessibility Validation | QA Engineer |
| Code Review | PR Auditor |
| UI Review | UI Reviewer |
| Deployment Readiness | Solution Architect |

---

## Skill Mapping

| Stage | Skill |
|-------|-------|
| Requirement Analysis | `../skills/create_prd.md` |
| Application Analysis | `../skills/website_analysis.md`, `../skills/project_research.md` |
| Technical Specification | `../skills/create_tech_spec.md` |
| Design Specification | `../skills/create_design_spec.md` |
| Implementation | `../skills/implement_section.md` |
| Responsive Validation | `../skills/responsive.md` |
| Accessibility Validation | `../skills/accessibility.md` |
| Code Review | `../skills/code_review.md` |
| UI Review | `../skills/design_review.md` |
| Deployment Readiness | `../skills/deployment.md` |

---

## Approval Gates

*Architecture Note: All global execution rules, including Approval Gates and Hard Stop Enforcement, are managed centrally by `../ORCHESTRATOR.md`. The table below lists the handoff points.*

| Gate | Condition | Action |
|------|-----------|--------|
| PRD Approval | After Stage 2 | [Orchestrator Handoff] |
| Tech Spec Approval | After Stage 5 | [Orchestrator Handoff] |
| Design Spec Approval | After Stage 7 | [Orchestrator Handoff] |
| Final Release Sign-off | After Stage 11 | [Orchestrator Handoff] |

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

