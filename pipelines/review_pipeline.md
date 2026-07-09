# Review Pipeline

## Purpose

The Review Pipeline is the quality enforcement engine of the Enterprise Frontend AI Framework. It receives the implementation output from the Implementation Pipeline and runs four independent, parallel validation processes — responsive behavior, accessibility compliance, code quality, and UI design accuracy — before authorizing the implementation to proceed to the Release Pipeline.

---

## Mission

Guarantee that no implementation reaches production without passing every quality gate. Parallelism ensures speed. Aggregated scoring ensures objectivity. Strict thresholds ensure consistency.

---

## Scope

**In Scope:**
- Responsive validation across all defined breakpoints.
- Accessibility validation against WCAG AA criteria.
- Code quality audit against architecture standards.
- UI accuracy validation against the approved design specification.

**Out of Scope:**
- Writing or modifying code — this pipeline produces reports, not implementations.
- Planning or specification — that is the Planning Pipeline's responsibility.
- Deployment authorization — that is the Release Pipeline's responsibility.
- Business requirement validation — that is the PRD and Tech Spec's responsibility.

---

## Trigger Conditions

This pipeline is triggered when:
- The Implementation Pipeline delivers implementation output and an Implementation Summary.
- The Orchestrator auto-proceeds from the Implementation Pipeline.
- A re-review is required after targeted fixes from a previous review rejection.

This pipeline is NOT triggered for:
- Planning activities.
- Deployment-only checks.
- Review-only requests without new implementation (those use specific skills directly).

---

## Prerequisites

- Implementation output: all files from Implementation Summary (required).
- Approved Technical Specification (required — for scope compliance and component reference).
- Approved PRD (required — for acceptance criteria and behavioral reference).
- Design Specification Document (required for UI Review; waived if no design was provided).
- Architecture guidelines (`overview/ARCHITECTURE.md`) (required for Code Review).

---

## Inputs

- Implementation output (source code) (required).
- Implementation Summary (required — defines the review scope).
- Approved Technical Specification (required).
- Approved PRD (required).
- Design Specification Document (optional — required if UI Review is in scope).
- `overview/ARCHITECTURE.md` (required for Code Review).

---

## Outputs

- Responsive Validation Report (APPROVED or REJECTED with findings).
- Accessibility Validation Report (APPROVED or REJECTED with findings).
- Code Review Report (APPROVED or REJECTED with findings).
- UI Review Report (APPROVED or REJECTED with findings — if design was provided).
- Aggregated Review Score (weighted average across all reports).
- Overall Pipeline Verdict: APPROVED (proceed) / WARNING (user decision) / REJECTED (fix required).

---

## Pipeline Stages

### Stage V1: Prerequisite Verification
Verify all required inputs are present. If the Implementation Summary is missing: halt. If the Tech Spec is missing: halt. If the Design Specification is required (design was provided) but missing: halt. Request the missing input before proceeding.

### Stage V2: Parallel Validation Spawn
Spawn all applicable validation agents simultaneously:
- **QA Engineer A** → `responsive.md` (responsive behavior across all breakpoints).
- **QA Engineer B** → `accessibility.md` (WCAG AA compliance across all components).
- **PR Auditor** → `code_review.md` (architecture, quality, maintainability).
- **UI Reviewer** → `design_review.md` (pixel accuracy vs. Design Specification — spawned only if design was provided).

All agents receive the same implementation output and their respective reference documents. They execute independently with no dependency on each other.

### Stage V3: Parallel Completion Wait
The Orchestrator holds at this stage until all spawned agents return their reports. No timeout is defined — agents must complete before the pipeline proceeds. If an agent fails to return: trigger that agent's retry logic.

### Stage V4: Score Aggregation
Collect all returned reports. Extract the score from each. Calculate the aggregated weighted score:
- Responsive Report: 25% weight.
- Accessibility Report: 25% weight.
- Code Review Report: 25% weight.
- UI Review Report: 25% weight (or redistributed proportionally if UI Review was waived).

### Stage V5: Decision Gate
Apply the scoring thresholds to determine the pipeline outcome:
- **Score >= 90:** APPROVED. Auto-proceed to Release Pipeline.
- **Score 75–89:** WARNING. Present aggregate report to user. Await explicit decision: proceed or request fixes.
- **Score < 75:** REJECTED. Route failed reports to Frontend Developer. Apply targeted fixes. Re-run failed checks only.

