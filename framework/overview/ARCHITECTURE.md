# Architecture

## Purpose

The Architecture document defines the engineering structure, code organization standards, and technical principles that govern every implementation in this project. It is the authoritative reference for the Solution Architect when designing Technical Specifications and for the PR Auditor when evaluating code quality. Every file created or modified by the Frontend Developer must conform to these standards.

This document does not describe how to build any specific feature. It defines how all features must be built — the structural rules that apply universally, regardless of the feature's business purpose.

---

## Objectives

- Define a scalable, maintainable project structure that every agent can navigate and extend.
- Establish clear separation of concerns between markup, styles, logic, and data.
- Enforce consistent naming conventions across all files, components, and modules.
- Prevent architectural drift — new code must integrate with, not diverge from, the existing pattern.
- Provide the PR Auditor with an explicit standard against which all code is evaluated.

---

## Scope

**In Scope:**
- Project directory structure and folder organization.
- Component architecture rules (structure, responsibility, size).
- Naming conventions (files, components, variables, CSS classes).
- Styling architecture (methodology, token usage, scoping rules).
- State management architecture (local vs. global, placement rules).
- Code quality standards (readability, modularity, dead code).
- Accessibility standards at the implementation layer.
- Performance architecture guidelines.

**Out of Scope:**
- Feature-specific implementation decisions — those are in Technical Specifications.
- Visual design values (colors, spacing, typography) — those are in `DESIGN_SYSTEM.md`.
- Business requirements — those are in PRDs.
- Agent behavior — those are in individual `AGENT.md` files.

---

## Core Principles

- **Single Responsibility.** Every component, module, utility, and file has one clearly defined job. A component that does two things should be two components.
- **Modular Architecture.** Code is organized into self-contained modules. A module's internal changes should not break other modules.
- **Reusability.** Shared logic and shared UI are extracted into utilities and components. Nothing is duplicated.
- **Separation of Concerns.** Markup, styles, logic, and data-fetching live in separate layers. A component's template does not contain business logic. A utility does not contain markup.
- **Explicitness over Cleverness.** Code must be readable by any developer without additional explanation. Clever code that requires comments to understand is a defect.
- **Consistent Conventions.** Naming, file organization, and code style are consistent across the entire codebase. Inconsistency is a maintenance cost.
- **Non-Destructive.** No agent modifies a file not listed in the Technical Specification. No existing functionality is altered as a side effect of new work.

---

## Architecture Context

The Framework's AI agents reference this document in the following ways:

| Agent | How They Use Architecture Standards |
|-------|-------------------------------------|
| Solution Architect | Designs component hierarchies and file structures that comply with these standards |
| Frontend Developer | Implements all code according to these structural and naming rules |
| PR Auditor | Evaluates all submitted code against these standards — non-compliance is a finding |
| QA Engineer | References structural rules to understand where to look for accessibility and responsiveness implementations |

---

## Responsibilities

This document is responsible for:
- Defining the canonical project directory structure.
- Specifying naming conventions for all code artifacts.
- Defining the rules for component size, responsibility, and reuse.
- Specifying the styling architecture rules.
- Defining the state management placement rules.
- Setting the code quality bar that the PR Auditor enforces.

---

## Feature-Based Project Directory Structure

This framework officially mandates a **Feature-Based Architecture**. Code is organized by domain or feature rather than by file type. This improves scalability, reduces coupling, and keeps related logic colocated.

The framework supports three tiers of this architecture, selected dynamically by the Solution Architect based on project complexity:

### 1. Lightweight Feature-Based
**Used for:** Small Landing Pages, simple marketing sites, or microsites.
**Structure:**
- `app/` — Global application entry point and layout shells.
- `features/` — Domain-specific feature modules (e.g., `Hero/`, `Pricing/`).
- `shared/` — Highly reusable, generic components (e.g., `Button/`, `Card/`).
- `assets/` — Static images, icons, and fonts.
- `styles/` — Global CSS and design tokens.

### 2. Modular Feature-Based
**Used for:** Medium SaaS applications and complex web apps.
**Structure:** Includes all Lightweight folders, plus:
- `services/` — Global API abstractions and third-party integrations.
- `hooks/` (or composables) — Reusable cross-feature state logic.

### 3. Enterprise Feature-Based
**Used for:** Large-scale enterprise applications, CRMs, and E-commerce platforms.
**Structure:** Includes all Modular folders, plus:
- `providers/` — Global context providers and dependency injection.
- `routes/` — Application routing configuration.
- `config/` — Environment variables and global configuration.
- `store/` — Global state management.
- `lib/` — Pre-configured third-party library wrappers (e.g., customized API clients).

---

## Folder Responsibilities

- **`app/`**: Application entry points, root layouts, and global wrappers.
- **`features/`**: The core of the application. Each feature directory contains its own components, local hooks, local services, and local state.
- **`shared/`**: Generic, presentation-only components and pure utility functions used across multiple features.
- **`assets/`**: Static media (images, fonts, raw icons).
- **`styles/`**: Global stylesheets, resets, and design token definitions.
- **`services/`**: Global API definitions and external service clients not tied to a single feature.
- **`providers/`**: Context and state providers wrapping the application.
- **`routes/`**: Route definitions mapping URLs to feature pages.
- **`config/`**: Global configuration files and environment variable definitions.
- **`store/`**: Global state definitions (used sparingly; favor feature-local state when possible).
- **`lib/`**: Re-exporting or configuring third-party libraries.

---

## Architectural Boundary Rules

