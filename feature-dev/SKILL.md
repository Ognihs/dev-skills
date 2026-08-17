---
name: feature-dev
description: Implement and verify an approved technical design spec, or one selected roadmap slice together with its complete approved spec. Use when intended behavior and fixed design decisions are already captured in an approved spec. Inspect the repository, resolve implementation-level design, clarify ambiguities or code/spec conflicts, develop testable behavior through TDD by default, validate requirement coverage, and independently review the patch. Do not use for product discovery, initial architecture design, unapproved requirements, bug diagnosis, or roadmap creation.
---

# Deliver an Approved Feature

Treat the approved spec as the sole authority for intended behavior and fixed design decisions. Current code is evidence of existing behavior, not authority over the spec.

Maintain a concise checklist for five phases: handoff, implementation discovery, implementation, review, and delivery. Include the required subagent dispatch and synthesis gates.

Only the main agent may modify files. Follow all repository instruction files.

## Entry Contract

Require one of these inputs:

- a complete approved spec that fits one 200K development session; or
- a complete approved spec, its roadmap, and exactly one selected slice.

Read every input completely. Verify that the spec is `Approved`, requirement IDs are present, the selected slice maps to those IDs, its prerequisites are satisfied by current repository state or completed slices, and the requested scope fits one 200K development session. Size the complete workload, including implementation discovery, code and artifact changes, TDD or justified alternative verification, migrations and rollout, relevant broader validation, independent review, and fix margin. Establish fit from the delivery boundary and repository evidence, not requirement, file, or subsystem counts. When a roadmap is supplied, verify that it is consistent with the current approved spec. Stop for an unapproved spec, unmet slice prerequisite, other invalid handoff, or delivery scope whose reliable one-session fit cannot be established. When scale or ordered dependencies prevent fit and no roadmap is supplied, report that a session-sized delivery slice is required.

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
2. Check the working tree and record the starting commit, status, initial patch, and a content baseline for any pre-existing changed or untracked file that may overlap the scope. Preserve this evidence so the implementation-only diff can be derived without attributing or overwriting user work.
3. Identify the selected delivery boundary, referenced requirement IDs, acceptance criteria, fixed decisions, exclusions, prerequisites, reserved work, and required verification. Verify every prerequisite against repository evidence.
4. Build a coverage map for every in-scope acceptance criterion, whether the delivery boundary is the complete spec or one selected slice. Link each criterion to its spec requirement IDs and record current status, likely code area, and planned verification.
5. Apply the Clarification Gate to any invalid handoff, contradiction, or missing decision.

## Phase 2: Implementation Discovery

Read [`references/code-explorer.md`](references/code-explorer.md). Choose and dispatch one to five read-only exploration subagents based on the number of genuinely independent investigation areas. Always dispatch at least one.

Potential focuses include similar implementations and execution flow, architecture and integration boundaries, data or state behavior, UI or external interfaces, stable public test seams, and operational concerns. Use one explorer for a small cohesive change, two or three for typical cross-module work, and four or five only when the feature spans several distinct systems. Do not create overlapping work merely to increase the count.

After exploration:

1. Wait for every explorer and synthesize their results.
2. Verify important findings against repository files.
3. Reconcile current code with the spec and coverage map.
4. Apply the Clarification Gate to material uncertainty or infeasibility.
5. Resolve implementation-level structure, responsibility boundaries, reuse points, interfaces, state flow, and error handling within the approved design.
6. For each in-scope behavior, select the highest practical stable public test seam that gives deterministic, focused feedback. Prefer an existing seam and behavior-level tests that survive internal refactoring. If introducing a seam would change a fixed design decision, apply the Clarification Gate.
7. For each planned behavior or artifact change, record `TDD` or `alternative verification` under its criterion in the coverage map, including the seam or verification method. Use TDD by default when an automated test can provide meaningful behavioral feedback. Alternative verification is allowed only when repository evidence shows either that no correct automated observer exists within the approved design and adding one would change a fixed decision or exceed scope, or that a declarative, generated, or non-executable artifact is directly checkable by a deterministic validator, build, or dry run. Record the qualifying evidence, rationale, and strongest practical check.
8. Produce a concise ordered implementation plan tied to requirement IDs.

