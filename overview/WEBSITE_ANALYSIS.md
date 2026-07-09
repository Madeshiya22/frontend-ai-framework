# Application Analysis Overview

## Purpose

This document defines the mandatory analysis process that must be completed before any planning or implementation begins on an existing project. It exists because implementation errors — duplication, architectural inconsistency, regression — most commonly occur when an agent writes code without first understanding the system it is modifying. The Application Analysis is the framework's primary defense against these failures.

This document governs how agents approach and document their analysis of an existing frontend application. It is not a one-time checklist — it is a standing protocol applied before every significant feature or change.

---

## Objectives

- Provide every agent with a complete understanding of the existing application before any code is written.
- Identify all reusable components, utilities, and styles so nothing is duplicated.
- Map the existing routing, state management, and architecture patterns so new code integrates cleanly.
- Detect risk areas — fragile code, technical debt, anti-patterns — adjacent to the planned feature.
- Produce a structured Application Analysis Report that the Solution Architect uses to build the Technical Specification.

---

## Scope

**In Scope:**
- Analyzing the existing project directory structure and file organization.
- Identifying the technology stack from configuration files.
- Cataloging all existing reusable components and utilities.
- Documenting the styling methodology and design token system.
- Mapping the routing and navigation structure.
- Identifying risk areas relevant to the planned feature.

**Out of Scope:**
- Making implementation decisions — this phase reports, it does not plan.
- Writing any code.
- Making design decisions.
- Evaluating the quality of existing code (that is the PR Auditor's responsibility during the Review Pipeline).

---

## Core Principles

- **Evidence-based analysis.** Every finding must be supported by file references — no general descriptions.
- **Completeness over speed.** A missed component or undocumented pattern during analysis will cause a problem during implementation. Thoroughness is non-negotiable.
- **Non-destructive.** Analysis is read-only. No files are modified, renamed, or deleted during this phase.
- **Relevance-first.** On large codebases, prioritize analysis of areas relevant to the planned feature — but never skip the structural overview.
- **Report, do not recommend.** The Application Analysis reports what exists. The Solution Architect decides what to do with that information.

---

## Architecture Context

The Application Analysis Overview is one of four overview documents that orient the framework to a specific project:

| Document | Purpose |
|----------|---------|
| `PROJECT_OVERVIEW.md` | Business context, tech stack, project identity |
| `WEBSITE_ANALYSIS.md` | Analysis protocol for the existing application (this document) |
| `DESIGN_SYSTEM.md` | Visual standards and design token governance |
| `ARCHITECTURE.md` | Engineering structure and coding standards |

The Application Analysis skill (`skills/website_analysis.md`) is the operational execution of this protocol. This document defines what must be analyzed. The skill defines how to do it.

---

## Responsibilities

This document defines:
- The analysis protocol — what must be examined before implementation.
- The expected output — the Application Analysis Report structure.
- The standards that make an analysis complete.

This document does NOT define:
- How to implement new features.
- How to fix existing issues discovered during analysis.
- Design or architecture decisions.

---

## Inputs

Required before analysis begins:
- Access to the project's root directory and source code.
- Technology stack hint (if known — to be confirmed during analysis).
- Context from the Orchestrator about the planned feature (to focus the analysis scope).

---

## Analysis Checklist

The agent must examine and document all of the following:

**Application Structure:**
- [ ] Root directory and folder organization
- [ ] Technology stack (confirmed from `package.json` or equivalent config file)
- [ ] Build tool and configuration

**Routing and Navigation:**
- [ ] All defined routes or pages
- [ ] Navigation patterns (file-based, config-based, dynamic)
- [ ] Guard or middleware patterns (auth guards, route protection)

**Component Inventory:**
- [ ] All reusable UI components (name, file path, purpose)
- [ ] Shared layout components (page wrappers, shells, containers)
- [ ] Form components and input controls

**Utilities and Helpers:**
- [ ] Shared utility functions (name, file path, purpose, signature)
- [ ] Custom hooks or composables
- [ ] Service layers or API utility modules
- [ ] Constants and configuration modules

**Styling System:**
- [ ] Styling methodology (CSS Modules, global CSS, utility-first, CSS-in-JS)
- [ ] Design token definitions (CSS variables, theme files, Tailwind config)
- [ ] Global style rules (resets, base typography, scroll behavior)

**Assets:**
- [ ] Image and icon storage locations
- [ ] Font sources and loading method
- [ ] Media organization patterns

**State Management:**
- [ ] State management approach (local, global, server state)
- [ ] State providers, stores, or context definitions

**Risk Areas:**
- [ ] Anti-patterns, technical debt, or fragile code adjacent to the planned feature
- [ ] Files that are heavily shared and carry high regression risk if modified

---

## Outputs

The analysis phase produces an **Application Analysis Report** containing:

1. Project Root Structure (directory tree)
2. Technology Stack Confirmation (with config file evidence)
3. Routing Structure (all routes or pages)
4. Component Inventory (name, path, purpose)
5. Utility and Helper Inventory (name, path, signature)
6. Styling System Summary (methodology, token locations)
7. Shared Asset Summary (images, icons, fonts)
8. State Management Summary
9. Identified Reuse Opportunities (relevant to planned feature)
10. Risk Flags (anti-patterns, high-regression-risk files)

---

## Dependencies

- `skills/website_analysis.md` — the operational skill that executes this analysis protocol.
- `skills/project_research.md` — the complementary deep-dive into styling patterns and utility APIs.
- `overview/ARCHITECTURE.md` — the standard against which the existing architecture is assessed.

---

## Best Practices

- Always start from `package.json` (or equivalent) — it reveals the tech stack, dependencies, and available scripts in one file.
- Look for a `components/` folder early — it is the fastest path to the component inventory.
- Read at least three existing components before drawing conclusions about patterns — one component may be an outlier.
- Document anti-patterns found during analysis — they inform the Solution Architect's risk assessment in the Tech Spec.
- On very large codebases, scope the analysis to the directory most relevant to the planned feature, then document the broader structure at a higher level.

---

## Constraints

- NEVER modify any files during analysis.
- NEVER make architectural recommendations — only report findings.
- NEVER document assumptions as facts — flag uncertain findings explicitly.
- NEVER skip the styling and token analysis — design consistency depends on it.
- NEVER duplicate the responsibilities of `project_research.md` — this document provides the broad structural map; `project_research.md` provides the deep styling and utility detail.

---

## Common Mistakes

- **Skipping the analysis entirely on a "familiar" project.** Familiarity is not analysis. New work introduces drift. Run the analysis every time.
- **Describing components generally instead of specifically.** "There are some form components" is not useful. "Form components at `src/components/forms/` — Input, Select, Checkbox, DatePicker" is.
- **Missing the styling token analysis.** Agents frequently analyze components but overlook CSS variable files or Tailwind configurations — the most important source of design consistency information.
- **Not flagging risk areas.** Discovered anti-patterns that are not reported will be encountered again during implementation — at a much higher cost.
- **Proceeding to implementation without completing the analysis.** The Application Analysis is a mandatory prerequisite for the Tech Spec. There are no exceptions.

---

## Success Criteria

The Application Analysis is considered complete when:
- The technology stack is confirmed with config file evidence.
- All major routes and views are documented.
- All reusable components are cataloged with file paths and purposes.
- The styling system and token structure are documented.
- Reuse opportunities relevant to the planned feature are explicitly identified.
- Risk areas are flagged with specific file references.
- The Solution Architect can begin the Technical Specification without independently analyzing the codebase.
