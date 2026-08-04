---
name: feature-dev
description: Implement and verify an approved technical design spec, or one selected roadmap slice together with its complete approved spec. Use after brainstorming and to-spec have resolved and approved the intended behavior and fixed design decisions. Inspect the repository, clarify ambiguities or code/spec conflicts with the user, implement through a single writer, validate requirement coverage, and independently review the resulting patch. Do not use for product discovery, initial architecture design, unapproved requirements, bug diagnosis, or roadmap creation.
---

# Deliver an Approved Feature

Treat the approved spec as the sole authority for intended behavior and fixed design decisions. Current code is evidence of existing behavior, not authority over the spec.

Maintain a concise checklist for five phases: handoff, implementation discovery, implementation, review, and delivery. Include the required subagent dispatch and synthesis gates.

Only the main agent may modify files. Follow all repository instruction files.

## Entry Contract

Require one of these inputs:

- a complete approved spec that fits one development session; or
- a complete approved spec, its roadmap, and exactly one selected slice.

Read every input completely. Verify that the spec is `Approved`, requirement IDs are present, the selected slice maps to those IDs, and the requested scope fits one session. When a roadmap is supplied, verify that it is consistent with the current approved spec. If no approved spec exists, stop and recommend `brainstorming`. If no roadmap is supplied and the full spec needs multiple sessions, stop and recommend `to-roadmap`.

For a roadmap handoff, treat requirement IDs as traceability. The selected slice's scope, out-of-scope items, and acceptance criteria define the delivery boundary; do not implement portions reserved for other slices.

Do not reopen settled design choices merely because another approach is possible.

## Clarification Gate

Apply this gate whenever ambiguity, a code/spec mismatch, or a design doubt appears, including during implementation:

1. Inspect the repository before asking anything it can answer.
2. If the spec explicitly requires changing current behavior and introduces no unaddressed risk, follow it and record the expected mismatch. Otherwise, present substantive code/spec conflicts and ask whether the approved intent still holds.
3. When more than one plausible interpretation or design choice remains, explain the evidence and trade-off, ask a focused question with a recommendation when useful, and pause affected work. Do not silently resolve a genuine ambiguity merely because one option seems reasonable.
4. Record clarifications that stay within the approved behavior and fixed design. If an answer changes observable behavior, scope, an acceptance criterion, or a fixed design decision, update and reapprove the spec through `to-spec` before continuing. When a roadmap was supplied, treat it and the selected slice as stale until they are reconciled with the reapproved spec.
5. Never let conversation-only decisions override the approved spec.

Ask only questions that materially affect faithful delivery. Group related questions when they share the same decision context.

## Required Subagent Delegation

Subagent delegation is mandatory for implementation discovery and independent review. Use the host's native subagent mechanism; do not substitute a second main-agent analysis pass.

For every delegated task:

1. Read the corresponding role reference completely and include its instructions in the task.
2. Provide the approved spec, optional selected slice, relevant repository context, and one bounded focus.
3. State that the task is read-only.
4. Dispatch independent tasks concurrently when supported, wait for every result, then synthesize and verify important claims directly.

If concurrency is limited, dispatch required subagents in waves rather than reducing their number. Use zero subagents only when the host exposes no subagent mechanism or the user explicitly prohibits delegation; report the limitation and perform the role passes in the main context.

## Phase 1: Handoff

1. Read the approved spec, optional roadmap and selected slice, repository instructions, and relevant current state.
2. Check the working tree and record the initial changed files so later review can distinguish this implementation from pre-existing user work.
3. Identify the selected delivery boundary, referenced requirement IDs, acceptance criteria, fixed decisions, exclusions, reserved work, and required verification.
4. Build a coverage map for each selected slice acceptance criterion, linked back to its spec requirement IDs: current status, likely code area, and planned verification.
5. Apply the Clarification Gate to any invalid handoff, contradiction, or missing decision.

## Phase 2: Implementation Discovery

Read [`references/code-explorer.md`](references/code-explorer.md). Choose and dispatch one to five read-only exploration subagents based on the number of genuinely independent investigation areas. Always dispatch at least one.

Potential focuses include similar implementations and execution flow, architecture and integration boundaries, data or state behavior, UI or external interfaces, and tests or operational concerns. Use one explorer for a small cohesive change, two or three for typical cross-module work, and four or five only when the feature spans several distinct systems. Do not create overlapping work merely to increase the count.

After exploration:

1. Wait for every explorer and synthesize their results.
2. Verify important findings against repository files.
3. Reconcile current code with the spec and coverage map.
4. Apply the Clarification Gate to material uncertainty or infeasibility.
5. Produce a concise ordered implementation plan tied to requirement IDs.

Do not run another architecture-selection phase. If faithful implementation requires changing the approved design, return to spec revision and approval.

Do not complete this phase until every dispatched exploration subagent has returned and all results have been synthesized and verified, except for the explicit no-subagent fallback above. If an explorer fails, retry it or reassign its investigation focus; do not silently reduce the selected exploration coverage.

## Phase 3: Implementation

1. Re-read files immediately before editing and preserve unrelated user changes.
2. Implement only the selected scope in logical increments, following repository conventions.
3. Add or update tests, configuration, migrations, and documentation required by the spec.
4. Apply the Clarification Gate whenever new evidence invalidates an assumption or raises a material design question.
5. Run targeted validation, then the broader relevant checks supported by the repository.
6. Update the coverage map with concrete evidence; do not mark a requirement complete without verifying its acceptance criteria.

Never claim a check passed unless it ran successfully. Distinguish failures introduced by the patch from pre-existing or environment failures, and fix in-scope regressions before review.

## Phase 4: Independent Review

Read [`references/code-reviewer.md`](references/code-reviewer.md). Dispatch exactly three read-only review subagents with these distinct focuses:

1. **Simplicity, DRY, and elegance:** unnecessary complexity, duplication, readability, responsibility boundaries, and simpler repository-aligned alternatives.
2. **Bugs and functional correctness:** behavior regressions, edge cases, error handling, concurrency, security, performance, and compatibility.
3. **Project conventions and abstractions:** repository rules, architecture fit, interface use, requirement and test coverage, configuration, migrations, documentation, and rollout.

Give every reviewer the approved inputs, its assigned focus, the coverage map, the implementation diff relative to the recorded baseline, and relevant surrounding code. Dispatch all three concurrently when supported; otherwise dispatch them in waves. Do not reduce the required review count because the patch appears small.

Wait for all three reviewers, consolidate findings, remove duplicates, and verify high-severity claims directly. Automatically fix critical or high-severity in-scope problems caused by the implementation, rerun affected validation, and review material fixes again.

Ask the user only when a correction would change the approved spec, expand scope materially, or require a significant trade-off. Non-blocking improvements may be deferred explicitly. Never classify delivery as complete with an unresolved must-fix finding or failed acceptance criterion.

Do not complete this phase until all three review results have been received and synthesized, except for the explicit no-subagent fallback above.

## Phase 5: Delivery

Report:

- selected scope and delivered behavior;
- requirement-by-requirement coverage and verification evidence;
- key files changed;
- validation actually run and its results;
- review findings fixed or deferred;
- deviations, limitations, rollout steps, and pre-existing failures.

Call the work complete only when every selected acceptance criterion is satisfied and no must-fix finding remains. Otherwise report the implementation as incomplete and state the exact blocker or remaining work.

## Resume Rule

After interruption, reread the approved inputs, conversation, working tree, and coverage map. Continue from the earliest phase whose evidence or decisions are incomplete or stale.
