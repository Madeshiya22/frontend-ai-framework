# Skill: Create Technical Specification

## Purpose

This skill translates an approved PRD into a precise, implementation-ready Technical Specification. It bridges the gap between business requirements and engineering execution. Without this skill, the Frontend Developer has no reliable blueprint — leading to misimplemented features, scope violations, and architectural inconsistencies.

---

## Primary Objective

Produce a Technical Specification that maps every PRD requirement to a concrete engineering decision — defining exactly which files to create, which to modify, which components to reuse, and in what order to implement — so the Frontend Developer can execute with zero ambiguity.

---

## When to Use

**Use when:**
- An approved PRD has been received from the Product Manager.
- A new feature or enhancement requires a structured implementation plan.

**Do NOT use when:**
- The PRD has not been approved — wait for approval first.
- The change is a trivial single-line fix — escalate to determine if a full Tech Spec is necessary.
- This skill has already been executed for the same PRD in the current pipeline run.

---

## Prerequisites

- Approved PRD (from `create_prd.md` skill, reviewed and approved by the user).
- Application Analysis Report (from `website_analysis.md` skill).
- Project Research Report (from `project_research.md` skill — styling and utility patterns).
- Access to the project's architecture guidelines (`../overview/ARCHITECTURE.md`).
- Confirmed technology stack.

---

## Inputs

- Approved PRD (required).
- Application Analysis Report (required).
- Project Research Report (required).
- Architecture guidelines (`../overview/ARCHITECTURE.md`) (required).
- Figma Design Specification or mockups (optional — if available, referenced in Tech Spec).

---

## Expected Outputs

A **Technical Specification** containing:
1. Feature Summary (one-paragraph overview)
2. Technology Stack Confirmation (framework, styling, state management)
3. Standard Project Folder Structure (directory layout conventions)
4. Component Hierarchy (tree structure of all components involved)
5. Files to Create (exact paths, component name, and purpose)
6. Files to Modify (exact paths, what changes and why)
7. Components to Reuse (existing components to be used as-is)
8. Naming Conventions (casing, file naming, component naming rules)
9. State Management Plan (local state, global state)
10. Data Fetching & Caching Strategy (API calls, caching, invalidation)
11. Routing Plan (new routes or modifications — if applicable)
12. Design Token Specification (typography, colors, spacing mapping)
13. Assets Strategy (image formats, icon sets, SVG vs PNG usage)
14. API Integration Points (endpoints, payloads — if applicable)
15. Security & Validation Plan (Auth requirements, input validation, XSS prevention)
16. Performance Optimization Strategy (Code splitting, lazy loading, asset optimization)
17. Error Handling & Boundaries (Fallback UI, global error catching, logging)
18. Testing Strategy (Unit, Integration, E2E test plan requirements)
19. Accessibility (A11y) Plan (WCAG targets, ARIA roles, keyboard nav)
20. Implementation Order (numbered sequence for the Frontend Developer)
21. Risk Assessment (anticipated challenges and mitigation strategies)
22. Out of Scope (explicitly re-stated from PRD for developer clarity)
23. Definition of Done / Exit Criteria (quality gates for this feature)

---

## Execution Process

1. **Read the approved PRD in full.** Understand every functional and non-functional requirement before making any technical decisions.

2. **Review the Application Analysis Report.** Understand the existing project structure, component library, and styling system before designing anything new.

3. **Review the Project Research Report.** Understand styling patterns, utility functions, and naming conventions to ensure the Tech Spec is consistent with existing code.

4. **Confirm the technology stack.** State the framework, styling methodology, and state management approach. If the PRD specifies a preference, use it. If not, recommend based on the existing project.

5. **Design the component hierarchy.** Map out how components will nest and relate to each other. Identify shared and leaf components.

6. **Identify reuse opportunities.** For every component needed, check the Application Analysis Report first. Only plan new components if no suitable existing component can be used.

7. **Define files to create.** List every new file with its exact path relative to the project root, the component or module name, and a one-line description of its purpose.

8. **Define files to modify.** List every existing file that must be changed, with the specific modification described (e.g., "Add new route entry," "Import new component," "Extend existing utility function").

9. **Plan state management.** Define which state is local to a component versus global. Specify the state management approach (context, store, signals, etc.) aligned with the project's existing pattern.

