# Skill: Code Review

## Purpose

This skill performs a systematic, enterprise-grade audit of implemented source code. It verifies architectural compliance, code quality, frontend engineering hygiene, and maintainability. It operates independently of functional testing to ensure the codebase remains scalable and strictly adheres to project standards.

---

## Primary Objective

Produce a formalized **PR Handoff Report** that evaluates the codebase across Architecture, Code Quality, and Frontend Engineering dimensions, providing actionable, categorized feedback without arbitrary numerical scores.

---

## When to Use

**Use when:**
- A new feature or component has been implemented.
- The Orchestrator routes an implementation to the PR Auditor.

**Do NOT use when:**
- Executing functional testing (use `functional_testing.md`).
- Executing responsive layout validation (use `responsive.md`).
- Executing accessibility validation (use `accessibility.md`).
- Reviewing UI aesthetics against Figma (use `design_review.md`).

---

## Prerequisites

- Implementation source code.
- Approved Technical Specification.
- Architecture guidelines (`../overview/ARCHITECTURE.md`).

---

## Expected Output (PR Handoff Report)

The skill must return a structured **PR Handoff Report**. Do not use numeric scores. The report must contain:

1. **Risk Assessment**: High-level summary of blast radius, technical debt introduced, and security implications.
2. **Findings List**: For each finding, explicitly document:
   - **Finding**: Clear description of the issue.
   - **Severity**: Critical, High, Medium, or Low.
   - **Blocking / Non-Blocking**: Blocking (must fix before merge) or Non-Blocking (can be addressed later).
   - **Auto-Fix Available**: YES or NO.
   - **Affected Files**: Specific file paths and line numbers.
   - **Recommendation**: Exact, actionable remediation guidance.
3. **Overall Merge Recommendation**: Must be exactly one of:
   - **APPROVED**: No Blocking findings.
   - **APPROVED WITH CHANGES**: Minor Non-Blocking findings that can be fixed post-merge or immediately via Auto-Fix.
   - **CHANGES REQUESTED**: One or more Blocking findings exist.

---

## Execution Process

You must strictly execute the following review phases.

### Phase 1 - Architecture Review
- **Folder Structure**: Verify files are placed in the correct directories as defined by project standards.
- **Component Hierarchy**: Verify logical nesting and relationship mapping between parent and child components.
- **Separation of Concerns**: Verify markup, styling, and business logic are not inappropriately entangled.
- **SOLID Principles**: Validate Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion where applicable.
- **DRY Principle**: Flag any repeated logic, duplicated components, or copy-pasted boilerplate.

### Phase 2 - Code Quality Review
- **Naming Conventions**: Verify PascalCase for components, camelCase for variables/functions, and descriptive, non-abbreviated naming.
- **Readability**: Flag overly complex logic, deep nesting, magic numbers, or confusing conditionals.
- **Maintainability**: Ensure code is structured in a way that is easily understood and modified by future developers.
- **Dead Code**: Flag unreferenced variables, commented-out code blocks, and unreachable logic.
- **Unused Imports**: Flag any imported modules or dependencies that are not utilized in the file.
- **File Size**: Flag massively oversized files (e.g., components exceeding 300-500 lines) that require decomposition.
- **Code Smells**: Identify anti-patterns, excessive props drilling, or mutated props.

### Phase 3 - Frontend Engineering Review
- **Design Token Compliance**: Verify absolutely no hardcoded hex colors, pixel spacings, or typography values exist. Only tokens are permitted.
- **Component Reusability**: Verify existing design system components were utilized rather than rebuilding native HTML equivalents.
- **State Management Consistency**: Verify local vs. global state usage adheres to the Tech Spec. Flag uncontrolled mutations or prop-drilling.
- **Error Handling**: Verify error boundaries exist, API failures are caught gracefully, and error states do not crash the application.
- **Performance Review**: Flag unnecessary re-renders, missing memoization (`useMemo`/`useCallback`), synchronous blocking operations, and unoptimized asset loading.
- **Security Review**: Flag potential XSS vulnerabilities (e.g., `dangerouslySetInnerHTML`), exposed secrets, or insecure data handling.

### Phase 4 - Cross Validation
*(Note: Do not execute functional QA here. Only verify the code structure supports these standards.)*
- **Accessibility Review Summary**: Verify the code contains required semantic tags and ARIA attributes (e.g., `alt` tags exist on images, buttons are `<button>`).
- **Responsive Review Summary**: Verify the code utilizes responsive design tokens, media queries, or grid/flexbox layouts natively.
- **Technical Specification Traceability**: Verify every file modified or created maps directly to a requirement in the Tech Spec.
- **Definition of Done Validation**: Verify the codebase explicitly meets the structural Definition of Done criteria outlined in the Tech Spec.

### Phase 5 - PR Handoff Report Generation
- Compile all findings from Phases 1-4.
- Determine the Severity, Blocking status, and Auto-Fix availability for every finding.
- Generate the final Risk Assessment.
- Issue the final Overall Merge Recommendation.

---

## Constraints

- NEVER write replacement code for the developer (provide guidance only).
- NEVER evaluate functional correctness (QA's job).
- NEVER issue an "APPROVED" recommendation if a "Blocking" finding exists.
- NEVER use numeric scores (e.g., "90/100").
