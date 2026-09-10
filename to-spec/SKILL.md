---
name: to-spec
description: Write or update a self-contained technical design spec after the design decisions are resolved. Use when a coding/development design must be persisted as the sole source of truth for intended behavior and fixed technical decisions. Do not use for product discovery, requirement refinement, design negotiation, implementation planning, or coding.
---

# Write a Design Spec

Write the spec in the user's language unless requested otherwise. Default path is `docs/specs/<YYYY-MM-DD>-<topic>-design.md` when no location is specified.

Treat the resolved design as input. Do not reopen design decisions or invent missing ones; report blocking ambiguity to the caller.

## Rules

- Make the spec self-contained. PRDs and requirement documents are optional inputs, not required reading for implementation.
- Assign stable spec requirement IDs (`S1`, `S2`, ...). Downstream roadmaps and development must reference these IDs. Preserve existing IDs when updating.
- Include only verified existing paths and symbols. Do not predict future file layouts or include code snippets.
- Record meaningful alternatives and trade-offs; do not invent alternatives to satisfy a quota.
- Mark irrelevant sections `N/A`.
- Use `Draft` until the user approves the written spec; then set `Approved`.
- An approved spec must contain no blocking ambiguity, placeholder, or contradiction.
- Current code establishes existing behavior, not intended behavior. Resolve differences explicitly in the spec.
- If downstream discovery changes intended behavior or a fixed design decision, pause the affected work. Do not modify an approved spec whose described behavior has already been implemented unless the user explicitly requests modifying that spec; a request to change the implemented behavior is not that permission. Otherwise capture the change in a new Draft spec and obtain approval before continuing.

## Template

```markdown
# Spec: <title>

- Status: Draft | Approved
- Supersedes: `<spec path or N/A>`
- Direct request: <Concise summary of the intended change>

## Context & Change Boundary

<Current behavior and constraints, the concrete problem, the in-scope change, and behavior or areas that must remain unchanged.>

## Goals and Non-Goals

### Goals

- <Functional or non-functional outcome>

### Non-Goals

- <Explicit exclusion>

## Requirements & Acceptance Criteria

### S1: <Observable Requirement>

- Expected behavior: <observable outcome>
- Boundary and error behavior: <important cases>
- Acceptance criteria:
  - <Observable completion condition>

## High-Level Design

<Architecture, components, data flow, and interaction flow. Add a diagram only when it materially improves understanding.>

## Detailed Design

<Relevant interfaces, data model, core logic, dependencies, compatibility, migration, and rollout decisions.>

## Trade-offs & Alternatives

<Chosen approach, meaningful alternatives, rationale, and accepted drawbacks.>

## Testing Strategy

<Unit, integration, regression, performance, and acceptance verification.>

## Cross-Cutting Concerns

<Security, performance, scalability, observability, and operational risks.>

## Related Files

- `<verified relative path>` / `<symbol>` — <relevance>
```

## Final Review

Before returning any written or updated spec, read [`references/spec-review.md`](references/spec-review.md) completely, review the file, and fix material issues. Report the review result using the reference format.
