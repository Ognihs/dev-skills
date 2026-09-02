---
name: create-html-artifact
description: Explicit invocation only. Use only when the user names `create-html-artifact` and asks to use it; never activate automatically from a request for HTML, a report, architecture material, a showcase, or slides. Turn user-supplied files, notes, data, or a bounded description into a polished, tastefully art-directed HTML report, architecture explainer, one-page showcase, or browser-based slide deck using only vanilla HTML, CSS, JavaScript, and inline SVG. Do not use for production web UI, canonical requirement or design documents, PPTX/PDF output, or choosing unresolved software architecture.
---

# Create an HTML Artifact

Create one durable information artifact that normally opens directly from `file://` without installation or network access. The artifact presents supported content; visual polish must not hide missing facts or unresolved decisions. A final artifact may depend on a pinned remote Mermaid runtime only when the user explicitly accepts that portability tradeoff.

## Manual Invocation Gate

Proceed only when the user explicitly names this skill. A request that merely mentions HTML, reports, architecture, showcases, decks, slides, visualization, or presentation does not qualify. If this skill was selected implicitly, stop using it and handle the request normally.

## Input Contract

- Accept a description plus any supplied documents, code, data, images, style references, or output path.
- Read the relevant supplied content completely when feasible. Establish the audience, the artifact's single job, the primary mode, and the authority of each source.
- Distinguish supplied or verified facts, user decisions, inference, and unknowns. Do not invent evidence, metrics, citations, or binding architecture decisions.
- Ask only when the missing answer would materially change the artifact mode, content, or fidelity. Otherwise state a reasonable assumption.
- Treat canonical text documents as source material. Unless the user explicitly decides otherwise, HTML is a companion view rather than their replacement.

## Select One Primary Mode

- Before styling any mode, read and apply [references/visual-direction.md](references/visual-direction.md).
- For a report, explainer, or one-page showcase, read [references/report.md](references/report.md).
- For a software architecture, process, dependency, or data-flow explanation, read [references/architecture.md](references/architecture.md).
- For a presentation intended to be narrated one screen at a time, read [references/slides.md](references/slides.md).
- When the artifact contains a relationship diagram, flow, topology, sequence, state model, or similar visual, also read [references/diagrams.md](references/diagrams.md).
- Combine modes only when the request genuinely needs a hybrid. Name the primary mode and keep its reading model dominant.
- Before handoff, always read and apply [references/quality-bar.md](references/quality-bar.md).

## Workflow

1. **Establish the artifact contract.** Record the audience, purpose, primary mode, source boundary, requested content, style constraints, and output location. Respect repository instructions and preserve source files.
2. **Build the content spine.** Organize the argument or story before styling. Give every section one job, lead with the main answer or orientation, and keep evidence adjacent to the claim it supports.
3. **Commit to a visual direction.** Derive a compact aesthetic and implementation contract from the user's preferences, audience, reading context, content structure, and selected mode. Treat the subject as a compatibility constraint, not a literal style recipe. When brand or design tokens are supplied, use them instead of inventing a competing identity.
4. **Critique before implementation.** Apply the cliché, elegance, and coherence tests from `visual-direction.md`; remove genre shorthand and visual devices that encode no information. Build only after the direction feels deliberate and feasible.
5. **Implement one file.** Use semantic HTML, inline CSS, minimal vanilla JavaScript, inline SVG, and data URIs for required raster assets. Authoring may use an available renderer without adding it to the user's project; freeze its output into the HTML. Do not require packages, build tools, CDNs, remote fonts, external scripts, stylesheets, media, or runtime API calls unless the user explicitly approved a pinned remote Mermaid runtime.
6. **Validate and repair.** Run `node scripts/validate-html.mjs <artifact.html>` when Node is available, adding `--allow-remote-mermaid` only for an explicitly approved runtime dependency, or perform equivalent static checks. Then render from `file://`, inspect relevant viewports, exercise interactions, fix defects, and rerender affected views.
7. **Hand off the artifact.** Provide the path, primary mode, inputs used, checks actually run, and any unverified limitation. Open a browser only when the user requested it or separately authorized it.

## Shared Design Rules

- Use real content. Never ship `TODO`, `TBD`, lorem ipsum, fake metrics, placeholder logos, or decorative charts.
- Prefer an obvious reading path over a dashboard grid unless a dashboard is explicitly requested.
- Use portable local font stacks. Create character through composition, scale, weight, width, spacing, line breaking, and contrast rather than downloaded fonts.
- Spend visual boldness in one place and keep the surrounding system restrained.
- Let structure, position, shape, and color communicate meaning; never rely on color alone.
- Add interaction only when manipulating or revealing information improves understanding. Static content should remain static.
- Keep core content readable without JavaScript except where the selected mode requires interaction, such as slide navigation. An approved runtime-rendered diagram still needs an adjacent textual summary or other useful fallback.
- Include responsive behavior, visible keyboard focus, semantic controls, and reduced-motion handling where motion exists.
- Keep external citations as ordinary links when useful, but never make rendering depend on them.

## Implementation Boundaries

- Do not create React, Vue, Svelte, Tailwind, component-library, or bundler projects.
- Do not install a diagram renderer or add it to the user's project merely to create the artifact. Prefer an already available renderer or an authorized temporary remote authoring path.
- Do not turn the artifact into a production application, persistent editor, or new system of record.
- Do not select product behavior or unresolved software architecture merely to complete the visual.
- Do not silently modify supplied files or create extra deliverables beyond what the artifact needs.
- Do not claim visual quality from source inspection alone. If browser rendering is unavailable, report static validation separately and state that rendered QA remains incomplete.

## Completion Checklist

- The user explicitly invoked this skill by name.
- The artifact's audience, job, primary mode, and evidence boundary are clear.
- One self-contained HTML file opens from `file://` without required network access, unless the user explicitly approved a pinned remote Mermaid runtime and its offline limitation is reported.
- Requested content is complete, traceable, and free of placeholders or invented facts.
- The visual system suits the audience, reading task, and content structure without relying on category clichés or generic generated-UI defaults.
- Keyboard, narrow-screen, overflow, interaction, and reduced-motion behavior were checked where relevant.
- Static and rendered validation are reported honestly, including any limitation.
