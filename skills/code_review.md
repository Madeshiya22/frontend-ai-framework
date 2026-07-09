# Skill: Code Review

## Purpose

This skill performs a systematic audit of the implemented source code to verify architectural compliance, code quality, maintainability, and engineering standards. It exists because functional correctness and visual accuracy are necessary but not sufficient for production code — the code must also be readable, modular, and maintainable by any developer who works on it in the future.

---

## Primary Objective

Produce a Code Review Report that identifies every architectural violation, quality issue, and maintainability concern in the implementation — with specific file references and actionable remediation guidance — enabling the Frontend Developer to bring the code up to production standard.

---

## When to Use

**Use when:**
- A new feature has been implemented and the Orchestrator has routed it to the review phase.
- A previously rejected implementation has been corrected and requires re-audit.

**Do NOT use when:**
- No implementation has been delivered.
- The implementation has not passed QA — code review is a parallel process with QA, not a dependent one.
- The task is a non-code artifact (PRD, Tech Spec, design file).

---

## Prerequisites

- Implementation output — source code files.
- Approved Technical Specification (for scope verification and architecture intent).
- Architecture guidelines (`overview/ARCHITECTURE.md`).
- Implementation Summary (from Frontend Developer — listing files created and modified).

---

## Inputs

- Implemented source code files (required).
- Approved Technical Specification (required — for scope compliance check).
- `overview/ARCHITECTURE.md` (required — the standard against which code is evaluated).
- Implementation Summary (required — defines the audit scope).

---

## Expected Outputs

A **Code Review Report** containing:
1. Audit Scope (files reviewed, sourced from Implementation Summary)
2. Scope Compliance Check (files reviewed vs. Tech Spec "files to create/modify" list)
3. Architecture Compliance Results (per principle from `ARCHITECTURE.md`)
4. Separation of Concerns Findings
5. Reuse and Duplication Findings
6. Naming Convention Compliance
7. Code Readability Findings
8. Dead Code and Unused Import Findings
9. Performance Risk Findings
10. Findings List (each finding: file, area, severity, description, recommendation)
11. Overall Code Quality Score (out of 100)
12. Final Verdict: APPROVED or REJECTED

---

## Execution Process

1. **Read the Implementation Summary.** Establish the exact audit scope — only files listed in the Implementation Summary are in scope.

2. **Cross-reference the audit scope against the Tech Spec.** Verify that only the files defined in "Files to Create" and "Files to Modify" were touched. Any file outside this list is an immediate Critical finding.

3. **Read `overview/ARCHITECTURE.md`.** Understand the architectural standards the project has committed to. This is the evaluation standard.

4. **Review each file for architectural compliance.**
   - Does the file follow the project's defined folder structure?
   - Does each component/module have a single, clear responsibility?
   - Are concerns separated (markup, styles, logic are not entangled)?

5. **Audit for separation of concerns violations.**
   - Business logic inside markup templates is a violation.
   - Inline styles (when the project uses a class-based or module-based styling approach) are a violation.
   - API calls directly inside component rendering logic (without a service or hook layer) are a violation.

6. **Audit for duplication.**
   - Is any logic re-implemented that already exists in a utility or helper?
   - Is any UI component re-created that already exists in the component library?
   - Are any styles re-declared that already exist in the global or token system?

7. **Audit naming conventions.**
   - Are component names consistent with the project's convention (PascalCase, kebab-case)?
   - Are variable and function names descriptive and consistent?
   - Are CSS class names consistent with the project's methodology (BEM, utility-first, etc.)?
   - Are file names consistent with the project's convention?

8. **Audit code readability.**
   - Are there magic numbers (unexplained numeric literals)?
   - Are complex functions decomposed into named sub-functions?
   - Is there dead code: commented-out blocks, unused imports, unreferenced variables?
   - Would a developer unfamiliar with this code understand it without additional explanation?

9. **Assess performance risks.**
   - Are there any obvious performance anti-patterns relevant to the selected technology stack?
   - Are there synchronous operations in rendering paths that could block the UI?
   - Are event listeners properly cleaned up (in component unmount/destroy lifecycle)?
   - Are images or assets referenced with reasonable optimization considerations?

10. **Compile all findings.** For each finding: file path, specific area, severity (Critical / High / Medium / Low), description of the issue, and a specific remediation recommendation.

11. **Calculate the Code Quality Score.** Weight findings by severity.

12. **Compile the report.** Assemble into the structured Code Review Report.

13. **Submit.** Deliver to the Orchestrator with a final verdict: APPROVED or REJECTED.

---

## Validation Checklist

Before submitting the report, verify:
- [ ] All files in the Implementation Summary have been reviewed.
- [ ] Scope compliance (Tech Spec vs. files modified) has been explicitly checked.
- [ ] Architectural compliance against `ARCHITECTURE.md` is documented.
- [ ] Separation of concerns has been checked for all files.
- [ ] Duplication has been checked across all new files.
- [ ] Naming conventions have been audited.
- [ ] Dead code and unused imports have been checked.
- [ ] Performance risks have been assessed.
- [ ] Every finding has a file reference, severity, and remediation recommendation.
- [ ] Code Quality Score is calculated.
- [ ] Final verdict is clearly stated.

---

## Error Handling

- **Missing implementation files:** Halt. Return: "Specified files not available for review."
- **Missing Tech Spec:** Proceed with architecture review only. Flag scope compliance as "Unable to verify."
- **Unknown tech stack:** Apply general software engineering quality standards. Flag framework-specific guidance as "Tech stack specific — verify against chosen framework's best practices."
- **Minified or auto-generated code submitted for review:** Flag as "Source code not reviewable in minified form." Request unminified source.
- **Architecture guidelines not available:** Halt. Request `overview/ARCHITECTURE.md` from the Orchestrator.

---

## Quality Standards

- Every finding must have: a specific file reference (and ideally a line reference), a severity level, a clear description of why it is a problem, and a specific remediation recommendation.
- The Code Quality Score must accurately reflect the weighted impact of all findings.
- The report must be actionable — a developer must be able to begin remediation immediately without asking follow-up questions.

---

## Constraints

- NEVER write replacement code.
- NEVER modify any project files.
- NEVER evaluate files outside the Implementation Summary scope.
- NEVER base findings on personal preference — every finding must reference the project's documented architecture standard or a universally accepted engineering principle.
- NEVER approve code with a Critical finding.
- NEVER conflate code quality with functional correctness or visual accuracy — those are separate concerns.

---

## Best Practices

- Review files in dependency order: utilities → shared components → feature components → page integration.
- Distinguish between style preference (advisory) and architecture violation (required fix) — only the latter should block approval.
- Use severity consistently: Critical = immediate production risk; High = significant maintainability issue; Medium = technical debt; Low = minor improvement.
- A short, specific finding is far more valuable than a long, vague critique.

---

## Handoff

Output is delivered to the **Orchestrator**, which aggregates it with the Responsive Report (from `responsive.md`), Accessibility Report (from `accessibility.md`), and UI Review Report (from `design_review.md`) to determine the overall pipeline verdict.

---

## Success Criteria

The Orchestrator considers this skill successfully executed when:
- A complete Code Review Report is delivered with every file in the Implementation Summary reviewed.
- Every finding has a file reference, severity, and remediation recommendation.
- Scope compliance has been verified.
- The Code Quality Score is accurately calculated.
- A final APPROVED or REJECTED verdict is included.
