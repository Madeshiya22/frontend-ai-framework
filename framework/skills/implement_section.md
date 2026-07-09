# Skill: Implement Section

## Purpose

This skill is the primary code execution skill in the framework. It translates an approved Technical Specification into production-ready frontend code — creating or modifying only the files explicitly defined in the Tech Spec. It is the only skill authorized to write implementation code for new features and sections.

---

## Primary Objective

Produce clean, modular, accessible, and responsive implementation code that precisely satisfies every requirement in the approved Technical Specification, integrates seamlessly into the existing project, and introduces zero regressions to existing functionality.

---

## When to Use

**Use when:**
- A Technical Specification has been approved.
- A new component, section, page, or feature needs to be implemented.
- An existing component needs to be modified as defined in the Tech Spec.

**Do NOT use when:**
- The Tech Spec has not been approved — wait for approval.
- The task is a visual bug fix with no spec — use `design_review.md` process instead.
- The task is a code refactor — route to refactor request template.
- The task is a Figma-to-code conversion — run `figma_to_code.md` first to produce the Design Specification, then return here.

---

## Prerequisites

- Approved Technical Specification (from `create_tech_spec.md`).
- Application Analysis Report (to know which existing components to reuse).
- Project Research Report (to apply correct styling patterns and token names).
- Design Specification Document (from `figma_to_code.md`, if design was provided).
- Design System guidelines (`../overview/DESIGN_SYSTEM.md`).
- Access to the project's source code.

---

## Inputs

- Approved Technical Specification (required).
- Application Analysis Report (required — reuse decisions depend on it).
- Project Research Report (required — styling consistency depends on it).
- Design Specification Document (required if a design was provided; optional otherwise).
- Design System guidelines (required).

---

## Expected Outputs (Handoff Package)

The skill must always return a formal **Handoff Package** containing:
1. **Change Classification**: Explicit list of NEW Files, MODIFIED Files, and UNCHANGED Files.
2. **Architecture Compliance Report**: Proof that folder structure, feature boundaries, and dependency rules were strictly followed.
3. **File Impact Report**: Proof that the blast radius of modified files was assessed.
4. **Traceability Matrix**: Mapping every implemented component/feature directly back to the exact requirement in the Technical Specification.
5. **Validation Summary**: Results of the post-implementation validation (Responsive, A11y, Performance, DoD).
6. **Known Limitations**: Any deviations, technical debt, or unresolvable edge cases (if any).

---

## Execution Process

You must strictly execute the following sequence. Do not skip any phases.

### Phase 1: Pre-Implementation Checklist
- **Framework Root Verification (Mandatory):** Before executing any scaffold command or running the first terminal command, you must explicitly determine and display:
  - Current Working Directory (CWD)
  - Framework Root
  - Target Project Directory
- Verify that the Target Project Directory is exactly `<Framework Root>/<Project Name>`. If the Target Project Directory is outside the Framework Root, **STOP**. Do not execute any scaffold commands. Report the reason to the user.
- Verify the Technical Specification is explicitly APPROVED by the user.
- Verify the Design System and design tokens are loaded in context.
- Verify the Architecture document (`../overview/ARCHITECTURE.md`) has been reviewed.
- Verify all required existing components and dependencies identified in the Tech Spec exist in the project.

### Phase 2: Architecture Validation
- **Identify Architecture:** Determine the approved architecture (Lightweight, Modular, or Enterprise Feature-Based) from the Technical Specification.
- **Strict Compliance:** The Frontend Developer must NEVER invent a folder structure. The generated code must strictly follow the approved architecture.
- **Boundary Verification:** Before creating or modifying files, verify:
  - Folder structure compliance
  - Feature boundaries
  - Shared module usage
  - Dependency rules
  - No circular dependencies
  - No feature-to-feature imports (unless explicitly allowed by the Architecture document)
- **Violation Handling:** If the implementation attempts to create a folder outside the approved architecture or violates a boundary rule, **STOP** and report an architecture violation.

### Phase 3: Existing Code Analysis
- **Reuse Strategy:** Exhaustively search for reusable components before creating any new ones. Extend existing components whenever possible.
- **File Impact Analysis:** Before modifying any existing file, trace its imports and dependents. Identify all affected modules to ensure no side effects are introduced.

### Phase 4: Implementation Execution
- Follow the approved Technical Specification exactly. Do not invent new requirements.
- **Design Tokens:** Use Design Tokens for all styling (colors, spacing, typography). Never hardcode magic numbers.
- **Component Rules:** Maintain responsive-first (mobile-up) and accessibility-first (semantic HTML, ARIA) implementation standards on every single file.
- **Modularity:** Keep components small, modular, and focused on a single responsibility.
- **Strict Scope:** Do not modify unrelated files. Do not refactor code outside the explicit scope of the Tech Spec.

