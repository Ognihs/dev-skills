---
name: feature-dev
description: Implement and verify an approved technical design spec, optionally together with its implementation plan and a selected delivery scope. Use when intended behavior and fixed design decisions are already captured in an approved spec. Do not use for product discovery, initial architecture design, unapproved requirements, bug diagnosis, or plan creation.
---

# Deliver an Approved Feature

Treat the approved spec as the authority for intended behavior and fixed decisions within its scope. Respect confirmed `Agreed` architecture decisions elsewhere; use `Proposed`, `Reconstructed`, or unknown-state architecture only as context. The spec takes precedence where they conflict. Current code is evidence of implementation, not authority over either intended source.

Only the main agent may modify files; follow all repository instructions. Keep phase status, acceptance and plan-step tracking, and review findings in the host's built-in task tracker or current context. Record each fact once; do not create repository files solely for progress tracking.

## Entry Contract

Require a complete approved spec; optionally also its implementation plan and an execution scope — the full plan or one or more complete delivery units. Always carry the complete spec and the complete plan text. Read every input completely, then check:

1. The spec is `Approved` and has requirement IDs. The plan, when present, maps its units and steps to those IDs.
2. The selected scope must be dependency-closed, or all excluded prerequisites must be proven satisfied by current repository evidence. For a delivery unit, its scope, exclusions, acceptance criteria, and reserved work define the boundary; IDs alone do not.
3. Repository evidence supports reliable delivery within this invocation, including discovery, implementation, testing, migrations, rollout, review, repair margin, and interruption recovery. File or requirement counts alone do not establish fit.

The plan, when present, is an immutable execution input: read it for any purpose, never edit it for progress tracking, drift repair, or implementation decisions. Local plan artifacts are execution inputs, not implementation changes — exclude them from implementation diffs, changed-file summaries, review scope, and delivery artifacts, while preserving them on disk.

Stop on invalid inputs or unreliable fit. Apply the Clarification Gate to input conflicts before implementation. Do not reopen settled design choices merely because alternatives exist.

## Clarification Gate

Apply this gate in any phase, including intake, for ambiguity, plan drift or conflicts, code/spec mismatches, or design doubts. Inspect the repository before asking anything it can answer:

1. Absorb cosmetic or local plan drift mechanically and record it. An invalidated plan assumption, dependency, or contract stops the invocation for plan regeneration. For a plan/spec contradiction, the spec wins; stop and regenerate the plan.
2. If the spec explicitly requires changing current behavior and introduces no unaddressed risk, follow it and record the expected mismatch. Otherwise, present substantive code/spec conflicts and ask whether the approved intent still holds; stop for a required spec revision under rule 4.
3. If multiple plausible interpretations or material design choices affecting approved behavior or fixed design remain, explain evidence and trade-offs, ask a focused question with a recommendation when useful, and pause affected work rather than deciding silently. Decide autonomously only local, reversible implementation details that propagate no constraint to other units or modules — algorithms, private structure and naming, in-module adapters, local splitting, and reuse of established internal patterns. A missing or unclear spec-level decision goes back to the spec; a missing module-level coordination decision goes back to plan generation.
4. Record clarifications within approved behavior and fixed design. For any change to observable behavior, scope, acceptance criteria, or a fixed decision, pause implementation and end this invocation with a self-contained change context containing the conflict, evidence, affected approved inputs, and decisions still needed. The revised design must be resolved, written or superseded, reviewed, and approved through the project's normal routing before development resumes in a new invocation. Reconcile any plan, then reapply the complete Entry Contract, including delivery fit; never reuse the earlier fit decision. Conversation-only decisions never override the approved spec.

Ask only questions that materially affect faithful delivery. Group related questions when they share the same decision context.

## Required Subagent Delegation

Apply these rules to all discovery and review passes, delegating when available and permitted:

- Supply the complete role reference, approved inputs, and bounded context. Require read-only work and no further delegation.
- When splitting work, start independent tasks in each permitted batch before waiting, respecting host capacity and project limits, including background restrictions. Coverage must not shrink with task count; never invent tasks to fill capacity.
- Synthesize results and verify important claims. For a failed or incomplete delegated task, default to at most one retry or reassignment in total. If delegation is unavailable, prohibited, or still incomplete afterward, record why and cover the missing roles yourself. Label this self-review.

## Evidence Rules

