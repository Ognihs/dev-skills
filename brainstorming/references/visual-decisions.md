# Visual Decisions

Use the smallest visual aid that materially improves a specific decision. Keep the accepted decision in text; a visual is evidence, not the source of truth.

## Choose the Evidence

- Use normal conversation when wording, constraints, or trade-offs carry the decision.
- Use Mermaid or ASCII directly for architecture, data flow, state transitions, entity relationships, and other static structural questions.
- Use a compact wireframe or side-by-side sketch when spatial alternatives are hard to compare in prose but do not need interaction.
- At workflow step 5, ask to invoke the `prototype` skill when the user must exercise or experience the choice: use its UI branch for layout or interaction and its logic branch for business rules, state behavior, API shape, or data-model edge cases.

Do not invoke `prototype` merely to render a diagram. Do not use image generation for diagrams whose labels or connections must be exact.

## Consent and Tool Choice

- Create lightweight inline visuals without a separate permission round-trip.
- Before writing prototype code, opening a browser, starting a server, or producing a substantial artifact, ask the user and wait unless they already requested that action.
- If no suitable tool is available, continue with a compact textual comparison.

## Interaction Rules

- Keep one visual artifact per decision and update it during iteration.
- When comparing alternatives, show two to four focused options and state the decision being made. A diagram that explains one system needs no fake options.
- Match fidelity to the question: rough structure for layout, higher fidelity only for visual polish.
- Use representative content when placeholders would hide the real trade-off.
- Verify labels, relationships, states, and representative content against the inspected project evidence before presenting the visual.
- Summarize what is shown in text and treat the user's feedback as authoritative.
- Iterate on the current visual decision before advancing.
- Return to normal conversation as soon as the next question is textual.
- Record the accepted result textually in the spec. If a prototype was used, return its question, observed evidence, and verdict to the main workflow.
