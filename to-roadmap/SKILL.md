---
name: to-roadmap
description: Convert a design spec into a concise sequence of session-sized feature slices for independent development.
argument-hint: "<design-spec-path>"
------------------------------

# Spec to Roadmap

Create an implementation roadmap from the spec `$ARGUMENTS`.

## Process

1. Read the spec, repository instructions, relevant code, and only directly related historical specs.
2. Treat the supplied spec as authoritative. Do not restore omitted decisions from older specs.
3. Inspect the repository to avoid planning work that is already complete.
4. Split the remaining work into the smallest reasonable number of coherent feature slices.

Each slice must:

- deliver one meaningful engineering outcome;
- fit within one development session;
- be independently explorable, designable, implementable, and reviewable;
- leave the repository valid and testable;
- have clear boundaries and acceptance criteria;
- avoid relying on conversation history.

Preserve requirements and architecture decisions fixed by the spec, but leave local design and implementation details to the development workflow.

Do not write implementation code, pseudocode, file-by-file instructions, micro-tasks, progress status, or implementation history.

## Output

Write the roadmap beside the spec, replacing `-design.md` with `-roadmap.md`, then put it in the `../roadmap` directory.

Write the document in **user's language** unless the user explicitly requests another language.

```markdown
# <Feature> Roadmap

## Source Spec

`<spec path>`

## Slice 1: <Engineering outcome>

Objective:
<What this slice must accomplish.>

Context:
<How this slice contributes to the complete feature.>

Scope:
- <Included behavior or capability>

Out of scope:
- <Explicit exclusions or work reserved for later slices>

Fixed decisions:
- <Relevant requirements and architecture constraints from the spec>

Relevant code areas:
- <Likely modules, entry points, or subsystems>

Prerequisites:
- <Only include when dependencies are not obvious from slice order>

Acceptance criteria:
- <Observable and testable completion conditions>

Verification:
- <Required tests, checks, benchmarks, or reviews>
```

Repeat for additional slices in execution order.

Omit `Prerequisites` when a slice only depends on the immediately preceding slice or has no special dependency.

Keep the roadmap concise. Reference the spec instead of repeating it.

## Final Review

After drafting the roadmap, review and revise the roadmap itself to ensure that it:

- fulfills the purpose of the roadmap;
- is concise, coherent, formal, and easy to understand;
- uses terminology consistently and avoids unnecessary jargon;
- contains no internal contradictions, unsupported claims, factual errors, or ambiguous wording;
- remains consistent with the authoritative spec and the current repository.

Do not alter or silently correct the authoritative spec. If the spec contains a contradiction or ambiguity that prevents reliable slicing, report it instead.

Stop after creating and reviewing the roadmap. Do not implement any slice.
