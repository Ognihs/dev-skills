# Spec Review

Review the written spec after drafting and after every requested semantic revision. A status-only transition from the exact reviewed Draft to `Approved` does not require another review. Fix document structure, wording, and internal consistency issues that do not require a new design decision before asking for approval. Report any unresolved design decision as a blocking issue to the caller, or recommend a design workflow when invoked directly; do not invent or silently choose the missing decision in this review.

Review an existing Approved spec without editing it unless document editing is explicitly authorized. A wording-only edit that preserves semantics may retain `Approved`; any semantic edit must follow the parent skill's transition back to `Draft`, final review, and renewed approval rules.

Before revalidating an Approved spec, identify its approved semantic baseline from current-session approval evidence or version history and compare the current document against it. If the baseline is unavailable, report `Approval Unverified`; if the semantic content differs, report `Issues Found`. Never infer continued approval from the current `Status` field alone.

## Blocking Checks

- **Completeness:** No placeholder, `TODO`, `TBD`, missing required behavior, or unaddressed dependency blocks implementation.
- **Consistency:** Requirements, architecture, interfaces, data flow, and tests do not contradict one another.
- **Clarity:** A developer cannot reasonably implement a materially different behavior from the same wording.
- **Scope:** Independent subsystems are not hidden in one spec. A coherent large change may remain one spec and use a roadmap later.
- **Feasibility:** Decisions agree with verified repository constraints and relevant external interfaces.
- **YAGNI:** The spec contains no unrequested features or speculative framework.
- **Authority:** All binding behavior and design decisions are present in the spec rather than only in an optional PRD, requirement document, or conversation.

## Calibration

Block approval only for issues that could cause incorrect implementation, unreliable verification, or a necessary design decision during development. Keep wording and stylistic suggestions advisory.

## Review Result

Report:

```markdown
Status: Ready for User Review | Approved Revalidated | Approval Unverified | Issues Found

Blocking issues:
- <section, issue, and implementation impact>

Advisory improvements:
- <optional non-blocking suggestion>
```

Use `Ready for User Review` for a Draft with no blockers, `Approved Revalidated` for an Approved spec that matches a trustworthy baseline and has no blockers, `Approval Unverified` when the spec has no review blocker but its approved baseline is unavailable, and `Issues Found` otherwise.
