# Example: Technical Specification

## Scenario

The PRD for the User Notification Center has been approved. The Solution Architect Agent has analyzed the existing codebase and produced the following Technical Specification. This is what the Orchestrator presents to the user for approval before any implementation begins.

---

## Input

- Approved PRD: User Notification Center v1.0
- Application Analysis: Existing Navbar, Badge, and IconButton components identified
- Project Research: React Context pattern in use (AuthContext), CSS Modules convention, token file at `src/styles/tokens.css`
- Technology Stack: React 18, TypeScript, CSS Modules, React Context

---

## Technical Specification Output

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHNICAL SPECIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Feature: User Notification Center
PRD Reference: Notification Center PRD v1.0
Version: 1.0 | Status: Awaiting User Approval

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHNOLOGY STACK CONFIRMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Framework:        React 18 with TypeScript
Styling:          CSS Modules (consistent with existing project convention)
State Management: React Context (consistent with existing AuthContext pattern)
Data Fetching:    Fetch API with custom hook (consistent with existing pattern)
Build Tool:       Vite (existing project configuration)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPONENT HIERARCHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NotificationContext (Provider)
└── Navbar (existing — modified)
    └── NotificationBell
        ├── Badge (existing — reused)
        └── NotificationPanel
            ├── NotificationItem (×n)
            └── EmptyState (inline component)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILES TO CREATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

src/context/NotificationContext.tsx
  — React Context provider. Manages notification array, unread count,
    markAsRead(), and markAllAsRead() functions.

src/hooks/useNotifications.ts
  — Custom hook. Fetches GET /api/notifications on mount.
    Calls PATCH /api/notifications/:id for markAsRead.
    Exposes { notifications, unreadCount, markAsRead, markAllAsRead }.

src/components/NotificationBell/
  index.tsx         — Bell icon button. Renders Badge. Controls panel open state.
  index.module.css  — Scoped styles for bell and badge positioning.

src/components/NotificationPanel/
  index.tsx         — Dropdown panel. Renders list of NotificationItem.
                      Renders "Mark all as read" button. Renders EmptyState.
  index.module.css  — Scoped styles for panel, scroll container, header.

src/components/NotificationItem/
  index.tsx         — Single notification row. Title, description, timestamp,
                      unread dot indicator. Calls markAsRead on click.
  index.module.css  — Scoped styles for item, unread state, hover state.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILES TO MODIFY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

src/components/Navbar/index.tsx
  — Import and render <NotificationBell /> in the navbar right section.
  — Change: Add one import, render one component. No other changes.

src/App.tsx (or root provider file)
  — Wrap the application with <NotificationProvider>.
  — Change: Add one import and wrap existing children. No other changes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPONENTS TO REUSE (NO CHANGES REQUIRED)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

src/components/Badge/index.tsx
  — Use existing Badge component for the unread count display.
  — Props to use: count={unreadCount} variant="notification"

src/components/IconButton/index.tsx
  — Use existing IconButton for the bell trigger button.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
API INTEGRATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET  /api/notifications
     Response: { notifications: Notification[] }
     Called: On component mount via useNotifications hook.

PATCH /api/notifications/:id
     Body: { read: true }
     Called: On notification item click via markAsRead().

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN TOKEN REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

--color-notification-unread    (new token — add to tokens.css)
--color-surface                (existing)
--color-border                 (existing)
--color-text-primary           (existing)
--color-text-secondary         (existing)
--shadow-lg                    (existing — for panel drop shadow)
--space-3, --space-4, --space-6 (existing)
--radius-md                    (existing — for panel border radius)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPLEMENTATION ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Add --color-notification-unread to src/styles/tokens.css
2. Create NotificationContext.tsx
3. Create useNotifications.ts hook
4. Create NotificationItem component
5. Create NotificationPanel component (depends on NotificationItem)
6. Create NotificationBell component (depends on NotificationPanel + Badge)
7. Modify Navbar to import and render NotificationBell
8. Modify App.tsx to wrap with NotificationProvider

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RISK ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Risk 1: Focus trap for keyboard users when panel is open.
  Severity: High
  Mitigation: Implement focus trap within NotificationPanel on open.
              Return focus to NotificationBell on close.

Risk 2: Panel positioning may overflow on mobile viewports.
  Severity: Medium
  Mitigation: Use viewport-relative positioning on mobile.
              Test at 375px before submitting.

Risk 3: Notification count desync if PATCH request fails.
  Severity: Low
  Mitigation: Implement optimistic update with rollback on API error.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APPROVAL GATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[SYSTEM] Tech Spec delivered. Pipeline halted.
         Awaiting user approval to begin Implementation.
```

---

## Expected AI Behaviour

1. Solution Architect reads the full PRD before designing anything.
2. Application Analysis confirms Badge, Navbar, and IconButton already exist — they are listed as reuse items.
3. Tech Spec maps every PRD functional requirement to a specific component or file — FR-01 → Badge in NotificationBell, FR-07 → EmptyState in NotificationPanel, etc.
4. Orchestrator halts at the Tech Spec approval gate — no code is written until approval is given.
5. If user requests a change ("use Zustand instead of Context"), the Solution Architect amends the Tech Spec and re-presents.

---

## Expected Output

A complete Technical Specification with:
- Technology stack confirmed
- Component hierarchy as a tree
- Files to Create (with exact paths and descriptions)
- Files to Modify (with exact paths and precise scope of change)
- Components to Reuse (no duplication)
- API integration plan
- Design token requirements (including new tokens)
- Dependency-aware implementation order
- Risk assessment

---

## Common Mistakes

| Mistake | Consequence | Prevention |
|---------|-------------|------------|
| Not checking for existing Badge component | Badge duplicated — architecture violation | Run Application Analysis before designing |
| Vague "Files to Modify" entries | Developer modifies more than needed | "Modify Navbar — add one import and one JSX element" is specific enough |
| Missing implementation order | Developer creates components with unresolved imports | Always order from least-dependent to most-dependent |
| Skipping Risk Assessment | Keyboard focus trap surprise hits during QA | Document every known risk in the spec |
| Starting implementation before Tech Spec approval | Developer builds the wrong architecture | The Orchestrator enforces the gate — this is non-negotiable |
