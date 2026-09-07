---
name: feature-dev
description: Implement and verify an approved technical design spec, or one selected roadmap slice together with its complete approved spec. Use when intended behavior and fixed design decisions are already captured in an approved spec. Inspect the repository, resolve implementation-level design, clarify ambiguities or code/spec conflicts, develop testable behavior through TDD by default, validate requirement coverage, and independently review the patch. Do not use for product discovery, initial architecture design, unapproved requirements, bug diagnosis, or roadmap creation.
---

# Deliver an Approved Feature

Treat the approved spec as the sole authority for intended behavior and fixed design decisions. Current code is evidence of existing behavior, not authority over the spec.

Maintain a concise checklist for handoff, implementation discovery, implementation, review, and delivery, including delegation, concurrency or fallback, and synthesis gates. Use the host's planning or task-tracking capability when available; otherwise keep it in the current working context. Do not create repository files solely for workflow progress tracking. Only the main agent may modify files; follow all repository instructions.

## Entry Contract

Require one of these inputs:

- a complete approved spec that fits one 200K development session; or
- a complete approved spec, its roadmap, and exactly one selected slice.

Read every input completely. Verify `Approved` status, requirement IDs, roadmap consistency with the current spec, slice-to-requirement mapping, prerequisites against repository state or completed slices, and reliable one-session fit. Size discovery, code and artifacts, TDD or justified alternative verification, migrations and rollout, broader validation, review, and fix margin from repository evidence and the delivery boundary, not counts of requirements, files, or subsystems.

Stop for any invalid handoff or unreliable fit. If scale or ordered dependencies prevent fit and no roadmap exists, require a session-sized slice. For a roadmap handoff, requirement IDs provide traceability, while the selected slice's scope, exclusions, acceptance criteria, prerequisites, and reserved work define the delivery boundary. Do not reopen settled design choices merely because alternatives exist.

## Clarification Gate

Apply this gate in any phase when ambiguity, a code/spec mismatch, or a design doubt appears:

1. Inspect the repository before asking anything it can answer.
2. If the spec explicitly requires changing current behavior and introduces no unaddressed risk, follow it and record the expected mismatch. Otherwise, present substantive code/spec conflicts and ask whether the approved intent still holds.
3. If multiple plausible interpretations or material design choices affecting approved behavior or fixed design remain, explain evidence and trade-offs, ask a focused question with a recommendation when useful, and pause affected work rather than deciding silently.
4. Record clarifications within approved behavior and fixed design. Any change to observable behavior, scope, acceptance criteria, or a fixed decision requires updating and reapproving the spec through `to-spec`; then reconcile any roadmap and slice before continuing. Conversation-only decisions never override the approved spec.

Ask only questions that materially affect faithful delivery. Group related questions when they share the same decision context.

## Required Subagent Delegation

Use delegation for implementation discovery and independent review whenever available and permitted; use the explicit fallback below otherwise. For every delegated task:

1. Read and include the complete role reference; provide the approved spec, optional slice, relevant context, and bounded focus. State that the task is read-only and must not delegate further.
2. Run at most the smaller of the independent task count and permitted available capacity. Start each independent batch before awaiting its results, then synthesize and directly verify important claims. A single-task batch is valid; never invent tasks to fill capacity.

Follow host and repository limits, including restrictions on background execution. If delegation is unavailable, prohibited, or fails after a bounded retry or reassignment, record the reason and remaining coverage, then perform the missing role passes in the main context. Report this as self-review, not independent review.

## Phase 1: Handoff

1. Read the approved inputs, repository instructions, and relevant current state; establish the delivery boundary, requirement IDs, acceptance criteria, fixed decisions, exclusions, prerequisites, reserved work, and required verification.
2. Record the starting commit, working-tree status and patch, plus content baselines for overlapping pre-existing changed or untracked files, so later review can isolate the implementation diff without attributing or overwriting user work.
3. Verify prerequisites and apply the Clarification Gate to contradictions or missing decisions.
4. Create a coverage map for every in-scope criterion. Throughout delivery, track its requirement IDs, status, code area, verification mode and seam, commands and outcomes, and supporting evidence.

## Phase 2: Implementation Discovery

Read [`references/code-explorer.md`](references/code-explorer.md). Choose one to five independent investigation areas and dispatch read-only explorers under the delegation rules, or use their fallback.

Potential focuses include similar implementations and execution flow, architecture and integration boundaries, data or state behavior, UI or external interfaces, stable public test seams, and operational concerns. Use one explorer for a small cohesive change, two or three for typical cross-module work, and four or five only when the feature spans several distinct systems. Do not create overlapping work merely to increase the count.

After exploration:

1. Synthesize all results, directly verify important findings, and reconcile code, spec, and coverage map.
2. Resolve implementation structure, responsibilities, reuse, interfaces, state flow, and error handling within the approved design; apply the Clarification Gate to uncertainty or infeasibility.
3. For each behavior, choose the highest practical stable public test seam with deterministic, focused feedback. Prefer existing behavior-level seams that survive refactoring; apply the Clarification Gate if a new seam changes a fixed decision.
4. Record `TDD` by default whenever automation gives meaningful behavioral feedback. Use `alternative verification` only when repository evidence shows no correct automated observer can be added within scope and fixed design, or a declarative, generated, or non-executable artifact has a deterministic validator, build, or dry run. Record the qualifying evidence, rationale, and strongest practical check.
5. Produce a concise ordered implementation plan tied to requirement IDs.

