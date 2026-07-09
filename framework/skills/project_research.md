# Skill: Project Research

## Purpose

This skill performs a deep-dive analysis of the existing project's styling architecture, utility patterns, and engineering conventions. It complements `website_analysis.md` (which provides the broad structural map) by going deeper into the styling system, utility functions, and code-level patterns — giving the Solution Architect and Frontend Developer the detailed context they need to write code that is consistent with everything already in the project.

---

## Primary Objective

Produce a Project Research Report that gives the Solution Architect a precise understanding of existing styling patterns, naming conventions, utility APIs, and reusable logic — so that nothing is recreated, overridden, or inconsistently applied during implementation.

---

## When to Use

**Use when:**
- The Solution Architect is preparing a Technical Specification.
- The Frontend Developer needs to understand styling patterns before writing code.
- A new developer-equivalent agent is being onboarded to an existing project.

**Do NOT use when:**
- The project has no existing codebase (new project from scratch).
- Application Analysis (`website_analysis.md`) has not been completed yet — run that first.
- The research has already been completed for the current pipeline run.

---

## Prerequisites

- Application Analysis Report (from `website_analysis.md`).
- Access to the project's source code and configuration files.
- Technology stack identified (from Application Analysis).

---

## Inputs

- Application Analysis Report (required — provides directory map and stack confirmation).
- Project source code access (required).
- Specific area of focus from Orchestrator context (optional — e.g., "focus on styling patterns for the dashboard area").

---

## Expected Outputs

A **Project Research Report** containing:
1. Styling Architecture Summary (methodology, global vs. scoped, token system)
2. Design Token Inventory (all CSS variables, Tailwind config values, or theme tokens with names and values)
3. Utility Function Catalog (name, location, purpose, and usage signature for every shared utility)
4. Existing Layout Patterns (grid systems, container patterns, spacing conventions in use)
5. Naming Convention Reference (component naming, class naming, variable naming, file naming)
6. Anti-Patterns Identified (styling or code patterns that violate the architecture — to avoid)
7. Recommended Patterns (styling and logic patterns that are established and should be followed)
8. Reusability Summary (which utilities and helpers are directly applicable to the planned feature)

---

## Execution Process

1. **Start from the Application Analysis Report.** Use the directory map and tech stack identification as the starting point — do not repeat that analysis.

2. **Locate the styling configuration.** Find the main styling entry point: global CSS files, Tailwind config, theme provider files, CSS-in-JS setup, or SCSS variables. Read them in full.

3. **Extract all design tokens.** Document every CSS variable, Tailwind config key, or theme token with its name, value, and purpose. Group by category: colors, spacing, typography, shadows, border radii.

4. **Analyze global styles.** Document what is applied globally: reset rules, base typography, scroll behavior, focus states, and layout defaults.

5. **Analyze scoped/component styles.** Understand the pattern for scoped styles: CSS Modules, scoped styles (Vue), Styled Components, etc. Document the pattern so new components match it.

6. **Catalog utility functions.** Read every utility module, helper file, custom hook, composable, or service. Document: name, file path, purpose, and function signature.

7. **Identify layout patterns.** Document the patterns used for containers, section wrappers, grid layouts, and responsive breakpoint application.

8. **Document naming conventions.** Identify: component naming (PascalCase, kebab-case), CSS class naming (BEM, utility-first, scoped), variable naming (camelCase, SCREAMING_SNAKE_CASE), and file naming (index files, colocated styles).

9. **Identify anti-patterns.** Flag any patterns that violate the architecture — inline styles, magic numbers, duplicated utilities — so new code avoids them.

10. **Summarize reusability.** Based on the planned feature context (if provided), flag which utilities, tokens, and patterns are directly applicable.

11. **Compile the report.** Assemble all findings into the structured Project Research Report.

12. **Self-review.** Verify completeness against the Validation Checklist.

13. **Submit.** Deliver to the Orchestrator for handoff to the Solution Architect.

---

## Validation Checklist

Before submitting the report, verify:
- [ ] All design tokens (colors, spacing, typography, etc.) are documented with names and values.
- [ ] Global styling rules are summarized.
- [ ] Scoped styling pattern is documented.
- [ ] All utility functions are cataloged with file paths and signatures.
- [ ] Layout patterns are documented with examples.
- [ ] Naming conventions are explicitly documented.
- [ ] Anti-patterns are flagged with specific examples.
- [ ] Reusability summary is relevant to the planned feature context.

---

## Error Handling

- **No styling configuration found:** Flag as "No centralized styling configuration detected." Document what was found and proceed with analysis of inline or component-level styles.
- **Utility files absent:** Note "No shared utility files found." Proceed with layout and styling research only.
- **Conflicting patterns across the codebase:** Document both patterns as they exist. Flag for the Solution Architect to make a decision on which to follow for new code.
- **Token system not implemented:** Document as "No design token system found." Recommend implementing one in the Tech Spec. Flag hardcoded values found as anti-patterns.
- **Inaccessible files:** Note inaccessible files. Proceed with what is available. Flag the gap.

---

## Quality Standards

- Token documentation must include names and values — not just existence.
- Utility function signatures must be documented precisely enough for a developer to use them without reading the source.
- Anti-patterns must cite specific file examples — not general descriptions.
- The report must be organized so a developer can search it by topic (styling, utilities, layouts, naming).

---

## Constraints

- NEVER modify any project files.
- NEVER make architectural recommendations — report only; recommendations belong to the Solution Architect.
- NEVER document assumptions as facts — flag everything uncertain explicitly.
- NEVER skip the design token section — it is the most critical output for maintaining visual consistency.
- NEVER duplicate the broad structural mapping done by `website_analysis.md`.

---

## Best Practices

- Start with the styling configuration file — it reveals the entire design token system and methodology in one file.
- Document tokens with their semantic intent, not just their value (e.g., "Primary brand color — `#3B82F6` via `--color-primary`").
- Review at least three existing components to understand the real-world pattern — config files alone do not tell the full story.
- Flag tokens that are defined but never used — they may indicate deprecated patterns.

---

## Handoff

Output is delivered to the **Orchestrator**, which makes the Project Research Report available to the **Solution Architect** (for Tech Spec creation) and the **Frontend Developer** (for consistent implementation). It is also available to the **Figma Implementer** for token mapping.

---

## Success Criteria

The Orchestrator considers this skill successfully executed when:
- A complete Project Research Report is delivered.
- All design tokens are documented with names and values.
- All shared utility functions are cataloged.
- Naming conventions are explicitly documented.
- The Solution Architect and Frontend Developer can write new code that is stylistically and architecturally consistent with the existing project without opening a single existing file for reference.
