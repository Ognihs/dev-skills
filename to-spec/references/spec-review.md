# Spec Review

Review the written spec after drafting and after every requested revision. Fix issues in the file before asking for approval.

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
Status: Ready for User Review | Issues Found

Blocking issues:
- <section, issue, and implementation impact>

Advisory improvements:
- <optional non-blocking suggestion>
```
