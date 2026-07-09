# Planning Pipeline

## Purpose

The Planning Pipeline is the first execution engine in the Enterprise Frontend AI Framework. Its mission is to transform an unstructured user request into two fully approved, implementation-ready documents: a Product Requirement Document (PRD) and a Technical Specification. No code is written until both documents exist and carry explicit user approval.

---

## Mission

Ensure every implementation begins with clarity. Every requirement must be understood. Every technical decision must be deliberate. Every risk must be documented before a single line of code is written.

---

## Scope

**In Scope:**
- Processing feature requests, enhancement requests, and Figma-to-code requests.
- Generating and approving the PRD.
- Analyzing the existing application structure.
- Generating and approving the Technical Specification.

**Out of Scope:**
- Writing implementation code — that is the Implementation Pipeline's responsibility.
- Running QA or review validation — that is the Review Pipeline's responsibility.
- Deployment authorization — that is the Release Pipeline's responsibility.

---

## Trigger Conditions

This pipeline is triggered when:
- A completed `feature_request.md` is submitted to the Orchestrator.
- A completed `figma_request.md` is submitted to the Orchestrator.
- The Orchestrator determines the incoming request requires planning before implementation.

This pipeline is NOT triggered for:
- Bug fixes (which skip PRD and go directly to targeted diagnosis).
- Review-only requests (which bypass planning and go directly to the Review Pipeline).

---

## Prerequisites

- A valid, fully-filled prompt template submitted (`feature_request.md` or `figma_request.md`).
- All required template fields are present — Feature Name, Business Goal, Tech Stack, Acceptance Criteria.
- Project codebase is accessible for Application Analysis.

If prerequisites are not met: the pipeline halts and requests the missing information before proceeding.

---

## Inputs

- Completed prompt template (required).
- Project codebase access (required for Application Analysis).
- Design reference (optional — Figma link, mockup, or screenshot).
- Existing project context (if provided by Orchestrator — prior analysis reports, etc.).

---

## Outputs

- Approved Product Requirement Document (PRD).
- Application Analysis Report.
- Project Research Report.
- Approved Technical Specification.

---

## Pipeline Stages

### Stage P1: Request Validation
Validate the submitted prompt template. Verify all required fields are present. If any required field is missing or vague, halt and request clarification. Do not proceed with an incomplete request.

### Stage P2: PRD Generation
Spawn the **Product Manager Agent** with `create_prd.md`. Feed the validated request. The agent parses requirements, resolves ambiguities, writes user stories, defines acceptance criteria, and produces the structured PRD.

### Stage P3: PRD Approval Gate 🛑
Present the PRD to the user. Halt the pipeline completely.
- **APPROVED:** Proceed to Stage P4.
- **REJECTED / FEEDBACK:** Return PRD to Product Manager Agent with user feedback. Regenerate. Re-present. Repeat until approved.

### Stage P4: Application Analysis
Spawn the **Solution Architect Agent** with `website_analysis.md`. Scan the existing project directory — identify tech stack, routing, component inventory, and styling system. Produce the Application Analysis Report.

### Stage P5: Project Research
Spawn the **Solution Architect Agent** with `project_research.md`. Deep-dive into the styling architecture, design tokens, utility functions, naming conventions, and existing patterns. Produce the Project Research Report.

### Stage P6: Technical Specification Generation
Spawn the **Solution Architect Agent** with `create_tech_spec.md`. Using the approved PRD, Application Analysis Report, and Project Research Report, produce the complete Technical Specification — component hierarchy, files to create/modify, implementation order, state management plan, and risk assessment.

### Stage P7: Tech Spec Approval Gate 🛑
Present the Technical Specification to the user. Halt the pipeline completely.
- **APPROVED:** Proceed to Implementation Pipeline.
- **REJECTED / FEEDBACK:** Return Tech Spec to Solution Architect with user feedback. Regenerate. Re-present. Repeat until approved.