10. **Define design token requirements.** List every token (color, spacing, typography) the new components will use. Reference the project's Design System.

11. **Identify API integration points.** If the feature requires data fetching or mutation, define the endpoint, HTTP method, request payload, and expected response structure.

12. **Define implementation order.** Number the implementation tasks in dependency order — base utilities first, then shared components, then feature-specific components, then page integration.
    - *Mandatory Framework Rule:* Before defining any scaffold command, determine the Framework Root. Every generated application must be created relative to the Framework Root. Never create projects beside the framework directory.

13. **Write the Risk Assessment.** Identify anything that could go wrong during implementation and how to mitigate it.

14. **Self-review.** Verify the Tech Spec against the Validation Checklist before submission.

15. **Submit.** Deliver the Tech Spec to the Orchestrator and halt. Await user approval.

---

## Validation Checklist

Before submitting the Tech Spec, verify:
- [ ] Every PRD functional requirement is addressed by at least one component or file.
- [ ] Technology stack is explicitly confirmed.
- [ ] Standard Project Folder Structure and Naming Conventions are explicitly defined.
- [ ] Component hierarchy is documented as a tree structure.
- [ ] Every new file has an exact path, name, and purpose.
- [ ] Every modified file has a specific, described change.
- [ ] Reuse decisions are justified — existing components are used before new ones.
- [ ] Enterprise sections (Security, Performance, Testing, Error Handling, A11y, Assets Strategy) are fully defined.
- [ ] Implementation order is logical and dependency-aware.
- [ ] No new dependencies are introduced without justification.
- [ ] Risk Assessment is complete.
- [ ] Out of Scope items from the PRD are re-stated.
- [ ] Definition of Done / Exit Criteria is clearly stated.

---

## Error Handling

- **Incomplete PRD:** Reject and return to Product Manager with a list of missing information. Do not produce a Tech Spec from an incomplete PRD.
- **Undefined technology stack:** Ask the user for explicit confirmation before proceeding. Do not default silently.
- **No Application Analysis Report available:** Halt. Request `website_analysis.md` to be executed first.
- **Required component conflicts with existing architecture:** Document the conflict in Risk Assessment. Escalate to the user for a decision — do not resolve unilaterally.
- **API endpoint unknown:** Document as "API endpoint TBD" in the Tech Spec. Flag as a blocker for the Frontend Developer.

---

## Quality Standards

- A Tech Spec must be specific enough that a developer can implement it without asking a single question.
- File paths must be exact — not relative to a general folder, but relative to the project root.
- Implementation order must be dependency-aware — no step should require a file that has not been created in a prior step.
- Reuse decisions must be explicit — do not leave it to the developer to discover what already exists.

---

## Constraints

- NEVER write production code.
- NEVER introduce a technology not approved for the project.
- NEVER produce a Tech Spec without first reviewing the Application Analysis Report.
- NEVER duplicate an existing component — always check for reuse first.
- NEVER leave the technology stack undefined.
- NEVER include business or product reasoning — only technical decisions.
- NEVER plan project scaffolding outside the framework directory. Every generated application must be created relative to the Framework Root. Never create projects beside the framework directory.

---

## Best Practices

- Start from the PRD acceptance criteria and work backwards to determine what components are needed.
- Always list "files to modify" separately from "files to create" — developers need to know what they are touching.
- Prefer extension over replacement — describe how to add to existing files rather than rewriting them.
- State management decisions should match the existing project's pattern — never introduce a second state system.
- Sequence implementation in the order of rendering — utilities → shared components → feature components → page assembly.

---

## Handoff

Output is delivered to the **Orchestrator**, which presents it to the user for approval. Upon approval, the Orchestrator passes the Tech Spec to the **Frontend Developer** to begin `implement_section.md`. The Tech Spec is also made available to the **Figma Implementer** (if design-to-code is required) and the **PR Auditor** (for scope compliance verification during code review).

---

## Success Criteria

The Orchestrator considers this skill successfully executed when:
- A complete Technical Specification is delivered in the defined format.
- Every PRD requirement is addressed.
- The technology stack is confirmed.
- The user has reviewed and approved the Tech Spec.
- The Frontend Developer can begin implementation without requesting additional information from the Solution Architect.
