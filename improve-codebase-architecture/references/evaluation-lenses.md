# Architecture Evaluation Lenses

Use these lenses to turn code observations into architectural evidence. Apply only the lenses relevant to the scoped system and quality goals.

## Working Vocabulary

- **Module**: a function, class, package, capability, or deployable unit with an implementation and one or more public contracts.
- **Public contract**: everything a caller must know, including types, behavior, invariants, errors, ordering, configuration, and relevant performance characteristics.
- **Seam**: a place where behavior or a dependency can change without editing its consumer in place.
- **Adapter**: code that translates between a module and a technology, protocol, process, or external system.
- **Depth**: useful behavior hidden behind a comparatively simple public contract.
- **Locality**: how well a change, invariant, failure mode, and its verification stay together.

Use project terms such as API, service, component, bounded context, or repository when they are more precise. Do not replace domain language with this vocabulary or mix architectural scales without saying so.

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

- Look for cycles, policy or domain code depending on volatile implementation details, callers bypassing public contracts, shared mutable state, and transport or persistence types leaking into business decisions.
- Distinguish source dependency from runtime control flow: callbacks, events, and dependency injection may reverse control without creating an architectural dependency cycle.
- Introduce a seam when it isolates current volatility, ownership, process, protocol, failure, or testing risk. Adapter count is a heuristic, not a rule.
- Preserve real process and deployment boundaries even when a local implementation can make tests appear in-process.

### Policy visibility and effects

- Locate decisions that protect important business invariants; check whether they have clear names, ownership, stable inputs, and direct verification.
- Look for policy hidden or duplicated in controllers, UI conditionals, ORM hooks, queries, serializers, message consumers, configuration, or orchestration.
- Keep external input parsing and side effects at explicit boundaries so business decisions operate on validated values. Do not introduce ceremonial domain objects when a named function or constraint is already clear.

### Depth and indirection

- Prefer a deep module when it centralizes meaningful policy or mechanics behind a simpler contract.
- Do not equate depth with a large class or file; a deep module may contain many small and pure internal functions.
- Keep pass-through adapters or facades when they isolate an external model, enforce policy, control compatibility, or concentrate observability and recovery.

### Shared abstractions and complexity

- Inspect high-fan-in shared modules for mixed semantics, unclear ownership, unstable contracts, unrelated change reasons, or dependencies on business modules.
- Keep shared capabilities that are cohesive, stable, owned, independently testable, and no more widely visible than necessary. Prefer temporary local duplication while a shared policy or lifecycle remains unproven.
- Treat a god class, file, or service as evidence of mixed responsibilities; split by ownership or change reason, not size alone, and avoid replacing it with a distributed god module.

### Testability

- Test important behavior through stable public contracts, while retaining focused tests for complex algorithms, state transitions, and fault localization.
- Use realistic integration tests for databases, filesystems, serialization, and framework wiring when compatibility matters.
- For remote or third-party dependencies, combine deterministic doubles with contract, sandbox, or narrow integration tests where available.
- Delete an old test only after equivalent risk coverage exists and the old test adds no useful precision; never delete tests merely because a broader test was added.

### Navigability

- Check whether names, entry points, dependency direction, ownership, invariants, and representative flows are discoverable without reading unrelated files.
- Prefer feature or capability locality over global technical-layer folders when the existing domain supports it, but do not impose a directory template on a small or framework-constrained codebase.
- Check whether stable architecture knowledge is versioned and searchable in the repository rather than available only from conversations or individual memory. Recommend a compact, indexed map when it prevents repeated confusion without creating a monolithic manual.

### Enforcement and fitness functions

- Classify important rules as documented, mechanically enforced, runtime-observed, or dependent on review alone.
- Prioritize automation for constraints whose violation is high-impact, recurrent, or difficult to detect in review; do not automate subjective preferences merely because they are measurable.
- Prefer types, visibility, dependency checks, architecture tests, schema validation, and focused CI checks. Require failures to name the violated boundary and give actionable remediation.

## Common Failure Modes

- Reorganizing folders without moving responsibility or knowledge.
- Creating a shared or common module that becomes an ownerless dependency sink.
- Replacing several shallow modules with one incoherent god module.
- Splitting a large class into files that retain the same mixed ownership and change reasons.
- Adding ports, interfaces, or configuration for hypothetical variation.
- Recording important architecture rules only in prose when violations are cheap to repeat and costly to detect.
- Treating test doubles as proof that real integrations are compatible.
- Optimizing for AI navigation while making human change scenarios or runtime behavior worse.
