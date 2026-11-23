# Delivery Readiness Gate

Run after a spec reaches `Approved`. Judge from the position of a fresh implementation agent with no prior conversation context: can that agent deliver this spec reliably from the document and the repository alone, or should delivery first be structured into units and steps? Tighten the standard when the user wants staged delivery, smaller-model execution, or stronger handoff robustness.

The hierarchy of authority stays fixed: within its scope the approved spec is the highest authority for intended behavior and fixed design; confirmed `Agreed` architecture decisions still constrain everything outside that scope; any plan produced downstream is a local execution guide.

## Evidence Lenses

Examine four lenses, each with stated evidence. They are judgment lenses, not pass/fail checkboxes:

1. **Interface location**: can the behavior be located in, or added to, specific existing modules?
2. **Data flow**: are inputs, transformations, UI/URL state transitions when user-facing, and persistence paths traceable?
3. **Error and boundary behavior**: does the spec fix the important failure and edge outcomes, including required loading, empty, pending, recovery, and confirmation states for UI?
4. **Test seam reachability**: can the behavior be observed through existing or clearly addable test seams, plus a practical rendered check when user-facing?

Prefer direct development when the spec and existing repository patterns already bound the contracts and checks; do not recommend a plan that merely restates them or pre-computes routine in-scope module wiring.

## Coordination Signals

Any of these recommend generating an implementation plan instead of direct development:

- multiple independently verifiable stable repository states (such as expand, backfill, dual-write, and cutover) or staged multi-session delivery;
- cross-module or cross-step sequencing where contracts are not yet bounded by the spec and repository patterns, and a wrong early choice causes heavy rework;
- several materially different implementation paths with high rework, verification, or interruption-recovery cost.

File count, code volume, or touching multiple modules or layers alone is not a signal when the spec and repository patterns already bound their contracts.

## Outcomes

- **Direct-ready** → recommend handing off the approved spec directly to development.
- **Implementation coordination needed** → recommend `to-plan` to produce one complete delivery plan before development.
- **Spec-level ambiguity or missing fixed decision** → return the spec to `Draft`. The user or a design workflow resolves the decision; this gate never resolves design itself. After update, review, and renewed approval, run this gate again.
