# Delivery Readiness Gate

Run after a spec reaches `Approved`. Judge from the position of a fresh implementation agent with no prior conversation context: could that agent deliver this spec reliably from the document and the repository alone? Tighten the standard when the user asks for stronger handoff robustness.

The gate answers one question: does delivery need non-local implementation coordination that the implementing agent must not invent on its own?

The hierarchy of authority stays fixed: within its scope the approved spec is the highest authority for intended behavior and fixed design; confirmed `Agreed` architecture decisions still constrain everything outside that scope; the plan produced downstream is a disposable execution guide.

## Evidence Lenses

Examine four lenses, each with stated evidence. They are judgment lenses, not pass/fail checkboxes:

1. **Interface location**: can the behavior be located in, or added to, specific existing modules?
2. **Data flow**: are inputs, transformations, and persistence paths traceable?
3. **Error and boundary behavior**: does the spec fix the important failure and edge outcomes?
4. **Test seam reachability**: can the behavior be observed through existing or clearly addable test seams?

Direct development is ready only when a fresh agent would need to invent no material cross-step coordination.

## Coordination Signals

Any of these recommend generating an implementation plan instead of direct development:

- multiple stable repository states (staged migrations, dual-write, backfill, cutover);
- coordination across several modules or components;
- several materially different implementation paths with significant consequences;
- clearly elevated verification or interruption-recovery cost.

File count, code volume, or subsystem count alone is not a signal.

## Outcomes

- **Direct-ready** → hand off the approved spec to development.
- **Implementation coordination needed** → hand off to `to-plan`, which produces one complete delivery plan.
- **Spec-level ambiguity or missing fixed decision** → return the spec to `Draft`. The user or a design workflow resolves the decision; this gate never resolves design itself. After update, review, and renewed approval, run this gate again.