Do not rerun architecture selection; revise and reapprove the spec if faithful implementation requires changing it. Complete discovery only after all selected areas have findings that are synthesized and verified, including any fallback passes; never silently reduce coverage.

## Phase 3: Implementation

1. Re-read files before editing, preserve unrelated user changes, and implement only selected scope in logical vertical slices, including required configuration, migrations, generated artifacts, and documentation.
2. For each TDD behavior, write and run one focused test at the planned seam; confirm RED reflects missing behavior rather than test or unrelated failure; implement minimal GREEN; rerun it; then improve local names, duplication, or structure while green before starting the next behavior.
3. If a new test is immediately green, prove it is sensitive to the intended behavior. If existing behavior satisfies the criterion, mark `already satisfied`, retain GREEN and code evidence, and avoid unnecessary production changes; never manufacture RED or claim TDD.
4. Keep tests on observable behavior and mock only unavoidable external boundaries. For `alternative verification`, run the recorded strongest check and retain its rationale and result; never use it to bypass feasible behavioral testing.
5. Run targeted validation after each increment and broader relevant repository checks afterward. Record all outcomes in the coverage map; never claim an unrun check passed or complete a criterion without acceptance evidence.

Apply the Clarification Gate when evidence invalidates an assumption or raises a material design question. Distinguish patch failures from pre-existing or environment failures and fix in-scope regressions before review.

## Phase 4: Independent Review

Read [`references/code-reviewer.md`](references/code-reviewer.md). Cover all three perspectives below. Use one reviewer for a small cohesive change with low regression risk, two when risks divide into two distinct areas, and three for broad or high-risk changes. Assign each perspective to exactly one reviewer; a reviewer may own several perspectives. Record the choice and use the delegation fallback when required.

1. **Implementation quality:** complexity, material duplication, readability, cohesion, and responsibility boundaries; exclude correctness, coverage, and compliance.
2. **Behavioral correctness and risk:** regressions, acceptance edge cases, errors, concurrency, security, performance, and compatibility; exclude style, structure, documentation, and process unless they cause a concrete defect or critical risk.
3. **Delivery compliance and integration:** approved scope and requirement coverage, repository rules, architecture and interface contracts, verification evidence, configuration, migrations, documentation, and rollout; exclude general code quality and speculative defects.

For initial review, give each reviewer its assigned perspectives, delivery boundary and acceptance criteria, coverage map, and implementation-only diff from the recorded baselines. Dispatch independent tasks within permitted capacity; reviewer count never reduces perspective coverage.

After all assigned reviews finish, consolidate findings, assign duplicates to their primary owner, and directly verify high-severity claims. Fix implementation-caused critical or high-severity in-scope problems under Phase 3 evidence rules, then rerun affected validation.

Review every material repair after validation. Assign its original owner, or a replacement with the same perspectives, plus only reviewers whose perspectives the repair directly affects; apply the delegation fallback if needed. Provide the original finding, repair-only diff since their baseline, validation evidence, and direct impact context. If the repair causes a new must-fix issue, repeat bounded repair, validation, and review until none remains.

Ask the user only when correction changes the approved spec, materially expands scope, or requires a significant trade-off. Explicitly defer non-blocking improvements. Complete review only after all required results are synthesized and no must-fix finding remains.

## Phase 5: Delivery

Report:

- selected scope and delivered behavior;
- requirement-by-requirement coverage, including RED/GREEN evidence, GREEN plus code evidence for `already satisfied`, or alternative-verification rationale and results;
- key files changed and validation actually run;
- review findings fixed or deferred;
- deviations, limitations, rollout steps, and pre-existing failures.

Complete only when every in-scope criterion is satisfied, every planned verification has evidence, and no must-fix finding remains; otherwise report the exact blocker or remaining work.

## Resume After Interruption

After an interruption, resumed session, context reduction, or handoff:

1. Re-read the approved spec, optional roadmap and selected slice, repository instructions, and relevant current files. Treat prior conversation summaries, checklist state, and reported progress as leads, not proof.
2. Inspect the current commit, working tree, and diff. Reconcile them with any available starting state and known user changes. If ownership of overlapping changes cannot be reconstructed safely, ask the user instead of treating the current diff as implementation-only.
3. Reconstruct or verify the checklist and criterion coverage from observable evidence: current code, tests, available validation output, and completed review results. Mark missing or contradictory evidence as incomplete.
4. Recheck decisions or evidence affected by changed inputs or code. Rerun stale focused validation where practical. Never recreate or claim unavailable historical evidence such as an unrecorded RED.
5. If implementation changed after review, repeat only the review perspectives affected by that change. If an explorer or reviewer result is unavailable, restore the missing coverage through the normal delegation fallback rather than assuming it completed.
6. Apply the Clarification Gate to newly discovered ambiguity or code/spec conflict. Continue from the earliest phase whose decisions, work, verification, or review evidence is incomplete or stale.
