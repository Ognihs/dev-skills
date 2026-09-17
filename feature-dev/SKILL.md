---
name: feature-dev
description: Implement and verify an approved technical design spec, or one selected roadmap slice together with its complete approved spec. Use when intended behavior and fixed design decisions are already captured in an approved spec. Inspect the repository, resolve implementation-level design, clarify ambiguities or code/spec conflicts, develop testable behavior through TDD by default, validate requirement coverage, and independently review the patch. Do not use for product discovery, initial architecture design, unapproved requirements, bug diagnosis, or roadmap creation.
---

# Deliver an Approved Feature

Treat the approved spec as the sole authority for intended behavior and fixed design decisions. Current code is evidence of existing behavior, not authority over the spec.

Only the main agent may modify files; follow all repository instructions. Keep phase status, a compact coverage map, and review findings in the host's task tracker or current context. Record each fact once; do not create repository files solely for progress tracking.

## Entry Contract

Require one of these inputs:

- a complete approved spec that fits one 200K development session; or
- a complete approved spec, its roadmap, and exactly one selected slice.

Read every input completely, then check:

1. The spec is `Approved` and has requirement IDs. Any roadmap matches it and maps the selected slice to those IDs.
2. Prerequisites hold in the current repository. For a slice, its scope, exclusions, acceptance criteria, and reserved work define the boundary; IDs alone do not.
3. Repository evidence supports one-session delivery, including discovery, implementation, testing, migrations, rollout, review, and repair margin. File or requirement counts alone do not establish fit.

Stop on invalid inputs or unreliable fit. If scale or ordered dependencies prevent fit, require a session-sized slice. Do not reopen settled design choices merely because alternatives exist.

## Clarification Gate

Apply this gate in any phase when ambiguity, a code/spec mismatch, or a design doubt appears:

1. Inspect the repository before asking anything it can answer.
2. If the spec explicitly requires changing current behavior and introduces no unaddressed risk, follow it and record the expected mismatch. Otherwise, present substantive code/spec conflicts and ask whether the approved intent still holds.
3. If multiple plausible interpretations or material design choices affecting approved behavior or fixed design remain, explain evidence and trade-offs, ask a focused question with a recommendation when useful, and pause affected work rather than deciding silently.
4. Record clarifications within approved behavior and fixed design. Any change to observable behavior, scope, acceptance criteria, or a fixed decision requires updating the spec and obtaining renewed approval; then reconcile any roadmap and slice before continuing. Conversation-only decisions never override the approved spec.

Ask only questions that materially affect faithful delivery. Group related questions when they share the same decision context.

## Required Subagent Delegation

Delegate discovery and independent review when available and permitted:

- Supply the complete role reference, approved inputs, and bounded context. Require read-only work and no further delegation.
- When splitting work, start independent tasks in each permitted batch before waiting, respecting host capacity and project limits, including background restrictions. Coverage must not shrink with task count; never invent tasks to fill capacity.
- Synthesize results and verify important claims. For a failed or incomplete delegated task, default to at most one retry or reassignment in total. If delegation is unavailable, prohibited, or still incomplete afterward, record why and cover the missing roles yourself. Label this self-review.

## Evidence Rules

- Retain actual commands, outcomes, and supporting evidence; never claim an unrun check passed. Reference shared results rather than duplicate them.
- Checks mandated by the spec or repository, or needed to prove acceptance, are required. Supplementary checks need a result or a reasoned disposition; a blocked required check remains incomplete.
- Reuse evidence until relevant changes invalidate it. Retry environment-blocked checks only after conditions change, and report their delivery impact.

## Phase 1: Intake & Baseline

1. Apply the Entry Contract against repository instructions and current state; retain the delivery boundary and fixed decisions.
2. Record the starting commit, working-tree status and patch, plus content baselines for overlapping pre-existing changed or untracked files, so later review can isolate the implementation diff without attributing or overwriting user work.
3. Create a coverage map for every in-scope criterion, ordered for implementation. Include mandatory delivery obligations not already covered by those criteria, such as required migrations or rollout artifacts; do not duplicate covered obligations. Use the example below or an equivalent checklist; add brief implementation steps only where needed.

| Criterion or mandatory obligation | Status | Implementation and verification evidence |
|---|---|---|
| S1: <acceptance criterion> | pending / complete / already satisfied / blocked | <code location; shared check result or evidence reference> |

Record each test seam once. Put `alternative verification` and its rationale in the evidence column; `already satisfied` also requires verification evidence. Add reasons for blockers. Update only changed entries; progress messages report changes and blockers rather than reprinting the map.

## Phase 2: Implementation Discovery

Read [`references/code-explorer.md`](references/code-explorer.md). Default to one read-only exploration task. Split only when distinct questions can be investigated independently, with no overlapping scope. Follow the delegation rules and fallback.

Focus on relevant execution flows, integration boundaries, state behavior, public test seams, and operational concerns; reuse similar implementations as evidence.

After exploration:

