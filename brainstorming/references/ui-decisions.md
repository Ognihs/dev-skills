# User-Facing UI Decisions

Apply these rules whenever a change adds or modifies a user-facing interface. Default to an operational task surface — clear orientation, familiar platform controls, consistent patterns, and low cognitive load — unless the user explicitly asks for a marketing or showcase page.

## 1. Align With the Project UI Baseline First

- Inspect the project architecture document if present (normally `docs/architecture.md`), shared UI primitives, spacing and color tokens, routing/shell structure, and two or three adjacent existing screens before proposing layout or interaction. Honor `Agreed` UI baseline rules unless the user approves an explicit spec override; treat `Proposed` or `Reconstructed` notes as context to confirm before relying on them.
- Reuse established shell placement, component primitives, form validation, feedback surfaces (inline, banner, or toast), and terminology by default. Propose a new pattern only when existing ones fail the requirement, and confirm that divergence explicitly.
- Choose the host container deliberately:
  - **Dedicated route/page:** multi-step flows, dense tables or forms, or views users bookmark, share, or refresh.
  - **Drawer or split panel:** contextual inspection or secondary editing where preserving parent list/context matters.
  - **Modal dialog:** short, blocking confirmations or small focused inputs; never cram complex forms, multi-stage flows, or deep-linkable views into a modal.

## 2. Information Hierarchy and Cognitive Load

- Give each screen or surface **one primary job** and at most **one primary action button**. Keep 1–2 secondary actions visible and move lower-frequency, bulk, or destructive row/page actions into an overflow menu.
- Keep simultaneous peer choices at any decision point to **4 or fewer visible options** where practical. Group larger sets or apply progressive disclosure — show core controls and sensible defaults first, and reveal advanced filters or rare settings on demand.
- Size the design against realistic content bounds: `0` items, `1` item, typical volume, high volume (pagination or virtualization threshold), and long user-supplied labels or text.

## 3. Navigation Flow and State Ownership

- Resolve the full path for every flow: entry point, active-location indicator, completion destination, `Cancel` / `Back` / `Escape` exit, and whether unsaved edits warn before navigation or dismissal.
- Default shareable or reload-worthy view state — active tab, search query, filters, sort order, pagination, and deep-linkable selected item — to **URL routes or query parameters** so reload and browser back/forward preserve context. Keep transient drafts, open menus, and hover/focus state local.

## 4. Complete View-State Matrix and Safe Actions

Do not approve a happy-path-only UI design. Resolve every applicable state:

- **Loading and refresh:** initial load (prefer layout-preserving skeletons or calm inline indicators over blank areas or full-screen spinners) versus background refresh that preserves visible data.
- **Empty:** separate **first-run empty** (explain what belongs here and offer the primary creation action) from **zero-match filter/search empty** (state that nothing matched and offer a one-action filter reset).
- **Pending mutation:** prevent duplicate submission, show in-flight progress at the trigger, and specify whether the UI updates optimistically or waits for confirmation.
- **Error and recovery:** preserve user input on failure; show field validation inline beside the field and request/system failures in context with plain-language cause and a concrete next action (retry, adjust input, or exit).
- **Permission or read-only:** decide whether unavailable actions are hidden or disabled with a clear reason.
- **Destructive or irreversible actions:** require proportional confirmation naming the target and impact, or an immediate undo window — never silent immediate deletion.

## Gotchas

- Treating "show list with filter, edit, and delete" as design-complete while leaving container choice, primary action, URL persistence, and empty/error states unspoken.
- Resetting active filters, pagination, scroll context, or form drafts after a failed save or a row-level action.
- Mixing inline banners, alerts, and toasts arbitrarily across sibling screens for the same class of feedback.
- Using prose alone when spatial hierarchy or competing layouts are genuinely ambiguous — use a compact ASCII wireframe or [`visual-decisions.md`](visual-decisions.md) / `prototype` with user consent when needed, then record the chosen structure textually in the spec.

## Pre-Spec UI Checklist

- [ ] Host route/shell placement, container choice, and reuse of shared UI primitives/tokens are explicit.
- [ ] Primary task, single primary action, option grouping/progressive disclosure, and realistic data bounds are settled.
- [ ] Applicable entry, completion, cancel/back behavior, unsaved-change handling, and URL versus local state ownership are defined.
- [ ] All applicable non-happy and safety states (loading, first-run and filtered empty, pending submit, error recovery, permission, and destructive confirmation or undo) are resolved rather than left to implementation.
