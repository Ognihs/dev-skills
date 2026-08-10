---
name: improve-codebase-architecture
description: Audit a codebase for architectural friction and produce ranked, evidence-backed improvement candidates. Use when the user wants to improve architecture, reduce coupling or cycles, clarify module or data ownership, find refactoring opportunities, improve testability, or make a repository easier for humans and AI agents to navigate. Do not use to implement a refactor, debug a specific failure, or design an already selected change.
---

# Improve Codebase Architecture

Perform a read-only architecture audit. Determine whether the evidence supports keeping, inlining, merging, splitting, deepening, or redirecting dependencies; do not assume that a refactor is necessary.

## Input Contract

Accept a repository plus an optional area, quality goal, change scenario, incident, or known pain point. If the request covers a large repository, state which high-signal areas you sampled and what remains unexamined. Do not modify code or architecture documents unless the user separately asks for that work.

## Workflow

### 1. Establish constraints

- Read repository instructions, relevant architecture documents, domain language, ADRs, tests, dependency configuration, and recent history before judging the structure. Do not assume specific document names or locations.
- Treat approved decisions as constraints, current code as evidence of existing behavior, and history or incidents as evidence of actual change pressure.
- Use available read-only exploration or delegation when it improves coverage; if unavailable, inspect directly. Never make a particular agent host or delegation feature a requirement.
- State important evidence that is unavailable instead of inventing it.

### 2. Build a focused architecture map

Identify the relevant capabilities or modules, entry points, public contracts, dependency direction, data ownership, transaction boundaries, external systems, and deployment boundaries. Trace one to three representative change or failure scenarios end to end; a file tree alone is not an architecture model.

### 3. Diagnose friction

Read [references/evaluation-lenses.md](references/evaluation-lenses.md) before evaluating candidates. Use several lenses, not a single metric, and preserve the project's established domain and architecture vocabulary.

Consider all plausible outcomes:

- **Keep** a structure that already contains change and makes constraints explicit.
- **Inline or remove** indirection that hides no policy, translation, risk, or variation.
- **Merge or deepen** code that changes together and owns the same invariants or lifecycle.
- **Split** code with unrelated reasons to change, ownership, data, security, scaling, or failure concerns.
- **Redirect dependencies or extract an adapter** when knowledge or infrastructure points in the wrong direction.

Never recommend consolidation from proximity, file size, or in-process execution alone. Never recommend separation solely because two implementations could hypothetically exist.

### 4. Challenge each candidate

For every candidate:

- Cite concrete files and, when available, tests, history, runtime evidence, or repeated change patterns.
- Describe a specific change or failure scenario and where knowledge is currently scattered or leaked.
- Compare the recommendation with at least the no-change option and any materially credible alternative.
- Evaluate relevant trade-offs: modifiability, cognitive load, correctness, testability, performance, reliability, security, deployability, and migration risk.
- Reject cosmetic reorganization, speculative extensibility, and changes whose benefit does not exceed their migration and indirection cost.

### 5. Report and stop

Present three to seven ranked candidates when the evidence supports them; report fewer rather than padding the list. Use this shape for each:

```markdown
### N. Candidate title
- Priority / confidence:
- Evidence:
- Change or failure scenario:
- Diagnosis:
- Options considered:
- Recommendation:
- Benefits and quality trade-offs:
- Test and migration impact:
- Unknowns or conflicting decisions:
```

Mark an ADR conflict explicitly and explain why current evidence may justify reopening it. If a user rejects a candidate for a durable, non-obvious reason, identify it as a possible ADR topic but do not create one without permission.

End with the recommended first candidate and ask which candidate, if any, should proceed to design. Do not propose an exact interface, write a spec, or implement the refactor as part of this audit.

## Completion Checklist

- The scope, sampled areas, and evidence limits are explicit.
- Relevant decisions, code, tests, dependencies, and history were examined where available.
- Both consolidation and separation were considered.
- Every recommendation has a concrete scenario, code evidence, alternatives, and trade-offs.
- Testing and migration risks are stated without deleting existing coverage by assumption.
- The report distinguishes confirmed facts, inferences, and unknowns.
- No repository changes were made as a side effect of the audit.
