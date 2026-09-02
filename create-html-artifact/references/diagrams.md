# Diagram Construction

Use these rules for architecture, dependency, topology, process, sequence, state, and data-model diagrams. A renderer improves geometry; it does not decide what the diagram should say.

## Shape the View First

- Give one diagram one relationship model. Separate static structure, runtime order, data movement, ownership, and deployment when combining them would create competing reading directions.
- Choose a clear entry point and one dominant left-to-right or top-to-bottom direction.
- Keep node labels short and move responsibilities, evidence, and caveats into adjacent prose.
- When the important relationships no longer scan quickly, split the view into an orientation diagram and one or more focused detail diagrams. Do not solve excess scope by shrinking text.
- Use containers only for meaningful boundaries such as ownership, deployment, trust, or lifecycle.

## Choose a Rendering Path

1. Use hand-positioned inline SVG for a small view whose composition carries meaning and whose edges can remain simple.
2. For flowcharts, sequences, states, ER models, and similar standard forms, prefer Mermaid when it can be rendered during authoring.
3. For dense directed dependencies, clusters, or topology, prefer an available Graphviz `dot` renderer when it gives a materially clearer result.
4. If no renderer is available, simplify or split the diagram before attempting manual SVG. Do not implement a general-purpose layout engine inside the artifact.

Do not install a renderer or add dependencies to the user's project without permission. Authoring tools are not deliverable dependencies.

## Remote Mermaid Without Local Installation

When network use is authorized, create a temporary authoring page that loads an exact Mermaid version over HTTPS, renders trusted diagram source, and serializes the resulting SVG. Inline that SVG into the final artifact and remove the temporary page. Keep the Mermaid source in a non-executing `<template data-diagram-source="mermaid">` when future maintenance benefits from it.

Use Mermaid's strict security mode, a portable local font stack, and a theme derived from the artifact tokens. Prefer the default layout for ordinary graphs and ELK for larger or more intricate supported diagrams. Automatic output must still pass rendered review.

If the user explicitly chooses runtime Mermaid instead:

- Pin the complete library version; never use `latest` or a floating major version.
- State that the diagram requires network access and test the actual `file://` loading path.
- Keep a useful adjacent textual summary available when the library, JavaScript, or network is unavailable.
- Do not send sensitive diagram content to a remote rendering API. Loading a library and rendering locally in the browser is a different trust boundary from uploading diagram source.

## SVG and Visual Semantics

- Use a responsive `viewBox`; avoid fixed dimensions that force clipping.
- Give each figure a visible caption plus useful `<title>` and `<desc>` content.
- Use consistent node padding, corner treatment, line weight, arrowheads, and label placement.
- Encode node or edge types with labels, shape, or line treatment as well as color.
- Use dashed lines and explicit labels for inferred, optional, delayed, or unresolved relationships.
- Route feedback and exceptional paths around the main flow where possible.
- Avoid edges through nodes or labels, ambiguous crossings, detached arrowheads, and unexplained bidirectional arrows.

## Rendered Repair Loop

Inspect the diagram at its intended desktop width and at the artifact's narrow viewport. Check reading order, edge crossings, overlaps, clipped labels, overly long edges, unbalanced whitespace, and legibility at the actual rendered scale. Adjust direction, grouping, wording, renderer options, or scope; rerender until the diagram works without zooming for its primary reading task.