Do not run another architecture-selection phase. If faithful implementation requires changing the approved design, return to spec revision and approval.

Do not complete this phase until every dispatched exploration subagent has returned and all results have been synthesized and verified, except for the explicit no-subagent fallback above. If an explorer fails, retry it or reassign its investigation focus; do not silently reduce the selected exploration coverage.

## Phase 3: Implementation

1. Re-read files immediately before editing and preserve unrelated user changes.
2. Implement TDD work as vertical slices, one behavior at a time:
   - write one focused test at the planned seam and run it;
   - confirm it fails for the expected missing behavior, not a test error or unrelated defect;
   - write only enough production code to pass, then rerun the focused test;
   - after green, improve names, duplication, or local structure while keeping the test green;
   - continue with the next behavior instead of writing all tests up front.
3. If a new test passes immediately, verify that it is sensitive to the intended behavior and determine whether existing behavior already satisfies the criterion. If so, mark that behavior `already satisfied`, retain the GREEN result plus supporting code evidence, and make no unnecessary production change; do not claim TDD or manufacture a RED state. Keep tests focused on observable behavior rather than private implementation details, and mock only at unavoidable external boundaries.
4. For work marked `alternative verification`, perform the recorded check and retain its result and rationale. Do not use the label merely to avoid writing a feasible behavioral test.
5. Implement only the selected scope in logical increments, following repository conventions. Add or update configuration, migrations, generated artifacts, and documentation required by the spec.
6. Apply the Clarification Gate whenever new evidence invalidates an assumption or raises a material design question.
7. Run targeted validation after each increment, then the broader relevant checks supported by the repository.
8. Update the coverage map with RED and GREEN commands and outcomes for TDD work, GREEN plus code evidence for `already satisfied` behavior, or concrete alternative-verification evidence. Do not mark a requirement complete without verifying its acceptance criteria.

Never claim a check passed unless it ran successfully. Distinguish failures introduced by the patch from pre-existing or environment failures, and fix in-scope regressions before review.

## Phase 4: Independent Review

Read [`references/code-reviewer.md`](references/code-reviewer.md). Dispatch exactly three read-only review subagents with these distinct focuses:

1. **Simplicity, DRY, and elegance:** unnecessary complexity, duplication, readability, responsibility boundaries, and simpler repository-aligned alternatives.
2. **Bugs and functional correctness:** behavior regressions, edge cases, error handling, concurrency, security, performance, and compatibility.
3. **Project conventions and abstractions:** repository rules, architecture fit, interface use, requirement and test coverage, TDD or alternative-verification evidence, configuration, migrations, documentation, and rollout.

Give every reviewer the approved inputs, its assigned focus, the coverage map, the implementation-only diff derived from the recorded baselines, and relevant surrounding code. Dispatch all three concurrently when supported; otherwise dispatch them in waves. Do not reduce the required review count because the patch appears small.

Wait for all three reviewers, consolidate findings, remove duplicates, and verify high-severity claims directly. Automatically fix critical or high-severity in-scope problems caused by the implementation, applying the Phase 3 implementation and evidence rules to behavioral fixes; rerun affected validation and review material fixes again.

Ask the user only when a correction would change the approved spec, expand scope materially, or require a significant trade-off. Non-blocking improvements may be deferred explicitly. Never classify delivery as complete with an unresolved must-fix finding or failed acceptance criterion.

Do not complete this phase until all three review results have been received and synthesized, except for the explicit no-subagent fallback above.

## Phase 5: Delivery

Report:

- selected scope and delivered behavior;
- requirement-by-requirement coverage and verification evidence;
- RED/GREEN evidence for TDD work, GREEN plus code evidence for already-satisfied behavior, and rationale plus results for alternative verification;
- key files changed;
- validation actually run and its results;
- review findings fixed or deferred;
- deviations, limitations, rollout steps, and pre-existing failures.

Call the work complete only when every in-scope acceptance criterion is satisfied, every planned verification has evidence, and no must-fix finding remains. Otherwise report the implementation as incomplete and state the exact blocker or remaining work.

## Resume Rule

After interruption, reread the approved inputs, conversation, working tree, and coverage map. Continue from the earliest phase whose evidence or decisions are incomplete or stale.
