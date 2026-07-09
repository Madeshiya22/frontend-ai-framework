# Example: Product Requirement Document (PRD)

## Scenario

The Solution Architect has received the approved Feature Request for the Notification Center. The Product Manager Agent has processed it and produced the following PRD. This is what the Orchestrator presents to the user for approval before any technical work begins.

---

## Input

Approved Feature Request for the User Notification Center (see `feature-request-example.md`).

---

## PRD Output

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT REQUIREMENT DOCUMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Feature Name:
User Notification Center

Version: 1.0
Status: Awaiting User Approval

Business Goal:
Users frequently miss important system alerts because they are delivered only
via email. An in-app notification center will reduce missed alerts by 80% and
increase user engagement with platform activity events.

Target Users:
Logged-in users of the SaaS analytics dashboard across all subscription tiers.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FUNCTIONAL REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FR-01: A bell icon with a numeric badge appears in the top navigation bar.
       The badge displays the count of unread notifications.
       The badge disappears when the unread count reaches zero.

FR-02: Clicking the bell icon opens a notification dropdown panel.
       The panel is positioned below the bell icon.

FR-03: Each notification entry displays:
       - Title (bold)
       - Description (body text)
       - Relative timestamp (e.g., "2 hours ago")
       - Visual unread indicator (e.g., colored dot or bold text)

FR-04: Clicking an individual notification marks it as read.
       The unread badge count decrements accordingly.

FR-05: A "Mark all as read" button is visible in the panel header.
       Clicking it marks all notifications as read simultaneously.

FR-06: The panel closes when the user clicks outside it or presses Escape.

FR-07: When no notifications exist, an empty state message is displayed:
       "You're all caught up. No new notifications."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NON-FUNCTIONAL REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NFR-01: Responsive — supports Mobile (375px), Tablet (768px), Desktop (1440px).
NFR-02: Accessibility — WCAG AA compliance minimum.
NFR-03: Performance — panel open interaction must complete within 100ms.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
USER STORIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

US-01: As a logged-in user, I want to see a notification count badge in the
       navbar so I know when new alerts have arrived without leaving the page.

US-02: As a user, I want to open a notification panel by clicking the bell
       icon so I can read my notifications without navigating away.

US-03: As a user, I want to mark individual notifications as read so I can
       track which alerts I have already actioned.

US-04: As a user, I want to mark all notifications as read in one click so
       I can clear my notification queue efficiently.

US-05: As a keyboard user, I want to open and close the notification panel
       using only the keyboard so I can use the feature without a mouse.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACCEPTANCE CRITERIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AC-01: Bell icon is visible in the navbar at Mobile, Tablet, and Desktop.
AC-02: Badge displays the correct unread count and disappears at zero.
AC-03: Clicking the bell opens the panel; clicking outside or Escape closes it.
AC-04: Clicking a notification marks it as read; badge count decrements.
AC-05: "Mark all as read" marks all notifications as read in one action.
AC-06: Keyboard: Tab → bell → Enter/Space to open → Escape to close.
AC-07: Empty state message displays when no notifications are present.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUT OF SCOPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Real-time WebSocket updates (static polling only for this sprint).
- Notification preference settings or management page.
- Browser-level push notification integration.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCOPE CLASSIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Medium — estimated 5 new components + 1 context provider + 1 custom hook.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OPEN QUESTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

None — all requirements clarified.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APPROVAL GATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[SYSTEM] PRD delivered. Pipeline halted. Awaiting user approval to proceed
         to Technical Specification.
```

---

## Expected AI Behaviour

1. Product Manager Agent reads the Feature Request fully before writing a single word of the PRD.
2. All acceptance criteria are written as testable conditions — each one can be directly converted into a QA test case.
3. The PRD contains zero implementation details — no component names, no file paths, no technology choices.
4. The Orchestrator presents the PRD and halts. It does not proceed to the Solution Architect until the user explicitly approves.
5. If the user returns feedback ("add a requirement for notification categories"), the Product Manager Agent incorporates it and re-generates. The gate repeats.

---

## Expected Output

A complete PRD with all sections populated:
- Feature Name, Business Goal, Target Users
- Numbered Functional Requirements (with FR-XX identifiers)
- Numbered Non-Functional Requirements (with NFR-XX identifiers)
- Numbered User Stories (with US-XX identifiers)
- Numbered Acceptance Criteria (with AC-XX identifiers)
- Explicit Out of Scope list
- Scope Classification
- Approval Gate signal

---

## Common Mistakes

| Mistake | Consequence | Prevention |
|---------|-------------|------------|
| Including implementation details in the PRD | The PRD becomes a spec — the Solution Architect's role is bypassed | PRD describes WHAT, never HOW |
| Writing acceptance criteria that cannot be tested | QA cannot validate them — pipeline produces untestable features | Each criterion must be verifiable: "the badge disappears at zero" is testable; "it feels snappy" is not |
| Proceeding to Tech Spec before PRD approval | Wasted technical work if the PRD changes | The Orchestrator enforces the gate — never bypass it |
| Missing the Out of Scope section | Scope creep — developers add features not requested | Always state what is NOT included |
| Open questions left unresolved | Ambiguous implementation — incorrect feature delivered | Halt and ask before generating — never assume |
