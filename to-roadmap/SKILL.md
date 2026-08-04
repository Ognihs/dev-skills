---
name: to-roadmap
description: Split an approved design spec into a concise sequence of related, session-sized implementation slices. Use only when the complete spec cannot be implemented and verified reliably in one development session because of its code scope or ordered dependencies. Do not use for a spec that already fits one session, requirement refinement, architecture design, or implementation.
---

# Spec to Roadmap

Create a roadmap only for an approved spec that genuinely needs multiple development sessions.

## Entry Check

Read the spec, repository instructions, and relevant current code. If the remaining spec can be implemented and verified safely in one session, report that no roadmap is needed and stop unless the user explicitly requests one.

## Process

1. Treat the approved spec as the sole authority for intended behavior and fixed design decisions.
2. Inspect the repository to exclude work already complete.
3. Split the remaining work into the smallest reasonable number of ordered, coherent slices.
4. Verify that every remaining spec requirement ID is covered. Mark requirements already satisfied by current code instead of creating work for them.
5. Verify that no slice invents a new requirement or architecture decision.

Each slice must:

- fit one development session and produce a meaningful engineering outcome;
- keep the repository valid, testable, and reviewable;
- state its boundary, prerequisites, acceptance criteria, and verification;
- preserve closely related work and explicit dependencies between slices;
- avoid relying on conversation history.

Do not write code, pseudocode, file-by-file instructions, micro-tasks, progress status, or implementation history. If the spec is ambiguous or contradictory, report the problem instead of correcting it.

## Output

Write the roadmap under `docs/roadmap/`. Replace a trailing `-design` in the spec basename with `-roadmap`; otherwise append `-roadmap`. Use the user's language.

```markdown
# <Feature> Roadmap

## Source Spec

`<approved spec path>`

## Slice 1: <Engineering outcome>

Covered spec requirements:
- S1

Objective:
<What this slice accomplishes and how it advances the complete spec.>

Scope:
- <Included behavior or capability>

Out of scope:
- <Work reserved for later slices>

Fixed spec decisions:
- <Relevant constraint or architecture decision>

Relevant code areas:
- <Verified module, entry point, or subsystem>

Prerequisites:
- <Non-obvious dependency; omit when unnecessary>

Acceptance criteria:
- <Observable completion condition>

Verification:
- <Tests, checks, benchmarks, or reviews>
```

Repeat for each slice in execution order. For downstream development, always provide the complete approved spec, the roadmap, and exactly one selected slice.

## Final Review

Check full coverage of remaining spec requirements, explicitly satisfied requirements, ordering, session fit, repository validity after each slice, concise wording, and consistency with the approved spec. Stop after writing and reviewing the roadmap; do not implement a slice.
