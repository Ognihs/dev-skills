---
name: to-spec
description: Persist or update an already resolved coding/development design as a self-contained technical spec, review or revalidate an existing spec, and maintain its approval status. Use directly when a complete resolved design must be captured or an existing spec needs review, including when implementation is the eventual goal, or as the documentation step of a design workflow. Do not use for product discovery, requirement refinement, unresolved design decisions, design negotiation, implementation planning, or coding.
---

# Write a Design Spec

Write the spec in the user's language unless requested otherwise. Default path is `docs/specs/<YYYY-MM-DD>-<topic>-design.md` when no location is specified.

Treat the resolved design as input. Own document structure, review, and status changes, but do not resolve design decisions or declare an unresolved design ready for approval. Report blocking ambiguity to the caller, or recommend a design workflow when invoked directly.

## Rules

- Make the spec self-contained. PRDs and requirement documents are optional inputs, not required reading for implementation.
- Assign stable spec requirement IDs (`S1`, `S2`, ...). Downstream roadmaps and development must reference these IDs. Preserve existing IDs when updating.
- Include only verified existing paths and symbols. Do not predict future file layouts or include code snippets.
- Record meaningful alternatives and trade-offs; do not invent alternatives to satisfy a quota.
- Mark irrelevant sections `N/A`.
- Use `Draft` until the user explicitly approves the exact reviewed semantic content; then set `Approved`. That status-only change does not require another approval.
- Do not treat edit authorization, completed review, or approval of an earlier semantic revision as approval of changed semantic content.
- Revalidate an existing Approved spec against a trustworthy approved baseline from the current session or version history. If no baseline is available, do not assert that approval remains valid; require explicit approval of the reviewed current content before downstream handoff.
- An approved spec must contain no blocking ambiguity, placeholder, or contradiction.
- Current code establishes existing behavior, not intended behavior. Resolve differences explicitly in the spec.
- Any semantic change to an Approved spec returns it to `Draft` and requires final review and renewed approval. Before editing, determine from repository evidence whether implementation has started; ask the user only when available evidence cannot establish it. Before implementation starts, update the original only when the user authorized editing that document. Once implementation has started, preserve the original as a historical baseline unless the user explicitly requests modifying that document; a request to change implemented behavior is not that permission. Otherwise create a new Draft spec that supersedes it.

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

Before returning any created, updated, reviewed, or revalidated spec, read [`references/spec-review.md`](references/spec-review.md) completely, review the file, and fix material issues. Report the review result using the reference format. A status-only transition after the approval consistency check below reuses the preceding review result.

## Completion and Handoff

- On `Issues Found`, keep a Draft as `Draft` and report every blocker. For an existing Approved spec without edit authorization, leave the file unchanged, report that it failed revalidation, and block downstream handoff until the user authorizes revision or a superseding Draft is approved. Return unresolved design decisions to the calling design workflow, or recommend one when invoked directly. Do not request approval while a blocker remains.
- On `Approved Revalidated`, leave the existing Approved spec unchanged and report successful revalidation. Do not request approval again.
- On `Approval Unverified`, leave the existing Approved spec unchanged, block downstream handoff, and request explicit approval of the reviewed current content. That approval establishes the current-session baseline without requiring a status edit.
- On `Ready for User Review`, present the reviewed Draft. When invoked directly, request explicit approval and wait; when called by a design workflow, return control so that workflow can conduct the approval conversation.
- Before changing `Draft` to `Approved`, reread the file and verify that all content except the `Status` field exactly matches the reviewed revision the user approved. If any other content changed, keep it `Draft`, repeat final review, and obtain approval of the new revision.
- Report the spec path, final review status, and approval status. After direct invocation produces a newly Approved spec for planned work, assess delivery fit against current repository evidence and recommend `feature-dev` when it fits one development session or `to-roadmap` when scale or ordered dependencies require slicing; do not start either workflow automatically. Do not claim completion while required approval is pending.
