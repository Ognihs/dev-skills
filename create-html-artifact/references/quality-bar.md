# HTML Artifact Quality Bar

Apply this review after implementation and after every material repair. Fix failures before handoff where the environment permits.

## Content Fidelity

- Every requested section, fact, metric, relationship, and source is present or explicitly reported as unavailable.
- Facts, user decisions, inference, and unknowns are not visually conflated.
- No `TODO`, `TBD`, lorem ipsum, placeholder labels, fake data, unsupported citation, or invented brand asset remains.
- The title, opening orientation, section order, and closing action fit the audience and the artifact's single job.
- Every chart, diagram, interaction, and decorative element has a reader-facing purpose.

## Self-Contained File

- The deliverable is one `.html` file with inline CSS and JavaScript.
- Required fonts, scripts, styles, images, media, and data do not depend on the network or sibling files, except for an explicitly approved pinned Mermaid runtime.
- External citations may remain ordinary links but are not required to render or navigate the artifact.
- The file opens from `file://`; no local server, build step, package installation, or hidden runtime is required. When runtime Mermaid was approved, test it from `file://` with network access and report that the diagram itself is not offline-safe.
- The source contains no secrets, local credentials, transient request IDs, or unintended absolute filesystem paths.

## Structure and Accessibility

- `<!doctype html>`, UTF-8 charset metadata, a meaningful language, title, and viewport metadata are present.
- Landmarks, headings, lists, tables, figures, captions, and controls use appropriate semantic elements.
- Interactive elements are reachable and operable by keyboard with a visible focus state.
- Images and SVG figures have useful accessible text; decorative imagery is hidden from assistive technology.
- Color is not the only signal, contrast remains legible, and motion respects `prefers-reduced-motion`.
- Important content is available without hover and is not lost when JavaScript is unavailable, except for an explicitly interactive presentation control.

## Rendered Review

Inspect the delivered file itself, not only its source or a flattened screenshot.

- Open it through `file://`. Keep the network unavailable or unused for the default artifact; when runtime Mermaid was explicitly approved, test both its online rendering and its useful offline fallback.
- Check a representative desktop viewport and a narrow mobile viewport for reports, explainers, showcases, and static dashboards.
- Check a representative 16:9 viewport, navigation, and slide boundaries for decks.
- Look for overlap, clipping, horizontal overflow, unreadable labels, awkward line breaks, accidental scroll traps, and inconsistent alignment.
- Exercise every meaningful interaction with pointer and keyboard. Check the browser console when available.
- Verify print layout when printing or PDF export is part of the intended use.
- Review light/dark behavior only when the artifact implements both; one carefully finished theme is better than two incomplete themes.

For every relationship diagram, also verify:

- The intended reading order is obvious and matches the caption and surrounding explanation.
- No edge crosses a node or label; unavoidable edge crossings remain distinguishable.
- Labels, arrowheads, containers, and feedback paths are not clipped, detached, or ambiguous.
- The diagram has not preserved too much scope by shrinking text or creating excessive crossings.
- Automatically laid-out output was visually reviewed and repaired rather than accepted from successful rendering alone.

## Visual Critique

- The palette, typography, composition, and signature element form a coherent visual direction suited to the audience and reading task.
- The artifact does not use a category cliché as a substitute for art direction; technical content does not default to blue-black, cyan-on-dark, glow, grid texture, or dark mode.
- The artifact does not default to a gradient hero, generic card grid, emoji headings, meaningless badges, or repeated dashboard panels.
- Hierarchy remains clear when decoration is mentally removed.
- Proportion, alignment, typography, whitespace, and controlled contrast make the undecorated composition feel finished.
- A thumbnail view preserves the intended hierarchy and reveals a deliberate page silhouette.
- The full-page rhythm contains purposeful changes in density without repetitive blocks, cramped stretches, or empty dead zones.
- Dense content receives space; secondary detail is subordinated rather than merely made smaller.
- Repeated elements are consistent, while different information types receive appropriately different treatment.
- The opening, middle, ending, and narrow layout show comparable design completion.
- Removing one non-functional ornament improves or leaves the design unchanged; remove it.

## Validation Outcome

Report static validation, rendered viewports, interactions, offline behavior, diagram rendering path, and print checks separately. Never imply that unrun checks passed. If a browser is unavailable, state that only static validation was completed and rendered QA remains open. If runtime Mermaid was approved, report the pinned version and its network dependency.
