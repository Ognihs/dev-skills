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

## Visual Register

- Make the artifact feel like a carefully edited technical document, not a generic SaaS landing page or a cinematic technology interface. Let system boundaries and relationships shape the information design without dictating the palette or atmosphere.
- Keep the decorative budget low around dense technical evidence. Alignment, grouping, line semantics, annotation, and selective emphasis should carry the design.
- The primary diagram may be the visual signature through exceptional clarity and composition. It does not need neon color, glow, grid texture, or dark mode to look technical.

## Diagram Construction

- Read and apply [diagrams.md](diagrams.md) before drawing the primary diagram or representative flow.
- Prefer an established semantic diagram type over a generic box-and-arrow graph: sequence for request order, state for transitions, ER for cardinality, and layered flow or grouped topology for dependencies.
- Use hand-positioned SVG for small, composition-led views. Use automatic layout for relationship-dense views, then inspect and repair the result rather than accepting it blindly.
- Draw direction explicitly. Highlight the common path and visually subordinate rare, inferred, or failure paths.
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
