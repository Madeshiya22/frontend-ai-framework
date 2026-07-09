# Skill: Deployment Readiness

## Purpose

This skill performs the final pre-release validation to confirm that the feature is ready to be deployed to a production environment. It exists because features that pass QA and code review can still fail in production due to build failures, environment configuration issues, unresolved review findings, or missing deployment prerequisites.

---

## Primary Objective

Produce a Deployment Readiness Report that confirms all pipeline phases have been successfully completed, all blockers have been resolved, the build process succeeds, and the feature is safe to release — culminating in an explicit deployment authorization or a clear rejection with required remediation steps.

---

## When to Use

**Use when:**
- All prior pipeline phases (QA, Code Review, UI Review) have received APPROVED verdicts.
- The Orchestrator has routed the pipeline to the Release Phase.
- A previous deployment rejection has been remediated and re-validation is required.

**Do NOT use when:**
- Any prior pipeline phase is still REJECTED or PENDING — deployment cannot proceed until all phases are resolved.
- The feature is being deployed to a staging/preview environment only (this skill validates production readiness specifically).

---

## Prerequisites

- QA Validation Reports (Responsive + Accessibility): both APPROVED.
- Code Review Report: APPROVED.
- UI Review Report: APPROVED (if design was provided).
- Implementation Summary confirming all Tech Spec requirements are implemented.
- Access to build process and environment configuration (if applicable).

---

## Inputs

- QA Reports (Responsive and Accessibility) — APPROVED status required (required).
- Code Review Report — APPROVED status required (required).
- UI Review Report — APPROVED status (required if design was provided; waived if no design was in scope).
- Implementation Summary (required — final list of all files created and modified).
- Build process access or build log (required if build verification is in scope).
- Environment configuration checklist (optional — provided by Solution Architect if defined in Tech Spec).

---

## Expected Outputs

A **Deployment Readiness Report** containing:
1. Pipeline Completion Verification (status of all prior phases)
2. Implementation Completeness Check (all Tech Spec requirements confirmed as implemented)
3. Build Verification Result (build success/failure with error log summary if failed)
4. Environment Configuration Check (environment variables, API endpoints, feature flags — if applicable)
5. Regression Impact Summary (confirmation that existing functionality is unaffected)
6. Unresolved Issues Log (any items deferred from prior review phases)
7. Final Deployment Authorization: AUTHORIZED or BLOCKED (with required actions if blocked)

---

## Execution Process

1. **Verify all pipeline phases are complete and approved.**
   - QA Responsive Report: APPROVED?
   - QA Accessibility Report: APPROVED?
   - Code Review Report: APPROVED?
   - UI Review Report: APPROVED? (or explicitly waived if no design was in scope)
   - If any phase is not APPROVED: halt immediately. Return a BLOCKED verdict with the specific phase that requires resolution.

2. **Verify the Implementation Summary is complete.**
   - All files listed in the Tech Spec's "Files to Create" exist.
   - All files listed in "Files to Modify" have been updated.
   - No Tech Spec requirement is listed as unimplemented.

3. **Verify build process success (if build is applicable).**
   - Trigger or simulate the build process.
   - Confirm the build completes without errors.
   - If warnings exist: document them. Warnings are not blockers unless they indicate a runtime risk.
   - If errors exist: halt. Return BLOCKED with the full error log summary.

4. **Verify environment configuration (if defined in Tech Spec).**
   - Confirm required environment variables are defined.
   - Confirm API endpoint configurations are correct for the target environment.
   - Confirm feature flags are set correctly if the feature uses a feature flag system.

5. **Verify regression impact.**
   - Confirm that all prior QA reports addressed regression testing.
   - If any existing feature was flagged as potentially impacted, confirm it was verified as unaffected.

6. **Review the Unresolved Issues Log.**
   - If any Medium or Low findings from prior phases were deferred, document them here.
   - Confirm that no High or Critical findings were deferred — all must be resolved before deployment.

7. **Compile the Deployment Readiness Report.** Assemble all verification results into the structured report.

8. **Issue the final verdict.**
   - AUTHORIZED: all checks passed, deployment can proceed.
   - BLOCKED: one or more checks failed, specific required actions listed.

9. **Submit.** Deliver the report to the Orchestrator.

10. **If AUTHORIZED:** The Orchestrator presents the Unified Delivery Report to the user for final release sign-off approval gate.

---

## Validation Checklist

Before submitting the report, verify:
- [ ] QA Responsive Report is APPROVED.
- [ ] QA Accessibility Report is APPROVED.
- [ ] Code Review Report is APPROVED.
- [ ] UI Review Report is APPROVED (or explicitly waived).
- [ ] All Tech Spec "Files to Create" exist.
- [ ] All Tech Spec "Files to Modify" have been updated.
- [ ] Build process completed without errors (if applicable).
- [ ] Environment configuration is verified (if applicable).
- [ ] No unresolved High or Critical findings from any prior phase.
- [ ] Final verdict (AUTHORIZED or BLOCKED) is clearly stated with justification.

---

## Error Handling

- **Any prior phase returns REJECTED:** Halt immediately. Return BLOCKED. List the specific phase(s) requiring resolution.
- **Build failure:** Halt. Return BLOCKED with the full error log summary and the responsible file(s).
- **Missing environment variable:** Halt. Flag as "Environment configuration incomplete." List the missing variable(s) by name.
- **Implementation Summary missing:** Halt. Request the Implementation Summary from the Frontend Developer.
- **Deferred High/Critical findings discovered:** Halt. Return BLOCKED. These must be resolved before deployment regardless of how they were deferred.

---

## Quality Standards

- The Deployment Readiness Report must be a definitive document — no ambiguity about whether deployment is authorized.
- Every BLOCKED verdict must include a precise list of required actions with enough detail that the responsible agent can begin remediation immediately.
- The pipeline completion verification must reference each prior report's verdict explicitly.

---

## Constraints

- NEVER issue a deployment authorization if any prior phase is REJECTED or PENDING.
- NEVER issue a deployment authorization if the build process failed.
- NEVER defer High or Critical findings to post-deployment.
- NEVER modify code or configuration files.
- NEVER skip the pipeline completion verification — this is the most critical check.

---

## Best Practices

- Treat deployment authorization as a formal gate — it is not a formality, it is the final safety check.
- Always verify prior phase verdicts directly from the submitted reports — do not rely on verbal summaries.
- Document deferred Medium/Low findings in the report for post-release tracking.
- If the build process is not applicable to the project type, explicitly note "Build verification: Not applicable — static/interpreted project" rather than skipping silently.

---

## Handoff

The Deployment Readiness Report is delivered to the **Orchestrator**, which presents the complete Unified Delivery Report (including all prior phase reports) to the **user** for final release sign-off at the final Approval Gate.

---

## Success Criteria

The Orchestrator considers this skill successfully executed when:
- A complete Deployment Readiness Report is delivered.
- All pipeline phases are verified as APPROVED.
- A clear AUTHORIZED or BLOCKED verdict is issued.
- If AUTHORIZED: the user receives the final release sign-off approval gate.
- If BLOCKED: the responsible phase is identified and required actions are specified.
