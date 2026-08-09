# Requirement Document Format

Use this format for the final refined requirement document. Keep it concise and write it in the user's language unless requested otherwise.

## Rules

- Treat the user's draft and confirmed answers as product input; do not infer target behavior from current code.
- Include a Mini PRD only when supplied as supporting context; its existence alone does not require a requirement document.
- Split the document into cohesive, testable requirement points with stable IDs (`R1`, `R2`, ...). These are not development-session slices.
- Include verified code paths and symbols. Mark inferred findings explicitly.
- Record unresolved business decisions instead of deciding them.
- Do not include architecture, implementation order, or task breakdowns.
- Treat this document as optional input to brainstorming. Once an approved spec exists, the spec is authoritative.

## Template

```markdown
# Requirement: <title>

## Source Inputs

- Requirement draft: `<path or direct user input>`
- Supporting Mini PRD: `<path or N/A>`

## Background and Goal

<Problem, users, motivation, and intended outcome.>

## Scope

- <Included behavior>

## Non-Scope

- <Explicit exclusion>

## Requirement Details

### R1: <Cohesive requirement point>

- Description: <What should happen.>
- Current related code:
  - `<path>` / `<symbol>` — <current role>
- Expected behavior:
  - <Observable target behavior>
- Boundary cases:
  - <Important boundary or failure behavior>
- Acceptance criteria:
  - Given <context>, when <action>, then <expected result>.

## Related Code Entry Points

| Type | Entry | Current Role | Requirement |
|---|---|---|---|
| UI/API/Service/Model/Test | `<path>` / `<symbol>` | <role> | R1 |

## Unresolved Questions

- <Non-blocking question or N/A>

## Notes

- <Assumption, constraint, or reference, or N/A>
```
