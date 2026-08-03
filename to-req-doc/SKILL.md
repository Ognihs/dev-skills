---
name: to-req-doc
description: Defines the lightweight requirement document format used for code-grounded requirement refinement. Use this skill when creating or updating a requirement document.
---

# To Requirement Document

## Goal

Create a concise requirement document that explains:

- what should happen
- what is in scope
- what is out of scope
- what current code entry points are related

Do not turn the document into a design doc or implementation plan.

## Rules

- Write the document in **user's language** unless the user explicitly requests another language.
- Focus on requirements, not implementation.
- Keep wording concise and concrete.
- Every major requirement should have an ID: R1, R2, R3.
- Every major requirement should include expected behavior and acceptance criteria.
- **Important**: Every major requirement should be appropriately sized for a coding agent to complete in a single round. Oversized requirements should be split into smaller ones.
- Link requirement items to related code entry points when available.
- Do not invent business decisions.
- Do not include large code snippets.
- Do not include detailed technical design.

## Format

```markdown
# Requirement: <title>

## 1. Background

<Current context, problem, or motivation.>

## 2. Goal

- <Goal 1>
- <Goal 2>

## 3. Scope

This requirement includes:

- <In-scope item 1>
- <In-scope item 2>

## 4. Non-scope

This requirement does not include:

- <Out-of-scope item 1>
- <Out-of-scope item 2>

## 5. Requirement Details

### R1: <requirement title>

- Description:
  - <What should happen.>

- Current related code entry points:
  - `<path>` / `<function, class, component, endpoint, or route>`

- Expected behavior:
  - <Expected behavior.>

- Boundary cases:
  - <Important boundary case.>

- Acceptance criteria:
  - Given <context>, when <action>, then <expected result>.

### R2: <requirement title>

- Description:
  - ...
- Current related code entry points:
  - ...
- Expected behavior:
  - ...
- Boundary cases:
  - ...
- Acceptance criteria:
  - ...

## 6. Related Code Entry Point Summary

| Type | Entry | Current Role | Related Requirement |
|---|---|---|---|
| UI | `<path>` / `<component>` | <role> | R1 |
| API | `<path>` / `<endpoint>` | <role> | R1 |
| Service | `<path>` / `<function>` | <role> | R1 |
| Model | `<path>` / `<model>` | <role> | R2 |
| Test | `<path>` | <role> | R2 |

## 7. Notes

- Suggested implementation order: ...
- <Short assumptions, constraints, or references.>
```

## Code Entry Rules

- Always include file paths.
- Include function, class, component, endpoint, route, or model names when available.
- Mark uncertain conclusions as inferred.
- If no related code is found, say so explicitly.