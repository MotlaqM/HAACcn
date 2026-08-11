---
version: alpha
name: HAACcn
description: A calm, content-first design system for multiple products.
reference: https://vercel.com/design.md
foundation: Base UI
distribution: shadcn GitHub source registry
font-family: Inter
colors:
  primary: var(--foreground)
  secondary: var(--muted-foreground)
  background-main: var(--background)
  background-primary: var(--card)
  background-elevated: var(--popover)
  border-primary: var(--border)
  brand-primary: "#FF591E"
  brand-secondary: "#FB432C"
  focus: "#3B82F6"
  success: "#16A34A"
  warning: "#D97706"
  destructive: "#DC2626"
spacing:
  base: 4px
  fine-step: 2px
rounded:
  small: 4px
  base: 6px
  large: 8px
  circular: 999px
motion:
  default-duration: 100ms
  overlays: 150ms-300ms
principles:
  - Content first, controls second
  - Progressive disclosure is the default interaction model
  - Density adapts to the user's task
  - Navigation is object-centered and shallow
  - Color communicates state, not decoration
  - Typography uses a small functional scale
  - Generic shells, specialized content
  - State is visible where it changes behavior
  - Primary actions stay close to the work
  - Previews reduce commitment cost
  - Empty, loading, and error states stay calm
---

# HAACcn Design System

## Purpose

HAACcn is a reusable design system for several products. It provides a shared visual language and interaction model without making every product look like the same screen. The shell and component anatomy stay familiar; product-specific objects, content, density, and workflows remain specialized.

The interface is calm by default and becomes denser when people search, triage, compare, or administer work. The goal is to make the current work object readable, preserve orientation, and reveal controls when intent is clear.

## Source-of-truth rule

This file is authoritative for visual and behavioral decisions. The shadcn and Base UI documentation define component composition, primitive behavior, and accessibility contracts. When upstream styling conflicts with this document, keep the upstream behavior and use the HAACcn visual system.

## Color

Use semantic CSS variables in components. Neutral surfaces, borders, opacity, and text tone carry most structure. Color is reserved for state and meaning.

- `--background` is the application ground.
- `--card` is the main readable surface.
- `--popover` is the elevated surface for menus, tooltips, and dialogs.
- `--foreground` is primary text.
- `--muted-foreground` is supporting text and metadata.
- `--border` separates objects without heavy containers.
- `--ring` is the keyboard focus color.
- `--important` is a high-attention blue action or unread state.
- `--success`, `--warning`, and `--destructive` communicate outcomes and risk.
- `--brand` and `--brand-secondary` are reserved for onboarding and special emphasis.

Do not use accent color as decoration. If a color does not explain state, urgency, access, visibility, progress, or risk, prefer a neutral.

### Neutral scale

| Token | Value |
| --- | --- |
| gray-50 | `#FCFCFC` |
| gray-100 | `#F5F5F5` |
| gray-150 | `#F0F0F0` |
| gray-200 | `#E5E5E5` |
| gray-300 | `#D4D4D4` |
| gray-400 | `#A3A3A3` |
| gray-500 | `#737373` |
| gray-600 | `#525252` |
| gray-700 | `#404040` |
| gray-750 | `#313131` |
| gray-800 | `#262626` |
| gray-850 | `#1E1E1E` |
| gray-900 | `#171717` |
| gray-950 | `#0D0D0D` |

## Typography

Use Inter through `var(--font-inter)`, falling back to the platform sans-serif stack. Hierarchy comes from tone, weight, grouping, and placement before size.

| Role | Size | Weight | Use |
| --- | --- | --- | --- |
| Large title | 36px | 700 | Rare page-scale orientation |
| Title 1 | 24px | 500 | View headings |
| Title 2 | 20px | 500 | Object and section titles |
| Title 3 | 18px | 500 | Local headings |
| Headline | 16px | 500 | Compact row titles and labels |
| Body | 14–16px | 400 | Descriptions, previews, and prose |
| Caption | 12px | 500 | Metadata, state labels, and hints |

Most product text stays between 12px and 18px. Larger type is for reading views and major orientation, not dense controls.

## Spacing and density

The system supports 2px increments while retaining a visible 4px rhythm. Common values are 4, 6, 8, 10, 12, 16, 24, 32, and 40px.