### Stage V6: Targeted Fix Routing (if REJECTED)
Identify which specific reports failed (score < 75 or Critical finding). Route each failed report to the Frontend Developer Agent with the specific findings as context. Do not re-run passing reports. Only re-run the checks that failed, after fixes are applied.

### Stage V7: Re-Validation (if fixes were applied)
Re-run only the validation skills that produced failing reports. Collect new reports. Recalculate the aggregated score. Return to Stage V5 decision gate.

---

## Agent Mapping

| Stage | Agent | Skill |
|-------|-------|-------|
| V2 | QA Engineer | `responsive.md` |
| V2 | QA Engineer | `accessibility.md` |
| V2 | PR Auditor | `code_review.md` |
| V2 | UI Reviewer | `design_review.md` (conditional) |

---

## Skill Mapping

| Skill | Validation Area | Weight |
|-------|----------------|--------|
| `responsive.md` | Layout at all breakpoints | 25% |
| `accessibility.md` | WCAG AA compliance | 25% |
| `code_review.md` | Architecture and quality | 25% |
| `design_review.md` | Pixel-accurate UI | 25% |

---

## Approval Gates

| Gate | Condition | Action |
|------|-----------|--------|
| Score >= 90 | Auto-proceed | No user input needed. Route to Release Pipeline. |
| Score 75–89 | User decision | Present aggregate. User approves or requests fixes. |
| Score < 75 | Auto-reject | Route to Frontend Developer. Apply fixes. Re-validate. |
| Critical finding in any report | Auto-reject | Regardless of score. Route to Frontend Developer. |

A single Critical finding in any report triggers an automatic REJECTED outcome regardless of the aggregated score.

---

## Decision Logic

```
All agents return reports?
  → NO (agent failed): Trigger retry. Attempt up to 3 times. Then halt.
  → YES: Aggregate scores.

Aggregated score >= 90?
  → YES: APPROVED. Route to Release Pipeline.

Aggregated score 75–89?
  → Present to user.
  → User approves? → Route to Release Pipeline.
  → User requests fixes? → Route failed reports to Frontend Developer.

Aggregated score < 75 OR any Critical finding?
  → REJECTED. Route failed reports to Frontend Developer.
  → Fixes applied? → Re-run failed checks only. Recalculate score.
```

---

## Parallel Execution

All four validation agents in Stage V2 execute fully in parallel. There are no inter-agent dependencies during validation. The Orchestrator waits for all agents to complete before aggregating results.

---

## Retry Logic

- **Agent fails to return a report:** Attempt 1: re-spawn the agent. Attempt 2: re-spawn with escalated model. Attempt 3: halt with a Failure Analysis Report.
- **Targeted fix cycle:** After fixes are applied, only the failed checks are re-run. Maximum fix-and-revalidate cycles: 3. After 3 cycles without reaching score >= 90, halt and require user intervention.

---

## Failure Handling

- **Missing implementation output:** Halt. Return: "No implementation available for review."
- **Missing Design Specification when UI Review is required:** Halt. Request the design source before proceeding.
- **Agent returns incomplete report:** Treat as a failed report. Trigger retry.
- **All 3 retry attempts exhausted:** Halt. Generate Failure Analysis Report. Notify user. Require manual intervention.

---

## Quality Gates

The following conditions must ALL be true for the pipeline to produce an APPROVED verdict:
- [ ] Responsive Report: APPROVED (no Critical failures).
- [ ] Accessibility Report: APPROVED (no WCAG Level A failures).
- [ ] Code Review Report: APPROVED (no Critical findings).
- [ ] UI Review Report: APPROVED (no Critical deviations) — or explicitly waived.
- [ ] Aggregated score >= 90.
- [ ] No deferred Critical or High findings.

---

## Success Criteria

The Review Pipeline is considered successfully completed when:
- All validation agents have returned APPROVED reports.
- The aggregated score is >= 90.
- No Critical findings remain in any report.
- The pipeline routes to the Release Pipeline automatically.

---

## Best Practices

- Always run all four validations in parallel — never serialize them.
- On re-validation after fixes, re-run only the failed checks to avoid unnecessary compute.
- A single Critical finding blocks approval regardless of score — do not override this rule.
- Treat the 75–89 WARNING zone as a deliberate user decision point — present the specific findings clearly so the user can make an informed choice.
- Document deferred Medium/Low findings in the final report — they represent known technical debt.