1. **Features are isolated:** Features cannot directly depend on or import from other features. If two features share logic, that logic must be extracted to `shared/` or elevated to a global `service` or `store`.
2. **Shared is generic:** The `shared/` directory must contain ONLY reusable code. It cannot contain feature-specific business logic.
3. **Logic colocation:** Business logic, API calls, and state strictly tied to a single feature must remain inside that feature's directory, not hoisted globally.
4. **No circular dependencies:** Modules must form a directed acyclic graph. Downward dependencies (Feature -> Shared) are allowed; upward dependencies (Shared -> Feature) are strictly forbidden.

---

## Inputs

Required before applying architecture standards:
- Application Analysis Report (to understand the existing structure before adding to it).
- Project Research Report (to understand existing naming conventions and patterns).
- Approved Technical Specification (the specific scope of what must be built).

---

## Component Architecture Rules

- **One component per file.** A file exports exactly one primary component.
- **One folder per component.** Complex components that have scoped styles or sub-components use a dedicated folder.
- **Component size limit.** If a component exceeds a meaningful size threshold (as a heuristic — typically 150–200 lines of logic), evaluate whether it has more than one responsibility. If so, decompose it.
- **No logic in markup.** Complex conditional logic, data transformation, and computations belong in a utility function or hook — not inline in the template.
- **No API calls in components.** Data fetching belongs in a service, hook, or composable layer — not directly inside a component's render function.
- **Props/inputs define the contract.** A component's external API is its props (or inputs). Keep this surface minimal and explicit.
- **Self-contained.** A component should function correctly when imported into any view — it must not depend on external global state unless that dependency is explicit in its API.

---

## Naming Conventions

| Artifact | Convention | Example |
|----------|-----------|---------|
| Component files | PascalCase | `UserProfileCard.jsx` |
| Component folders | PascalCase | `UserProfileCard/` |
| Utility files | camelCase | `formatDate.js` |
| Hook files | camelCase, `use` prefix | `useUserProfile.js` |
| CSS Module files | PascalCase `.module.[ext]` | `UserProfileCard.module.css` |
| CSS classes (BEM or utility) | kebab-case | `.user-profile-card__avatar` |
| CSS variables (tokens) | kebab-case, `--` prefix | `--color-primary` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_FILE_SIZE` |
| Functions and variables | camelCase | `getUserById()` |
| Route files | kebab-case | `user-profile.page.tsx` |

---

## Styling Architecture

- **Methodology:** Follow the project's defined styling methodology (CSS Modules, utility-first, global + BEM, CSS-in-JS). Do not mix methodologies.
- **Token enforcement:** All values (color, spacing, font size, border radius, shadow) must reference design tokens. No raw values.
- **No inline styles:** Inline styles are forbidden except for values that are dynamically calculated at runtime (e.g., dynamic widths based on JavaScript state).
- **Scoped styles:** Component styles must be scoped to that component. Global side effects from component stylesheets are architectural violations.
- **Mobile-first media queries:** All responsive styles use `min-width` queries — starting from the smallest viewport and scaling up.

---

## State Management Architecture

- **Local state:** Use local component state for UI state that is isolated to a single component (toggle open/closed, hover state, form field value).
- **Shared UI state:** Use the project's defined global state system (context, store, signals) for state that is shared across multiple components.
- **Server state:** Use the project's defined server-state solution (React Query, SWR, Apollo, etc.) for data fetched from APIs. Do not manage server data manually in global stores.
- **State placement rule:** State lives at the lowest component level that requires it. Lift state up only when a child-sibling relationship requires it.

---

## Code Quality Standards

- **Self-documenting names.** Variables, functions, and components are named to describe their purpose. If a name requires a comment, rename it.
- **No magic numbers.** All numeric literals with specific meaning must be named constants or design tokens.
- **No dead code.** Commented-out code, unused imports, and unreferenced variables must be removed before submission.
- **No console statements.** Debug `console.log` calls must be removed before submission.
- **Error handling.** Every async operation must have explicit error handling.
- **Zero hardcoded values.** Colors, spacing, font sizes, and other design values always come from tokens.

---

## Dependencies

- `overview/DESIGN_SYSTEM.md` — provides the token system that styling rules reference.
- `skills/code_review.md` — executes the PR audit against these standards.
- `skills/project_research.md` — documents the existing project's conventions to ensure new code is consistent.
- `ORCHESTRATOR.md` — invokes the PR Auditor to evaluate code against this document.

---

## Constraints

- NEVER introduce a second architectural pattern alongside an existing one (e.g., two state management systems).
- NEVER mix styling methodologies within the same project.
- NEVER write business logic inside markup templates.
- NEVER make API calls directly inside component render functions.
- NEVER use inline styles for non-dynamic values.
- NEVER submit code with unused imports, dead code, or debug statements.

---

## Common Mistakes

- **Mixing business logic and markup.** The most common architectural violation — keeps data transformation, conditions, and API calls out of the template layer.
- **Skipping the service/hook layer for API calls.** Calling `fetch()` directly inside a component couples the component to the data source — a hard dependency that breaks testability and reusability.
- **Creating one-off styles.** Adding ad-hoc styles instead of extending the token system creates long-term maintenance debt.
- **Inconsistent naming.** Mixing PascalCase and kebab-case for the same artifact type creates confusion during code reviews and searches.
- **Over-lifting state.** Not all state needs to be global. Unnecessary global state creates invisible dependencies and debugging complexity.

---

## Success Criteria

The architecture standards are correctly applied when:
- Every file follows the defined folder structure and naming conventions.
- Every component has a single, clear responsibility.
- No business logic appears inside markup templates.
- No API calls appear inside component render functions.
- All styling uses design tokens — no hardcoded values.
- No dead code, unused imports, or debug statements exist in submitted files.
- The PR Auditor evaluates the implementation and returns APPROVED with no Critical or High findings related to architecture violations.
