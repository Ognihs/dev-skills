---
name: to-plan
description: Turn an approved spec and the current repository into one complete, file-level delivery plan for the agent that will implement it. Use after the spec is approved and before development starts, when delivery needs non-local implementation coordination. Do not use for design decisions, requirement work, or deciding whether a plan is needed.
---

# Spec to Delivery Plan

Generate one complete plan covering the whole remaining spec. The plan records how to deliver what the spec already decided and never changes those decisions. This skill does not judge whether a plan is needed.

## Entry Check

Require an approved spec with requirement IDs, repository instructions, and current code. Read them completely, then:

1. Verify the spec is `Approved`; a Draft spec has no plan, report it instead.
2. Inspect the repository for work already delivered; plan only what remains.
3. Stop and report when the spec contains a spec-level ambiguity or missing fixed decision, or when completing the delivery design would require adding or changing a spec-level decision.
4. When a path or symbol the spec cites is missing, investigate first: renames, moves, and equivalent replacements are verified and used as current anchors; stop only when a substantive assumption the spec makes about the current implementation has actually failed.

## Plan Structure

Two levels:

- **Delivery Unit** — the only plan-level delivery boundary: one independently verifiable stable repository state. Map requirements at this level (`Unit 1: S1 full / S2 partial: <portion>; remaining: <portion>`).
- **Step** — the execution and recovery unit inside a unit. Steps are sized by verification boundaries, not code volume: each step produces one independently verifiable implementation increment, preferring observable behavioral increments where practical. A step worth independent delivery is promoted to a unit at generation time; there is no step-level downstream entry.

Each unit states: its delivery boundary and stable state, included and reserved work, prerequisite contracts, ordered implementation increments, fixed module-level decisions, acceptance criteria, and verification. State any additional condition for entering a later unit only when it adds a real prerequisite.

Each step states: covered requirement IDs (full or partial), genuine dependencies, anchors, implementation intent, test-first order (the TDD loop itself stays with the executor), a concrete verification command or procedure, and a separate evidence-based completion criterion. No method-level design and no line-level or code-level instructions; a one-sentence execution rationale is allowed. Keep a behavior's test-and-implementation cycle inside its step rather than splitting it into individual actions.

Before drafting, read [`references/plan-template.md`](references/plan-template.md) completely and use its default structure in the user's language. Preserve source, coverage, delivery boundaries, implementation intent, and verification information; omit optional fields with no useful content instead of filling them with `N/A`. Include a delivery overview only when the structure or ordering needs explanation.

## Anchors

- **Concrete**: modules, classes, public interfaces, or test entry points verified to exist now.
- **Logical**: a contract or stable state an earlier unit will produce; never predict its concrete class names.
- **New artifacts of this unit**: name a file or signature concretely only when the name itself is a valuable execution constraint; otherwise describe the responsibility and logical contract. Do not predict file names or private structure for the sake of detail.

## Provenance Header

Record `Source spec: <path> + <approved content identifier, when practical>` and `Planned against: <repository baseline revision>`. This identifies provenance only. Staleness is judged by whether the spec content changed and whether the repository still satisfies the plan's key assumptions, anchors, dependencies, and contracts, following the shared conflict classification.

## Rules

- The spec is authoritative. A contradiction found while reviewing this plan is fixed or rewritten within this invocation until the plan is faithful to the spec; stop and return to the spec only when the contradiction exposes a spec-level fixed-design gap.
- Maintain one complete requirement coverage index, including the scope and repository evidence of already satisfied work. Unit and step mappings define local execution boundaries; keep already satisfied evidence in the index rather than repeating it in a separate section.
- State only genuine dependencies and name the capability or contract each supplies; earlier position alone is not a dependency. Fixed module-level decisions record necessary coordination, not repeated spec requirements or new spec-level decisions.
- Cite every existing path and symbol from verified repository state, never memory.
- A step may reference its unit's shared anchors. Use test-first automation when meaningful; otherwise identify the strongest practical verification and explain why. Verification commands must use known repository facilities when practical; mark a new verification entry point and the step that will establish it. Completion criteria describe observable results, not actions performed.
- Unit verification proves the delivered behavior and critical connections, including required migration, compatibility, and regression checks. Assign remaining overall delivery checks to the final unit. Expand approved migration, rollout, and recovery requirements into dependencies, steps, and acceptance checks; stop if a necessary spec-level strategy is missing.
- The plan requires no user approval; offer a quick review without blocking on it. Design discussion history and alternatives stay out of the plan.
- Spec revision or material repository drift that invalidates plan assumptions, anchors, dependencies, or contracts requires complete regeneration; cosmetic or local drift follows downstream drift rules.
- For downstream consumers the plan is an immutable execution input: readable for any purpose, never edited for progress tracking, drift repair, or implementation decisions.

## Final Review

Before completion check and repair:

- [ ] Every approved requirement is fully covered by the ordered units or explicitly verified as already satisfied; partial mappings distinguish delivered, already satisfied, and remaining portions.
- [ ] Every unit defines its delivery boundary, reserved work, acceptance criteria, and verification; every step has requirement coverage, usable anchors, verification, and a verifiable completion criterion.
- [ ] Dependencies are genuine, contract-bearing, and ordered; existing anchors are verified and new artifacts or verification entry points are marked new.
- [ ] Verification proves critical connections and the selected stable states, with remaining overall delivery checks assigned to the final unit.
- [ ] The plan contradicts nothing in the spec, adds no spec-level decisions, and repeats no design rationale; a fresh executor can use it without discussion history.

## Output

Write the complete plan to `docs/plans/<YYYY-MM-DD>-<topic>-plan.md` (or the project-defined planning location) in the user's language. The plan is a local execution artifact: written to disk for development, resume, and multi-unit execution. Do not stage or commit the generated plan unless explicitly required by project policy or the user. Report the plan path and the covered requirement IDs, then hand off the spec plus this plan to development without starting it.
