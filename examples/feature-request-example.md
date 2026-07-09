# Example: Feature Request

## Scenario

A SaaS analytics platform needs a notification center so users can see system alerts, status updates, and activity events in one place. The product team submits a Feature Request to the framework.

---

## Input

```
Feature Name:
User Notification Center

Business Goal:
Users frequently miss important system alerts because they are delivered only via email.
A persistent in-app notification center will reduce missed alerts by 80% and improve
user engagement with platform activity.

Target Users:
Logged-in dashboard users across all subscription tiers.

Technology Stack:
React 18 with TypeScript, CSS Modules for styling, React Context for shared state.

Functional Requirements:
1. Display a bell icon in the top navigation bar with an unread count badge.
2. Open a notification dropdown panel on bell click.
3. Each notification shows: title, description, timestamp, and read/unread status.
4. Clicking a notification marks it as read and updates the badge count.
5. A "Mark all as read" button clears all unread notifications at once.
6. The panel closes on outside click or Escape key press.
7. Empty state message when no notifications exist.

Non-Functional Requirements:
- Responsive: Yes — Mobile (375px), Tablet (768px), Desktop (1440px)
- Accessibility: WCAG AA
- Performance: Panel must open within 100ms

Acceptance Criteria:
1. Bell icon is visible in the navbar at all three breakpoints.
2. Unread badge shows the correct count and disappears when count reaches zero.
3. Panel opens on bell click and closes on outside click or Escape key.
4. Each notification click marks it as read and decrements the badge count.
5. "Mark all as read" sets all notifications to read in one action.
6. Keyboard navigation: Tab to bell → Enter/Space to open → Escape to close.
7. Empty state message displays when no notifications exist.

Design Reference:
https://figma.com/notification-center-v2

Existing Components to Reuse:
- Navbar (src/components/Navbar/)
- Badge (src/components/Badge/)
- IconButton (src/components/IconButton/)

Out of Scope:
- Real-time WebSocket updates (static data only for this sprint).
- Notification preference settings page.
- Push notification browser integration.

Additional Context:
Notifications are served from GET /api/notifications. Mark-read via PATCH /api/notifications/:id.
```

---

## Expected AI Behaviour

1. **Orchestrator validates** all required fields are present before routing.
2. **Product Manager Agent** receives the request and generates a structured PRD — it does NOT start writing code.
3. **Orchestrator presents the PRD** to the user and halts at the approval gate.
4. After approval, **Solution Architect** runs `website_analysis.md` and `project_research.md` to understand the existing Navbar, Badge, and state patterns.
5. **Solution Architect** produces a Tech Spec — listing exact file paths, component hierarchy, and the React Context implementation plan.
6. **Orchestrator presents the Tech Spec** and halts at the second approval gate.
7. After approval, **Frontend Developer** implements in the defined order: Context → Hook → NotificationItem → NotificationPanel → Bell integration into Navbar.
8. **Parallel review** runs: Responsive, Accessibility, Code Review, and UI Review simultaneously.
9. **Release Pipeline** compiles the Unified Delivery Report and requests final sign-off.

---

## Expected Output

### PRD Sections
- Feature Name, Business Goal, Target Users
- 7 Functional Requirements
- Non-Functional Requirements (Responsive, Accessibility, Performance)
- 7 Acceptance Criteria
- Out of Scope (3 items)
- Scope Classification: Medium

### Technical Specification Sections
- Tech Stack: React 18, TypeScript, CSS Modules, React Context
- Component Hierarchy: NotificationContext → NotificationBell → NotificationPanel → NotificationItem
- Files to Create: `NotificationContext.tsx`, `useNotifications.ts`, `NotificationBell.tsx`, `NotificationPanel.tsx`, `NotificationItem.tsx` + 3 CSS Module files
- Files to Modify: `Navbar.tsx` (import and render NotificationBell)
- API Integration: `GET /api/notifications`, `PATCH /api/notifications/:id`
- Implementation Order: Context → Hook → Item → Panel → Bell → Navbar integration
- Risk Assessment: Badge count sync with Context state — flag for careful implementation

### Implementation
- Pixel-perfect NotificationBell with animated badge
- NotificationPanel with correct open/close behavior
- Full keyboard navigation with focus management
- ARIA attributes: `aria-expanded`, `aria-haspopup`, `aria-live` for count updates
- Responsive layout at all three breakpoints
- Empty state component

### Review Reports
- Responsive: APPROVED — all 3 breakpoints pass
- Accessibility: APPROVED — WCAG AA, keyboard navigation complete
- Code Review: APPROVED — Clean Context implementation, no business logic in components
- UI Review: APPROVED — Pixel-accurate against Figma specification

---

## Common Mistakes

| Mistake | Consequence | Prevention |
|---------|-------------|------------|
| Starting implementation before PRD approval | Misaligned feature scope | Orchestrator enforces the approval gate — do not bypass it |
| Calling the API directly inside `NotificationBell` | Business logic in markup layer — architecture violation | API calls belong in a hook or service layer |
| Hardcoding colors instead of using CSS Module tokens | Visual inconsistency — immediate UI Review failure | Reference design tokens from `styles/tokens.css` |
| Not implementing keyboard close on Escape | Accessibility failure — WCAG 2.1 Success Criterion 1.4.13 | Test keyboard navigation before submitting |
| Forgetting the empty state | Broken UX when no notifications exist — missing acceptance criterion | Acceptance criteria are a checklist — check each one before submitting |