### Phase 5: Post-Implementation Validation
Before generating the Handoff Package, perform a strict self-review:
- **Traceability:** Validate every component against the Technical Specification.
- **Definition of Done (DoD):** Validate that the feature meets the Tech Spec's explicit DoD / Exit Criteria.
- **Responsive Behavior:** Validate behavior across Mobile, Tablet, and Desktop breakpoints.
- **Accessibility:** Validate keyboard navigation, focus states, and ARIA compliance.
- **Performance:** Validate performance considerations (e.g., lazy loading, asset optimization as defined in the Tech Spec).

### Phase 6: Handoff Package Generation
- Generate the final Handoff Package (Change Classification, Architecture Compliance Report, Impact Report, Traceability Matrix, Validation Summary, Known Limitations).
- Submit the implementation and the Handoff Package to the Orchestrator.

---

## Validation Checklist

Before submitting the Handoff Package, self-verify:
- [ ] **Pre-Implementation:** Were all prerequisites and architecture constraints verified?
- [ ] **Architecture Compliance:** Was the Architecture Validation phase executed and passed?
- [ ] **Reuse & Impact:** Was the Existing Code Analysis (Reuse & File Impact) performed before coding?
- [ ] **Execution:** Is the code responsive-first, accessibility-first, and exclusively using design tokens?
- [ ] **Traceability & DoD:** Does every line of code trace back to the Tech Spec, and is the Definition of Done satisfied?
- [ ] **Scope:** Are there zero modifications to unrelated files?
- [ ] **Handoff Package:** Are all 6 required elements (Classification, Architecture Compliance Report, Impact Report, Traceability, Validation, Limitations) included in the final output?

---

## Error Handling

- **Tech Spec is ambiguous on a specific detail:** Stop. Flag the ambiguity. Request clarification from the Solution Architect via the Orchestrator. Do not make assumptions.
- **Target Project Directory outside Framework Root:** STOP. Do not execute any scaffold commands. Report the reason to the user.
- **Required component not found in codebase:** Verify with Application Analysis Report. If genuinely missing, flag it and create the component as a new file following project conventions.
- **Design token not defined in Design System:** Use the most semantically appropriate existing token. Flag the gap in the Implementation Summary for the UI Reviewer.
- **File to modify contains conflicting existing code:** Do not overwrite. Document the conflict in the Implementation Summary. Escalate to the Solution Architect.
- **Required dependency missing from project:** Do not install autonomously. Halt and escalate to the Solution Architect.
- **Tech Spec implementation order is impossible (circular dependency):** Flag the issue. Propose an alternative order and await confirmation before proceeding.

---

## Quality Standards

- Code must be readable without comments — variable and function names must be self-describing.
- Every component must be independently testable and reusable.
- No magic numbers — all values must reference named tokens.
- Responsive behavior must be implemented mobile-first (smallest breakpoint → largest).
- WCAG AA accessibility compliance is the minimum standard for all interactive elements.
- Zero lint errors in the project's configured linting setup (if linting is configured).

---

## Constraints

- NEVER invent a folder structure. Always implement exactly the folder structure defined in the approved Technical Specification.
- NEVER create or modify files not listed in the Tech Spec.
- NEVER execute scaffolding commands if the Target Project Directory is outside the Framework Root.
- NEVER introduce new dependencies without Solution Architect approval.
- NEVER hardcode design values — always use design tokens.
- NEVER duplicate an existing component.
- NEVER skip accessibility implementation.
- NEVER silently deviate from the Tech Spec — all deviations must be documented.
- NEVER refactor existing code outside the defined scope of change.
- NEVER proceed without an approved Tech Spec.

---

## Best Practices

- Implement one component at a time following the defined order — do not attempt the entire feature at once.
- Build mobile-first — start from the smallest viewport and use min-width media queries to scale up.
- Treat accessibility as a first-class requirement, not an afterthought — implement ARIA attributes alongside the markup, not after.
- Keep component files small and focused — if a component grows beyond its single responsibility, flag it for the Solution Architect.
- Use the project's existing utility functions — never rewrite something that already exists.

---

## Handoff

Output is delivered to the **Orchestrator**, which simultaneously routes the implementation to:
- **QA Engineer** for `responsive.md` and `accessibility.md` validation.
- **PR Auditor** for `code_review.md` audit.
- **UI Reviewer** for `design_review.md` validation (if a design was provided).

---

## Success Criteria

The Orchestrator considers this skill successfully executed when:
- All components from the Tech Spec are implemented and files match exactly.
- An Implementation Summary is delivered and complete.
- No unrelated files were modified.
- The QA Engineer can begin responsive and accessibility validation without requiring code changes as a prerequisite.
