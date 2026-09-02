# Architecture and Process Explanations

Use this mode to explain supplied or verified software architecture, responsibilities, dependencies, execution flow, data flow, deployment boundaries, or operational behavior. It may clarify evidence; it must not choose unresolved architecture.

## Establish the Diagram Contract

State what the visual represents and what it deliberately omits. Choose one primary scale, such as capability, process, deployable, module, or request path. Do not mix source dependency, runtime control flow, data movement, and deployment topology in one diagram unless their relationship is the actual point.

## Recommended Structure

1. Orientation: purpose, scope, audience, and a compact summary.
2. System boundary: actors, external systems, owned components, and trust or deployment boundaries where relevant.
3. Primary diagram: the smallest view that explains the main relationship.
4. Representative flow: one normal path and the important failure, retry, or asynchronous path.
5. Component detail: responsibilities, public contracts, data ownership, and important constraints.
6. Evidence, assumptions, unknowns, and verified places to inspect next.

Use separate figures or selectable views when the reader needs both a static structure and a runtime sequence.

## SVG Rules

- Use inline SVG with a responsive `viewBox`; avoid fixed pixel dimensions.
- Give each figure a visible caption plus accessible `<title>` and `<desc>` content.
- Use labeled `<g>` groups, simple coordinates, consistent line weights, and reusable arrow markers.
- Draw direction explicitly. Highlight the common path and visually subordinate rare or failure paths.
- Encode states or node types with shape and labels as well as color.
- Use dashed lines and explicit labels for inferred, optional, or unresolved relationships.
- Prefer hand-positioned clarity over automatic layout when the latter creates tangled edges.
- Move detailed prose outside the diagram. When interaction materially helps, let a node reveal an adjacent detail panel rather than crowding the canvas.

## Evidence Rules

- Match each architectural claim to its source level: documentation for declared intent, code for checked-out structure, configuration for declared settings, and runtime evidence for observed behavior.
- Keep current behavior distinct from intended or proposed behavior.
- Preserve conflicting evidence instead of forcing a clean but unsupported picture.
- Name sampled areas and uninspected boundaries when the evidence is not exhaustive.

## Common Failures

- A single giant graph with every component and edge.
- Boxes that repeat directory names but explain no responsibility or contract.
- Decorative arrows whose direction or semantics are unclear.
- Using proximity, size, or color to imply ownership without evidence.
- Presenting inference as confirmed architecture.
- Rendering a textual bullet list inside boxes and calling it a diagram.
