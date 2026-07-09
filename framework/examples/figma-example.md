# Example: Figma Request

## Scenario

A product team has a completed Figma design for a new Pricing Page. The design includes three pricing tiers, a Monthly/Annual billing toggle, a feature comparison table, and full responsive behavior across three breakpoints. The team submits a Figma Request to convert the design to code.

---

## Input

```
Design Source:
https://figma.com/pricing-page-v3-final

Target Views or Pages:
- Pricing Page — Full page layout
- Pricing Card (3 variants: Starter, Pro, Enterprise)
- Billing Toggle (Monthly / Annual)
- Feature Comparison Table (desktop and mobile collapsed versions)

Technology Stack:
Vue 3 with Composition API, Tailwind CSS, Pinia for state management.

Breakpoints:
- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px

Existing Components to Reuse:
- BaseButton (src/components/BaseButton.vue)
- SectionHeading (src/components/SectionHeading.vue)
- CheckIcon (src/components/icons/CheckIcon.vue)

Design Tokens Reference:
tailwind.config.js — all brand colors and spacing already defined.

Special Interactions or Animations:
- Billing toggle animates the sliding indicator (200ms ease-in-out).
- Cards have a 150ms box-shadow transition on hover.
- "Most Popular" card has a highlighted border with a pulsing glow animation.

Priority Views:
1. PricingCard component (all 3 variants)
2. BillingToggle component
3. PricingPage layout assembly
4. Feature Comparison Table

Known Deviations from Design:
- The confetti animation that plays after plan selection is out of scope for this sprint.

Additional Context:
Annual pricing is 20% less than monthly. The toggle switches the displayed price.
Current plan selection state should be stored in Pinia.
```

---

## Expected AI Behaviour

1. **Orchestrator validates** design source accessibility before proceeding. If Figma link fails, pipeline halts.
2. **Solution Architect** runs `website_analysis.md` — identifies BaseButton, SectionHeading, CheckIcon as reusable.
3. **Figma Implementer Agent** opens the Figma file and begins token extraction before touching any code.
4. Agent extracts: all color tokens, typography scale, spacing values, card border widths and radii, shadow values.
5. Agent maps extracted tokens to existing `tailwind.config.js` values — flags `--color-glow-primary` as a new token not in config.
6. Agent documents responsive layout at all three breakpoints — card grid collapses from 3-col → 2-col → 1-col.
7. Agent documents all interaction states: card hover shadow, toggle animation timing, "Most Popular" glow.
8. Agent produces the **Design Specification Document** before any code is written.
9. **Frontend Developer** implements components in priority order using the specification as the visual authority.
10. **Parallel review** runs: UI Reviewer compares implementation against Figma; QA validates responsive; Accessibility checks ARIA on toggle; PR Auditor checks Vue 3 patterns.

---

## Design Specification Document (Excerpt)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SPECIFICATION — Pricing Page
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOKEN INVENTORY (mapped to Tailwind config)
─────────────────────────────────────────
Primary Brand:    #6366F1  → colors.indigo.500 (existing)
Accent:           #8B5CF6  → colors.violet.500 (existing)
Surface:          #FFFFFF  → white (existing)
Border Default:   #E5E7EB  → colors.gray.200 (existing)
Border Featured:  #6366F1  → colors.indigo.500 (existing)
Glow Color:       rgba(99,102,241,0.4) → NEW — add to tailwind.config.js

Typography:
  Page Title:     font-bold text-4xl (48px) / text-3xl tablet / text-2xl mobile
  Card Title:     font-semibold text-xl (20px)
  Price Value:    font-bold text-5xl (48px) / text-4xl mobile
  Feature Text:   font-normal text-sm (14px) text-gray-600

Spacing (card internal):
  Card padding:   p-8 (32px) desktop / p-6 (24px) mobile
  Between cards:  gap-6 (24px)

LAYOUT — Desktop (1440px)
─────────────────────────
Section max-width: max-w-6xl mx-auto px-6
Card grid: 3-column (grid-cols-3 gap-6)
Featured card: scale-105 with z-10 for visual prominence

LAYOUT — Tablet (768px)
───────────────────────
Card grid: 2-column (grid-cols-2 gap-6)
Bottom card: centered (col-span-2 max-w-sm mx-auto)

LAYOUT — Mobile (375px)
───────────────────────
Card grid: 1-column (grid-cols-1 gap-4)
Full width cards

INTERACTION STATES
──────────────────
Card hover:       box-shadow transition 150ms ease-in-out (shadow-md → shadow-xl)
Toggle slide:     transform translateX 200ms ease-in-out
Featured glow:    box-shadow 0 0 0 4px rgba(99,102,241,0.4) — pulsing keyframe

COMPONENT MAP
─────────────
Pricing Card (Figma)    → PricingCard.vue          [NEW]
Billing Toggle (Figma)  → BillingToggle.vue        [NEW]
Feature Table (Figma)   → FeatureTable.vue         [NEW]
Pricing Page (Figma)    → PricingPage.vue          [NEW]
CTA Button (Figma)      → BaseButton.vue           [REUSE]
Section Title (Figma)   → SectionHeading.vue       [REUSE]
Check Icon (Figma)      → CheckIcon.vue            [REUSE]

MISSING STATES NOTED
─────────────────────
- Loading state for plan selection not in design — flagged for Product Manager.
- Error state for failed plan switch not in design — flagged for Product Manager.
```

---

## Expected Output

- Design Specification Document (tokens, layouts, interactions, component map)
- `PricingCard.vue` — 3 variants via props (`tier: 'starter' | 'pro' | 'enterprise'`)
- `BillingToggle.vue` — animated toggle, emits `'change'` event
- `FeatureTable.vue` — desktop table + mobile accordion collapse
- `PricingPage.vue` — full page assembly
- New Tailwind config entry for glow color
- All components responsive at 375px, 768px, and 1440px

---

## Common Mistakes

| Mistake | Consequence | Prevention |
|---------|-------------|------------|
| Starting code before extracting tokens | Hardcoded values throughout — immediate UI Review failure | Complete Design Spec before writing any code |
| Not mapping to existing Tailwind config | New arbitrary values introduced — inconsistency | Always cross-reference extracted values with existing token config |
| Skipping missing state documentation | Product Manager is unaware of design gaps | Flag ALL missing states in the spec — never invent them |
| Not checking existing components | BaseButton, SectionHeading duplicated | Application Analysis runs before design extraction |
| Skipping tablet breakpoint | 2-column layout broken at 768px | Every defined breakpoint must be implemented — no exceptions |
