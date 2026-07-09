# Framework Improvement Backlog

This backlog tracks architectural weaknesses and brittle assumptions discovered in the Enterprise Frontend AI Framework during the Validation Phase.

## Issue 1: Hardcoded Tailwind config file naming (`tailwind.config.ts`)
- **Root Cause:** The `skills/create_tech_spec.md` schema explicitly hardcodes the expectation of a `tailwind.config.ts` file in step 12 ("Design Token Specification"). However, the modern Frontend ecosystem evolves rapidly, and Tailwind CSS v4+ has completely deprecated JavaScript/TypeScript configuration files in favor of native CSS variables via `@theme` in `index.css`.
- **Why it failed:** By hardcoding `tailwind.config.ts`, the framework forced the frontend implementation to either use an outdated styling methodology (Tailwind v3) or explicitly violate the Technical Specification, introducing conflict and ambiguity.
- **Minimum Framework Improvement:** Update `skills/create_tech_spec.md` Section 12 to decouple from specific file names. Change "Configure `tailwind.config.ts` (Design Tokens)" to "Configure Design Tokens (specify CSS variables or config file based on framework version)".

## Issue 2: Missing Core UI Utility Scaffolding in Implementation Order
- **Root Cause:** The `skills/create_tech_spec.md` schema specifies the Implementation Order as (1) Scaffold project, (2) Configure Design Tokens, (3) Build generic UI components. However, modern frontend React component architecture (especially with Tailwind) strictly requires utility functions (e.g., `clsx`, `tailwind-merge`) to merge classes dynamically for reusable components. 
- **Why it failed:** By not explicitly defining a phase to "Scaffold Core Utilities" before building generic UI components, the framework leaves a gap where the frontend developer must either build brittle components without class merging or implicitly deviate from the exact Implementation Order to create the `utils/cn.ts` module.
- **Minimum Framework Improvement:** Update `skills/create_tech_spec.md` Section 20 (Implementation Order) to explicitly include "Scaffold Core Utilities (e.g., class merging)" immediately before building Generic UI Components.

## Issue 3: Inconsistent Folder Structure Mandates for Data Fetching
- **Root Cause:** The `skills/create_tech_spec.md` schema dictates defining a Data Fetching & Caching Strategy in Section 10, explicitly suggesting a `/src/data/mockData.ts` file for static landing pages. However, Section 3 (Standard Project Folder Structure) omits the `/src/data` directory, meaning the scaffolding instructions conflict with the data implementation expectations.
- **Why it failed:** During Step 6 (Build Data-Driven Sections), the implementation attempted to create the `mockData.ts` layer as designed by the Tech Spec, but the underlying `/src/data` directory had not been approved or scaffolded in Step 1, forcing an out-of-order `mkdir` operation and violating the strict structural adherence rule.
- **Minimum Framework Improvement:** Update `skills/create_tech_spec.md` Section 3 to include an optional `/src/data` folder for mock data or API services, ensuring structural scaffolding aligns with data fetching requirements.

## Issue 4: Missing Functional Validation Routing in Orchestrator Phase 4
- **Root Cause:** The `ORCHESTRATOR.md` documentation for Phase 4 (Parallel Validation) explicitly routes execution to Sub-Agent 4A (QA Engineer using `responsive.md`) and Sub-Agent 4B (QA Engineer using `accessibility.md`). However, it completely omits routing to the recently decoupled `skills/functional_testing.md` skill.
- **Why it failed:** When executing Phase 4 validations, the Orchestrator pipeline strictly limits spawns to Responsive and Accessibility checks. A manual bypass was required to spawn the third QA Engineer sub-agent for Functional Validation, meaning the Orchestrator is disconnected from the current state of QA skills.
- **Minimum Framework Improvement:** Update `ORCHESTRATOR.md` Phase 4 to explicitly spawn "Sub-Agent 4C (QA Engineer): Uses `skills/functional_testing.md`" and rename the phase to "Parallel Validation (QA, Accessibility & Functional)".

## Issue 5: Missing QA Data Piping to PR Auditor (Cross Validation Gap)
- **Root Cause:** The `skills/code_review.md` schema requires the PR Auditor to output a "Cross Validation" phase (Accessibility Review Summary, Responsive Review Summary, etc.) based on the QA results. However, `ORCHESTRATOR.md` Phase 5 does not explicitly pipe the Phase 4 `qa_handoff_report.md` artifact as an input into Sub-Agent 5A (PR Auditor).
- **Why it failed:** The PR Auditor is forced to execute a Cross Validation of the QA results without being explicitly provided the QA data by the Orchestrator, meaning it either has to hallucinate the QA state or perform redundant validation itself, breaking the strict separation of concerns.
- **Minimum Framework Improvement:** Update `ORCHESTRATOR.md` Phase 5 to explicitly pass the `qa_handoff_report.md` generated in Phase 4 as a mandatory context input to Sub-Agent 5A (PR Auditor).

## Issue 6: Missing Visual Rendering Tooling for UI Reviewer Sub-Agent
- **Root Cause:** The `skills/design_review.md` schema requires the UI Reviewer (Sub-Agent 5B) to perform "Pixel-Perfect Validation" and "Screenshot Comparison Guidance" against the Figma design reference. However, the Orchestrator framework does not provision any headless browser tools (e.g., Puppeteer, Playwright) or visual diffing utilities to the Sub-Agent, meaning it is restricted solely to analyzing text-based source code (TSX/CSS files).
- **Why it failed:** During Phase 5 (UI Review), the UI Reviewer is instructed to validate visual aesthetics (spacing, alignment, pixel-perfection), but without the ability to actually "see" the rendered DOM, it can only conceptually guess the layout based on Tailwind utility classes. This fundamentally undermines the integrity of a "Visual Validation" phase.
- **Minimum Framework Improvement:** Update `agents/ui-reviewer/AGENT.md` and the Orchestrator tooling configuration to inject a browser rendering tool (e.g., `browser_subagent` or a headless screenshot action) before Sub-Agent 5B executes, allowing it to compare the rendered output against the visual source of truth.