1. Synthesize all results, directly verify important findings, and reconcile code, spec, and coverage map. Route conflicts through the Clarification Gate.
2. Resolve implementation structure, responsibilities, reuse, interfaces, state flow, and error handling within the approved design.
3. Choose stable public test seams that observe behavior and give repeatable, focused feedback. Prefer existing seams that survive refactoring; apply the Clarification Gate if a new seam changes a fixed design decision.
4. Use `TDD` by default for behavior that can be meaningfully tested automatically. Permit `alternative verification` only under either condition below.

   - **Behavior cannot be observed automatically within scope and fixed design:** cite repository evidence showing why no correct automated observer can be added, and select the strongest practical check.
   - **Declarative, generated, or non-executable artifact:** identify the deterministic validator, build, or dry run that verifies the criterion. Artifact type alone does not waive feasible tests of executable behavior.

Record the chosen check and qualifying rationale. Complete discovery after all selected areas, including fallback passes, are synthesized and verified.

## Phase 3: Implementation

1. Re-read files before editing, preserve unrelated user changes, and implement only selected scope in logical vertical slices, including required configuration, migrations, generated artifacts, and documentation.
2. For each TDD behavior, write and run one focused test at the planned seam; confirm RED reflects missing behavior rather than test or unrelated failure; implement minimal GREEN; rerun it; then improve local names, duplication, or structure while green before starting the next behavior.
3. If a new test is immediately green, prove it is sensitive to the intended behavior. If existing behavior satisfies the criterion, mark `already satisfied`, retain GREEN and code evidence, and avoid unnecessary production changes; never manufacture RED or claim TDD.
4. Keep tests on observable behavior and mock only unavoidable external boundaries. Derive expected values from an independent source of truth, such as the approved spec, a worked business example, or a known-correct result; never compute them by repeating the production algorithm or calling the code under test. For `alternative verification`, run the recorded strongest check and retain its rationale and result; never use it to bypass feasible behavioral testing.
5. Run targeted validation after each increment and broader relevant repository checks afterward, following the Evidence Rules.

Distinguish patch failures from pre-existing or environment failures and fix in-scope regressions before review. Apply the Clarification Gate when implementation or test evidence invalidates a design assumption or makes faithful implementation infeasible.

## Phase 4: Independent Review

Read [`references/code-reviewer.md`](references/code-reviewer.md). Default to one reviewer covering all three perspectives below. Split perspectives across reviewers only when they require substantially different code or evidence and can be reviewed with little shared context. Assign each perspective to exactly one reviewer; record assignments and use the delegation fallback when required.

- **Implementation quality:** complexity, material duplication, readability, cohesion, and responsibility boundaries; exclude correctness, coverage, and compliance.
- **Behavioral correctness and risk:** regressions, acceptance edge cases, errors, concurrency, security, performance, and compatibility; exclude style, structure, documentation, and process unless they cause a concrete defect or critical risk.
- **Delivery compliance and integration:** approved scope and requirement coverage, repository rules, architecture and interface contracts, verification evidence, configuration, migrations, documentation, and rollout; exclude general code quality and speculative defects.

For initial review, give each reviewer its assigned perspectives, delivery boundary and acceptance criteria, coverage map, and implementation-only diff from the recorded baselines.

Default budget: **one complete initial review, then at most two repair rounds**, regardless of reviewer count.

1. **Adjudicate.** After all assigned review scopes are complete, consolidate duplicates and apply the reference's must-fix criteria. Track findings as must-fix, resolved, deferred, or rejected with brief reasons. An unresolved or unverifiable must-fix still blocks completion; deferring it does not remove that obligation. Use the delegation fallback for incomplete review coverage.
2. **Repair.** Before changing a confirmed batch, preserve the reviewed state sufficiently to reconstruct the repair-only diff, including relevant uncommitted or untracked content. Count a round when repair work begins. Make minimal corrections following the Phase 3 implementation workflow and Evidence Rules, then run focused checks for the correction and its direct regression risks; omit incidental cleanup.
3. **Handle failure.** Failed required post-correction checks or unresolved/reappearing must-fix findings end the current repair round. Reassess the cause before using a remaining round; no additional approval is needed solely because a round failed. Do not hide repeated repairs inside one round. Expected TDD RED is not a failed correction; supplementary checks and environment blockers follow the Evidence Rules.
4. **Verify repairs.** After validation passes, review material repairs using the reference's templates and only affected perspectives. Reuse the original owner or a replacement; use the delegation fallback when needed.
5. **Keep scope stable.** Adjudicate incidental original blockers separately without resetting the budget. Reopen resolved/deferred findings only with new evidence.
6. **Stop at the limit.** If blockers remain after two rounds, report them, non-convergence reasons, missing evidence, and the recommended next step. Obtain user direction before more rounds; new severe findings do not automatically extend the budget.

The Clarification Gate also applies to repairs and material trade-offs. Budget exhaustion is not approval.

## Phase 5: Delivery

Report concisely, referencing the existing coverage record rather than repeating it:

- selected scope and delivered behavior;
- coverage summary and any unmet criteria; retain criterion-level RED/GREEN, `already satisfied` evidence, and alternative-verification rationale in the coverage map;
- key files changed and validation actually run;
- review coverage, including any self-review fallback, findings fixed or deferred, rounds used, and unresolved blockers with the recommended next step;
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