- Retain actual commands, outcomes, and supporting evidence; never claim an unrun check passed. Reference shared results rather than duplicate them.
- Checks mandated by the spec or repository, or needed to prove acceptance, are required. Supplementary checks need a result or a reasoned disposition; a blocked required check remains incomplete.
- Reuse evidence until relevant changes invalidate it. Retry environment-blocked checks only after conditions change, and report their delivery impact.

## Phase 1: Intake & Baseline

1. Apply the Entry Contract against repository instructions, the project architecture document if present, and current state; retain the delivery boundary and fixed decisions. Identify an explicit spec/architecture difference before treating it as a blocker.
2. Record the starting commit, working-tree status and patch, plus content baselines for overlapping pre-existing changed or untracked files, so later review can isolate the implementation diff without attributing or overwriting user work.
3. Track acceptance and progress in the host's built-in task or todo system, in two groups that are never merged: **spec acceptance coverage** — every in-scope acceptance criterion and mandatory delivery obligation not already covered by those criteria (required migrations, rollout artifacts), limited to the criteria the selected scope touches while retaining awareness of the full spec boundary; and **plan steps** — only the steps inside the selected delivery units. Units and requirements reserved for later delivery are out of scope and must never appear as pending work. Record each test seam once; every completion carries verification evidence, an `alternative verification` rationale where used, and blockers carry reasons. Progress messages report changes and blockers rather than reprinting the lists.

## Phase 2: Implementation Discovery

Read [`references/code-explorer.md`](references/code-explorer.md). Default to one exploration task. Split only when distinct questions can be investigated independently, with no overlapping scope.

Focus on relevant execution flows, integration boundaries, state behavior, public test seams, and operational concerns; reuse similar implementations as evidence.

After exploration:

1. Reconcile code, spec, and the acceptance and plan-step tracking. Route conflicts through the Clarification Gate.
2. Resolve implementation structure, responsibilities, reuse, interfaces, state flow, and error handling within the approved design.
3. Choose stable public test seams that observe behavior and give repeatable, focused feedback. Prefer existing seams that survive refactoring; apply the Clarification Gate if a new seam changes a fixed design decision.
4. Use `TDD` by default for behavior that can be meaningfully tested automatically. Permit `alternative verification` only under either condition below.

   - **Behavior cannot be observed automatically within scope and fixed design:** cite repository evidence showing why no correct automated observer can be added, and select the strongest practical check.
   - **Declarative, generated, or non-executable artifact:** identify the deterministic validator, build, or dry run that verifies the criterion. Artifact type alone does not waive feasible tests of executable behavior.

Record the chosen check and qualifying rationale. Complete discovery after all selected areas, including fallback passes, are synthesized and verified.

## Phase 3: Implementation

1. Re-read files before editing, preserve unrelated user changes, and implement only selected scope in logical vertical slices, including required configuration, migrations, generated artifacts, and documentation. If implementation changes a material architecture claim, reconcile the same architecture document with the code and approved spec; record any unauthorized code divergence.
2. For each TDD behavior, write and run one focused test at the planned seam; confirm RED reflects missing behavior rather than test or unrelated failure; implement minimal GREEN; rerun it; then improve local names, duplication, or structure while green before starting the next behavior.
3. If a new test is immediately green, prove it is sensitive to the intended behavior. If existing behavior satisfies the criterion, mark `already satisfied`, retain GREEN and code evidence, and avoid unnecessary production changes; never manufacture RED or claim TDD.
4. Keep tests on observable behavior and mock only unavoidable external boundaries. Derive expected values from an independent source of truth, such as the approved spec, a worked business example, or a known-correct result; never compute them by repeating the production algorithm or calling the code under test. For `alternative verification`, run the recorded strongest check and retain its rationale and result; never use it to bypass feasible behavioral testing.
5. Run targeted validation after each increment and broader relevant repository checks afterward, following the Evidence Rules.

Distinguish patch failures from pre-existing or environment failures and fix in-scope regressions before review. Apply the Clarification Gate when implementation or test evidence invalidates a design assumption or makes faithful implementation infeasible.

## Phase 4: Independent Review

Read [`references/code-reviewer.md`](references/code-reviewer.md). Default to one reviewer covering all three perspectives below. Split perspectives across reviewers only when they require substantially different code or evidence and can be reviewed with little shared context. Assign each perspective to exactly one reviewer and record assignments.

