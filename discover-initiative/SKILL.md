---
name: discover-initiative
description: Resolve a large, foggy initiative across multiple agent sessions by maintaining one concise discovery document, advancing one dependency-aware question at a time, and finishing with a formal requirement. Use when material unknowns remain, their dependencies are unclear, or the problem cannot be understood reliably in one session. Do not use for a well-scoped request, an existing substantial requirement input, technical design, implementation planning, or coding.
---

# Discover an Initiative

Turn uncertainty into requirement-ready knowledge. Maintain the current state in `docs/discovery/<YYYY-MM-DD>-<topic>-discovery.md`; keep it as a compact map, not a research report or session log.

## Core Rules

- Facts are the agent's responsibility; product decisions are the user's. Investigate available code, docs, history, data, and tools before asking the user.
- Put a concern in Fog until it can be stated as a precise question. A question may be open even when its answer is unknown.
- After initial mapping, advance one primary question per invocation. Supporting investigation may serve that question but must not silently open another workstream.
- Record only findings that affect requirements, scope, risk, dependencies, or the next question. Link evidence instead of copying raw output.
- Do not design the solution, plan implementation, write production code, or treat current behavior as intended behavior.

## Workflow

1. **Initialize or resume.** If a discovery document exists, read it completely and continue without relying on prior conversation. Otherwise define an outcome-oriented Destination, scan the problem breadth-first, create precise questions for what is visible, leave the rest in Fog, write the document, and stop after mapping.
2. **Choose the frontier.** Treat every `Ready` question as the frontier. Prefer the question that unlocks the most dependencies, could most change scope or Destination, or carries the greatest irreversible risk. If no question is ready but Fog remains, investigate the highest-impact fog enough to sharpen it. If progress requires unavailable external input, set the document to `Waiting` and name exactly what is needed.
3. **Resolve one question.** Inspect evidence, ask one to three focused questions where user intent is required, or run a bounded disposable experiment. Classify the outcome as resolved, waiting, split into sharper questions, superseded, or out of scope.
4. **Rewrite the map.** Move a resolved question to one compact result, update dependencies, promote newly precise Fog, remove stale questions, and keep each conclusion in exactly one section.
5. **Check readiness.** Mark the document `Ready` only when the Destination and scope are stable, initiative-shaping product, compatibility, feasibility, and migration unknowns are resolved or explicitly accepted, bounded changes and their dependencies are clear, and remaining questions are non-blocking and owned by a bounded change.

## Compactness

- Keep each resolved item to at most two sentences with concise source pointers.
- Remove chronology, transcripts, raw command output, long code excerpts, and narration about the research process.
- Consolidate overlapping findings and delete obsolete detail unless it prevents a material decision from being reopened.
- Before ending every invocation, ensure a fresh agent can read the entire document quickly; compress it before continuing if not.

## Document Template

```markdown
# Discovery: <title>

- Status: Mapping | Exploring | Waiting | Ready | Complete
- Final requirement type: TBD | Product-level | Code-grounded
- Final requirement: `<path or TBD>`

## Destination

<The outcome this discovery must make possible, without prescribing a solution.>

## Open Questions

| ID | State | Question | Depends on | Next action |
|---|---|---|---|---|
| Q1 | Ready | <precise question> | None | <investigation, decision, experiment, or external input> |

## Fog

- <In-scope area that cannot yet be stated as a precise question>

## Resolved

- R1 `[Fact | Decision | Accepted risk]` <concise outcome> — <evidence pointer>

## Out of Scope

- <item> — <reason>
```

## Completion and Handoff

When the document is `Ready`, choose exactly one requirement output:

- Use `to-mini-prd` when the formal requirement can remain code-agnostic and focus on users, outcomes, product behavior, scope, and success criteria.
- Use `improve-req-doc` when current behavior, verified code entry points, API or data compatibility, boundary cases, or migration constraints must remain in the formal requirement.

Run the selected workflow with the discovery document as its primary input. Do not reopen resolved questions unless the document is insufficient or contradictory. After the user confirms the resulting requirement file, set the discovery document to `Complete`, record its type and path, and stop.
