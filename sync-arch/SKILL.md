---
name: sync-arch
description: Create or update the project's one concise architecture document against existing code and approved design decisions. Use to document an undocumented codebase or reconcile architecture documentation after implementation changes. Do not design a new system, write a feature spec, or propose refactors.
---

# Sync Project Architecture

Maintain the same architecture document used for project-level design. Default to `docs/architecture.md`; honor an existing architecture document or user-specified path. Describe both the governing architecture and what the checked-out code implements without treating accidental code drift as a new decision.

## Input and Workflow

Accept a repository, an optional architecture document, and an optional changed area. Create the document if missing; otherwise make a targeted update. State sampled scope when the repository is too large for full inspection.

1. Read repository instructions, working-tree status, the architecture document, relevant approved specs, and related decision records. Preserve unrelated user edits.
2. Inspect the entry points, dependency wiring, core modules, data stores, external integrations, deployment configuration, and tests needed for the requested scope. Trace one or two representative flows to a side effect; a file tree alone is insufficient.
3. Map responsibilities, data ownership, dependencies, runtime boundaries, and important rules to concrete repository paths and symbols or configuration keys. Separate observed facts, inference, and unknowns. Tests demonstrate asserted behavior, not every runtime guarantee.
4. Apply the authority order: approved spec for its scoped decisions, then the agreed architecture document, then code as evidence of implementation. If approved specs conflict on the same decision without a clear supersession, record the conflict and do not revise that decision until an approved spec resolves it. If code differs from an agreed architecture without an authorizing spec or user decision, preserve the architectural decision and record the actual code and conflict under `Implementation and Gaps`. Do not silently accept the deviation as intended design.
5. If an approved spec or an explicit user decision consistent with approved specs changes architecture, update the affected architectural decision in this same document and mark unimplemented parts as planned. Otherwise update only facts invalidated by the checked-out code. A changed file is a reason to check a claim, not proof that the claim is stale.
6. Verify material claims, paths, links, diagrams, and the final diff or complete new file. Report the inspected scope, edits, conflicts, and uncertainties. Do not edit an approved spec as part of documentation sync.

## Document Shape

Read the [shared project architecture template](../design-arch/references/architecture-template.md) before creating or updating the document. If this skill is installed alone and that reference is unavailable, retain an existing architecture document's useful structure. For a missing document, use a title and the fields `Architecture state`, `Scope`, and `Code checked`, followed by System Boundary, Building Blocks, Key Flows, Boundaries and Rules, Decisions and Trade-offs, and Implementation and Gaps in that order. Keep it concise; prefer a responsibility-to-path table and short flows.

For a codebase without a prior architecture document, set `Architecture state: Reconstructed`, support material claims with repository-relative paths, and label unavailable decision rationale as unknown. If an existing document lacks `Architecture state`, check approval evidence and add `Agreed` only when all material decisions were confirmed; otherwise leave the state unconfirmed, identify the missing authority, and request confirmation before relying on those decisions. To change `Reconstructed` to `Agreed`, present the exact reviewed architectural decisions and unresolved inferences, then obtain the user's confirmation of all material decisions; documentation review alone is insufficient. Preserve `Agreed` for a confirmed architecture unless its decisions change through the required authority. In all cases, a spec outranks a conflicting architecture statement; do not infer intended behavior solely from code.

## Completion

Return the document path, inspected evidence, material changes, and unresolved code/design mismatches. Keep one concise document; do not create a separate current-state architecture file or an architecture spec.
