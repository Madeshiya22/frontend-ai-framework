# Skill: Application Analysis

## Purpose

This skill forces the AI agent to fully understand the existing application's structure, architecture, and component ecosystem before any planning or implementation begins. It exists to prevent duplication, architectural violations, and destructive changes that occur when an agent writes code without first understanding what already exists.

---

## Primary Objective

Produce a complete Application Analysis Report that maps the current state of the frontend project — its structure, components, styles, and patterns — so that the Solution Architect can make informed, non-destructive technical decisions.

---

## When to Use

**Use when:**
- A new feature is being planned for an existing project.
- The Solution Architect is about to produce a Tech Spec.
- Before any code is written, when the project has existing source files.

**Do NOT use when:**
- The project is being built from absolute scratch with no existing codebase.
- Analysis has already been completed in the current pipeline run (do not repeat unnecessarily).

---

## Prerequisites

- Access to the existing project's file system and source code.
- Project context provided by the Orchestrator (root folder path, framework type if known).

---

## Inputs

- Project root directory (required).
- Framework or tech stack hint (optional — to be confirmed during analysis).
- Orchestrator-provided context about the feature being planned (to focus the analysis).

---

## Expected Outputs

An **Application Analysis Report** containing:
1. Project Root Structure (directory tree)
2. Technology Stack Identified (framework, styling approach, state management, build tool)
3. Routing Structure (pages, views, and navigation paths)
4. Component Inventory (list of all reusable components with location and purpose)
5. Utility and Helper Inventory (shared functions, hooks, composables, services)
6. Styling System Summary (CSS methodology, token definitions, global styles)
7. Shared Asset Summary (images, icons, fonts — location and usage patterns)
8. Existing Design Patterns (naming conventions, file organization conventions)
9. Identified Reuse Opportunities (components relevant to the planned feature)
10. Risk Flags (anti-patterns, technical debt, or fragile areas adjacent to the planned feature)

---

## Execution Process

1. **Scan the root directory.** Map the complete directory tree to understand the overall project organization. Note top-level folders and their purposes.

2. **Identify the technology stack.** Confirm the framework (if not provided), styling methodology, state management approach, and build tooling by inspecting configuration files (`package.json`, `vite.config.*`, `next.config.*`, `angular.json`, etc.).

3. **Map the routing structure.** Identify how the application manages navigation. Document all pages, views, or route definitions.

4. **Catalog the component library.** List every reusable component. Document its name, location, props/inputs, and visual purpose.

5. **Catalog utilities and helpers.** List shared functions, custom hooks, composables, services, or utility modules. Document their location and purpose.

6. **Analyze the styling system.** Identify the CSS methodology. Document global styles, token files (CSS variables, Tailwind config, theme files), and utility class patterns.

7. **Inventory shared assets.** Document where images, icons, and fonts are stored and how they are referenced across the project.

8. **Document naming and file conventions.** Identify patterns: PascalCase vs kebab-case for components, file colocation patterns, index file usage, etc.

9. **Identify reuse opportunities.** Based on the planned feature (from Orchestrator context), flag which existing components, utilities, and styles can be reused directly.

10. **Flag risk areas.** Identify any files or systems adjacent to the planned feature that are fragile, poorly structured, or carry technical debt — so the Tech Spec can account for them.

11. **Compile the report.** Assemble all findings into the structured Application Analysis Report.

12. **Self-review.** Verify completeness against the Validation Checklist.

13. **Submit.** Deliver the report to the Orchestrator for handoff to the Solution Architect.

---

## Validation Checklist

Before submitting the report, verify:
- [ ] Complete directory tree is documented.
- [ ] Technology stack is identified with evidence (config file references).
- [ ] All major routes or views are listed.
- [ ] Component inventory is complete with file paths.
- [ ] Utility and helper inventory is complete.
- [ ] Styling methodology is clearly defined.
- [ ] Reuse opportunities are explicitly called out.
- [ ] Risk flags are documented with specific file references.
- [ ] No assumptions were made without evidence from the codebase.

---

## Error Handling

- **Project directory inaccessible:** Halt. Return error: "Cannot access project directory. Please verify the path provided."
- **Unknown framework:** Document "Framework not identified" and list config files found. Proceed with generic analysis. Flag for Solution Architect confirmation.
- **No existing components found (new project):** Note "No existing components detected — new project." Proceed with minimal report (stack identification + directory structure only).
- **Corrupted or malformed config files:** Note the corruption. Skip that file. Flag for the Solution Architect.
- **Extremely large codebase:** Prioritize the analysis scope toward the area relevant to the planned feature. Flag that full catalog was not feasible.

---

## Quality Standards

- The report must be specific — file paths, not general descriptions.
- Every identified component must include its location and a one-line description of its purpose.
- The tech stack section must reference actual config or source files as evidence.
- Reuse opportunities must be directly relevant to the planned feature — not a generic list.

---

## Constraints

- NEVER modify any project files during analysis.
- NEVER assume the tech stack without confirming from config files.
- NEVER skip the styling system analysis — design consistency depends on it.
- NEVER produce recommendations or implementation decisions — this skill reports only; it does not plan.
- NEVER duplicate the responsibilities of `project_research.md` (styling deep-dive) — this skill provides the broad map; `project_research.md` goes deeper into styling patterns.

---

## Best Practices

- Start from `package.json` — it reveals the tech stack, dependencies, and scripts immediately.
- Always look for a `components/` or equivalent folder first — it is the fastest way to identify reuse opportunities.
- Document naming conventions precisely — inconsistency is a common cause of new code clashing with existing code.
- Flag technical debt areas even if they are not directly related to the current feature — the Tech Spec should route around them.

---

## Handoff

Output is delivered to the **Orchestrator**, which passes the Application Analysis Report to the **Solution Architect** for use during `create_tech_spec.md`. The report is also stored in the pipeline context for reference by the **Frontend Developer** during implementation.

---

## Success Criteria

The Orchestrator considers this skill successfully executed when:
- A complete Application Analysis Report is delivered.
- The technology stack is confirmed with evidence.
- All existing components and utilities relevant to the planned feature are identified.
- The Solution Architect can begin the Tech Spec without needing to independently analyze the codebase.
