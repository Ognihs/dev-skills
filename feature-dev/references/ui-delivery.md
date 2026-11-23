# User-Facing UI Delivery

Apply these rules whenever the selected delivery scope adds or modifies user-facing UI. They complement — and never replace — the approved spec, `Agreed` architecture rules, and automated TDD.

## Authority and Escalation

- Treat the approved spec's UI contract, `Agreed` UI baseline decisions in the project architecture document (normally `docs/architecture.md`), and compatible patterns on adjacent screens as binding constraints; treat `Proposed` or `Reconstructed` architecture notes only as context.
- Never silently invent or alter route or shell placement, container shape (page versus drawer versus modal), primary action hierarchy, URL versus local state ownership, or destructive-action safeguards. Route missing or conflicting UX contracts through the Clarification Gate before coding.

## Consistency and Component Reuse

- Reuse the repository's established layout shell, component primitives, form/table/dialog patterns, spacing scale, typography hierarchy, and semantic color tokens.
- Do not introduce ad-hoc pixel spacing, raw color values, parallel modal/toast systems, or generic decorative card grids and gradients that diverge from neighboring screens.

## Operational Interaction Rules

- **Hierarchy and cognitive load:** Keep one clear primary action per view or dialog; subordinate secondary actions and move low-frequency or row-overflow actions into menus rather than crowding toolbars.
- **Navigation and URL state:** Use semantic navigation links (such as `<a>` or router links on the web) so reload, back/forward, and open-in-new-tab work; use semantic action controls (such as `<button>`) for in-place actions. Synchronize approved tab, search, filter, sort, and pagination state with URL routes or query parameters (or the platform's equivalent navigation state) so reload and history navigation preserve user context. Warn before discarding unsaved edits where required by the spec or project baseline.
- **Forms and pending mutations:** Pair every input with a visible label or accessible name. Keep submit enabled until submission starts, block duplicate triggers and indicate in-flight status at the control, preserve user-entered values on failure, render validation errors inline near the field, and move focus to the first error on failed submit.
- **Complete states and safe actions:** Implement all applicable `loading`, first-run `empty` (purpose + primary action), filtered `empty` (no-match explanation + reset action), `error` (plain-language cause + concrete recovery action), `permission/read-only`, and destructive confirmation or undo states. Prevent layout breakage on `0` items, large lists, and long strings (for example `min-w-0` on flex children with truncation or wrapping).
- **Keyboard and focus hygiene:** Never bind click handlers to non-interactive containers (`<div>` or `<span>`) without button semantics and keyboard support. Preserve visible focus indicators (`:focus-visible`); move focus into dialogs or drawers on open, support `Escape` dismissal when safe, and restore focus to the trigger on close.

## Testing and Rendered Verification

1. **Automated behavioral tests first:** Drive behavior with TDD at user-observable seams — accessible roles and labels, URL/router transitions, form submission and error recovery, and loading/empty/confirmation transitions — rather than asserting CSS class strings or private hook internals.
2. **Rendered browser verification:** Passing component or DOM unit tests do not verify visual hierarchy, shell integration, or real navigation state. Browser E2E checks mandated by the approved spec or repository are required checks under the Evidence Rules; otherwise live rendered inspection is a supplementary check that must be run whenever browser rendering is available to verify applicable aspects:
   - host shell integration, primary action hierarchy, and visual/interaction consistency with adjacent screens;
   - end-to-end primary flow, page reload and browser back/forward state survival, and keyboard `Tab` / `Escape` operation;
   - loading, empty, error, and long-text rendering across desktop and narrow viewports without clipping or overlap;
   - zero new browser console errors or runtime framework/accessibility warnings.
3. **Host-agnostic fallback:** When live browser rendering is unavailable or blocked by the environment, a spec- or repository-mandated browser check remains a blocked required check; for supplementary rendered inspection, run all available automated UI, type, and build checks, perform a static audit against the rules above, and record a reasoned disposition in Delivery stating that rendered browser verification was not run and why. Never claim rendered UI verification from source reading or simulated-DOM tests alone.

## Gotchas

- Shipping a populated happy-path view whose empty, error, or failed-save path wipes user input or strands the user without a next action.
- Storing filters, tabs, or pagination only in component state so refreshing or navigating back resets the user's workspace.
- Claiming UI acceptance from passing simulated-DOM unit tests while the real route is unwired from navigation, overflows its shell, or logs runtime errors.