---

## Agent Mapping

| Stage | Agent | Skill |
|-------|-------|-------|
| P2 | Product Manager | `create_prd.md` |
| P4 | Solution Architect | `website_analysis.md` |
| P5 | Solution Architect | `project_research.md` |
| P6 | Solution Architect | `create_tech_spec.md` |

---

## Skill Mapping

| Skill | Purpose |
|-------|---------|
| `create_prd.md` | Transforms user request into structured PRD. |
| `website_analysis.md` | Maps existing application structure and component inventory. |
| `project_research.md` | Documents styling tokens, utilities, and code conventions. |
| `create_tech_spec.md` | Translates PRD into implementation-ready technical blueprint. |

---

## Approval Gates

| Gate | Stage | Condition | Allowed Actions |
|------|-------|-----------|-----------------|
| PRD Approval | P3 | User reviews PRD | APPROVE (proceed) or REJECT (regenerate) |
| Tech Spec Approval | P7 | User reviews Tech Spec | APPROVE (proceed to Implementation) or REJECT (regenerate) |

The Orchestrator must receive explicit written user confirmation at each gate. Implicit or assumed approval is not accepted.

---

## Decision Logic

```
Request received
  → Validate completeness
      → Missing fields? → Request clarification. Halt.
      → Complete? → Proceed to PRD generation.

PRD generated
  → User approves? → Proceed to Application Analysis.
  → User rejects? → Incorporate feedback. Regenerate. Re-present.

Tech Spec generated
  → User approves? → Trigger Implementation Pipeline.
  → User rejects? → Incorporate feedback. Regenerate. Re-present.
```

---

## Parallel Execution

Stages P4 (Application Analysis) and P5 (Project Research) can be executed in parallel if the codebase is available. Both reports are required as inputs to Stage P6 (Tech Spec Generation), so Stage P6 cannot begin until both are complete.

---

## Retry Logic

- **PRD regeneration:** No limit — iterate until user approves.
- **Tech Spec regeneration:** No limit — iterate until user approves.
- **Application Analysis failure (inaccessible codebase):** Attempt 1: retry with corrected path. Attempt 2: request manual directory listing from user. Attempt 3: halt with error.
- **Tech Spec generation failure:** Attempt 1: re-run with clarified context. Attempt 2: escalate model. Attempt 3: halt with Failure Analysis Report.

---

## Failure Handling

- **Template validation failure:** Return structured error. List missing required fields. Do not proceed.
- **PRD cannot be generated (insufficient information):** Return error with minimum required fields. Await user input.
- **Application Analysis inaccessible:** Halt. Notify user of access error. Await resolution.
- **Tech Spec has irreconcilable PRD conflicts:** Surface the conflict explicitly in the Tech Spec's Open Questions. Halt at P7 until user resolves the conflict.

---

## Quality Gates

- PRD must have: Feature Name, Business Goal, User Stories, Acceptance Criteria, Out of Scope, Scope Classification.
- Application Analysis must have: directory tree, tech stack confirmation, component inventory, reuse opportunities.
- Tech Spec must have: all PRD requirements addressed, technology stack confirmed, implementation order defined, risk assessment complete.

---

## Success Criteria

The Planning Pipeline is considered successfully completed when:
- PRD has been generated with all required sections and approved by the user.
- Application Analysis and Project Research reports have been produced.
- Technical Specification has been generated with all PRD requirements mapped and approved by the user.
- The Implementation Pipeline has been triggered.

---

## Best Practices

- Never skip Application Analysis — even on familiar codebases. It prevents duplication and regressions.
- Write acceptance criteria at PRD stage that are directly usable as QA test cases — this saves time in the Review Pipeline.
- Tech Spec implementation order must be dependency-aware — utilities before components, shared components before page components.
- Surface all risks in the Tech Spec Risk Assessment — surprises in implementation are more expensive than acknowledged risks in planning.
