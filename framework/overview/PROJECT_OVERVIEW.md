# Project Overview

## Purpose

The Project Overview is the foundational context document for any project using the Enterprise Frontend AI Framework. It defines the high-level business goals, target audience, technology stack selection, and framework structure that every AI agent in the pipeline references. Without this document, agents cannot make informed, project-aware decisions.

Every agent reads this document at the start of a pipeline run to align their outputs with the project's purpose and constraints. It is the single source of truth for project-level identity.

---

## Objectives

- Define the business purpose and target audience for the frontend application.
- Document the selected technology stack so every agent operates within the same constraints.
- Establish the core development principles that govern every implementation decision.
- Provide a structural overview of the AI Framework modules to orient new agents.
- Define what a successfully delivered feature looks like at the project level.

---

## Scope

**In Scope:**
- High-level business context and project identity.
- Technology stack selection and constraints.
- Development principles that apply to every feature in the project.
- Framework structure orientation.
- Project-level success criteria.

**Out of Scope:**
- Feature-specific requirements — those belong in PRDs.
- Technical implementation decisions — those belong in Technical Specifications.
- Visual design standards — those belong in `DESIGN_SYSTEM.md`.
- Architectural engineering standards — those belong in `ARCHITECTURE.md`.

---

## Core Principles

These principles apply to every feature, every pipeline run, and every agent in this project:

- **Analyze Before Implementing.** No agent writes code without first understanding the existing codebase. The Application Analysis and Project Research phases are non-negotiable.
- **Component Reusability.** Existing components are reused before new ones are created. Duplication is a defect.
- **Modularity.** Every component, utility, and module has a single responsibility.
- **Non-Destructive Implementation.** No agent modifies files outside the defined scope of a Tech Spec.
- **Design System Compliance.** All visual values reference design tokens — no hardcoded values.
- **Accessibility First.** WCAG AA compliance is the minimum standard, not an optional enhancement.
- **Responsive by Default.** Every implementation supports all defined breakpoints from the start — not retrofitted.
- **Quality Over Speed.** All four review gates (Responsive, Accessibility, Code Quality, UI Accuracy) must pass before release.

---

## Architecture Context

The Enterprise Frontend AI Framework organizes the development process into five distinct layers:

| Layer | Folder | Role |
|-------|--------|------|
| Overview | `overview/` | Project-level context and standards (you are here) |
| Agents | `agents/` | Role-based AI profiles with defined responsibilities |
| Skills | `skills/` | Atomic execution skills invoked by agents |
| Pipelines | `pipelines/` | Macro execution engines coordinating agents and skills |
| Workflows | `workflows/` | End-to-end delivery sequences for common scenarios |

The Orchestrator (`ORCHESTRATOR.md`) coordinates all layers, enforces approval gates, manages scoring, and controls retry logic.

---

## Responsibilities

This document is responsible for:
- Providing project identity information to all agents at pipeline initialization.
- Defining the technology stack that constrains every technical decision.
- Documenting the development principles every agent must follow.
- Defining the deliverables the pipeline produces for each feature request.

This document does NOT define:
- Specific feature requirements.
- Component-level architecture.
- Design token values.
- Individual agent behaviors.

---

## Inputs

This document is initialized by the project team at the start of a new project. It should be filled in before any pipeline runs begin.

Required fields to populate:
- Project name and business purpose.
- Target audience description.
- Selected technology stack (framework, styling, state management, TypeScript preference).
- Any project-level constraints (browser support, performance targets, accessibility level).

---

## Technology Stack

The framework adapts to the stack chosen for this project. Select the applicable technologies during the Planning Phase:

- **Core Framework:** [HTML5 + Vanilla JS / React / Vue / Next.js / Angular / Svelte]
- **Styling Methodology:** [CSS Modules / Tailwind CSS / Bootstrap / Styled Components / Global CSS / SCSS]
- **State Management:** [Redux / Zustand / Context API / Vuex / Pinia / Signals / Native State]
- **TypeScript:** [Yes / No]
- **Build Tool:** [Vite / Webpack / Next.js / Angular CLI / Create React App]

> No external frameworks or libraries may be introduced outside the defined Tech Stack without explicit Solution Architect approval.

---

## Outputs

For every feature pipeline run, the framework delivers:

1. Approved Product Requirement Document (PRD)
2. Approved Technical Specification
3. Production-ready Frontend Implementation
4. QA Responsive Validation Report
5. QA Accessibility Validation Report
6. Code Review Report
7. UI Review Report (if design was provided)
8. Deployment Readiness Report
9. Unified Delivery Report

---

## Dependencies

- `overview/ARCHITECTURE.md` — defines the engineering standards all code must follow.
- `overview/DESIGN_SYSTEM.md` — defines the visual standards all implementations must respect.
- `overview/WEBSITE_ANALYSIS.md` — defines the analysis process that must precede every implementation.
- `ORCHESTRATOR.md` — the pipeline controller that coordinates all agents, skills, and approval gates.

---

## Best Practices

- Fill in this document completely before starting any pipeline run — agents use it to orient their decisions.
- When the technology stack changes (e.g., migrating from one framework to another), update this document first — it is the highest-priority configuration document.
- Keep the technology stack section honest — if TypeScript is "aspirational but not enforced," document it accurately.
- When onboarding the framework to a new project, this is the first document to customize.

---

## Constraints

- NEVER use this document to define feature-specific requirements.
- NEVER hardcode technology selections in agent or skill files — they reference this document.
- NEVER allow agents to assume the technology stack — it must be explicitly defined here.
- NEVER skip populating this document before running the pipeline on a new project.

---

## Common Mistakes

- **Leaving the Tech Stack blank.** Agents will either halt (correct behavior) or make assumptions (incorrect behavior). Define the stack.
- **Mixing feature requirements into the Project Overview.** This document defines project-level context — feature requirements belong in PRDs.
- **Treating this as a static document.** Update it when the tech stack, audience, or objectives change.
- **Skipping Development Principles.** These principles are the behavioral contract every agent follows — do not treat them as optional.

---

## Success Criteria

The Project Overview is considered properly configured when:
- Project name and business purpose are defined.
- Technology stack is fully specified.
- Development principles are documented.
- Every agent can read this document and understand the project context without any additional briefing.
- The framework can begin its first pipeline run with no unanswered project-level questions.
