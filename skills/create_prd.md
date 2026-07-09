# Skill: Create PRD

## Purpose

This skill transforms raw, unstructured user requests into a complete, approved Product Requirement Document. It exists because every downstream agent — Solution Architect, Frontend Developer, QA Engineer — depends on a clear, unambiguous statement of requirements to do their work correctly. Without this skill, the pipeline cannot begin.

---

## Primary Objective

Produce a structured PRD that fully captures the business intent of the feature request, defines measurable acceptance criteria, and provides the Solution Architect with everything needed to produce a Technical Specification without further clarification.

---

## When to Use

**Use when:**
- A new feature request arrives from the user.
- An enhancement to an existing feature is requested.
- A scope change to a previously approved feature is needed.

**Do NOT use when:**
- A PRD already exists and has been approved — use `create_tech_spec.md` instead.
- The request is a bug fix — route to `bug_fix_request.md` template.
- The request is a refactor with no new business requirements.

---

## Prerequisites

- Raw user request (text, description, reference, or screenshot).
- Project context (if provided by the Orchestrator — existing features, tech stack constraints).
- Acceptance of any outstanding clarifying question responses from the user.

---

## Inputs

- User feature request (required).
- Existing project context and constraints (if available).
- Referenced design files or URLs (optional, noted in PRD if present).
- Business goals or deadline context (optional, incorporated if provided).

---

## Expected Outputs

A **Product Requirement Document (PRD)** with the following sections:
1. Feature Name
2. Business Goal
3. Target Users
4. Functional Requirements (numbered list)
5. Non-Functional Requirements (responsiveness, accessibility, performance)
6. User Stories ("As a [user], I want [goal], so that [benefit]")
7. Acceptance Criteria (testable, measurable — one per requirement)
8. Out of Scope (explicitly listed)
9. Scope Classification (Small / Medium / Large)
10. Open Questions (if any remain unresolved)
11. Design References (if provided)

---

## Execution Process

1. **Parse the request.** Read the full user request carefully. Identify the core feature being requested, the users it targets, and the expected outcome.

2. **Identify ambiguities.** List every requirement that is unclear, missing, or open to interpretation. Do not proceed with assumptions — generate a clarifying question list and present it to the user before continuing.

3. **Await clarification.** If questions were raised, halt and wait for the user's responses before writing the PRD.

4. **Define Functional Requirements.** List every capability the feature must provide, numbered and specific.

5. **Define Non-Functional Requirements.** State responsiveness expectations (breakpoints), accessibility level (WCAG AA minimum), and any performance constraints.

6. **Write User Stories.** For each functional requirement, write a user story that expresses the value to the end user.

7. **Write Acceptance Criteria.** For each user story, write one or more testable acceptance criteria. Each criterion must be verifiable by the QA Engineer.

8. **Define Out of Scope.** Explicitly state what is NOT included in this feature to prevent scope creep during implementation.

9. **Classify Scope.** Assign a scope classification: Small (1–3 components), Medium (4–7 components), Large (8+ components or cross-system changes).

10. **Compile the PRD.** Assemble all sections into the final structured document.

11. **Self-review.** Verify the PRD against the Validation Checklist before submission.

12. **Submit.** Deliver the PRD to the Orchestrator and halt. Await user approval.

---

## Validation Checklist

Before submitting the PRD, verify:
- [ ] Feature Name is defined.
- [ ] Business Goal is clearly and specifically articulated.
- [ ] All functional requirements are numbered and unambiguous.
- [ ] Non-functional requirements include responsiveness and accessibility.
- [ ] Every functional requirement has at least one user story.
- [ ] Every user story has at least one testable acceptance criterion.
- [ ] Out of Scope items are explicitly listed.
- [ ] Scope classification is assigned.
- [ ] No assumptions were made without flagging them in Open Questions.
- [ ] PRD contains no implementation details or technology decisions.

---

## Error Handling

- **Request too vague to act on:** Return structured error with minimum required fields. Do not fabricate requirements.
- **Contradictory requirements:** Document both sides in Open Questions. Do not resolve conflicts unilaterally.
- **Missing design reference:** Note "No design reference provided" in the PRD. Flag for the Solution Architect.
- **Scope too large for single PRD:** Recommend splitting into phased delivery. Document Phase 1 scope clearly.
- **Incomplete user response to clarifying questions:** Re-request specific missing answers before proceeding.

---

## Quality Standards

- The PRD must be self-contained — any agent can read it without additional verbal context.
- Acceptance criteria must be directly convertible into QA test cases.
- Requirements must be free of technical jargon.
- The document must be written in plain, unambiguous language.

---

## Constraints

- NEVER include implementation details, architecture decisions, or technology selections.
- NEVER assume a requirement that was not stated or clearly implied by the user.
- NEVER produce acceptance criteria that cannot be tested.
- NEVER proceed without resolving critical ambiguities.
- NEVER reference any specific project by name in the template language.

---

## Best Practices

- Write acceptance criteria as QA test conditions from the start.
- Separate business goals from user goals — they are not always the same.
- Always define what is NOT in scope — this prevents scope creep more than any other practice.
- Keep the language in functional requirements consistent — use the same verbs and nouns throughout.
- Classify scope conservatively — it is better to overestimate than to underestimate.

---

## Handoff

Output is delivered to the **Orchestrator**, which presents it to the user for approval. Upon approval, the Orchestrator passes the PRD to the **Solution Architect** to begin `create_tech_spec.md`.

---

## Success Criteria

The Orchestrator considers this skill successfully executed when:
- A complete PRD is delivered in the defined format.
- All acceptance criteria are testable and measurable.
- The user has reviewed and approved the PRD.
- The Solution Architect can begin the Tech Spec without requesting additional information from the Product Manager.