- Reading uses wider measures, larger gaps, fuller previews, and fewer visible controls.
- Scanning uses compact rows, quiet metadata, reduced previews, and strong grouping.
- Searching uses dense results, highlighted matches, and minimal decoration.
- Triaging keeps collection context visible beside the selected detail and exposes quick actions.
- Configuring uses clear labels, helper text, and deliberate footer actions.

Density changes with the task, not designer preference.

## Elevation and depth

Use tonal surfaces and borders before shadow. Buttons may use a restrained tactile shadow. Menus, dialogs, hover cards, and selected objects may rise locally; page sections should not look like stacked decorative panels.

## Motion

Motion clarifies state change. Controls use approximately 100ms transitions. Menus, dialogs, and temporary overlays may use 150–300ms transitions when the movement clarifies reveal or dismissal.

Preferred patterns are fade, slide-fade, scale-fade, short shell-width transitions, and subtle tap scale. Avoid looping motion and movement that makes dense work harder to scan.

## Shapes

Use compact radii: 4px for dense controls, 6px for standard controls, 8px for larger controls and elevated surfaces, and full rounding for avatars, pills, and circular icon controls. Use one radius family within a view unless shape communicates a different object type.

## Component rules

### Buttons

Buttons are compact and tactile. The base height is 30px, small is 26px, and large is 40px. Icon-only buttons require an accessible name.

- `primary`: the single most important local action.
- `base`: neutral action with a tactile surface.
- `plain`: low-emphasis action in dense UI.
- `flat`: quiet secondary action.
- `text`: link-like action.
- `important`: high-attention blue action.
- `brand`: onboarding or special emphasis.
- `destructive`: destructive confirmation.

Disabled actions explain why through a tooltip or nearby text. Loading buttons stay disabled, preserve their label, and compose a spinner rather than changing the component API.

### Navigation and collections

Navigation is object-centered and shallow. Preserve the parent context through titlebars, breadcrumbs, tabs, split views, or sidebars. Repeated rows lead with identity and content, then state, then secondary actions. Row-level manipulation stays hidden until hover, focus, selection, or menu intent.

### Forms

Forms use `FieldGroup`, `Field`, visible labels, descriptions, and errors. Creation flows follow user intent rather than database structure. Invalid controls pair visible error text with `aria-invalid`; disabled controls use both native disabled behavior and explanatory copy when the reason is not obvious.

### Dialogs and menus

Dialogs use header, description, content, and footer actions. Every dialog has a title. Confirmation friction matches consequence: simple confirmation for small deletes, save/discard for unsaved work, acknowledgement for cascading effects, and typed confirmation for named containers with content.

Menus group related actions, use sparse separators, show keyboard shortcuts as hints, and keep destructive actions distinct. Advanced actions remain closed until explicit trigger intent.

### Empty, loading, and error states

Use a simple icon, direct title, short explanation, and one obvious recovery action when it changes the next step. Empty states are guidance, not marketing. Errors say what happened, why when known, and what to do next.

## Accessibility

- Every interactive element has a visible keyboard focus treatment.
- Icon-only controls have accessible names.
- Dialog, sheet, and drawer content always has a title.
- Menu, select, command, and option items remain inside their semantic groups.
- Color is never the only signal for state.
- Reduced-motion preferences are respected.
- Disabled controls preserve legibility and explain non-obvious blockers.
- Repeated controls use fixed icon and action lanes so scanning does not drift.

## Voice

Copy is direct, specific, and product-native. Name the object and the outcome: “Create report,” “Save draft,” or “Delete project.” Explain blocked actions with the reason. Avoid filler, hype, clever empty states, and internal permission terminology.

## Do and do not

- Do make the work object readable before secondary controls.
- Do use neutral surfaces and semantic color.
- Do keep parent context visible.
- Do protect unsaved work and distinguish destructive actions.
- Do provide keyboard support for repeated navigation and triage.
- Do not expose every action in every row.
- Do not use accent color decoratively.
- Do not bury common destinations in deep navigation.
- Do not make users open a full page merely to decide whether an object matters.

## Upstream policy

HAACcn follows the current shadcn Base UI component inventory and preserves its public composition and accessibility behavior. Upstream changes are reviewed with `shadcn add --dry-run` and `--diff`; design-system customizations are then merged deliberately. Registry validation reconciles the local catalog against a checked-in upstream inventory snapshot.
