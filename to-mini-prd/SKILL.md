---
name: to-mini-prd
description: Explore and clarify an early-stage product request through focused discussion, then write a concise, code-agnostic mini PRD. Use when the user explicitly asks for product discovery, product-level requirement exploration, or a mini PRD, or agrees to product alignment before brainstorming. Treat this as an alternative intake path to code-grounded requirement refinement, not its prerequisite. Do not trigger automatically merely because a coding request is vague, or use for an existing substantial requirement draft, broad code reconciliation, technical design, implementation planning, or coding.
---

# To Mini PRD

Turn a vague product idea into an agreed product-level input. Save the result to `docs/prd/<YYYY-MM-DD>-<short-description>.md` relative to the repository root. Hand an approved Mini PRD directly to brainstorming by default; do not run `improve-req-doc` next unless a separate substantial requirement draft needs code-grounded refinement.

## Workflow

1. Extract the problem, affected users, desired outcome, proposed behavior, scope, non-goals, and success criteria from the request.
2. Identify only product-level gaps that block a clear PRD.
3. Ask focused questions in small rounds. Offer a recommended default when it helps the user decide, but do not invent business decisions.
4. Draft the mini PRD and get the user's confirmation.
5. Save it only after no blocking product questions remain.

## Rules

- Write in the user's language unless requested otherwise.
- Keep the document concise and understandable without source code.
- Do not include file paths, APIs, schemas, architecture, or exhaustive edges.
- Keep acceptance criteria user-observable and product-level.
- Inspect code only when the user explicitly asks to verify a specific claim about current behavior. Keep the result product-level; if the task requires broad code tracing, verified paths or symbols, or systematic reconciliation with an existing draft, use `improve-req-doc` instead.
- Treat the PRD as optional input to brainstorming, not an implementation spec. Once an approved spec exists, the spec is authoritative.
- Mark irrelevant sections `N/A`.

## Template

```markdown
# Mini PRD: <title>

## Background

<Current problem, why it matters, and who is affected.>

## Goals and Success Metrics

- Goal: <user or business outcome>
- Metric: <measurable success criterion>

## Proposed Solution

<Core user flow, behavior change, and feature scope.>

## Non-Goals

- <Explicit exclusion>

## Product-Level Acceptance Criteria

- [ ] <User-observable completion condition>

## Open Questions

- <Non-blocking question or N/A>

## Notes

<Assumptions, dependencies, risks, or N/A.>
```
