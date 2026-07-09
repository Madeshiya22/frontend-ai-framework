# Release Workflow

## Purpose

Define the final validation sequence that must be completed before any frontend implementation is released to a production environment. This workflow ensures that every quality gate has been passed, no critical issues remain open, the build is verified, and the user has explicitly authorized deployment.

---

## Scope

**In Scope:**
- Verifying all prior pipeline phases are completed with APPROVED verdicts.
- Validating build process success.
- Verifying environment configuration readiness.
- Assessing regression impact on the broader application.
- Compiling the Unified Delivery Report.
- Obtaining final user deployment authorization.

**Out of Scope:**
- Fixing implementation defects — these must be resolved before this workflow begins.
- Running QA or code review — those are completed in the Review Pipeline.
- Writing or modifying code.

---

## Trigger

This workflow is triggered when:
- The Review Pipeline produces all APPROVED verdicts.
- The Orchestrator determines all review phases are complete and the feature is ready for final sign-off.
- A re-release check is requested after a previously blocked deployment is remediated.

This workflow is NOT triggered if any review verdict is still REJECTED or PENDING.

---

## Preconditions

All of the following must be true before this workflow begins:

- QA Responsive Validation Report: APPROVED.
- QA Accessibility Validation Report: APPROVED.
- Code Review Report: APPROVED.
- UI Review Report: APPROVED (or explicitly waived if no design was in scope).
- Implementation Summary confirms all Tech Spec requirements are implemented.
- No unresolved Critical or High findings from any review phase.

If any precondition is not met: the workflow halts and returns a BLOCKED status with the specific unmet condition listed.

---

## Inputs

- All approved review reports (Responsive, Accessibility, Code Review, UI Review).
- Implementation Summary.
- Approved Technical Specification (for implementation completeness check).
- Build environment access (if applicable).
- Environment configuration checklist (if defined in Tech Spec).

---

## Outputs

- Deployment Readiness Report (AUTHORIZED or BLOCKED).
- Unified Delivery Report (compiled summary of all pipeline outputs).
- Final deployment authorization (upon user sign-off).

---

## Workflow Stages

### Stage R1: Prior Phase Verification
Systematically check the status of every prior phase. Each report must carry an APPROVED verdict. If any phase is REJECTED or PENDING: halt immediately. Return BLOCKED with the specific phase requiring resolution. Do not proceed.

### Stage R2: Implementation Completeness Check
Cross-reference the Implementation Summary against the Technical Specification. Every file listed under "Files to Create" must exist. Every "Files to Modify" entry must have been updated. No Tech Spec requirement may be listed as unimplemented.

### Stage R3: Build Verification
If the project uses a build process: trigger or simulate the build. Verify it completes without errors. Document any warnings. Errors are blockers — halt and return BLOCKED with the full error log summary. Warnings are documented but do not block deployment unless they indicate a runtime risk.

### Stage R4: Environment Configuration Check
If the Tech Spec defined environment variables, API endpoint configurations, or feature flags: verify each is correctly configured for the target environment. Any missing or misconfigured item is a blocker.

### Stage R5: Regression Impact Assessment
Confirm that the QA validation covered regression testing for features adjacent to the new implementation. If regression scope was not assessed during the Review Pipeline, assess it now. If regressions are found: halt. Route to Frontend Developer for resolution.

### Stage R6: Unresolved Issues Review
Review the aggregated findings from all reports. Confirm that no High or Critical findings were deferred. Document any Medium or Low deferred items in the Deployment Readiness Report for post-release tracking.

### Stage R7: Unified Delivery Report Compilation
Compile the complete Unified Delivery Report containing:
1. Executive Summary (feature delivered, tech stack used, scope delivered)
2. Implementation Log (all files created and modified)
3. QA Matrix (responsive and accessibility results)
4. Code Review Sign-off
5. UI Review Sign-off
6. Deployment Readiness verdict
7. Deferred Issues Log (Medium/Low items for post-release)

### Stage R8: Final Approval Gate 🛑
Present the Unified Delivery Report to the user. Halt the workflow completely.
- **AUTHORIZED:** User approves. Pipeline ends. Feature is released.
- **CONCERNS RAISED:** User raises concerns. Address them. Regenerate affected reports if needed. Re-present.

---

## Agent Mapping

| Stage | Agent | Skill |
|-------|-------|-------|
| R1–R6 | Solution Architect | `deployment.md` |
| R7 | Orchestrator | Report compilation (no specific skill — Orchestrator aggregation) |

---

## Skill Mapping

| Stage | Skill |
|-------|-------|
| R3–R6 | `deployment.md` |

---

## Approval Gates

| Gate | Stage | Condition | Action |
|------|-------|-----------|--------|
| Final Release Sign-off | R8 | User reviews Unified Delivery Report | AUTHORIZE (release) or RAISE CONCERNS (remediate) |

This is the only approval gate in this workflow — but it is the most critical one in the entire pipeline.

---

## Decision Points

```
All review reports APPROVED?
  → NO: BLOCKED. List specific reports requiring resolution.
  → YES: Proceed to implementation completeness check.

All Tech Spec requirements implemented?
  → NO: BLOCKED. Return incomplete items to Frontend Developer.
  → YES: Proceed to build verification.

Build succeeds?
  → NO: BLOCKED. Return error log to Solution Architect.
  → YES: Proceed to environment check.

Environment configured?
  → NO: BLOCKED. List missing configuration.
  → YES: Proceed to regression assessment.

Any High/Critical findings deferred?
  → YES: BLOCKED. These must be resolved before release.
  → NO: Compile report and proceed to final sign-off.
```

---

## Error Recovery

- **Review report missing:** Request the specific report from the appropriate agent. Do not proceed without it.
- **Build failure:** Halt. Route the build error to the Solution Architect. Await a code fix and build re-verification before re-attempting.
- **Missing environment variable discovered late:** Halt. Flag as a configuration blocker. Escalate to the user.
- **User raises concerns at Stage R8:** Address each concern. If concerns require code changes, route back through the Review Pipeline for the affected components only. Re-compile report. Re-present.
- **Regression discovered at Stage R5:** Halt. Route to Frontend Developer for fix. After fix, re-run QA for the regressed feature. Re-validate entire release checklist.

---

## Retry Logic

- **BLOCKED verdicts:** The workflow re-triggers automatically once the blocking condition is resolved and all reports are re-submitted as APPROVED.
- **Build failures:** Retry after each code fix. No limit — but each failure extends the release timeline. Document each failure in the Deployment Readiness Report.
- **User sign-off concerns:** No limit — iterate until user is satisfied or explicitly halts the release.

---

## Success Criteria

This workflow is considered complete when:
- All prior pipeline phases carry APPROVED verdicts.
- Build verification passes without errors.
- Environment configuration is verified.
- No Critical or High findings remain unresolved.
- The Unified Delivery Report is compiled and delivered to the user.
- The user provides explicit deployment authorization.
- The pipeline ends with: `[SYSTEM] Pipeline Execution Complete. Awaiting next command.`

---

## Handoff

Upon user sign-off, the Orchestrator marks the feature as production-ready and enters standby. The Unified Delivery Report is retained as the permanent record of this pipeline execution. No further agent actions are required.
