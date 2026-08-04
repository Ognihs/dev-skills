---
name: to-mini-prd
description: Explore and clarify a product request through focused discussion, then write a concise, code-agnostic mini PRD. Use when the user explicitly asks for product discovery, requirement exploration, or a mini PRD, or agrees to product alignment before brainstorming. Do not trigger automatically merely because a coding request is vague; brainstorming can clarify it directly. Do not use for an existing detailed requirement, code-grounded refinement, or technical design.
---

# To Mini PRD

Turn a vague product idea into an agreed product-level input. Save the result to `docs/prd/<YYYY-MM-DD>-<short-description>.md` relative to the repository root.

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
- Inspect code only when the user explicitly asks to verify current behavior.
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
