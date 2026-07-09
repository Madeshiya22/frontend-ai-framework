# Implementation Pipeline

## Purpose

The Implementation Pipeline is the code execution engine of the Enterprise Frontend AI Framework. It receives the approved Technical Specification and Design Specification (if applicable) and orchestrates the Frontend Developer Agent to produce production-ready source code. This pipeline runs between the Planning Pipeline (which produces specifications) and the Review Pipeline (which validates the output).

---

## Mission

Translate approved, human-reviewed specifications into clean, modular, accessible, and responsive frontend code — with zero scope deviation, zero destructive changes to unrelated files, and zero silent assumptions.

---

## Scope

**In Scope:**
- Creating new components, pages, and utilities as defined in the Tech Spec.
- Modifying existing files as defined in the Tech Spec.
- Applying design tokens and Design System guidelines.
- Implementing responsive behavior and accessibility attributes.

**Out of Scope:**
- Generating PRDs or Technical Specifications — that is the Planning Pipeline's responsibility.
- Running QA validation or code reviews — that is the Review Pipeline's responsibility.
- Deployment authorization — that is the Release Pipeline's responsibility.
- Making architectural decisions not defined in the Tech Spec.

---

## Trigger Conditions

This pipeline is triggered when:
- The Planning Pipeline has produced an approved Technical Specification.
- The Orchestrator receives an explicit instruction to begin implementation after Tech Spec approval.
- A re-implementation is ordered after a review failure in the Review Pipeline.

This pipeline is NOT triggered for:
- Bug fixes (targeted sub-process — not full implementation).
- Refactors (targeted sub-process — not full implementation).
- Review-only requests.

---

## Prerequisites

- Approved Technical Specification (required — must carry explicit user approval).
- Application Analysis Report (required — for component reuse decisions).
- Project Research Report (required — for styling consistency).
- Design Specification Document (required if design was provided; waived if no design was in scope).
- Project codebase access (required).

If the Tech Spec is missing or unapproved: halt immediately. Return to Planning Pipeline.

---

## Inputs

- Approved Technical Specification (required).
- Application Analysis Report (required).
- Project Research Report (required).
- Design Specification Document (optional — required if design source was provided).
- Design System guidelines (`../overview/DESIGN_SYSTEM.md`) (required).
- Project codebase (required).

---

## Outputs

- New source files as defined in Tech Spec "Files to Create."
- Modified source files as defined in Tech Spec "Files to Modify."
- Implementation Summary (files created, files modified, components reused, deviations documented).

---

## Pipeline Stages

### Stage I1: Prerequisite Verification
Verify all required inputs are present and approved. If the Tech Spec is missing, unapproved, or incomplete, halt and return to the Planning Pipeline. Do not begin implementation without a fully approved Tech Spec.

### Stage I2: Context Loading
Load the Application Analysis Report and Project Research Report into the Frontend Developer Agent's context. This ensures the agent understands what already exists before writing new code.

### Stage I3: Design Specification Loading (Conditional)
If a design source was provided, load the Design Specification Document. If no design was provided, the agent implements using PRD functional requirements and Design System guidelines only.

### Stage I4: Implementation Execution
Spawn the **Frontend Developer Agent** with `implement_section.md`. The agent follows the Tech Spec's defined implementation order:
1. Base utilities and helpers (if any).
2. Shared/reusable components.
3. Feature-specific components.
4. Page or view assembly.
5. State management and data integration.

### Stage I5: Self-Validation
The Frontend Developer Agent runs its internal Validation Checklist before producing the Implementation Summary. Verifies: all Tech Spec files created, no out-of-scope files modified, design tokens used, accessibility attributes present, responsiveness implemented.

### Stage I6: Implementation Summary Generation
Produce the Implementation Summary: all files created (with paths), all files modified (with descriptions), all components reused (with paths), and any deviations from the Tech Spec with justification.

### Stage I7: Handoff to Review Pipeline
Submit the implementation output and Implementation Summary to the Orchestrator. Auto-proceed to the Review Pipeline. No user approval gate at this stage.

---

## Agent Mapping

| Stage | Agent | Skill |
|-------|-------|-------|
| I3 (conditional) | Figma Implementer | `figma_to_code.md` (if re-extraction needed) |
| I4–I6 | Frontend Developer | `implement_section.md` |

---

## Skill Mapping

| Skill | Purpose |
|-------|---------|
| `implement_section.md` | Writes all components, styles, and logic per Tech Spec. |
| `figma_to_code.md` | Re-invoked only if Design Spec needs supplemental extraction. |

---

## Approval Gates

| Gate | Condition |
|------|-----------|
| Entry Gate | Tech Spec must be approved before pipeline begins. |
| No mid-pipeline gate | Implementation proceeds automatically once started. |
| Exit | Automatically routes to Review Pipeline on completion. |

There is no user approval gate within the Implementation Pipeline. The user approves at the Tech Spec level (Planning Pipeline) and the final delivery level (Release Pipeline).

---

## Decision Logic

```
Tech Spec approved?
  → NO: Halt. Return to Planning Pipeline.
  → YES: Load context. Begin implementation.

Design Specification available?
  → YES: Load it. Frontend Developer uses design tokens as visual authority.
  → NO: Frontend Developer implements from PRD requirements and Design System.

Self-validation passes?
  → YES: Generate Implementation Summary. Route to Review Pipeline.
  → NO: Flag failures internally. Attempt correction. Re-validate.
```

---

## Parallel Execution

Stage I4 does not support internal parallelism — components must be implemented in dependency order (utilities → shared → feature → page). This ensures each component can reference previously created dependencies without missing imports.

---

## Retry Logic

- **Implementation self-validation failure:** Attempt 1: the agent corrects the flagged issue inline. Attempt 2: re-run implementation of the failed component with error context. Attempt 3: halt with Failure Analysis Report.
- **Missing dependency discovered mid-implementation:** Halt. Escalate to Solution Architect for Tech Spec amendment. Await updated spec before continuing.
- **Ambiguous Tech Spec detail discovered:** Halt. Flag the ambiguity. Route to Solution Architect. Await clarification. Do not assume.

---

## Failure Handling

- **Tech Spec missing:** Return error: "Implementation Pipeline cannot begin without an approved Technical Specification."
- **Codebase inaccessible:** Halt. Notify user. Await resolution.
- **Tech Spec requires modifying a file that would cause irreversible regressions:** Halt. Flag the risk. Escalate to Solution Architect and user before proceeding.
- **Design token missing from project Design System:** Flag in Implementation Summary. Use nearest semantic equivalent. Alert UI Reviewer to verify.

---

## Quality Gates

Before routing to Review Pipeline, verify:
- [ ] All "Files to Create" from Tech Spec exist.
- [ ] All "Files to Modify" from Tech Spec have been updated.
- [ ] No files outside the Tech Spec scope were touched.
- [ ] Implementation Summary is complete.
- [ ] No hardcoded design values — tokens used throughout.

---

## Success Criteria

The Implementation Pipeline is considered successfully completed when:
- All components from the Tech Spec are implemented.
- Implementation Summary is delivered and accurate.
- No out-of-scope files were modified.
- The Review Pipeline has been triggered automatically.

---

## Best Practices

- Load context before writing — the agent must read the codebase before writing a single line.
- Implement in dependency order — never write a component that depends on another component that hasn't been created yet.
- One component at a time — don't implement the entire feature as a monolithic block.
- Flag every deviation — silent deviations from the Tech Spec are more damaging than acknowledged ones.
