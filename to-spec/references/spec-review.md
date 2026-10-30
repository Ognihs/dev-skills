# Spec Review

Review the written spec after drafting and after every requested semantic revision. A status-only transition from the exact reviewed Draft to `Approved` does not require another review. Fix document structure, wording, and internal consistency issues that do not require a new design decision before asking for approval. Report any unresolved design decision as a blocking issue to the caller, or recommend a design workflow when invoked directly; do not invent or silently choose the missing decision in this review.

Review an existing Approved spec without editing it unless document editing is explicitly authorized. A wording-only edit that preserves semantics may retain `Approved`; any semantic edit must follow the parent skill's transition back to `Draft`, final review, and renewed approval rules.

Before revalidating an Approved spec, identify its approved semantic baseline from current-session approval evidence or version history and compare the current document against it. If the baseline is unavailable, report `Approval Unverified`; if the semantic content differs, report `Issues Found`. Never infer continued approval from the current `Status` field alone.

## Review Method

Use one fresh, read-only reviewer when the spec fixes material cross-module contracts, non-trivial state transitions, migration or cutover policy, or compatibility behavior. This reading is part of the existing final review before requesting approval; it neither approves the design nor decides whether delivery needs a plan. Small, straightforward changes use self-review.

Supply the complete current spec, repository instructions, applicable agreed architecture and approved contracts, necessary verified code anchors, and the review question below. Keep authoritative inputs accessible. Exclude the author's conversation history, preferred answers, and conclusions about what should pass. Require read-only work and no further delegation.

```text
Read the spec and necessary repository evidence as a developer who cannot consult its author. Report only missing or contradictory information that would force a consequential guess before planning or implementing the specified behavior. For each item, cite the section or source, state the question, and explain its implementation impact. Skip wording preferences and local implementation choices the spec leaves to the developer. If no important gap remains, say so; report any unexamined scope or unavailable evidence.
```

Reconcile findings against the document and repository evidence, then apply the blocking checks below. Repair document issues within the resolved design; return missing design decisions to the caller rather than settling them in review. On a semantic revision, repeat the applicable checks and independent reading for affected decisions and dependencies, reusing still-valid findings from unchanged areas. Preserve the existing approval and reapproval rules.

If delegation or context isolation is unavailable, prohibited, or incomplete, record the limitation and perform the same reading yourself, explicitly labeled self-review. Missing evidence remains a limitation or blocker under the checks below; self-review does not waive them.

## Blocking Checks

- **Completeness:** No placeholder, `TODO`, `TBD`, missing required behavior, or unaddressed dependency blocks implementation.
- **Consistency:** Requirements, architecture, interfaces, data flow, and tests do not contradict one another.
- **Clarity:** A developer cannot reasonably implement a materially different behavior from the same wording.
- **Scope:** Independent subsystems are not hidden in one spec. A coherent large change may remain one spec and receive an implementation plan later.
- **Semantic ambiguity:** The same wording does not allow two reasonable implementers to reach different spec-level semantics or fixed design — covering observable behavior, stable contracts, data semantics, responsibility boundaries, and migration/compatibility policy.
- **Dependency completeness:** Behavior that depends on a migration, a compatibility condition, another requirement, or a specific state carries that relationship written in the spec, not only in a prior conversation.
- **Verification clarity:** Every important requirement states what evidence shows completion — the verification intent, without requiring concrete test files.
- **Feasibility:** Decisions agree with verified repository constraints and relevant external interfaces.
- **YAGNI:** The spec contains no unrequested features or speculative framework.
- **Authority:** All binding behavior and design decisions are present in the spec rather than only in an optional PRD, requirement document, or conversation.
- **Architecture status:** No statement from an unconfirmed or unknown-state architecture document is presented as an already binding constraint; any adopted decision is explicit in the Draft for user approval.

## Calibration

Block approval only for issues that could cause incorrect implementation, unreliable verification, or a necessary design decision during development. Keep wording and stylistic suggestions advisory.

## Review Result

Report:

```markdown
Status: Ready for User Review | Approved Revalidated | Approval Unverified | Issues Found
Review: Independent reading | Self-review — <scope and any delegation, isolation, or evidence limitation>

Blocking issues:
- <section, issue, and implementation impact>

Advisory improvements:
- <optional non-blocking suggestion>
```

Use `Ready for User Review` for a Draft with no blockers, `Approved Revalidated` for an Approved spec that matches a trustworthy baseline and has no blockers, `Approval Unverified` when the spec has no review blocker but its approved baseline is unavailable, and `Issues Found` otherwise.
