# Architecture Evaluation Lenses

Use these lenses to turn code observations into architectural evidence. Apply only the lenses relevant to the scoped system and quality goals.

## Working Vocabulary

- **Module**: a function, class, package, capability, or deployable unit with an implementation and one or more public contracts.
- **Public contract**: everything a caller must know, including types, behavior, invariants, errors, ordering, configuration, and relevant performance characteristics.
- **Seam**: a place where behavior or a dependency can change without editing its consumer in place.
- **Adapter**: code that translates between a module and a technology, protocol, process, or external system.
- **Depth**: useful behavior hidden behind a comparatively simple public contract.
- **Locality**: how well a change, invariant, failure mode, and its verification stay together.

Use project terms such as API, service, component, bounded context, or repository when they are more precise. Do not replace domain language with this vocabulary.

## Evidence Lenses

### Change and knowledge

- Look for shotgun surgery, repeated co-change, duplicated policy, cross-module invariants, and knowledge callers must reconstruct.
- Use history as supporting evidence, not proof: files can co-change because of poor boundaries, generated code, or one migration.
- Apply the deletion test: if removing an indirection makes complexity disappear, consider inlining; if policy, translation, failure handling, or volatility spreads into callers, the indirection is earning its keep.

### Cohesion and ownership

- Group behavior that protects the same invariant, owns the same data semantics, and changes for the same business reason.
- Separate behavior with independent reasons to change, teams, release cadence, permissions, scaling, availability, or failure modes.
- Treat transactions and data ownership as first-class. Do not draw a clean code boundary that requires uncontrolled cross-owner writes.

### Dependencies and contracts

- Look for cycles, unstable dependencies pointing inward, callers reaching through public contracts, shared mutable state, and transport or persistence types leaking into domain decisions.
- Introduce a seam when it isolates current volatility, ownership, process, protocol, failure, or testing risk. Adapter count is a heuristic, not a rule.
- Preserve real process and deployment boundaries even when a local implementation can make tests appear in-process.

### Depth and indirection

- Prefer a deep module when it centralizes meaningful policy or mechanics behind a simpler contract.
- Do not equate depth with a large class or file; a deep module may contain many small and pure internal functions.
- Keep pass-through adapters or facades when they isolate an external model, enforce policy, control compatibility, or concentrate observability and recovery.

### Testability

- Test important behavior through stable public contracts, while retaining focused tests for complex algorithms, state transitions, and fault localization.
- Use realistic integration tests for databases, filesystems, serialization, and framework wiring when compatibility matters.
- For remote or third-party dependencies, combine deterministic doubles with contract, sandbox, or narrow integration tests where available.
- Delete an old test only after equivalent risk coverage exists and the old test adds no useful precision; never delete tests merely because a broader test was added.

### Navigability

- Check whether names, entry points, dependency direction, ownership, invariants, and representative flows are discoverable without reading unrelated files.
- Prefer feature or capability locality over global technical-layer folders when the existing domain supports it, but do not impose a directory template on a small or framework-constrained codebase.
- Recommend a compact architecture map or automated dependency rule only when it prevents repeated, observed confusion or drift.

## Common Failure Modes

- Reorganizing folders without moving responsibility or knowledge.
- Creating a shared or common module that becomes an ownerless dependency sink.
- Replacing several shallow modules with one incoherent god module.
- Adding ports, interfaces, or configuration for hypothetical variation.
- Treating test doubles as proof that real integrations are compatible.
- Optimizing for AI navigation while making human change scenarios or runtime behavior worse.