- **Implementation quality:** complexity, material duplication, readability, cohesion, and responsibility boundaries; exclude correctness, coverage, and compliance.
- **Behavioral correctness and risk:** regressions, acceptance edge cases, errors, concurrency, security, performance, and compatibility; exclude style, structure, documentation, and process unless they cause a concrete defect or critical risk.
- **Delivery compliance and integration:** approved scope and requirement coverage, repository rules, architecture and interface contracts, verification evidence, configuration, migrations, documentation, and rollout; exclude general code quality and speculative defects.

For initial review, give each reviewer its assigned perspectives, delivery boundary and acceptance criteria, the acceptance and plan-step tracking, and implementation-only diff from the recorded baselines.

Default budget: **one complete initial review, then at most two repair rounds**, regardless of reviewer count.

1. **Adjudicate.** After all assigned review scopes are complete, consolidate duplicates and apply the reference's must-fix criteria. Track findings as must-fix, resolved, deferred, or rejected with brief reasons. An unresolved or unverifiable must-fix still blocks completion; deferring it does not remove that obligation.
2. **Repair.** Before changing a confirmed batch, preserve the reviewed state sufficiently to reconstruct the repair-only diff, including relevant uncommitted or untracked content. Count a round when repair work begins. Make minimal corrections following the Phase 3 implementation workflow and Evidence Rules, then run focused checks for the correction and its direct regression risks; omit incidental cleanup.
3. **Handle failure.** Failed required post-correction checks or unresolved/reappearing must-fix findings end the current repair round. Reassess the cause before using a remaining round; no additional approval is needed solely because a round failed. Do not hide repeated repairs inside one round. Expected TDD RED is not a failed correction; supplementary checks and environment blockers follow the Evidence Rules.
4. **Verify repairs.** After validation passes, review material repairs using the reference's templates and only affected perspectives. Reuse the original owner or a replacement.
5. **Keep scope stable.** Adjudicate incidental original blockers separately without resetting the budget. Reopen resolved/deferred findings only with new evidence.
6. **Stop at the limit.** If blockers remain after two rounds, report them, non-convergence reasons, missing evidence, and the recommended next step. Obtain user direction before more rounds; new severe findings do not automatically extend the budget.

The Clarification Gate also applies to repairs and material trade-offs. Budget exhaustion is not approval.

## Phase 5: Delivery

When staging or preparing a commit, explicitly exclude local plan artifacts (`docs/plans/` or the project-defined planning location) unless the user or project policy requires committing them. When executing selected delivery units rather than the full plan, completion means the selected scope is complete and verified; requirements or units reserved for later delivery remain out of scope and must not be reported as incomplete current work or as completed spec coverage.

Report concisely, referencing the existing coverage record rather than repeating it. Retain criterion-level RED/GREEN, `already satisfied` evidence, and alternative-verification rationale in the tracking records:

- selected scope, delivered behavior, coverage summary, and any unmet criteria;
- key files changed, validation actually run, review coverage (including self-review fallback), findings fixed or deferred, rounds used, and unresolved blockers with the recommended next step;
- deviations, limitations, rollout steps, and pre-existing failures.

Complete only when all checks below hold; otherwise report the exact remaining work:

- [ ] Every in-scope acceptance criterion and mandatory delivery obligation is satisfied with evidence.
- [ ] Required verification passed; supplementary checks have results or reasoned dispositions.
- [ ] Required review results are synthesized and no must-fix remains.
- [ ] Changes remain within the approved scope and fixed decisions, and unrelated user work is preserved.

## Resume After Interruption

After an interruption, resumed session, context reduction, or handoff:

1. **Check inputs and ownership.** Re-read approved inputs, repository instructions, and relevant files. Compare the current commit, working tree, and diff with recorded baselines and user changes. Ask if overlapping change ownership cannot be established safely.
2. **Restore evidenced state.** Recover criterion status and finding dispositions from code, tests, validation output, and review results; summaries are leads, not proof. Preserve rounds already used. Mark missing or contradictory evidence incomplete; never invent historical RED or reset the budget.
3. **Continue unfinished work.** Recheck decisions affected by changed inputs and apply the Clarification Gate as needed. Restore missing exploration or review through the delegation fallback; repeat only affected review perspectives and missing or stale validation. Resume at the earliest incomplete phase, retaining the environment-retry condition.
